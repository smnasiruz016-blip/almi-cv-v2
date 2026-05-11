"use client";

import { type CSSProperties } from "react";
import { UserCircle } from "lucide-react";
import type { CVData } from "@/lib/cv-types";
import { resolveStyle, sectionLabel } from "@/lib/cv-themes";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";

const PAGE_BG = "#F0E8D8";
const TEAL = "#1F4D63";
const LABEL_BROWN = "#7D6F58";
const ACCENT_GREEN = "#7FA088";
const HAIRLINE = "#E5DDC8";
const BODY_TEXT = "#1A1A1A";
const PLACEHOLDER_FROM = "#D4E4DC";
const PLACEHOLDER_TO = "#B8D0C8";

type Ctx = {
  headingFont: ReturnType<typeof resolveStyle>["headingFont"];
  bodyFont: ReturnType<typeof resolveStyle>["bodyFont"];
  density: ReturnType<typeof resolveStyle>["density"];
  showPhoto: boolean;
  densityClass: string;
  articleStyle: CSSProperties;
};

function computeCtx(data: CVData): Ctx {
  const r = resolveStyle(data?.style);
  const densityClass =
    r.density === "compact" ? "compact" : r.density === "spacious" ? "spacious" : "";
  const articleStyle: CSSProperties = {
    fontFamily: `${r.bodyFont.cssVar}, ${r.bodyFont.fallback}`,
    color: BODY_TEXT,
    backgroundColor: PAGE_BG,
  };
  return {
    headingFont: r.headingFont,
    bodyFont: r.bodyFont,
    density: r.density,
    showPhoto: r.photoStyle !== "none",
    densityClass,
    articleStyle,
  };
}

function SectionLabel({ children, ctx }: { children: string; ctx: Ctx }) {
  return (
    <h2
      className="mb-[10px] text-[10.5px] font-medium uppercase tracking-[0.16em]"
      style={{
        color: LABEL_BROWN,
        fontFamily: `${ctx.bodyFont.cssVar}, ${ctx.bodyFont.fallback}`,
      }}
    >
      {children}
    </h2>
  );
}

