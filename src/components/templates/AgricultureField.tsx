// AgricultureField — Farmers, Agronomists, Agricultural Techs, Ranchers, Horticulture
// Cream + harvest green + wheat gold + field/leaf motif. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function AgricultureField({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#FAF6EC", color:"#33402A", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <header className="relative" style={{ padding:"38px 48px 28px", background:"linear-gradient(120deg,#4A6B33 0%,#6B8E3D 100%)", color:"#F4F1E4" }}>
        <svg viewBox="0 0 70 60" preserveAspectRatio="none" style={{ position:"absolute", left:0, bottom:0, width:"100%", height:24, opacity:0.4 }} fill="#E7C766"><path d="M0 60 Q10 30 20 60 Q30 30 40 60 Q50 30 60 60 Q65 40 70 60 Z"/></svg>
        <svg viewBox="0 0 40 50" style={{ position:"absolute", right:44, top:28, width:40, height:50, opacity:0.9 }} fill="none" stroke="#E7C766" strokeWidth="2"><path d="M20 48V14"/><path d="M20 22c-6-2-10-8-10-14 6 0 11 4 12 9M20 22c6-2 10-8 10-14-6 0-11 4-12 9M20 34c-5-2-9-7-9-12 5 0 10 3 11 8M20 34c5-2 9-7 9-12-5 0-10 3-11 8"/></svg>
        <h1 className="m-0" style={{ fontWeight:800, fontSize:"34pt", lineHeight:1, letterSpacing:"-0.01em", color:"#FBFAF2" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 uppercase" style={{ fontSize:"12pt", color:"#EBD489", letterSpacing:"0.16em", fontWeight:600 }}>{basics.role}</p>
        <p className="m-0 mt-2 text-[9pt]" style={{ color:"#D9E0C9" }}>{[basics.email,basics.phone,basics.location,basics.website].filter(Boolean).join("   ·   ")}</p>
      </header>
      <div className="grid gap-9" style={{ padding:"24px 48px 44px", gridTemplateColumns:"1fr 1.5fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")}><RichTextRender html={basics.summary} style={{color:"#4D5840",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"skills","Skills")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt"}}>{skills.map((s,i)=>(<li key={i} className="flex items-center gap-2 mb-1" style={{color:"#3A472F"}}><span style={{color:"#B89530"}}>❦</span>{s}</li>))}</ul>
          </Sec>
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")}><div className="text-[10pt]" style={{color:"#4D5840"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div></Sec>}
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#4D5840"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b style={{color:"#33402A"}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
        </div>
        <div>
          <Sec t={getLabel(data,"experience","Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]">{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:"#6B8E3D",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="af-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#4D5840"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]">{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#7C8770"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
      </div>
      <style>{`.af-b li{position:relative;padding-left:15px;margin-bottom:1px}.af-b li:before{content:"";position:absolute;left:0;top:6px;width:7px;height:7px;border-radius:0 50% 50% 50%;background:#6B8E3D}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11.5pt",fontWeight:800,letterSpacing:"0.1em",color:"#4A6B33",borderBottom:"2px solid #D8C98C",paddingBottom:3}}>{t}</h2>{children}</section>; }
