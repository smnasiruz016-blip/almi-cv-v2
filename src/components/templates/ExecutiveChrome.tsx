"use client";
import { type CSSProperties, type ReactNode } from "react";
import type { CVData } from "@/lib/cv-types";
import { resolveStyle, sectionLabel } from "@/lib/cv-themes";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";

// Palette sampled from source PNG — polished corporate executive.
// Royal navy gradient canvas + brushed silver/chrome accents.
const NAVY_DEEP = "#08203f";
const NAVY_MID = "#0f3163";
const NAVY_LIFT = "#1b478f";
const NAVY_LINE = "rgba(180, 210, 240, 0.10)"; // very faint vertical lines

// Chrome ribbon stops
const CHROME_HIGHLIGHT = "#eaf2fb";
const CHROME_LIGHT = "#c8d8e8";
const CHROME_MID = "#8fa6bf";
const CHROME_SHADOW = "#5a7088";
const CHROME_DEEP = "#3c4e63";

// Accent + text
const SKY = "#7fb8e0";
const SKY_BRIGHT = "#a8d2f0";
const INK = "#ffffff";
const INK_SOFT = "#cfdaea";
const INK_FAINT = "rgba(207, 218, 234, 0.65)";
const PROP_BODY = "#e6efff";
const PROP_DARK = "#16345f";

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
    backgroundColor: NAVY_DEEP,
  };
  return { headingFont: r.headingFont, bodyFont: r.bodyFont, density: r.density, densityClass, articleStyle };
}

function headingFamily(ctx: Ctx) {
  return `${ctx.headingFont.cssVar}, ${ctx.headingFont.fallback}`;
}

/** Full-bleed royal-navy gradient with faint vertical lined texture at
 *  the page edges (visible in the source PNG). */
function NavyBackdrop() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        background: `linear-gradient(165deg, ${NAVY_LIFT} 0%, ${NAVY_MID} 45%, ${NAVY_DEEP} 100%)`,
      }}
    >
      {/* Faint vertical lines at left + right edges */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `repeating-linear-gradient(90deg, ${NAVY_LINE} 0 1px, transparent 1px 14px)`,
          opacity: 0.45,
          maskImage: "linear-gradient(90deg, black 0%, transparent 12%, transparent 88%, black 100%)",
          WebkitMaskImage: "linear-gradient(90deg, black 0%, transparent 12%, transparent 88%, black 100%)",
        }}
      />
      {/* Soft glow halos */}
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -100,
          width: 380,
          height: 380,
          borderRadius: "9999px",
          background: `radial-gradient(circle, rgba(127, 184, 224, 0.18) 0%, transparent 65%)`,
          filter: "blur(14px)",
        }}
      />
    </div>
  );
}

/** Signature motif — sweeping silver brushed-steel ribbon across the
 *  middle. Multi-stop gradient stroke + thin highlight line along the
 *  top edge. */
