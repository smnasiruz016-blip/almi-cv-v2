import { notFound, redirect } from "next/navigation";
import type { ComponentType } from "react";
import { requireUser } from "@/lib/auth";
import { getResume } from "@/lib/resume-actions";
import { getTemplate } from "@/lib/templates";
import { userCanAccessTemplate } from "@/lib/billing/template-access";
import type { CVData } from "@/lib/cv-types";
import { AutoPrint } from "./auto-print";

/**
 * The registry's Component type is intentionally narrow (`{ data,
 * paginated? }`) so it accepts both hand-coded and recipe-driven
 * templates. Recipe-driven components also accept `printSafe`; we
 * widen the type at this single call site so the print route can
 * forward the flag. Hand-coded templates simply ignore the prop.
 */
type PrintableTemplateComponent = ComponentType<{
  data: CVData;
  paginated?: boolean;
  printSafe?: boolean;
}>;

export default async function PrintCVPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireUser();
  const resume = await getResume(id);
  if (!resume) notFound();

  const slug = resume.template ?? "classic-serif";

  // Same tier check as the editor route. The Puppeteer print pipeline
  // forwards the user's session cookies, so requireUser + this gate
  // close the back-door of "PDF a premium CV without paying".
  if (!userCanAccessTemplate(user, slug)) {
    redirect(`/pricing?return=${encodeURIComponent(`/cv/${resume.id}/edit`)}`);
  }

  const template = getTemplate(slug);
  const TemplateComponent = template.Component as PrintableTemplateComponent;

  return (
    <>
      <AutoPrint />
      <div className="print-target">
        <TemplateComponent
          data={resume.data as unknown as CVData}
          paginated
          printSafe
        />
      </div>
    </>
  );
}
