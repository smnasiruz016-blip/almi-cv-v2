// IsometricIndigo — Cloud architects / infrastructure engineers
// Indigo grid hero with isometric 3D cubes, glowing skill bars and dark panels. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const sg = '"Space Grotesk","Inter",sans-serif';
const Sec = ({ t, s }: { t: string; s?: React.CSSProperties }) => <h2 style={{ fontFamily: sg, fontWeight: 600, fontSize: "10.5pt", letterSpacing: ".04em", color: "#fff", margin: "0 0 13px", display: "flex", alignItems: "center", gap: 9, ...s }}><span style={{ width: 11, height: 11, background: "#8B93FF", clipPath: "polygon(50% 0,100% 50%,50% 100%,0 50%)" }} />{t}</h2>;

export default function IsometricIndigo({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const np = (basics.fullName ?? "").trim().split(/\s+/);
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  const cube = (s: React.CSSProperties) => <div style={{ position: "absolute", clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)", background: "conic-gradient(from 90deg, #8B93FF 0 120deg, #5B61D6 120deg 240deg, #3A3F9E 240deg 360deg)", boxShadow: "0 0 30px rgba(124,131,255,.4)", ...s }} />;
  const panel: React.CSSProperties = { background: "rgba(124,131,255,.07)", border: "1px solid rgba(124,131,255,.22)", borderRadius: 14, padding: "16px 18px", marginBottom: 14 };
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#11132B", color: "#D7DBF5", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ position: "relative", height: 286, overflow: "hidden", background: "linear-gradient(140deg,#1E2150 0%,#2B2F6E 55%,#11132B 100%)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(124,131,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,131,255,.06) 1px, transparent 1px)", backgroundSize: "26px 26px" }} />
        {cube({ right: 90, top: 50, width: 78, height: 86 })}
        {cube({ right: 150, top: 120, width: 60, height: 66, opacity: .85 })}
        {cube({ right: 50, top: 132, width: 52, height: 58, opacity: .7 })}
        <div style={{ position: "absolute", left: 54, top: 64, zIndex: 2 }}>
          <h1 style={{ fontFamily: sg, fontWeight: 700, fontSize: "40pt", lineHeight: .96, letterSpacing: "-.02em", margin: 0, color: "#fff", textTransform: "uppercase" }}>{np.slice(0, -1).join(" ") || basics.fullName}{np.length > 1 && <><br />{np[np.length - 1]}</>}</h1>
          <p style={{ fontWeight: 600, fontSize: "12pt", color: "#9AA0FF", margin: "12px 0 0", letterSpacing: ".06em" }}>{basics.role}</p>
          <div style={{ margin: "16px 0 0", font: '500 9pt/1 "Inter",sans-serif', color: "#8E94C4", display: "flex", flexDirection: "column", gap: 5 }}>{contact.map((c, i) => <span key={i}>{c}</span>)}</div>
        </div>
      </div>
      <div style={{ padding: "28px 54px 46px", display: "grid", gridTemplateColumns: "1fr 232px", gap: 32 }}>
        <div>
          {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#AEB4DC", lineHeight: 1.6, margin: "0 0 24px" }} /></>}
          <Sec t={getLabel(data, "experience")} />
          {experience.map((e, i) => (<div key={i} style={{ marginBottom: 15 }}>
            <p style={{ fontFamily: sg, fontWeight: 600, fontSize: "11.5pt", color: "#fff", margin: 0 }}>{e.role}</p>
            <p style={{ font: '500 9.5pt/1.4 "Inter",sans-serif', color: "#9AA0FF", margin: "2px 0 6px" }}>{e.company}{e.company && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate, e.current)}</p>
            <BulletsRender bullets={e.bullets} className="ii-b" style={{ color: "#AEB4DC", fontSize: "10pt", lineHeight: 1.5, margin: 0, padding: 0, listStyle: "none" }} />
          </div>))}
          <Sec t={getLabel(data, "education")} />
          {education.map((e, i) => (<div key={i} style={{ marginBottom: 8 }}>
            <p style={{ fontFamily: sg, fontWeight: 600, fontSize: "11.5pt", color: "#fff", margin: 0 }}>{e.degree}</p>
            <p style={{ font: '500 9.5pt/1.4 "Inter",sans-serif', color: "#9AA0FF", margin: "2px 0 0" }}>{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</p>
          </div>))}
        </div>
        <div>
          {skills.length > 0 && <div style={panel}><Sec t={getLabel(data, "skills")} s={{ marginBottom: 12 }} />{skills.slice(0, 6).map((s, i) => (<div key={i} style={{ marginBottom: 10 }}>
            <div style={{ font: '500 9pt/1 "Inter",sans-serif', color: "#CBD0F0", marginBottom: 5 }}>{s}</div>
            <div style={{ height: 6, background: "rgba(255,255,255,.08)", borderRadius: 99 }}><i style={{ display: "block", height: "100%", borderRadius: 99, width: `${95 - i * 6}%`, background: "linear-gradient(90deg,#8B93FF,#5B61D6)" }} /></div>
          </div>))}</div>}
          {certifications.length > 0 && <div style={panel}><Sec t={getLabel(data, "certifications")} s={{ marginBottom: 12 }} /><div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#AEB4DC" }}>{certifications.map((c, i) => <React.Fragment key={i}><b style={{ color: "#fff", fontWeight: 600 }}>{c.name}</b>{c.issuer ? ` ${c.issuer}` : ""}{c.year ? ` (${c.year})` : ""}<br /></React.Fragment>)}</div></div>}
          {languages.length > 0 && <div style={panel}><Sec t={getLabel(data, "languages")} s={{ marginBottom: 12 }} /><div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#AEB4DC" }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#fff", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}<br /></React.Fragment>)}</div></div>}
        </div>
      </div>
      <style>{`.ii-b li{position:relative;padding-left:15px;margin-bottom:4px}.ii-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
