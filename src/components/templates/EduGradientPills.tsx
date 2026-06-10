// EduGradientPills — Education Coordinators, School Admins, Librarians (dark playful)
// Deep navy + orange→gold gradient pill section bars + glow photo ring + wave footer. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function EduGradientPills({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const G = "linear-gradient(95deg,#FF7A59 0%,#FFC65C 100%)";
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#1B1832", color:"#EDEAF7", fontFamily:'"Plus Jakarta Sans","Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5 }}>
      <div aria-hidden style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(rgba(255,255,255,0.06) 1px,transparent 1px)", backgroundSize:"26px 26px" }}/>
      <svg viewBox="0 0 794 90" preserveAspectRatio="none" style={{ position:"absolute", left:0, bottom:0, width:"100%", height:74 }}>
        <path d="M0 60 Q200 10 400 44 Q600 78 794 30 V90 H0 Z" fill="url(#egp)"/>
        <defs><linearGradient id="egp" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#FF7A59"/><stop offset="100%" stopColor="#FFC65C"/></linearGradient></defs>
      </svg>
      <header className="relative" style={{ padding:"46px 48px 18px", display:"grid", gridTemplateColumns:"1fr 200px", gap:20, alignItems:"center" }}>
        <div>
          <h1 className="m-0 uppercase" style={{ fontWeight:900, fontSize:"40pt", lineHeight:0.95, letterSpacing:"-0.01em", color:"#FFFFFF" }}>{basics.fullName}</h1>
          <p className="m-0 mt-1.5" style={{ fontSize:"14pt", fontWeight:700, background:G, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{basics.role}</p>
          <p className="m-0 mt-2 text-[9pt]" style={{ color:"#A9A4C4" }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   ·   ")}</p>
        </div>
        <div style={{ width:170, height:170, borderRadius:"50%", justifySelf:"end", padding:6, background:G, boxShadow:"0 0 30px rgba(255,160,80,0.55)" }}>
          <div style={{ width:"100%", height:"100%", borderRadius:"50%", overflow:"hidden", background:"#2A2545", display:"flex", alignItems:"center", justifyContent:"center" }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <span style={{fontWeight:800,fontSize:"40pt",background:G,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{initials(basics.fullName)}</span>}
          </div>
        </div>
      </header>
      <div className="relative" style={{ padding:"6px 48px 90px" }}>
        {basics.summary && <Pill t={getLabel(data,"summary","Profile")} g={G}><RichTextRender html={basics.summary} style={{color:"#C8C3DE",fontSize:"10pt"}}/></Pill>}
        <Pill t={getLabel(data,"experience","Experience")} g={G}>
          {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
            <p className="m-0 font-bold text-[11.5pt]" style={{color:"#FFF"}}>{e.role}</p>
            <p className="m-0 text-[9.5pt]" style={{color:"#FFB36B",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
            <BulletsRender bullets={e.bullets} className="egp-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#C8C3DE"}}/>
          </div>))}
        </Pill>
        <div className="grid gap-x-8" style={{ gridTemplateColumns:"1fr 1fr" }}>
          <Pill t={getLabel(data,"education","Education")} g={G}>
            {education.map((e,i)=>(<div key={i} className="mb-2"><p className="m-0 font-bold text-[10.5pt]" style={{color:"#FFF"}}>{e.degree}</p><p className="m-0 text-[9.5pt]" style={{color:"#A9A4C4"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
            {certifications.length>0 && <p className="m-0 mt-1 text-[9pt]" style={{color:"#FFB36B"}}>{certifications.map(c=>c.name).join("  ·  ")}</p>}
          </Pill>
          <Pill t={getLabel(data,"skills","Skills")} g={G}>
            <div className="flex flex-wrap gap-1.5">{skills.map((s,i)=>(<span key={i} style={{padding:"4px 12px",fontSize:"9pt",fontWeight:700,color:"#1B1832",background:G,borderRadius:9999}}>{s}</span>))}</div>
            {languages.length>0 && <p className="m-0 mt-2.5 text-[9.5pt]" style={{color:"#C8C3DE"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join("  ·  ")}</p>}
          </Pill>
        </div>
      </div>
      <style>{`.egp-b li{position:relative;padding-left:13px;margin-bottom:1px}.egp-b li:before{content:"";position:absolute;left:0;top:6px;width:6px;height:6px;border-radius:50%;background:#FFB36B}`}</style>
    </article>
  );
}
function Pill({ t, g, children }: { t:string; g:string; children:React.ReactNode }){
  return (
    <section className="mb-5 last:mb-0">
      <div style={{ background:g, borderRadius:9999, padding:"8px 22px", marginBottom:12, boxShadow:"0 4px 16px rgba(255,140,80,0.3)" }}>
        <h2 className="m-0 uppercase" style={{ fontSize:"13pt", fontWeight:900, letterSpacing:"0.1em", color:"#231A12" }}>{t}</h2>
      </div>
      <div style={{ padding:"0 10px" }}>{children}</div>
    </section>
  );
}
