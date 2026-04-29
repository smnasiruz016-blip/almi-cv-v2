import Image from "next/image";
import { Crown } from "lucide-react";

export function TemplateCard({
  name,
  tier,
  children,
}: {
  name: string;
  tier: "FREE" | "PREMIUM";
  children: React.ReactNode;
}) {
  return (
    <div className="relative rounded-2xl border border-peach/40 bg-white p-2 shadow-warm-card transition-all hover:shadow-warm-card-hover">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-plum/5 bg-white shadow-inner">
        {children}
      </div>
      <div className="mt-2">
        <h3 className="font-display text-sm text-plum">{name}</h3>
        <p className={tier === "FREE" ? "text-[10px] text-sage" : "text-[10px] text-coral"}>
          {tier === "FREE" ? "Free" : "Premium"}
        </p>
      </div>
      {tier === "PREMIUM" && (
        <Crown className="absolute bottom-2 right-2 h-3.5 w-3.5 text-gold" />
      )}
    </div>
  );
}

export function ClassicSerifThumb() {
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
        <div className="border-t border-plum/10 pt-1.5">
          <p className="font-display text-[7px] tracking-widest text-plum">PROJECTS</p>
          <p className="mt-1 truncate text-[6px] font-medium leading-tight text-plum">Acme Mobile Redesign · 2023</p>
          <p className="text-[5px] leading-tight text-plum-soft">• 0→1 native app, 1.2M downloads in 6 mo</p>
          <p className="mt-0.5 truncate text-[6px] font-medium leading-tight text-plum">Globex API v2 · 2020</p>
          <p className="text-[5px] leading-tight text-plum-soft">• Cross-team launch across 4 markets</p>
        </div>
        <div className="border-t border-plum/10 pt-1.5">
          <p className="font-display text-[7px] tracking-widest text-plum">LANGUAGES</p>
          <p className="mt-1 truncate text-[5px] leading-tight text-plum-soft">English (native) · Spanish · Portuguese</p>
        </div>
      </div>
    </div>
  );
}

export function ModernMonoThumb() {
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
        <div className="text-left">
          <p className="text-[6px] font-medium tracking-widest text-plum">LANGUAGES</p>
          <p className="text-[5px] leading-tight text-plum-soft">English · Mandarin · Japanese</p>
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
        <div>
          <p className="font-display text-[7px] tracking-widest text-plum">PROJECTS</p>
          <p className="mt-1 truncate text-[6px] font-medium leading-tight text-plum">Vercel Edge Config dashboard</p>
          <p className="text-[5px] leading-tight text-plum-soft">• Internal tool used by 2k+ teams</p>
          <p className="mt-0.5 truncate text-[6px] font-medium leading-tight text-plum">react-aria-tabs (OSS)</p>
          <p className="text-[5px] leading-tight text-plum-soft">• 2.4k stars · accessibility-first</p>
        </div>
        <div>
          <p className="font-display text-[7px] tracking-widest text-plum">TALKS</p>
          <p className="mt-1 truncate text-[5px] leading-tight text-plum-soft">React Conf 2023 — Edge rendering</p>
          <p className="truncate text-[5px] leading-tight text-plum-soft">JSConf EU 2022 — Bundle budgets</p>
        </div>
      </div>
    </div>
  );
}

export function EditorialBoldThumb() {
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
        <div className="border-t border-plum/10 pt-1.5">
          <p className="font-display text-[7px] tracking-widest text-plum">SELECTED CAMPAIGNS</p>
          <p className="mt-1 truncate text-[5px] leading-tight text-plum-soft">
            Nike ROAR · 600M impressions · 12 markets
          </p>
          <p className="truncate text-[5px] leading-tight text-plum-soft">
            Adobe Create Your World · 47 countries · 2020
          </p>
          <p className="truncate text-[5px] leading-tight text-plum-soft">
            P&amp;G Insider · subscriber base 2M → 8M
          </p>
        </div>
        <div className="border-t border-plum/10 pt-1.5">
          <p className="font-display text-[7px] tracking-widest text-plum">BOARDS &amp; ADVISORY</p>
          <p className="mt-1 truncate text-[5px] leading-tight text-plum-soft">WPP NextGen Council · 2023–Now</p>
          <p className="truncate text-[5px] leading-tight text-plum-soft">Cannes Young Lions Jury · 2023</p>
        </div>
      </div>
    </div>
  );
}

