// Studio prompts — Stage 3b.
//
// The system prompt orients Claude on what AlmiCV is, what visual bar to
// hit, what role/mood means, and — most importantly — pins the output
// shape to the TemplateRecipe schema by inlining the bold-clinical-v1
// recipe as a complete, schema-conformant exemplar. The model gets one
// concrete example to mirror; everything else is a delta from there.
//
// Output discipline: respond with strict JSON only. No code fences, no
// commentary, no preamble. The parser tolerates a leading ```json fence
// defensively, but the prompt instructs the model not to emit one.
//
// Variety strategy: MOOD_LAYOUT_SPEC assigns a distinct layout+header
// combination per mood so bold/modern/refined generate structurally
// different CVs rather than anchoring on the exemplar's two-column-left
// pattern. The user prompt injects explicit layout, header.layout, and
// photoPosition values so the model has no ambiguity.

import type { RecipeRole, RecipeMood } from "@/components/templates/engine/recipe-types";

export type RecipeGender = "female" | "male";

// Gender-specific aesthetic overlay — injected into the system prompt so
// the model chooses palette, decorator shapes, and photo frame to match.
const GENDER_AESTHETIC: Record<RecipeGender, string> = {
  female:
    "GENDER AESTHETIC — FEMININE: Palette should feel warm and inviting. " +
    "Preferred accent colors: coral, rose, peach, mauve, sage, dusty lavender, warm terracotta. " +
    "Decorators should be organic — blobs, leaves, wave dividers, soft curves, petal shapes. " +
    "Photo frame: prefer 'rounded', 'soft', or 'circle'. " +
    "Section headings: prefer 'underline' or 'accent-bar' — refined, not aggressive. " +
    "Overall feel: warmth, approachability, human-centered confidence.",
  male:
    "GENDER AESTHETIC — MASCULINE: Palette should feel structured and authoritative. " +
    "Preferred accent colors: navy, steel blue, charcoal, deep forest green, slate, burnt amber. " +
    "Decorators should be geometric — accent-blocks, triangles, hexagons, strong pattern rails. " +
    "Photo frame: prefer 'square', 'hexagon', or 'diamond'. " +
    "Section headings: prefer 'icon-prefix' or 'accent-bar' — structured and direct. " +
    "Overall feel: precision, confidence, technical authority.",
};

const ROLE_VISUAL_LANGUAGE: Record<RecipeRole, string> = {
  healthcare:
    "Healthcare = trust + compassion + clinical precision. Think calm authority, " +
    "credentials clearly readable, room for licenses and certifications. Suitable " +
    "imagery: crosses, shields, soft organic curves, deep blues / forest greens / mints.",
  trades:
    "Trades = strength + structure + reliability. Think confident geometry, hard " +
    "edges, accent blocks behind elements, evidence of certifications and equipment. " +
    "Suitable palette: deep navy / steel / safety orange or amber accents.",
  "customer-service-bpo":
    "Customer Service / BPO = warmth + clarity + multilingual capability. Think " +
    "approachable rounded shapes, prominent skills tags, readable language proficiency " +
    "bars. Suitable palette: warm earth tones, coral accents, soft gradients.",
  "hospitality-chef":
    "Hospitality / Chef = warmth + craft + sensory richness. Think textured " +
    "patterns, expressive accent colors (deep red for spicy-cuisine markets, soft " +
    "muted tones for refined cuisines), photo as a celebrated element.",
  tech:
    "Tech = precision + modernity + clean information density. Think monospaced " +
    "or geometric sans, accent rails, structured grids, code-block-style skills " +
    "presentation. Suitable palette: cool blues, electric accents, minimal noise.",
  "project-management":
    "Project Management = authority + warmth + corporate poise. Think confident " +
    "typographic restraint, editorial accents (asterisk marks, spine rails, " +
    "sun-burst flourishes), two-column body separating delivery work from skills " +
    "and education. Suitable palette: warm orange or terracotta hero with deep " +
    "navy text, muted slate-blue section labels, cream body.",
};

const MOOD_VISUAL_PERSONALITY: Record<RecipeMood, string> = {
  bold:
    "Bold = strong, structured, deeper saturated colors, geometric decorators, " +
    "sans-serif typography, photo positioned with confident block / shape behind it. " +
    "MUST include at least one of: accent-block at page-edge, hero-banner header, " +
    "saturated sidebar with pattern overlay.",
  modern:
    "Modern = clean, contemporary, balanced spacing, neutral base + one confident " +
    "accent color, mix of organic divider and geometric shape decorators, clean " +
    "section heading style. MUST include at least one organic decorator (divider, " +
    "shape, or photo-frame variant) so it doesn't read as 'minimal corporate'.",
  refined:
    "Refined = soft, elegant, warmer palette, serif heading typography, organic " +
    "decorators (curves, leaves, blobs), subtle pattern strips. MUST include at " +
    "least one decorative shape or pattern strip — never grayscale-only.",
};

