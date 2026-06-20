// MagazineCopywriter — Copywriters / content / editorial
// Editorial magazine spread with a bold pull-quote and two-column body. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, stripHtml } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const fr = '"Fraunces",Georgia,serif';
const Sec = ({ t }: { t: string }) => <h2 style={{ font: '600 9pt/1 "Inter",sans-serif', letterSpacing: ".2em", textTransform: "uppercase", color: "#111", margin: "0 0 12px", paddingBottom: 7, borderBottom: "1px solid #DADADA" }}>{t}</h2>;

export default function MagazineCopywriter({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  const quote = stripHtml(basics.summary ?? "");
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#FCFBF9", color: "#1A1A1A", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ padding: "56px 60px 50px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "3px solid #1A1A1A", paddingBottom: 8, font: '600 8.5pt/1 "Inter",sans-serif', letterSpacing: ".14em", textTransform: "uppercase", color: "#888" }}>
          <span>The Portfolio</span><span><b style={{ color: "#E0402F" }}>Copy</b> · Brand · Story</span><span>{basics.location || ""}</span>
        </div>
        <h1 style={{ fontFamily: fr, fontWeight: 500, fontSize: "52pt", letterSpacing: "-.03em", lineHeight: .98, margin: "22px 0 0", color: "#111" }}>{basics.fullName}</h1>
        <p style={{ fontFamily: fr, fontStyle: "italic", fontSize: "16pt", color: "#E0402F", margin: "6px 0 0" }}>{basics.role}</p>
        {quote && <p style={{ fontFamily: fr, fontWeight: 500, fontSize: "19pt", lineHeight: 1.3, color: "#1A1A1A", margin: "24px 0", paddingLeft: 20, borderLeft: "4px solid #E0402F" }}>{quote}</p>}
        <div style={{ font: '400 9.5pt/1 "Inter",sans-serif', color: "#666", display: "flex", flexWrap: "wrap", gap: "6px 16px", marginBottom: 22 }}>{contact.map((c, i) => <span key={i} style={{ color: "#1A1A1A" }}>{c}</span>)}</div>
        <div style={{ columns: 2, columnGap: 30 }}>
          <div style={{ breakInside: "avoid", marginBottom: 18 }}>
            <Sec t={getLabel(data, "experience")} />
            {experience.map((e, i) => (<div key={i} style={{ marginBottom: 13 }}>
              <p style={{ fontFamily: fr, fontWeight: 600, fontSize: "12pt", color: "#111", margin: 0 }}>{e.role}</p>
              {e.company && <p style={{ fontStyle: "italic", color: "#E0402F", fontSize: "9.5pt", margin: "1px 0 0" }}>{e.company}</p>}
              <p style={{ font: '500 8.5pt/1 "Inter",sans-serif', color: "#999", margin: "2px 0 5px" }}>{dateRange(e.startDate, e.endDate, e.current)}</p>
              <BulletsRender bullets={e.bullets} className="mc-b" style={{ color: "#333", fontSize: "9.5pt", lineHeight: 1.45, margin: 0, padding: 0, listStyle: "none" }} />
            </div>))}
          </div>
          {skills.length > 0 && <div style={{ breakInside: "avoid", marginBottom: 18 }}><Sec t={getLabel(data, "skills")} /><p style={{ color: "#333", fontSize: "9.5pt", lineHeight: 1.8, margin: 0 }}>{skills.map((s, i) => <span key={i}>{s}{i < skills.length - 1 ? "  ·  " : ""}</span>)}</p></div>}
          <div style={{ breakInside: "avoid", marginBottom: 18 }}>
            <Sec t={getLabel(data, "education")} />
            {education.map((e, i) => <p key={i} style={{ color: "#333", lineHeight: 1.7, margin: "0 0 6px" }}><b style={{ color: "#111", fontWeight: 600 }}>{e.degree}</b><br />{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</p>)}
          </div>
          {languages.length > 0 && <div style={{ breakInside: "avoid", marginBottom: 18 }}><Sec t={getLabel(data, "languages")} /><p style={{ color: "#333", lineHeight: 1.7, margin: 0 }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#111", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}{i < languages.length - 1 ? " · " : ""}</React.Fragment>)}</p></div>}
        </div>
      </div>
      <style>{`.mc-b li{position:relative;padding-left:14px;margin-bottom:3px}.mc-b li:before{content:"";position:absolute;left:0;top:7px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
