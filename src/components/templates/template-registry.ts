import type { ComponentType } from "react";
import type { TemplateProps } from "./types";

// Core Popular & Masterclass Templates (Directly imported and verified)
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
  | "hospitality"
  | "sales"
  | "service"
  | "legal"
  | "finance"
  | "beauty"
  | "portfolio"
  | "executive";

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
    suggestedRoles: ["accountant", "lawyer", "consultant", "executive-assistant"],
    suggestedIndustries: ["finance", "accounting", "legal", "consulting"],
    themes: ["plum", "navy", "wine", "charcoal"],
  },
  {
    slug: "modern-two-column",
    name: "Modern Two-Column",
    description: "Peach sidebar for contact and skills, coral underline on every section.",
    category: "professional",
    component: ModernTwoColumn,
    atsSafe: true,
    supportsPhoto: true,
    suggestedRoles: ["administrative-assistant", "office-manager", "marketing-manager"],
    suggestedIndustries: ["administration", "marketing", "human-resources"],
    themes: ["coral", "plum", "sand", "linen"],
  },
  {
    slug: "midnight-cyan",
    name: "Midnight Cyan",
    description: "Dark navy canvas, cyan-violet glow, glowing skill bars and mono detailing.",
    category: "developer",
    component: MidnightCyan,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["devops-engineer", "platform-engineer", "site-reliability-engineer", "sre"],
    suggestedIndustries: ["software", "technology", "devops"],
    themes: ["navy", "plum", "forest"],
  },
  {
    slug: "emerald-executive",
    name: "Emerald Executive",
    description: "Deep emerald header, gold rule and Fraunces display for finance leaders.",
    category: "finance",
    component: EmeraldExecutive,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["chief-financial-officer", "cfo", "finance-director", "vp-finance"],
    suggestedIndustries: ["finance", "banking", "executive"],
    themes: ["forest", "ivory", "wine"],
  },
  {
    slug: "tech-minimal",
    name: "Tech Minimal",
    description: "Inter + JetBrains Mono, monospace stack listings, mint underline.",
    category: "developer",
    component: TechMinimal,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["software-engineer", "software-developer", "web-developer"],
    suggestedIndustries: ["technology", "software", "engineering"],
    themes: ["charcoal", "midnight", "slate"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    description: "Forest + sage palette, credential pills, balanced two-column body.",
    category: "medical",
    component: Healthcare,
    atsSafe: true,
    supportsPhoto: true,
    suggestedRoles: ["registered-nurse", "nurse-practitioner", "physician"],
    suggestedIndustries: ["healthcare", "medical", "nursing"],
    themes: ["forest", "linen", "ivory"],
  },
  {
    slug: "creative-director",
    name: "Creative Director",
    description: "Dark plum hero with coral glow, DM Serif Display H1, sidebar card.",
    category: "creative",
    component: CreativeDirector,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["creative-director", "art-director", "design-director"],
    suggestedIndustries: ["design-leadership", "advertising", "fashion", "media"],
    themes: ["plum", "wine", "midnight"],
  },
  {
    slug: "corporate-blue",
    name: "Corporate Blue",
    description: "Navy hero band + clean white body, executive polish.",
    category: "business",
    component: CorporateBlue,
    atsSafe: true,
    supportsPhoto: true,
    suggestedRoles: ["project-manager", "program-manager", "product-manager", "operations-manager"],
    suggestedIndustries: ["business", "management", "operations"],
    themes: ["navy", "sky", "slate", "plum"],
  },
  {
    slug: "sales-modern",
    name: "Sales Modern",
    description: "Orange→pink gradient hero, KPI tiles overlapping.",
    category: "sales",
    component: SalesModern,
    atsSafe: true,
    supportsPhoto: true,
    suggestedRoles: ["sales-representative", "account-executive", "sales-manager"],
    suggestedIndustries: ["sales", "business-development"],
    themes: ["coral", "plum", "wine"],
  },
  {
    slug: "monochrome-minimal",
    name: "Monochrome Minimal",
    description: "Pure black-on-white with generous whitespace and hairline rules.",
    category: "ats-classic",
    component: MonochromeMinimal,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["product-manager", "professional", "manager", "analyst"],
    suggestedIndustries: ["universal", "professional", "corporate"],
    themes: ["mono", "ivory", "slate"],
  },
  {
    slug: "royal-blue-corporate",
    name: "Royal Blue Corporate",
    description: "Classic blue sidebar with photo, skill bars and clean body.",
    category: "business",
    component: RoyalBlueCorporate,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["operations-manager", "business-manager", "general-manager"],
    suggestedIndustries: ["business", "operations", "corporate"],
    themes: ["navy", "royal", "slate"],
  },
  {
    slug: "rose-editorial",
    name: "Rose Editorial",
    description: "Elegant blush palette, DM Serif Display and centred editorial masthead.",
    category: "marketing",
    component: RoseEditorial,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["marketing-manager", "brand-manager", "communications-manager"],
    suggestedIndustries: ["marketing", "branding", "communications"],
    themes: ["blush", "wine", "rose"],
  },
  {
    slug: "wine-legal",
    name: "Wine Legal",
    description: "Refined wine-and-serif classic with centred headings. Authoritative and ATS-safe.",
    category: "legal",
    component: WineLegal,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["lawyer", "corporate-counsel", "attorney"],
    suggestedIndustries: ["legal", "law", "corporate"],
    themes: ["wine", "ivory", "forest"],
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
