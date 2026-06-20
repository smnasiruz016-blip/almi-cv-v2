// HolographicIridescent — Photographers / creative / visual artists
// Iridescent pink-to-mint gradient over a dark canvas with gradient stat tiles (from CV data). atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const sg = '"Space Grotesk","Inter",sans-serif';
const Sec = ({ t, s }: { t: string; s?: React.CSSProperties }) => <h2 style={{ fontFamily: sg, fontWeight: 600, fontSize: "10.5pt", letterSpacing: ".04em", color: "#fff", margin: "0 0 13px", display: "flex", alignItems: "center", gap: 9, ...s }}><span style={{ width: 16, height: 3, borderRadius: 3, background: "linear-gradient(90deg,#FF6FB5,#5BFFD0)" }} />{t}</h2>;

export default function HolographicIridescent({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const panel: React.CSSProperties = { background: "rgba(255,255,255,.05)", border: "1px solid rgba(91,200,255,.25)", borderRadius: 14, padding: "16px 18px", marginBottom: 14 };
  const chips = (arr: string[]) => <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{arr.map((s, i) => <span key={i} style={{ font: '500 8.5pt/1 "Inter",sans-serif', color: "#E6DEFF", border: "1px solid rgba(160,107,255,.4)", borderRadius: 99, padding: "6px 11px" }}>{s}</span>)}</div>;
  const stats = [{ n: experience.length, l: "Positions" }, { n: skills.length, l: "Skills" }, certifications.length ? { n: certifications.length, l: "Certifications" } : { n: languages.length, l: "Languages" }].filter((s) => s.n > 0);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#0C0A18", color: "#D8D2E8", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ position: "relative", height: 300, overflow: "hidden", background: "linear-gradient(115deg,#FF6FB5 0%,#A06BFF 32%,#5BC8FF 60%,#5BFFD0 100%)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(70% 120% at 20% -10%, rgba(255,255,255,.4), transparent 50%), linear-gradient(180deg, transparent 40%, #0C0A18 100%)" }} />
        <div style={{ position: "absolute", left: 54, bottom: 38, zIndex: 2 }}>
          <h1 style={{ fontFamily: sg, fontWeight: 700, fontSize: "42pt", lineHeight: .96, letterSpacing: "-.03em", margin: 0, color: "#fff", textShadow: "0 2px 30px rgba(0,0,0,.3)" }}>{basics.fullName}</h1>
          <span style={{ fontWeight: 600, fontSize: "12pt", letterSpacing: ".08em", color: "#0C0A18", background: "rgba(255,255,255,.9)", display: "inline-block", padding: "5px 12px", borderRadius: 99, marginTop: 14 }}>{basics.role}</span>
        </div>
      </div>
      <div style={{ padding: "30px 54px 46px" }}>
        {stats.length === 3 && <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 28 }}>{stats.map((s, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(160,107,255,.3)", borderRadius: 14, padding: 16, textAlign: "center" }}>
            <div style={{ fontFamily: sg, fontWeight: 700, fontSize: "22pt", background: "linear-gradient(90deg,#FF6FB5,#5BC8FF)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", lineHeight: 1 }}>{s.n}</div>
            <div style={{ font: '500 8pt/1.3 "Inter",sans-serif', textTransform: "uppercase", letterSpacing: ".1em", color: "#9D93B8", marginTop: 6 }}>{s.l}</div>
          </div>))}</div>}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 224px", gap: 32 }}>
          <div>
            {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#B3ABC9", lineHeight: 1.6, margin: "0 0 24px" }} /></>}
            <Sec t={getLabel(data, "experience")} />
            {experience.map((e, i) => (<div key={i} style={{ marginBottom: 15 }}>
              <p style={{ fontFamily: sg, fontWeight: 600, fontSize: "11.5pt", color: "#fff", margin: 0 }}>{e.role}</p>
              <p style={{ font: '500 9.5pt/1.4 "Inter",sans-serif', background: "linear-gradient(90deg,#C18BFF,#5BC8FF)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", margin: "2px 0 6px" }}>{e.company}{e.company && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate, e.current)}</p>
              <BulletsRender bullets={e.bullets} className="hi-b" style={{ color: "#B3ABC9", fontSize: "10pt", lineHeight: 1.5, margin: 0, padding: 0, listStyle: "none" }} />
            </div>))}
            <Sec t={getLabel(data, "education")} />
            {education.map((e, i) => (<div key={i} style={{ marginBottom: 8 }}>
              <p style={{ fontFamily: sg, fontWeight: 600, fontSize: "11.5pt", color: "#fff", margin: 0 }}>{e.degree}</p>
              <p style={{ font: '500 9.5pt/1.4 "Inter",sans-serif', color: "#9AA0FF", margin: "2px 0 0" }}>{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</p>
            </div>))}
          </div>
          <div>
            {skills.length > 0 && <div style={panel}><Sec t={getLabel(data, "skills", "Craft")} s={{ marginBottom: 11 }} />{chips(skills)}</div>}
            {certifications.length > 0 && <div style={panel}><Sec t={getLabel(data, "certifications")} s={{ marginBottom: 11 }} /><div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#B3ABC9" }}>{certifications.map((c, i) => <React.Fragment key={i}><b style={{ color: "#fff", fontWeight: 600 }}>{c.name}</b>{c.year ? ` (${c.year})` : ""}<br /></React.Fragment>)}</div></div>}
            {languages.length > 0 && <div style={panel}><Sec t={getLabel(data, "languages")} s={{ marginBottom: 11 }} /><div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#B3ABC9" }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#fff", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}<br /></React.Fragment>)}</div></div>}
          </div>
        </div>
      </div>
      <style>{`.hi-b li{position:relative;padding-left:15px;margin-bottom:4px}.hi-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
