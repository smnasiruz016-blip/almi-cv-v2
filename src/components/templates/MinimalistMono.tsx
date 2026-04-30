"use client";

import { Fragment, type CSSProperties, type ReactNode } from "react";
import type { CVData } from "@/lib/cv-types";
import { resolveStyle } from "@/lib/cv-themes";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";
import { PaginatedCV, type PaginatedSection } from "./PaginatedCV";

type MinimalistMonoCtx = {
  theme: ReturnType<typeof resolveStyle>["theme"];
  headingFont: ReturnType<typeof resolveStyle>["headingFont"];
  bodyFont: ReturnType<typeof resolveStyle>["bodyFont"];
  density: ReturnType<typeof resolveStyle>["density"];
  densityClass: string;
  articleStyle: CSSProperties;
  headingFontFamily: string;
};

function computeCtx(data: CVData): MinimalistMonoCtx {
  const { theme, headingFont, bodyFont, density } = resolveStyle(data?.style);
  const densityClass =
    density === "compact" ? "compact" : density === "spacious" ? "spacious" : "";
  const articleStyle: CSSProperties = {
    fontFamily: `${bodyFont.cssVar}, ${bodyFont.fallback}`,
  };
  return {
    theme,
    headingFont,
    bodyFont,
    density,
    densityClass,
    articleStyle,
    headingFontFamily: `${headingFont.cssVar}, ${headingFont.fallback}`,
  };
}

function SectionTitle({
  children,
  ctx,
}: {
  children: ReactNode;
  ctx: MinimalistMonoCtx;
}) {
  return (
    <h2
      className="mb-6 text-xs uppercase tracking-[0.3em] text-gray-900"
      style={{ fontFamily: ctx.headingFontFamily, fontWeight: 600 }}
    >
      {children}
    </h2>
  );
}

function ContactPair({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </span>
      <span className="text-xs text-gray-800">{value}</span>
    </span>
  );
}

function MinimalistMonoHeader({
  ctx,
  data,
}: {
  ctx: MinimalistMonoCtx;
  data: CVData;
}) {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const displayName = basics.fullName?.trim() ? basics.fullName : "Untitled";

  return (
    <header className="px-16 pb-10 pt-16">
      <h1
        className="text-gray-900"
        style={{
          fontFamily: ctx.headingFontFamily,
          fontSize: "44px",
          fontWeight: 500,
          letterSpacing: "-0.01em",
          lineHeight: 1,
        }}
      >
        {displayName}
      </h1>
      {basics.role && (
        <p
          className="mt-3 text-sm font-normal uppercase tracking-[0.3em] text-gray-600"
        >
          {basics.role}
        </p>
      )}
      <div className="mt-8 h-px w-full bg-gray-300" />
      <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
        {basics.email && <ContactPair label="EMAIL" value={basics.email} />}
        {basics.phone && <ContactPair label="PHONE" value={basics.phone} />}
        {basics.location && (
          <ContactPair label="LOCATION" value={basics.location} />
        )}
        {basics.website && <ContactPair label="WEB" value={basics.website} />}
        {basics.linkedIn && (
          <ContactPair label="LINKEDIN" value={basics.linkedIn} />
        )}
      </div>
    </header>
  );
}

