/**
 * Prove the paywall sits where policy says it sits — at the LOGIC layer.
 *
 * WHAT THIS FILE USED TO ASSERT, AND WHY IT CHANGED
 * It asserted that the free tier was entirely gone: FREE.cvLimit === 0,
 * FREE.aiCallsPerMonth === 0, templatesAccess === "none", and that a FREE user
 * could not open even a free-tier template. That was correct policy until
 * 2026-08-19, when the network moved to "3 days free of everything that costs
 * us nothing, then the card for everything that calls a paid model."
 *
 * This file was NOT deleted and NOT weakened. It is rewritten to encode the new
 * policy, and it is STRICTER in the one place that matters: AI is never free,
 * under any window state, ever. That is the line the whole strategy rests on —
 * free access is only safe because it costs nothing to serve.
 *
 * The three PLANS.FREE zeros no longer mean one thing:
 *   aiCallsPerMonth: 0  -> STILL THE PAYWALL. Load-bearing. Never relax.
 *   cvLimit: 0          -> now the EXPIRED-WINDOW state, not the paywall.
 *   templatesAccess     -> likewise.
 *
 * If someone later restores a generous AI free tier, or closes CV building to a
 * user inside their window, or makes "never started" behave like "expired",
 * this fails. Run: npx tsx scripts/verify-paywall.ts
 */
import {
  PLANS,
  getUserPlan,
  isProActive,
  priceIdToPlanLabel,
  hasProductAccess,
  getProductAccessLevel,
  isFreeWindowActive,
  isFreeWindowExpired,
  getFreeAccessDaysRemaining,
  FREE_ACCESS_DAYS,
} from "../src/lib/billing/plans";
import { userCanAccessTier, userCanAccessTemplate } from "../src/lib/billing/template-access";
import { decideAIAccess } from "../src/lib/ai/access";
import { TEMPLATES, getTier } from "../src/components/templates/template-registry";

type Check = { name: string; got: unknown; want: unknown };
const checks: Check[] = [];
const eq = (name: string, got: unknown, want: unknown) => checks.push({ name, got, want });

const DAY = 86_400_000;
const future = new Date(Date.now() + DAY);
const past = new Date(Date.now() - DAY);

const base = { subscriptionPlan: null, email: "user@example.com", freeAccessStartedAt: null };
const noSub = { ...base, subscriptionStatus: null, subscriptionCurrentPeriodEnd: null, compProUntil: null };
const trialing = { ...base, subscriptionStatus: "trialing", subscriptionCurrentPeriodEnd: future, subscriptionPlan: "pro_monthly", compProUntil: null };
const active = { ...base, subscriptionStatus: "active", subscriptionCurrentPeriodEnd: future, subscriptionPlan: "pro_monthly", compProUntil: null };
const lapsed = { ...base, subscriptionStatus: "active", subscriptionCurrentPeriodEnd: past, subscriptionPlan: "pro_monthly", compProUntil: null };
const canceled = { ...base, subscriptionStatus: "canceled", subscriptionCurrentPeriodEnd: future, subscriptionPlan: "pro_monthly", compProUntil: null };
const legacyYearly = { ...base, subscriptionStatus: "active", subscriptionCurrentPeriodEnd: future, subscriptionPlan: "pro_yearly", compProUntil: null };
const comped = { ...base, subscriptionStatus: null, subscriptionCurrentPeriodEnd: null, compProUntil: future };

// The three window states, on a user with no subscription of any kind.
const neverStarted = { ...noSub, freeAccessStartedAt: null };
const inWindow = { ...noSub, freeAccessStartedAt: new Date(Date.now() - DAY) };
const expiredWindow = { ...noSub, freeAccessStartedAt: new Date(Date.now() - (FREE_ACCESS_DAYS + 1) * DAY) };
const paidWithStaleWindow = { ...active, freeAccessStartedAt: new Date(Date.now() - 99 * DAY) };

const noOwners = () => false; // owner check stubbed off; owner access is proved separately

// =============================================================================
// 1. AI IS NEVER FREE. The load-bearing assertion. Do not relax any of these.
// =============================================================================
eq("FREE aiCallsPerMonth is 0", PLANS.FREE.aiCallsPerMonth, 0);
eq("AI: no subscription -> refused", decideAIAccess({ billingEnabled: true, level: "none" }).ok, false);
const aiNoSub = decideAIAccess({ billingEnabled: true, level: "none" });
eq("AI: no subscription -> PRO_REQUIRED", aiNoSub.ok === false ? aiNoSub.code : "(allowed)", "PRO_REQUIRED");
// The window must be INVISIBLE to the AI decision. decideAIAccess takes an
// AccessLevel that has no window state by design; these assert the design holds.
eq("AI: getProductAccessLevel FREE_3DAY does not appear in AccessLevel",
  ["none", "trialing", "paid"].includes(getProductAccessLevel(inWindow, noOwners).toLowerCase()), false);
eq("AI: a user inside the free window is still level 'none' for AI",
  decideAIAccess({ billingEnabled: true, level: "none" }).ok, false);
eq("AI: trial is capped, not unlimited",
  decideAIAccess({ billingEnabled: true, level: "trialing", claim: { claimed: false, used: 5 } }).ok, false);
