// TimelineVideoEditor — Video editors / motion designers
// Dark editor UI with a colourful timeline scrubber and gradient stat tiles (from CV data). atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const sg = '"Space Grotesk","Inter",sans-serif';
const Sec = ({ t, s }: { t: string; s?: React.CSSProperties }) => <h2 style={{ fontFamily: sg, fontWeight: 600, fontSize: "10.5pt", color: "#fff", margin: "0 0 13px", display: "flex", alignItems: "center", gap: 9, ...s }}><span style={{ width: 14, height: 14, borderRadius: 3, background: "linear-gradient(135deg,#FF4D9D,#7C5CFF)" }} />{t}</h2>;

export default function TimelineVideoEditor({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  const panel = (t: string, children: React.ReactNode) => <div style={{ background: "#1F1C2E", border: "1px solid #322D47", borderRadius: 14, padding: "16px 18px", marginBottom: 14 }}><Sec t={t} s={{ marginBottom: 11 }} />{children}</div>;
  const chips = (arr: string[]) => <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{arr.map((s, i) => <span key={i} style={{ font: '500 8.5pt/1 "Inter",sans-serif', color: "#E4DEFF", border: "1px solid #443C5F", borderRadius: 99, padding: "6px 11px" }}>{s}</span>)}</div>;
  const seg = [["18%", "#FF4D9D"], ["12%", "#7C5CFF"], ["22%", "#3DD6C4"], ["9%", "#FFB84D"], ["16%", "#7C5CFF"], ["14%", "#FF4D9D"]];
  const stats = [{ n: experience.length, l: "Positions" }, { n: skills.length, l: "Skills" }, certifications.length ? { n: certifications.length, l: "Certs" } : { n: languages.length, l: "Languages" }].filter((s) => s.n > 0);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#15131F", color: "#D6D2E0", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ padding: "46px 54px 30px", position: "relative" }}>
        <h1 style={{ fontFamily: sg, fontWeight: 700, fontSize: "40pt", lineHeight: .96, letterSpacing: "-.02em", margin: 0, color: "#fff" }}>{basics.fullName}</h1>
        <p style={{ fontWeight: 600, fontSize: "12pt", margin: "8px 0 0", background: "linear-gradient(90deg,#FF4D9D,#7C5CFF)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{basics.role}</p>
        <div style={{ margin: "16px 0 0", font: '500 9pt/1 "Inter",sans-serif', color: "#8A85A0", display: "flex", flexWrap: "wrap", gap: "6px 16px" }}>{contact.map((c, i) => <span key={i}>{c}</span>)}</div>
      </div>
      <div style={{ margin: "8px 54px 0", height: 38, background: "#1F1C2E", border: "1px solid #322D47", borderRadius: 8, display: "flex", alignItems: "center", padding: "0 12px", gap: 6, position: "relative" }}>
        {seg.map(([w, c], i) => <i key={i} style={{ width: w, height: 14, borderRadius: 2, background: c }} />)}
        <div style={{ position: "absolute", left: "34%", top: -4, bottom: -4, width: 2, background: "#FF4D9D", boxShadow: "0 0 8px #FF4D9D" }} />
      </div>
      <div style={{ padding: "26px 54px 46px", display: "grid", gridTemplateColumns: "1fr 224px", gap: 32 }}>
        {stats.length === 3 && <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, gridColumn: "1 / -1", marginBottom: 6 }}>{stats.map((s, i) => <div key={i} style={{ background: "#1F1C2E", border: "1px solid #322D47", borderRadius: 12, padding: 14, textAlign: "center" }}><div style={{ fontFamily: sg, fontWeight: 700, fontSize: "21pt", background: "linear-gradient(90deg,#FF4D9D,#7C5CFF)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", lineHeight: 1 }}>{s.n}</div><div style={{ font: '500 8pt/1.3 "Inter",sans-serif', textTransform: "uppercase", letterSpacing: ".08em", color: "#8A85A0", marginTop: 5 }}>{s.l}</div></div>)}</div>}
        <div>
          {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#ADA8C0", lineHeight: 1.6, margin: "0 0 22px" }} /></>}
          <Sec t={getLabel(data, "experience")} />
          {experience.map((e, i) => (<div key={i} style={{ marginBottom: 14 }}>
            <p style={{ fontFamily: sg, fontWeight: 600, fontSize: "11.5pt", color: "#fff", margin: 0 }}>{e.role}</p>
            <p style={{ font: '500 9.5pt/1.4 "Inter",sans-serif', background: "linear-gradient(90deg,#FF77B5,#9A82FF)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", margin: "2px 0 5px" }}>{e.company}{e.company && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate, e.current)}</p>
            <BulletsRender bullets={e.bullets} className="tv-b" style={{ color: "#ADA8C0", fontSize: "10pt", lineHeight: 1.5, margin: 0, padding: 0, listStyle: "none" }} />
          </div>))}
          <Sec t={getLabel(data, "education")} />
          {education.map((e, i) => (<div key={i} style={{ marginBottom: 8 }}>
            <p style={{ fontFamily: sg, fontWeight: 600, fontSize: "11.5pt", color: "#fff", margin: 0 }}>{e.degree}</p>
            <p style={{ font: '500 9.5pt/1.4 "Inter",sans-serif', color: "#9A82FF", margin: "2px 0 0" }}>{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</p>
          </div>))}
        </div>
        <div>
          {skills.length > 0 && panel(getLabel(data, "skills", "Software"), chips(skills))}
          {certifications.length > 0 && panel(getLabel(data, "certifications"), <div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#ADA8C0" }}>{certifications.map((c, i) => <React.Fragment key={i}><b style={{ color: "#fff", fontWeight: 600 }}>{c.name}</b>{c.year ? ` (${c.year})` : ""}<br /></React.Fragment>)}</div>)}
          {languages.length > 0 && panel(getLabel(data, "languages"), <div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#ADA8C0" }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#fff", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}<br /></React.Fragment>)}</div>)}
        </div>
      </div>
      <style>{`.tv-b li{position:relative;padding-left:15px;margin-bottom:4px}.tv-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
