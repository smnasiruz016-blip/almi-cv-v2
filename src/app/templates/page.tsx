import { JOB_ROLES, getRoleBySlug } from "@/lib/roles";
import {
  listPublicDesigns,
  topRolesByTemplateCount,
} from "@/lib/template-images";
import { getCurrentUser } from "@/lib/auth";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { GalleryClient } from "./_components/GalleryClient";

// PR #53 collapsed the dual-source gallery (29 hand-coded Recipe cards
// pinned at the top + TemplateImage rows below) into a TemplateImage-
// only feed. The Recipe cards used a slot prop because Recipe
// components couldn't cross the RSC boundary; that whole branch is
// gone now. /templates is exactly the 246 (and growing) cached PNG
// designs admin-uploaded to Vercel Blob, paginated 48 per scroll.
//
// /designs → /templates 301 redirect still lives in next.config.ts.

const PAGE_SIZE = 48;
const POPULAR_CHIPS = 4;

export const revalidate = 3600;

export const metadata = {
  title: "CV templates · AlmiCV",
  description:
    "Browse every CV template — role-specific designs cached and ready to seed your builder. Free to start.",
};

export default async function TemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role: roleParam } = await searchParams;
  const roleSlug = roleParam && getRoleBySlug(roleParam) ? roleParam : null;

  const [user, initialDesigns, topRoles] = await Promise.all([
    getCurrentUser(),
    listPublicDesigns({ roleSlug, offset: 0, limit: PAGE_SIZE }),
    topRolesByTemplateCount(POPULAR_CHIPS),
  ]);

  const roleNameBySlug: Record<string, string> = {};
  for (const r of JOB_ROLES) roleNameBySlug[r.slug] = r.name;

  const popularChips = topRoles.map((c) => ({
    roleSlug: c.roleSlug,
    roleName: roleNameBySlug[c.roleSlug] ?? c.roleSlug,
    count: c.count,
  }));

  return (
    <main>
      <SiteHeader isLoggedIn={Boolean(user)} />

      <Section className="bg-cream-soft py-12 md:py-14">
        <Container>
          <GalleryClient
            initialDesigns={initialDesigns.map((d) => ({
              id: d.id,
              title: d.title,
              slug: d.slug,
              roleSlug: d.roleSlug,
              imageUrl: d.imageUrl,
            }))}
            initialHasMore={initialDesigns.length === PAGE_SIZE}
            initialRoleSlug={roleSlug}
            popularChips={popularChips}
            roles={JOB_ROLES}
            isLoggedIn={Boolean(user)}
            roleNameBySlug={roleNameBySlug}
          />
        </Container>
      </Section>

      <Footer />
    </main>
  );
}
