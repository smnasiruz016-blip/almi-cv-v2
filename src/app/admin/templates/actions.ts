"use server";

import { revalidatePath } from "next/cache";
import { put, del } from "@vercel/blob";
import { requireFounder } from "@/lib/founder";
import { prisma } from "@/lib/db";
import { JOB_ROLES } from "@/lib/roles";
import { isNumericLikeTitle, slugifyTitle } from "@/lib/template-images";

const MAX_FILE_BYTES = 8 * 1024 * 1024;
const ACCEPTED_PREFIX = "image/";

export type UploadResult =
  | { ok: true; created: number }
  | { ok: false; error: string };

export async function uploadTemplateImages(
  formData: FormData,
): Promise<UploadResult> {
  try {
    await requireFounder();

    // The form submits the role NAME (the datalist input is name-valued
    // for readable post-selection UX); resolve to a canonical role here.
    // Match is case-insensitive against role.name and any aliases — both
    // of which originate from JOB_ROLES in src/lib/roles.ts, so the
    // strict-against-roles.ts invariant is preserved.
    const roleNameInput = String(formData.get("roleName") ?? "").trim();
    if (!roleNameInput) {
      return { ok: false, error: "Pick a role." };
    }
    const q = roleNameInput.toLowerCase();
    const role = JOB_ROLES.find(
      (r) =>
        r.name.toLowerCase() === q ||
        (r.aliases ?? []).some((a) => a.toLowerCase() === q),
    );
    if (!role) {
      return { ok: false, error: `Unknown role: ${roleNameInput}` };
    }
    const roleSlug = role.slug;

    const files = formData.getAll("files").filter((f): f is File => f instanceof File);
    const titles = formData.getAll("titles").map((t) => String(t));

    if (files.length === 0) {
      return { ok: false, error: "No files provided." };
    }
    if (titles.length !== files.length) {
      return { ok: false, error: "Title/file count mismatch." };
    }

    let created = 0;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const rawTitle = (titles[i] ?? "").trim();
      if (!rawTitle) {
        return { ok: false, error: `Missing title for ${file.name}.` };
      }
      if (!file.type.startsWith(ACCEPTED_PREFIX)) {
        return { ok: false, error: `${file.name} is not an image.` };
      }
      if (file.size > MAX_FILE_BYTES) {
        return {
          ok: false,
          error: `${file.name} exceeds 8MB.`,
        };
      }

      const baseSlug = slugifyTitle(rawTitle);
      // Guard against Canva-style numeric filenames sneaking through if
      // the founder hasn't edited the title field — "1.png" → title="1"
      // → slug="1". Reject before writing to Blob so we don't leave
      // orphaned blobs behind.
      if (!baseSlug || isNumericLikeTitle(baseSlug)) {
        return {
          ok: false,
          error: `Title "${rawTitle}" produces a numeric-only slug. Use a descriptive title (e.g. "${role.name} Design 1").`,
        };
      }
      const slug = await uniqueSlug(baseSlug);
      const ext = file.name.match(/\.[^.]+$/)?.[0] ?? "";
      const blobPath = `template-images/${roleSlug}/${slug}${ext}`;
      const blob = await put(blobPath, file, {
        access: "public",
        addRandomSuffix: false,
      });

      await prisma.templateImage.create({
        data: {
          title: rawTitle,
          slug,
          roleSlug,
          imageUrl: blob.url,
          filenameOriginal: file.name,
        },
      });
      created++;
    }

    revalidatePath("/admin/templates");
    return { ok: true, created };
  } catch (err) {
    console.error("uploadTemplateImages failed", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Upload failed.",
    };
  }
}

export async function setTemplateImageActive(
  id: string,
  active: boolean,
): Promise<void> {
  await requireFounder();
  await prisma.templateImage.update({ where: { id }, data: { active } });
  revalidatePath("/admin/templates");
}

export async function updateTemplateImageTitle(
  id: string,
  title: string,
): Promise<{ ok: boolean; error?: string }> {
  await requireFounder();
  const trimmed = title.trim();
  if (!trimmed) return { ok: false, error: "Title cannot be empty." };
  await prisma.templateImage.update({
    where: { id },
    data: { title: trimmed },
  });
  revalidatePath("/admin/templates");
  return { ok: true };
}

export async function deleteTemplateImage(id: string): Promise<void> {
  await requireFounder();
  const row = await prisma.templateImage.findUnique({ where: { id } });
  if (!row) return;
  try {
    await del(row.imageUrl);
  } catch (err) {
    // Blob delete failures are non-fatal — the DB row is the source of
    // truth for what's visible. An orphaned blob costs storage but
    // doesn't break the gallery.
    console.warn("Blob delete failed for", row.imageUrl, err);
  }
  await prisma.templateImage.delete({ where: { id } });
  revalidatePath("/admin/templates");
}

