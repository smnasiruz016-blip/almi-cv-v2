import { JOB_ROLES, getRoleBySlug } from "@/lib/roles";
import {
  countActiveTemplateImagesByRole,
  listPublicDesigns,
  topRolesByTemplateCount,
} from "@/lib/template-images";
import { getCurrentUser } from "@/lib/auth";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { DesignsClient } from "./_components/DesignsClient";

const PAGE_SIZE = 48;
const POPULAR_CHIPS = 4;

export const revalidate = 3600;

export const metadata = {
  title: "Browse CV designs · AlmiCV",
  description:
    "Search and browse our full CV design library by role. Free preview, sign up to use any design.",
};

export default async function DesignsPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role: roleParam } = await searchParams;
  // Validate the URL ?role= against JOB_ROLES — anything else is a
  // free-text smell, drop it and render the unfiltered gallery.
  const roleSlug =
    roleParam && getRoleBySlug(roleParam) ? roleParam : null;

  const [user, initialDesigns, countMap, topRoles] = await Promise.all([
    getCurrentUser(),
    listPublicDesigns({ roleSlug, offset: 0, limit: PAGE_SIZE }),
    countActiveTemplateImagesByRole(),
    topRolesByTemplateCount(POPULAR_CHIPS),
  ]);

  const totalCount = Array.from(countMap.values()).reduce(
    (sum, n) => sum + n,
    0,
  );
  const roleCount = countMap.size;

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
          <DesignsClient
            initialDesigns={initialDesigns.map((d) => ({
              id: d.id,
              title: d.title,
              slug: d.slug,
              roleSlug: d.roleSlug,
              imageUrl: d.imageUrl,
            }))}
            initialHasMore={initialDesigns.length === PAGE_SIZE}
            initialRoleSlug={roleSlug}
            totalCount={totalCount}
            roleCount={roleCount}
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
