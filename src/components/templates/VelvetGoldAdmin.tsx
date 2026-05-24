"use client";
import { type CSSProperties, type ReactNode } from "react";
import type { CVData } from "@/lib/cv-types";
import { resolveStyle, sectionLabel } from "@/lib/cv-themes";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";

// Velvet canvas
const PAGE_BG = "#1a1438";
const PAGE_BG_DEEP = "#0e0824";
const PANEL_BG = "rgba(28, 20, 64, 0.62)";
const PANEL_BORDER = "rgba(245, 230, 204, 0.18)";

// Silk / satin drape palette
const SILK_LIGHT = "#f5e6cc";
const SILK_MID = "#e6c896";
const SILK_DEEP = "#a87a4d";
const SILK_GLOW = "rgba(245, 230, 204, 0.45)";

// Gold accents
const GOLD = "#ffd84d";
const GOLD_SOFT = "#e6c247";
const GOLD_GLOW = "rgba(255, 216, 77, 0.45)";

// Cream / text
const CREAM = "#f5e6cc";
const CREAM_SOFT = "#e6d5b8";
const INK = "#ffffff";
const INK_SOFT = "#dcd6ec";
const INK_FAINT = "rgba(220, 214, 236, 0.65)";

// Decorative violet
const VIOLET_SOFT = "#2d2155";
const VIOLET_FAINT = "rgba(160, 130, 220, 0.35)";

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
    color: INK,
    backgroundColor: PAGE_BG,
  };
  return { headingFont: r.headingFont, bodyFont: r.bodyFont, density: r.density, densityClass, articleStyle };
}

function headingFamily(ctx: Ctx) {
  return `${ctx.headingFont.cssVar}, ${ctx.headingFont.fallback}`;
}

