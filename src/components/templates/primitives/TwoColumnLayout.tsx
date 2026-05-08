"use client";

import type { CSSProperties, ReactNode } from "react";

export type TwoColumnLayoutProps = {
  sidebar: ReactNode;
  main: ReactNode;
  sidebarPosition?: "left" | "right";
  sidebarWidthPercent?: number;
  sidebarBg?: string;
  mainBg?: string;
  gap?: string | number;
  className?: string;
  style?: CSSProperties;
};

export function TwoColumnLayout({
  sidebar,
  main,
  sidebarPosition = "left",
  sidebarWidthPercent = 35,
  sidebarBg,
  mainBg = "transparent",
  gap = 0,
  className,
  style,
}: TwoColumnLayoutProps) {
  const clamped = Math.max(20, Math.min(50, sidebarWidthPercent));

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: sidebarPosition === "left" ? "row" : "row-reverse",
    gap: typeof gap === "number" ? `${gap}px` : gap,
    width: "100%",
    ...style,
  };

  const sidebarStyle: CSSProperties = {
    width: `${clamped}%`,
    backgroundColor: sidebarBg,
    flexShrink: 0,
  };

  const mainStyle: CSSProperties = {
    width: `${100 - clamped}%`,
    backgroundColor: mainBg,
    flexShrink: 0,
  };

  return (
    <div className={className} style={containerStyle}>
      <div style={sidebarStyle}>{sidebar}</div>
      <div style={mainStyle}>{main}</div>
    </div>
  );
}
