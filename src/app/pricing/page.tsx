import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isBillingEnabled, getUserPlan } from "@/lib/billing/plans";
import { PricingClient } from "./pricing-client";

export const metadata: Metadata = {
  title: "Pricing · AlmiCV",
  description:
    "One plan: $12/month with a 7-day free trial. Unlimited CVs, unlimited AI, every premium template. Cancel anytime.",
  alternates: { canonical: "https://almicv.almiworld.com/pricing" },
};

export default async function PricingPage() {
  const user = await getCurrentUser();

  let currentPlan: "FREE" | "PRO_MONTHLY" | "PRO_YEARLY" = "FREE";
  if (user) {
    const u = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        subscriptionStatus: true,
        subscriptionCurrentPeriodEnd: true,
        subscriptionPlan: true,
        compProUntil: true,
      },
    });
    if (u) currentPlan = getUserPlan(u);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-cream to-cream-soft">
      <section className="mx-auto w-full max-w-5xl px-6 pb-20 pt-12 md:pt-20">
        <header className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-coral-soft/50 px-3 py-1 text-xs font-medium text-coral-deep">
            ✨ Pricing
          </span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-plum md:text-5xl">
            One plan, everything included
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-plum-soft">
            One plan, everything included: unlimited CVs, unlimited AI and every
            premium template. 7-day free trial, then $12/month. Cancel anytime.
          </p>
        </header>

        <PricingClient
          isLoggedIn={Boolean(user)}
          currentPlan={currentPlan}
          billingEnabled={isBillingEnabled()}
        />
      </section>
    </main>
  );
}
