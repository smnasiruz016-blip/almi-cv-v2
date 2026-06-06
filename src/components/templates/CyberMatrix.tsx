// CyberMatrix — Cybersecurity, InfoSec, Pen Testers, SOC Analysts (terminal)
// Black + matrix green + shield/lock + monospace terminal blocks. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function CyberMatrix({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#070B08", color:"#C8F2D2", fontFamily:'"JetBrains Mono","Inter",monospace', fontSize:"10pt", lineHeight:1.5 }}>
      <div aria-hidden style={{ position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage:"linear-gradient(rgba(46,220,110,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(46,220,110,0.05) 1px,transparent 1px)", backgroundSize:"22px 22px" }} />
      <header className="relative" style={{ padding:"44px 48px 22px", borderBottom:"1px solid rgba(46,220,110,0.3)" }}>
        <svg viewBox="0 0 80 90" style={{ position:"absolute", right:48, top:34, width:70, height:80, opacity:0.9 }} fill="none" stroke="#2EDC6E" strokeWidth="2">
          <path d="M40 6 L70 18 V46 C70 66 56 78 40 84 C24 78 10 66 10 46 V18 Z"/>
          <rect x="29" y="40" width="22" height="18" rx="2"/><path d="M33 40v-5a7 7 0 0 1 14 0v5"/>
        </svg>
        <p className="m-0 mb-1 text-[9pt]" style={{ color:"#3FA45F" }}>$ whoami</p>
        <h1 className="m-0" style={{ fontWeight:800, fontSize:"38pt", lineHeight:0.95, letterSpacing:"-0.02em", textTransform:"uppercase", color:"#EAFBF0", textShadow:"0 0 18px rgba(46,220,110,0.5)" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 uppercase" style={{ fontSize:"12.5pt", color:"#2EDC6E", fontWeight:700, letterSpacing:"0.16em" }}>{basics.role}</p>
        <p className="m-0 mt-3 text-[8.5pt]" style={{ color:"#5C9670" }}>{[basics.email,basics.phone,basics.location,basics.website].filter(Boolean).join("  ::  ")}</p>
      </header>
      <div className="relative grid gap-7" style={{ padding:"24px 48px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t="./profile"><RichTextRender html={basics.summary} style={{color:"#A6D8B4",fontSize:"10pt"}}/></Sec>}
          <Sec t="./experience">
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11pt]" style={{color:"#EAFBF0"}}>{e.role}</p>
              <p className="m-0 text-[9pt]" style={{color:"#2EDC6E"}}>{e.company} [{dateRange(e.startDate,e.endDate,e.current)}]</p>
              <BulletsRender bullets={e.bullets} className="cmx-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#A6D8B4"}}/>
            </div>))}
          </Sec>
          <Sec t="./education">
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10pt]" style={{color:"#EAFBF0"}}>{e.degree}</p><p className="m-0 text-[9.5pt]" style={{color:"#5C9670"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t="./skills">
            {skills.slice(0,9).map((s,i)=>(<div key={i} className="mb-1.5"><div className="flex justify-between text-[9pt]" style={{color:"#C8F2D2"}}><span>{s}</span></div><div style={{height:6,marginTop:2,background:"rgba(46,220,110,0.12)"}}><div style={{height:"100%",width:`${92-i*6}%`,background:"#2EDC6E",boxShadow:"0 0 6px #2EDC6E"}}/></div></div>))}
          </Sec>
          {certifications.length>0 && <Sec t="./certs">
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9pt",color:"#A6D8B4"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><span style={{color:"#2EDC6E"}}>[✓]</span> <b style={{color:"#EAFBF0"}}>{c.name}</b>{c.year?` ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t="./lang">
            <div className="text-[9pt]" style={{color:"#A6D8B4"}}>{languages.map(l=>`${l.name}${l.level?`:${l.level}`:""}`).join("  ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.cmx-b li{position:relative;padding-left:15px;margin-bottom:1px}.cmx-b li:before{content:">";position:absolute;left:0;color:#2EDC6E}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5" style={{fontSize:"11pt",fontWeight:700,letterSpacing:"0.04em",color:"#2EDC6E"}}><span style={{color:"#3FA45F"}}>~/</span>{t}</h2>{children}</section>; }
