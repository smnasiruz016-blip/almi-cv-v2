"use client";
import { type CSSProperties, type ReactNode } from "react";
import type { CVData } from "@/lib/cv-types";
import { resolveStyle } from "@/lib/cv-themes";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";

/**
 * PIXEL MODE template — first of its kind in the registry.
 *
 * Instead of redrawing the design in SVG (the "vibe mode" approach used
 * by every other hand-coded template), this template renders the source
 * PNG as a full-bleed background and overlays positioned text + photo
 * on top.
 *
 * Why: the SVG redraw of this same source (SilverLightEA, PR #43) was
 * called out as "not close at all" by the owner. Pixel mode trades
 * design flexibility for near-pixel fidelity to the reference.
 *
 * Trade-offs:
 *   - The decoration (chrome ribbon, scattered icons, photo-frame
 *     outline) is BAKED INTO the PNG and cannot be edited
 *   - The source PNG had mock text baked in too ("ALEX JOHNSON",
 *     "Titan Enterprises - Executive Assistant to COO", etc.), so this
 *     component paints silver-matched cover-up rectangles over those
 *     regions and overlays the real CV data on top
 *   - Coordinates calibrated by eye against the source PNG layout —
 *     iterate if anything drifts when you see the live render
 *
 * Source PNG: public/templates/silver-light-ea-pixel-bg.png
 * (rights confirmed for commercial use by owner before ship)
 */

// A4 at 96dpi — the canvas all overlay positions are calibrated to
const PAGE_W = 794;
const PAGE_H = 1123;
const BG_URL = "/templates/silver-light-ea-pixel-bg.png";

// Match the source PNG's silver-grey canvas so cover-up rectangles
// blend in. Sampled from the PNG's lighter areas.
const MASK_LIGHT = "#d8dde4";
const MASK_MID = "#c6cdd6";

// Ink for overlay text — dark navy like the source PNG hero name
const INK_DARK = "#1a2a45";
const INK_BODY = "#3a4a5e";
const INK_FAINT = "rgba(58, 74, 94, 0.62)";

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
  };
  return { headingFont: r.headingFont, bodyFont: r.bodyFont, density: r.density, densityClass, articleStyle };
}

function headingFamily(ctx: Ctx) {
  return `${ctx.headingFont.cssVar}, ${ctx.headingFont.fallback}`;
}

/** Cover-up rectangle that masks a baked-in mock-text region on the
 *  source PNG. Sized via inset-percentage so it scales with the article
 *  regardless of preview vs paginated mode. */
function Mask({
  top,
  left,
  width,
  height,
  z = 5,
}: {
  top: number;
  left: number;
  width: number;
  height: number;
  z?: number;
}) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top,
        left,
        width,
        height,
        background: `linear-gradient(180deg, ${MASK_LIGHT} 0%, ${MASK_MID} 100%)`,
        zIndex: z,
      }}
    />
  );
}

/** Real user photo, positioned inside the photo-frame region of the
 *  source PNG. The chrome frame outline stays visible (it's part of
 *  the PNG); we just overlay the user's photo inside it. */
