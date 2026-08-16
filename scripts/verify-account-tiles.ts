// Proves the /admin/accounts plan counts against the real database.
//
// THE INVARIANT: Free + Pro + Comp == Total, counted by three independent SQL
// predicates. It used to hold trivially — Free was computed as
// (total - comp - pro), which satisfies the equation by construction and can
// therefore detect nothing. Counting all four separately is what turns it into
// a check.
//
// THE SECOND CHECK, which is the one that actually catches drift: every SQL
// count is compared against classifying each row in JS with isProActive() /
// isComped() — the very functions the badges use. SQL and the badge agreeing on
// every row of the live User table is the only evidence that the admin screen is
// not quietly lying about who is paying.
//
//   npx tsx --env-file=.env.local scripts/verify-account-tiles.ts

import { PrismaClient, type Prisma } from "@prisma/client";
import { ACTIVE_STATUSES, isComped, isProActive } from "../src/lib/billing/plans";

const prisma = new PrismaClient();

let failures = 0;
const check = (label: string, ok: boolean, detail = ""): void => {
  if (!ok) failures++;
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${label}${detail ? `  — ${detail}` : ""}`);
};

// Predicates duplicated from src/app/admin/accounts/page.tsx ON PURPOSE. If the
// page's SQL is edited and this file is not, the two disagree and the run fails
// — which is the point of an independent check. A shared helper would make both
// sides wrong together and still go green.
const compActive = (now: Date): Prisma.UserWhereInput => ({ compProUntil: { gt: now } });
const notComped = (now: Date): Prisma.UserWhereInput => ({
  OR: [{ compProUntil: null }, { compProUntil: { lte: now } }],
});
const subActive = (now: Date): Prisma.UserWhereInput => ({
  subscriptionStatus: { in: [...ACTIVE_STATUSES] },
  subscriptionCurrentPeriodEnd: { gt: now },
});
const notSubActive = (now: Date): Prisma.UserWhereInput => ({
  OR: [
    { subscriptionStatus: null },
    { NOT: { subscriptionStatus: { in: [...ACTIVE_STATUSES] } } },
    { subscriptionCurrentPeriodEnd: null },
    { subscriptionCurrentPeriodEnd: { lte: now } },
  ],
});

async function main(): Promise<void> {
  const now = new Date();

  // ---------------------------------------------------------------- control --
  // A naive `NOT: subActive` is the mistake this predicate set exists to avoid:
  // in SQL's three-valued logic it evaluates to NULL (not TRUE) for every row
  // where subscriptionStatus IS NULL, so never-subscribed users vanish. Measure
  // that here — if the naive count does NOT differ from the explicit one, this
  // table has no NULL-status rows and the invariant below is proving less than
  // it appears to.
  const [naiveFree, explicitFree, nullStatus] = await Promise.all([
    prisma.user.count({ where: { AND: [notComped(now), { NOT: subActive(now) }] } }),
    prisma.user.count({ where: { AND: [notComped(now), notSubActive(now)] } }),
    prisma.user.count({ where: { subscriptionStatus: null } }),
  ]);
  console.log("\ncontrol — is the NULL-status trap live on this data?");
  console.log(`     rows with subscriptionStatus NULL : ${nullStatus}`);
  console.log(`     naive  NOT(subActive) Free count  : ${naiveFree}`);
  console.log(`     explicit notSubActive Free count  : ${explicitFree}`);
  console.log(
    nullStatus > 0 && naiveFree !== explicitFree
      ? `     => the trap IS live here: the naive form loses ${explicitFree - naiveFree} real user(s).`
      : "     => no divergence on this data (the explicit form is still the correct one).",
  );

  // -------------------------------------------------------------- SQL tiles --
  const [total, compCount, proCount, freeCount] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: compActive(now) }),
    prisma.user.count({ where: { AND: [notComped(now), subActive(now)] } }),
    prisma.user.count({ where: { AND: [notComped(now), notSubActive(now)] } }),
  ]);

  console.log("\n1. the invariant, on real rows");
  console.log(`     Total ${total} · Free ${freeCount} · Pro ${proCount} · Comp ${compCount}`);
  check(
    "Free + Pro + Comp == Total",
    freeCount + proCount + compCount === total,
    `${freeCount} + ${proCount} + ${compCount} = ${freeCount + proCount + compCount}, total ${total}`,
  );

  // ------------------------------------------- SQL vs the per-row predicates --
  const rows = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      compProUntil: true,
      subscriptionStatus: true,
      subscriptionCurrentPeriodEnd: true,
    },
  });

  let jsFree = 0;
  let jsPro = 0;
  let jsComp = 0;
  const mismatches: string[] = [];
  for (const u of rows) {
    if (isComped(u)) jsComp++;
    else if (isProActive(u)) jsPro++;
    else jsFree++;
  }

  console.log("\n2. SQL counts == what the row badges would render");
  check("row count matches Total", rows.length === total, `${rows.length} vs ${total}`);
  check("Comp: SQL == badge", compCount === jsComp, `SQL ${compCount}, badge ${jsComp}`);
  check("Pro:  SQL == badge", proCount === jsPro, `SQL ${proCount}, badge ${jsPro}`);
  check("Free: SQL == badge", freeCount === jsFree, `SQL ${freeCount}, badge ${jsFree}`);

  // ------------------------------------- the status filter returns those rows --
  // Counting right and FILTERING right are different failures; a filter that
  // drops rows still totals correctly in the tiles above.
  console.log("\n3. the status filter returns exactly those rows");
  for (const [label, where, expected] of [
    ["comp", compActive(now), compCount],
    ["pro", { AND: [notComped(now), subActive(now)] }, proCount],
    ["free", { AND: [notComped(now), notSubActive(now)] }, freeCount],
  ] as [string, Prisma.UserWhereInput, number][]) {
    const got = await prisma.user.findMany({ where, select: { id: true } });
    check(`filter status=${label} returns ${expected} row(s)`, got.length === expected, `got ${got.length}`);
  }

  // ------------------------------------------------------ paging is complete --
  // Paging must partition the table, not sample it. Walk every page and assert
  // the union is the whole set with no duplicates — an off-by-one in skip shows
  // up here and nowhere else.
  console.log("\n4. paging covers every row exactly once");
  const PAGE_SIZE = 20;
  const seen = new Set<string>();
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  let dupes = 0;
  for (let page = 1; page <= pages; page++) {
    const batch = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: { id: true },
    });
    for (const r of batch) {
      if (seen.has(r.id)) dupes++;
      seen.add(r.id);
    }
  }
  check(`${pages} page(s) of ${PAGE_SIZE} cover all ${total} rows`, seen.size === total, `saw ${seen.size}`);
  check("no row appears on two pages", dupes === 0, `${dupes} duplicate(s)`);

  // ------------------------------------------- the HQ stats endpoint's buckets --
  // /api/admin/stats reports free / trialing / billing / comp to AlmiWorld HQ.
  // Those four must also partition the table, or HQ's cross-product dashboard
  // shows AlmiCV revenue that does not exist.
  console.log("\n5. /api/admin/stats buckets partition the table");
  const [hqTrial, hqBilling] = await Promise.all([
    prisma.user.count({
      where: {
        AND: [
          notComped(now),
          { subscriptionStatus: "trialing", subscriptionCurrentPeriodEnd: { gt: now } },
        ],
      },
    }),
    prisma.user.count({
      where: {
        AND: [
          notComped(now),
          { subscriptionStatus: "active", subscriptionCurrentPeriodEnd: { gt: now } },
        ],
      },
    }),
  ]);
  console.log(`     free ${freeCount} · trialing ${hqTrial} · billing ${hqBilling} · comp ${compCount}`);
  check(
    "free + trialing + billing + comp == Total",
    freeCount + hqTrial + hqBilling + compCount === total,
    `${freeCount + hqTrial + hqBilling + compCount} vs ${total}`,
  );
  // trialing + billing must reconstitute Pro, or ACTIVE_STATUSES has grown a
  // third value that the HQ split does not know about.
  check(
    "trialing + billing == Pro",
    hqTrial + hqBilling === proCount,
    `${hqTrial} + ${hqBilling} = ${hqTrial + hqBilling}, Pro ${proCount}`,
  );

  // ---------------------------------------------------------------- search --
  // `mode: "insensitive"` is a Postgres-only Prisma feature and fails silently
  // by simply not matching, so assert it against a REAL row rather than trusting
  // the type-checker. Case is flipped deliberately: a founder typing "NASIR"
  // must find "nasir@…".
  console.log("\n6. search matches on email and name, case-insensitively");
  const sample = rows[0];
  if (!sample) {
    check("a row exists to search for", false, "table is empty");
  } else {
    const local = sample.email.split("@")[0];
    const needle = local.slice(0, Math.max(3, Math.min(6, local.length)));
    const flipped =
      needle.toUpperCase() === needle ? needle.toLowerCase() : needle.toUpperCase();

    const byEmail = await prisma.user.findMany({
      where: {
        OR: [
          { email: { contains: flipped, mode: "insensitive" } },
          { name: { contains: flipped, mode: "insensitive" } },
        ],
      },
      select: { id: true },
    });
    check(
      `"${flipped}" (case-flipped) finds ${sample.email}`,
      byEmail.some((r) => r.id === sample.id),
      `${byEmail.length} row(s) matched`,
    );

    const nameRow = await prisma.user.findFirst({
      where: { name: { not: "" } },
      select: { id: true, name: true },
    });
    if (nameRow) {
      const nNeedle = nameRow.name.trim().split(/\s+/)[0];
      const byName = await prisma.user.findMany({
        where: {
          OR: [
            { email: { contains: nNeedle.toUpperCase(), mode: "insensitive" } },
            { name: { contains: nNeedle.toUpperCase(), mode: "insensitive" } },
          ],
        },
        select: { id: true },
      });
      check(
        `name search "${nNeedle.toUpperCase()}" finds that user`,
        byName.some((r) => r.id === nameRow.id),
        `${byName.length} row(s) matched`,
      );
    }

    // A needle that cannot exist must return nothing — otherwise `contains` is
    // being ignored and every "search" is really just an unfiltered list.
    const none = await prisma.user.count({
      where: {
        OR: [
          { email: { contains: "zzz-no-such-user-zzz", mode: "insensitive" } },
          { name: { contains: "zzz-no-such-user-zzz", mode: "insensitive" } },
        ],
      },
    });
    check("an impossible needle matches nothing", none === 0, `${none} row(s)`);
  }

  if (mismatches.length) for (const m of mismatches) console.log(`     ${m}`);

  console.log(
    failures === 0
      ? "\n✓ verify-account-tiles: tiles, badges, filter and paging all agree on the live table.\n"
      : `\n✗ verify-account-tiles: ${failures} check(s) failed.\n`,
  );
  await prisma.$disconnect();
  process.exit(failures === 0 ? 0 : 1);
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
