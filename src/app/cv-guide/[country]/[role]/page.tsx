import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/auth";
import { getCountryBySlug } from "@/lib/countries";
import { getRoleBySlug } from "@/lib/roles";
import { getConvention, hasVerifiedConvention } from "@/lib/cv-conventions";
import { OriginCvGuide } from "@/components/cv-origin-guide";
import { findCvOrigin, isCvOriginIndexable, indefiniteArticle } from "@/lib/cv-origin-localization";

// The [role] segment doubles as the origin segment when prefixed "from-"
// (e.g. /cv-guide/united-kingdom/from-pakistan). No role slug starts with
// "from-", so the dispatch is unambiguous — mirrors AlmiPTE's flywheel nesting.
const FROM = "from-";

export const revalidate = 86400;
export const dynamicParams = true;

const SITE_ORIGIN = "https://almicv.almiworld.com";

type Params = { country: string; role: string };

// Dynamic so the year-stamped title stays current each year with no code
// change (generateMetadata runs server-side). This page has no visible
// year in the body, so the meta title is the only place it appears.
const YEAR = new Date().getFullYear();

function buildTitle(roleName: string, countryName: string): string {
  return `${roleName} CV for ${countryName} (${YEAR}) — Free & ATS-Ready · AlmiCV`;
}

