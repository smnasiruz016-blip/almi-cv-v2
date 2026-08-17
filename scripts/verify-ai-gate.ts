// Build-time proof that AI is paid-only, with exactly 5 trial "taste" calls.
//
// Wired into `prebuild` beside verify-sanitize.ts, and PURE for the same
// reason: no database, no network, no env beyond what plans.ts already reads.
// A prebuild check that needed Neon would fail the build every time a branch
// limit was hit, and a gate that cries wolf gets deleted.
//
// What it asserts:
//   1. getAccessLevel maps every billing state to none / trialing / paid
//   2. an expired period end is "none" for EVERY status, including "active"
//   3. paid is unlimited and never touches the counter
//   4. trialing is allowed exactly 5 and refused on the 6th
//   5. billing disabled leaves the escape hatch open
//   6. the three refusal messages stay distinct (no generic fallback)
//   7. the pure claim rule still matches the real Prisma WHERE clause
//
// Assertion 7 is the important one. Assertions 3-4 drive canClaimTrialCredit,
// which is a COPY of the `lt: TRIAL_AI_CALL_LIMIT` filter that actually runs.
// Testing a copy proves nothing about the original, so 7 reads access.ts and
// checks the real filter is still there. Without it this gate would stay green
// while someone raised the live limit to 500.
//
// Run directly: npx tsx scripts/verify-ai-gate.ts

import { readFileSync, readdirSync } from "node:fs";
import {
  getAccessLevel,
  hasFullAccess,
  TRIAL_AI_CALL_LIMIT,
  type AccessLevel,
} from "../src/lib/billing/plans";
import {
  canClaimTrialCredit,
  decideAIAccess,
  TRIAL_EXHAUSTED_MESSAGE,
  PRO_REQUIRED_MESSAGE,
} from "../src/lib/ai/access";

