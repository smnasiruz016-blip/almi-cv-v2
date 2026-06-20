// VioletGlass — Product designers / UX
// Violet→pink gradient, frosted glass cards and an impact-metrics strip (from CV data counts). supportsPhoto:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const Sec = ({ t }: { t: string }) => <h2 style={{ fontWeight: 800, fontSize: "9.5pt", letterSpacing: ".16em", textTransform: "uppercase", color: "#7C3AED", margin: "0 0 13px" }}>{t}</h2>;

export default function VioletGlass({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  const glass: React.CSSProperties = { background: "rgba(255,255,255,.55)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,.7)", borderRadius: 20, padding: "22px 24px", marginBottom: 16, boxShadow: "0 8px 30px rgba(124,58,237,.1)" };
  const metrics = [{ n: experience.length, l: "Positions" }, { n: skills.length, l: "Skills" }, certifications.length ? { n: certifications.length, l: "Certifications" } : { n: languages.length, l: "Languages" }].filter((m) => m.n > 0);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "linear-gradient(155deg,#F3EEFF 0%,#FBEEF6 45%,#FFF1EC 100%)", color: "#241B3A", fontFamily: '"Plus Jakarta Sans","Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ position: "absolute", width: 240, height: 240, top: -70, right: 40, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%,#C9A8FF,#8B5CF6)", opacity: .5, filter: "blur(30px)" }} />
      <div style={{ position: "absolute", width: 200, height: 200, bottom: 120, left: -60, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%,#FF9EC7,#FF6FA5)", opacity: .4, filter: "blur(34px)" }} />
      <div style={{ position: "relative", zIndex: 2, padding: "50px 52px 46px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 28 }}>
          <div style={{ width: 110, height: 110, borderRadius: 26, flexShrink: 0, background: "linear-gradient(150deg,#A78BFA,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 30px rgba(124,58,237,.35)", overflow: "hidden" }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontWeight: 800, fontSize: "38pt", color: "#fff" }}>{initials(basics.fullName)}</span>}
          </div>
          <div>
            <h1 style={{ fontWeight: 800, fontSize: "34pt", letterSpacing: "-.03em", lineHeight: 1, margin: 0, color: "#2E1065" }}>{basics.fullName}</h1>
            <p style={{ fontWeight: 600, fontSize: "12pt", color: "#8B5CF6", margin: "7px 0 0" }}>{basics.role}</p>
            <div style={{ margin: "9px 0 0", font: '500 9pt/1 "Plus Jakarta Sans",sans-serif', color: "#6B5B8A", display: "flex", flexWrap: "wrap", gap: "5px 14px" }}>{contact.map((c, i) => <span key={i}>{c}</span>)}</div>
          </div>
        </div>
        {basics.summary && <div style={glass}><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#4B3F66", lineHeight: 1.6, margin: 0 }} /></div>}
        {metrics.length === 3 && <div style={glass}><Sec t="At a glance" /><div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>{metrics.map((m, i) => <div key={i} style={{ textAlign: "center" }}><div style={{ fontWeight: 800, fontSize: "26pt", color: "#7C3AED", letterSpacing: "-.02em", lineHeight: 1 }}>{m.n}</div><div style={{ fontWeight: 600, fontSize: "8pt", letterSpacing: ".1em", textTransform: "uppercase", color: "#6B5B8A", marginTop: 5 }}>{m.l}</div></div>)}</div></div>}
        <div style={glass}><Sec t={getLabel(data, "experience")} />
          {experience.map((e, i) => (<div key={i} style={{ marginBottom: i < experience.length - 1 ? 14 : 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
              <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#2E1065", margin: 0 }}>{e.role}{e.company && <span style={{ fontWeight: 600, color: "#8B5CF6", fontSize: "10pt" }}> · {e.company}</span>}</p>
              <span style={{ fontWeight: 600, fontSize: "8.5pt", color: "#9D8FB8", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
            </div>
            <BulletsRender bullets={e.bullets} className="vg-b" style={{ color: "#4B3F66", marginTop: 5, fontSize: "9.5pt", lineHeight: 1.5, padding: 0, listStyle: "none" }} />
          </div>))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {skills.length > 0 && <div style={{ ...glass, margin: 0 }}><Sec t={getLabel(data, "skills")} /><div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>{skills.map((s, i) => <span key={i} style={{ fontWeight: 600, fontSize: "8.5pt", color: "#6D28D9", background: "rgba(167,139,250,.18)", border: "1px solid rgba(167,139,250,.4)", borderRadius: 99, padding: "6px 12px" }}>{s}</span>)}</div></div>}
          <div style={{ ...glass, margin: 0 }}><Sec t={`${getLabel(data, "education")} & ${getLabel(data, "languages").toLowerCase()}`} /><div style={{ fontWeight: 500, fontSize: "9.5pt", lineHeight: 1.7, color: "#4B3F66" }}>
            {education.map((e, i) => <React.Fragment key={i}><b style={{ color: "#2E1065", fontWeight: 700 }}>{e.degree}</b><br />{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}<br /></React.Fragment>)}
            {languages.length > 0 && <><br />{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#2E1065", fontWeight: 700 }}>{l.name}</b>{l.level ? ` ${l.level}` : ""}{i < languages.length - 1 ? " · " : ""}</React.Fragment>)}</>}
          </div></div>
        </div>
      </div>
      <style>{`.vg-b li{position:relative;padding-left:15px;margin-bottom:4px}.vg-b li:before{content:"";position:absolute;left:0;top:7px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
