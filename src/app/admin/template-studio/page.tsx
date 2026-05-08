import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { requireFounder } from "@/lib/founder";
import { getCurrentMonthSpend } from "@/lib/studio-cost";
import { AdminSubnav } from "@/app/admin/_components/AdminSubnav";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Template Studio · Admin · AlmiCV",
};

function bandColor(percentUsed: number): string {
  if (percentUsed >= 100) return "#B84A3B"; // red — coral-deep tone
  if (percentUsed >= 80) return "#D4A24C"; // amber — gold tone
  return "#5EEAD4"; // green — mint tone
}

export default async function TemplateStudioPage() {
  // 404 to anyone not in OWNER_EMAILS — including anonymous, free, and
  // non-founder Pro users. notFound() doesn't disclose the route exists.
  await requireFounder();

  const spend = await getCurrentMonthSpend();
  const bar = bandColor(spend.percentUsed);

  return (
    <div className="space-y-6">
      <AdminSubnav active="template-studio" />

      <section className="rounded-2xl border border-peach/40 bg-white p-6 shadow-warm-card">
        <h1 className="font-display text-2xl text-plum">Template Studio</h1>
        <p className="mt-2 max-w-2xl text-sm text-plum-soft">
          Studio under construction. Stage 3b will add AI generation —
          you&apos;ll pick a role and mood, click &quot;Generate variants&quot;,
          and Anthropic will return N recipe candidates rendered live as
          real CV previews. Stage 3c will add the variant picker UI.
          The plumbing landing tonight is the auth gate, the cost ledger,
          the recipe-shape validator, and this dashboard.
        </p>
      </section>

      <section className="rounded-2xl border border-peach/40 bg-white p-6 shadow-warm-card">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-display text-lg text-plum">
            Monthly spend
          </h2>
          <Link
            href="/admin/template-studio/cost-log"
            className="inline-flex items-center gap-1 text-sm text-coral hover:text-coral-deep"
          >
            View ledger
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <p className="mt-3 font-display text-3xl text-plum">
          ${spend.spentUsd.toFixed(2)}
          <span className="ml-2 text-base font-normal text-plum-soft">
            of ${spend.budgetUsd.toFixed(2)} ({spend.percentUsed}% used)
          </span>
        </p>

        <div
          className="mt-4 h-2 overflow-hidden rounded-full bg-plum/10"
          aria-label="Monthly budget progress"
        >
          <div
            style={{
              width: `${Math.min(100, spend.percentUsed)}%`,
              backgroundColor: bar,
              height: "100%",
            }}
          />
        </div>

        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2 text-xs text-plum-soft">
          <span>Remaining: ${spend.remainingUsd.toFixed(2)}</span>
          <span className="text-plum-faint">
            Cap configured via STUDIO_MONTHLY_BUDGET_USD · resets on the 1st (UTC)
          </span>
        </div>

        {spend.percentUsed >= 80 && spend.percentUsed < 100 && (
          <p className="mt-4 rounded-md bg-gold/10 px-3 py-2 text-xs text-[#8A5F1F]">
            ⚠️ Approaching monthly budget — extend STUDIO_MONTHLY_BUDGET_USD
            or wait for the next month before generating more.
          </p>
        )}
        {spend.percentUsed >= 100 && (
          <p className="mt-4 rounded-md bg-coral/10 px-3 py-2 text-xs text-coral-deep">
            🛑 Monthly budget reached. The Studio refuses further
            generation until the next calendar month or until
            STUDIO_MONTHLY_BUDGET_USD is raised.
          </p>
        )}
      </section>
    </div>
  );
}
