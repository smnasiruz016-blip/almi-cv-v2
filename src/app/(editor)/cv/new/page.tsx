import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { createResume } from "@/lib/resume-actions";
import { isKnownTemplate } from "@/lib/templates";
import { suggestTemplate } from "@/components/templates/template-registry";
import type { CVData } from "@/lib/cv-types";

/**
 * Idempotency guard. GETs that mutate state are dangerous — every visit to
 * /cv/new (back-button, refresh, bookmark, double-click on "New CV", and
 * Next.js <Link> prefetch on hover/viewport entry) would otherwise create
 * a duplicate empty CV.
 *
 * Reuse signal: an explicit isDraft Boolean column on Resume.
 *   - createResume() seeds isDraft=true
 *   - updateResume() flips isDraft=false on the first edit
 *   - /cv/new findFirst({ where: { isDraft: true } }) is the entire check
 *
 * The previous heuristic (updatedAt - createdAt < 1s) silently failed in
 * production because Prisma @updatedAt populates from JS new Date() on
 * create while createdAt populates from SQL now() — two clocks. On Vercel
 * Fluid Compute calling Neon Postgres the delta routinely exceeded 1s due
 * to network + pooler queueing time, so even brand-new untouched rows
 * looked "edited" and the guard skipped them. Don't go back to that.
 */
export default async function NewCVPage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string; templateImageId?: string }>;
}) {
  const user = await requireUser();
  const params = await searchParams;
  const requestedTemplate = params.template;
  const templateImageId = params.templateImageId;

  // Phase 4: resolve the template slug. Precedence:
  //   1. Explicit ?template= query (founder/admin links)
  //   2. TemplateImage.templateSlug — admin-curated layout for this PNG
  //   3. suggestTemplate(roleSlug) — derived from the role this PNG covers
  //   4. "classic-serif" — registry's neutral fallback
  //
  // PR #52 — when ?templateImageId= is present and the row has cached
  // parsedFields, build a seed Partial<CVData> from those fields. PR
  // #53 dropped the mayaRodriguez fallback: missing row / unparsed /
  // parse-errored all yield `seed = undefined`, which createResume()
  // turns into an empty CVData skeleton.
  let seed: Partial<CVData> | undefined;
  let templateImage:
    | { parsedFields: unknown; parsedAt: Date | null; templateSlug: string; roleSlug: string }
    | null = null;
  if (templateImageId) {
    templateImage = await prisma.templateImage.findUnique({
      where: { id: templateImageId },
      select: {
        parsedFields: true,
        parsedAt: true,
        templateSlug: true,
        roleSlug: true,
      },
    });
    if (templateImage?.parsedAt && templateImage.parsedFields) {
      seed = templateImage.parsedFields as Partial<CVData>;
    }
  }

  const template = (() => {
    if (requestedTemplate && isKnownTemplate(requestedTemplate)) {
      return requestedTemplate;
    }
    if (templateImage?.templateSlug && isKnownTemplate(templateImage.templateSlug)) {
      return templateImage.templateSlug;
    }
    if (templateImage?.roleSlug) {
      return suggestTemplate({ roleSlug: templateImage.roleSlug }).slug;
    }
    return "classic-serif";
  })();

  // Draft-reuse guard. Skip whenever the user clicked a specific
  // TemplateImage (templateImageId in the URL) — that's an explicit
  // "start fresh from this design" intent, even if the template has
  // no parsedFields and the seed ends up undefined. Otherwise (the
  // dashboard's bare "New CV" button), reuse any existing isDraft=true
  // resume so double-clicks don't create duplicates.
  const reusable =
    templateImageId === undefined
      ? await prisma.resume.findFirst({
          where: {
            userId: user.id,
            isDraft: true,
            ...(requestedTemplate !== undefined && {
              template: requestedTemplate,
            }),
          },
          orderBy: { createdAt: "desc" },
          select: { id: true },
        })
      : null;

  if (reusable) {
    redirect(`/cv/${reusable.id}/edit`);
  }

  const result = await createResume(template, seed);
  if (!result.ok) {
    if (result.code === "TEMPLATE_REQUIRES_PRO") {
      // Tier gate hit. Drop them on /pricing with this same /cv/new
      // URL as the return target so a successful checkout brings them
      // right back here and createResume() succeeds on retry.
      const ret = encodeURIComponent(`/cv/new?template=${template}`);
      redirect(`/pricing?return=${ret}`);
    }
    if (result.code === "UNKNOWN_TEMPLATE") {
      redirect(`/templates`);
    }
    // CV cap hit — bounce to dashboard with a query flag so the dashboard
    // surfaces the upgrade modal client-side.
    const reason = encodeURIComponent(result.code);
    redirect(`/dashboard?limit=${reason}`);
  }
  redirect(`/cv/${result.id}/edit`);
}
