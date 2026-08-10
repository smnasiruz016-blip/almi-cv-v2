import { prisma } from "@/lib/db";
import { isBillingEnabled, isProActive } from "@/lib/billing/plans";

export type AIAccessResult =
  | { ok: true; plan: "FREE" | "PRO" }
  | {
      ok: false;
      error: string;
      reason: "limit" | "not_pro" | "auth";
      code?: "AI_LIMIT_REACHED" | "PRO_REQUIRED";
    };

/**
 * Gate every AI server action. There is no free quota any more: AI is
 * subscription-only, and `trialing` counts as active, so a user on the 7-day
 * card-upfront trial has full access from minute one.
 *
 * The old rolling 30-day counter (5 free calls) is gone along with the free
 * tier. aiCallsThisMonth / aiCallsResetAt are left on the User model and are
 * simply no longer written -- dropping columns is a separate migration and
 * would break nothing but is not worth coupling to a pricing change.
 */
export async function requireAIAccess(
  userId: string | null,
): Promise<AIAccessResult> {
  if (!userId) {
    return {
      ok: false,
      error: "Please sign in to use AI features.",
      reason: "auth",
    };
  }

  // Dry-run escape hatch: if billing is misconfigured (flag off or no price),
  // do not lock everyone out of a live product. This is the ONLY path to AI
  // without a subscription, and it is a config state, not a plan.
  if (!isBillingEnabled()) {
    return { ok: true, plan: "FREE" };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      subscriptionStatus: true,
      subscriptionCurrentPeriodEnd: true,
      subscriptionPlan: true,
      compProUntil: true,
    },
  });

  if (!user) {
    return {
      ok: false,
      error: "Account not found.",
      reason: "auth",
    };
  }

  if (isProActive(user)) {
    // Pro is unlimited per spec — no counter increment.
    return { ok: true, plan: "PRO" };
  }

  // No subscription, no trial: refuse. Callers surface this as an upgrade
  // prompt, never a crash -- existing free-tier users hit a paywall, not a 500.
  return {
    ok: false,
    error: "Start your 7-day free trial to use AI features.",
    reason: "not_pro",
    code: "PRO_REQUIRED",
  };
}

/**
 * Helper for features that should be Pro-only entirely (not just
 * quota-limited). Not currently wired into any feature — exposed for
 * future use (e.g., gating advanced translation, deep interview prep).
 */
export async function requireProAccess(
  userId: string | null,
): Promise<AIAccessResult> {
  if (!userId) {
    return {
      ok: false,
      error: "Please sign in to use this feature.",
      reason: "auth",
    };
  }

  if (!isBillingEnabled()) {
    return { ok: true, plan: "FREE" };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      subscriptionStatus: true,
      subscriptionCurrentPeriodEnd: true,
      subscriptionPlan: true,
      compProUntil: true,
    },
  });

  if (!user) {
    return { ok: false, error: "Account not found.", reason: "auth" };
  }

  if (isProActive(user)) {
    return { ok: true, plan: "PRO" };
  }

  return {
    ok: false,
    error: "This feature is available on Pro. Upgrade to unlock.",
    reason: "not_pro",
    code: "PRO_REQUIRED",
  };
}
