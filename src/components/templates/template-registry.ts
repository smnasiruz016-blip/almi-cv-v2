import type { ComponentType } from "react";
import type { TemplateProps } from "./types";

// Core Popular & Professional Templates (100% Verified Safe Imports)
import ClassicSerif from "./ClassicSerif";
import ModernTwoColumn from "./ModernTwoColumn";
import TechMinimal from "./TechMinimal";
import Healthcare from "./Healthcare";
import CreativeDirector from "./CreativeDirector";
import Academic from "./Academic";
import CorporateBlue from "./CorporateBlue";
import SalesModern from "./SalesModern";
import MonochromeMinimal from "./MonochromeMinimal";
import MidnightCyan from "./MidnightCyan";
import EmeraldExecutive from "./EmeraldExecutive";
import RoyalBlueCorporate from "./RoyalBlueCorporate";
import RoseEditorial from "./RoseEditorial";
import WineLegal from "./WineLegal";

export type TemplateCategory =
  | "ats-classic"
  | "professional"
  | "developer"
  | "medical"
  | "creative"
  | "scholarly"
  | "business"
  | "sales"
  | "service"
  | "legal"
  | "finance"
  | "people-hr"
  | "executive"
  | "marketing";

export interface TemplateMeta {
  slug: string;
  name: string;
  description: string;
  tagline?: string;
  category: TemplateCategory;
  component: ComponentType<TemplateProps>;
  atsSafe: boolean;
  supportsPhoto: boolean;
  tier?: "free" | "premium";
  addedAt?: string;
  suggestedRoles: string[];
  suggestedIndustries: string[];
  themes?: string[];
}

const V1_BASE_MS = Date.parse("2026-05-26T00:00:00.000Z");

export function getTier(t: TemplateMeta): "free" | "premium" {
  return t.tier ?? "free";
}

export function getTagline(t: TemplateMeta): string {
  if (t.tagline) return t.tagline;
  const firstSentence = t.description.split(/[.!?](?=\s|$)/)[0]?.trim();
  return firstSentence || t.description;
}

