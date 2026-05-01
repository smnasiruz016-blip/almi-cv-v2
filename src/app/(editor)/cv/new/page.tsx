import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { createResume } from "@/lib/resume-actions";

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
  searchParams: Promise<{ template?: string }>;
}) {
  const user = await requireUser();
  const params = await searchParams;
  const requestedTemplate = params.template;
  const template = requestedTemplate ?? "classic-serif";

  // If the user specified a template, only reuse a draft of that exact
  // template — don't drop them into a design they didn't ask for. If no
  // template was specified, any untouched draft is fair game.
  const reusable = await prisma.resume.findFirst({
    where: {
      userId: user.id,
      isDraft: true,
      ...(requestedTemplate !== undefined && { template: requestedTemplate }),
    },
    orderBy: { createdAt: "desc" },
    select: { id: true },
  });

  if (reusable) {
    redirect(`/cv/${reusable.id}/edit`);
  }

  const id = await createResume(template);
  redirect(`/cv/${id}/edit`);
}