const PERSONA_BY_ROLE_MOOD: Record<string, string> = {
  "healthcare-bold": "healthcare-bold",
  "healthcare-modern": "healthcare-modern",
  "healthcare-refined": "healthcare-refined",
  "trades-bold": "trades-bold",
  "trades-modern": "trades-modern",
  "trades-refined": "trades-refined",
  "customer-service-bpo-bold": "bpo-bold",
  "customer-service-bpo-modern": "bpo-modern",
  "customer-service-bpo-refined": "bpo-refined",
  "hospitality-chef-bold": "hospitality-bold",
  "hospitality-chef-modern": "hospitality-modern",
  "hospitality-chef-refined": "hospitality-refined",
  "tech-bold": "tech-bold",
  "tech-modern": "tech-modern",
  "tech-refined": "tech-refined",
};

export function getPersonaIdForRoleMood(
  role: RecipeRole,
  mood: RecipeMood,
): string {
  return PERSONA_BY_ROLE_MOOD[`${role}-${mood}`] ?? "healthcare-bold";
}

// Per-mood layout spec — injected into the user prompt verbatim so the
// model gets exact field values rather than prose guidance. This is the
// primary driver of structural variety across generations.
//
//  bold   → two-column, RIGHT sidebar, sidebar-embedded header, photo in sidebar
//  modern → single-column, inset header, photo anchored LEFT
//  refined→ single-column, full-bleed header, photo CENTERED
//
// Rule: every mood picks a layout the bold-clinical-v1 exemplar does NOT
// use — that exemplar is two-column LEFT sidebar, so bold gets right
// sidebar, and the other two go single-column entirely.
type LayoutSpec = {
  layoutBlock: string;
  headerLayout: "full-bleed" | "inset" | "sidebar-embedded";
  photoPosition: "left" | "center" | "right" | "sidebar";
  noteForBlocks: string;
};

const MOOD_LAYOUT_SPEC: Record<RecipeMood, LayoutSpec> = {
  bold: {
    layoutBlock: `"layout": { "type": "two-column", "sidebarPosition": "right", "sidebarWidthPercent": 34, "sidebarBg": "theme.primary", "sidebarPadding": "2rem 1.5rem", "mainPadding": "2.25rem 2rem" }`,
    headerLayout: "sidebar-embedded",
    photoPosition: "sidebar",
    noteForBlocks:
      "Two-column right-sidebar: place profile/experience/education in 'main', " +
      "place skills/certifications/languages in 'sidebar'. Photo is in the right sidebar header.",
  },
  modern: {
    layoutBlock: `"layout": { "type": "single-column", "padding": "2rem 2.5rem", "maxWidth": 760 }`,
    headerLayout: "inset",
    photoPosition: "left",
    noteForBlocks:
      "Single-column: all blocks use slot 'main'. No sidebar slot exists — " +
      "do NOT add any block with slot 'sidebar'.",
  },
  refined: {
    layoutBlock: `"layout": { "type": "single-column", "padding": "2rem 2.5rem", "maxWidth": 760 }`,
    headerLayout: "full-bleed",
    photoPosition: "center",
    noteForBlocks:
      "Single-column: all blocks use slot 'main'. No sidebar slot exists — " +
      "do NOT add any block with slot 'sidebar'.",
  },
};

