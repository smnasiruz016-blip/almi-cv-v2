<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:png-sunset-doctrine -->
# Template gallery is registry-driven (PNG sunset 2026-05-26)

AlmiCV's PNG gallery was retired on 2026-05-26. The template gallery, the per-role hub pages (`/templates/role/[roleSlug]`), the home strip, the admin templates view, and the `/cv/new` precedence chain all read from `src/components/templates/template-registry.ts` — the single source of truth. There are no `TemplateImage` rows on prod, no Vercel Blob PNGs, and no admin upload form.

**Future role coverage = registry edits only.** To make a role render a different template, edit the `suggestedRoles` array on the appropriate entry in the registry and ship a PR. To add a new template, drop a `.tsx` file in `src/components/templates/`, import it in `template-registry.ts`, add an entry, and ship. No DB work, no blob work, no admin form.

**Do not reintroduce PNG-upload anything.** If a request implies adding PNG screenshots to the gallery (admin form, image uploads, etc.), flag back to the founder before building — the doctrine here is React-templates-only.
<!-- END:png-sunset-doctrine -->

<!-- BEGIN:theming-variants-doctrine -->
# Theming customization is intentionally per-template (no global picker)

Each of the 20 templates in `template-registry.ts` ships with its own complete design — colors, fonts, accents, layout — all hardcoded. There is no global "Style" picker in the editor today: the one that existed (Theme + Accent + Heading/Body font + Section style + Photo style + Density, ~210 lines in `src/components/editor/CVEditorSidebar.tsx`) was hidden in PR #54 with `{false && …}` because no template consumed `data.style.*` after PR #53 collapsed the Recipe system. The 20 templates from PR #55 carried that forward — they don't consume `data.style` either.

**Users who want different styling = switch templates.** The sidebar carries an informational "Want a different look? Browse 20 templates →" note in the slot where the Style accordion used to sit. Pointing at `/templates`.

## Future work: template-aware theming variants (backlog)

Each registry entry already declares a `themes?: string[]` field (e.g. `themes: ["forest", "ivory", "wine"]` on Healthcare). This is **metadata only — no runtime wiring**. It declares which palettes the template's design would tolerate as variants.

To ship per-template theming variants:

1. Define a small theme shape used by all templates (palette tokens only — fonts/layout stay hardcoded per template):
   ```ts
   // src/lib/cv-themes.ts already has THEMES with this shape, today unused at render time
   type CVTheme = { primary: string; accent: string; muted: string; surface: string; … }
   ```
2. Parametrize each template's color tokens. Currently each template has ~5–10 hardcoded hex values (e.g. CyberGrid's `#5EEAD4` neon cyan). Replace those with theme-prop lookups: `const theme = THEMES[data.style?.themeKey ?? defaultTheme(slug)]; … color: theme.accent …`
3. Wire the Style picker (in `CVEditorSidebar.tsx`, currently behind `{false && …}`) to ONLY show variants declared in the current template's `themes?: string[]` registry field. Avoid bringing back the old "anything goes" picker — CyberGrid in coral defeats the point.
4. Persist via the existing `data.style.themeKey` field on `CVData` (already in the schema, today inert).

Scope estimate: 1–2 days for an experienced contributor. ~100–200 places to touch across 20 templates. The hidden picker code in CVEditorSidebar is reusable (rip out the unused controls — sections style, photo style, density — and keep just Theme + Accent).

When you implement this:
- Remove the "Want a different look?" note from CVEditorSidebar that occupies the Style slot today
- Unhide the Style picker (flip `false &&` → nothing) and trim it down to Theme/Accent only
- Wire each template to read `data.style.themeKey`
- Update this doctrine block to reflect that theming is now live
<!-- END:theming-variants-doctrine -->
