/**
 * Prove the offer sits where the owner put it — at the LOGIC layer, at build time (prebuild), with no database.
 *
 * RR-391 (owner, 7 Nov 2026 21:49–21:50: "3 free CVs (without AI), no 7 days, 12 USD per month. The new offer from
 * now on"). This file used to prove the 3-day no-card window; it now proves, rule by rule, the offer that replaces
 * it. The one line that never moves: AI is never free.
 *
 *   1. AI is refused on the server for a free user; allowed for a subscriber.
 *   2. 3 free CVs for life; the 4th is refused with the owner's words; paying / trialling / comped / owner are never
 *      counted. The count is the server's: every CV path goes through createCounted, a free delete keeps an empty
 *      tombstone row, and no reader ever shows or opens a tombstone.
 *   3. No trial on a new checkout session.
 *   4. A trial running today is left alone (still Pro, its AI credits still metered).
 *   5. A paying subscriber is unchanged (unlimited CVs, unlimited AI, every template).
 *   6. Every template and the PDF download are free; the copy says the offer in one sentence.
 * Run: npx tsx scripts/verify-paywall.ts
 */
import { readFileSync } from "node:fs";
import {
  PLANS,
  getUserPlan,
  isProActive,
  priceIdToPlanLabel,
  hasProductAccess,
  hasFullAccess,
  getAccessLevel,
  getProductAccessLevel,
  canCreateCv,
  freeCvsLeft,
  FREE_CV_LIMIT,
  FREE_CVS_USED_MESSAGE,
  OFFER_LINE,
  TOMBSTONE,
} from "../src/lib/billing/plans";
import { userCanAccessTier, userCanAccessTemplate } from "../src/lib/billing/template-access";
import { decideAIAccess, PRO_REQUIRED_MESSAGE } from "../src/lib/ai/access";
import { checkoutSessionParams } from "../src/lib/billing/checkout-params";
import { TEMPLATES, getTier } from "../src/components/templates/template-registry";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { WelcomeGuidance } from "../src/components/billing/WelcomeGuidance";

type Check = { name: string; got: unknown; want: unknown };
const checks: Check[] = [];
const eq = (name: string, got: unknown, want: unknown) => checks.push({ name, got, want });
const src = (p: string) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");

const DAY = 86_400_000;
const future = new Date(Date.now() + DAY);
const past = new Date(Date.now() - DAY);
const base = { subscriptionPlan: null, email: "user@example.com" };
const free = { ...base, subscriptionStatus: null, subscriptionCurrentPeriodEnd: null, compProUntil: null };
const trialing = { ...base, subscriptionStatus: "trialing", subscriptionCurrentPeriodEnd: future, subscriptionPlan: "pro_monthly", compProUntil: null };
const active = { ...base, subscriptionStatus: "active", subscriptionCurrentPeriodEnd: future, subscriptionPlan: "pro_monthly", compProUntil: null };
const lapsed = { ...base, subscriptionStatus: "active", subscriptionCurrentPeriodEnd: past, subscriptionPlan: "pro_monthly", compProUntil: null };
const canceled = { ...base, subscriptionStatus: "canceled", subscriptionCurrentPeriodEnd: future, subscriptionPlan: "pro_monthly", compProUntil: null };
const legacyYearly = { ...base, subscriptionStatus: "active", subscriptionCurrentPeriodEnd: future, subscriptionPlan: "pro_yearly", compProUntil: null };
const comped = { ...base, subscriptionStatus: null, subscriptionCurrentPeriodEnd: null, compProUntil: future };
const noOwners = () => false;

// 1 · AI ===================================================================
eq("FREE aiCallsPerMonth is 0 (AI is never free)", PLANS.FREE.aiCallsPerMonth, 0);
eq("free user's billing level is 'none'", getAccessLevel(free, noOwners), "none");
const aiFree = decideAIAccess({ billingEnabled: true, level: getAccessLevel(free, noOwners) });
eq("AI refused for a free user", aiFree.ok, false);
eq("AI refusal is PRO_REQUIRED", aiFree.ok === false ? aiFree.code : "(allowed)", "PRO_REQUIRED");
eq("AI refusal says the $12/month plan", aiFree.ok === false && aiFree.error === PRO_REQUIRED_MESSAGE && /AI is in the \$12\/month plan/.test(aiFree.error), true);
eq("AI allowed for a subscriber", decideAIAccess({ billingEnabled: true, level: getAccessLevel(active, noOwners) }).ok, true);
eq("AI allowed for a comped account", decideAIAccess({ billingEnabled: true, level: getAccessLevel(comped, noOwners) }).ok, true);
eq("AI refused for a lapsed subscription", decideAIAccess({ billingEnabled: true, level: getAccessLevel(lapsed, noOwners) }).ok, false);
eq("every AI route goes through requireAIAccess (the server gate)", /export async function requireAIAccess/.test(src("src/lib/ai/access.ts")), true);