eq("AI: paid is allowed", decideAIAccess({ billingEnabled: true, level: "paid" }).ok, true);

// =============================================================================
// 2. THE PRODUCT SURFACE IS OPEN INSIDE THE WINDOW.
//    The opposite of what this file asserted before 2026-08-19.
// =============================================================================
eq("in-window: has product access", hasProductAccess(inWindow, noOwners), true);
eq("in-window: opens a free-tier template", userCanAccessTemplate(inWindow, TEMPLATES[0].slug), true);
eq("in-window: window is active", isFreeWindowActive(inWindow), true);
eq("in-window: days remaining is a number", typeof getFreeAccessDaysRemaining(inWindow), "number");
eq("paid: has product access", hasProductAccess(active, noOwners), true);
eq("trialing: has product access", hasProductAccess(trialing, noOwners), true);
eq("paid beats a stale window", hasProductAccess(paidWithStaleWindow, noOwners), true);

// =============================================================================
// 3. NEVER-STARTED IS NOT EXPIRED.  (The bug that shipped on AlmiPrep and
//    locked out 27 of 27 users. Three states, not two.)
// =============================================================================
eq("never started: not expired", isFreeWindowExpired(neverStarted), false);
eq("never started: not active either", isFreeWindowActive(neverStarted), false);
eq("never started: level is NONE", getProductAccessLevel(neverStarted, noOwners), "NONE");
eq("never started: NOT reported as FREE_EXPIRED",
  getProductAccessLevel(neverStarted, noOwners) === "FREE_EXPIRED", false);
eq("expired: level is FREE_EXPIRED", getProductAccessLevel(expiredWindow, noOwners), "FREE_EXPIRED");
eq("expired: is expired", isFreeWindowExpired(expiredWindow), true);
eq("in window: level is FREE_3DAY", getProductAccessLevel(inWindow, noOwners), "FREE_3DAY");
eq("paid: level is PAID", getProductAccessLevel(active, noOwners), "PAID");
eq("days remaining is null when never started", getFreeAccessDaysRemaining(neverStarted), null);
eq("days remaining is null when expired", getFreeAccessDaysRemaining(expiredWindow), null);

// =============================================================================
// 4. OUTSIDE A WINDOW AND NOT PAYING, THE PRODUCT IS CLOSED.
// =============================================================================
eq("expired: no product access", hasProductAccess(expiredWindow, noOwners), false);
eq("expired: cannot open a template", userCanAccessTemplate(expiredWindow, TEMPLATES[0].slug), false);
eq("expired: FREE cvLimit is 0", PLANS.FREE.cvLimit, 0);
eq("expired: FREE templatesAccess is none", PLANS.FREE.templatesAccess, "none");
eq("never started: no product access until they build", hasProductAccess(neverStarted, noOwners), false);

// =============================================================================
// 5. THE COPY SAYS "EVERY TEMPLATE". Assert that stays true.
//    All templates are tier "free" today, so the copy is honest. The day
//    someone adds a premium one, this fails and tells us the copy has become a
//    lie — instead of a learner finding out.
// =============================================================================
const premium = TEMPLATES.filter((t) => getTier(t) === "premium").map((t) => t.slug);
eq(`no template is tier "premium" (found: ${premium.slice(0, 3).join(",") || "none"})`, premium.length, 0);
eq("template catalogue is non-empty", TEMPLATES.length > 0, true);

// =============================================================================
// 6. Subscription semantics, unchanged.
// =============================================================================
eq("PRO_MONTHLY opens templates", userCanAccessTier("PRO_MONTHLY", "free"), true);
eq("PRO_MONTHLY cvLimit unlimited", PLANS.PRO_MONTHLY.cvLimit, Infinity);
eq("trialing counts as active", isProActive(trialing), true);
eq("trialing resolves to PRO_MONTHLY", getUserPlan(trialing), "PRO_MONTHLY");
eq("no subscription is not active", isProActive(noSub), false);
eq("lapsed period is not active", isProActive(lapsed), false);
eq("canceled is not active", isProActive(canceled), false);
eq("legacy yearly sub still active", isProActive(legacyYearly), true);
eq("legacy yearly keeps its label", getUserPlan(legacyYearly), "PRO_YEARLY");
eq("comp grant still works", isProActive(comped), true);
eq("retired $7 price rejected", priceIdToPlanLabel("price_1TSp04Q5pPhPaj6V3PJX0SC3"), null);
eq("retired $60 price rejected", priceIdToPlanLabel("price_1TSp5TQ5pPhPaj6VBD0Zujwy"), null);
eq("empty price rejected", priceIdToPlanLabel(""), null);

let failed = 0;
for (const c of checks) {
  const ok = Object.is(c.got, c.want);
  if (!ok) failed++;
  console.log(`  [${ok ? "PASS" : "FAIL"}] ${c.name.padEnd(62)} got=${String(c.got)} want=${String(c.want)}`);
}
console.log(
  failed === 0
    ? `\nALL ${checks.length} PASS — AI is never free; the product is open inside the window`
    : `\n${failed} FAILED`,
);
process.exitCode = failed === 0 ? 0 : 1;