function buildDescription(roleName: string, countryName: string): string {
  return `Build a professional ${roleName} CV for ${countryName} — AI-tailored, ATS-optimized, in any language. Free to start, Pro $7/mo on AlmiCV.`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { country, role } = await params;
  const c = getCountryBySlug(country);

  // Origin × destination CV guide — distinct, self-canonical (NOT canonical-up).
  if (role.startsWith(FROM)) {
    const originSlug = role.slice(FROM.length);
    const origin = findCvOrigin(originSlug);
    if (!c || !origin || !isCvOriginIndexable(c.slug, originSlug)) return {};
    const canonicalUrl = `${SITE_ORIGIN}/cv-guide/${c.slug}/from-${origin.slug}`;
    const title = `${c.name} CV from ${origin.name} (${YEAR}) — Free, ATS-Ready · AlmiCV`;
    const description = `Build ${indefiniteArticle(c.name)} ${c.name}-ready, ATS-friendly CV from ${origin.name} — AI-tailored to ${c.name} conventions, in any language. Free to start, Pro $7/mo on AlmiCV.`;
    return {
      title,
      description,
      alternates: { canonical: canonicalUrl },
      openGraph: { title, description, url: canonicalUrl, type: "website", siteName: "AlmiCV" },
      twitter: { card: "summary_large_image", title, description },
    };
  }

  const r = getRoleBySlug(role);
  if (!c || !r) return {};
  // SEO consolidation (stopgap): the role dimension here is a name token over
  // country-level CV-convention data, so the ~50k role×country pages are thin
  // near-duplicates of the richer /cv-guide/[country] hub. They canonicalise
  // up to that hub and are kept out of the sitemap, concentrating crawl budget
  // on the country hubs + the /templates/role/[roleSlug] role hubs (which keep
  // the role-keyword surface). The page still renders for users. Reversible if
  // a verified role-content dataset is added later.
  const canonicalUrl = `${SITE_ORIGIN}/cv-guide/${c.slug}`;
  const title = buildTitle(r.name, c.name);
  const description = buildDescription(r.name, c.name);
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: { title, description, url: canonicalUrl, type: "website", siteName: "AlmiCV" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CvGuidePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { country, role } = await params;
  const c = getCountryBySlug(country);

  // Origin × destination CV guide (Tier 1).
  if (role.startsWith(FROM)) {
    const originSlug = role.slice(FROM.length);
    if (!c || !findCvOrigin(originSlug) || !isCvOriginIndexable(c.slug, originSlug)) {
      notFound();
    }
    const user = await getCurrentUser();
    return <OriginCvGuide country={c} originSlug={originSlug} isLoggedIn={Boolean(user)} />;
  }

  const r = getRoleBySlug(role);
  if (!c || !r) notFound();

  const convention = getConvention(c.slug);
  if (!convention) notFound();
  const isVerified = hasVerifiedConvention(c.slug);

  const user = await getCurrentUser();
  const isLoggedIn = Boolean(user);

  const url = `${SITE_ORIGIN}/cv-guide/${c.slug}/${r.slug}`;
  const webApplication = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `AlmiCV — ${r.name} CV Builder for ${c.name}`,
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
      { "@type": "ListItem", position: 2, name: "CV Guide", item: `${SITE_ORIGIN}/cv-guide` },
      { "@type": "ListItem", position: 3, name: c.name, item: `${SITE_ORIGIN}/cv-guide/${c.slug}` },
      { "@type": "ListItem", position: 4, name: r.name, item: url },
    ],
  };

  return (
    <>
      <SiteHeader isLoggedIn={isLoggedIn} />
      <main className="bg-cream">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplication) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

        <div className="mx-auto w-full max-w-5xl px-6 py-10 sm:py-14">
          {/* 1. Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs sm:text-sm text-plum-soft mb-5">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-coral transition-colors">Home</Link></li>
              <li aria-hidden="true">·</li>
              <li><Link href="/cv-guide" className="hover:text-coral transition-colors">CV Guide</Link></li>
              <li aria-hidden="true">·</li>
              <li><Link href={`/cv-guide/${c.slug}`} className="hover:text-coral transition-colors">{c.name}</Link></li>
              <li aria-hidden="true">·</li>
              <li><span className="font-medium text-plum">{r.name}</span></li>
            </ol>
          </nav>

          {/* 2. H1 */}
          <header className="mb-6">
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-plum mb-4">
              Build a Professional {r.name} CV for {c.name} in Minutes
            </h1>
            {/* 3. AI intro */}
            <p className="text-base sm:text-lg text-plum-soft leading-relaxed max-w-3xl">
              AlmiCV&apos;s AI tailors your {r.name} CV to job descriptions in {c.name}. Transform
              your CV into many designs, adjust colors and fonts anytime — new designs added
              every day. Built around conventions {c.name} employers expect.
            </p>
          </header>

          {/* 4. Templates CTA — Recipe-system pick-by-sector removed in
              PR #53. Direct visitors to the /templates gallery so they
              can browse role-specific TemplateImage designs. */}
          <section className="mb-12" aria-labelledby="templates-title">
            <h2 id="templates-title" className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-2">
              Designs ready for {r.name} in {c.name}
            </h2>
            <p className="text-sm text-plum-soft mb-5 max-w-2xl">
              Browse the gallery — every {r.name} CV design we&apos;ve published, filtered to your role.
            </p>
            <Link
              href={`/templates?role=${r.slug}`}
              className="inline-flex items-center gap-2 rounded-lg border border-coral bg-white px-5 py-3 text-sm font-medium text-coral hover:bg-coral hover:text-white transition-colors"
            >
              See {r.name} templates →
            </Link>
          </section>

          {/* 5. Country features */}
          <section className="mb-12 rounded-xl border border-peach bg-white p-6 sm:p-8" aria-labelledby="conventions-title">
            <h2 id="conventions-title" className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-4">
              CV conventions in {c.name}
              {!isVerified && (
                <span className="ml-3 align-middle text-[11px] uppercase tracking-wide text-plum-soft bg-cream-soft px-2 py-0.5 rounded-full">
                  Regional default
                </span>
              )}
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-5 text-sm">
              <div><dt className="text-xs uppercase tracking-wide text-plum-soft">Page length</dt><dd className="text-plum">{convention.pageLength}</dd></div>
              <div><dt className="text-xs uppercase tracking-wide text-plum-soft">Photo</dt><dd className="text-plum">{convention.includePhoto}</dd></div>
              <div><dt className="text-xs uppercase tracking-wide text-plum-soft">Address</dt><dd className="text-plum">{convention.includeAddress}</dd></div>
              <div><dt className="text-xs uppercase tracking-wide text-plum-soft">Date of birth</dt><dd className="text-plum">{convention.includeDOB}</dd></div>
              <div><dt className="text-xs uppercase tracking-wide text-plum-soft">GPA</dt><dd className="text-plum">{convention.includeGPA}</dd></div>
              <div><dt className="text-xs uppercase tracking-wide text-plum-soft">References</dt><dd className="text-plum">{convention.referenceSection}</dd></div>
            </dl>
            <p className="text-sm text-plum-soft leading-relaxed">{convention.notes}</p>
            <p className="text-sm text-plum-soft leading-relaxed mt-3">
              AlmiCV translates to {c.primaryLanguage} with built-in AI.
            </p>
          </section>

          {/* 6. Role AI 3-card */}
          <section className="mb-12" aria-labelledby="ai-features-title">
            <h2 id="ai-features-title" className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-5">
              AI features built for {r.name} applications
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <li className="rounded-lg border border-peach bg-white p-5">
                <p className="font-semibold text-plum mb-1">AI Cover Letter</p>
                <p className="text-sm text-plum-soft leading-relaxed">Tailored to {r.name} — paste the job, get a cover letter that matches your CV in tone and detail.</p>
              </li>
              <li className="rounded-lg border border-peach bg-white p-5">
                <p className="font-semibold text-plum mb-1">Interview Prep for {r.name}</p>
                <p className="text-sm text-plum-soft leading-relaxed">Common {r.name} interview questions, STAR-framework answers grounded in your own experience.</p>
              </li>
              <li className="rounded-lg border border-peach bg-white p-5">
                <p className="font-semibold text-plum mb-1">Tailor for Job</p>
                <p className="text-sm text-plum-soft leading-relaxed">Paste a {r.name} job description, AI rewrites your CV to mirror the keywords and emphasis.</p>
              </li>
            </ul>
            <p className="text-xs text-plum-soft mt-3">AI-generated suggestions — review and verify before submitting to any employer.</p>
          </section>

          {/* 7. Pricing */}
          <section className="mb-12 rounded-xl border border-peach bg-cream-soft p-6 sm:p-8 text-center" aria-labelledby="pricing-title">
            <h2 id="pricing-title" className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-3">
              Start free, upgrade when ready
            </h2>
            <p className="text-sm sm:text-base text-plum-soft mb-3 max-w-2xl mx-auto">
              <strong className="text-plum">Free</strong> — 3 CVs, 5 AI assists/month, no signup card required.
              {" "}<strong className="text-plum">Pro $7/month</strong> — unlimited CVs, unlimited AI, premium templates.
            </p>
            <p className="text-xs text-plum-soft mb-4">7-day free trial · No charge during trial</p>
            <Link href="/pricing" className="inline-block px-5 py-2.5 rounded-md bg-coral text-white font-semibold hover:bg-coral-deep transition-colors">
              See full pricing →
            </Link>
          </section>

          {/* 8. Real proof */}
          <section className="mb-12" aria-labelledby="proof-title">
            <h2 id="proof-title" className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-3">
              Built by real users
            </h2>
            <p className="text-base text-plum-soft leading-relaxed max-w-3xl">
              AlmiCV is used by people building real careers around the globe — like Sheikh Badar
              Uz Zaman, a Chef in Reykjavik, Iceland. No fake reviews, no stock photos pretending
              to be customers. The product earns its keep one CV at a time.
            </p>
          </section>

          {/* 9. ATS */}
          <section className="mb-12 rounded-xl border border-peach bg-white p-6 sm:p-8" aria-labelledby="ats-title">
            <h2 id="ats-title" className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-3">
              Free Resume Score Checker for {r.name}
            </h2>
            <p className="text-sm sm:text-base text-plum-soft leading-relaxed max-w-2xl mb-4">
              Paste your resume, get an instant 0-100 score with personalized improvement tips
              across keywords, action verbs, format, and length. Free, no signup.
            </p>
            <Link href="/resume-score" className="inline-block px-5 py-2.5 rounded-md border border-coral text-coral-deep font-semibold hover:bg-coral-soft/30 transition-colors">
              Check your resume →
            </Link>
          </section>

          {/* 10. Cross-product 3-card DEEP */}
          <section className="mb-12" aria-label="Other AlmiWorld products">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-5">
              Around the globe, around your career
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <li>
                <a
                  href={`https://almisalary.almiworld.com/salary/${c.slug}/${r.slug}`}
                  className="block rounded-lg border border-peach bg-white p-5 hover:border-coral transition-colors h-full"
                >
                  <p className="font-semibold text-plum mb-1">{r.name} salaries in {c.name} →</p>
                  <p className="text-sm text-plum-soft leading-relaxed">AlmiSalary — honest ranges, native currency.</p>
                </a>
              </li>
              <li>
                <a
                  href={`https://almijob.almiworld.com/jobs/${c.slug}/${r.slug}`}
                  className="block rounded-lg border border-peach bg-white p-5 hover:border-coral transition-colors h-full"
                >
                  <p className="font-semibold text-plum mb-1">{r.name} jobs in {c.name} →</p>
                  <p className="text-sm text-plum-soft leading-relaxed">AlmiJob — one CV, every site.</p>
                </a>
              </li>
              <li>
                <a
                  href={`https://almistudy.almiworld.com/universities/${c.slug}`}
                  className="block rounded-lg border border-peach bg-white p-5 hover:border-coral transition-colors h-full"
                >
                  <p className="font-semibold text-plum mb-1">Study for {r.name} in {c.name} →</p>
                  <p className="text-sm text-plum-soft leading-relaxed">AlmiStudy — accredited universities, verified registries.</p>
                </a>
              </li>
            </ul>
          </section>

          {/* 11. Final CTA */}
          <section className="mb-10 text-center" aria-labelledby="cta-title">
            <h2 id="cta-title" className="sr-only">Get started</h2>
            <Link
              href={`/signup?role=${r.slug}&country=${c.slug}`}
              className="inline-block px-8 py-4 rounded-md bg-coral text-white text-lg font-semibold hover:bg-coral-deep transition-colors"
            >
              Build Your {r.name} CV Free →
            </Link>
            <p className="text-xs text-plum-soft mt-3">No credit card required to start.</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
