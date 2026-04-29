import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { ClassicSerif } from "@/components/templates/ClassicSerif";
import {
  AtelierProThumb,
  AtelierThumb,
  DirectorThumb,
  EditorialBoldThumb,
  ModernMonoThumb,
  TemplateCard,
} from "@/components/templates/TemplateThumbnails";
import { mayaRodriguez } from "@/lib/sample-cv-data";

const INCLUDES = [
  "All sections: experience, education, skills, projects, languages, awards",
  "Quantified bullet points support",
  "Professional plum + cream color scheme",
  "ATS-friendly structure",
  "PDF export",
  "Free forever — no subscription",
];

const OTHER_TEMPLATES = [
  { name: "Modern Mono", tier: "FREE" as const, href: "#", thumb: <ModernMonoThumb /> },
  { name: "Editorial Bold", tier: "FREE" as const, href: "#", thumb: <EditorialBoldThumb /> },
  { name: "Atelier", tier: "PREMIUM" as const, href: "#", thumb: <AtelierThumb /> },
  { name: "Director", tier: "PREMIUM" as const, href: "#", thumb: <DirectorThumb /> },
  { name: "Atelier Pro", tier: "PREMIUM" as const, href: "#", thumb: <AtelierProThumb /> },
];

export default function ClassicSerifPreviewPage() {
  return (
    <div className="min-h-screen bg-cream-soft">
      <div className="mx-auto max-w-7xl px-6 py-4 lg:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-plum-soft transition hover:text-coral"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>
            <span className="text-plum-faint">Templates</span>
            <span className="mx-2 text-plum-faint">/</span>
            <span className="font-medium text-plum">Classic Serif</span>
          </span>
        </Link>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 lg:grid-cols-[1.4fr_1fr] lg:px-12">
        <div>
          <p className="mb-3 text-xs uppercase tracking-widest text-plum-soft">Preview</p>
          <div className="mx-auto aspect-[210/297] w-full max-w-[600px] overflow-hidden rounded-lg shadow-warm-card-hover">
            <ClassicSerif data={mayaRodriguez} />
          </div>
          <p className="mt-4 text-center text-xs text-plum-faint">
            A4 Portrait · 21 × 29.7 cm
          </p>
        </div>

        <aside className="self-start lg:sticky lg:top-8">
          <div className="space-y-6">
            <span className="inline-flex rounded-pill bg-sage/30 px-3 py-1 text-xs font-medium uppercase text-[#1F4A2E]">
              Free
            </span>
            <h1 className="font-display text-4xl text-plum">Classic Serif</h1>
            <p className="text-base leading-relaxed text-plum-soft">
              A timeless, formal CV layout with a single-column structure. Designed for executives,
              consultants, and traditional industries.
            </p>
            <div className="border-t border-plum/10" />
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-plum-soft">
                Includes
              </p>
              <ul className="space-y-2">
                {INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-plum">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-plum/10" />
            <Link
              href="/cv/new?template=classic-serif"
              className="flex w-full items-center justify-center gap-2 rounded-pill bg-coral py-4 text-base font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
            >
              Customize this template
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="text-center text-xs text-plum-faint">
              Free · Saved to your account · Download as PDF
            </p>
          </div>
        </aside>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mt-16 border-t border-plum/10 pt-12 pb-16">
          <h2 className="mb-6 font-display text-2xl text-plum">More templates</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
            {OTHER_TEMPLATES.map((tpl) => (
              <Link key={tpl.name} href={tpl.href} className="block">
                <TemplateCard name={tpl.name} tier={tpl.tier}>
                  {tpl.thumb}
                </TemplateCard>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
