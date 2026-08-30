import type { ComponentType } from "react";
import type { TemplateProps } from "./types";

// 1. Masterclass Original Design Batch
import {
  NeoGlassmorphismTemplate,
  AsymmetricEditorialTemplate,
  CyberGeometricTemplate,
  BohoTerracottaTemplate,
} from "./batch-masterclass";

// 2. Canva Imported Templates Batch
import {
  MindMapGraphisteTemplate,
  SachaDuboisEventTemplate,
  ClipboardNotepadTemplate,
  IdBadgeModernTemplate,
  DottedNotebookTemplate as NotebookDottedGridTemplate,
  FloralBotanistTemplate,
  LouGarnierCommunityTemplate,
  LouHuetIllustratorTemplate,
  YaelleAllaouiTemplate,
  ThomasGarciaSoundTemplate,
} from "./batch-canva-imported";

// 3. Ultra-Creative Batch
import {
  BeautyMakeupArtistTemplate,
  MothercareChildcareTemplate,
  FloralBotanicalTemplate,
  CurvyWaveModernTemplate,
} from "./batch-ultra-creative";

// 4. Futuristic Cyber Nurse Template
import { CyberNurseFuturisticTemplate } from "./CyberNurseFuturisticTemplate";

// 5. Core Popular Templates
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
  | "people-hr"
  | "beauty"
  | "portfolio"
  | "executive"
  | "childcare"
  | "nursing"
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
    slug: "cyber-nurse-futuristic",
    name: "Cyber-Nurse HUD & Holo-Vital",
    description: "Futuristic sci-fi neon HUD interface with telemetry progress bars and metrics.",
    category: "nursing",
    component: CyberNurseFuturisticTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-30T12:00:00.000Z",
    suggestedRoles: ["registered-nurse", "icu-nurse", "er-nurse", "critical-care-nurse"],
    suggestedIndustries: ["healthcare", "nursing", "clinical-medicine"],
    themes: ["midnight", "cyan", "slate"],
  },
  {
    slug: "neo-glassmorphism-executive",
    name: "Neo-Glassmorphism Executive",
    description: "Deep obsidian canvas with frosted glass cards, neon ambient orbs, and executive precision.",
    category: "executive",
    component: NeoGlassmorphismTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-30T10:00:00.000Z",
    suggestedRoles: ["cto", "vp-engineering", "chief-technology-officer", "tech-lead"],
    suggestedIndustries: ["technology", "executive", "software"],
    themes: ["midnight", "indigo", "cyan"],
  },
  {
    slug: "asymmetric-editorial",
    name: "Asymmetric Editorial Masthead",
    description: "Warm champagne and burnt wine magazine style with massive display serif headers.",
    category: "creative",
    component: AsymmetricEditorialTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: false,
    addedAt: "2026-08-30T09:50:00.000Z",
    suggestedRoles: ["editor-in-chief", "editorial-director", "brand-consultant", "journalist"],
    suggestedIndustries: ["editorial", "publishing", "marketing"],
    themes: ["sand", "wine", "ivory"],
  },
  {
    slug: "cyber-geometric-matrix",
    name: "Cyber-Geometric Matrix Data Hub",
    description: "Midnight ink with electric cyan tech grid and telemetry metrics.",
    category: "developer",
    component: CyberGeometricTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: false,
    addedAt: "2026-08-30T09:40:00.000Z",
    suggestedRoles: ["cybersecurity-architect", "penetration-tester", "systems-engineer"],
    suggestedIndustries: ["cybersecurity", "technology", "infosec"],
    themes: ["midnight", "cyan", "slate"],
  },
  {
    slug: "boho-organic-terracotta",
    name: "Boho Organic Terracotta",
    description: "Warm sand and soft clay organic curved blobs with soft rounded skill pills.",
    category: "creative",
    component: BohoTerracottaTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: true,
    addedAt: "2026-08-30T09:30:00.000Z",
    suggestedRoles: ["product-designer", "ux-researcher", "content-writer"],
    suggestedIndustries: ["design", "creative", "wellness"],
    themes: ["terracotta", "sand", "ivory"],
  },
  {
    slug: "mind-map-graphiste",
    name: "Mind-Map Graphiste (Chloé Vallet)",
    description: "Famous Canva radial mind-map layout with central circular portrait.",
    category: "creative",
    component: MindMapGraphisteTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-16T09:00:00.000Z",
    suggestedRoles: ["graphiste", "designer-graphique", "art-director", "ui-designer"],
    suggestedIndustries: ["creative", "design", "communication"],
    themes: ["sand", "wine", "ivory"],
  },
  {
    slug: "sacha-dubois-event",
    name: "Modern Event Manager (Sacha Dubois)",
    description: "Clean modern layout with top-right red fluid wave header.",
    category: "professional",
    component: SachaDuboisEventTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: true,
    addedAt: "2026-08-16T08:50:00.000Z",
    suggestedRoles: ["chargee-de-projet", "event-manager", "project-coordinator"],
    suggestedIndustries: ["events", "marketing", "corporate"],
    themes: ["coral", "mono", "ivory"],
  },
  {
    slug: "clipboard-notepad",
    name: "Clipboard Notepad (Clémence Laurent)",
    description: "Realistic blue clipboard mockup with polaroid photo frame.",
    category: "creative",
    component: ClipboardNotepadTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-16T08:40:00.000Z",
    suggestedRoles: ["designer-graphique", "freelance-designer", "photographer"],
    suggestedIndustries: ["creative", "freelance", "photography"],
    themes: ["navy", "mono", "ivory"],
  },
  {
    slug: "security-badge-pr",
    name: "Security ID Badge PR (Jonathan Martin)",
    description: "Professional PR layout featuring a realistic security ID pass badge.",
    category: "professional",
    component: IdBadgeModernTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: true,
    addedAt: "2026-08-16T08:30:00.000Z",
    suggestedRoles: ["relations-publiques", "communication-manager", "pr-specialist"],
    suggestedIndustries: ["communications", "pr", "corporate"],
    themes: ["slate", "mono", "ivory"],
  },
  {
    slug: "dotted-notebook-elsa",
    name: "Dotted Notebook (Elsa Belvaux)",
    description: "Spiral notebook aesthetic with dotted grid background.",
    category: "creative",
    component: NotebookDottedGridTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-16T08:20:00.000Z",
    suggestedRoles: ["chargee-de-communication", "content-strategist", "community-manager"],
    suggestedIndustries: ["communication", "marketing", "media"],
    themes: ["sand", "amber", "ivory"],
  },
  {
    slug: "floral-botanist-helene",
    name: "Floral Botanist (Hélène Roux)",
    description: "Delicate floral motifs, soft rose/terracotta palette.",
    category: "beauty",
    component: FloralBotanistTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: true,
    addedAt: "2026-08-16T08:10:00.000Z",
    suggestedRoles: ["fleuriste", "botaniste", "floral-designer"],
    suggestedIndustries: ["floristry", "nature", "gardening"],
    themes: ["rose", "sand", "ivory"],
  },
  {
    slug: "lou-garnier-community",
    name: "Lou Garnier Community Manager",
    description: "Cheerful botanical layout with soft pastel green accents.",
    category: "creative",
    component: LouGarnierCommunityTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: true,
    addedAt: "2026-08-16T08:00:00.000Z",
    suggestedRoles: ["community-manager", "social-media-manager", "content-creator"],
    suggestedIndustries: ["social-media", "marketing", "community"],
    themes: ["sage", "forest", "ivory"],
  },
  {
    slug: "lou-huet-illustrator",
    name: "Lou Huet Illustrator Pop",
    description: "Vibrant pink and yellow pop aesthetic with sticker badges.",
    category: "creative",
    component: LouHuetIllustratorTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-16T07:50:00.000Z",
    suggestedRoles: ["illustrateur", "graphiste", "concept-artist"],
    suggestedIndustries: ["illustration", "creative", "art"],
    themes: ["coral", "lime", "blush"],
  },
  {
    slug: "yaelle-allaoui-folded",
    name: "Yaelle Allaoui Crumpled Paper",
    description: "Pink folded paper look with dark charcoal base.",
    category: "creative",
    component: YaelleAllaouiTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-16T07:40:00.000Z",
    suggestedRoles: ["designer-graphique", "art-director", "brand-designer"],
    suggestedIndustries: ["design", "creative", "branding"],
    themes: ["plum", "coral", "charcoal"],
  },
  {
    slug: "thomas-garcia-sound",
    name: "Thomas Garcia Sound Tech",
    description: "Dark audio/media technician theme with project grids.",
    category: "developer",
    component: ThomasGarciaSoundTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-16T07:30:00.000Z",
    suggestedRoles: ["technicien-son", "sound-engineer", "audio-producer"],
    suggestedIndustries: ["audio", "media", "production"],
    themes: ["slate", "sky", "midnight"],
  },
  {
    slug: "beauty-makeup-artist",
    name: "Beauty & Makeup Artist Pro",
    description: "Nude rose gold aesthetic with cosmetic props and floating accents.",
    category: "beauty",
    component: BeautyMakeupArtistTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-16T07:00:00.000Z",
    suggestedRoles: ["makeup-artist", "beauty-stylist", "hair-stylist"],
    suggestedIndustries: ["beauty", "cosmetics", "wellness"],
    themes: ["rose", "blush", "sand"],
  },
  {
    slug: "mothercare-childcare",
    name: "Mothercare & Childcare Warmth",
    description: "Soft pastel aqua/peach organic waves with toy motifs.",
    category: "childcare",
    component: MothercareChildcareTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: true,
    addedAt: "2026-08-16T06:50:00.000Z",
    suggestedRoles: ["nanny", "childcare-worker", "preschool-teacher"],
    suggestedIndustries: ["childcare", "education"],
    themes: ["sage", "sky", "ivory"],
  },
  {
    slug: "floral-botanical-wellness",
    name: "Floral Botanical Wellness",
    description: "Calm sage green palette with hand-drawn leaf motifs.",
    category: "beauty",
    component: FloralBotanicalTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: true,
    addedAt: "2026-08-16T06:40:00.000Z",
    suggestedRoles: ["florist", "wellness-coach", "botanist"],
    suggestedIndustries: ["floristry", "wellness", "nature"],
    themes: ["sage", "forest", "ivory"],
  },
  {
    slug: "curvy-wave-modern-agency",
    name: "Curvy Wave Modern Agency",
    description: "Asymmetrical liquid gradient waves for creative agencies.",
    category: "creative",
    component: CurvyWaveModernTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-16T06:30:00.000Z",
    suggestedRoles: ["growth-marketer", "digital-marketer"],
    suggestedIndustries: ["marketing", "digital-agency"],
    themes: ["midnight", "sky", "plum"],
  },
  {
    slug: "classic-serif",
    name: "Classic Serif",
    description: "Single-column, gold rule accents, Fraunces display. Safest professional choice.",
    category: "ats-classic",
    component: ClassicSerif,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["accountant", "lawyer", "consultant"],
    suggestedIndustries: ["finance", "accounting", "legal"],
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

exports.templatesByCategory = function templatesByCategory(category: TemplateCategory): TemplateMeta[] {
  return TEMPLATES.filter((t) => t.category === category);
};

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
