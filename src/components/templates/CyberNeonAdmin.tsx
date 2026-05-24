"use client";
import { type CSSProperties, type ReactNode } from "react";
import type { CVData } from "@/lib/cv-types";
import { resolveStyle, sectionLabel } from "@/lib/cv-themes";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";

const PAGE_BG = "#0a1f18";
const PAGE_BG_DEEP = "#04120c";
const PANEL_BG = "rgba(6, 30, 22, 0.78)";
const PANEL_BG_SOLID = "#08251c";
const NEON = "#00f0a0";
const NEON_BRIGHT = "#3effb8";
const NEON_FAINT = "rgba(0, 240, 160, 0.20)";
const NEON_DEEP = "rgba(0, 240, 160, 0.55)";
const NEON_GLOW = "rgba(0, 240, 160, 0.35)";
const INK = "#eafff6";
const INK_SOFT = "#b2d6c9";
const INK_FAINT = "rgba(178, 214, 201, 0.62)";

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

/** Full-bleed backdrop: deep radial vignette + faint hex-mesh top-left
 *  + sweeping diagonal neon waves. Sits behind everything (zIndex 0). */
function NeonBackdrop() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        background: `radial-gradient(120% 90% at 20% 30%, ${PAGE_BG} 0%, ${PAGE_BG_DEEP} 100%)`,
      }}
    >
      <HexMesh />
      <NeonWaves />
    </div>
  );
}

/** Hex-mesh tile pattern at top-left edge — sci-fi UI texture. */
function HexMesh() {
  const hex = (cx: number, cy: number, r: number) => {
    const pts: string[] = [];
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      pts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
    }
    return pts.join(" ");
  };
  const cells: ReactNode[] = [];
  const r = 14;
  const dx = r * Math.sqrt(3);
  const dy = r * 1.5;
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 5; col++) {
      const x = col * dx + (row % 2 ? dx / 2 : 0) + 12;
      const y = row * dy + 12;
      const opacity = Math.max(0, 0.45 - row * 0.06 - col * 0.04);
      cells.push(
        <polygon
          key={`${row}-${col}`}
          points={hex(x, y, r)}
          fill="none"
          stroke={NEON}
          strokeWidth={0.6}
          opacity={opacity}
        />,
      );
    }
  }
  return (
    <svg
      width="220"
      height="200"
      viewBox="0 0 220 200"
      style={{ position: "absolute", top: -20, left: -20, opacity: 0.85 }}
      aria-hidden
    >
      {cells}
    </svg>
  );
}

