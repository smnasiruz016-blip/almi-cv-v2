"use client";

import { type CSSProperties, type ReactNode } from "react";
import type { CVData } from "@/lib/cv-types";
import { resolveStyle, sectionLabel } from "@/lib/cv-themes";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";

// Frozen color constants. Visual changes here would silently re-style
// users' saved CVs — don't touch after ship.
const HEADER_CHARCOAL = "#23211C";
const BOARD_WOOD = "#9C6B3F";
const BOARD_WOOD_DK = "#7A5230";
const CARD_CREAM = "#F6EFE0";
const INK = "#2A2620";
const ACCENT_COPPER = "#B07A3A";
const LABEL_OLIVE = "#7C7A55";
const DIVIDER = "#D8CBAF";

const HEADER_HEIGHT = 188;

type Ctx = {
  headingFont: ReturnType<typeof resolveStyle>["headingFont"];
  bodyFont: ReturnType<typeof resolveStyle>["bodyFont"];
  density: ReturnType<typeof resolveStyle>["density"];
  densityClass: string;
  articleStyle: CSSProperties;
};

function computeCtx(data: CVData): Ctx {
  const r = resolveStyle(data?.style);
  const densityClass =
    r.density === "compact" ? "compact" : r.density === "spacious" ? "spacious" : "";
  const articleStyle: CSSProperties = {
    fontFamily: `${r.bodyFont.cssVar}, ${r.bodyFont.fallback}`,
    color: INK,
    backgroundColor: CARD_CREAM,
  };
  return {
    headingFont: r.headingFont,
    bodyFont: r.bodyFont,
    density: r.density,
    densityClass,
    articleStyle,
  };
}

// Chef's toque — pure inline SVG, the signature profession mark.
function ChefHat() {
  return (
    <svg
      width="54"
      height="54"
      viewBox="0 0 54 54"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <g fill="#F6EFE0">
        <circle cx="17" cy="20" r="11" />
        <circle cx="37" cy="20" r="11" />
        <circle cx="27" cy="14" r="12" />
        <rect x="15" y="22" width="24" height="20" rx="2" />
      </g>
      <rect x="15" y="34" width="24" height="3.4" fill={ACCENT_COPPER} />
    </svg>
  );
}

// A small fork+knife divider flourish.
function CutleryRule() {
  return (
    <svg
      width="120"
      height="14"
      viewBox="0 0 120 14"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke={ACCENT_COPPER}
      strokeWidth="1.4"
      strokeLinecap="round"
      aria-hidden
    >
      <line x1="0" y1="7" x2="44" y2="7" />
      <line x1="76" y1="7" x2="120" y2="7" />
      <path d="M55 2 L55 12 M58 2 L58 12 M61 2 L61 12 M58 12 L58 2" />
      <path d="M67 2 C71 4 71 8 67 9 L67 12" />
    </svg>
  );
}

function SectionLabel({ children, ctx }: { children: string; ctx: Ctx }) {
  return (
    <h2
      className="mb-[12px] flex items-center gap-[8px] text-[11px] font-semibold uppercase tracking-[0.16em]"
      style={{
        color: ACCENT_COPPER,
        fontFamily: `${ctx.bodyFont.cssVar}, ${ctx.bodyFont.fallback}`,
      }}
    >
      <span
        aria-hidden
        style={{
          display: "inline-block",
          width: 18,
          height: 2,
          backgroundColor: ACCENT_COPPER,
        }}
      />
      {children}
    </h2>
  );
}

function Section({ children }: { children: ReactNode }) {
  return <section className="mb-[22px] last:mb-0">{children}</section>;
}

function formatLanguageLine(langs: CVData["languages"]): string | null {
  if (!langs || langs.length === 0) return null;
  const names = langs.map((l) => l.name);
  if (names.length === 1) return `Fluent in ${names[0]}`;
  if (names.length === 2) return `Fluent in ${names[0]} and ${names[1]}`;
  const head = names.slice(0, -1).join(", ");
  const tail = names[names.length - 1];
  return `Fluent in ${head}, and ${tail}`;
}

