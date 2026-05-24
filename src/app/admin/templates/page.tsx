import { requireFounder } from "@/lib/founder";
import { AdminSubnav } from "@/app/admin/_components/AdminSubnav";
import { JOB_ROLES, getRoleBySlug } from "@/lib/roles";
import { listAllTemplateImagesForAdmin } from "@/lib/template-images";
import { UploadForm } from "./_components/UploadForm";
import { TemplateImageRow } from "./_components/TemplateImageRow";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Templates · Admin · AlmiCV",
};

export default async function AdminTemplatesPage() {
  await requireFounder();

  const rows = await listAllTemplateImagesForAdmin();
  const grouped = new Map<string, typeof rows>();
  for (const r of rows) {
    const list = grouped.get(r.roleSlug) ?? [];
    list.push(r);
    grouped.set(r.roleSlug, list);
  }
  const roleEntries = Array.from(grouped.entries()).sort(([a], [b]) =>
    a.localeCompare(b),
  );

  return (
    <div className="space-y-6">
      <AdminSubnav active="templates" />

      <header className="rounded-2xl border border-peach/40 bg-white p-6 shadow-warm-card">
        <h1 className="font-display text-2xl text-plum">Template gallery</h1>
        <p className="mt-2 max-w-2xl text-sm text-plum-soft">
          Uploaded images surface on /templates and on the per-role hub
          /templates/role/[role-slug]. They sit alongside the code-rendered
          templates from the Studio — they don&apos;t replace them.
        </p>
      </header>

      <UploadForm roles={JOB_ROLES} />

      <section className="rounded-2xl border border-peach/40 bg-white p-6 shadow-warm-card">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="font-display text-lg text-plum">All uploads</h2>
          <span className="text-xs text-plum-faint">
            {rows.length} row{rows.length === 1 ? "" : "s"}
          </span>
        </div>

        {rows.length === 0 ? (
          <p className="mt-4 text-sm text-plum-soft">
            No uploads yet. Use the form above to add some.
          </p>
        ) : (
          <div className="mt-4 space-y-6">
            {roleEntries.map(([roleSlug, list]) => {
              const role = getRoleBySlug(roleSlug);
              return (
                <div key={roleSlug}>
                  <h3 className="text-sm font-semibold text-plum">
                    {role?.name ?? roleSlug}
                    <span className="ml-2 text-xs font-normal text-plum-faint">
                      {list.length}
                    </span>
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {list.map((row) => (
                      <TemplateImageRow key={row.id} row={row} />
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
