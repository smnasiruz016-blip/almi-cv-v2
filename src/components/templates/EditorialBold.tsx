"use client";

import { Fragment, type CSSProperties, type ReactNode } from "react";
import { Globe, Link2, Mail, MapPin, Phone } from "lucide-react";
import type { CVData } from "@/lib/cv-types";
import {
  formatSectionTitle,
  resolveStyle,
  sectionVariantStyle,
  withAlpha,
} from "@/lib/cv-themes";
import { PaginatedCV, type PaginatedSection } from "./PaginatedCV";

type EditorialBoldCtx = {
  theme: ReturnType<typeof resolveStyle>["theme"];
  themeCategory: ReturnType<typeof resolveStyle>["themeCategory"];
  headingFont: ReturnType<typeof resolveStyle>["headingFont"];
  bodyFont: ReturnType<typeof resolveStyle>["bodyFont"];
  density: ReturnType<typeof resolveStyle>["density"];
  sectionStyle: ReturnType<typeof resolveStyle>["sectionStyle"];
  photoStyle: ReturnType<typeof resolveStyle>["photoStyle"];
  densityClass: string;
  articleStyle: CSSProperties;
  headingStyle: CSSProperties;
  onPrimary: string;
  showPhoto: boolean;
  photoRadiusClass: string;
};

function computeCtx(data: CVData): EditorialBoldCtx {
  const {
    theme,
    themeCategory,
    headingFont,
    bodyFont,
    density,
    sectionStyle,
    photoStyle,
  } = resolveStyle(data?.style);
  const densityClass =
    density === "compact" ? "compact" : density === "spacious" ? "spacious" : "";
  const articleStyle: CSSProperties = {
    fontFamily: `${bodyFont.cssVar}, ${bodyFont.fallback}`,
    color: theme.text,
  };
  const headingStyle: CSSProperties = {
    fontFamily: `${headingFont.cssVar}, ${headingFont.fallback}`,
    color: theme.text,
  };
  const showPhoto = photoStyle !== "none";
  const photoRadiusClass = photoStyle === "round" ? "rounded-full" : "rounded-md";
  return {
    theme,
    themeCategory,
    headingFont,
    bodyFont,
    density,
    sectionStyle,
    photoStyle,
    densityClass,
    articleStyle,
    headingStyle,
    onPrimary: theme.primaryText,
    showPhoto,
    photoRadiusClass,
  };
}

function SectionTitle({
  title,
  ctx,
}: {
  title: string;
  ctx: EditorialBoldCtx;
}) {
  const variant = sectionVariantStyle(ctx.sectionStyle, ctx.theme);
  return (
    <div className="mb-3">
      <h2
        className="text-sm font-bold tracking-[0.2em]"
        style={{ ...ctx.headingStyle, ...variant }}
      >
        {formatSectionTitle(title, ctx.sectionStyle)}
      </h2>
      {ctx.sectionStyle === "uppercase" && (
        <div
          className="mt-1.5 h-0.5 w-8"
          style={{ backgroundColor: ctx.theme.accent }}
        />
      )}
    </div>
  );
}

