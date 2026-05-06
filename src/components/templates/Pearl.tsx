"use client";

import { Fragment, type CSSProperties, type ReactNode } from "react";
import { Globe, Link2, Mail, MapPin, Phone } from "lucide-react";
import type { CVData } from "@/lib/cv-types";
import { resolveStyle, withAlpha } from "@/lib/cv-themes";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";
import { PaginatedCV, type PaginatedSection } from "./PaginatedCV";

const CORAL = "#FF7A6B";
const CREAM = "#FFFBF5";
const CREAM_SOFT = "#FFF5E8";
const PEACH = "#FFE8D6";
const PLUM = "#2D1B3D";
const PLUM_SOFT = "#6B5B7A";
const PLUM_FAINT = "#C9C0D1";

type PearlCtx = {
  theme: ReturnType<typeof resolveStyle>["theme"];
  headingFont: ReturnType<typeof resolveStyle>["headingFont"];
  bodyFont: ReturnType<typeof resolveStyle>["bodyFont"];
  density: ReturnType<typeof resolveStyle>["density"];
  photoStyle: ReturnType<typeof resolveStyle>["photoStyle"];
  densityClass: string;
  articleStyle: CSSProperties;
  accent: string;
  showPhoto: boolean;
};

function computeCtx(data: CVData): PearlCtx {
  const { theme, headingFont, bodyFont, density, photoStyle } = resolveStyle(
    data?.style,
  );
  const densityClass =
    density === "compact"
      ? "compact"
      : density === "spacious"
        ? "spacious"
        : "";
  const accent = theme.accent || CORAL;
  return {
    theme,
    headingFont,
    bodyFont,
    density,
    photoStyle,
    densityClass,
    articleStyle: {
      fontFamily: `${bodyFont.cssVar}, ${bodyFont.fallback}`,
      color: theme.text,
    },
    accent,
    showPhoto: photoStyle !== "none",
  };
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function SectionLabel({
  children,
  variant,
  headingFont,
}: {
  children: ReactNode;
  variant: "sidebar" | "main";
  headingFont: PearlCtx["headingFont"];
}) {
  return (
    <div
      className="mb-4 inline-block rounded-full px-4 py-1.5"
      style={{
        backgroundColor: variant === "sidebar" ? "#FFFFFF" : PEACH,
        color: PLUM,
        fontFamily: `${headingFont.cssVar}, ${headingFont.fallback}`,
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}

type ContactItem = { key: string; Icon: typeof Mail; label: string };

function buildContactItems(basics: CVData["basics"]): ContactItem[] {
  const items: ContactItem[] = [];
  if (basics.email)
    items.push({ key: "email", Icon: Mail, label: basics.email });
  if (basics.phone)
    items.push({ key: "phone", Icon: Phone, label: basics.phone });
  if (basics.location)
    items.push({ key: "location", Icon: MapPin, label: basics.location });
  if (basics.linkedIn)
    items.push({ key: "linkedin", Icon: Link2, label: basics.linkedIn });
  if (basics.website)
    items.push({ key: "website", Icon: Globe, label: basics.website });
  return items;
}

function PearlSidebar({ ctx, data }: { ctx: PearlCtx; data: CVData }) {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const skills = data?.skills ?? [];
  const displayName = basics.fullName?.trim() ? basics.fullName : "Untitled";
  const { headingFont, accent, showPhoto } = ctx;
  const contactItems = buildContactItems(basics);

  return (
    <aside
      className="px-7 py-8"
      style={{ backgroundColor: PEACH }}
    >
      {showPhoto && (
        <div className="mb-6 flex justify-center">
          {basics.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={basics.photoUrl}
              alt={displayName}
              className="h-[120px] w-[120px] rounded-full object-cover"
              style={{ border: `4px solid ${accent}` }}
            />
          ) : (
            <div
              className="flex h-[120px] w-[120px] items-center justify-center rounded-full"
              style={{
                backgroundColor: accent,
                color: "#FFFFFF",
                fontFamily: `${headingFont.cssVar}, ${headingFont.fallback}`,
                fontSize: "36px",
                fontWeight: 800,
                letterSpacing: "0.02em",
              }}
            >
              {getInitials(displayName)}
            </div>
          )}
        </div>
      )}

      <h1
        className="mb-2 text-center text-3xl font-black leading-tight"
        style={{
          color: PLUM,
          fontFamily: `${headingFont.cssVar}, ${headingFont.fallback}`,
          letterSpacing: "-0.01em",
        }}
      >
        {displayName}
      </h1>

      {basics.role && (
        <div className="mb-8 flex justify-center">
          <span
            className="rounded-full px-4 py-2 text-[11px] font-medium uppercase"
            style={{
              backgroundColor: accent,
              color: "#FFFFFF",
              letterSpacing: "0.08em",
              fontFamily: `${headingFont.cssVar}, ${headingFont.fallback}`,
            }}
          >
            {basics.role}
          </span>
        </div>
      )}

      {contactItems.length > 0 && (
        <section className="mb-8">
          <SectionLabel variant="sidebar" headingFont={headingFont}>
            Contact
          </SectionLabel>
          <ul className="space-y-2">
            {contactItems.map(({ key, Icon, label }) => (
              <li
                key={key}
                className="flex items-center gap-2 py-1 text-[12px]"
                style={{ color: PLUM_SOFT }}
              >
                <Icon
                  className="shrink-0"
                  size={14}
                  style={{ color: accent }}
                  aria-hidden
                />
                <span className="break-words">{label}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <SectionLabel variant="sidebar" headingFont={headingFont}>
            Skills
          </SectionLabel>
          <ul className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <li
                key={i}
                className="rounded-full px-3 py-1 text-[11px]"
                style={{
                  backgroundColor: CREAM_SOFT,
                  border: `1px solid ${PEACH}`,
                  color: PLUM,
                }}
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>
      )}
    </aside>
  );
}

function buildPearlSections(
  data: CVData,
  ctx: PearlCtx,
): PaginatedSection[] {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const experience = data?.experience ?? [];
  const education = data?.education ?? [];
  const languages = data?.languages ?? [];
  const awards = data?.awards ?? [];
  const certifications = data?.certifications ?? [];
  const { accent, headingFont } = ctx;

  const out: PaginatedSection[] = [];

  if (!isRichTextEmpty(basics.summary)) {
    out.push({
      key: "about",
      node: (
        <section>
          <SectionLabel variant="main" headingFont={headingFont}>
            About Me
          </SectionLabel>
          <div
            className="rounded-2xl p-5"
            style={{
              backgroundColor: "#FFFFFF",
              border: `1px solid ${PEACH}`,
            }}
          >
            <RichTextRender
              html={basics.summary ?? ""}
              as="div"
              className="text-[12px] leading-relaxed"
              style={{ color: PLUM_SOFT }}
            />
          </div>
        </section>
      ),
    });
  }

  if (experience.length > 0) {
    out.push({
      key: "experience",
      node: (
        <section>
          <SectionLabel variant="main" headingFont={headingFont}>
            Experience
          </SectionLabel>
          <ul className="space-y-4">
            {experience.map((job, i) => (
              <li
                key={`${job.company}-${job.startDate}-${i}`}
                className="rounded-2xl p-5"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: `1px solid ${PEACH}`,
                }}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p
                    className="text-[14px] font-bold"
                    style={{
                      color: PLUM,
                      fontFamily: `${headingFont.cssVar}, ${headingFont.fallback}`,
                    }}
                  >
                    {job.role || job.company}
                  </p>
                  <p
                    className="shrink-0 font-mono text-[11px]"
                    style={{ color: PLUM_SOFT }}
                  >
                    {job.startDate}
                    {job.endDate ? ` — ${job.endDate}` : " — Present"}
                  </p>
                </div>
                <p
                  className="mt-0.5 text-[13px] font-medium"
                  style={{ color: accent }}
                >
                  {job.role ? job.company : ""}
                  {job.location && (
                    <span style={{ color: PLUM_FAINT, fontWeight: 400 }}>
                      {job.role ? " · " : ""}
                      {job.location}
                    </span>
                  )}
                </p>
                {job.bullets &&
                  job.bullets.some((b) => !isRichTextEmpty(b)) && (
                    <ul className="mt-2 space-y-1">
                      {job.bullets
                        .filter((b) => !isRichTextEmpty(b))
                        .map((bullet, bi) => (
                          <li
                            key={bi}
                            className="flex gap-2 text-[12px] leading-relaxed"
                            style={{ color: PLUM_SOFT }}
                          >
                            <span
                              aria-hidden
                              className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ backgroundColor: accent }}
                            />
                            <RichTextRender html={bullet} as="span" />
                          </li>
                        ))}
                    </ul>
                  )}
              </li>
            ))}
          </ul>
        </section>
      ),
    });
  }

  // Footer grid: Education + (Languages | Awards | Certifications)
  // Picks the first non-empty optional list to show alongside Education.
  const secondCard: { title: string; node: ReactNode } | null = (() => {
    if (languages.length > 0) {
      return {
        title: "Languages",
        node: (
          <ul className="space-y-1.5">
            {languages.map((lang, i) => (
              <li
                key={i}
                className="flex items-baseline justify-between gap-2 text-[12px]"
              >
                <span style={{ color: PLUM, fontWeight: 600 }}>
                  {lang.name}
                </span>
                <span
                  className="shrink-0 text-[11px]"
                  style={{ color: PLUM_FAINT }}
                >
                  {lang.level}
                </span>
              </li>
            ))}
          </ul>
        ),
      };
    }
    if (awards.length > 0) {
      return {
        title: "Awards",
        node: (
          <ul className="space-y-1.5">
            {awards.map((aw, i) => (
              <li
                key={i}
                className="flex items-baseline justify-between gap-3 text-[12px]"
              >
                <span style={{ color: PLUM }}>
                  <span style={{ fontWeight: 600 }}>{aw.title}</span>
                  {aw.issuer && (
                    <span style={{ color: PLUM_SOFT }}>
                      {" "}
                      · {aw.issuer}
                    </span>
                  )}
                </span>
                <span
                  className="shrink-0 font-mono text-[11px]"
                  style={{ color: PLUM_FAINT }}
                >
                  {aw.year}
                </span>
              </li>
            ))}
          </ul>
        ),
      };
    }
    if (certifications.length > 0) {
      return {
        title: "Certifications",
        node: (
          <ul className="space-y-1.5">
            {certifications.map((cert, i) => (
              <li
                key={i}
                className="flex items-baseline justify-between gap-3 text-[12px]"
              >
                <span style={{ color: PLUM }}>
                  <span style={{ fontWeight: 600 }}>{cert.name}</span>
                  {cert.issuer && (
                    <span style={{ color: PLUM_SOFT }}>
                      {" "}
                      · {cert.issuer}
                    </span>
                  )}
                </span>
                {cert.year && (
                  <span
                    className="shrink-0 font-mono text-[11px]"
                    style={{ color: PLUM_FAINT }}
                  >
                    {cert.year}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ),
      };
    }
    return null;
  })();

  if (education.length > 0 || secondCard) {
    const educationCard = education.length > 0 && (
      <div
        className="rounded-2xl p-5"
        style={{
          backgroundColor: "#FFFFFF",
          border: `1px solid ${PEACH}`,
        }}
      >
        <SectionLabel variant="main" headingFont={headingFont}>
          Education
        </SectionLabel>
        <ul className="space-y-3">
          {education.map((edu, i) => (
            <li key={`${edu.school}-${i}`}>
              <p
                className="text-[13px] font-bold"
                style={{
                  color: PLUM,
                  fontFamily: `${headingFont.cssVar}, ${headingFont.fallback}`,
                }}
              >
                {edu.school}
              </p>
              <p className="text-[12px]" style={{ color: PLUM_SOFT }}>
                {edu.degree}
              </p>
              <p
                className="font-mono text-[11px]"
                style={{ color: PLUM_FAINT }}
              >
                {edu.startDate}
                {edu.endDate ? ` — ${edu.endDate}` : ""}
              </p>
              {edu.notes && (
                <p
                  className="mt-1 text-[11px] italic"
                  style={{ color: PLUM_SOFT }}
                >
                  {edu.notes}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    );

    const secondCardEl = secondCard && (
      <div
        className="rounded-2xl p-5"
        style={{
          backgroundColor: "#FFFFFF",
          border: `1px solid ${PEACH}`,
        }}
      >
        <SectionLabel variant="main" headingFont={headingFont}>
          {secondCard.title}
        </SectionLabel>
        {secondCard.node}
      </div>
    );

    out.push({
      key: "education-secondary",
      node:
        educationCard && secondCardEl ? (
          <div className="grid grid-cols-2 gap-4">
            {educationCard}
            {secondCardEl}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {educationCard || secondCardEl}
          </div>
        ),
    });
  }

  return out;
}

function PearlPage({
  ctx,
  data,
  isFirstPage,
  paginated,
  children,
}: {
  ctx: PearlCtx;
  data: CVData;
  pageIndex: number;
  pageCount: number;
  isFirstPage: boolean;
  paginated: boolean;
  children?: ReactNode;
}) {
  const articleEl = (
    <article
      className={`cv-page ${paginated ? "" : "mx-auto aspect-[210/297] max-w-[800px]"} w-full overflow-hidden ${ctx.densityClass}`.trim()}
      style={
        paginated
          ? {
              ...ctx.articleStyle,
              width: 794,
              minHeight: 1123,
              backgroundColor: CREAM,
              padding: 0,
            }
          : { ...ctx.articleStyle, backgroundColor: CREAM, padding: 0 }
      }
    >
      {isFirstPage ? (
        <div
          className="grid h-full"
          style={{
            gridTemplateColumns: "1fr 2fr",
            minHeight: paginated ? 1123 : undefined,
          }}
        >
          <PearlSidebar ctx={ctx} data={data} />
          <div className="space-y-4 px-7 py-8">{children}</div>
        </div>
      ) : (
        <div className="space-y-4 px-7 py-8">{children}</div>
      )}
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

export function Pearl({
  data,
  paginated = false,
}: {
  data: CVData;
  paginated?: boolean;
}) {
  const ctx = computeCtx(data);
  const sections = buildPearlSections(data, ctx);

  if (paginated) {
    return (
      <PaginatedCV
        sections={sections}
        PageShell={(props) => (
          <PearlPage ctx={ctx} data={data} paginated {...props} />
        )}
        contentWidth={476}
        pageHeight={950}
      />
    );
  }

  return (
    <PearlPage
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
    </PearlPage>
  );
}
