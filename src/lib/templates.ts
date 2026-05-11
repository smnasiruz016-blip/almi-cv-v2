import type { ComponentType } from "react";
import type { CVData } from "@/lib/cv-types";
import { ClassicSerif } from "@/components/templates/ClassicSerif";
import { ModernMono } from "@/components/templates/ModernMono";
import { EditorialBold } from "@/components/templates/EditorialBold";
import { PhotoForward } from "@/components/templates/PhotoForward";
import { MinimalistMono } from "@/components/templates/MinimalistMono";
import { Atelier } from "@/components/templates/Atelier";
import { Director } from "@/components/templates/Director";
import { AtelierPro } from "@/components/templates/AtelierPro";
import { BoldColorBlock } from "@/components/templates/BoldColorBlock";
import { SoftPastelRomantic } from "@/components/templates/SoftPastelRomantic";
import { TimelinePro } from "@/components/templates/TimelinePro";
import { Pearl } from "@/components/templates/Pearl";
import { HealthcareBoldICU } from "@/components/templates/HealthcareBoldICU";
import { ClinicalCream } from "@/components/templates/ClinicalCream";
import { HealthcareLightBlue } from "@/components/templates/HealthcareLightBlue";
import { ProjectManagementOrange } from "@/components/templates/ProjectManagementOrange";
import { EditorialNavy } from "@/components/templates/EditorialNavy";
import {
  alexChen,
  amaraHassan,
  ayeshaKhan,
  edwardLindqvist,
  juliaCortazar,
  laylaHassan,
  marcusWebb,
  mayaRodriguez,
  priyaPatel,
  saraKhan,
  sofiaMarchetti,
  zaraOkonkwo,
} from "@/lib/sample-cv-data";
import { makeRecipeComponent } from "@/components/templates/engine";
import type {
  CulturalFitISO,
  RecipeMood,
  RecipeRole,
} from "@/components/templates/engine/recipe-types";
import { RECIPE_LIST } from "@/lib/recipes";
import {
  PERSONAS,
  healthcareBoldIcu,
  healthcareRefined,
  projectManagementBoldSenior,
  marketingEditorialSenior,
  type PersonaId,
} from "@/lib/personas";

export type TemplateMeta = {
  slug: string;
  name: string;
  tier: "free" | "premium";
  tagline: string;
  description: string;
  /**
   * Component contract. `printSafe` is added in Stage 2 — recipe-driven
   * templates honor it, hand-coded templates ignore it (extra props on
   * a React component are harmless).
   */
  Component: ComponentType<{ data: CVData; paginated?: boolean }>;
  sampleData?: CVData;
  /** Stage 2 metadata. Hand-coded universal templates leave these
   * unset; recipe-driven role × mood templates populate them. */
  role?: RecipeRole;
  mood?: RecipeMood;
  /** ISO-3166 alpha-2. Internal-only — surfaced on /jobs/<country>
   * recommendations, never exposed as a chip on /templates. */
  culturalFit?: CulturalFitISO[];
  /** "recipe" | "hand-coded". Dual-source registry; the eyeballs of
   * the picker can't tell the difference, but the editor & paywall
   * code paths can. */
  source: "recipe" | "hand-coded";
  /** Discovery tags. Mirrors `tags` on TemplateRecipe; surfaces in
   * /jobs/<country> and search-style filters. Optional — universal
   * hand-coded templates leave it unset. */
  tags?: string[];
};

/**
 * Hand-coded universal templates. The 12 entries below are LOCKED — Stage
 * 2 of the factory is additive only. Any visual changes here would
 * silently re-style users' saved CVs. Don't touch.
 */
