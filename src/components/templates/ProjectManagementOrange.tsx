"use client";

import { type CSSProperties, type ReactNode } from "react";
import type { CVData } from "@/lib/cv-types";
import { resolveStyle, sectionLabel } from "@/lib/cv-themes";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";

// Frozen color constants. Visual changes here would silently re-style
// users' saved CVs — don't touch after ship.
const HERO_ORANGE = "#E8A063";
const BODY_BG = "#F5F0E2";
const NAME_NAVY = "#1A2940";
const SECTION_LABEL_BLUE = "#7A8AAE";
const SPINE_LINE = "#1A2940";

const HERO_HEIGHT = 380;
const SPINE_LEFT_PCT = 12;

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
    color: NAME_NAVY,
    backgroundColor: BODY_BG,
  };
  return {
    headingFont: r.headingFont,
    bodyFont: r.bodyFont,
    density: r.density,
    densityClass,
    articleStyle,
  };
}

function AsteriskFlower() {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <g fill={NAME_NAVY}>
        <ellipse cx="30" cy="14" rx="5" ry="14" transform="rotate(0 30 30)" />
        <ellipse cx="30" cy="14" rx="5" ry="14" transform="rotate(60 30 30)" />
        <ellipse cx="30" cy="14" rx="5" ry="14" transform="rotate(120 30 30)" />
        <ellipse cx="30" cy="14" rx="5" ry="14" transform="rotate(180 30 30)" />
        <ellipse cx="30" cy="14" rx="5" ry="14" transform="rotate(240 30 30)" />
        <ellipse cx="30" cy="14" rx="5" ry="14" transform="rotate(300 30 30)" />
      </g>
    </svg>
  );
}

// 13 lines evenly spaced from 180° → 0° (top half-circle), radius 55,
// center (50, 60). Some endpoints overflow the 100×60 viewBox by design —
// SVG overflow is set to visible so the burst reaches its full radius.
function SunBurst() {
  const cx = 50;
  const cy = 60;
  const radius = 55;
  const count = 13;
  const lines = Array.from({ length: count }, (_, i) => {
    const theta = (Math.PI * (count - 1 - i)) / (count - 1); // i=0 → π (left), i=12 → 0 (right)
    const x2 = cx + radius * Math.cos(theta);
    const y2 = cy - radius * Math.sin(theta);
    return { x2: Number(x2.toFixed(2)), y2: Number(y2.toFixed(2)) };
  });
  return (
    <svg
      width="100"
      height="60"
      viewBox="0 0 100 60"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke={NAME_NAVY}
      strokeWidth="1.5"
      strokeLinecap="round"
      style={{ overflow: "visible" }}
      aria-hidden
    >
      {lines.map((l, i) => (
        <line key={i} x1={cx} y1={cy} x2={l.x2} y2={l.y2} />
      ))}
    </svg>
  );
}

function SectionLabel({ children, ctx }: { children: string; ctx: Ctx }) {
  return (
    <h2
      className="mb-[12px] text-[10.5px] font-medium uppercase tracking-[0.18em]"
      style={{
        color: SECTION_LABEL_BLUE,
        fontFamily: `${ctx.bodyFont.cssVar}, ${ctx.bodyFont.fallback}`,
      }}
    >
      {children}
    </h2>
  );
}

function Section({ children }: { children: ReactNode }) {
  return <section className="mb-[24px] last:mb-0">{children}</section>;
}

function formatLanguageLine(langs: CVData["languages"]): string | null {
  if (!langs || langs.length === 0) return null;
  const names = langs.map((l) => l.name);
  if (names.length === 1) return `Proficient in ${names[0]}`;
  if (names.length === 2) return `Proficient in ${names[0]} and ${names[1]}`;
  const head = names.slice(0, -1).join(", ");
  const tail = names[names.length - 1];
  return `Proficient in ${head}, and ${tail}`;
}

