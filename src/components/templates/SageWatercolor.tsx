// SageWatercolor — Nurses / Healthcare / caregiving
// Soft sage and peach washes, circular photo, calm cards and credential chips. supportsPhoto:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const fr = '"Fraunces",Georgia,serif';
const Sec = ({ t, s, noLine }: { t: string; s?: React.CSSProperties; noLine?: boolean }) => (
  <h2 style={{ fontWeight: 700, fontSize: "9.5pt", letterSpacing: ".2em", textTransform: "uppercase", color: "#5E8264", margin: "30px 0 13px", display: "flex", alignItems: "center", gap: 10, ...s }}>{t}{!noLine && <span style={{ flex: 1, height: 1, background: "rgba(94,130,100,.25)" }} />}</h2>
);
const Card = ({ t, children }: { t: string; children: React.ReactNode }) => (
  <div style={{ background: "#fff", border: "1px solid #E4EBDF", borderRadius: 16, padding: "18px 20px", marginBottom: 16, boxShadow: "0 4px 16px rgba(127,174,134,.1)" }}>
    <Sec t={t} s={{ margin: "0 0 11px" }} noLine />{children}</div>
);

export default function SageWatercolor({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  const chips = (arr: string[]) => <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{arr.map((s, i) => <span key={i} style={{ font: '500 9pt/1 "Inter",sans-serif', color: "#5E8264", background: "#EFF4EA", borderRadius: 99, padding: "6px 11px" }}>{s}</span>)}</div>;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#FBFAF4", color: "#2F3B33", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt", lineHeight: 1.55 }}>
      <div style={{ position: "absolute", width: 360, height: 360, top: -150, right: -120, borderRadius: "50%", filter: "blur(6px)", opacity: .55, background: "radial-gradient(circle,#CADFC5,#CADFC5 40%,transparent 70%)" }} />
      <div style={{ position: "absolute", width: 300, height: 300, top: 60, left: -130, borderRadius: "50%", filter: "blur(6px)", opacity: .55, background: "radial-gradient(circle,#F3DCC8,#F3DCC8 40%,transparent 70%)" }} />
      <div style={{ position: "absolute", width: 320, height: 320, bottom: -150, right: -90, borderRadius: "50%", filter: "blur(6px)", opacity: .45, background: "radial-gradient(circle,#E8D6E4,#E8D6E4 40%,transparent 70%)" }} />
      <div style={{ position: "relative", zIndex: 2, padding: "56px 60px 50px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 26, marginBottom: 8 }}>
          <div style={{ width: 104, height: 104, borderRadius: "50%", flexShrink: 0, background: "linear-gradient(150deg,#A8CBA0,#7FAE86)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 6px #fff, 0 6px 20px rgba(127,174,134,.4)", overflow: "hidden" }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontFamily: fr, fontWeight: 500, fontSize: "36pt", color: "#fff" }}>{initials(basics.fullName)}</span>}
          </div>
          <div>
            <h1 style={{ fontFamily: fr, fontWeight: 500, fontSize: "36pt", letterSpacing: "-.02em", lineHeight: 1, margin: 0, color: "#36513E" }}>{basics.fullName}</h1>
            <p style={{ fontFamily: fr, fontStyle: "italic", fontWeight: 500, fontSize: "13pt", color: "#88A77F", margin: "8px 0 0" }}>{basics.role}</p>
            <p style={{ margin: "6px 0 0", font: '400 9.5pt/1.5 "Inter",sans-serif', color: "#6B7A6E" }}>{contact.map((c, i) => <span key={i}>{c}{i < contact.length - 1 ? "  ·  " : ""}</span>)}</p>
          </div>
        </div>
        {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#4A574E", lineHeight: 1.65, margin: "22px 0 0" }} /></>}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 232px", gap: 36 }}>
          <div>
            <Sec t={getLabel(data, "experience")} />
            {experience.map((e, i) => (<div key={i} style={{ marginBottom: 15 }}>
              <p style={{ fontFamily: fr, fontWeight: 600, fontSize: "12.5pt", color: "#36513E", margin: 0 }}>{e.role}</p>
              <p style={{ font: '500 10pt/1.4 "Inter",sans-serif', color: "#88A77F", margin: "2px 0 6px" }}>{e.company}{e.company && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate, e.current)}</p>
              <BulletsRender bullets={e.bullets} className="sw-b" style={{ color: "#4A574E", fontSize: "10pt", lineHeight: 1.5, margin: 0, padding: 0, listStyle: "none" }} />
            </div>))}
            <Sec t={getLabel(data, "education")} />
            {education.map((e, i) => (<div key={i} style={{ marginBottom: 8 }}>
              <div style={{ fontFamily: fr, fontWeight: 600, fontSize: "11.5pt", color: "#36513E" }}>{e.degree}</div>
              <div style={{ font: '400 9.5pt/1.5 "Inter",sans-serif', color: "#88A77F" }}>{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</div>
            </div>))}
          </div>
          <div>
            {certifications.length > 0 && <Card t={getLabel(data, "certifications", "Credentials")}>{chips(certifications.map((c) => c.year ? `${c.name} (${c.year})` : c.name))}</Card>}
            {skills.length > 0 && <Card t={getLabel(data, "skills", "Strengths")}>{chips(skills)}</Card>}
            {languages.length > 0 && <Card t={getLabel(data, "languages")}><div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#4A574E" }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#36513E", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}<br /></React.Fragment>)}</div></Card>}
          </div>
        </div>
      </div>
      <style>{`.sw-b li{position:relative;padding-left:15px;margin-bottom:4px}.sw-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
