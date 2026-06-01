// TradesVolt — Electricians, Plumbers, HVAC, Welders (bold industrial graphical)
// Steel black + electric yellow + bolt motif + neon skill bars. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function TradesVolt({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#15171C", color:"#E6E8EC", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5 }}>
      <header className="relative" style={{ padding:"42px 48px 26px", background:"linear-gradient(100deg,#1B1E25 0%,#15171C 70%)", borderBottom:"4px solid #FFD400" }}>
        <span style={{ position:"absolute", top:0, left:0, width:10, height:"100%", background:"repeating-linear-gradient(45deg,#FFD400 0 14px,#15171C 14px 28px)" }}/>
        <svg viewBox="0 0 70 90" style={{ position:"absolute", right:48, top:30, width:62, height:80 }}><polygon points="40,4 12,50 34,50 26,86 58,38 36,38" fill="#FFD400" stroke="#15171C" strokeWidth="1.5"/></svg>
        <h1 className="m-0" style={{ marginLeft:16, fontWeight:900, fontSize:"46pt", lineHeight:0.9, letterSpacing:"-0.02em", textTransform:"uppercase", color:"#F4F5F7" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 uppercase" style={{ marginLeft:16, fontSize:"14pt", color:"#FFD400", fontWeight:800, letterSpacing:"0.14em" }}>{basics.role}</p>
        <p className="m-0 mt-3 text-[9.5pt]" style={{ marginLeft:16, color:"#9AA0AB" }}>{[basics.email,basics.phone,basics.location,basics.website].filter(Boolean).join("   ·   ")}</p>
      </header>
      <div className="relative grid gap-7" style={{ padding:"26px 48px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","SUMMARY")}><RichTextRender html={basics.summary} style={{color:"#B4BAC4",fontSize:"10pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","EXPERIENCE")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]">{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:"#FFD400",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="tv-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#B4BAC4"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","EDUCATION & TRAINING")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]">{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#8B919C"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","SKILLS")}>
            {skills.slice(0,9).map((s,i)=>(<div key={i} className="mb-2"><div className="text-[9.5pt]">{s}</div><div style={{height:7,marginTop:2,background:"#23262E",transform:"skewX(-18deg)"}}><div style={{height:"100%",width:`${92-i*6}%`,background:"#FFD400"}}/></div></div>))}
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","LICENSES & CERTS")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#B4BAC4"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b style={{color:"#F4F5F7"}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","LANGUAGES")}>
            <div className="text-[9.5pt]" style={{color:"#B4BAC4"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.tv-b li{position:relative;padding-left:15px;margin-bottom:2px}.tv-b li:before{content:"\\26A1";position:absolute;left:0;color:#FFD400;font-size:8pt}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11pt",fontWeight:900,letterSpacing:"0.12em",color:"#FFD400",borderLeft:"4px solid #FFD400",paddingLeft:8}}>{t}</h2>{children}</section>; }
