import Link from "next/link";

type AdminSection = "comp-accounts" | "reviews";

const TABS: { key: AdminSection; href: string; label: string }[] = [
  { key: "comp-accounts", href: "/admin/comp-accounts", label: "🎁 Comp Accounts" },
  { key: "reviews", href: "/admin/reviews", label: "📝 Reviews" },
];

export function AdminSubnav({ active }: { active: AdminSection }) {
  return (
    <nav className="flex flex-wrap items-center gap-1 border-b border-plum/10 pb-3">
      {TABS.map((t) => {
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
