"use client";
import { type CSSProperties, type ReactNode } from "react";
import type { CVData } from "@/lib/cv-types";
import { resolveStyle, sectionLabel } from "@/lib/cv-themes";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";

const KRAFT = "#9a6c3c";
const PAPER = "#f7efd6";
const PAPER_ALT = "#f4e9c4";
const NOTE = "#fdf6cf";
const INK = "#2a2218";
const INK_SOFT = "#574a39";
const RED = "#cf4f3a";
const TEAL = "#2f9c8e";
const BUTTER = "#f4d896";
const TAPE_SAGE = "rgba(160,192,150,0.62)";
const TAPE_PINK = "rgba(230,182,190,0.62)";
const TAPE_BUTTER = "rgba(244,216,150,0.66)";
const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='160' height='160' filter='url(%23n)' opacity='0.2'/></svg>\")";

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
    backgroundColor: KRAFT,
  };
  return { headingFont: r.headingFont, bodyFont: r.bodyFont, density: r.density, densityClass, articleStyle };
}

function headingFamily(ctx: Ctx) {
  return `${ctx.headingFont.cssVar}, ${ctx.headingFont.fallback}`;
}

function DoodleFrame() {
  return (
    <svg aria-hidden preserveAspectRatio="none" viewBox="0 0 240 240"
      style={{ position: "absolute", inset: 6, width: "calc(100% - 12px)", height: "calc(100% - 12px)", pointerEvents: "none" }}>
      <path d="M16 12 C70 5 170 7 224 13 C231 70 233 170 226 227 C170 234 70 232 14 226 C7 170 5 70 14 13 Z"
        fill="none" stroke={INK} strokeWidth={2.2} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <path d="M14 26 c-10 -11 3 -22 12 -10" fill="none" stroke={INK} strokeWidth={2} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <path d="M226 214 c10 11 -3 22 -12 10" fill="none" stroke={INK} strokeWidth={2} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function JournalMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <g fill="none" stroke={INK} strokeWidth={2.4} strokeLinecap="round">
        <path d="M24 6 L24 42 M6 24 L42 24 M11 11 L37 37 M37 11 L11 37" />
        <circle cx="24" cy="24" r="6" fill={BUTTER} stroke={INK} />
      </g>
    </svg>
  );
}

const TAPE_TEXTURE =
  "repeating-linear-gradient(90deg, rgba(255,255,255,0) 0 8px, rgba(255,255,255,0.28) 8px 12px)";

function Tape({ w, h = 32, bg, style }: { w: number; h?: number; bg: string; style?: CSSProperties }) {
  return (
    <div aria-hidden style={{ position: "absolute", width: w, height: h, background: bg,
      backgroundImage: TAPE_TEXTURE, boxShadow: "0 2px 5px rgba(0,0,0,0.16)", zIndex: 9, ...style }} />
  );
}

function Pin({ color, style }: { color: string; style?: CSSProperties }) {
  return (
    <div aria-hidden style={{ position: "absolute", width: 22, height: 22, borderRadius: "50%",
      background: `radial-gradient(circle at 34% 30%, rgba(255,255,255,0.65), ${color})`,
      boxShadow: "0 4px 5px rgba(0,0,0,0.32)", zIndex: 11, ...style }} />
  );
}

