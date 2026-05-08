"use client";

import type { CSSProperties } from "react";
import type { PrintSafeProp } from "./types";

export type OrganicDividerVariant =
  | "wave"
  | "scribble"
  | "dotted"
  | "soft-line"
  | "leaf-vine";

export type OrganicDividerProps = PrintSafeProp & {
  variant?: OrganicDividerVariant;
  color: string;
  width?: string | number;
  thickness?: number;
  opacity?: number;
  className?: string;
  style?: CSSProperties;
};

const VIEW_BOXES: Record<OrganicDividerVariant, string> = {
  wave: "0 0 200 16",
  scribble: "0 0 200 14",
  dotted: "0 0 200 6",
  "soft-line": "0 0 200 4",
  "leaf-vine": "0 0 200 20",
};

function pathFor(variant: OrganicDividerVariant): {
  d: string;
  fill: string;
  stroke: string;
} {
  switch (variant) {
    case "wave":
      return {
        d: "M 0 8 Q 25 0, 50 8 T 100 8 T 150 8 T 200 8",
        fill: "none",
        stroke: "currentColor",
      };
    case "scribble":
      return {
        d: "M 0 8 C 20 2, 30 14, 50 8 S 80 0, 100 8 S 130 14, 150 8 S 180 2, 200 8",
        fill: "none",
        stroke: "currentColor",
      };
    case "dotted":
      // Render as 12 spaced dots via path commands so it stays one element.
      return {
        d: Array.from({ length: 12 })
          .map((_, i) => {
            const x = 8 + i * 16;
            return `M ${x} 3 a 1.4 1.4 0 1 0 0.001 0`;
          })
          .join(" "),
        fill: "currentColor",
        stroke: "none",
      };
    case "soft-line":
      return {
        d: "M 4 2 L 196 2",
        fill: "none",
        stroke: "currentColor",
      };
    case "leaf-vine":
      return {
        d: "M 0 10 Q 50 18 100 10 T 200 10 M 30 10 q 4 -8 8 0 M 70 10 q 4 8 8 0 M 110 10 q 4 -8 8 0 M 150 10 q 4 8 8 0",
        fill: "none",
        stroke: "currentColor",
      };
  }
}

export function OrganicDivider({
  variant = "soft-line",
  color,
  width = "100%",
  thickness = 1.5,
  opacity = 1,
  printSafe = false,
  className,
  style,
}: OrganicDividerProps) {
  // Print pipeline: collapse all variants to a single straight rule. Even
  // "soft-line" gets normalized so we don't depend on SVG stroke
  // rendering matching Chromium's CSS border pipeline (they don't, in
  // tested sparticuz/chromium 148).
  if (printSafe) {
    return (
      <hr
        className={className}
        style={{
          width,
          height: 0,
          border: 0,
          borderTop: `${thickness}px solid ${color}`,
          opacity,
          margin: 0,
          ...style,
        }}
      />
    );
  }

  const { d, fill, stroke } = pathFor(variant);
  return (
    <svg
      className={className}
      aria-hidden
      width={width}
      height={undefined}
      viewBox={VIEW_BOXES[variant]}
      preserveAspectRatio="none"
      style={{
        color,
        opacity,
        display: "block",
        width,
        height: variant === "leaf-vine" ? 20 : variant === "wave" ? 16 : 14,
        ...style,
      }}
    >
      <path
        d={d}
        fill={fill}
        stroke={stroke}
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
