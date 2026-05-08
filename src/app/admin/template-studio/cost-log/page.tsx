import { requireFounder } from "@/lib/founder";
import { prisma } from "@/lib/db";
import { AdminSubnav } from "@/app/admin/_components/AdminSubnav";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Cost Log · Studio · Admin · AlmiCV",
};

const PAGE_LIMIT = 200;

function formatTimestamp(ts: Date): string {
  // YYYY-MM-DD HH:MM UTC — small + sortable + unambiguous.
  const iso = ts.toISOString();
  return `${iso.slice(0, 10)} ${iso.slice(11, 16)} UTC`;
}

export default async function CostLogPage() {
  await requireFounder();

  const now = new Date();
  const monthStart = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1),
  );

  const rows = await prisma.studioCostLedger.findMany({
    where: { timestamp: { gte: monthStart } },
    orderBy: { timestamp: "desc" },
    take: PAGE_LIMIT,
  });

  return (
    <div className="space-y-6">
      <AdminSubnav active="cost-log" />

      <section className="rounded-2xl border border-peach/40 bg-white p-6 shadow-warm-card">
        <div className="flex items-baseline justify-between gap-3">
          <h1 className="font-display text-2xl text-plum">Cost Log</h1>
          <span className="text-xs text-plum-soft">
            Current calendar month · most recent first · capped at {PAGE_LIMIT} rows
          </span>
        </div>

        {rows.length === 0 ? (
          <p className="mt-6 rounded-xl border border-dashed border-plum/15 px-6 py-10 text-center text-sm text-plum-soft">
            No API calls yet. The cost log fills up once Stage 3b ships.
          </p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-plum/10 text-left text-[10px] uppercase tracking-widest text-plum-soft">
                  <th className="py-2 pr-3">Time</th>
                  <th className="py-2 pr-3">Model</th>
                  <th className="py-2 pr-3 text-right">In tokens</th>
                  <th className="py-2 pr-3 text-right">Out tokens</th>
                  <th className="py-2 pr-3 text-right">Cost</th>
                  <th className="py-2 pr-3">Generation</th>
                  <th className="py-2 pr-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-plum/5 last:border-b-0"
                  >
                    <td className="py-2 pr-3 font-mono text-xs text-plum-soft">
                      {formatTimestamp(r.timestamp)}
                    </td>
                    <td className="py-2 pr-3 font-mono text-xs text-plum">
                      {r.model}
                    </td>
                    <td className="py-2 pr-3 text-right tabular-nums text-plum">
                      {r.inputTokens.toLocaleString()}
                    </td>
                    <td className="py-2 pr-3 text-right tabular-nums text-plum">
                      {r.outputTokens.toLocaleString()}
                    </td>
                    <td className="py-2 pr-3 text-right tabular-nums text-plum">
                      ${Number(r.costUsd).toFixed(4)}
                    </td>
                    <td className="py-2 pr-3 font-mono text-[11px] text-plum-soft">
                      {r.generationId.slice(0, 8)}
                    </td>
                    <td className="py-2 pr-3">
                      {r.success ? (
                        <span className="text-mint" title="success">
                          ✓
                        </span>
                      ) : (
                        <span
                          className="text-coral-deep"
                          title={r.errorMessage ?? "failed"}
                        >
                          ✗
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
