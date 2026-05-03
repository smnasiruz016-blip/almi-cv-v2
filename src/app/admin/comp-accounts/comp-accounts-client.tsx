"use client";

import { useState, useTransition } from "react";
import { Gift, Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/Toast";
import type { CompAccountRow } from "@/lib/billing/comp-accounts";

type GrantInput = { email: string; days?: number; reason?: string };
type RevokeInput = { userId: string };
type ExtendInput = { userId: string; additionalDays: number };

type ActionResult<T = undefined> =
  | (T extends undefined ? { ok: true } : { ok: true } & T)
  | { ok: false; error: string };

type Props = {
  accounts: CompAccountRow[];
  loadError: string | null;
  grantAction: (input: GrantInput) => Promise<ActionResult<{ userId: string }>>;
  revokeAction: (input: RevokeInput) => Promise<ActionResult>;
  extendAction: (input: ExtendInput) => Promise<ActionResult>;
};

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function CompAccountsClient({
  accounts,
  loadError,
  grantAction,
  revokeAction,
  extendAction,
}: Props) {
  const showToast = useToast();
  const [pending, startTransition] = useTransition();

  const [email, setEmail] = useState("");
  const [days, setDays] = useState("90");
  const [reason, setReason] = useState("");

  const [revokeTarget, setRevokeTarget] = useState<CompAccountRow | null>(null);

  const handleGrant = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      showToast("Email is required", "error");
      return;
    }
    const numDays = Number.parseInt(days, 10);
    if (!Number.isFinite(numDays) || numDays <= 0) {
      showToast("Days must be a positive number", "error");
      return;
    }
    startTransition(async () => {
      const r = await grantAction({
        email: trimmedEmail,
        days: numDays,
        reason: reason.trim() || undefined,
      });
      if (r.ok) {
        showToast(`Granted Pro access to ${trimmedEmail} for ${numDays} days`);
        setEmail("");
        setDays("90");
        setReason("");
      } else {
        showToast(r.error, "error");
      }
    });
  };

  const handleExtend = (row: CompAccountRow) => {
    startTransition(async () => {
      const r = await extendAction({
        userId: row.userId,
        additionalDays: 30,
      });
      if (r.ok) showToast(`Extended ${row.email} by 30 days`);
      else showToast(r.error, "error");
    });
  };

  const handleRevoke = (row: CompAccountRow) => {
    startTransition(async () => {
      const r = await revokeAction({ userId: row.userId });
      if (r.ok) {
        showToast(`Revoked comp for ${row.email}`);
        setRevokeTarget(null);
      } else {
        showToast(r.error, "error");
      }
    });
  };

  const active = accounts.filter((a) => a.isActive);
  const expired = accounts.filter((a) => !a.isActive);

  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-coral" />
          <h1 className="text-2xl text-plum">Comp Accounts</h1>
        </div>
        <p className="mt-1 text-sm text-plum-soft">
          Grant 90-day Pro access to beta testers without payment. Comp grants
          short-circuit Stripe checks — comped users get unlimited AI + 10 CV
          slots automatically.
        </p>
      </header>

      {loadError && (
        <div className="rounded-xl border border-coral/30 bg-coral-soft/40 px-4 py-3 text-sm text-coral-deep">
          {loadError}
        </div>
      )}

      {/* SECTION A — Grant */}
      <section className="rounded-2xl border border-plum/10 bg-white p-6 shadow-warm-card">
        <h2 className="text-base font-semibold text-plum">
          Grant new comp account
        </h2>
        <form onSubmit={handleGrant} className="mt-4 grid gap-3 sm:grid-cols-12">
          <label className="sm:col-span-5">
            <span className="block text-xs font-medium text-plum-soft">
              User email
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tester@example.com"
              className="mt-1 w-full rounded-md border border-plum/15 bg-cream-soft px-3 py-2 text-sm text-plum focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20"
            />
          </label>
          <label className="sm:col-span-2">
            <span className="block text-xs font-medium text-plum-soft">
              Days
            </span>
            <input
              type="number"
              min={1}
              max={1825}
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="mt-1 w-full rounded-md border border-plum/15 bg-cream-soft px-3 py-2 text-sm text-plum focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20"
            />
          </label>
          <label className="sm:col-span-5">
            <span className="block text-xs font-medium text-plum-soft">
              Reason (optional)
            </span>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Beta tester batch 1"
              className="mt-1 w-full rounded-md border border-plum/15 bg-cream-soft px-3 py-2 text-sm text-plum focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20"
            />
          </label>
          <div className="sm:col-span-12">
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center gap-2 rounded-pill bg-coral px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              Grant comp Pro
            </button>
          </div>
        </form>
      </section>

      {/* SECTION B — List */}
      <section className="rounded-2xl border border-plum/10 bg-white p-6 shadow-warm-card">
        <h2 className="text-base font-semibold text-plum">
          Active comp accounts
          <span className="ml-2 text-xs font-normal text-plum-faint">
            {active.length} active · {expired.length} expired
          </span>
        </h2>

        {accounts.length === 0 ? (
          <p className="mt-4 text-sm text-plum-soft">
            No comp accounts yet. Grant one above to get started.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-plum/10 text-xs uppercase tracking-wide text-plum-faint">
                  <th className="py-2 pr-3 font-medium">Email</th>
                  <th className="py-2 pr-3 font-medium">Granted</th>
                  <th className="py-2 pr-3 font-medium">Expires</th>
                  <th className="py-2 pr-3 font-medium">Days left</th>
                  <th className="py-2 pr-3 font-medium">Reason</th>
                  <th className="py-2 pr-3 font-medium">Granted by</th>
                  <th className="py-2 pr-0 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[...active, ...expired].map((row) => (
                  <tr
                    key={row.userId}
                    className={`border-b border-plum/5 ${
                      row.isActive ? "text-plum" : "text-plum-faint"
                    }`}
                  >
                    <td className="py-2 pr-3">
                      <div className="font-medium">{row.email}</div>
                      <div className="text-xs text-plum-soft">{row.name}</div>
                    </td>
                    <td className="py-2 pr-3">
                      {formatDate(row.compGrantedAt)}
                    </td>
                    <td className="py-2 pr-3">
                      {formatDate(row.compProUntil)}
                    </td>
                    <td className="py-2 pr-3">
                      {row.isActive ? (
                        <span className="inline-flex items-center gap-1 rounded-pill bg-mint/30 px-2 py-0.5 text-xs font-medium text-[#0F4A42]">
                          {row.daysRemaining} d
                        </span>
                      ) : (
                        <span className="text-xs">Expired</span>
                      )}
                    </td>
                    <td className="py-2 pr-3 text-xs">
                      {row.compReason ?? "—"}
                    </td>
                    <td className="py-2 pr-3 text-xs">
                      {row.compGrantedBy ?? "—"}
                    </td>
                    <td className="py-2 pr-0 text-right">
                      <div className="inline-flex items-center gap-1">
                        {row.isActive && (
                          <button
                            type="button"
                            onClick={() => handleExtend(row)}
                            disabled={pending}
                            className="inline-flex items-center gap-1 rounded-md border border-coral/30 px-2 py-1 text-xs font-medium text-coral transition-colors hover:bg-coral/10 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <Sparkles className="h-3 w-3" />
                            +30 d
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setRevokeTarget(row)}
                          disabled={pending}
                          className="inline-flex items-center gap-1 rounded-md border border-plum/15 px-2 py-1 text-xs font-medium text-plum-soft transition-colors hover:border-coral/40 hover:text-coral-deep disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Trash2 className="h-3 w-3" />
                          Revoke
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <Modal
        open={revokeTarget !== null}
        onClose={() => setRevokeTarget(null)}
        title="Revoke comp access?"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-plum">
            This will immediately remove Pro access for{" "}
            <span className="font-semibold">{revokeTarget?.email}</span>. Their
            CVs and data are not affected, but they revert to Free-tier limits
            (3 CVs, 5 AI calls/month) on next request.
          </p>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setRevokeTarget(null)}
              className="rounded-pill border border-plum/15 bg-white px-4 py-2 text-sm font-medium text-plum-soft transition-colors hover:bg-cream-soft"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => revokeTarget && handleRevoke(revokeTarget)}
              disabled={pending}
              className="inline-flex items-center gap-2 rounded-pill bg-coral-deep px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-coral disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending && <Loader2 className="h-4 w-4 animate-spin" />}
              Revoke access
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
