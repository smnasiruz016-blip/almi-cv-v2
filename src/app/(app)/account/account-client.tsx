"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Loader2,
  RefreshCw,
  Sparkles,
} from "lucide-react";

type PlanKey = "FREE" | "PRO_MONTHLY" | "PRO_YEARLY";

type SyncResult =
  | { ok: true; status: string | null }
  | { ok: false; error: string };

type Props = {
  upgraded: boolean;
  billingEnabled: boolean;
  plan: PlanKey;
  planDisplayName: string;
  proActive: boolean;
  status: string | null;
  cancelAtPeriodEnd: boolean;
  currentPeriodEndIso: string | null;
  trialEndsAtIso: string | null;
  hasStripeCustomer: boolean;
  cvCount: number;
  cvLimit: number;
  aiUsageLabel: string;
  userEmail: string;
  syncAction: () => Promise<SyncResult>;
};

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function statusBadge(
  status: string | null,
  proActive: boolean,
): { label: string; className: string } {
  if (!status || !proActive) {
    return {
      label: "Free plan",
      className: "bg-plum/10 text-plum",
    };
  }
  if (status === "trialing") {
    return {
      label: "Trial",
      className: "bg-mint/30 text-[#0F4A42]",
    };
  }
  if (status === "active") {
    return {
      label: "Active",
      className: "bg-mint/30 text-[#0F4A42]",
    };
  }
  if (status === "past_due") {
    return {
      label: "Past due",
      className: "bg-coral-soft/60 text-coral-deep",
    };
  }
  if (status === "canceled") {
    return {
      label: "Cancelled",
      className: "bg-plum/10 text-plum-soft",
    };
  }
  return {
    label: status,
    className: "bg-plum/10 text-plum-soft",
  };
}

