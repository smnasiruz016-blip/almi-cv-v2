// ============================================================================
// LazyCVPreview — the home page's template thumbnails, loaded only when they
// come near the screen (RR-400).
//
// CVPreview pulls in the whole template registry and react-dom/server
// (~1.7 MB of JavaScript before compression). On the home page the
// thumbnails sit far below the hero, yet that code loaded and ran on every
// visit and held up mobile LCP. This wrapper keeps the same box (width x A4
// height, white) so nothing shifts, and fetches CVPreview only once the box
// is within 600px of the viewport. Template names and links stay server-
// rendered around it.
// ============================================================================
"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const A4_W = 794;
const A4_H = 1123;

type PreviewProps = { slug: string; width?: number; className?: string };

// ssr:false + rendered only once the box is near the screen: the registry chunk is not in the page's first scripts.
const CVPreview = dynamic(
  () => import("@/components/templates/CVPreview").then((m) => m.CVPreview),
  { ssr: false, loading: () => null }
);

export function LazyCVPreview({ slug, width = 240, className }: PreviewProps) {
  const box = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          setNear(true);
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const height = A4_H * (width / A4_W);
  return (
    <div
      ref={box}
      className={className}
      style={{ width, height, background: "#fff" }}
    >
      {near ? <CVPreview slug={slug} width={width} /> : null}
    </div>
  );
}