const EXEMPLAR_RECIPE_JSON = `{
  "id": "healthcare-bold-clinical-v1",
  "slug": "healthcare-bold-clinical-v1",
  "name": "Clinical",
  "version": 1,
  "tier": "premium",
  "role": "healthcare",
  "mood": "bold",
  "cultural_fit": ["US", "GB", "IE", "AU", "NZ", "CA"],
  "description": "Patient-facing healthcare layout — strong sidebar for credentials and licenses, accent rail for at-a-glance scanning, large iconography for ward and recruiter readability.",
  "tagline": "Clinical · Bold · Bedside-confident",
  "tags": ["healthcare", "clinical", "bold", "rn", "md", "credentials"],
  "seoKeywords": ["healthcare CV template", "doctor resume template", "nurse CV template", "medical credentials CV"],
  "layout": {
    "type": "two-column",
    "sidebarPosition": "left",
    "sidebarWidthPercent": 32,
    "sidebarBg": "theme.primary",
    "sidebarPadding": "2rem 1.5rem",
    "mainPadding": "2.25rem 2rem"
  },
  "header": {
    "layout": "sidebar-embedded",
    "photoShape": "circle",
    "photoPosition": "sidebar",
    "align": "center",
    "bg": "theme.primary",
    "fg": "theme.primaryText",
    "showContacts": true,
    "contactsOrientation": "vertical"
  },
  "sectionHeading": {
    "variant": "icon-prefix",
    "size": "sm",
    "iconMap": {
      "profile": "user",
      "experience": "briefcase",
      "education": "graduation-cap",
      "skills": "wrench",
      "certifications": "award",
      "languages": "languages",
      "awards": "star",
      "interests": "heart",
      "projects": "layers"
    }
  },
  "blocks": [
    { "slot": "sidebar", "section": "skills", "variant": { "type": "skills", "style": "tags", "tagBg": { "kind": "alpha", "ref": "theme.accent", "alpha": 0.22 } } },
    { "slot": "sidebar", "section": "certifications", "variant": { "type": "list", "tone": "divided" } },
    { "slot": "sidebar", "section": "languages", "variant": { "type": "languages", "style": "bars", "accentRef": "theme.accent" } },
    { "slot": "main", "section": "profile", "variant": { "type": "summary", "tone": "dropcap" } },
    { "slot": "main", "section": "experience", "variant": { "type": "timeline", "bulletStyle": "dot", "showDateBadge": true, "dateBadgeBg": { "kind": "alpha", "ref": "theme.accent", "alpha": 0.22 } } },
    { "slot": "main", "section": "education", "variant": { "type": "timeline", "bulletStyle": "none", "showDateBadge": false } },
    { "slot": "main", "section": "awards", "variant": { "type": "list", "tone": "divided" } }
  ],
  "decorators": [
    { "kind": "accent-block", "slot": "page-edge-left", "color": "theme.accent", "width": 6, "height": "100%", "offset": { "top": 0, "left": 0 } },
    { "kind": "pattern", "slot": "sidebar-bg", "pattern": "dots", "color": { "kind": "alpha", "ref": "theme.primaryText", "alpha": 0.18 }, "density": "loose", "opacity": 0.5, "width": "100%", "height": "100%", "offset": { "top": 0, "left": 0, "right": 0, "bottom": 0 } }
  ],
  "recommended_palette_hint": {
    "themeKeys": ["navy", "forest", "midnight"],
    "accentKeys": ["mint", "gold"],
    "note": "Reads strongest with a dark medical-confidence theme + a bright contrast accent."
  },
  "preview_persona_id": "healthcare-bold"
}`;