function Hero({ data, ctx }: { data: CVData; ctx: Ctx }) {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const displayName = basics.fullName?.trim() ? basics.fullName : "Untitled";
  const summary = basics.summary;
  const contactLines = [
    basics.location,
    basics.phone,
    basics.email,
    basics.website,
    basics.linkedIn,
  ].filter((v): v is string => Boolean(v));

  return (
    <div
      style={{
        height: HERO_HEIGHT,
        backgroundColor: HERO_ORANGE,
        padding: "44px 56px 36px",
        display: "grid",
        gridTemplateColumns: "1fr 280px",
        columnGap: 32,
      }}
    >
      <div className="flex flex-col">
        <div style={{ marginBottom: 18 }}>
          <AsteriskFlower />
        </div>
        <h1
          style={{
            fontFamily: `${ctx.headingFont.cssVar}, ${ctx.headingFont.fallback}`,
            color: NAME_NAVY,
            fontSize: 46,
            fontWeight: 400,
            letterSpacing: "-0.5px",
            lineHeight: 1.05,
            marginBottom: 14,
          }}
        >
          {displayName}
        </h1>
        {!isRichTextEmpty(summary) && (
          <RichTextRender
            html={summary ?? ""}
            as="p"
            className="text-[11.5px] [&_strong]:font-semibold"
            style={{
              color: NAME_NAVY,
              lineHeight: 1.5,
              maxWidth: 380,
            }}
          />
        )}
      </div>

      {contactLines.length > 0 && (
        <div
          className="flex flex-col"
          style={{
            color: NAME_NAVY,
            fontSize: 11,
            lineHeight: 1.55,
            paddingTop: 6,
          }}
        >
          {contactLines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}
    </div>
  );
}

function ExperienceList({
  items,
  ctx,
}: {
  items: CVData["experience"];
  ctx: Ctx;
}) {
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
            <p
              className="text-[12px]"
              style={{
                color: NAME_NAVY,
                fontWeight: 700,
                lineHeight: 1.3,
                fontFamily: `${ctx.bodyFont.cssVar}, ${ctx.bodyFont.fallback}`,
              }}
            >
              {job.role || job.company}
            </p>
            <p
              className="text-[11px]"
              style={{ color: NAME_NAVY, lineHeight: 1.45 }}
            >
              {job.role ? job.company : ""}
              {job.role && job.location ? `, ${job.location}` : ""}
              {!job.role && job.location ? job.location : ""}
            </p>
            <p
              className="text-[10.5px]"
              style={{ color: NAME_NAVY, lineHeight: 1.45, opacity: 0.85 }}
            >
              {dateStr}
            </p>
            {job.bullets && job.bullets.some((b) => !isRichTextEmpty(b)) && (
              <div
                className="mt-1.5 space-y-1 text-[11px] [&_strong]:font-semibold"
                style={{ color: NAME_NAVY, lineHeight: 1.55 }}
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
  ctx,
}: {
  items: NonNullable<CVData["certifications"]>;
  ctx: Ctx;
}) {
  return (
    <div>
      {items.map((cert, i) => {
        const isLast = i === items.length - 1;
        return (
          <div
            key={`${cert.name}-${i}`}
            style={{ marginBottom: isLast ? 0 : 14 }}
          >
            <p
              className="text-[12px]"
              style={{
                color: NAME_NAVY,
                fontWeight: 700,
                lineHeight: 1.3,
                fontFamily: `${ctx.bodyFont.cssVar}, ${ctx.bodyFont.fallback}`,
              }}
            >
              {cert.name}
            </p>
            {cert.issuer && (
              <p
                className="text-[11px]"
                style={{ color: NAME_NAVY, lineHeight: 1.45 }}
              >
                {cert.issuer}
              </p>
            )}
            {cert.year && (
              <p
                className="text-[10.5px]"
                style={{ color: NAME_NAVY, lineHeight: 1.45, opacity: 0.85 }}
              >
                {cert.year}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function EducationList({
  items,
  ctx,
}: {
  items: CVData["education"];
  ctx: Ctx;
}) {
  return (
    <div>
      {items.map((entry, i) => {
        const isLast = i === items.length - 1;
        const dateStr = entry.endDate || entry.startDate || "";
        return (
          <div
            key={`${entry.school}-${entry.startDate}-${i}`}
            style={{ marginBottom: isLast ? 0 : 14 }}
          >
            <p
              className="text-[12px]"
              style={{
                color: NAME_NAVY,
                fontWeight: 700,
                lineHeight: 1.3,
                fontFamily: `${ctx.bodyFont.cssVar}, ${ctx.bodyFont.fallback}`,
              }}
            >
              {entry.degree || entry.school}
            </p>
            {entry.degree && (
              <p
                className="text-[11px]"
                style={{ color: NAME_NAVY, lineHeight: 1.45 }}
              >
                {entry.school}
                {entry.location ? `, ${entry.location}` : ""}
              </p>
            )}
            {dateStr && (
              <p
                className="text-[10.5px]"
                style={{ color: NAME_NAVY, lineHeight: 1.45, opacity: 0.85 }}
              >
                {dateStr}
              </p>
            )}
            {entry.notes && (
              <p
                className="mt-1 text-[11px] italic"
                style={{ color: NAME_NAVY, lineHeight: 1.5 }}
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

function Body({ data, ctx }: { data: CVData; ctx: Ctx }) {
  const experience = data?.experience ?? [];
  const education = data?.education ?? [];
  const skills = data?.skills ?? [];
  const certifications = data?.certifications ?? [];
  const languageLine = formatLanguageLine(data?.languages);

  const hasExperience = experience.length > 0;
  const hasEducation = education.length > 0;
  const hasSkills = skills.length > 0 || Boolean(languageLine);
  const hasCertifications = certifications.length > 0;

  return (
    <div
      className="relative flex-1"
      style={{ backgroundColor: BODY_BG }}
    >
      {/* Vertical spine line — runs full body height from just below hero
          to page bottom, aligned with asterisk's vertical axis */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${SPINE_LEFT_PCT}%`,
          width: 1,
          backgroundColor: SPINE_LINE,
        }}
      />

      {/* Two-column body content, padded right of the spine */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "1fr 1fr",
          columnGap: 36,
          padding: "36px 56px 80px",
          paddingLeft: `calc(${SPINE_LEFT_PCT}% + 28px)`,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left column: Work Experience + Additional Experience */}
        <div>
          {hasExperience && (
            <Section>
              <SectionLabel ctx={ctx}>
                {sectionLabel(data, "experience", "WORK EXPERIENCE")}
              </SectionLabel>
              <ExperienceList items={experience} ctx={ctx} />
            </Section>
          )}
          {hasCertifications && (
            <Section>
              <SectionLabel ctx={ctx}>ADDITIONAL EXPERIENCE</SectionLabel>
              <CertificationsList items={certifications} ctx={ctx} />
            </Section>
          )}
        </div>

        {/* Right column: Skills + Education */}
        <div>
          {hasSkills && (
            <Section>
              <SectionLabel ctx={ctx}>
                {sectionLabel(data, "skills", "SKILLS")}
              </SectionLabel>
              <div
                className="text-[11px]"
                style={{ color: NAME_NAVY, lineHeight: 1.7 }}
              >
                {skills.map((skill, i) => (
                  <p key={`skill-${i}`}>{skill}</p>
                ))}
                {languageLine && (
                  <p style={{ marginTop: 8 }}>{languageLine}</p>
                )}
              </div>
            </Section>
          )}
          {hasEducation && (
            <Section>
              <SectionLabel ctx={ctx}>
                {sectionLabel(data, "education", "EDUCATION")}
              </SectionLabel>
              <EducationList items={education} ctx={ctx} />
            </Section>
          )}
        </div>
      </div>

      {/* Bottom-right sun-burst */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: 36,
          bottom: 28,
          width: 100,
          height: 60,
        }}
      >
        <SunBurst />
      </div>
    </div>
  );
}

export function ProjectManagementOrange({
  data,
  paginated = false,
}: {
  data: CVData;
  paginated?: boolean;
}) {
  const ctx = computeCtx(data);

  const articleEl = (
    <article
      className={`cv-page ${paginated ? "" : "mx-auto aspect-[210/297] max-w-[800px]"} relative flex w-full flex-col overflow-hidden rounded-lg shadow-warm-card-hover ${ctx.densityClass}`.trim()}
      style={
        paginated
          ? { ...ctx.articleStyle, width: 794, minHeight: 1123 }
          : ctx.articleStyle
      }
    >
      <Hero data={data} ctx={ctx} />
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