let failures = 0;
const check = (label: string, ok: boolean, detail = ""): void => {
  if (!ok) failures++;
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${label}${detail ? `  — ${detail}` : ""}`);
};

const DAY = 24 * 60 * 60 * 1000;
const future = new Date(Date.now() + 3 * DAY);
const past = new Date(Date.now() - 3 * DAY);

const user = (
  status: string | null,
  periodEnd: Date | null,
  comp: Date | null = null,
  email = "someone@example.com",
) => ({
  subscriptionStatus: status,
  subscriptionCurrentPeriodEnd: periodEnd,
  compProUntil: comp,
  email,
});

// Owner list is INJECTED, never read from process.env. If this script depended
// on OWNER_EMAILS being set, it would pass or fail for reasons unrelated to the
// code — and in prebuild it would be unset, so the owner assertions would
// silently test nothing.
const OWNER_EMAIL = "owner@example.com";
const stubIsOwner = (email: string | null | undefined): boolean =>
  (email ?? "").trim().toLowerCase() === OWNER_EMAIL;
const owner = (
  status: string | null = null,
  periodEnd: Date | null = null,
  comp: Date | null = null,
) => user(status, periodEnd, comp, OWNER_EMAIL);

// ------------------------------------------------------- 1. level mapping ---
console.log("\n1. getAccessLevel maps billing state to an access level");
for (const [label, u, want] of [
  ["active + future period", user("active", future), "paid"],
  ["trialing + future period", user("trialing", future), "trialing"],
  ["comped, no subscription at all", user(null, null, future), "paid"],
  ["comped AND trialing -> comp wins", user("trialing", future, future), "paid"],
  ["no status", user(null, null), "none"],
  ["past_due", user("past_due", future), "none"],
  ["canceled", user("canceled", future), "none"],
  ["incomplete", user("incomplete", future), "none"],
  ["active but NO period end", user("active", null), "none"],
  ["expired comp falls through", user(null, null, past), "none"],
] as const) {
  const got = getAccessLevel(u);
  check(`${label} -> "${want}"`, got === want, got !== want ? `got "${got}"` : "");
}

// -------------------------------------------- 2. expired period end is none -
console.log("\n2. an expired period end is \"none\" for every status");
for (const status of ["active", "trialing", "past_due", "canceled"]) {
  const got = getAccessLevel(user(status, past));
  check(`"${status}" + expired period -> "none"`, got === "none", `got "${got}"`);
}

// ------------------------------------------------------ 3. paid: unlimited --
console.log("\n3. paid is unlimited and never spends a credit");
const paid = decideAIAccess({ billingEnabled: true, level: "paid" });
check("paid is allowed", paid.ok === true);
check(
  "paid reports unlimited (remaining === null)",
  paid.ok === true && paid.remaining === null,
  paid.ok === true ? String(paid.remaining) : "refused",
);
check("paid reports plan PRO", paid.ok === true && paid.plan === "PRO");
// The counter is never consulted for a paid user: decideAIAccess is given no
// claim at all and must still allow. If it ever required one, this throws/fails.
check(
  "paid decided without any claim object",
  decideAIAccess({ billingEnabled: true, level: "paid" }).ok === true,
);

// ------------------------------------------- 4. trialing: exactly 5 then no -
console.log(`\n4. trialing is allowed exactly ${TRIAL_AI_CALL_LIMIT}, refused on the next`);
let counter = 0;
const results: Array<{ ok: boolean; remaining: number | null; code?: string }> = [];
for (let attempt = 1; attempt <= TRIAL_AI_CALL_LIMIT + 3; attempt++) {
  // Mirrors the atomic UPDATE: claim only if under the limit, then increment.
  const claimed = canClaimTrialCredit(counter);
  if (claimed) counter++;
  const r = decideAIAccess({
    billingEnabled: true,
    level: "trialing",
    claim: { claimed, used: counter },
  });
  results.push({
    ok: r.ok,
    remaining: r.ok ? r.remaining : null,
    code: r.ok ? undefined : r.code,
  });
}
const allowed = results.filter((r) => r.ok).length;
check(
  `exactly ${TRIAL_AI_CALL_LIMIT} calls allowed`,
  allowed === TRIAL_AI_CALL_LIMIT,
  `allowed ${allowed}`,
);
check(
  `call ${TRIAL_AI_CALL_LIMIT + 1} refused with TRIAL_AI_LIMIT_REACHED`,
  results[TRIAL_AI_CALL_LIMIT].ok === false &&
    results[TRIAL_AI_CALL_LIMIT].code === "TRIAL_AI_LIMIT_REACHED",
  results[TRIAL_AI_CALL_LIMIT].code ?? "allowed",
);
check(
  "further calls stay refused (no wrap-around)",
  results.slice(TRIAL_AI_CALL_LIMIT).every((r) => !r.ok),
);
check(
  "remaining counts down 4,3,2,1,0",
  JSON.stringify(results.slice(0, TRIAL_AI_CALL_LIMIT).map((r) => r.remaining)) ===
    JSON.stringify([4, 3, 2, 1, 0]),
  JSON.stringify(results.slice(0, TRIAL_AI_CALL_LIMIT).map((r) => r.remaining)),
);
check("counter never exceeds the limit", counter === TRIAL_AI_CALL_LIMIT, String(counter));

// A burst that all read the same stale value must still not over-spend: the
// claim rule is evaluated per attempt against the live counter, never cached.
let burst = 0;
let burstAllowed = 0;
for (let i = 0; i < 50; i++) {
  if (canClaimTrialCredit(burst)) {
    burst++;
    burstAllowed++;
  }
}
check(
  `50 rapid attempts still yield only ${TRIAL_AI_CALL_LIMIT}`,
  burstAllowed === TRIAL_AI_CALL_LIMIT,
  `allowed ${burstAllowed}`,
);

// -------------------------------------------------------- 5. none refused ---
console.log("\n5. no subscription -> refused with PRO_REQUIRED");
const none = decideAIAccess({ billingEnabled: true, level: "none" });
check("none is refused", none.ok === false);
check(
  "code is PRO_REQUIRED",
  none.ok === false && none.code === "PRO_REQUIRED",
  none.ok === false ? none.code ?? "(none)" : "allowed",
);

// ------------------------------------------------ 6. escape hatch is intact -
console.log("\n6. billing disabled leaves AI open (dry-run escape hatch)");
for (const level of [null, "none", "trialing", "paid"] as Array<AccessLevel | null>) {
  const r = decideAIAccess({ billingEnabled: false, level });
  check(`billing off + level ${String(level)} -> allowed`, r.ok === true);
}
check(
  "billing off reports plan FREE, unlimited",
  (() => {
    const r = decideAIAccess({ billingEnabled: false, level: "none" });
    return r.ok === true && r.plan === "FREE" && r.remaining === null;
  })(),
);

// ------------------------------------------------- 7. messages stay distinct -
console.log("\n7. the two refusal messages are distinct and correctly aimed");
check(
  "exhausted-trial message does NOT tell the user to start a trial",
  !/start (your )?7-day|start your trial/i.test(TRIAL_EXHAUSTED_MESSAGE),
  TRIAL_EXHAUSTED_MESSAGE,
);
check(
  "no-subscription message DOES invite the trial",
  /7-day free trial/i.test(PRO_REQUIRED_MESSAGE),
  PRO_REQUIRED_MESSAGE,
);
// Widened to string on purpose: as const-literals TypeScript can see these two
// are different and rejects the comparison as unintentional. The check still
// earns its place at runtime — it fails the build if someone ever collapses the
// two messages into one shared string, which is the exact regression section 7
// exists to prevent.
check(
  "the two messages differ",
  (TRIAL_EXHAUSTED_MESSAGE as string) !== (PRO_REQUIRED_MESSAGE as string),
);
check(
  `exhausted message states the real limit (${TRIAL_AI_CALL_LIMIT})`,
  TRIAL_EXHAUSTED_MESSAGE.includes(String(TRIAL_AI_CALL_LIMIT)),
  TRIAL_EXHAUSTED_MESSAGE,
);

// ------------------------------------------------------ 9. owner access -----
console.log("\n9. the owner has complete access, with no subscription of any kind");
for (const [label, u] of [
  ["owner + NO subscription at all", owner()],
  ["owner + trialing (owner wins over the 5-call cap)", owner("trialing", future)],
  ["owner + EXPIRED subscription", owner("active", past)],
  ["owner + canceled", owner("canceled", past)],
  ["owner + expired comp", owner(null, null, past)],
] as const) {
  check(`${label} -> "paid"`, getAccessLevel(u, stubIsOwner) === "paid", getAccessLevel(u, stubIsOwner));
  check(`${label} -> hasFullAccess`, hasFullAccess(u, stubIsOwner));
}

// Unlimited means the counter is never consulted. decideAIAccess is handed NO
// claim object for a paid level, so if the owner path ever started metering,
// this would stop returning unlimited.
const ownerDecision = decideAIAccess({
  billingEnabled: true,
  level: getAccessLevel(owner(), stubIsOwner),
});
check(
  "owner AI is unlimited (remaining === null, no counter increment)",
  ownerDecision.ok === true && ownerDecision.remaining === null,
  ownerDecision.ok === true ? String(ownerDecision.remaining) : "refused",
);

console.log("\n   non-owners are completely unaffected by the owner rule");
for (const [label, u, want] of [
  ["non-owner trialing still trialing", user("trialing", future), "trialing"],
  ["non-owner active still paid", user("active", future), "paid"],
  ["non-owner no-sub still none", user(null, null), "none"],
  ["non-owner expired still none", user("active", past), "none"],
] as const) {
  check(`${label} -> "${want}"`, getAccessLevel(u, stubIsOwner) === want, getAccessLevel(u, stubIsOwner));
}
check(
  "a non-owner does NOT get hasFullAccess without a subscription",
  hasFullAccess(user(null, null), stubIsOwner) === false,
);
check(
  "hasFullAccess still true for an ordinary active subscriber",
  hasFullAccess(user("active", future), stubIsOwner) === true,
);

// --------------------------------- 8. the pure rule matches the real query ---
console.log("\n8. the live Prisma claim still matches the rule tested above");
const src = readFileSync(new URL("../src/lib/ai/access.ts", import.meta.url), "utf8");
check(
  "requireAIAccess uses updateMany (atomic check-and-increment)",
  /prisma\.user\.updateMany\(/.test(src),
);
check(
  "its WHERE filters on aiCallsThisMonth < TRIAL_AI_CALL_LIMIT",
  /aiCallsThisMonth:\s*\{\s*lt:\s*TRIAL_AI_CALL_LIMIT\s*\}/.test(src),
);
check(
  "it increments rather than writing an absolute value",
  /aiCallsThisMonth:\s*\{\s*increment:\s*1\s*\}/.test(src),
);
check(
  "the claim is rejected unless exactly one row was updated",
  /claimed\.count\s*!==\s*1/.test(src),
);
check(
  "no hardcoded numeric limit in the query (must use the constant)",
  !/aiCallsThisMonth:\s*\{\s*lt:\s*\d+\s*\}/.test(src),
);


// --------------- 10. EVERY model-caller is gated (the structural check) ------
//
// WHY THIS EXISTS. /api/ai and /resume-score were both ungated paths to a paid
// model, and both were found BY ACCIDENT, one at a time, weeks apart. A third
// would have been found the same way. Enumerating callers turns "did anyone
// remember to gate it" from a habit into a build failure.
//
// It walks src/ with fs only — no DB, no network — so it stays safe in prebuild.
console.log("\n10. every module that calls a model also imports the access gate");

const SRC_ROOT = new URL("../src/", import.meta.url);

// Modules that legitimately touch the model API WITHOUT importing the gate.
// Anything not listed here MUST import it, or the build fails.
const GATE_EXEMPT: Record<string, string> = {
  "lib/ai/anthropic-client.ts":
    "the shared client itself — it is what gated callers call; gating it here would be circular",
};

// A file "calls a model" if it does any of these.
const CALLS_MODEL = [
  /ANTHROPIC_API_KEY/,
  /api\.anthropic\.com/,
  /getAnthropicClient\s*\(/,
  /new\s+Anthropic\s*\(/,
  /@anthropic-ai\/sdk/,
];
// Must be a REAL import statement from the gate module, not merely the string
// appearing somewhere. The first version of this matched /require(AIAccess)/
// anywhere in the file, so deleting the import left the call site and the
// surrounding comments still matching and the check stayed green through the
// sabotage. A detector that a comment can satisfy is not a detector.
const IMPORTS_GATE =
  /import\s*\{[^}]*require(?:AIAccess|ProAccess)[^}]*\}\s*from\s*["']@\/lib\/ai\/access["']/;

function walk(dir: URL, rel = ""): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const childRel = rel ? `${rel}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      out.push(...walk(new URL(`${entry.name}/`, dir), childRel));
    } else if (/\.(ts|tsx)$/.test(entry.name)) {
      out.push(childRel);
    }
  }
  return out;
}

