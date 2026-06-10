// ParamedicPulse — Paramedics, EMTs, Emergency Responders (bold urgent)
// White + emergency red + navy + star-of-life + pulse line + readiness chips. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function ParamedicPulse({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const R = "#D7263D", N = "#15243B";
  return (
    <article className="w-[794px] min-h-[1123px] bg-white relative overflow-hidden print:shadow-none"
      style={{ color:"#222A36", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <header className="relative" style={{ padding:"40px 48px 24px", background:N, color:"#fff" }}>
        <svg viewBox="0 0 60 60" style={{ position:"absolute", right:46, top:30, width:62, height:62 }} fill={R}>
          <path d="M26 2h8v18l15.6-9 4 6.9L38 27l15.6 9.1-4 6.9L34 34v18h-8V34l-15.6 9-4-6.9L22 27 6.4 17.9l4-6.9L26 20Z"/>
          <circle cx="30" cy="27" r="7.5" fill="#fff"/><path d="M30 21c-2.6 0-4 1.8-4 3.6 0 2.7 4 6 4 6s4-3.3 4-6c0-1.8-1.4-3.6-4-3.6Z" fill={R}/>
        </svg>
        <h1 className="m-0 uppercase" style={{ fontWeight:900, fontSize:"36pt", lineHeight:0.95, letterSpacing:"-0.01em" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 uppercase" style={{ fontSize:"13pt", color:"#FF6B7D", fontWeight:800, letterSpacing:"0.14em" }}>{basics.role}</p>
        <p className="m-0 mt-2 text-[9pt]" style={{ color:"#9FB0C8" }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   ·   ")}</p>
      </header>
      <svg viewBox="0 0 794 30" preserveAspectRatio="none" style={{ display:"block", width:"100%", height:26, background:"#fff" }}>
        <path d="M0 15 H280 l12 -11 l12 24 l14 -28 l14 28 l12 -13 H420 l8 -7 l10 14 H794" fill="none" stroke={R} strokeWidth="2.5"/>
      </svg>
      <div className="grid gap-9" style={{ padding:"20px 48px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")} c={R} n={N}><RichTextRender html={basics.summary} style={{color:"#46505E",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Field Experience")} c={R} n={N}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]" style={{color:N}}>{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:R,fontWeight:700}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="pp-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#46505E"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education & Training")} c={R} n={N}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:N}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#6E7886"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"certifications","Certs & Licenses")} c={R} n={N}>
            <div className="flex flex-wrap gap-1.5">{certifications.map((c,i)=>(<span key={i} style={{padding:"4px 11px",fontSize:"9pt",fontWeight:700,color:"#fff",background:i%2?R:N,borderRadius:6}}>{c.name}</span>))}</div>
          </Sec>
          <Sec t={getLabel(data,"skills","Clinical Skills")} c={R} n={N}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt"}}>{skills.map((s,i)=>(<li key={i} className="flex items-start gap-2 mb-1" style={{color:"#333D4B"}}><span style={{color:R,fontWeight:800}}>+</span>{s}</li>))}</ul>
          </Sec>
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")} c={R} n={N}>
            <div className="text-[9.5pt]" style={{color:"#46505E"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.pp-b li{position:relative;padding-left:15px;margin-bottom:2px}.pp-b li:before{content:"";position:absolute;left:0;top:6px;width:7px;height:7px;border-radius:50%;background:#D7263D}`}</style>
    </article>
  );
}
function Sec({ t, c, n, children }: { t:string; c:string; n:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11.5pt",fontWeight:900,letterSpacing:"0.08em",color:n,borderLeft:`5px solid ${c}`,paddingLeft:8}}>{t}</h2>{children}</section>; }
