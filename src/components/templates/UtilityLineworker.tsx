// UtilityLineworker — Lineworkers, Utility Techs, Power/Telecom Field Crew
// Slate blue + high-vis yellow + power-line motif + safety stripe. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function UtilityLineworker({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const S = "#2E4057", Y = "#F5C518";
  return (
    <article className="w-[794px] min-h-[1123px] bg-white relative overflow-hidden print:shadow-none"
      style={{ color:"#2A323C", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <header className="relative" style={{ padding:"40px 48px 26px", background:S, color:"#fff" }}>
        <span style={{ position:"absolute", bottom:0, left:0, width:"100%", height:7, background:`repeating-linear-gradient(45deg,${Y} 0 16px,#1E2A38 16px 32px)` }}/>
        <svg viewBox="0 0 120 84" style={{ position:"absolute", right:42, top:24, width:118, height:82, opacity:0.85 }} stroke={Y} strokeWidth="2" fill="none">
          <path d="M30 80 L42 8 H54 L66 80 M36 30 H60 M33 48 H63"/>
          <path d="M48 8 L12 80 M48 8 L84 80" strokeWidth="1.4" opacity="0.7"/>
          <path d="M60 30 Q86 44 112 36" strokeWidth="1.6" strokeDasharray="4 3"/>
          <path d="M100 52 l-7 12 h8 l-9 14" strokeWidth="2.4"/>
        </svg>
        <h1 className="m-0 uppercase" style={{ fontWeight:900, fontSize:"36pt", lineHeight:0.95, letterSpacing:"-0.01em" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 uppercase" style={{ fontSize:"13pt", color:Y, fontWeight:800, letterSpacing:"0.14em" }}>{basics.role}</p>
        <p className="m-0 mt-2 text-[9pt]" style={{ color:"#A9B6C4" }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   ·   ")}</p>
      </header>
      <div className="grid gap-9" style={{ padding:"26px 48px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")} s={S} y={Y}><RichTextRender html={basics.summary} style={{color:"#46505C",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Field Experience")} s={S} y={Y}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]" style={{color:S}}>{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:"#B8901E",fontWeight:700}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="ul-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#46505C"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education & Apprenticeship")} s={S} y={Y}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:S}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#6E7886"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"certifications","Tickets & Certs")} s={S} y={Y}>
            <div className="flex flex-wrap gap-1.5">{certifications.map((c,i)=>(<span key={i} style={{padding:"4px 11px",fontSize:"9pt",fontWeight:800,color:S,background:Y,borderRadius:4}}>{c.name}</span>))}</div>
          </Sec>
          <Sec t={getLabel(data,"skills","Skills")} s={S} y={Y}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt"}}>{skills.map((s,i)=>(<li key={i} className="flex items-start gap-2 mb-1" style={{color:"#333D49"}}><span style={{color:"#B8901E",fontWeight:900}}>⚡</span>{s}</li>))}</ul>
          </Sec>
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")} s={S} y={Y}>
            <div className="text-[9.5pt]" style={{color:"#46505C"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.ul-b li{position:relative;padding-left:15px;margin-bottom:2px}.ul-b li:before{content:"";position:absolute;left:0;top:6px;width:7px;height:7px;background:#F5C518}`}</style>
    </article>
  );
}
function Sec({ t, s, y, children }: { t:string; s:string; y:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11.5pt",fontWeight:900,letterSpacing:"0.08em",color:s,borderLeft:`5px solid ${y}`,paddingLeft:8}}>{t}</h2>{children}</section>; }
