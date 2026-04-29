import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import {
  AtelierProThumb,
  AtelierThumb,
  ClassicSerifThumb,
  DirectorThumb,
  EditorialBoldThumb,
  ModernMonoThumb,
  TemplateCard,
} from "@/components/templates/TemplateThumbnails";
import { mayaRodriguez } from "@/lib/sample-cv-data";
import {
  TEMPLATE_LIST,
  getTemplate,
  isKnownTemplate,
  type TemplateSlug,
} from "@/lib/templates";

const INCLUDES = [
  "All sections: experience, education, skills, projects, languages, awards",
  "Quantified bullet points support",
  "Professional plum + cream color scheme",
  "ATS-friendly structure",
  "PDF export",
  "Free forever — no subscription",
];

const THUMBS: Record<TemplateSlug, React.ReactNode> = {
  "classic-serif": <ClassicSerifThumb />,
  "modern-mono": <ModernMonoThumb />,
  "editorial-bold": <EditorialBoldThumb />,
  atelier: <AtelierThumb />,
  director: <DirectorThumb />,
  "atelier-pro": <AtelierProThumb />,
};

export function generateStaticParams() {
  return TEMPLATE_LIST.map((t) => ({ slug: t.slug }));
}

export default async function TemplatePreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isKnownTemplate(slug)) notFound();

  const template = getTemplate(slug);
  const TemplateComponent = template.Component;
  const sampleData = template.sampleData ?? mayaRodriguez;
  const otherTemplates = TEMPLATE_LIST.filter((t) => t.slug !== template.slug);

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
            <span className="font-medium text-plum">{template.name}</span>
          </span>
        </Link>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 lg:grid-cols-[1.4fr_1fr] lg:px-12">
        <div>
          <p className="mb-3 text-xs uppercase tracking-widest text-plum-soft">Preview</p>
          <div className="mx-auto aspect-[210/297] w-full max-w-[600px] overflow-hidden rounded-lg shadow-warm-card-hover">
            <TemplateComponent data={sampleData} />
          </div>
          <p className="mt-4 text-center text-xs text-plum-faint">
            A4 Portrait · 21 × 29.7 cm
          </p>
        </div>

        <aside className="self-start lg:sticky lg:top-8">
          <div className="space-y-6">
            {template.tier === "premium" ? (
              <span className="inline-flex rounded-pill bg-gold/20 px-3 py-1 text-xs font-medium uppercase text-[#8A5F1F]">
                Premium
              </span>
            ) : (
              <span className="inline-flex rounded-pill bg-sage/30 px-3 py-1 text-xs font-medium uppercase text-[#1F4A2E]">
                Free
              </span>
            )}
            <h1 className="font-display text-4xl text-plum">{template.name}</h1>
            <p className="text-xs uppercase tracking-widest text-plum-soft">{template.tagline}</p>
            <p className="text-base leading-relaxed text-plum-soft">{template.description}</p>
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
              href={`/cv/new?template=${template.slug}`}
              className="flex w-full items-center justify-center gap-2 rounded-pill bg-coral py-4 text-base font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
            >
              Customize this template
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="text-center text-xs text-plum-faint">
              {template.tier === "premium"
                ? "Premium · Saved to your account · Download as PDF"
                : "Free · Saved to your account · Download as PDF"}
            </p>
          </div>
        </aside>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mt-16 border-t border-plum/10 pt-12 pb-16">
          <h2 className="mb-6 font-display text-2xl text-plum">More templates</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
            {otherTemplates.map((tpl) => (
              <Link key={tpl.slug} href={`/templates/${tpl.slug}`} className="block">
                <TemplateCard
                  name={tpl.name}
                  tier={tpl.tier === "premium" ? "PREMIUM" : "FREE"}
                >
                  {THUMBS[tpl.slug]}
                </TemplateCard>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
