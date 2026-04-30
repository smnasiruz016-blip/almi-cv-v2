"use client";

import { Fragment, type CSSProperties, type ReactNode } from "react";
import type { CVData } from "@/lib/cv-types";
import { resolveStyle, withAlpha } from "@/lib/cv-themes";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";
import { PaginatedCV, type PaginatedSection } from "./PaginatedCV";

const GOLD = "#C9A961";
const SOFTWARE = [
  "TouchDesigner",
  "Cinema 4D",
  "After Effects",
  "Houdini",
  "Processing",
  "Figma",
];

type AtelierProCtx = {
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

function computeCtx(data: CVData): AtelierProCtx {
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
  onGold = false,
}: {
  children: ReactNode;
  ctx: AtelierProCtx;
  onGold?: boolean;
}) {
  return (
    <h2
      className="mb-4 text-xs uppercase tracking-[0.25em]"
      style={{
        fontFamily: ctx.headingFontFamily,
        fontWeight: 600,
        color: onGold ? "rgba(255,255,255,0.9)" : ctx.theme.primary,
      }}
    >
      {children}
    </h2>
  );
}

function AtelierProHeader({
  ctx,
  data,
}: {
  ctx: AtelierProCtx;
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
    <div className="flex items-start gap-5">
      {showPhoto &&
        (basics.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={basics.photoUrl}
            alt={displayName}
            className="h-24 w-24 shrink-0 rounded-md object-cover"
            style={{
              border: `1px solid ${withAlpha(theme.text, 0.1)}`,
            }}
          />
        ) : (
          <div
            className="flex h-24 w-24 shrink-0 items-center justify-center rounded-md"
            style={{
              backgroundColor: withAlpha(theme.primary, 0.08),
              color: theme.primary,
              fontFamily: headingFontFamily,
              fontSize: "24px",
              fontWeight: 600,
              border: `1px solid ${withAlpha(theme.text, 0.1)}`,
            }}
          >
            {getInitials(displayName)}
          </div>
        ))}
      <div className="min-w-0 flex-1">
        <h1
          style={{
            color: theme.primary,
            fontFamily: headingFontFamily,
            fontSize: "32px",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
          }}
        >
          {displayName}
        </h1>
        {basics.role && (
          <p
            className="mt-1 text-sm uppercase tracking-[0.2em]"
            style={{ color: theme.textSoft }}
          >
            {basics.role}
          </p>
        )}
        {contactBits.length > 0 && (
          <p
            className="mt-3 text-xs leading-relaxed"
            style={{ color: theme.textSoft }}
          >
            {contactBits.map((bit, i) => (
              <Fragment key={i}>
                {i > 0 && (
                  <span
                    aria-hidden
                    className="mx-2"
                    style={{ color: theme.textFaint }}
                  >
                    ·
                  </span>
                )}
                {bit}
              </Fragment>
            ))}
          </p>
        )}
      </div>
    </div>
  );
}

