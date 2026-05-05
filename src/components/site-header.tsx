"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";

const ECOSYSTEM_LINKS: ReadonlyArray<{
  label: string;
  href: string;
  external: boolean;
}> = [
  { label: "AlmiCV Home", href: "/", external: false },
  { label: "AlmiJob", href: "https://almijob.almiworld.com", external: true },
  {
    label: "Salary Checker",
    href: "https://almisalary.almiworld.com",
    external: true,
  },
  { label: "eBooks", href: "https://almiworld.com/ebooks-2/", external: true },
  { label: "AlmiWorld", href: "https://almiworld.com", external: true },
];

const MENU_LINK_CLASS =
  "flex min-h-[48px] items-center rounded-lg px-3 text-base font-medium text-plum transition-colors hover:bg-coral/10 hover:text-coral focus:outline-none focus:ring-2 focus:ring-coral/40";

export function SiteHeader({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      firstLinkRef.current?.focus();
    }
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-cream/80 backdrop-blur-md">
        <Container>
          <div className="flex items-center justify-between py-6">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={closeMenu}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-coral text-lg font-bold text-white">
                A
              </span>
              <span className="text-xl font-semibold tracking-tight text-plum">
                AlmiCV
              </span>
            </Link>

            <div className="flex items-center gap-3">
              {ECOSYSTEM_LINKS.filter(
                (link) => link.label !== "AlmiCV Home",
              ).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden text-sm font-medium text-plum-soft transition hover:text-coral md:inline-flex"
                >
                  {link.label}
                </a>
              ))}
              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  className="hidden text-sm font-medium text-plum-soft transition hover:text-coral md:inline-flex"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/pricing"
                    className="hidden text-sm font-medium text-plum-soft transition hover:text-coral sm:inline-flex"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/login"
                    className="hidden text-sm font-medium text-plum-soft transition hover:text-coral sm:inline-flex"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-pill bg-coral px-5 py-3 text-sm font-semibold text-white shadow-warm-card transition hover:-translate-y-0.5 hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
                  >
                    Get started — free
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </>
              )}

              <button
                ref={hamburgerRef}
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-lg text-plum transition-colors hover:bg-coral/10 hover:text-coral focus:outline-none focus:ring-2 focus:ring-coral/40 md:hidden"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </Container>

        {isOpen && (
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
            className="border-t border-plum/10 bg-cream shadow-lg md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-3">
              {ECOSYSTEM_LINKS.map((link, index) =>
                link.external ? (
                  <a
                    key={link.href}
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className={MENU_LINK_CLASS}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    onClick={closeMenu}
                    className={MENU_LINK_CLASS}
                  >
                    {link.label}
                  </Link>
                ),
              )}

              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  onClick={closeMenu}
                  className={MENU_LINK_CLASS}
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/pricing"
                    onClick={closeMenu}
                    className={MENU_LINK_CLASS}
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className={MENU_LINK_CLASS}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    onClick={closeMenu}
                    className="mt-2 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-pill bg-coral px-5 py-3 text-sm font-semibold text-white shadow-warm-card transition hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
                  >
                    Get started — free
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </header>

      {isOpen && (
        <div
          aria-hidden
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-plum/20 md:hidden"
        />
      )}
    </>
  );
}
