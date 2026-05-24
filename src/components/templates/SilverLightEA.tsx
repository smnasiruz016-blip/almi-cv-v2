"use client";
import { type CSSProperties, type ReactNode } from "react";
import type { CVData } from "@/lib/cv-types";
import { resolveStyle, sectionLabel } from "@/lib/cv-themes";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";

// Palette sampled from source PNG — soft silver-grey canvas with
// dark slate ink, chrome ribbon accent across the lower half.
const PAGE_BG_TOP = "#dde2e8";
const PAGE_BG_BOT = "#b8c0c8";
const PAGE_EDGE_LINE = "rgba(60, 76, 96, 0.08)";

// Ink — dark on light
const INK_DARK = "#1a2a45";
const INK_BODY = "#3a4a5e";
const INK_FAINT = "rgba(58, 74, 94, 0.62)";

// Chrome ribbon stops
const CHROME_HIGHLIGHT = "#ffffff";
const CHROME_LIGHT = "#e8eef5";
const CHROME_MID = "#a8b4c2";
const CHROME_SHADOW = "#6a7888";
const CHROME_DEEP = "#3c4e63";

// Rule / divider
const RULE = "rgba(26, 42, 69, 0.20)";

// A4 at 96dpi
const PAGE_W = 794;
const PAGE_H = 1123;

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
    color: INK_BODY,
    backgroundColor: PAGE_BG_TOP,
  };
  return { headingFont: r.headingFont, bodyFont: r.bodyFont, density: r.density, densityClass, articleStyle };
}

function headingFamily(ctx: Ctx) {
  return `${ctx.headingFont.cssVar}, ${ctx.headingFont.fallback}`;
}

/** Soft silver-grey gradient canvas with faint vertical-lined texture
 *  at the page edges (matches the source PNG's subtle edge framing). */
