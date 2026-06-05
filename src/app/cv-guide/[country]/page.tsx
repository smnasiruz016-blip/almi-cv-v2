import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/auth";
import { getCountryBySlug } from "@/lib/countries";
import { JOB_ROLES, JOB_ROLES_BY_SECTOR } from "@/lib/roles";
import { getConvention, hasVerifiedConvention } from "@/lib/cv-conventions";

export const revalidate = 86400;
export const dynamicParams = true;

const SITE_ORIGIN = "https://almicv.almiworld.com";

type Params = { country: string };

// Dynamic so the year-stamped title stays current each year (server-side).
const YEAR = new Date().getFullYear();

function buildTitle(name: string): string {
  return `${name} CV Guide (${YEAR}) — Free, ATS-Ready Builder`;
}

function buildDescription(name: string): string {
  return `Build a ${name}-ready CV for any role with AlmiCV — local conventions, AI-tailored, ATS-optimized. Free to start, Pro $7/mo.`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { country } = await params;
  const c = getCountryBySlug(country);
  if (!c) return {};
  const url = `${SITE_ORIGIN}/cv-guide/${c.slug}`;
  const title = buildTitle(c.name);
  const description = buildDescription(c.name);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", siteName: "AlmiCV" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CountryHub({
  params,
}: {
  params: Promise<Params>;
}) {
  const { country } = await params;
  const c = getCountryBySlug(country);
  if (!c) notFound();
  const convention = getConvention(c.slug);
  if (!convention) notFound();
  const isVerified = hasVerifiedConvention(c.slug);

  const user = await getCurrentUser();
  const isLoggedIn = Boolean(user);

  const url = `${SITE_ORIGIN}/cv-guide/${c.slug}`;
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
      { "@type": "ListItem", position: 2, name: "CV Guide", item: `${SITE_ORIGIN}/cv-guide` },
      { "@type": "ListItem", position: 3, name: c.name, item: url },
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
              <li><span className="font-medium text-plum">{c.name}</span></li>
            </ol>
          </nav>

          {/* 2. H1 + 3. Intro */}
          <header className="mb-8">
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-plum mb-4">
              Build a {c.name}-Ready CV for Any Role
            </h1>
            <p className="text-base sm:text-lg text-plum-soft leading-relaxed max-w-3xl">
              AlmiCV builds CVs tailored to {c.name} employer expectations. {convention.notes} Browse role-specific guides below or start building free.
            </p>
          </header>

          {/* 4. Country features */}
          <section className="mb-12 rounded-xl border border-peach bg-white p-6 sm:p-8" aria-labelledby="conventions-title">
            <h2 id="conventions-title" className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-4">
              CV conventions in {c.name}
              {!isVerified && (
                <span className="ml-3 align-middle text-[11px] uppercase tracking-wide text-plum-soft bg-cream-soft px-2 py-0.5 rounded-full">
                  Regional default
                </span>
              )}
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-3 text-sm">
              <div><dt className="text-xs uppercase tracking-wide text-plum-soft">Page length</dt><dd className="text-plum">{convention.pageLength}</dd></div>
              <div><dt className="text-xs uppercase tracking-wide text-plum-soft">Photo</dt><dd className="text-plum">{convention.includePhoto}</dd></div>
              <div><dt className="text-xs uppercase tracking-wide text-plum-soft">Address</dt><dd className="text-plum">{convention.includeAddress}</dd></div>
              <div><dt className="text-xs uppercase tracking-wide text-plum-soft">Date of birth</dt><dd className="text-plum">{convention.includeDOB}</dd></div>
              <div><dt className="text-xs uppercase tracking-wide text-plum-soft">GPA</dt><dd className="text-plum">{convention.includeGPA}</dd></div>
              <div><dt className="text-xs uppercase tracking-wide text-plum-soft">References</dt><dd className="text-plum">{convention.referenceSection}</dd></div>
            </dl>
            <p className="text-sm text-plum-soft leading-relaxed">
              AlmiCV translates to {c.primaryLanguage} with built-in AI.
            </p>
          </section>

          {/* 5. Role grid by sector */}
          <section className="mb-12" aria-labelledby="roles-title">
            <h2 id="roles-title" className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-2">
              {JOB_ROLES.length} role-specific guides for {c.name}
            </h2>
            <p className="text-sm text-plum-soft mb-6 max-w-2xl">
              Pick the role you&apos;re applying for — each guide includes role-specific AI prompts, template picks, and cross-product deep links.
            </p>
            <div className="space-y-6">
              {Array.from(JOB_ROLES_BY_SECTOR.entries()).map(([sector, roles]) => (
                <div key={sector}>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-plum-soft mb-2">
                    {sector} <span className="font-normal lowercase">({roles.length})</span>
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {roles.map((r) => (
                      <li key={r.slug}>
                        <Link
                          href={`/cv-guide/${c.slug}/${r.slug}`}
                          className="block px-3 py-2 rounded-md border border-peach bg-white text-sm text-plum hover:border-coral transition-colors"
                        >
                          {r.name} in {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Cross-product 3-card DEEP */}
          <section className="mb-12" aria-label="Other AlmiWorld products">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-5">
              Around the globe, around your career
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <li>
                <a href={`https://almisalary.almiworld.com/salary/${c.slug}`} className="block rounded-lg border border-peach bg-white p-5 hover:border-coral transition-colors h-full">
                  <p className="font-semibold text-plum mb-1">{c.name} salaries →</p>
                  <p className="text-sm text-plum-soft leading-relaxed">AlmiSalary — honest ranges, native currency.</p>
                </a>
              </li>
              <li>
                <a href={`https://almijob.almiworld.com/jobs/${c.slug}`} className="block rounded-lg border border-peach bg-white p-5 hover:border-coral transition-colors h-full">
                  <p className="font-semibold text-plum mb-1">Jobs in {c.name} →</p>
                  <p className="text-sm text-plum-soft leading-relaxed">AlmiJob — one CV, every site.</p>
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

          {/* 7. Final CTA */}
          <section className="mb-10 text-center">
            <Link
              href={`/signup?country=${c.slug}`}
              className="inline-block px-8 py-4 rounded-md bg-coral text-white text-lg font-semibold hover:bg-coral-deep transition-colors"
            >
              Build Your {c.name} CV Free →
            </Link>
            <p className="text-xs text-plum-soft mt-3">No credit card required to start.</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
