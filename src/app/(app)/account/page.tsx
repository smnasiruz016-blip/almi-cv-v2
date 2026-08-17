import type { Metadata } from "next";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  getAccessLevel,
  getCompProDaysRemaining,
  getUserPlan,
  isBillingEnabled,
  isComped,
  isProActive,
  PLAN_DISPLAY_NAME,
  PLANS,
  TRIAL_AI_CALL_LIMIT,
} from "@/lib/billing/plans";
import { isOwner } from "@/lib/owner";
import { AccountClient } from "./account-client";
import { syncSubscriptionStatusAction } from "./actions";

export const metadata: Metadata = {
  title: "Account · AlmiCV",
};

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ upgraded?: string }>;
}) {
  const user = await requireUser();
  const params = await searchParams;
  const upgraded = params.upgraded === "true";

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      subscriptionStatus: true,
      subscriptionCurrentPeriodEnd: true,
      subscriptionPlan: true,
      subscriptionCancelAtPeriodEnd: true,
      trialEndsAt: true,
      stripeCustomerId: true,
      aiCallsThisMonth: true,
      aiCallsResetAt: true,
      compProUntil: true,
      // Owner status is decided by email, not by any subscription column.
      email: true,
    },
  });

  const cvCount = await prisma.resume.count({ where: { userId: user.id } });

  const plan = dbUser ? getUserPlan(dbUser) : "FREE";
  const proActive = dbUser ? isProActive(dbUser) : false;
  const comped = dbUser ? isComped(dbUser) : false;
  const compDaysRemaining = dbUser ? getCompProDaysRemaining(dbUser) : null;
  const billingEnabled = isBillingEnabled();

  const limits = PLANS[plan];

  // AI usage is the ONE label that cannot be read off `plan`. getUserPlan maps
  // trialing and active alike to PRO_MONTHLY, whose aiCallsPerMonth is
  // Infinity — so a plan-based label told trialling users "Unlimited" while the
  // gate was actually allowing them 5 calls. Read the access level instead,
  // from the same function requireAIAccess() uses, so the number a user sees
  // and the number they get come from one source.
  const accessLevel = dbUser ? getAccessLevel(dbUser) : "none";
  const aiUsageLabel =
    accessLevel === "paid"
      ? "Unlimited"
      : accessLevel === "trialing"
        ? `${dbUser?.aiCallsThisMonth ?? 0} of ${TRIAL_AI_CALL_LIMIT} during your trial — unlimited once your subscription starts`
        : "Not included — start your 7-day free trial";

  // The owner has no subscription and never will, so every plan name is a
  // fabrication for them — including "Pro", which would also be the exact lie
  // the admin tiles are kept honest to avoid. Say what is actually true.
  const owner = isOwner(dbUser?.email);
  const planLabel = owner ? "Owner — full access" : PLAN_DISPLAY_NAME[plan];

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <h1 className="text-3xl text-plum md:text-4xl">Account</h1>
        <p className="mt-2 text-sm text-plum-soft">
          Manage your plan, billing, and usage.
        </p>
      </header>

      <AccountClient
        upgraded={upgraded}
        billingEnabled={billingEnabled}
        plan={plan}
        planDisplayName={planLabel}
        proActive={proActive}
        comped={comped}
        compDaysRemaining={compDaysRemaining}
        status={dbUser?.subscriptionStatus ?? null}
        cancelAtPeriodEnd={dbUser?.subscriptionCancelAtPeriodEnd ?? false}
        currentPeriodEndIso={
          dbUser?.subscriptionCurrentPeriodEnd?.toISOString() ?? null
        }
        trialEndsAtIso={dbUser?.trialEndsAt?.toISOString() ?? null}
        hasStripeCustomer={Boolean(dbUser?.stripeCustomerId)}
        cvCount={cvCount}
        cvLimit={limits.cvLimit}
        aiUsageLabel={aiUsageLabel}
        userEmail={user.email}
        syncAction={syncSubscriptionStatusAction}
      />
    </div>
  );
}
