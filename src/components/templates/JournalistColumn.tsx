// JournalistColumn — Journalists / writers / editors
// Newspaper masthead, drop-cap lead and two-column body. Monochrome editorial. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, stripHtml } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const fr = '"Fraunces",Georgia,serif';
const Sec = ({ t, s }: { t: string; s?: React.CSSProperties }) => <h2 style={{ font: '600 9pt/1 "Inter",sans-serif', letterSpacing: ".22em", textTransform: "uppercase", color: "#111", margin: "26px 0 14px", paddingBottom: 8, borderBottom: "2px solid #111", ...s }}>{t}</h2>;

export default function JournalistColumn({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [] } = data;
  const lead = stripHtml(basics.summary ?? "");
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#FCFBF8", color: "#1A1A1A", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ padding: "52px 60px 50px" }}>
        <div style={{ borderTop: "3px solid #1A1A1A", borderBottom: "1px solid #1A1A1A", padding: "10px 0", display: "flex", justifyContent: "space-between", alignItems: "center", font: '600 8.5pt/1 "Inter",sans-serif', letterSpacing: ".14em", textTransform: "uppercase", color: "#5A5A5A", marginBottom: 22 }}>
          <span>Curriculum Vitae</span><span>{basics.location || ""}</span>
        </div>
        <h1 style={{ fontFamily: fr, fontWeight: 500, fontSize: "46pt", letterSpacing: "-.02em", lineHeight: 1, margin: 0, textAlign: "center", color: "#111" }}>{basics.fullName}</h1>
        <p style={{ fontFamily: fr, fontStyle: "italic", fontSize: "14pt", color: "#444", margin: "8px 0 0", textAlign: "center" }}>{basics.role}</p>
        <p style={{ margin: "12px 0 0", textAlign: "center", font: '400 9pt/1 "Inter",sans-serif', color: "#666" }}>{[basics.email, basics.phone, basics.website].filter(Boolean).join("   ·   ")}</p>
        <hr style={{ border: 0, borderTop: "1px solid #1A1A1A", margin: "22px 0" }} />
        {lead && <p className="jc-lead" style={{ columns: 2, columnGap: 28, color: "#333", lineHeight: 1.6, textAlign: "justify" }}>{lead}</p>}
        <Sec t={getLabel(data, "experience")} />
        {experience.map((e, i) => (<div key={i} style={{ marginBottom: 15 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
            <p style={{ fontFamily: fr, fontWeight: 600, fontSize: "12.5pt", color: "#111", margin: 0 }}>{e.role}{e.company && <span style={{ fontStyle: "italic", color: "#555", fontSize: "10.5pt" }}> · {e.company}</span>}</p>
            <span style={{ font: '500 9pt/1 "Inter",sans-serif', color: "#777", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
          </div>
          <BulletsRender bullets={e.bullets} className="jc-b" style={{ color: "#333", marginTop: 5, fontSize: "10pt", lineHeight: 1.5, padding: 0, listStyle: "none" }} />
        </div>))}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 34 }}>
          <div>
            <Sec t={getLabel(data, "education")} />
            {education.map((e, i) => (<div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                <p style={{ fontFamily: fr, fontWeight: 600, fontSize: "12.5pt", color: "#111", margin: 0 }}>{e.degree}</p>
                <span style={{ font: '500 9pt/1 "Inter",sans-serif', color: "#777", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate)}</span>
              </div>
              <p style={{ color: "#333", margin: "2px 0 0" }}>{e.school}{e.notes ? ` · ${e.notes}` : ""}</p>
            </div>))}
          </div>
          <div>
            {skills.length > 0 && <><Sec t={getLabel(data, "skills")} /><p style={{ display: "flex", flexWrap: "wrap", gap: "5px 14px", color: "#333", fontSize: "10pt", margin: 0 }}>{skills.map((s, i) => <span key={i}>{s}{i < skills.length - 1 ? " ·" : ""}</span>)}</p></>}
            {languages.length > 0 && <><Sec t={getLabel(data, "languages")} s={{ marginTop: 18 }} /><p style={{ color: "#333", lineHeight: 1.7, margin: 0 }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#111", fontWeight: 600 }}>{l.name}</b>{l.level ? ` ${l.level}` : ""}{i < languages.length - 1 ? " · " : ""}</React.Fragment>)}</p></>}
          </div>
        </div>
      </div>
      <style>{`.jc-lead::first-letter{font-family:${fr};font-weight:600;font-size:44pt;float:left;line-height:.8;padding:4px 8px 0 0;color:#111}.jc-b li{position:relative;padding-left:15px;margin-bottom:4px}.jc-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
