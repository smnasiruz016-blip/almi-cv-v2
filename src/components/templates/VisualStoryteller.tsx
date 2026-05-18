"use client";

import { type CSSProperties, type ReactNode } from "react";
import type { CVData } from "@/lib/cv-types";
import { resolveStyle, sectionLabel } from "@/lib/cv-themes";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";

const STAGE_BLACK = "#1A1A1C";
const PANEL_DARK = "#232327";
const FILM_EDGE = "#0E0E10";
const PAPER = "#FBFAF7";
const INK = "#262428";
const AMBER = "#D9892F";
const AMBER_SOFT = "#E7A857";
const MUTE = "#8A8790";
const DIVIDER = "#E4E0D8";

const HERO_HEIGHT = 360;

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
    backgroundColor: PAPER,
  };
  return {
    headingFont: r.headingFont,
    bodyFont: r.bodyFont,
    density: r.density,
    densityClass,
    articleStyle,
  };
}

// Camera aperture — the signature profession mark, pure inline SVG.
function Aperture() {
  const cx = 27;
  const cy = 27;
  const r = 22;
  const blades = Array.from({ length: 6 }, (_, i) => {
    const a0 = (Math.PI / 3) * i - Math.PI / 2;
    const a1 = a0 + Math.PI / 3;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const mx = cx + r * 0.36 * Math.cos(a0 + Math.PI / 6);
    const my = cy + r * 0.36 * Math.sin(a0 + Math.PI / 6);
    return `M${x0.toFixed(1)} ${y0.toFixed(1)} L${x1.toFixed(1)} ${y1.toFixed(
      1
    )} L${mx.toFixed(1)} ${my.toFixed(1)} Z`;
  });
  return (
    <svg
      width="54"
      height="54"
      viewBox="0 0 54 54"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx={cx} cy={cy} r={r + 2} fill="none" stroke={AMBER} strokeWidth="1.5" />
      {blades.map((d, i) => (
        <path key={i} d={d} fill={i % 2 === 0 ? AMBER : AMBER_SOFT} opacity={0.92} />
      ))}
      <circle cx={cx} cy={cy} r="5" fill={STAGE_BLACK} />
    </svg>
  );
}

// Vertical film-strip rail — perforated edge, pure CSS/SVG.
function FilmRail() {
  const holes = Array.from({ length: 14 }, (_, i) => i);
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        width: 26,
        backgroundColor: FILM_EDGE,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        paddingTop: 14,
        paddingBottom: 14,
      }}
    >
      {holes.map((h) => (
        <span
          key={h}
          style={{
            width: 9,
            height: 13,
            borderRadius: 2,
            backgroundColor: PAPER,
            opacity: 0.9,
          }}
        />
      ))}
    </div>
  );
}

