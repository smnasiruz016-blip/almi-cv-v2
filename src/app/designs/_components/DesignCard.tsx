"use client";

import Image from "next/image";
import Link from "next/link";
import type { PublicDesign } from "../actions";

// Card click destination:
//   - Logged-in users → /templates?selected={id} (their existing
//     builder picker; ?selected is a hint we can wire later).
//   - Anonymous users → /signup?intent=template&id={id}. /signup's
//     handler doesn't read intent yet — flagged in the PR — so for
//     now anon users land in the standard signup flow and the intent
//     param is dropped after auth. Wire-up is a small follow-up.

type Props = {
  design: PublicDesign;
  roleName: string;
  isLoggedIn: boolean;
};

export function DesignCard({ design, roleName, isLoggedIn }: Props) {
  const href = isLoggedIn
    ? `/templates?selected=${design.id}`
    : `/signup?intent=template&id=${design.id}`;
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl border border-peach/40 bg-white shadow-warm-card transition-transform hover:-translate-y-0.5"
      aria-label={`Use ${design.title} template`}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-plum/5">
        <Image
          src={design.imageUrl}
          alt={design.title}
          fill
          loading="lazy"
          sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 20vw, (min-width: 640px) 50vw, 50vw"
          className="object-cover transition-transform group-hover:scale-[1.02]"
        />
      </div>
      <div className="p-3">
        <p className="truncate text-sm font-medium text-plum">{design.title}</p>
        <p className="truncate text-xs text-plum-faint">{roleName}</p>
      </div>
    </Link>
  );
}
