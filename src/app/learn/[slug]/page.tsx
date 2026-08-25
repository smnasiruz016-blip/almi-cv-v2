// ONE route + ONE template for every /learn guide. Guide 111 needs no code
// change — it needs a file in content/learn/.
//
// Server component: the markdown is rendered to HTML at BUILD time and shipped
// as static HTML. A page Google receives empty is not a page.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { getAllArticles, getArticle, LEARN_BASE } from "@/lib/cv/learn/articles";

const SITE_ORIGIN = "https://almicv.almiworld.com";

// generateStaticParams returns the COMPLETE set, so every real URL is prebuilt
// at deploy and an unknown URL 404s instead of triggering a render + ISR cache
// write. Nothing here reads the session — see the hub for why that matters.
export const revalidate = false;
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} | AlmiCV`,
    description: article.description,
    alternates: { canonical: `${SITE_ORIGIN}${article.path}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `${SITE_ORIGIN}${article.path}`,
      siteName: "AlmiCV",
      type: "article",
    },
  };
}

export default async function LearnArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const known = new Set(getAllArticles().map((a) => a.slug));

  return (
    <>
      <SiteHeader isLoggedIn={false} />
      <main className="bg-cream">
        <div className="mx-auto w-full max-w-3xl px-6 py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="text-xs text-plum-soft">
            <Link href="/" className="hover:text-coral">AlmiCV</Link>
            {" › "}
            <Link href={LEARN_BASE} className="hover:text-coral">Learn</Link>
            {" › "}
            <Link href={LEARN_BASE} className="hover:text-coral">{article.section}</Link>
            {" › "}
            <span className="text-plum">{article.title}</span>
          </nav>

          <header className="mt-3">
            <p className="text-xs uppercase tracking-wide text-plum-soft">{article.section}</p>
            <h1 className="mt-1 text-3xl sm:text-4xl font-semibold tracking-tight text-plum">
              {article.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-plum-soft leading-relaxed">
              {article.description}
            </p>
          </header>

          {/* Body prose. Styling lives in globals.css under .learn-prose so the
              markdown output needs no per-element class injection. remark-gfm is
              not optional: real guides use tables, nested lists and a bullet list
              inside a blockquote, and plain CommonMark mangles several of those.
              No raw HTML is rendered; the source is our own repo content. */}
          <article className="learn-prose mt-8">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.body}</ReactMarkdown>
          </article>

          {/* CTA — typed, not prose, so a gate can assert every guide has one and
              that it points at a builder/templates route that really exists. */}
          <section className="mt-10 rounded-xl border border-coral/40 bg-white p-6">
            <Link
              href={article.cta.href}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-coral px-7 py-3 text-base font-semibold text-white hover:bg-coral/90"
            >
              {article.cta.label}
            </Link>
            {article.cta.note && (
              <p className="mt-3 text-sm text-plum-soft leading-relaxed">{article.cta.note}</p>
            )}
          </section>

          {article.related.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-plum-soft">
                Related
              </h2>
              <ul className="mt-3 space-y-2">
                {article.related.map((r) => (
                  <li key={r.label} className="text-sm">
                    {/* A guide may point at one not yet written — normal while a
                        set is authored. Link when it resolves, plain text when it
                        does not, so a dangling reference is never a 404. */}
                    {r.slug && known.has(r.slug) ? (
                      <Link href={`${LEARN_BASE}/${r.slug}`} className="text-coral hover:underline">
                        {r.label}
                      </Link>
                    ) : (
                      <span className="text-plum-soft">{r.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {article.sources.length > 0 && (
            <section className="mt-8 border-t border-peach pt-4">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-plum-soft">Sources</h2>
              <ul className="mt-2 space-y-1">
                {article.sources.map((s) => (
                  <li key={s.url} className="text-xs text-plum-soft">
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="hover:underline"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <p className="mt-8 text-xs text-plum-soft">
            AlmiCV&apos;s ATS score is a structural check on your document, not a
            prediction of any employer&apos;s decision.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
