import { requireUser } from "@/lib/auth";

export default async function EditorLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireUser();
  return <div className="min-h-screen">{children}</div>;
}
