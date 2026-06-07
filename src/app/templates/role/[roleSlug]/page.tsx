import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { JOB_ROLES, getRoleBySlug } from "@/lib/roles";
import { suggestTemplate, TEMPLATES } from "@/components/templates/template-registry";
import { CVPreview } from "@/components/templates/CVPreview";
import { getCurrentUser } from "@/lib/auth";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

// PNG sunset: this page used to render PNG screenshots from TemplateImage
// rows. Now it renders a live React preview of the template that
// suggestTemplate() picks for the role. Every JOB_ROLES entry gets a
// real hub (no more thin-content guard — every page has a full A4
// preview + role-tailored copy + CTA), so generateStaticParams returns
// the full 263.

export const revalidate = 3600;

export async function generateStaticParams() {
  return JOB_ROLES.map((r) => ({ roleSlug: r.slug }));
}

// Reject unknown slugs at build time (they wouldn't pass JOB_ROLES anyway).
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ roleSlug: string }>;
}) {
  const { roleSlug } = await params;
  const role = getRoleBySlug(roleSlug);
  if (!role) return { title: "CV templates · AlmiCV" };
  const title = `${role.name} CV Template — Free & ATS-Ready · AlmiCV`;
  const description = `Start your ${role.name} CV in under a minute with a free, ATS-ready template. AI writing, live ATS score, any language. Pro $7/mo.`;
  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: `https://almicv.almiworld.com/templates/role/${role.slug}` },
  };
}

export default async function RoleHubPage({
  params,
}: {
  params: Promise<{ roleSlug: string }>;
}) {
  const [{ roleSlug }, user] = await Promise.all([params, getCurrentUser()]);
  const role = getRoleBySlug(roleSlug);
  if (!role) notFound();

  const layout = suggestTemplate({ roleSlug });
  const isLoggedIn = Boolean(user);
  const ctaHref = isLoggedIn
    ? `/cv/new?template=${layout.slug}`
    : `/signup?intent=template&template=${layout.slug}`;
  const ctaLabel = isLoggedIn ? "Use this template" : "Sign up to use this template";

  return (
    <main>
      <SiteHeader isLoggedIn={isLoggedIn} />

      <Section className="bg-cream-soft py-14">
        <Container>
          <header className="mb-10 max-w-2xl">
            <Link
              href="/templates"
              className="inline-flex items-center gap-1.5 text-sm text-plum-soft transition-colors hover:text-plum"
            >
              <ArrowLeft className="h-4 w-4" />
              All templates
            </Link>
            <h1 className="mt-4 text-balance font-display text-4xl text-plum md:text-5xl">
              {role.name} CV template
            </h1>
            <p className="mt-4 text-lg text-plum-soft">
              Built for {role.name.toLowerCase()} roles in {role.sector}.
              {" "}
              <span className="text-plum">
                {layout.name}
              </span>{" "}
              is the layout we recommend — {layout.description}
            </p>
          </header>

          <div className="grid items-start gap-10 md:grid-cols-[420px_1fr]">
            <div className="rounded-2xl border border-peach/40 bg-white p-3 shadow-warm-card">
              <CVPreview slug={layout.slug} width={394} />
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-peach/40 bg-white p-6 shadow-warm-card">
                <p className="text-xs font-semibold uppercase tracking-wider text-plum-soft">
                  Recommended layout
                </p>
                <h2 className="mt-1 font-display text-2xl text-plum">
                  {layout.name}
                </h2>
                <p className="mt-3 text-sm text-plum-soft">
                  {layout.description}
                </p>
                <Link
                  href={ctaHref}
                  className="mt-5 inline-flex items-center gap-2 rounded-pill bg-coral px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-coral-deep"
                >
                  {ctaLabel}
                </Link>
              </div>

              <div className="rounded-2xl border border-plum/10 bg-white p-6">
                <p className="text-sm font-semibold text-plum">
                  Want a different look?
                </p>
                <p className="mt-1 text-sm text-plum-soft">
                  Browse all {TEMPLATES.length} templates and pick any layout — every one is
                  ATS-safe, A4-print-ready, and free to start.
                </p>
                <Link
                  href="/templates"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-coral hover:text-coral-deep"
                >
                  See all templates →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}