function ChromeRibbon() {
  return (
    <svg
      viewBox={`0 0 ${PAGE_W} ${PAGE_H}`}
      preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}
      aria-hidden
    >
      <defs>
        <linearGradient id="chrome-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={CHROME_HIGHLIGHT} stopOpacity="0.95" />
          <stop offset="25%" stopColor={CHROME_LIGHT} stopOpacity="0.92" />
          <stop offset="55%" stopColor={CHROME_MID} stopOpacity="0.88" />
          <stop offset="80%" stopColor={CHROME_SHADOW} stopOpacity="0.85" />
          <stop offset="100%" stopColor={CHROME_DEEP} stopOpacity="0.75" />
        </linearGradient>
        <filter id="chrome-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>
      {/* Underglow */}
      <path
        d={`M -40 ${PAGE_H * 0.30} C ${PAGE_W * 0.25} ${PAGE_H * 0.22}, ${PAGE_W * 0.55} ${PAGE_H * 0.36}, ${PAGE_W + 40} ${PAGE_H * 0.26}`}
        stroke={CHROME_LIGHT}
        strokeWidth="56"
        fill="none"
        filter="url(#chrome-glow)"
        opacity="0.30"
      />
      {/* Main brushed-steel band */}
      <path
        d={`M -40 ${PAGE_H * 0.30} C ${PAGE_W * 0.25} ${PAGE_H * 0.22}, ${PAGE_W * 0.55} ${PAGE_H * 0.36}, ${PAGE_W + 40} ${PAGE_H * 0.26}`}
        stroke="url(#chrome-grad)"
        strokeWidth="32"
        fill="none"
        strokeLinecap="round"
        opacity="0.92"
      />
      {/* Bright highlight line riding the top edge */}
      <path
        d={`M -40 ${PAGE_H * 0.29} C ${PAGE_W * 0.25} ${PAGE_H * 0.21}, ${PAGE_W * 0.55} ${PAGE_H * 0.35}, ${PAGE_W + 40} ${PAGE_H * 0.25}`}
        stroke={CHROME_HIGHLIGHT}
        strokeWidth="1.4"
        fill="none"
        opacity="0.85"
      />
    </svg>
  );
}

/** Top-right rotated-square (diamond) photo frame with chrome border.
 *  Honors photoStyle "none" by showing a neutral chrome-bordered diamond
 *  with an inner silhouette. The diamond shape is part of the template's
 *  visual identity, not user-controllable. */
