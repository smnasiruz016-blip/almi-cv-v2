import { prisma } from "@/lib/db";
import type { TemplateImage } from "@prisma/client";

export type { TemplateImage };

export async function listActiveTemplateImagesByRole(
  roleSlug: string,
): Promise<TemplateImage[]> {
  return prisma.templateImage.findMany({
    where: { roleSlug, active: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function listAllActiveTemplateImages(): Promise<TemplateImage[]> {
  return prisma.templateImage.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function listAllTemplateImagesForAdmin(): Promise<TemplateImage[]> {
  return prisma.templateImage.findMany({
    orderBy: [{ roleSlug: "asc" }, { createdAt: "desc" }],
  });
}

export async function countActiveTemplateImagesByRole(): Promise<
  Map<string, number>
> {
  const rows = await prisma.templateImage.groupBy({
    by: ["roleSlug"],
    where: { active: true },
    _count: { _all: true },
  });
  const m = new Map<string, number>();
  for (const r of rows) m.set(r.roleSlug, r._count._all);
  return m;
}

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function titleFromFilename(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, "");
  const cleaned = base.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
  return cleaned.replace(/\b\w/g, (c) => c.toUpperCase());
}
