// StudioWaveformProducer — Music producers / audio engineers
// Dark studio look with a gradient audio-waveform and orange-violet accents. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const sg = '"Space Grotesk","Inter",sans-serif';
const Sec = ({ t, s }: { t: string; s?: React.CSSProperties }) => <h2 style={{ fontFamily: sg, fontWeight: 600, fontSize: "10.5pt", color: "#fff", margin: "0 0 13px", display: "flex", alignItems: "center", gap: 9, ...s }}><span style={{ width: 14, height: 14, borderRadius: "50%", background: "linear-gradient(135deg,#FF7A3D,#A23DFF)" }} />{t}</h2>;

export default function StudioWaveformProducer({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  const panel = (t: string, children: React.ReactNode) => <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(162,61,255,.25)", borderRadius: 14, padding: "16px 18px", marginBottom: 14 }}><Sec t={t} s={{ marginBottom: 11 }} />{children}</div>;
  const chips = (arr: string[]) => <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{arr.map((s, i) => <span key={i} style={{ font: '500 8.5pt/1 "Inter",sans-serif', color: "#F0DEFF", border: "1px solid rgba(162,61,255,.4)", borderRadius: 99, padding: "6px 11px" }}>{s}</span>)}</div>;
  const wave = [30, 55, 80, 45, 95, 60, 35, 75, 50, 88, 40, 68, 92, 52, 78, 36, 62, 84, 48, 70, 30, 58, 86, 44];
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#0E0B16", color: "#CFC9DA", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ padding: "46px 54px 24px", position: "relative" }}>
        <h1 style={{ fontFamily: sg, fontWeight: 700, fontSize: "42pt", lineHeight: .96, letterSpacing: "-.02em", margin: 0, color: "#fff" }}>{basics.fullName}</h1>
        <p style={{ fontWeight: 600, fontSize: "12pt", margin: "8px 0 0", background: "linear-gradient(90deg,#FF7A3D,#FFC93D)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{basics.role}</p>
        <div style={{ margin: "16px 0 0", font: '500 9pt/1 "Inter",sans-serif', color: "#877F9C", display: "flex", flexWrap: "wrap", gap: "6px 16px" }}>{contact.map((c, i) => <span key={i}>{c}</span>)}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 3, height: 50, margin: "6px 54px 0" }}>{wave.map((h, i) => <i key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 2, background: "linear-gradient(180deg,#FF7A3D,#A23DFF)" }} />)}</div>
      <div style={{ padding: "24px 54px 46px", display: "grid", gridTemplateColumns: "1fr 228px", gap: 32 }}>
        <div>
          {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#A39CB8", lineHeight: 1.6, margin: "0 0 22px" }} /></>}
          <Sec t={getLabel(data, "experience")} />
          {experience.map((e, i) => (<div key={i} style={{ marginBottom: 14 }}>
            <p style={{ fontFamily: sg, fontWeight: 600, fontSize: "11.5pt", color: "#fff", margin: 0 }}>{e.role}</p>
            <p style={{ font: '500 9.5pt/1.4 "Inter",sans-serif', background: "linear-gradient(90deg,#FF9A5D,#C26DFF)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", margin: "2px 0 5px" }}>{e.company}{e.company && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate, e.current)}</p>
            <BulletsRender bullets={e.bullets} className="sp-b" style={{ color: "#A39CB8", fontSize: "10pt", lineHeight: 1.5, margin: 0, padding: 0, listStyle: "none" }} />
          </div>))}
          <Sec t={getLabel(data, "education")} />
          {education.map((e, i) => (<div key={i} style={{ marginBottom: 8 }}>
            <p style={{ fontFamily: sg, fontWeight: 600, fontSize: "11.5pt", color: "#fff", margin: 0 }}>{e.degree}</p>
            <p style={{ font: '500 9.5pt/1.4 "Inter",sans-serif', color: "#C26DFF", margin: "2px 0 0" }}>{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</p>
          </div>))}
        </div>
        <div>
          {skills.length > 0 && panel(getLabel(data, "skills"), chips(skills))}
          {certifications.length > 0 && panel(getLabel(data, "certifications"), <div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#A39CB8" }}>{certifications.map((c, i) => <React.Fragment key={i}><b style={{ color: "#fff", fontWeight: 600 }}>{c.name}</b>{c.year ? ` (${c.year})` : ""}<br /></React.Fragment>)}</div>)}
          {languages.length > 0 && panel(getLabel(data, "languages"), <div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#A39CB8" }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#fff", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}<br /></React.Fragment>)}</div>)}
        </div>
      </div>
      <style>{`.sp-b li{position:relative;padding-left:15px;margin-bottom:4px}.sp-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
