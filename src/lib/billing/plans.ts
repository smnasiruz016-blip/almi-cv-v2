import type { User } from "@prisma/client";

// Stripe Price IDs — pinned to Live mode prices created out-of-band.
// Server-side validated; never trust a priceId coming from the browser.
export const STRIPE_PRICES = {
  PRO_MONTHLY: "price_1TSp04Q5pPhPaj6V3PJX0SC3",
  PRO_YEARLY: "price_1TSp5TQ5pPhPaj6VBD0Zujwy",
} as const;

export type StripePriceId =
  (typeof STRIPE_PRICES)[keyof typeof STRIPE_PRICES];

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
    cvLimit: 10,
    aiCallsPerMonth: Infinity,
    templatesAccess: "all",
  },
  PRO_YEARLY: {
    cvLimit: 10,
    aiCallsPerMonth: Infinity,
    templatesAccess: "all",
  },
};

export const PLAN_DISPLAY_NAME: Record<PlanKey, string> = {
  FREE: "Free",
  PRO_MONTHLY: "Pro Monthly",
  PRO_YEARLY: "Pro Yearly",
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
): "pro_monthly" | "pro_yearly" | null {
  if (priceId === STRIPE_PRICES.PRO_MONTHLY) return "pro_monthly";
  if (priceId === STRIPE_PRICES.PRO_YEARLY) return "pro_yearly";
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
  return process.env.NEXT_PUBLIC_BILLING_ENABLED === "true";
}
