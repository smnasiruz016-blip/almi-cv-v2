"use client";
import { type CSSProperties, type ReactNode } from "react";
import type { CVData } from "@/lib/cv-types";
import { resolveStyle, sectionLabel } from "@/lib/cv-themes";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";

// Palette sampled from source PNG — vintage luxury maison / hotel
// concierge aesthetic. Deep wine canvas + ornate gold accents +
// cream/champagne typography.
const WINE_DEEP = "#3a0e12";
const WINE_MID = "#5a1a1f";
const WINE_LIFT = "#7a262c";
const WINE_GLOW = "rgba(255, 180, 130, 0.10)";

// Gold + champagne stops
const GOLD = "#c69847";
const GOLD_LIGHT = "#e6c478";
const GOLD_DEEP = "#8a6422";
const GOLD_GLOW = "rgba(230, 196, 120, 0.45)";

// Cream / text
const CREAM = "#f5e1bc";
const CREAM_SOFT = "#e8d4a8";
const INK = "#ffffff";
const INK_SOFT = "#ead9c2";
const INK_FAINT = "rgba(234, 217, 194, 0.65)";

// Prop palette
const BRASS = "#b88a3a";
const BRASS_LIGHT = "#d8a85a";
const LEATHER = "#6a3220";
const LEATHER_LIGHT = "#8a4a30";
const LINEN = "#e8d4a8";
const ROSE_RED = "#a02030";
const ROSE_DEEP = "#6a1018";
const STEM = "#4a6038";

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
    backgroundColor: WINE_DEEP,
  };
  return { headingFont: r.headingFont, bodyFont: r.bodyFont, density: r.density, densityClass, articleStyle };
}

function headingFamily(ctx: Ctx) {
  return `${ctx.headingFont.cssVar}, ${ctx.headingFont.fallback}`;
}

/** Full-bleed wine gradient with subtle warm halos. */
function WineBackdrop() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        background: `radial-gradient(120% 90% at 40% 30%, ${WINE_LIFT} 0%, ${WINE_MID} 45%, ${WINE_DEEP} 100%)`,
      }}
    >
      {/* Warm halo top-right (where the photo + filigree live) */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -80,
          width: 360,
          height: 360,
          borderRadius: "9999px",
          background: `radial-gradient(circle, ${WINE_GLOW} 0%, transparent 65%)`,
          filter: "blur(14px)",
        }}
      />
      {/* Faint thin gold ruled border around the page */}
      <div
        style={{
          position: "absolute",
          inset: 22,
          border: `1px solid ${GOLD_DEEP}`,
          opacity: 0.35,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 28,
          border: `1px solid ${GOLD_DEEP}`,
          opacity: 0.18,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

/** Ornate gold filigree circular photo frame — top-right of hero.
 *  Built from layered scrollwork SVG: outer laurel ring + inner gold
 *  border + photo well. Honors photoStyle "none" with a cream silhouette. */
function FiligreePhoto({ data }: { data: CVData }) {
  const basics = data.basics;
  const photoStyle = data.style?.photoStyle ?? "round";
  const showPhoto = photoStyle !== "none" && !!basics.photoUrl;

  // Build a 24-petal laurel pattern around the photo
  const petals: ReactNode[] = [];
  for (let i = 0; i < 24; i++) {
    const angle = (i * 360) / 24;
    petals.push(
      <g key={i} transform={`rotate(${angle} 100 100)`}>
        {/* Outer petal */}
        <ellipse cx="100" cy="14" rx="3" ry="8" fill={GOLD} opacity="0.95" />
        <ellipse cx="100" cy="13" rx="1.4" ry="5" fill={GOLD_LIGHT} opacity="0.85" />
      </g>,
    );
  }
  // Eight small scrollwork dots between petals
  const dots: ReactNode[] = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i * 360) / 8 + 22.5;
    dots.push(
      <g key={i} transform={`rotate(${angle} 100 100)`}>
        <circle cx="100" cy="22" r="2.4" fill={GOLD_LIGHT} />
        <circle cx="100" cy="22" r="1.0" fill={GOLD_DEEP} />
      </g>,
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        top: 36,
        right: 48,
        width: 160,
        height: 160,
        zIndex: 5,
      }}
    >
      <svg viewBox="0 0 200 200" width="100%" height="100%" aria-hidden>
        <defs>
          <filter id="filigree-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
          <clipPath id="photo-clip-circle">
            <circle cx="100" cy="100" r="58" />
          </clipPath>
          <radialGradient id="filigree-fill">
            <stop offset="0%" stopColor={GOLD_LIGHT} />
            <stop offset="100%" stopColor={GOLD_DEEP} />
          </radialGradient>
        </defs>

        {/* Outer glow */}
        <circle
          cx="100"
          cy="100"
          r="78"
          fill="none"
          stroke={GOLD}
          strokeWidth="1.4"
          opacity="0.6"
          filter="url(#filigree-glow)"
        />

        {/* Decorative laurel petals */}
        {petals}
        {dots}

        {/* Inner gold ring */}
        <circle cx="100" cy="100" r="64" fill="none" stroke="url(#filigree-fill)" strokeWidth="4" />
        <circle cx="100" cy="100" r="60" fill="none" stroke={GOLD_DEEP} strokeWidth="0.8" opacity="0.7" />

        {/* Photo well */}
        <circle cx="100" cy="100" r="58" fill={WINE_MID} />
        <g clipPath="url(#photo-clip-circle)">
          {showPhoto ? (
            <image
              href={basics.photoUrl}
              x="42"
              y="42"
              width="116"
              height="116"
              preserveAspectRatio="xMidYMid slice"
            />
          ) : (
            <>
              <circle cx="100" cy="100" r="58" fill={WINE_MID} />
              <circle cx="100" cy="88" r="15" fill={CREAM_SOFT} opacity="0.85" />
              <path
                d="M 70 158 Q 70 124 100 124 Q 130 124 130 158 Z"
                fill={CREAM_SOFT}
                opacity="0.85"
              />
            </>
          )}
        </g>
      </svg>
    </div>
  );
}

