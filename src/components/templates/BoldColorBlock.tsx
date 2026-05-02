"use client";

import { Fragment, type CSSProperties, type ReactNode } from "react";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import type { CVData } from "@/lib/cv-types";
import { resolveStyle, sectionLabel, withAlpha } from "@/lib/cv-themes";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";
import { PaginatedCV, type PaginatedSection } from "./PaginatedCV";

type BoldColorBlockCtx = {
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

function computeCtx(data: CVData): BoldColorBlockCtx {
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
  ctx: BoldColorBlockCtx;
}) {
  return (
    <div className="mb-4">
      <h2
        className="text-xs uppercase tracking-[0.25em]"
        style={{
          fontFamily: ctx.headingFontFamily,
          fontWeight: 700,
          color: ctx.theme.primary,
        }}
      >
        {children}
      </h2>
      <div
        className="mt-2 h-1 w-12"
        style={{ backgroundColor: ctx.theme.accent }}
      />
    </div>
  );
}

function DecorativeShapes({ ctx }: { ctx: BoldColorBlockCtx }) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute z-0 rounded-full"
        style={{
          top: -60,
          left: -60,
          width: 180,
          height: 180,
          backgroundColor: ctx.theme.primary,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute z-0"
        style={{
          top: 40,
          right: 40,
          width: 120,
          height: 120,
          backgroundColor: ctx.theme.accent,
          transform: "rotate(-10deg)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute z-0"
        style={{
          bottom: 40,
          left: 60,
          width: "80%",
          height: 6,
          backgroundColor: ctx.theme.primary,
        }}
      />
    </>
  );
}

function BoldColorBlockHeader({
  ctx,
  data,
}: {
  ctx: BoldColorBlockCtx;
  data: CVData;
}) {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const displayName = basics.fullName?.trim() ? basics.fullName : "Untitled";
  const { theme, headingFontFamily, showPhoto } = ctx;

  return (
    <header className="relative z-10 flex items-start gap-8 px-12 pb-8 pt-16">
      <div className="min-w-0 flex-1 pr-4">
        <p
          className="mb-3 text-xs uppercase tracking-[0.25em]"
          style={{ fontWeight: 700, color: theme.primary }}
        >
          PORTFOLIO
        </p>
        <h1
          style={{
            fontFamily: headingFontFamily,
            fontSize: "56px",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: theme.primary,
          }}
        >
          {displayName}
        </h1>
        {basics.role && (
          <p
            className="mt-3 text-xl font-medium italic text-gray-700"
          >
            {basics.role}
          </p>
        )}
        <div className="mt-6 flex flex-col gap-y-1.5 text-sm text-gray-700">
          {basics.email && (
            <span className="inline-flex items-center gap-2">
              <Mail className="h-3.5 w-3.5" style={{ color: theme.accent }} />
              {basics.email}
            </span>
          )}
          {basics.phone && (
            <span className="inline-flex items-center gap-2">
              <Phone className="h-3.5 w-3.5" style={{ color: theme.accent }} />
              {basics.phone}
            </span>
          )}
          {basics.location && (
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" style={{ color: theme.accent }} />
              {basics.location}
            </span>
          )}
          {basics.website && (
            <span className="inline-flex items-center gap-2">
              <Globe className="h-3.5 w-3.5" style={{ color: theme.accent }} />
              {basics.website}
            </span>
          )}
        </div>
      </div>
      {showPhoto && (
        <div className="relative h-44 w-44 shrink-0">
          <div
            aria-hidden
            className="absolute z-0 rounded-2xl"
            style={{
              top: 8,
              left: 8,
              width: 176,
              height: 176,
              backgroundColor: theme.primary,
            }}
          />
          {basics.photoUrl ? (
            <div
              className="relative z-10 h-44 w-44 overflow-hidden rounded-2xl"
              style={{ border: `4px solid ${theme.accent}` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={basics.photoUrl}
                alt={displayName}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div
              className="relative z-10 flex h-44 w-44 items-center justify-center rounded-2xl"
              style={{
                border: `4px solid ${theme.accent}`,
                backgroundColor: theme.primary,
                color: theme.surface,
                fontFamily: headingFontFamily,
                fontSize: "60px",
                fontWeight: 800,
              }}
            >
              {getInitials(displayName)}
            </div>
          )}
        </div>
      )}
    </header>
  );
}

function BoldColorBlockPage({
  ctx,
  data,
  isFirstPage,
  paginated,
  leftChildren,
  rightChildren,
}: {
  ctx: BoldColorBlockCtx;
  data: CVData;
  pageIndex: number;
  pageCount: number;
  isFirstPage: boolean;
  paginated: boolean;
  children?: ReactNode;
  leftChildren?: ReactNode;
  rightChildren?: ReactNode;
}) {
  const summary = data?.basics?.summary;

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
      {isFirstPage && <DecorativeShapes ctx={ctx} />}
      {isFirstPage && <BoldColorBlockHeader ctx={ctx} data={data} />}
      {isFirstPage && !isRichTextEmpty(summary) && (
        <section className="relative z-10 mb-2 px-12 pt-2">
          <SectionTitle ctx={ctx}>{sectionLabel(data, "profile", "PROFILE")}</SectionTitle>
          <RichTextRender
            html={summary ?? ""}
            as="p"
            className="text-sm leading-relaxed text-gray-800"
          />
        </section>
      )}
      <div
        className={`relative z-10 grid grid-cols-3 gap-x-8 gap-y-10 px-12 pb-12 ${isFirstPage ? "pt-8" : "pt-16"}`}
      >
        <div className="col-span-2 space-y-10">{leftChildren}</div>
        <div className="col-span-1 space-y-10">{rightChildren}</div>
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

function buildBoldColorBlockSections(
  data: CVData,
  ctx: BoldColorBlockCtx,
): PaginatedSection[] {
  const experience = data?.experience ?? [];
  const education = data?.education ?? [];
  const skills = data?.skills ?? [];
  const languages = data?.languages ?? [];
  const awards = data?.awards ?? [];

  const out: PaginatedSection[] = [];

  if (experience.length > 0) {
    out.push({
      key: "experience",
      column: "left",
      node: (
        <section>
          <SectionTitle ctx={ctx}>{sectionLabel(data, "experience", "EXPERIENCE")}</SectionTitle>
          <div className="space-y-6">
            {experience.map((job, i) => (
              <div key={`${job.company}-${job.startDate}-${i}`}>
                <p className="text-base font-bold text-gray-900">
                  {job.role || job.company}
                </p>
                {(job.role || job.location) && (
                  <p
                    className="text-sm font-semibold"
                    style={{ color: ctx.theme.primary }}
                  >
                    {job.role ? job.company : ""}
                    {job.location ? ` · ${job.location}` : ""}
                  </p>
                )}
                <p className="text-xs italic text-gray-500">
                  {job.startDate} — {job.endDate ?? "Present"}
                </p>
                {job.bullets &&
                  job.bullets.some((b) => !isRichTextEmpty(b)) && (
                    <ul className="ml-0 mt-3 space-y-1.5">
                      {job.bullets
                        .filter((b) => !isRichTextEmpty(b))
                        .map((bullet, bi) => (
                          <li key={bi} className="flex gap-2">
                            <span
                              aria-hidden
                              className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0"
                              style={{ backgroundColor: ctx.theme.accent }}
                            />
                            <RichTextRender
                              html={bullet}
                              as="span"
                              className="text-xs leading-relaxed text-gray-800"
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
      key: "education",
      column: "left",
      node: (
        <section>
          <SectionTitle ctx={ctx}>{sectionLabel(data, "education", "EDUCATION")}</SectionTitle>
          <div className="space-y-3">
            {education.map((entry, i) => (
              <div key={`${entry.school}-${entry.startDate}-${i}`}>
                <p className="text-sm font-bold text-gray-900">
                  {entry.degree}
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: ctx.theme.primary }}
                >
                  {entry.school}
                  {entry.location ? ` · ${entry.location}` : ""}
                </p>
                <p className="text-xs italic text-gray-500">
                  {entry.startDate} — {entry.endDate}
                </p>
              </div>
            ))}
          </div>
        </section>
      ),
    });
  }

  if (skills.length > 0) {
    out.push({
      key: "skills",
      column: "right",
      node: (
        <section>
          <SectionTitle ctx={ctx}>{sectionLabel(data, "skills", "SKILLS")}</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="rounded-full border px-3 py-1 text-xs"
                style={{
                  backgroundColor: ctx.theme.surface,
                  color: ctx.theme.primary,
                  borderColor: withAlpha(ctx.theme.primary, 0.2),
                  fontWeight: 600,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      ),
    });
  }

  if (languages.length > 0) {
    out.push({
      key: "languages",
      column: "right",
      node: (
        <section>
          <SectionTitle ctx={ctx}>{sectionLabel(data, "languages", "LANGUAGES")}</SectionTitle>
          <ul className="space-y-2">
            {languages.map((lang, i) => (
              <li key={i}>
                <p className="text-sm font-bold text-gray-900">{lang.name}</p>
                <p
                  className="mt-0.5 text-xs italic"
                  style={{ color: ctx.theme.primary }}
                >
                  {lang.level}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ),
    });
  }

  if (awards.length > 0) {
    out.push({
      key: "awards",
      column: "right",
      node: (
        <section>
          <SectionTitle ctx={ctx}>{sectionLabel(data, "awards", "AWARDS")}</SectionTitle>
          <ul className="space-y-3">
            {awards.map((award, i) => (
              <li key={i}>
                <p className="text-xs font-semibold leading-tight text-gray-900">
                  {award.title}
                </p>
                {award.year && (
                  <p
                    className="mt-0.5 text-xs"
                    style={{ color: ctx.theme.accent, fontWeight: 700 }}
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

export function BoldColorBlock({
  data,
  paginated = false,
}: {
  data: CVData;
  paginated?: boolean;
}) {
  const ctx = computeCtx(data);
  const sections = buildBoldColorBlockSections(data, ctx);

  if (paginated) {
    return (
      <PaginatedCV
        sections={sections}
        PageShell={(props) => (
          <BoldColorBlockPage ctx={ctx} data={data} paginated {...props} />
        )}
        contentWidth={698}
        pageHeight={950}
        leftWidth={420}
        rightWidth={210}
      />
    );
  }

  const leftSections = sections.filter((s) => s.column !== "right");
  const rightSections = sections.filter((s) => s.column === "right");

  return (
    <BoldColorBlockPage
      ctx={ctx}
      data={data}
      pageIndex={0}
      pageCount={1}
      isFirstPage
      paginated={false}
      leftChildren={leftSections.map((s) => (
        <Fragment key={s.key}>{s.node}</Fragment>
      ))}
      rightChildren={rightSections.map((s) => (
        <Fragment key={s.key}>{s.node}</Fragment>
      ))}
    />
  );
}
