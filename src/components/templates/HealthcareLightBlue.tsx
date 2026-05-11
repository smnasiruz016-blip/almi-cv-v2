"use client";

import { type CSSProperties, type ReactNode } from "react";
import type { CVData } from "@/lib/cv-types";
import { resolveStyle, sectionLabel } from "@/lib/cv-themes";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";

// Frozen color constants. Visual changes here would silently re-style
// users' saved CVs — don't touch after ship.
const PAGE_BG = "#EAF1F5";
const NAME_GREEN = "#234E52";
const ROLE_GREEN = "#5C8478";
const LABEL_GRAY = "#6B7280";
const BODY_TEXT = "#1F2937";
const HAIRLINE = "#D5DEE3";

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
    color: BODY_TEXT,
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

function SectionLabel({ children, ctx }: { children: string; ctx: Ctx }) {
  return (
    <h2
      className="text-[10.5px] font-medium uppercase tracking-[0.16em]"
      style={{
        color: LABEL_GRAY,
        fontFamily: `${ctx.bodyFont.cssVar}, ${ctx.bodyFont.fallback}`,
      }}
    >
      {children}
    </h2>
  );
}

function SectionRow({
  ctx,
  label,
  isLast = false,
  children,
}: {
  ctx: Ctx;
  label: string;
  isLast?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className="grid grid-cols-[176px_1fr]"
      style={{
        borderBottom: isLast ? undefined : `1px solid ${HAIRLINE}`,
      }}
    >
      <div style={{ padding: "22px 16px 22px 36px" }}>
        <SectionLabel ctx={ctx}>{label}</SectionLabel>
      </div>
      <div style={{ padding: "22px 36px 22px 0" }}>{children}</div>
    </div>
  );
}

