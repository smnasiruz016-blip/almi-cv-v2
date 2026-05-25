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

// Called by the infinite-scroll sentinel on /designs as the user
// reaches the bottom of the grid. Validates the optional roleSlug
// against JOB_ROLES to keep the boundary honest (otherwise a crafted
// query would pass through as a free-text filter on the column).
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
