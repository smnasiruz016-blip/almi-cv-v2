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

// Counts EVERY row per role (active + hidden). The form's smart-title
// generator uses this so the auto-numbered position keeps climbing
// across hidden rows — a hidden "Software Engineer Design 5" still
// reserves position 5; the next upload becomes 6, not a re-use of 5.
export async function countAllTemplateImagesByRole(): Promise<
  Map<string, number>
> {
  const rows = await prisma.templateImage.groupBy({
    by: ["roleSlug"],
    _count: { _all: true },
  });
  const m = new Map<string, number>();
  for (const r of rows) m.set(r.roleSlug, r._count._all);
  return m;
}

// Distinct roleSlugs that currently have at least one active TemplateImage.
// Used for /templates/role/[roleSlug] generateStaticParams (so only
// populated hubs are built) and for the sitemap (so only populated
// hubs are advertised). Sorted alphabetically for stable build output.
export async function listPopulatedRoleSlugs(): Promise<string[]> {
  const rows = await prisma.templateImage.groupBy({
    by: ["roleSlug"],
    where: { active: true },
    _count: { _all: true },
  });
  return rows.map((r) => r.roleSlug).sort();
}

// Matches purely numeric/symbolic titles that came out of Canva exports
// (1.png, 2.png inside folders). Also flags titles shorter than 4 chars
// since those are almost never meaningful. The form uses this to decide
// when to auto-generate, and the regen action uses it to scope the
// destructive update.
export function isNumericLikeTitle(s: string): boolean {
  const t = s.trim();
  if (t.length === 0) return true;
  if (t.length < 4) return true;
  return /^[0-9\-_\s]+$/.test(t);
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
