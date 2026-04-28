import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900" />
      <div className="absolute -top-32 left-1/2 -z-10 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-mint/10 blur-3xl" />

      <header className="mx-auto flex max-w-6xl items-center px-6 py-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-mint">
            <span className="font-display text-lg font-bold text-navy-900">A</span>
          </div>
          <span className="font-display text-xl font-bold text-soft-white">AlmiCV</span>
        </Link>
      </header>

      <main className="mx-auto flex max-w-md flex-col px-6 pt-8 pb-16">{children}</main>
    </div>
  );
}
