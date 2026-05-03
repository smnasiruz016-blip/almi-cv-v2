import type { Metadata } from "next";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  getCompProDaysRemaining,
  getUserPlan,
  isBillingEnabled,
  isComped,
  isProActive,
  PLAN_DISPLAY_NAME,
  PLANS,
} from "@/lib/billing/plans";
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
    },
  });

  const cvCount = await prisma.resume.count({ where: { userId: user.id } });

  const plan = dbUser ? getUserPlan(dbUser) : "FREE";
  const proActive = dbUser ? isProActive(dbUser) : false;
  const comped = dbUser ? isComped(dbUser) : false;
  const compDaysRemaining = dbUser ? getCompProDaysRemaining(dbUser) : null;
  const billingEnabled = isBillingEnabled();

  const limits = PLANS[plan];
  const aiUsageLabel =
    plan === "FREE"
      ? `${dbUser?.aiCallsThisMonth ?? 0} of ${limits.aiCallsPerMonth} this month`
      : "Unlimited";

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
        planDisplayName={PLAN_DISPLAY_NAME[plan]}
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
