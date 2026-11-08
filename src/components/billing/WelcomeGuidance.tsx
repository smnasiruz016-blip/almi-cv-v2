// The guidance box. RR-391 (owner, 7 Nov 2026: "3 free CVs (without AI), 12 USD per month, the new offer from now
// on"): it replaces the no-card window copy and the trial copy.
//   - "every template" is asserted by verify-paywall.ts (no template is tier "premium"), so the day someone adds
//     one the build fails instead of the copy quietly becoming a lie.
//   - The free CVs left are the server's own count (freeCvsLeft in plans.ts, the account's lifetime rows).
// Two states: FREE (with its count) and PAID (nothing shown).

import Link from "next/link";
import { FREE_CV_LIMIT, MONTHLY_PRICE_DISPLAY, type ProductAccessLevel } from "@/lib/billing/plans";

function Step({ n, title, children }: { n: string; title: string; children?: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span
        aria-hidden
        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white"
      >
        {n}
      </span>
      <div>
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        {children && <div className="mt-0.5 text-sm text-gray-700">{children}</div>}
      </div>
    </li>
  );
}

export function WelcomeGuidance({
  access,
  freeLeft,
}: {
  access: ProductAccessLevel;
  /** free CVs this account can still create (null = unlimited) */
  freeLeft: number | null;
}) {
  if (access === "PAID") return null;
  const usedUp = freeLeft === 0;

  return (
    <section className="rounded-2xl border-2 border-gray-900/15 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        {usedUp ? `You have used your ${FREE_CV_LIMIT} free CVs` : "👋 Welcome to AlmiCV"}
      </h2>
      <p className="mt-2 text-base font-semibold text-gray-800">
        {usedUp
          ? `Get unlimited CVs and AI for ${MONTHLY_PRICE_DISPLAY}/month. Your CVs stay yours: you can still edit and download them.`
          : `${FREE_CV_LIMIT} free CVs (without AI), then ${MONTHLY_PRICE_DISPLAY}/month for AI and unlimited CVs.`}
      </p>

      {!usedUp && freeLeft !== null && (
        <p className="mt-3 inline-block rounded-md bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">
          {freeLeft === 1 ? "1 free CV left" : `${freeLeft} free CVs left`}
        </p>
      )}

      <ol className="mt-5 space-y-4">
        <Step n="1" title={`Build and download — ${FREE_CV_LIMIT} CVs free`}>
          Every template. PDF download with no watermark.{" "}
          <span className="text-gray-500">No card. Nothing to cancel.</span>
        </Step>
        <Step n="2" title="Want the AI to help?">
          Rewriting your wording, scoring your CV and tailoring it to a job all use AI. AI is in the{" "}
          <span className="font-semibold">{MONTHLY_PRICE_DISPLAY}/month</span> plan, with unlimited CVs.
        </Step>
        <Step n="3" title="Cancel any time">
          The plan is monthly. Cancel whenever you like from your account.
        </Step>
      </ol>

      <div className="mt-6">
        <Link
          href={usedUp ? "/pricing?from=free-cvs" : "/templates"}
          className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-gray-900 px-6 py-3 text-base font-bold text-white hover:bg-gray-800"
        >
          {usedUp ? `Get unlimited CVs and AI — ${MONTHLY_PRICE_DISPLAY}/month` : "Build a free CV"}
        </Link>
      </div>
    </section>
  );
}
