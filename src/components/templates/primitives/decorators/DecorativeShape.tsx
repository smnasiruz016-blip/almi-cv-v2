"use client";

import type { CSSProperties } from "react";
import type { PrintSafeProp } from "./types";

export type DecorativeShapeKind =
  | "blob"
  | "leaf"
  | "swirl"
  | "wave"
  | "arc"
  | "circle"
  | "triangle"
  | "hexagon"
  | "diamond";

export type DecorativeShapeProps = PrintSafeProp & {
  shape: DecorativeShapeKind;
  color: string;
  width?: number;
  height?: number;
  opacity?: number;
  rotate?: number;
  className?: string;
  style?: CSSProperties;
};

const ORGANIC: ReadonlySet<DecorativeShapeKind> = new Set([
  "blob",
  "leaf",
  "swirl",
  "wave",
  "arc",
]);

// Each path is authored on a 100×100 viewBox so width/height props scale
// uniformly. SVG paths picked to read clearly at small sizes (down to 24px)
// without anti-aliasing breakdown.
const PATHS: Record<DecorativeShapeKind, string> = {
  blob:
    "M50,5 C72,5 95,22 95,48 C95,70 78,90 56,95 C32,100 8,82 6,58 C4,32 28,5 50,5 Z",
  leaf:
    "M10,90 C10,40 40,10 90,10 C90,60 60,90 10,90 Z M30,75 Q50,55 75,30",
  swirl:
    "M20,80 C20,40 50,20 80,40 C95,55 80,75 60,75 C45,75 40,60 50,55 C58,52 65,58 60,65",
  wave:
    "M0,50 Q25,20 50,50 T100,50 L100,80 L0,80 Z",
  arc:
    "M5,80 Q50,5 95,80 L95,95 L5,95 Z",
  circle: "M50,5 A45,45 0 1,0 50,95 A45,45 0 1,0 50,5 Z",
  triangle: "M50,8 L92,90 L8,90 Z",
  hexagon: "M50,5 L88,28 L88,72 L50,95 L12,72 L12,28 Z",
  diamond: "M50,5 L92,50 L50,95 L8,50 Z",
};

export function DecorativeShape({
  shape,
  color,
  width = 120,
  height = 120,
  opacity = 1,
  rotate = 0,
  printSafe = false,
  className,
  style,
}: DecorativeShapeProps) {
  // Print-safe flatten: organic shapes (blob/leaf/swirl/wave/arc) become
  // simple solid blocks of the same color and footprint. Chromium's print
  // backend produces wildly different anti-aliasing on complex Bezier
  // curves vs. Sparticuz's bundled chromium, so we trade fidelity for
  // determinism in the PDF pipeline.
  if (printSafe && ORGANIC.has(shape)) {
    return (
      <div
        className={className}
        aria-hidden
        style={{
          width,
          height,
          backgroundColor: color,
          opacity,
          borderRadius: "9999px",
          transform: rotate ? `rotate(${rotate}deg)` : undefined,
          ...style,
        }}
      />
    );
  }

  return (
    <svg
      className={className}
      aria-hidden
      width={width}
      height={height}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      style={{
        opacity,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        display: "block",
        ...style,
      }}
    >
      <path
        d={PATHS[shape]}
        fill={color}
        stroke={shape === "leaf" || shape === "swirl" ? color : "none"}
        strokeWidth={shape === "swirl" ? 2 : 0}
        fillRule="evenodd"
      />
    </svg>
  );
}
