"use client";
import { type CSSProperties, type ReactNode } from "react";
import type { CVData } from "@/lib/cv-types";
import { resolveStyle, sectionLabel } from "@/lib/cv-themes";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";

const PAGE_BG = "#fbe9ec";
const CARD = "#ffffff";
const CORAL_BAR = "#f4a7a6";
const CORAL_BAR_SOFT = "#f8c3c2";
const CORAL_DOT = "#e88080";
const INK = "#3f3236";
const INK_SOFT = "#7b6a6e";
const INK_FAINT = "#a89a9e";
const GOLD = "#c6a06a";

// Real photographic frame. Unsplash "picture frame surrounded by pink
// flowers" by Marianne Krohn (photo-1691600351222-09b297d09e38). URL
// params do server-side crop + optimization (AVIF/WebP via auto=format,
// ~80% quality, portrait crop centered). Domain is whitelisted in
// next.config.ts:6 (images.unsplash.com). Free Unsplash license, no
// attribution required.
const FRAME_PHOTO =
  "https://images.unsplash.com/photo-1691600351222-09b297d09e38?w=1200&h=1700&q=80&auto=format&fit=crop&crop=center";

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
    color: INK,
    backgroundColor: PAGE_BG,
  };
  return { headingFont: r.headingFont, bodyFont: r.bodyFont, density: r.density, densityClass, articleStyle };
}

function headingFamily(ctx: Ctx) {
  return `${ctx.headingFont.cssVar}, ${ctx.headingFont.fallback}`;
}

function PhotoFrame() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={FRAME_PHOTO}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          display: "block",
        }}
      />
      {/* warm rose-blush tint so the photo harmonizes with the page palette */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(251,233,236,0.18) 0%, rgba(251,233,236,0.06) 50%, rgba(251,233,236,0.20) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

function CirclePhoto({ data }: { data: CVData }) {
  const basics = data.basics;
  const photoStyle = data.style?.photoStyle ?? "round";
  if (photoStyle === "none") return null;
  const radius = photoStyle === "square" ? "14px" : "9999px";
  const size = 112;
  const ring: CSSProperties = {
    width: size,
    height: size,
    borderRadius: radius,
    padding: 4,
    background: `conic-gradient(from 210deg, ${CORAL_BAR_SOFT}, #e3c79b, ${GOLD}, ${CORAL_BAR_SOFT})`,
    boxShadow: "0 10px 22px rgba(150,86,96,0.22)",
  };
  const inner: CSSProperties = {
    width: "100%",
    height: "100%",
    borderRadius: radius,
    background: "linear-gradient(160deg,#efe1e4,#e2cbd1)",
    display: "grid",
    placeItems: "end center",
    overflow: "hidden",
  };
  const mark = (
    <svg viewBox="0 0 120 120" width="100%" height="100%" preserveAspectRatio="xMidYMax meet">
      <circle cx="60" cy="46" r="22" fill="#caa6ac" />
      <path d="M22 120 q0 -38 38 -38 q38 0 38 38 Z" fill="#caa6ac" />
    </svg>
  );
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: -size / 2 }}>
      <div style={ring}>
        <div style={inner}>
          {basics.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={basics.photoUrl}
              alt={basics.fullName}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: radius,
              }}
            />
          ) : (
            mark
          )}
        </div>
      </div>
    </div>
  );
}

function SectionBar({ ctx, children }: { ctx: Ctx; children: ReactNode }) {
  return (
    <div
      style={{
        background: CORAL_BAR,
        padding: "9px 22px",
        marginTop: 22,
        marginBottom: 14,
        borderRadius: 3,
        fontFamily: headingFamily(ctx),
        fontSize: 17,
        fontWeight: 700,
        color: "#ffffff",
        letterSpacing: "4px",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}

function Bullet() {
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        left: 0,
        top: 8,
        width: 7,
        height: 7,
        borderRadius: "9999px",
        background: CORAL_DOT,
      }}
    />
  );
}

