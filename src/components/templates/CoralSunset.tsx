// CoralSunset — Teachers / Educators
// Full-bleed coral→plum gradient hero, hexagon monogram, gradient skill bars. atsSafe:false, supportsPhoto:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const fr = '"Fraunces",Georgia,serif';
const Sec = ({ t, s }: { t: string; s?: React.CSSProperties }) => <h2 style={{ fontWeight: 800, fontSize: "13px", letterSpacing: ".2em", textTransform: "uppercase", color: "#D85A4D", margin: "0 0 13px", ...s }}>{t}</h2>;

export default function CoralSunset({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const np = (basics.fullName ?? "").trim().split(/\s+/);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#fff", color: "#2D1B3D", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ position: "relative", height: 322, background: "linear-gradient(135deg,#FF9478 0%,#FF7A6B 30%,#D85A4D 58%,#3A2350 100%)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(115% 85% at 88% 0%, rgba(212,162,76,.5), transparent 55%)" }} />
        <div style={{ position: "absolute", left: 56, top: 70, right: 290, zIndex: 2 }}>
          <h1 style={{ fontWeight: 900, fontSize: "48pt", lineHeight: .96, letterSpacing: "-.02em", color: "#fff", margin: 0, textTransform: "uppercase" }}>{np.slice(0, -1).join(" ") || basics.fullName}{np.length > 1 && <><br />{np[np.length - 1]}</>}</h1>
          <p style={{ margin: "16px 0 0", font: '700 13px/1.2 "Inter",sans-serif', letterSpacing: ".24em", textTransform: "uppercase", color: "#FFE8D6" }}>{basics.role}</p>
        </div>
        <div style={{ position: "absolute", right: 60, top: 56, width: 198, height: 212, zIndex: 2, background: "linear-gradient(160deg,#FFC9BC,#FF7A6B)", clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 6px rgba(255,255,255,.3), 0 12px 40px rgba(212,162,76,.55)" }}>
          {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{ width: "82%", height: "82%", objectFit: "cover", clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)" }} /> : <span style={{ fontFamily: fr, fontWeight: 500, fontSize: "62pt", color: "#fff" }}>{initials(basics.fullName)}</span>}
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 48, background: "#fff", clipPath: "ellipse(78% 100% at 50% 100%)", zIndex: 1 }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 246px", gap: 36, padding: "28px 56px 52px" }}>
        <div>
          {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#6B5B7A", lineHeight: 1.6, margin: "0 0 24px" }} /></>}
          <Sec t={getLabel(data, "experience")} />
          {experience.map((e, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <p style={{ fontFamily: fr, fontWeight: 600, fontSize: "13pt", color: "#2D1B3D", margin: 0 }}>{e.role}</p>
              <p style={{ font: '500 10pt/1.4 "Inter",sans-serif', color: "#FF7A6B", margin: "2px 0 6px" }}>{e.company}{e.company && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate, e.current)}</p>
              <BulletsRender bullets={e.bullets} className="cs-b" style={{ color: "#6B5B7A", fontSize: "10.5pt", lineHeight: 1.55, margin: 0, padding: 0, listStyle: "none" }} />
            </div>
          ))}
          <Sec t={getLabel(data, "education")} s={{ marginTop: 24 }} />
          {education.map((e, i) => (<div key={i} style={{ marginBottom: 8 }}>
            <div style={{ fontFamily: fr, fontWeight: 600, fontSize: "12pt", color: "#2D1B3D" }}>{e.degree}</div>
            <div style={{ font: '400 10pt/1.5 "Inter",sans-serif', color: "#9D8FAB" }}>{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</div>
          </div>))}
        </div>
        <div>
          <div style={{ background: "#FFF5E8", borderRadius: 14, padding: "18px 18px 20px", marginBottom: 18 }}>
            <Sec t="Contact" s={{ marginBottom: 12 }} />
            <div style={{ font: '400 9.5pt/1.95 "Inter",sans-serif', color: "#6B5B7A" }}>{[basics.email, basics.phone, basics.location, basics.website].filter(Boolean).map((c, i) => <React.Fragment key={i}>{c}<br /></React.Fragment>)}</div>
          </div>
          {skills.length > 0 && <><Sec t={getLabel(data, "skills")} />
            {skills.slice(0, 6).map((s, i) => (<div key={i} style={{ marginBottom: 12 }}>
              <div style={{ font: '600 9.5pt/1 "Inter",sans-serif', color: "#2D1B3D", marginBottom: 5 }}>{s}</div>
              <div style={{ height: 7, borderRadius: 99, background: "#FFE8D6" }}><i style={{ display: "block", height: "100%", borderRadius: 99, width: `${94 - i * 6}%`, background: "linear-gradient(90deg,#FF7A6B,#D4A24C)" }} /></div>
            </div>))}</>}
          {certifications.length > 0 && <><Sec t={getLabel(data, "certifications")} s={{ marginTop: 22 }} /><div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#6B5B7A" }}>{certifications.map((c, i) => <React.Fragment key={i}><b style={{ color: "#2D1B3D", fontWeight: 600 }}>{c.name}</b>{c.issuer ? ` — ${c.issuer}` : ""}{c.year ? ` (${c.year})` : ""}<br /></React.Fragment>)}</div></>}
          {languages.length > 0 && <><Sec t={getLabel(data, "languages")} s={{ marginTop: 22 }} /><div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#6B5B7A" }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#2D1B3D", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}<br /></React.Fragment>)}</div></>}
        </div>
      </div>
      <style>{`.cs-b li{position:relative;padding-left:15px;margin-bottom:4px}.cs-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
