import Link from "next/link";
import type { ReactNode } from "react";
import { Crown } from "lucide-react";
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
        <h1 className="text-4xl text-plum md:text-5xl">Templates</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-plum-soft">
          Six designs ready to use. Pick yours and start editing.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {TEMPLATE_LIST.map((template) => (
          <Link
            key={template.slug}
            href={`/templates/${template.slug}`}
            className="group relative block cursor-pointer overflow-hidden rounded-2xl border border-peach/40 bg-white p-6 shadow-warm-card transition duration-200 hover:-translate-y-0.5 hover:shadow-warm-card-hover focus:outline-none focus-visible:ring-4 focus-visible:ring-coral/30"
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
                    <Crown className="h-2.5 w-2.5" />
                    Premium
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
