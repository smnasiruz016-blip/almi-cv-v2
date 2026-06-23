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
  const url = `${SITE_ORIGIN}/cv-builder/${c.slug}`;
  // Distinct from /free-cv-maker (cost angle): this targets the "cv builder /
  // build a cv in [country]" query — the structure / how-to-build angle.
  const title = `CV Builder for ${c.name} (${YEAR}) — Build an ATS-Ready ${term} · AlmiCV`;
  const description = `Build a ${c.name}-ready ${term} section by section with AlmiCV's online builder — the right sections, local format, ATS-ready templates, and ${c.primaryLanguage} support. Free to start, Pro $7/mo.`;
  return {
    title,
    description,
    // Self-canonical — meant to rank. Gate on sourced content: real-data-or-noindex.
    alternates: { canonical: url },
    robots: hasFreeCvContent(c.slug) ? undefined : { index: false, follow: true },
    openGraph: { title, description, url, type: "website", siteName: "AlmiCV" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CvBuilder({
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

  const url = `${SITE_ORIGIN}/cv-builder/${c.slug}`;

  // Section checklist — derived from the verified per-country convention, so the
  // list itself is localized (photo/DOB/references vary by country).
  const photoNote =
    convention.includePhoto === "required"
      ? `commonly expected in ${c.name}`
      : convention.includePhoto === "optional"
        ? `optional in ${c.name} — include it or not per role`
        : `usually left off in ${c.name}`;
  const refNote =
    convention.referenceSection === "list"
      ? `often listed with contact details in ${c.name}`
      : convention.referenceSection === "available-on-request"
        ? "usually noted as “available on request”"
        : `not typically included in ${c.name}`;
  const sections: { name: string; note: string }[] = [
    {
      name: "Personal details",
      note: `Name, phone, professional email, and ${convention.includeAddress === "full" ? "full address" : "city"}${convention.includeDOB === "common" ? `, plus date of birth (commonly included in ${c.name})` : ""}.`,
    },
    { name: "Professional summary", note: "A short two-to-three-line profile tailored to the role." },
    { name: "Work experience", note: "Your roles in reverse-chronological order, with achievements." },
    { name: "Education", note: "Degrees and qualifications, most recent first." },
    {
      name: "Skills",
      note: "Hard and soft skills relevant to the job.",
    },
    {
      name: "Languages",
      note: c.primaryLanguage === "English"
        ? "Listed with your level."
        : `Listed with your level — ${c.primaryLanguage} proficiency matters locally.`,
    },
    { name: "Photo", note: `A photo is ${photoNote}.` },
    { name: "References", note: `References are ${refNote}.` },
  ];

  const steps: string[] = [
    `Pick a ${c.name} template — choose a layout that fits the local length (${convention.pageLength}) and photo norms.`,
    `Add your sections in the order ${c.name} recruiters expect — the builder lays them out for you.`,
    `Match local conventions — ${c.name}-specific details like photo, dates, and personal information are handled as you go.`,
    "Check structure and score — the resume score flags missing sections, weak wording, and ATS formatting issues.",
    `Export — download a clean, ${c.name}-ready PDF and apply.`,
  ];

  const faqs: { q: string; a: string }[] = [
    {
      q: `How do I build a CV for ${c.name}?`,
      a: `Pick a template, add the standard ${term} sections in the order local recruiters expect, match ${c.name} conventions (photo, length, personal details), then run the resume score and export. AlmiCV's builder guides each step.`,
    },
    {
      q: `What sections should a ${c.name} ${term} include?`,
      a: `Personal details, a professional summary, work experience (most recent first), education, skills, and languages — plus a photo and references where ${c.name} conventions call for them.`,
    },
    {
      q: `Is the AlmiCV builder free to use?`,
      a: `Yes — you can build up to 3 CVs on the free plan and download a clean PDF. Unlimited CVs and AI are on Pro at $7/month.`,
    },
    {
      q: `Will the builder produce an ATS-ready ${term}?`,
      a: `Yes — templates use a clean, single-column-friendly structure that ATS software can read, and the built-in score checks structure and keywords before you apply.`,
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
    name: `AlmiCV — CV Builder for ${c.name}`,
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
      { "@type": "ListItem", position: 2, name: `CV Builder for ${c.name}`, item: url },
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
              <li><span className="font-medium text-plum">CV Builder for {c.name}</span></li>
            </ol>
          </nav>

          {/* 2. H1 + intro */}
          <header className="mb-8">
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-plum mb-4">
              CV Builder for {c.name}
            </h1>
            <p className="text-base sm:text-lg text-plum-soft leading-relaxed max-w-3xl">
              Build a {c.name}-ready {term} section by section with AlmiCV&apos;s online builder. It lays out the sections local recruiters expect, matches {c.name} formatting conventions, and keeps the structure ATS-ready — in {c.primaryLanguage} when you need it.
            </p>
            <div className="mt-6">
              <Link
                href={`/signup?country=${c.slug}`}
                className="inline-block px-7 py-3.5 rounded-md bg-coral text-white text-base font-semibold hover:bg-coral-deep transition-colors"
              >
                Build your {term} →
              </Link>
              <p className="text-xs text-plum-soft mt-2">Free to start — no credit card required.</p>
            </div>
          </header>

          {/* 3. Section checklist — what a country CV should contain */}
          <section className="mb-12 rounded-xl border border-peach bg-white p-6 sm:p-8" aria-labelledby="sections-title">
            <h2 id="sections-title" className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-4">
              What a {c.name} {term} should include
            </h2>
            <ul className="space-y-3">
              {sections.map((s) => (
                <li key={s.name} className="flex gap-3">
                  <span aria-hidden="true" className="text-coral mt-0.5">✓</span>
                  <span className="text-sm text-plum"><span className="font-semibold">{s.name}</span> — <span className="text-plum-soft">{s.note}</span></span>
                </li>
              ))}
            </ul>
          </section>

          {/* 4. Build order */}
          <section className="mb-12" aria-labelledby="build-title">
            <h2 id="build-title" className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-5">
              Build your {term} in the right order
            </h2>
            <ol className="space-y-3">
              {steps.map((step, i) => (
                <li key={i} className="flex gap-4 rounded-lg border border-peach bg-white p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-coral text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <p className="text-sm text-plum leading-relaxed self-center">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* 5. Convention reference table + sourced structure notes */}
          <section className="mb-12 rounded-xl border border-peach bg-white p-6 sm:p-8" aria-labelledby="norms-title">
            <h2 id="norms-title" className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-4">
              How a {c.name} {term} is structured
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
                Where your {term} goes in {c.name}
              </h2>
              <p className="text-sm sm:text-base text-plum-soft leading-relaxed max-w-3xl mb-4">
                {content.jobMarket} Pay is quoted in {content.currency}, and the main hiring hubs include {content.cities.join(", ")}.
              </p>
              <p className="text-sm text-plum-soft leading-relaxed max-w-3xl">
                Once your {term} is built, you can apply on {content.localJobSites.join(", ")}.
              </p>
            </section>
          )}

          {/* 7. FAQ */}
          <section className="mb-12" aria-labelledby="faq-title">
            <h2 id="faq-title" className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-5">
              Building a CV in {c.name}: common questions
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
              Build your {c.name} CV →
            </Link>
            <p className="text-xs text-plum-soft mt-3">No credit card required to start.</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
