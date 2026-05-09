"use client";

import { Fragment, type CSSProperties, type ReactNode } from "react";
import { Globe, Link2, Mail, MapPin, Phone } from "lucide-react";
import type { CVData } from "@/lib/cv-types";
import {
  formatSectionTitle,
  resolveStyle,
  sectionLabel,
} from "@/lib/cv-themes";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";
import { PaginatedCV, type PaginatedSection } from "./PaginatedCV";

const PAGE_BG = "#F5EFE0";
const ACCENT_GREEN = "#7FA088";
const PHOTO_TINT = "#4FA8A8";
const SECTION_LABEL_COLOR = "#9C8E80";

type Ctx = {
  theme: ReturnType<typeof resolveStyle>["theme"];
  headingFont: ReturnType<typeof resolveStyle>["headingFont"];
  bodyFont: ReturnType<typeof resolveStyle>["bodyFont"];
  density: ReturnType<typeof resolveStyle>["density"];
  photoStyle: ReturnType<typeof resolveStyle>["photoStyle"];
  densityClass: string;
  showPhoto: boolean;
  articleStyle: CSSProperties;
};

function computeCtx(data: CVData): Ctx {
  const r = resolveStyle(data?.style);
  const densityClass =
    r.density === "compact" ? "compact" : r.density === "spacious" ? "spacious" : "";
  const articleStyle: CSSProperties = {
    fontFamily: `${r.bodyFont.cssVar}, ${r.bodyFont.fallback}`,
    color: r.theme.text,
    backgroundColor: PAGE_BG,
  };
  return {
    theme: r.theme,
    headingFont: r.headingFont,
    bodyFont: r.bodyFont,
    density: r.density,
    photoStyle: r.photoStyle,
    densityClass,
    showPhoto: r.photoStyle !== "none",
    articleStyle,
  };
}

function SectionTitle({ title, ctx }: { title: string; ctx: Ctx }) {
  return (
    <h2
      className="mb-3 text-[11px] font-semibold tracking-[0.18em]"
      style={{
        color: SECTION_LABEL_COLOR,
        fontFamily: `${ctx.bodyFont.cssVar}, ${ctx.bodyFont.fallback}`,
      }}
    >
      {formatSectionTitle(title, "uppercase")}
    </h2>
  );
}

