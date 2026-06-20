// ArcadeNeonGamedev — Game developers / gameplay programmers
// Dark arcade grid with neon magenta and cyan glow and mono code styling. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const sg = '"Space Grotesk","Inter",sans-serif';
const mono = '"JetBrains Mono","SFMono-Regular",monospace';
const Sec = ({ t, s }: { t: string; s?: React.CSSProperties }) => <h2 style={{ fontFamily: sg, fontWeight: 600, fontSize: "10.5pt", color: "#fff", margin: "0 0 13px", display: "flex", alignItems: "center", gap: 9, ...s }}><span style={{ width: 10, height: 10, background: "#FF2E97", boxShadow: "0 0 10px #FF2E97" }} />{t}</h2>;

export default function ArcadeNeonGamedev({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const np = (basics.fullName ?? "").trim().split(/\s+/);
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  const barSkills = skills.slice(0, 4), chipSkills = skills.slice(4);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#08070F", color: "#C9D2E8", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(46,230,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,46,151,.05) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ padding: "46px 54px 30px" }}>
          <h1 style={{ fontFamily: sg, fontWeight: 700, fontSize: "42pt", lineHeight: .96, letterSpacing: "-.02em", margin: 0, color: "#fff", textShadow: "0 0 18px rgba(46,230,255,.5)" }}>{np.slice(0, -1).join(" ") || basics.fullName} {np.length > 1 && <span style={{ color: "#FF2E97", textShadow: "0 0 18px rgba(255,46,151,.6)" }}>{np[np.length - 1]}</span>}</h1>
          <p style={{ fontFamily: mono, fontSize: "11pt", letterSpacing: ".1em", color: "#2EE6FF", margin: "12px 0 0" }}>&gt; {basics.role}</p>
          <div style={{ margin: "16px 0 0", font: `400 9pt/1 ${mono}`, color: "#6E7795", display: "flex", flexWrap: "wrap", gap: "6px 16px" }}>{contact.map((c, i) => <span key={i}>{c}</span>)}</div>
        </div>
        <div style={{ padding: "8px 54px 46px", display: "grid", gridTemplateColumns: "1fr 230px", gap: 32 }}>
          <div>
            {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#9AA3BE", lineHeight: 1.6, margin: "0 0 22px" }} /></>}
            <Sec t={getLabel(data, "experience")} />
            {experience.map((e, i) => (<div key={i} style={{ marginBottom: 14 }}>
              <p style={{ fontFamily: sg, fontWeight: 600, fontSize: "11.5pt", color: "#fff", margin: 0 }}>{e.role}</p>
              <p style={{ font: `500 9.5pt/1.4 ${mono}`, color: "#2EE6FF", margin: "2px 0 5px" }}>{e.company}{e.company && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate, e.current)}</p>
              <BulletsRender bullets={e.bullets} className="an-b" style={{ color: "#9AA3BE", fontSize: "10pt", lineHeight: 1.5, margin: 0, padding: 0, listStyle: "none" }} />
            </div>))}
            <Sec t={getLabel(data, "education")} />
            {education.map((e, i) => (<div key={i} style={{ marginBottom: 8 }}>
              <p style={{ fontFamily: sg, fontWeight: 600, fontSize: "11.5pt", color: "#fff", margin: 0 }}>{e.degree}</p>
              <p style={{ font: `500 9.5pt/1.4 ${mono}`, color: "#2EE6FF", margin: "2px 0 0" }}>{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</p>
            </div>))}
          </div>
          <div>
            {barSkills.length > 0 && <div style={{ background: "rgba(46,230,255,.04)", border: "1px solid rgba(46,230,255,.2)", borderRadius: 12, padding: "16px 18px", marginBottom: 14 }}>
              <Sec t={getLabel(data, "skills", "Engines & tech")} s={{ marginBottom: 11 }} />
              {barSkills.map((s, i) => (<div key={i} style={{ marginBottom: 9 }}>
                <div style={{ font: `500 9pt/1 ${mono}`, color: "#C9D2E8", marginBottom: 5 }}>{s}</div>
                <div style={{ height: 6, background: "rgba(255,255,255,.08)", borderRadius: 99 }}><i style={{ display: "block", height: "100%", borderRadius: 99, width: `${95 - i * 6}%`, background: "linear-gradient(90deg,#FF2E97,#2EE6FF)", boxShadow: "0 0 8px rgba(46,230,255,.5)" }} /></div>
              </div>))}
            </div>}
            {chipSkills.length > 0 && <div style={{ background: "rgba(255,46,151,.05)", border: "1px solid rgba(255,46,151,.25)", borderRadius: 12, padding: "16px 18px", marginBottom: 14 }}>
              <Sec t="Toolbox" s={{ marginBottom: 11 }} /><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{chipSkills.map((s, i) => <span key={i} style={{ font: `500 8.5pt/1 ${mono}`, color: "#2EE6FF", border: "1px solid rgba(46,230,255,.35)", borderRadius: 4, padding: "5px 9px" }}>{s}</span>)}</div>
            </div>}
            {certifications.length > 0 && <div style={{ background: "rgba(46,230,255,.04)", border: "1px solid rgba(46,230,255,.2)", borderRadius: 12, padding: "16px 18px", marginBottom: 14 }}><Sec t={getLabel(data, "certifications")} s={{ marginBottom: 11 }} /><div style={{ font: `400 9pt/1.7 ${mono}`, color: "#9AA3BE" }}>{certifications.map((c, i) => <React.Fragment key={i}><b style={{ color: "#fff", fontWeight: 700 }}>{c.name}</b>{c.year ? ` (${c.year})` : ""}<br /></React.Fragment>)}</div></div>}
            {languages.length > 0 && <div style={{ background: "rgba(46,230,255,.04)", border: "1px solid rgba(46,230,255,.2)", borderRadius: 12, padding: "16px 18px" }}><Sec t={getLabel(data, "languages")} s={{ marginBottom: 11 }} /><div style={{ font: `400 9pt/1.7 ${mono}`, color: "#9AA3BE" }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#fff", fontWeight: 700 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}<br /></React.Fragment>)}</div></div>}
          </div>
        </div>
      </div>
      <style>{`.an-b li{position:relative;padding-left:15px;margin-bottom:4px}.an-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
