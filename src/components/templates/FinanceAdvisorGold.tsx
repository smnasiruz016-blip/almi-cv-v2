// FinanceAdvisorGold — Financial Advisors, Planners, Wealth/Investment Advisors
// Deep navy + gold + growth-chart motif + metric tiles. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function FinanceAdvisorGold({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], awards = [] } = data;
  const tiles = awards.slice(0,3);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#0E1B30", color:"#DCE4F0", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5 }}>
      <header className="relative" style={{ padding:"46px 52px 24px", borderBottom:"1px solid rgba(208,176,99,0.3)" }}>
        <svg viewBox="0 0 160 90" style={{ position:"absolute", right:48, top:40, width:160, height:90, opacity:0.9 }}>
          <polyline points="6,80 36,58 64,66 92,36 120,42 152,12" fill="none" stroke="#D7B45A" strokeWidth="2.4"/>
          {[[6,80],[36,58],[64,66],[92,36],[120,42],[152,12]].map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r="3" fill="#D7B45A"/>))}
          <polygon points="6,80 36,58 64,66 92,36 120,42 152,12 152,86 6,86" fill="rgba(215,180,90,0.12)"/>
        </svg>
        <h1 className="m-0" style={{ fontWeight:800, fontSize:"39pt", lineHeight:1, letterSpacing:"-0.02em", textTransform:"uppercase", color:"#F4F7FC" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1.5 uppercase" style={{ fontSize:"12.5pt", color:"#D7B45A", fontWeight:700, letterSpacing:"0.16em" }}>{basics.role}</p>
        <p className="m-0 mt-3 text-[9.5pt]" style={{ color:"#8593AC" }}>{[basics.email,basics.phone,basics.location,basics.website].filter(Boolean).join("   ·   ")}</p>
      </header>
      {tiles.length>0 && (
        <div className="grid gap-3" style={{ gridTemplateColumns:`repeat(${tiles.length},1fr)`, padding:"18px 52px 4px" }}>
          {tiles.map((t,i)=>(<div key={i} style={{ borderRadius:12, padding:"12px 14px", background:"rgba(215,180,90,0.08)", border:"1px solid rgba(215,180,90,0.3)" }}>
            <div style={{ fontWeight:800, fontSize:"17pt", lineHeight:1, color:"#E6C779" }}>{t.title}</div>
            {t.issuer && <div className="text-[8.5pt] uppercase mt-1" style={{ letterSpacing:"0.1em", color:"#9AA7BE", fontWeight:600 }}>{t.issuer}</div>}
          </div>))}
        </div>
      )}
      <div className="grid gap-8" style={{ padding:"20px 52px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")}><RichTextRender html={basics.summary} style={{color:"#AFBBD0",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]" style={{color:"#EDF2FA"}}>{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:"#D7B45A",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="fag-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#AFBBD0"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:"#EDF2FA"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#8593AC"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Expertise")}>
            {skills.slice(0,8).map((s,i)=>(<div key={i} className="mb-2"><div className="text-[9.5pt]" style={{color:"#DCE4F0"}}>{s}</div><div style={{height:5,marginTop:3,background:"rgba(255,255,255,0.08)"}}><div style={{height:"100%",width:`${92-i*6}%`,background:"linear-gradient(90deg,#D7B45A,#F0D58A)"}}/></div></div>))}
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Designations")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#AFBBD0"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b style={{color:"#EDF2FA"}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")}>
            <div className="text-[9.5pt]" style={{color:"#AFBBD0"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.fag-b li{position:relative;padding-left:14px;margin-bottom:2px}.fag-b li:before{content:"▸";position:absolute;left:0;color:#D7B45A}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11pt",fontWeight:800,letterSpacing:"0.14em",color:"#D7B45A"}}>{t}</h2>{children}</section>; }