function PhotoOverlay({ data }: { data: CVData }) {
  const basics = data.basics;
  const photoStyle = data.style?.photoStyle ?? "round";
  if (photoStyle === "none" || !basics.photoUrl) return null;
  // Photo-frame interior in the source PNG: roughly x=70-180, y=60-225
  // on the canvas. Inset slightly so the chrome frame from the PNG
  // remains visible as a border around the user's photo.
  return (
    <div
      style={{
        position: "absolute",
        top: 68,
        left: 75,
        width: 108,
        height: 156,
        overflow: "hidden",
        zIndex: 6,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={basics.photoUrl}
        alt={basics.fullName}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}

function Hero({ data, ctx }: { data: CVData; ctx: Ctx }) {
  const basics = data.basics;
  return (
    <>
      {/* Cover-up rectangles for baked-in "ALEX JOHNSON" + role text */}
      <Mask top={62} left={210} width={400} height={104} z={5} />

      {/* Name + role overlay */}
      <div
        style={{
          position: "absolute",
          top: 76,
          left: 210,
          width: 400,
          zIndex: 7,
        }}
      >
        <div
          style={{
            fontFamily: headingFamily(ctx),
            fontSize: 38,
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
              fontSize: 17,
              fontWeight: 500,
              color: INK_BODY,
              marginTop: 10,
              letterSpacing: "0.5px",
            }}
          >
            {basics.role}
          </div>
        )}
      </div>
    </>
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
        gap: "4px 16px",
        fontSize: 10,
        color: INK_FAINT,
        letterSpacing: "0.6px",
        marginTop: 8,
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

function ContentOverlay({ data, ctx }: { data: CVData; ctx: Ctx }) {
  const { basics, experience, education, skills, certifications, awards } = data;
  const hasSummary = !!basics.summary && !isRichTextEmpty(basics.summary);

  // Single overlay covering the baked-in mock body content
  // (experience / skills / education blocks). Section headings from
  // the source PNG are MASKED OUT too because the user's data may use
  // different section labels (e.g. "Work History" instead of
  // "Experience", or localized labels via data.style.sectionLabels).
  return (
    <>
      <Mask top={260} left={56} width={680} height={680} z={5} />

      <div
        style={{
          position: "absolute",
          top: 270,
          left: 56,
          width: 680,
          zIndex: 7,
          color: INK_BODY,
          fontFamily: `${ctx.bodyFont.cssVar}, ${ctx.bodyFont.fallback}`,
        }}
      >
        <Contact data={data} />

        {hasSummary && (
          <div
            style={{
              fontSize: 11,
              color: INK_BODY,
              lineHeight: 1.6,
              marginTop: 10,
            }}
          >
            <RichTextRender html={basics.summary ?? ""} />
          </div>
        )}

        {experience.length > 0 && (
          <Section ctx={ctx} title="EXPERIENCE">
            {experience.map((job, i) => (
              <div
                key={i}
                style={{
                  marginBottom: i === experience.length - 1 ? 0 : 10,
                  position: "relative",
                  paddingLeft: 14,
                }}
              >
                <NavyBullet />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 12, color: INK_DARK }}>
                    {job.role}
                    {job.company ? ` — ${job.company}` : ""}
                  </div>
                  <div
                    style={{
                      fontSize: 9.5,
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
                  <div style={{ fontSize: 10, color: INK_FAINT, fontStyle: "italic", margin: "1px 0 3px" }}>
                    {job.location}
                  </div>
                )}
                {job.bullets?.map((b, bi) => (
                  <div key={bi} style={{ fontSize: 10.5, color: INK_BODY, lineHeight: 1.55, marginBottom: 2 }}>
                    <RichTextRender html={b} />
                  </div>
                ))}
              </div>
            ))}
          </Section>
        )}

        {skills.length > 0 && (
          <Section ctx={ctx} title="SKILLS">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: 20,
                rowGap: 4,
              }}
            >
              {skills.map((s, i) => (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    paddingLeft: 14,
                    fontSize: 10.5,
                    color: INK_BODY,
                    lineHeight: 1.5,
                  }}
                >
                  <NavyBullet />
                  {s}
                </div>
              ))}
            </div>
          </Section>
        )}

        {certifications && certifications.length > 0 && (
          <Section ctx={ctx} title="CERTIFICATIONS">
            {certifications.map((c, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  paddingLeft: 14,
                  fontSize: 10.5,
                  color: INK_BODY,
                  lineHeight: 1.5,
                  marginBottom: 3,
                }}
              >
                <NavyBullet />
                <span style={{ fontWeight: 600, color: INK_DARK }}>{c.name}</span>
                {c.issuer ? ` — ${c.issuer}` : ""}
                {c.year ? ` · ${c.year}` : ""}
              </div>
            ))}
          </Section>
        )}

        {education.length > 0 && (
          <Section ctx={ctx} title="EDUCATION">
            {education.map((ed, i) => (
              <div
                key={i}
                style={{
                  marginBottom: i === education.length - 1 ? 0 : 8,
                  position: "relative",
                  paddingLeft: 14,
                }}
              >
                <NavyBullet />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 11.5, color: INK_DARK }}>{ed.degree}</div>
                  <div
                    style={{
                      fontSize: 9.5,
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
                <div style={{ fontSize: 10, color: INK_BODY, fontStyle: "italic", marginTop: 1 }}>
                  {ed.school}
                </div>
              </div>
            ))}
          </Section>
        )}

        {awards && awards.length > 0 && (
          <Section ctx={ctx} title="AWARDS">
            {awards.map((a, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  paddingLeft: 14,
                  fontSize: 10.5,
                  color: INK_BODY,
                  lineHeight: 1.5,
                  marginBottom: 3,
                }}
              >
                <NavyBullet />
                {a.title}
                {a.issuer ? ` — ${a.issuer}` : ""}
                {a.year ? ` · ${a.year}` : ""}
              </div>
            ))}
          </Section>
        )}
      </div>
    </>
  );
}

function Section({ ctx, title, children }: { ctx: Ctx; title: string; children: ReactNode }) {
  return (
    <div style={{ marginTop: 16 }}>
      <div
        style={{
          fontFamily: headingFamily(ctx),
          fontSize: 16,
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
        style={{ marginTop: 4, height: 1, width: "100%", background: "rgba(26,42,69,0.20)" }}
      />
      <div style={{ marginTop: 10 }}>{children}</div>
    </div>
  );
}

function NavyBullet() {
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        left: 0,
        top: 7,
        width: 4,
        height: 4,
        background: INK_DARK,
        borderRadius: "9999px",
      }}
    />
  );
}

export function SilverLightEAPixel({
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
      {/* Source PNG as full-bleed background — the chrome ribbon,
          scattered icons, photo-frame outline, and edge texture all
          come from this asset directly (no SVG redraw). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BG_URL}
        alt=""
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* Overlay layers: photo → cover-up masks → real CV content */}
      <PhotoOverlay data={data} />
      <Hero data={data} ctx={ctx} />
      <ContentOverlay data={data} ctx={ctx} />
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
