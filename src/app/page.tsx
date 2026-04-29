import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Lock, Sparkles } from "lucide-react";
import { Footer } from "@/components/footer";
import { HeroPreview } from "@/components/hero-preview";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
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

        <p className="mt-12 mb-4 text-center text-xs font-medium uppercase tracking-widest text-coral">
          Free templates
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <TemplateCard name="Classic Serif" subtitle="Free · Customize colors" tier="FREE">
            <ClassicSerifThumb />
          </TemplateCard>
          <TemplateCard name="Modern Mono" subtitle="Free · Customize colors" tier="FREE">
            <ModernMonoThumb />
          </TemplateCard>
          <TemplateCard name="Editorial Bold" subtitle="Free · Customize colors" tier="FREE">
            <EditorialBoldThumb />
          </TemplateCard>
        </div>

        <div className="mt-14 mb-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-plum/10" />
          <span className="inline-flex items-center gap-2 text-sm text-plum-soft">
            <Lock className="h-3.5 w-3.5" />
            Premium templates · Unlock all with $10 once
          </span>
          <div className="h-px flex-1 bg-plum/10" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <TemplateCard name="Soft Bloom" subtitle="Premium · Photo & accents" tier="PREMIUM">
            <SoftBloomThumb />
          </TemplateCard>
          <TemplateCard name="Studio Portfolio" subtitle="Premium · Creative pro" tier="PREMIUM">
            <StudioPortfolioThumb />
          </TemplateCard>
          <TemplateCard name="Heritage Resume" subtitle="Premium · Academic & senior" tier="PREMIUM">
            <HeritageResumeThumb />
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

