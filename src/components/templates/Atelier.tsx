"use client";

import { Fragment, type CSSProperties, type ReactNode } from "react";
import { Globe, Link2, Mail, MapPin, Phone } from "lucide-react";
import type { CVData } from "@/lib/cv-types";
import {
  formatSectionTitle,
  resolveStyle,
  sectionLabel,
  sectionVariantStyle,
  withAlpha,
} from "@/lib/cv-themes";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";
import { PaginatedCV, type PaginatedSection } from "./PaginatedCV";

const CORAL = "#FF7A6B";
const GOLD = "#D4A24C";

type AtelierCtx = {
  theme: ReturnType<typeof resolveStyle>["theme"];
  themeCategory: ReturnType<typeof resolveStyle>["themeCategory"];
  headingFont: ReturnType<typeof resolveStyle>["headingFont"];
  bodyFont: ReturnType<typeof resolveStyle>["bodyFont"];
  density: ReturnType<typeof resolveStyle>["density"];
  sectionStyle: ReturnType<typeof resolveStyle>["sectionStyle"];
  photoStyle: ReturnType<typeof resolveStyle>["photoStyle"];
  densityClass: string;
  articleStyle: CSSProperties;
  gradientBg: string;
  showPhoto: boolean;
  photoRadiusClass: string;
};

function computeCtx(data: CVData): AtelierCtx {
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
  const gradientBg = `linear-gradient(135deg, ${withAlpha(
    theme.primarySoft,
    0.5,
  )} 0%, ${withAlpha(theme.accent, 0.15)} 100%)`;
  const showPhoto = photoStyle !== "none";
  const photoRadiusClass = photoStyle === "square" ? "rounded-md" : "rounded-full";
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
    gradientBg,
    showPhoto,
    photoRadiusClass,
  };
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function AtelierHeader({
  ctx,
  data,
}: {
  ctx: AtelierCtx;
  data: CVData;
}) {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const displayName = basics.fullName?.trim() ? basics.fullName : "Untitled";
  const { headingFont, theme, showPhoto, photoRadiusClass } = ctx;

  return (
    <>
      <div className="flex items-start justify-between gap-4 p-10 pb-6">
        <div className="min-w-0 flex-1">
          <h1
            className="text-3xl font-medium italic tracking-tight"
            style={{
              fontFamily: `${headingFont.cssVar}, ${headingFont.fallback}`,
              color: theme.text,
            }}
          >
            {displayName}
          </h1>
          {basics.role && (
            <p
              className="mt-1 text-sm font-light italic"
              style={{ color: theme.textSoft }}
            >
              {basics.role}
            </p>
          )}
          <div
            className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs"
            style={{ color: theme.textSoft }}
          >
            {basics.email && (
              <span className="inline-flex items-center gap-1.5">
                <Mail className="h-3 w-3" style={{ color: theme.textFaint }} />
                {basics.email}
              </span>
            )}
            {basics.phone && (
              <span className="inline-flex items-center gap-1.5">
                <Phone className="h-3 w-3" style={{ color: theme.textFaint }} />
                {basics.phone}
              </span>
            )}
            {basics.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3 w-3" style={{ color: theme.textFaint }} />
                {basics.location}
              </span>
            )}
            {basics.website && (
              <span className="inline-flex items-center gap-1.5">
                <Globe className="h-3 w-3" style={{ color: theme.textFaint }} />
                {basics.website}
              </span>
            )}
            {basics.linkedIn && (
              <span className="inline-flex items-center gap-1.5">
                <Link2 className="h-3 w-3" style={{ color: theme.textFaint }} />
                {basics.linkedIn}
              </span>
            )}
          </div>
        </div>
        {showPhoto && (
          <div className="shrink-0">
            {basics.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={basics.photoUrl}
                alt={displayName}
                className={`h-14 w-14 border-2 border-white object-cover shadow-md ${photoRadiusClass}`}
              />
            ) : (
              <div
                className={`flex h-14 w-14 items-center justify-center border-2 border-white text-sm font-medium shadow-md ${photoRadiusClass}`}
                style={{
                  backgroundColor: withAlpha(theme.accent, 0.3),
                  color: theme.text,
                  fontFamily: `${headingFont.cssVar}, ${headingFont.fallback}`,
                }}
              >
                {getInitials(displayName)}
              </div>
            )}
          </div>
        )}
      </div>
      <hr
        className="mx-10"
        style={{
          height: "1px",
          border: "none",
          backgroundColor: GOLD,
          opacity: 0.4,
          marginBottom: "20px",
        }}
      />
    </>
  );
}