export function AccountClient({
  upgraded,
  billingEnabled,
  plan,
  planDisplayName,
  proActive,
  status,
  cancelAtPeriodEnd,
  currentPeriodEndIso,
  trialEndsAtIso,
  hasStripeCustomer,
  cvCount,
  cvLimit,
  aiUsageLabel,
  userEmail,
  syncAction,
}: Props) {
  const router = useRouter();
  const [portalLoading, setPortalLoading] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [syncMsg, setSyncMsg] = useState<string | null>(null);

  const badge = statusBadge(status, proActive);

  const handlePortal = async () => {
    setError(null);
    if (!billingEnabled) {
      setError("Billing not yet enabled");
      return;
    }
    setPortalLoading(true);
    try {
      const res = await fetch("/api/billing/portal", { method: "POST" });
      const data = (await res.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
      };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Couldn't open billing portal");
        setPortalLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch (err) {
      console.error("[account] portal failed:", err);
      setError("Couldn't reach the billing portal — try again");
      setPortalLoading(false);
    }
  };

  const handleSync = async () => {
    setError(null);
    setSyncMsg(null);
    setSyncLoading(true);
    try {
      const r = await syncAction();
      if (r.ok) {
        setSyncMsg(`Synced. Status: ${r.status ?? "no subscription"}`);
        router.refresh();
      } else {
        setError(r.error);
      }
    } catch (err) {
      console.error("[account] sync failed:", err);
      setError("Couldn't sync — try again");
    } finally {
      setSyncLoading(false);
    }
  };

  return (
    <>
      {upgraded && (
        <div
          role="status"
          className="flex items-start gap-2 rounded-xl border border-mint-glow/40 bg-mint/15 px-4 py-3 text-sm text-[#0F4A42]"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="font-medium">Welcome to Pro!</p>
            <p className="text-xs text-[#1B5E54]">
              Your trial has started. We&apos;ll email you before the first charge.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-coral/30 bg-coral-soft/40 px-4 py-3 text-sm text-coral-deep"
        >
          {error}
        </div>
      )}

      {syncMsg && (
        <div
          role="status"
          className="rounded-xl border border-plum/15 bg-cream-soft px-4 py-3 text-sm text-plum"
        >
          {syncMsg}
        </div>
      )}

      {/* Plan card */}
      <section className="rounded-2xl border border-plum/10 bg-white p-6 shadow-warm-card">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-coral">
              Plan
            </p>
            <div className="mt-2 flex items-center gap-2">
              <h2 className="font-display text-2xl font-medium text-plum">
                {planDisplayName}
              </h2>
              <span
                className={`inline-flex rounded-pill px-2.5 py-0.5 text-[11px] font-semibold ${badge.className}`}
              >
                {badge.label}
              </span>
            </div>
            <p className="mt-1 text-xs text-plum-soft">{userEmail}</p>
          </div>

          {!billingEnabled ? (
            <span className="inline-flex items-center gap-1.5 rounded-pill bg-gold/15 px-3 py-1 text-[11px] font-medium text-plum">
              Pro features coming soon
            </span>
          ) : null}
        </div>

        {proActive && (
          <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-xl bg-cream-soft px-4 py-3">
              <p className="text-[11px] uppercase tracking-wide text-plum-faint">
                {status === "trialing" ? "Trial ends" : "Next billing"}
              </p>
              <p className="mt-1 font-medium text-plum">
                {formatDate(
                  status === "trialing"
                    ? trialEndsAtIso
                    : currentPeriodEndIso,
                )}
              </p>
            </div>
            <div className="rounded-xl bg-cream-soft px-4 py-3">
              <p className="text-[11px] uppercase tracking-wide text-plum-faint">
                Renewal
              </p>
              <p className="mt-1 font-medium text-plum">
                {cancelAtPeriodEnd ? "Cancels at period end" : "Auto-renews"}
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {plan === "FREE" ? (
            !billingEnabled ? (
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-2 rounded-pill bg-coral/40 px-5 py-2 text-sm font-semibold text-white"
              >
                <Sparkles className="h-4 w-4" />
                Upgrade to Pro — coming soon
              </button>
            ) : (
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-pill bg-coral px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
              >
                <Sparkles className="h-4 w-4" />
                Upgrade to Pro
                <ArrowRight className="h-4 w-4" />
              </Link>
            )
          ) : (
            <button
              type="button"
              onClick={() => void handlePortal()}
              disabled={portalLoading || !billingEnabled || !hasStripeCustomer}
              className="inline-flex items-center gap-2 rounded-pill bg-coral px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {portalLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ExternalLink className="h-4 w-4" />
              )}
              Manage subscription
            </button>
          )}

          <button
            type="button"
            onClick={() => router.refresh()}
            className="inline-flex items-center gap-2 rounded-pill border border-plum/15 bg-white px-4 py-2 text-sm font-medium text-plum transition-colors hover:bg-cream-soft focus:outline-none focus:ring-2 focus:ring-plum/15"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>

          {hasStripeCustomer && billingEnabled && (
            <button
              type="button"
              onClick={() => void handleSync()}
              disabled={syncLoading}
              className="inline-flex items-center gap-2 rounded-pill border border-plum/15 bg-white px-4 py-2 text-sm font-medium text-plum-soft transition-colors hover:bg-cream-soft focus:outline-none focus:ring-2 focus:ring-plum/15 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {syncLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : null}
              Sync subscription status
            </button>
          )}
        </div>
      </section>

      {/* Usage card */}
      <section className="rounded-2xl border border-plum/10 bg-white p-6 shadow-warm-card">
        <h2 className="text-base font-semibold text-plum">Usage</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-cream-soft px-4 py-3">
            <p className="text-[11px] uppercase tracking-wide text-plum-faint">
              CVs created
            </p>
            <p className="mt-1 text-base font-semibold text-plum">
              {cvCount} of {cvLimit}
            </p>
          </div>
          <div className="rounded-xl bg-cream-soft px-4 py-3">
            <p className="text-[11px] uppercase tracking-wide text-plum-faint">
              AI calls
            </p>
            <p className="mt-1 text-base font-semibold text-plum">
              {aiUsageLabel}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
