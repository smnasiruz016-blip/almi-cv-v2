import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { createResume } from "@/lib/resume-actions";
import { isKnownTemplate } from "@/lib/templates";

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
 *
 * PNG sunset removed the ?templateImageId= path: the parse-and-seed
 * pipeline died with TemplateImage. Old bookmarks that still carry
 * ?templateImageId= are accepted (the param is silently ignored — no
 * 500, no crash) and fall through to the default template. ?template=
 * is the single supported handle now.
 */
export default async function NewCVPage({
  searchParams,
}: {
  // templateImageId retained in the type so legacy links don't 404; the
  // value is ignored. Remove from the type once external link sources
  // (emails, sitemaps) have aged out.
  searchParams: Promise<{ template?: string; templateImageId?: string }>;
}) {
  const user = await requireUser();
  const params = await searchParams;
  const requestedTemplate = params.template;

  const template =
    requestedTemplate && isKnownTemplate(requestedTemplate)
      ? requestedTemplate
      : "classic-serif";

  // Draft-reuse guard. Reuse any existing isDraft=true resume so double-
  // clicks don't create duplicates. If the user explicitly passed
  // ?template=<slug>, scope reuse to drafts on the same template so
  // switching layouts always starts a fresh CV.
  const reusable = await prisma.resume.findFirst({
    where: {
      userId: user.id,
      isDraft: true,
      ...(requestedTemplate !== undefined && {
        template: requestedTemplate,
      }),
    },
    orderBy: { createdAt: "desc" },
    select: { id: true },
  });

  if (reusable) {
    redirect(`/cv/${reusable.id}/edit`);
  }

  const result = await createResume(template);
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
