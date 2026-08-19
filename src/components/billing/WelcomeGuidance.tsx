// The guidance box. Founder copy from _handoffs/AlmiCV_3day_copy.md, verbatim
// except where the code makes a claim testable:
//   - "every template" is asserted by verify-paywall.ts (no template is tier
//     "premium"), so the day someone adds one the build fails instead of the
//     copy quietly becoming a lie.
//   - the email-verification line in the copy is deliberately OMITTED: AlmiCV
//     has no email verification at all (no such column in the schema), so the
//     line would describe a step that does not exist.
//
// Three states, never two. A user who has not started must never be told their
// free days have finished — that bug shipped on AlmiPrep and blocked every user.

import Link from "next/link";
import type { ProductAccessLevel } from "@/lib/billing/plans";

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
  daysLeft,
}: {
  access: ProductAccessLevel;
  daysLeft: number | null;
}) {
  if (access === "PAID") return null;
  const expired = access === "FREE_EXPIRED";
  // THREE states, never two — in the copy as well as in the access check.
  // The footnote and the button below used to key off `expired` alone, which
  // collapsed "never started" and "active" into one branch: a user who had
  // already built a CV was still told "your 3 days start when you build your
  // first CV, not now" beneath a badge saying 3 days left. Same class of defect
  // as the two access P0s this week — two states rendering as one.
  const neverStarted = access === "NONE";

  return (
    <section className="rounded-2xl border-2 border-gray-900/15 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        {expired ? "Your 3 free days have finished" : "👋 Welcome to AlmiCV"}
      </h2>
      <p className="mt-2 text-base font-semibold text-gray-800">
        {expired
          ? "Add your card to carry on building — and to unlock the AI."
          : "Build your CV free for 3 days. No card needed."}
      </p>

      {access === "FREE_3DAY" && daysLeft !== null && (
        <p className="mt-3 inline-block rounded-md bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">
          {daysLeft === 1 ? "Last day" : `${daysLeft} days left`} of free building
        </p>
      )}

      <ol className="mt-5 space-y-4">
        {!expired && (
          <Step n="1" title="Build and download — free for 3 days">
            Every template. As many CVs as you like. Download whenever you want.{" "}
            <span className="text-gray-500">No card. Nothing to cancel.</span>
          </Step>
        )}
        <Step n={expired ? "1" : "2"} title="Want the AI to help?">
          Rewriting your wording, scoring your CV, and tailoring it to a specific job all
          use AI — that is the part that costs money to run, so it comes with the 7-day
          trial.
        </Step>
        <Step n={expired ? "2" : "3"} title="Add your card">
          <span className="font-semibold">You will not be charged today.</span>
        </Step>
        <Step n={expired ? "3" : "4"} title="Try everything for 7 days">
          Every AI feature, unlimited.
        </Step>
        <Step n={expired ? "4" : "5"} title="Continue or cancel">
          After the trial it is <span className="font-semibold">$12/month</span>. Cancel any
          time before it ends and you pay nothing.
        </Step>
      </ol>

      <div className="mt-6">
        <Link
          href={expired ? "/pricing?from=expired" : "/templates"}
          className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-gray-900 px-6 py-3 text-base font-bold text-white hover:bg-gray-800"
        >
          {expired
            ? "Start my 7-day free trial"
            : neverStarted
              ? "Start building free"
              : "Continue building"}
        </Link>
        {/* Never-started ONLY. A user mid-window has already built a CV, so
            telling them their days have not started yet is simply false. */}
        {neverStarted && (
          <p className="mt-2 text-xs text-gray-500">
            Your 3 days start when you build your first CV, not now.
          </p>
        )}
      </div>
    </section>
  );
}
