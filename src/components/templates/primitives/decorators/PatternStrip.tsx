"use client";

import type { CSSProperties } from "react";
import type { PrintSafeProp } from "./types";

export type PatternStripPattern =
  | "dots"
  | "lines-h"
  | "lines-v"
  | "grid"
  | "diagonal"
  | "chevron";

export type PatternStripDensity = "loose" | "medium" | "tight";

export type PatternStripProps = PrintSafeProp & {
  pattern: PatternStripPattern;
  color: string;
  width?: string | number;
  height?: string | number;
  density?: PatternStripDensity;
  opacity?: number;
  className?: string;
  style?: CSSProperties;
};

const SPACING_PX: Record<PatternStripDensity, number> = {
  loose: 14,
  medium: 9,
  tight: 5,
};

const DOT_RADIUS: Record<PatternStripDensity, number> = {
  loose: 1.4,
  medium: 1,
  tight: 0.8,
};

function buildSvgDataUrl(svg: string): string {
  // encodeURIComponent is heavy but predictable — Chromium parses these
  // fine in print mode. URL-encoded SVG outperforms base64 on file size
  // for short patterns.
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}

function dotsPattern(color: string, density: PatternStripDensity): string {
  const s = SPACING_PX[density];
  const r = DOT_RADIUS[density];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${s}' height='${s}'><circle cx='${s / 2}' cy='${s / 2}' r='${r}' fill='${color}'/></svg>`;
  return buildSvgDataUrl(svg);
}

function linesHPattern(color: string, density: PatternStripDensity): string {
  const s = SPACING_PX[density];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${s}' height='${s}'><line x1='0' y1='${s - 1}' x2='${s}' y2='${s - 1}' stroke='${color}' stroke-width='1'/></svg>`;
  return buildSvgDataUrl(svg);
}

function linesVPattern(color: string, density: PatternStripDensity): string {
  const s = SPACING_PX[density];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${s}' height='${s}'><line x1='${s - 1}' y1='0' x2='${s - 1}' y2='${s}' stroke='${color}' stroke-width='1'/></svg>`;
  return buildSvgDataUrl(svg);
}

function gridPattern(color: string, density: PatternStripDensity): string {
  const s = SPACING_PX[density];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${s}' height='${s}'><path d='M 0 ${s - 0.5} H ${s} M ${s - 0.5} 0 V ${s}' stroke='${color}' stroke-width='0.5'/></svg>`;
  return buildSvgDataUrl(svg);
}

function diagonalPattern(color: string, density: PatternStripDensity): string {
  const s = SPACING_PX[density];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${s}' height='${s}'><line x1='0' y1='${s}' x2='${s}' y2='0' stroke='${color}' stroke-width='0.8'/></svg>`;
  return buildSvgDataUrl(svg);
}

function chevronPattern(color: string, density: PatternStripDensity): string {
  const s = SPACING_PX[density] * 2;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${s}' height='${s / 2}'><path d='M 0 ${s / 2} L ${s / 2} 0 L ${s} ${s / 2}' stroke='${color}' stroke-width='1' fill='none'/></svg>`;
  return buildSvgDataUrl(svg);
}

const PATTERN_BUILDERS: Record<
  PatternStripPattern,
  (color: string, density: PatternStripDensity) => string
> = {
  dots: dotsPattern,
  "lines-h": linesHPattern,
  "lines-v": linesVPattern,
  grid: gridPattern,
  diagonal: diagonalPattern,
  chevron: chevronPattern,
};

export function PatternStrip({
  pattern,
  color,
  width = "100%",
  height = "auto",
  density = "medium",
  opacity = 1,
  printSafe = false,
  className,
  style,
}: PatternStripProps) {
  // Repeating SVG patterns at <0.4 opacity break apart in Chromium's
  // print rasterizer and produce moiré. printSafe collapses the strip to
  // a flat stripe of the same color at 1/3 opacity — preserves the
  // visual hint without the printing artifacts.
  if (printSafe) {
    return (
      <div
        className={className}
        aria-hidden
        style={{
          backgroundColor: color,
          width,
          height,
          opacity: Math.max(0.08, opacity * 0.33),
          ...style,
        }}
      />
    );
  }

  const bg = PATTERN_BUILDERS[pattern](color, density);
  const containerStyle: CSSProperties = {
    backgroundImage: bg,
    backgroundRepeat: "repeat",
    width,
    height,
    opacity,
    ...style,
  };

  return <div className={className} aria-hidden style={containerStyle} />;
}
