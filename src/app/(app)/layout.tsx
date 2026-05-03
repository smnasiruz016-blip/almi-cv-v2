import Link from "next/link";
import { redirect } from "next/navigation";
import { CircleUserRound, FileText, LayoutTemplate, LogOut } from "lucide-react";
import { destroySession, requireUser } from "@/lib/auth";
import { cvFontVariables } from "@/lib/cv-fonts";

async function logoutAction() {
  "use server";
  await destroySession();
  redirect("/");
}

export default async function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await requireUser();

  return (
    <div className={`min-h-screen bg-gradient-to-b from-cream to-cream-soft ${cvFontVariables}`}>
      <header className="sticky top-0 z-50 border-b border-plum/10 bg-cream/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-coral">
              <span className="font-display text-lg font-bold text-white">A</span>
            </div>
            <span className="font-display text-xl font-bold text-plum">AlmiCV</span>
          </Link>

          <nav className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/dashboard"
              className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-plum-soft transition hover:bg-plum/5 hover:text-coral md:flex"
            >
              <FileText className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/templates"
              className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-plum-soft transition hover:bg-plum/5 hover:text-coral md:flex"
            >
              <LayoutTemplate className="h-4 w-4" />
              Templates
            </Link>
            <Link
              href="/account"
              className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-plum-soft transition hover:bg-plum/5 hover:text-coral md:flex"
            >
              <CircleUserRound className="h-4 w-4" />
              Account
            </Link>
            <span className="hidden text-sm text-plum-faint lg:inline">{user.email}</span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl border border-plum/15 bg-transparent px-3 py-2 text-sm font-medium text-plum-soft transition hover:border-coral/40 hover:text-coral"
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
