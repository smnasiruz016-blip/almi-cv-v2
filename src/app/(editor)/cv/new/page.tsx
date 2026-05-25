import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { createResume } from "@/lib/resume-actions";
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
  // PR #53 collapsed the template registry to one entry. The `template`
  // column still gets written so old data paths keep working, but the
  // builder always renders via neutral-default — getTemplate() returns
  // it for any unknown slug.
  const template = requestedTemplate ?? "neutral-default";

  // PR #52 — when ?templateImageId= is present and the row has cached
  // parsedFields, build a seed Partial<CVData> from those fields. PR
  // #53 dropped the mayaRodriguez fallback: missing row / unparsed /
  // parse-errored all yield `seed = undefined`, which createResume()
  // turns into an empty CVData skeleton. NeutralDefault hides empty
  // sections so the user starts with a blank canvas.
  let seed: Partial<CVData> | undefined;
  if (templateImageId) {
    const ti = await prisma.templateImage.findUnique({
      where: { id: templateImageId },
      select: { parsedFields: true, parsedAt: true },
    });
    if (ti?.parsedAt && ti.parsedFields) {
      seed = ti.parsedFields as unknown as Partial<CVData>;
    }
  }

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
