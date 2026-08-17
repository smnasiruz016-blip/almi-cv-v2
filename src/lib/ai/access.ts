import { prisma } from "@/lib/db";
import type { AccessLevel } from "@/lib/billing/plans";
import {
  isBillingEnabled,
  hasFullAccess,
  getAccessLevel,
  TRIAL_AI_CALL_LIMIT,
} from "@/lib/billing/plans";

export type AIAccessResult =
  | {
      ok: true;
      plan: "FREE" | "PRO";
      /** AI calls left in the trial allowance. `null` means unlimited. */
      remaining: number | null;
    }
  | {
      ok: false;
      error: string;
      reason: "limit" | "not_pro" | "auth";
      code?: "AI_LIMIT_REACHED" | "PRO_REQUIRED" | "TRIAL_AI_LIMIT_REACHED";
    };

// Three distinct messages, on purpose. The failure a user hits is the only
// explanation they get, so a generic "upgrade to continue" would tell a
// trialling user to start a trial they are already on — which reads as a bug
// and costs the conversion the trial exists to earn.
export const TRIAL_EXHAUSTED_MESSAGE =
  "You have used your 5 trial AI credits. AI becomes unlimited when your subscription starts.";
export const PRO_REQUIRED_MESSAGE =
  "Start your 7-day free trial to use AI features.";

/**
 * Pure mirror of the atomic claim's WHERE clause.
 *
 * This exists so the prebuild gate can prove the 5-call rule without a
 * database. That makes it a DUPLICATE of the `lt: TRIAL_AI_CALL_LIMIT` filter
 * in requireAIAccess, and duplicates drift — so verify-ai-gate.ts also asserts
 * that requireAIAccess's source still contains that exact filter. If someone
 * edits one, the gate fails instead of the two quietly disagreeing.
 */
export function canClaimTrialCredit(currentCalls: number): boolean {
  return currentCalls < TRIAL_AI_CALL_LIMIT;
}

/**
 * The whole gate decision, with the IO lifted out.
 *
 * Split from requireAIAccess so it can be proved at build time. The gate that
 * guards revenue should not be the one piece of logic nothing can test, and
 * anything touching prisma cannot run in `prebuild`.
 *
 * @param level  billing state, or `null` when the user row was not found.
 * @param claim  outcome of the atomic increment; required only for "trialing".
 */
export function decideAIAccess(input: {
  billingEnabled: boolean;
  level: AccessLevel | null;
  claim?: { claimed: boolean; used: number };
}): AIAccessResult {
  // Dry-run escape hatch: if billing is misconfigured (flag off or no price),
  // do not lock everyone out of a live product. This is the ONLY path to AI
  // without a subscription, and it is a config state, not a plan.
  if (!input.billingEnabled) {
    return { ok: true, plan: "FREE", remaining: null };
  }

  if (input.level === null) {
    return { ok: false, error: "Account not found.", reason: "auth" };
  }

  if (input.level === "paid") {
    // Paid is unlimited per spec — no counter increment, no read of it either.
    return { ok: true, plan: "PRO", remaining: null };
  }

  if (input.level === "trialing") {
    if (!input.claim || !input.claim.claimed) {
      return {
        ok: false,
        error: TRIAL_EXHAUSTED_MESSAGE,
        reason: "limit",
        code: "TRIAL_AI_LIMIT_REACHED",
      };
    }
    return {
      ok: true,
      plan: "PRO",
      remaining: Math.max(0, TRIAL_AI_CALL_LIMIT - input.claim.used),
    };
  }

  // No subscription, no trial: refuse. Callers surface this as an upgrade
  // prompt, never a crash -- existing free-tier users hit a paywall, not a 500.
  return {
    ok: false,
    error: PRO_REQUIRED_MESSAGE,
    reason: "not_pro",
    code: "PRO_REQUIRED",
  };
}

/**
 * Gate every AI server action. AI is subscription-only, and the 7-day trial now
 * buys a TASTE of it rather than the whole thing: 5 calls total while
 * `trialing`, unlimited once the day-8 charge flips the status to `active`.
 *
 * Only AI narrows. isProActive() is untouched, so a trialling user still gets
 * unlimited CVs, every template and full download — the trial still has to sell
 * the product.
 *
 * The counter reuses aiCallsThisMonth, the column left behind by the retired
 * free tier, so this ships with NO migration. Despite the name it is not
 * monthly any more: it is a lifetime trial allowance, never reset, because a
 * trial happens once. aiCallsResetAt stays unwritten.
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

  if (!isBillingEnabled()) {
    return decideAIAccess({ billingEnabled: false, level: null });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      subscriptionStatus: true,
      subscriptionCurrentPeriodEnd: true,
      subscriptionPlan: true,
      compProUntil: true,
      // Owner status is decided by email, not by any subscription column.
      email: true,
    },
  });

  if (!user) {
    return decideAIAccess({ billingEnabled: true, level: null });
  }

  const level = getAccessLevel(user);

  if (level !== "trialing") {
    return decideAIAccess({ billingEnabled: true, level });
  }

  // ---- the atomic claim -------------------------------------------------
  // ONE statement does check-and-increment. A read-then-write pair would let a
  // burst of parallel requests all read 4 and all write 5; this cannot, because
  // the filter and the increment are the same UPDATE and the row lock is held
  // for both. `count` is 1 only if this call is the one that claimed a credit.
  //
  // aiCallsThisMonth is `Int @default(0)` — NOT nullable — so there is no NULL
  // to coalesce here. Worth stating rather than assuming: if a NULL ever did
  // appear via raw SQL, `lt` would not match it and the user would be REFUSED,
  // which is the safe direction to fail.
  const claimed = await prisma.user.updateMany({
    where: { id: userId, aiCallsThisMonth: { lt: TRIAL_AI_CALL_LIMIT } },
    data: { aiCallsThisMonth: { increment: 1 } },
  });

  if (claimed.count !== 1) {
    return decideAIAccess({
      billingEnabled: true,
      level,
      claim: { claimed: false, used: TRIAL_AI_CALL_LIMIT },
    });
  }

  // The credit is spent BEFORE the model call, deliberately. It means a call
  // that later errors still costs the user a credit, which is unfair in the
  // small — but the alternative is refunding on failure, and "fail then retry"
  // is then an unlimited free AI hole for anyone who notices. Charging up front
  // is the side to err on; support can comp a user, an open hole comps everyone.
  const after = await prisma.user.findUnique({
    where: { id: userId },
    select: { aiCallsThisMonth: true },
  });

  return decideAIAccess({
    billingEnabled: true,
    level,
    claim: { claimed: true, used: after?.aiCallsThisMonth ?? TRIAL_AI_CALL_LIMIT },
  });
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
    return { ok: true, plan: "FREE", remaining: null };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      subscriptionStatus: true,
      subscriptionCurrentPeriodEnd: true,
      subscriptionPlan: true,
      compProUntil: true,
      // Owner status is decided by email, not by any subscription column.
      email: true,
    },
  });

  if (!user) {
    return { ok: false, error: "Account not found.", reason: "auth" };
  }

  // GATE, so hasFullAccess: this helper gates whole Pro-only FEATURES, where a
  // trialling user should get full access and the owner always should. Only
  // per-call AI usage is metered during the trial, which is why this is not
  // getAccessLevel.
  if (hasFullAccess(user)) {
    return { ok: true, plan: "PRO", remaining: null };
  }

  return {
    ok: false,
    error: "This feature is available on Pro. Upgrade to unlock.",
    reason: "not_pro",
    code: "PRO_REQUIRED",
  };
}