/** Full-bleed velvet backdrop: radial vignette + subtle violet glow halos. */
function VelvetBackdrop() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        background: `radial-gradient(110% 80% at 30% 25%, ${PAGE_BG} 0%, ${PAGE_BG_DEEP} 100%)`,
      }}
    >
      {/* Soft violet halo top-right */}
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -100,
          width: 380,
          height: 380,
          borderRadius: "9999px",
          background: `radial-gradient(circle, ${VIOLET_FAINT} 0%, transparent 65%)`,
          filter: "blur(12px)",
        }}
      />
      {/* Soft peach halo bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: -160,
          left: -100,
          width: 420,
          height: 420,
          borderRadius: "9999px",
          background: `radial-gradient(circle, rgba(230, 200, 150, 0.18) 0%, transparent 65%)`,
          filter: "blur(14px)",
        }}
      />
    </div>
  );
}

/** Signature motif — silky satin ribbon swirling diagonally across the
 *  page. Two wide paths with a multi-stop gradient for the silk highlight,
 *  plus a glow underlay. */
function SatinRibbon() {
  return (
    <svg
      viewBox={`0 0 ${PAGE_W} ${PAGE_H}`}
      preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}
      aria-hidden
    >
      <defs>
        <linearGradient id="silk-grad" x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0%" stopColor={SILK_DEEP} stopOpacity="0" />
          <stop offset="18%" stopColor={SILK_DEEP} stopOpacity="0.75" />
          <stop offset="44%" stopColor={SILK_LIGHT} stopOpacity="0.95" />
          <stop offset="62%" stopColor={SILK_MID} stopOpacity="0.85" />
          <stop offset="86%" stopColor={SILK_DEEP} stopOpacity="0.65" />
          <stop offset="100%" stopColor={SILK_DEEP} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="silk-grad-2" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor={SILK_MID} stopOpacity="0" />
          <stop offset="22%" stopColor={SILK_MID} stopOpacity="0.5" />
          <stop offset="50%" stopColor={SILK_LIGHT} stopOpacity="0.7" />
          <stop offset="78%" stopColor={SILK_DEEP} stopOpacity="0.4" />
          <stop offset="100%" stopColor={SILK_DEEP} stopOpacity="0" />
        </linearGradient>
        <filter id="silk-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      {/* Outer glow */}
      <path
        d={`M -40 ${PAGE_H * 0.46} C ${PAGE_W * 0.22} ${PAGE_H * 0.32}, ${PAGE_W * 0.46} ${PAGE_H * 0.58}, ${PAGE_W * 0.62} ${PAGE_H * 0.42} S ${PAGE_W * 0.92} ${PAGE_H * 0.34}, ${PAGE_W + 40} ${PAGE_H * 0.50}`}
        stroke="url(#silk-grad)"
        strokeWidth="120"
        fill="none"
        filter="url(#silk-glow)"
        opacity="0.55"
      />
      {/* Main satin band */}
      <path
        d={`M -40 ${PAGE_H * 0.46} C ${PAGE_W * 0.22} ${PAGE_H * 0.32}, ${PAGE_W * 0.46} ${PAGE_H * 0.58}, ${PAGE_W * 0.62} ${PAGE_H * 0.42} S ${PAGE_W * 0.92} ${PAGE_H * 0.34}, ${PAGE_W + 40} ${PAGE_H * 0.50}`}
        stroke="url(#silk-grad)"
        strokeWidth="68"
        fill="none"
        strokeLinecap="round"
        opacity="0.92"
      />
      {/* Inner highlight ribbon (thinner, brighter) */}
      <path
        d={`M -40 ${PAGE_H * 0.48} C ${PAGE_W * 0.20} ${PAGE_H * 0.36}, ${PAGE_W * 0.48} ${PAGE_H * 0.56}, ${PAGE_W * 0.66} ${PAGE_H * 0.44} S ${PAGE_W * 0.92} ${PAGE_H * 0.38}, ${PAGE_W + 40} ${PAGE_H * 0.52}`}
        stroke={SILK_LIGHT}
        strokeWidth="2.5"
        fill="none"
        opacity="0.7"
      />
      {/* Secondary thinner ribbon weaving above */}
      <path
        d={`M -40 ${PAGE_H * 0.55} C ${PAGE_W * 0.18} ${PAGE_H * 0.45}, ${PAGE_W * 0.42} ${PAGE_H * 0.65}, ${PAGE_W * 0.60} ${PAGE_H * 0.50} S ${PAGE_W * 0.90} ${PAGE_H * 0.48}, ${PAGE_W + 40} ${PAGE_H * 0.58}`}
        stroke="url(#silk-grad-2)"
        strokeWidth="28"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}

/** Decorative scattered gold diamond sparkles. Pure decoration. */
function GoldSparkles() {
  // x, y, size — positioned around the satin band to read as catchlights
  const sparkles: { x: number; y: number; s: number; o: number }[] = [
    { x: 88, y: 222, s: 9, o: 0.9 },
    { x: 320, y: 188, s: 6, o: 0.8 },
    { x: 540, y: 260, s: 11, o: 0.95 },
    { x: 712, y: 200, s: 7, o: 0.85 },
    { x: 250, y: 540, s: 8, o: 0.85 },
    { x: 660, y: 580, s: 9, o: 0.9 },
    { x: 510, y: 820, s: 6, o: 0.75 },
    { x: 110, y: 760, s: 10, o: 0.95 },
  ];
  return (
    <svg
      viewBox={`0 0 ${PAGE_W} ${PAGE_H}`}
      preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 3 }}
      aria-hidden
    >
      <defs>
        <filter id="sparkle-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      {sparkles.map((sp, i) => (
        <g key={i} transform={`translate(${sp.x},${sp.y}) rotate(45)`} opacity={sp.o}>
          <rect
            x={-sp.s / 2}
            y={-sp.s / 2}
            width={sp.s}
            height={sp.s}
            fill={GOLD}
            filter="url(#sparkle-glow)"
          />
          <rect
            x={-sp.s / 2}
            y={-sp.s / 2}
            width={sp.s}
            height={sp.s}
            fill={GOLD}
          />
        </g>
      ))}
    </svg>
  );
}

/** Floating isometric office props — desktop computer (top-right) and
 *  a small office chair (mid-right). Pure decoration. */
