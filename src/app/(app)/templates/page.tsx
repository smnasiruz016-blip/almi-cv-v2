import { ArrowRight, Lock, Sparkles } from "lucide-react";
import { BRAND_BUTTON_CLASSES } from "@/components/ui/button";
import { requireUser } from "@/lib/auth";

const TEMPLATES = [
  {
    key: "brand-essence",
    name: "Brand Essence",
    tier: "FREE" as const,
    description: "Calm, modern, ATS-friendly. The perfect baseline.",
  },
];

export default async function TemplatesPage() {
  await requireUser();

  return (
    <div className="space-y-8">
      <section>
        <span className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/5 px-3 py-1 text-xs font-medium text-mint">
          <Sparkles className="h-3.5 w-3.5" />
          Brand Essence — first template
        </span>
        <h1 className="font-display mt-4 text-4xl font-bold tracking-tight text-soft-white md:text-5xl">
          Templates
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          Tonight: one polished placeholder showcasing the brand system. Sidebar layouts, photo heroes, decorative
          frames, and multi-color variants land in upcoming sessions.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {TEMPLATES.map((template) => (
          <article
            key={template.key}
            className="group relative overflow-hidden rounded-3xl border border-muted/20 bg-navy-800/50 p-6 backdrop-blur transition hover:border-mint/40"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-mint/10 blur-3xl transition group-hover:bg-mint/20" />

            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br from-soft-white to-muted/30 p-5">
                <div className="flex h-full flex-col gap-3 rounded-xl bg-soft-white p-4 text-navy-900 shadow-2xl">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-mint" />
                    <div className="flex-1 min-w-0">
                      <div className="font-display truncate text-base font-bold">Your Name</div>
                      <div className="truncate text-[10px] text-navy-800/70">Senior Product Designer</div>
                    </div>
                  </div>
                  <div className="h-px bg-navy-900/10" />
                  <div className="space-y-1.5">
                    <div className="text-[9px] font-bold uppercase tracking-widest text-mint">Experience</div>
                    <div className="h-1.5 rounded-full bg-navy-900/15" />
                    <div className="h-1.5 w-4/5 rounded-full bg-navy-900/10" />
                    <div className="h-1.5 w-3/4 rounded-full bg-navy-900/10" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-[9px] font-bold uppercase tracking-widest text-mint">Education</div>
                    <div className="h-1.5 rounded-full bg-navy-900/15" />
                    <div className="h-1.5 w-2/3 rounded-full bg-navy-900/10" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-[9px] font-bold uppercase tracking-widest text-mint">Skills</div>
                    <div className="flex flex-wrap gap-1">
                      <span className="rounded-full bg-mint/20 px-2 py-0.5 text-[8px] font-medium">Design</span>
                      <span className="rounded-full bg-mint/20 px-2 py-0.5 text-[8px] font-medium">Research</span>
                      <span className="rounded-full bg-mint/20 px-2 py-0.5 text-[8px] font-medium">Strategy</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold text-soft-white">{template.name}</p>
                  <p className="mt-1 text-xs leading-5 text-muted">{template.description}</p>
                </div>
                {template.tier === "FREE" ? (
                  <span className="shrink-0 rounded-full bg-mint/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-mint">
                    Free
                  </span>
                ) : (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-soft-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-soft-white">
                    <Lock className="h-2.5 w-2.5" />
                    Premium
                  </span>
                )}
              </div>

              <button
                disabled
                className={`${BRAND_BUTTON_CLASSES} mt-5 w-full gap-2 cursor-not-allowed opacity-70`}
              >
                Editor coming soon
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-muted/20 bg-navy-800/30 p-8 text-center backdrop-blur">
        <h3 className="font-display text-xl font-semibold text-soft-white">More templates landing soon</h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted">
          Sidebar layouts. Photo heroes. Decorative frames. Monogram tiles. Multi-color variants. The full
          Canva-quality family — all driven by this brand system.
        </p>
      </section>
    </div>
  );
}
