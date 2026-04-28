import { ArrowRight, Lock, Sparkles } from "lucide-react";
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
        <span className="inline-flex items-center gap-2 rounded-full bg-coral/15 px-3 py-1 text-xs font-medium text-coral-deep">
          <Sparkles className="h-3.5 w-3.5" />
          Brand Essence — first template
        </span>
        <h1 className="mt-4 text-4xl text-plum md:text-5xl">Templates</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-plum-soft">
          Tonight: one polished placeholder showcasing the brand system. Sidebar layouts, photo heroes, decorative
          frames, and multi-color variants land in upcoming sessions.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {TEMPLATES.map((template) => (
          <article
            key={template.key}
            className="group relative overflow-hidden rounded-2xl border border-peach/40 bg-white p-6 shadow-warm-card transition hover:shadow-warm-card-hover"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-coral/10 blur-3xl transition group-hover:bg-coral/20" />

            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br from-cream-soft to-peach/40 p-5">
                <div className="flex h-full flex-col gap-3 rounded-xl bg-white p-4 text-plum shadow-warm-card">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-mint" />
                    <div className="flex-1 min-w-0">
                      <div className="font-display truncate text-base font-bold">Your Name</div>
                      <div className="truncate text-[10px] text-plum-soft">Senior Product Designer</div>
                    </div>
                  </div>
                  <div className="h-px bg-plum/10" />
                  <div className="space-y-1.5">
                    <div className="text-[9px] font-bold uppercase tracking-widest text-coral">Experience</div>
                    <div className="h-1.5 rounded-full bg-plum/15" />
                    <div className="h-1.5 w-4/5 rounded-full bg-plum/10" />
                    <div className="h-1.5 w-3/4 rounded-full bg-plum/10" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-[9px] font-bold uppercase tracking-widest text-coral">Education</div>
                    <div className="h-1.5 rounded-full bg-plum/15" />
                    <div className="h-1.5 w-2/3 rounded-full bg-plum/10" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-[9px] font-bold uppercase tracking-widest text-coral">Skills</div>
                    <div className="flex flex-wrap gap-1">
                      <span className="rounded-full bg-mint/20 px-2 py-0.5 text-[8px] font-medium text-[#0F4A42]">
                        Design
                      </span>
                      <span className="rounded-full bg-mint/20 px-2 py-0.5 text-[8px] font-medium text-[#0F4A42]">
                        Research
                      </span>
                      <span className="rounded-full bg-mint/20 px-2 py-0.5 text-[8px] font-medium text-[#0F4A42]">
                        Strategy
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold text-plum">{template.name}</p>
                  <p className="mt-1 text-xs leading-5 text-plum-soft">{template.description}</p>
                </div>
                {template.tier === "FREE" ? (
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

              <button
                disabled
                className="mt-5 inline-flex w-full min-h-[44px] cursor-not-allowed items-center justify-center gap-2 rounded-pill bg-coral px-5 py-3 text-sm font-medium text-white opacity-70 shadow-warm-card transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
              >
                Editor coming soon
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-peach/40 bg-white p-8 text-center shadow-warm-card">
        <h3 className="text-xl text-plum">More templates landing soon</h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-plum-soft">
          Sidebar layouts. Photo heroes. Decorative frames. Monogram tiles. Multi-color variants. The full
          Canva-quality family — all driven by this brand system.
        </p>
      </section>
    </div>
  );
}
