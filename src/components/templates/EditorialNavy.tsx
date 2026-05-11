"use client";

import { type CSSProperties, type ReactNode } from "react";
import type { CVData } from "@/lib/cv-types";
import { resolveStyle, sectionLabel } from "@/lib/cv-themes";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";

// Frozen color constants. Visual changes here would silently re-style
// users' saved CVs — don't touch after ship.
const PAGE_BG = "#0F2645";
const TEXT_PRIMARY = "#F5EBDE";
const HAIRLINE = "#3A4A6A";
const PHOTO_FALLBACK_BG = "#1A3559";

const PHOTO_SIZE = 180;
const HERO_HEIGHT = 340;

type Ctx = {
  headingFont: ReturnType<typeof resolveStyle>["headingFont"];
  bodyFont: ReturnType<typeof resolveStyle>["bodyFont"];
  density: ReturnType<typeof resolveStyle>["density"];
  densityClass: string;
  articleStyle: CSSProperties;
};

function computeCtx(data: CVData): Ctx {
  const r = resolveStyle(data?.style);
  const densityClass =
    r.density === "compact" ? "compact" : r.density === "spacious" ? "spacious" : "";
  const articleStyle: CSSProperties = {
    fontFamily: `${r.bodyFont.cssVar}, ${r.bodyFont.fallback}`,
    color: TEXT_PRIMARY,
    backgroundColor: PAGE_BG,
  };
  return {
    headingFont: r.headingFont,
    bodyFont: r.bodyFont,
    density: r.density,
    densityClass,
    articleStyle,
  };
}

function deriveInitials(fullName: string): string {
  const parts = fullName
    .trim()
    .split(/\s+/)
    .filter((p) => p.length > 0);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  const first = parts[0].charAt(0);
  const last = parts[parts.length - 1].charAt(0);
  return `${first}${last}`.toUpperCase();
}