/** Sweeping diagonal neon light streaks across the middle of the page. */
function NeonWaves() {
  return (
    <svg
      viewBox={`0 0 ${PAGE_W} ${PAGE_H}`}
      preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      aria-hidden
    >
      <defs>
        <linearGradient id="wave-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={NEON} stopOpacity="0" />
          <stop offset="40%" stopColor={NEON_BRIGHT} stopOpacity="0.85" />
          <stop offset="100%" stopColor={NEON} stopOpacity="0" />
        </linearGradient>
        <filter id="wave-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <g filter="url(#wave-glow)" opacity="0.55">
        <path
          d={`M -50 ${PAGE_H * 0.35} C ${PAGE_W * 0.35} ${PAGE_H * 0.20}, ${PAGE_W * 0.55} ${PAGE_H * 0.55}, ${PAGE_W + 50} ${PAGE_H * 0.30}`}
          stroke="url(#wave-grad)"
          strokeWidth="14"
          fill="none"
        />
        <path
          d={`M -50 ${PAGE_H * 0.55} C ${PAGE_W * 0.40} ${PAGE_H * 0.40}, ${PAGE_W * 0.60} ${PAGE_H * 0.75}, ${PAGE_W + 50} ${PAGE_H * 0.50}`}
          stroke="url(#wave-grad)"
          strokeWidth="10"
          fill="none"
        />
      </g>
      <g opacity="0.85">
        <path
          d={`M -50 ${PAGE_H * 0.35} C ${PAGE_W * 0.35} ${PAGE_H * 0.20}, ${PAGE_W * 0.55} ${PAGE_H * 0.55}, ${PAGE_W + 50} ${PAGE_H * 0.30}`}
          stroke="url(#wave-grad)"
          strokeWidth="1.8"
          fill="none"
        />
        <path
          d={`M -50 ${PAGE_H * 0.55} C ${PAGE_W * 0.40} ${PAGE_H * 0.40}, ${PAGE_W * 0.60} ${PAGE_H * 0.75}, ${PAGE_W + 50} ${PAGE_H * 0.50}`}
          stroke="url(#wave-grad)"
          strokeWidth="1.4"
          fill="none"
        />
      </g>
    </svg>
  );
}

/** Right-side decorative cluster: isometric building blocks + circuit
 *  nodes + floating cubes. Pure decoration, hidden from a11y. */
function TechCluster() {
  return (
    <svg
      width="240"
      height="540"
      viewBox="0 0 240 540"
      style={{ position: "absolute", right: 18, top: 200, opacity: 0.85 }}
      aria-hidden
    >
      {/* Isometric stack of two buildings */}
      <g stroke={NEON} strokeWidth="1.2" fill="none">
        <polygon points="60,40 120,20 180,40 120,60" />
        <polygon points="60,40 60,90 120,110 120,60" />
        <polygon points="120,60 120,110 180,90 180,40" />
        <line x1="80" y1="45" x2="80" y2="95" opacity="0.7" />
        <line x1="100" y1="50" x2="100" y2="100" opacity="0.7" />
        <line x1="140" y1="55" x2="140" y2="105" opacity="0.7" />
        <line x1="160" y1="50" x2="160" y2="100" opacity="0.7" />
      </g>
      <g stroke={NEON} strokeWidth="1" fill={NEON_FAINT} opacity="0.9">
        <polygon points="80,130 140,118 200,130 140,142" />
        <polygon points="80,130 80,168 140,180 140,142" />
        <polygon points="140,142 140,180 200,168 200,130" />
      </g>

      {/* Network / circuit node graph */}
      <g stroke={NEON} strokeWidth="1.1" fill="none" opacity="0.92">
        <circle cx="60" cy="240" r="6" fill={NEON_FAINT} />
        <circle cx="170" cy="220" r="6" fill={NEON_FAINT} />
        <circle cx="130" cy="290" r="6" fill={NEON_FAINT} />
        <circle cx="50" cy="320" r="6" fill={NEON_FAINT} />
        <circle cx="200" cy="300" r="6" fill={NEON_FAINT} />
        <line x1="60" y1="240" x2="170" y2="220" />
        <line x1="60" y1="240" x2="130" y2="290" />
        <line x1="170" y1="220" x2="130" y2="290" />
        <line x1="130" y1="290" x2="50" y2="320" />
        <line x1="130" y1="290" x2="200" y2="300" />
      </g>

      {/* Data panel — terminal lines */}
      <g stroke={NEON} strokeWidth="0.9" opacity="0.85">
        <rect x="50" y="365" width="170" height="60" rx="4" fill="none" />
        <line x1="60" y1="378" x2="160" y2="378" />
        <line x1="60" y1="390" x2="200" y2="390" />
        <line x1="60" y1="402" x2="140" y2="402" />
        <line x1="60" y1="414" x2="180" y2="414" />
      </g>

      {/* Floating wireframe cube */}
      <g stroke={NEON_BRIGHT} strokeWidth="1" fill="none" opacity="0.9">
        <polygon points="40,470 70,458 100,470 70,482" />
        <polygon points="40,470 40,500 70,512 70,482" />
        <polygon points="70,482 70,512 100,500 100,470" />
      </g>
      <g stroke={NEON} strokeWidth="0.9" fill="none" opacity="0.8">
        <polygon points="160,490 190,478 220,490 190,502" />
        <polygon points="160,490 160,520 190,532 190,502" />
        <polygon points="190,502 190,532 220,520 220,490" />
      </g>
    </svg>
  );
}

/** Top-right neon octagon — badge / portrait frame. Photo is clipped
 *  to the octagon polygon when present; otherwise an inner avatar
 *  glyph fills the frame. photoStyle="none" hides the photo but keeps
 *  the badge as decoration (the octagon is part of the template's
 *  visual identity, not a user-controlled crop). */
function OctagonBadge({ data }: { data: CVData }) {
  const basics = data.basics;
  const photoStyle = data.style?.photoStyle ?? "round";
  const showPhoto = photoStyle !== "none" && !!basics.photoUrl;

  // Regular octagon coords inscribed in 100x100 box (8 vertices)
  const octPoints = "29,4 71,4 96,29 96,71 71,96 29,96 4,71 4,29";

  return (
    <div
      style={{
        position: "absolute",
        top: 32,
        right: 36,
        width: 140,
        height: 140,
        zIndex: 5,
      }}
    >
      <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden>
        <defs>
          <filter id="oct-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
          <clipPath id="oct-clip">
            <polygon points={octPoints} />
          </clipPath>
        </defs>
        {/* Outer glow */}
        <polygon
          points={octPoints}
          fill="none"
          stroke={NEON}
          strokeWidth="3"
          filter="url(#oct-glow)"
          opacity="0.85"
        />
        {/* Inner fill */}
        <polygon
          points={octPoints}
          fill={PAGE_BG_DEEP}
          stroke={NEON_BRIGHT}
          strokeWidth="1.2"
        />
        {/* Inner ring */}
        <polygon
          points="40,17 60,17 75,32 75,68 60,83 40,83 25,68 25,32"
          fill="none"
          stroke={NEON}
          strokeWidth="0.8"
          opacity="0.55"
        />
        {/* Photo or avatar inside the octagon */}
        <g clipPath="url(#oct-clip)">
          {showPhoto ? (
            <image
              href={basics.photoUrl}
              x="4"
              y="4"
              width="92"
              height="92"
              preserveAspectRatio="xMidYMid slice"
            />
          ) : (
            <>
              <rect x="4" y="4" width="92" height="92" fill={PAGE_BG_DEEP} />
              {/* Stylized neon avatar silhouette */}
              <circle cx="50" cy="40" r="11" fill={NEON_FAINT} stroke={NEON} strokeWidth="0.8" />
              <path
                d="M 28 78 Q 28 60 50 60 Q 72 60 72 78 Z"
                fill={NEON_FAINT}
                stroke={NEON}
                strokeWidth="0.8"
              />
            </>
          )}
        </g>
      </svg>
    </div>
  );
}

/** A neon section title with underline rule. */
function SectionTitle({
  ctx,
  title,
}: {
  ctx: Ctx;
  title: ReactNode;
}) {
  return (
    <div style={{ marginTop: 22 }}>
      <div
        style={{
          fontFamily: headingFamily(ctx),
          fontSize: 17,
          fontWeight: 800,
          color: NEON_BRIGHT,
          letterSpacing: "3.5px",
          textTransform: "uppercase",
          textShadow: `0 0 12px ${NEON_GLOW}`,
        }}
      >
        {title}
      </div>
      <div
        aria-hidden
        style={{
          marginTop: 4,
          height: 1,
          width: "62%",
          background: `linear-gradient(90deg, ${NEON} 0%, ${NEON_DEEP} 60%, transparent 100%)`,
        }}
      />
    </div>
  );
}

function NeonBullet() {
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        left: 0,
        top: 8,
        width: 5,
        height: 5,
        background: NEON,
        borderRadius: "9999px",
        boxShadow: `0 0 6px ${NEON_GLOW}`,
      }}
    />
  );
}

