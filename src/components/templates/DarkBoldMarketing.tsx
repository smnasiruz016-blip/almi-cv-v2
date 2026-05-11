"use client";

import { type CSSProperties, type ReactNode } from "react";
import type { CVData } from "@/lib/cv-types";
import { resolveStyle, sectionLabel } from "@/lib/cv-themes";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";

// Frozen color constants. Visual changes here would silently re-style
// users' saved CVs — don't touch after ship.
const PAGE_BG = "#1A1A1A";
const NAME_ACCENT = "#F5C868";
const TEXT_PRIMARY = "#FFFFFF";
const DIVIDER_LINE = "#4A4A4A";
const ASTERISK_STROKE = "#FFFFFF";
const ASTERISK_FILL = "#FFFFFF";

const GUTTER_PCT = 14;

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
    color: TEXT_PRIMARY,
    backgroundColor: PAGE_BG,
  };
  return {
    headingFont: r.headingFont,
    bodyFont: r.bodyFont,
    density: r.density,
    densityClass,
    articleStyle,
  };
}

function AsteriskCircle() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle
        cx="40"
        cy="40"
        r="38"
        fill="none"
        stroke={ASTERISK_STROKE}
        strokeWidth="1.5"
      />
      <g fill={ASTERISK_FILL} transform="translate(40 40)">
        <ellipse cx="0" cy="-12" rx="4" ry="12" transform="rotate(0)" />
        <ellipse cx="0" cy="-12" rx="4" ry="12" transform="rotate(60)" />
        <ellipse cx="0" cy="-12" rx="4" ry="12" transform="rotate(120)" />
        <ellipse cx="0" cy="-12" rx="4" ry="12" transform="rotate(180)" />
        <ellipse cx="0" cy="-12" rx="4" ry="12" transform="rotate(240)" />
        <ellipse cx="0" cy="-12" rx="4" ry="12" transform="rotate(300)" />
      </g>
    </svg>
  );
}

function SectionRow({
  ctx,
  label,
  children,
}: {
  ctx: Ctx;
  label: string;
  children: ReactNode;
}) {
  return (
    <section
      className="grid"
      style={{
        gridTemplateColumns: `${GUTTER_PCT}% 1fr`,
        columnGap: 24,
        marginBottom: 28,
      }}
    >
      <div>
        <h2
          className="uppercase"
          style={{
            color: TEXT_PRIMARY,
            fontFamily: `${ctx.bodyFont.cssVar}, ${ctx.bodyFont.fallback}`,
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.14em",
            lineHeight: 1.3,
            marginTop: 2,
          }}
        >
          {label}
        </h2>
      </div>
      <div>
        <div
          aria-hidden
          style={{
            height: 1,
            backgroundColor: DIVIDER_LINE,
            width: "100%",
            marginBottom: 14,
          }}
        />
        {children}
      </div>
    </section>
  );
}

function Hero({ data, ctx }: { data: CVData; ctx: Ctx }) {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const displayName = basics.fullName?.trim() ? basics.fullName : "Untitled";
  const tagline = basics.summary;

  return (
    <div
      className="flex items-center"
      style={{
        padding: "44px 56px 24px",
        gap: 24,
      }}
    >
      <div style={{ flexShrink: 0 }}>
        <AsteriskCircle />
      </div>
      <div className="flex flex-1 flex-col">
        <h1
          className="uppercase"
          style={{
            fontFamily: `${ctx.headingFont.cssVar}, ${ctx.headingFont.fallback}`,
            color: NAME_ACCENT,
            fontSize: 42,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            lineHeight: 1.05,
          }}
        >
          {displayName}
        </h1>
        {basics.role && (
          <p
            style={{
              fontFamily: `${ctx.bodyFont.cssVar}, ${ctx.bodyFont.fallback}`,
              color: TEXT_PRIMARY,
              fontSize: 17,
              fontWeight: 400,
              lineHeight: 1.3,
              marginTop: 6,
            }}
          >
            {basics.role}
          </p>
        )}
        {!isRichTextEmpty(tagline) && (
          <RichTextRender
            html={tagline ?? ""}
            as="p"
            className="text-[14px] [&_strong]:font-semibold"
            style={{
              color: TEXT_PRIMARY,
              lineHeight: 1.45,
              marginTop: 6,
            }}
          />
        )}
      </div>
    </div>
  );
}