function Body({ data, ctx }: { data: CVData; ctx: Ctx }) {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const displayName = basics.fullName?.trim() ? basics.fullName : "Untitled";

  const summary = basics.summary;
  const experience = data?.experience ?? [];
  const education = data?.education ?? [];
  const skills = data?.skills ?? [];

  const hasContact =
    basics.location || basics.phone || basics.email || basics.website || basics.linkedIn;
  const hasSummary = !isRichTextEmpty(summary);
  const hasEducation = education.length > 0;
  const hasExperience = experience.length > 0;
  const hasSkills = skills.length > 0;

  return (
    <>
      {/* Zone 1: Photo block + Name (~200px) */}
      <div
        className="grid grid-cols-[200px_1fr]"
        style={{ borderBottom: `1px solid ${HAIRLINE}` }}
      >
        <div className="grid grid-cols-[18px_182px]" style={{ height: 200 }}>
          <div style={{ backgroundColor: ACCENT_GREEN }} aria-hidden />
          <div
            className="relative overflow-hidden"
            style={{ width: 180, height: 200 }}
          >
            {ctx.showPhoto && basics.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={basics.photoUrl}
                alt={`Photo of ${displayName}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${PLACEHOLDER_FROM}, ${PLACEHOLDER_TO})`,
                }}
                aria-hidden
              >
                <UserCircle size={56} style={{ color: TEAL, opacity: 0.55 }} />
              </div>
            )}
          </div>
        </div>

        <div
          className="flex flex-col justify-center"
          style={{ padding: "30px 28px 16px" }}
        >
          <h1
            style={{
              fontFamily: `${ctx.headingFont.cssVar}, ${ctx.headingFont.fallback}`,
              color: TEAL,
              fontSize: 44,
              fontWeight: 500,
              letterSpacing: "-0.5px",
              lineHeight: 1,
            }}
          >
            {displayName}
          </h1>
          {basics.role && (
            <p
              className="mt-3 text-[12.5px]"
              style={{
                color: TEAL,
                fontFamily: `${ctx.bodyFont.cssVar}, ${ctx.bodyFont.fallback}`,
                lineHeight: 1.4,
              }}
            >
              {basics.role}
            </p>
          )}
        </div>
      </div>

      {/* Zone 2: Contact (~70px). Hidden if all contact fields empty. */}
      {hasContact && (
        <div
          className="grid grid-cols-[200px_1fr]"
          style={{ borderBottom: `1px solid ${HAIRLINE}` }}
        >
          <div />
          <div style={{ padding: "14px 28px" }}>
            <div
              className="grid grid-cols-2 gap-x-6 text-[11.5px]"
              style={{ color: TEAL, lineHeight: 1.55 }}
            >
              <div>
                {basics.location && <p>{basics.location}</p>}
                {basics.phone && <p>{basics.phone}</p>}
              </div>
              <div>
                {basics.email && <p>{basics.email}</p>}
                {basics.website && <p>{basics.website}</p>}
                {basics.linkedIn && <p>{basics.linkedIn}</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Zone 3: Body — Summary + Education (left) / Clinical Experience (right) */}
      <div className="grid flex-1 grid-cols-[200px_1fr]">
        <div
          style={{
            padding: "22px 20px",
            borderRight: `1px solid ${HAIRLINE}`,
          }}
        >
          {hasSummary && (
            <section className="mb-[22px] last:mb-0">
              <SectionLabel ctx={ctx}>
                {sectionLabel(data, "profile", "PROFESSIONAL SUMMARY")}
              </SectionLabel>
              <RichTextRender
                html={summary ?? ""}
                as="p"
                className="text-[11px] leading-[1.55] [&_strong]:font-medium [&_strong]:text-[#1F4D63]"
                style={{ color: BODY_TEXT }}
              />
            </section>
          )}

          {hasEducation && (
            <section className="mb-[22px] last:mb-0">
              <SectionLabel ctx={ctx}>
                {sectionLabel(data, "education", "EDUCATION")}
              </SectionLabel>
              <div>
                {education.map((entry, i) => {
                  const isLast = i === education.length - 1;
                  return (
                    <div
                      key={`${entry.school}-${entry.startDate}-${i}`}
                      style={{ marginBottom: isLast ? 0 : 14 }}
                    >
                      <p
                        className="text-[11.5px]"
                        style={{ color: TEAL, fontWeight: 500, lineHeight: 1.3 }}
                      >
                        {entry.degree || entry.school}
                      </p>
                      {(entry.degree || entry.location) && (
                        <p
                          className="text-[11px]"
                          style={{ color: TEAL, lineHeight: 1.45 }}
                        >
                          {entry.degree ? entry.school : ""}
                          {entry.degree && entry.location ? " · " : ""}
                          {!entry.degree && entry.location ? entry.location : entry.degree ? entry.location ?? "" : ""}
                        </p>
                      )}
                      <p
                        className="text-[11px]"
                        style={{ color: TEAL, lineHeight: 1.45 }}
                      >
                        {entry.startDate}
                        {entry.endDate ? ` – ${entry.endDate}` : ""}
                      </p>
                      {entry.notes && (
                        <p
                          className="mt-1 text-[11px]"
                          style={{ color: BODY_TEXT, lineHeight: 1.55 }}
                        >
                          {entry.notes}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        <div style={{ padding: "22px 28px" }}>
          {hasExperience && (
            <section className="mb-[22px] last:mb-0">
              <SectionLabel ctx={ctx}>
                {sectionLabel(data, "experience", "CLINICAL EXPERIENCE")}
              </SectionLabel>
              <div>
                {experience.map((job, i) => {
                  const isLast = i === experience.length - 1;
                  return (
                    <div
                      key={`${job.company}-${job.startDate}-${i}`}
                      style={{ marginBottom: isLast ? 0 : 14 }}
                    >
                      <p
                        className="text-[11.5px]"
                        style={{ color: TEAL, fontWeight: 500, lineHeight: 1.3 }}
                      >
                        {job.role || job.company}
                      </p>
                      {(job.role || job.location) && (
                        <p
                          className="text-[11px]"
                          style={{ color: TEAL, lineHeight: 1.45 }}
                        >
                          {job.role ? job.company : ""}
                          {job.role && job.location ? " · " : ""}
                          {!job.role && job.location ? job.location : job.role ? job.location ?? "" : ""}
                        </p>
                      )}
                      <p
                        className="text-[11px]"
                        style={{ color: TEAL, lineHeight: 1.45 }}
                      >
                        {job.startDate} – {job.endDate ?? "Present"}
                      </p>
                      {job.bullets && job.bullets.some((b) => !isRichTextEmpty(b)) && (
                        <div
                          className="mt-1 space-y-1 text-[11px] [&_strong]:font-medium [&_strong]:text-[#1F4D63]"
                          style={{ color: BODY_TEXT, lineHeight: 1.55 }}
                        >
                          {job.bullets
                            .filter((b) => !isRichTextEmpty(b))
                            .map((b, bi) => (
                              <RichTextRender key={bi} html={b} as="p" />
                            ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Zone 4: Skills (~60px). Hidden entirely incl. top border when skills empty. */}
      {hasSkills && (
        <div
          className="grid grid-cols-[200px_1fr]"
          style={{
            borderTop: `1px solid ${HAIRLINE}`,
            padding: "16px 0",
          }}
        >
          <div style={{ padding: "0 20px" }}>
            <SectionLabel ctx={ctx}>
              {sectionLabel(data, "skills", "SPECIALIZED SKILLS")}
            </SectionLabel>
          </div>
          <div
            className="text-[11px]"
            style={{
              padding: "0 28px",
              color: BODY_TEXT,
              lineHeight: 1.55,
            }}
          >
            {skills.join(", ")}
          </div>
        </div>
      )}

      {/* Zone 5: Solid teal footer bar */}
      <div style={{ height: 28, backgroundColor: TEAL }} aria-hidden />
    </>
  );
}

export function ClinicalCream({
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
