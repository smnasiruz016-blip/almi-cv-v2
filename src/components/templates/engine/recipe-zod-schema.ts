// Zod schema mirror of TemplateRecipe (recipe-types.ts).
//
// Stage 3b: Anthropic generates structured JSON for proposed recipe
// variants. Before any of that JSON gets persisted into the Recipe
// Prisma table or rendered through renderRecipe(), it MUST pass this
// validator. The contract is: the engine assumes valid TemplateRecipe
// shape; if the model emits anything else, the validator returns the
// list of failures and the row never lands.
//
// Keep this file in lockstep with recipe-types.ts. When the recipe
// schema gains a new variant or field, add it here too — silently
// accepting unknown fields would let bad shapes through to the
// renderer.
//
// The schema is strict by default (`.strict()`) so unrecognized keys
// cause failure rather than being dropped.

import { z } from "zod";
import { ICON_ALLOWLIST } from "@/components/templates/primitives/icons";
import type { TemplateRecipe } from "./recipe-types";

const ICON_NAMES = Object.keys(ICON_ALLOWLIST) as [string, ...string[]];

const themeColorKey = z.enum([
  "theme.primary",
  "theme.primarySoft",
  "theme.primaryText",
  "theme.text",
  "theme.textSoft",
  "theme.textFaint",
  "theme.accent",
  "theme.surface",
]);