function EditorialBoldHeader({
  ctx,
  data,
}: {
  ctx: EditorialBoldCtx;
  data: CVData;
}) {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const displayName = basics.fullName?.trim() ? basics.fullName : "Untitled";
  const { onPrimary, headingFont, theme, showPhoto, photoRadiusClass } = ctx;

  return (
    <header
      className="px-12 py-10"
      style={{ backgroundColor: theme.primary }}
    >
      <div className="flex items-center gap-8">
        {showPhoto && basics.photoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={basics.photoUrl}
            alt={displayName}
            className={`h-32 w-32 shrink-0 border-2 object-cover ${photoRadiusClass}`}
            style={{ borderColor: onPrimary }}
          />
        )}
        <div className="min-w-0 flex-1">
          <h1
            className="text-4xl font-bold leading-tight"
            style={{
              fontFamily: `${headingFont.cssVar}, ${headingFont.fallback}`,
              color: onPrimary,
            }}
          >
            {displayName.toUpperCase()}
          </h1>
          {basics.role && (
            <p
              className="mt-1 text-lg italic"
              style={{ color: withAlpha(onPrimary, 0.85) }}
            >
              {basics.role}
            </p>
          )}
          <div
            className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-xs"
            style={{ color: withAlpha(onPrimary, 0.9) }}
          >
            {basics.email && (
              <span className="inline-flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" style={{ color: withAlpha(onPrimary, 0.7) }} />
                {basics.email}
              </span>
            )}
            {basics.phone && (
              <span className="inline-flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" style={{ color: withAlpha(onPrimary, 0.7) }} />
                {basics.phone}
              </span>
            )}
            {basics.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" style={{ color: withAlpha(onPrimary, 0.7) }} />
                {basics.location}
              </span>
            )}
            {basics.website && (
              <span className="inline-flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" style={{ color: withAlpha(onPrimary, 0.7) }} />
                {basics.website}
              </span>
            )}
            {basics.linkedIn && (
              <span className="inline-flex items-center gap-1.5">
                <Link2 className="h-3.5 w-3.5" style={{ color: withAlpha(onPrimary, 0.7) }} />
                {basics.linkedIn}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function EditorialBoldPage({
  ctx,
  data,
  isFirstPage,
  paginated,
  leftChildren,
  rightChildren,
}: {
  ctx: EditorialBoldCtx;
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
      className={`cv-page ${paginated ? "" : "mx-auto aspect-[210/297] max-w-[800px]"} w-full overflow-hidden rounded-lg bg-white shadow-warm-card-hover ${ctx.densityClass}`.trim()}
      style={
        paginated
          ? { ...ctx.articleStyle, width: 794, minHeight: 1123 }
          : ctx.articleStyle
      }
    >
      {isFirstPage && <EditorialBoldHeader ctx={ctx} data={data} />}
      {isFirstPage && summary && (
        <>
          <p
            className="px-12 pb-2 pt-6 text-base italic leading-relaxed"
            style={{
              fontFamily: `${ctx.headingFont.cssVar}, ${ctx.headingFont.fallback}`,
              color: ctx.theme.textSoft,
            }}
          >
            {summary}
          </p>
          <div
            className="mx-12 border-t"
            style={{ borderColor: withAlpha(ctx.theme.text, 0.15) }}
          />
        </>
      )}
      <div className="grid grid-cols-[3fr_2fr] gap-8 px-12 py-6">
        <div className="space-y-6">{leftChildren}</div>
        <div className="space-y-6">{rightChildren}</div>
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

function buildEditorialBoldSections(
  data: CVData,
  ctx: EditorialBoldCtx,
): PaginatedSection[] {
  const experience = data?.experience ?? [];
  const education = data?.education ?? [];
  const skills = data?.skills ?? [];
  const projects = data?.projects ?? [];
  const languages = data?.languages ?? [];
  const awards = data?.awards ?? [];
  const certifications = data?.certifications ?? [];
  const interests = data?.interests ?? [];

  const out: PaginatedSection[] = [];

  if (experience.length > 0) {
    out.push({
      key: "experience",
      column: "left",
      node: (
        <section>
          <SectionTitle title="EXPERIENCE" ctx={ctx} />
          <div className="space-y-5">
            {experience.map((job, i) => (
              <div key={`${job.company}-${job.startDate}-${i}`}>
                <p className="text-base font-semibold" style={{ color: ctx.theme.text }}>
                  {job.role || job.company}
                </p>
                <p
                  className="text-sm font-medium"
                  style={{ color: ctx.theme.textSoft }}
                >
                  {job.role ? job.company : ""}
                  {job.location ? ` · ${job.location}` : ""}
                </p>
                <p
                  className="mb-2 text-xs italic"
                  style={{ color: ctx.theme.textFaint }}
                >
                  {job.startDate} — {job.endDate ?? "Present"}
                </p>
                {job.bullets && job.bullets.length > 0 && (
                  <ul
                    className="space-y-1 text-sm leading-relaxed"
                    style={{ color: ctx.theme.textSoft }}
                  >
                    {job.bullets.map((bullet, bi) => (
                      <li key={bi} className="flex gap-2">
                        <span aria-hidden style={{ color: ctx.theme.accent }}>
                          ▸
                        </span>
                        <span>{bullet}</span>
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
          <SectionTitle title="EDUCATION" ctx={ctx} />
          <div className="space-y-3">
            {education.map((entry, i) => (
              <div key={`${entry.school}-${entry.startDate}-${i}`}>
                <p className="text-base font-semibold" style={{ color: ctx.theme.text }}>
                  {entry.school}
                </p>
                <p className="text-sm" style={{ color: ctx.theme.textSoft }}>
                  {entry.degree}
                  {entry.location ? ` · ${entry.location}` : ""}
                </p>
                <p
                  className="text-xs italic"
                  style={{ color: ctx.theme.textFaint }}
                >
                  {entry.startDate} — {entry.endDate}
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
            ))}
          </div>
        </section>
      ),
    });
  }

  if (projects.length > 0) {
    out.push({
      key: "projects",
      column: "left",
      node: (
        <section>
          <SectionTitle title="PROJECTS" ctx={ctx} />
          <div className="space-y-3">
            {projects.map((project, i) => (
              <div key={`${project.name}-${i}`}>
                <p className="text-base font-semibold" style={{ color: ctx.theme.text }}>
                  {project.name}
                </p>
                {project.description && (
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: ctx.theme.textSoft }}
                  >
                    {project.description}
                  </p>
                )}
                {project.url && (
                  <a
                    href={`https://${project.url}`}
                    className="text-xs underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: ctx.theme.accent }}
                  >
                    {project.url}
                  </a>
                )}
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
          <SectionTitle title="SKILLS" ctx={ctx} />
          <ul
            className="space-y-1 text-sm"
            style={{ color: ctx.theme.textSoft }}
          >
            {skills.map((skill, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden style={{ color: ctx.theme.accent }}>
                  ▸
                </span>
                <span>{skill}</span>
              </li>
            ))}
          </ul>
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
          <SectionTitle title="LANGUAGES" ctx={ctx} />
          <ul
            className="space-y-1 text-sm"
            style={{ color: ctx.theme.textSoft }}
          >
            {languages.map((lang, i) => (
              <li key={i} className="flex justify-between">
                <span style={{ color: ctx.theme.text }}>{lang.name}</span>
                <span
                  className="text-xs italic"
                  style={{ color: ctx.theme.textFaint }}
                >
                  {lang.level}
                </span>
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
          <SectionTitle title="AWARDS" ctx={ctx} />
          <ul
            className="space-y-2 text-sm leading-relaxed"
            style={{ color: ctx.theme.textSoft }}
          >
            {awards.map((award, i) => (
              <li key={i}>
                <p
                  className="font-medium"
                  style={{ color: ctx.theme.text }}
                >
                  {award.title}
                </p>
                <p
                  className="text-xs italic"
                  style={{ color: ctx.theme.textFaint }}
                >
                  {award.issuer}
                  {award.year ? ` · ${award.year}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ),
    });
  }

  if (certifications.length > 0) {
    out.push({
      key: "certifications",
      column: "right",
      node: (
        <section>
          <SectionTitle title="CERTIFICATIONS" ctx={ctx} />
          <ul
            className="space-y-2 text-sm leading-relaxed"
            style={{ color: ctx.theme.textSoft }}
          >
            {certifications.map((cert, i) => (
              <li key={i}>
                <p
                  className="font-medium"
                  style={{ color: ctx.theme.text }}
                >
                  {cert.name}
                </p>
                <p
                  className="text-xs italic"
                  style={{ color: ctx.theme.textFaint }}
                >
                  {cert.issuer}
                  {cert.year ? ` · ${cert.year}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ),
    });
  }

  if (interests.length > 0) {
    out.push({
      key: "interests",
      column: "right",
      node: (
        <section>
          <SectionTitle title="INTERESTS" ctx={ctx} />
          <p
            className="text-sm leading-relaxed"
            style={{ color: ctx.theme.textSoft }}
          >
            {interests.join(" · ")}
          </p>
        </section>
      ),
    });
  }

  return out;
}

export function EditorialBold({
  data,
  paginated = false,
}: {
  data: CVData;
  paginated?: boolean;
}) {
  const ctx = computeCtx(data);
  const sections = buildEditorialBoldSections(data, ctx);

  if (paginated) {
    return (
      <PaginatedCV
        sections={sections}
        PageShell={(props) => (
          <EditorialBoldPage ctx={ctx} data={data} paginated {...props} />
        )}
        contentWidth={698}
        pageHeight={800}
        leftWidth={400}
        rightWidth={266}
      />
    );
  }

  const leftSections = sections.filter((s) => s.column !== "right");
  const rightSections = sections.filter((s) => s.column === "right");

  return (
    <EditorialBoldPage
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
