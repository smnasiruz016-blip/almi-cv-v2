import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Footer } from "@/components/footer";
import { HeroPreview } from "@/components/hero-preview";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isBillingEnabled, getUserPlan } from "@/lib/billing/plans";
import {
  TEMPLATES,
  type TemplateMeta,
} from "@/components/templates/template-registry";
import { CVPreview } from "@/components/templates/CVPreview";
import { NewsletterCard } from "@/components/newsletter/NewsletterCard";
import { SiteHeader } from "@/components/site-header";
import { PricingClient } from "@/app/pricing/pricing-client";

// Hourly ISR — admin upload action revalidates / via revalidatePath()
// for faster cache busting after a new batch lands. Home queries:
// getLatestTemplatesForHome (30) + getUserPlan if logged in.
export const revalidate = 3600;

type TrustStat = {
  value: string;
  label: string;
  href?: string;
};

// Numbers removed from TrustSection per PR #51 founder feedback —
// static counts age poorly when scale grows daily. Replaced with
// non-numeric phrasing.
const TRUST_STATS: TrustStat[] = [
  { value: "942 sources", label: "Trusted job boards" },
  { value: "Designs", label: "Across many roles", href: "/templates" },
  { value: "Multilingual", label: "Built-in translation" },
];

const STEPS = [
  {
    n: 1,
    title: "Pick a template",
    body: "Six free classics with full color and layout control. Or unlock the Premium library — role-specific designs for healthcare, trades, hospitality, customer service, and tech.",
  },
  {
    n: 2,
    title: "Tell your story",
    body: "Editor updates as you type. AI helper rewrites in your voice when you're stuck.",
  },
  {
    n: 3,
    title: "Score and ship",
    body: "Live ATS score tells you when you're ready. Export PDF. Send. Get the call.",
  },
];

export default async function HomePage() {
  const user = await getCurrentUser();
  const isLoggedIn = Boolean(user);
  // PNG sunset: home strip now sources from the registry (static), no DB
  // hit. Show the first 12 templates from registry order (most-specific
  // first) — enough variety to hint at the breadth without dominating.
  const showcaseTemplates: TemplateMeta[] = TEMPLATES.slice(0, 12);

  // Pricing cards need the same data the /pricing page resolves — only
  // worth the DB hit when a user is actually logged in.
  let currentPlan: "FREE" | "PRO_MONTHLY" | "PRO_YEARLY" = "FREE";
  if (user) {
    const u = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        subscriptionStatus: true,
        subscriptionCurrentPeriodEnd: true,
        subscriptionPlan: true,
        compProUntil: true,
      },
    });
    if (u) currentPlan = getUserPlan(u);
  }

  return (
    <main>
      <SiteHeader isLoggedIn={isLoggedIn} />
      <HeroSection isLoggedIn={isLoggedIn} />
      <VideoSection />
      <TemplatesShowcaseSection
        templates={showcaseTemplates}
        isLoggedIn={isLoggedIn}
      />
      <TrustSection stats={TRUST_STATS} />
      <PricingSection
        isLoggedIn={isLoggedIn}
        currentPlan={currentPlan}
        billingEnabled={isBillingEnabled()}
      />
      <HowItWorksSection />
      <FinalCTASection isLoggedIn={isLoggedIn} />
      <NewsletterSection />
      <Footer />
    </main>
  );
}

function NewsletterSection() {
  return (
    <Section className="bg-cream-soft py-16">
      <Container>
        <NewsletterCard />
      </Container>
    </Section>
  );
}

