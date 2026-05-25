"use client";

import Image from "next/image";
import Link from "next/link";
import type { PublicDesign } from "../actions";

// Image card only — TemplateImage rows. Logged-in click → /cv/new
// (TemplateImage isn't a buildable Recipe so the builder picks default;
// surfacing the actual image-to-builder mapping is a follow-up). Anon
// click → /signup?intent=template&id={id} (intent param still not
// handled in /signup; anon lands on standard signup flow).
//
// Recipe cards live in RecipeCard.tsx (server component) — they can't
// share this file because Recipe.Component is a React function ref
// that can't cross the RSC boundary into a "use client" file.

export function ImageCard({
  design,
  roleName,
  isLoggedIn,
}: {
  design: PublicDesign;
  roleName: string;
  isLoggedIn: boolean;
}) {
  const href = isLoggedIn
    ? "/cv/new"
    : `/signup?intent=template&id=${design.id}`;
  const cta = isLoggedIn ? "Use this template" : "Sign up to use";
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl border border-peach/40 bg-white shadow-warm-card transition-transform hover:-translate-y-0.5"
      aria-label={`${cta}: ${design.title}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-plum/5">
        <Image
          src={design.imageUrl}
          alt={design.title}
          fill
          loading="lazy"
          sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform group-hover:scale-[1.02]"
        />
      </div>
      <div className="p-3">
        <p className="truncate text-sm font-medium text-plum">{design.title}</p>
        <p className="truncate text-xs text-plum-faint">
          {roleName} · {cta}
        </p>
      </div>
    </Link>
  );
}
