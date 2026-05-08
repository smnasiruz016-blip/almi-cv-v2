"use client";

export type LanguageItem = { name: string; level: string };

export type LanguagesBlockProps = {
  languages: LanguageItem[];
  variant?: "plain" | "tags" | "bars";
  levelLabels?: Record<string, string>;
  levelToScore?: (level: string) => number;
  accentColor?: string;
  textColor?: string;
  textSoftColor?: string;
  className?: string;
};

const DEFAULT_CEFR_SCORE: Record<string, number> = {
  A1: 16,
  A2: 33,
  B1: 50,
  B2: 67,
  C1: 83,
  C2: 100,
};

const defaultLevelToScore = (level: string): number => {
  const upper = level.toUpperCase().trim();
  return DEFAULT_CEFR_SCORE[upper] ?? 50;
};

export function LanguagesBlock({
  languages,
  variant = "plain",
  levelLabels,
  levelToScore = defaultLevelToScore,
  accentColor,
  textColor,
  textSoftColor,
  className,
}: LanguagesBlockProps) {
  if (languages.length === 0) return null;
  const labelFor = (level: string): string => levelLabels?.[level] ?? level;

  if (variant === "tags") {
    return (
      <div
        className={className}
        style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}
      >
        {languages.map((lang, i) => (
          <span
            key={`${lang.name}-${i}`}
            style={{
              fontSize: "0.75rem",
              padding: "0.25rem 0.625rem",
              borderRadius: "9999px",
              backgroundColor: accentColor,
              color: textColor,
            }}
          >
            {lang.name} · {labelFor(lang.level)}
          </span>
        ))}
      </div>
    );
  }

  if (variant === "bars") {
    return (
      <div
        className={className}
        style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
      >
        {languages.map((lang, i) => {
          const score = Math.max(0, Math.min(100, levelToScore(lang.level)));
          return (
            <div key={`${lang.name}-${i}`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.75rem",
                  marginBottom: "0.125rem",
                }}
              >
                <span style={{ color: textColor }}>{lang.name}</span>
                <span style={{ color: textSoftColor }}>
                  {labelFor(lang.level)}
                </span>
              </div>
              <div
                style={{
                  height: "0.25rem",
                  borderRadius: "9999px",
                  backgroundColor: textSoftColor,
                  opacity: 0.25,
                }}
              >
                <div
                  style={{
                    width: `${score}%`,
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

  // plain
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
      {languages.map((l) => `${l.name} (${labelFor(l.level)})`).join(" · ")}
    </p>
  );
}
