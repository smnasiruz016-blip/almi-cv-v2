import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  BRAND_BUTTON_CLASSES,
  GHOST_BUTTON_CLASSES,
  OUTLINE_BUTTON_CLASSES,
} from "@/components/ui/button";
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
    <header className="bg-navy-900">
      <Container>
        <div className="flex items-center justify-between py-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-mint text-lg font-bold text-navy-900">
              A
            </span>
            <span className="text-xl font-semibold tracking-tight text-soft-white">
              AlmiCV
            </span>
          </Link>
          <Link
            href={isLoggedIn ? "/dashboard" : "/login"}
            className="text-sm font-medium text-muted transition hover:text-soft-white"
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
    <Section className="relative isolate overflow-hidden bg-navy-900 pt-20 pb-30 md:min-h-[600px]">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <Badge variant="mint">
              <Sparkles className="h-3.5 w-3.5" />
              Brand-quality CVs without the design work
            </Badge>
            <h1 className="mt-8 max-w-xl text-balance text-5xl font-medium leading-[1.05] text-soft-white lg:text-6xl xl:text-7xl">
              A CV that looks like it was{" "}
              <span className="text-mint">designed for you.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted">
              Premium templates, an editor that updates live, AI writing that respects your voice, and an ATS score that tells you when you&apos;re ready.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href={href} className={`${BRAND_BUTTON_CLASSES} gap-2 !text-navy-900`}>
                {label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/templates" className={OUTLINE_BUTTON_CLASSES}>
                See templates
              </Link>
            </div>
            <p className="mt-5 text-sm text-muted">
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
    <Section className="bg-navy-900 py-18">
      <Container>
        <p className="text-center text-sm uppercase tracking-widest text-muted">
          Built for job-seekers in Iceland · UK · Germany · Pakistan · and beyond
        </p>
        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
          {TRUST_STATS.map((stat) => (
            <div key={stat.value} className="text-center">
              <p className="text-3xl text-mint">{stat.value}</p>
              <p className="mt-2 text-xs uppercase tracking-wider text-muted">
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
    <Section className="bg-navy-900 py-30">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="mint">Templates</Badge>
          <h2 className="mt-4 text-4xl text-soft-white">A look for every story.</h2>
          <p className="mt-4 text-muted">
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
          <Link href="/templates" className={`${GHOST_BUTTON_CLASSES} gap-2`}>
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
    <Card className="transition-shadow hover:shadow-card-hover">
      {children}
      <h3 className="mt-5 text-xl text-soft-white">{name}</h3>
      <p className="mt-1 text-sm text-muted">Free · Customize colors</p>
    </Card>
  );
}

function ClassicSerifThumb() {
  return (
    <div className="aspect-[3/4] rounded-lg bg-soft-white p-3">
      <div className="h-8 w-full rounded-sm bg-navy-900" />
      <div className="mt-3 space-y-1.5">
        <div className="h-1.5 w-3/4 rounded-sm bg-navy-700/25" />
        <div className="h-1.5 w-1/2 rounded-sm bg-navy-700/25" />
      </div>
      <div className="mt-3 h-px w-full bg-navy-700/20" />
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <div className="h-1 w-full rounded-sm bg-navy-700/15" />
          <div className="h-1 w-full rounded-sm bg-navy-700/15" />
          <div className="h-1 w-3/4 rounded-sm bg-navy-700/15" />
          <div className="h-1 w-2/3 rounded-sm bg-navy-700/15" />
        </div>
        <div className="space-y-1">
          <div className="h-1 w-full rounded-sm bg-navy-700/15" />
          <div className="h-1 w-2/3 rounded-sm bg-navy-700/15" />
          <div className="h-1 w-full rounded-sm bg-navy-700/15" />
          <div className="h-1 w-3/4 rounded-sm bg-navy-700/15" />
        </div>
      </div>
    </div>
  );
}

function ModernMonoThumb() {
  return (
    <div className="flex aspect-[3/4] gap-2 rounded-lg bg-soft-white p-2">
      <div className="w-1/3 rounded-sm bg-mint/25 p-1.5">
        <div className="h-3 w-3 rounded-full bg-mint" />
        <div className="mt-2 space-y-1">
          <div className="h-1 w-3/4 rounded-sm bg-navy-700/35" />
          <div className="h-1 w-2/3 rounded-sm bg-navy-700/35" />
          <div className="h-1 w-1/2 rounded-sm bg-navy-700/35" />
        </div>
      </div>
      <div className="flex-1 space-y-1.5 p-1">
        <div className="h-2 w-3/4 rounded-sm bg-navy-700/35" />
        <div className="h-1 w-full rounded-sm bg-navy-700/15" />
        <div className="h-1 w-full rounded-sm bg-navy-700/15" />
        <div className="h-1 w-2/3 rounded-sm bg-navy-700/15" />
        <div className="mt-3 h-2 w-1/2 rounded-sm bg-navy-700/35" />
        <div className="h-1 w-full rounded-sm bg-navy-700/15" />
        <div className="h-1 w-full rounded-sm bg-navy-700/15" />
        <div className="h-1 w-3/4 rounded-sm bg-navy-700/15" />
      </div>
    </div>
  );
}

function EditorialBoldThumb() {
  return (
    <div className="flex aspect-[3/4] flex-col overflow-hidden rounded-lg bg-soft-white">
      <div className="bg-gold/85 p-3">
        <div className="h-2 w-1/2 rounded-sm bg-navy-900" />
        <div className="mt-1.5 h-1 w-3/4 rounded-sm bg-navy-900/40" />
      </div>
      <div className="flex-1 space-y-1.5 p-3">
        <div className="h-1 w-full rounded-sm bg-navy-700/20" />
        <div className="h-1 w-full rounded-sm bg-navy-700/20" />
        <div className="h-1 w-2/3 rounded-sm bg-navy-700/20" />
        <div className="h-1 w-full rounded-sm bg-navy-700/20" />
        <div className="h-1 w-3/4 rounded-sm bg-navy-700/20" />
        <div className="h-1 w-full rounded-sm bg-navy-700/20" />
      </div>
    </div>
  );
}

function HowItWorksSection() {
  return (
    <Section className="bg-soft-white py-30">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="mint">How it works</Badge>
          <h2 className="mt-4 text-balance text-4xl text-navy-900">
            From blank page to interview-ready in 10 minutes.
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.n}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-mint font-display text-xl font-medium text-navy-900">
                {step.n}
              </div>
              <h3 className="mt-5 text-2xl text-navy-900">{step.title}</h3>
              <p className="mt-3 text-navy-700">{step.body}</p>
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
    <Section className="bg-navy-900 py-30">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-5xl font-medium leading-tight text-soft-white md:text-6xl">
            Your next chapter starts with a better CV.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            Free to start. Three CVs included. Upgrade once for $10 and unlock everything — for life.
          </p>
          <div className="mt-10 flex justify-center">
            <Link href={href} className={`${BRAND_BUTTON_CLASSES} gap-2 !text-navy-900`}>
              {label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-5 text-sm text-muted">
            No credit card. No subscription. No tricks.
          </p>
        </div>
      </Container>
    </Section>
  );
}