const SCHEMA_RULES = `
SCHEMA — strict. Unrecognized fields cause validation failure. Use ONLY the listed fields and enum values.

TOP-LEVEL fields (all required unless marked ?):
  id              string (lowercase, hyphens, alphanumeric)
  slug            same shape as id, MUST match id
  name            string, short brand name
  version         positive integer (start at 1)
  tier            "free" | "premium"   (use "premium" for any role-themed recipe)
  role            "healthcare" | "trades" | "customer-service-bpo" | "hospitality-chef" | "tech"
  mood            "bold" | "modern" | "refined"
  cultural_fit?   array of ISO-3166 alpha-2 codes (exactly 2 chars: "US", "GB", "PK", etc.)
  description     string, recruiter-facing single sentence
  tagline         string, short brand line, e.g. "Airy · Modern · Patient-first"
  tags?           array of strings
  seoKeywords?    array of strings
  layout          object — see LAYOUT below
  header          object — see HEADER below
  sectionHeading  object — see SECTION-HEADING below
  blocks          array (≥1) of BLOCK objects — see BLOCKS below
  decorators      array of DECORATOR objects — see DECORATORS below; mood rules require ≥1
  recommended_palette_hint?   { themeKeys?, accentKeys?, note? }
  preview_persona_id          string — must be the role-mood id given in the user prompt

LAYOUT — pick ONE shape, do not mix fields between shapes:
  { "type": "single-column", "padding"?: string, "maxWidth"?: positive int }
  OR
  { "type": "two-column", "sidebarPosition": "left" | "right",
    "sidebarWidthPercent": number 20-50,
    "sidebarBg"?: ColorRef, "sidebarPadding"?: string, "mainPadding"?: string }

HEADER — only these fields are valid:
  layout                  "full-bleed" | "inset" | "sidebar-embedded"   (REQUIRED — see ⚠ below)
  photoShape              "circle" | "square" | "rounded" | "hexagon" | "diamond" | "soft"   (REQUIRED — see ⚠ below)
  photoPosition           "left" | "center" | "right" | "sidebar"   (REQUIRED — see ⚠ below)
  align?                  "left" | "center" | "right"
  bg?, fg?, fgSoftRef?    ColorRef
  showContacts?           boolean
  contactsOrientation?    "horizontal" | "vertical" | "grid-2col"
  clipPath?               "none" | "diagonal-bottom" | "arch" | "corner-cut" | "wave-bottom"

  ⚠ PHOTO IS MANDATORY. Every recipe MUST have a header that positions a
    photo as a core design element. This means:
      - header.layout MUST be one of "full-bleed" | "inset" | "sidebar-embedded".
        DO NOT use "none" — that is technically a valid enum value but it's
        forbidden for AlmiCV's competitive bar.
      - header.photoShape MUST be set (pick one of the 6 enum values).
      - header.photoPosition MUST be set (pick one of the 4 enum values).
    For two-column layouts, "photoPosition: sidebar" with "layout: sidebar-embedded"
    works well. For single-column, "photoPosition: center" with "layout: full-bleed"
    or "layout: inset" works well. Hide-the-photo CVs do not pass review.

SECTION-HEADING — only these fields are valid:
  variant                 "plain" | "underline" | "accent-bar" | "icon-prefix"   (REQUIRED)
  size?                   "xs" | "sm" | "md"
  iconMap?                object: { profile?: IconName, experience?: IconName, ... }
  colorRef?, accentRef?   ColorRef
  ⚠ DO NOT add "color", "underlineColor", or any other field — they don't exist.

BLOCKS — array, each item is { section, slot, variant }:
  section   "profile" | "experience" | "education" | "skills" | "projects"
            | "languages" | "awards" | "certifications" | "interests"
  slot      "main" | "sidebar"
  variant   ONE of these strict shapes (discriminated by "type"):

    { "type": "summary", "tone"?: "plain" | "dropcap" }
        — used with section "profile"

    { "type": "timeline",
      "bulletStyle"?: "dot" | "dash" | "none",
      "showDateBadge"?: boolean,
      "dateBadgeBg"?: ColorRef }
        — used with experience, education, projects

    { "type": "skills",
      "style": "plain-list" | "tags" | "bars" | "grouped",
      "tagBg"?: ColorRef, "barAccent"?: ColorRef }
        — used with section "skills"

    { "type": "languages",
      "style": "plain" | "tags" | "bars",
      "accentRef"?: ColorRef }
        — used with section "languages"

    { "type": "list", "tone"?: "plain" | "divided" }
        — used with awards, certifications, interests

DECORATORS — array. Each item is ONE of these strict shapes (discriminated by "kind"):

  { "kind": "accent-block", "slot": Slot, "color": ColorRef,
    "width"?: string|number, "height"?: string|number,
    "rounded"?: "none"|"sm"|"md"|"lg"|"full",
    "opacity"?: 0..1, "offset"?: { top?, left?, right?, bottom? } }

  { "kind": "shape", "slot": Slot, "shape": Shape, "color": ColorRef,
    "width"?: positive number, "height"?: positive number,
    "opacity"?: 0..1, "rotate"?: number,
    "offset"?: { top?, left?, right?, bottom? } }

  { "kind": "pattern", "slot": Slot, "pattern": Pattern, "color": ColorRef,
    "density"?: "loose"|"medium"|"tight",
    "opacity"?: 0..1, "width"?: string|number, "height"?: string|number,
    "offset"?: { top?, left?, right?, bottom? } }

  { "kind": "divider", "between": [section, section, ...] (≥2),
    "slot": "main"|"sidebar", "variant": DividerVariant, "color": ColorRef,
    "thickness"?: positive number, "opacity"?: 0..1 }

  Slot:           "page-edge-left" | "page-edge-right" | "page-edge-top" | "page-edge-bottom"
                  | "header-bg" | "header-corner" | "sidebar-bg" | "sidebar-corner" | "main-corner"
  Shape:          "blob" | "leaf" | "swirl" | "wave" | "arc"
                  | "circle" | "triangle" | "hexagon" | "diamond"
  Pattern:        "dots" | "lines-h" | "lines-v" | "grid" | "diagonal" | "chevron"
  DividerVariant: "wave" | "scribble" | "dotted" | "soft-line" | "leaf-vine"

ColorRef — use one of these forms (NEVER raw hex unless unavoidable):
  "theme.primary" | "theme.primarySoft" | "theme.primaryText"
  | "theme.text" | "theme.textSoft" | "theme.textFaint"
  | "theme.accent" | "theme.surface"
  | { "kind": "alpha", "ref": <one of the above>, "alpha": 0..1 }
  | { "kind": "literal", "hex": "#rrggbb" }

IconName — only these names are valid in iconMap:
  briefcase, graduation-cap, code, wrench, heart, star, award, mail,
  phone, map-pin, globe, link, calendar, user, languages, lightbulb,
  target, layers, book-open, users
`;