const allFiles = walk(SRC_ROOT);
const modelCallers: string[] = [];
const ungated: string[] = [];

for (const rel of allFiles) {
  const body = readFileSync(new URL(rel, SRC_ROOT), "utf8");
  if (!CALLS_MODEL.some((re) => re.test(body))) continue;
  modelCallers.push(rel);
  if (rel in GATE_EXEMPT) continue;
  if (!IMPORTS_GATE.test(body)) ungated.push(rel);
}

console.log(`     scanned ${allFiles.length} files · ${modelCallers.length} touch the model API`);
for (const rel of modelCallers) {
  const why = GATE_EXEMPT[rel];
  console.log(`       ${why ? "exempt " : "gated  "} ${rel}${why ? `  — ${why}` : ""}`);
}
check(
  "every model-calling module imports the access gate (or is an explained exemption)",
  ungated.length === 0,
  ungated.length ? `UNGATED: ${ungated.join(", ")}` : "",
);
// An exemption for a file that no longer exists is a stale excuse — fail on it
// so the allowlist cannot quietly outlive its reason.
const staleExempt = Object.keys(GATE_EXEMPT).filter((f) => !modelCallers.includes(f));
check(
  "no stale entries in the exemption allowlist",
  staleExempt.length === 0,
  staleExempt.length ? `stale: ${staleExempt.join(", ")}` : "",
);

// ------------------------------------------------------------------ result --
console.log(
  `\n${failures === 0 ? "AI GATE: PASS" : `AI GATE: FAIL (${failures} failing assertion${failures === 1 ? "" : "s"})`}\n`,
);
process.exit(failures === 0 ? 0 : 1);
