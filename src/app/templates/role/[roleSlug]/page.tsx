import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getRoleBySlug } from "@/lib/roles";
import {
  listActiveTemplateImagesByRole,
  listPopulatedRoleSlugs,
} from "@/lib/template-images";
import { getCurrentUser } from "@/lib/auth";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const PAGE_SIZE = 24;

export const revalidate = 3600;

// Build-time generation for the 61 currently-populated role slugs.
// The other 202 roles 404 (founder choice — avoid thin-content hubs).
// As founders upload to new roles, the next deploy picks them up.
// (Same upload action also revalidatePath()s the affected slug for
// faster cache invalidation between deploys.)
export async function generateStaticParams() {
  const slugs = await listPopulatedRoleSlugs();
  return slugs.map((roleSlug) => ({ roleSlug }));
}

// dynamicParams = false means any roleSlug NOT returned by
// generateStaticParams gets a 404 without hitting the server. With
// dynamicParams = true (default), the page would render at request
// time for unknown slugs and hit notFound() — works either way, but
// false is the explicit doctrine #3 stance: don't pretend an empty
// hub exists.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ roleSlug: string }>;
}) {
  const { roleSlug } = await params;
  const role = getRoleBySlug(roleSlug);
  if (!role) return { title: "CV templates · AlmiCV" };
  return {
    title: `${role.name} CV templates · AlmiCV`,
    description: `Browse CV templates designed for ${role.name} roles.`,
  };
}

export default async function RoleHubPage({
  params,
  searchParams,
}: {
  params: Promise<{ roleSlug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const [{ roleSlug }, { page: pageStr }, user] = await Promise.all([
    params,
    searchParams,
    getCurrentUser(),
  ]);
  const role = getRoleBySlug(roleSlug);
  if (!role) notFound();

  const rows = await listActiveTemplateImagesByRole(roleSlug);
  // Defensive: a role can pass generateStaticParams (had rows at
  // build time) but lose all rows before request (hidden/deleted).
  if (rows.length === 0) notFound();

  const isLoggedIn = Boolean(user);
  const page = Math.max(1, Number(pageStr) || 1);
  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const clampedPage = Math.min(page, totalPages);
  const visible = rows.slice(
    (clampedPage - 1) * PAGE_SIZE,
    clampedPage * PAGE_SIZE,
  );

  return (
    <main>
      <SiteHeader isLoggedIn={isLoggedIn} />

      <Section className="bg-cream-soft py-14">
        <Container>
          <header className="mb-8 max-w-2xl">
            <Link
              href="/templates"
              className="inline-flex items-center gap-1.5 text-sm text-plum-soft transition-colors hover:text-plum"
            >
              <ArrowLeft className="h-4 w-4" />
              All templates
            </Link>
            <h1 className="mt-4 text-balance font-display text-4xl text-plum md:text-5xl">
              {role.name} CV templates
            </h1>
            <p className="mt-4 text-lg text-plum-soft">
              {rows.length} design{rows.length === 1 ? "" : "s"} for{" "}
              {role.name.toLowerCase()} roles in {role.sector}.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((row) => (
              <article
                key={row.id}
                className="overflow-hidden rounded-2xl border border-peach/40 bg-white shadow-warm-card"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-plum/5">
                  <Image
                    src={row.imageUrl}
                    alt={row.title}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-medium text-plum">
                    {row.title}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <Pagination
            roleSlug={roleSlug}
            page={clampedPage}
            totalPages={totalPages}
            totalCards={rows.length}
          />
        </Container>
      </Section>

      <Footer />
    </main>
  );
}

function Pagination({
  roleSlug,
  page,
  totalPages,
  totalCards,
}: {
  roleSlug: string;
  page: number;
  totalPages: number;
  totalCards: number;
}) {
  if (totalPages <= 1) return null;
  const base = `/templates/role/${roleSlug}`;
  const prevHref = page > 1 ? `${base}?page=${page - 1}` : null;
  const nextHref = page < totalPages ? `${base}?page=${page + 1}` : null;

  return (
    <nav
      className="mt-12 flex items-center justify-between gap-4 border-t border-plum/10 pt-6"
      aria-label="Role hub pagination"
    >
      <div className="text-sm text-plum-soft">
        Page {page} of {totalPages}
        <span className="ml-2 text-plum-faint">· {totalCards} templates</span>
      </div>
      <div className="flex items-center gap-2">
        {prevHref ? (
          <Link
            href={prevHref}
            className="inline-flex items-center gap-1.5 rounded-pill border border-plum/20 px-3 py-1.5 text-sm text-plum hover:bg-plum/5"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Link>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-pill border border-plum/10 px-3 py-1.5 text-sm text-plum-faint">
            <ArrowLeft className="h-4 w-4" />
            Previous
          </span>
        )}
        {nextHref ? (
          <Link
            href={nextHref}
            className="inline-flex items-center gap-1.5 rounded-pill bg-coral px-3 py-1.5 text-sm font-medium text-white hover:bg-coral-deep"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-pill border border-plum/10 px-3 py-1.5 text-sm text-plum-faint">
            Next
            <ArrowRight className="h-4 w-4" />
          </span>
        )}
      </div>
    </nav>
  );
}
