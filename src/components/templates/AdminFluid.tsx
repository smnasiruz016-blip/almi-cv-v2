// AdminFluid — Admin Assistants, Office Coordinators, Executive Assistants
// Soft ice-blue base + flowing blue ribbons + glass content blocks.
"use client";

import React from "react";
import { TemplateProps, dateRange, BulletsRender, getLabel } from "./types";

export default function AdminFluid({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"linear-gradient(165deg,#EFF7FF 0%,#D9EAFA 100%)", color:"#0E2A52", fontFamily:'"Plus Jakarta Sans","Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <svg viewBox="0 0 794 1123" preserveAspectRatio="none" style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", opacity:0.95 }}>
        <defs><linearGradient id="af-r" x1="0" x2="1" y1="0" y2="0"><stop offset="0%" stopColor="#7AB0F2"/><stop offset="100%" stopColor="#1E54B3"/></linearGradient></defs>
        <path d="M -40 360 C 120 280 280 460 440 380 C 600 300 720 440 834 360 L 834 420 C 720 500 600 360 440 440 C 280 520 120 340 -40 420 Z" fill="url(#af-r)" opacity="0.9"/>
        <path d="M -40 880 C 100 800 260 970 420 880 C 600 780 720 940 834 860 L 834 920 C 720 1000 600 850 420 940 C 260 1030 100 870 -40 940 Z" fill="url(#af-r)" opacity="0.85"/>
        <g fill="#1E54B3" opacity="0.3">{Array.from({length:8}).map((_,r)=>Array.from({length:6}).map((_,c)=>(<circle key={`${r}-${c}`} cx={680+c*16} cy={520+r*16} r="1.8"/>)))}</g>
      </svg>

      <div className="relative" style={{ padding:"44px 48px 40px" }}>
        <header className="mb-10">
          <h1 className="m-0" style={{ fontWeight:900, fontSize:"54pt", lineHeight:0.9, letterSpacing:"-0.03em", textTransform:"uppercase", color:"#0E2A52" }}>{splitName(basics.fullName)}</h1>
          <p className="m-0 mt-2" style={{ fontWeight:600, fontSize:"16pt", color:"#1E54B3" }}>{basics.role}</p>
          <div className="flex flex-wrap gap-y-1 gap-x-4 mt-3 text-[9.5pt]" style={{ color:"#3A5A8A" }}>
            {basics.email && <span>✉ {basics.email}</span>}
            {basics.phone && <span>☎ {basics.phone}</span>}
            {basics.location && <span>⌖ {basics.location}</span>}
            {basics.linkedIn && <span>in/{basics.linkedIn}</span>}
          </div>
        </header>

        <div className="grid gap-5" style={{ gridTemplateColumns:"2fr 1fr", marginTop:240 }}>
          <Glass>
            <ST>{getLabel(data,"experience","Experience")}</ST>
            {experience.map((e,i)=>(
              <div key={i} className="mb-3 last:mb-0">
                <p className="m-0 font-bold text-[11.5pt]" style={{ color:"#0E2A52" }}>{e.role}{e.company?` — ${e.company}`:""}</p>
                <p className="m-0 text-[9pt]" style={{ color:"#1E54B3", fontWeight:600 }}>{dateRange(e.startDate, e.endDate, e.current)}</p>
                <BulletsRender bullets={e.bullets} className="af-b" style={{ margin:"3px 0 0", paddingLeft:18, fontSize:"10pt", color:"#3A5A8A" }} />
              </div>
            ))}
          </Glass>
          <Glass>
            <ST>{getLabel(data,"skills","Skills")}</ST>
            <ul style={{ margin:0, padding:0, listStyle:"none", fontSize:"10pt", color:"#0E2A52" }}>
              {skills.map((s,i)=>(<li key={i} style={{ padding:"4px 0", borderBottom:i<skills.length-1?"1px solid rgba(30,84,179,0.15)":"0" }}>{s}</li>))}
            </ul>
          </Glass>
        </div>

        <div className="grid gap-5 mt-5" style={{ gridTemplateColumns:"1fr 1fr" }}>
          <Glass>
            <ST>{getLabel(data,"education","Education")}</ST>
            {education.map((e,i)=>(
              <div key={i} className="mb-2 last:mb-0">
                <p className="m-0 font-bold text-[11pt]" style={{ color:"#0E2A52" }}>{e.degree}</p>
                <p className="m-0 text-[10pt]" style={{ color:"#3A5A8A" }}>{e.school}{e.endDate?` — ${e.endDate}`:""}</p>
              </div>
            ))}
          </Glass>
          <Glass>
            {certifications.length>0 && (<>
              <ST>{getLabel(data,"certifications","Certifications")}</ST>
              <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",color:"#0E2A52"}}>
                {certifications.map((c,i)=>(<li key={i} className="mb-1"><b className="font-bold">{c.name}</b>{c.issuer?` · ${c.issuer}`:""}{c.year?` · ${c.year}`:""}</li>))}
              </ul>
            </>)}
            {languages.length>0 && (<div style={{marginTop:certifications.length>0?14:0}}>
              <ST>{getLabel(data,"languages","Languages")}</ST>
              <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",color:"#0E2A52"}}>
                {languages.map((l,i)=>(<li key={i}><b className="font-bold">{l.name}</b> — {l.level}</li>))}
              </ul>
            </div>)}
          </Glass>
        </div>
      </div>
    </article>
  );
}

function splitName(name?: string){ const p=(name??"").trim().split(/\s+/); if(p.length<2) return name; return (<>{p[0]}<br/>{p.slice(1).join(" ")}</>); }
function ST({ children }: { children: React.ReactNode }){ return <h2 className="uppercase" style={{ margin:0, marginBottom:10, fontWeight:800, fontSize:"13pt", letterSpacing:"0.04em", color:"#0E2A52", paddingBottom:6, borderBottom:"3px solid #1E54B3", display:"inline-block" }}>{children}</h2>; }
function Glass({ children }: { children: React.ReactNode }){ return <section style={{ background:"rgba(255,255,255,0.70)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,0.85)", borderRadius:18, padding:"20px 22px", boxShadow:"0 1px 0 rgba(255,255,255,0.9) inset, 0 12px 28px rgba(30,84,179,0.10)" }}>{children}</section>; }