function TemplateCard({
  name,
  subtitle,
  tier,
  children,
}: {
  name: string;
  subtitle: string;
  tier: "FREE" | "PREMIUM";
  children: React.ReactNode;
}) {
  return (
    <div className="group relative rounded-2xl border border-peach/40 bg-white p-3 shadow-warm-card transition-all hover:shadow-warm-card-hover">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-plum/5 bg-white shadow-inner">
        {children}
        {tier === "PREMIUM" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-plum/45 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-0">
            <Lock className="h-5 w-5 text-cream" />
            <span className="text-[10px] font-medium text-cream">Unlock for $10</span>
          </div>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-medium text-plum">{name}</h3>
          <p className="mt-0.5 text-xs text-plum-soft">{subtitle}</p>
        </div>
        <span
          className={
            tier === "FREE"
              ? "shrink-0 rounded-pill bg-sage/30 px-2 py-0.5 text-[10px] font-medium text-[#1F4A2E]"
              : "shrink-0 rounded-pill bg-gold/20 px-2 py-0.5 text-[10px] font-medium text-[#8A5F1F]"
          }
        >
          {tier === "FREE" ? "Free" : "Premium"}
        </span>
      </div>
    </div>
  );
}

function ClassicSerifThumb() {
  return (
    <div className="h-full">
      <div className="flex h-16 items-center gap-2 bg-plum px-3">
        <Image
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=faces"
          alt="Maya Rodriguez"
          width={40}
          height={40}
          className="h-10 w-10 rounded-full border-2 border-cream object-cover"
        />
        <div className="min-w-0">
          <p className="truncate font-display text-[10px] tracking-wide text-cream">MAYA RODRIGUEZ</p>
          <p className="truncate text-[7px] text-cream/70">Senior Product Designer</p>
        </div>
      </div>
      <div className="space-y-2 p-2">
        <div>
          <p className="font-display text-[7px] tracking-widest text-plum">EXPERIENCE</p>
          <p className="mt-1 truncate text-[6px] font-medium leading-tight text-plum">
            Acme Inc. — Senior PM <span className="text-[5px] font-normal text-plum-soft">· 2021–Present</span>
          </p>
          <p className="text-[5px] leading-tight text-plum-soft">• Led team of 8 designers across 3 product lines</p>
          <p className="text-[5px] leading-tight text-plum-soft">• Shipped redesign that grew DAU by 40%</p>
          <p className="mt-1 truncate text-[6px] font-medium leading-tight text-plum">
            Globex Corp — Product Manager <span className="text-[5px] font-normal text-plum-soft">· 2018–2021</span>
          </p>
          <p className="text-[5px] leading-tight text-plum-soft">• Owned roadmap for B2B fintech vertical</p>
        </div>
        <div className="border-t border-plum/10 pt-1.5">
          <p className="font-display text-[7px] tracking-widest text-plum">EDUCATION</p>
          <p className="mt-1 truncate text-[6px] leading-tight text-plum">MIT · BSc Computer Science · 2018</p>
        </div>
        <div className="border-t border-plum/10 pt-1.5">
          <p className="font-display text-[7px] tracking-widest text-plum">SKILLS</p>
          <p className="mt-1 truncate text-[5px] leading-tight text-plum-soft">
            Product Strategy · User Research · Figma · A/B Testing
          </p>
        </div>
      </div>
    </div>
  );
}

function ModernMonoThumb() {
  return (
    <div className="flex h-full">
      <div className="w-[35%] space-y-2 bg-mint/30 p-2 text-center">
        <Image
          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=faces"
          alt="Alex Chen"
          width={36}
          height={36}
          className="mx-auto h-9 w-9 rounded-full border-2 border-white object-cover"
        />
        <p className="font-display text-[8px] text-plum">ALEX CHEN</p>
        <p className="text-[6px] text-plum-soft">Frontend Engineer</p>
        <div className="border-t border-mint/50 pt-1.5 text-left">
          <p className="text-[6px] font-medium tracking-widest text-plum">CONTACT</p>
          <p className="text-[5px] leading-tight text-plum-soft">alex@dev.io</p>
          <p className="text-[5px] leading-tight text-plum-soft">+1 415 555 0142</p>
          <p className="text-[5px] leading-tight text-plum-soft">github.com/achen</p>
        </div>
        <div className="text-left">
          <p className="text-[6px] font-medium tracking-widest text-plum">SKILLS</p>
          <p className="text-[5px] leading-tight text-plum-soft">React · TypeScript · Node · GraphQL · AWS</p>
        </div>
      </div>
      <div className="flex-1 space-y-2 p-2">
        <div>
          <p className="font-display text-[7px] tracking-widest text-plum">EXPERIENCE</p>
          <p className="mt-1 truncate text-[6px] font-medium leading-tight text-plum">
            Stripe — Senior Engineer <span className="text-[5px] font-normal text-plum-soft">· 2022–Present</span>
          </p>
          <p className="text-[5px] leading-tight text-plum-soft">• Migrated payment flow to micro-frontends</p>
          <p className="text-[5px] leading-tight text-plum-soft">• Reduced bundle size 38% via code splitting</p>
          <p className="mt-1 truncate text-[6px] font-medium leading-tight text-plum">
            Vercel — Engineer <span className="text-[5px] font-normal text-plum-soft">· 2020–2022</span>
          </p>
          <p className="text-[5px] leading-tight text-plum-soft">• Built Edge Functions developer dashboard</p>
        </div>
        <div>
          <p className="font-display text-[7px] tracking-widest text-plum">EDUCATION</p>
          <p className="mt-1 truncate text-[6px] leading-tight text-plum">Stanford · BS Computer Science · 2020</p>
        </div>
      </div>
    </div>
  );
}

function EditorialBoldThumb() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2 bg-gold px-3">
        <Image
          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=faces"
          alt="Priya Patel"
          width={40}
          height={40}
          className="h-10 w-10 rounded-full border-2 border-cream object-cover"
        />
        <div className="min-w-0">
          <p className="truncate font-display text-[10px] text-plum">PRIYA PATEL</p>
          <p className="truncate text-[7px] text-plum/70">Marketing Director</p>
        </div>
      </div>
      <div className="flex-1 space-y-2 p-2">
        <p className="text-[5px] italic leading-snug text-plum-soft">
          Brand strategist with 10+ years scaling consumer brands across APAC and EU. Led campaigns reaching
          200M+ users.
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="font-display text-[7px] tracking-widest text-plum">EXPERIENCE</p>
            <p className="mt-1 truncate text-[6px] font-medium leading-tight text-plum">Nike — Marketing Director</p>
            <p className="text-[5px] leading-tight text-plum-soft">· 2021–Now</p>
            <p className="text-[5px] leading-tight text-plum-soft">• Led ROAR (600M impressions)</p>
            <p className="text-[5px] leading-tight text-plum-soft">• Rebrand for EMEA market</p>
            <p className="mt-1 truncate text-[6px] font-medium leading-tight text-plum">Adobe — Sr. Manager</p>
            <p className="text-[5px] leading-tight text-plum-soft">· 2017–2021</p>
            <p className="text-[5px] leading-tight text-plum-soft">• Launched CC for Education</p>
          </div>
          <div>
            <p className="font-display text-[7px] tracking-widest text-plum">EDUCATION</p>
            <p className="mt-1 truncate text-[6px] leading-tight text-plum">Wharton MBA · 2017</p>
            <p className="mt-2 font-display text-[7px] tracking-widest text-plum">AWARDS</p>
            <p className="mt-1 text-[5px] leading-tight text-plum-soft">• Cannes Lion 2022</p>
            <p className="text-[5px] leading-tight text-plum-soft">• Effie Gold 2021</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SoftBloomThumb() {
  return (
    <div className="h-full bg-gradient-to-br from-peach/40 to-lavender-soft p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-display text-[12px] italic text-plum">AYESHA KHAN</p>
          <p className="truncate text-[6px] text-plum-soft">UX Designer · Karachi</p>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces"
          alt="Ayesha Khan"
          width={48}
          height={48}
          className="h-12 w-12 shrink-0 rounded-full border-2 border-white object-cover shadow-sm"
        />
      </div>
      <div className="my-3 h-px bg-gold/40" />
      <div className="space-y-2">
        <div>
          <p className="font-display text-[6px] tracking-widest text-coral">ABOUT ME</p>
          <p className="mt-0.5 text-[5px] italic leading-tight text-plum-soft">
            Designer passionate about inclusive interfaces. 6 years across e-commerce, fintech, edtech.
          </p>
        </div>
        <div>
          <p className="font-display text-[6px] tracking-widest text-coral">EXPERIENCE</p>
          <p className="mt-0.5 truncate text-[6px] font-medium leading-tight text-plum">Daraz — Lead UX · 2022–Present</p>
          <p className="text-[5px] leading-tight text-plum-soft">• Redesigned checkout (cart abandonment ↓ 22%)</p>
          <p className="mt-0.5 truncate text-[6px] font-medium leading-tight text-plum">Easypaisa — Sr. UX · 2019–2022</p>
        </div>
        <div>
          <p className="font-display text-[6px] tracking-widest text-coral">EDUCATION</p>
          <p className="mt-0.5 truncate text-[5px] leading-tight text-plum-soft">NUST · BS Design</p>
        </div>
      </div>
    </div>
  );
}

function StudioPortfolioThumb() {
  return (
    <div className="flex h-full">
      <div className="flex w-[30%] flex-col items-center gap-2 bg-sage/40 p-2 text-center">
        <Image
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces"
          alt="Marcus Webb"
          width={56}
          height={56}
          className="h-14 w-14 rounded-md object-cover"
        />
        <p className="font-display text-[9px] text-plum">MARCUS WEBB</p>
        <p className="text-[6px] text-plum-soft">Art Director</p>
        <div className="mt-1 flex flex-col items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-plum/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-plum/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-plum/30" />
        </div>
      </div>
      <div className="flex-1 space-y-2 bg-cream-soft p-2">
        <div>
          <p className="font-display text-[7px] tracking-widest text-plum">SELECTED WORK</p>
          <p className="mt-1 truncate text-[6px] font-medium leading-tight text-plum">Apple — WWDC 2024</p>
          <p className="text-[5px] leading-tight text-plum-soft">Branding · Motion · Print</p>
          <p className="mt-1 truncate text-[6px] font-medium leading-tight text-plum">Spotify — Wrapped 2023</p>
          <p className="text-[5px] leading-tight text-plum-soft">Branding · Type design</p>
          <p className="mt-1 truncate text-[6px] font-medium leading-tight text-plum">Nike Air — 50th Capsule</p>
        </div>
        <div>
          <p className="font-display text-[7px] tracking-widest text-plum">EDUCATION</p>
          <p className="mt-1 truncate text-[5px] leading-tight text-plum-soft">RISD · BFA Graphic Design · 2014</p>
        </div>
      </div>
    </div>
  );
}

function HeritageResumeThumb() {
  return (
    <div className="h-full bg-lavender-soft">
      <div className="p-3 text-center">
        <Image
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces"
          alt="Dr. Kamal Hassan"
          width={48}
          height={48}
          className="mx-auto h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm"
        />
        <p className="mt-2 font-display text-[11px] text-plum">DR. KAMAL HASSAN</p>
        <p className="text-[6px] italic text-plum-soft">Professor of Engineering · Stanford</p>
      </div>
      <div className="mx-4 my-2 border-t-2 border-double border-lavender" />
      <div className="space-y-2 p-2 text-center">
        <div>
          <p className="font-display text-[7px] tracking-widest text-plum">RESEARCH</p>
          <p className="text-[5px] italic leading-tight text-plum-soft">
            Computational Fluid Dynamics · Renewable Energy
          </p>
        </div>
        <div>
          <p className="font-display text-[7px] tracking-widest text-plum">PUBLICATIONS</p>
          <p className="text-[5px] leading-tight text-plum-soft">• Hassan, K. et al. (2024). Nature Energy</p>
          <p className="text-[5px] leading-tight text-plum-soft">• 47 peer-reviewed papers, 3,200+ citations</p>
        </div>
        <div>
          <p className="font-display text-[7px] tracking-widest text-plum">EXPERIENCE</p>
          <p className="text-[5px] leading-tight text-plum-soft">Stanford — Professor · 2015–Present</p>
          <p className="text-[5px] leading-tight text-plum-soft">MIT — Postdoc · 2012–2015</p>
        </div>
        <div>
          <p className="font-display text-[7px] tracking-widest text-plum">EDUCATION</p>
          <p className="text-[5px] leading-tight text-plum-soft">PhD Mechanical Eng · Cambridge · 2012</p>
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
