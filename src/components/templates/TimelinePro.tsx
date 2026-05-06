"use client";

import { Fragment, type CSSProperties, type ReactNode } from "react";
import { Globe, Link2, Mail, MapPin, Phone } from "lucide-react";
import type { CVData } from "@/lib/cv-types";
import { resolveStyle, withAlpha } from "@/lib/cv-themes";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";
import { PaginatedCV, type PaginatedSection } from "./PaginatedCV";

const CORAL = "#FF7A6B";
const CREAM = "#FFFBF5";
const CREAM_SOFT = "#FFF5E8";
const PEACH = "#FFE8D6";
const PLUM = "#2D1B3D";
const PLUM_SOFT = "#6B5B7A";
const PLUM_FAINT = "#C9C0D1";

type TimelineProCtx = {
  theme: ReturnType<typeof resolveStyle>["theme"];
  headingFont: ReturnType<typeof resolveStyle>["headingFont"];
  bodyFont: ReturnType<typeof resolveStyle>["bodyFont"];
  density: ReturnType<typeof resolveStyle>["density"];
  photoStyle: ReturnType<typeof resolveStyle>["photoStyle"];
  densityClass: string;
  articleStyle: CSSProperties;
  accent: string;
  showPhoto: boolean;
};

function computeCtx(data: CVData): TimelineProCtx {
  const { theme, headingFont, bodyFont, density, photoStyle } = resolveStyle(
    data?.style,
  );
  const densityClass =
    density === "compact"
      ? "compact"
      : density === "spacious"
        ? "spacious"
        : "";
  const accent = theme.accent || CORAL;
  return {
    theme,
    headingFont,
    bodyFont,
    density,
    photoStyle,
    densityClass,
    articleStyle: {
      fontFamily: `${bodyFont.cssVar}, ${bodyFont.fallback}`,
      color: theme.text,
    },
    accent,
    showPhoto: photoStyle !== "none",
  };
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function SectionLabel({
  title,
  accent,
  headingFont,
}: {
  title: string;
  accent: string;
  headingFont: TimelineProCtx["headingFont"];
}) {
  return (
    <h2
      className="mb-3 text-xs font-bold uppercase"
      style={{
        color: accent,
        letterSpacing: "0.08em",
        fontFamily: `${headingFont.cssVar}, ${headingFont.fallback}`,
      }}
    >
      {title}
    </h2>
  );
}

type ContactItem = { key: string; Icon: typeof Mail; label: string };

function buildContactItems(basics: CVData["basics"]): ContactItem[] {
  const items: ContactItem[] = [];
  if (basics.email) items.push({ key: "email", Icon: Mail, label: basics.email });
  if (basics.phone) items.push({ key: "phone", Icon: Phone, label: basics.phone });
  if (basics.location)
    items.push({ key: "location", Icon: MapPin, label: basics.location });
  if (basics.website)
    items.push({ key: "website", Icon: Globe, label: basics.website });
  if (basics.linkedIn)
    items.push({ key: "linkedin", Icon: Link2, label: basics.linkedIn });
  return items;
}

function TimelineProHeader({
  ctx,
  data,
}: {
  ctx: TimelineProCtx;
  data: CVData;
}) {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const displayName = basics.fullName?.trim() ? basics.fullName : "Untitled";
  const { headingFont, accent, showPhoto } = ctx;
  const contactItems = buildContactItems(basics);

  return (
    <div
      className="flex items-center gap-5 rounded-2xl p-6"
      style={{ backgroundColor: "#FFFFFF", border: `1px solid ${PEACH}` }}
    >
      {showPhoto && (
        <div className="shrink-0">
          {basics.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={basics.photoUrl}
              alt={displayName}
              className="h-20 w-20 rounded-full object-cover"
              style={{ border: `2px solid ${accent}` }}
            />
          ) : (
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full text-xl font-bold"
              style={{
                backgroundColor: withAlpha(accent, 0.15),
                color: accent,
                border: `2px solid ${accent}`,
                fontFamily: `${headingFont.cssVar}, ${headingFont.fallback}`,
              }}
            >
              {getInitials(displayName)}
            </div>
          )}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <h1
          className="text-3xl font-bold leading-tight"
          style={{
            color: PLUM,
            fontFamily: `${headingFont.cssVar}, ${headingFont.fallback}`,
            letterSpacing: "-0.01em",
          }}
        >
          {displayName}
        </h1>
        {basics.role && (
          <p
            className="mt-1 text-base font-medium"
            style={{ color: accent }}
          >
            {basics.role}
          </p>
        )}
        {contactItems.length > 0 && (
          <div
            className="mt-2 flex flex-wrap items-center gap-x-1 gap-y-1 text-[11px]"
            style={{ color: PLUM_SOFT }}
          >
            {contactItems.map(({ key, Icon, label }, i) => (
              <Fragment key={key}>
                {i > 0 && (
                  <span style={{ color: accent }} className="mx-1">
                    •
                  </span>
                )}
                <span className="inline-flex items-center gap-1">
                  <Icon className="h-3 w-3" style={{ color: accent }} />
                  {label}
                </span>
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function buildTimelineProSections(
  data: CVData,
  ctx: TimelineProCtx,
): PaginatedSection[] {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const experience = data?.experience ?? [];
  const education = data?.education ?? [];
  const skills = data?.skills ?? [];
  const languages = data?.languages ?? [];
  const awards = data?.awards ?? [];
  const certifications = data?.certifications ?? [];
  const { accent, headingFont } = ctx;

  const out: PaginatedSection[] = [];

  if (!isRichTextEmpty(basics.summary)) {
    out.push({
      key: "about",
      node: (
        <div
          className="rounded-2xl p-6"
          style={{
            backgroundColor: "#FFFFFF",
            border: `1px solid ${PEACH}`,
          }}
        >
          <SectionLabel
            title="ABOUT"
            accent={accent}
            headingFont={headingFont}
          />
          <RichTextRender
            html={basics.summary ?? ""}
            as="div"
            className="text-[13px] leading-relaxed"
            style={{ color: PLUM_SOFT }}
          />
        </div>
      ),
    });
  }

  if (experience.length > 0) {
    out.push({
      key: "experience",
      node: (
        <div
          className="rounded-2xl p-6"
          style={{
            backgroundColor: "#FFFFFF",
            border: `1px solid ${PEACH}`,
          }}
        >
          <SectionLabel
            title="EXPERIENCE"
            accent={accent}
            headingFont={headingFont}
          />
          <div className="relative">
            <div
              className="absolute bottom-1 left-3 top-1"
              style={{
                width: "2px",
                backgroundColor: accent,
                opacity: 0.45,
              }}
              aria-hidden
            />
            <ul className="space-y-5">
              {experience.map((job, i) => (
                <li
                  key={`${job.company}-${job.startDate}-${i}`}
                  className="relative pl-10"
                >
                  <span
                    className="absolute left-2 top-1 inline-block h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: accent,
                      border: "2px solid white",
                      boxShadow: `0 0 0 1px ${accent}`,
                    }}
                    aria-hidden
                  />
                  <span
                    className="absolute left-4 inline-block"
                    style={{
                      top: "10px",
                      width: "16px",
                      height: "1px",
                      backgroundColor: accent,
                      opacity: 0.5,
                    }}
                    aria-hidden
                  />
                  <p
                    className="font-mono text-[11px]"
                    style={{ color: PLUM_SOFT }}
                  >
                    {job.startDate}
                    {job.endDate ? ` — ${job.endDate}` : " — Present"}
                  </p>
                  <p
                    className="mt-0.5 text-sm font-bold"
                    style={{
                      color: PLUM,
                      fontFamily: `${headingFont.cssVar}, ${headingFont.fallback}`,
                    }}
                  >
                    {job.role || job.company}
                  </p>
                  {job.role && (
                    <p
                      className="text-[13px] font-medium"
                      style={{ color: accent }}
                    >
                      {job.company}
                    </p>
                  )}
                  {job.location && (
                    <p
                      className="text-[11px]"
                      style={{ color: PLUM_FAINT }}
                    >
                      {job.location}
                    </p>
                  )}
                  {job.bullets &&
                    job.bullets.some((b) => !isRichTextEmpty(b)) && (
                      <ul className="mt-2 space-y-1">
                        {job.bullets
                          .filter((b) => !isRichTextEmpty(b))
                          .map((bullet, bi) => (
                            <li
                              key={bi}
                              className="flex gap-2 text-[12px] leading-relaxed"
                              style={{ color: PLUM_SOFT }}
                            >
                              <span
                                aria-hidden
                                className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                                style={{ backgroundColor: accent }}
                              />
                              <RichTextRender html={bullet} as="span" />
                            </li>
                          ))}
                      </ul>
                    )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    });
  }

  if (education.length > 0 || skills.length > 0) {
    out.push({
      key: "education-skills",
      node: (
        <div className="grid grid-cols-2 gap-4">
          {education.length > 0 && (
            <div
              className="rounded-2xl p-5"
              style={{
                backgroundColor: CREAM_SOFT,
                border: `1px solid ${PEACH}`,
              }}
            >
              <SectionLabel
                title="EDUCATION"
                accent={accent}
                headingFont={headingFont}
              />
              <ul className="space-y-3">
                {education.map((edu, i) => (
                  <li key={`${edu.school}-${i}`}>
                    <p
                      className="text-[13px] font-bold"
                      style={{
                        color: PLUM,
                        fontFamily: `${headingFont.cssVar}, ${headingFont.fallback}`,
                      }}
                    >
                      {edu.school}
                    </p>
                    <p className="text-[12px]" style={{ color: PLUM_SOFT }}>
                      {edu.degree}
                    </p>
                    <p
                      className="font-mono text-[11px]"
                      style={{ color: PLUM_FAINT }}
                    >
                      {edu.startDate}
                      {edu.endDate ? ` — ${edu.endDate}` : ""}
                    </p>
                    {edu.notes && (
                      <p
                        className="mt-1 text-[11px] italic"
                        style={{ color: PLUM_SOFT }}
                      >
                        {edu.notes}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {skills.length > 0 && (
            <div
              className="rounded-2xl p-5"
              style={{
                backgroundColor: CREAM_SOFT,
                border: `1px solid ${PEACH}`,
              }}
            >
              <SectionLabel
                title="SKILLS"
                accent={accent}
                headingFont={headingFont}
              />
              <ul className="flex flex-wrap gap-1.5">
                {skills.map((skill, i) => (
                  <li
                    key={i}
                    className="rounded-full px-3 py-1 text-[11px]"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: `1px solid ${PEACH}`,
                      color: PLUM,
                    }}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ),
    });
  }

  if (languages.length > 0) {
    out.push({
      key: "languages",
      node: (
        <div
          className="rounded-2xl p-5"
          style={{
            backgroundColor: CREAM_SOFT,
            border: `1px solid ${PEACH}`,
          }}
        >
          <SectionLabel
            title="LANGUAGES"
            accent={accent}
            headingFont={headingFont}
          />
          <ul
            className="flex flex-wrap gap-x-5 gap-y-1.5 text-[12px]"
            style={{ color: PLUM_SOFT }}
          >
            {languages.map((lang, i) => (
              <li key={i}>
                <span style={{ color: PLUM, fontWeight: 600 }}>{lang.name}</span>
                <span style={{ color: PLUM_FAINT }}> · {lang.level}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    });
  }

  if (awards.length > 0) {
    out.push({
      key: "awards",
      node: (
        <div
          className="rounded-2xl p-5"
          style={{
            backgroundColor: CREAM_SOFT,
            border: `1px solid ${PEACH}`,
          }}
        >
          <SectionLabel
            title="AWARDS"
            accent={accent}
            headingFont={headingFont}
          />
          <ul className="space-y-1.5">
            {awards.map((aw, i) => (
              <li
                key={i}
                className="flex items-baseline justify-between gap-3 text-[12px]"
              >
                <span style={{ color: PLUM }}>
                  <span style={{ fontWeight: 600 }}>{aw.title}</span>
                  {aw.issuer && (
                    <span style={{ color: PLUM_SOFT }}> · {aw.issuer}</span>
                  )}
                </span>
                <span
                  className="shrink-0 font-mono text-[11px]"
                  style={{ color: PLUM_FAINT }}
                >
                  {aw.year}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ),
    });
  }

  if (certifications.length > 0) {
    out.push({
      key: "certifications",
      node: (
        <div
          className="rounded-2xl p-5"
          style={{
            backgroundColor: CREAM_SOFT,
            border: `1px solid ${PEACH}`,
          }}
        >
          <SectionLabel
            title="CERTIFICATIONS"
            accent={accent}
            headingFont={headingFont}
          />
          <ul className="space-y-1.5">
            {certifications.map((cert, i) => (
              <li
                key={i}
                className="flex items-baseline justify-between gap-3 text-[12px]"
              >
                <span style={{ color: PLUM }}>
                  <span style={{ fontWeight: 600 }}>{cert.name}</span>
                  {cert.issuer && (
                    <span style={{ color: PLUM_SOFT }}> · {cert.issuer}</span>
                  )}
                </span>
                {cert.year && (
                  <span
                    className="shrink-0 font-mono text-[11px]"
                    style={{ color: PLUM_FAINT }}
                  >
                    {cert.year}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ),
    });
  }

  return out;
}

function TimelineProPage({
  ctx,
  data,
  isFirstPage,
  paginated,
  children,
}: {
  ctx: TimelineProCtx;
  data: CVData;
  pageIndex: number;
  pageCount: number;
  isFirstPage: boolean;
  paginated: boolean;
  children?: ReactNode;
}) {
  const articleEl = (
    <article
      className={`cv-page ${paginated ? "" : "mx-auto aspect-[210/297] max-w-[800px]"} w-full overflow-hidden ${ctx.densityClass}`.trim()}
      style={
        paginated
          ? {
              ...ctx.articleStyle,
              width: 794,
              minHeight: 1123,
              backgroundColor: CREAM,
            }
          : { ...ctx.articleStyle, backgroundColor: CREAM }
      }
    >
      <div className="space-y-4 p-8">
        {isFirstPage && <TimelineProHeader ctx={ctx} data={data} />}
        {children}
      </div>
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

export function TimelinePro({
  data,
  paginated = false,
}: {
  data: CVData;
  paginated?: boolean;
}) {
  const ctx = computeCtx(data);
  const sections = buildTimelineProSections(data, ctx);

  if (paginated) {
    return (
      <PaginatedCV
        sections={sections}
        PageShell={(props) => (
          <TimelineProPage ctx={ctx} data={data} paginated {...props} />
        )}
        contentWidth={730}
        pageHeight={950}
      />
    );
  }

  return (
    <TimelineProPage
      ctx={ctx}
      data={data}
      pageIndex={0}
      pageCount={1}
      isFirstPage
      paginated={false}
    >
      {sections.map((s) => (
        <Fragment key={s.key}>{s.node}</Fragment>
      ))}
    </TimelineProPage>
  );
}
