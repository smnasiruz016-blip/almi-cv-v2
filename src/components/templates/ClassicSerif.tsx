"use client";

import { Children, Fragment, type CSSProperties, type ReactNode } from "react";
import { Globe, Link2, Mail, MapPin, Phone } from "lucide-react";
import type { CVData } from "@/lib/cv-types";
import {
  formatSectionTitle,
  resolveStyle,
  sectionVariantStyle,
  withAlpha,
} from "@/lib/cv-themes";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";
import { PaginatedCV, type PaginatedSection } from "./PaginatedCV";

type ClassicSerifCtx = {
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
  dividerStyle: CSSProperties;
  headerStyle: CSSProperties;
  onPrimary: string;
  showPhoto: boolean;
  photoRadiusClass: string;
};

function computeCtx(data: CVData): ClassicSerifCtx {
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
  const dividerStyle: CSSProperties = {
    borderColor: withAlpha(theme.text, 0.15),
  };
  const onPrimary = theme.primaryText;
  const showPhoto = photoStyle !== "none";
  const photoRadiusClass = photoStyle === "square" ? "rounded-md" : "rounded-full";
  const headerStyle: CSSProperties = {
    backgroundColor: theme.primary,
    ...(themeCategory === "light"
      ? { borderBottom: `1px solid ${withAlpha(theme.text, 0.15)}` }
      : {}),
  };
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
    dividerStyle,
    headerStyle,
    onPrimary,
    showPhoto,
    photoRadiusClass,
  };
}

function renderSectionTitle(title: string, ctx: ClassicSerifCtx) {
  return (
    <SectionHeading
      style={{
        ...ctx.headingStyle,
        ...sectionVariantStyle(ctx.sectionStyle, ctx.theme),
      }}
    >
      {formatSectionTitle(title, ctx.sectionStyle)}
    </SectionHeading>
  );
}

function ClassicSerifHeader({ ctx, data }: { ctx: ClassicSerifCtx; data: CVData }) {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const displayName = basics.fullName?.trim() ? basics.fullName : "Untitled";
  const { onPrimary, headingFont, headerStyle, showPhoto, photoRadiusClass } = ctx;

  return (
    <header
      className="-mx-12 -mt-12 mb-8 px-12 pb-8 pt-10"
      style={headerStyle}
    >
      <div className="flex items-center gap-6">
        {showPhoto && basics.photoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={basics.photoUrl}
            alt={displayName}
            className={`h-20 w-20 shrink-0 border-2 object-cover ${photoRadiusClass}`}
            style={{ borderColor: onPrimary }}
          />
        )}
        <div className="min-w-0">
          <h1
            className="text-4xl font-medium tracking-wide"
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
              style={{ color: withAlpha(onPrimary, 0.8) }}
            >
              {basics.role}
            </p>
          )}
          <div
            className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs"
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

