// ArtDecoEventPlanner — Event planners / hospitality events
// Emerald-and-gold deco styling with fan motifs and centred serif elegance. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const fr = '"Fraunces",Georgia,serif';
const Sec = ({ t, s, sm }: { t: string; s?: React.CSSProperties; sm?: boolean }) => <h2 style={{ fontFamily: fr, fontWeight: 600, fontSize: sm ? "11pt" : "14pt", color: "#0E3B2E", margin: "0 0 14px", textAlign: "center", letterSpacing: ".02em", position: "relative", ...s }}><span style={{ background: "#FBF8F0", padding: "0 16px", position: "relative", zIndex: 2 }}>{t}</span><span style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: "#D8C99A" }} /></h2>;

export default function ArtDecoEventPlanner({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#FBF8F0", color: "#14302A", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ background: "#0E3B2E", color: "#EFE3C4", padding: "46px 56px 40px", position: "relative", textAlign: "center" }}>
        <div style={{ position: "absolute", left: 56, right: 56, top: 22, height: 2, background: "linear-gradient(90deg,transparent,#C9A24B 20%,#C9A24B 80%,transparent)" }} />
        <div style={{ position: "absolute", left: 56, right: 56, bottom: 22, height: 2, background: "linear-gradient(90deg,transparent,#C9A24B 20%,#C9A24B 80%,transparent)" }} />
        <div style={{ display: "flex", justifyContent: "center", gap: 5, marginBottom: 14, alignItems: "flex-end", height: 28 }}>{[12, 20, 28, 20, 12].map((h, i) => <i key={i} style={{ width: 2, height: h, background: "#C9A24B" }} />)}</div>
        <h1 style={{ fontFamily: fr, fontWeight: 500, fontSize: "38pt", letterSpacing: ".04em", lineHeight: 1, margin: 0, color: "#fff", textTransform: "uppercase" }}>{basics.fullName}</h1>
        <p style={{ fontWeight: 600, fontSize: "10.5pt", letterSpacing: ".3em", textTransform: "uppercase", color: "#D4AF5A", margin: "12px 0 0" }}>{basics.role}</p>
        <p style={{ margin: "14px 0 0", font: '400 9pt/1 "Inter",sans-serif', color: "#B7C7BD" }}>{contact.map((c, i) => <span key={i}>{c}{i < contact.length - 1 ? "   ·   " : ""}</span>)}</p>
      </div>
      <div style={{ padding: "34px 56px 48px" }}>
        {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#3C5249", lineHeight: 1.65, textAlign: "center", maxWidth: "90%", margin: "0 auto" }} /></>}
        <Sec t={getLabel(data, "experience")} s={{ marginTop: 26 }} />
        {experience.map((e, i) => (<div key={i} style={{ marginBottom: 15 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
            <p style={{ fontFamily: fr, fontWeight: 600, fontSize: "12.5pt", color: "#14302A", margin: 0 }}>{e.role}{e.company && <span style={{ fontWeight: 400, color: "#B08A2E", fontSize: "10.5pt" }}> · {e.company}</span>}</p>
            <span style={{ font: '500 9pt/1 "Inter",sans-serif', color: "#7A8C83", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
          </div>
          <BulletsRender bullets={e.bullets} className="ad-b" style={{ color: "#3C5249", marginTop: 5, fontSize: "10pt", lineHeight: 1.5, padding: 0, listStyle: "none" }} />
        </div>))}
        <Sec t="Craft & Education" s={{ marginTop: 26 }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36 }}>
          <div>
            <Sec t={getLabel(data, "skills", "Specialities")} sm s={{ margin: "0 0 12px" }} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>{skills.map((s, i) => <span key={i} style={{ font: '500 9pt/1 "Inter",sans-serif', color: "#0E3B2E", border: "1px solid #C9A24B", borderRadius: 2, padding: "6px 11px" }}>{s}</span>)}</div>
          </div>
          <div>
            <Sec t={getLabel(data, "education")} sm s={{ margin: "0 0 12px" }} />
            <p style={{ color: "#3C5249", textAlign: "center", lineHeight: 1.7, margin: 0 }}>
              {education.map((e, i) => <React.Fragment key={i}><b style={{ color: "#14302A", fontWeight: 600 }}>{e.degree}</b><br />{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}<br /></React.Fragment>)}
              {certifications.length > 0 && certifications.map((c, i) => <React.Fragment key={i}>{c.name}{c.year ? ` (${c.year})` : ""}<br /></React.Fragment>)}
              {languages.length > 0 && <><br />{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#14302A", fontWeight: 600 }}>{l.name}</b>{l.level ? ` ${l.level}` : ""}{i < languages.length - 1 ? " · " : ""}</React.Fragment>)}</>}
            </p>
          </div>
        </div>
      </div>
      <style>{`.ad-b li{position:relative;padding-left:15px;margin-bottom:4px}.ad-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
