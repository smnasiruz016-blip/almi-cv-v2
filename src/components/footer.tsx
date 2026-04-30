import Image from "next/image";
import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function Footer() {
  return (
    <footer className="bg-cream-soft">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12 md:flex-row md:justify-between">
        <Link
          href="https://almiworld.com"
          target="_blank"
          rel="noopener"
          className="flex items-center self-center opacity-90 transition-opacity hover:opacity-100"
        >
          <Image
            src="/almiworld-logo.png"
            alt="AlmiWorld — live beautifully"
            width={240}
            height={80}
            className="h-14 w-auto mix-blend-multiply md:h-[72px]"
            priority={false}
          />
        </Link>
        <nav className="flex flex-wrap items-center justify-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-plum-soft transition hover:text-coral"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
