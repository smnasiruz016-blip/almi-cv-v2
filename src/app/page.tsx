import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Footer } from "@/components/footer";
import { HeroPreview } from "@/components/hero-preview";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCurrentUser } from "@/lib/auth";

const TRUST_STATS = [
  { value: "942 sources", label: "Trusted job boards" },
  { value: "60+ designs", label: "Coming soon" },
  { value: "$10 once", label: "Lifetime premium" },
  { value: "5 languages", label: "EN · UR · DE · DA · IS" },
];

const STEPS = [
  {
    n: 1,
    title: "Pick a template",
    body: "Three free classics with color and layout options. Or unlock 60+ premium designs.",
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

  return (
    <main>
      <SiteHeader isLoggedIn={isLoggedIn} />
      <HeroSection isLoggedIn={isLoggedIn} />
      <TrustSection />
      <TemplatesSection />
      <HowItWorksSection />
      <FinalCTASection isLoggedIn={isLoggedIn} />
      <Footer />
    </main>
  );
}

function SiteHeader({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <header className="sticky top-0 z-50 bg-cream/80 backdrop-blur-md">
      <Container>
        <div className="flex items-center justify-between py-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-coral text-lg font-bold text-white">
              A
            </span>
            <span className="text-xl font-semibold tracking-tight text-plum">
              AlmiCV
            </span>
          </Link>
          <Link
            href={isLoggedIn ? "/dashboard" : "/login"}
            className="text-sm font-medium text-plum-soft transition hover:text-coral"
          >
            {isLoggedIn ? "Dashboard" : "Log in"}
          </Link>
        </div>
      </Container>
    </header>
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
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-pill bg-coral px-5 py-3 text-sm font-semibold text-white shadow-warm-card transition hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
              >
                {label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex min-h-[44px] items-center justify-center rounded-pill border border-plum/20 bg-transparent px-5 py-3 text-sm font-semibold text-plum transition hover:bg-plum/5 focus:outline-none focus:ring-4 focus:ring-plum/15"
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

function TrustSection() {
  return (
    <Section className="bg-cream-soft py-18">
      <Container>
        <p className="text-center text-sm uppercase tracking-widest text-plum-faint">
          Built for job-seekers in Iceland · UK · Germany · Pakistan · and beyond
        </p>
        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
          {TRUST_STATS.map((stat) => (
            <div key={stat.value} className="text-center">
              <p className="font-display text-3xl text-coral">{stat.value}</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-plum-soft">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function TemplatesSection() {
  return (
    <Section className="bg-gradient-to-b from-cream-soft to-peach/40 py-30">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="mint" className="border-coral/30 bg-coral/15 text-coral-deep">
            Templates
          </Badge>
          <h2 className="mt-4 text-4xl text-plum">A look for every story.</h2>
          <p className="mt-4 text-plum-soft">
            Start with one of three free classics. Unlock 60+ premium variations any time.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <TemplateCard name="Classic Serif">
            <ClassicSerifThumb />
          </TemplateCard>
          <TemplateCard name="Modern Mono">
            <ModernMonoThumb />
          </TemplateCard>
          <TemplateCard name="Editorial Bold">
            <EditorialBoldThumb />
          </TemplateCard>
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href="/templates"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-pill px-5 py-3 text-sm font-semibold text-coral transition hover:text-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/20"
          >
            See all templates
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}

function TemplateCard({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <Card className="border-peach/40 bg-white shadow-warm-card transition-shadow hover:shadow-warm-card-hover">
      {children}
      <h3 className="mt-5 text-xl text-plum">{name}</h3>
      <p className="mt-1 text-sm text-plum-soft">Free · Customize colors</p>
    </Card>
  );
}

function ClassicSerifThumb() {
  return (
    <div className="aspect-[3/4] overflow-hidden rounded-lg border border-plum/5 bg-white shadow-inner">
      <div className="flex h-8 items-center justify-between bg-plum px-3">
        <span className="font-display text-[10px] tracking-wide text-cream">MAYA RODRIGUEZ</span>
        <span className="text-[7px] text-cream/70">Senior Product Designer</span>
      </div>
      <div className="space-y-2 p-2">
        <div>
          <p className="font-display text-[7px] tracking-[0.15em] text-plum">EXPERIENCE</p>
          <p className="mt-1 whitespace-nowrap text-[6px] font-medium leading-tight text-plum">
            Acme Inc. · 2021–Present
          </p>
          <div className="mt-1 space-y-[2px]">
            <div className="h-[2px] w-full rounded bg-plum/40" />
            <div className="h-[2px] w-3/4 rounded bg-plum/40" />
          </div>
          <p className="mt-1.5 whitespace-nowrap text-[6px] font-medium leading-tight text-plum">
            Globex Corp · 2018–2021
          </p>
          <div className="mt-1 space-y-[2px]">
            <div className="h-[2px] w-full rounded bg-plum/40" />
            <div className="h-[2px] w-2/3 rounded bg-plum/40" />
          </div>
        </div>
        <div className="border-t border-plum/10 pt-1.5">
          <p className="font-display text-[7px] tracking-[0.15em] text-plum">EDUCATION</p>
          <p className="mt-1 whitespace-nowrap text-[6px] leading-tight text-plum">
            MIT · BSc Computer Science · 2018
          </p>
        </div>
        <div className="border-t border-plum/10 pt-1.5">
          <p className="font-display text-[7px] tracking-[0.15em] text-plum">SKILLS</p>
          <div className="mt-1 h-[2px] w-full rounded bg-plum/40" />
        </div>
      </div>
    </div>
  );
}

function ModernMonoThumb() {
  return (
    <div className="flex aspect-[3/4] overflow-hidden rounded-lg border border-plum/5 bg-white shadow-inner">
      <div className="w-[35%] space-y-2 bg-mint/30 p-2">
        <div className="mx-auto h-6 w-6 rounded-full bg-mint" />
        <p className="text-center font-display text-[7px] text-plum">ALEX CHEN</p>
        <p className="text-center text-[6px] text-plum-soft">Frontend Engineer</p>
        <div className="border-t border-mint/50 pt-1.5">
          <p className="text-[6px] tracking-wider text-plum">CONTACT</p>
          <div className="mt-1 space-y-[2px]">
            <div className="h-[2px] w-full rounded bg-plum/30" />
            <div className="h-[2px] w-3/4 rounded bg-plum/30" />
          </div>
        </div>
        <div>
          <p className="text-[6px] tracking-wider text-plum">SKILLS</p>
          <div className="mt-1 space-y-[2px]">
            <div className="h-[2px] w-full rounded bg-plum/30" />
            <div className="h-[2px] w-2/3 rounded bg-plum/30" />
            <div className="h-[2px] w-3/4 rounded bg-plum/30" />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-2 p-2">
        <div>
          <p className="font-display text-[7px] tracking-wider text-plum">EXPERIENCE</p>
          <p className="mt-1 whitespace-nowrap text-[6px] font-medium leading-tight text-plum">
            Stripe · 2022–Now
          </p>
          <div className="mt-1 space-y-[2px]">
            <div className="h-[2px] w-full rounded bg-plum/30" />
            <div className="h-[2px] w-3/4 rounded bg-plum/30" />
          </div>
          <p className="mt-1.5 whitespace-nowrap text-[6px] font-medium leading-tight text-plum">
            Vercel · 2020–2022
          </p>
          <div className="mt-1 space-y-[2px]">
            <div className="h-[2px] w-full rounded bg-plum/30" />
            <div className="h-[2px] w-2/3 rounded bg-plum/30" />
          </div>
        </div>
        <div>
          <p className="font-display text-[7px] tracking-wider text-plum">EDUCATION</p>
          <p className="mt-1 whitespace-nowrap text-[6px] leading-tight text-plum">
            Stanford · BS · 2020
          </p>
          <div className="mt-1 h-[2px] w-3/4 rounded bg-plum/30" />
        </div>
      </div>
    </div>
  );
}

function EditorialBoldThumb() {
  return (
    <div className="flex aspect-[3/4] flex-col overflow-hidden rounded-lg border border-plum/5 bg-white shadow-inner">
      <div className="flex h-10 items-center justify-between bg-gold px-3">
        <span className="font-display text-[10px] text-plum">PRIYA PATEL</span>
        <span className="text-[7px] text-plum">Marketing Director</span>
      </div>
      <div className="flex-1 space-y-2 p-2">
        <div className="space-y-[2px]">
          <div className="h-[2px] w-full rounded bg-plum/40" />
          <div className="h-[2px] w-full rounded bg-plum/40" />
          <div className="h-[2px] w-2/3 rounded bg-plum/40" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="font-display text-[7px] tracking-wider text-plum">EXPERIENCE</p>
            <p className="mt-1 whitespace-nowrap text-[6px] font-medium leading-tight text-plum">
              Nike · 2021–Now
            </p>
            <div className="mt-1 space-y-[2px]">
              <div className="h-[2px] w-full rounded bg-plum/30" />
              <div className="h-[2px] w-3/4 rounded bg-plum/30" />
            </div>
            <p className="mt-1.5 whitespace-nowrap text-[6px] font-medium leading-tight text-plum">
              Adobe · 2017–2021
            </p>
            <div className="mt-1 space-y-[2px]">
              <div className="h-[2px] w-full rounded bg-plum/30" />
              <div className="h-[2px] w-2/3 rounded bg-plum/30" />
            </div>
          </div>
          <div>
            <p className="font-display text-[7px] tracking-wider text-plum">EDUCATION</p>
            <p className="mt-1 whitespace-nowrap text-[6px] leading-tight text-plum">
              Wharton MBA · 2017
            </p>
            <p className="mt-2 font-display text-[7px] tracking-wider text-plum">AWARDS</p>
            <div className="mt-1 h-[2px] w-3/4 rounded bg-plum/30" />
          </div>
        </div>
      </div>
    </div>
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
            Free to start. Three CVs included. Upgrade once for $10 and unlock everything — for life.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href={href}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-pill bg-coral px-5 py-3 text-sm font-semibold text-white shadow-warm-card transition hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
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
