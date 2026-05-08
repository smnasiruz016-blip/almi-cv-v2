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

export type PhotoFrameProps = PrintSafeProp & {
  src: string;
  alt: string;
  shape?: PhotoFrameShape;
  size?: number;
  border?: { color: string; width: number };
  shadow?: boolean;
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

  if (CLIP_PATHS[shape] && border) {
    // Wrap with a slightly larger background-colored block to fake a
    // border on polygon shapes.
    return (
      <div
        className={className}
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} style={baseStyle} />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} style={baseStyle} />
  );
}
