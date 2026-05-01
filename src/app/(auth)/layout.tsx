import Link from "next/link";
import { Footer } from "@/components/footer";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative isolate flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-cream via-cream to-peach">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 -z-10 h-64 w-64 rounded-full bg-coral/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -left-10 -z-10 h-64 w-64 rounded-full bg-mint/20 blur-3xl"
      />

      <header className="mx-auto flex w-full max-w-6xl items-center px-6 py-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-coral">
            <span className="font-display text-lg font-bold text-white">A</span>
          </div>
          <span className="font-display text-xl font-bold text-plum">AlmiCV</span>
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 pt-8 pb-16">
        {children}
      </main>

      <Footer />
    </div>
  );
}
