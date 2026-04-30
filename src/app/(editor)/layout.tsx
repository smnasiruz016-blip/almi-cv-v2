import { requireUser } from "@/lib/auth";
import { cvFontVariables } from "@/lib/cv-fonts";

export default async function EditorLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireUser();
  return <div className={`min-h-screen ${cvFontVariables}`}>{children}</div>;
}
