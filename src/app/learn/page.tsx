// THE /learn HUB. Not decoration — the crawl path.
//
// AlmiOET's register pages were orphaned because /register returned 404: Google
// had no route to any of them and none were ever indexed. So this page exists,
// and its list is DERIVED from content/learn/ rather than hand-maintained. A new
// guide appears here the moment its file lands, which makes orphaning impossible
// rather than remembered.

import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { getAllArticles, getSections, LEARN_BASE } from "@/lib/cv/learn/articles";

const SITE_ORIGIN = "https://almicv.almiworld.com";

// Fully static, render-once, cache until redeploy. isLoggedIn={false} for the
// same reason /jobs/[country] does it: reading the session would make this a
// dynamic route and the guides would stop being prerendered.
export const revalidate = false;

const TITLE = "CV guides: what actually matters, explained";
const DESCRIPTION =
  "Plain guides to writing a CV that parses cleanly and reads well — what employers and their software do with your document, and how to fix the parts that cost you.";

export const metadata: Metadata = {
  title: `${TITLE} | AlmiCV`,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_ORIGIN}${LEARN_BASE}` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_ORIGIN}${LEARN_BASE}`,
    siteName: "AlmiCV",
    type: "website",
  },
};

export default function LearnHubPage() {
  const sections = getSections();
  const total = getAllArticles().length;

  return (
    <>
      <SiteHeader isLoggedIn={false} />
      <main className="bg-cream">
        <div className="mx-auto w-full max-w-4xl px-6 py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="text-xs text-plum-soft">
            <Link href="/" className="hover:text-coral">AlmiCV</Link>
            {" › "}
            <span className="text-plum">Learn</span>
          </nav>

          <header className="mt-3 mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-plum">
              {TITLE}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-plum-soft leading-relaxed max-w-3xl">
              {DESCRIPTION}
            </p>
          </header>

          {total === 0 ? (
            <p className="text-sm text-plum-soft">No guides published yet.</p>
          ) : (
            sections.map((s) => (
              <section key={s.section} className="mb-10">
                <h2 className="text-xl font-semibold tracking-tight text-plum">{s.section}</h2>
                <ul className="mt-4 space-y-4">
                  {s.articles.map((a) => (
                    <li key={a.slug} className="rounded-xl border border-peach bg-white p-5">
                      <Link
                        href={a.path}
                        className="text-base font-semibold text-plum hover:text-coral hover:underline"
                      >
                        {a.title}
                      </Link>
                      <p className="mt-1.5 text-sm text-plum-soft leading-relaxed">{a.description}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ))
          )}

          <p className="mt-10 text-xs text-plum-soft">
            AlmiCV&apos;s ATS score is a structural check on your document, not a
            prediction of any employer&apos;s decision.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
