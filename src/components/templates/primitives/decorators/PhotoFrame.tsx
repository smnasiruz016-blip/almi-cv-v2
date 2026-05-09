"use client";

import type { CSSProperties } from "react";
import type { PrintSafeProp } from "./types";

export type PhotoFrameShape =
  | "circle"
  | "square"
  | "rounded"
  | "hexagon"
  | "diamond"
  | "soft";

/**
 * Tint applies a color wash on top of the photo. On screen we use a
 * `mix-blend-mode` overlay (Canva-style: teal multiplies into the
 * underlying skin tones). On print (`printSafe=true`) we drop the
 * blend mode and keep a flat-opacity color wash, since Chromium's
 * print pipeline does not render `mix-blend-mode` reliably across
 * Linux/macOS hosts. Per Phase 5b-1 Q5 — preserve visual identity in
 * PDF, never fall back to an untinted photo.
 */
export type PhotoFrameTint = {
  color: string;
  mode?: "multiply" | "soft-light";
  alpha?: number;
};

export type PhotoFrameProps = PrintSafeProp & {
  src: string;
  alt: string;
  shape?: PhotoFrameShape;
  size?: number;
  border?: { color: string; width: number };
  shadow?: boolean;
  tint?: PhotoFrameTint;
  className?: string;
  style?: CSSProperties;
};

// "soft" is a blob-style organic mask, like a torn-paper cutout — used in
// the Refined / Bold moods for hospitality and creative roles.
const CLIP_PATHS: Partial<Record<PhotoFrameShape, string>> = {
  hexagon: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
  diamond: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  soft: "polygon(50% 0%, 90% 14%, 100% 50%, 86% 90%, 50% 100%, 14% 86%, 0% 50%, 14% 10%)",
};

const RADIUS_FOR: Partial<Record<PhotoFrameShape, string>> = {
  circle: "9999px",
  square: "0",
  rounded: "0.75rem",
};

export function PhotoFrame({
  src,
  alt,
  shape = "circle",
  size = 96,
  border,
  shadow = false,
  tint,
  printSafe = false,
  className,
  style,
}: PhotoFrameProps) {
  const baseStyle: CSSProperties = {
    width: size,
    height: size,
    objectFit: "cover",
    display: "block",
    ...style,
  };

  if (CLIP_PATHS[shape]) {
    // Clip-path polygons print reliably; they're a single SVG path under
    // the hood. The "soft" octagon stays even in print mode.
    baseStyle.clipPath = CLIP_PATHS[shape];
  } else {
    baseStyle.borderRadius = RADIUS_FOR[shape] ?? "9999px";
  }

  if (border) {
    // Border on a clip-pathed image is hidden by the clip — wrap instead
    // when shape uses a polygon. For round/square/rounded, a normal
    // CSS border works.
    if (!CLIP_PATHS[shape]) {
      baseStyle.border = `${border.width}px solid ${border.color}`;
    }
  }

  // Shadows print as muddy gray boxes in Chromium's print engine; skip
  // when printSafe.
  if (shadow && !printSafe) {
    baseStyle.boxShadow = "0 2px 8px rgba(0,0,0,0.12)";
  }

  // eslint-disable-next-line @next/next/no-img-element
  const imgEl = <img src={src} alt={alt} style={baseStyle} />;

  const wrappedImg =
    CLIP_PATHS[shape] && border ? (
      <div
        aria-hidden={alt === ""}
        style={{
          width: size + border.width * 2,
          height: size + border.width * 2,
          padding: border.width,
          backgroundColor: border.color,
          clipPath: CLIP_PATHS[shape],
          display: "inline-block",
        }}
      >
        {imgEl}
      </div>
    ) : (
      imgEl
    );

  if (!tint) {
    if (CLIP_PATHS[shape] && border) {
      return <span className={className}>{wrappedImg}</span>;
    }
    return className ? <span className={className}>{wrappedImg}</span> : wrappedImg;
  }

  // Tint path: layer a colored overlay on top of the rendered photo.
  // The overlay shares the photo's clip-path / border-radius so the
  // wash respects the frame shape. For polygonal shapes with a border,
  // we anchor sizing to the border-wrap size so the overlay covers the
  // whole shape including the border ring.
  const outerSize =
    CLIP_PATHS[shape] && border ? size + border.width * 2 : size;
  const tintAlpha = tint.alpha ?? 0.45;
  const tintMode = tint.mode ?? "multiply";

  const overlayStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    backgroundColor: tint.color,
    opacity: tintAlpha,
    // printSafe drops mix-blend-mode (Chromium prints blends inconsistently);
    // the flat-opacity wash still preserves the tint identity.
    mixBlendMode: printSafe ? undefined : tintMode,
    ...(CLIP_PATHS[shape]
      ? { clipPath: CLIP_PATHS[shape] }
      : { borderRadius: RADIUS_FOR[shape] ?? "9999px" }),
  };

  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        position: "relative",
        width: outerSize,
        height: outerSize,
        lineHeight: 0,
      }}
    >
      {wrappedImg}
      <div aria-hidden style={overlayStyle} />
    </span>
  );
}
