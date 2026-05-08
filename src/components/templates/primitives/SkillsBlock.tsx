"use client";

import type { CSSProperties } from "react";

export type SkillsBlockProps = {
  skills: string[];
  variant?: "plain-list" | "tags" | "bars" | "grouped";
  accentColor?: string;
  textColor?: string;
  textSoftColor?: string;
  delimiter?: string;
  groups?: Record<string, string[]>;
  levelExtractor?: (skill: string) => number;
  className?: string;
};

export function SkillsBlock({
  skills,
  variant = "plain-list",
  accentColor,
  textColor,
  textSoftColor,
  delimiter = " · ",
  groups,
  levelExtractor,
  className,
}: SkillsBlockProps) {
  if (variant === "grouped" && groups) {
    return (
      <div
        className={className}
        style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
      >
        {Object.entries(groups).map(([groupName, items]) => (
          <div key={groupName}>
            <p
              style={{
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: textSoftColor,
                marginTop: 0,
                marginBottom: "0.25rem",
              }}
            >
              {groupName}
            </p>
            <p
              style={{
                fontSize: "0.875rem",
                color: textColor,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {items.join(delimiter)}
            </p>
          </div>
        ))}
      </div>
    );
  }

  if (skills.length === 0) return null;

  if (variant === "tags") {
    return (
      <div
        className={className}
        style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}
      >
        {skills.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            style={{
              fontSize: "0.75rem",
              padding: "0.25rem 0.625rem",
              borderRadius: "9999px",
              backgroundColor: accentColor,
              color: textColor,
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    );
  }

  if (variant === "bars") {
    const extract = levelExtractor ?? (() => 100);
    return (
      <div
        className={className}
        style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
      >
        {skills.map((skill, i) => {
          const level = Math.max(0, Math.min(100, extract(skill)));
          return (
            <div key={`${skill}-${i}`}>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: textColor,
                  margin: 0,
                  marginBottom: "0.125rem",
                }}
              >
                {skill}
              </p>
              <div
                style={{
                  height: "0.25rem",
                  borderRadius: "9999px",
                  backgroundColor: textSoftColor,
                  opacity: 0.25,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: `${level}%`,
                    height: "100%",
                    borderRadius: "9999px",
                    backgroundColor: accentColor,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // plain-list
  return (
    <p
      className={className}
      style={{
        fontSize: "0.875rem",
        lineHeight: 1.6,
        color: textSoftColor,
        margin: 0,
      }}
    >
      {skills.join(delimiter)}
    </p>
  );
}
