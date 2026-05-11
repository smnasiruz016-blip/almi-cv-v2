"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Crown, X } from "lucide-react";
import { TemplateThumbnail } from "@/components/templates/TemplateThumbnail";
import { TEMPLATE_LIST, type TemplateMeta } from "@/lib/templates";
import type {
  RecipeMood,
  RecipeRole,
} from "@/components/templates/engine/recipe-types";

type TierFacet = "all" | "free" | "premium";
type RoleFacet = RecipeRole | "all";
type MoodFacet = RecipeMood | "all";

type Props = {
  initial: { role: RoleFacet; mood: MoodFacet; tier: TierFacet };
};

const ROLE_LABELS: Record<RoleFacet, string> = {
  all: "All roles",
  healthcare: "Healthcare",
  trades: "Trades",
  "customer-service-bpo": "Customer Service / BPO",
  "hospitality-chef": "Hospitality / Chef",
  tech: "Tech",
  "project-management": "Project Management",
};

const MOOD_LABELS: Record<MoodFacet, string> = {
  all: "All moods",
  bold: "Bold",
  modern: "Modern",
  refined: "Refined",
};

const TIER_LABELS: Record<TierFacet, string> = {
  all: "All tiers",
  free: "Free",
  premium: "Premium",
};

const ROLE_OPTIONS: RoleFacet[] = [
  "all",
  "healthcare",
  "trades",
  "customer-service-bpo",
  "hospitality-chef",
  "tech",
  "project-management",
];
const MOOD_OPTIONS: MoodFacet[] = ["all", "bold", "modern", "refined"];
const TIER_OPTIONS: TierFacet[] = ["all", "free", "premium"];

function chipClass(active: boolean): string {
  return active
    ? "rounded-pill bg-coral px-3 py-1.5 text-xs font-semibold text-white shadow-warm-card"
    : "rounded-pill border border-plum/15 bg-white px-3 py-1.5 text-xs font-medium text-plum-soft transition-colors hover:border-plum/30 hover:text-plum";
}

function TemplateCard({ template }: { template: TemplateMeta }) {
  return (
    <Link
      href={`/templates/${template.slug}`}
      className="group relative block cursor-pointer overflow-hidden rounded-2xl border border-peach/40 bg-white p-6 shadow-warm-card transition duration-200 hover:-translate-y-0.5 hover:shadow-warm-card-hover focus:outline-none focus-visible:ring-4 focus-visible:ring-coral/30"
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-coral/10 blur-3xl transition group-hover:bg-coral/20" />

      <div className="relative">
        <TemplateThumbnail template={template} scale={0.42} />

        <div className="mt-5 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-display text-lg font-semibold text-plum">
              {template.name}
            </p>
            <p className="mt-1 text-xs uppercase tracking-widest text-plum-soft">
              {template.tagline}
            </p>
            <p className="mt-2 text-xs leading-5 text-plum-soft">
              {template.description}
            </p>
            {(template.role || template.mood) && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {template.role && (
                  <span className="rounded-pill bg-mint/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#0F4A42]">
                    {ROLE_LABELS[template.role as RoleFacet]}
                  </span>
                )}
                {template.mood && (
                  <span className="rounded-pill bg-lavender/30 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#3A2452]">
                    {MOOD_LABELS[template.mood as MoodFacet]}
                  </span>
                )}
              </div>
            )}
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
  );
}

export function TemplatesListingClient({ initial }: Props) {
  const [role, setRole] = useState<RoleFacet>(initial.role);
  const [mood, setMood] = useState<MoodFacet>(initial.mood);
  const [tier, setTier] = useState<TierFacet>(initial.tier);

  const filtered = useMemo(() => {
    return TEMPLATE_LIST.filter((t) => {
      if (tier !== "all" && t.tier !== tier) return false;
      // Templates without role/mood (the 12 universal classics) only
      // pass the role filter when "all" is selected — they're not
      // role-tagged. They DO pass the mood filter on "all" for the
      // same reason.
      if (role !== "all" && t.role !== role) return false;
      if (mood !== "all" && t.mood !== mood) return false;
      return true;
    });
  }, [role, mood, tier]);

  // Bucket: free first, premium grouped by role.
  const groups = useMemo(() => {
    const free = filtered.filter((t) => t.tier === "free");
    const premium = filtered.filter((t) => t.tier === "premium");
    const universal = premium.filter((t) => !t.role);
    const byRole = new Map<string, TemplateMeta[]>();
    for (const t of premium) {
      if (!t.role) continue;
      const key = t.role;
      const arr = byRole.get(key) ?? [];
      arr.push(t);
      byRole.set(key, arr);
    }
    return { free, universal, byRole };
  }, [filtered]);

  const anyActive = role !== "all" || mood !== "all" || tier !== "all";

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl text-plum md:text-5xl">Templates</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-plum-soft">
          Six free classics, plus a growing library of role-specific Premium
          designs. Filter by role, mood, or tier — your CV stays the same when
          you switch.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-peach/40 bg-white p-5 shadow-warm-card">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-plum-faint">
            Role
          </span>
          {ROLE_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setRole(opt)}
              className={chipClass(role === opt)}
            >
              {ROLE_LABELS[opt]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-plum-faint">
            Mood
          </span>
          {MOOD_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setMood(opt)}
              className={chipClass(mood === opt)}
            >
              {MOOD_LABELS[opt]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-plum-faint">
            Tier
          </span>
          {TIER_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setTier(opt)}
              className={chipClass(tier === opt)}
            >
              {TIER_LABELS[opt]}
            </button>
          ))}
          {anyActive && (
            <button
              type="button"
              onClick={() => {
                setRole("all");
                setMood("all");
                setTier("all");
              }}
              className="ml-2 inline-flex items-center gap-1 rounded-pill bg-plum/5 px-3 py-1.5 text-xs font-medium text-plum-soft hover:bg-plum/10"
            >
              <X className="h-3 w-3" />
              Clear
            </button>
          )}
        </div>
      </section>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-peach/40 bg-white p-10 text-center text-sm text-plum-soft shadow-warm-card">
          No templates match those filters yet — more designs are on the way.
        </p>
      ) : (
        <>
          {groups.free.length > 0 && (
            <section>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-plum-faint">
                Free · ready to use
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {groups.free.map((t) => (
                  <TemplateCard key={t.slug} template={t} />
                ))}
              </div>
            </section>
          )}

          {groups.universal.length > 0 && (
            <section>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-plum-faint">
                Premium · all-purpose
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {groups.universal.map((t) => (
                  <TemplateCard key={t.slug} template={t} />
                ))}
              </div>
            </section>
          )}

          {[...groups.byRole.entries()].map(([roleKey, list]) => (
            <section key={roleKey}>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-plum-faint">
                Premium · {ROLE_LABELS[roleKey as RoleFacet]}
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {list.map((t) => (
                  <TemplateCard key={t.slug} template={t} />
                ))}
              </div>
            </section>
          ))}
        </>
      )}
    </div>
  );
}
