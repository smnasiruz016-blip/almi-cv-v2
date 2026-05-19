"use client";
import { type CSSProperties, type ReactNode } from "react";
import type { CVData } from "@/lib/cv-types";
import { resolveStyle, sectionLabel } from "@/lib/cv-themes";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";

const PAGE_BG = "#1a1612";
const CARD = "#f3e8cc";
const CARD_RULE = "#c8b489";
const CARD_RULE_SOFT = "#dccaa0";
const INK = "#2c2417";
const INK_SOFT = "#5a4a30";
const INK_FAINT = "#8a7553";
const ACCENT = "#8a6f2a";
const WHITE = "#f8f4e8";

// Real photographic kitchen flatlay. Unsplash photo-1466637574441-
// 749b8f19452f ("avocado, tomatoes, eggs, mushrooms, spring onions
// and leaves on wooden cutting board"). Wooden cutting board + chef
// knife + scattered ingredients + slate-tile floor visible at edges
// — closest free single-photo match to the reference Chef Resume
// composition (centered board surrounded by kitchen elements).
// URL params do server-side crop + optimization (AVIF/WebP via
// auto=format, ~80% quality, portrait crop centered). Domain
// whitelisted in next.config.ts:6 (images.unsplash.com). Free
// Unsplash license, commercial use, no attribution required.
const KITCHEN_PHOTO =
  "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1200&h=1700&q=80&auto=format&fit=crop&crop=center";

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

function KitchenBackdrop() {
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
        src={KITCHEN_PHOTO}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          display: "block",
        }}
      />
      {/* darkening overlay so the white name + toque + section borders
          read clearly against the photo at all crops */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(15,12,9,0.55) 0%, rgba(15,12,9,0.25) 22%, rgba(15,12,9,0.20) 70%, rgba(15,12,9,0.55) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

function ChefToque({ color }: { color: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 64 60"
      width={42}
      height={40}
      style={{ display: "block" }}
    >
      <path
        d="M14 30 C 6 28 4 16 14 12 C 14 6 22 2 32 6 C 42 2 50 6 50 12 C 60 16 58 28 50 30 L 50 44 L 14 44 Z"
        fill={color}
      />
      <rect x="12" y="44" width="40" height="8" rx="2" fill={color} />
      <rect x="14" y="46" width="36" height="2" fill="rgba(0,0,0,0.10)" />
    </svg>
  );
}

function ChefPortrait({ data }: { data: CVData }) {
  const basics = data.basics;
  const photoStyle = data.style?.photoStyle ?? "round";
  if (photoStyle === "none") return null;
  const radius = photoStyle === "square" ? "12px" : "9999px";
  const size = 96;
  const ring: CSSProperties = {
    width: size,
    height: size,
    borderRadius: radius,
    padding: 4,
    background: `conic-gradient(from 210deg, ${CARD_RULE_SOFT}, #e6c98a, ${ACCENT}, ${CARD_RULE_SOFT})`,
    boxShadow: "0 8px 18px rgba(0,0,0,0.30)",
  };
  const inner: CSSProperties = {
    width: "100%",
    height: "100%",
    borderRadius: radius,
    background: "linear-gradient(160deg,#e9dcb8,#d4c192)",
    display: "grid",
    placeItems: "end center",
    overflow: "hidden",
  };
  // 3-branch placeholder: stylized chef silhouette (head + shoulders +
  // small toque crown) so an empty CV clearly invites the client to
  // upload their portrait, instead of showing blank or a stranger.
  const placeholder = (
    <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="xMidYMax meet" aria-hidden>
      <path
        d="M30 22 C 22 22 20 30 28 30 C 26 36 32 42 40 40 C 42 46 58 46 60 40 C 68 42 74 36 72 30 C 80 30 78 22 70 22 C 70 16 60 12 50 14 C 40 12 30 16 30 22 Z"
        fill={ACCENT}
        opacity="0.85"
      />
      <circle cx="50" cy="48" r="14" fill={ACCENT} opacity="0.9" />
      <path d="M22 100 q0 -28 28 -28 q28 0 28 28 Z" fill={ACCENT} opacity="0.9" />
    </svg>
  );
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: -size / 2, marginBottom: 14 }}>
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
            placeholder
          )}
        </div>
      </div>
    </div>
  );
}

function SectionRow({
  ctx,
  title,
  accent,
}: {
  ctx: Ctx;
  title: ReactNode;
  accent?: ReactNode;
}) {
  return (
    <div style={{ marginTop: 22 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 10,
        }}
      >
        <span
          style={{
            fontFamily: headingFamily(ctx),
            fontSize: 19,
            fontWeight: 700,
            color: INK,
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}
        >
          {title}
        </span>
        {accent && (
          <span
            style={{
              fontFamily: headingFamily(ctx),
              fontSize: 10.5,
              fontWeight: 600,
              color: ACCENT,
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            {accent}
          </span>
        )}
      </div>
      <div
        aria-hidden
        style={{
          marginTop: 6,
          height: 1,
          background: `linear-gradient(90deg, ${CARD_RULE} 0%, ${CARD_RULE_SOFT} 60%, transparent 100%)`,
        }}
      />
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
        width: 5,
        height: 5,
        background: ACCENT,
        transform: "rotate(45deg)",
      }}
    />
  );
}

function Hero({ data, ctx }: { data: CVData; ctx: Ctx }) {
  const basics = data.basics;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 28 }}>
      <ChefToque color={WHITE} />
      <div
        style={{
          fontFamily: headingFamily(ctx),
          fontSize: 40,
          fontWeight: 700,
          color: WHITE,
          textAlign: "center",
          letterSpacing: "8px",
          textTransform: "uppercase",
          marginTop: 12,
          lineHeight: 1.05,
          textShadow: "0 2px 14px rgba(0,0,0,0.45)",
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
            color: "rgba(248,244,232,0.85)",
            fontWeight: 500,
            marginTop: 6,
            textShadow: "0 1px 6px rgba(0,0,0,0.45)",
          }}
        >
          {basics.role}
        </div>
      )}
    </div>
  );
}

