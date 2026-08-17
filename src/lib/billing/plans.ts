import type { User } from "@prisma/client";

// AlmiCV is on the family standard: ONE price, $12/month, 7-day card-upfront
// trial. The old $7/month + $60/year pair is retired.
//
// The price ID now comes from env like every other product in the family. It
// used to be a hardcoded live `price_…` string, which meant a price change
// required a code change — exactly the trap that lets displayed copy and the
// real Stripe price drift apart. `scripts/verify-stripe-price.mjs` asserts the
// configured price really is $12/month recurring; `npm run verify:price`.
export const STRIPE_PRICE_MONTHLY = process.env.STRIPE_PRICE_ID_MONTHLY ?? "";

/** Single source of truth for every "$12" that appears in copy. */
export const MONTHLY_PRICE_DISPLAY = "$12";
/** What verify-stripe-price asserts against the live Stripe price object. */
export const MONTHLY_PRICE_CENTS = 1200;

export type StripePriceId = string;

// PRO_YEARLY is no longer purchasable — it is kept ONLY so existing yearly
// subscribers keep Pro access and keep seeing a correct plan name on /account.
// Nothing offers it for sale: it is absent from the checkout allowlist and
// from the pricing page. Do not reintroduce it as a buyable plan.
export type PlanKey = "FREE" | "PRO_MONTHLY" | "PRO_YEARLY";

export type PlanConfig = {
  cvLimit: number;
  aiCallsPerMonth: number;
  templatesAccess: "none" | "all";
};

// FREE is no longer a PLAN. It is the name of the no-subscription state:
// signed up, trial not started (or lapsed/cancelled). It grants nothing --
// every number here is 0 and templatesAccess is "none". The single plan is
// $12/month with a 7-day card-upfront trial; `trialing` counts as PRO_MONTHLY
// via isProActive(), so a trialling user gets the full product from minute one.
//
// Do NOT restore non-zero values here to "be generous" -- these zeros ARE the
// paywall. Every gate (AI, templates, CV creation) reads them.
export const PLANS: Record<PlanKey, PlanConfig> = {
  FREE: {
    cvLimit: 0,
    aiCallsPerMonth: 0,
    templatesAccess: "none",
  },
  PRO_MONTHLY: {
    cvLimit: Infinity, // unlimited CVs on Pro (count >= Infinity is never true)
    aiCallsPerMonth: Infinity,
    templatesAccess: "all",
  },
  PRO_YEARLY: {
    cvLimit: Infinity, // unlimited CVs on Pro
    aiCallsPerMonth: Infinity,
    templatesAccess: "all",
  },
};

export const PLAN_DISPLAY_NAME: Record<PlanKey, string> = {
  FREE: "No active plan",
  PRO_MONTHLY: "Pro",
  // Legacy label — only ever shown to subscribers who bought the retired
  // yearly plan before the move to a single $12/month price.
  PRO_YEARLY: "Pro Yearly (legacy)",
};

/**
 * The Stripe subscription statuses that grant access. THE single definition.
 *
 * This lived in four places — here, the admin accounts page (as an array), the
 * account sync action, and the Stripe webhook — each an independent
 * `["trialing", "active"]`. They agreed, which is exactly what makes that shape
 * dangerous: nothing fails when one of them is edited and the others are not,
 * and the first symptom is an admin screen showing "Pro" for a user the product
 * refuses to let in.
 *
 * Exported as a Set so membership tests stay O(1) and read as `.has(status)`;
 * spread it (`[...ACTIVE_STATUSES]`) where Prisma wants an array for `in`.
 *
 * NOTE FOR ANY SQL THAT USES THIS: status alone is NOT the access rule.
 * isProActive() also requires `subscriptionCurrentPeriodEnd` in the future, so a
 * query filtering on status only will over-count. Mirror both clauses.
 */
export const ACTIVE_STATUSES: ReadonlySet<string> = new Set([
  "trialing",
  "active",
]);

type ProUserShape = Pick<
  User,
  "subscriptionStatus" | "subscriptionCurrentPeriodEnd" | "compProUntil"
>;

/**
 * True when the user has Pro access right now via either path:
 *   1. An owner-granted comp window (compProUntil > now), OR
 *   2. A paid/trialing Stripe subscription still inside its period.
 *
 * Comp short-circuits first so beta testers don't depend on Stripe state.
 * Past-due / canceled / incomplete subscriptions fall through to false.
 */
export function isProActive(user: ProUserShape): boolean {
  if (isComped(user)) return true;
  if (!user.subscriptionStatus) return false;
  if (!ACTIVE_STATUSES.has(user.subscriptionStatus)) return false;
  if (!user.subscriptionCurrentPeriodEnd) return false;
  return user.subscriptionCurrentPeriodEnd.getTime() > Date.now();
}

