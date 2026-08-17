// Accounts — every signed-up user, searchable and paged.
//
// THE ONE RULE THIS PAGE MUST NOT BREAK: plan status is decided in exactly one
// place. The per-row badge comes from isComped()/isProActive() in
// lib/billing/plans.ts, and every SQL count and filter below is built from the
// SAME predicates and the exported ACTIVE_STATUSES — never a local copy of
// ["active", "trialing"]. A second copy of the rule is how an admin screen comes
// to show "Pro" for a user the product refuses to let in, with nothing failing
// loudly.
//
// "status IN (active, trialing)" alone is NOT the rule: isProActive() also
// requires subscriptionCurrentPeriodEnd in the future. Both clauses live in
// lib/billing/plan-where.ts, and the stat tiles are counted with those very
// expressions, so the tiles and the filtered table cannot disagree.
//
// The Free tile is now counted in SQL rather than derived as
// (total - comp - pro). Subtraction can never fail the Free+Pro+Comp==Total
// invariant — it satisfies it by construction, which means it also cannot
// DETECT anything. Counting all four independently turns that identity into a
// real cross-check, and scripts/verify-account-tiles.ts asserts it on live rows.

import Link from "next/link";
import { Users } from "lucide-react";
import type { Prisma } from "@prisma/client";
import { requireFounder } from "@/lib/founder";
import { prisma } from "@/lib/db";
import { isComped, isProActive } from "@/lib/billing/plans";
import { isOwner } from "@/lib/owner";
import {
  planWhere,
  PLAN_STATUSES,
  type PlanStatus,
} from "@/lib/billing/plan-where";
import { AdminSubnav } from "../_components/AdminSubnav";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Accounts · Admin · AlmiCV",
};

const PAGE_SIZE = 20;
// Mirrors SESSION_DURATION_MS in src/lib/auth.ts. Session.expiresAt is
// (createdAt + 30 days), so subtracting back recovers when the user last
// signed in to mint that session.
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000;

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