/** Bottom-half maison prop scene — vintage hospitality items.
 *  Stylized SVG redraws of the photographic items in the source PNG:
 *  brass rotary telephone, leather suitcase, wine bottle, roses,
 *  envelope, fountain pen. Vibe-mode (not photoreal). */
function MaisonProps() {
  return (
    <svg
      width={PAGE_W}
      height="540"
      viewBox={`0 0 ${PAGE_W} 540`}
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: 2,
        opacity: 0.95,
        pointerEvents: "none",
      }}
      aria-hidden
    >
      <defs>
        <linearGradient id="brass-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={BRASS_LIGHT} />
          <stop offset="60%" stopColor={BRASS} />
          <stop offset="100%" stopColor={GOLD_DEEP} />
        </linearGradient>
        <linearGradient id="leather-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={LEATHER_LIGHT} />
          <stop offset="100%" stopColor={LEATHER} />
        </linearGradient>
        <linearGradient id="wine-bottle-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={WINE_MID} />
          <stop offset="40%" stopColor={WINE_LIFT} />
          <stop offset="60%" stopColor={WINE_MID} />
          <stop offset="100%" stopColor={WINE_DEEP} />
        </linearGradient>
      </defs>

      {/* Soft cream desk surface fade at the bottom */}
      <rect x="0" y="320" width={PAGE_W} height="220" fill={LINEN} opacity="0.06" />

      {/* Leather suitcase — far left */}
      <g transform="translate(36, 360)">
        <rect x="0" y="20" width="120" height="80" rx="6" fill="url(#leather-grad)" stroke={LEATHER} strokeWidth="1.2" />
        {/* Strap */}
        <rect x="0" y="40" width="120" height="6" fill={LEATHER} opacity="0.7" />
        <rect x="0" y="76" width="120" height="6" fill={LEATHER} opacity="0.7" />
        {/* Handle */}
        <path d="M 46 20 Q 46 4 60 4 Q 74 4 74 20" fill="none" stroke={LEATHER} strokeWidth="3" />
        {/* Buckle highlights */}
        <rect x="10" y="42" width="6" height="2" fill={BRASS_LIGHT} />
        <rect x="10" y="78" width="6" height="2" fill={BRASS_LIGHT} />
        <rect x="104" y="42" width="6" height="2" fill={BRASS_LIGHT} />
        <rect x="104" y="78" width="6" height="2" fill={BRASS_LIGHT} />
        {/* Travel sticker */}
        <circle cx="60" cy="60" r="14" fill={CREAM} opacity="0.7" />
        <circle cx="60" cy="60" r="10" fill="none" stroke={ROSE_RED} strokeWidth="1" opacity="0.7" />
      </g>

      {/* Rotary telephone — mid-left, sitting on a small reflective surface */}
      <g transform="translate(190, 380)">
        {/* Base */}
        <ellipse cx="60" cy="76" rx="60" ry="14" fill="url(#brass-grad)" stroke={GOLD_DEEP} strokeWidth="1" />
        <ellipse cx="60" cy="76" rx="60" ry="14" fill="none" stroke={BRASS_LIGHT} strokeWidth="0.8" />
        {/* Rotary dial */}
        <circle cx="60" cy="70" r="22" fill={BRASS} stroke={GOLD_DEEP} strokeWidth="1" />
        <circle cx="60" cy="70" r="15" fill={WINE_MID} stroke={GOLD_DEEP} strokeWidth="0.8" />
        {/* Finger holes */}
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i * 360) / 10 - 90;
          const x = 60 + 18 * Math.cos((a * Math.PI) / 180);
          const y = 70 + 18 * Math.sin((a * Math.PI) / 180);
          return <circle key={i} cx={x} cy={y} r="1.8" fill={WINE_DEEP} />;
        })}
        {/* Handset cradle posts */}
        <rect x="6" y="40" width="6" height="36" fill={BRASS} stroke={GOLD_DEEP} strokeWidth="0.8" />
        <rect x="108" y="40" width="6" height="36" fill={BRASS} stroke={GOLD_DEEP} strokeWidth="0.8" />
        {/* Handset */}
        <path
          d="M 6 40 Q 6 24 24 22 L 96 22 Q 114 24 114 40 L 102 40 Q 102 36 96 36 L 24 36 Q 18 36 18 40 Z"
          fill="url(#brass-grad)"
          stroke={GOLD_DEEP}
          strokeWidth="1"
        />
        {/* Earpiece highlight */}
        <ellipse cx="18" cy="29" rx="6" ry="3" fill={BRASS_LIGHT} opacity="0.8" />
        <ellipse cx="102" cy="29" rx="6" ry="3" fill={BRASS_LIGHT} opacity="0.8" />
      </g>

      {/* Roses bouquet — mid */}
      <g transform="translate(340, 390)">
        {/* Vase / wrap */}
        <path d="M 36 76 Q 30 100 60 102 Q 90 100 84 76 Z" fill={LEATHER} stroke={LEATHER_LIGHT} strokeWidth="0.8" />
        <path d="M 36 76 L 84 76" stroke={BRASS} strokeWidth="1" />
        {/* Stems */}
        <line x1="48" y1="76" x2="40" y2="48" stroke={STEM} strokeWidth="1.4" />
        <line x1="60" y1="76" x2="60" y2="40" stroke={STEM} strokeWidth="1.4" />
        <line x1="72" y1="76" x2="80" y2="48" stroke={STEM} strokeWidth="1.4" />
        {/* Roses */}
        <g>
          <circle cx="40" cy="42" r="12" fill={ROSE_RED} />
          <circle cx="40" cy="42" r="7" fill={ROSE_DEEP} opacity="0.6" />
          <circle cx="38" cy="40" r="3" fill={ROSE_RED} />
        </g>
        <g>
          <circle cx="60" cy="36" r="14" fill={ROSE_RED} />
          <circle cx="60" cy="36" r="8" fill={ROSE_DEEP} opacity="0.6" />
          <circle cx="58" cy="34" r="3" fill={ROSE_RED} />
        </g>
        <g>
          <circle cx="80" cy="42" r="12" fill={ROSE_RED} />
          <circle cx="80" cy="42" r="7" fill={ROSE_DEEP} opacity="0.6" />
          <circle cx="78" cy="40" r="3" fill={ROSE_RED} />
        </g>
        {/* Leaves */}
        <ellipse cx="32" cy="58" rx="6" ry="3" fill={STEM} transform="rotate(-20 32 58)" />
        <ellipse cx="88" cy="58" rx="6" ry="3" fill={STEM} transform="rotate(20 88 58)" />
      </g>

      {/* Envelope + wax seal — mid-right */}
      <g transform="translate(460, 410)">
        <rect x="0" y="0" width="110" height="70" fill={CREAM} stroke={GOLD_DEEP} strokeWidth="0.8" />
        <path d="M 0 0 L 55 38 L 110 0" fill="none" stroke={GOLD_DEEP} strokeWidth="1" />
        {/* Wax seal */}
        <circle cx="55" cy="48" r="9" fill={ROSE_RED} stroke={ROSE_DEEP} strokeWidth="0.8" />
        <text x="55" y="52" textAnchor="middle" fontSize="9" fill={GOLD_LIGHT} fontWeight="bold">M</text>
        {/* Ribbon */}
        <rect x="36" y="6" width="38" height="3" fill={ROSE_RED} opacity="0.7" />
      </g>

      {/* Wine bottle — right */}
      <g transform="translate(600, 350)">
        {/* Neck */}
        <rect x="22" y="0" width="10" height="20" fill="url(#wine-bottle-grad)" stroke={WINE_DEEP} strokeWidth="0.8" />
        {/* Shoulder */}
        <path d="M 22 20 Q 12 30 12 44 L 12 132 Q 12 142 22 142 L 32 142 Q 42 142 42 132 L 42 44 Q 42 30 32 20 Z" fill="url(#wine-bottle-grad)" stroke={WINE_DEEP} strokeWidth="1" />
        {/* Foil */}
        <rect x="22" y="0" width="10" height="20" fill={GOLD_DEEP} />
        {/* Label */}
        <rect x="14" y="64" width="26" height="50" fill={CREAM} stroke={GOLD_DEEP} strokeWidth="0.7" />
        <rect x="14" y="64" width="26" height="6" fill={WINE_DEEP} />
        <text x="27" y="86" textAnchor="middle" fontSize="6" fill={WINE_DEEP} fontWeight="bold">MAISON</text>
        <text x="27" y="98" textAnchor="middle" fontSize="5" fill={WINE_DEEP}>RÉSERVE</text>
        <line x1="18" y1="104" x2="36" y2="104" stroke={GOLD_DEEP} strokeWidth="0.5" />
        <text x="27" y="112" textAnchor="middle" fontSize="4.5" fill={WINE_DEEP}>2019</text>
        {/* Reflection highlight */}
        <rect x="16" y="44" width="2" height="80" fill={CREAM_SOFT} opacity="0.5" />
      </g>

      {/* Fountain pen — far right, angled */}
      <g transform="translate(680, 460) rotate(28)">
        {/* Barrel */}
        <rect x="0" y="0" width="84" height="10" rx="5" fill={WINE_DEEP} stroke={GOLD_DEEP} strokeWidth="0.8" />
        {/* Gold clip */}
        <rect x="32" y="-2" width="3" height="14" fill={GOLD} />
        <circle cx="33.5" cy="-3" r="2" fill={GOLD_LIGHT} />
        {/* Cap ring */}
        <rect x="50" y="-1" width="6" height="12" fill={GOLD} stroke={GOLD_DEEP} strokeWidth="0.6" />
        {/* Nib */}
        <polygon points="84,2 96,5 84,8" fill={GOLD_LIGHT} stroke={GOLD_DEEP} strokeWidth="0.6" />
        <line x1="86" y1="5" x2="94" y2="5" stroke={GOLD_DEEP} strokeWidth="0.4" />
      </g>

      {/* Faint scattered floor reflection — adds the "lobby" feel */}
      <ellipse cx="100" cy="510" rx="60" ry="6" fill={LEATHER} opacity="0.18" />
      <ellipse cx="280" cy="510" rx="80" ry="8" fill={BRASS} opacity="0.18" />
      <ellipse cx="490" cy="510" rx="60" ry="6" fill={CREAM} opacity="0.10" />
      <ellipse cx="660" cy="510" rx="80" ry="8" fill={WINE_DEEP} opacity="0.30" />
    </svg>
  );
}