function buildSystemPrompt(
  role: RecipeRole,
  mood: RecipeMood,
  gender: RecipeGender,
): string {
  return `You design CV template recipes for AlmiCV — a CV builder competing with Canva and Resume.io for visual quality. Your job is to output a single TemplateRecipe JSON object.

══════════════════════════════════════════
RULE #1 — PHOTO IS MANDATORY
══════════════════════════════════════════
Every generated recipe MUST include a candidate photo as a core design element.
- header.layout MUST be "full-bleed", "inset", or "sidebar-embedded" — NEVER "none"
- header.photoShape MUST be set to one of the 6 valid values
- header.photoPosition MUST be set to one of the 4 valid values
A recipe with no photo, or with header.layout "none", fails review and is discarded.
The user prompt specifies exactly which header.layout and photoPosition to use — follow them exactly.

══════════════════════════════════════════
RULE #2 — VISUAL QUALITY BAR
══════════════════════════════════════════
Visually rich, role-specific, mood-distinct. NEVER generic minimal corporate. NEVER all-grayscale.
Decorators (shapes, accent-blocks, patterns, dividers) are REQUIRED — they separate AlmiCV from a Word document.

ROLE — ${role}:
${ROLE_VISUAL_LANGUAGE[role]}

MOOD — ${mood}:
${MOOD_VISUAL_PERSONALITY[mood]}

${GENDER_AESTHETIC[gender]}

══════════════════════════════════════════
EXEMPLAR — JSON STRUCTURE ONLY
══════════════════════════════════════════
Study the field names, ColorRef format, block variant shapes, and decorator kinds.
DO NOT copy its visual layout — you will be given a different layout in the user prompt.
The exemplar uses: two-column, left sidebar, sidebar-embedded header, circle photo in sidebar.
Your generation MUST use the layout specified in the user prompt instead.

${EXEMPLAR_RECIPE_JSON}

${SCHEMA_RULES}

OUTPUT FORMAT:
- Output ONLY the JSON object. No prose, no markdown code fences, no preamble.
- Start with { and end with }.
- The slug encodes role-mood-gender-style-version, e.g. "healthcare-modern-f-airy-v1" or "trades-bold-m-slate-v1".
- Use unique style descriptors (Airy, Steady, Crisp, Lattice, Calm, Bloom, Slate, Arc, etc.) — never reuse "Clinical".
- ⚠ STRICT SCHEMA: Do not invent fields. Unrecognized keys cause validation failure. Use enum values verbatim.`;
}

function buildUserPrompt(
  role: RecipeRole,
  mood: RecipeMood,
  gender: RecipeGender,
): string {
  const personaId = getPersonaIdForRoleMood(role, mood);
  const spec = MOOD_LAYOUT_SPEC[mood];
  // Steer photoShape toward gender-appropriate defaults while allowing creative freedom.
  const photoShapeHint =
    gender === "female"
      ? "prefer: rounded | soft | circle"
      : "prefer: square | hexagon | diamond";
  return `Generate one TemplateRecipe for role="${role}" mood="${mood}" gender="${gender}".

REQUIRED LAYOUT (use these exact values — do not deviate):
  ${spec.layoutBlock}

REQUIRED HEADER (set exactly):
  header.layout = "${spec.headerLayout}"
  header.photoPosition = "${spec.photoPosition}"
  header.photoShape = [your creative choice — ${photoShapeHint}]
  header.showContacts = true

BLOCKS NOTE: ${spec.noteForBlocks}

Set preview_persona_id to "${personaId}".
Set version to 1.
Use a fresh slug different from "healthcare-bold-clinical-v1".

Respond with the JSON object only. No commentary.`;
}

export type RecipePrompt = {
  systemPrompt: string;
  userPrompt: string;
};

export function buildRecipePrompt(
  role: RecipeRole,
  mood: RecipeMood,
  gender: RecipeGender = "female",
): RecipePrompt {
  return {
    systemPrompt: buildSystemPrompt(role, mood, gender),
    userPrompt: buildUserPrompt(role, mood, gender),
  };
}
