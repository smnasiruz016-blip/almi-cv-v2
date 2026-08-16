// Costs — what AlmiCV is spending on AI, read from StudioCostLedger.
//
// The ledger is currently WRITE-ONLY: recordGeneration() in lib/studio-cost.ts
// inserts rows and getCurrentMonthSpend() sums them for the budget gate, but no
// screen has ever displayed the breakdown. Spend recorded and looked at by
// nobody is spend you find out about on an invoice.
//
// EXPECT THIS PAGE TO READ ZERO TODAY. AlmiCV's AI features (the CV writer, the
// translator) do not call recordGeneration() yet — metering lives in
// src/lib/ai/ and is a separate coordination item. An empty ledger here means
// "no metered call has ever been recorded", NOT "the query is broken", and the
// page says which one out loud rather than showing a bare $0.00 that could mean
// either. When metering lands, this page starts reporting with no further work.
//
// Failures are listed separately because a failed call is recorded with its
// real token cost but is invisible in a success-weighted read: a burst of errors
// costs money and shows up nowhere else.

import type { Metadata } from "next";
import { DollarSign } from "lucide-react";
import { requireFounder } from "@/lib/founder";
import { prisma } from "@/lib/db";
import { getCurrentMonthSpend } from "@/lib/studio-cost";
import { AdminSubnav } from "../_components/AdminSubnav";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Costs · Admin · AlmiCV",
  robots: { index: false, follow: false },
};

const TOP_SPENDERS = 20;
const RECENT_FAILURES = 20;

/** Prisma returns Decimal for costUsd sums, and null when NO ROWS matched.
 *  Null is zero spent — a distinction worth keeping explicit, because
 *  `Number(null)` is 0 either way and would hide a genuinely broken query. */
