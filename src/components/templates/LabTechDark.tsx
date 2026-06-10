// LabTechDark — Lab Technicians, Med Lab Scientists, Pathology Techs (dark lab)
// Deep teal-black + cyan/violet beaker + specimen-grid + glow accents. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function LabTechDark({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const C = "#3DE0D2", V = "#9B7BF5";
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#0A1A1C", color:"#CFE6E4", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5 }}>
      <div aria-hidden style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"linear-gradient(rgba(61,224,210,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(61,224,210,0.05) 1px,transparent 1px)", backgroundSize:"30px 30px" }}/>
      <header className="relative" style={{ padding:"44px 48px 22px" }}>
        <svg viewBox="0 0 90 100" style={{ position:"absolute", right:46, top:28, width:84, height:94 }} fill="none" stroke={C} strokeWidth="2">
          <path d="M34 8 h22 M38 8 v26 L18 78 a10 10 0 0 0 9 14 h36 a10 10 0 0 0 9-14 L52 34 V8"/>
          <path d="M26 62 h38" stroke={V}/><path d="M22 70 L66 70 L60 84 a6 6 0 0 1-6 4 H36 a6 6 0 0 1-6-4 Z" fill="rgba(155,123,245,0.4)" stroke="none"/>
          <circle cx="40" cy="50" r="2.4" fill={C} stroke="none"/><circle cx="50" cy="44" r="2" fill={V} stroke="none"/>
        </svg>
        <p className="m-0 mb-1 text-[8.5pt] uppercase" style={{ color:"#4C9C94", letterSpacing:"0.3em", fontFamily:'"JetBrains Mono",monospace' }}>{"// specimen: professional"}</p>
        <h1 className="m-0 uppercase" style={{ fontWeight:900, fontSize:"36pt", lineHeight:0.95, letterSpacing:"-0.01em", color:"#F0FAF8", textShadow:"0 0 18px rgba(61,224,210,0.4)" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 uppercase" style={{ fontSize:"12.5pt", color:C, fontWeight:800, letterSpacing:"0.16em" }}>{basics.role}</p>
        <p className="m-0 mt-2 text-[8.5pt]" style={{ color:"#7CA39E", fontFamily:'"JetBrains Mono",monospace' }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("  |  ")}</p>
      </header>
      <div className="relative grid gap-7" style={{ padding:"22px 48px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")} c={C}><RichTextRender html={basics.summary} style={{color:"#A8C8C4",fontSize:"10pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Lab Experience")} c={C}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11pt]" style={{color:"#F0FAF8"}}>{e.role}</p>
              <p className="m-0 text-[9.5pt]" style={{color:V,fontWeight:700}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="ltd-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#A8C8C4"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")} c={C}>
            {education.map((e,i)=>(<p key={i} className="m-0 mb-1 text-[10pt]" style={{color:"#A8C8C4"}}><b style={{color:"#F0FAF8"}}>{e.degree}</b>, {e.school}{e.endDate?` · ${e.endDate}`:""}</p>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Techniques")} c={C}>
            {skills.slice(0,8).map((s,i)=>(<div key={i} className="mb-2"><div className="text-[9.5pt]" style={{color:"#CFE6E4"}}>{s}</div><div style={{height:5,marginTop:3,borderRadius:4,background:"rgba(61,224,210,0.12)"}}><div style={{height:"100%",borderRadius:4,width:`${92-i*6}%`,background:`linear-gradient(90deg,${C},${V})`}}/></div></div>))}
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications")} c={C}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#A8C8C4"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><span style={{color:C}}>⚗</span> {c.name}{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")} c={C}>
            <div className="text-[9.5pt]" style={{color:"#A8C8C4"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.ltd-b li{position:relative;padding-left:14px;margin-bottom:1px}.ltd-b li:before{content:"";position:absolute;left:0;top:6px;width:6px;height:6px;border-radius:50%;background:#3DE0D2}`}</style>
    </article>
  );
}
function Sec({ t, c, children }: { t:string; c:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11pt",fontWeight:800,letterSpacing:"0.14em",color:c}}>{t}</h2>{children}</section>; }
