import Link from "next/link";
import { redirect } from "next/navigation";
import { FileText, LayoutTemplate, LogOut } from "lucide-react";
import { destroySession, requireUser } from "@/lib/auth";

async function logoutAction() {
  "use server";
  await destroySession();
  redirect("/login");
}

export default async function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await requireUser();

  return (
    <div className="min-h-screen">
      <header className="border-b border-muted/10 bg-navy-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-mint">
              <span className="font-display text-lg font-bold text-navy-900">A</span>
            </div>
            <span className="font-display text-xl font-bold text-soft-white">AlmiCV</span>
          </Link>

          <nav className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/dashboard"
              className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-muted transition hover:bg-muted/10 hover:text-soft-white md:flex"
            >
              <FileText className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/templates"
              className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-muted transition hover:bg-muted/10 hover:text-soft-white md:flex"
            >
              <LayoutTemplate className="h-4 w-4" />
              Templates
            </Link>
            <span className="hidden text-sm text-muted lg:inline">{user.email}</span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl border border-muted/20 bg-transparent px-3 py-2 text-sm font-medium text-muted transition hover:border-mint/30 hover:text-soft-white"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Log out</span>
              </button>
            </form>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
