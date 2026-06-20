// RoyalBlueCorporate — Business / Operations / corporate managers
// Classic blue sidebar with photo, skill bars and contact; clean white body. supportsPhoto:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const Sec = ({ t }: { t: string }) => <h2 style={{ fontSize: "10pt", fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase", color: "#16315E", margin: "28px 0 13px", display: "flex", alignItems: "center", gap: 10 }}><span style={{ width: 22, height: 3, background: "#4A78C4", borderRadius: 3 }} />{t}</h2>;

export default function RoyalBlueCorporate({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const sideH = (t: string) => <h2 style={{ fontSize: "9pt", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "#8FB4E8", margin: "26px 0 12px", paddingBottom: 7, borderBottom: "1px solid rgba(143,180,232,.25)" }}>{t}</h2>;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#fff", color: "#1B2433", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt", display: "flex" }}>
      <aside style={{ width: 268, background: "#16315E", color: "#DCE6F5", padding: "46px 28px", flexShrink: 0 }}>
        <div style={{ width: 120, height: 120, borderRadius: "50%", margin: "0 auto 22px", background: "linear-gradient(150deg,#4A78C4,#16315E)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 5px rgba(255,255,255,.12)", overflow: "hidden" }}>
          {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: "38pt", fontWeight: 700, color: "#fff" }}>{initials(basics.fullName)}</span>}
        </div>
        {sideH("Contact")}
        <div style={{ fontSize: "9.5pt", lineHeight: 1.7, color: "#BFD2EE", wordBreak: "break-word" }}>
          {([["Email", basics.email], ["Phone", basics.phone], ["Location", basics.location], ["Web", basics.website]] as [string, string | undefined][]).filter(([, v]) => v).map(([k, v]) => (
            <div key={k} style={{ marginBottom: 7 }}><b style={{ display: "block", fontSize: "8pt", letterSpacing: ".08em", textTransform: "uppercase", color: "#8FB4E8", fontWeight: 600 }}>{k}</b>{v}</div>
          ))}
        </div>
        {skills.length > 0 && <>{sideH("Skills")}{skills.slice(0, 6).map((s, i) => (<div key={i} style={{ marginBottom: 11 }}>
          <div style={{ fontSize: "9.5pt", fontWeight: 500, color: "#DCE6F5", marginBottom: 5 }}>{s}</div>
          <div style={{ height: 6, borderRadius: 99, background: "rgba(255,255,255,.12)" }}><i style={{ display: "block", height: "100%", borderRadius: 99, width: `${93 - i * 5}%`, background: "#5E9BE6" }} /></div>
        </div>))}</>}
        {languages.length > 0 && <>{sideH("Languages")}<div style={{ fontSize: "9.5pt", lineHeight: 1.8, color: "#BFD2EE" }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#fff", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}<br /></React.Fragment>)}</div></>}
      </aside>
      <div style={{ flex: 1, padding: "46px 44px" }}>
        <h1 style={{ fontSize: "30pt", fontWeight: 800, letterSpacing: "-.02em", lineHeight: 1.02, margin: 0, color: "#16315E" }}>{basics.fullName}</h1>
        <p style={{ fontSize: "12.5pt", fontWeight: 600, color: "#4A78C4", margin: "6px 0 0", letterSpacing: ".02em" }}>{basics.role}</p>
        {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#4A5468", lineHeight: 1.6, margin: 0 }} /></>}
        <Sec t={getLabel(data, "experience")} />
        {experience.map((e, i) => (
          <div key={i} style={{ marginBottom: 15 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
              <p style={{ fontSize: "11.5pt", fontWeight: 700, color: "#1B2433", margin: 0 }}>{e.role}{e.company && <span style={{ fontWeight: 500, color: "#4A78C4" }}> · {e.company}</span>}</p>
              <span style={{ fontSize: "9pt", fontWeight: 500, color: "#8A94A6", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
            </div>
            <BulletsRender bullets={e.bullets} className="rb-b" style={{ color: "#4A5468", marginTop: 5, fontSize: "10pt", lineHeight: 1.5, padding: 0, listStyle: "none" }} />
          </div>
        ))}
        <Sec t={getLabel(data, "education")} />
        {education.map((e, i) => (<div key={i} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
            <p style={{ fontSize: "11.5pt", fontWeight: 700, color: "#1B2433", margin: 0 }}>{e.degree}</p>
            <span style={{ fontSize: "9pt", fontWeight: 500, color: "#8A94A6", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate)}</span>
          </div>
          <p style={{ margin: "3px 0 0", color: "#4A5468" }}>{e.school}{e.notes ? ` · ${e.notes}` : ""}</p>
        </div>))}
        {certifications.length > 0 && <><Sec t={getLabel(data, "certifications")} /><p style={{ margin: 0, color: "#4A5468", lineHeight: 1.7 }}>{certifications.map((c, i) => <React.Fragment key={i}>{c.name}{c.issuer ? ` — ${c.issuer}` : ""}{c.year ? ` (${c.year})` : ""}{i < certifications.length - 1 ? " · " : ""}</React.Fragment>)}</p></>}
      </div>
      <style>{`.rb-b li{position:relative;padding-left:15px;margin-bottom:4px}.rb-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
