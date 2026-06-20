// LabNoteScientist — Researchers / scientists / academia
// Cobalt header with hex molecule motif and a numbered publications list (from CV projects). atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, stripHtml } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const fr = '"Fraunces",Georgia,serif';
const Sec = ({ t, s }: { t: string; s?: React.CSSProperties }) => <h2 style={{ fontWeight: 700, fontSize: "9pt", letterSpacing: ".2em", textTransform: "uppercase", color: "#16356B", margin: "0 0 12px", display: "flex", alignItems: "center", gap: 10, ...s }}><i style={{ width: 7, height: 8, clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)", background: "#2E78B5", display: "inline-block" }} />{t}<span style={{ flex: 1, height: 1, background: "#D2DCEA" }} /></h2>;

export default function LabNoteScientist({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], projects = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#fff", color: "#182233", fontFamily: '"Inter",sans-serif', fontSize: "10pt", lineHeight: 1.5 }}>
      <div style={{ background: "#16356B", color: "#DCE6F5", padding: "42px 56px 36px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: 44, top: 30, width: 64, height: 70, clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)", background: "rgba(110,160,230,.25)" }} />
        <div style={{ position: "absolute", right: 96, top: 70, width: 44, height: 48, clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)", background: "rgba(110,160,230,.18)" }} />
        <h1 style={{ fontFamily: fr, fontWeight: 500, fontSize: "32pt", letterSpacing: "-.01em", lineHeight: 1, margin: 0, color: "#fff" }}>{basics.fullName}</h1>
        <p style={{ fontWeight: 600, fontSize: "11.5pt", color: "#8FB4E8", margin: "8px 0 0" }}>{basics.role}</p>
        <div style={{ margin: "16px 0 0", font: '400 9pt/1 "Inter",sans-serif', color: "#A8BEDD", display: "flex", flexWrap: "wrap", gap: "5px 16px" }}>{contact.map((c, i) => <span key={i}>{c}</span>)}</div>
      </div>
      <div style={{ padding: "30px 56px 46px" }}>
        {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#3A4961", margin: "0 0 22px" }} /></>}
        <Sec t={getLabel(data, "experience")} />
        {experience.map((e, i) => (<div key={i} style={{ marginBottom: 13 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
            <p style={{ fontWeight: 700, fontSize: "11pt", color: "#182233", margin: 0 }}>{e.role}{e.company && <span style={{ fontWeight: 500, color: "#2E78B5" }}> · {e.company}</span>}</p>
            <span style={{ font: '500 8.5pt/1 "Inter",sans-serif', color: "#8492A6", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
          </div>
          <BulletsRender bullets={e.bullets} className="ln-b" style={{ color: "#3A4961", marginTop: 4, fontSize: "9.5pt", lineHeight: 1.45, padding: 0, listStyle: "none" }} />
        </div>))}
        {projects && projects.length > 0 && <><Sec t={getLabel(data, "projects", "Selected publications")} />
          <ol style={{ counterReset: "pub", padding: 0, margin: 0, listStyle: "none" }} className="ln-pubs">
            {projects.map((p, i) => <li key={i} style={{ position: "relative", paddingLeft: 26, marginBottom: 8, color: "#3A4961", fontSize: "9.5pt", lineHeight: 1.45 }}><b style={{ color: "#182233", fontWeight: 600 }}>{p.name}</b>{p.description ? ` — ${stripHtml(p.description)}` : ""}</li>)}
          </ol></>}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30, marginTop: 6 }}>
          <div>
            <Sec t={getLabel(data, "education")} />
            {education.map((e, i) => (<div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                <p style={{ fontWeight: 700, fontSize: "11pt", color: "#182233", margin: 0 }}>{e.degree}</p>
                <span style={{ font: '500 8.5pt/1 "Inter",sans-serif', color: "#8492A6", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate)}</span>
              </div>
              <p style={{ color: "#3A4961", margin: "2px 0 0" }}>{e.school}{e.notes ? ` · ${e.notes}` : ""}</p>
            </div>))}
            {certifications.length > 0 && <><Sec t={getLabel(data, "certifications")} s={{ marginTop: 4 }} /><p style={{ color: "#3A4961", margin: 0 }}>{certifications.map((c, i) => <React.Fragment key={i}><b style={{ color: "#182233", fontWeight: 600 }}>{c.name}</b>{c.year ? ` (${c.year})` : ""}{i < certifications.length - 1 ? " · " : ""}</React.Fragment>)}</p></>}
          </div>
          <div>
            {skills.length > 0 && <><Sec t={getLabel(data, "skills", "Techniques")} /><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{skills.map((s, i) => <span key={i} style={{ font: '500 8.5pt/1 "Inter",sans-serif', color: "#16356B", background: "#EAF1FA", borderRadius: 5, padding: "5px 9px" }}>{s}</span>)}</div></>}
            {languages.length > 0 && <><Sec t={getLabel(data, "languages")} s={{ marginTop: 16 }} /><p style={{ color: "#3A4961", margin: 0 }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#182233", fontWeight: 600 }}>{l.name}</b>{l.level ? ` ${l.level}` : ""}{i < languages.length - 1 ? " · " : ""}</React.Fragment>)}</p></>}
          </div>
        </div>
      </div>
      <style>{`.ln-pubs li:before{counter-increment:pub;content:counter(pub);position:absolute;left:0;top:0;width:17px;height:17px;border-radius:4px;background:#EAF1FA;color:#16356B;font:700 8pt/17px "Inter",sans-serif;text-align:center}.ln-b li{position:relative;padding-left:15px;margin-bottom:4px}.ln-b li:before{content:"";position:absolute;left:0;top:7px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
