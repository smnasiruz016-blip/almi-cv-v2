import type { IconName } from "@/components/templates/primitives/icons";
import type { OrganicDividerVariant } from "@/components/templates/primitives/decorators/OrganicDivider";
import type { PhotoFrameShape } from "@/components/templates/primitives/decorators/PhotoFrame";
import type { HeroBannerClipPath } from "@/components/templates/primitives/decorators/HeroBanner";
import type {
  PatternStripPattern,
  PatternStripDensity,
} from "@/components/templates/primitives/decorators/PatternStrip";
import type { DecorativeShapeKind } from "@/components/templates/primitives/decorators/DecorativeShape";

/**
 * Recipe schema — Stage 2 of the template factory.
 *
 * A Recipe describes only what the user CANNOT change. Anything in
 * CVData.style (theme, accent, fonts, density, photo style, section
 * heading style) is read live at render time via resolveStyle(). Recipes
 * encode template-level structural choices (layout, section order,
 * decorations, mood-bound color rules).
 *
 * Identity discipline: bumping a recipe's visuals = new slug (`-v2`),
 * never mutate v1 in place. Stored CVs reference recipes by slug, so
 * silently re-styling a user's saved CV is forbidden.
 */

export type RecipeRole =
  | "healthcare"
  | "trades"
  | "customer-service-bpo"
  | "hospitality-chef"
  | "tech";

export type RecipeMood = "bold" | "modern" | "refined";

export type RecipeTier = "free" | "premium";

/** ISO-3166 alpha-2 country code. Internal-only metadata; surfaced on
 * /jobs/<country> recommendations, never on the public /templates list. */
export type CulturalFitISO = string;

/** Reference into resolveStyle()'s output. Resolved to a hex/rgba string
 * by render-recipe.ts at render time. The "alpha" form lets recipes
 * say "the accent at 18% opacity" without baking a literal hex. */
export type ColorRef =
  | "theme.primary"
  | "theme.primarySoft"
  | "theme.primaryText"
  | "theme.text"
  | "theme.textSoft"
  | "theme.textFaint"
  | "theme.accent"
  | "theme.surface"
  | { kind: "alpha"; ref: ThemeColorKey; alpha: number }
  | { kind: "literal"; hex: string };

export type ThemeColorKey =
  | "theme.primary"
  | "theme.primarySoft"
  | "theme.primaryText"
  | "theme.text"
  | "theme.textSoft"
  | "theme.textFaint"
  | "theme.accent"
  | "theme.surface";

export type SectionKey =
  | "profile"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "languages"
  | "awards"
  | "certifications"
  | "interests";

export type SectionHeadingVariant =
  | "plain"
  | "underline"
  | "accent-bar"
  | "icon-prefix";

export type SectionHeadingSpec = {
  variant: SectionHeadingVariant;
  size?: "xs" | "sm" | "md";
  iconMap?: Partial<Record<SectionKey, IconName>>;
  /** When set, forces section heading color to this ref instead of
   * inheriting theme.text. Mood-specific. */
  colorRef?: ColorRef;
  /** Likewise for the heading's accent (icon, underline, bar). Defaults
   * to theme.accent when omitted. */
  accentRef?: ColorRef;
};

/** Per-section variant specs. The render engine switches on `type` and
 * picks the right primitive. */
export type SectionVariant =
  | { type: "summary"; tone?: "plain" | "dropcap" }
  | {
      type: "timeline";
      bulletStyle?: "dot" | "dash" | "none";
      showDateBadge?: boolean;
      dateBadgeBg?: ColorRef;
    }
  | {
      type: "skills";
      style: "plain-list" | "tags" | "bars" | "grouped";
      tagBg?: ColorRef;
      barAccent?: ColorRef;
    }
  | {
      type: "languages";
      style: "plain" | "tags" | "bars";
      accentRef?: ColorRef;
    }
  | { type: "list"; tone?: "plain" | "divided" };

export type RecipeBlock = {
  section: SectionKey;
  slot: "main" | "sidebar";
  variant: SectionVariant;
};

export type RecipeLayout =
  | {
      type: "single-column";
      padding?: string;
      maxWidth?: number;
    }
  | {
      type: "two-column";
      sidebarPosition: "left" | "right";
      sidebarWidthPercent: number;
      sidebarBg?: ColorRef;
      sidebarPadding?: string;
      mainPadding?: string;
    };

export type RecipeHeader = {
  layout: "full-bleed" | "inset" | "sidebar-embedded" | "none";
  photoShape?: PhotoFrameShape;
  photoPosition?: "left" | "center" | "right" | "sidebar";
  align?: "left" | "center" | "right";
  bg?: ColorRef;
  fg?: ColorRef;
  fgSoftRef?: ColorRef;
  showContacts?: boolean;
  contactsOrientation?: "horizontal" | "vertical" | "grid-2col";
  /** Optional clip-path for the header. Disabled when printSafe=true. */
  clipPath?: HeroBannerClipPath;
};

/** Decorators are floating visual elements placed into named slots. The
 * render engine knows where each slot lives (page edge, header
 * background, sidebar background, etc.). Print-safe transformation is
 * automatic — each decorator primitive honors its own printSafe rule. */
export type DecoratorSpec =
  | {
      kind: "accent-block";
      slot: DecoratorSlot;
      color: ColorRef;
      width?: string | number;
      height?: string | number;
      rounded?: "none" | "sm" | "md" | "lg" | "full";
      opacity?: number;
      offset?: { top?: number; left?: number; right?: number; bottom?: number };
    }
  | {
      kind: "shape";
      slot: DecoratorSlot;
      shape: DecorativeShapeKind;
      color: ColorRef;
      width?: number;
      height?: number;
      opacity?: number;
      rotate?: number;
      offset?: { top?: number; left?: number; right?: number; bottom?: number };
    }
  | {
      kind: "pattern";
      slot: DecoratorSlot;
      pattern: PatternStripPattern;
      color: ColorRef;
      density?: PatternStripDensity;
      opacity?: number;
      width?: string | number;
      height?: string | number;
      offset?: { top?: number; left?: number; right?: number; bottom?: number };
    }
  | {
      kind: "divider";
      between: SectionKey[];
      slot: "main" | "sidebar";
      variant: OrganicDividerVariant;
      color: ColorRef;
      thickness?: number;
      opacity?: number;
    };

export type DecoratorSlot =
  | "page-edge-left"
  | "page-edge-right"
  | "page-edge-top"
  | "page-edge-bottom"
  | "header-bg"
  | "header-corner"
  | "sidebar-bg"
  | "sidebar-corner"
  | "main-corner";

export type RecipePaletteHint = {
  /** A textual hint for storefront/marketing copy: "Works best with
   * Forest + Gold accent." Not enforced — users can pick anything. */
  themeKeys?: string[];
  accentKeys?: string[];
  note?: string;
};

export type TemplateRecipe = {
  // identity
  id: string;
  slug: string;
  name: string;
  version: number;
  tier: RecipeTier;
  role?: RecipeRole;
  mood?: RecipeMood;
  cultural_fit?: CulturalFitISO[];

  // metadata for storefront / SEO
  description: string;
  tagline: string;
  thumbnail?: string;
  tags?: string[];
  seoKeywords?: string[];

  // visual blueprint
  layout: RecipeLayout;
  header: RecipeHeader;
  sectionHeading: SectionHeadingSpec;
  blocks: RecipeBlock[];
  decorators: DecoratorSpec[];
  recommended_palette_hint?: RecipePaletteHint;

  // pairing
  preview_persona_id: string;
};
