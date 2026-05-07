import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Briefcase, Sparkles } from "lucide-react";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { JobSitesPanel } from "@/components/dashboard/JobSitesPanel";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { COUNTRY_LANDING, SLUG_TO_COUNTRY } from "@/lib/country-landing";
import { fetchJobSitesForCountry } from "@/lib/job-sites";

const SITE_ORIGIN = "https://almicv.almiworld.com";

type Params = { country: string };

export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return COUNTRY_LANDING.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { country } = await params;
  const entry = SLUG_TO_COUNTRY[country];
  if (!entry) return {};
  const title = `Find jobs in ${entry.name} — AlmiCV`;
  const description = `Hand-picked job sites for ${entry.name}, paired with AlmiCV's ATS-ready CV builder. Find your next role and apply with a polished resume.`;
  const path = `/jobs/${entry.slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CountryJobsPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { country } = await params;
  const entry = SLUG_TO_COUNTRY[country];
  if (!entry) notFound();

  const sites = await fetchJobSitesForCountry(entry.iso);

  const ldjson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: `Find jobs in ${entry.name}`,
        url: `${SITE_ORIGIN}/jobs/${entry.slug}`,
        description: `Hand-picked job sites for ${entry.name}, paired with AlmiCV's ATS-ready CV builder.`,
        isPartOf: { "@type": "WebSite", name: "AlmiCV", url: SITE_ORIGIN },
      },
      ...(sites.length > 0
        ? [
            {
              "@type": "ItemList",
              name: `Job sites in ${entry.name}`,
              numberOfItems: sites.length,
              itemListElement: sites.map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: s.name,
                url: s.url,
              })),
            },
          ]
        : []),
    ],
  };
  const ldjsonSafe = JSON.stringify(ldjson).replace(/</g, "\\u003c");

  return (
    <main>
      <SiteHeader isLoggedIn={false} />

      <Section className="relative isolate overflow-hidden bg-gradient-to-br from-cream via-cream to-peach pt-20 pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 -right-10 z-0 h-80 w-80 rounded-full bg-coral/25 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -left-10 z-0 h-72 w-72 rounded-full bg-mint/20 blur-3xl"
        />
        <Container>
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <Badge variant="gold" className="bg-gold/15 text-[#8A5F1F]">
              <Sparkles className="h-3.5 w-3.5" />
              Job sites & CV builder
            </Badge>
            <h1 className="mt-8 text-balance text-5xl font-medium leading-[1.05] text-plum lg:text-6xl">
              Find jobs in <span className="text-coral">{entry.name}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-plum-soft">
              Hand-picked job sites for {entry.name}, curated by AlmiJob —
              paired with AlmiCV&apos;s live editor and ATS-ready templates so
              you apply with a CV that gets the call.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/signup"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-pill bg-coral px-5 py-3 text-sm font-semibold text-white shadow-warm-card transition hover:-translate-y-0.5 hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
              >
                Build your CV — free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex min-h-[44px] items-center justify-center rounded-pill border border-plum/20 bg-transparent px-5 py-3 text-sm font-semibold text-plum transition hover:border-plum/40 hover:bg-plum/5"
              >
                See templates
              </Link>
            </div>
            <p className="mt-5 text-sm text-plum-faint">
              Free to start · No credit card · 3 CVs included
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-cream-soft py-20">
        <Container>
          {sites.length > 0 ? (
            <JobSitesPanel sites={sites} country={entry.name} />
          ) : (
            <div className="mx-auto max-w-2xl rounded-2xl border border-peach/40 bg-white p-10 text-center shadow-warm-card">
              <Briefcase aria-hidden className="mx-auto h-10 w-10 text-coral" />
              <h2 className="mt-4 text-2xl text-plum">
                We&apos;re refreshing the {entry.name} list
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-plum-soft">
                AlmiJob&apos;s curated job sites for {entry.name} are being
                updated. In the meantime, build a polished CV so you&apos;re
                ready to apply when listings refresh.
              </p>
              <Link
                href="/signup"
                className="mt-6 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-pill bg-coral px-5 py-3 text-sm font-semibold text-white shadow-warm-card transition hover:-translate-y-0.5 hover:bg-coral-deep"
              >
                Start your CV — free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </Container>
      </Section>

      <Section className="bg-plum py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-4xl text-cream">
              A CV that lands these jobs.
            </h2>
            <p className="mt-4 text-cream-soft/80">
              Premium templates, an editor that updates as you type, AI writing
              in your voice, and an ATS score that tells you when you&apos;re
              ready.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/signup"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-pill bg-coral px-6 py-3 text-sm font-semibold text-white shadow-warm-card transition hover:-translate-y-0.5 hover:bg-coral-deep"
              >
                Start your CV — free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldjsonSafe }}
      />
    </main>
  );
}
