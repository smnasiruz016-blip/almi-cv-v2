"use client";
import { type CSSProperties, type ReactNode } from "react";
import type { CVData } from "@/lib/cv-types";
import { resolveStyle, sectionLabel } from "@/lib/cv-themes";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";

// Palette sampled from 3.png — warm amber neon on near-black canvas.
const PAGE_BG = "#0a0e1a";
const PAGE_BG_DEEP = "#04060f";
const PANEL_BG = "rgba(12, 18, 32, 0.78)";
const PANEL_BG_SOLID = "#0a1020";
const AMBER = "#ff8c2a";
const AMBER_BRIGHT = "#ffaa44";
const AMBER_DEEP = "rgba(255, 140, 42, 0.55)";
const AMBER_FAINT = "rgba(255, 140, 42, 0.18)";
const AMBER_GLOW = "rgba(255, 140, 42, 0.45)";
const INK = "#fff4e6";
const INK_SOFT = "#d8c8b4";
const INK_FAINT = "rgba(216, 200, 180, 0.62)";

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

/** Full-bleed dark backdrop with subtle amber glow halos. */
function AmberBackdrop() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        background: `radial-gradient(120% 90% at 70% 40%, ${PAGE_BG} 0%, ${PAGE_BG_DEEP} 100%)`,
      }}
    >
      {/* Hex-mesh top-right edge (mirror of cyber-neon's top-left) */}
      <HexMesh />
    </div>
  );
}

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
      const opacity = Math.max(0, 0.40 - row * 0.05 - col * 0.04);
      cells.push(
        <polygon
          key={`${row}-${col}`}
          points={hex(x, y, r)}
          fill="none"
          stroke={AMBER}
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
      style={{ position: "absolute", top: -20, right: -20, opacity: 0.7, transform: "scaleX(-1)" }}
      aria-hidden
    >
      {cells}
    </svg>
  );
}

/** Sweeping diagonal amber light streaks across the middle. Identical
 *  geometry to cyber-neon's NeonWaves but recolored — the source PNG
 *  treats these as a sibling-template signature. */
function AmberWaves() {
  return (
    <svg
      viewBox={`0 0 ${PAGE_W} ${PAGE_H}`}
      preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}
      aria-hidden
    >
      <defs>
        <linearGradient id="amber-wave-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={AMBER} stopOpacity="0" />
          <stop offset="40%" stopColor={AMBER_BRIGHT} stopOpacity="0.92" />
          <stop offset="100%" stopColor={AMBER} stopOpacity="0" />
        </linearGradient>
        <filter id="amber-wave-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      <g filter="url(#amber-wave-glow)" opacity="0.7">
        <path
          d={`M -50 ${PAGE_H * 0.34} C ${PAGE_W * 0.30} ${PAGE_H * 0.20}, ${PAGE_W * 0.55} ${PAGE_H * 0.50}, ${PAGE_W + 50} ${PAGE_H * 0.32}`}
          stroke="url(#amber-wave-grad)"
          strokeWidth="22"
          fill="none"
        />
        <path
          d={`M -50 ${PAGE_H * 0.50} C ${PAGE_W * 0.40} ${PAGE_H * 0.36}, ${PAGE_W * 0.62} ${PAGE_H * 0.66}, ${PAGE_W + 50} ${PAGE_H * 0.46}`}
          stroke="url(#amber-wave-grad)"
          strokeWidth="14"
          fill="none"
        />
        <path
          d={`M -50 ${PAGE_H * 0.42} C ${PAGE_W * 0.35} ${PAGE_H * 0.28}, ${PAGE_W * 0.58} ${PAGE_H * 0.58}, ${PAGE_W + 50} ${PAGE_H * 0.40}`}
          stroke="url(#amber-wave-grad)"
          strokeWidth="6"
          fill="none"
          opacity="0.6"
        />
      </g>
      <g opacity="0.95">
        <path
          d={`M -50 ${PAGE_H * 0.34} C ${PAGE_W * 0.30} ${PAGE_H * 0.20}, ${PAGE_W * 0.55} ${PAGE_H * 0.50}, ${PAGE_W + 50} ${PAGE_H * 0.32}`}
          stroke="url(#amber-wave-grad)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d={`M -50 ${PAGE_H * 0.50} C ${PAGE_W * 0.40} ${PAGE_H * 0.36}, ${PAGE_W * 0.62} ${PAGE_H * 0.66}, ${PAGE_W + 50} ${PAGE_H * 0.46}`}
          stroke="url(#amber-wave-grad)"
          strokeWidth="1.6"
          fill="none"
        />
      </g>
    </svg>
  );
}

/** Right-column cluster of small tech panels (server racks, terminal,
 *  data display, circuit nodes) — matches the dense panel grid on the
 *  right of 3.png. */
