"use client";

import { Fragment, type CSSProperties, type ReactNode } from "react";
import type { CVData } from "@/lib/cv-types";
import { resolveStyle, withAlpha } from "@/lib/cv-themes";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";
import { PaginatedCV, type PaginatedSection } from "./PaginatedCV";

type PhotoForwardCtx = {
  theme: ReturnType<typeof resolveStyle>["theme"];
  themeCategory: ReturnType<typeof resolveStyle>["themeCategory"];
  headingFont: ReturnType<typeof resolveStyle>["headingFont"];
  bodyFont: ReturnType<typeof resolveStyle>["bodyFont"];
  density: ReturnType<typeof resolveStyle>["density"];
  photoStyle: ReturnType<typeof resolveStyle>["photoStyle"];
  densityClass: string;
  articleStyle: CSSProperties;
  headingFontFamily: string;
  showPhoto: boolean;
};

function computeCtx(data: CVData): PhotoForwardCtx {
  const {
    theme,
    themeCategory,
    headingFont,
    bodyFont,
    density,
    photoStyle,
  } = resolveStyle(data?.style);
  const densityClass =
    density === "compact" ? "compact" : density === "spacious" ? "spacious" : "";
  const articleStyle: CSSProperties = {
    fontFamily: `${bodyFont.cssVar}, ${bodyFont.fallback}`,
    color: theme.text,
  };
  return {
    theme,
    themeCategory,
    headingFont,
    bodyFont,
    density,
    photoStyle,
    densityClass,
    articleStyle,
    headingFontFamily: `${headingFont.cssVar}, ${headingFont.fallback}`,
    showPhoto: photoStyle !== "none",
  };
}

