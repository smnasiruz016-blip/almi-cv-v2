"use client";

import type { CSSProperties, ReactNode } from "react";
import { resolveIcon, type IconName } from "./icons";
import type { FontDef } from "./types";

export type SectionHeadingProps = {
  children: ReactNode;
  variant?: "plain" | "underline" | "accent-bar" | "icon-prefix";
  color?: string;
  accentColor?: string;
  icon?: IconName;
  headingFont?: FontDef;
  size?: "xs" | "sm" | "md";
  tracking?: string;
  className?: string;
  style?: CSSProperties;
};

const SIZE_PX: Record<NonNullable<SectionHeadingProps["size"]>, string> = {
  xs: "10px",
  sm: "13px",
  md: "15px",
};

export function SectionHeading({
  children,
  variant = "plain",
  color,
  accentColor,
  icon,
  headingFont,
  size = "xs",
  tracking = "0.25em",
  className,
  style,
}: SectionHeadingProps) {
  const Icon = resolveIcon(icon);
  const fontFamily = headingFont
    ? `${headingFont.cssVar}, ${headingFont.fallback}`
    : undefined;

  const baseStyle: CSSProperties = {
    fontSize: SIZE_PX[size],
    letterSpacing: tracking,
    color,
    fontFamily,
    margin: 0,
    ...style,
  };

  const iconNode = Icon ? (
    <Icon
      style={{
        width: "1.2em",
        height: "1.2em",
        color: accentColor ?? color,
        flexShrink: 0,
      }}
      strokeWidth={2}
      aria-hidden
    />
  ) : null;

  if (variant === "accent-bar") {
    return (
      <h2
        className={className}
        style={{
          ...baseStyle,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: 4,
            height: "1.2em",
            backgroundColor: accentColor ?? color ?? "currentColor",
            flexShrink: 0,
          }}
        />
        {iconNode}
        <span>{children}</span>
      </h2>
    );
  }

  if (variant === "underline") {
    return (
      <h2
        className={className}
        style={{
          ...baseStyle,
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          borderBottom: `1px solid ${accentColor ?? color ?? "currentColor"}`,
          paddingBottom: 4,
        }}
      >
        {iconNode}
        <span>{children}</span>
      </h2>
    );
  }

  if (variant === "icon-prefix") {
    return (
      <h2
        className={className}
        style={{
          ...baseStyle,
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        {iconNode}
        <span>{children}</span>
      </h2>
    );
  }

  // plain
  return (
    <h2
      className={className}
      style={
        Icon
          ? {
              ...baseStyle,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }
          : baseStyle
      }
    >
      {iconNode}
      <span>{children}</span>
    </h2>
  );
}
