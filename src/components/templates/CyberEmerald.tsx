// CyberEmerald — Office Managers, Operations Coordinators, IT Admin
// Deep emerald + neon green wave + isometric city motif.
"use client";

import React from "react";
import { TemplateProps, dateRange, BulletsRender, getLabel } from "./types";

export default function CyberEmerald({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"linear-gradient(160deg,#0B2A1F 0%,#04140D 100%)", color:"#E8FFF4", fontFamily:'"Plus Jakarta Sans","Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5 }}>
      <svg viewBox="0 0 794 800" preserveAspectRatio="none" style={{ position:"absolute", top:0, left:0, width:"100%", height:800, pointerEvents:"none" }}>
        <defs><linearGradient id="ce-w" x1="0" x2="1" y1="0" y2="0"><stop offset="0%" stopColor="#28E07C"/><stop offset="100%" stopColor="#0E5E33"/></linearGradient></defs>
        <path d="M -50 360 C 100 220 240 470 380 360 C 520 250 640 480 834 360 L 834 480 C 640 600 520 360 380 480 C 240 600 100 350 -50 480 Z" fill="url(#ce-w)" opacity="0.85"/>
        <path d="M -50 420 C 100 300 240 530 380 420 C 520 320 640 540 834 430 L 834 530 C 640 640 520 410 380 530 C 240 650 100 420 -50 540 Z" fill="#5BFFA0" opacity="0.18"/>
      </svg>
      <svg viewBox="0 0 220 220" style={{ position:"absolute", top:90, right:48, width:200, height:200 }}>
        <defs><linearGradient id="ce-oct" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#28E07C"/><stop offset="100%" stopColor="#0E5E33"/></linearGradient></defs>
        <polygon points="110,15 175,55 175,165 110,205 45,165 45,55" fill="none" stroke="url(#ce-oct)" strokeWidth="6"/>
        <polygon points="110,32 160,65 160,155 110,188 60,155 60,65" fill="rgba(40,224,124,0.10)"/>
      </svg>
      <svg viewBox="0 0 200 160" style={{ position:"absolute", right:36, top:500, width:200, height:160, opacity:0.85 }} fill="none" stroke="#28E07C" strokeWidth="1.2">
        <path d="M 30 100 L 90 70 L 150 100 L 90 130 Z" />
        <path d="M 60 80 L 60 50 L 90 35 L 90 65" /><path d="M 100 70 L 100 40 L 130 55 L 130 85" />
        <path d="M 75 90 L 75 60 L 105 75 L 105 105" fill="rgba(40,224,124,0.15)" />
      </svg>

      <div className="relative" style={{ padding:"52px 48px 40px" }}>
        <header className="mb-44">
          <h1 className="m-0" style={{ fontWeight:900, fontSize:"62pt", lineHeight:0.9, letterSpacing:"-0.03em", textTransform:"uppercase", color:"#FFFFFF", textShadow:"0 0 24px rgba(40,224,124,0.35)" }}>{splitName(basics.fullName)}</h1>
          <p className="m-0 mt-2" style={{ fontFamily:"Inter,sans-serif", fontSize:"22pt", color:"#28E07C", fontWeight:500 }}>{basics.role}</p>
          <div className="flex flex-wrap gap-y-1 gap-x-4 mt-3 text-[9.5pt]" style={{ color:"rgba(232,255,244,0.78)" }}>
            {basics.email && <span>{basics.email}</span>}
            {basics.phone && <span>· {basics.phone}</span>}
            {basics.location && <span>· {basics.location}</span>}
          </div>
        </header>

        <Card>
          <ST>{getLabel(data,"experience","Experience")}</ST>
          {experience.map((e,i)=>(
            <div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]" style={{ color:"#FFFFFF" }}>{e.company} — {e.role} <span style={{color:"#28E07C", fontWeight:500}}>({dateRange(e.startDate,e.endDate,e.current)})</span></p>
              <BulletsRender bullets={e.bullets} className="ce-b" style={{ margin:"3px 0 0", paddingLeft:18, fontSize:"10pt", color:"#B5DCC8" }} />
            </div>
          ))}
        </Card>

        <div className="grid gap-4 mb-5 mt-4" style={{ gridTemplateColumns:"1fr 1fr" }}>
          <Card>
            <ST>{getLabel(data,"skills","Skills")}</ST>
            <ul style={{ margin:0, padding:0, listStyle:"none", fontSize:"10.5pt", color:"#E8FFF4" }}>
              {skills.map((s,i)=>(<li key={i} className="relative mb-0.5" style={{ paddingLeft:16 }}><span style={{ position:"absolute", left:0, color:"#28E07C", fontWeight:700 }}>•</span>{s}</li>))}
            </ul>
          </Card>
          <Card>
            <ST>{getLabel(data,"certifications","Certifications")}</ST>
            <ul style={{ margin:0, padding:0, listStyle:"none", fontSize:"10pt", color:"#E8FFF4" }}>
              {certifications.map((c,i)=>(<li key={i} className="mb-1"><b className="font-bold">{c.name}</b>{c.issuer?<span style={{color:"#88C9A4"}}> · {c.issuer}</span>:""}{c.year?<span style={{color:"#88C9A4"}}> · {c.year}</span>:""}</li>))}
            </ul>
          </Card>
        </div>

        <Card>
          <ST>{getLabel(data,"education","Education")}</ST>
          {education.map((e,i)=>(
            <div key={i} className="mb-1.5 last:mb-0">
              <p className="m-0 font-bold text-[10.5pt]" style={{ color:"#FFFFFF" }}>{e.degree}</p>
              <p className="m-0 text-[10pt]" style={{ color:"#88C9A4" }}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p>
            </div>
          ))}
          {languages.length>0 && <p className="m-0 mt-3 text-[10pt]" style={{ color:"#B5DCC8" }}>{languages.map((l,i)=><React.Fragment key={i}><b style={{color:"#FFFFFF"}}>{l.name}</b> {l.level}{i<languages.length-1?" · ":""}</React.Fragment>)}</p>}
        </Card>
      </div>
    </article>
  );
}

function splitName(name?: string){ const p=(name??"").trim().split(/\s+/); if(p.length<2) return name; return (<>{p[0]}<br/>{p.slice(1).join(" ")}</>); }
function ST({ children }: { children: React.ReactNode }){ return <h2 className="uppercase" style={{ margin:0, marginBottom:10, fontWeight:800, fontSize:"15pt", letterSpacing:"0.05em", color:"#28E07C" }}>{children}</h2>; }
function Card({ children }: { children: React.ReactNode }){ return <section style={{ background:"rgba(20,80,50,0.30)", border:"1px solid rgba(40,224,124,0.30)", borderRadius:14, padding:"20px 24px", backdropFilter:"blur(10px)" }}>{children}</section>; }