function Header({ data, ctx }: { data: CVData; ctx: Ctx }) {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const displayName = basics.fullName?.trim() ? basics.fullName : "Untitled";
  const role = basics.role;
  const photoStyle = data.style?.photoStyle ?? "round";
  const showPhoto = photoStyle !== "none";
  const radius = photoStyle === "square" ? "10px" : "9999px";

  return (
    <div
      style={{
        minHeight: HEADER_HEIGHT,
        backgroundColor: HEADER_CHARCOAL,
        padding: "30px 56px 26px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {showPhoto &&
        (basics.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={basics.photoUrl}
            alt={displayName}
            style={{
              height: 86,
              width: 86,
              objectFit: "cover",
              borderRadius: radius,
              border: `3px solid ${ACCENT_COPPER}`,
              marginBottom: 12,
            }}
          />
        ) : (
          <div
            aria-hidden
            style={{
              height: 86,
              width: 86,
              borderRadius: radius,
              border: `3px solid ${ACCENT_COPPER}`,
              backgroundColor: "#322F28",
              display: "grid",
              placeItems: "center",
              marginBottom: 12,
            }}
          >
            <ChefHat />
          </div>
        ))}
      {!showPhoto && (
        <div style={{ marginBottom: 8 }}>
          <ChefHat />
        </div>
      )}
      <h1
        style={{
          fontFamily: `${ctx.headingFont.cssVar}, ${ctx.headingFont.fallback}`,
          color: CARD_CREAM,
          fontSize: 40,
          fontWeight: 700,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          lineHeight: 1.05,
        }}
      >
        {displayName}
      </h1>
      {role && (
        <p
          style={{
            color: ACCENT_COPPER,
            fontSize: 12.5,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginTop: 8,
          }}
        >
          {role}
        </p>
      )}
      <div style={{ marginTop: 12 }}>
        <CutleryRule />
      </div>
    </div>
  );
}

