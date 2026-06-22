import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/auth";
import { getCountryBySlug } from "@/lib/countries";
import { getConvention, hasVerifiedConvention } from "@/lib/cv-conventions";
import { getFreeCvContent, hasFreeCvContent } from "@/lib/free-cv-content";

export const revalidate = 86400;
export const dynamicParams = true;

const SITE_ORIGIN = "https://almicv.almiworld.com";

type Params = { country: string };

// Dynamic so the year-stamped title stays current each year (server-side).
const YEAR = new Date().getFullYear();

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { country } = await params;
  const c = getCountryBySlug(country);
  if (!c) return {};
  const content = getFreeCvContent(c.slug);
  const term = content?.localTerm ?? "CV";
  const url = `${SITE_ORIGIN}/free-cv-maker/${c.slug}`;
  const title = `Free CV Maker in ${c.name} (${YEAR}) — Build a ${term} Online · AlmiCV`;
  const description = `Make a free, ATS-ready CV in ${c.name} with AlmiCV — ${term} format, ${c.primaryLanguage} support, and local conventions built in. Free to start, Pro $7/mo.`;
  return {
    title,
    description,
    // Self-canonical — these pages are meant to rank, not canonicalize up.
    // Gate on sourced content: real-data-or-noindex.
    alternates: { canonical: url },
    robots: hasFreeCvContent(c.slug) ? undefined : { index: false, follow: true },
    openGraph: { title, description, url, type: "website", siteName: "AlmiCV" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function FreeCvMaker({
  params,
}: {
  params: Promise<Params>;
}) {
  const { country } = await params;
  const c = getCountryBySlug(country);
  if (!c) notFound();
  const convention = getConvention(c.slug);
  if (!convention) notFound();
  const content = getFreeCvContent(c.slug);
  const isVerified = hasVerifiedConvention(c.slug);
  const term = content?.localTerm ?? "CV";

  const user = await getCurrentUser();
  const isLoggedIn = Boolean(user);

  const url = `${SITE_ORIGIN}/free-cv-maker/${c.slug}`;

  const faqs: { q: string; a: string }[] = [
    {
      q: `Is AlmiCV really free in ${c.name}?`,
      a: `Yes — the free plan lets you build up to 3 CVs with 5 AI assists a month and download a clean PDF, no credit card. If you need unlimited CVs and AI, Pro is $7/month.`,
    },
    {
      q: `Can I write my ${term} in ${c.primaryLanguage}?`,
      a: `Yes. AlmiCV's built-in AI can draft and translate your ${term} into ${c.primaryLanguage}, so you can apply in the language local employers expect.`,
    },
    {
      q: `Do I need a photo on a ${c.name} CV?`,
      a: convention.includePhoto === "required"
        ? `In ${c.name} a photo is commonly expected — AlmiCV templates leave room for one.`
        : convention.includePhoto === "optional"
          ? `A photo is optional in ${c.name}. AlmiCV templates work with or without one, so you can decide per application.`
          : `A photo is usually left off in ${c.name}. AlmiCV's default templates are photo-free and recruiter-safe.`,
    },
    {
      q: `Will my CV pass the ATS (applicant tracking system)?`,
      a: `AlmiCV templates use a clean, single-column-friendly structure that ATS software can read, and the built-in resume score flags formatting and keyword gaps before you apply.`,
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const webApplication = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `AlmiCV — Free CV Maker for ${c.name}`,
    url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free plan with 3 CVs and 5 AI assists/month. Pro $7/month.",
    },
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
      { "@type": "ListItem", position: 2, name: `Free CV Maker in ${c.name}`, item: url },
    ],
  };

  return (
    <>
      <SiteHeader isLoggedIn={isLoggedIn} />
      <main className="bg-cream">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplication) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

        <div className="mx-auto w-full max-w-5xl px-6 py-10 sm:py-14">
          {/* 1. Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs sm:text-sm text-plum-soft mb-5">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-coral transition-colors">Home</Link></li>
              <li aria-hidden="true">·</li>
              <li><span className="font-medium text-plum">Free CV Maker in {c.name}</span></li>
            </ol>
          </nav>

          {/* 2. H1 + intro */}
          <header className="mb-8">
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-plum mb-4">
              Free CV Maker in {c.name}
            </h1>
            <p className="text-base sm:text-lg text-plum-soft leading-relaxed max-w-3xl">
              {content
                ? content.searchContext
                : `Make a free, ATS-ready CV for ${c.name} with AlmiCV.`}{" "}
              AlmiCV builds your {term} to local conventions, helps in {c.primaryLanguage} with AI, and lets you download a clean PDF free.
            </p>
            <div className="mt-6">
              <Link
                href={`/signup?country=${c.slug}`}
                className="inline-block px-7 py-3.5 rounded-md bg-coral text-white text-base font-semibold hover:bg-coral-deep transition-colors"
              >
                Make your free {term} →
              </Link>
              <p className="text-xs text-plum-soft mt-2">No credit card required to start.</p>
            </div>
          </header>

          {/* 3. What you get free */}
          <section className="mb-12 rounded-xl border border-peach bg-white p-6 sm:p-8" aria-labelledby="free-title">
            <h2 id="free-title" className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-4">
              What you get free
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-plum">
              <li className="flex gap-2"><span aria-hidden="true" className="text-coral">✓</span> Up to 3 CVs and 5 AI assists every month</li>
              <li className="flex gap-2"><span aria-hidden="true" className="text-coral">✓</span> ATS-ready templates that recruiters can read</li>
              <li className="flex gap-2"><span aria-hidden="true" className="text-coral">✓</span> A resume score that flags gaps before you apply</li>
              <li className="flex gap-2"><span aria-hidden="true" className="text-coral">✓</span> Clean PDF download, no watermark</li>
              <li className="flex gap-2"><span aria-hidden="true" className="text-coral">✓</span> AI help in {c.primaryLanguage}</li>
              <li className="flex gap-2"><span aria-hidden="true" className="text-coral">✓</span> {c.name} CV conventions built in</li>
            </ul>
            <p className="text-sm text-plum-soft leading-relaxed mt-4">
              Need unlimited CVs and AI? Pro is $7/month — but most people get a complete {term} on the free plan.
            </p>
          </section>

          {/* 4. How to make a free CV here */}
          <section className="mb-12" aria-labelledby="how-title">
            <h2 id="how-title" className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-5">
              How to make a free {term} in {c.name}
            </h2>
            <ol className="space-y-3">
              {[
                `Pick a template — choose an ATS-ready layout that fits ${c.name} norms (page length, sections, photo or no photo).`,
                `Fill in your details — AlmiCV guides each section; the AI can draft bullet points and translate into ${c.primaryLanguage}.`,
                `Check your score — the built-in resume score flags weak wording, missing keywords, and formatting issues.`,
                `Download free — export a clean PDF and apply on local job sites the same day.`,
              ].map((step, i) => (
                <li key={i} className="flex gap-4 rounded-lg border border-peach bg-white p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-coral text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <p className="text-sm text-plum leading-relaxed self-center">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* 5. Country CV norms — convention table + sourced format notes */}
          <section className="mb-12 rounded-xl border border-peach bg-white p-6 sm:p-8" aria-labelledby="norms-title">
            <h2 id="norms-title" className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-4">
              {term} conventions in {c.name}
              {!isVerified && (
                <span className="ml-3 align-middle text-[11px] uppercase tracking-wide text-plum-soft bg-cream-soft px-2 py-0.5 rounded-full">
                  Regional default
                </span>
              )}
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-4 text-sm">
              <div><dt className="text-xs uppercase tracking-wide text-plum-soft">Page length</dt><dd className="text-plum">{convention.pageLength}</dd></div>
              <div><dt className="text-xs uppercase tracking-wide text-plum-soft">Photo</dt><dd className="text-plum">{convention.includePhoto}</dd></div>
              <div><dt className="text-xs uppercase tracking-wide text-plum-soft">Address</dt><dd className="text-plum">{convention.includeAddress}</dd></div>
              <div><dt className="text-xs uppercase tracking-wide text-plum-soft">Date of birth</dt><dd className="text-plum">{convention.includeDOB}</dd></div>
              <div><dt className="text-xs uppercase tracking-wide text-plum-soft">GPA</dt><dd className="text-plum">{convention.includeGPA}</dd></div>
              <div><dt className="text-xs uppercase tracking-wide text-plum-soft">References</dt><dd className="text-plum">{convention.referenceSection}</dd></div>
            </dl>
            {content && content.formatNotes.length > 0 && (
              <ul className="space-y-2 text-sm text-plum-soft leading-relaxed">
                {content.formatNotes.map((note, i) => (
                  <li key={i} className="flex gap-2"><span aria-hidden="true" className="text-coral">•</span> {note}</li>
                ))}
              </ul>
            )}
            <p className="text-xs text-plum-soft mt-4">
              These are common conventions, not rules — always check the specific employer&apos;s expectations for each application.
            </p>
          </section>

          {/* 6. Local job market */}
          {content && (
            <section className="mb-12" aria-labelledby="market-title">
              <h2 id="market-title" className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-4">
                Looking for work in {c.name}
              </h2>
              <p className="text-sm sm:text-base text-plum-soft leading-relaxed max-w-3xl mb-4">
                {content.jobMarket} Pay is quoted in {content.currency}. The main hiring hubs include {content.cities.join(", ")}.
              </p>
              {content.workRouteNote && (
                <p className="text-sm sm:text-base text-plum-soft leading-relaxed max-w-3xl mb-4">
                  {content.workRouteNote}
                </p>
              )}
              <p className="text-sm text-plum-soft leading-relaxed max-w-3xl">
                Once your {term} is ready, you can apply on {content.localJobSites.join(", ")}.
              </p>
            </section>
          )}

          {/* 7. FAQ */}
          <section className="mb-12" aria-labelledby="faq-title">
            <h2 id="faq-title" className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-5">
              Questions about making a free CV in {c.name}
            </h2>
            <div className="space-y-3">
              {faqs.map((f) => (
                <div key={f.q} className="rounded-lg border border-peach bg-white p-5">
                  <h3 className="font-semibold text-plum">{f.q}</h3>
                  <p className="mt-1.5 text-sm text-plum-soft leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 8. Cross-product cards */}
          <section className="mb-12" aria-label="Other AlmiWorld products">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-5">
              Around the globe, around your career
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <li>
                <a href={`https://almijob.almiworld.com/jobs/${c.slug}`} className="block rounded-lg border border-peach bg-white p-5 hover:border-coral transition-colors h-full">
                  <p className="font-semibold text-plum mb-1">Jobs in {c.name} →</p>
                  <p className="text-sm text-plum-soft leading-relaxed">AlmiJob — one CV, every site.</p>
                </a>
              </li>
              <li>
                <a href={`https://almisalary.almiworld.com/salary/${c.slug}`} className="block rounded-lg border border-peach bg-white p-5 hover:border-coral transition-colors h-full">
                  <p className="font-semibold text-plum mb-1">{c.name} salaries →</p>
                  <p className="text-sm text-plum-soft leading-relaxed">AlmiSalary — honest ranges, native currency.</p>
                </a>
              </li>
              <li>
                <a href={`https://almistudy.almiworld.com/universities/${c.slug}`} className="block rounded-lg border border-peach bg-white p-5 hover:border-coral transition-colors h-full">
                  <p className="font-semibold text-plum mb-1">Universities in {c.name} →</p>
                  <p className="text-sm text-plum-soft leading-relaxed">AlmiStudy — accredited institutions, verified registries.</p>
                </a>
              </li>
            </ul>
          </section>

          {/* 9. Final CTA */}
          <section className="mb-10 text-center">
            <Link
              href={`/signup?country=${c.slug}`}
              className="inline-block px-8 py-4 rounded-md bg-coral text-white text-lg font-semibold hover:bg-coral-deep transition-colors"
            >
              Make your free {c.name} CV →
            </Link>
            <p className="text-xs text-plum-soft mt-3">No credit card required to start.</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
