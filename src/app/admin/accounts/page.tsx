import { Users } from "lucide-react";
import { requireFounder } from "@/lib/founder";
import { prisma } from "@/lib/db";
import { AdminSubnav } from "../_components/AdminSubnav";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Accounts · Admin · AlmiCV",
};

const PAGE_LIMIT = 20;
// Mirrors SESSION_DURATION_MS in src/lib/auth.ts. Session.expiresAt is
// (createdAt + 30 days), so subtracting back recovers when the user last
// signed in to mint that session.
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000;
const ACTIVE_STATUSES = ["active", "trialing"];

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getLastActive(
  sessionExpires: Date | null | undefined,
  updatedAt: Date,
): Date {
  if (!sessionExpires) return updatedAt;
  const derived = new Date(sessionExpires.getTime() - SESSION_DURATION_MS);
  return derived.getTime() > updatedAt.getTime() ? derived : updatedAt;
}

type Plan = "free" | "pro" | "comp";

function classifyPlan(user: {
  compProUntil: Date | null;
  subscriptionStatus: string | null;
  subscriptionCurrentPeriodEnd: Date | null;
}): Plan {
  const now = Date.now();
  if (user.compProUntil && user.compProUntil.getTime() > now) return "comp";
  if (
    user.subscriptionStatus &&
    ACTIVE_STATUSES.includes(user.subscriptionStatus) &&
    user.subscriptionCurrentPeriodEnd &&
    user.subscriptionCurrentPeriodEnd.getTime() > now
  ) {
    return "pro";
  }
  return "free";
}

export default async function AccountsAdminPage() {
  await requireFounder();
  const now = new Date();

  const [total, compCount, proCount, users] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { compProUntil: { gt: now } } }),
    prisma.user.count({
      where: {
        subscriptionStatus: { in: ACTIVE_STATUSES },
        subscriptionCurrentPeriodEnd: { gt: now },
        OR: [{ compProUntil: null }, { compProUntil: { lte: now } }],
      },
    }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: PAGE_LIMIT,
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        compProUntil: true,
        subscriptionStatus: true,
        subscriptionCurrentPeriodEnd: true,
        sessions: {
          orderBy: { expiresAt: "desc" },
          take: 1,
          select: { expiresAt: true },
        },
      },
    }),
  ]);

  const freeCount = total - compCount - proCount;

  return (
    <div className="space-y-6">
      <AdminSubnav active="accounts" />

      <header>
        <h1 className="text-2xl text-plum">👥 Accounts</h1>
        <p className="mt-1 text-sm text-plum-soft">
          Every signed-up user, with plan and last active time. Most recent{" "}
          {PAGE_LIMIT}.
        </p>
      </header>

      <section className="rounded-2xl border border-plum/10 bg-white p-6 shadow-warm-card">
        <h2 className="inline-flex items-center gap-2 text-base font-semibold text-plum">
          <Users className="h-4 w-4 text-coral" />
          Account totals
        </h2>
        <p className="mt-3 text-plum">
          <span className="font-display text-3xl font-medium">{total}</span>{" "}
          <span className="text-sm text-plum-soft">
            total account{total === 1 ? "" : "s"}
          </span>
        </p>
        <ul className="mt-2 space-y-0.5 text-xs text-plum-soft">
          <li>· {freeCount} Free</li>
          <li>· {proCount} Pro (paid subscription)</li>
          <li>· {compCount} Comp (founder-granted)</li>
        </ul>
      </section>

      <section className="rounded-2xl border border-plum/10 bg-white p-6 shadow-warm-card">
        <h2 className="inline-flex items-center gap-2 text-base font-semibold text-plum">
          <Users className="h-4 w-4 text-coral" />
          Recent accounts
          <span className="text-xs font-normal text-plum-faint">
            (most recent {PAGE_LIMIT})
          </span>
        </h2>
        {users.length === 0 ? (
          <p className="mt-4 text-sm text-plum-soft">No accounts yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-plum/10 text-xs uppercase tracking-wide text-plum-faint">
                  <th className="py-2 pr-3 font-medium">Email</th>
                  <th className="py-2 pr-3 font-medium">Created</th>
                  <th className="py-2 pr-3 font-medium">Plan</th>
                  <th className="py-2 pr-0 font-medium">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  const plan = classifyPlan(u);
                  const lastActive = getLastActive(
                    u.sessions[0]?.expiresAt,
                    u.updatedAt,
                  );
                  return (
                    <tr key={u.id} className="border-b border-plum/5">
                      <td className="py-2 pr-3 font-medium text-plum">
                        {u.email}
                      </td>
                      <td className="py-2 pr-3 text-xs text-plum-soft">
                        {formatDate(u.createdAt)}
                      </td>
                      <td className="py-2 pr-3 text-xs">
                        {plan === "comp" ? (
                          <span className="inline-flex items-center gap-1 rounded-pill bg-coral/10 px-2 py-0.5 text-coral-deep">
                            🎁 Comp
                          </span>
                        ) : plan === "pro" ? (
                          <span className="inline-flex items-center gap-1 rounded-pill bg-coral/15 px-2 py-0.5 text-coral-deep">
                            Pro
                          </span>
                        ) : (
                          <span className="text-plum-soft">Free</span>
                        )}
                      </td>
                      <td className="py-2 pr-0 text-xs text-plum-soft">
                        {formatDate(lastActive)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