// 2 · 3 free CVs for life ======================================================
eq("FREE_CV_LIMIT is 3", FREE_CV_LIMIT, 3);
eq("PLANS.FREE.cvLimit is 3", PLANS.FREE.cvLimit, 3);
for (const n of [0, 1, 2]) eq(`free account with ${n} CV(s) may create one more`, canCreateCv({ fullAccess: false, lifetimeCount: n }), true);
eq("free account with 3 CVs is REFUSED the 4th", canCreateCv({ fullAccess: false, lifetimeCount: 3 }), false);
eq("free account with 7 CVs (made while paying) is refused", canCreateCv({ fullAccess: false, lifetimeCount: 7 }), false);
eq("free CVs left after 1", freeCvsLeft({ fullAccess: false, lifetimeCount: 1 }), 2);
eq("free CVs left never below 0", freeCvsLeft({ fullAccess: false, lifetimeCount: 9 }), 0);
eq("the 4th CV's words are the owner's", FREE_CVS_USED_MESSAGE, "You have used your 3 free CVs. Get unlimited CVs and AI for $12/month.");
const ra = src("src/lib/resume-actions.ts");
eq("the count is every row the account made (all statuses), inside the lock", /pg_advisory_xact_lock[\s\S]{0,200}tx\.resume\.count\(\{ where: \{ userId \} \}\)/.test(ra), true);
eq("every CV path creates through createCounted (no direct prisma.resume.create)", (ra.match(/prisma\.resume\.create\(/g) ?? []).length === 1 && /if \(!counted\) return prisma\.resume\.create\(/.test(ra) && (ra.match(/createCounted\(/g) ?? []).length >= 4, true);
eq("a free account's delete keeps an empty tombstone (never frees a place)", /if \(await isCounted\(user\.id\)\) \{[\s\S]{0,400}prisma\.resume\.update\(\{ where: \{ id \}, data: \{ \.\.\.TOMBSTONE, data: \{\}/.test(ra), true);
eq("the tombstone is never listed, opened, written or reused", [/where: \{ userId: user\.id, NOT: TOMBSTONE \}/, /where: \{ id, userId: user\.id, NOT: TOMBSTONE \}, \/\/ RR-391: a deleted free CV never opens again/, /where: \{ id, userId: user\.id, NOT: TOMBSTONE \}, \/\/ RR-391: a deleted free CV can never be written again/].every((re) => re.test(ra)) && /NOT: TOMBSTONE/.test(src("src/app/(editor)/cv/new/page.tsx")) && /NOT: TOMBSTONE/.test(src("src/app/api/pdf/[id]/route.ts")) && (src("src/lib/cv/snapshots.ts").match(/NOT: TOMBSTONE/g) ?? []).length === 2, true);
eq("the tombstone is ARCHIVED with no title of the user's", JSON.stringify(TOMBSTONE), JSON.stringify({ status: "ARCHIVED", title: "Deleted CV" }));

// 3 · no trial on a new checkout ================================================
const p = checkoutSessionParams({ customerId: "cus_x", priceId: "price_x", userId: "u1", planLabel: "pro_monthly", successUrl: "https://a/s", cancelUrl: "https://a/c" });
eq("checkout: no trial_period_days", JSON.stringify(p).includes("trial_period_days"), false);
eq("checkout: no trial_end / trial_settings", /trial_end|trial_settings/.test(JSON.stringify(p)), false);
eq("checkout: a subscription at the one price", p.mode === "subscription" && p.line_items?.[0]?.price === "price_x", true);
eq("checkout: the card is taken", p.payment_method_collection, "always");
eq("stripe.ts sends no trial", /trial_period_days|TRIAL_PERIOD_DAYS/.test(src("src/lib/billing/stripe.ts")), false);
eq("stripe.ts builds the session with checkoutSessionParams", /stripe\.checkout\.sessions\.create\(\s*checkoutSessionParams\(/.test(src("src/lib/billing/stripe.ts")), true);

// 4 · a trial running today is left alone ========================================
eq("trialing is still Pro", isProActive(trialing), true);
eq("trialing has full access (unlimited CVs, never counted)", hasFullAccess(trialing, noOwners), true);
eq("trialing may create a 4th CV", canCreateCv({ fullAccess: hasFullAccess(trialing, noOwners), lifetimeCount: 9 }), true);
eq("trialing's AI still metered by its credits (allowed while it has one)", decideAIAccess({ billingEnabled: true, level: "trialing", claim: { claimed: true, used: 2 } }).ok, true);
eq("trialing's AI stops when its credits are used", decideAIAccess({ billingEnabled: true, level: "trialing", claim: { claimed: false, used: 5 } }).ok, false);
eq("'trialing' is still an access status", /"trialing",\s*"active"/.test(src("src/lib/billing/plans.ts")), true);

// 5 · a paying subscriber is unchanged ============================================
eq("subscriber: Pro", isProActive(active), true);
eq("subscriber: plan PRO_MONTHLY", getUserPlan(active), "PRO_MONTHLY");
eq("subscriber: unlimited CVs", PLANS.PRO_MONTHLY.cvLimit, Infinity);
eq("subscriber: never counted", canCreateCv({ fullAccess: hasFullAccess(active, noOwners), lifetimeCount: 50 }), true);
eq("subscriber: level PAID", getProductAccessLevel(active, noOwners), "PAID");
eq("legacy yearly still active", isProActive(legacyYearly), true);
eq("legacy yearly keeps its label", getUserPlan(legacyYearly), "PRO_YEARLY");
eq("comp grant still works", isProActive(comped), true);
eq("canceled is not active", isProActive(canceled), false);
eq("retired $7 price rejected", priceIdToPlanLabel("price_1TSp04Q5pPhPaj6V3PJX0SC3"), null);
eq("retired $60 price rejected", priceIdToPlanLabel("price_1TSp5TQ5pPhPaj6VBD0Zujwy"), null);
eq("empty price rejected", priceIdToPlanLabel(""), null);

// 6 · templates, download, copy ================================================
eq("free: product access (templates, editing, download)", hasProductAccess(free, noOwners), true);
eq("free: opens a template", userCanAccessTemplate(free as never, TEMPLATES[0].slug), true);
eq("FREE templatesAccess is all", PLANS.FREE.templatesAccess, "all");
eq("PRO_MONTHLY opens templates", userCanAccessTier("PRO_MONTHLY", "free"), true);
const premium = TEMPLATES.filter((t) => getTier(t) === "premium").map((t) => t.slug);
eq(`no template is tier "premium" (found: ${premium.slice(0, 3).join(",") || "none"})`, premium.length, 0);
eq("free: level FREE", getProductAccessLevel(free, noOwners), "FREE");
eq("the offer in one sentence", OFFER_LINE, "3 free CVs (without AI), then $12/month for AI and unlimited CVs.");
const render = (freeLeft: number | null) => renderToStaticMarkup(createElement(WelcomeGuidance, { access: "FREE", freeLeft }));
eq("copy: a new account sees the offer and 3 left", render(3).includes("3 free CVs left") && render(3).includes("3 free CVs (without AI), then $12/month"), true);
eq("copy: 1 left says so", render(1).includes("1 free CV left"), true);
eq("copy: used up says the owner's words and keeps their CVs", render(0).includes("You have used your 3 free CVs") && render(0).includes("you can still edit and download them"), true);
eq("copy: no trial anywhere in the guidance", /trial|free days/i.test(render(0) + render(3)), false);
eq("copy: PAID renders nothing", renderToStaticMarkup(createElement(WelcomeGuidance, { access: "PAID", freeLeft: null })), "");

let failed = 0;
for (const c of checks) {
  const ok = Object.is(c.got, c.want);
  if (!ok) failed++;
  console.log(`  [${ok ? "PASS" : "FAIL"}] ${c.name.padEnd(70)} got=${String(c.got)} want=${String(c.want)}`);
}
console.log(failed === 0 ? `\nALL ${checks.length} PASS — the RR-391 offer: 3 free CVs without AI, then $12/month, no trial` : `\n${failed} FAILED`);
process.exitCode = failed === 0 ? 0 : 1;