function Body({ data, ctx }: { data: CVData; ctx: Ctx }) {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const displayName = basics.fullName?.trim() ? basics.fullName : "Untitled";
  const summary = basics.summary;
  const experience = data?.experience ?? [];
  const education = data?.education ?? [];
  const skills = data?.skills ?? [];
  const certifications = data?.certifications ?? [];
  const languages = data?.languages ?? [];

  const hasContact = Boolean(
    basics.location || basics.phone || basics.email || basics.website || basics.linkedIn,
  );
  const hasSummary = !isRichTextEmpty(summary);
  const hasExperience = experience.length > 0;
  const hasEducation = education.length > 0;
  const hasSkills = skills.length > 0;
  const hasCertifications = certifications.length > 0;
  const hasLanguages = languages.length > 0;

  // Compute the last rendered section so its bottom hairline can be omitted —
  // keeps the page from ending on a divider line above empty space.
  const sectionsInOrder = [
    hasSummary && "summary",
    hasContact && "contact",
    hasExperience && "experience",
    hasEducation && "education",
    hasSkills && "skills",
    hasCertifications && "certifications",
    hasLanguages && "languages",
  ].filter(Boolean) as string[];
  const lastSection = sectionsInOrder[sectionsInOrder.length - 1];

  return (
    <>
      {/* Hero band — full-width, italic display name left + role tagline right */}
      <header
        className="flex items-baseline justify-between"
        style={{
          padding: "44px 36px 26px",
          borderBottom: `1px solid ${HAIRLINE}`,
        }}
      >
        <h1
          style={{
            fontFamily: `${ctx.headingFont.cssVar}, ${ctx.headingFont.fallback}`,
            fontStyle: "italic",
            color: NAME_GREEN,
            fontSize: 42,
            fontWeight: 500,
            letterSpacing: "-0.5px",
            lineHeight: 1,
          }}
        >
          {displayName}
        </h1>
        {basics.role && (
          <p
            style={{
              fontFamily: `${ctx.headingFont.cssVar}, ${ctx.headingFont.fallback}`,
              fontStyle: "italic",
              color: ROLE_GREEN,
              fontSize: 17,
              fontWeight: 400,
              lineHeight: 1.2,
              marginLeft: 24,
              textAlign: "right",
            }}
          >
            {basics.role}
          </p>
        )}
      </header>

      {hasSummary && (
        <SectionRow
          ctx={ctx}
          label={sectionLabel(data, "profile", "PROFESSIONAL SUMMARY")}
          isLast={lastSection === "summary"}
        >
          <RichTextRender
            html={summary ?? ""}
            as="p"
            className="text-[11px] leading-[1.55] [&_strong]:font-semibold [&_strong]:text-[#234E52]"
            style={{ color: BODY_TEXT }}
          />
        </SectionRow>
      )}

      {hasContact && (
        <SectionRow
          ctx={ctx}
          label="CONTACT INFORMATION"
          isLast={lastSection === "contact"}
        >
          <div
            className="grid grid-cols-2 gap-x-6 text-[11px]"
            style={{ color: BODY_TEXT, lineHeight: 1.65 }}
          >
            <div>
              {basics.phone && <p>Phone: {basics.phone}</p>}
              {basics.email && <p>Email: {basics.email}</p>}
            </div>
            <div>
              {basics.location && <p>Address: {basics.location}</p>}
              {basics.website && <p>Portfolio: {basics.website}</p>}
              {basics.linkedIn && <p>{basics.linkedIn}</p>}
            </div>
          </div>
        </SectionRow>
      )}

      {hasExperience && (
        <SectionRow
          ctx={ctx}
          label={sectionLabel(data, "experience", "PROFESSIONAL EXPERIENCE")}
          isLast={lastSection === "experience"}
        >
          <div className="space-y-4">
            {experience.map((job, i) => {
              const dateStr = job.endDate
                ? `${job.startDate} – ${job.endDate}`
                : `${job.startDate} – Present`;
              return (
                <div key={`${job.company}-${job.startDate}-${i}`}>
                  <p
                    className="text-[12px]"
                    style={{ color: BODY_TEXT, fontWeight: 600, lineHeight: 1.3 }}
                  >
                    {job.role || job.company}
                    {(job.startDate || job.endDate) && (
                      <span style={{ fontWeight: 400 }}> | {dateStr}</span>
                    )}
                  </p>
                  {job.role && (
                    <p
                      className="text-[11px] italic"
                      style={{ color: BODY_TEXT, lineHeight: 1.45 }}
                    >
                      {job.company}
                      {job.location ? `, ${job.location}` : ""}
                    </p>
                  )}
                  {job.bullets && job.bullets.some((b) => !isRichTextEmpty(b)) && (
                    <ul
                      className="mt-2 list-disc space-y-1 pl-4 text-[11px] [&_strong]:font-semibold [&_strong]:text-[#234E52]"
                      style={{ color: BODY_TEXT, lineHeight: 1.55 }}
                    >
                      {job.bullets
                        .filter((b) => !isRichTextEmpty(b))
                        .map((b, bi) => (
                          <li key={bi}>
                            <RichTextRender html={b} as="span" />
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </SectionRow>
      )}

      {hasEducation && (
        <SectionRow
          ctx={ctx}
          label={sectionLabel(data, "education", "EDUCATION")}
          isLast={lastSection === "education"}
        >
          <div className="space-y-3">
            {education.map((entry, i) => {
              const dateStr =
                entry.startDate && entry.endDate
                  ? `${entry.startDate} – ${entry.endDate}`
                  : entry.startDate || entry.endDate || "";
              return (
                <div key={`${entry.school}-${entry.startDate}-${i}`}>
                  <p
                    className="text-[12px]"
                    style={{ color: BODY_TEXT, fontWeight: 600, lineHeight: 1.3 }}
                  >
                    {entry.school}
                    {dateStr && (
                      <span style={{ fontWeight: 400 }}> | {dateStr}</span>
                    )}
                  </p>
                  {entry.degree && (
                    <p
                      className="text-[11px] italic"
                      style={{ color: BODY_TEXT, lineHeight: 1.45 }}
                    >
                      {entry.degree}
                      {entry.location ? `, ${entry.location}` : ""}
                    </p>
                  )}
                  {entry.notes && (
                    <p
                      className="mt-1 text-[11px]"
                      style={{ color: BODY_TEXT, lineHeight: 1.55 }}
                    >
                      {entry.notes}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </SectionRow>
      )}

      {hasSkills && (
        <SectionRow
          ctx={ctx}
          label={sectionLabel(data, "skills", "SKILLS")}
          isLast={lastSection === "skills"}
        >
          <p
            className="text-[11px]"
            style={{ color: BODY_TEXT, lineHeight: 1.65 }}
          >
            {skills.join(", ")}
          </p>
        </SectionRow>
      )}

      {hasCertifications && (
        <SectionRow
          ctx={ctx}
          label={sectionLabel(data, "certifications", "CERTIFICATIONS")}
          isLast={lastSection === "certifications"}
        >
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {certifications.map((cert, i) => (
              <div key={`${cert.name}-${i}`}>
                <p
                  className="text-[11.5px]"
                  style={{ color: BODY_TEXT, fontWeight: 600, lineHeight: 1.35 }}
                >
                  {cert.name}
                  {cert.year && (
                    <span style={{ fontWeight: 400 }}> | {cert.year}</span>
                  )}
                </p>
                {cert.issuer && (
                  <p
                    className="text-[11px]"
                    style={{ color: ROLE_GREEN, lineHeight: 1.5 }}
                  >
                    {cert.issuer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </SectionRow>
      )}

      {hasLanguages && (
        <SectionRow
          ctx={ctx}
          label={sectionLabel(data, "languages", "LANGUAGES")}
          isLast={lastSection === "languages"}
        >
          <p
            className="text-[11px]"
            style={{ color: BODY_TEXT, lineHeight: 1.65 }}
          >
            {languages.map((l) => `${l.name} (${l.level})`).join(", ")}
          </p>
        </SectionRow>
      )}
    </>
  );
}

export function HealthcareLightBlue({
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
