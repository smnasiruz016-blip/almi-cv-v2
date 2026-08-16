// SQL predicates that mirror isProActive() / isComped() exactly.
//
// isProActive() decides access for a User object in memory. Every screen that
// COUNTS or FILTERS users has to express the same rule in SQL, and that
// translation is where admin dashboards go wrong: `subscriptionStatus IN
// ('active','trialing')` looks like the rule but is only half of it —
// isProActive() also requires subscriptionCurrentPeriodEnd in the future. A
// query missing that clause reports a lapsed subscriber as Pro while the product
// itself denies them, and nothing fails loudly.
//
// Keeping the predicates here means the page, the HQ stats endpoint and anything
// added later share one translation of the rule instead of each inventing their
// own. scripts/verify-account-tiles.ts deliberately re-implements them rather
// than importing this file: an oracle that shares code with the thing it checks
// can only prove they are identical, never that they are right.

import type { Prisma } from "@prisma/client";
import { ACTIVE_STATUSES } from "./plans";

/** compProUntil in the future — the comp half of isProActive(). */
export const compActive = (now: Date): Prisma.UserWhereInput => ({
  compProUntil: { gt: now },
});

/** No live comp grant. Comp short-circuits isProActive(), so every "is this a
 *  real subscriber" question has to exclude comped users explicitly or they get
 *  counted twice. */
export const notComped = (now: Date): Prisma.UserWhereInput => ({
  OR: [{ compProUntil: null }, { compProUntil: { lte: now } }],
});

/** The subscription half of isProActive(): an active status AND a period that
 *  has not ended. Both clauses, or this disagrees with the runtime predicate. */
export const subActive = (now: Date): Prisma.UserWhereInput => ({
  subscriptionStatus: { in: [...ACTIVE_STATUSES] },
  subscriptionCurrentPeriodEnd: { gt: now },
});

/**
 * The NEGATION of subActive, written out clause by clause.
 *
 * It cannot be expressed as `{ NOT: subActive }`. That compiles to
 * `NOT (status IN (...) AND periodEnd > now)`, and in SQL's three-valued logic
 * the whole expression is NULL — not TRUE — for any row where
 * subscriptionStatus IS NULL. WHERE keeps only TRUE, so every user who never
 * subscribed silently disappears.
 *
 * This is not hypothetical on AlmiCV: measured on the live table, 36 of 38 users
 * have a NULL subscriptionStatus, and the naive form returns a Free count of 1.
 *
 * Spelling out the four ways isProActive() can be false keeps NULL handling
 * explicit instead of leaving it to the database's idea of unknown.
 */
export const notSubActive = (now: Date): Prisma.UserWhereInput => ({
  OR: [
    { subscriptionStatus: null },
    { NOT: { subscriptionStatus: { in: [...ACTIVE_STATUSES] } } },
    { subscriptionCurrentPeriodEnd: null },
    { subscriptionCurrentPeriodEnd: { lte: now } },
  ],
});

/** A subscriber inside a live trial, excluding comped users so trial and comp
 *  never both claim the same account. */
export const trialActive = (now: Date): Prisma.UserWhereInput => ({
  AND: [
    notComped(now),
    { subscriptionStatus: "trialing", subscriptionCurrentPeriodEnd: { gt: now } },
  ],
});

/** A subscriber actually being billed — `active`, not `trialing`, and inside its
 *  period. */
export const paidActive = (now: Date): Prisma.UserWhereInput => ({
  AND: [
    notComped(now),
    { subscriptionStatus: "active", subscriptionCurrentPeriodEnd: { gt: now } },
  ],
});

export type PlanStatus = "all" | "free" | "pro" | "comp";
export const PLAN_STATUSES: PlanStatus[] = ["all", "free", "pro", "comp"];

/**
 * The three plan buckets as mutually exclusive WHERE clauses, so counts of each
 * sum to the total exactly. Returns undefined for "all" (no filter).
 */
export function planWhere(
  status: PlanStatus,
  now: Date,
): Prisma.UserWhereInput | undefined {
  switch (status) {
    case "comp":
      return compActive(now);
    case "pro":
      return { AND: [notComped(now), subActive(now)] };
    case "free":
      return { AND: [notComped(now), notSubActive(now)] };
    default:
      return undefined;
  }
}
