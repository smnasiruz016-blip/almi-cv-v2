import type { User } from "@prisma/client";
import {
  getUserPlan,
  hasFullAccess,
  PLANS,
  type AccessUserShape,
  type PlanKey,
} from "./plans";
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
  // The template's own "free"/"premium" tier no longer decides access -- there
  // is no free plan to grant it to. Every template, both tiers, needs an active
  // subscription or trial. The tier field survives only as a catalogue label
  // (which templates we present as the premium-looking ones).
  void tier;
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
    | "email"
  >,
  slug: string,
): boolean {
  // GATE, so it uses hasFullAccess: the owner sees every template tier with no
  // subscription. Checked before getUserPlan because getUserPlan is built on
  // isProActive, which deliberately does not know about owners.
  if (hasFullAccess(user)) return true;
  const plan = getUserPlan(user);
  const template = getTemplate(slug);
  return userCanAccessTier(plan, template.tier);
}

/** Convenience for anon visitors — no subscription, so no template access. */
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
    | "email"
  >,
): { plan: PlanKey; isPro: boolean } {
  // isPro here drives paywall logic per this module's docstring, so it is a
  // GATE and uses hasFullAccess. `plan` stays getUserPlan: it is a label, and
  // labelling the owner "Pro" is exactly the lie TASK 4 removes.
  return { plan: getUserPlan(user), isPro: hasFullAccess(user) };
}

/** Re-exported so gate call sites can name the shape they need to select. */
export type { AccessUserShape };
