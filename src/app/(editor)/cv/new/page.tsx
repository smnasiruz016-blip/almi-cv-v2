import { redirect } from "next/navigation";
import { createResume } from "@/lib/resume-actions";

export default async function NewCVPage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string }>;
}) {
  const params = await searchParams;
  const template = params.template ?? "classic-serif";
  const id = await createResume(template);
  redirect(`/cv/${id}/edit`);
}