/**
 * How many AI calls a user gets during the 7-day trial. A "taste", not a tier:
 * the trial grants the FULL product for building, editing and downloading CVs
 * (isProActive stays true, so cvLimit and templates are untouched) — only AI
 * narrows, because AI is the one feature with a per-call vendor cost.
 */
export const TRIAL_AI_CALL_LIMIT = 5;

export type AccessLevel = "none" | "trialing" | "paid";

/**
 * Billing state as the AI gate needs it: the same question isProActive() asks,
 * but with `trialing` and `active` told apart instead of merged.
 *
 * Deliberately built ON TOP of isProActive() rather than beside it. isProActive
 * already owns the period-end rule and the comp short-circuit; re-deriving
 * either here would create a second date rule that drifts the first time one is
 * edited. So this function contributes exactly one new fact — which side of the
 * trial/paid line an already-active user is on — and borrows everything else.
 *
 * Consequence worth naming: a comped user reads "paid" and gets unlimited AI.
 * That is intended (comps are for beta testers and support), but it does mean a
 * comp grant is a real cost lever, not just a UI courtesy.
 */
export function getAccessLevel(user: ProUserShape): AccessLevel {
  // Comp first, matching isProActive's own ordering: a comped user is "paid"
  // even with no Stripe subscription at all (subscriptionStatus === null).
  if (isComped(user)) return "paid";

  // Not active by the shared rule -> no AI. This single call covers all three
  // "none" cases: no status, a non-active status (past_due/canceled/incomplete),
  // and an expired or missing period end — including an "active" status whose
  // period has run out.
  if (!isProActive(user)) return "none";

  // isProActive has now proved: status is in ACTIVE_STATUSES and the period end
  // is in the future. Only the trial/paid split is left to decide.
  return user.subscriptionStatus === "trialing" ? "trialing" : "paid";
}

/**
 * True when the user is on an active comp grant (compProUntil in the future).
 * Use this in the UI to distinguish comp users from real subscribers.
 */
export function isComped(user: Pick<User, "compProUntil">): boolean {
  if (!user.compProUntil) return false;
  return user.compProUntil.getTime() > Date.now();
}

/**
 * Whole days remaining on an active comp grant, or null if no active comp.
 * Rounds up so a window with <24h left still reads "1 day remaining".
 */
export function getCompProDaysRemaining(
  user: Pick<User, "compProUntil">,
): number | null {
  if (!user.compProUntil) return null;
  const ms = user.compProUntil.getTime() - Date.now();
  if (ms <= 0) return null;
  return Math.ceil(ms / (24 * 60 * 60 * 1000));
}

export function getUserPlan(user: Pick<
  User,
  "subscriptionStatus" | "subscriptionCurrentPeriodEnd" | "subscriptionPlan" | "compProUntil"
>): PlanKey {
  if (!isProActive(user)) return "FREE";
  if (user.subscriptionPlan === "pro_yearly") return "PRO_YEARLY";
  if (user.subscriptionPlan === "pro_monthly") return "PRO_MONTHLY";
  // Defensive default — if status says active but plan is unknown, OR the
  // user is comped (no subscriptionPlan), treat as monthly.
  return "PRO_MONTHLY";
}

/**
 * Convert a Stripe Price ID to our internal plan label. Server-side
 * validation: any priceId outside this map is rejected at the checkout API.
 */
export function priceIdToPlanLabel(
  priceId: string,
): "pro_monthly" | null {
  // Only the $12/month price is purchasable. The retired yearly price is
  // deliberately NOT accepted here, so a stale client that still posts the old
  // price ID gets rejected at checkout instead of quietly selling $60/year.
  if (priceId && priceId === STRIPE_PRICE_MONTHLY) return "pro_monthly";
  return null;
}

/**
 * Dry-run guard for live launch. When NEXT_PUBLIC_BILLING_ENABLED is
 * anything other than the literal string "true", the Stripe flow is
 * disabled in the UI and the checkout API returns 503 — but the webhook
 * endpoint still processes events so we can verify the integration end
 * to end with test transactions before flipping the flag.
 *
 * IMPORTANT: when billing is disabled, FREE-tier caps are also disabled.
 * Otherwise launching the dry-run flag would silently throttle existing
 * users to 5 AI calls / 3 CVs with no upgrade path. The cap only bites
 * once the upgrade path is live.
 */
export function isBillingEnabled(): boolean {
  // The price ID is now part of the condition. Before, billing could be "on"
  // with no configured price, which would 500 at checkout; now an unset price
  // simply keeps the flow disabled.
  //
  // NOTE: NEXT_PUBLIC_BILLING_ENABLED is inlined at BUILD time. Flipping it in
  // Vercel needs a fresh build to take effect.
  return (
    process.env.NEXT_PUBLIC_BILLING_ENABLED === "true" &&
    Boolean(STRIPE_PRICE_MONTHLY)
  );
}
