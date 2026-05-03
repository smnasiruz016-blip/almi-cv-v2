"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Check, Loader2, Sparkles, Star } from "lucide-react";
import { STRIPE_PRICES } from "@/lib/billing/plans";

type PlanKey = "FREE" | "PRO_MONTHLY" | "PRO_YEARLY";

type Props = {
  isLoggedIn: boolean;
  currentPlan: PlanKey;
  billingEnabled: boolean;
};

const FREE_FEATURES = [
  "Up to 3 CVs",
  "5 AI assists / month",
  "Free templates",
  "PDF export",
  "Resume score checker",
];

const PRO_FEATURES = [
  "Up to 10 CVs",
  "Unlimited AI (rewrite, tailor, summary, cover letters, chat)",
  "All premium templates",
  "AI Translator (8 languages)",
  "Interview Prep generator",
  "Priority support",
];

const YEARLY_HIGHLIGHT = "Save $24 / year";

function CtaButton({
  loading,
  disabled,
  variant,
  onClick,
  children,
}: {
  loading?: boolean;
  disabled?: boolean;
  variant: "primary" | "secondary";
  onClick: () => void;
  children: React.ReactNode;
}) {
  const base =
    "inline-flex w-full items-center justify-center gap-2 rounded-pill px-5 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60";
  const styles =
    variant === "primary"
      ? "bg-coral text-white hover:bg-coral-deep focus:ring-coral/30"
      : "border border-plum/20 bg-white text-plum hover:bg-cream-soft focus:ring-plum/15";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${styles}`}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
}

export function PricingClient({
  isLoggedIn,
  currentPlan,
  billingEnabled,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cancelled = searchParams.get("cancelled") === "true";

  const [loadingPlan, setLoadingPlan] = useState<
    "PRO_MONTHLY" | "PRO_YEARLY" | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async (
    plan: "PRO_MONTHLY" | "PRO_YEARLY",
    priceId: string,
  ) => {
    setError(null);
    if (!isLoggedIn) {
      router.push("/signup?next=/pricing");
      return;
    }
    if (!billingEnabled) return;
    if (currentPlan !== "FREE") {
      router.push("/account");
      return;
    }
    setLoadingPlan(plan);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
      };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Couldn't start checkout — try again");
        setLoadingPlan(null);
        return;
      }
      window.location.href = data.url;
    } catch (err) {
      console.error("[pricing] checkout failed:", err);
      setError("Couldn't reach the checkout service — try again");
      setLoadingPlan(null);
    }
  };

  const isPro = currentPlan === "PRO_MONTHLY" || currentPlan === "PRO_YEARLY";

  return (
    <>
      {cancelled && (
        <div
          role="status"
          className="mx-auto mt-6 max-w-md rounded-xl border border-plum/15 bg-cream-soft px-4 py-3 text-center text-sm text-plum"
        >
          Checkout cancelled. No charge was made.
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mx-auto mt-6 max-w-md rounded-xl border border-coral/30 bg-coral-soft/40 px-4 py-3 text-center text-sm text-coral-deep"
        >
          {error}
        </div>
      )}

      {!billingEnabled && (
        <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-gold/40 bg-gold/10 px-5 py-3 text-center text-sm text-plum">
          <span className="font-medium">Coming soon — launching in days, inshaAllah.</span>
          <span className="ml-1 text-plum-soft">
            You can browse plans now; checkout opens when we go live.
          </span>
        </div>
      )}

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {/* FREE */}
        <div className="flex flex-col rounded-2xl border border-plum/10 bg-white p-6 shadow-warm-card">
          <div>
            <h2 className="text-base font-semibold text-plum">Free</h2>
            <p className="mt-1 text-xs text-plum-soft">
              Perfect for getting started
            </p>
            <p className="mt-4 font-display text-4xl font-bold text-plum">
              $0
              <span className="ml-1 text-sm font-normal text-plum-soft">
                /month
              </span>
            </p>
          </div>
          <ul className="mt-5 flex-1 space-y-2.5 text-sm text-plum">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            {isLoggedIn && currentPlan === "FREE" ? (
              <button
                type="button"
                disabled
                className="inline-flex w-full items-center justify-center rounded-pill border border-plum/15 bg-cream-soft px-5 py-2.5 text-sm font-medium text-plum-soft"
              >
                Current plan
              </button>
            ) : isLoggedIn ? (
              <Link
                href="/dashboard"
                className="inline-flex w-full items-center justify-center rounded-pill border border-plum/20 bg-white px-5 py-2.5 text-sm font-semibold text-plum transition-colors hover:bg-cream-soft"
              >
                Back to dashboard
              </Link>
            ) : (
              <Link
                href="/signup"
                className="inline-flex w-full items-center justify-center gap-2 rounded-pill border border-plum/20 bg-white px-5 py-2.5 text-sm font-semibold text-plum transition-colors hover:bg-cream-soft"
              >
                Sign up free
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>

        {/* PRO MONTHLY */}
        <div className="flex flex-col rounded-2xl border border-plum/10 bg-white p-6 shadow-warm-card">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-coral" />
              <h2 className="text-base font-semibold text-plum">Pro Monthly</h2>
            </div>
            <p className="mt-1 text-xs text-plum-soft">7-day free trial</p>
            <p className="mt-4 font-display text-4xl font-bold text-plum">
              $7
              <span className="ml-1 text-sm font-normal text-plum-soft">
                /month
              </span>
            </p>
          </div>
          <ul className="mt-5 flex-1 space-y-2.5 text-sm text-plum">
            {PRO_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            {isPro && currentPlan === "PRO_MONTHLY" ? (
              <Link
                href="/account"
                className="inline-flex w-full items-center justify-center rounded-pill border border-plum/15 bg-cream-soft px-5 py-2.5 text-sm font-medium text-plum"
              >
                Current plan · Manage
              </Link>
            ) : isPro ? (
              <Link
                href="/account"
                className="inline-flex w-full items-center justify-center gap-2 rounded-pill border border-plum/20 bg-white px-5 py-2.5 text-sm font-semibold text-plum transition-colors hover:bg-cream-soft"
              >
                Manage subscription
              </Link>
            ) : !billingEnabled ? (
              <CtaButton variant="secondary" disabled onClick={() => {}}>
                Coming soon — launching in days
              </CtaButton>
            ) : (
              <CtaButton
                variant="secondary"
                loading={loadingPlan === "PRO_MONTHLY"}
                disabled={loadingPlan !== null}
                onClick={() =>
                  void handleCheckout("PRO_MONTHLY", STRIPE_PRICES.PRO_MONTHLY)
                }
              >
                Start 7-day free trial
              </CtaButton>
            )}
          </div>
        </div>

        {/* PRO YEARLY */}
        <div className="relative flex flex-col rounded-2xl border-2 border-coral bg-white p-6 shadow-warm-card-hover">
          <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-pill bg-coral px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            <Star className="h-3 w-3 fill-current" />
            Best value · {YEARLY_HIGHLIGHT}
          </span>
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-coral" />
              <h2 className="text-base font-semibold text-plum">Pro Yearly</h2>
            </div>
            <p className="mt-1 text-xs text-plum-soft">
              7-day free trial · save 28%
            </p>
            <p className="mt-4 font-display text-4xl font-bold text-plum">
              $60
              <span className="ml-1 text-sm font-normal text-plum-soft">
                /year
              </span>
            </p>
            <p className="mt-1 text-xs text-plum-soft">
              That's $5/month, billed annually.
            </p>
          </div>
          <ul className="mt-5 flex-1 space-y-2.5 text-sm text-plum">
            {PRO_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            {isPro && currentPlan === "PRO_YEARLY" ? (
              <Link
                href="/account"
                className="inline-flex w-full items-center justify-center rounded-pill border border-plum/15 bg-cream-soft px-5 py-2.5 text-sm font-medium text-plum"
              >
                Current plan · Manage
              </Link>
            ) : isPro ? (
              <Link
                href="/account"
                className="inline-flex w-full items-center justify-center gap-2 rounded-pill border border-plum/20 bg-white px-5 py-2.5 text-sm font-semibold text-plum transition-colors hover:bg-cream-soft"
              >
                Manage subscription
              </Link>
            ) : !billingEnabled ? (
              <CtaButton variant="primary" disabled onClick={() => {}}>
                Coming soon — launching in days
              </CtaButton>
            ) : (
              <CtaButton
                variant="primary"
                loading={loadingPlan === "PRO_YEARLY"}
                disabled={loadingPlan !== null}
                onClick={() =>
                  void handleCheckout("PRO_YEARLY", STRIPE_PRICES.PRO_YEARLY)
                }
              >
                Start 7-day free trial
              </CtaButton>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <p className="text-xs text-plum-faint">
          Cancel anytime via Stripe Customer Portal · Secure checkout · No
          charge during free trial
        </p>
      </div>
    </>
  );
}
