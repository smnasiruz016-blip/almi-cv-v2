import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { getResume } from "@/lib/resume-actions";
import { getSnapshot } from "@/lib/cv/snapshots";
import { isProActive } from "@/lib/billing/plans";
import { userCanAccessTemplate } from "@/lib/billing/template-access";
import { EditorClient } from "./editor-client";
import { SAMPLE_CV_DATA, isBlankCV } from "@/lib/cv-sample";
import type { CVData } from "@/lib/cv-types";
import type { Prisma } from "@prisma/client";

export default async function EditCVPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireUser();
  const resume = await getResume(id);
  if (!resume) notFound();

  // Open on the complete, editable design — not empty section boxes. A
  // never-touched blank draft (legacy rows, or any path that skipped the
  // sample-seeding in createResume) is seeded with sample content the first
  // time it's opened, so the editor matches the gallery preview. `isDraft`
  // flips false on the user's first save (see updateResume), so a CV the
  // user has actually started — including one they deliberately cleared —
  // is never re-seeded.
  let resumeData = resume.data as unknown as CVData;
  if (resume.isDraft && isBlankCV(resumeData)) {
    await prisma.resume.update({
      where: { id: resume.id },
      data: { data: SAMPLE_CV_DATA as unknown as Prisma.InputJsonValue },
    });
    resumeData = SAMPLE_CV_DATA;
  }

  // Phase 4: templateSlug is the authoritative column. Fall back to the
  // legacy `template` column for rows created before the migration, then
  // to classic-serif (the registry's neutral default).
  const slug = resume.templateSlug || resume.template || "classic-serif";

  // Tier gate. A user whose subscription lapsed mid-session can't keep
  // editing a premium template — bounce them to /pricing with the
  // recipe slug as the return URL so checkout drops them right back
  // here.
  if (!userCanAccessTemplate(user, slug)) {
    redirect(`/pricing?return=${encodeURIComponent(`/cv/${resume.id}/edit`)}`);
  }

  const snap = await getSnapshot(id);
  const hasSnapshot = snap.ok && snap.data !== null;

  return (
    <EditorClient
      resumeId={resume.id}
      initialTitle={resume.title}
      initialData={resumeData}
      templateSlug={slug}
      hasSnapshot={hasSnapshot}
      isPro={isProActive(user)}
    />
  );
}
