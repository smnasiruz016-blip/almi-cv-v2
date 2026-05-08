"use client";

import type { CSSProperties, ReactNode } from "react";
import type { PrintSafeProp } from "./types";

export type HeroBannerClipPath =
  | "none"
  | "diagonal-bottom"
  | "arch"
  | "corner-cut"
  | "wave-bottom";

export type HeroBannerProps = PrintSafeProp & {
  bg: string;
  fg?: string;
  height?: number | string;
  padding?: string;
  clipPath?: HeroBannerClipPath;
  decoration?: ReactNode;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

// Clip-paths kept as polygons (not paths) — Chromium prints these
// correctly. Arches and waves use SVG-mask URLs in the screen variant
// and degrade to flat rectangles when printSafe.
const POLYGON_CLIPS: Partial<Record<HeroBannerClipPath, string>> = {
  "diagonal-bottom": "polygon(0 0, 100% 0, 100% 88%, 0 100%)",
  "corner-cut": "polygon(0 0, 92% 0, 100% 16%, 100% 100%, 0 100%)",
};

const SVG_MASKS: Partial<Record<HeroBannerClipPath, string>> = {
  arch:
    'path("M 0 0 H 100 V 80 Q 50 105 0 80 Z")',
  "wave-bottom":
    'path("M 0 0 H 100 V 78 Q 75 92 50 82 T 0 78 Z")',
};

export function HeroBanner({
  bg,
  fg,
  height = "auto",
  padding = "2.5rem 2.5rem 3rem",
  clipPath = "none",
  decoration,
  children,
  printSafe = false,
  className,
  style,
}: HeroBannerProps) {
  const useClip = !printSafe && clipPath !== "none";
  const clipStyle: CSSProperties = useClip
    ? POLYGON_CLIPS[clipPath]
      ? { clipPath: POLYGON_CLIPS[clipPath] }
      : SVG_MASKS[clipPath]
        ? { clipPath: SVG_MASKS[clipPath] }
        : {}
    : {};

  // Reserve a little extra bottom padding when the clip eats into the
  // banner so child text doesn't crash into the cut.
  const adjustedPadding =
    useClip && (clipPath === "diagonal-bottom" || clipPath === "wave-bottom")
      ? `2.5rem 2.5rem 3.5rem`
      : padding;

  const containerStyle: CSSProperties = {
    backgroundColor: bg,
    color: fg,
    height,
    padding: adjustedPadding,
    position: "relative",
    overflow: "hidden",
    width: "100%",
    ...clipStyle,
    ...style,
  };

  return (
    <div className={className} style={containerStyle}>
      {decoration ? (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          {decoration}
        </div>
      ) : null}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