const HAND_CODED_TEMPLATES: TemplateMeta[] = [
  {
    slug: "classic-serif",
    name: "Classic Serif",
    tier: "free",
    tagline: "Timeless · Formal · Single-column",
    description:
      "A timeless, formal CV layout with a single-column structure. Designed for executives, consultants, and traditional industries.",
    Component: ClassicSerif,
    sampleData: mayaRodriguez,
    source: "hand-coded",
  },
  {
    slug: "modern-mono",
    name: "Modern Mono",
    tier: "free",
    tagline: "Modern · Tech · Sidebar",
    description:
      "A clean tech-focused layout with a mint sidebar for contact and skills, content on the right.",
    Component: ModernMono,
    sampleData: alexChen,
    source: "hand-coded",
  },
  {
    slug: "editorial-bold",
    name: "Editorial Bold",
    tier: "free",
    tagline: "Bold · Creative · Magazine",
    description:
      "A magazine-style CV with a gold banner header and 2-column body. Perfect for marketing, brand, and creative roles.",
    Component: EditorialBold,
    sampleData: priyaPatel,
    source: "hand-coded",
  },
  {
    slug: "photo-forward",
    name: "Photo Forward",
    tier: "free",
    tagline: "Editorial · Photo-Led · Confident",
    description:
      "Big-photo editorial layout for photographers, designers, and visual creatives. Vogue-spread feel with restrained typography.",
    Component: PhotoForward,
    sampleData: sofiaMarchetti,
    source: "hand-coded",
  },
  {
    slug: "minimalist-mono",
    name: "Minimalist Mono",
    tier: "free",
    tagline: "Executive · Pure Typography · Restrained",
    description:
      "For senior executives, consultants, and advisors. Zero color, generous whitespace, confident typographic restraint. The black suit of CV templates.",
    Component: MinimalistMono,
    sampleData: edwardLindqvist,
    source: "hand-coded",
  },
  {
    slug: "atelier",
    name: "Atelier",
    tier: "premium",
    tagline: "Card-based · Multilingual · Feminine",
    description:
      "Soft peach-and-lavender card-based layout. Multilingual-friendly. Designed for designers, students, and creative professionals.",
    Component: Atelier,
    sampleData: ayeshaKhan,
    source: "hand-coded",
  },
  {
    slug: "director",
    name: "Director",
    tier: "premium",
    tagline: "Bold · Creative · Editorial",
    description:
      "Sage-and-cream split with bold typography. Built for art directors, creative leads, and design veterans.",
    Component: Director,
    sampleData: marcusWebb,
    source: "hand-coded",
  },
  {
    slug: "atelier-pro",
    name: "Atelier Pro",
    tier: "premium",
    tagline: "Sidebar · Multilingual · Premium",
    description:
      "Cream content with a gold premium sidebar. Logros, Software, Competencias style. For multilingual professionals and senior creatives.",
    Component: AtelierPro,
    sampleData: juliaCortazar,
    source: "hand-coded",
  },
  {
    slug: "bold-color-block",
    name: "Bold Color Block",
    tier: "premium",
    tagline: "Geometric · Vibrant · Agency",
    description:
      "Geometric color shapes, confident type, agency-grade visual energy. For creative directors, designers, and marketers whose work is visual.",
    Component: BoldColorBlock,
    sampleData: zaraOkonkwo,
    source: "hand-coded",
  },
  {
    slug: "soft-pastel-romantic",
    name: "Soft Pastel",
    tier: "free",
    tagline: "Warm · Organic · Hand-Crafted Feel",
    description:
      "Soft pastels, organic shapes, and gentle typography. For wellness practitioners, educators, hospitality professionals, and anyone whose work is rooted in care.",
    Component: SoftPastelRomantic,
    sampleData: amaraHassan,
    source: "hand-coded",
  },
  {
    slug: "timeline-pro",
    name: "Timeline Pro",
    tier: "premium",
    tagline: "Show your career trajectory",
    description:
      "Vertical timeline layout with dated milestones for mid-senior professionals with a clear career arc. Coral rail and connectors highlight progression. Ideal for marketers, product managers, brand strategists, and consultants.",
    Component: TimelinePro,
    sampleData: laylaHassan,
    source: "hand-coded",
  },
  {
    slug: "pearl",
    name: "Pearl",
    tier: "premium",
    tagline: "Elegant sidebar with pill labels",
    description:
      "Two-column premium template with peach sidebar, photo prominence, and pill-shaped section labels. Inspired by editorial CV design. Ideal for marketers, brand managers, and consumer-facing professionals who want warmth and elegance.",
    Component: Pearl,
    sampleData: saraKhan,
    source: "hand-coded",
  },
  {
    slug: "healthcare-bold-icu-handcoded",
    name: "Trusted Critical Care",
    tier: "premium",
    tagline: "Clinical · Color-Blocked · ICU-Ready",
    description:
      "Hand-coded healthcare layout with cream-and-sage color blocking, tinted clinical photo, and a navy specialised-skills strip. Built for ICU, ER, and critical-care nurses — especially the Filipino nursing diaspora applying into the Gulf, UK, and Singapore.",
    Component: HealthcareBoldICU,
    sampleData: healthcareBoldIcu,
    role: "healthcare",
    mood: "bold",
    culturalFit: ["PH", "AE", "SA", "KW", "QA", "SG", "GB", "IE"],
    source: "hand-coded",
    tags: [
      "healthcare",
      "nurse",
      "icu",
      "critical-care",
      "bold",
      "color-blocked",
      "filipino-diaspora",
    ],
  },
  {
    slug: "healthcare-clinical-cream-handcoded",
    name: "Clinical Cream",
    tier: "premium",
    tagline: "Clinical · Cream Canvas · ICU-Ready",
    description:
      "Hand-coded healthcare layout with a cream canvas, an 18px sage stripe at photo left, and teal accents on heading and footer. Five horizontal zones with clinical experience prioritized in the right column. For ICU, ER, and critical-care nurses — same audience as Trusted Critical Care, in a softer cream-dominant palette.",
    Component: ClinicalCream,
    sampleData: healthcareBoldIcu,
    role: "healthcare",
    mood: "refined",
    culturalFit: ["PH", "AE", "SA", "KW", "QA", "SG", "GB", "IE"],
    source: "hand-coded",
    tags: [
      "healthcare",
      "nurse",
      "icu",
      "critical-care",
      "clinical",
      "cream",
      "refined",
      "filipino-diaspora",
    ],
  },
  {
    slug: "healthcare-light-blue-handcoded",
    name: "Light-blue Label-Column",
    tier: "premium",
    tagline: "Calm · Refined · Healthcare · Label-column",
    description:
      "Refined alternative to Clinical Cream for healthcare professionals who prefer a cool, calm aesthetic. Light-blue page background, italic display name, uppercase section labels in a left column, and a 2-column certifications grid at the bottom. Designed for nurses, allied health professionals, and clinical generalists.",
    Component: HealthcareLightBlue,
    sampleData: healthcareRefined,
    role: "healthcare",
    mood: "refined",
    culturalFit: ["PH", "AE", "SA", "KW", "QA", "SG", "GB", "IE"],
    source: "hand-coded",
    tags: [
      "healthcare",
      "nurse",
      "clinical",
      "refined",
      "label-column",
      "light-blue",
      "certifications-grid",
      "italic-display",
    ],
  },
  {
    slug: "project-management-orange-handcoded",
    name: "Orange Project Manager",
    tier: "premium",
    tagline: "Bold corporate CV with warm orange hero and editorial spine",
    description:
      "Designed for senior project managers, program leaders, and corporate strategists. Warm orange hero band carries name, summary, and contact, with a signature 6-petal asterisk and a subtle navy spine line running through the body. Two-column layout pairs Work Experience and Additional Experience (certifications) on the left with Skills and Education on the right. Sun-burst accent anchors the bottom-right. Authority with warmth.",
    Component: ProjectManagementOrange,
    sampleData: projectManagementBoldSenior,
    role: "project-management",
    mood: "bold",
    culturalFit: ["GB", "US", "DE", "ES", "FR", "NL", "AE", "SG"],
    source: "hand-coded",
    tags: [
      "project-management",
      "pm",
      "corporate",
      "bold",
      "orange",
      "two-column",
      "additional-experience",
      "asterisk",
      "multilingual",
    ],
  },
  {
    slug: "editorial-navy-handcoded",
    name: "Editorial Navy",
    tier: "premium",
    tagline: "Premium dark-navy CV with editorial typography and circular photo",
    description:
      "A typography-led CV on a deep navy canvas with warm cream text. Single-color treatment — hierarchy comes from weight, size, and whitespace alone, with no decorative flourishes. Hero pairs a dominant name and uppercase role with a circular photo slot (graceful initials fallback if no photo). Two-column body places Summary and Education on the left, Experience and Skills on the right. Designed for senior marketing managers, communications strategists, and consulting roles where editorial gravitas signals premium quality.",
    Component: EditorialNavy,
    sampleData: marketingEditorialSenior,
    role: "marketing",
    mood: "bold",
    culturalFit: ["AE", "SA", "QA", "KW", "EG", "FR", "ES", "IT", "DE"],
    source: "hand-coded",
    tags: [
      "marketing",
      "editorial",
      "navy",
      "dark-bg",
      "single-color",
      "circular-photo",
      "two-column",
      "typography-led",
      "premium",
    ],
  },
];

