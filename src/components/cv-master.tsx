// AlmiCV MASTER copy — doctrine-clean, Nasir's approved voice (AlmiCV_Perfect_Master.md).
// This module is the single source of the master sales copy so it flows to EVERY
// landing route at once (country hubs, role×country, from-origin, jobs, role
// templates). Each page keeps its own LOCALIZED middle (conventions, language,
// currency/cities, role content) and wraps it with these master sections.
//
// Theme: AlmiCV family cream/coral/plum (NOT black/gold — that's only the global
// footer chrome). No banned verbs, no "guaranteed", no "recruiter-vetted".

import Link from "next/link";

const START_FREE_HREF = "/signup";
const TEMPLATES_HREF = "/templates";

// ── 1. Hook ──────────────────────────────────────────────────────────────────
// `context` localizes the master hook, e.g. "in Germany" or
// "hiring for a Software Engineer role in Germany". `heading` is the page's own
// SEO H1 (kept localized); the hook is the lead paragraph beneath it.
export function CvMasterHook({
  heading,
  context,
  ctaHref = START_FREE_HREF,
}: {
  heading: string;
  context: string;
  ctaHref?: string;
}) {
  return (
    <header className="mb-10">
      <p className="text-xs font-semibold uppercase tracking-wide text-coral mb-3">
        No download traps · no weekly billing
      </p>
      <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-plum mb-4">
        {heading}
      </h1>
      <p className="text-base sm:text-lg text-plum-soft leading-relaxed max-w-3xl">
        Right now, a robot (an ATS) is deleting your CV before a human {context}{" "}
        ever reads it — not because you&apos;re not good enough, but because your CV
        doesn&apos;t speak its language. AlmiCV fixes that.
      </p>
      <div className="mt-6">
        <Link
          href={ctaHref}
          className="inline-block px-7 py-3.5 rounded-md bg-coral text-white text-base font-semibold hover:bg-coral-deep transition-colors"
        >
          Open Dashboard — Start Free →
        </Link>
        <p className="text-xs text-plum-soft mt-2">Free to start · Pro is $7/month.</p>
      </div>
    </header>
  );
}

// ── 2. Price trap ────────────────────────────────────────────────────────────
export function CvMasterPriceTrap() {
  return (
    <section className="mb-10 rounded-xl border border-peach bg-white p-6 sm:p-8" aria-labelledby="price-trap-title">
      <h2 id="price-trap-title" className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-3">
        The price trap of traditional builders
      </h2>
      <p className="text-base text-plum-soft leading-relaxed max-w-3xl">
        Resume.io charges around $30 every 4 weeks — roughly $389 a year. Zety bills
        you weekly and traps your finished document behind an unannounced download
        paywall.
      </p>
      <p className="mt-3 text-base text-plum leading-relaxed max-w-3xl font-medium">
        AlmiCV charges $7 flat per month. No download walls. No tricks. We want you to
        stay because we&apos;re good — not because you&apos;re trapped.
      </p>
    </section>
  );
}

// ── 3. The invisible gate ────────────────────────────────────────────────────
export function CvMasterInvisibleGate() {
  return (
    <section className="mb-10" aria-labelledby="invisible-gate-title">
      <h2 id="invisible-gate-title" className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-3">
        The invisible gate
      </h2>
      <p className="text-base text-plum-soft leading-relaxed max-w-3xl">
        Around 75% of resumes are filtered out by ATS software before a human ever
        sees them. Every silent rejection means a machine threw your document out in
        seconds — over formatting or missing keywords.
      </p>
      <p className="mt-3 text-base text-plum-soft leading-relaxed max-w-3xl">
        AlmiCV ends the guessing. Our resume checker reviews your document the way
        company software does, flagging problems instantly so you fix them live —
        before you hit apply.
      </p>
    </section>
  );
}

// ── 4. Features ──────────────────────────────────────────────────────────────
const FEATURES: ReadonlyArray<{ title: string; body: string }> = [
  {
    title: "A real ATS score — not a vanity number",
    body: "Clear, data-backed checks on your document structure, so it reaches human hands instead of vanishing in a database.",
  },
  {
    title: "AI that sounds like you — only sharper",
    body: "It rewrites weak lines in your own voice. “Managed a team” becomes “Led a team of 8 to deliver features ahead of schedule.” No robotic filler.",
  },
  {
    title: "Unlimited tailoring",
    body: "The real trick to beating tracking systems is tailoring your CV to each posting. Our Pro tier opens unlimited CV variants for you, so you can match every role.",
  },
  {
    title: "Built for the systems you'll actually face",
    body: "Clean, ATS-safe layouts built to pass the checks most ATS software runs.",
  },
];

