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
  "Build a CV that beats the filter. Premium templates, AI writing that keeps your voice, and a real ATS score that tells you when you're ready. Start free — Pro is $7/month, a fraction of what resume.io and Zety charge.";

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
  "A real ATS score — not a vanity number",
  "AI that keeps your voice — never robotic filler",
  "$7/mo flat — no download paywall",
  "Unlimited CVs, one for every job",
];

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Beat the robot",
    body: "A real ATS score on every CV, so you know it'll reach a human — not vanish into a reject pile.",
  },
  {
    icon: Mic,
    title: "Sound like you — only sharper",
    body: "AI rewrites weak lines into strong ones — “Managed a team” becomes “Led a team of 8 to deliver X early” — while keeping your voice. No generic filler that screams “AI wrote this.”",
  },
  {
    icon: LayoutTemplate,
    title: "Look like you belong",
    body: "Premium, recruiter-tested templates that pass the ATS and impress the human. Edit live, see it change instantly.",
  },
  {
    icon: Zap,
    title: "One CV for every job — unlimited",
    body: "The secret to beating the filter is tailoring each CV to each posting. On Pro, that's unlimited. Most builders charge per download for this. We don't.",
  },
];

const STEPS = [
  {
    n: 1,
    title: "Pick a template",
    body: "Recruiter-tested and ATS-safe.",
  },
  {
    n: 2,
    title: "Write with AI",
    body: "Every line sharpened, your voice kept. Edit live.",
  },
  {
    n: 3,
    title: "Check your real ATS score",
    body: "See what's holding you back, fix it, and export when it says you're ready.",
  },
];

const FAQS = [
  {
    q: "Will AlmiCV actually get me past the ATS?",
    a: "Yes — we score your CV the way applicant-tracking software does, and show you what to fix, starting with the #1 thing recruiters search: the exact job title.",
  },
  {
    q: "Is it really free to start?",
    a: "Yes. Build free. Pro is $7/month — no download paywall, no weekly-billing trick. What you see is what you pay.",
  },
  {
    q: "How are you so much cheaper than resume.io and Zety?",
    a: "No tricks, no inflated pricing, no per-download charges. A fair price for a tool that works.",
  },
  {
    q: "Will the AI make me sound generic?",
    a: "Never. It sharpens your words. You stay in control of every line.",
  },
  {
    q: "Can I make a different CV for each job?",
    a: "Unlimited on Pro — which is exactly how you beat the filter.",
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
              Right now, a robot is deleting your CV before a human ever reads
              it. Not because you&apos;re not good enough — because your CV
              doesn&apos;t speak the machine&apos;s language. AlmiCV fixes that:
              a real ATS score, the exact keywords recruiters search for, and AI
              that sharpens your words without erasing your <em>voice</em>.
            </p>
            <div className="mt-10">
              <PrimaryCTA isLoggedIn={isLoggedIn} />
            </div>
            <p className="mt-5 text-sm text-plum-faint">
              Free to start. Pro is $7/month — a third of what resume.io and
              Zety charge. No download traps. No weekly-billing tricks.
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
            You&apos;re not losing jobs to better candidates. You&apos;re losing
            them to a robot you never see.
          </h2>
          <p className="mt-6 text-lg leading-8 text-plum-soft">
            Here&apos;s what really happens after you hit “apply”: software (an
            ATS) scans your CV first. If it can&apos;t find the right keywords,
            or can&apos;t read your formatting, it rejects you — silently. No
            email. No reason. You assume you weren&apos;t good enough.
          </p>
          <p className="mt-4 text-lg leading-8 text-plum-soft">
            The truth is harsher and easier to fix: your CV never reached a
            human at all. Around 75% of CVs are filtered out this way before
            anyone reads them. Every “we went with another candidate” might
            really mean a robot threw you out in 6 seconds.
          </p>
          <p className="mt-4 text-lg leading-8 text-plum-soft">
            AlmiCV ends the guessing. We score your CV the way the software
            does, show you exactly what&apos;s killing it, and help you fix it —
            before you apply.
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
            Start free. Build and preview at no cost.
          </h2>
          <p className="mt-3 text-base leading-7 text-plum-soft">
            Pro is $7/month — unlimited CVs, full AI, real ATS scoring, and
            every premium template. resume.io charges around $25/month; Zety
            bills you weekly and locks your download behind a paywall. We charge
            $7, flat, with no tricks — because we&apos;d rather you stayed for
            being good than for being trapped.
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
          Start free — upgrade when you&apos;re ready. Cancel anytime. No hidden
          fees.
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
            Stop letting a robot decide your future in 6 seconds.
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
