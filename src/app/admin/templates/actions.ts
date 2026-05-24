"use server";

import { revalidatePath } from "next/cache";
import { put, del } from "@vercel/blob";
import { requireFounder } from "@/lib/founder";
import { prisma } from "@/lib/db";
import { getRoleBySlug } from "@/lib/roles";
import { slugifyTitle } from "@/lib/template-images";

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

    const roleSlug = String(formData.get("roleSlug") ?? "");
    if (!getRoleBySlug(roleSlug)) {
      return { ok: false, error: `Unknown role slug: ${roleSlug}` };
    }

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

      const slug = await uniqueSlug(slugifyTitle(rawTitle) || "template");
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
