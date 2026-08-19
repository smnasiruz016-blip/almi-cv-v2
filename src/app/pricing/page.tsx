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

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const user = await getCurrentUser();
  const params = await searchParams;
  // Shown when a free-window user clicks an AI feature, or when their window
  // has run out. Founder copy from _handoffs/AlmiCV_3day_copy.md.
  const softUpgrade = params.from === "ai" || params.from === "expired";

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
        {softUpgrade && (
          <section className="mx-auto mb-10 max-w-2xl rounded-2xl border-2 border-gray-900/15 bg-white p-6 text-left shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">
              {params.from === "expired" ? "Your 3 free days have finished" : "Ready for more?"}
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              {params.from === "expired"
                ? "Start the 7-day trial to carry on building — and it adds the AI on top."
                : "You have built your CV. The AI can now rewrite your wording, score it against a job description, and tell you what a recruiter will notice first."}
            </p>
            <ul className="mt-4 space-y-1.5 text-sm text-gray-700">
              <li>✓ AI rewriting, scoring and job-tailoring</li>
              <li>✓ Everything you already have — templates, downloads, unlimited CVs</li>
              <li>✓ Keeps working after your 3 days end</li>
            </ul>
            <p className="mt-4 text-sm text-gray-900">
              <span className="font-bold">$0 today.</span> Then $12/month after your 7-day
              trial. Cancel any time.
            </p>
          </section>
        )}

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