function DiamondPhoto({ data }: { data: CVData }) {
  const basics = data.basics;
  const photoStyle = data.style?.photoStyle ?? "round";
  const showPhoto = photoStyle !== "none" && !!basics.photoUrl;

  // 100x100 box, rotated 45deg. Use a clip-path to clip the photo.
  return (
    <div
      style={{
        position: "absolute",
        top: 44,
        right: 56,
        width: 150,
        height: 150,
        zIndex: 5,
        transform: "rotate(45deg)",
      }}
    >
      {/* Outer chrome ring */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, ${CHROME_HIGHLIGHT} 0%, ${CHROME_LIGHT} 35%, ${CHROME_MID} 65%, ${CHROME_SHADOW} 100%)`,
          borderRadius: 8,
          padding: 6,
          boxShadow: `0 8px 24px rgba(0,0,0,0.45), 0 0 0 1px ${CHROME_DEEP}`,
        }}
      >
        {/* Inner photo well */}
        <div
          style={{
            width: "100%",
            height: "100%",
            background: NAVY_MID,
            borderRadius: 4,
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
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: "rotate(-45deg) scale(1.42)",
                transformOrigin: "center",
              }}
            />
          ) : (
            <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden style={{ transform: "rotate(-45deg)" }}>
              <circle cx="50" cy="40" r="14" fill={CHROME_LIGHT} opacity="0.85" />
              <path
                d="M 22 90 Q 22 62 50 62 Q 78 62 78 90 Z"
                fill={CHROME_LIGHT}
                opacity="0.85"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

/** Right-column floating 3D office + travel props — desktop monitor,
 *  laptop, briefcase, papers, calendar, two commercial airplanes, blue
 *  diamond sparkles. Matches the prop cluster in the source PNG. */
function ExecProps() {
  return (
    <svg
      width="220"
      height="680"
      viewBox="0 0 220 680"
      style={{ position: "absolute", right: 18, top: 200, zIndex: 4, opacity: 0.95 }}
      aria-hidden
    >
      {/* Sparkle helpers */}
      <defs>
        <filter id="sparkle-glow-2" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
        <linearGradient id="prop-chrome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={CHROME_HIGHLIGHT} />
          <stop offset="60%" stopColor={CHROME_LIGHT} />
          <stop offset="100%" stopColor={CHROME_MID} />
        </linearGradient>
      </defs>

      {/* Desk scene cluster: monitor + laptop + briefcase + papers */}
      <g transform="translate(20, 0)">
        {/* Monitor */}
        <g stroke={CHROME_DEEP} strokeWidth="1" fill={PROP_BODY}>
          <polygon points="60,40 130,28 170,40 100,52" />
          <polygon points="60,40 60,80 100,92 100,52" />
          <polygon points="100,52 100,92 170,80 170,40" fill={PROP_DARK} />
        </g>
        <g stroke={SKY_BRIGHT} strokeWidth="0.7" opacity="0.85">
          <line x1="106" y1="60" x2="160" y2="50" />
          <line x1="106" y1="68" x2="155" y2="58" />
          <line x1="106" y1="76" x2="148" y2="66" />
        </g>
        {/* Monitor stand */}
        <polygon points="85,92 105,96 105,104 85,100" fill={CHROME_MID} stroke={CHROME_DEEP} strokeWidth="0.8" />
        <polygon points="70,105 120,112 140,105 90,98" fill={CHROME_LIGHT} stroke={CHROME_DEEP} strokeWidth="0.8" />

        {/* Briefcase to the right */}
        <g transform="translate(155, 78)">
          <rect x="0" y="6" width="38" height="24" rx="2" fill={PROP_DARK} stroke={CHROME_DEEP} strokeWidth="0.8" />
          <rect x="10" y="0" width="18" height="8" rx="1" fill="none" stroke={PROP_DARK} strokeWidth="1.2" />
          <rect x="16" y="14" width="6" height="4" fill={CHROME_LIGHT} />
        </g>

        {/* Stack of papers — top-left of cluster */}
        <g transform="translate(20, 50)">
          <rect x="0" y="6" width="34" height="40" fill={CHROME_HIGHLIGHT} stroke={CHROME_DEEP} strokeWidth="0.6" />
          <rect x="4" y="2" width="34" height="40" fill={PROP_BODY} stroke={CHROME_DEEP} strokeWidth="0.6" />
          <line x1="8" y1="10" x2="36" y2="10" stroke={CHROME_MID} strokeWidth="0.7" />
          <line x1="8" y1="16" x2="34" y2="16" stroke={CHROME_MID} strokeWidth="0.7" />
          <line x1="8" y1="22" x2="36" y2="22" stroke={CHROME_MID} strokeWidth="0.7" />
          <line x1="8" y1="28" x2="32" y2="28" stroke={CHROME_MID} strokeWidth="0.7" />
        </g>
      </g>

      {/* Diamond sparkle */}
      <g transform="translate(190, 220) rotate(45)" opacity="0.9">
        <rect x="-5" y="-5" width="10" height="10" fill={SKY_BRIGHT} filter="url(#sparkle-glow-2)" />
        <rect x="-5" y="-5" width="10" height="10" fill={SKY_BRIGHT} />
      </g>

      {/* Calendar — middle */}
      <g transform="translate(120, 250)">
        <rect x="0" y="0" width="60" height="44" rx="3" fill={PROP_BODY} stroke={CHROME_DEEP} strokeWidth="0.8" />
        <rect x="0" y="0" width="60" height="10" fill={NAVY_LIFT} />
        <line x1="8" y1="4" x2="8" y2="14" stroke={CHROME_DEEP} strokeWidth="1.4" />
        <line x1="20" y1="4" x2="20" y2="14" stroke={CHROME_DEEP} strokeWidth="1.4" />
        {/* Grid */}
        <g stroke={CHROME_MID} strokeWidth="0.5">
          <line x1="0" y1="20" x2="60" y2="20" />
          <line x1="0" y1="28" x2="60" y2="28" />
          <line x1="0" y1="36" x2="60" y2="36" />
          <line x1="12" y1="14" x2="12" y2="44" />
          <line x1="24" y1="14" x2="24" y2="44" />
          <line x1="36" y1="14" x2="36" y2="44" />
          <line x1="48" y1="14" x2="48" y2="44" />
        </g>
        {/* Highlighted cell */}
        <rect x="24" y="20" width="12" height="8" fill={SKY} opacity="0.7" />
      </g>

      {/* Diamond sparkle */}
      <g transform="translate(70, 320) rotate(45)" opacity="0.85">
        <rect x="-4" y="-4" width="8" height="8" fill={SKY_BRIGHT} filter="url(#sparkle-glow-2)" />
        <rect x="-4" y="-4" width="8" height="8" fill={SKY_BRIGHT} />
      </g>

      {/* Commercial airplane #1 — angled right-down */}
      <g transform="translate(60, 390) rotate(8)">
        {/* fuselage */}
        <ellipse cx="60" cy="0" rx="62" ry="6" fill={PROP_BODY} stroke={CHROME_DEEP} strokeWidth="0.9" />
        {/* tail fin */}
        <polygon points="2,0 12,-14 22,0" fill={PROP_BODY} stroke={CHROME_DEEP} strokeWidth="0.9" />
        {/* wings */}
        <polygon points="48,-2 56,-18 68,-18 78,-2" fill={CHROME_LIGHT} stroke={CHROME_DEEP} strokeWidth="0.9" />
        <polygon points="48,2 56,18 68,18 78,2" fill={CHROME_MID} stroke={CHROME_DEEP} strokeWidth="0.9" />
        {/* nose */}
        <ellipse cx="118" cy="0" rx="6" ry="4" fill={NAVY_LIFT} stroke={CHROME_DEEP} strokeWidth="0.7" />
        {/* windows */}
        <g fill={SKY} opacity="0.7">
          <rect x="40" y="-2" width="3" height="2" />
          <rect x="48" y="-2" width="3" height="2" />
          <rect x="56" y="-2" width="3" height="2" />
          <rect x="80" y="-2" width="3" height="2" />
          <rect x="88" y="-2" width="3" height="2" />
          <rect x="96" y="-2" width="3" height="2" />
        </g>
      </g>

      {/* Diamond sparkle */}
      <g transform="translate(180, 470) rotate(45)" opacity="0.9">
        <rect x="-5" y="-5" width="10" height="10" fill={SKY_BRIGHT} filter="url(#sparkle-glow-2)" />
        <rect x="-5" y="-5" width="10" height="10" fill={SKY_BRIGHT} />
      </g>

      {/* Commercial airplane #2 — smaller, lower */}
      <g transform="translate(80, 540) rotate(-6)">
        <ellipse cx="50" cy="0" rx="52" ry="5" fill={PROP_BODY} stroke={CHROME_DEEP} strokeWidth="0.8" />
        <polygon points="2,0 10,-12 18,0" fill={PROP_BODY} stroke={CHROME_DEEP} strokeWidth="0.8" />
        <polygon points="40,-2 46,-15 56,-15 64,-2" fill={CHROME_LIGHT} stroke={CHROME_DEEP} strokeWidth="0.8" />
        <polygon points="40,2 46,15 56,15 64,2" fill={CHROME_MID} stroke={CHROME_DEEP} strokeWidth="0.8" />
        <ellipse cx="98" cy="0" rx="5" ry="3.4" fill={NAVY_LIFT} stroke={CHROME_DEEP} strokeWidth="0.6" />
        <g fill={SKY} opacity="0.7">
          <rect x="34" y="-1.5" width="2.5" height="1.5" />
          <rect x="42" y="-1.5" width="2.5" height="1.5" />
          <rect x="50" y="-1.5" width="2.5" height="1.5" />
          <rect x="68" y="-1.5" width="2.5" height="1.5" />
          <rect x="76" y="-1.5" width="2.5" height="1.5" />
          <rect x="84" y="-1.5" width="2.5" height="1.5" />
        </g>
      </g>

      {/* Diamond sparkle */}
      <g transform="translate(40, 620) rotate(45)" opacity="0.8">
        <rect x="-4" y="-4" width="8" height="8" fill={SKY_BRIGHT} filter="url(#sparkle-glow-2)" />
        <rect x="-4" y="-4" width="8" height="8" fill={SKY_BRIGHT} />
      </g>
    </svg>
  );
}

/** Banner-shaped section label (parallelogram with chrome border) —
 *  the distinctive section-title device from the source PNG. */
function BannerSectionTitle({ ctx, title }: { ctx: Ctx; title: ReactNode }) {
  return (
    <div style={{ marginTop: 22, position: "relative", display: "inline-block" }}>
      {/* Background banner: parallelogram via clip-path */}
      <div
        style={{
          position: "relative",
          display: "inline-block",
          padding: "6px 22px 7px 16px",
          background: `linear-gradient(180deg, ${NAVY_LIFT} 0%, ${NAVY_MID} 100%)`,
          // Parallelogram: straight left, slanted right
          clipPath: "polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)",
          border: `1px solid ${CHROME_LIGHT}`,
          boxShadow: `0 0 0 1px ${CHROME_DEEP}, inset 0 1px 0 ${CHROME_HIGHLIGHT}`,
        }}
      >
        <span
          style={{
            fontFamily: headingFamily(ctx),
            fontSize: 13,
            fontWeight: 800,
            color: INK,
            letterSpacing: "3px",
            textTransform: "uppercase",
            textShadow: `0 1px 1px rgba(0,0,0,0.5)`,
          }}
        >
          {title}
        </span>
      </div>
    </div>
  );
}

function ChromeBullet() {
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        left: 0,
        top: 8,
        width: 5,
        height: 5,
        background: `linear-gradient(135deg, ${CHROME_HIGHLIGHT}, ${CHROME_MID})`,
        borderRadius: "9999px",
        boxShadow: `0 0 4px rgba(168, 210, 240, 0.6)`,
      }}
    />
  );
}

function Hero({ data, ctx }: { data: CVData; ctx: Ctx }) {
  const basics = data.basics;
  return (
    <div
      style={{
        padding: "60px 240px 0 56px",
        position: "relative",
        zIndex: 6,
      }}
    >
      <div
        style={{
          fontFamily: headingFamily(ctx),
          fontSize: 50,
          fontWeight: 900,
          color: INK,
          lineHeight: 0.98,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          textShadow: `0 2px 4px rgba(0,0,0,0.45)`,
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
            color: SKY_BRIGHT,
            marginTop: 14,
            letterSpacing: "0.8px",
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
                background: SKY_BRIGHT,
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
          <BannerSectionTitle ctx={ctx} title={sectionLabel(data, "experience", "EXPERIENCE")} />
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
                <ChromeBullet />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 12.5, color: INK }}>
                    {job.role}
                    {job.company ? ` — ${job.company}` : ""}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: SKY_BRIGHT,
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
          <BannerSectionTitle ctx={ctx} title={sectionLabel(data, "skills", "SKILLS")} />
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
                <ChromeBullet />
                {s}
              </div>
            ))}
          </div>
        </div>
      )}

      {certifications && certifications.length > 0 && (
        <div>
          <BannerSectionTitle ctx={ctx} title={sectionLabel(data, "certifications", "CERTIFICATIONS")} />
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
                <ChromeBullet />
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
          <BannerSectionTitle ctx={ctx} title={sectionLabel(data, "education", "EDUCATION")} />
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
                <ChromeBullet />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 12, color: INK }}>{ed.degree}</div>
                  <div
                    style={{
                      fontSize: 10,
                      color: SKY_BRIGHT,
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
          <BannerSectionTitle ctx={ctx} title={sectionLabel(data, "awards", "AWARDS")} />
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
                <ChromeBullet />
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

export function ExecutiveChrome({
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
      <NavyBackdrop />
      <ChromeRibbon />
      <DiamondPhoto data={data} />
      <ExecProps />

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

        {/* Content column on the LEFT — props occupy the right ~28% */}
        <div
          style={{
            position: "relative",
            margin: "32px 240px 56px 56px",
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
