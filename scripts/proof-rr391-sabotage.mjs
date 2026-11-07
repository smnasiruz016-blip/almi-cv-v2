// RR-391 · each rule's proof must turn RED when the rule is broken. One sabotage per rule: break the source, run the
// offer proof (scripts/verify-paywall.ts), require exit != 0 AND a FAIL line naming that rule, restore the file
// byte-for-byte (checked), then the clean run must be GREEN again. No database, no network, no money.
// Run: node scripts/proof-rr391-sabotage.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const SABOTAGES = [
  { rule: "3 free CVs, the 4th refused", file: "src/lib/billing/plans.ts", from: "export const FREE_CV_LIMIT = 3;", to: "export const FREE_CV_LIMIT = 4;", fail: "is REFUSED the 4th" },
  { rule: "the count cannot be dodged by duplicating", file: "src/lib/resume-actions.ts", from: "const copy = await createCounted(user.id, await isCounted(user.id), {\n      userId: user.id,\n      title: `${source.title} (copy)`,", to: "const copy = await prisma.resume.create({ data: {\n      userId: user.id,\n      title: `${source.title} (copy)`,", fail: "every CV path creates through createCounted" },
  { rule: "a free delete never frees a place", file: "src/lib/resume-actions.ts", from: "if (await isCounted(user.id)) {", to: "if (false && await isCounted(user.id)) {", fail: "keeps an empty tombstone" },
  { rule: "AI refused on the server for a free user", file: "src/lib/ai/access.ts", from: 'if (input.level === "paid") {', to: 'if (input.level === "paid" || input.level === "none") {', fail: "AI refused for a free user" },
  { rule: "AI allowed for a subscriber", file: "src/lib/ai/access.ts", from: 'if (input.level === "paid") {', to: 'if (input.level === "paid" && false) {', fail: "AI allowed for a subscriber" },
  { rule: "no trial on a new checkout", file: "src/lib/billing/checkout-params.ts", from: "      metadata: { userId: input.userId, plan: input.planLabel },\n    },", to: "      metadata: { userId: input.userId, plan: input.planLabel },\n      trial_period_days: 7,\n    },", fail: "checkout: no trial_period_days" },
  { rule: "an existing trial left alone", file: "src/lib/billing/plans.ts", from: 'export const ACTIVE_STATUSES: ReadonlySet<string> = new Set([\n  "trialing",\n  "active",', to: 'export const ACTIVE_STATUSES: ReadonlySet<string> = new Set([\n  "active",', fail: "trialing is still Pro" },
  { rule: "an existing subscriber unchanged", file: "src/lib/billing/plans.ts", from: "export function canCreateCv(input: { fullAccess: boolean; lifetimeCount: number }): boolean {\n  return input.fullAccess || ", to: "export function canCreateCv(input: { fullAccess: boolean; lifetimeCount: number }): boolean {\n  return false && input.fullAccess || ", fail: "subscriber: never counted" },
];

const run = () => spawnSync("npx", ["tsx", "scripts/verify-paywall.ts"], { encoding: "utf8", shell: true });
const results = [];
for (const s of SABOTAGES) {
  const raw = readFileSync(s.file, "utf8");
  const crlf = raw.includes("\r\n");
  const lf = raw.replace(/\r\n/g, "\n");
  if (!lf.includes(s.from)) throw new Error(`${s.rule}: sabotage anchor not found in ${s.file}`);
  try {
    const bad = lf.replace(s.from, s.to);
    writeFileSync(s.file, crlf ? bad.replace(/\n/g, "\r\n") : bad);
    const r = run();
    const out = r.stdout + r.stderr;
    const red = r.status !== 0 && out.split("\n").some((l) => l.includes("[FAIL]") && l.includes(s.fail));
    results.push({ rule: s.rule, red, exit: r.status });
  } finally {
    writeFileSync(s.file, raw);
  }
  if (readFileSync(s.file, "utf8") !== raw) throw new Error(`${s.file} NOT restored`);
}
const clean = run();
const green = clean.status === 0 && /ALL \d+ PASS/.test(clean.stdout);
for (const r of results) console.log(`  [${r.red ? "RED as required" : "STAYED GREEN — PROOF IS BLIND"}] ${r.rule} (exit ${r.exit})`);
console.log(`  restored and clean run: ${green ? "GREEN" : "NOT GREEN"}`);
const ok = results.every((r) => r.red) && green;
console.log(ok ? `\nSABOTAGE PROOF PASS — ${results.length}/${results.length} rules turn RED when broken` : "\nSABOTAGE PROOF FAIL");
process.exitCode = ok ? 0 : 1;
