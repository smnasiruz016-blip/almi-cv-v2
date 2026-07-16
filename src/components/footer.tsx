// Family-wide footer — AlmiWorld Global Nav Spec v1 §3. Data-driven: every family
// product except this site's own is a followed cross-link, strengthening the
// network's SEO (spec §3 note).
//
// The product list is NOT maintained here — it comes from @smnasiruz016-blip/almi-data,
// so adding a product is one edit there plus a version bump.
//
// ⚠️ IT WAS maintained here, and here is what that cost: the Products column was
// hardcoded and stopped at AlmiItalian, while AlmiDutch, AlmiIcelandic and AlmiDanish
// had been appended to the "LEGAL & CONTACT" column instead — products filed under a
// legal heading, live, because that is where there was room. The stale comment above
// the column still said "All six products" while sixteen were listed. Nothing catches
// this: it type-checks, it renders, and only a human reading the footer would notice.
// Products come from footerProducts() now; Legal & Contact holds legal and contact.
import { footerProducts } from "@smnasiruz016-blip/almi-data";

type FooterLink = { label: string; href: string };
type FooterColumn = { title: string; links: FooterLink[] };

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "AlmiWorld",
    links: [
      { label: "Home", href: "https://almiworld.com/" },
      { label: "eBooks", href: "https://almiworld.com/ebooks-2/" },
      { label: "Shamool Foundation", href: "https://shamoolfoundation.com/" },
    ],
  },
  {
    // ⚠️ "cv" is an IDENTITY, not a label — it omits THIS product from its own list.
    title: "Products",
    links: [...footerProducts("cv")],
  },
  {
    title: "Legal & Contact",
    links: [
      { label: "Contact Us", href: "https://almiworld.com/contact-us/" },
      { label: "Refund and Return Policy", href: "https://almiworld.com/refund_returns/" },
      { label: "Privacy Policy", href: "https://almiworld.com/privacy-policy/" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#14110D] text-white/75">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-3">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-bold uppercase tracking-wider text-gold">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-white/75 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 text-center text-xs text-white/60">
          © {new Date().getFullYear()} AlmiWorld. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