function Hero({ data, ctx }: { data: CVData; ctx: Ctx }) {
  const basics = data.basics;
  return (
    <div style={{ paddingTop: 44, paddingLeft: 48, paddingRight: 200, position: "relative", zIndex: 4 }}>
      <div
        style={{
          fontFamily: headingFamily(ctx),
          fontSize: 52,
          fontWeight: 900,
          color: INK,
          lineHeight: 0.98,
          letterSpacing: "1px",
          textTransform: "uppercase",
          // Chrome / outlined effect: white fill, faint neon stroke,
          // subtle inner shadow for the metallic feel.
          WebkitTextStroke: `1.2px ${NEON_BRIGHT}`,
          textShadow: `0 0 18px ${NEON_GLOW}, 0 2px 0 rgba(0,0,0,0.35)`,
        }}
      >
        {basics.fullName}
      </div>
      {basics.role && (
        <div
          style={{
            fontFamily: headingFamily(ctx),
            fontSize: 19,
            fontWeight: 700,
            color: NEON_BRIGHT,
            marginTop: 14,
            letterSpacing: "1.5px",
            textShadow: `0 0 8px ${NEON_GLOW}`,
          }}
        >
          {basics.role}
        </div>
      )}
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
        marginTop: 18,
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
                background: NEON,
                boxShadow: `0 0 4px ${NEON_GLOW}`,
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
                  marginBottom: i === experience.length - 1 ? 0 : 14,
                  position: "relative",
                  paddingLeft: 16,
                }}
              >
                <NeonBullet />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 12.5, color: INK }}>
                    {job.role}
                    {job.company ? ` — ${job.company}` : ""}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: NEON_BRIGHT,
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
                <NeonBullet />
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
                <NeonBullet />
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
                <NeonBullet />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 12, color: INK }}>{ed.degree}</div>
                  <div
                    style={{
                      fontSize: 10,
                      color: NEON_BRIGHT,
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
                <NeonBullet />
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

export function CyberNeonAdmin({
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
      <NeonBackdrop />
      <TechCluster />
      <OctagonBadge data={data} />

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

        {/* Sci-fi UI content panel — neon border, hex-cut top-right corner. */}
        <div
          style={{
            position: "relative",
            margin: "26px 240px 56px 48px",
            padding: "26px 28px 32px 28px",
            background: PANEL_BG,
            border: `1px solid ${NEON_DEEP}`,
            // Hex-cut corners (top-right + bottom-left) for the sci-fi UI feel
            clipPath:
              "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))",
            boxShadow: `0 0 24px ${NEON_GLOW}, inset 0 0 30px rgba(0, 240, 160, 0.05)`,
            flex: 1,
          }}
        >
          {/* Inner solid backstop so RichText readability isn't hurt by the
              global wave/hex backdrop bleeding through the panel. */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: PANEL_BG_SOLID,
              opacity: 0.55,
              clipPath:
                "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))",
              zIndex: 0,
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Body data={data} ctx={ctx} />
          </div>
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
