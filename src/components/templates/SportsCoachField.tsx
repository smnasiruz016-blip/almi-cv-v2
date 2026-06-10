// SportsCoachField — Sports Coaches, PE Teachers, Team Managers (field-plan)
// White + pitch green + tactic-board arrows/x-o motif + whistle energy. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function SportsCoachField({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], awards = [] } = data;
  const G = "#157A3E", D = "#0E2E1C";
  return (
    <article className="w-[794px] min-h-[1123px] bg-white relative overflow-hidden print:shadow-none"
      style={{ color:"#23302A", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <header className="relative" style={{ padding:"42px 48px 26px", background:G, color:"#fff", overflow:"hidden" }}>
        <svg viewBox="0 0 794 180" preserveAspectRatio="none" style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.18 }} stroke="#fff" fill="none" strokeWidth="2">
          <circle cx="397" cy="90" r="60"/><line x1="397" y1="0" x2="397" y2="180"/>
          <rect x="0" y="40" width="90" height="100"/><rect x="704" y="40" width="90" height="100"/>
        </svg>
        <svg viewBox="0 0 110 60" style={{ position:"absolute", right:44, top:30, width:112, height:62 }} stroke="#fff" strokeWidth="2.4" fill="none">
          <path d="M8 50 Q35 14 62 36" strokeDasharray="5 5"/><path d="M56 30 L62 36 L54 40" fill="#fff"/>
          <text x="10" y="58" fontSize="15" fontWeight="800" fill="#fff" stroke="none">X</text>
          <circle cx="92" cy="18" r="8"/>
        </svg>
        <h1 className="m-0 uppercase" style={{ fontWeight:900, fontSize:"36pt", lineHeight:0.95, letterSpacing:"-0.01em" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 uppercase" style={{ fontSize:"13pt", color:"#A8E6BF", fontWeight:800, letterSpacing:"0.14em" }}>{basics.role}</p>
        <p className="m-0 mt-2 text-[9pt]" style={{ color:"#C2E8CF" }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   ·   ")}</p>
      </header>
      {awards.length>0 && <div className="grid gap-3" style={{ padding:"18px 48px 0", gridTemplateColumns:`repeat(${Math.min(awards.length,4)},1fr)` }}>
        {awards.slice(0,4).map((a,i)=>(<div key={i} className="text-center" style={{ padding:"10px 12px", borderRadius:10, background:"#EAF6EE", border:"1px solid #C8E6D2" }}>
          <div style={{ fontWeight:900, fontSize:"15pt", lineHeight:1, color:G }}>{a.title}</div>
          {a.issuer&&<div className="text-[7.5pt] mt-1 uppercase" style={{ color:"#5C7263", letterSpacing:"0.08em", fontWeight:700 }}>{a.issuer}</div>}
        </div>))}
      </div>}
      <div className="grid gap-9" style={{ padding:"20px 48px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Coaching Philosophy")} g={G} d={D}><RichTextRender html={basics.summary} style={{color:"#44544B",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Coaching Experience")} g={G} d={D}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]" style={{color:D}}>{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:G,fontWeight:700}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="scf-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#44544B"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")} g={G} d={D}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:D}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#6E8076"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"certifications","Badges & Licenses")} g={G} d={D}>
            <div className="flex flex-wrap gap-1.5">{certifications.map((c,i)=>(<span key={i} style={{padding:"4px 11px",fontSize:"9pt",fontWeight:800,color:"#fff",background:i%2?D:G,borderRadius:9999}}>{c.name}</span>))}</div>
          </Sec>
          <Sec t={getLabel(data,"skills","Coaching Skills")} g={G} d={D}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt"}}>{skills.map((s,i)=>(<li key={i} className="flex items-start gap-2 mb-1" style={{color:"#33433A"}}><span style={{color:G,fontWeight:900}}>▸</span>{s}</li>))}</ul>
          </Sec>
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")} g={G} d={D}>
            <div className="text-[9.5pt]" style={{color:"#44544B"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.scf-b li{position:relative;padding-left:15px;margin-bottom:2px}.scf-b li:before{content:"";position:absolute;left:0;top:6px;width:7px;height:7px;border-radius:50%;background:#157A3E}`}</style>
    </article>
  );
}
function Sec({ t, g, d, children }: { t:string; g:string; d:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11.5pt",fontWeight:900,letterSpacing:"0.08em",color:d,borderLeft:`5px solid ${g}`,paddingLeft:8}}>{t}</h2>{children}</section>; }
