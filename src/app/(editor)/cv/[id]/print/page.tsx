import { notFound } from "next/navigation";
import { getResume } from "@/lib/resume-actions";
import { getTemplate } from "@/lib/templates";
import type { CVData } from "@/lib/cv-types";
import { AutoPrint } from "./auto-print";

export default async function PrintCVPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const resume = await getResume(id);
  if (!resume) notFound();

  const template = getTemplate(resume.template ?? "classic-serif");
  const TemplateComponent = template.Component;

  return (
    <>
      <AutoPrint />
      <div className="print-target">
        <TemplateComponent data={resume.data as unknown as CVData} paginated />
      </div>
    </>
  );
}