export const TEMPLATES: TemplateMeta[] = [
  {
    slug: "classic-serif",
    name: "Classic Serif",
    description: "Single-column, gold rule accents, Fraunces display. Safest professional choice.",
    category: "ats-classic",
    component: ClassicSerif,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["accountant", "lawyer", "consultant"],
    suggestedIndustries: ["finance", "legal"],
    themes: ["plum", "navy", "wine"],
  },
  {
    slug: "modern-two-column",
    name: "Modern Two-Column",
    description: "Peach sidebar for contact and skills, coral underline on every section.",
    category: "professional",
    component: ModernTwoColumn,
    atsSafe: true,
    supportsPhoto: true,
    suggestedRoles: ["administrative-assistant", "office-manager"],
    suggestedIndustries: ["administration", "marketing"],
    themes: ["coral", "plum", "sand"],
  },
  {
    slug: "midnight-cyan",
    name: "Midnight Cyan",
    description: "Dark navy canvas, cyan-violet glow, glowing skill bars and mono detailing.",
    category: "developer",
    component: MidnightCyan,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["devops-engineer", "sre"],
    suggestedIndustries: ["software", "devops"],
    themes: ["navy", "plum"],
  },
  {
    slug: "emerald-executive",
    name: "Emerald Executive",
    description: "Deep emerald header, gold rule and Fraunces display for finance leaders.",
    category: "finance",
    component: EmeraldExecutive,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["cfo", "finance-director"],
    suggestedIndustries: ["finance", "banking"],
    themes: ["forest", "ivory", "wine"],
  },
  {
    slug: "tech-minimal",
    name: "Tech Minimal",
    description: "Inter + JetBrains Mono, monospace stack listings.",
    category: "developer",
    component: TechMinimal,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["software-engineer", "web-developer"],
    suggestedIndustries: ["technology", "software"],
    themes: ["charcoal", "slate"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    description: "Forest + sage palette, credential pills, balanced two-column body.",
    category: "medical",
    component: Healthcare,
    atsSafe: true,
    supportsPhoto: true,
    suggestedRoles: ["registered-nurse", "physician"],
    suggestedIndustries: ["healthcare", "medical"],
    themes: ["forest", "linen"],
  },
  {
    slug: "creative-director",
    name: "Creative Director",
    description: "Dark plum hero with coral glow, sidebar card.",
    category: "creative",
    component: CreativeDirector,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["creative-director", "art-director"],
    suggestedIndustries: ["advertising", "media"],
    themes: ["plum", "wine"],
  },
  {
    slug: "corporate-blue",
    name: "Corporate Blue",
    description: "Navy hero band + clean white body, executive polish.",
    category: "business",
    component: CorporateBlue,
    atsSafe: true,
    supportsPhoto: true,
    suggestedRoles: ["project-manager", "product-manager"],
    suggestedIndustries: ["business", "management"],
    themes: ["navy", "sky"],
  },
  {
    slug: "sales-modern",
    name: "Sales Modern",
    description: "Orange-pink gradient hero, KPI tiles overlapping.",
    category: "sales",
    component: SalesModern,
    atsSafe: true,
    supportsPhoto: true,
    suggestedRoles: ["sales-representative", "account-executive"],
    suggestedIndustries: ["sales"],
    themes: ["coral", "plum"],
  },
  {
    slug: "monochrome-minimal",
    name: "Monochrome Minimal",
    description: "Pure black-on-white with generous whitespace.",
    category: "ats-classic",
    component: MonochromeMinimal,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["product-manager", "analyst"],
    suggestedIndustries: ["corporate"],
    themes: ["mono", "slate"],
  },
  {
    slug: "royal-blue-corporate",
    name: "Royal Blue Corporate",
    description: "Classic blue sidebar with photo and skill bars.",
    category: "business",
    component: RoyalBlueCorporate,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["operations-manager", "general-manager"],
    suggestedIndustries: ["operations", "corporate"],
    themes: ["navy", "royal"],
  },
  {
    slug: "rose-editorial",
    name: "Rose Editorial",
    description: "Elegant blush palette, DM Serif Display and centered masthead.",
    category: "marketing",
    component: RoseEditorial,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["marketing-manager", "brand-manager"],
    suggestedIndustries: ["marketing", "communications"],
    themes: ["blush", "wine"],
  },
  {
    slug: "wine-legal",
    name: "Wine Legal",
    description: "Refined wine-and-serif classic with centred headings.",
    category: "legal",
    component: WineLegal,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["lawyer", "attorney"],
    suggestedIndustries: ["legal", "corporate"],
    themes: ["wine", "ivory"],
  }
];

const ADDED_AT_CACHE: Map<string, string> = (() => {
  const m = new Map<string, string>();
  for (let i = 0; i < TEMPLATES.length; i++) {
    const t = TEMPLATES[i];
    if (!t.addedAt) {
      m.set(t.slug, new Date(V1_BASE_MS + i * 60_000).toISOString());
    }
  }
  return m;
})();

export function getAddedAt(t: TemplateMeta): string {
  return t.addedAt ?? ADDED_AT_CACHE.get(t.slug) ?? new Date(V1_BASE_MS).toISOString();
}

export function getTemplate(slug: string | null | undefined): TemplateMeta {
  if (!slug) return defaultTemplate();
  return TEMPLATES.find((t) => t.slug === slug) ?? defaultTemplate();
}

export function defaultTemplate(): TemplateMeta {
  return TEMPLATES.find((t) => t.slug === "classic-serif") ?? TEMPLATES[TEMPLATES.length - 1];
}

export function suggestTemplate(opts: {
  roleSlug?: string;
  industrySlug?: string;
}): TemplateMeta {
  const { roleSlug, industrySlug } = opts;
  if (roleSlug) {
    const exact = TEMPLATES.find((t) => t.suggestedRoles.includes(roleSlug));
    if (exact) return exact;
  }
  if (industrySlug) {
    const byIndustry = TEMPLATES.find((t) =>
      t.suggestedIndustries.includes(industrySlug),
    );
    if (byIndustry) return byIndustry;
  }
  return defaultTemplate();
}

export function templatesByCategory(category: TemplateCategory): TemplateMeta[] {
  return TEMPLATES.filter((t) => t.category === category);
}

export function getAllRoleMappings(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const t of TEMPLATES) {
    for (const role of t.suggestedRoles) {
      if (!map[role]) map[role] = t.slug;
    }
  }
  return map;
}

export function getCoveredRoleCount(): number {
  const seen = new Set<string>();
  for (const t of TEMPLATES) for (const r of t.suggestedRoles) seen.add(r);
  return seen.size;
}