export function CvMasterFeatures() {
  return (
    <section className="mb-12" aria-labelledby="features-title">
      <h2 id="features-title" className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-5">
        Everything your CV needs to get past the ATS
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FEATURES.map((f) => (
          <li key={f.title} className="rounded-lg border border-peach bg-white p-5">
            <p className="font-semibold text-plum mb-1.5">{f.title}</p>
            <p className="text-sm text-plum-soft leading-relaxed">{f.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ── 6. Pricing ───────────────────────────────────────────────────────────────
const PRICING_ROWS: ReadonlyArray<{ feature: string; free: string; pro: string; yearly: string }> = [
  { feature: "CVs you can store", free: "Up to 3", pro: "Unlimited", yearly: "Unlimited" },
  { feature: "AI assists", free: "5 / month", pro: "Unlimited", yearly: "Unlimited" },
  { feature: "Premium layouts", free: "Standard", pro: "All layouts open", yearly: "All layouts open" },
  { feature: "Translation", free: "—", pro: "8 major languages", yearly: "8 major languages" },
  { feature: "Interview prep", free: "—", pro: "Custom question generator", yearly: "Custom question generator" },
  { feature: "Billing", free: "$0 forever", pro: "Cancel anytime (Stripe)", yearly: "Billed yearly (~$5/mo)" },
];

export function CvMasterPricing() {
  return (
    <section className="mb-12" aria-labelledby="pricing-title">
      <h2 id="pricing-title" className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-5">
        Simple pricing — Free, $7/mo, or $60/yr
      </h2>
      <div className="overflow-x-auto rounded-xl border border-peach bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-peach text-left">
              <th className="px-4 py-3 font-semibold text-plum">Feature</th>
              <th className="px-4 py-3 font-semibold text-plum">Free ($0)</th>
              <th className="px-4 py-3 font-semibold text-plum">Pro Monthly ($7)</th>
              <th className="px-4 py-3 font-semibold text-plum">Pro Yearly ($60)</th>
            </tr>
          </thead>
          <tbody>
            {PRICING_ROWS.map((row) => (
              <tr key={row.feature} className="border-b border-peach/60 last:border-0">
                <td className="px-4 py-3 text-plum font-medium">{row.feature}</td>
                <td className="px-4 py-3 text-plum-soft">{row.free}</td>
                <td className="px-4 py-3 text-plum-soft">{row.pro}</td>
                <td className="px-4 py-3 text-plum-soft">{row.yearly}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ── 7. FAQ ───────────────────────────────────────────────────────────────────
export type FaqItem = { q: string; a: string };

const MASTER_FAQ: ReadonlyArray<FaqItem> = [
  {
    q: "Will AlmiCV get my CV past company tracking software?",
    a: "It scores your CV the way modern ATS software does and shows you exactly what to fix — starting with the biggest filter: matching your job title to the role.",
  },
  {
    q: "Is AlmiCV really free to start?",
    a: "Yes. You can build, preview, and test your layout at no cost. Pro is a flat $7 — no hidden download walls, no weekly renewals. What you see is what you pay.",
  },
  {
    q: "Will the AI make my CV sound robotic?",
    a: "No. It sharpens your own sentences instead of replacing them with generic blocks. You keep full control of your own voice.",
  },
];

// `extra` lets a page prepend its own LOCALIZED Q&A (e.g. a country-specific
// question) ahead of the shared master questions. The FAQPage JSON-LD covers the
// combined set.
export function CvMasterFaq({ extra = [] }: { extra?: ReadonlyArray<FaqItem> }) {
  const items = [...extra, ...MASTER_FAQ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
  return (
    <section className="mb-12" aria-labelledby="faq-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h2 id="faq-title" className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-5">
        Questions answered
      </h2>
      <dl className="space-y-4 max-w-3xl">
        {items.map((it) => (
          <div key={it.q} className="rounded-lg border border-peach bg-white p-5">
            <dt className="font-semibold text-plum mb-1.5">{it.q}</dt>
            <dd className="text-sm text-plum-soft leading-relaxed">{it.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

// ── 8. Shamool pledge line ───────────────────────────────────────────────────
// Master footer line — sits above the global black/gold <Footer/> chrome.
export function CvMasterShamool() {
  return (
    <section className="mb-10 rounded-xl border border-peach bg-cream-soft p-6 sm:p-8 text-center" aria-label="Shamool Foundation pledge">
      <p className="text-sm sm:text-base text-plum leading-relaxed max-w-3xl mx-auto">
        <span className="font-semibold">25% of our sales go to the Shamool Foundation in Lahore</span> —
        funding free education, learning materials, and daily meals for underprivileged
        children. Your immediate action can change the life of a child.
      </p>
    </section>
  );
}