/** Cream uppercase section heading with a thin gold underline rule. */
function SectionTitle({ ctx, title }: { ctx: Ctx; title: ReactNode }) {
  return (
    <div style={{ marginTop: 22 }}>
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
          width: "62%",
          background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD_DEEP} 60%, transparent 100%)`,
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
        boxShadow: `0 0 4px ${GOLD_GLOW}`,
      }}
    />
  );
}

function Hero({ data, ctx }: { data: CVData; ctx: Ctx }) {
  const basics = data.basics;
  return (
    <div
      style={{
        padding: "56px 220px 0 56px",
        position: "relative",
        zIndex: 6,
      }}
    >
      <div
        style={{
          fontFamily: headingFamily(ctx),
          fontSize: 48,
          fontWeight: 900,
          color: CREAM,
          lineHeight: 0.98,
          letterSpacing: "1px",
          textTransform: "uppercase",
          textShadow: `0 2px 6px rgba(0,0,0,0.55)`,
        }}
      >
        {basics.fullName}
      </div>
      {basics.role && (
        <div
          style={{
            fontFamily: headingFamily(ctx),
            fontSize: 18,
            fontWeight: 500,
            color: GOLD_LIGHT,
            marginTop: 12,
            letterSpacing: "1.2px",
            fontStyle: "italic",
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
        marginTop: 10,
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
                background: GOLD_LIGHT,
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
                      color: GOLD_LIGHT,
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
                      color: GOLD_LIGHT,
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

export function BurgundyMaisonEA({
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
      <WineBackdrop />
      <FiligreePhoto data={data} />

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

        {/* Content sits in the upper half so the prop scene below has
            visual breathing room. Side margins kept generous to keep
            the page feeling maison-quiet rather than cramped. */}
        <div
          style={{
            position: "relative",
            margin: "28px 56px 360px 56px",
            zIndex: 11,
          }}
        >
          <Body data={data} ctx={ctx} />
        </div>
      </div>

      {/* Prop scene rendered LAST so it sits above the gradient backdrop
          but below the content + filigree (via z-index). */}
      <MaisonProps />
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