// ColorRef = ThemeColorKey | { kind: "alpha"; ref; alpha } | { kind: "literal"; hex }
const colorRefSchema = z.union([
  themeColorKey,
  z
    .object({
      kind: z.literal("alpha"),
      ref: themeColorKey,
      alpha: z.number().min(0).max(1),
    })
    .strict(),
  z
    .object({
      kind: z.literal("literal"),
      hex: z.string().regex(/^#[0-9a-fA-F]{3,8}$/),
    })
    .strict(),
]);

const sectionKey = z.enum([
  "profile",
  "experience",
  "education",
  "skills",
  "projects",
  "languages",
  "awards",
  "certifications",
  "interests",
]);

const iconName = z.enum(ICON_NAMES);

const sectionHeadingSpecSchema = z
  .object({
    variant: z.enum(["plain", "underline", "accent-bar", "icon-prefix"]),
    size: z.enum(["xs", "sm", "md"]).optional(),
    iconMap: z.record(sectionKey, iconName).optional(),
    colorRef: colorRefSchema.optional(),
    accentRef: colorRefSchema.optional(),
  })
  .strict();

// SectionVariant — discriminated by `type`
const sectionVariantSchema = z.discriminatedUnion("type", [
  z
    .object({
      type: z.literal("summary"),
      tone: z.enum(["plain", "dropcap"]).optional(),
    })
    .strict(),
  z
    .object({
      type: z.literal("timeline"),
      bulletStyle: z.enum(["dot", "dash", "none"]).optional(),
      showDateBadge: z.boolean().optional(),
      dateBadgeBg: colorRefSchema.optional(),
    })
    .strict(),
  z
    .object({
      type: z.literal("skills"),
      style: z.enum(["plain-list", "tags", "bars", "grouped"]),
      tagBg: colorRefSchema.optional(),
      barAccent: colorRefSchema.optional(),
    })
    .strict(),
  z
    .object({
      type: z.literal("languages"),
      style: z.enum(["plain", "tags", "bars"]),
      accentRef: colorRefSchema.optional(),
    })
    .strict(),
  z
    .object({
      type: z.literal("list"),
      tone: z.enum(["plain", "divided"]).optional(),
    })
    .strict(),
]);

const recipeBlockSchema = z
  .object({
    section: sectionKey,
    slot: z.enum(["main", "sidebar"]),
    variant: sectionVariantSchema,
  })
  .strict();

// RecipeLayout — discriminated by `type`
const recipeLayoutSchema = z.discriminatedUnion("type", [
  z
    .object({
      type: z.literal("single-column"),
      padding: z.string().optional(),
      maxWidth: z.number().int().positive().optional(),
    })
    .strict(),
  z
    .object({
      type: z.literal("two-column"),
      sidebarPosition: z.enum(["left", "right"]),
      sidebarWidthPercent: z.number().min(20).max(50),
      sidebarBg: colorRefSchema.optional(),
      sidebarPadding: z.string().optional(),
      mainPadding: z.string().optional(),
    })
    .strict(),
]);

const photoFrameShape = z.enum([
  "circle",
  "square",
  "rounded",
  "hexagon",
  "diamond",
  "soft",
]);

const heroBannerClipPath = z.enum([
  "none",
  "diagonal-bottom",
  "arch",
  "corner-cut",
  "wave-bottom",
]);

const recipeHeaderSchema = z
  .object({
    layout: z.enum(["full-bleed", "inset", "sidebar-embedded", "none"]),
    photoShape: photoFrameShape.optional(),
    photoPosition: z
      .enum(["left", "center", "right", "sidebar"])
      .optional(),
    align: z.enum(["left", "center", "right"]).optional(),
    bg: colorRefSchema.optional(),
    fg: colorRefSchema.optional(),
    fgSoftRef: colorRefSchema.optional(),
    showContacts: z.boolean().optional(),
    contactsOrientation: z
      .enum(["horizontal", "vertical", "grid-2col"])
      .optional(),
    clipPath: heroBannerClipPath.optional(),
  })
  .strict();

const decoratorSlot = z.enum([
  "page-edge-left",
  "page-edge-right",
  "page-edge-top",
  "page-edge-bottom",
  "header-bg",
  "header-corner",
  "sidebar-bg",
  "sidebar-corner",
  "main-corner",
]);

const decorativeShapeKind = z.enum([
  "blob",
  "leaf",
  "swirl",
  "wave",
  "arc",
  "circle",
  "triangle",
  "hexagon",
  "diamond",
]);

const patternStripPattern = z.enum([
  "dots",
  "lines-h",
  "lines-v",
  "grid",
  "diagonal",
  "chevron",
]);

const patternStripDensity = z.enum(["loose", "medium", "tight"]);

const organicDividerVariant = z.enum([
  "wave",
  "scribble",
  "dotted",
  "soft-line",
  "leaf-vine",
]);

const offsetSchema = z
  .object({
    top: z.number().optional(),
    left: z.number().optional(),
    right: z.number().optional(),
    bottom: z.number().optional(),
  })
  .strict()
  .optional();

// DecoratorSpec — discriminated by `kind`
const decoratorSpecSchema = z.discriminatedUnion("kind", [
  z
    .object({
      kind: z.literal("accent-block"),
      slot: decoratorSlot,
      color: colorRefSchema,
      width: z.union([z.string(), z.number()]).optional(),
      height: z.union([z.string(), z.number()]).optional(),
      rounded: z.enum(["none", "sm", "md", "lg", "full"]).optional(),
      opacity: z.number().min(0).max(1).optional(),
      offset: offsetSchema,
    })
    .strict(),
  z
    .object({
      kind: z.literal("shape"),
      slot: decoratorSlot,
      shape: decorativeShapeKind,
      color: colorRefSchema,
      width: z.number().positive().optional(),
      height: z.number().positive().optional(),
      opacity: z.number().min(0).max(1).optional(),
      rotate: z.number().optional(),
      offset: offsetSchema,
    })
    .strict(),
  z
    .object({
      kind: z.literal("pattern"),
      slot: decoratorSlot,
      pattern: patternStripPattern,
      color: colorRefSchema,
      density: patternStripDensity.optional(),
      opacity: z.number().min(0).max(1).optional(),
      width: z.union([z.string(), z.number()]).optional(),
      height: z.union([z.string(), z.number()]).optional(),
      offset: offsetSchema,
    })
    .strict(),
  z
    .object({
      kind: z.literal("divider"),
      between: z.array(sectionKey).min(2),
      slot: z.enum(["main", "sidebar"]),
      variant: organicDividerVariant,
      color: colorRefSchema,
      thickness: z.number().positive().optional(),
      opacity: z.number().min(0).max(1).optional(),
    })
    .strict(),
]);

const recipePaletteHintSchema = z
  .object({
    themeKeys: z.array(z.string()).optional(),
    accentKeys: z.array(z.string()).optional(),
    note: z.string().optional(),
  })
  .strict();

export const templateRecipeSchema = z
  .object({
    id: z.string().min(1),
    slug: z
      .string()
      .min(1)
      .regex(
        /^[a-z0-9-]+$/,
        "slug must be lowercase alphanumeric with hyphens",
      ),
    name: z.string().min(1),
    version: z.number().int().positive(),
    tier: z.enum(["free", "premium"]),
    role: z
      .enum([
        "healthcare",
        "trades",
        "customer-service-bpo",
        "hospitality-chef",
        "tech",
      ])
      .optional(),
    mood: z.enum(["bold", "modern", "refined"]).optional(),
    cultural_fit: z
      .array(
        z
          .string()
          .length(2, "cultural_fit entries must be ISO 3166-1 alpha-2"),
      )
      .optional(),
    description: z.string().min(1),
    tagline: z.string(),
    thumbnail: z.string().optional(),
    tags: z.array(z.string()).optional(),
    seoKeywords: z.array(z.string()).optional(),
    layout: recipeLayoutSchema,
    header: recipeHeaderSchema,
    sectionHeading: sectionHeadingSpecSchema,
    blocks: z.array(recipeBlockSchema).min(1),
    decorators: z.array(decoratorSpecSchema),
    recommended_palette_hint: recipePaletteHintSchema.optional(),
    preview_persona_id: z.string().min(1),
    addedAt: z.string().min(1),
  })
  .strict();

export type ValidationResult =
  | { ok: true; recipe: TemplateRecipe }
  | { ok: false; errors: string[] };

/**
 * Single entrypoint for validating arbitrary JSON against the recipe
 * schema. Returns the typed recipe on success, or a flat list of
 * human-readable error strings on failure.
 *
 * Intentionally returns errors as strings (not ZodError) so the
 * Studio UI can display them without depending on Zod internals.
 */
export function validateRecipe(json: unknown): ValidationResult {
  const result = templateRecipeSchema.safeParse(json);
  if (result.success) {
    return { ok: true, recipe: result.data as TemplateRecipe };
  }
  const errors = result.error.issues.map((issue) => {
    const path = issue.path.length > 0 ? issue.path.join(".") : "<root>";
    return `${path}: ${issue.message}`;
  });
  return { ok: false, errors };
}
