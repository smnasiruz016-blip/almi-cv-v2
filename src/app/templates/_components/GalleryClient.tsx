"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import type { Role } from "@/lib/roles";
import { loadMoreDesigns, type PublicDesign } from "../actions";
import { ImageCard } from "./GalleryCard";

const PAGE_SIZE = 48;

type Props = {
  initialDesigns: PublicDesign[];
  initialHasMore: boolean;
  initialRoleSlug: string | null;
  popularChips: Array<{ roleSlug: string; roleName: string; count: number }>;
  roles: Role[];
  isLoggedIn: boolean;
  roleNameBySlug: Record<string, string>;
};

export function GalleryClient({
  initialDesigns,
  initialHasMore,
  initialRoleSlug,
  popularChips,
  roles,
  isLoggedIn,
  roleNameBySlug,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [designs, setDesigns] = useState<PublicDesign[]>(initialDesigns);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [activeRoleSlug, setActiveRoleSlug] = useState<string | null>(
    initialRoleSlug,
  );
  const [searchValue, setSearchValue] = useState<string>(
    initialRoleSlug ? (roleNameBySlug[initialRoleSlug] ?? "") : "",
  );
  const [isPending, startTransition] = useTransition();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  // URL → state sync. The setState here is the "syncing to external
  // state" exception called out in React docs; lint rule flagged but
  // legitimate.
  useEffect(() => {
    const urlRole = searchParams.get("role");
    if (urlRole === activeRoleSlug) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing to URL (external state)
    setActiveRoleSlug(urlRole);
    setSearchValue(urlRole ? (roleNameBySlug[urlRole] ?? "") : "");
    loadingRef.current = true;
    startTransition(async () => {
      const { rows, hasMore: more } = await loadMoreDesigns({
        roleSlug: urlRole,
        offset: 0,
      });
      setDesigns(rows);
      setHasMore(more);
      loadingRef.current = false;
    });
  }, [searchParams, activeRoleSlug, roleNameBySlug]);

  const setRoleFilter = useCallback(
    (slug: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (slug) {
        params.set("role", slug);
      } else {
        params.delete("role");
      }
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname);
    },
    [pathname, router, searchParams],
  );

  const resolveRole = useCallback(
    (typed: string): Role | null => {
      const q = typed.trim().toLowerCase();
      if (!q) return null;
      return (
        roles.find(
          (r) =>
            r.name.toLowerCase() === q ||
            (r.aliases ?? []).some((a) => a.toLowerCase() === q),
        ) ?? null
      );
    },
    [roles],
  );

  function onSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const role = resolveRole(searchValue);
    setRoleFilter(role?.slug ?? null);
  }

  function onSearchChange(value: string) {
    setSearchValue(value);
    const role = resolveRole(value);
    if (role) setRoleFilter(role.slug);
  }

  useEffect(() => {
    if (!hasMore) return;
    const node = sentinelRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        if (loadingRef.current) return;
        loadingRef.current = true;
        startTransition(async () => {
          const { rows, hasMore: more } = await loadMoreDesigns({
            roleSlug: activeRoleSlug,
            offset: designs.length,
          });
          setDesigns((prev) => [...prev, ...rows]);
          setHasMore(more);
          loadingRef.current = false;
        });
      },
      { rootMargin: "200px" },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [hasMore, activeRoleSlug, designs.length]);

  const filterActive = activeRoleSlug !== null;
  const activeRoleName = filterActive
    ? (roleNameBySlug[activeRoleSlug] ?? activeRoleSlug)
    : null;

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-balance font-display text-4xl text-plum md:text-5xl">
          Browse CV templates
        </h1>

        <form onSubmit={onSearchSubmit} className="flex max-w-xl gap-2">
          <input
            id="templates-search"
            name="role"
            type="text"
            list="templates-search-list"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Which role? Type to search…"
            autoComplete="off"
            spellCheck={false}
            className="flex-1 rounded-pill border border-plum/20 bg-white px-4 py-2.5 text-sm shadow-warm-card focus:border-coral/50 focus:outline-none focus:ring-4 focus:ring-coral/15"
            aria-label="Filter templates by role"
          />
          <datalist id="templates-search-list">
            {roles.map((r) => (
              <option key={r.slug} value={r.name}>
                {r.sector}
              </option>
            ))}
          </datalist>
        </form>

        <div className="flex flex-wrap items-center gap-2">
          {popularChips.map((c) => {
            const isActive = c.roleSlug === activeRoleSlug;
            return (
              <button
                key={c.roleSlug}
                type="button"
                onClick={() => setRoleFilter(isActive ? null : c.roleSlug)}
                className={
                  isActive
                    ? "rounded-pill bg-coral px-3 py-1 text-xs font-medium text-white"
                    : "rounded-pill border border-plum/15 bg-white px-3 py-1 text-xs font-medium text-plum-soft hover:border-plum/30 hover:text-plum"
                }
              >
                {c.roleName}
                <span className="ml-1 text-[10px] opacity-70">{c.count}</span>
              </button>
            );
          })}
          {filterActive && (
            <button
              type="button"
              onClick={() => setRoleFilter(null)}
              className="inline-flex items-center gap-1 rounded-pill bg-plum/10 px-3 py-1 text-xs font-medium text-plum hover:bg-plum/20"
              aria-label="Clear role filter"
            >
              <X className="h-3 w-3" />
              Show all
            </button>
          )}
        </div>

        {filterActive && (
          <p className="text-sm text-plum-soft">
            Showing {designs.length} {activeRoleName} design
            {designs.length === 1 ? "" : "s"}.{" "}
            <Link
              href={`/templates/role/${activeRoleSlug}`}
              className="text-coral hover:text-coral-deep"
            >
              View role page →
            </Link>
          </p>
        )}
      </header>

      {designs.length === 0 ? (
        <div className="rounded-2xl border border-plum/10 bg-white p-10 text-center">
          <p className="text-sm text-plum-soft">
            No templates yet for {activeRoleName ?? "this filter"}.
          </p>
          <button
            type="button"
            onClick={() => setRoleFilter(null)}
            className="mt-3 text-sm text-coral hover:text-coral-deep"
          >
            Show all templates
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {designs.map((d) => (
            <ImageCard
              key={`i-${d.id}`}
              design={d}
              roleName={roleNameBySlug[d.roleSlug] ?? d.roleSlug}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      )}

      {hasMore && (
        <div
          ref={sentinelRef}
          className="flex items-center justify-center py-8 text-sm text-plum-soft"
          aria-live="polite"
        >
          {isPending ? "Loading more…" : ""}
        </div>
      )}
      {!hasMore && designs.length >= PAGE_SIZE && (
        <p className="py-8 text-center text-sm text-plum-faint">
          That&apos;s everything.
        </p>
      )}
    </div>
  );
}
