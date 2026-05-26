import { requireFounder } from "@/lib/founder";
import { AdminSubnav } from "@/app/admin/_components/AdminSubnav";
import { JOB_ROLES, getRoleBySlug } from "@/lib/roles";
import {
  TEMPLATES,
  suggestTemplate,
} from "@/components/templates/template-registry";

// PNG sunset: the PNG upload form + per-row admin grid were deleted along
// with the TemplateImage data. This page now just surfaces the registry's
// role→template mappings read-only, so founders can spot-check which
// layout each role lands on. To change a mapping, edit the
// `suggestedRoles` array on the relevant entry in
// src/components/templates/template-registry.ts and ship a PR — that's
// the source of truth now.

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Templates · Admin · AlmiCV",
};

export default async function AdminTemplatesPage() {
  await requireFounder();

  // For each template, list every JOB_ROLES entry that suggestTemplate()
  // resolves to it. (Falls through registry order — most-specific first.)
  // Roles that don't match any template's suggestedRoles end up on
  // classic-serif (the registry fallback) and surface there.
  const rolesByTemplate: Map<string, Array<{ slug: string; name: string }>> = new Map();
  for (const t of TEMPLATES) rolesByTemplate.set(t.slug, []);

  let assigned = 0;
  for (const r of JOB_ROLES) {
    const layout = suggestTemplate({ roleSlug: r.slug });
    const list = rolesByTemplate.get(layout.slug);
    if (list) {
      list.push({ slug: r.slug, name: r.name });
      assigned++;
    }
  }

  // Sort the per-template role lists alphabetically for stable display.
  for (const [k, v] of rolesByTemplate) {
    v.sort((a, b) => a.name.localeCompare(b.name));
    rolesByTemplate.set(k, v);
  }

  return (
    <div className="space-y-6">
      <AdminSubnav active="templates" />

      <header className="rounded-2xl border border-peach/40 bg-white p-6 shadow-warm-card">
        <h1 className="font-display text-2xl text-plum">Template registry</h1>
        <p className="mt-2 max-w-2xl text-sm text-plum-soft">
          The PNG-upload flow is retired. AlmiCV now renders {TEMPLATES.length} React
          templates directly from{" "}
          <code className="rounded bg-plum/5 px-1 py-0.5 text-xs">
            src/components/templates/template-registry.ts
          </code>
          . Every one of the {JOB_ROLES.length} JOB_ROLES entries auto-routes to
          one of these layouts via{" "}
          <code className="rounded bg-plum/5 px-1 py-0.5 text-xs">suggestTemplate()</code>.
          {assigned !== JOB_ROLES.length && (
            <span className="ml-1 text-coral">
              ({JOB_ROLES.length - assigned} roles fell back to default.)
            </span>
          )}
        </p>
        <p className="mt-3 text-xs text-plum-faint">
          To change a mapping: edit the <code>suggestedRoles</code> array on the
          relevant template entry, open a PR, ship.
        </p>
      </header>

      <section className="space-y-4">
        {TEMPLATES.map((t) => {
          const roles = rolesByTemplate.get(t.slug) ?? [];
          return (
            <article
              key={t.slug}
              className="rounded-2xl border border-peach/40 bg-white p-6 shadow-warm-card"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-display text-lg text-plum">
                  {t.name}
                  <code className="ml-2 rounded bg-plum/5 px-1.5 py-0.5 text-xs font-normal text-plum-soft">
                    {t.slug}
                  </code>
                </h2>
                <span className="text-xs text-plum-faint">
                  {roles.length} role{roles.length === 1 ? "" : "s"} · {t.category}
                </span>
              </div>
              <p className="mt-1 text-sm text-plum-soft">{t.description}</p>
              {roles.length > 0 ? (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {roles.map((r) => (
                    <li
                      key={r.slug}
                      className="rounded-pill border border-plum/15 bg-plum/5 px-2.5 py-0.5 text-xs text-plum"
                      title={r.slug}
                    >
                      {r.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-xs italic text-plum-faint">
                  No JOB_ROLES currently route here.{" "}
                  <span className="text-plum-soft">
                    Adjust{" "}
                    <code>{t.slug}.suggestedRoles</code>{" "}
                    in the registry to enable.
                  </span>
                </p>
              )}
            </article>
          );
        })}
      </section>

      <footer className="rounded-2xl border border-plum/10 bg-plum/5 p-4 text-xs text-plum-soft">
        <span className="font-semibold text-plum">Suspect data?</span> The
        registry, the editor preview, and the print pipeline all read from the
        same TS source of truth. If a role renders an unexpected layout, check
        the <code>suggestedRoles</code> arrays in the registry — most-specific
        templates win because they appear first.
      </footer>
    </div>
  );
}

// Helper export kept for backwards-compat with any deep links to the old
// "regen all titles" admin action. The action itself was deleted with the
// PNG upload flow; any stale link 404s.
export const __PNG_SUNSET_CHECKED__ = true;