export default async function AccountsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
}) {
  await requireFounder();

  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const status: PlanStatus = PLAN_STATUSES.includes(sp.status as PlanStatus)
    ? (sp.status as PlanStatus)
    : "all";
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);

  const now = new Date();

  // Postgres `mode: "insensitive"` — a founder searching "Nasir" should not have
  // to guess the stored casing.
  const search: Prisma.UserWhereInput | undefined = q
    ? {
        OR: [
          { email: { contains: q, mode: "insensitive" } },
          { name: { contains: q, mode: "insensitive" } },
        ],
      }
    : undefined;

  const where: Prisma.UserWhereInput = {
    AND: [planWhere(status, now), search].filter(
      Boolean,
    ) as Prisma.UserWhereInput[],
  };

  const [users, matching, total, compCount, proCount, freeCount, ownerCount] =
    await Promise.all([
      prisma.user.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        select: {
          id: true,
          email: true,
          name: true,
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
      prisma.user.count({ where }),
      // The tiles describe the whole user base, not the current query — so they
      // stay a stable reference point while you filter the table under them.
      prisma.user.count(),
      // planWhere("comp"), not compActive(), so the owner is carved out of this
      // bucket the same way it is carved out of Pro and Free. Using the raw
      // predicate here would double-count an owner who also holds a comp grant
      // and break Free + Pro + Comp + Owner == Total.
      prisma.user.count({ where: planWhere("comp", now) }),
      prisma.user.count({ where: planWhere("pro", now) }),
      prisma.user.count({ where: planWhere("free", now) }),
      prisma.user.count({ where: planWhere("owner", now) }),
    ]);

  const pages = Math.max(1, Math.ceil(matching / PAGE_SIZE));
  const firstRow = matching === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const lastRow = Math.min(page * PAGE_SIZE, matching);

  // Preserve q + status when paging, so page 2 of a search is still that search.
  const qs = (over: Record<string, string | number>) => {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (status !== "all") p.set("status", status);
    for (const [k, v] of Object.entries(over)) {
      if (v === "" || v === "all" || v === 1) p.delete(k);
      else p.set(k, String(v));
    }
    const s = p.toString();
    return s ? `/admin/accounts?${s}` : "/admin/accounts";
  };

  const tileTotal = freeCount + proCount + compCount + ownerCount;

  return (
    <div className="space-y-6">
      <AdminSubnav active="accounts" />

      <header>
        <h1 className="text-2xl text-plum">👥 Accounts</h1>
        <p className="mt-1 text-sm text-plum-soft">
          Every signed-up user, with plan and last active time.
        </p>
      </header>

      <section className="rounded-2xl border border-plum/10 bg-white p-6 shadow-warm-card">
        <h2 className="inline-flex items-center gap-2 text-base font-semibold text-plum">
          <Users className="h-4 w-4 text-coral" />
          Account totals
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {[
            { label: "Total", value: total },
            { label: "Free", value: freeCount },
            { label: "Pro", value: proCount },
            { label: "Comp", value: compCount },
            { label: "Owner", value: ownerCount },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-plum/10 bg-cream-soft px-4 py-3"
            >
              <p className="text-xs uppercase tracking-wide text-plum-faint">
                {s.label}
              </p>
              <p className="mt-1 font-display text-2xl font-medium text-plum">
                {s.value}
              </p>
            </div>
          ))}
        </div>
        {/* Each tile is counted independently, so they CAN disagree with the
            total — and if they ever do, that is a real defect in the predicates,
            not a rounding artefact. Say so on the page rather than silently
            rendering numbers that do not add up. */}
        {tileTotal !== total && (
          <p className="mt-3 rounded-xl border border-coral/40 bg-coral/10 px-4 py-3 text-sm text-coral-deep">
            ⚠️ Free + Pro + Comp + Owner = {tileTotal}, but the total is {total}. The plan
            predicates disagree with each other — treat these counts as untrusted
            until it is fixed.
          </p>
        )}
      </section>

      {/* Plain GET form: linkable, survives reload, needs no client JS. */}
      <form
        method="GET"
        action="/admin/accounts"
        className="flex flex-wrap items-end gap-3"
      >
        <div className="min-w-[200px] flex-1">
          <label
            htmlFor="q"
            className="block text-xs font-semibold uppercase tracking-wide text-plum-faint"
          >
            Search
          </label>
          <input
            id="q"
            name="q"
            defaultValue={q}
            placeholder="Email or name"
            className="mt-1 w-full rounded-xl border border-plum/15 bg-white px-3 py-2 text-sm text-plum focus:border-coral focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="status"
            className="block text-xs font-semibold uppercase tracking-wide text-plum-faint"
          >
            Plan
          </label>
          <select
            id="status"
            name="status"
            defaultValue={status}
            className="mt-1 rounded-xl border border-plum/15 bg-white px-3 py-2 text-sm text-plum focus:border-coral focus:outline-none"
          >
            <option value="all">All</option>
            <option value="free">Free</option>
            <option value="pro">Pro</option>
            <option value="comp">Comp</option>
            <option value="owner">Owner</option>
          </select>
        </div>
        <button
          type="submit"
          className="min-h-[44px] rounded-pill bg-coral px-5 py-2 text-sm font-semibold text-white transition hover:bg-coral-deep"
        >
          Apply
        </button>
        {(q || status !== "all") && (
          <Link
            href="/admin/accounts"
            className="text-sm font-medium text-coral-deep hover:underline"
          >
            Clear
          </Link>
        )}
      </form>

      <section className="rounded-2xl border border-plum/10 bg-white p-6 shadow-warm-card">
        <h2 className="inline-flex items-center gap-2 text-base font-semibold text-plum">
          <Users className="h-4 w-4 text-coral" />
          {q || status !== "all" ? "Matching accounts" : "All accounts"}
        </h2>

        <p className="mt-2 text-xs text-plum-faint">
          {matching === 0
            ? "No accounts match."
            : `${matching} account${matching === 1 ? "" : "s"} match — showing ${firstRow}–${lastRow}.`}
        </p>

        {users.length === 0 ? (
          <p className="mt-4 text-sm text-plum-soft">
            {q || status !== "all"
              ? "Nothing here. Try a different search or clear the filter."
              : "No accounts yet."}
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-plum/10 text-xs uppercase tracking-wide text-plum-faint">
                  <th className="py-2 pr-3 font-medium">Email</th>
                  <th className="py-2 pr-3 font-medium">Name</th>
                  <th className="py-2 pr-3 font-medium">Created</th>
                  <th className="py-2 pr-3 font-medium">Plan</th>
                  <th className="py-2 pr-0 font-medium">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  // Same predicates as the SQL above, applied per row — and in
                  // the same precedence order, so a row lands in exactly the
                  // bucket its tile counted it in.
                  const owner = isOwner(u.email);
                  const comped = !owner && isComped(u);
                  const pro = !owner && !comped && isProActive(u);
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
                        {u.name}
                      </td>
                      <td className="py-2 pr-3 text-xs text-plum-soft">
                        {formatDate(u.createdAt)}
                      </td>
                      <td className="py-2 pr-3 text-xs">
                        {owner ? (
                          <span className="inline-flex items-center gap-1 rounded-pill bg-plum/10 px-2 py-0.5 text-plum">
                            ★ Owner
                          </span>
                        ) : comped ? (
                          <span className="inline-flex items-center gap-1 rounded-pill bg-coral/10 px-2 py-0.5 text-coral-deep">
                            🎁 Comp
                          </span>
                        ) : pro ? (
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

        {pages > 1 && (
          <div className="mt-4 flex items-center justify-between border-t border-plum/10 pt-4 text-sm">
            {page > 1 ? (
              <Link
                href={qs({ page: page - 1 })}
                className="font-medium text-coral-deep hover:underline"
              >
                ← Previous
              </Link>
            ) : (
              <span className="text-plum-faint">← Previous</span>
            )}
            <span className="text-xs text-plum-soft">
              Page {page} of {pages}
            </span>
            {page < pages ? (
              <Link
                href={qs({ page: page + 1 })}
                className="font-medium text-coral-deep hover:underline"
              >
                Next →
              </Link>
            ) : (
              <span className="text-plum-faint">Next →</span>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
