import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/auth";
import { getCountryBySlug } from "@/lib/countries";
import { JOB_ROLES, JOB_ROLES_BY_SECTOR } from "@/lib/roles";
import { getConvention, hasVerifiedConvention } from "@/lib/cv-conventions";
import { indefiniteArticle, CV_ORIGINS, isCvOriginIndexable, getLocalizedOrigin } from "@/lib/cv-origin-localization";
import { getFreeCvContent } from "@/lib/free-cv-content";
import {
  CvMasterHook,
  CvMasterPriceTrap,
  CvMasterInvisibleGate,
  CvMasterFeatures,
  CvMasterPricing,
  CvMasterFaq,
  CvMasterShamool,
  type FaqItem,
} from "@/components/cv-master";

export const revalidate = 86400;
export const dynamicParams = true;

const SITE_ORIGIN = "https://almicv.almiworld.com";

type Params = { country: string };

// Dynamic so the year-stamped title stays current each year (server-side).
const YEAR = new Date().getFullYear();

function buildTitle(name: string): string {
  return `${name} CV Guide (${YEAR}) — Free, ATS-Ready Builder · AlmiCV`;
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
  // Localized essentials (currency / cities / credential body) where this country
  // is also a sourced origin. Real data only — null where not sourced (no fabrication).
  const loc = getLocalizedOrigin(c.slug);
  // Full sourced localized content (local term, job market, format notes, work
  // route, real local job sites) — ported from the hub, 193/193 countries. Real
  // data only; never fabricated.
  const fcc = getFreeCvContent(c.slug);

  // Localized FAQ Q&A — built from REAL sourced data for this country, prepended
  // ahead of the shared master FAQ.
  const localizedFaq: FaqItem[] = [
    {
      q: `What does a CV need to look like in ${c.name}?`,
      a: `${convention.notes} AlmiCV applies these ${c.name} conventions for you and can translate into ${c.primaryLanguage}.`,
    },
    ...(fcc?.workRouteNote
      ? [{
          q: `What is the main work route for international applicants in ${c.name}?`,
          a: fcc.workRouteNote,
        }]
      : []),
  ];

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

          {/* 2. MASTER hook (localized heading + context) */}
          <CvMasterHook
            heading={`Build ${indefiniteArticle(c.name)} ${c.name}-Ready CV for Any Role`}
            context={`in ${c.name}`}
            ctaHref={`/signup?country=${c.slug}`}
          />

          {/* 3. MASTER price trap + invisible gate */}
          <CvMasterPriceTrap />
          <CvMasterInvisibleGate />

          {/* 4. LOCALIZED: CV conventions in {country} (real, per-country data) */}
          <section className="mb-12 rounded-xl border border-peach bg-white p-6 sm:p-8" aria-labelledby="conventions-title">
            <h2 id="conventions-title" className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-4">
              CV conventions in {c.name}
              {!isVerified && (
                <span className="ml-3 align-middle text-[11px] uppercase tracking-wide text-plum-soft bg-cream-soft px-2 py-0.5 rounded-full">
                  Regional default
                </span>
              )}
            </h2>
            <p className="text-sm text-plum-soft leading-relaxed mb-4 max-w-3xl">
              {convention.notes}
            </p>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-3 text-sm">
              <div><dt className="text-xs uppercase tracking-wide text-plum-soft">Page length</dt><dd className="text-plum">{convention.pageLength}</dd></div>
              <div><dt className="text-xs uppercase tracking-wide text-plum-soft">Photo</dt><dd className="text-plum">{convention.includePhoto}</dd></div>
              <div><dt className="text-xs uppercase tracking-wide text-plum-soft">Address</dt><dd className="text-plum">{convention.includeAddress}</dd></div>
              <div><dt className="text-xs uppercase tracking-wide text-plum-soft">Date of birth</dt><dd className="text-plum">{convention.includeDOB}</dd></div>
              <div><dt className="text-xs uppercase tracking-wide text-plum-soft">GPA</dt><dd className="text-plum">{convention.includeGPA}</dd></div>
              <div><dt className="text-xs uppercase tracking-wide text-plum-soft">References</dt><dd className="text-plum">{convention.referenceSection}</dd></div>
            </dl>
            <p className="text-sm text-plum-soft leading-relaxed">
              AlmiCV writes and translates into {c.primaryLanguage} with built-in AI.
            </p>
            <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm border-t border-peach pt-4">
              {fcc?.localTerm && (
                <div><dt className="text-xs uppercase tracking-wide text-plum-soft">Local term for a CV</dt><dd className="text-plum">{fcc.localTerm}</dd></div>
              )}
              <div><dt className="text-xs uppercase tracking-wide text-plum-soft">Currency</dt><dd className="text-plum">{fcc?.currency ?? loc?.currency ?? "—"}</dd></div>
              <div className="sm:col-span-2"><dt className="text-xs uppercase tracking-wide text-plum-soft">Major hiring hubs</dt><dd className="text-plum">{(fcc?.cities ?? loc?.cities ?? []).join(", ") || "—"}</dd></div>
              {loc?.credentialBody && (
                <div className="sm:col-span-2"><dt className="text-xs uppercase tracking-wide text-plum-soft">Credential recognition</dt><dd className="text-plum">{loc.credentialBody}</dd></div>
              )}
            </dl>
          </section>

          {/* 4b. LOCALIZED: job market + format notes + local job sites (sourced) */}
          {fcc && (
            <section className="mb-12" aria-labelledby="market-title">
              <h2 id="market-title" className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-4">
                Applying for jobs in {c.name}
              </h2>
              <p className="text-base text-plum-soft leading-relaxed mb-5 max-w-3xl">{fcc.jobMarket}</p>

              {fcc.formatNotes.length > 0 && (
                <>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-plum-soft mb-2">
                    Formatting points for {c.name}
                  </h3>
                  <ul className="mb-5 space-y-2 max-w-3xl">
                    {fcc.formatNotes.map((note, i) => (
                      <li key={i} className="flex gap-2 text-sm text-plum-soft leading-relaxed">
                        <span aria-hidden="true" className="text-coral">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {fcc.workRouteNote && (
                <div className="mb-5 rounded-lg border border-peach bg-cream-soft p-4 max-w-3xl">
                  <p className="text-xs font-semibold uppercase tracking-wide text-plum-soft mb-1">Work route for internationals</p>
                  <p className="text-sm text-plum leading-relaxed">{fcc.workRouteNote}</p>
                </div>
              )}

              {fcc.localJobSites.length > 0 && (
                <p className="text-sm text-plum-soft leading-relaxed max-w-3xl">
                  <span className="font-medium text-plum">Where {c.name} CVs actually get used:</span>{" "}
                  {fcc.localJobSites.join(", ")}.
                </p>
              )}
            </section>
          )}

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

          {/* 5b. Origin down-links — push hub authority into the from-[origin] pages */}
          {(() => {
            const originLinks = CV_ORIGINS.filter((o) => isCvOriginIndexable(c.slug, o.slug)).slice(0, 10);
            if (originLinks.length === 0) return null;
            return (
              <section className="mb-12" aria-labelledby="origin-links-title">
                <h2 id="origin-links-title" className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-2">
                  Applying from a specific country?
                </h2>
                <p className="text-sm text-plum-soft mb-4 max-w-2xl">
                  Country-specific CV guidance — local conventions, how to present your credentials, and an ATS-ready approach localized to where you&apos;re applying from.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {originLinks.map((o) => (
                    <li key={o.slug}>
                      <Link
                        href={`/cv-guide/${c.slug}/from-${o.slug}`}
                        className="block px-3 py-2 rounded-md border border-peach bg-white text-sm text-plum hover:border-coral transition-colors"
                      >
                        <span aria-hidden="true">{o.flag} </span>{c.name} CV from {o.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })()}

          {/* 5c. MASTER features + pricing */}
          <CvMasterFeatures />
          <CvMasterPricing />

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

          {/* 7. MASTER FAQ (localized Q prepended) */}
          <CvMasterFaq extra={localizedFaq} />

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

          {/* 9. MASTER Shamool pledge line */}
          <CvMasterShamool />
        </div>
      </main>
      <Footer />
    </>
  );
}
