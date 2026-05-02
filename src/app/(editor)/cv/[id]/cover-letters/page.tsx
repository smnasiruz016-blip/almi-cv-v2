import { notFound } from "next/navigation";
import { getResume } from "@/lib/resume-actions";
import { listCoverLetters } from "@/lib/cv/cover-letters";
import { CoverLettersClient } from "./cover-letters-client";

export default async function CoverLettersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const resume = await getResume(id);
  if (!resume) notFound();

  const result = await listCoverLetters(resume.id);
  const initialItems = result.ok ? result.data : [];

  return (
    <CoverLettersClient
      resumeId={resume.id}
      cvTitle={resume.title}
      initialItems={initialItems.map((it) => ({
        id: it.id,
        title: it.title,
        tone: it.tone,
        body: it.body,
        hiringManager: it.hiringManager,
        createdAt: it.createdAt.toISOString(),
        updatedAt: it.updatedAt.toISOString(),
      }))}
    />
  );
}