/**
 * Recipe-driven templates — Stage 2. Built from TemplateRecipe objects
 * via makeRecipeComponent(). Adding a new role × mood × variant means
 * dropping a recipe file under src/lib/recipes/<role>/ and importing
 * it from src/lib/recipes/index.ts; the registry picks it up here
 * automatically.
 */
const RECIPE_TEMPLATES: TemplateMeta[] = RECIPE_LIST.map((recipe) => ({
  slug: recipe.slug,
  name: recipe.name,
  tier: recipe.tier,
  tagline: recipe.tagline,
  description: recipe.description,
  Component: makeRecipeComponent(recipe),
  sampleData: PERSONAS[recipe.preview_persona_id as PersonaId],
  role: recipe.role,
  mood: recipe.mood,
  culturalFit: recipe.cultural_fit,
  source: "recipe",
}));

export const TEMPLATE_LIST: TemplateMeta[] = [
  ...HAND_CODED_TEMPLATES,
  ...RECIPE_TEMPLATES,
];

export const TEMPLATES: Record<string, TemplateMeta> = Object.fromEntries(
  TEMPLATE_LIST.map((t) => [t.slug, t]),
);

export function getTemplate(slug: string): TemplateMeta {
  return TEMPLATES[slug] ?? TEMPLATES["classic-serif"];
}

export function isKnownTemplate(slug: string): boolean {
  return slug in TEMPLATES;
}