function OfficeProps() {
  return (
    <svg
      width="280"
      height="600"
      viewBox="0 0 280 600"
      style={{ position: "absolute", right: 8, top: 180, zIndex: 4 }}
      aria-hidden
    >
      {/* Isometric desktop computer — monitor + base + keyboard */}
      <g transform="translate(60, 30)">
        {/* Monitor body */}
        <g stroke={CREAM_SOFT} strokeWidth="1.2" fill={VIOLET_SOFT}>
          <polygon points="20,30 110,18 160,30 70,42" />
          <polygon points="20,30 20,78 70,90 70,42" />
          <polygon points="70,42 70,90 160,78 160,30" />
        </g>
        {/* Screen content lines */}
        <g stroke={SILK_LIGHT} strokeWidth="0.8" opacity="0.7">
          <line x1="30" y1="50" x2="65" y2="54" />
          <line x1="30" y1="58" x2="60" y2="62" />
          <line x1="30" y1="66" x2="55" y2="70" />
          <line x1="80" y1="52" x2="150" y2="42" />
          <line x1="80" y1="60" x2="145" y2="50" />
          <line x1="80" y1="68" x2="140" y2="58" />
        </g>
        {/* Stand */}
        <polygon points="80,95 100,99 100,108 80,104" fill={VIOLET_SOFT} stroke={CREAM_SOFT} strokeWidth="1" />
        {/* Base */}
        <polygon points="60,108 110,118 130,108 80,98" fill={SILK_DEEP} stroke={CREAM_SOFT} strokeWidth="1" opacity="0.85" />
        {/* Keyboard */}
        <polygon points="40,130 130,142 160,130 70,118" fill={CREAM_SOFT} stroke={SILK_DEEP} strokeWidth="1" opacity="0.85" />
      </g>

      {/* Small isometric office chair — mid-right */}
      <g transform="translate(110, 260)">
        {/* Seat */}
        <polygon points="20,40 70,30 110,42 60,52" fill={SILK_MID} stroke={CREAM_SOFT} strokeWidth="1" />
        {/* Backrest */}
        <polygon points="70,30 110,42 110,8 70,0" fill={VIOLET_SOFT} stroke={CREAM_SOFT} strokeWidth="1" />
        <polygon points="70,30 70,0 20,8 20,40" fill={VIOLET_SOFT} stroke={CREAM_SOFT} strokeWidth="1" opacity="0.85" />
        {/* Center post */}
        <rect x="60" y="50" width="8" height="34" fill={SILK_DEEP} stroke={CREAM_SOFT} strokeWidth="0.8" />
        {/* Wheelbase legs */}
        <g stroke={SILK_DEEP} strokeWidth="2" strokeLinecap="round">
          <line x1="64" y1="84" x2="44" y2="96" />
          <line x1="64" y1="84" x2="86" y2="92" />
          <line x1="64" y1="84" x2="56" y2="100" />
          <line x1="64" y1="84" x2="78" y2="100" />
        </g>
      </g>

      {/* Small folder/document stack — bottom-right */}
      <g transform="translate(140, 440)">
        <polygon points="0,30 60,22 100,30 40,38" fill={GOLD_SOFT} stroke={CREAM_SOFT} strokeWidth="1" opacity="0.85" />
        <polygon points="0,30 0,42 40,50 40,38" fill={SILK_DEEP} stroke={CREAM_SOFT} strokeWidth="0.8" />
        <polygon points="40,38 40,50 100,42 100,30" fill={SILK_MID} stroke={CREAM_SOFT} strokeWidth="0.8" />
      </g>
    </svg>
  );
}

/** Circular cream-bordered portrait, top-left of hero strip. Honors
 *  photoStyle ("none" hides the photo but keeps a neutral cream disc
 *  as a placeholder so the hero composition stays balanced). */
function CirclePhoto({ data }: { data: CVData }) {
  const basics = data.basics;
  const photoStyle = data.style?.photoStyle ?? "round";
  const size = 96;
  const ringW = 4;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "9999px",
        background: `linear-gradient(135deg, ${CREAM} 0%, ${SILK_MID} 60%, ${SILK_DEEP} 100%)`,
        padding: ringW,
        boxShadow: `0 6px 18px rgba(0,0,0,0.4), 0 0 0 1px ${SILK_GLOW}`,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "9999px",
          overflow: "hidden",
          background: VIOLET_SOFT,
          display: "grid",
          placeItems: "center",
        }}
      >
        {photoStyle !== "none" && basics.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={basics.photoUrl}
            alt={basics.fullName}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          // Neutral cream placeholder silhouette
          <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden>
            <circle cx="50" cy="40" r="14" fill={CREAM_SOFT} opacity="0.85" />
            <path
              d="M 22 92 Q 22 64 50 64 Q 78 64 78 92 Z"
              fill={CREAM_SOFT}
              opacity="0.85"
            />
          </svg>
        )}
      </div>
    </div>
  );
}

