import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";

// COST FIX round 2 (Oct 2026): the "Pick your country" and "Pick your role"
// lists were removed — every link in them pointed at /cv-guide/{country} or
// /cv-guide/{country}/{role}, which now answer 410 Gone (src/proxy.ts).

const SITE_ORIGIN = "https://almicv.almiworld.com";

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
  // COST FIX (26 Aug): this route no longer reads the session.
  //
  // Reading it opted the route out of Next's full route cache, so `revalidate`
  // never took effect and every crawl of every URL here was a fresh render. The
  // #99 measurement put that at 15,362 of 15,858 submitted URLs; after waves 1-3
  // the grid alone is 45,568. /jobs/[country] has always passed isLoggedIn={false}
  // for exactly this reason.
  //
  // The trade-off, accepted deliberately: the header and CTA render their
  // logged-out variant for everyone, including signed-in visitors. A client-side
  // session check to restore personalisation is NOT in this PR.
  const isLoggedIn = false;

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

          <section className="mt-14 text-center">
            <Link
              href="/signup"
              className="inline-block px-8 py-4 rounded-md bg-coral text-white text-lg font-semibold hover:bg-coral-deep transition-colors"
            >
              Start 7-day free trial →
            </Link>
            <p className="text-xs text-plum-soft mt-3">7-day free trial, then $12/month. Cancel anytime.</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
