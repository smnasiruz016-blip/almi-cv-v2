"use client";

import type { CSSProperties } from "react";
import { ContactList } from "./ContactList";
import type { ContactItem, FontDef } from "./types";

export type HeaderBlockProps = {
  name: string;
  role?: string;
  photoUrl?: string;
  contacts?: ContactItem[];
  photoShape?: "circle" | "square" | "rounded" | "none";
  photoPosition?: "left" | "center" | "right";
  align?: "left" | "center" | "right";
  bg?: string;
  fg?: string;
  fgSoft?: string;
  accentColor?: string;
  headingFont?: FontDef;
  showContacts?: boolean;
  className?: string;
  style?: CSSProperties;
};

const RADIUS_FOR: Record<NonNullable<HeaderBlockProps["photoShape"]>, string> = {
  circle: "9999px",
  square: "0",
  rounded: "0.5rem",
  none: "0",
};

export function HeaderBlock({
  name,
  role,
  photoUrl,
  contacts = [],
  photoShape = "circle",
  photoPosition = "left",
  align = "left",
  bg,
  fg = "currentColor",
  fgSoft,
  accentColor,
  headingFont,
  showContacts = true,
  className,
  style,
}: HeaderBlockProps) {
  const showPhoto = photoShape !== "none" && Boolean(photoUrl);
  const isCenter = photoPosition === "center";

  const flexDirection: CSSProperties["flexDirection"] = isCenter
    ? "column"
    : photoPosition === "right"
      ? "row-reverse"
      : "row";

  const containerStyle: CSSProperties = {
    backgroundColor: bg,
    color: fg,
    padding: "2rem",
    display: "flex",
    flexDirection,
    alignItems: isCenter ? "center" : "center",
    gap: "1.5rem",
    textAlign: align,
    ...style,
  };

  const headingStyle: CSSProperties = {
    color: fg,
    fontFamily: headingFont
      ? `${headingFont.cssVar}, ${headingFont.fallback}`
      : undefined,
    fontSize: "2rem",
    fontWeight: 500,
    lineHeight: 1.1,
    margin: 0,
  };

  const roleStyle: CSSProperties = {
    color: fgSoft ?? fg,
    fontSize: "1rem",
    fontStyle: "italic",
    marginTop: "0.25rem",
    marginBottom: 0,
  };

  return (
    <header className={className} style={containerStyle}>
      {showPhoto && photoUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photoUrl}
          alt={name}
          style={{
            width: "5rem",
            height: "5rem",
            borderRadius: RADIUS_FOR[photoShape],
            objectFit: "cover",
            border: `2px solid ${fg}`,
            flexShrink: 0,
          }}
        />
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1 style={headingStyle}>{name}</h1>
        {role && <p style={roleStyle}>{role}</p>}
        {showContacts && contacts.length > 0 && (
          <div style={{ marginTop: "0.75rem" }}>
            <ContactList
              items={contacts}
              orientation={isCenter ? "horizontal" : "horizontal"}
              iconSize={14}
              textColor={fg}
              iconColor={accentColor ?? fgSoft ?? fg}
              textSize="xs"
            />
          </div>
        )}
      </div>
    </header>
  );
}
