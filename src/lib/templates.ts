import type { ComponentType } from "react";
import type { CVData } from "@/lib/cv-types";
import { ClassicSerif } from "@/components/templates/ClassicSerif";

export type TemplateSlug =
  | "classic-serif"
  | "modern-mono"
  | "editorial-bold"
  | "atelier"
  | "director"
  | "atelier-pro";

export type TemplateMeta = {
  slug: TemplateSlug;
  name: string;
  tier: "free" | "premium";
  tagline: string;
  description: string;
  Component: ComponentType<{ data: CVData }>;
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
  },
  "modern-mono": {
    slug: "modern-mono",
    name: "Modern Mono",
    tier: "free",
    tagline: "Modern · Tech · Sidebar",
    description:
      "A clean tech-focused layout with a mint sidebar for contact and skills, content on the right.",
    Component: ClassicSerif,
  },
  "editorial-bold": {
    slug: "editorial-bold",
    name: "Editorial Bold",
    tier: "free",
    tagline: "Bold · Creative · Magazine",
    description:
      "A magazine-style CV with a gold banner header and 2-column body. Perfect for marketing, brand, and creative roles.",
    Component: ClassicSerif,
  },
  atelier: {
    slug: "atelier",
    name: "Atelier",
    tier: "premium",
    tagline: "Card-based · Multilingual · Feminine",
    description:
      "Soft peach-and-lavender card-based layout. Multilingual-friendly. Designed for designers, students, and creative professionals.",
    Component: ClassicSerif,
  },
  director: {
    slug: "director",
    name: "Director",
    tier: "premium",
    tagline: "Bold · Creative · Editorial",
    description:
      "Sage-and-cream split with bold typography. Built for art directors, creative leads, and design veterans.",
    Component: ClassicSerif,
  },
  "atelier-pro": {
    slug: "atelier-pro",
    name: "Atelier Pro",
    tier: "premium",
    tagline: "Sidebar · Multilingual · Premium",
    description:
      "Cream content with a gold premium sidebar. Logros, Software, Competencias style. For multilingual professionals and senior creatives.",
    Component: ClassicSerif,
  },
};

export const TEMPLATE_LIST: TemplateMeta[] = Object.values(TEMPLATES);

export function getTemplate(slug: string): TemplateMeta {
  return TEMPLATES[slug as TemplateSlug] ?? TEMPLATES["classic-serif"];
}

export function isKnownTemplate(slug: string): slug is TemplateSlug {
  return slug in TEMPLATES;
}