function Decor() {
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      <div style={{ position: "absolute", inset: 0,
        background: "radial-gradient(circle at 18% 12%, rgba(255,238,200,0.20), transparent 42%), radial-gradient(circle at 88% 86%, rgba(70,42,16,0.30), transparent 52%), linear-gradient(135deg,#b07f4d,#9a6c3c 52%,#7d5429)" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: NOISE, mixBlendMode: "multiply", opacity: 0.5 }} />
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 60px rgba(50,28,8,0.55), inset 0 0 14px rgba(40,20,5,0.6)" }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 30, width: 26,
        background: "linear-gradient(90deg, rgba(40,22,8,0), rgba(40,22,8,0.34) 45%, rgba(255,240,210,0.10) 55%, rgba(40,22,8,0))" }} />
      <div style={{ position: "absolute", top: 24, bottom: 24, left: 43, borderLeft: "2px dashed rgba(60,36,14,0.5)" }} />
      <svg width={52} height={44} viewBox="0 0 60 50" style={{ position: "absolute", top: -4, left: 96, transform: "rotate(-4deg)", zIndex: 12 }}>
        <rect x="6" y="6" width="48" height="40" rx="3" fill="#3a3a3e" />
        <rect x="11" y="0" width="38" height="12" rx="3" fill="#5a5a60" />
        <path d="M14 8 L46 8 L41 30 L19 30 Z" fill="#88888f" />
      </svg>
      <Tape w={124} bg={TAPE_SAGE} style={{ top: 30, left: -28, transform: "rotate(-43deg)" }} />
      <Tape w={126} bg={TAPE_PINK} style={{ top: 14, right: -30, transform: "rotate(41deg)" }} />
      <Tape w={116} bg={TAPE_BUTTER} style={{ bottom: -8, left: 150, transform: "rotate(6deg)" }} />
      <Tape w={124} bg={TAPE_PINK} style={{ bottom: 30, right: -30, transform: "rotate(-46deg)" }} />
      <Tape w={92} h={26} bg={TAPE_SAGE} style={{ top: 430, left: -20, transform: "rotate(-50deg)" }} />
      <Pin color={TEAL} style={{ top: 300, right: 92 }} />
      <Pin color={RED} style={{ top: 560, left: 76 }} />
      <Pin color="#dfa12c" style={{ bottom: 176, right: 286 }} />
      <svg width={28} height={70} viewBox="0 0 30 74" style={{ position: "absolute", top: 486, right: 28, transform: "rotate(8deg)", zIndex: 11 }}>
        <path d="M9 64 V18 a8 8 0 0 1 16 0 V58 a6 6 0 0 1 -12 0 V24" fill="none" stroke="#c9a13a" strokeWidth={4} strokeLinecap="round" />
      </svg>
      <div style={{ position: "absolute", bottom: 24, right: 40, display: "flex", gap: 14, alignItems: "flex-end", opacity: 0.45 }}>
        <svg width={54} height={54} viewBox="0 0 70 70">
          <rect x="4" y="4" width="62" height="62" fill="none" stroke={INK} strokeWidth={2.5} strokeDasharray="1 5" rx="3" />
          <circle cx="35" cy="30" r="13" fill="none" stroke={INK} strokeWidth={2} />
          <path d="M35 17 v26 M22 30 h26" stroke={INK} strokeWidth={2} />
        </svg>
        <svg width={58} height={52} viewBox="0 0 80 70">
          <path d="M40 60 C30 60 16 50 16 36 a12 12 0 0 1 24 0 a12 12 0 0 1 24 0 C64 50 50 60 40 60Z" fill="none" stroke={INK} strokeWidth={2.5} />
          <path d="M33 58 L40 67 L47 58" fill="none" stroke={INK} strokeWidth={2.5} />
          <line x1="40" y1="12" x2="40" y2="2" stroke={INK} strokeWidth={2.5} />
        </svg>
      </div>
    </div>
  );
}

function MarkerHeading({ ctx, children }: { ctx: Ctx; children: ReactNode }) {
  return (
    <div style={{ position: "relative", display: "inline-block", marginBottom: 13, zIndex: 1 }}>
      <span style={{ fontFamily: headingFamily(ctx), fontSize: 23, fontWeight: 800, letterSpacing: "0.5px", color: INK, position: "relative", zIndex: 1 }}>
        {children}
      </span>
      <span aria-hidden style={{ position: "absolute", left: -3, right: -7, bottom: -3, height: 8, background: BUTTER, transform: "rotate(-1.2deg)", zIndex: 0 }} />
    </div>
  );
}

const TORN_CLIP =
  "polygon(0% 4%,4% 0%,14% 3%,30% 0%,48% 3%,66% 0%,83% 3%,95% 0%,100% 5%,98% 30%,100% 52%,98% 74%,100% 96%,95% 100%,80% 97%,62% 100%,45% 97%,28% 100%,13% 98%,3% 100%,0% 95%,2% 72%,0% 50%,2% 28%)";