function ExperienceSection({
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
            className="grid"
            style={{
              gridTemplateColumns: "minmax(0, 0.6fr) minmax(0, 1fr)",
              columnGap: 24,
              marginBottom: isLast ? 0 : 22,
            }}
          >
            <div>
              <p
                style={{
                  color: TEXT_PRIMARY,
                  fontWeight: 600,
                  fontSize: 14.5,
                  lineHeight: 1.3,
                  fontFamily: `${ctx.bodyFont.cssVar}, ${ctx.bodyFont.fallback}`,
                }}
              >
                {job.role || job.company}
              </p>
              {job.role && (
                <p
                  style={{
                    color: TEXT_PRIMARY,
                    fontSize: 13,
                    lineHeight: 1.45,
                    marginTop: 2,
                  }}
                >
                  {job.company}
                  {job.location ? `, ${job.location}` : ""}
                </p>
              )}
              <p
                className="italic"
                style={{
                  color: TEXT_PRIMARY,
                  fontSize: 12.5,
                  lineHeight: 1.45,
                  marginTop: 2,
                }}
              >
                {dateStr}
              </p>
            </div>
            <div>
              {job.bullets && job.bullets.some((b) => !isRichTextEmpty(b)) && (
                <div
                  className="space-y-2 [&_strong]:font-semibold"
                  style={{
                    color: TEXT_PRIMARY,
                    fontSize: 13,
                    lineHeight: 1.55,
                  }}
                >
                  {job.bullets
                    .filter((b) => !isRichTextEmpty(b))
                    .map((b, bi) => (
                      <RichTextRender key={bi} html={b} as="p" />
                    ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function EducationSection({
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
        const highlights = entry.notes
          ? entry.notes.split("·").map((s) => s.trim()).filter(Boolean)
          : [];
        return (
          <div
            key={`${entry.school}-${entry.startDate}-${i}`}
            className="grid"
            style={{
              gridTemplateColumns: "minmax(0, 0.6fr) minmax(0, 1fr)",
              columnGap: 24,
              marginBottom: isLast ? 0 : 22,
            }}
          >
            <div>
              <p
                style={{
                  color: TEXT_PRIMARY,
                  fontWeight: 600,
                  fontSize: 14.5,
                  lineHeight: 1.3,
                  fontFamily: `${ctx.bodyFont.cssVar}, ${ctx.bodyFont.fallback}`,
                }}
              >
                {entry.school}
              </p>
              {entry.degree && (
                <p
                  style={{
                    color: TEXT_PRIMARY,
                    fontSize: 13,
                    lineHeight: 1.45,
                    marginTop: 2,
                  }}
                >
                  {entry.degree}
                  {entry.location ? `, ${entry.location}` : ""}
                </p>
              )}
              {dateStr && (
                <p
                  className="italic"
                  style={{
                    color: TEXT_PRIMARY,
                    fontSize: 12.5,
                    lineHeight: 1.45,
                    marginTop: 2,
                  }}
                >
                  {dateStr}
                </p>
              )}
            </div>
            <div>
              {highlights.length > 0 && (
                <div
                  className="space-y-1.5"
                  style={{
                    color: TEXT_PRIMARY,
                    fontSize: 13,
                    lineHeight: 1.55,
                  }}
                >
                  {highlights.map((h, hi) => (
                    <p key={hi}>{h}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SkillsSection({ items }: { items: string[] }) {
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: "1fr 1fr",
        columnGap: 24,
        rowGap: 6,
        color: TEXT_PRIMARY,
        fontSize: 13,
        lineHeight: 1.55,
      }}
    >
      {items.map((skill, i) => (
        <p key={`skill-${i}`}>{skill}</p>
      ))}
    </div>
  );
}

function Body({ data, ctx }: { data: CVData; ctx: Ctx }) {
  const experience = data?.experience ?? [];
  const education = data?.education ?? [];
  const skills = data?.skills ?? [];
  const achievements = data?.achievements;

  const hasExperience = experience.length > 0;
  const hasEducation = education.length > 0;
  const hasSkills = skills.length > 0;
  const hasAchievements = !isRichTextEmpty(achievements);

  return (
    <div className="flex-1" style={{ padding: "12px 56px 0" }}>
      {hasExperience && (
        <SectionRow ctx={ctx} label={sectionLabel(data, "experience", "EXPERIENCE")}>
          <ExperienceSection items={experience} ctx={ctx} />
        </SectionRow>
      )}
      {hasEducation && (
        <SectionRow ctx={ctx} label={sectionLabel(data, "education", "EDUCATION")}>
          <EducationSection items={education} ctx={ctx} />
        </SectionRow>
      )}
      {hasSkills && (
        <SectionRow ctx={ctx} label={sectionLabel(data, "skills", "SKILLS")}>
          <SkillsSection items={skills} />
        </SectionRow>
      )}
      {hasAchievements && (
        <SectionRow ctx={ctx} label="ACHIEVEMENTS">
          <RichTextRender
            html={achievements ?? ""}
            as="p"
            className="text-[13px] [&_strong]:font-semibold"
            style={{ color: TEXT_PRIMARY, lineHeight: 1.6 }}
          />
        </SectionRow>
      )}
    </div>
  );
}

function Footer({ data }: { data: CVData }) {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const hasEmail = Boolean(basics.email);
  const hasWebsite = Boolean(basics.website);
  if (!hasEmail && !hasWebsite) return null;
  return (
    <div
      className="flex items-center justify-between"
      style={{
        padding: "20px 56px 28px",
        color: TEXT_PRIMARY,
        fontSize: 12,
        lineHeight: 1.4,
        letterSpacing: "0.02em",
      }}
    >
      <span>{basics.email || ""}</span>
      <span>{basics.website || ""}</span>
    </div>
  );
}

export function DarkBoldMarketing({
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
      <Footer data={data} />
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
