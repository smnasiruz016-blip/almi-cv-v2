// BrutalistCreativeTech — Creative technologists / front-end / dev
// Stark neo-brutalist blocks, heavy borders and high-vis yellow. Unapologetic. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const arch = '"Archivo","Inter",sans-serif';
const mono = '"JetBrains Mono","SFMono-Regular",monospace';
const Sec = ({ t, s, dark }: { t: string; s?: React.CSSProperties; dark?: boolean }) => <h2 style={{ fontFamily: arch, fontWeight: 800, fontSize: "12pt", textTransform: "uppercase", letterSpacing: ".02em", margin: "0 0 12px", color: dark ? "#FFE100" : "#111", borderBottom: `3px solid ${dark ? "#FFE100" : "#111"}`, paddingBottom: 4, ...s }}>{t}</h2>;

export default function BrutalistCreativeTech({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const np = (basics.fullName ?? "").trim().split(/\s+/);
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  const chips = (arr: string[]) => <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{arr.map((s, i) => <span key={i} style={{ font: `500 8.5pt/1 ${mono}`, color: "#F4F2EC", border: "2px solid #555", padding: "5px 9px" }}>{s}</span>)}</div>;
  const stats = [{ k: "Roles", v: experience.length }, { k: "Skills", v: skills.length }, { k: "Edu", v: education.length }, certifications.length ? { k: "Certs", v: certifications.length } : { k: "Langs", v: languages.length }].filter((s) => s.v > 0).slice(0, 4);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#F4F2EC", color: "#111", fontFamily: mono, fontSize: "10pt" }}>
      <div style={{ padding: 40 }}>
        <div style={{ border: "3px solid #111", background: "#FFE100", padding: "26px 28px" }}>
          <h1 style={{ fontFamily: arch, fontWeight: 900, fontSize: "42pt", lineHeight: .9, letterSpacing: "-.02em", textTransform: "uppercase", margin: 0, color: "#111" }}>{np.slice(0, -1).join(" ") || basics.fullName}{np.length > 1 && <><br />{np[np.length - 1]}</>}</h1>
          <p style={{ fontFamily: mono, fontWeight: 700, fontSize: "11pt", letterSpacing: ".1em", textTransform: "uppercase", margin: "12px 0 0", color: "#111" }}>{basics.role}</p>
          <div style={{ margin: "14px 0 0", font: `500 9pt/1.5 ${mono}`, color: "#111", display: "flex", flexWrap: "wrap", gap: "2px 18px" }}>{contact.map((c, i) => <span key={i}>{c}</span>)}</div>
        </div>
        {stats.length >= 2 && <div style={{ display: "flex", border: "3px solid #111", borderTop: 0 }}>{stats.map((s, i) => <div key={i} style={{ flex: 1, padding: "12px 14px", borderRight: i < stats.length - 1 ? "3px solid #111" : "0" }}><div style={{ font: `700 8pt/1 ${mono}`, textTransform: "uppercase", letterSpacing: ".08em", color: "#777" }}>{s.k}</div><div style={{ fontFamily: arch, fontWeight: 800, fontSize: "16pt", color: "#111", marginTop: 4 }}>{s.v}</div></div>)}</div>}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", border: "3px solid #111", borderTop: 0 }}>
          <div style={{ padding: "22px 24px", borderRight: "3px solid #111" }}>
            {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ lineHeight: 1.6, color: "#222", margin: "0 0 22px" }} /></>}
            <Sec t={getLabel(data, "experience")} />
            {experience.map((e, i) => (<div key={i} style={{ marginBottom: 16 }}>
              <p style={{ fontFamily: arch, fontWeight: 700, fontSize: "12pt", color: "#111", margin: 0 }}>{e.role}</p>
              <p style={{ font: `500 9pt/1.4 ${mono}`, color: "#555", margin: "2px 0 6px" }}><span style={{ color: "#111", fontWeight: 700 }}>{e.company}</span>{e.company && (e.startDate || e.endDate) ? " / " : ""}{dateRange(e.startDate, e.endDate, e.current)}</p>
              <BulletsRender bullets={e.bullets} className="br-b" style={{ color: "#333", fontSize: "9.5pt", lineHeight: 1.5, margin: 0, padding: 0, listStyle: "none" }} />
            </div>))}
            <Sec t={getLabel(data, "education")} s={{ marginTop: 22 }} />
            {education.map((e, i) => (<div key={i} style={{ marginBottom: 8 }}>
              <p style={{ fontFamily: arch, fontWeight: 700, fontSize: "12pt", color: "#111", margin: 0 }}>{e.degree}</p>
              <p style={{ font: `500 9pt/1.4 ${mono}`, color: "#555", margin: "2px 0 0" }}><span style={{ color: "#111", fontWeight: 700 }}>{e.school}</span>{e.school && (e.startDate || e.endDate) ? " / " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` / ${e.notes}` : ""}</p>
            </div>))}
          </div>
          <div style={{ padding: "22px 20px", background: "#111", color: "#F4F2EC" }}>
            {skills.length > 0 && <><Sec t={getLabel(data, "skills", "Stack")} dark />{chips(skills)}</>}
            {certifications.length > 0 && <><Sec t={getLabel(data, "certifications")} dark s={{ marginTop: 22 }} /><div style={{ font: `400 9pt/1.7 ${mono}`, color: "#CFCDC6" }}>{certifications.map((c, i) => <React.Fragment key={i}><b style={{ color: "#FFE100", fontWeight: 700 }}>{c.name}</b>{c.year ? ` (${c.year})` : ""}<br /></React.Fragment>)}</div></>}
            {languages.length > 0 && <><Sec t={getLabel(data, "languages")} dark s={{ marginTop: 22 }} /><div style={{ font: `400 9pt/1.7 ${mono}`, color: "#CFCDC6" }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#FFE100", fontWeight: 700 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}<br /></React.Fragment>)}</div></>}
          </div>
        </div>
      </div>
      <style>{`.br-b li{position:relative;padding-left:15px;margin-bottom:4px}.br-b li:before{content:"";position:absolute;left:0;top:7px;width:5px;height:5px;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
