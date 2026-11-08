import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isBillingEnabled, getUserPlan } from "@/lib/billing/plans";
import { PricingClient } from "./pricing-client";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Pricing · AlmiCV",
  description:
    "3 free CVs (without AI), then $12/month for AI and unlimited CVs. Every template, PDF download with no watermark. Cancel anytime.",
  alternates: { canonical: "https://almicv.almiworld.com/pricing" },
};

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const user = await getCurrentUser();
  const params = await searchParams;
  // Shown when a free user clicks an AI feature, or has used the 3 free CVs (RR-391).
  const softUpgrade = params.from === "ai" || params.from === "free-cvs" || params.from === "expired";

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

  // RR-398: the site header (AlmiWorld bar with Home + AlmiCV's own nav) and the AlmiWorld footer, as on every page.
  return (
    <>
    <SiteHeader isLoggedIn={Boolean(user)} />
    <main className="min-h-screen bg-gradient-to-b from-cream to-cream-soft">
      <section className="mx-auto w-full max-w-5xl px-6 pb-20 pt-12 md:pt-20">
        {softUpgrade && (
          <section className="mx-auto mb-10 max-w-2xl rounded-2xl border-2 border-gray-900/15 bg-white p-6 text-left shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">
              {params.from === "ai" ? "AI is in the $12/month plan" : "You have used your 3 free CVs"}
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              {params.from !== "ai"
                ? "Get unlimited CVs and AI for $12/month. Your 3 CVs stay yours: you can still edit and download them."
                : "You have built your CV. The AI can now rewrite your wording, score it against a job description, and tell you what a recruiter will notice first."}
            </p>
            <ul className="mt-4 space-y-1.5 text-sm text-gray-700">
              <li>✓ AI rewriting, scoring and job-tailoring</li>
              <li>✓ Unlimited CVs</li>
              <li>✓ Everything you already have — every template, PDF downloads with no watermark</li>
            </ul>
            <p className="mt-4 text-sm text-gray-900">
              <span className="font-bold">$12/month.</span> Cancel any time.
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
            3 free CVs (without AI), then $12/month for AI and unlimited CVs.
            Every template and a PDF download with no watermark. Cancel anytime.
          </p>
        </header>

        <PricingClient
          isLoggedIn={Boolean(user)}
          currentPlan={currentPlan}
          billingEnabled={isBillingEnabled()}
        />
      </section>
    </main>
    <Footer />
    </>
  );
}
