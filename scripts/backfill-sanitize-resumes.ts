// ONE-TIME backfill: run the save-path sanitiser over resume rows that were
// written before the sanitiser existed.
//
// The fix in src/lib/sanitize-resume.ts closes the door from now on. Rows
// already in the table went in through the open door, so they need a pass of
// their own — a stored payload is rendered by the same templates whether it
// arrived yesterday or today.
//
// COVERS BOTH JSON COLUMNS. `data` is the live CV; `lastSnapshot` is a full
// CVData that restoreSnapshot() writes straight back into `data`, so leaving
// snapshots dirty would just delay the problem by one click.
//
//   npx tsx --env-file=.env.local scripts/backfill-sanitize-resumes.ts        DRY RUN
//   npx tsx --env-file=.env.local scripts/backfill-sanitize-resumes.ts --apply
//
// Dry run is the default and writes nothing. It reports exactly which rows
// would change and what would be removed from each.

import { PrismaClient, Prisma } from "@prisma/client";
import { sanitizeResumeData } from "../src/lib/sanitize-resume";

const prisma = new PrismaClient();
const APPLY = process.argv.includes("--apply");

/** What was actually dangerous in a payload, for the report. Reported rather
 *  than merely counted: "3 rows changed" tells you nothing about whether the
 *  change was a live XSS or a stray <div>. */
function findings(before: string, after: string): string[] {
  const out: string[] = [];
  const probes: [string, RegExp][] = [
    ["<script>", /<script/i],
    ["on* handler", /\son\w+\s*=/i],
    ["javascript: URL", /javascript:/i],
    ["<img>", /<img/i],
    ["<iframe>", /<iframe/i],
    ["<svg>", /<svg/i],
    ["<a href>", /<a\s/i],
  ];
  for (const [name, re] of probes) {
    if (re.test(before) && !re.test(after)) out.push(name);
  }
  if (out.length === 0 && before !== after) out.push("other disallowed markup");
  return out;
}

/** CONTROL. "0 rows changed" is the same output a broken detector produces, so
 *  prove the detector fires before trusting a clean scan. Runs in memory on a
 *  synthetic payload; touches no rows. */
function control(): boolean {
  const dirty = {
    basics: { summary: `<img src=x onerror=alert(1)>hi` },
    experience: [{ bullets: [`<script>alert(1)</script>ok`] }],
    achievements: `<svg onload=alert(1)>ok`,
  };
  const before = JSON.stringify(dirty);
  const after = JSON.stringify(sanitizeResumeData(dirty));
  const fired = before !== after && findings(before, after).length >= 3;
  console.log(
    `  control: synthetic dirty row ${fired ? "DETECTED" : "MISSED"}` +
      `${fired ? ` (${findings(before, after).join(", ")})` : ""}`,
  );
  return fired;
}

/** Does this row carry any RichText markup at all? A table of plain-text CVs
 *  would also scan clean, and that is a different fact from "the CVs have HTML
 *  in them and none of it is dangerous". */
function hasMarkup(value: unknown): boolean {
  const d = (value ?? {}) as Record<string, any>;
  const parts = [
    d?.basics?.summary,
    d?.achievements,
    ...(Array.isArray(d?.experience)
      ? d.experience.flatMap((e: any) =>
          Array.isArray(e?.bullets) ? e.bullets : [e?.bullets],
        )
      : []),
  ];
  return parts.some((p) => typeof p === "string" && /<[a-z]/i.test(p));
}

async function main(): Promise<void> {
  console.log("");
  if (!control()) {
    console.error("  control FAILED — the detector does not fire. Aborting; a clean scan would be meaningless.");
    await prisma.$disconnect();
    process.exit(1);
  }

  const rows = await prisma.resume.findMany({
    select: { id: true, title: true, userId: true, data: true, lastSnapshot: true },
  });
  const withMarkup = rows.filter((r) => hasMarkup(r.data) || hasMarkup(r.lastSnapshot)).length;
  console.log(
    `\n${APPLY ? "APPLY" : "DRY RUN"} — scanning ${rows.length} resume row(s)` +
      `, ${withMarkup} of them carrying RichText markup\n`,
  );

  let changedData = 0;
  let changedSnap = 0;
  let dangerous = 0;

  for (const row of rows) {
    const beforeData = JSON.stringify(row.data ?? null);
    const afterDataObj = sanitizeResumeData(row.data as unknown);
    const afterData = JSON.stringify(afterDataObj ?? null);

    const beforeSnap = JSON.stringify(row.lastSnapshot ?? null);
    const afterSnapObj = row.lastSnapshot ? sanitizeResumeData(row.lastSnapshot as unknown) : null;
    const afterSnap = JSON.stringify(afterSnapObj ?? null);

    const dataDirty = beforeData !== afterData;
    const snapDirty = Boolean(row.lastSnapshot) && beforeSnap !== afterSnap;
    if (!dataDirty && !snapDirty) continue;

    const found = [
      ...(dataDirty ? findings(beforeData, afterData) : []),
      ...(snapDirty ? findings(beforeSnap, afterSnap).map((f) => `${f} (snapshot)`) : []),
    ];
    if (found.length) dangerous++;
    if (dataDirty) changedData++;
    if (snapDirty) changedSnap++;

    console.log(`  ${row.id}  "${row.title}"`);
    console.log(`     ${dataDirty ? "data DIRTY" : "data clean"}${snapDirty ? ", snapshot DIRTY" : ""}`);
    for (const f of found) console.log(`       removed: ${f}`);

    if (APPLY) {
      await prisma.resume.update({
        where: { id: row.id },
        data: {
          ...(dataDirty && { data: afterDataObj as unknown as Prisma.InputJsonValue }),
          ...(snapDirty && {
            lastSnapshot: afterSnapObj as unknown as Prisma.InputJsonValue,
          }),
        },
      });
    }
  }

  console.log(
    `\n  rows scanned      ${rows.length}` +
      `\n  data changed      ${changedData}` +
      `\n  snapshots changed ${changedSnap}` +
      `\n  rows carrying a dangerous construct ${dangerous}`,
  );
  console.log(
    APPLY
      ? "\n✓ backfill applied.\n"
      : "\nDRY RUN — nothing written. Re-run with --apply to sanitise.\n",
  );
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