function TechPanelCluster() {
  return (
    <svg
      width="260"
      height="640"
      viewBox="0 0 260 640"
      style={{ position: "absolute", right: 14, top: 200, zIndex: 4, opacity: 0.92 }}
      aria-hidden
    >
      {/* Server rack — top */}
      <g stroke={AMBER} strokeWidth="1" fill="none">
        <rect x="60" y="20" width="160" height="74" rx="4" />
        <line x1="60" y1="34" x2="220" y2="34" />
        <line x1="60" y1="48" x2="220" y2="48" />
        <line x1="60" y1="62" x2="220" y2="62" />
        <line x1="60" y1="76" x2="220" y2="76" />
        {/* status dots */}
        <circle cx="70" cy="27" r="2" fill={AMBER_BRIGHT} />
        <circle cx="78" cy="27" r="2" fill={AMBER_BRIGHT} opacity="0.6" />
        <circle cx="70" cy="41" r="2" fill={AMBER_BRIGHT} />
        <circle cx="70" cy="55" r="2" fill={AMBER_BRIGHT} opacity="0.6" />
        <circle cx="70" cy="69" r="2" fill={AMBER_BRIGHT} />
        <circle cx="70" cy="83" r="2" fill={AMBER_BRIGHT} opacity="0.6" />
        {/* bar fills */}
        <rect x="100" y="24" width="60" height="6" fill={AMBER_FAINT} />
        <rect x="100" y="38" width="80" height="6" fill={AMBER_FAINT} />
        <rect x="100" y="52" width="50" height="6" fill={AMBER_FAINT} />
        <rect x="100" y="66" width="70" height="6" fill={AMBER_FAINT} />
        <rect x="100" y="80" width="40" height="6" fill={AMBER_FAINT} />
      </g>

      {/* Network node graph — middle */}
      <g stroke={AMBER} strokeWidth="1" fill="none" opacity="0.95">
        <circle cx="80" cy="160" r="6" fill={AMBER_FAINT} />
        <circle cx="180" cy="140" r="6" fill={AMBER_FAINT} />
        <circle cx="140" cy="210" r="6" fill={AMBER_FAINT} />
        <circle cx="70" cy="240" r="6" fill={AMBER_FAINT} />
        <circle cx="210" cy="220" r="6" fill={AMBER_FAINT} />
        <line x1="80" y1="160" x2="180" y2="140" />
        <line x1="80" y1="160" x2="140" y2="210" />
        <line x1="180" y1="140" x2="140" y2="210" />
        <line x1="140" y1="210" x2="70" y2="240" />
        <line x1="140" y1="210" x2="210" y2="220" />
      </g>

      {/* Terminal panel */}
      <g stroke={AMBER} strokeWidth="0.9" opacity="0.92">
        <rect x="60" y="290" width="170" height="92" rx="4" fill="none" />
        <line x1="60" y1="306" x2="230" y2="306" />
        <line x1="70" y1="320" x2="170" y2="320" />
        <line x1="70" y1="332" x2="200" y2="332" />
        <line x1="70" y1="344" x2="140" y2="344" />
        <line x1="70" y1="356" x2="190" y2="356" />
        <line x1="70" y1="368" x2="160" y2="368" />
        {/* cursor */}
        <rect x="160" y="364" width="6" height="8" fill={AMBER_BRIGHT} />
      </g>

      {/* Data bar chart panel */}
      <g stroke={AMBER} strokeWidth="0.9" fill="none" opacity="0.92">
        <rect x="60" y="406" width="170" height="76" rx="4" />
        <line x1="60" y1="470" x2="230" y2="470" />
        <rect x="76" y="442" width="14" height="28" fill={AMBER_FAINT} stroke={AMBER} />
        <rect x="96" y="430" width="14" height="40" fill={AMBER_FAINT} stroke={AMBER} />
        <rect x="116" y="450" width="14" height="20" fill={AMBER_FAINT} stroke={AMBER} />
        <rect x="136" y="424" width="14" height="46" fill={AMBER_FAINT} stroke={AMBER} />
        <rect x="156" y="438" width="14" height="32" fill={AMBER_FAINT} stroke={AMBER} />
        <rect x="176" y="446" width="14" height="24" fill={AMBER_FAINT} stroke={AMBER} />
        <rect x="196" y="436" width="14" height="34" fill={AMBER_FAINT} stroke={AMBER} />
      </g>

      {/* Floating wireframe cubes — bottom */}
      <g stroke={AMBER_BRIGHT} strokeWidth="1" fill="none" opacity="0.9">
        <polygon points="70,520 100,508 130,520 100,532" />
        <polygon points="70,520 70,548 100,560 100,532" />
        <polygon points="100,532 100,560 130,548 130,520" />
      </g>
      <g stroke={AMBER} strokeWidth="0.9" fill="none" opacity="0.8">
        <polygon points="170,540 200,528 230,540 200,552" />
        <polygon points="170,540 170,568 200,580 200,552" />
        <polygon points="200,552 200,580 230,568 230,540" />
      </g>
    </svg>
  );
}

/** Top-LEFT neon octagon — mirror of cyber-neon's top-right placement.
 *  Per the 3.png reference the badge sits next to the name horizontally
 *  instead of being a corner ornament. */
