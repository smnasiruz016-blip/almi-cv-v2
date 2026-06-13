import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, Mic, LayoutTemplate, Zap } from "lucide-react";
import { Footer } from "@/components/footer";
import { HeroPreview } from "@/components/hero-preview";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isBillingEnabled, getUserPlan } from "@/lib/billing/plans";
import {
  TEMPLATES,
  getAddedAt,
  type TemplateMeta,
} from "@/components/templates/template-registry";
import { CVPreview } from "@/components/templates/CVPreview";
import { SiteHeader } from "@/components/site-header";
import { PricingClient } from "@/app/pricing/pricing-client";
import type { Metadata } from "next";

// Hourly ISR — admin upload action revalidates / via revalidatePath()
// for faster cache busting after a new batch lands.
export const revalidate = 3600;

// SEO from AlmiCV_Page_Copy_v1.md. Layout sets a plain `title` (no template),
// so this string fully replaces it — no double-brand suffix.
const HOME_TITLE = "AI Resume Builder with Real ATS Score | AlmiCV";
const HOME_DESC =
  "Build a CV that beats the filter. Premium templates, AI writing that keeps your voice, and a real ATS score that tells you when you're ready. Start free — Pro is half what other builders charge.";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESC,
  openGraph: { title: HOME_TITLE, description: HOME_DESC, type: "website" },
  twitter: { card: "summary_large_image", title: HOME_TITLE, description: HOME_DESC },
  alternates: { canonical: "https://almicv.almiworld.com" },
};

// One primary CTA, repeated down the page (per the copy spec).
const CTA_LABEL = "Build my CV — free";

// Honest trust statements (no invented numbers/reviews) — from the copy.
const TRUST = [
  "Real ATS score — not a vanity rating",
  "AI that keeps your voice — not robotic filler",
  "Premium templates, recruiter-friendly",
  "Export to PDF, ready to send",
];

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Beat the filter",
    body: "A real ATS score on every CV, so you know it'll reach a human — not a reject pile.",
  },
  {
    icon: Mic,
    title: "Sound like you, only sharper",
    body: "AI writing that strengthens your words without erasing your voice. No generic, copy-paste filler.",
  },
  {
    icon: LayoutTemplate,
    title: "Look the part",
    body: "Premium, recruiter-friendly templates with a live editor. Edit and see it change instantly.",
  },
  {
    icon: Zap,
    title: "Ready in minutes, not days",
    body: "Build unlimited CVs, tailored to each job, in the time it used to take to format one.",
  },
];

const STEPS = [
  {
    n: 1,
    title: "Pick a template",
    body: "Choose a premium, recruiter-tested design.",
  },
  {
    n: 2,
    title: "Write with AI",
    body: "Let AI sharpen each line while keeping your voice — and edit live.",
  },
  {
    n: 3,
    title: "Check your ATS score",
    body: "See your real score, fix what's flagged, and export when it says you're ready.",
  },
];

const FAQS = [
  {
    q: "Is the ATS score real?",
    a: "Yes — we score your CV against the criteria applicant-tracking software actually uses, and show you what to fix. It's a practical check, not a vanity number.",
  },
  {
    q: "Will the AI make my CV sound generic?",
    a: "No. The AI sharpens your words and keeps your voice — it doesn't replace you with template filler.",
  },
  {
    q: "Can I make more than one CV?",
    a: "On Pro, unlimited — so you can tailor a version for every job, which is exactly what beats the filter.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Monthly, no lock-in, no hidden fees.",
  },
];

export default async function HomePage() {
  const user = await getCurrentUser();
  const isLoggedIn = Boolean(user);

  const showcaseTemplates: TemplateMeta[] = [...TEMPLATES]
    .sort((a, b) => getAddedAt(b).localeCompare(getAddedAt(a)))
    .slice(0, 12);

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
      <TrustBar />
      <ProblemSection />
      <BenefitsSection />
      <TemplatesShowcaseSection templates={showcaseTemplates} isLoggedIn={isLoggedIn} />
      <HowItWorksSection />
      <PricingSection
        isLoggedIn={isLoggedIn}
        currentPlan={currentPlan}
        billingEnabled={isBillingEnabled()}
      />
      <FAQSection />
      <FinalCTASection isLoggedIn={isLoggedIn} />
      <Footer />
    </main>
  );
}

