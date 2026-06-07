import type { Metadata } from "next";
import { requireUser } from "@/lib/auth";
import { cvFontVariables } from "@/lib/cv-fonts";

// Editor pages are per-user and behind auth — never index.
export const metadata: Metadata = {
  robots: { index: false },
};

export default async function EditorLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireUser();
  return <div className={`min-h-screen ${cvFontVariables}`}>{children}</div>;
}
