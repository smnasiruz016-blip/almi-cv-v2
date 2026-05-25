import { JOB_ROLES, getRoleBySlug } from "@/lib/roles";
import { TEMPLATE_LIST } from "@/lib/templates";
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
import { RecipeCard } from "./_components/RecipeCard";

// Single source of truth for the templates surface. Was the auth-gated
// builder picker (RecipeRole/Mood/Tier facets) before PR #51 — now a
// public Canva-style gallery merging the 29 code-rendered Recipes
// (pinned at top, no filter) with all active TemplateImage rows
// (createdAt DESC, paginated 48/batch via infinite scroll).
//
// /designs → /templates 301 redirect lives in next.config.ts.

const PAGE_SIZE = 48;
const POPULAR_CHIPS = 4;

export const revalidate = 3600;

export const metadata = {
  title: "CV templates · AlmiCV",
  description:
    "Browse every CV template — hand-coded recipes plus role-specific designs. Free to start, sign up to use any template.",
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
            recipesSlot={
              <>
                {TEMPLATE_LIST.map((t) => (
                  <RecipeCard key={`r-${t.slug}`} template={t} />
                ))}
              </>
            }
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