function PlatinumBackdrop() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        background: `linear-gradient(170deg, ${PAGE_BG_TOP} 0%, ${PAGE_BG_BOT} 100%)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `repeating-linear-gradient(90deg, ${PAGE_EDGE_LINE} 0 1px, transparent 1px 14px)`,
          opacity: 0.55,
          maskImage:
            "linear-gradient(90deg, black 0%, transparent 12%, transparent 88%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, black 0%, transparent 12%, transparent 88%, black 100%)",
        }}
      />
    </div>
  );
}

/** Sweeping brushed-chrome ribbon across the LOWER half of the page —
 *  same metal-band motif but positioned lower than other corporate
 *  templates in the catalog. */
function ChromeRibbonLower() {
  return (
    <svg
      viewBox={`0 0 ${PAGE_W} ${PAGE_H}`}
      preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}
      aria-hidden
    >
      <defs>
        <linearGradient id="platinum-chrome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={CHROME_HIGHLIGHT} stopOpacity="0.95" />
          <stop offset="25%" stopColor={CHROME_LIGHT} stopOpacity="0.92" />
          <stop offset="55%" stopColor={CHROME_MID} stopOpacity="0.85" />
          <stop offset="80%" stopColor={CHROME_SHADOW} stopOpacity="0.82" />
          <stop offset="100%" stopColor={CHROME_DEEP} stopOpacity="0.7" />
        </linearGradient>
        <filter id="platinum-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      {/* Underglow */}
      <path
        d={`M -40 ${PAGE_H * 0.78} C ${PAGE_W * 0.25} ${PAGE_H * 0.70}, ${PAGE_W * 0.55} ${PAGE_H * 0.84}, ${PAGE_W + 40} ${PAGE_H * 0.74}`}
        stroke={CHROME_MID}
        strokeWidth="50"
        fill="none"
        filter="url(#platinum-glow)"
        opacity="0.40"
      />
      {/* Main brushed-steel band */}
      <path
        d={`M -40 ${PAGE_H * 0.78} C ${PAGE_W * 0.25} ${PAGE_H * 0.70}, ${PAGE_W * 0.55} ${PAGE_H * 0.84}, ${PAGE_W + 40} ${PAGE_H * 0.74}`}
        stroke="url(#platinum-chrome)"
        strokeWidth="30"
        fill="none"
        strokeLinecap="round"
        opacity="0.92"
      />
      {/* Bright highlight line along the top edge */}
      <path
        d={`M -40 ${PAGE_H * 0.77} C ${PAGE_W * 0.25} ${PAGE_H * 0.69}, ${PAGE_W * 0.55} ${PAGE_H * 0.83}, ${PAGE_W + 40} ${PAGE_H * 0.73}`}
        stroke={CHROME_HIGHLIGHT}
        strokeWidth="1.4"
        fill="none"
        opacity="0.85"
      />
    </svg>
  );
}

/** Rectangular photo with brushed-chrome thin frame border. Top-left
 *  of hero. Honors photoStyle "none" by showing a neutral slate
 *  rectangle with an inner silhouette. */
function RectanglePhoto({ data }: { data: CVData }) {
  const basics = data.basics;
  const photoStyle = data.style?.photoStyle ?? "round";
  const showPhoto = photoStyle !== "none" && !!basics.photoUrl;

  const w = 130;
  const h = 160;
  const ringW = 4;

  return (
    <div
      style={{
        width: w,
        height: h,
        flexShrink: 0,
        background: `linear-gradient(140deg, ${CHROME_HIGHLIGHT} 0%, ${CHROME_LIGHT} 30%, ${CHROME_MID} 65%, ${CHROME_SHADOW} 100%)`,
        padding: ringW,
        boxShadow: `0 6px 16px rgba(20, 30, 50, 0.22), 0 0 0 1px ${CHROME_DEEP}`,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#5a6878",
          overflow: "hidden",
          display: "grid",
          placeItems: "center",
        }}
      >
        {showPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={basics.photoUrl}
            alt={basics.fullName}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden>
            <circle cx="50" cy="40" r="14" fill={CHROME_LIGHT} opacity="0.85" />
            <path
              d="M 22 92 Q 22 64 50 64 Q 78 64 78 92 Z"
              fill={CHROME_LIGHT}
              opacity="0.85"
            />
          </svg>
        )}
      </div>
    </div>
  );
}

/** Scattered minimal slate-line office icons — clipboard with check,
 *  padlock, flask, briefcase, monitor. All small, all line-art, all
 *  drawn cleanly in flat SVG. */
function IconScatter() {
  // Each icon is positioned absolutely on the article, rendered as
  // its own little SVG so it can sit on top of the hero, content, or
  // ribbon without disturbing layout.
  return (
    <>
      {/* Clipboard with check — between hero and section start */}
      <div style={{ position: "absolute", top: 196, left: 220, zIndex: 5 }} aria-hidden>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <rect x="10" y="6" width="20" height="4" rx="1" fill="none" stroke={INK_DARK} strokeWidth="1.4" />
          <rect x="6" y="9" width="28" height="28" rx="2" fill="none" stroke={INK_DARK} strokeWidth="1.4" />
          <path d="M 13 24 L 18 29 L 28 18" fill="none" stroke={INK_DARK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Padlock — top-right near hero */}
      <div style={{ position: "absolute", top: 56, right: 56, zIndex: 5 }} aria-hidden>
        <svg width="36" height="40" viewBox="0 0 36 40">
          <path d="M 10 16 L 10 11 Q 10 4 18 4 Q 26 4 26 11 L 26 16" fill="none" stroke={INK_DARK} strokeWidth="1.6" />
          <rect x="5" y="16" width="26" height="20" rx="2.5" fill="none" stroke={INK_DARK} strokeWidth="1.6" />
          <circle cx="18" cy="24" r="2" fill={INK_DARK} />
          <line x1="18" y1="26" x2="18" y2="31" stroke={INK_DARK} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>

      {/* Flask / test tube — right of experience section */}
      <div style={{ position: "absolute", top: 432, right: 56, zIndex: 5 }} aria-hidden>
        <svg width="32" height="40" viewBox="0 0 32 40">
          <line x1="9" y1="4" x2="9" y2="16" stroke={INK_DARK} strokeWidth="1.6" />
          <line x1="23" y1="4" x2="23" y2="16" stroke={INK_DARK} strokeWidth="1.6" />
          <line x1="6" y1="4" x2="26" y2="4" stroke={INK_DARK} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M 9 16 L 4 32 Q 4 36 8 36 L 24 36 Q 28 36 28 32 L 23 16 Z" fill="none" stroke={INK_DARK} strokeWidth="1.6" />
          <path d="M 8 28 Q 16 25 24 28 L 24 32 Q 24 34 22 34 L 10 34 Q 8 34 8 32 Z" fill={INK_DARK} opacity="0.18" />
        </svg>
      </div>

      {/* Briefcase — right of skills */}
      <div style={{ position: "absolute", top: 640, right: 76, zIndex: 5 }} aria-hidden>
        <svg width="40" height="36" viewBox="0 0 40 36">
          <rect x="6" y="10" width="28" height="20" rx="2" fill="none" stroke={INK_DARK} strokeWidth="1.6" />
          <path d="M 15 10 L 15 6 Q 15 4 17 4 L 23 4 Q 25 4 25 6 L 25 10" fill="none" stroke={INK_DARK} strokeWidth="1.6" />
          <line x1="6" y1="18" x2="34" y2="18" stroke={INK_DARK} strokeWidth="1.2" opacity="0.7" />
          <rect x="17" y="16" width="6" height="4" fill={INK_DARK} opacity="0.6" />
        </svg>
      </div>

      {/* Monitor — bottom-right above chrome ribbon */}
      <div style={{ position: "absolute", top: 820, right: 56, zIndex: 5 }} aria-hidden>
        <svg width="42" height="38" viewBox="0 0 42 38">
          <rect x="4" y="4" width="34" height="22" rx="2" fill="none" stroke={INK_DARK} strokeWidth="1.6" />
          <line x1="8" y1="10" x2="22" y2="10" stroke={INK_DARK} strokeWidth="1.2" opacity="0.7" />
          <line x1="8" y1="15" x2="28" y2="15" stroke={INK_DARK} strokeWidth="1.2" opacity="0.7" />
          <line x1="8" y1="20" x2="18" y2="20" stroke={INK_DARK} strokeWidth="1.2" opacity="0.7" />
          <rect x="14" y="26" width="14" height="3" fill={INK_DARK} opacity="0.85" />
          <line x1="10" y1="32" x2="32" y2="32" stroke={INK_DARK} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
    </>
  );
}

/** Section heading with horizontal divider rule beneath. */
function SectionTitle({ ctx, title }: { ctx: Ctx; title: ReactNode }) {
  return (
    <div style={{ marginTop: 22 }}>
      <div
        style={{
          fontFamily: headingFamily(ctx),
          fontSize: 17,
          fontWeight: 800,
          color: INK_DARK,
          letterSpacing: "3px",
          textTransform: "uppercase",
        }}
      >
        {title}
      </div>
      <div
        aria-hidden
        style={{ marginTop: 4, height: 1, width: "100%", background: RULE }}
      />
    </div>
  );
}

function PlatinumBullet() {
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        left: 0,
        top: 8,
        width: 5,
        height: 5,
        background: INK_DARK,
        borderRadius: "9999px",
      }}
    />
  );
}

function Hero({ data, ctx }: { data: CVData; ctx: Ctx }) {
  const basics = data.basics;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 28,
        padding: "44px 56px 0 56px",
        position: "relative",
        zIndex: 6,
      }}
    >
      <RectanglePhoto data={data} />
      <div style={{ flex: 1, minWidth: 0, paddingTop: 14 }}>
        <div
          style={{
            fontFamily: headingFamily(ctx),
            fontSize: 46,
            fontWeight: 900,
            color: INK_DARK,
            lineHeight: 0.98,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}
        >
          {basics.fullName}
        </div>
        {basics.role && (
          <div
            style={{
              fontFamily: headingFamily(ctx),
              fontSize: 19,
              fontWeight: 500,
              color: INK_BODY,
              marginTop: 12,
              letterSpacing: "0.5px",
            }}
          >
            {basics.role}
          </div>
        )}
      </div>
    </div>
  );
}

function Contact({ data }: { data: CVData }) {
  const basics = data.basics;
  const items: string[] = [
    basics.email,
    basics.phone,
    basics.location,
    basics.website,
  ].filter(Boolean) as string[];
  if (items.length === 0) return null;
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "4px 18px",
        fontSize: 10.5,
        color: INK_FAINT,
        letterSpacing: "0.6px",
        marginTop: 8,
        marginBottom: 4,
      }}
    >
      {items.map((c, i) => (
        <span key={c} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {i > 0 && (
            <span
              aria-hidden
              style={{
                width: 3,
                height: 3,
                borderRadius: "9999px",
                background: INK_DARK,
              }}
            />
          )}
          {c}
        </span>
      ))}
    </div>
  );
}

function Body({ data, ctx }: { data: CVData; ctx: Ctx }) {
  const { basics, experience, education, skills, certifications, awards } = data;
  const hasSummary = !!basics.summary && !isRichTextEmpty(basics.summary);

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <Contact data={data} />

      {hasSummary && (
        <div
          style={{
            fontSize: 11.5,
            color: INK_BODY,
            lineHeight: 1.65,
            marginTop: 12,
          }}
        >
          <RichTextRender html={basics.summary ?? ""} />
        </div>
      )}

      {experience.length > 0 && (
        <div>
          <SectionTitle ctx={ctx} title={sectionLabel(data, "experience", "EXPERIENCE")} />
          <div style={{ marginTop: 10 }}>
            {experience.map((job, i) => (
              <div
                key={i}
                style={{
                  marginBottom: i === experience.length - 1 ? 0 : 12,
                  position: "relative",
                  paddingLeft: 16,
                }}
              >
                <PlatinumBullet />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 12.5, color: INK_DARK }}>
                    {job.role}
                    {job.company ? ` — ${job.company}` : ""}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: INK_DARK,
                      letterSpacing: "1.2px",
                      whiteSpace: "nowrap",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    {job.startDate}
                    {job.endDate ? ` — ${job.endDate}` : " — Present"}
                  </div>
                </div>
                {job.location && (
                  <div style={{ fontSize: 10.5, color: INK_FAINT, fontStyle: "italic", margin: "1px 0 4px" }}>
                    {job.location}
                  </div>
                )}
                {job.bullets?.map((b, bi) => (
                  <div key={bi} style={{ fontSize: 11, color: INK_BODY, lineHeight: 1.6, marginBottom: 2 }}>
                    <RichTextRender html={b} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div>
          <SectionTitle ctx={ctx} title={sectionLabel(data, "skills", "SKILLS")} />
          <div
            style={{
              marginTop: 10,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: 22,
              rowGap: 5,
            }}
          >
            {skills.map((s, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  paddingLeft: 16,
                  fontSize: 11,
                  color: INK_BODY,
                  lineHeight: 1.55,
                }}
              >
                <PlatinumBullet />
                {s}
              </div>
            ))}
          </div>
        </div>
      )}

      {certifications && certifications.length > 0 && (
        <div>
          <SectionTitle ctx={ctx} title={sectionLabel(data, "certifications", "CERTIFICATIONS")} />
          <div style={{ marginTop: 10 }}>
            {certifications.map((c, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  paddingLeft: 16,
                  fontSize: 11,
                  color: INK_BODY,
                  lineHeight: 1.55,
                  marginBottom: 4,
                }}
              >
                <PlatinumBullet />
                <span style={{ fontWeight: 600, color: INK_DARK }}>{c.name}</span>
                {c.issuer ? ` — ${c.issuer}` : ""}
                {c.year ? ` · ${c.year}` : ""}
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div>
          <SectionTitle ctx={ctx} title={sectionLabel(data, "education", "EDUCATION")} />
          <div style={{ marginTop: 10 }}>
            {education.map((ed, i) => (
              <div
                key={i}
                style={{
                  marginBottom: i === education.length - 1 ? 0 : 10,
                  position: "relative",
                  paddingLeft: 16,
                }}
              >
                <PlatinumBullet />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 12, color: INK_DARK }}>{ed.degree}</div>
                  <div
                    style={{
                      fontSize: 10,
                      color: INK_DARK,
                      letterSpacing: "1.2px",
                      whiteSpace: "nowrap",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    {ed.startDate}
                    {ed.endDate ? ` — ${ed.endDate}` : ""}
                  </div>
                </div>
                <div style={{ fontSize: 10.5, color: INK_BODY, fontStyle: "italic", marginTop: 1 }}>
                  {ed.school}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {awards && awards.length > 0 && (
        <div>
          <SectionTitle ctx={ctx} title={sectionLabel(data, "awards", "AWARDS")} />
          <div style={{ marginTop: 10 }}>
            {awards.map((a, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  paddingLeft: 16,
                  fontSize: 11,
                  color: INK_BODY,
                  lineHeight: 1.55,
                  marginBottom: 3,
                }}
              >
                <PlatinumBullet />
                {a.title}
                {a.issuer ? ` — ${a.issuer}` : ""}
                {a.year ? ` · ${a.year}` : ""}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function SilverLightEA({
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
          ? { ...ctx.articleStyle, width: PAGE_W, minHeight: PAGE_H }
          : ctx.articleStyle
      }
    >
      <PlatinumBackdrop />
      <ChromeRibbonLower />
      <IconScatter />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Hero data={data} ctx={ctx} />

        {/* Content sits in the upper-middle so the chrome ribbon below
            has visual room. Right padding leaves space for the scattered
            slate icons not to collide with body text. */}
        <div
          style={{
            position: "relative",
            margin: "28px 120px 220px 56px",
            flex: 1,
          }}
        >
          <Body data={data} ctx={ctx} />
        </div>
      </div>
    </article>
  );
  if (!paginated) return articleEl;
  return (
    <div className="cv-preview-wrapper mx-auto" style={{ width: 600, height: 849, overflow: "hidden" }}>
      <div style={{ transform: "scale(0.7556)", transformOrigin: "top left", width: PAGE_W }}>
        {articleEl}
      </div>
    </div>
  );
}
