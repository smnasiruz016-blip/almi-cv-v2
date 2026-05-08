import Link from "next/link";
import { isFounder } from "@/lib/founder";

type AdminSection =
  | "comp-accounts"
  | "reviews"
  | "template-studio"
  | "cost-log";

const TABS: {
  key: AdminSection;
  href: string;
  label: string;
  founderOnly?: boolean;
}[] = [
  { key: "comp-accounts", href: "/admin/comp-accounts", label: "🎁 Comp Accounts" },
  { key: "reviews", href: "/admin/reviews", label: "📝 Reviews" },
  // Studio tabs — gated by isFounder() at render time. Today the
  // founder set === the owner set (both read OWNER_EMAILS), so these
  // surface to every admin viewer. The founderOnly flag is in place
  // so a future "ops admin" added to OWNER_EMAILS doesn't accidentally
  // see Studio if we later split the two roles.
  {
    key: "template-studio",
    href: "/admin/template-studio",
    label: "🎨 Template Studio",
    founderOnly: true,
  },
  {
    key: "cost-log",
    href: "/admin/template-studio/cost-log",
    label: "💸 Cost Log",
    founderOnly: true,
  },
];

export async function AdminSubnav({ active }: { active: AdminSection }) {
  const founder = await isFounder();
  const visible = TABS.filter((t) => !t.founderOnly || founder);
  return (
    <nav className="flex flex-wrap items-center gap-1 border-b border-plum/10 pb-3">
      {visible.map((t) => {
        const isActive = t.key === active;
        return (
          <Link
            key={t.key}
            href={t.href}
            aria-current={isActive ? "page" : undefined}
            className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-coral/15 text-coral-deep"
                : "text-plum-soft hover:bg-plum/5 hover:text-plum"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
