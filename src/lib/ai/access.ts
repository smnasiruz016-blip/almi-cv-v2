import { prisma } from "@/lib/db";
import { isBillingEnabled, isProActive, PLANS } from "@/lib/billing/plans";

const RESET_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;

export type AIAccessResult =
  | { ok: true; plan: "FREE" | "PRO" }
  | {
      ok: false;
      error: string;
      reason: "limit" | "not_pro" | "auth";
      code?: "AI_LIMIT_REACHED" | "PRO_REQUIRED";
    };

/**
 * Gate every AI server action. Counts on call (not on success) — failed
 * AI calls still consume quota. Trade-off accepted: simpler code, no
 * race conditions, no need to instrument every AI feature file. If users
 * complain post-launch we can manually restore counts.
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

  // Dry-run mode: billing not yet enabled → don't enforce caps.
  // Otherwise existing free users would silently get throttled to 5
  // AI calls / 30 days with no upgrade path until launch day.
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
      aiCallsThisMonth: true,
      aiCallsResetAt: true,
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

  // Free tier: rolling 30-day window.
  const now = Date.now();
  const needsReset =
    !user.aiCallsResetAt ||
    now - user.aiCallsResetAt.getTime() > RESET_WINDOW_MS;

  const currentCount = needsReset ? 0 : user.aiCallsThisMonth;
  const limit = PLANS.FREE.aiCallsPerMonth;

  if (currentCount >= limit) {
    return {
      ok: false,
      error: `You have used all ${limit} free AI calls this month. Upgrade to Pro for unlimited AI.`,
      reason: "limit",
      code: "AI_LIMIT_REACHED",
    };
  }

  // Increment in the same write that resets the window if needed.
  await prisma.user.update({
    where: { id: userId },
    data: needsReset
      ? { aiCallsThisMonth: 1, aiCallsResetAt: new Date() }
      : { aiCallsThisMonth: { increment: 1 } },
  });

  return { ok: true, plan: "FREE" };
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
