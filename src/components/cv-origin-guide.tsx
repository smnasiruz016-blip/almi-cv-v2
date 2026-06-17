import Link from "next/link";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import type { Country } from "@/lib/countries";
import { JOB_ROLES, JOB_ROLES_BY_SECTOR } from "@/lib/roles";
import { getConvention, hasVerifiedConvention } from "@/lib/cv-conventions";
import {
  findCvOrigin,
  getCvOriginLocalization,
  indefiniteArticle,
} from "@/lib/cv-origin-localization";

const SITE_ORIGIN = "https://almicv.almiworld.com";

// Origin × destination CV guide (Tier 1: /cv-guide/[country]/from-[origin]).
// Leads with the origin's researched worry, then keeps the country-hub sections
// (conventions panel, role grid, cross-product). Self-canonical + indexable —
// distinct per-origin copy, not a thin name-swap.
export function OriginCvGuide({
  country: c,
  originSlug,
  isLoggedIn,
}: {
  country: Country;
  originSlug: string;
  isLoggedIn: boolean;
}) {
  const origin = findCvOrigin(originSlug);
  const local = getCvOriginLocalization(originSlug, c.slug);
  const convention = getConvention(c.slug);
  if (!origin || !local || !convention) return null;
  const isVerified = hasVerifiedConvention(c.slug);

  const url = `${SITE_ORIGIN}/cv-guide/${c.slug}/from-${origin.slug}`;
  const webApplication = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `AlmiCV — CV Builder for ${c.name} (from ${origin.name})`,
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
      { "@type": "ListItem", position: 4, name: `From ${origin.name}`, item: url },
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
              <li><span className="font-medium text-plum">From {origin.name}</span></li>
            </ol>
          </nav>

          {/* 2. H1 + 3. Localized hero sub-hook */}
          <header className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-coral-deep mb-2">
              {origin.flag} {origin.name} → {c.name}
            </p>
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-plum mb-4">
              Build {indefiniteArticle(c.name)} {c.name}-Ready CV from {origin.name}
            </h1>
            <p className="text-base sm:text-lg text-plum-soft leading-relaxed max-w-3xl">
              {local.subHook}
            </p>
          </header>

          {/* 4. Origin-specific section (the localized angle) */}
          <section className="mb-12 rounded-xl border border-peach bg-white p-6 sm:p-8" aria-labelledby="origin-title">
            <h2 id="origin-title" className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-4">
              {local.heading}
            </h2>
            {local.paras.map((p) => (
              <p key={p} className="text-sm sm:text-base text-plum-soft leading-relaxed mb-4 max-w-3xl">
                {p}
              </p>
            ))}
            <ul className="space-y-2.5 mb-5">
              {local.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm sm:text-base text-plum-soft leading-relaxed">
                  <span aria-hidden className="mt-1 text-coral">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-lg border border-coral/30 bg-coral-soft/20 p-4">
              <p className="text-sm text-plum leading-relaxed">
                <strong className="font-semibold">Honesty check:</strong> {local.callout}
              </p>
            </div>
          </section>

          {/* 5. CV conventions panel (destination) */}
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
            <p className="text-sm text-plum-soft leading-relaxed">{convention.notes}</p>
            <p className="text-sm text-plum-soft leading-relaxed mt-3">
              AlmiCV translates to {c.primaryLanguage} with built-in AI.
            </p>
          </section>

          {/* 6. Role grid by sector (drill into role×country) */}
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

          {/* 7. Cross-product 3-card DEEP */}
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
                  <p className="font-semibold text-plum mb-1">Visa-sponsorship jobs in {c.name} →</p>
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

          {/* 8. Final CTA */}
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
