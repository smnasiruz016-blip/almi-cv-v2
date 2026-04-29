// STUB: Stage 3B will replace this with real DB-backed creation
import { redirect } from "next/navigation";

export default async function NewCVPage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string }>;
}) {
  const params = await searchParams;
  const template = params.template ?? "classic-serif";
  redirect(`/cv/temp-id/edit?template=${template}`);
}