function SectionTitle({ ctx, title }: { ctx: Ctx; title: ReactNode }) {
  return (
    <div style={{ marginTop: 18 }}>
      <div
        style={{
          fontFamily: headingFamily(ctx),
          fontSize: 16,
          fontWeight: 800,
          color: CREAM,
          letterSpacing: "3.5px",
          textTransform: "uppercase",
        }}
      >
        {title}
      </div>
      <div
        aria-hidden
        style={{
          marginTop: 4,
          height: 1,
          width: "55%",
          background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD_SOFT} 50%, transparent 100%)`,
          boxShadow: `0 0 6px ${GOLD_GLOW}`,
        }}
      />
    </div>
  );
}

function GoldBullet() {
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        left: 0,
        top: 8,
        width: 5,
        height: 5,
        background: GOLD,
        borderRadius: "9999px",
        boxShadow: `0 0 5px ${GOLD_GLOW}`,
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
        alignItems: "center",
        gap: 22,
        padding: "44px 56px 0 56px",
        position: "relative",
        zIndex: 6,
      }}
    >
      <CirclePhoto data={data} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: headingFamily(ctx),
            fontSize: 44,
            fontWeight: 900,
            color: GOLD,
            lineHeight: 1.0,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            textShadow: `0 0 18px ${GOLD_GLOW}, 0 2px 0 rgba(0,0,0,0.45)`,
          }}
        >
          {basics.fullName}
        </div>
        {basics.role && (
          <div
            style={{
              fontFamily: headingFamily(ctx),
              fontSize: 17,
              fontWeight: 500,
              color: INK,
              marginTop: 8,
              letterSpacing: "0.8px",
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
        paddingBottom: 12,
        borderBottom: `1px solid rgba(245, 230, 204, 0.12)`,
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
                background: GOLD,
                boxShadow: `0 0 3px ${GOLD_GLOW}`,
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
            color: INK_SOFT,
            lineHeight: 1.65,
            marginTop: 14,
            fontStyle: "italic",
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
                <GoldBullet />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 12.5, color: INK }}>
                    {job.role}
                    {job.company ? ` — ${job.company}` : ""}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: GOLD,
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
                  <div key={bi} style={{ fontSize: 11, color: INK_SOFT, lineHeight: 1.6, marginBottom: 2 }}>
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
                  color: INK_SOFT,
                  lineHeight: 1.55,
                }}
              >
                <GoldBullet />
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
                  color: INK_SOFT,
                  lineHeight: 1.55,
                  marginBottom: 4,
                }}
              >
                <GoldBullet />
                <span style={{ fontWeight: 600, color: INK }}>{c.name}</span>
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
                <GoldBullet />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 12, color: INK }}>{ed.degree}</div>
                  <div
                    style={{
                      fontSize: 10,
                      color: GOLD,
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
                <div style={{ fontSize: 10.5, color: INK_SOFT, fontStyle: "italic", marginTop: 1 }}>
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
                  color: INK_SOFT,
                  lineHeight: 1.55,
                  marginBottom: 3,
                }}
              >
                <GoldBullet />
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

export function VelvetGoldAdmin({
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
      <VelvetBackdrop />
      <SatinRibbon />
      <GoldSparkles />
      <OfficeProps />

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

        {/* Translucent velvet content panel — keeps the satin & props
            readable behind, but stops body text losing contrast where
            it would otherwise sit directly over the ribbon. */}
        <div
          style={{
            position: "relative",
            margin: "24px 220px 50px 56px",
            padding: "22px 26px 28px 26px",
            background: PANEL_BG,
            border: `1px solid ${PANEL_BORDER}`,
            borderRadius: 10,
            boxShadow: `0 18px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(245,230,204,0.10)`,
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
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
