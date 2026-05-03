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

/**
 * Returns true when the user has a paid (or trialing) subscription that is
 * still inside its current period. Past-due / canceled / incomplete fall
 * through to false even if subscriptionPlan is set.
 */
export function isProActive(user: Pick<
  User,
  "subscriptionStatus" | "subscriptionCurrentPeriodEnd"
>): boolean {
  if (!user.subscriptionStatus) return false;
  if (!ACTIVE_STATUSES.has(user.subscriptionStatus)) return false;
  if (!user.subscriptionCurrentPeriodEnd) return false;
  return user.subscriptionCurrentPeriodEnd.getTime() > Date.now();
}

export function getUserPlan(user: Pick<
  User,
  "subscriptionStatus" | "subscriptionCurrentPeriodEnd" | "subscriptionPlan"
>): PlanKey {
  if (!isProActive(user)) return "FREE";
  if (user.subscriptionPlan === "pro_yearly") return "PRO_YEARLY";
  if (user.subscriptionPlan === "pro_monthly") return "PRO_MONTHLY";
  // Defensive default — if status says active but plan is unknown, treat as monthly.
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
