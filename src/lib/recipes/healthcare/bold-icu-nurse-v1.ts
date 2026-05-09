import type { TemplateRecipe } from "@/components/templates/engine/recipe-types";

/**
 * Healthcare / Bold / ICU Nurse v1.
 *
 * Visual reference: docs/canva-references/Resume - ICU Registered Nurse.png
 *
 * Two-column layout on a cream surface, split header (photo with
 * green-accent backdrop + teal tint on the left, big navy display
 * name with horizontal-ruled contacts on the right). Sidebar carries
 * the Professional Summary + Education on the same surface as the
 * main column — no sidebar tint. A full-bleed navy footer band runs
 * across the bottom carrying the "Specialized Skills" line.
 *
 * Pairs with the healthcare-bold-icu persona (Maria Santos, BSN RN
 * CCRN — Filipino diaspora critical-care nurse).
 */
export const healthcareBoldIcuNurseV1: TemplateRecipe = {
  id: "healthcare-bold-icu-nurse-v1",
  slug: "healthcare-bold-icu-nurse-v1",
  name: "Bedside",
  version: 1,
  tier: "premium",
  role: "healthcare",
  mood: "bold",
  // Filipino nursing diaspora primary destinations: Gulf states first,
  // then Singapore, UK, Ireland.
  cultural_fit: ["PH", "AE", "SA", "KW", "QA", "SG", "GB", "IE"],

  description:
    "Color-blocked critical-care layout — photo anchor with a green accent block, navy display name, and a full-bleed skills strip along the bottom. Built for ICU nurses, ER staff, and clinical specialists.",
  tagline: "ICU · Color-blocked · Bedside-confident",
  tags: [
    "healthcare",
    "nurse",
    "icu",
    "critical-care",
    "bold",
    "color-blocked",
    "filipino-diaspora",
  ],
  seoKeywords: [
    "ICU nurse resume template",
    "registered nurse CV template",
    "critical care nurse resume",
    "Filipino nurse CV template",
    "Saudi nurse resume",
    "UAE nurse CV template",
  ],

  layout: {
    type: "two-column",
    sidebarPosition: "left",
    sidebarWidthPercent: 35,
    // Same cream surface for both columns — the visual split is the
    // photo + name layout, not a sidebar tint.
    sidebarBg: "theme.surface",
    sidebarPadding: "2.5rem 1.75rem 1.5rem 2rem",
    mainPadding: "2.5rem 2rem 1.5rem 1rem",
    // Full-bleed navy footer band — single-section by Phase 5b-1 Q4.
    footer: {
      bg: "theme.primary",
      fg: "theme.primaryText",
      padding: "1rem 2rem",
      section: "skills",
    },
  },

  header: {
    layout: "split",
    photoShape: "square",
    photoPosition: "sidebar",
    // Muted-green accent block sitting offset behind/beside the photo.
    // Uses theme.accent so the recipe re-skins under any palette
    // (recommended_palette_hint nudges users toward sage/mint).
    photoBackdrop: {
      color: "theme.accent",
      offsetX: -18,
      offsetY: -18,
      width: 110,
      height: 160,
    },
    // Teal-style wash on top of the photo. Multiply mode for screen;
    // printSafe drops the blend mode but keeps the flat-opacity wash
    // (per Phase 5b-1 Q5).
    photoTint: {
      color: "theme.accent",
      mode: "multiply",
      alpha: 0.45,
    },
    align: "left",
    fg: "theme.primary",
    fgSoftRef: { kind: "alpha", ref: "theme.primary", alpha: 0.55 },
    showContacts: true,
    contactsOrientation: "horizontal-ruled",
  },

  sectionHeading: {
    variant: "plain",
    size: "xs",
    // Gray-tan section labels — softer than the navy primary text.
    colorRef: "theme.textSoft",
  },

  blocks: [
    // Sidebar — narrative below the photo
    {
      slot: "sidebar",
      section: "profile",
      variant: { type: "summary", tone: "plain" },
    },
    {
      slot: "sidebar",
      section: "education",
      variant: {
        type: "timeline",
        bulletStyle: "none",
        showDateBadge: false,
      },
    },

    // Main column — clinical experience anchor
    {
      slot: "main",
      section: "experience",
      variant: {
        type: "timeline",
        bulletStyle: "dot",
        showDateBadge: false,
      },
    },
  ],

  decorators: [],

  recommended_palette_hint: {
    themeKeys: ["navy", "forest", "midnight"],
    accentKeys: ["sage", "mint"],
    note: "Reads strongest with a deep navy primary and a muted green or teal accent — the accent re-skins both the photo backdrop and the photo wash.",
  },

  preview_persona_id: "healthcare-bold-icu",
};
