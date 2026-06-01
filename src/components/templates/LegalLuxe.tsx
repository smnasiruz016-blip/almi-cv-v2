// LegalLuxe — Senior partners, trial lawyers, senior counsel (premium dark)
// Near-black plum + gold + scales-of-justice motif + serif. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function LegalLuxe({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#141019", color:"#E9E2D4", fontFamily:'"Cormorant Garamond","Inter",serif', fontSize:"11pt", lineHeight:1.55 }}>
      <header className="relative" style={{ padding:"48px 56px 26px", borderBottom:"1px solid rgba(196,160,90,0.3)" }}>
        <svg viewBox="0 0 90 90" style={{ position:"absolute", right:54, top:36, width:84, height:84, opacity:0.9 }} fill="none" stroke="#C8A85A" strokeWidth="1.6">
          <line x1="45" y1="14" x2="45" y2="70"/><line x1="22" y1="70" x2="68" y2="70"/><line x1="18" y1="26" x2="72" y2="26"/>
          <path d="M18 26 L8 46 a10 8 0 0 0 20 0 Z"/><path d="M72 26 L62 46 a10 8 0 0 0 20 0 Z"/><circle cx="45" cy="14" r="3" fill="#C8A85A"/>
        </svg>
        <p className="m-0 mb-1 uppercase text-[9pt]" style={{ color:"#9B8A63", letterSpacing:"0.34em", fontFamily:'"Inter",sans-serif' }}>Attorney at Law</p>
        <h1 className="m-0" style={{ fontWeight:600, fontSize:"40pt", lineHeight:1, letterSpacing:"0.01em", textTransform:"uppercase", color:"#F4EEDF" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 uppercase" style={{ fontSize:"13pt", color:"#C8A85A", letterSpacing:"0.2em", fontFamily:'"Inter",sans-serif', fontWeight:600 }}>{basics.role}</p>
        <p className="m-0 mt-3 text-[9.5pt]" style={{ color:"#9A917F", fontFamily:'"Inter",sans-serif' }}>{[basics.email,basics.phone,basics.location,basics.website].filter(Boolean).join("   ·   ")}</p>
      </header>
      <div className="grid gap-9" style={{ padding:"26px 56px 44px", gridTemplateColumns:"1.55fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Statement of Practice")}><RichTextRender html={basics.summary} style={{color:"#C6BDA9",fontSize:"11pt",textAlign:"justify"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-semibold text-[13pt]" style={{color:"#F4EEDF"}}>{e.role}</p>
              <p className="m-0 italic text-[10.5pt]" style={{color:"#C8A85A",fontFamily:'"Inter",sans-serif'}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="ll-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#C6BDA9",fontFamily:'"Inter",sans-serif'}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education & Bar")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-semibold text-[12pt]" style={{color:"#F4EEDF"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#9A917F",fontFamily:'"Inter",sans-serif'}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Practice Areas")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10.5pt",fontFamily:'"Inter",sans-serif'}}>{skills.map((s,i)=>(<li key={i} style={{padding:"4px 0",borderBottom:i<skills.length-1?"1px solid rgba(196,160,90,0.2)":"0",color:"#D8CFBC"}}><span style={{color:"#C8A85A",marginRight:8}}>§</span>{s}</li>))}</ul>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Admissions & Honors")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",color:"#C6BDA9",fontFamily:'"Inter",sans-serif'}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b style={{color:"#F4EEDF"}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")}>
            <p className="m-0 text-[10pt]" style={{color:"#C6BDA9",fontFamily:'"Inter",sans-serif'}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(", ")}</p>
          </Sec>}
        </div>
      </div>
      <style>{`.ll-b li{position:relative;padding-left:14px;margin-bottom:2px}.ll-b li:before{content:"§";position:absolute;left:0;color:#C8A85A}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5" style={{fontSize:"15pt",fontWeight:600,color:"#C8A85A",letterSpacing:"0.03em",borderBottom:"1px solid rgba(196,160,90,0.3)",paddingBottom:4}}>{t}</h2>{children}</section>; }