function MinimalistMonoPage({
  ctx,
  data,
  isFirstPage,
  paginated,
  children,
}: {
  ctx: MinimalistMonoCtx;
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
      {isFirstPage && <MinimalistMonoHeader ctx={ctx} data={data} />}
      <div className={isFirstPage ? "px-16 pb-16" : "px-16 pb-16 pt-16"}>
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

function buildMinimalistMonoSections(
  data: CVData,
  ctx: MinimalistMonoCtx,
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
      key: "profile",
      node: (
        <section>
          <SectionTitle ctx={ctx}>PROFILE</SectionTitle>
          <RichTextRender
            html={basics.summary ?? ""}
            as="p"
            className="text-sm leading-loose text-gray-800"
          />
        </section>
      ),
    });
  }

  if (experience.length > 0) {
    out.push({
      key: "experience",
      node: (
        <section className="mt-12">
          <SectionTitle ctx={ctx}>EXPERIENCE</SectionTitle>
          <div className="space-y-7">
            {experience.map((job, i) => (
              <div key={`${job.company}-${job.startDate}-${i}`}>
                <div className="flex items-baseline justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {job.role || job.company}
                    </p>
                    <p className="text-xs text-gray-700">
                      <span className="font-medium">
                        {job.role ? job.company : ""}
                      </span>
                      {job.location && (
                        <>
                          <span className="text-gray-500"> · </span>
                          <span className="italic text-gray-500">
                            {job.location}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                  <p className="shrink-0 text-right text-xs text-gray-500">
                    {job.startDate} — {job.endDate ?? "Present"}
                  </p>
                </div>
                {job.bullets &&
                  job.bullets.some((b) => !isRichTextEmpty(b)) && (
                    <ul className="ml-0 mt-2 space-y-1.5">
                      {job.bullets
                        .filter((b) => !isRichTextEmpty(b))
                        .map((bullet, bi) => (
                          <li key={bi} className="flex gap-2 text-xs leading-relaxed text-gray-800">
                            <span aria-hidden className="text-gray-400">
                              —
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
      key: "education",
      node: (
        <section className="mt-12">
          <SectionTitle ctx={ctx}>EDUCATION</SectionTitle>
          <div className="space-y-4">
            {education.map((entry, i) => (
              <div
                key={`${entry.school}-${entry.startDate}-${i}`}
                className="flex items-baseline justify-between gap-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {entry.degree}
                  </p>
                  <p className="text-xs text-gray-700">
                    <span className="font-medium">{entry.school}</span>
                    {entry.location && (
                      <>
                        <span className="text-gray-500"> · </span>
                        <span className="italic text-gray-500">
                          {entry.location}
                        </span>
                      </>
                    )}
                  </p>
                </div>
                <p className="shrink-0 text-right text-xs text-gray-500">
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
      key: "expertise",
      node: (
        <section className="mt-12">
          <SectionTitle ctx={ctx}>EXPERTISE</SectionTitle>
          <p className="text-sm leading-relaxed text-gray-800">
            {skills.join(" · ")}
          </p>
        </section>
      ),
    });
  }

  if (languages.length > 0) {
    out.push({
      key: "languages",
      node: (
        <section className="mt-12">
          <SectionTitle ctx={ctx}>LANGUAGES</SectionTitle>
          <p className="text-sm leading-relaxed text-gray-800">
            {languages
              .map((l) => `${l.name} (${l.level.toLowerCase()})`)
              .join(" · ")}
          </p>
        </section>
      ),
    });
  }

  if (awards.length > 0) {
    out.push({
      key: "recognition",
      node: (
        <section className="mt-12">
          <SectionTitle ctx={ctx}>RECOGNITION</SectionTitle>
          <ul>
            {awards.map((award, i) => (
              <li
                key={i}
                className="mb-2 flex items-baseline justify-between gap-4"
              >
                <span className="text-sm font-medium text-gray-900">
                  {award.title}
                </span>
                {award.year && (
                  <span className="shrink-0 text-xs text-gray-500">
                    {award.year}
                  </span>
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

export function MinimalistMono({
  data,
  paginated = false,
}: {
  data: CVData;
  paginated?: boolean;
}) {
  const ctx = computeCtx(data);
  const sections = buildMinimalistMonoSections(data, ctx);

  if (paginated) {
    return (
      <PaginatedCV
        sections={sections}
        PageShell={(props) => (
          <MinimalistMonoPage ctx={ctx} data={data} paginated {...props} />
        )}
        contentWidth={666}
        pageHeight={950}
      />
    );
  }

  return (
    <MinimalistMonoPage
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
    </MinimalistMonoPage>
  );
}
