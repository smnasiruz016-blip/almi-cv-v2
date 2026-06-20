// CustomerServiceCoral — Customer service / success / CX
// Friendly coral sidebar with photo, skill bars and a metrics strip (from CV data). supportsPhoto:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const Sec = ({ t }: { t: string }) => <h2 style={{ fontSize: "10pt", fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: "#E0563F", margin: "26px 0 12px", display: "flex", alignItems: "center", gap: 9 }}><span style={{ width: 18, height: 3, background: "#FF6F61", borderRadius: 3 }} />{t}</h2>;

export default function CustomerServiceCoral({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const sideH = (t: string) => <h2 style={{ fontSize: "9pt", fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase", color: "#E0563F", margin: "24px 0 12px" }}>{t}</h2>;
  const stats = [{ n: experience.length, l: "Positions" }, { n: skills.length, l: "Skills" }, certifications.length ? { n: certifications.length, l: "Certs" } : { n: languages.length, l: "Languages" }].filter((s) => s.n > 0);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#fff", color: "#2B2230", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt", display: "flex" }}>
      <aside style={{ width: 256, flexShrink: 0, background: "#FFF1ED", padding: "44px 28px" }}>
        <div style={{ width: 116, height: 116, borderRadius: 24, margin: "0 auto 22px", background: "linear-gradient(150deg,#FFB3A0,#FF6F61)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 20px rgba(255,111,97,.3)", overflow: "hidden" }}>
          {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontWeight: 800, fontSize: "40pt", color: "#fff" }}>{initials(basics.fullName)}</span>}
        </div>
        {sideH("Contact")}
        <div style={{ fontSize: "9.5pt", lineHeight: 1.5, color: "#6B5C6E" }}>{([["Email", basics.email], ["Phone", basics.phone], ["Location", basics.location], ["Web", basics.website]] as [string, string | undefined][]).filter(([, v]) => v).map(([k, v]) => <div key={k} style={{ marginBottom: 9 }}><b style={{ display: "block", fontSize: "7.5pt", letterSpacing: ".1em", textTransform: "uppercase", color: "#C0735F", marginBottom: 1 }}>{k}</b>{v}</div>)}</div>
        {skills.length > 0 && <>{sideH("Skills")}{skills.slice(0, 6).map((s, i) => (<div key={i} style={{ marginBottom: 11 }}>
          <div style={{ font: '600 9pt/1 "Inter",sans-serif', color: "#4A3D4E", marginBottom: 5 }}>{s}</div>
          <div style={{ height: 7, borderRadius: 99, background: "#FBD9D0" }}><i style={{ display: "block", height: "100%", borderRadius: 99, width: `${95 - i * 5}%`, background: "#FF6F61" }} /></div>
        </div>))}</>}
        {languages.length > 0 && <>{sideH("Languages")}<div style={{ fontSize: "9.5pt", lineHeight: 1.5, color: "#6B5C6E" }}>{languages.map((l, i) => <div key={i} style={{ marginBottom: 9 }}><b style={{ display: "block", fontSize: "7.5pt", letterSpacing: ".1em", textTransform: "uppercase", color: "#C0735F", marginBottom: 1 }}>{l.name}</b>{l.level}</div>)}</div></>}
      </aside>
      <div style={{ flex: 1, padding: "44px 40px" }}>
        <h1 style={{ fontSize: "30pt", fontWeight: 800, letterSpacing: "-.02em", lineHeight: 1, margin: 0, color: "#E0563F" }}>{basics.fullName}</h1>
        <p style={{ fontSize: "12.5pt", fontWeight: 600, color: "#6B5C6E", margin: "6px 0 0" }}>{basics.role}</p>
        {stats.length === 3 && <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, margin: "22px 0 6px" }}>{stats.map((s, i) => <div key={i} style={{ background: "#FFF7F4", border: "1px solid #FBE0D8", borderRadius: 12, padding: 12, textAlign: "center" }}><div style={{ fontWeight: 800, fontSize: "18pt", color: "#FF6F61", lineHeight: 1 }}>{s.n}</div><div style={{ font: '500 7.5pt/1.2 "Inter",sans-serif', textTransform: "uppercase", letterSpacing: ".06em", color: "#8A7B8E", marginTop: 5 }}>{s.l}</div></div>)}</div>}
        {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#5A4E5E", lineHeight: 1.6, margin: 0 }} /></>}
        <Sec t={getLabel(data, "experience")} />
        {experience.map((e, i) => (<div key={i} style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
            <p style={{ fontSize: "11.5pt", fontWeight: 700, color: "#2B2230", margin: 0 }}>{e.role}{e.company && <span style={{ fontWeight: 500, color: "#E0563F" }}> · {e.company}</span>}</p>
            <span style={{ font: '600 8.5pt/1 "Inter",sans-serif', color: "#A395A7", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
          </div>
          <BulletsRender bullets={e.bullets} className="cc-b" style={{ color: "#5A4E5E", marginTop: 5, fontSize: "10pt", lineHeight: 1.5, padding: 0, listStyle: "none" }} />
        </div>))}
        <Sec t={getLabel(data, "education")} />
        {education.map((e, i) => (<div key={i} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
            <p style={{ fontSize: "11.5pt", fontWeight: 700, color: "#2B2230", margin: 0 }}>{e.degree}</p>
            <span style={{ font: '600 8.5pt/1 "Inter",sans-serif', color: "#A395A7", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate)}</span>
          </div>
          <p style={{ margin: "3px 0 0", color: "#5A4E5E" }}>{e.school}{e.notes ? ` · ${e.notes}` : ""}</p>
        </div>))}
      </div>
      <style>{`.cc-b li{position:relative;padding-left:15px;margin-bottom:4px}.cc-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
