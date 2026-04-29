import { notFound } from "next/navigation";
import { getResume } from "@/lib/resume-actions";
import { EditorClient } from "./editor-client";
import type { CVData } from "@/lib/cv-types";

export default async function EditCVPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const resume = await getResume(id);
  if (!resume) notFound();

  return (
    <EditorClient
      resumeId={resume.id}
      initialTitle={resume.title}
      initialData={resume.data as unknown as CVData}
    />
  );
}