function SectionLabel({ children, ctx }: { children: string; ctx: Ctx }) {
  return (
    <h2
      className="mb-[12px] flex items-center gap-[9px] text-[11px] font-semibold uppercase tracking-[0.2em]"
      style={{
        color: AMBER,
        fontFamily: `${ctx.bodyFont.cssVar}, ${ctx.bodyFont.fallback}`,
      }}
    >
      <span
        aria-hidden
        style={{
          display: "inline-block",
          width: 14,
          height: 14,
          border: `2px solid ${AMBER}`,
          borderRadius: "50%",
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

function Hero({ data, ctx }: { data: CVData; ctx: Ctx }) {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const displayName = basics.fullName?.trim() ? basics.fullName : "Untitled";
  const role = basics.role;
  const photoStyle = data.style?.photoStyle ?? "round";
  const showPhoto = photoStyle !== "none";
  const radius = photoStyle === "square" ? "10px" : "9999px";
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
        position: "relative",
        minHeight: HERO_HEIGHT,
        backgroundColor: STAGE_BLACK,
        padding: "40px 56px 36px 70px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <FilmRail />
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        {showPhoto &&
          (basics.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={basics.photoUrl}
              alt={displayName}
              style={{
                height: 96,
                width: 96,
                objectFit: "cover",
                borderRadius: radius,
                border: `3px solid ${AMBER}`,
              }}
            />
          ) : (
            <div
              aria-hidden
              style={{
                height: 96,
                width: 96,
                borderRadius: radius,
                border: `3px solid ${AMBER}`,
                backgroundColor: PANEL_DARK,
                display: "grid",
                placeItems: "center",
              }}
            >
              <Aperture />
            </div>
          ))}
        {!showPhoto && <Aperture />}
        <div>
          <h1
            style={{
              fontFamily: `${ctx.headingFont.cssVar}, ${ctx.headingFont.fallback}`,
              color: PAPER,
              fontSize: 44,
              fontWeight: 700,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              lineHeight: 1.04,
            }}
          >
            {displayName}
          </h1>
          {role && (
            <p
              style={{
                color: AMBER,
                fontSize: 12.5,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                marginTop: 8,
              }}
            >
              {role}
            </p>
          )}
        </div>
      </div>

      {!isRichTextEmpty(basics.summary) && (
        <RichTextRender
          html={basics.summary ?? ""}
          as="p"
          className="text-[11.5px] [&_strong]:font-semibold"
          style={{
            color: "#CFCBD2",
            lineHeight: 1.6,
            marginTop: 24,
            maxWidth: 560,
          }}
        />
      )}

      {contactLines.length > 0 && (
        <div
          style={{
            marginTop: "auto",
            paddingTop: 22,
            display: "flex",
            flexWrap: "wrap",
            gap: "4px 20px",
            color: MUTE,
            fontSize: 10.5,
            letterSpacing: "0.04em",
          }}
        >
          {contactLines.map((line, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 20 }}>
              {line}
              {i < contactLines.length - 1 && (
                <span aria-hidden style={{ color: AMBER }}>
                  /
                </span>
              )}
            </span>
          ))}
        </div>
      )}
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
            <p className="text-[11px]" style={{ color: AMBER, lineHeight: 1.45 }}>
              {job.role ? job.company : ""}
              {job.role && job.location ? `, ${job.location}` : ""}
              {!job.role && job.location ? job.location : ""}
            </p>
            <p className="text-[10px]" style={{ color: INK, lineHeight: 1.45, opacity: 0.6 }}>
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
              <p className="text-[10.5px]" style={{ color: INK, lineHeight: 1.45, opacity: 0.75 }}>
                {cert.issuer}
                {cert.year ? ` · ${cert.year}` : ""}
              </p>
            )}
            {!cert.issuer && cert.year && (
              <p className="text-[10.5px]" style={{ color: INK, lineHeight: 1.45, opacity: 0.75 }}>
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
              <p className="text-[10px]" style={{ color: INK, lineHeight: 1.45, opacity: 0.6 }}>
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

  const hasExperience = experience.length > 0;
  const hasEducation = education.length > 0;
  const hasSkills = skills.length > 0 || Boolean(languageLine);
  const hasCertifications = certifications.length > 0;

  return (
    <div className="flex-1" style={{ backgroundColor: PAPER, padding: "34px 56px 64px" }}>
      <div className="grid" style={{ gridTemplateColumns: "1.5fr 1fr", columnGap: 40 }}>
        <div>
          {hasExperience && (
            <Section>
              <SectionLabel ctx={ctx}>
                {sectionLabel(data, "experience", "EXPERIENCE")}
              </SectionLabel>
              <ExperienceList items={experience} />
            </Section>
          )}
          {hasCertifications && (
            <Section>
              <SectionLabel ctx={ctx}>EXHIBITIONS &amp; AWARDS</SectionLabel>
              <CertificationsList items={certifications} />
            </Section>
          )}
        </div>

        <div>
          {hasSkills && (
            <Section>
              <SectionLabel ctx={ctx}>{sectionLabel(data, "skills", "SKILLS")}</SectionLabel>
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

export function VisualStoryteller({
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