// The single primary CTA, reused everywhere. Anonymous → signup; logged-in →
// dashboard (the "build" intent still lands them where they create a CV).
function PrimaryCTA({
  isLoggedIn,
  className,
}: {
  isLoggedIn: boolean;
  className?: string;
}) {
  const href = isLoggedIn ? "/dashboard" : "/signup";
  const label = isLoggedIn ? "Open dashboard" : CTA_LABEL;
  return (
    <Link
      href={href}
      className={
        "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-pill bg-coral px-6 py-3 text-sm font-semibold text-white shadow-warm-card transition hover:-translate-y-0.5 hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30 " +
        (className ?? "")
      }
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

function HeroSection({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <Section className="relative isolate overflow-hidden bg-gradient-to-br from-cream via-cream to-peach pt-20 pb-28 md:min-h-[600px]">
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
            <h1 className="max-w-xl text-balance text-5xl font-medium leading-[1.05] text-plum lg:text-6xl xl:text-7xl">
              The CV that gets you{" "}
              <span className="text-coral">the interview.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-plum-soft">
              Most resumes are rejected by software before a human ever reads
              them. AlmiCV builds a CV that beats the filter — premium
              templates, AI writing that sounds like <em>you</em>, and a real
              ATS score that tells you when you&apos;re ready.
            </p>
            <div className="mt-10">
              <PrimaryCTA isLoggedIn={isLoggedIn} />
            </div>
            <p className="mt-5 text-sm text-plum-faint">
              No card to start. Pro is $7/month — half what other builders
              charge.
            </p>
          </div>
          <HeroPreview />
        </div>
      </Container>
    </Section>
  );
}

function TrustBar() {
  return (
    <Section className="border-y border-peach/40 bg-cream-soft py-8">
      <Container>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-3 text-sm text-plum-soft sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t) => (
            <li key={t} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

// PROBLEM — Problem / Agitate / Solve.
function ProblemSection() {
  return (
    <Section className="bg-cream py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-balance text-4xl font-medium leading-tight text-plum">
            Your CV isn&apos;t being rejected by people. It&apos;s being
            rejected by a robot.
          </h2>
          <p className="mt-6 text-lg leading-8 text-plum-soft">
            Before a human sees your application, software (an ATS) scans it —
            and quietly filters out most CVs for formatting it can&apos;t read
            or keywords it can&apos;t find. You never hear back. You assume you
            weren&apos;t good enough. The truth: your CV never made it into the
            room.
          </p>
          <p className="mt-4 text-lg leading-8 text-plum-soft">
            AlmiCV fixes the part you can&apos;t see. We score your CV the way
            the software does, show you exactly what&apos;s holding it back, and
            help you fix it — before you hit send.
          </p>
        </div>
      </Container>
    </Section>
  );
}

// BENEFITS — 4 cards, benefit + the pain it kills.
function BenefitsSection() {
  return (
    <Section className="bg-gradient-to-b from-cream to-peach/30 py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-4xl text-plum">
            Everything your CV needs to get read.
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {BENEFITS.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="rounded-2xl border border-peach/40 bg-white p-7 shadow-warm-card"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-coral/10 text-coral">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-plum">
                  {b.title}
                </h3>
                <p className="mt-2 text-plum-soft">{b.body}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

// Real product imagery (template renders, not stock) — visual proof for the
// "Look the part / premium templates" benefit.
function TemplatesShowcaseSection({
  templates,
  isLoggedIn,
}: {
  templates: TemplateMeta[];
  isLoggedIn: boolean;
}) {
  if (templates.length === 0) return null;
  return (
    <Section className="bg-peach/30 py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl text-plum">Premium, recruiter-friendly templates.</h2>
          <p className="mt-4 text-plum-soft">
            Every design reads cleanly — for the software and the human.
          </p>
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

// HOW IT WORKS — 3 steps.
function HowItWorksSection() {
  return (
    <Section className="bg-cream py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-4xl text-plum">
            Three steps to an interview-ready CV.
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
    <Section className="bg-gradient-to-b from-cream to-peach/30 py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-display text-4xl text-plum md:text-5xl">
            Start free. Upgrade when you&apos;re ready.
          </h2>
          <p className="mt-3 text-base leading-7 text-plum-soft">
            Build and preview at no cost. Pro is $7/month (or $60/year) for
            unlimited CVs, full AI features, real ATS scoring, and every premium
            template.
          </p>
        </div>
        <div className="mt-10">
          <PricingClient
            isLoggedIn={isLoggedIn}
            currentPlan={currentPlan}
            billingEnabled={billingEnabled}
          />
        </div>
        <p className="mt-8 text-center text-sm text-plum-faint">
          Half the price of other builders. Cancel anytime. No hidden fees.
        </p>
      </Container>
    </Section>
  );
}

function FAQSection() {
  return (
    <Section className="bg-cream py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-4xl text-plum">Questions, answered.</h2>
          <div className="mt-10 space-y-4">
            {FAQS.map((f) => (
              <div
                key={f.q}
                className="rounded-2xl border border-peach/40 bg-white p-6 shadow-warm-card"
              >
                <h3 className="text-lg font-semibold text-plum">{f.q}</h3>
                <p className="mt-2 text-plum-soft">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function FinalCTASection({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <Section className="bg-plum py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-4xl font-medium leading-tight text-cream md:text-5xl">
            Stop guessing why you&apos;re not hearing back.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-cream/70">
            Build a CV that reaches a human — and gets you the interview.
          </p>
          <div className="mt-10 flex justify-center">
            <PrimaryCTA isLoggedIn={isLoggedIn} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
