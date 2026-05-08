"use client";

import type { CSSProperties, ReactNode } from "react";

export type SingleColumnLayoutProps = {
  children: ReactNode;
  maxWidth?: number | string;
  padding?: string;
  bg?: string;
  className?: string;
  style?: CSSProperties;
};

export function SingleColumnLayout({
  children,
  maxWidth = "100%",
  padding = "3rem",
  bg = "white",
  className,
  style,
}: SingleColumnLayoutProps) {
  const containerStyle: CSSProperties = {
    width: "100%",
    maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
    marginLeft: "auto",
    marginRight: "auto",
    padding,
    backgroundColor: bg,
    ...style,
  };

  return (
    <div className={className} style={containerStyle}>
      {children}
    </div>
  );
}