function Hero({ data, ctx }: { data: CVData; ctx: Ctx }) {
  const basics = data.basics;
  const contact: string[] = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean) as string[];
  return (
    <div>
      <CirclePhoto data={data} />
      <div
        style={{
          fontFamily: headingFamily(ctx),
          fontSize: 38,
          fontWeight: 700,
          color: INK,
          textAlign: "center",
          letterSpacing: "6px",
          textTransform: "uppercase",
          marginTop: 18,
          lineHeight: 1.1,
        }}
      >
        {basics.fullName}
      </div>
      {basics.role && (
        <div
          style={{
            textAlign: "center",
            fontSize: 11,
            letterSpacing: "5px",
            textTransform: "uppercase",
            color: INK_SOFT,
            fontWeight: 500,
            marginTop: 8,
          }}
        >
          {basics.role}
        </div>
      )}
      {contact.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "5px 18px",
            fontSize: 10.5,
            color: INK_FAINT,
            letterSpacing: "0.8px",
            marginTop: 14,
          }}
        >
          {contact.map((c) => (
            <span key={c} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  width: 4,
                  height: 4,
                  background: CORAL_DOT,
                  borderRadius: "9999px",
                  display: "inline-block",
                }}
              />
              {c}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function Body({ data, ctx }: { data: CVData; ctx: Ctx }) {
  const { basics, experience, education, skills, awards } = data;
  const hasSummary = !!basics.summary && !isRichTextEmpty(basics.summary);
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, marginTop: 16 }}>
      {hasSummary && (
        <div
          style={{
            fontSize: 11.5,
            color: INK_SOFT,
            lineHeight: 1.72,
            fontStyle: "italic",
            textAlign: "center",
            padding: "0 18px",
            marginTop: 6,
          }}
        >
          <RichTextRender html={basics.summary ?? ""} />
        </div>
      )}

      {experience.length > 0 && (
        <div>
          <SectionBar ctx={ctx}>{sectionLabel(data, "experience", "EXPERIENCE")}</SectionBar>
          {experience.map((job, i) => (
            <div key={i} style={{ marginBottom: i === experience.length - 1 ? 0 : 12, position: "relative", paddingLeft: 18 }}>
              <Bullet />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                <div style={{ fontWeight: 700, fontSize: 12.5, color: INK }}>{job.role}</div>
                <div style={{ fontSize: 10, color: CORAL_DOT, letterSpacing: "1.2px", whiteSpace: "nowrap", textTransform: "uppercase", fontWeight: 600 }}>
                  {job.startDate}{job.endDate ? ` — ${job.endDate}` : ""}
                </div>
              </div>
              <div style={{ fontSize: 10.5, color: INK_SOFT, fontStyle: "italic", margin: "1px 0 4px" }}>
                {job.company}{job.location ? ` · ${job.location}` : ""}
              </div>
              {job.bullets?.map((b, bi) => (
                <div key={bi} style={{ fontSize: 11, color: INK_SOFT, lineHeight: 1.6, marginBottom: 2 }}>
                  <RichTextRender html={b} />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div>
          <SectionBar ctx={ctx}>{sectionLabel(data, "skills", "SKILLS")}</SectionBar>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 22, rowGap: 6 }}>
            {skills.map((s, i) => (
              <div key={i} style={{ position: "relative", paddingLeft: 18, fontSize: 11, color: INK_SOFT, lineHeight: 1.55 }}>
                <Bullet />
                {s}
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div>
          <SectionBar ctx={ctx}>{sectionLabel(data, "education", "EDUCATION")}</SectionBar>
          {education.map((ed, i) => (
            <div key={i} style={{ marginBottom: i === education.length - 1 ? 0 : 10, position: "relative", paddingLeft: 18 }}>
              <Bullet />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                <div style={{ fontWeight: 700, fontSize: 12, color: INK }}>{ed.degree}</div>
                <div style={{ fontSize: 10, color: CORAL_DOT, letterSpacing: "1.2px", whiteSpace: "nowrap", textTransform: "uppercase", fontWeight: 600 }}>
                  {ed.startDate}{ed.endDate ? ` — ${ed.endDate}` : ""}
                </div>
              </div>
              <div style={{ fontSize: 10.5, color: INK_SOFT, fontStyle: "italic", marginTop: 1 }}>{ed.school}</div>
            </div>
          ))}
        </div>
      )}

      {awards && awards.length > 0 && (
        <div>
          <SectionBar ctx={ctx}>{sectionLabel(data, "awards", "AWARDS")}</SectionBar>
          {awards.map((a, i) => (
            <div key={i} style={{ position: "relative", paddingLeft: 18, fontSize: 11, color: INK_SOFT, lineHeight: 1.55, marginBottom: 3 }}>
              <Bullet />
              {a.title}{a.year ? ` — ${a.year}` : ""}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function BeautyArtist({
  data,
  paginated = false,
}: {
  data: CVData;
  paginated?: boolean;
}) {
  const ctx = computeCtx(data);
  const articleEl = (
    <article
      className={`cv-page ${
        paginated ? "" : "mx-auto aspect-[210/297] max-w-[800px]"
      } relative flex w-full flex-col overflow-hidden rounded-lg shadow-warm-card-hover ${
        ctx.densityClass
      }`.trim()}
      style={
        paginated
          ? { ...ctx.articleStyle, width: 794, minHeight: 1123 }
          : ctx.articleStyle
      }
    >
      <PhotoFrame />
      <div
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          margin: "112px 64px 112px 64px",
          background: CARD,
          borderRadius: 8,
          padding: "0 52px 48px 52px",
          boxShadow: "0 28px 60px rgba(120,60,70,0.18), 0 6px 16px rgba(120,60,70,0.10)",
        }}
      >
        <Hero data={data} ctx={ctx} />
        <Body data={data} ctx={ctx} />
      </div>
    </article>
  );
  if (!paginated) return articleEl;
  return (
    <div className="cv-preview-wrapper mx-auto" style={{ width: 600, height: 849, overflow: "hidden" }}>
      <div style={{ transform: "scale(0.7556)", transformOrigin: "top left", width: 794 }}>
        {articleEl}
      </div>
    </div>
  );
}