function Card({ children, bg = PAPER, rotate = 0 }: { children: ReactNode; bg?: string; rotate?: number }) {
  return (
    <div style={{ position: "relative", background: bg, padding: "22px 24px 24px", boxShadow: "0 7px 15px rgba(0,0,0,0.22)", clipPath: TORN_CLIP, transform: `rotate(${rotate}deg)` }}>
      <DoodleFrame />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

function Hero({ data, ctx }: { data: CVData; ctx: Ctx }) {
  const basics = data.basics;
  const displayName = basics.fullName;
  const photoStyle = data.style?.photoStyle ?? "round";
  const showPhoto = photoStyle !== "none";
  const radius = photoStyle === "square" ? "10px" : "9999px";
  const photoBox: CSSProperties = { height: 150, width: 150, borderRadius: radius, border: `4px solid ${INK}` };
  const contact: string[] = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean) as string[];

  return (
    <div style={{ display: "flex", gap: 24, alignItems: "flex-start", position: "relative" }}>
      <div style={{ flex: "none", width: 178, background: "#fffdf6", padding: "13px 13px 40px", transform: "rotate(-5deg)", boxShadow: "0 10px 20px rgba(0,0,0,0.34)", position: "relative" }}>
        <Tape w={92} h={24} bg={TAPE_PINK} style={{ top: -12, left: 42, transform: "rotate(-7deg)" }} />
        <div style={{ width: "100%", aspectRatio: "1 / 1", background: "linear-gradient(160deg,#d8cdba,#c2b39d)", display: "grid", placeItems: "center", overflow: "hidden" }}>
          {showPhoto &&
            (basics.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={basics.photoUrl} alt={displayName} style={{ ...photoBox, objectFit: "cover" }} />
            ) : (
              <div aria-hidden style={{ ...photoBox, backgroundColor: "#cdbfa6", display: "grid", placeItems: "center" }}>
                <JournalMark size={52} />
              </div>
            ))}
          {!showPhoto && <JournalMark size={52} />}
        </div>
        {showPhoto && !basics.photoUrl && (
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 12, textAlign: "center", fontFamily: headingFamily(ctx), fontSize: 16, color: "#998b76" }}>
            your photo here
          </div>
        )}
      </div>
      <div style={{ flex: 1, background: PAPER, padding: "22px 28px 24px", position: "relative", boxShadow: "0 7px 16px rgba(0,0,0,0.24)", transform: "rotate(0.6deg)", clipPath: "polygon(0% 6%,3% 1%,12% 4%,28% 0%,46% 3%,63% 0%,80% 4%,93% 1%,100% 5%,99% 94%,96% 100%,82% 97%,64% 100%,46% 97%,29% 100%,13% 97%,3% 100%,1% 95%)" }}>
        <Tape w={100} h={22} bg={TAPE_BUTTER} style={{ top: -11, right: 34, transform: "rotate(5deg)" }} />
        <div style={{ fontFamily: headingFamily(ctx), fontSize: 46, lineHeight: 1, fontWeight: 800, letterSpacing: "0.5px", color: INK }}>{displayName}</div>
        {basics.role && (
          <div style={{ fontFamily: headingFamily(ctx), fontSize: 22, color: RED, fontWeight: 700, marginTop: 4 }}>{basics.role}</div>
        )}
        <div style={{ marginTop: 13, display: "flex", flexWrap: "wrap", gap: "6px 18px", fontSize: 12, color: INK_SOFT, fontWeight: 700 }}>
          {contact.map((c) => (
            <span key={c} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: TEAL, display: "inline-block" }} />
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Body({ data, ctx }: { data: CVData; ctx: Ctx }) {
  const { basics, experience, education, skills, awards } = data;
  const hasSummary = !!basics.summary && !isRichTextEmpty(basics.summary);

  return (
    <div style={{ display: "flex", gap: 20, flex: 1, marginTop: 22 }}>
      <div style={{ flex: 1.6, display: "flex", flexDirection: "column", gap: 20 }}>
        {hasSummary && (
          <Card rotate={-0.8}>
            <MarkerHeading ctx={ctx}>{sectionLabel(data, "profile", "PROFILE")}</MarkerHeading>
            <div style={{ fontSize: 13, color: INK_SOFT, lineHeight: 1.62 }}>
              <RichTextRender html={basics.summary ?? ""} />
            </div>
          </Card>
        )}
        {experience.length > 0 && (
          <Card rotate={0.7}>
            <MarkerHeading ctx={ctx}>{sectionLabel(data, "experience", "EXPERIENCE")}</MarkerHeading>
            {experience.map((job, i) => (
              <div key={i} style={{ marginBottom: i === experience.length - 1 ? 0 : 15 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                  <div style={{ fontWeight: 800, fontSize: 14, color: INK }}>{job.role}</div>
                  <div style={{ fontFamily: headingFamily(ctx), fontSize: 15, color: RED, fontWeight: 700, whiteSpace: "nowrap" }}>
                    {job.startDate}{job.endDate ? ` — ${job.endDate}` : ""}
                  </div>
                </div>
                <div style={{ fontSize: 12, color: INK_SOFT, fontWeight: 700, margin: "1px 0 6px" }}>
                  {job.company}{job.location ? ` · ${job.location}` : ""}
                </div>
                {job.bullets?.map((b, bi) => (
                  <div key={bi} style={{ fontSize: 12, color: INK_SOFT, lineHeight: 1.5, paddingLeft: 16, position: "relative", marginBottom: 3 }}>
                    <span style={{ position: "absolute", left: 0, color: TEAL }}>✶</span>
                    <RichTextRender html={b} />
                  </div>
                ))}
              </div>
            ))}
          </Card>
        )}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
        {education.length > 0 && (
          <Card bg={PAPER_ALT} rotate={-0.5}>
            <MarkerHeading ctx={ctx}>{sectionLabel(data, "education", "EDUCATION")}</MarkerHeading>
            {education.map((ed, i) => (
              <div key={i} style={{ marginBottom: i === education.length - 1 ? 0 : 13 }}>
                <div style={{ fontWeight: 800, fontSize: 13.5, color: INK }}>{ed.degree}</div>
                <div style={{ fontSize: 12, color: INK_SOFT, fontWeight: 700, margin: "1px 0 2px" }}>{ed.school}</div>
                <div style={{ fontFamily: headingFamily(ctx), fontSize: 14, color: TEAL, fontWeight: 700 }}>
                  {ed.startDate}{ed.endDate ? ` — ${ed.endDate}` : ""}
                </div>
              </div>
            ))}
          </Card>
        )}
        {skills.length > 0 && (
          <div style={{ position: "relative", background: `repeating-linear-gradient(${NOTE} 0 27px, rgba(120,150,170,0.32) 27px 28px)`, backgroundColor: NOTE, padding: "22px 22px 22px 44px", boxShadow: "0 7px 15px rgba(0,0,0,0.22)", transform: "rotate(1deg)" }}>
            <div style={{ position: "absolute", top: 14, bottom: 14, left: 30, borderLeft: "2px solid rgba(206,90,70,0.5)" }} />
            <div style={{ position: "absolute", top: 18, bottom: 18, left: 9, width: 14, display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
              {[0, 1, 2, 3, 4].map((k) => (
                <span key={k} style={{ width: 13, height: 13, borderRadius: "50%", background: "#cdbf9e", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.4)" }} />
              ))}
            </div>
            <div style={{ fontFamily: headingFamily(ctx), fontSize: 23, fontWeight: 800, color: INK, marginBottom: 8 }}>
              {sectionLabel(data, "skills", "SKILLS")}
            </div>
            {skills.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, fontWeight: 700, color: INK, height: 28 }}>
                <span style={{ flex: "none", width: 20, height: 20, border: `2px solid ${TEAL}`, borderRadius: "50%", display: "grid", placeItems: "center", fontSize: 11, color: TEAL, fontWeight: 800 }}>{i + 1}</span>
                {s}
              </div>
            ))}
          </div>
        )}
        {awards && awards.length > 0 && (
          <Card rotate={-0.6}>
            <MarkerHeading ctx={ctx}>{sectionLabel(data, "awards", "AWARDS")}</MarkerHeading>
            {awards.map((a, i) => (
              <div key={i} style={{ fontSize: 12, color: INK_SOFT, lineHeight: 1.5, paddingLeft: 16, position: "relative", marginBottom: 4 }}>
                <span style={{ position: "absolute", left: 0, color: TEAL }}>✶</span>
                {a.title}{a.year ? ` — ${a.year}` : ""}
              </div>
            ))}
          </Card>
        )}
      </div>
    </div>
  );
}

export function ScrapbookJournal({
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
      <Decor />
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", flex: 1, padding: "44px 50px 44px 70px" }}>
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
