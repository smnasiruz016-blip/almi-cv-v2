import Link from "next/link";
import { isFounder } from "@/lib/founder";

type AdminSection =
  | "comp-accounts"
  | "reviews"
  | "templates"
  | "accounts";

const TABS: {
  key: AdminSection;
  href: string;
  label: string;
  founderOnly?: boolean;
}[] = [
  { key: "comp-accounts", href: "/admin/comp-accounts", label: "🎁 Comp Accounts" },
  { key: "reviews", href: "/admin/reviews", label: "📝 Reviews" },
  {
    key: "templates",
    href: "/admin/templates",
    label: "🖼️ Templates",
    founderOnly: true,
  },
  {
    key: "accounts",
    href: "/admin/accounts",
    label: "👥 Accounts",
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
