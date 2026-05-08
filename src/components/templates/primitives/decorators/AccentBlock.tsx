"use client";

import type { CSSProperties, ReactNode } from "react";
import type { PrintSafeProp } from "./types";

export type AccentBlockProps = PrintSafeProp & {
  color: string;
  width?: string | number;
  height?: string | number;
  position?: "absolute" | "relative" | "static";
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  opacity?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

const RADIUS_FOR: Record<NonNullable<AccentBlockProps["rounded"]>, string> = {
  none: "0",
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.75rem",
  full: "9999px",
};

export function AccentBlock({
  color,
  width = "100%",
  height = "auto",
  position = "relative",
  top,
  left,
  right,
  bottom,
  rounded = "none",
  opacity = 1,
  printSafe = false,
  className,
  style,
  children,
}: AccentBlockProps) {
  const containerStyle: CSSProperties = {
    backgroundColor: color,
    width,
    height,
    position,
    top,
    left,
    right,
    bottom,
    // printSafe drops sub-pixel rounding which Chromium occasionally
    // renders as a 1px hairline outside the fill. "lg" / "full" are kept
    // because they're visually load-bearing.
    borderRadius:
      printSafe && (rounded === "sm" || rounded === "md")
        ? "0"
        : RADIUS_FOR[rounded],
    opacity,
    ...style,
  };
  return (
    <div className={className} aria-hidden={!children} style={containerStyle}>
      {children}
    </div>
  );
}
