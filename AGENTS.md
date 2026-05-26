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
