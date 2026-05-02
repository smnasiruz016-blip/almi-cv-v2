import { notFound } from "next/navigation";
import { getResume } from "@/lib/resume-actions";
import { TailorClient } from "./tailor-client";
import type { CVData } from "@/lib/cv-types";

export default async function TailorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const resume = await getResume(id);
  if (!resume) notFound();

  return (
    <TailorClient
      resumeId={resume.id}
      cvTitle={resume.title}
      initialData={resume.data as unknown as CVData}
    />
  );
}
