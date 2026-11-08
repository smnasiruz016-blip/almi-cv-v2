import type { User } from "@prisma/client";
import { isOwner } from "@/lib/owner";

// AlmiCV: ONE price, $12/month (AI + unlimited CVs); 3 free CVs without AI; NO trial for new subscribers
// (RR-391, 7 Nov 2026). The old $7/month + $60/year pair is retired.
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

// FREE is not a PLAN. It is the name of the no-subscription state: signed up,
// trial not started (or lapsed/cancelled). `trialing` counts as PRO_MONTHLY via
// isProActive(), so a trialling user gets the full product from minute one.
//
// READ THIS BEFORE CHANGING A NUMBER (RR-391, 7 Nov 2026: the owner's offer "3 free CVs (without AI), then
// $12/month for AI and unlimited CVs", no trial):
//
//   aiCallsPerMonth: 0  -- THE PAYWALL, and the load-bearing one. AI is never free. Free access is only safe
//                          because it costs nothing to serve. Restoring a non-zero value here puts a metered
//                          model call behind a no-card door. verify-paywall.ts fails if you do.
//   cvLimit: 3          -- 3 CVs FOR LIFE, counted on the server (resume-actions.ts createCounted).
//   templatesAccess     -- every template is free.
export const PLANS: Record<PlanKey, PlanConfig> = {
  FREE: {
    cvLimit: 3, // RR-391: 3 CVs for life (FREE_CV_LIMIT), counted on the server
    aiCallsPerMonth: 0, // AI is never free
    templatesAccess: "all", // every template is free
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
 * How many AI calls a user gets during a trial that started before RR-391 (no new trials are sold). A "taste", not a tier:
 * the trial grants the FULL product for building, editing and downloading CVs
 * (isProActive stays true, so cvLimit and templates are untouched) — only AI
 * narrows, because AI is the one feature with a per-call vendor cost.
 */
export const TRIAL_AI_CALL_LIMIT = 5;

// ===================== The free offer: 3 CVs for life, no AI =====================
//
// RR-391 (owner, 7 Nov 2026 21:49: "3 free CVs (without AI), no 7 days, 12 USD per month. The new offer from now on").
// REPLACES the no-card window of 2026-08-19 and the card-upfront trial (no trial is sold any more).
//
//   FREE   = 3 CVs per account, FOR LIFE (not per month), every template, PDF download with no watermark. NO AI.
//   PAID   = $12/month: every AI feature and unlimited CVs.
//   TRIAL  = none for anyone who subscribes from now on (stripe.ts sends no trial_period_days). A trial that is
//            running today runs to its end ("trialing" still counts as Pro, and its 5 AI credits still apply).
//
// THE COUNT IS THE SERVER'S. It is every Resume row the account ever made, in any status: a free user's delete
// does not remove the row, it empties it (resume-actions.ts deleteResume keeps an ARCHIVED tombstone with no
// content), so deleting can never give a 4th free CV, and nothing in the browser can reset it.
// AI is untouched by this section and must stay so: getAccessLevel() / requireAIAccess() know nothing of free CVs.

/** The one line every page uses for the offer. */
export const OFFER_LINE = `3 free CVs (without AI), then ${MONTHLY_PRICE_DISPLAY}/month for AI and unlimited CVs.`;
/** Free CVs per account, for life. */
export const FREE_CV_LIMIT = 3;
/** What the 4th CV of a free account is told. */
export const FREE_CVS_USED_MESSAGE = `You have used your ${FREE_CV_LIMIT} free CVs. Get unlimited CVs and AI for ${MONTHLY_PRICE_DISPLAY}/month.`;

/**
 * Gate for the PRODUCT surface: opening a template, editing one's own CV, downloading the PDF. Free for every
 * signed-in account under the new offer (only CREATING a 4th CV is counted, in canCreateCv). Never for AI.
 * The signature is kept so every caller stays a gate call.
 */
export function hasProductAccess(
  _user?: unknown,
  _isOwnerFn?: OwnerCheck,
): boolean {
  return true;
}

/** A free account's deleted CV: the row stays (it counts), empty and hidden. Used as data AND as `NOT:` in every reader. */
export const TOMBSTONE = { status: "ARCHIVED", title: "Deleted CV" } as const;

/** May this account create one more CV? A paying, trialling, comped or owner account always; a free one while it has made fewer than 3. */
export function canCreateCv(input: { fullAccess: boolean; lifetimeCount: number }): boolean {
  return input.fullAccess || input.lifetimeCount < FREE_CV_LIMIT;
}

/** Free CVs left (null = unlimited). */
export function freeCvsLeft(input: { fullAccess: boolean; lifetimeCount: number }): number | null {
  return input.fullAccess ? null : Math.max(0, FREE_CV_LIMIT - input.lifetimeCount);
}

export type ProductAccessLevel = "FREE" | "PAID";

/** The plan as the account screens show it. */
export function getProductAccessLevel(
  user: AccessUserShape,
  isOwnerFn: OwnerCheck = isOwner,
): ProductAccessLevel {
  return hasFullAccess(user, isOwnerFn) ? "PAID" : "FREE";
}

export type AccessLevel = "none" | "trialing" | "paid";

/** The extra field the owner-aware helpers need beyond ProUserShape. */
export type AccessUserShape = ProUserShape & Pick<User, "email">;

/**
 * Injection seam for the owner test. Production callers never pass it — they
 * get isOwner, which reads OWNER_EMAILS. It exists so verify-ai-gate.ts can
 * prove owner behaviour at build time without depending on an env var being
 * set, which would make the gate pass or fail for reasons unrelated to code.
 */
export type OwnerCheck = (email: string | null | undefined) => boolean;

/**
 * Can this user use the product in full — every template, unlimited CVs?
 *
 * OWNER IS DELIBERATELY *NOT* FOLDED INTO isProActive(), and this separation is
 * load-bearing rather than fussiness. isProActive() is what the admin accounts
 * tiles, plan-where.ts SQL and the HQ stats endpoint use to COUNT paying
 * subscribers. If owner leaked into it, the dashboard would report the owner as
 * a paying customer — a fake revenue number, and revenue is the one figure that
 * has to be trustworthy.
 *
 * So the split is: PRODUCT GATES call hasFullAccess(); COUNTING CODE keeps
 * calling isProActive(). Do not "simplify" these into one function.
 */
export function hasFullAccess(
  user: AccessUserShape,
  isOwnerFn: OwnerCheck = isOwner,
): boolean {
  return isOwnerFn(user.email) || isProActive(user);
}

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
export function getAccessLevel(
  user: AccessUserShape,
  isOwnerFn: OwnerCheck = isOwner,
): AccessLevel {
  // Owner first, above everything: the owner account has complete product
  // access with no subscription, no trial cap and no expiry. Returning "paid"
  // is all that is needed, because requireAIAccess keys on the level.
  if (isOwnerFn(user.email)) return "paid";

  // Comp next, matching isProActive's own ordering: a comped user is "paid"
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