function ClassicSerifPage({
  ctx,
  data,
  isFirstPage,
  paginated,
  children,
}: {
  ctx: ClassicSerifCtx;
  data: CVData;
  pageIndex: number;
  pageCount: number;
  isFirstPage: boolean;
  paginated: boolean;
  children: ReactNode;
}) {
  const childArr = Children.toArray(children);

  const articleEl = (
    <article
      className={`cv-page ${paginated ? "" : "mx-auto aspect-[210/297] max-w-[800px]"} w-full overflow-hidden rounded-lg bg-white p-12 shadow-warm-card-hover ${ctx.densityClass}`.trim()}
      style={
        paginated
          ? { ...ctx.articleStyle, width: 794, minHeight: 1123 }
          : ctx.articleStyle
      }
    >
      {isFirstPage && <ClassicSerifHeader ctx={ctx} data={data} />}
      {childArr.map((child, idx) => (
        <Fragment key={idx}>
          {idx > 0 && <Divider style={ctx.dividerStyle} />}
          {child}
        </Fragment>
      ))}
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

function buildClassicSerifSections(
  data: CVData,
  ctx: ClassicSerifCtx,
): PaginatedSection[] {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const experience = data?.experience ?? [];
  const education = data?.education ?? [];
  const skills = data?.skills ?? [];
  const projects = data?.projects ?? [];
  const languages = data?.languages ?? [];
  const awards = data?.awards ?? [];
  const certifications = data?.certifications ?? [];
  const interests = data?.interests ?? [];

  const out: PaginatedSection[] = [];

  if (!isRichTextEmpty(basics.summary)) {
    out.push({
      key: "profile",
      node: (
        <section>
          {renderSectionTitle("PROFILE", ctx)}
          <RichTextRender
            html={basics.summary ?? ""}
            as="p"
            className="text-sm leading-relaxed"
            style={{ color: ctx.theme.textSoft }}
          />
        </section>
      ),
    });
  }

  if (experience.length > 0) {
    out.push({
      key: "experience",
      node: (
        <section>
          {renderSectionTitle("EXPERIENCE", ctx)}
          <div className="space-y-5">
            {experience.map((job, i) => (
              <div key={`${job.company}-${job.startDate}-${i}`}>
                <div className="mb-1 flex items-baseline justify-between gap-4">
                  <p className="text-base font-medium" style={{ color: ctx.theme.text }}>
                    {job.company}
                    {job.role ? ` — ${job.role}` : ""}
                  </p>
                  <p className="shrink-0 text-sm" style={{ color: ctx.theme.textSoft }}>
                    {job.startDate} — {job.endDate ?? "Present"}
                  </p>
                </div>
                {job.location && (
                  <p
                    className="mb-2 text-xs italic"
                    style={{ color: ctx.theme.textSoft }}
                  >
                    {job.location}
                  </p>
                )}
                {job.bullets && job.bullets.some((b) => !isRichTextEmpty(b)) && (
                  <ul
                    className="space-y-1 text-sm leading-relaxed"
                    style={{ color: ctx.theme.textSoft }}
                  >
                    {job.bullets
                      .filter((b) => !isRichTextEmpty(b))
                      .map((bullet, bi) => (
                        <li key={bi} className="flex gap-2">
                          <span aria-hidden>•</span>
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
      key: "education",
      node: (
        <section>
          {renderSectionTitle("EDUCATION", ctx)}
          <div className="space-y-3">
            {education.map((entry, i) => (
              <div key={`${entry.school}-${entry.startDate}-${i}`}>
                <div className="mb-1 flex items-baseline justify-between gap-4">
                  <p className="text-base font-medium" style={{ color: ctx.theme.text }}>
                    {entry.school}
                    {entry.degree ? ` — ${entry.degree}` : ""}
                  </p>
                  <p className="shrink-0 text-sm" style={{ color: ctx.theme.textSoft }}>
                    {entry.startDate} — {entry.endDate}
                  </p>
                </div>
                {entry.location && (
                  <p className="text-xs italic" style={{ color: ctx.theme.textSoft }}>
                    {entry.location}
                  </p>
                )}
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

  if (skills.length > 0) {
    out.push({
      key: "skills",
      node: (
        <section>
          {renderSectionTitle("SKILLS", ctx)}
          <p
            className="text-sm leading-relaxed"
            style={{ color: ctx.theme.textSoft }}
          >
            {skills.join(" · ")}
          </p>
        </section>
      ),
    });
  }

  if (projects.length > 0) {
    out.push({
      key: "projects",
      node: (
        <section>
          {renderSectionTitle("PROJECTS", ctx)}
          <div className="space-y-3">
            {projects.map((project, i) => (
              <div key={`${project.name}-${i}`}>
                <p className="text-base font-medium" style={{ color: ctx.theme.text }}>
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

  if (languages.length > 0) {
    out.push({
      key: "languages",
      node: (
        <section>
          {renderSectionTitle("LANGUAGES", ctx)}
          <p
            className="text-sm leading-relaxed"
            style={{ color: ctx.theme.textSoft }}
          >
            {languages.map((l) => `${l.name} (${l.level})`).join(" · ")}
          </p>
        </section>
      ),
    });
  }

  if (awards.length > 0) {
    out.push({
      key: "awards",
      node: (
        <section>
          {renderSectionTitle("AWARDS", ctx)}
          <ul
            className="space-y-1 text-sm leading-relaxed"
            style={{ color: ctx.theme.textSoft }}
          >
            {awards.map((award, i) => (
              <li key={i}>
                {award.title}
                {award.issuer ? ` · ${award.issuer}` : ""}
                {award.year ? ` · ${award.year}` : ""}
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
      node: (
        <section>
          {renderSectionTitle("CERTIFICATIONS", ctx)}
          <ul
            className="space-y-1 text-sm leading-relaxed"
            style={{ color: ctx.theme.textSoft }}
          >
            {certifications.map((cert, i) => (
              <li key={i}>
                {cert.name}
                {cert.issuer ? ` · ${cert.issuer}` : ""}
                {cert.year ? ` · ${cert.year}` : ""}
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
      node: (
        <section>
          {renderSectionTitle("INTERESTS", ctx)}
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

export function ClassicSerif({
  data,
  paginated = false,
}: {
  data: CVData;
  paginated?: boolean;
}) {
  const ctx = computeCtx(data);
  const sections = buildClassicSerifSections(data, ctx);

  if (paginated) {
    return (
      <PaginatedCV
        sections={sections}
        PageShell={(props) => (
          <ClassicSerifPage ctx={ctx} data={data} paginated {...props} />
        )}
        contentWidth={698}
        pageHeight={1027}
      />
    );
  }

  return (
    <ClassicSerifPage
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
    </ClassicSerifPage>
  );
}

function SectionHeading({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: CSSProperties;
}) {
  return (
    <h2 className="mb-2 text-xs tracking-[0.25em]" style={style}>
      {children}
    </h2>
  );
}

function Divider({ style }: { style?: CSSProperties }) {
  return <div className="my-6 border-b" style={style} />;
}