function HeroSection({ isLoggedIn }: { isLoggedIn: boolean }) {
  const href = isLoggedIn ? "/dashboard" : "/signup";
  const label = isLoggedIn ? "Open dashboard" : "Get started — free";

  return (
    <Section className="relative isolate overflow-hidden bg-gradient-to-br from-cream via-cream to-peach pt-20 pb-30 md:min-h-[600px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 z-0 h-96 w-96 rounded-full bg-coral/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -left-10 z-0 h-80 w-80 rounded-full bg-mint/20 blur-3xl"
      />
      <Container>
        <div className="relative z-10 grid items-center gap-12 md:grid-cols-2">
          <div>
            <Badge variant="gold" className="bg-gold/15 text-[#8A5F1F]">
              <Sparkles className="h-3.5 w-3.5" />
              Brand-quality CVs without the design work
            </Badge>
            <h1 className="mt-8 max-w-xl text-balance text-5xl font-medium leading-[1.05] text-plum lg:text-6xl xl:text-7xl">
              A CV that looks like it was{" "}
              <span className="text-coral">designed for you.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-plum-soft">
              Premium templates, an editor that updates live, AI writing that respects your voice, and an ATS score that tells you when you&apos;re ready.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href={href}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-pill bg-coral px-5 py-3 text-sm font-semibold text-white shadow-warm-card transition hover:-translate-y-0.5 hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
              >
                {label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex min-h-[44px] items-center justify-center rounded-pill border border-plum/20 bg-transparent px-5 py-3 text-sm font-semibold text-plum transition hover:border-plum/40 hover:bg-plum/5 focus:outline-none focus:ring-4 focus:ring-plum/15"
              >
                See templates
              </Link>
            </div>
            <p className="mt-5 text-sm text-plum-faint">
              Free to start · No credit card · 3 CVs included
            </p>
          </div>
          <HeroPreview />
        </div>
      </Container>
    </Section>
  );
}

// Tutorial walkthrough — sits between the hero and the templates strip.
// Privacy-friendly youtube-nocookie embed; responsive 16:9 via a padding-bottom
// box so it holds ratio without relying on aspect-ratio support.
function VideoSection() {
  return (
    <Section className="bg-cream-soft py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="mint" className="border-coral/30 bg-coral/15 text-coral-deep">
            Tutorial
          </Badge>
          <h2 className="mt-4 text-4xl text-plum">See how it works.</h2>
          <p className="mt-4 text-plum-soft">A quick walkthrough of building your CV with AlmiCV.</p>
        </div>

        <div className="mx-auto mt-10 w-full max-w-[820px] overflow-hidden rounded-2xl border border-peach/30 bg-plum/5 shadow-warm-card-hover">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube-nocookie.com/embed/RPNZ3L-SnsU?rel=0"
              title="See how AlmiCV works — tutorial"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerated-sensors; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

// PNG sunset: this section used to render 30 most-recent TemplateImage
// rows from the DB. Now it renders the first 12 templates from the
// registry — static, no DB hit, identical CSS shape (responsive grid
// of small card thumbnails). Each card jumps straight to /cv/new for
// logged-in users or to /signup for anon.
function TemplatesShowcaseSection({
  templates,
  isLoggedIn,
}: {
  templates: TemplateMeta[];
  isLoggedIn: boolean;
}) {
  if (templates.length === 0) return null;
  return (
    <Section className="bg-gradient-to-b from-cream-soft to-peach/40 py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="mint" className="border-coral/30 bg-coral/15 text-coral-deep">
            Templates
          </Badge>
          <h2 className="mt-4 text-4xl text-plum">A look for every story.</h2>
          <p className="mt-4 text-plum-soft">Every template is a story.</p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-4">
          {templates.map((t) => {
            const href = isLoggedIn
              ? `/cv/new?template=${t.slug}`
              : `/signup?intent=template&template=${t.slug}`;
            return (
              <Link
                key={t.slug}
                href={href}
                className="group block overflow-hidden rounded-xl border border-peach/30 bg-white shadow-warm-card transition-transform hover:-translate-y-0.5"
                aria-label={`Use the ${t.name} template`}
              >
                <div className="bg-plum/5">
                  <CVPreview slug={t.slug} width={200} className="mx-auto" />
                </div>
                <div className="border-t border-peach/30 px-2 py-2">
                  <p className="truncate text-xs font-medium text-plum">
                    {t.name}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/templates"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-pill px-5 py-3 text-sm font-semibold text-coral transition hover:text-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/20"
          >
            Browse all templates
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}

function TrustSection({ stats }: { stats: TrustStat[] }) {
  return (
    <Section className="bg-cream-soft py-18">
      <Container>
        <p className="text-center text-sm uppercase tracking-widest text-plum-faint">
          Built for the world
        </p>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat) => {
            const inner = (
              <>
                <p className="font-display text-3xl text-coral">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-widest text-plum-soft">
                  {stat.label}
                </p>
              </>
            );
            return stat.href ? (
              <Link
                key={stat.value}
                href={stat.href}
                className="block rounded-xl text-center transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-coral/30"
              >
                {inner}
              </Link>
            ) : (
              <div key={stat.value} className="text-center">
                {inner}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

// Pricing cards inlined on home — same PricingClient component the
// /pricing page renders, called cross-route. If this becomes a common
// pattern, extract to @/components/pricing/PricingCards and have both
// pages share it; for one-shot reuse the cross-route import is fine.
function PricingSection({
  isLoggedIn,
  currentPlan,
  billingEnabled,
}: {
  isLoggedIn: boolean;
  currentPlan: "FREE" | "PRO_MONTHLY" | "PRO_YEARLY";
  billingEnabled: boolean;
}) {
  return (
    <Section className="bg-cream py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-display text-4xl text-plum md:text-5xl">
            Choose your plan
          </h2>
          <p className="mt-3 text-base leading-7 text-plum-soft">
            Start free. Upgrade when you&apos;re ready for unlimited AI, more
            CV slots, and every premium template.
          </p>
        </div>
        <div className="mt-10">
          <PricingClient
            isLoggedIn={isLoggedIn}
            currentPlan={currentPlan}
            billingEnabled={billingEnabled}
          />
        </div>
      </Container>
    </Section>
  );
}

function HowItWorksSection() {
  return (
    <Section className="bg-peach/30 py-30">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="mint" className="bg-mint/20 text-[#0F4A42]">
            How it works
          </Badge>
          <h2 className="mt-4 text-balance text-4xl text-plum">
            From blank page to interview-ready in 10 minutes.
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.n}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-coral font-display text-xl font-medium text-white">
                {step.n}
              </div>
              <h3 className="mt-5 text-2xl text-plum">{step.title}</h3>
              <p className="mt-3 text-plum-soft">{step.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function FinalCTASection({ isLoggedIn }: { isLoggedIn: boolean }) {
  const href = isLoggedIn ? "/dashboard" : "/signup";
  const label = isLoggedIn ? "Open dashboard" : "Start your CV — free";

  return (
    <Section className="bg-plum py-30">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-5xl font-medium leading-tight text-cream md:text-6xl">
            Your next chapter starts with a better CV.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-cream/70">
            Free to start. Three CVs included. Upgrade to Pro for unlimited AI and every premium template — $7/month with a 7-day free trial.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href={href}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-pill bg-coral px-5 py-3 text-sm font-semibold text-white shadow-warm-card transition hover:-translate-y-0.5 hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
            >
              {label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-5 text-sm text-cream/50">
            No credit card. No subscription. No tricks.
          </p>
        </div>
      </Container>
    </Section>
  );
}
