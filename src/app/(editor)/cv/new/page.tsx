import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { createResume } from "@/lib/resume-actions";

// updatedAt-createdAt under this delta means the row was never edited.
// Prisma @updatedAt only advances on .update(), and auto-save debounces
// at 1500ms, so any real edit pushes updatedAt well past this window.
const UNTOUCHED_WINDOW_MS = 1000;

// Older drafts are probably abandoned; creating a fresh one feels less stale.
const RECENT_WINDOW_MS = 24 * 60 * 60 * 1000;

/**
 * Idempotency guard. GETs that mutate state are dangerous — every visit to
 * /cv/new (back-button, refresh, bookmark, double-click on "New CV") would
 * otherwise create a duplicate empty CV. We reuse the user's most-recent
 * untouched draft when one exists, falling back to creation only when there
 * is nothing to resume. Removing this check brings the duplicate trail back.
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
  const recentSince = new Date(Date.now() - RECENT_WINDOW_MS);

  // If the user specified a template, only reuse a draft of that exact
  // template — don't drop them into the wrong design. If no template was
  // specified, any recent untouched draft is fair game.
  const candidates = await prisma.resume.findMany({
    where: {
      userId: user.id,
      createdAt: { gte: recentSince },
      ...(requestedTemplate !== undefined && { template: requestedTemplate }),
    },
    orderBy: { createdAt: "desc" },
    select: { id: true, createdAt: true, updatedAt: true },
  });

  const reusable = candidates.find(
    (r) => r.updatedAt.getTime() - r.createdAt.getTime() < UNTOUCHED_WINDOW_MS,
  );

  if (reusable) {
    redirect(`/cv/${reusable.id}/edit`);
  }

  const id = await createResume(template);
  redirect(`/cv/${id}/edit`);
}
