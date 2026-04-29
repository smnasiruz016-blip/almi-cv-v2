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
import { PaginatedCV, type PaginatedSection } from "./PaginatedCV";

type ModernMonoCtx = {
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
  sidebarDividerStyle: CSSProperties;
  contentDividerStyle: CSSProperties;
  iconStyle: CSSProperties;
  showPhoto: boolean;
  photoRadiusClass: string;
};

function computeCtx(data: CVData): ModernMonoCtx {
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
  const sidebarDividerStyle: CSSProperties = {
    borderColor: withAlpha(theme.accent, 0.5),
  };
  const contentDividerStyle: CSSProperties = {
    borderColor: withAlpha(theme.text, 0.15),
  };
  const iconStyle: CSSProperties = { color: theme.textSoft };
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
    headingStyle,
    sidebarDividerStyle,
    contentDividerStyle,
    iconStyle,
    showPhoto,
    photoRadiusClass,
  };
}

function renderSidebarTitle(title: string, ctx: ModernMonoCtx) {
  return (
    <h2
      className="mb-2.5 text-[10px] tracking-[0.25em]"
      style={{
        ...ctx.headingStyle,
        ...sectionVariantStyle(ctx.sectionStyle, ctx.theme),
      }}
    >
      {formatSectionTitle(title, ctx.sectionStyle)}
    </h2>
  );
}

function renderContentTitle(title: string, ctx: ModernMonoCtx) {
  return (
    <h2
      className="mb-3 text-[10px] tracking-[0.25em]"
      style={{
        ...ctx.headingStyle,
        ...sectionVariantStyle(ctx.sectionStyle, ctx.theme),
      }}
    >
      {formatSectionTitle(title, ctx.sectionStyle)}
    </h2>
  );
}

