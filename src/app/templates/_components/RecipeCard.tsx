// Server component — Recipe cards render their Component prop directly,
// which means passing TemplateMeta to a "use client" boundary fails
// (React function refs can't cross RSC). Keeping this in its own file
// without "use client" so page.tsx can render the cards server-side
// and pass the rendered JSX as a slot to GalleryClient.

import Link from "next/link";
import { Crown } from "lucide-react";
import { TemplateThumbnail } from "@/components/templates/TemplateThumbnail";
import type { TemplateMeta } from "@/lib/templates";

export function RecipeCard({ template: t }: { template: TemplateMeta }) {
  return (
    <Link
      href={`/templates/${t.slug}`}
      className="group block overflow-hidden rounded-2xl border border-peach/40 bg-white shadow-warm-card transition-transform hover:-translate-y-0.5"
    >
      <TemplateThumbnail template={t} scale={0.28} />
      <div className="flex items-center justify-between gap-2 p-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-plum">{t.name}</p>
          <p className="text-xs text-plum-faint">
            {t.tier === "premium" ? "Premium" : "Free"} · Use this template
          </p>
        </div>
        {t.tier === "premium" && (
          <Crown className="h-4 w-4 shrink-0 text-gold" />
        )}
      </div>
    </Link>
  );
}
