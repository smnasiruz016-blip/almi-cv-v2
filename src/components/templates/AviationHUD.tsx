// AviationHUD — Pilots, First Officers, Cabin Crew, ATC (cockpit HUD graphical)
// Deep navy + cyan HUD + horizon/compass motif + mono accents. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function AviationHUD({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"radial-gradient(120% 70% at 50% 0%,#0C2138 0%,#07121F 60%)", color:"#CFE0EE", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5 }}>
      <header className="relative" style={{ padding:"44px 50px 26px", borderBottom:"1px solid rgba(60,200,230,0.3)" }}>
        <svg viewBox="0 0 110 110" style={{ position:"absolute", right:46, top:30, width:100, height:100, opacity:0.9 }} fill="none" stroke="#3CC8E6" strokeWidth="1.4">
          <circle cx="55" cy="55" r="46"/><circle cx="55" cy="55" r="34"/><path d="M9 55 H101 M55 9 V101"/>
          <path d="M30 62 q25 -18 50 0" stroke="#3CC8E6"/><polygon points="55,30 50,42 60,42" fill="#3CC8E6"/>
        </svg>
        <p className="m-0 mb-1 uppercase text-[9pt]" style={{ color:"#5F9CC0", letterSpacing:"0.32em", fontFamily:'"JetBrains Mono",monospace' }}>{"// flight crew"}</p>
        <h1 className="m-0" style={{ fontWeight:800, fontSize:"43pt", lineHeight:0.95, letterSpacing:"-0.02em", textTransform:"uppercase", color:"#EAF5FC" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1.5 uppercase" style={{ fontSize:"13pt", color:"#3CC8E6", fontWeight:700, letterSpacing:"0.16em" }}>{basics.role}</p>
        <p className="m-0 mt-3 text-[9pt]" style={{ color:"#7E97AC", fontFamily:'"JetBrains Mono",monospace' }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   |   ")}</p>
      </header>
      <div className="relative grid gap-7" style={{ padding:"26px 50px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","FLIGHT PROFILE")}><RichTextRender html={basics.summary} style={{color:"#A7BED0",fontSize:"10pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","EXPERIENCE")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]" style={{color:"#EAF5FC"}}>{e.role}</p>
              <p className="m-0 text-[9.5pt]" style={{color:"#3CC8E6",fontWeight:600,fontFamily:'"JetBrains Mono",monospace'}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="av-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#A7BED0"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","EDUCATION")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:"#EAF5FC"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#7E97AC"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","RATINGS & SKILLS")}>
            {skills.slice(0,9).map((s,i)=>(<div key={i} className="mb-2"><div className="text-[9.5pt]" style={{color:"#CFE0EE"}}>{s}</div><div style={{height:5,marginTop:3,background:"rgba(60,200,230,0.14)"}}><div style={{height:"100%",width:`${92-i*6}%`,background:"#3CC8E6",boxShadow:"0 0 8px rgba(60,200,230,0.6)"}}/></div></div>))}
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","CERTIFICATIONS")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#A7BED0"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b style={{color:"#EAF5FC"}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","LANGUAGES")}>
            <div className="text-[9.5pt]" style={{color:"#A7BED0"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.av-b li{position:relative;padding-left:15px;margin-bottom:2px}.av-b li:before{content:"\\2708";position:absolute;left:0;color:#3CC8E6;font-size:8pt}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11pt",fontWeight:800,letterSpacing:"0.16em",color:"#3CC8E6",fontFamily:'"JetBrains Mono",monospace'}}>{t}</h2>{children}</section>; }
