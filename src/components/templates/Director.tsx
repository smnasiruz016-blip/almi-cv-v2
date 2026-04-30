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
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";
import { PaginatedCV, type PaginatedSection } from "./PaginatedCV";

type DirectorCtx = {
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
  showPhoto: boolean;
};

function computeCtx(data: CVData): DirectorCtx {
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
    showPhoto: photoStyle !== "none",
  };
}

function SectionTitle({
  title,
  ctx,
}: {
  title: string;
  ctx: DirectorCtx;
}) {
  const variant = sectionVariantStyle(ctx.sectionStyle, ctx.theme);
  return (
    <h2
      className="mb-3 text-xs tracking-[0.25em]"
      style={{
        ...ctx.headingStyle,
        fontWeight: 600,
        textTransform: "uppercase",
        ...variant,
      }}
    >
      {formatSectionTitle(title, ctx.sectionStyle)}
    </h2>
  );
}

function DirectorLeftBlock({
  ctx,
  data,
  isFirstPage,
}: {
  ctx: DirectorCtx;
  data: CVData;
  isFirstPage: boolean;
}) {
  const { theme, headingFont, showPhoto } = ctx;
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const onPrimary = theme.primaryText;

  const nameParts = (basics.fullName || "").trim().split(/\s+/);
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <aside
      className="flex w-[40%] flex-col justify-between overflow-hidden p-10"
      style={{ backgroundColor: theme.primary }}
    >
      {isFirstPage ? (
        <>
          <div className="max-w-full">
            <h1
              className="max-w-full break-words hyphens-auto"
              style={{
                color: onPrimary,
                fontFamily: `${headingFont.cssVar}, ${headingFont.fallback}`,
                fontSize: "clamp(36px, 5.5vw, 48px)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              {firstName}
              {lastName && (
                <>
                  <br />
                  {lastName}
                </>
              )}
            </h1>
            {basics.role && (
              <p
                className="mt-4 text-xs uppercase tracking-[0.3em]"
                style={{ color: withAlpha(onPrimary, 0.75) }}
              >
                {basics.role}
              </p>
            )}
          </div>
          {showPhoto && (
            <div className="flex items-end gap-3">
              {basics.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={basics.photoUrl}
                  alt={basics.fullName || "Profile"}
                  className="h-20 w-20 rounded-md border-2 border-white object-cover shadow-md"
                />
              ) : (
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-md border-2 border-white shadow-md"
                  style={{
                    backgroundColor: withAlpha(onPrimary, 0.15),
                    color: onPrimary,
                    fontFamily: `${headingFont.cssVar}, ${headingFont.fallback}`,
                    fontSize: "20px",
                    fontWeight: 700,
                  }}
                >
                  {firstName.charAt(0)}
                  {lastName.charAt(0)}
                </div>
              )}
              <div className="flex flex-col gap-1.5 pb-1">
                <span
                  className="block h-2 w-2 rounded-full"
                  style={{ backgroundColor: withAlpha(onPrimary, 0.4) }}
                />
                <span
                  className="block h-2 w-2 rounded-full"
                  style={{ backgroundColor: withAlpha(onPrimary, 0.4) }}
                />
                <span
                  className="block h-2 w-2 rounded-full"
                  style={{ backgroundColor: withAlpha(onPrimary, 0.4) }}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <div />
      )}
    </aside>
  );
}

function DirectorPage({
  ctx,
  data,
  isFirstPage,
  paginated,
  children,
}: {
  ctx: DirectorCtx;
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
          : { ...ctx.articleStyle, backgroundColor: ctx.theme.surface, padding: 0 }
      }
    >
      <div className="flex min-h-full" style={paginated ? { minHeight: 1123 } : { minHeight: "100%" }}>
        <DirectorLeftBlock ctx={ctx} data={data} isFirstPage={isFirstPage} />
        <div
          className="flex-1 overflow-hidden px-12 py-10"
          style={{ backgroundColor: ctx.theme.surface }}
        >
          {children}
        </div>
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

function buildDirectorSections(
  data: CVData,
  ctx: DirectorCtx,
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
        <section className="mb-6">
          <SectionTitle title="PROFILE" ctx={ctx} />
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

  const hasContact =
    basics.email ||
    basics.phone ||
    basics.location ||
    basics.website ||
    basics.linkedIn;
  if (hasContact) {
    out.push({
      key: "contact",
      node: (
        <section className="mb-6">
          <div
            className="flex flex-wrap gap-x-4 gap-y-1 text-xs"
            style={{ color: ctx.theme.textSoft }}
          >
            {basics.email && (
              <span className="inline-flex items-center gap-1.5">
                <Mail
                  className="h-3.5 w-3.5"
                  style={{ color: ctx.theme.textFaint }}
                />
                {basics.email}
              </span>
            )}
            {basics.phone && (
              <span className="inline-flex items-center gap-1.5">
                <Phone
                  className="h-3.5 w-3.5"
                  style={{ color: ctx.theme.textFaint }}
                />
                {basics.phone}
              </span>
            )}
            {basics.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin
                  className="h-3.5 w-3.5"
                  style={{ color: ctx.theme.textFaint }}
                />
                {basics.location}
              </span>
            )}
            {basics.website && (
              <span className="inline-flex items-center gap-1.5">
                <Globe
                  className="h-3.5 w-3.5"
                  style={{ color: ctx.theme.textFaint }}
                />
                {basics.website}
              </span>
            )}
            {basics.linkedIn && (
              <span className="inline-flex items-center gap-1.5">
                <Link2
                  className="h-3.5 w-3.5"
                  style={{ color: ctx.theme.textFaint }}
                />
                {basics.linkedIn}
              </span>
            )}
          </div>
        </section>
      ),
    });
  }

  if (experience.length > 0) {
    out.push({
      key: "experience",
      node: (
        <section className="mb-6">
          <SectionTitle title="EXPERIENCE" ctx={ctx} />
          <div className="space-y-5">
            {experience.map((job, i) => (
              <div key={`${job.company}-${job.startDate}-${i}`}>
                <div className="mb-1 flex items-baseline justify-between gap-4">
                  <p
                    className="text-base font-semibold"
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
                  className="mb-1.5 text-sm"
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
                          <span aria-hidden>—</span>
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
        <section className="mb-6">
          <SectionTitle title="EDUCATION" ctx={ctx} />
          <div className="space-y-3">
            {education.map((entry, i) => (
              <div key={`${entry.school}-${entry.startDate}-${i}`}>
                <div className="flex items-baseline justify-between gap-4">
                  <p
                    className="text-base font-semibold"
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
                <p className="text-sm" style={{ color: ctx.theme.textSoft }}>
                  {entry.degree}
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
            ))}
          </div>
        </section>
      ),
    });
  }

  if (projects.length > 0) {
    out.push({
      key: "projects",
      node: (
        <section className="mb-6">
          <SectionTitle title="PROJECTS" ctx={ctx} />
          <div className="space-y-3">
            {projects.map((project, i) => (
              <div key={`${project.name}-${i}`}>
                <p
                  className="text-base font-semibold"
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
        </section>
      ),
    });
  }

  if (skills.length > 0) {
    out.push({
      key: "skills",
      node: (
        <section className="mb-6">
          <SectionTitle title="SKILLS" ctx={ctx} />
          <p
            className="text-sm leading-relaxed"
            style={{ color: ctx.theme.textSoft }}
          >
            {skills.join(", ")}
          </p>
        </section>
      ),
    });
  }

  if (languages.length > 0) {
    out.push({
      key: "languages",
      node: (
        <section className="mb-6">
          <SectionTitle title="LANGUAGES" ctx={ctx} />
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
        <section className="mb-6">
          <SectionTitle title="AWARDS" ctx={ctx} />
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
        </section>
      ),
    });
  }

  if (certifications.length > 0) {
    out.push({
      key: "certifications",
      node: (
        <section className="mb-6">
          <SectionTitle title="CERTIFICATIONS" ctx={ctx} />
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
        </section>
      ),
    });
  }

  if (interests.length > 0) {
    out.push({
      key: "interests",
      node: (
        <section className="mb-6">
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

export function Director({
  data,
  paginated = false,
}: {
  data: CVData;
  paginated?: boolean;
}) {
  const ctx = computeCtx(data);
  const sections = buildDirectorSections(data, ctx);

  if (paginated) {
    return (
      <PaginatedCV
        sections={sections}
        PageShell={(props) => (
          <DirectorPage ctx={ctx} data={data} paginated {...props} />
        )}
        contentWidth={420}
        pageHeight={950}
      />
    );
  }

  return (
    <DirectorPage
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
    </DirectorPage>
  );
}