function OctagonBadge({ data }: { data: CVData }) {
  const basics = data.basics;
  const photoStyle = data.style?.photoStyle ?? "round";
  const showPhoto = photoStyle !== "none" && !!basics.photoUrl;

  const octPoints = "29,4 71,4 96,29 96,71 71,96 29,96 4,71 4,29";

  return (
    <div
      style={{
        width: 130,
        height: 130,
        flexShrink: 0,
        position: "relative",
      }}
    >
      <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden>
        <defs>
          <filter id="amber-oct-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.6" />
          </filter>
          <clipPath id="amber-oct-clip">
            <polygon points={octPoints} />
          </clipPath>
        </defs>
        {/* Outer glow */}
        <polygon
          points={octPoints}
          fill="none"
          stroke={AMBER}
          strokeWidth="3.5"
          filter="url(#amber-oct-glow)"
          opacity="0.9"
        />
        {/* Frame */}
        <polygon
          points={octPoints}
          fill={PAGE_BG_DEEP}
          stroke={AMBER_BRIGHT}
          strokeWidth="1.4"
        />
        {/* Inner ring */}
        <polygon
          points="40,17 60,17 75,32 75,68 60,83 40,83 25,68 25,32"
          fill="none"
          stroke={AMBER}
          strokeWidth="0.8"
          opacity="0.55"
        />
        <g clipPath="url(#amber-oct-clip)">
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
              {/* Stylized amber avatar silhouette */}
              <circle cx="50" cy="40" r="11" fill={AMBER_FAINT} stroke={AMBER} strokeWidth="0.8" />
              <path
                d="M 28 78 Q 28 60 50 60 Q 72 60 72 78 Z"
                fill={AMBER_FAINT}
                stroke={AMBER}
                strokeWidth="0.8"
              />
            </>
          )}
        </g>
      </svg>
    </div>
  );
}

/** Chevron-prefixed section title — the distinctive signature of 3.png
 *  ("▶ EXPERIENCE", "▶ SKILLS", "▶ EDUCATION"). */
function SectionTitle({
  ctx,
  title,
}: {
  ctx: Ctx;
  title: ReactNode;
}) {
  return (
    <div style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 10 }}>
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
        <polygon
          points="2,2 12,7 2,12"
          fill={AMBER}
          style={{ filter: `drop-shadow(0 0 4px ${AMBER_GLOW})` }}
        />
      </svg>
      <div
        style={{
          fontFamily: headingFamily(ctx),
          fontSize: 17,
          fontWeight: 800,
          color: AMBER_BRIGHT,
          letterSpacing: "3.5px",
          textTransform: "uppercase",
          textShadow: `0 0 12px ${AMBER_GLOW}`,
        }}
      >
        {title}
      </div>
    </div>
  );
}

function AmberBullet() {
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        left: 0,
        top: 8,
        width: 5,
        height: 5,
        background: AMBER,
        borderRadius: "9999px",
        boxShadow: `0 0 6px ${AMBER_GLOW}`,
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
        gap: 24,
        padding: "44px 56px 0 48px",
        position: "relative",
        zIndex: 6,
      }}
    >
      <OctagonBadge data={data} />
      <div style={{ flex: 1, minWidth: 0, textAlign: "right" }}>
        <div
          style={{
            fontFamily: headingFamily(ctx),
            fontSize: 52,
            fontWeight: 900,
            color: INK,
            lineHeight: 0.98,
            letterSpacing: "1px",
            textTransform: "uppercase",
            WebkitTextStroke: `1.2px ${AMBER_BRIGHT}`,
            textShadow: `0 0 18px ${AMBER_GLOW}, 0 2px 0 rgba(0,0,0,0.4)`,
          }}
        >
          {basics.fullName}
        </div>
        {basics.role && (
          <div
            style={{
              fontFamily: headingFamily(ctx),
              fontSize: 19,
              fontWeight: 600,
              color: INK,
              marginTop: 12,
              letterSpacing: "1.2px",
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
        marginTop: 14,
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
                background: AMBER,
                boxShadow: `0 0 4px ${AMBER_GLOW}`,
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
                <AmberBullet />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 12.5, color: INK }}>
                    {job.role}
                    {job.company ? ` — ${job.company}` : ""}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: AMBER_BRIGHT,
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
                <AmberBullet />
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
                <AmberBullet />
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
                <AmberBullet />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 12, color: INK }}>{ed.degree}</div>
                  <div
                    style={{
                      fontSize: 10,
                      color: AMBER_BRIGHT,
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
                <AmberBullet />
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

export function AmberCyberAdmin({
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
      <AmberBackdrop />
      <AmberWaves />
      <TechPanelCluster />

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

        {/* Sci-fi UI content panel — neon border, hex-cut top-right corner.
            Content column is LEFT (~58%) with the tech-panel cluster
            occupying the right ~42%; mirror of cyber-neon-admin's layout. */}
        <div
          style={{
            position: "relative",
            margin: "26px 290px 56px 48px",
            padding: "26px 28px 32px 28px",
            background: PANEL_BG,
            border: `1px solid ${AMBER_DEEP}`,
            clipPath:
              "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))",
            boxShadow: `0 0 24px ${AMBER_GLOW}, inset 0 0 30px rgba(255,140,42,0.05)`,
            flex: 1,
          }}
        >
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