function ContactStrip({ data }: { data: CVData }) {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const items = [
    basics.location,
    basics.phone,
    basics.email,
    basics.website,
    basics.linkedIn,
  ].filter((v): v is string => Boolean(v));
  if (items.length === 0) return null;
  return (
    <div
      style={{
        backgroundColor: BOARD_WOOD,
        color: CARD_CREAM,
        padding: "10px 56px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "6px 22px",
        fontSize: 10.5,
        letterSpacing: "0.04em",
      }}
    >
      {items.map((it, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {it}
          {i < items.length - 1 && (
            <span aria-hidden style={{ color: BOARD_WOOD_DK }}>
              ·
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

function ExperienceList({ items }: { items: CVData["experience"] }) {
  return (
    <div>
      {items.map((job, i) => {
        const isLast = i === items.length - 1;
        const dateStr = job.endDate
          ? `${job.startDate} – ${job.endDate}`
          : `${job.startDate} – Present`;
        return (
          <div
            key={`${job.company}-${job.startDate}-${i}`}
            style={{ marginBottom: isLast ? 0 : 16 }}
          >
            <p className="text-[12px]" style={{ color: INK, fontWeight: 700, lineHeight: 1.3 }}>
              {job.role || job.company}
            </p>
            <p className="text-[11px]" style={{ color: ACCENT_COPPER, lineHeight: 1.45 }}>
              {job.role ? job.company : ""}
              {job.role && job.location ? `, ${job.location}` : ""}
              {!job.role && job.location ? job.location : ""}
            </p>
            <p className="text-[10px]" style={{ color: INK, lineHeight: 1.45, opacity: 0.7 }}>
              {dateStr}
            </p>
            {job.bullets && job.bullets.some((b) => !isRichTextEmpty(b)) && (
              <div
                className="mt-1.5 space-y-1 text-[11px] [&_strong]:font-semibold"
                style={{ color: INK, lineHeight: 1.55 }}
              >
                {job.bullets
                  .filter((b) => !isRichTextEmpty(b))
                  .map((b, bi) => (
                    <RichTextRender key={bi} html={b} as="p" />
                  ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function CertificationsList({
  items,
}: {
  items: NonNullable<CVData["certifications"]>;
}) {
  return (
    <div>
      {items.map((cert, i) => {
        const isLast = i === items.length - 1;
        return (
          <div key={`${cert.name}-${i}`} style={{ marginBottom: isLast ? 0 : 12 }}>
            <p className="text-[11.5px]" style={{ color: INK, fontWeight: 700, lineHeight: 1.3 }}>
              {cert.name}
            </p>
            {cert.issuer && (
              <p className="text-[10.5px]" style={{ color: INK, lineHeight: 1.45, opacity: 0.8 }}>
                {cert.issuer}
                {cert.year ? ` · ${cert.year}` : ""}
              </p>
            )}
            {!cert.issuer && cert.year && (
              <p className="text-[10.5px]" style={{ color: INK, lineHeight: 1.45, opacity: 0.8 }}>
                {cert.year}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function EducationList({ items }: { items: CVData["education"] }) {
  return (
    <div>
      {items.map((entry, i) => {
        const isLast = i === items.length - 1;
        const dateStr = entry.endDate || entry.startDate || "";
        return (
          <div
            key={`${entry.school}-${entry.startDate}-${i}`}
            style={{ marginBottom: isLast ? 0 : 12 }}
          >
            <p className="text-[11.5px]" style={{ color: INK, fontWeight: 700, lineHeight: 1.3 }}>
              {entry.degree || entry.school}
            </p>
            {entry.degree && (
              <p className="text-[10.5px]" style={{ color: INK, lineHeight: 1.45 }}>
                {entry.school}
                {entry.location ? `, ${entry.location}` : ""}
              </p>
            )}
            {dateStr && (
              <p className="text-[10px]" style={{ color: INK, lineHeight: 1.45, opacity: 0.7 }}>
                {dateStr}
              </p>
            )}
            {entry.notes && (
              <p className="mt-1 text-[10.5px] italic" style={{ color: INK, lineHeight: 1.5 }}>
                {entry.notes}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Body({ data, ctx }: { data: CVData; ctx: Ctx }) {
  const experience = data?.experience ?? [];
  const education = data?.education ?? [];
  const skills = data?.skills ?? [];
  const certifications = data?.certifications ?? [];
  const languageLine = formatLanguageLine(data?.languages);
  const summary = data?.basics?.summary;

  const hasSummary = !isRichTextEmpty(summary);
  const hasExperience = experience.length > 0;
  const hasEducation = education.length > 0;
  const hasSkills = skills.length > 0 || Boolean(languageLine);
  const hasCertifications = certifications.length > 0;

  return (
    <div className="flex-1" style={{ backgroundColor: CARD_CREAM, padding: "34px 56px 64px" }}>
      {hasSummary && (
        <Section>
          <SectionLabel ctx={ctx}>{sectionLabel(data, "profile", "PROFILE")}</SectionLabel>
          <RichTextRender
            html={summary ?? ""}
            as="p"
            className="text-[11.5px] [&_strong]:font-semibold"
            style={{ color: INK, lineHeight: 1.6 }}
          />
        </Section>
      )}

      <div
        className="grid"
        style={{ gridTemplateColumns: "1.55fr 1fr", columnGap: 40 }}
      >
        <div>
          {hasExperience && (
            <Section>
              <SectionLabel ctx={ctx}>
                {sectionLabel(data, "experience", "KITCHEN EXPERIENCE")}
              </SectionLabel>
              <ExperienceList items={experience} />
            </Section>
          )}
          {hasCertifications && (
            <Section>
              <SectionLabel ctx={ctx}>CERTIFICATIONS</SectionLabel>
              <CertificationsList items={certifications} />
            </Section>
          )}
        </div>

        <div>
          {hasSkills && (
            <Section>
              <SectionLabel ctx={ctx}>
                {sectionLabel(data, "skills", "SPECIALTIES")}
              </SectionLabel>
              <div className="text-[11px]" style={{ color: INK, lineHeight: 1.7 }}>
                {skills.map((skill, i) => (
                  <p
                    key={`skill-${i}`}
                    style={{
                      borderBottom: `1px solid ${DIVIDER}`,
                      paddingBottom: 5,
                      marginBottom: 6,
                    }}
                  >
                    {skill}
                  </p>
                ))}
                {languageLine && <p style={{ marginTop: 8 }}>{languageLine}</p>}
              </div>
            </Section>
          )}
          {hasEducation && (
            <Section>
              <SectionLabel ctx={ctx}>
                {sectionLabel(data, "education", "EDUCATION")}
              </SectionLabel>
              <EducationList items={education} />
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

export function CulinaryChef({
  data,
  paginated = false,
}: {
  data: CVData;
  paginated?: boolean;
}) {
  const ctx = computeCtx(data);

  const articleEl = (
    <article
      className={`cv-page ${
        paginated ? "" : "mx-auto aspect-[210/297] max-w-[800px]"
      } relative flex w-full flex-col overflow-hidden rounded-lg shadow-warm-card-hover ${
        ctx.densityClass
      }`.trim()}
      style={
        paginated
          ? { ...ctx.articleStyle, width: 794, minHeight: 1123 }
          : ctx.articleStyle
      }
    >
      <Header data={data} ctx={ctx} />
      <ContactStrip data={data} />
      <Body data={data} ctx={ctx} />
    </article>
  );

  if (!paginated) return articleEl;

  return (
    <div
      className="cv-preview-wrapper mx-auto"
      style={{ width: 600, height: 849, overflow: "hidden" }}
    >
      <div
        style={{
          transform: "scale(0.7556)",
          transformOrigin: "top left",
          width: 794,
        }}
      >
        {articleEl}
      </div>
    </div>
  );
}
