import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/auth";
import { COUNTRIES_SERVED, type Region } from "@/lib/countries";
import { JOB_ROLES_BY_SECTOR } from "@/lib/roles";

const SITE_ORIGIN = "https://almicv.almiworld.com";

const REGION_NAMES: Record<Region, string> = {
  "north-america": "North America",
  "central-south-america": "Latin America",
  caribbean: "Caribbean",
  "western-europe": "Western Europe",
  nordic: "Nordic",
  "eastern-europe": "Eastern Europe",
  mena: "Middle East & North Africa",
  gulf: "Gulf",
  "sub-saharan-africa": "Sub-Saharan Africa",
  "south-asia": "South Asia",
  "southeast-asia": "Southeast Asia",
  "east-asia": "East Asia",
  "central-asia": "Central Asia & Caucasus",
  oceania: "Oceania",
};

const REGION_ORDER: Region[] = [
  "north-america",
  "central-south-america",
  "caribbean",
  "western-europe",
  "nordic",
  "eastern-europe",
  "mena",
  "gulf",
  "sub-saharan-africa",
  "south-asia",
  "southeast-asia",
  "east-asia",
  "central-asia",
  "oceania",
];

export const metadata: Metadata = {
  title: "CV Guide — Country × Role | AlmiCV",
  description:
    "Pick your country and role to get an AlmiCV guide tailored to local conventions, with AI features, template picks, and deep cross-product links across AlmiWorld.",
  alternates: { canonical: `${SITE_ORIGIN}/cv-guide` },
  openGraph: {
    title: "CV Guide — Country × Role | AlmiCV",
    description: "AlmiCV CV guides for every role in every country — built around local convention.",
    url: `${SITE_ORIGIN}/cv-guide`,
    siteName: "AlmiCV",
    type: "website",
  },
};

export default async function CvGuideIndex() {
  const user = await getCurrentUser();
  const isLoggedIn = Boolean(user);

  // Group countries by region for browsing
  const countriesByRegion = new Map<Region, typeof COUNTRIES_SERVED>();
  for (const c of COUNTRIES_SERVED) {
    const list = countriesByRegion.get(c.region) ?? [];
    list.push(c);
    countriesByRegion.set(c.region, list);
  }

  return (
    <>
      <SiteHeader isLoggedIn={isLoggedIn} />
      <main className="bg-cream">
        <div className="mx-auto w-full max-w-5xl px-6 py-10 sm:py-14">
          <header className="mb-10 text-center">
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-plum mb-4">
              CV Guide — Every Role, Every Country
            </h1>
            <p className="text-base sm:text-lg text-plum-soft leading-relaxed max-w-3xl mx-auto">
              Pick a country to see local CV conventions, or jump straight to a role. AlmiCV builds your CV in many designs — new added every day — with AI tailored to job descriptions in your country.
            </p>
          </header>

          {/* Cross-product strip */}
          <section className="mb-12 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm" aria-label="AlmiWorld products">
            <Link href="/" className="block rounded-md border border-peach bg-white p-3 hover:border-coral transition-colors text-center">
              <p className="font-semibold text-plum">AlmiCV</p>
              <p className="text-xs text-plum-soft mt-1">CV Builder</p>
            </Link>
            <a href="https://almijob.almiworld.com" className="block rounded-md border border-peach bg-white p-3 hover:border-coral transition-colors text-center">
              <p className="font-semibold text-plum">AlmiJob</p>
              <p className="text-xs text-plum-soft mt-1">Job Finder</p>
            </a>
            <a href="https://almisalary.almiworld.com" className="block rounded-md border border-peach bg-white p-3 hover:border-coral transition-colors text-center">
              <p className="font-semibold text-plum">AlmiSalary</p>
              <p className="text-xs text-plum-soft mt-1">Salary Checker</p>
            </a>
            <a href="https://almistudy.almiworld.com" className="block rounded-md border border-peach bg-white p-3 hover:border-coral transition-colors text-center">
              <p className="font-semibold text-plum">AlmiStudy</p>
              <p className="text-xs text-plum-soft mt-1">Universities</p>
            </a>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Pick your country */}
            <section aria-labelledby="pick-country">
              <h2 id="pick-country" className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-4">
                Pick your country
              </h2>
              <div className="space-y-5">
                {REGION_ORDER.map((region) => {
                  const list = countriesByRegion.get(region);
                  if (!list || list.length === 0) return null;
                  const sorted = list.slice().sort((a, b) => a.name.localeCompare(b.name));
                  return (
                    <div key={region}>
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-plum-soft mb-2">
                        {REGION_NAMES[region]} <span className="font-normal">({sorted.length})</span>
                      </h3>
                      <ul className="grid grid-cols-2 gap-1.5 text-sm">
                        {sorted.map((c) => (
                          <li key={c.slug}>
                            <Link href={`/cv-guide/${c.slug}`} className="block px-2 py-1 rounded text-plum hover:text-coral hover:bg-cream-soft transition-colors">
                              {c.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Pick your role */}
            <section aria-labelledby="pick-role">
              <h2 id="pick-role" className="text-xl sm:text-2xl font-semibold tracking-tight text-plum mb-4">
                Pick your role
              </h2>
              <div className="space-y-5">
                {Array.from(JOB_ROLES_BY_SECTOR.entries()).map(([sector, roles]) => (
                  <div key={sector}>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-plum-soft mb-2">
                      {sector} <span className="font-normal">({roles.length})</span>
                    </h3>
                    <ul className="grid grid-cols-2 gap-1.5 text-sm">
                      {roles.map((r) => (
                        <li key={r.slug}>
                          <Link href={`/cv-guide/united-states/${r.slug}`} className="block px-2 py-1 rounded text-plum hover:text-coral hover:bg-cream-soft transition-colors">
                            {r.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="text-xs text-plum-soft mt-4">
                Role links default to United States. Pick a country first to land directly on the matching guide.
              </p>
            </section>
          </div>

          <section className="mt-14 text-center">
            <Link
              href="/signup"
              className="inline-block px-8 py-4 rounded-md bg-coral text-white text-lg font-semibold hover:bg-coral-deep transition-colors"
            >
              Build Your CV Free →
            </Link>
            <p className="text-xs text-plum-soft mt-3">No credit card required. Transform your CV into many designs — new added every day.</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
