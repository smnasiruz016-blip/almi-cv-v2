"use server";

import { JOB_ROLES } from "@/lib/roles";
import {
  listPublicDesigns,
  type TemplateImage,
} from "@/lib/template-images";

const PAGE_SIZE = 48;

export type PublicDesign = {
  id: string;
  title: string;
  slug: string;
  roleSlug: string;
  imageUrl: string;
};

function toPublic(row: TemplateImage): PublicDesign {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    roleSlug: row.roleSlug,
    imageUrl: row.imageUrl,
  };
}

// Infinite-scroll fetcher for the public /templates gallery. Returns
// TemplateImage rows ONLY — Recipes are server-rendered once at the
// top of the gallery (when no role filter is active) and never come
// back via this action. The client passes the count of images already
// shown as `offset`, NOT total-items-rendered.
export async function loadMoreDesigns(args: {
  roleSlug?: string | null;
  offset: number;
}): Promise<{ rows: PublicDesign[]; hasMore: boolean }> {
  const offset = Math.max(0, Number(args.offset) || 0);
  const roleSlug =
    args.roleSlug && JOB_ROLES.some((r) => r.slug === args.roleSlug)
      ? args.roleSlug
      : null;
  const rows = await listPublicDesigns({
    roleSlug,
    offset,
    limit: PAGE_SIZE,
  });
  return {
    rows: rows.map(toPublic),
    hasMore: rows.length === PAGE_SIZE,
  };
}
