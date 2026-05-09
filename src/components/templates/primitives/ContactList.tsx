"use client";

import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { Globe, Link2, Mail, MapPin, Phone } from "lucide-react";
import type { ContactItem, ContactKind } from "./types";

export type ContactListProps = {
  items: ContactItem[];
  /**
   * `horizontal-ruled` is a horizontal layout with thin top + bottom
   * rules — used by templates whose header sits between two divider
   * lines (e.g. healthcare-bold-icu-nurse-v1). The rule color
   * inherits from `ruleColor` (or `textColor` if unset).
   */
  orientation?: "vertical" | "horizontal" | "horizontal-ruled" | "grid-2col";
  iconStyle?: "outline" | "filled" | "none";
  iconSize?: number;
  textColor?: string;
  iconColor?: string;
  /** Used only by `horizontal-ruled` for the top + bottom rules. */
  ruleColor?: string;
  textSize?: "xs" | "sm" | "md";
  gap?: string;
  className?: string;
};

const ICON_FOR: Record<ContactKind, LucideIcon> = {
  email: Mail,
  phone: Phone,
  location: MapPin,
  website: Globe,
  linkedin: Link2,
};

const TEXT_SIZE_PX: Record<NonNullable<ContactListProps["textSize"]>, string> = {
  xs: "0.6875rem",
  sm: "0.75rem",
  md: "0.875rem",
};

export function ContactList({
  items,
  orientation = "horizontal",
  iconStyle = "outline",
  iconSize = 14,
  textColor,
  iconColor,
  ruleColor,
  textSize = "xs",
  gap = "0.5rem",
  className,
}: ContactListProps) {
  if (items.length === 0) return null;

  const fontSize = TEXT_SIZE_PX[textSize];
  const containerStyle: CSSProperties =
    orientation === "vertical"
      ? { display: "flex", flexDirection: "column", gap }
      : orientation === "grid-2col"
        ? {
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap,
            columnGap: "1rem",
          }
        : {
            display: "flex",
            flexWrap: "wrap",
            columnGap: "1rem",
            rowGap: "0.25rem",
          };

  if (orientation === "horizontal-ruled") {
    const rule = `1px solid ${ruleColor ?? textColor ?? "currentColor"}`;
    containerStyle.borderTop = rule;
    containerStyle.borderBottom = rule;
    containerStyle.padding = "0.5rem 0";
  }

  return (
    <div className={className} style={containerStyle}>
      {items.map((item, i) => {
        const Icon = ICON_FOR[item.kind];
        return (
          <span
            key={`${item.kind}-${i}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              fontSize,
              color: textColor,
              minWidth: 0,
            }}
          >
            {iconStyle !== "none" && (
              <Icon
                size={iconSize}
                strokeWidth={iconStyle === "filled" ? 2.5 : 2}
                style={{
                  color: iconColor ?? textColor,
                  flexShrink: 0,
                }}
                aria-hidden
              />
            )}
            <span style={{ overflowWrap: "anywhere" }}>{item.value}</span>
          </span>
        );
      })}
    </div>
  );
}