export function AtelierThumb() {
  return (
    <div className="h-full bg-gradient-to-br from-cream-soft via-peach/30 to-cream-soft p-3">
      <div className="mb-3 flex items-center gap-2">
        <Image
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces"
          alt="Ayesha Khan"
          width={50}
          height={50}
          className="h-[50px] w-[50px] shrink-0 rounded-full border-2 border-white object-cover shadow-sm"
        />
        <div className="min-w-0">
          <p className="truncate font-display text-[14px] text-plum">AYESHA KHAN</p>
          <p className="truncate text-[7px] font-medium italic text-coral">UX Designer in Stockholm</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="rounded-md bg-white/80 p-2 shadow-sm">
          <p className="mb-1 font-display text-[6px] font-medium tracking-widest text-coral">PROFIL</p>
          <p className="text-[5px] italic leading-snug text-plum-soft">
            Designer focused on inclusive interfaces. 6+ years across e-commerce, fintech, edtech in EU and APAC.
          </p>
        </div>
        <div className="rounded-md bg-white/80 p-2 shadow-sm">
          <p className="mb-1 font-display text-[6px] font-medium tracking-widest text-coral">EXPÉRIENCE</p>
          <p className="truncate text-[6px] font-medium leading-tight text-plum">Daraz · Lead UX · 2022–Now</p>
          <p className="text-[5px] leading-tight text-plum-soft">• Checkout redesign cut abandonment 22%</p>
          <p className="mt-0.5 truncate text-[6px] font-medium leading-tight text-plum">Easypaisa · Sr. UX · 2019–2022</p>
          <p className="text-[5px] leading-tight text-plum-soft">• Built design system for 4 product teams</p>
        </div>
        <div className="rounded-md bg-white/80 p-2 shadow-sm">
          <p className="mb-1 font-display text-[6px] font-medium tracking-widest text-coral">COMPÉTENCES</p>
          <p className="text-[5px] leading-tight text-plum-soft">
            Figma · Prototyping · User Research · Design Systems · A/B Testing
          </p>
        </div>
      </div>
      <p className="mt-2 mb-2 text-center text-[6px] tracking-widest text-coral">
        <span className="font-medium">LANGUES</span> · EN · FR · UR
      </p>
      <div className="space-y-2">
        <div className="rounded-md bg-white/80 p-2 shadow-sm">
          <p className="mb-1 font-display text-[6px] font-medium tracking-widest text-coral">RECONNAISSANCE</p>
          <p className="text-[5px] leading-tight text-plum-soft">• Awwwards Honorable · 2023</p>
          <p className="text-[5px] leading-tight text-plum-soft">• Adobe Design Achievement · 2021</p>
        </div>
        <div className="rounded-md bg-white/80 p-2 shadow-sm">
          <p className="mb-1 font-display text-[6px] font-medium tracking-widest text-coral">ÉDUCATION</p>
          <p className="text-[5px] leading-tight text-plum-soft">NUST · BS Communication Design · 2019</p>
          <p className="text-[5px] leading-tight text-plum-soft">Hyper Island · Service Design · 2021</p>
        </div>
      </div>
    </div>
  );
}

export function DirectorThumb() {
  return (
    <div className="flex h-full">
      <div className="flex w-[40%] flex-col justify-between bg-sage/50 p-2">
        <div>
          <p className="font-display text-[16px] leading-none text-plum">MARCUS</p>
          <p className="font-display text-[16px] leading-none text-plum">WEBB</p>
          <p className="mt-2 text-[6px] tracking-widest text-plum-soft">ART DIRECTOR</p>
        </div>
        <div className="space-y-1.5">
          <Image
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces"
            alt="Marcus Webb"
            width={40}
            height={40}
            className="h-10 w-10 rounded-sm object-cover"
          />
          <div className="flex flex-col gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-plum/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-plum/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-plum/40" />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-2 bg-cream-soft p-2">
        <div>
          <p className="font-display text-[7px] tracking-widest text-plum">À PROPOS</p>
          <p className="mt-0.5 text-[5px] italic leading-tight text-plum-soft">
            Creative director with 12 years building visual identities for global brands and emerging artists.
          </p>
        </div>
        <div>
          <p className="font-display text-[7px] tracking-widest text-plum">EXPÉRIENCE</p>
          <p className="mt-1 truncate text-[6px] font-medium leading-tight text-plum">Apple — WWDC 2024</p>
          <p className="text-[5px] leading-tight text-plum-soft">Branding · Motion · Print</p>
          <p className="mt-0.5 truncate text-[6px] font-medium leading-tight text-plum">Spotify — Wrapped 2023</p>
          <p className="text-[5px] leading-tight text-plum-soft">Identity · Type design</p>
          <p className="mt-0.5 truncate text-[6px] font-medium leading-tight text-plum">Nike Air — 50th Anniversary</p>
        </div>
        <div>
          <p className="font-display text-[7px] tracking-widest text-plum">ÉDUCATION</p>
          <p className="mt-1 truncate text-[5px] leading-tight text-plum-soft">RISD · BFA Graphic Design · 2014</p>
        </div>
        <div>
          <p className="font-display text-[7px] tracking-widest text-plum">DISTINCTIONS</p>
          <p className="mt-1 text-[5px] leading-tight text-plum-soft">• ADC Gold Cube · 2023</p>
          <p className="text-[5px] leading-tight text-plum-soft">• D&amp;AD Wood Pencil · 2022</p>
        </div>
        <div>
          <p className="font-display text-[7px] tracking-widest text-plum">PROJETS</p>
          <p className="mt-1 text-[6px] leading-tight text-plum">• Vogue Italia — Editorial 2024</p>
          <p className="text-[6px] leading-tight text-plum">• MoMA — Identity Refresh 2023</p>
          <p className="text-[6px] leading-tight text-plum">• Acne Studios — SS24 Campaign</p>
        </div>
        <div>
          <p className="font-display text-[7px] tracking-widest text-plum">PRESSE &amp; MENTIONS</p>
          <p className="mt-1 text-[5px] leading-tight text-plum-soft">• It&apos;s Nice That · Featured · 2024</p>
          <p className="text-[5px] leading-tight text-plum-soft">• Eye on Design · Interview · 2023</p>
        </div>
      </div>
    </div>
  );
}

