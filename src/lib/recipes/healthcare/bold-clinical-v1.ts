import type { TemplateRecipe } from "@/components/templates/engine/recipe-types";

/**
 * Healthcare / Bold / Clinical v1.
 *
 * Sidebar-embedded portrait header on a saturated primary band, with an
 * accent rail running down the page edge for at-a-glance scanning. Big
 * iconography and tag-style skills make the credentials list pop at
 * print sizes that recruiters typically print on (8.5×11 / A4).
 *
 * Pairs with healthcare-bold persona (Dr. James Okafor, ER Surgeon).
 */
export const healthcareBoldClinicalV1: TemplateRecipe = {
  id: "healthcare-bold-clinical-v1",
  slug: "healthcare-bold-clinical-v1",
  name: "Clinical",
  version: 1,
  tier: "premium",
  role: "healthcare",
  mood: "bold",
  cultural_fit: ["US", "GB", "IE", "AU", "NZ", "CA"],

  description:
    "Patient-facing healthcare layout — strong sidebar for credentials and licenses, accent rail for at-a-glance scanning, large iconography for ward and recruiter readability.",
  tagline: "Clinical · Bold · Bedside-confident",
  tags: ["healthcare", "clinical", "bold", "rn", "md", "credentials"],
  seoKeywords: [
    "healthcare CV template",
    "doctor resume template",
    "nurse CV template",
    "medical credentials CV",
  ],

  layout: {
    type: "two-column",
    sidebarPosition: "left",
    sidebarWidthPercent: 32,
    sidebarBg: "theme.primary",
    sidebarPadding: "2rem 1.5rem",
    mainPadding: "2.25rem 2rem",
  },

  header: {
    layout: "sidebar-embedded",
    photoShape: "circle",
    photoPosition: "sidebar",
    align: "center",
    bg: "theme.primary",
    fg: "theme.primaryText",
    showContacts: true,
    contactsOrientation: "vertical",
  },

  sectionHeading: {
    variant: "icon-prefix",
    size: "sm",
    iconMap: {
      profile: "user",
      experience: "briefcase",
      education: "graduation-cap",
      skills: "wrench",
      certifications: "award",
      languages: "languages",
      awards: "star",
      interests: "heart",
      projects: "layers",
    },
  },

  blocks: [
    // Sidebar — credentials + skills + languages on the saturated band
    {
      slot: "sidebar",
      section: "skills",
      variant: {
        type: "skills",
        style: "tags",
        tagBg: { kind: "alpha", ref: "theme.accent", alpha: 0.22 },
      },
    },
    {
      slot: "sidebar",
      section: "certifications",
      variant: { type: "list", tone: "divided" },
    },
    {
      slot: "sidebar",
      section: "languages",
      variant: {
        type: "languages",
        style: "bars",
        accentRef: "theme.accent",
      },
    },

    // Main column — narrative
    {
      slot: "main",
      section: "profile",
      variant: { type: "summary", tone: "dropcap" },
    },
    {
      slot: "main",
      section: "experience",
      variant: {
        type: "timeline",
        bulletStyle: "dot",
        showDateBadge: true,
        dateBadgeBg: { kind: "alpha", ref: "theme.accent", alpha: 0.22 },
      },
    },
    {
      slot: "main",
      section: "education",
      variant: {
        type: "timeline",
        bulletStyle: "none",
        showDateBadge: false,
      },
    },
    {
      slot: "main",
      section: "awards",
      variant: { type: "list", tone: "divided" },
    },
  ],

  decorators: [
    // Vertical accent rail on the page's left edge — survives print mode
    // (AccentBlock is a flat colored rectangle).
    {
      kind: "accent-block",
      slot: "page-edge-left",
      color: "theme.accent",
      width: 6,
      height: "100%",
      offset: { top: 0, left: 0 },
    },
    // Subtle dot pattern washed across the sidebar background. Becomes a
    // 11% opacity flat band when printSafe.
    {
      kind: "pattern",
      slot: "sidebar-bg",
      pattern: "dots",
      color: { kind: "alpha", ref: "theme.primaryText", alpha: 0.18 },
      density: "loose",
      opacity: 0.5,
      width: "100%",
      height: "100%",
      offset: { top: 0, left: 0, right: 0, bottom: 0 },
    },
  ],

  recommended_palette_hint: {
    themeKeys: ["navy", "forest", "midnight"],
    accentKeys: ["mint", "gold"],
    note: "Reads strongest with a dark medical-confidence theme + a bright contrast accent.",
  },

  preview_persona_id: "healthcare-bold",

  addedAt: "2026-05-08T19:29:54Z",
};