function AtelierProSidebar({
  ctx,
  data,
  isFirstPage,
}: {
  ctx: AtelierProCtx;
  data: CVData;
  isFirstPage: boolean;
}) {
  if (!isFirstPage) {
    return (
      <aside
        className="w-[35%] shrink-0"
        style={{ backgroundColor: GOLD }}
      />
    );
  }

  const awards = data?.awards ?? [];
  const skills = data?.skills ?? [];
  const languages = data?.languages ?? [];

  return (
    <aside
      className="w-[35%] shrink-0 px-8 py-10"
      style={{ backgroundColor: GOLD, color: "#FFFFFF" }}
    >
      {awards.length > 0 && (
        <section className="mb-8">
          <SectionTitle ctx={ctx} onGold>
            LOGROS
          </SectionTitle>
          <ul>
            {awards.map((award, i) => (
              <li
                key={i}
                className={`py-2 ${i < awards.length - 1 ? "border-b border-white/20" : ""}`}
              >
                <p className="text-sm" style={{ fontWeight: 500 }}>
                  {award.title}
                </p>
                {award.year && (
                  <p className="mt-0.5 text-xs" style={{ opacity: 0.75 }}>
                    {award.issuer ? `${award.issuer} · ` : ""}
                    {award.year}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-8">
        <SectionTitle ctx={ctx} onGold>
          SOFTWARE
        </SectionTitle>
        <div className="flex flex-wrap gap-2">
          {SOFTWARE.map((tool) => (
            <span
              key={tool}
              className="rounded-md border border-white/40 bg-white/10 px-2.5 py-1 text-xs"
            >
              {tool}
            </span>
          ))}
        </div>
      </section>

      {skills.length > 0 && (
        <section className="mb-8">
          <SectionTitle ctx={ctx} onGold>
            COMPETENCIAS
          </SectionTitle>
          <ul className="space-y-1.5 text-sm leading-relaxed">
            {skills.map((skill, i) => (
              <li key={i} className="flex gap-2">
                <span
                  aria-hidden
                  className="shrink-0"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  •
                </span>
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {languages.length > 0 && (
        <section>
          <SectionTitle ctx={ctx} onGold>
            IDIOMAS
          </SectionTitle>
          <ul>
            {languages.map((lang, i) => (
              <li
                key={i}
                className="mb-2 flex items-baseline justify-between gap-3"
              >
                <span
                  className="text-sm"
                  style={{ fontWeight: 500 }}
                >
                  {lang.name}
                </span>
                <span className="text-xs" style={{ opacity: 0.75 }}>
                  {lang.level}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </aside>
  );
}

function AtelierProPage({
  ctx,
  data,
  isFirstPage,
  paginated,
  children,
}: {
  ctx: AtelierProCtx;
  data: CVData;
  pageIndex: number;
  pageCount: number;
  isFirstPage: boolean;
  paginated: boolean;
  children?: ReactNode;
}) {
  const summary = data?.basics?.summary;

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
      <div
        className="flex min-h-full"
        style={paginated ? { minHeight: 1123 } : { minHeight: "100%" }}
      >
        <div
          className="flex-1 px-12 py-10"
          style={{ backgroundColor: ctx.theme.surface }}
        >
          {isFirstPage && (
            <>
              <AtelierProHeader ctx={ctx} data={data} />
              {!isRichTextEmpty(summary) && (
                <RichTextRender
                  html={summary ?? ""}
                  as="p"
                  className="mt-6 text-sm leading-relaxed"
                  style={{ color: ctx.theme.textSoft }}
                />
              )}
              <div className="mt-8">{children}</div>
            </>
          )}
          {!isFirstPage && children}
        </div>
        <AtelierProSidebar ctx={ctx} data={data} isFirstPage={isFirstPage} />
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

function buildAtelierProSections(
  data: CVData,
  ctx: AtelierProCtx,
): PaginatedSection[] {
  const experience = data?.experience ?? [];
  const education = data?.education ?? [];

  const out: PaginatedSection[] = [];

  if (experience.length > 0) {
    out.push({
      key: "experiencia",
      node: (
        <section className="mb-8">
          <SectionTitle ctx={ctx}>EXPERIENCIA</SectionTitle>
          <div className="space-y-5">
            {experience.map((job, i) => (
              <div key={`${job.company}-${job.startDate}-${i}`}>
                <div className="flex items-baseline justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-base"
                      style={{ color: ctx.theme.text, fontWeight: 600 }}
                    >
                      {job.role || job.company}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: ctx.theme.textSoft }}
                    >
                      {job.role ? job.company : ""}
                      {job.location ? ` · ${job.location}` : ""}
                    </p>
                  </div>
                  <p
                    className="shrink-0 text-right text-xs"
                    style={{ color: ctx.theme.textFaint }}
                  >
                    {job.startDate} — {job.endDate ?? "Present"}
                  </p>
                </div>
                {job.bullets && job.bullets.some((b) => !isRichTextEmpty(b)) && (
                  <ul
                    className="mt-2 space-y-1 text-sm leading-relaxed"
                    style={{ color: ctx.theme.textSoft }}
                  >
                    {job.bullets
                      .filter((b) => !isRichTextEmpty(b))
                      .map((bullet, bi) => (
                        <li key={bi} className="flex gap-2">
                          <span
                            aria-hidden
                            className="shrink-0"
                            style={{ color: ctx.theme.textFaint }}
                          >
                            •
                          </span>
                          <RichTextRender html={bullet} as="span" />
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
      key: "formacion",
      node: (
        <section className="mb-8">
          <SectionTitle ctx={ctx}>FORMACIÓN</SectionTitle>
          <div className="space-y-3">
            {education.map((entry, i) => (
              <div
                key={`${entry.school}-${entry.startDate}-${i}`}
                className="flex items-baseline justify-between gap-4"
              >
                <div className="min-w-0 flex-1">
                  <p
                    className="text-base"
                    style={{ color: ctx.theme.text, fontWeight: 600 }}
                  >
                    {entry.degree}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: ctx.theme.textSoft }}
                  >
                    {entry.school}
                    {entry.location ? ` · ${entry.location}` : ""}
                  </p>
                  {entry.notes && (
                    <p
                      className="mt-1 text-sm leading-relaxed"
                      style={{ color: ctx.theme.textSoft }}
                    >
                      {entry.notes}
                    </p>
                  )}
                </div>
                <p
                  className="shrink-0 text-right text-xs"
                  style={{ color: ctx.theme.textFaint }}
                >
                  {entry.startDate} — {entry.endDate}
                </p>
              </div>
            ))}
          </div>
        </section>
      ),
    });
  }

  return out;
}

export function AtelierPro({
  data,
  paginated = false,
}: {
  data: CVData;
  paginated?: boolean;
}) {
  const ctx = computeCtx(data);
  const sections = buildAtelierProSections(data, ctx);

  if (paginated) {
    return (
      <PaginatedCV
        sections={sections}
        PageShell={(props) => (
          <AtelierProPage ctx={ctx} data={data} paginated {...props} />
        )}
        contentWidth={420}
        pageHeight={950}
      />
    );
  }

  return (
    <AtelierProPage
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
    </AtelierProPage>
  );
}