export function AtelierProThumb() {
  return (
    <div className="flex h-full">
      <div className="w-[65%] space-y-2 bg-cream-soft p-2">
        <div className="flex items-center gap-2">
          <Image
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces"
            alt="Julia Cortázar"
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-full border-2 border-white object-cover shadow-sm"
          />
          <div className="min-w-0">
            <p className="truncate font-display text-[10px] text-plum">JULIA CORTÁZAR</p>
            <p className="truncate text-[6px] tracking-widest text-coral">ARTISTA MULTIMEDIA</p>
          </div>
        </div>
        <div className="space-y-[1px]">
          <p className="text-[5px] leading-tight text-plum-soft">+34 686 094 563</p>
          <p className="text-[5px] leading-tight text-plum-soft">julia@email.com</p>
          <p className="text-[5px] leading-tight text-plum-soft">Cartagena, Murcia</p>
        </div>
        <div>
          <p className="font-display text-[7px] tracking-widest text-plum">EXPERIENCIA</p>
          <p className="mt-1 truncate text-[6px] leading-tight text-plum">SEKIGUCHI · Director Artístico · 2013–2016</p>
          <p className="truncate text-[6px] leading-tight text-plum">ASA Empresa de Diseño · 2011–2013</p>
          <p className="truncate text-[6px] leading-tight text-plum">Medios Cajón · Ilustrador · 2010–2011</p>
        </div>
        <div>
          <p className="font-display text-[7px] tracking-widest text-plum">FORMACIÓN</p>
          <p className="mt-1 truncate text-[5px] leading-tight text-plum-soft">Universidad de Valencia · 2006–2010</p>
          <p className="truncate text-[5px] leading-tight text-plum-soft">Grado en Artes Multimedia</p>
        </div>
      </div>
      <div className="flex w-[35%] flex-col gap-2 bg-gold/30 p-2">
        <div>
          <p className="font-display text-[7px] tracking-widest text-plum">LOGROS</p>
          <p className="mt-1 text-[5px] leading-tight text-plum">• Mejor Estudiante 2016</p>
          <p className="text-[5px] leading-tight text-plum">• Graduada con Honores</p>
          <p className="text-[5px] leading-tight text-plum">• Lista Mejores Alumnos</p>
        </div>
        <div>
          <p className="font-display text-[7px] tracking-widest text-plum">SOFTWARE</p>
          <p className="mt-1 text-[5px] leading-tight text-plum">Adobe Suite</p>
          <p className="text-[5px] leading-tight text-plum">Pro-Tools</p>
          <p className="text-[5px] leading-tight text-plum">3DSMAX</p>
        </div>
        <div>
          <p className="font-display text-[7px] tracking-widest text-plum">COMPETENCIAS</p>
          <p className="mt-1 text-[5px] leading-tight text-plum">Diseño Gráfico</p>
          <p className="text-[5px] leading-tight text-plum">Ilustración</p>
          <p className="text-[5px] leading-tight text-plum">Animación · Video</p>
        </div>
      </div>
    </div>
  );
}