function Body({ data, ctx }: { data: CVData; ctx: Ctx }) {
  const { basics, experience, education, skills, awards } = data;
  const hasSummary = !!basics.summary && !isRichTextEmpty(basics.summary);
  const contact: string[] = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean) as string[];
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, marginTop: 4 }}>
      <ChefPortrait data={data} />
      {contact.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "4px 16px",
            fontSize: 10.5,
            color: INK_FAINT,
            letterSpacing: "0.8px",
            paddingBottom: 14,
            borderBottom: `1px solid ${CARD_RULE_SOFT}`,
          }}
        >
          {contact.map((c) => (
            <span key={c} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  width: 4,
                  height: 4,
                  background: ACCENT,
                  borderRadius: "9999px",
                  display: "inline-block",
                }}
              />
              {c}
            </span>
          ))}
        </div>
      )}

      {hasSummary && (
        <div
          style={{
            fontSize: 11.5,
            color: INK_SOFT,
            lineHeight: 1.7,
            fontStyle: "italic",
            textAlign: "center",
            padding: "14px 12px 0",
          }}
        >
          <RichTextRender html={basics.summary ?? ""} />
        </div>
      )}

      {experience.length > 0 && (
        <div>
          <SectionRow ctx={ctx} title={sectionLabel(data, "experience", "EXPERIENCE")} accent="MENU" />
          <div style={{ marginTop: 10 }}>
            {experience.map((job, i) => (
              <div key={i} style={{ marginBottom: i === experience.length - 1 ? 0 : 12, position: "relative", paddingLeft: 16 }}>
                <Bullet />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 12.5, color: INK }}>{job.role}</div>
                  <div style={{ fontSize: 10, color: ACCENT, letterSpacing: "1.2px", whiteSpace: "nowrap", textTransform: "uppercase", fontWeight: 600 }}>
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
        </div>
      )}

      {skills.length > 0 && (
        <div>
          <SectionRow ctx={ctx} title={sectionLabel(data, "skills", "SPECIALTIES")} accent="SIGNATURE" />
          <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 22, rowGap: 5 }}>
            {skills.map((s, i) => (
              <div key={i} style={{ position: "relative", paddingLeft: 16, fontSize: 11, color: INK_SOFT, lineHeight: 1.55 }}>
                <Bullet />
                {s}
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div>
          <SectionRow ctx={ctx} title={sectionLabel(data, "education", "EDUCATION")} accent="TRAINING" />
          <div style={{ marginTop: 10 }}>
            {education.map((ed, i) => (
              <div key={i} style={{ marginBottom: i === education.length - 1 ? 0 : 10, position: "relative", paddingLeft: 16 }}>
                <Bullet />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 12, color: INK }}>{ed.degree}</div>
                  <div style={{ fontSize: 10, color: ACCENT, letterSpacing: "1.2px", whiteSpace: "nowrap", textTransform: "uppercase", fontWeight: 600 }}>
                    {ed.startDate}{ed.endDate ? ` — ${ed.endDate}` : ""}
                  </div>
                </div>
                <div style={{ fontSize: 10.5, color: INK_SOFT, fontStyle: "italic", marginTop: 1 }}>{ed.school}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {awards && awards.length > 0 && (
        <div>
          <SectionRow ctx={ctx} title={sectionLabel(data, "awards", "AWARDS")} accent="HONORS" />
          <div style={{ marginTop: 10 }}>
            {awards.map((a, i) => (
              <div key={i} style={{ position: "relative", paddingLeft: 16, fontSize: 11, color: INK_SOFT, lineHeight: 1.55, marginBottom: 3 }}>
                <Bullet />
                {a.title}{a.year ? ` — ${a.year}` : ""}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ChefMenu({
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
      <KitchenBackdrop />
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
        <div
          style={{
            margin: "20px 64px 60px 64px",
            background: CARD,
            borderRadius: 6,
            padding: "26px 38px 36px 38px",
            boxShadow:
              "0 28px 60px rgba(0,0,0,0.45), 0 6px 16px rgba(0,0,0,0.30), inset 0 0 0 1px rgba(200,180,137,0.45)",
            flex: 1,
            display: "flex",
            flexDirection: "column",
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
      <div style={{ transform: "scale(0.7556)", transformOrigin: "top left", width: 794 }}>
        {articleEl}
      </div>
    </div>
  );
}