function getInitials(name: string): string {
  const parts = (name || "").trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function SectionTitle({
  children,
  ctx,
  className = "mb-3",
}: {
  children: ReactNode;
  ctx: PhotoForwardCtx;
  className?: string;
}) {
  return (
    <h2
      className={`text-[10px] uppercase tracking-[0.2em] ${className}`}
      style={{
        fontFamily: ctx.headingFontFamily,
        fontWeight: 600,
        color: ctx.theme.primary,
      }}
    >
      {children}
    </h2>
  );
}

function PhotoForwardHeader({
  ctx,
  data,
}: {
  ctx: PhotoForwardCtx;
  data: CVData;
}) {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const displayName = basics.fullName?.trim() ? basics.fullName : "Untitled";
  const { theme, headingFontFamily, showPhoto } = ctx;

  const contactBits = [
    basics.email,
    basics.phone,
    basics.location,
    basics.website,
    basics.linkedIn,
  ].filter(Boolean) as string[];

  return (
    <header className="flex items-stretch px-12 py-12">
      {showPhoto && (
        <div className="shrink-0">
          {basics.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={basics.photoUrl}
              alt={displayName}
              className="h-[220px] w-[220px] rounded-md object-cover"
              style={{ border: `4px solid ${theme.primary}` }}
            />
          ) : (
            <div
              className="flex h-[220px] w-[220px] items-center justify-center rounded-md"
              style={{
                border: `4px solid ${theme.primary}`,
                backgroundColor: withAlpha(theme.primary, 0.08),
                color: theme.primary,
                fontFamily: headingFontFamily,
                fontSize: "56px",
                fontWeight: 600,
              }}
            >
              {getInitials(displayName)}
            </div>
          )}
        </div>
      )}
      <div
        className={`flex min-w-0 flex-1 flex-col justify-center ${showPhoto ? "pl-10" : ""}`}
      >
        <h1
          style={{
            fontFamily: headingFontFamily,
            fontSize: "52px",
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: theme.primary,
          }}
        >
          {displayName}
        </h1>
        {basics.role && (
          <p
            className="mt-2 text-base italic"
            style={{ color: theme.textSoft }}
          >
            {basics.role}
          </p>
        )}
        <div
          className="mt-5 h-px w-16"
          style={{ backgroundColor: theme.accent }}
        />
        {contactBits.length > 0 && (
          <div
            className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs"
            style={{ color: theme.textSoft }}
          >
            {contactBits.map((bit, i) => (
              <span key={i}>{bit}</span>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

function PhotoForwardBody({
  ctx,
  data,
}: {
  ctx: PhotoForwardCtx;
  data: CVData;
}) {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const experience = data?.experience ?? [];
  const education = data?.education ?? [];
  const skills = data?.skills ?? [];
  const languages = data?.languages ?? [];
  const awards = data?.awards ?? [];

  return (
    <div className="px-12 pb-10 pt-2">
      {!isRichTextEmpty(basics.summary) && (
        <section className="mb-8">
          <SectionTitle ctx={ctx}>PROFILE</SectionTitle>
          <RichTextRender
            html={basics.summary ?? ""}
            as="p"
            className="text-sm leading-relaxed"
            style={{ color: ctx.theme.text }}
          />
        </section>
      )}

      <div className="grid grid-cols-3 gap-x-10 gap-y-8">
        <div className="col-span-2 space-y-6">
          {experience.length > 0 && (
            <section>
              <SectionTitle ctx={ctx}>EXPERIENCE</SectionTitle>
              <div className="space-y-6">
                {experience.map((job, i) => (
                  <div key={`${job.company}-${job.startDate}-${i}`}>
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <p
                          className="text-sm"
                          style={{ color: ctx.theme.primary, fontWeight: 600 }}
                        >
                          {job.role || job.company}
                        </p>
                        <p
                          className="text-xs italic"
                          style={{ color: ctx.theme.textSoft }}
                        >
                          {job.role ? job.company : ""}
                          {job.location ? ` · ${job.location}` : ""}
                        </p>
                      </div>
                      <p
                        className="shrink-0 text-right text-xs"
                        style={{ color: ctx.theme.textSoft, fontWeight: 500 }}
                      >
                        {job.startDate} — {job.endDate ?? "Present"}
                      </p>
                    </div>
                    {job.bullets &&
                      job.bullets.some((b) => !isRichTextEmpty(b)) && (
                        <ul
                          className="ml-4 mt-2 space-y-1"
                          style={{ color: ctx.theme.text }}
                        >
                          {job.bullets
                            .filter((b) => !isRichTextEmpty(b))
                            .map((bullet, bi) => (
                              <RichTextRender
                                key={bi}
                                html={bullet}
                                as="li"
                                className="list-disc text-xs leading-relaxed"
                              />
                            ))}
                        </ul>
                      )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section className="mt-6">
              <SectionTitle ctx={ctx}>EDUCATION</SectionTitle>
              <div className="space-y-3">
                {education.map((entry, i) => (
                  <div
                    key={`${entry.school}-${entry.startDate}-${i}`}
                    className="flex items-baseline justify-between gap-4"
                  >
                    <div className="min-w-0 flex-1">
                      <p
                        className="text-sm"
                        style={{ color: ctx.theme.primary, fontWeight: 600 }}
                      >
                        {entry.degree}
                      </p>
                      <p
                        className="text-xs italic"
                        style={{ color: ctx.theme.textSoft }}
                      >
                        {entry.school}
                        {entry.location ? ` · ${entry.location}` : ""}
                      </p>
                    </div>
                    <p
                      className="shrink-0 text-right text-xs"
                      style={{ color: ctx.theme.textSoft }}
                    >
                      {entry.startDate} — {entry.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-1 space-y-8">
          {skills.length > 0 && (
            <section>
              <SectionTitle ctx={ctx}>SKILLS</SectionTitle>
              <ul style={{ color: ctx.theme.text }}>
                {skills.map((skill, i) => (
                  <li key={i} className="mb-1.5 text-xs">
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <SectionTitle ctx={ctx}>LANGUAGES</SectionTitle>
              <ul>
                {languages.map((lang, i) => (
                  <li
                    key={i}
                    className="mb-1.5 flex items-baseline justify-between text-xs"
                  >
                    <span
                      style={{ color: ctx.theme.text, fontWeight: 500 }}
                    >
                      {lang.name}
                    </span>
                    <span
                      className="italic"
                      style={{ color: ctx.theme.textSoft }}
                    >
                      {lang.level}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {awards.length > 0 && (
            <section>
              <SectionTitle ctx={ctx}>AWARDS</SectionTitle>
              <ul>
                {awards.map((award, i) => (
                  <li key={i} className="mb-2 text-xs">
                    <p
                      style={{ color: ctx.theme.text, fontWeight: 500 }}
                    >
                      {award.title}
                    </p>
                    {award.year && (
                      <p
                        className="italic"
                        style={{ color: ctx.theme.textSoft }}
                      >
                        {award.year}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function PhotoForwardPage({
  ctx,
  data,
  isFirstPage,
  paginated,
  children,
}: {
  ctx: PhotoForwardCtx;
  data: CVData;
  pageIndex: number;
  pageCount: number;
  isFirstPage: boolean;
  paginated: boolean;
  children?: ReactNode;
}) {
  const articleEl = (
    <article
      className={`cv-page ${paginated ? "" : "mx-auto aspect-[210/297] max-w-[800px]"} w-full overflow-hidden rounded-lg shadow-warm-card-hover ${ctx.densityClass}`.trim()}
      style={
        paginated
          ? {
              ...ctx.articleStyle,
              width: 794,
              minHeight: 1123,
              backgroundColor: ctx.theme.surface,
              padding: 0,
            }
          : {
              ...ctx.articleStyle,
              backgroundColor: ctx.theme.surface,
              padding: 0,
            }
      }
    >
      {isFirstPage && <PhotoForwardHeader ctx={ctx} data={data} />}
      {children}
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

function buildPhotoForwardSections(
  data: CVData,
  ctx: PhotoForwardCtx,
): PaginatedSection[] {
  return [
    {
      key: "body",
      node: <PhotoForwardBody ctx={ctx} data={data} />,
    },
  ];
}

export function PhotoForward({
  data,
  paginated = false,
}: {
  data: CVData;
  paginated?: boolean;
}) {
  const ctx = computeCtx(data);
  const sections = buildPhotoForwardSections(data, ctx);

  if (paginated) {
    return (
      <PaginatedCV
        sections={sections}
        PageShell={(props) => (
          <PhotoForwardPage ctx={ctx} data={data} paginated {...props} />
        )}
        contentWidth={700}
        pageHeight={950}
      />
    );
  }

  return (
    <PhotoForwardPage
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
    </PhotoForwardPage>
  );
}