async function uniqueSlug(base: string): Promise<string> {
  let candidate = base;
  let n = 2;
  while (await prisma.templateImage.findUnique({ where: { slug: candidate } })) {
    candidate = `${base}-${n}`;
    n++;
  }
  return candidate;
}

export type RegenResult =
  | {
      ok: true;
      updated: number;
      perRole: Array<{ roleSlug: string; roleName: string; count: number }>;
    }
  | { ok: false; error: string };

// One-shot fix for the 243 Canva uploads with numeric titles. Idempotent:
// re-running is safe because rows already given good titles no longer
// match isNumericLikeTitle and are skipped. The whole batch runs inside
// a single prisma.$transaction so a mid-flight failure leaves no half-
// updated state. The backup table (created in migration
// 20260525000000_fix_numeric_titles) is the second safety net.
export async function regenerateAllNumericTitles(): Promise<RegenResult> {
  return regenerateNumericTitlesScoped(null);
}

// Per-role bonus button — same logic, scoped to one roleSlug. Useful
// after future bulk uploads if a single batch lands with bad titles.
export async function regenerateTitlesForRole(
  roleSlug: string,
): Promise<RegenResult> {
  return regenerateNumericTitlesScoped(roleSlug);
}

async function regenerateNumericTitlesScoped(
  scopeRoleSlug: string | null,
): Promise<RegenResult> {
  try {
    await requireFounder();

    const where = scopeRoleSlug ? { roleSlug: scopeRoleSlug } : undefined;
    const allRowsInScope = await prisma.templateImage.findMany({
      where,
      orderBy: [{ roleSlug: "asc" }, { createdAt: "asc" }],
    });

    const numericRows = allRowsInScope.filter((r) =>
      isNumericLikeTitle(r.title),
    );
    if (numericRows.length === 0) {
      return { ok: true, updated: 0, perRole: [] };
    }

    // For collision-safety the candidate slug must not conflict with
    // any slug we are KEEPING (non-numeric existing rows, anywhere in
    // the table — not just in scope) nor with any slug already assigned
    // earlier in this regen batch.
    const allDbRows = scopeRoleSlug
      ? await prisma.templateImage.findMany({
          select: { slug: true, title: true },
        })
      : allRowsInScope;
    const reservedSlugs = new Set(
      allDbRows
        .filter((r) => !isNumericLikeTitle(r.title))
        .map((r) => r.slug),
    );

    // Group by role for sequential numbering within each role.
    const byRole = new Map<string, typeof numericRows>();
    for (const r of numericRows) {
      const list = byRole.get(r.roleSlug) ?? [];
      list.push(r);
      byRole.set(r.roleSlug, list);
    }

    type Update = { id: string; title: string; slug: string };
    const updates: Update[] = [];
    const perRole: Array<{ roleSlug: string; roleName: string; count: number }> = [];

    for (const [roleSlug, rows] of byRole) {
      const role = JOB_ROLES.find((r) => r.slug === roleSlug);
      if (!role) {
        return {
          ok: false,
          error: `Database row has unknown roleSlug: ${roleSlug}. Aborting before any writes.`,
        };
      }

      // Position offset: existing non-numeric rows in THIS role already
      // hold the low numbers conceptually. Start fresh at 1 and let any
      // collisions be resolved by appending `-2`, `-3` via uniqueSlug-
      // style logic below.
      rows.forEach((row, idx) => {
        const position = idx + 1;
        const newTitle = `${role.name} Design ${position}`;
        let candidate = slugifyTitle(newTitle);
        let n = 2;
        while (reservedSlugs.has(candidate)) {
          candidate = `${slugifyTitle(newTitle)}-${n}`;
          n++;
        }
        reservedSlugs.add(candidate);
        updates.push({ id: row.id, title: newTitle, slug: candidate });
      });

      perRole.push({ roleSlug, roleName: role.name, count: rows.length });
    }

    await prisma.$transaction(
      updates.map((u) =>
        prisma.templateImage.update({
          where: { id: u.id },
          data: { title: u.title, slug: u.slug },
        }),
      ),
    );

    revalidatePath("/admin/templates");
    return { ok: true, updated: updates.length, perRole };
  } catch (err) {
    console.error("regenerateNumericTitlesScoped failed", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Regen failed.",
    };
  }
}