function ModernMonoSidebar({ ctx, data }: { ctx: ModernMonoCtx; data: CVData }) {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const skills = data?.skills ?? [];
  const languages = data?.languages ?? [];
  const displayName = basics.fullName || "Untitled";
  const hasContact = Boolean(
    basics.email || basics.phone || basics.location || basics.website || basics.linkedIn,
  );

  return (
    <aside
      className="flex w-[35%] flex-col gap-5 overflow-hidden p-7"
      style={{ backgroundColor: ctx.theme.primarySoft }}
    >
      {ctx.showPhoto && (
        basics.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={basics.photoUrl}
            alt={displayName}
            className={`mx-auto h-28 w-28 border-4 border-white object-cover shadow-sm ${ctx.photoRadiusClass}`}
          />
        ) : (
          <div
            className={`mx-auto flex h-28 w-28 items-center justify-center border-4 border-white bg-white/70 text-3xl font-medium shadow-sm ${ctx.photoRadiusClass}`}
            style={ctx.headingStyle}
          >
            {displayName.charAt(0).toUpperCase()}
          </div>
        )
      )}

      <div>
        <h1
          className="mt-1 text-center text-xl font-medium leading-tight"
          style={ctx.headingStyle}
        >
          {displayName}
        </h1>
        {basics.role && (
          <p
            className="text-center text-sm italic"
            style={{ color: ctx.theme.textSoft }}
          >
            {basics.role}
          </p>
        )}
      </div>

      {hasContact && (
        <>
          <hr style={ctx.sidebarDividerStyle} />
          <div>
            {renderSidebarTitle("CONTACT", ctx)}
            <ul className="space-y-1.5">
              {basics.email && (
                <li
                  className="flex items-start gap-2 text-[11px] leading-tight"
                  style={{ color: ctx.theme.text }}
                >
                  <Mail className="mt-0.5 h-3 w-3 shrink-0" style={ctx.iconStyle} />
                  <span className="break-all">{basics.email}</span>
                </li>
              )}
              {basics.phone && (
                <li
                  className="flex items-start gap-2 text-[11px] leading-tight"
                  style={{ color: ctx.theme.text }}
                >
                  <Phone className="mt-0.5 h-3 w-3 shrink-0" style={ctx.iconStyle} />
                  <span>{basics.phone}</span>
                </li>
              )}
              {basics.location && (
                <li
                  className="flex items-start gap-2 text-[11px] leading-tight"
                  style={{ color: ctx.theme.text }}
                >
                  <MapPin className="mt-0.5 h-3 w-3 shrink-0" style={ctx.iconStyle} />
                  <span>{basics.location}</span>
                </li>
              )}
              {basics.website && (
                <li
                  className="flex items-start gap-2 text-[11px] leading-tight"
                  style={{ color: ctx.theme.text }}
                >
                  <Globe className="mt-0.5 h-3 w-3 shrink-0" style={ctx.iconStyle} />
                  <span className="break-all">{basics.website}</span>
                </li>
              )}
              {basics.linkedIn && (
                <li
                  className="flex items-start gap-2 text-[11px] leading-tight"
                  style={{ color: ctx.theme.text }}
                >
                  <Link2 className="mt-0.5 h-3 w-3 shrink-0" style={ctx.iconStyle} />
                  <span className="break-all">{basics.linkedIn}</span>
                </li>
              )}
            </ul>
          </div>
        </>
      )}

      {skills.length > 0 && (
        <>
          <hr style={ctx.sidebarDividerStyle} />
          <div>
            {renderSidebarTitle("SKILLS", ctx)}
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, i) => (
                <span
                  key={`${skill}-${i}`}
                  className="rounded-pill border bg-white/80 px-2 py-0.5 text-[10px]"
                  style={{
                    borderColor: withAlpha(ctx.theme.text, 0.25),
                    color: ctx.theme.text,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </>
      )}

      {languages.length > 0 && (
        <>
          <hr style={ctx.sidebarDividerStyle} />
          <div>
            {renderSidebarTitle("LANGUAGES", ctx)}
            <ul className="space-y-1">
              {languages.map((lang, i) => (
                <li
                  key={`${lang.name}-${i}`}
                  className="text-[11px]"
                  style={{ color: ctx.theme.text }}
                >
                  {lang.name}{" "}
                  <span style={{ color: ctx.theme.textSoft }}>· {lang.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </aside>
  );
}

function ModernMonoPage({
  ctx,
  data,
  paginated,
  children,
}: {
  ctx: ModernMonoCtx;
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
      className={`cv-page flex ${paginated ? "" : "mx-auto aspect-[210/297] max-w-[800px]"} w-full overflow-hidden rounded-lg bg-white shadow-warm-card-hover ${ctx.densityClass}`.trim()}
      style={
        paginated
          ? { ...ctx.articleStyle, width: 794, minHeight: 1123 }
          : ctx.articleStyle
      }
    >
      <ModernMonoSidebar ctx={ctx} data={data} />
      <div className="flex-1 overflow-hidden p-9">
        {childArr.map((child, idx) => (
          <Fragment key={idx}>
            {idx > 0 && <hr className="my-5" style={ctx.contentDividerStyle} />}
            {child}
          </Fragment>
        ))}
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

function buildModernMonoRightSections(
  data: CVData,
  ctx: ModernMonoCtx,
): PaginatedSection[] {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const experience = data?.experience ?? [];
  const education = data?.education ?? [];
  const projects = data?.projects ?? [];
  const awards = data?.awards ?? [];
  const certifications = data?.certifications ?? [];
  const interests = data?.interests ?? [];

  const out: PaginatedSection[] = [];

  if (basics.summary) {
    out.push({
      key: "profile",
      node: (
        <section>
          {renderContentTitle("PROFILE", ctx)}
          <p
            className="text-sm leading-relaxed"
            style={{ color: ctx.theme.textSoft }}
          >
            {basics.summary}
          </p>
        </section>
      ),
    });
  }

  if (experience.length > 0) {
    out.push({
      key: "experience",
      node: (
        <section>
          {renderContentTitle("EXPERIENCE", ctx)}
          <div className="space-y-4">
            {experience.map((job, idx) => (
              <div key={idx}>
                <div className="flex items-baseline justify-between gap-3">
                  <h3
                    className="text-sm font-medium"
                    style={{ color: ctx.theme.text }}
                  >
                    {job.company}{" "}
                    <span className="font-normal" style={{ color: ctx.theme.textSoft }}>
                      — {job.role}
                    </span>
                  </h3>
                  <span
                    className="whitespace-nowrap text-xs"
                    style={{ color: ctx.theme.textSoft }}
                  >
                    {job.startDate}{" "}
                    {job.endDate ? `— ${job.endDate}` : "— Present"}
                  </span>
                </div>
                {job.location && (
                  <p
                    className="mt-0.5 text-xs italic"
                    style={{ color: ctx.theme.textSoft }}
                  >
                    {job.location}
                  </p>
                )}
                {job.bullets && job.bullets.length > 0 && (
                  <ul className="mt-1.5 space-y-1">
                    {job.bullets.map((bullet, bi) => (
                      <li
                        key={bi}
                        className="flex gap-2 text-xs leading-relaxed"
                      >
                        <span style={{ color: ctx.theme.accent }}>•</span>
                        <span style={{ color: ctx.theme.textSoft }}>{bullet}</span>
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
          {renderContentTitle("EDUCATION", ctx)}
          <div className="space-y-3">
            {education.map((edu, idx) => (
              <div key={idx}>
                <div className="flex items-baseline justify-between gap-3">
                  <h3
                    className="text-sm font-medium"
                    style={{ color: ctx.theme.text }}
                  >
                    {edu.school}{" "}
                    <span className="font-normal" style={{ color: ctx.theme.textSoft }}>
                      — {edu.degree}
                    </span>
                  </h3>
                  <span
                    className="whitespace-nowrap text-xs"
                    style={{ color: ctx.theme.textSoft }}
                  >
                    {edu.startDate} — {edu.endDate}
                  </span>
                </div>
                {edu.location && (
                  <p
                    className="mt-0.5 text-xs italic"
                    style={{ color: ctx.theme.textSoft }}
                  >
                    {edu.location}
                  </p>
                )}
                {edu.notes && (
                  <p
                    className="mt-1 text-xs leading-relaxed"
                    style={{ color: ctx.theme.textSoft }}
                  >
                    {edu.notes}
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
        <section>
          {renderContentTitle("PROJECTS", ctx)}
          <div className="space-y-2">
            {projects.map((p, idx) => (
              <div key={idx}>
                <h3
                  className="text-sm font-medium"
                  style={{ color: ctx.theme.text }}
                >
                  {p.name}
                </h3>
                {p.description && (
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: ctx.theme.textSoft }}
                  >
                    {p.description}
                  </p>
                )}
                {p.url && (
                  <p
                    className="mt-0.5 text-[10px]"
                    style={{ color: ctx.theme.accent }}
                  >
                    {p.url}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      ),
    });
  }

  if (awards.length > 0) {
    out.push({
      key: "awards",
      node: (
        <section>
          {renderContentTitle("AWARDS", ctx)}
          <ul className="space-y-1">
            {awards.map((a, idx) => (
              <li key={idx} className="text-xs" style={{ color: ctx.theme.textSoft }}>
                <span className="font-medium" style={{ color: ctx.theme.text }}>
                  {a.title}
                </span>
                {a.issuer && ` · ${a.issuer}`}
                {a.year && ` · ${a.year}`}
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
          {renderContentTitle("CERTIFICATIONS", ctx)}
          <ul className="space-y-1">
            {certifications.map((c, idx) => (
              <li key={idx} className="text-xs" style={{ color: ctx.theme.textSoft }}>
                <span className="font-medium" style={{ color: ctx.theme.text }}>
                  {c.name}
                </span>
                {c.issuer && ` · ${c.issuer}`}
                {c.year && ` · ${c.year}`}
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
          {renderContentTitle("INTERESTS", ctx)}
          <p
            className="text-xs leading-relaxed"
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

export function ModernMono({
  data,
  paginated = false,
}: {
  data: CVData;
  paginated?: boolean;
}) {
  const ctx = computeCtx(data);
  const sections = buildModernMonoRightSections(data, ctx);

  if (paginated) {
    return (
      <PaginatedCV
        sections={sections}
        PageShell={(props) => (
          <ModernMonoPage ctx={ctx} data={data} paginated {...props} />
        )}
        contentWidth={444}
        pageHeight={1051}
      />
    );
  }

  return (
    <ModernMonoPage
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
    </ModernMonoPage>
  );
}
