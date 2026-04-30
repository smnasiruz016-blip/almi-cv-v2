"use client";

import { Fragment, type CSSProperties, type ReactNode } from "react";
import type { CVData } from "@/lib/cv-types";
import { resolveStyle, withAlpha } from "@/lib/cv-themes";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";
import { PaginatedCV, type PaginatedSection } from "./PaginatedCV";

type SoftPastelCtx = {
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

function computeCtx(data: CVData): SoftPastelCtx {
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
}: {
  children: ReactNode;
  ctx: SoftPastelCtx;
}) {
  return (
    <div className="mb-6 text-center">
      <h2
        className="mb-2 text-2xl italic text-gray-800"
        style={{ fontFamily: ctx.headingFontFamily, fontWeight: 400 }}
      >
        {children}
      </h2>
      <div
        className="mx-auto h-px w-6"
        style={{ backgroundColor: withAlpha(ctx.theme.accent, 0.6) }}
      />
    </div>
  );
}

function OrganicBlob({
  ctx,
  position,
  size,
  color,
  opacity,
}: {
  ctx: SoftPastelCtx;
  position: "top-right" | "bottom-left" | "top-right-small";
  size: number;
  color: string;
  opacity: number;
}) {
  const baseStyle: CSSProperties = {
    width: size,
    height: size,
    backgroundColor: withAlpha(color, opacity),
    pointerEvents: "none",
  };

  if (position === "top-right" || position === "top-right-small") {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute z-0"
        style={{
          ...baseStyle,
          top: position === "top-right-small" ? -40 : -80,
          right: position === "top-right-small" ? -40 : -80,
          borderRadius: "60% 40% 50% 50% / 40% 50% 60% 50%",
        }}
      />
    );
  }
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute z-0"
      style={{
        ...baseStyle,
        bottom: -60,
        left: -60,
        borderRadius: "50% 60% 40% 50% / 50% 40% 60% 50%",
      }}
    />
  );
}

function SoftPastelHeader({
  ctx,
  data,
}: {
  ctx: SoftPastelCtx;
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
    <header className="relative z-10 px-12 pb-8 pt-14 text-center">
      {showPhoto && (
        <div className="flex justify-center">
          {basics.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={basics.photoUrl}
              alt={displayName}
              className="h-[140px] w-[140px] rounded-full object-cover"
              style={{ border: `6px solid ${withAlpha(theme.accent, 0.3)}` }}
            />
          ) : (
            <div
              className="flex h-[140px] w-[140px] items-center justify-center rounded-full"
              style={{
                border: `6px solid ${withAlpha(theme.accent, 0.3)}`,
                backgroundColor: withAlpha(theme.primary, 0.15),
                color: theme.primary,
                fontFamily: headingFontFamily,
                fontSize: "48px",
                fontWeight: 500,
              }}
            >
              {getInitials(displayName)}
            </div>
          )}
        </div>
      )}
      <h1
        className="mt-6 leading-tight text-gray-800"
        style={{
          fontFamily: headingFontFamily,
          fontSize: "40px",
          fontWeight: 500,
        }}
      >
        {displayName}
      </h1>
      {basics.role && (
        <p
          className="mt-2 text-base italic"
          style={{
            fontFamily: headingFontFamily,
            color: withAlpha(theme.primary, 0.8),
          }}
        >
          {basics.role}
        </p>
      )}
      <div
        className="mx-auto mt-5 h-px w-8"
        style={{ backgroundColor: withAlpha(theme.accent, 0.6) }}
      />
      {contactBits.length > 0 && (
        <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-600">
          {contactBits.map((bit, i) => (
            <Fragment key={i}>
              {i > 0 && (
                <span aria-hidden style={{ color: withAlpha(theme.accent, 0.5) }}>
                  ·
                </span>
              )}
              <span>{bit}</span>
            </Fragment>
          ))}
        </div>
      )}
    </header>
  );
}

