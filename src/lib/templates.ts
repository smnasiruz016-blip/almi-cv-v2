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

export type TemplateSlug =
  | "classic-serif"
  | "modern-mono"
  | "editorial-bold"
  | "photo-forward"
  | "minimalist-mono"
  | "atelier"
  | "director"
  | "atelier-pro"
  | "bold-color-block"
  | "soft-pastel-romantic"
  | "timeline-pro"
  | "pearl";

export type TemplateMeta = {
  slug: TemplateSlug;
  name: string;
  tier: "free" | "premium";
  tagline: string;
  description: string;
  Component: ComponentType<{ data: CVData; paginated?: boolean }>;
  sampleData?: CVData;
};

export const TEMPLATES: Record<TemplateSlug, TemplateMeta> = {
  "classic-serif": {
    slug: "classic-serif",
    name: "Classic Serif",
    tier: "free",
    tagline: "Timeless · Formal · Single-column",
    description:
      "A timeless, formal CV layout with a single-column structure. Designed for executives, consultants, and traditional industries.",
    Component: ClassicSerif,
    sampleData: mayaRodriguez,
  },
  "modern-mono": {
    slug: "modern-mono",
    name: "Modern Mono",
    tier: "free",
    tagline: "Modern · Tech · Sidebar",
    description:
      "A clean tech-focused layout with a mint sidebar for contact and skills, content on the right.",
    Component: ModernMono,
    sampleData: alexChen,
  },
  "editorial-bold": {
    slug: "editorial-bold",
    name: "Editorial Bold",
    tier: "free",
    tagline: "Bold · Creative · Magazine",
    description:
      "A magazine-style CV with a gold banner header and 2-column body. Perfect for marketing, brand, and creative roles.",
    Component: EditorialBold,
    sampleData: priyaPatel,
  },
  "photo-forward": {
    slug: "photo-forward",
    name: "Photo Forward",
    tier: "free",
    tagline: "Editorial · Photo-Led · Confident",
    description:
      "Big-photo editorial layout for photographers, designers, and visual creatives. Vogue-spread feel with restrained typography.",
    Component: PhotoForward,
    sampleData: sofiaMarchetti,
  },
  "minimalist-mono": {
    slug: "minimalist-mono",
    name: "Minimalist Mono",
    tier: "free",
    tagline: "Executive · Pure Typography · Restrained",
    description:
      "For senior executives, consultants, and advisors. Zero color, generous whitespace, confident typographic restraint. The black suit of CV templates.",
    Component: MinimalistMono,
    sampleData: edwardLindqvist,
  },
  atelier: {
    slug: "atelier",
    name: "Atelier",
    tier: "premium",
    tagline: "Card-based · Multilingual · Feminine",
    description:
      "Soft peach-and-lavender card-based layout. Multilingual-friendly. Designed for designers, students, and creative professionals.",
    Component: Atelier,
    sampleData: ayeshaKhan,
  },
  director: {
    slug: "director",
    name: "Director",
    tier: "premium",
    tagline: "Bold · Creative · Editorial",
    description:
      "Sage-and-cream split with bold typography. Built for art directors, creative leads, and design veterans.",
    Component: Director,
    sampleData: marcusWebb,
  },
  "atelier-pro": {
    slug: "atelier-pro",
    name: "Atelier Pro",
    tier: "premium",
    tagline: "Sidebar · Multilingual · Premium",
    description:
      "Cream content with a gold premium sidebar. Logros, Software, Competencias style. For multilingual professionals and senior creatives.",
    Component: AtelierPro,
    sampleData: juliaCortazar,
  },
  "bold-color-block": {
    slug: "bold-color-block",
    name: "Bold Color Block",
    tier: "premium",
    tagline: "Geometric · Vibrant · Agency",
    description:
      "Geometric color shapes, confident type, agency-grade visual energy. For creative directors, designers, and marketers whose work is visual.",
    Component: BoldColorBlock,
    sampleData: zaraOkonkwo,
  },
  "soft-pastel-romantic": {
    slug: "soft-pastel-romantic",
    name: "Soft Pastel",
    tier: "free",
    tagline: "Warm · Organic · Hand-Crafted Feel",
    description:
      "Soft pastels, organic shapes, and gentle typography. For wellness practitioners, educators, hospitality professionals, and anyone whose work is rooted in care.",
    Component: SoftPastelRomantic,
    sampleData: amaraHassan,
  },
  "timeline-pro": {
    slug: "timeline-pro",
    name: "Timeline Pro",
    tier: "premium",
    tagline: "Show your career trajectory",
    description:
      "Vertical timeline layout with dated milestones for mid-senior professionals with a clear career arc. Coral rail and connectors highlight progression. Ideal for marketers, product managers, brand strategists, and consultants.",
    Component: TimelinePro,
    sampleData: laylaHassan,
  },
  pearl: {
    slug: "pearl",
    name: "Pearl",
    tier: "premium",
    tagline: "Elegant sidebar with pill labels",
    description:
      "Two-column premium template with peach sidebar, photo prominence, and pill-shaped section labels. Inspired by editorial CV design. Ideal for marketers, brand managers, and consumer-facing professionals who want warmth and elegance.",
    Component: Pearl,
    sampleData: saraKhan,
  },
};

export const TEMPLATE_LIST: TemplateMeta[] = Object.values(TEMPLATES);

export function getTemplate(slug: string): TemplateMeta {
  return TEMPLATES[slug as TemplateSlug] ?? TEMPLATES["classic-serif"];
}

export function isKnownTemplate(slug: string): slug is TemplateSlug {
  return slug in TEMPLATES;
}
