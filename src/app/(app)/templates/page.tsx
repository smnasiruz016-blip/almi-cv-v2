import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Lock, Sparkles } from "lucide-react";
import { requireUser } from "@/lib/auth";
import {
  AtelierProThumb,
  AtelierThumb,
  ClassicSerifThumb,
  DirectorThumb,
  EditorialBoldThumb,
  ModernMonoThumb,
} from "@/components/templates/TemplateThumbnails";
import { TEMPLATE_LIST, type TemplateSlug } from "@/lib/templates";

const THUMBS: Record<TemplateSlug, ReactNode> = {
  "classic-serif": <ClassicSerifThumb />,
  "modern-mono": <ModernMonoThumb />,
  "editorial-bold": <EditorialBoldThumb />,
  atelier: <AtelierThumb />,
  director: <DirectorThumb />,
  "atelier-pro": <AtelierProThumb />,
};

export default async function TemplatesPage() {
  await requireUser();

  return (
    <div className="space-y-8">
      <section>
        <span className="inline-flex items-center gap-2 rounded-full bg-coral/15 px-3 py-1 text-xs font-medium text-coral-deep">
          <Sparkles className="h-3.5 w-3.5" />
          {TEMPLATE_LIST.length} templates available
        </span>
        <h1 className="mt-4 text-4xl text-plum md:text-5xl">Templates</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-plum-soft">
          Pick a layout, customize the theme, and ship a polished CV in minutes. Free templates are always free; premium
          unlocks the senior-creative tier.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {TEMPLATE_LIST.map((template) => (
          <article
            key={template.slug}
            className="group relative overflow-hidden rounded-2xl border border-peach/40 bg-white p-6 shadow-warm-card transition hover:shadow-warm-card-hover"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-coral/10 blur-3xl transition group-hover:bg-coral/20" />

            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-plum/5 bg-white shadow-inner">
                {THUMBS[template.slug]}
              </div>

              <div className="mt-5 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold text-plum">{template.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-plum-soft">{template.tagline}</p>
                  <p className="mt-2 text-xs leading-5 text-plum-soft">{template.description}</p>
                </div>
                {template.tier === "free" ? (
                  <span className="shrink-0 rounded-pill bg-sage/30 px-3 py-1 text-xs font-medium text-[#1F4A2E]">
                    Free
                  </span>
                ) : (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-pill bg-gold/20 px-3 py-1 text-xs font-medium text-[#8A5F1F]">
                    <Lock className="h-2.5 w-2.5" />
                    Premium
                  </span>
                )}
              </div>

              <Link
                href={`/templates/${template.slug}`}
                className="mt-5 inline-flex w-full min-h-[44px] items-center justify-center gap-2 rounded-pill bg-coral px-5 py-3 text-sm font-medium text-white shadow-warm-card transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
              >
                Preview template
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
