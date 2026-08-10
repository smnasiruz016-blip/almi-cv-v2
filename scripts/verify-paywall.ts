/**
 * Prove the free tier is actually gone at the LOGIC layer.
 *
 * The pricing page no longer offers a $0 card, but a deleted card is only copy.
 * What actually stops a non-subscriber is these three gates:
 *
 *   PLANS.FREE.cvLimit          -> createResume() refuses at 0
 *   PLANS.FREE.aiCallsPerMonth  -> requireAIAccess() has no quota path left
 *   userCanAccessTier(...)      -> every template, both tiers, needs a sub
 *
 * If someone later "restores" a generous free tier by editing plans.ts, this
 * fails. Run: npx tsx scripts/verify-paywall.ts
 */
import { PLANS, getUserPlan, isProActive, priceIdToPlanLabel } from "../src/lib/billing/plans";
import { userCanAccessTier } from "../src/lib/billing/template-access";

type Check = { name: string; got: unknown; want: unknown };
const checks: Check[] = [];
const eq = (name: string, got: unknown, want: unknown) => checks.push({ name, got, want });

const future = new Date(Date.now() + 86_400_000);
const past = new Date(Date.now() - 86_400_000);
const noSub = { subscriptionStatus: null, subscriptionCurrentPeriodEnd: null, subscriptionPlan: null, compProUntil: null };
const trialing = { subscriptionStatus: "trialing", subscriptionCurrentPeriodEnd: future, subscriptionPlan: "pro_monthly", compProUntil: null };
const active = { subscriptionStatus: "active", subscriptionCurrentPeriodEnd: future, subscriptionPlan: "pro_monthly", compProUntil: null };
const lapsed = { subscriptionStatus: "active", subscriptionCurrentPeriodEnd: past, subscriptionPlan: "pro_monthly", compProUntil: null };
const canceled = { subscriptionStatus: "canceled", subscriptionCurrentPeriodEnd: future, subscriptionPlan: "pro_monthly", compProUntil: null };
const legacyYearly = { subscriptionStatus: "active", subscriptionCurrentPeriodEnd: future, subscriptionPlan: "pro_yearly", compProUntil: null };
const comped = { subscriptionStatus: null, subscriptionCurrentPeriodEnd: null, subscriptionPlan: null, compProUntil: future };

// --- the free tier grants nothing -------------------------------------------
eq("FREE cvLimit is 0", PLANS.FREE.cvLimit, 0);
eq("FREE aiCallsPerMonth is 0", PLANS.FREE.aiCallsPerMonth, 0);
eq("FREE templatesAccess is none", PLANS.FREE.templatesAccess, "none");
eq("FREE cannot open a FREE-tier template", userCanAccessTier("FREE", "free"), false);
eq("FREE cannot open a premium template", userCanAccessTier("FREE", "premium"), false);

// --- a subscriber (and a trialler) gets everything ---------------------------
eq("PRO_MONTHLY opens free-tier templates", userCanAccessTier("PRO_MONTHLY", "free"), true);
eq("PRO_MONTHLY opens premium templates", userCanAccessTier("PRO_MONTHLY", "premium"), true);
eq("PRO_MONTHLY cvLimit unlimited", PLANS.PRO_MONTHLY.cvLimit, Infinity);
eq("trialing counts as active", isProActive(trialing), true);
eq("trialing resolves to PRO_MONTHLY", getUserPlan(trialing), "PRO_MONTHLY");
eq("active counts as active", isProActive(active), true);

// --- everyone else is refused ------------------------------------------------
eq("no subscription is not active", isProActive(noSub), false);
eq("no subscription resolves to FREE", getUserPlan(noSub), "FREE");
eq("lapsed period is not active", isProActive(lapsed), false);
eq("canceled is not active", isProActive(canceled), false);

// --- grandfathering ----------------------------------------------------------
eq("legacy yearly sub still active", isProActive(legacyYearly), true);
eq("legacy yearly keeps its label", getUserPlan(legacyYearly), "PRO_YEARLY");
eq("legacy yearly opens premium templates", userCanAccessTier("PRO_YEARLY", "premium"), true);
eq("comp grant still works", isProActive(comped), true);

// --- only the $12 price is purchasable ---------------------------------------
eq("retired $7 price rejected", priceIdToPlanLabel("price_1TSp04Q5pPhPaj6V3PJX0SC3"), null);
eq("retired $60 price rejected", priceIdToPlanLabel("price_1TSp5TQ5pPhPaj6VBD0Zujwy"), null);
eq("empty price rejected", priceIdToPlanLabel(""), null);

let failed = 0;
for (const c of checks) {
  const ok = Object.is(c.got, c.want);
  if (!ok) failed++;
  console.log(`  [${ok ? "PASS" : "FAIL"}] ${c.name.padEnd(42)} got=${String(c.got)} want=${String(c.want)}`);
}
console.log(failed === 0 ? `\nALL ${checks.length} PASS — free tier is gone` : `\n${failed} FAILED`);
process.exitCode = failed === 0 ? 0 : 1;
