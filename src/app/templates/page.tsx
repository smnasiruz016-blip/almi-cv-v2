import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { TEMPLATES, getTagline, getAddedAt } from "@/components/templates/template-registry";

// Gallery order: newest templates first (by addedAt) so visitors see the
// latest, most polished designs up top. The registry array order is left
// untouched, so suggestTemplate() role priority is unaffected.
const GALLERY_TEMPLATES = [...TEMPLATES].sort((a, b) =>
  getAddedAt(b).localeCompare(getAddedAt(a)),
);
import { CVPreview } from "@/components/templates/CVPreview";

// PNG sunset: the gallery used to render 246 admin-uploaded screenshots
// from TemplateImage. Now it renders the 77 React template cards directly
// from the registry — each click goes straight to /cv/new?template=slug
// without a TemplateImage indirection. No DB calls, no infinite scroll,
// no role-filter chips. Cards are ordered newest-first (by addedAt).

export const revalidate = 3600;

export const metadata = {
  title: "CV templates · AlmiCV",
  description:
    "77 production-ready CV templates — pick a layout and start your CV in under a minute. ATS-safe, A4-print-ready, free to start.",
};

export default async function TemplatesPage() {
  const user = await getCurrentUser();
  const isLoggedIn = Boolean(user);

  return (
    <main>
      <SiteHeader isLoggedIn={isLoggedIn} />

      <Section className="bg-cream-soft py-12 md:py-14">
        <Container>
          <header className="mb-10 max-w-2xl">
            <h1 className="text-balance font-display text-4xl text-plum md:text-5xl">
              Browse CV templates
            </h1>
            <p className="mt-4 text-lg text-plum-soft">
              77 industry-tailored layouts — every one ATS-safe, A4-print-ready,
              and free to start. Click any card to open the editor.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {GALLERY_TEMPLATES.map((t) => {
              const href = isLoggedIn
                ? `/cv/new?template=${t.slug}`
                : `/signup?intent=template&template=${t.slug}`;
              return (
                <Link
                  key={t.slug}
                  href={href}
                  className="group block overflow-hidden rounded-2xl border border-peach/40 bg-white shadow-warm-card transition-transform hover:-translate-y-0.5"
                  aria-label={`Use the ${t.name} template`}
                >
                  <div className="bg-plum/5">
                    <CVPreview slug={t.slug} width={320} className="mx-auto" />
                  </div>
                  <div className="border-t border-peach/30 p-4">
                    <p className="font-medium text-plum">{t.name}</p>
                    <p className="mt-1 line-clamp-2 text-xs text-plum-soft">
                      {getTagline(t)}
                    </p>
                    <p className="mt-2 text-xs text-coral group-hover:text-coral-deep">
                      {isLoggedIn ? "Use this template →" : "Sign up to use →"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}