function toUsd(value: unknown): number {
  if (value === null || value === undefined) return 0;
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function formatUsd(n: number): string {
  // Six decimals in the DB, but sub-cent totals still need to be visible —
  // rounding a $0.004 month to "$0.00" is how small leaks stay invisible.
  if (n > 0 && n < 0.01) return `$${n.toFixed(4)}`;
  return `$${n.toFixed(2)}`;
}

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

const daysAgo = (n: number): Date =>
  new Date(Date.now() - n * 24 * 60 * 60 * 1000);

async function windowTotal(since: Date | null) {
  const agg = await prisma.studioCostLedger.aggregate({
    where: since ? { timestamp: { gte: since } } : undefined,
    _sum: { costUsd: true },
    _count: { _all: true },
  });
  return { usd: toUsd(agg._sum.costUsd), calls: agg._count._all };
}

/** generationType is nullable by design — rows predating PR #52 were left null
 *  rather than backfilled. Render that as its documented meaning instead of an
 *  empty cell, so the oldest spend is still attributable. */
function featureLabel(value: string | null): string {
  if (value === null) return "studio_recipe (pre-PR-52, untagged)";
  return value;
}

export default async function CostsAdminPage() {
  await requireFounder();

  const [today, week, month, allTime, monthBudget, byFeature, byModel, topSpenders, failures, tokens] =
    await Promise.all([
      windowTotal(startOfToday()),
      windowTotal(daysAgo(7)),
      windowTotal(daysAgo(30)),
      windowTotal(null),
      getCurrentMonthSpend(),
      prisma.studioCostLedger.groupBy({
        by: ["generationType"],
        _sum: { costUsd: true },
        _count: { _all: true },
        orderBy: { _sum: { costUsd: "desc" } },
      }),
      prisma.studioCostLedger.groupBy({
        by: ["model"],
        _sum: { costUsd: true },
        _count: { _all: true },
        orderBy: { _sum: { costUsd: "desc" } },
      }),
      prisma.studioCostLedger.groupBy({
        by: ["founderEmail"],
        _sum: { costUsd: true },
        _count: { _all: true },
        orderBy: { _sum: { costUsd: "desc" } },
        take: TOP_SPENDERS,
      }),
      prisma.studioCostLedger.findMany({
        where: { success: false },
        orderBy: { timestamp: "desc" },
        take: RECENT_FAILURES,
        select: {
          id: true,
          timestamp: true,
          generationType: true,
          model: true,
          errorMessage: true,
        },
      }),
      prisma.studioCostLedger.aggregate({
        _sum: { inputTokens: true, outputTokens: true },
      }),
    ]);

  const card =
    "rounded-2xl border border-plum/10 bg-white p-4 shadow-warm-card";
  const th = "py-2 pr-3 font-medium";
  const td = "py-2 pr-3 text-xs text-plum-soft";

  return (
    <div className="space-y-6">
      <AdminSubnav active="costs" />

      <header>
        <h1 className="text-2xl text-plum">💸 Costs</h1>
        <p className="mt-1 text-sm text-plum-soft">
          AI spend recorded in StudioCostLedger, by window, feature, model and
          account.
        </p>
      </header>

      <section>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Today", v: today },
            { label: "Last 7 days", v: week },
            { label: "Last 30 days", v: month },
            { label: "All time", v: allTime },
          ].map((s) => (
            <div key={s.label} className={card}>
              <p className="text-xs uppercase tracking-wide text-plum-faint">
                {s.label}
              </p>
              <p className="mt-1 font-display text-2xl font-medium text-plum">
                {formatUsd(s.v.usd)}
              </p>
              <p className="text-xs text-plum-faint">
                {s.v.calls} call{s.v.calls === 1 ? "" : "s"}
              </p>
            </div>
          ))}
        </div>

        {allTime.calls === 0 && (
          <p className="mt-3 rounded-xl border border-plum/10 bg-cream-soft px-4 py-3 text-sm text-plum-soft">
            The ledger is empty. That means{" "}
            <strong className="text-plum">
              zero metered AI calls have ever been recorded
            </strong>{" "}
            — not that the query failed. AlmiCV&apos;s AI features do not write
            to this ledger yet; wiring them is a separate change in{" "}
            <code className="rounded bg-plum/5 px-1">src/lib/ai/</code>. This
            page will report the moment they do.
          </p>
        )}
      </section>

      <section className={card}>
        <h2 className="inline-flex items-center gap-2 text-base font-semibold text-plum">
          <DollarSign className="h-4 w-4 text-coral" />
          This calendar month vs budget
        </h2>
        <p className="mt-3 text-plum">
          <span className="font-display text-3xl font-medium">
            {formatUsd(monthBudget.spentUsd)}
          </span>{" "}
          <span className="text-sm text-plum-soft">
            of {formatUsd(monthBudget.budgetUsd)} ({monthBudget.percentUsed}%
            used, {formatUsd(monthBudget.remainingUsd)} left)
          </span>
        </p>
        <div
          className="mt-3 h-2 w-full overflow-hidden rounded-pill bg-plum/10"
          role="progressbar"
          aria-valuenow={monthBudget.percentUsed}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Monthly AI budget used"
        >
          <div
            className={`h-full rounded-pill ${
              monthBudget.percentUsed >= 80 ? "bg-coral-deep" : "bg-coral"
            }`}
            style={{ width: `${Math.min(100, monthBudget.percentUsed)}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-plum-faint">
          This is the same number the generation gate reads
          (getCurrentMonthSpend), so what blocks a run and what you see here
          cannot drift. Cap via STUDIO_MONTHLY_BUDGET_USD.
        </p>
        <p className="mt-1 text-xs text-plum-faint">
          Lifetime tokens: {(tokens._sum.inputTokens ?? 0).toLocaleString()} in ·{" "}
          {(tokens._sum.outputTokens ?? 0).toLocaleString()} out
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className={card}>
          <h2 className="text-base font-semibold text-plum">By feature</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-plum/10 text-xs uppercase tracking-wide text-plum-faint">
                  <th className={th}>Feature</th>
                  <th className={th}>Calls</th>
                  <th className="py-2 pr-0 font-medium">Spend</th>
                </tr>
              </thead>
              <tbody>
                {byFeature.length === 0 ? (
                  <tr>
                    <td className={td} colSpan={3}>
                      No calls recorded.
                    </td>
                  </tr>
                ) : (
                  byFeature.map((r) => (
                    <tr
                      key={r.generationType ?? "__null__"}
                      className="border-b border-plum/5"
                    >
                      <td className="py-2 pr-3 text-plum">
                        {featureLabel(r.generationType)}
                      </td>
                      <td className={td}>{r._count._all}</td>
                      <td className="py-2 pr-0 text-xs font-semibold text-plum">
                        {formatUsd(toUsd(r._sum.costUsd))}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className={card}>
          <h2 className="text-base font-semibold text-plum">By model</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-plum/10 text-xs uppercase tracking-wide text-plum-faint">
                  <th className={th}>Model</th>
                  <th className={th}>Calls</th>
                  <th className="py-2 pr-0 font-medium">Spend</th>
                </tr>
              </thead>
              <tbody>
                {byModel.length === 0 ? (
                  <tr>
                    <td className={td} colSpan={3}>
                      No calls recorded.
                    </td>
                  </tr>
                ) : (
                  byModel.map((r) => (
                    <tr key={r.model} className="border-b border-plum/5">
                      <td className="py-2 pr-3 text-plum">{r.model}</td>
                      <td className={td}>{r._count._all}</td>
                      <td className="py-2 pr-0 text-xs font-semibold text-plum">
                        {formatUsd(toUsd(r._sum.costUsd))}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={card}>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-base font-semibold text-plum">Top spenders</h2>
          <p className="text-xs text-plum-faint">
            Top {TOP_SPENDERS} accounts by lifetime spend. StudioCostLedger
            attributes every row to the founder who triggered it, so this is an
            owner-activity breakdown, not customer usage.
          </p>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-plum/10 text-xs uppercase tracking-wide text-plum-faint">
                <th className={th}>Account</th>
                <th className={th}>Calls</th>
                <th className="py-2 pr-0 font-medium">Spend</th>
              </tr>
            </thead>
            <tbody>
              {topSpenders.length === 0 ? (
                <tr>
                  <td className={td} colSpan={3}>
                    No attributed calls yet.
                  </td>
                </tr>
              ) : (
                topSpenders.map((r) => (
                  <tr key={r.founderEmail} className="border-b border-plum/5">
                    <td className="py-2 pr-3 text-plum">{r.founderEmail}</td>
                    <td className={td}>{r._count._all}</td>
                    <td className="py-2 pr-0 text-xs font-semibold text-plum">
                      {formatUsd(toUsd(r._sum.costUsd))}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className={card}>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-base font-semibold text-plum">Recent failures</h2>
          <p className="text-xs text-plum-faint">
            Failed calls still burn tokens. They are easy to miss in a total.
          </p>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-plum/10 text-xs uppercase tracking-wide text-plum-faint">
                <th className={th}>When</th>
                <th className={th}>Feature</th>
                <th className={th}>Model</th>
                <th className="py-2 pr-0 font-medium">Error</th>
              </tr>
            </thead>
            <tbody>
              {failures.length === 0 ? (
                <tr>
                  <td className={td} colSpan={4}>
                    No failed calls recorded.
                  </td>
                </tr>
              ) : (
                failures.map((f) => (
                  <tr key={f.id} className="border-b border-plum/5">
                    <td className={td}>{f.timestamp.toLocaleString()}</td>
                    <td className="py-2 pr-3 text-plum">
                      {featureLabel(f.generationType)}
                    </td>
                    <td className={td}>{f.model}</td>
                    <td className={td}>{f.errorMessage ?? "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