function PhotoSlot({ data, ctx }: { data: CVData; ctx: Ctx }) {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const showPhoto = Boolean(basics.photoUrl);
  const initials = deriveInitials(basics.fullName || "");
  return (
    <div
      style={{
        width: PHOTO_SIZE,
        height: PHOTO_SIZE,
        borderRadius: "50%",
        overflow: "hidden",
        backgroundColor: PHOTO_FALLBACK_BG,
        border: `1.5px solid ${TEXT_PRIMARY}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
      aria-hidden={!showPhoto}
    >
      {showPhoto ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={basics.photoUrl}
          alt={`Photo of ${basics.fullName || "candidate"}`}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <span
          style={{
            fontFamily: `${ctx.headingFont.cssVar}, ${ctx.headingFont.fallback}`,
            color: TEXT_PRIMARY,
            fontSize: 56,
            fontWeight: 500,
            letterSpacing: "0.02em",
            lineHeight: 1,
          }}
        >
          {initials}
        </span>
      )}
    </div>
  );
}

function SectionLabel({ children, ctx }: { children: string; ctx: Ctx }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <h2
        className="text-[15px] uppercase"
        style={{
          color: TEXT_PRIMARY,
          fontFamily: `${ctx.bodyFont.cssVar}, ${ctx.bodyFont.fallback}`,
          fontWeight: 500,
          letterSpacing: "0.18em",
          marginBottom: 8,
        }}
      >
        {children}
      </h2>
      <div
        aria-hidden
        style={{ height: 1, backgroundColor: HAIRLINE, width: "100%" }}
      />
    </div>
  );
}

function Section({ children }: { children: ReactNode }) {
  return <section className="mb-[34px] last:mb-0">{children}</section>;
}

function formatLanguageLine(langs: CVData["languages"]): string | null {
  if (!langs || langs.length === 0) return null;
  const LEVEL_LABEL: Record<string, string> = {
    A1: "beginner",
    A2: "elementary",
    B1: "conversational",
    B2: "professional",
    C1: "fluent",
    C2: "native",
  };
  const parts = langs.map((l) => {
    const label = LEVEL_LABEL[l.level] ?? l.level;
    return `${l.name} (${label})`;
  });
  return `Languages: ${parts.join(", ")}`;
}

function Hero({ data, ctx }: { data: CVData; ctx: Ctx }) {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const displayName = basics.fullName?.trim() ? basics.fullName : "Untitled";

  // 3-line labeled contact stack per Editorial Navy spec: Address / Email /
  // Portfolio only. Phone + linkedIn remain in persona for other templates
  // but are not surfaced here — editorial-restraint signature.
  const contactLines: Array<{ label: string; value: string }> = [];
  if (basics.location) contactLines.push({ label: "Address", value: basics.location });
  if (basics.email) contactLines.push({ label: "Email", value: basics.email });
  if (basics.website) contactLines.push({ label: "Portfolio", value: basics.website });

  return (
    <div
      style={{
        minHeight: HERO_HEIGHT,
        padding: "56px 56px 32px",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        columnGap: 40,
        alignItems: "center",
      }}
    >
      <div className="flex flex-col">
        <h1
          style={{
            fontFamily: `${ctx.headingFont.cssVar}, ${ctx.headingFont.fallback}`,
            color: TEXT_PRIMARY,
            fontSize: 54,
            fontWeight: 500,
            letterSpacing: "-0.5px",
            lineHeight: 1.02,
          }}
        >
          {displayName}
        </h1>
        {basics.role && (
          <p
            className="uppercase"
            style={{
              fontFamily: `${ctx.bodyFont.cssVar}, ${ctx.bodyFont.fallback}`,
              color: TEXT_PRIMARY,
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: "0.16em",
              marginTop: 16,
            }}
          >
            {basics.role}
          </p>
        )}
        {contactLines.length > 0 && (
          <div
            className="flex flex-col"
            style={{
              color: TEXT_PRIMARY,
              fontSize: 12.5,
              lineHeight: 1.6,
              marginTop: 22,
            }}
          >
            {contactLines.map((line) => (
              <p key={line.label}>
                <span style={{ fontWeight: 500 }}>{line.label}:</span> {line.value}
              </p>
            ))}
          </div>
        )}
      </div>

      <PhotoSlot data={data} ctx={ctx} />
    </div>
  );
}

function ExperienceList({
  items,
  ctx,
}: {
  items: CVData["experience"];
  ctx: Ctx;
}) {
  return (
    <div>
      {items.map((job, i) => {
        const isLast = i === items.length - 1;
        const dateStr = job.endDate
          ? `${job.startDate} – ${job.endDate}`
          : `${job.startDate} – Present`;
        return (
          <div
            key={`${job.company}-${job.startDate}-${i}`}
            style={{ marginBottom: isLast ? 0 : 18 }}
          >
            <p
              className="text-[13.5px]"
              style={{
                color: TEXT_PRIMARY,
                fontWeight: 600,
                lineHeight: 1.3,
                fontFamily: `${ctx.bodyFont.cssVar}, ${ctx.bodyFont.fallback}`,
              }}
            >
              {job.role || job.company}
            </p>
            {job.role && (
              <p
                className="text-[12.5px]"
                style={{ color: TEXT_PRIMARY, lineHeight: 1.45 }}
              >
                {job.company}
                {job.location ? `, ${job.location}` : ""}
              </p>
            )}
            <p
              className="text-[11.5px]"
              style={{ color: TEXT_PRIMARY, lineHeight: 1.45 }}
            >
              {dateStr}
            </p>
            {job.bullets && job.bullets.some((b) => !isRichTextEmpty(b)) && (
              <ul
                className="mt-1.5 list-disc space-y-1 pl-4 text-[12px] [&_strong]:font-semibold"
                style={{ color: TEXT_PRIMARY, lineHeight: 1.55 }}
              >
                {job.bullets
                  .filter((b) => !isRichTextEmpty(b))
                  .map((b, bi) => (
                    <li key={bi}>
                      <RichTextRender html={b} as="span" />
                    </li>
                  ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

function EducationList({
  items,
  ctx,
}: {
  items: CVData["education"];
  ctx: Ctx;
}) {
  return (
    <div>
      {items.map((entry, i) => {
        const isLast = i === items.length - 1;
        const dateStr = entry.endDate || entry.startDate || "";
        const highlights = entry.notes
          ? entry.notes.split("·").map((s) => s.trim()).filter(Boolean)
          : [];
        return (
          <div
            key={`${entry.school}-${entry.startDate}-${i}`}
            style={{ marginBottom: isLast ? 0 : 18 }}
          >
            <p
              className="text-[13.5px]"
              style={{
                color: TEXT_PRIMARY,
                fontWeight: 600,
                lineHeight: 1.3,
                fontFamily: `${ctx.bodyFont.cssVar}, ${ctx.bodyFont.fallback}`,
              }}
            >
              {entry.school}
            </p>
            {entry.degree && (
              <p
                className="text-[12.5px] italic"
                style={{ color: TEXT_PRIMARY, lineHeight: 1.45 }}
              >
                {entry.degree}
                {entry.location ? `, ${entry.location}` : ""}
              </p>
            )}
            {dateStr && (
              <p
                className="text-[11.5px]"
                style={{ color: TEXT_PRIMARY, lineHeight: 1.45 }}
              >
                {dateStr}
              </p>
            )}
            {highlights.length > 0 && (
              <ul
                className="mt-1 list-disc space-y-1 pl-4 text-[12px]"
                style={{ color: TEXT_PRIMARY, lineHeight: 1.5 }}
              >
                {highlights.map((h, hi) => (
                  <li key={hi}>{h}</li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Body({ data, ctx }: { data: CVData; ctx: Ctx }) {
  const summary = data?.basics?.summary;
  const experience = data?.experience ?? [];
  const education = data?.education ?? [];
  const skills = data?.skills ?? [];
  const languageLine = formatLanguageLine(data?.languages);

  const hasSummary = !isRichTextEmpty(summary);
  const hasExperience = experience.length > 0;
  const hasEducation = education.length > 0;
  const hasSkills = skills.length > 0 || Boolean(languageLine);

  return (
    <div
      className="grid flex-1"
      style={{
        gridTemplateColumns: "1fr 1fr",
        columnGap: 48,
        padding: "16px 56px 56px",
      }}
    >
      <div>
        {hasSummary && (
          <Section>
            <SectionLabel ctx={ctx}>
              {sectionLabel(data, "profile", "SUMMARY")}
            </SectionLabel>
            <RichTextRender
              html={summary ?? ""}
              as="p"
              className="text-[12.5px] [&_strong]:font-semibold"
              style={{ color: TEXT_PRIMARY, lineHeight: 1.6 }}
            />
          </Section>
        )}
        {hasEducation && (
          <Section>
            <SectionLabel ctx={ctx}>
              {sectionLabel(data, "education", "EDUCATION")}
            </SectionLabel>
            <EducationList items={education} ctx={ctx} />
          </Section>
        )}
      </div>

      <div>
        {hasExperience && (
          <Section>
            <SectionLabel ctx={ctx}>
              {sectionLabel(data, "experience", "EXPERIENCE")}
            </SectionLabel>
            <ExperienceList items={experience} ctx={ctx} />
          </Section>
        )}
        {hasSkills && (
          <Section>
            <SectionLabel ctx={ctx}>
              {sectionLabel(data, "skills", "SKILLS")}
            </SectionLabel>
            {skills.length > 0 && (
              <ul
                className="list-disc space-y-1 pl-4 text-[12.5px]"
                style={{ color: TEXT_PRIMARY, lineHeight: 1.5 }}
              >
                {skills.map((s, i) => (
                  <li key={`skill-${i}`}>{s}</li>
                ))}
              </ul>
            )}
            {languageLine && (
              <p
                className="text-[12.5px]"
                style={{
                  color: TEXT_PRIMARY,
                  lineHeight: 1.5,
                  marginTop: skills.length > 0 ? 12 : 0,
                }}
              >
                {languageLine}
              </p>
            )}
          </Section>
        )}
      </div>
    </div>
  );
}

export function EditorialNavy({
  data,
  paginated = false,
}: {
  data: CVData;
  paginated?: boolean;
}) {
  const ctx = computeCtx(data);

  const articleEl = (
    <article
      className={`cv-page ${paginated ? "" : "mx-auto aspect-[210/297] max-w-[800px]"} relative flex w-full flex-col overflow-hidden rounded-lg shadow-warm-card-hover ${ctx.densityClass}`.trim()}
      style={
        paginated
          ? { ...ctx.articleStyle, width: 794, minHeight: 1123 }
          : ctx.articleStyle
      }
    >
      <Hero data={data} ctx={ctx} />
      <Body data={data} ctx={ctx} />
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