function Header({ ctx, data }: { ctx: Ctx; data: CVData }) {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const displayName = basics.fullName?.trim() ? basics.fullName : "Untitled";
  const photoVisible = ctx.showPhoto && basics.photoUrl;

  return (
    <header className="px-12 pt-10">
      <div
        className={`grid gap-8 ${photoVisible ? "grid-cols-[37%_63%]" : "grid-cols-1"}`}
      >
        {photoVisible && (
          <div className="relative" style={{ aspectRatio: "1 / 1.18" }}>
            <div
              className="absolute"
              style={{
                top: -10,
                bottom: -22,
                left: -22,
                right: 18,
                backgroundColor: ACCENT_GREEN,
              }}
            />
            <div className="relative h-full w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={basics.photoUrl}
                alt={displayName}
                className="h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: PHOTO_TINT,
                  mixBlendMode: "multiply",
                  opacity: 0.5,
                }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col justify-center">
          <h1
            className="font-bold leading-[0.95]"
            style={{
              fontFamily: `${ctx.headingFont.cssVar}, ${ctx.headingFont.fallback}`,
              color: ctx.theme.text,
              fontSize: "60px",
              letterSpacing: "-0.01em",
            }}
          >
            {displayName}
          </h1>
          {basics.role && (
            <p
              className="mt-3 text-base italic"
              style={{
                color: ctx.theme.textSoft,
                fontFamily: `${ctx.headingFont.cssVar}, ${ctx.headingFont.fallback}`,
              }}
            >
              {basics.role}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}

function ContactBar({ ctx, data }: { ctx: Ctx; data: CVData }) {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const hasAny =
    basics.location || basics.phone || basics.email || basics.website || basics.linkedIn;
  if (!hasAny) return null;

  const ruleStyle: CSSProperties = { borderColor: ctx.theme.text };
  const dividerStyle: CSSProperties = { borderColor: `${ctx.theme.text}26` };

  return (
    <div
      className="mx-12 mt-8 border-y py-3 text-[11px]"
      style={{ ...ruleStyle, color: ctx.theme.textSoft }}
    >
      <div className="grid grid-cols-3 items-center gap-x-6 leading-tight">
        <div className="flex items-center gap-2">
          {basics.location && (
            <>
              <MapPin
                className="h-3 w-3 shrink-0"
                style={{ color: ctx.theme.textFaint }}
              />
              <span>{basics.location}</span>
            </>
          )}
        </div>
        <div
          className="flex items-center gap-2 border-l border-r px-6"
          style={dividerStyle}
        >
          {basics.phone && (
            <>
              <Phone
                className="h-3 w-3 shrink-0"
                style={{ color: ctx.theme.textFaint }}
              />
              <span>{basics.phone}</span>
            </>
          )}
        </div>
        <div className="flex flex-col gap-1">
          {basics.email && (
            <span className="inline-flex items-center gap-2">
              <Mail
                className="h-3 w-3 shrink-0"
                style={{ color: ctx.theme.textFaint }}
              />
              {basics.email}
            </span>
          )}
          {basics.website && (
            <span className="inline-flex items-center gap-2">
              <Globe
                className="h-3 w-3 shrink-0"
                style={{ color: ctx.theme.textFaint }}
              />
              {basics.website}
            </span>
          )}
          {basics.linkedIn && (
            <span className="inline-flex items-center gap-2">
              <Link2
                className="h-3 w-3 shrink-0"
                style={{ color: ctx.theme.textFaint }}
              />
              {basics.linkedIn}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function FooterStrip({ ctx, data }: { ctx: Ctx; data: CVData }) {
  const skills = data?.skills ?? [];
  if (skills.length === 0) return null;

  return (
    <div
      className="px-12 py-5"
      style={{
        backgroundColor: ctx.theme.text,
        color: ctx.theme.primaryText,
      }}
    >
      <div className="grid grid-cols-[210px_1fr] items-start gap-6">
        <h3
          className="text-[12px] font-semibold tracking-[0.2em]"
          style={{
            fontFamily: `${ctx.bodyFont.cssVar}, ${ctx.bodyFont.fallback}`,
          }}
        >
          {formatSectionTitle(
            sectionLabel(data, "skills", "SPECIALIZED SKILLS"),
            "uppercase",
          )}
        </h3>
        <p className="text-[12px] leading-relaxed">{skills.join(", ")}</p>
      </div>
    </div>
  );
}

function Page({
  ctx,
  data,
  isFirstPage,
  pageIndex,
  pageCount,
  paginated,
  leftChildren,
  rightChildren,
}: {
  ctx: Ctx;
  data: CVData;
  isFirstPage: boolean;
  pageIndex: number;
  pageCount: number;
  paginated: boolean;
  leftChildren?: ReactNode;
  rightChildren?: ReactNode;
}) {
  const isLastPage = pageIndex === pageCount - 1;

  const articleEl = (
    <article
      className={`cv-page ${paginated ? "" : "mx-auto aspect-[210/297] max-w-[800px]"} relative flex w-full flex-col overflow-hidden rounded-lg shadow-warm-card-hover ${ctx.densityClass}`.trim()}
      style={
        paginated
          ? { ...ctx.articleStyle, width: 794, minHeight: 1123 }
          : ctx.articleStyle
      }
    >
      {isFirstPage && <Header ctx={ctx} data={data} />}
      {isFirstPage && <ContactBar ctx={ctx} data={data} />}
      <div className="grid flex-1 grid-cols-[38%_62%] px-12 py-8">
        <div
          className="space-y-6 pr-8"
          style={{ borderRight: `1px solid ${ctx.theme.text}` }}
        >
          {leftChildren}
        </div>
        <div className="space-y-6 pl-8">{rightChildren}</div>
      </div>
      {isLastPage && <FooterStrip ctx={ctx} data={data} />}
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

function buildSections(data: CVData, ctx: Ctx): PaginatedSection[] {
  const summary = data?.basics?.summary;
  const experience = data?.experience ?? [];
  const education = data?.education ?? [];
  const projects = data?.projects ?? [];
  const languages = data?.languages ?? [];
  const awards = data?.awards ?? [];
  const certifications = data?.certifications ?? [];
  const interests = data?.interests ?? [];
  const out: PaginatedSection[] = [];

  if (!isRichTextEmpty(summary)) {
    out.push({
      key: "profile",
      column: "left",
      node: (
        <section>
          <SectionTitle
            title={sectionLabel(data, "profile", "PROFESSIONAL SUMMARY")}
            ctx={ctx}
          />
          <RichTextRender
            html={summary ?? ""}
            as="p"
            className="text-[12.5px] leading-relaxed"
            style={{ color: ctx.theme.textSoft }}
          />
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
          <SectionTitle
            title={sectionLabel(data, "education", "EDUCATION")}
            ctx={ctx}
          />
          <div className="space-y-4">
            {education.map((entry, i) => (
              <div key={`${entry.school}-${entry.startDate}-${i}`}>
                <p
                  className="text-[13px] font-semibold leading-snug"
                  style={{ color: ctx.theme.text }}
                >
                  {entry.degree || entry.school}
                </p>
                <p
                  className="text-[12px]"
                  style={{ color: ctx.theme.textSoft }}
                >
                  {entry.degree ? entry.school : ""}
                  {entry.location ? ` · ${entry.location}` : ""}
                </p>
                <p
                  className="text-[11px] italic"
                  style={{ color: ctx.theme.textFaint }}
                >
                  {entry.startDate}
                  {entry.endDate ? ` – ${entry.endDate}` : ""}
                </p>
                {entry.notes && (
                  <p
                    className="mt-1 text-[12px] leading-relaxed"
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

  if (languages.length > 0) {
    out.push({
      key: "languages",
      column: "left",
      node: (
        <section>
          <SectionTitle
            title={sectionLabel(data, "languages", "LANGUAGES")}
            ctx={ctx}
          />
          <ul
            className="space-y-1 text-[12px]"
            style={{ color: ctx.theme.textSoft }}
          >
            {languages.map((lang, i) => (
              <li key={i} className="flex justify-between gap-2">
                <span style={{ color: ctx.theme.text }}>{lang.name}</span>
                <span
                  className="italic"
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
      column: "left",
      node: (
        <section>
          <SectionTitle
            title={sectionLabel(data, "awards", "AWARDS")}
            ctx={ctx}
          />
          <ul
            className="space-y-2 text-[12px] leading-relaxed"
            style={{ color: ctx.theme.textSoft }}
          >
            {awards.map((a, i) => (
              <li key={i}>
                <p className="font-medium" style={{ color: ctx.theme.text }}>
                  {a.title}
                </p>
                <p
                  className="text-[11px] italic"
                  style={{ color: ctx.theme.textFaint }}
                >
                  {a.issuer}
                  {a.year ? ` · ${a.year}` : ""}
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
      column: "left",
      node: (
        <section>
          <SectionTitle
            title={sectionLabel(data, "certifications", "CERTIFICATIONS")}
            ctx={ctx}
          />
          <ul
            className="space-y-2 text-[12px] leading-relaxed"
            style={{ color: ctx.theme.textSoft }}
          >
            {certifications.map((c, i) => (
              <li key={i}>
                <p className="font-medium" style={{ color: ctx.theme.text }}>
                  {c.name}
                </p>
                <p
                  className="text-[11px] italic"
                  style={{ color: ctx.theme.textFaint }}
                >
                  {c.issuer}
                  {c.year ? ` · ${c.year}` : ""}
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
      column: "left",
      node: (
        <section>
          <SectionTitle
            title={sectionLabel(data, "interests", "INTERESTS")}
            ctx={ctx}
          />
          <p
            className="text-[12px] leading-relaxed"
            style={{ color: ctx.theme.textSoft }}
          >
            {interests.join(" · ")}
          </p>
        </section>
      ),
    });
  }

  if (experience.length > 0) {
    out.push({
      key: "experience",
      column: "right",
      node: (
        <section>
          <SectionTitle
            title={sectionLabel(data, "experience", "CLINICAL EXPERIENCE")}
            ctx={ctx}
          />
          <div className="space-y-5">
            {experience.map((job, i) => (
              <div key={`${job.company}-${job.startDate}-${i}`}>
                <p
                  className="text-[14px] font-semibold leading-snug"
                  style={{ color: ctx.theme.text }}
                >
                  {job.role || job.company}
                </p>
                <p
                  className="text-[12.5px] font-medium"
                  style={{ color: ctx.theme.textSoft }}
                >
                  {job.role ? job.company : ""}
                  {job.location ? ` · ${job.location}` : ""}
                </p>
                <p
                  className="mb-1.5 text-[11px] italic"
                  style={{ color: ctx.theme.textFaint }}
                >
                  {job.startDate} – {job.endDate ?? "Present"}
                </p>
                {job.bullets && job.bullets.some((b) => !isRichTextEmpty(b)) && (
                  <div
                    className="space-y-1 text-[12px] leading-relaxed"
                    style={{ color: ctx.theme.textSoft }}
                  >
                    {job.bullets
                      .filter((b) => !isRichTextEmpty(b))
                      .map((b, bi) => (
                        <RichTextRender key={bi} html={b} as="p" />
                      ))}
                  </div>
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
      column: "right",
      node: (
        <section>
          <SectionTitle
            title={sectionLabel(data, "projects", "PROJECTS")}
            ctx={ctx}
          />
          <div className="space-y-3">
            {projects.map((p, i) => (
              <div key={`${p.name}-${i}`}>
                <p
                  className="text-[13px] font-semibold"
                  style={{ color: ctx.theme.text }}
                >
                  {p.name}
                </p>
                {p.description && (
                  <p
                    className="text-[12px] leading-relaxed"
                    style={{ color: ctx.theme.textSoft }}
                  >
                    {p.description}
                  </p>
                )}
                {p.url && (
                  <a
                    href={`https://${p.url}`}
                    className="text-[11px] underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: ctx.theme.textFaint }}
                  >
                    {p.url}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      ),
    });
  }

  return out;
}

export function HealthcareBoldICU({
  data,
  paginated = false,
}: {
  data: CVData;
  paginated?: boolean;
}) {
  const ctx = computeCtx(data);
  const sections = buildSections(data, ctx);

  if (paginated) {
    return (
      <PaginatedCV
        sections={sections}
        PageShell={(props) => (
          <Page ctx={ctx} data={data} paginated {...props} />
        )}
        contentWidth={698}
        pageHeight={780}
        leftWidth={262}
        rightWidth={420}
      />
    );
  }

  const leftSections = sections.filter((s) => s.column !== "right");
  const rightSections = sections.filter((s) => s.column === "right");

  return (
    <Page
      ctx={ctx}
      data={data}
      isFirstPage
      pageIndex={0}
      pageCount={1}
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
