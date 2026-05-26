import { notFound, redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getResume } from "@/lib/resume-actions";
import { getSnapshot } from "@/lib/cv/snapshots";
import { isProActive } from "@/lib/billing/plans";
import { userCanAccessTemplate } from "@/lib/billing/template-access";
import { EditorClient } from "./editor-client";
import type { CVData } from "@/lib/cv-types";

export default async function EditCVPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireUser();
  const resume = await getResume(id);
  if (!resume) notFound();

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
      initialData={resume.data as unknown as CVData}
      templateSlug={slug}
      hasSnapshot={hasSnapshot}
      isPro={isProActive(user)}
    />
  );
}
