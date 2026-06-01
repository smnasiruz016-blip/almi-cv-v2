// EngineerBlueprint — Mechanical / Electrical / Automotive / Aerospace Engineers
// Blueprint navy + cyan grid + gear motif + technical mono accents. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function EngineerBlueprint({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], projects = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#0E2A4A", color:"#D6E4F2", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5 }}>
      <div aria-hidden style={{ position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage:"linear-gradient(rgba(120,190,255,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(120,190,255,0.07) 1px,transparent 1px)", backgroundSize:"26px 26px" }} />
      <header className="relative" style={{ padding:"44px 48px 24px", borderBottom:"1px solid rgba(120,190,255,0.25)" }}>
        <p className="m-0 mb-1 uppercase text-[9pt]" style={{ color:"#6FA9DC", letterSpacing:"0.3em", fontFamily:'"JetBrains Mono",monospace' }}>{"// curriculum vitae"}</p>
        <h1 className="m-0" style={{ fontWeight:800, fontSize:"43pt", lineHeight:0.95, letterSpacing:"-0.02em", textTransform:"uppercase", color:"#F0F6FF" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1.5 uppercase" style={{ fontSize:"13pt", color:"#52C7E8", fontWeight:700, letterSpacing:"0.14em" }}>{basics.role}</p>
        <p className="m-0 mt-3 text-[9pt]" style={{ color:"#8FAACB", fontFamily:'"JetBrains Mono",monospace' }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   |   ")}</p>
        <svg viewBox="0 0 120 120" style={{ position:"absolute", right:42, top:30, width:104, height:104, opacity:0.85 }} fill="none" stroke="#52C7E8" strokeWidth="2">
          <circle cx="60" cy="60" r="20"/><circle cx="60" cy="60" r="8"/>
          {Array.from({length:8}).map((_,i)=>{const a=i*Math.PI/4;return <line key={i} x1={60+Math.cos(a)*20} y1={60+Math.sin(a)*20} x2={60+Math.cos(a)*30} y2={60+Math.sin(a)*30}/>;})}
        </svg>
      </header>
      <div className="relative grid gap-7" style={{ padding:"24px 48px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","SUMMARY")}><RichTextRender html={basics.summary} style={{color:"#AEC4DD",fontSize:"10pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","EXPERIENCE")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]" style={{color:"#EAF2FF"}}>{e.role}</p>
              <p className="m-0 text-[9.5pt]" style={{color:"#52C7E8",fontWeight:600,fontFamily:'"JetBrains Mono",monospace'}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="eb-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#AEC4DD"}}/>
            </div>))}
          </Sec>
          {projects.length>0 && <Sec t={getLabel(data,"projects","KEY PROJECTS")}>
            {projects.map((p,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:"#EAF2FF"}}>{p.name}</p>{p.description&&<p className="m-0 text-[9.5pt]" style={{color:"#8FAACB"}}>{p.description}</p>}</div>))}
          </Sec>}
        </div>
        <div>
          <Sec t={getLabel(data,"skills","SKILLS")}>
            {skills.slice(0,9).map((s,i)=>(<div key={i} className="mb-2"><div className="flex justify-between text-[9.5pt]" style={{color:"#D6E4F2"}}><span>{s}</span></div><div style={{height:5,marginTop:3,background:"rgba(120,190,255,0.14)"}}><div style={{height:"100%",width:`${92-i*6}%`,background:"#52C7E8"}}/></div></div>))}
          </Sec>
          <Sec t={getLabel(data,"education","EDUCATION")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10pt]" style={{color:"#EAF2FF"}}>{e.degree}</p><p className="m-0 text-[9.5pt]" style={{color:"#8FAACB"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p></div>))}
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","CERTIFICATIONS")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#AEC4DD"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b style={{color:"#EAF2FF"}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
        </div>
      </div>
      <style>{`.eb-b li{position:relative;padding-left:14px;margin-bottom:2px}.eb-b li:before{content:"▪";position:absolute;left:0;color:#52C7E8}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11pt",fontWeight:800,letterSpacing:"0.16em",color:"#52C7E8",fontFamily:'"JetBrains Mono",monospace'}}>{t}</h2>{children}</section>; }
