"use client";

import type { CSSProperties } from "react";
import type { RichText } from "@/lib/cv-types";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";

export type TimelineEntry = {
  title: string;
  subtitle?: string;
  meta?: string;
  startDate: string;
  endDate?: string;
  bullets?: RichText[];
  notes?: string;
};

export type TimelineSectionProps = {
  entries: TimelineEntry[];
  showDateBadge?: boolean;
  dateFormat?: (start: string, end?: string) => string;
  bulletStyle?: "dot" | "dash" | "none";
  textColor?: string;
  textSoftColor?: string;
  accentColor?: string;
  spacing?: string;
  className?: string;
};

const DEFAULT_DATE_FORMAT = (start: string, end?: string): string =>
  `${start} — ${end ?? "Present"}`;

export function TimelineSection({
  entries,
  showDateBadge = false,
  dateFormat = DEFAULT_DATE_FORMAT,
  bulletStyle = "dot",
  textColor,
  textSoftColor,
  accentColor,
  spacing = "1.25rem",
  className,
}: TimelineSectionProps) {
  if (entries.length === 0) return null;

  const bulletGlyph =
    bulletStyle === "dash" ? "—" : bulletStyle === "none" ? "" : "•";

  const dateBadgeStyle: CSSProperties = {
    flexShrink: 0,
    fontSize: "0.75rem",
    backgroundColor: accentColor,
    color: textColor,
    padding: "0.125rem 0.5rem",
    borderRadius: "9999px",
  };

  const dateInlineStyle: CSSProperties = {
    flexShrink: 0,
    fontSize: "0.875rem",
    color: textSoftColor,
  };

  return (
    <div
      className={className}
      style={{ display: "flex", flexDirection: "column", gap: spacing }}
    >
      {entries.map((entry, i) => {
        const dateText = dateFormat(entry.startDate, entry.endDate);
        const validBullets = (entry.bullets ?? []).filter(
          (b) => !isRichTextEmpty(b),
        );

        return (
          <div key={`${entry.title}-${entry.startDate}-${i}`}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: "1rem",
                marginBottom: "0.25rem",
              }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: textColor,
                  margin: 0,
                }}
              >
                {entry.title}
                {entry.subtitle ? ` — ${entry.subtitle}` : ""}
              </p>
              <span style={showDateBadge ? dateBadgeStyle : dateInlineStyle}>
                {dateText}
              </span>
            </div>
            {entry.meta && (
              <p
                style={{
                  fontSize: "0.75rem",
                  fontStyle: "italic",
                  color: textSoftColor,
                  marginTop: 0,
                  marginBottom: "0.5rem",
                }}
              >
                {entry.meta}
              </p>
            )}
            {validBullets.length > 0 && (
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                  color: textSoftColor,
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                  margin: 0,
                  paddingLeft: 0,
                  listStyle: "none",
                }}
              >
                {validBullets.map((bullet, bi) => (
                  <li
                    key={bi}
                    style={{ display: "flex", gap: "0.5rem" }}
                  >
                    {bulletGlyph && <span aria-hidden>{bulletGlyph}</span>}
                    <RichTextRender html={bullet} as="span" />
                  </li>
                ))}
              </ul>
            )}
            {entry.notes && (
              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                  color: textSoftColor,
                  marginTop: "0.25rem",
                  marginBottom: 0,
                }}
              >
                {entry.notes}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