function AtelierPage({
  ctx,
  data,
  isFirstPage,
  paginated,
  children,
}: {
  ctx: AtelierCtx;
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
              background: ctx.gradientBg,
            }
          : { ...ctx.articleStyle, background: ctx.gradientBg }
      }
    >
      {isFirstPage && <AtelierHeader ctx={ctx} data={data} />}
      <div className="space-y-3 px-10 pb-10">{children}</div>
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

function MiniCard({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        backgroundColor: "rgba(255,255,255,0.85)",
        borderRadius: "10px",
        padding: "16px 18px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      {children}
    </div>
  );
}

function CardLabel({ title, ctx }: { title: string; ctx: AtelierCtx }) {
  const variant = sectionVariantStyle(ctx.sectionStyle, ctx.theme);
  return (
    <h2
      className="mb-2 text-[11px] font-medium tracking-[0.2em]"
      style={{
        color: CORAL,
        textTransform: "uppercase",
        fontFamily: `${ctx.headingFont.cssVar}, ${ctx.headingFont.fallback}`,
        ...variant,
      }}
    >
      {formatSectionTitle(title, ctx.sectionStyle)}
    </h2>
  );
}

function buildAtelierSections(
  data: CVData,
  ctx: AtelierCtx,
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
        <MiniCard>
          <CardLabel title={sectionLabel(data, "profile", "PROFILE")} ctx={ctx} />
          <RichTextRender
            html={basics.summary ?? ""}
            as="p"
            className="text-sm italic leading-relaxed"
            style={{ color: ctx.theme.textSoft }}
          />
        </MiniCard>
      ),
    });
  }

  if (experience.length > 0) {
    out.push({
      key: "experience",
      node: (
        <MiniCard>
          <CardLabel title={sectionLabel(data, "experience", "EXPERIENCE")} ctx={ctx} />
          <div className="space-y-4">
            {experience.map((job, i) => (
              <div key={`${job.company}-${job.startDate}-${i}`}>
                <div className="mb-1 flex items-baseline justify-between gap-4">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: ctx.theme.text }}
                  >
                    {job.role || job.company}
                  </p>
                  <p
                    className="shrink-0 text-xs italic"
                    style={{ color: ctx.theme.textFaint }}
                  >
                    {job.startDate} — {job.endDate ?? "Present"}
                  </p>
                </div>
                <p
                  className="mb-1.5 text-xs"
                  style={{ color: ctx.theme.textSoft }}
                >
                  {job.role ? job.company : ""}
                  {job.location ? ` · ${job.location}` : ""}
                </p>
                {job.bullets && job.bullets.some((b) => !isRichTextEmpty(b)) && (
                  <ul
                    className="space-y-1 text-sm leading-relaxed"
                    style={{ color: ctx.theme.textSoft }}
                  >
                    {job.bullets
                      .filter((b) => !isRichTextEmpty(b))
                      .map((bullet, bi) => (
                        <li key={bi} className="flex gap-2">
                          <span aria-hidden style={{ color: CORAL }}>
                            ·
                          </span>
                          <RichTextRender html={bullet} as="span" />
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </MiniCard>
      ),
    });
  }

  if (education.length > 0) {
    out.push({
      key: "education",
      node: (
        <MiniCard>
          <CardLabel title={sectionLabel(data, "education", "EDUCATION")} ctx={ctx} />
          <div className="space-y-2">
            {education.map((entry, i) => (
              <div key={`${entry.school}-${entry.startDate}-${i}`}>
                <div className="flex items-baseline justify-between gap-4">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: ctx.theme.text }}
                  >
                    {entry.school}
                  </p>
                  <p
                    className="shrink-0 text-xs italic"
                    style={{ color: ctx.theme.textFaint }}
                  >
                    {entry.startDate} — {entry.endDate}
                  </p>
                </div>
                <p className="text-xs" style={{ color: ctx.theme.textSoft }}>
                  {entry.degree}
                  {entry.location ? ` · ${entry.location}` : ""}
                </p>
                {entry.notes && (
                  <p
                    className="mt-1 text-sm italic leading-relaxed"
                    style={{ color: ctx.theme.textSoft }}
                  >
                    {entry.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </MiniCard>
      ),
    });
  }

  if (skills.length > 0) {
    out.push({
      key: "skills",
      node: (
        <MiniCard>
          <CardLabel title={sectionLabel(data, "skills", "SKILLS")} ctx={ctx} />
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="inline-block rounded-full px-2 py-0.5 text-[11px]"
                style={{
                  backgroundColor: withAlpha(ctx.theme.accent, 0.15),
                  color: ctx.theme.text,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </MiniCard>
      ),
    });
  }

  if (projects.length > 0) {
    out.push({
      key: "projects",
      node: (
        <MiniCard>
          <CardLabel title={sectionLabel(data, "projects", "PROJECTS")} ctx={ctx} />
          <div className="space-y-2">
            {projects.map((project, i) => (
              <div key={`${project.name}-${i}`}>
                <p
                  className="text-sm font-semibold"
                  style={{ color: ctx.theme.text }}
                >
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
        </MiniCard>
      ),
    });
  }

  if (languages.length > 0) {
    out.push({
      key: "languages",
      node: (
        <MiniCard>
          <CardLabel title={sectionLabel(data, "languages", "LANGUAGES")} ctx={ctx} />
          <div className="flex flex-wrap gap-1.5">
            {languages.map((lang, i) => (
              <span
                key={i}
                className="inline-block rounded-full px-2 py-0.5 text-[11px]"
                style={{
                  backgroundColor: withAlpha(ctx.theme.accent, 0.15),
                  color: ctx.theme.text,
                }}
              >
                {lang.name}{" "}
                <span style={{ color: ctx.theme.textFaint }}>
                  · {lang.level}
                </span>
              </span>
            ))}
          </div>
        </MiniCard>
      ),
    });
  }

  if (awards.length > 0) {
    out.push({
      key: "awards",
      node: (
        <MiniCard>
          <CardLabel title={sectionLabel(data, "awards", "AWARDS")} ctx={ctx} />
          <ul
            className="space-y-1 text-sm leading-relaxed"
            style={{ color: ctx.theme.textSoft }}
          >
            {awards.map((award, i) => (
              <li key={i} className="flex justify-between gap-4">
                <span>
                  <span style={{ color: ctx.theme.text }}>{award.title}</span>
                  {award.issuer ? ` · ${award.issuer}` : ""}
                </span>
                <span
                  className="shrink-0 text-xs italic"
                  style={{ color: ctx.theme.textFaint }}
                >
                  {award.year}
                </span>
              </li>
            ))}
          </ul>
        </MiniCard>
      ),
    });
  }

  if (certifications.length > 0) {
    out.push({
      key: "certifications",
      node: (
        <MiniCard>
          <CardLabel title={sectionLabel(data, "certifications", "CERTIFICATIONS")} ctx={ctx} />
          <ul
            className="space-y-1 text-sm leading-relaxed"
            style={{ color: ctx.theme.textSoft }}
          >
            {certifications.map((cert, i) => (
              <li key={i} className="flex justify-between gap-4">
                <span>
                  <span style={{ color: ctx.theme.text }}>{cert.name}</span>
                  {cert.issuer ? ` · ${cert.issuer}` : ""}
                </span>
                {cert.year && (
                  <span
                    className="shrink-0 text-xs italic"
                    style={{ color: ctx.theme.textFaint }}
                  >
                    {cert.year}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </MiniCard>
      ),
    });
  }

  if (interests.length > 0) {
    out.push({
      key: "interests",
      node: (
        <MiniCard>
          <CardLabel title={sectionLabel(data, "interests", "INTERESTS")} ctx={ctx} />
          <p
            className="text-sm italic leading-relaxed"
            style={{ color: ctx.theme.textSoft }}
          >
            {interests.join(" · ")}
          </p>
        </MiniCard>
      ),
    });
  }

  return out;
}

export function Atelier({
  data,
  paginated = false,
}: {
  data: CVData;
  paginated?: boolean;
}) {
  const ctx = computeCtx(data);
  const sections = buildAtelierSections(data, ctx);

  if (paginated) {
    return (
      <PaginatedCV
        sections={sections}
        PageShell={(props) => (
          <AtelierPage ctx={ctx} data={data} paginated {...props} />
        )}
        contentWidth={714}
        pageHeight={950}
      />
    );
  }

  return (
    <AtelierPage
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
    </AtelierPage>
  );
}
