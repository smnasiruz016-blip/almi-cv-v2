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
  templatesAccess: "free_only" | "all";
};

export const PLANS: Record<PlanKey, PlanConfig> = {
  FREE: {
    cvLimit: 3,
    aiCallsPerMonth: 5,
    templatesAccess: "free_only",
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
  FREE: "Free",
  PRO_MONTHLY: "Pro",
  // Legacy label — only ever shown to subscribers who bought the retired
  // yearly plan before the move to a single $12/month price.
  PRO_YEARLY: "Pro Yearly (legacy)",
};

const ACTIVE_STATUSES = new Set(["trialing", "active"]);

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