function SoftPastelPage({
  ctx,
  data,
  isFirstPage,
  paginated,
  children,
}: {
  ctx: SoftPastelCtx;
  data: CVData;
  pageIndex: number;
  pageCount: number;
  isFirstPage: boolean;
  paginated: boolean;
  children?: ReactNode;
}) {
  const articleEl = (
    <article
      className={`cv-page ${paginated ? "" : "mx-auto aspect-[210/297] max-w-[800px]"} relative w-full overflow-hidden rounded-lg shadow-warm-card-hover ${ctx.densityClass}`.trim()}
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
      {isFirstPage ? (
        <>
          <OrganicBlob
            ctx={ctx}
            position="top-right"
            size={280}
            color={ctx.theme.accent}
            opacity={0.15}
          />
          <OrganicBlob
            ctx={ctx}
            position="bottom-left"
            size={220}
            color={ctx.theme.primary}
            opacity={0.1}
          />
          <SoftPastelHeader ctx={ctx} data={data} />
        </>
      ) : (
        <OrganicBlob
          ctx={ctx}
          position="top-right-small"
          size={180}
          color={ctx.theme.accent}
          opacity={0.12}
        />
      )}
      <div
        className={`relative z-10 px-12 pb-12 ${isFirstPage ? "" : "pt-14"}`}
      >
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

function buildSoftPastelSections(
  data: CVData,
  ctx: SoftPastelCtx,
): PaginatedSection[] {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const experience = data?.experience ?? [];
  const education = data?.education ?? [];
  const skills = data?.skills ?? [];
  const languages = data?.languages ?? [];
  const awards = data?.awards ?? [];

  const out: PaginatedSection[] = [];

  if (!isRichTextEmpty(basics.summary)) {
    out.push({
      key: "about-me",
      node: (
        <section className="mb-12 mt-10">
          <SectionTitle ctx={ctx}>About Me</SectionTitle>
          <RichTextRender
            html={basics.summary ?? ""}
            as="p"
            className="mx-auto max-w-2xl text-center text-sm leading-loose text-gray-700"
          />
        </section>
      ),
    });
  }

  if (experience.length > 0) {
    out.push({
      key: "journey",
      node: (
        <section className="mb-12">
          <SectionTitle ctx={ctx}>Journey</SectionTitle>
          <div className="space-y-5">
            {experience.map((job, i) => (
              <div
                key={`${job.company}-${job.startDate}-${i}`}
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: withAlpha(ctx.theme.accent, 0.05),
                  border: `1px solid ${withAlpha(ctx.theme.accent, 0.2)}`,
                }}
              >
                <p
                  className="text-center text-lg text-gray-800"
                  style={{
                    fontFamily: ctx.headingFontFamily,
                    fontWeight: 500,
                  }}
                >
                  {job.role || job.company}
                </p>
                {job.role && (
                  <p
                    className="text-center text-sm italic"
                    style={{ color: withAlpha(ctx.theme.primary, 0.8) }}
                  >
                    {job.company}
                  </p>
                )}
                <p className="mt-1 text-center text-xs italic text-gray-500">
                  {job.startDate} — {job.endDate ?? "Present"}
                  {job.location ? ` · ${job.location}` : ""}
                </p>
                <div
                  className="mx-auto mb-3 mt-3 h-px w-6"
                  style={{ backgroundColor: withAlpha(ctx.theme.accent, 0.4) }}
                />
                {job.bullets &&
                  job.bullets.some((b) => !isRichTextEmpty(b)) && (
                    <ul className="mt-3 space-y-1.5">
                      {job.bullets
                        .filter((b) => !isRichTextEmpty(b))
                        .map((bullet, bi) => (
                          <li key={bi} className="flex gap-3">
                            <span
                              aria-hidden
                              className="mt-1 shrink-0"
                              style={{
                                color: withAlpha(ctx.theme.accent, 0.7),
                              }}
                            >
                              ·
                            </span>
                            <RichTextRender
                              html={bullet}
                              as="span"
                              className="text-xs leading-relaxed text-gray-700"
                            />
                          </li>
                        ))}
                    </ul>
                  )}
              </div>
            ))}
          </div>
        </section>
      ),
    });
  }

  if (education.length > 0) {
    out.push({
      key: "studies",
      node: (
        <section className="mb-12">
          <SectionTitle ctx={ctx}>Studies</SectionTitle>
          <div className="space-y-3">
            {education.map((entry, i) => (
              <div
                key={`${entry.school}-${entry.startDate}-${i}`}
                className="rounded-2xl p-4"
                style={{
                  backgroundColor: withAlpha(ctx.theme.accent, 0.05),
                  border: `1px solid ${withAlpha(ctx.theme.accent, 0.2)}`,
                }}
              >
                <p
                  className="text-center text-base text-gray-800"
                  style={{
                    fontFamily: ctx.headingFontFamily,
                    fontWeight: 500,
                  }}
                >
                  {entry.degree}
                </p>
                <p
                  className="text-center text-sm italic"
                  style={{ color: withAlpha(ctx.theme.primary, 0.8) }}
                >
                  {entry.school}
                </p>
                <p className="mt-0.5 text-center text-xs italic text-gray-500">
                  {entry.location ? `${entry.location} · ` : ""}
                  {entry.startDate} — {entry.endDate}
                </p>
              </div>
            ))}
          </div>
        </section>
      ),
    });
  }

  const hasSkills = skills.length > 0;
  const hasLanguages = languages.length > 0;
  if (hasSkills || hasLanguages) {
    out.push({
      key: "practices-languages",
      node: (
        <section className="mb-12">
          <div className="grid grid-cols-2 gap-x-8">
            {hasSkills && (
              <div>
                <SectionTitle ctx={ctx}>Practices</SectionTitle>
                <div className="flex flex-wrap justify-center gap-2">
                  {skills.map((skill, i) => (
                    <span
                      key={i}
                      className="rounded-full px-3 py-1 text-xs italic text-gray-700"
                      style={{
                        backgroundColor: withAlpha(ctx.theme.accent, 0.1),
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {hasLanguages && (
              <div>
                <SectionTitle ctx={ctx}>Languages</SectionTitle>
                <ul className="space-y-2">
                  {languages.map((lang, i) => (
                    <li key={i} className="text-center">
                      <p
                        className="text-sm text-gray-800"
                        style={{ fontFamily: ctx.headingFontFamily }}
                      >
                        {lang.name}
                      </p>
                      <p
                        className="mt-0.5 text-xs italic"
                        style={{ color: withAlpha(ctx.theme.primary, 0.7) }}
                      >
                        {lang.level}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      ),
    });
  }

  if (awards.length > 0) {
    out.push({
      key: "recognition",
      node: (
        <section className="mt-2">
          <SectionTitle ctx={ctx}>Recognition</SectionTitle>
          <ul className="space-y-3">
            {awards.map((award, i) => (
              <li key={i} className="text-center">
                <p className="text-sm text-gray-800">{award.title}</p>
                {award.year && (
                  <p
                    className="mt-0.5 text-xs italic"
                    style={{ color: ctx.theme.accent }}
                  >
                    {award.year}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      ),
    });
  }

  return out;
}

export function SoftPastelRomantic({
  data,
  paginated = false,
}: {
  data: CVData;
  paginated?: boolean;
}) {
  const ctx = computeCtx(data);
  const sections = buildSoftPastelSections(data, ctx);

  if (paginated) {
    return (
      <PaginatedCV
        sections={sections}
        PageShell={(props) => (
          <SoftPastelPage ctx={ctx} data={data} paginated {...props} />
        )}
        contentWidth={700}
        pageHeight={950}
      />
    );
  }

  return (
    <SoftPastelPage
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
    </SoftPastelPage>
  );
}
