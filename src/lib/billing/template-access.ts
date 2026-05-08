import type { User } from "@prisma/client";
import { getUserPlan, isProActive, PLANS, type PlanKey } from "./plans";
import { getTemplate } from "@/lib/templates";

/**
 * Gate that closes the paywall hole reported in Phase 5a:
 * `PLANS[plan].templatesAccess === "free_only"` was defined but never
 * read. This module is the single source of truth for "can this user
 * use this template?" — called from /templates/[slug] CTA logic, the
 * createResume() server action, the editor route, and the print route.
 *
 * Defense in depth: every layer that touches a template by slug must
 * call this. Frontend hides premium CTAs for FREE users; server-side
 * still re-checks because a logged-out fetch or a stale tab can slip
 * past the UI gate.
 */
export function userCanAccessTier(
  plan: PlanKey,
  tier: "free" | "premium",
): boolean {
  if (tier === "free") return true;
  return PLANS[plan].templatesAccess === "all";
}

/** Convenience: same check, given a User row and a template slug. */
export function userCanAccessTemplate(
  user: Pick<
    User,
    | "subscriptionStatus"
    | "subscriptionCurrentPeriodEnd"
    | "subscriptionPlan"
    | "compProUntil"
  >,
  slug: string,
): boolean {
  const plan = getUserPlan(user);
  const template = getTemplate(slug);
  return userCanAccessTier(plan, template.tier);
}

/** Convenience for anon visitors — they're on FREE. */
export function anonCanAccessTier(tier: "free" | "premium"): boolean {
  return userCanAccessTier("FREE", tier);
}

/**
 * Reads the user's plan + Pro flag in one call. Most callers want both
 * (one to surface plan-tier copy, the other to drive paywall logic).
 */
export function planAndProFor(
  user: Pick<
    User,
    | "subscriptionStatus"
    | "subscriptionCurrentPeriodEnd"
    | "subscriptionPlan"
    | "compProUntil"
  >,
): { plan: PlanKey; isPro: boolean } {
  return { plan: getUserPlan(user), isPro: isProActive(user) };
}
