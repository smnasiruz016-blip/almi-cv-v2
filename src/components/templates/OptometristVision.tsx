// OptometristVision — Optometrists, Opticians, Eye-care Specialists
// White + iris blue/violet + eye/lens motif + acuity-chart accent. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function OptometristVision({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const B = "#2E6BD6", V = "#7A5CD6";
  return (
    <article className="w-[794px] min-h-[1123px] bg-white relative overflow-hidden print:shadow-none"
      style={{ color:"#27303E", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <header className="relative" style={{ padding:"44px 50px 26px", background:"linear-gradient(120deg,#EAF1FD 0%,#F0EDFB 100%)" }}>
        <svg viewBox="0 0 110 60" style={{ position:"absolute", right:44, top:32, width:108, height:60 }} fill="none">
          <path d="M6 30 Q55 -8 104 30 Q55 68 6 30 Z" stroke={B} strokeWidth="2.4"/>
          <circle cx="55" cy="30" r="14" fill="none" stroke={V} strokeWidth="2.4"/>
          <circle cx="55" cy="30" r="6" fill={B}/>
          <circle cx="51" cy="26" r="2" fill="#fff"/>
        </svg>
        <p className="m-0 mb-1 uppercase text-[8.5pt]" style={{ color:V, letterSpacing:"0.32em", fontWeight:700 }}>E · F P · T O Z · L P E D</p>
        <h1 className="m-0" style={{ fontWeight:800, fontSize:"35pt", lineHeight:0.98, letterSpacing:"-0.01em", color:"#1A2438" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 uppercase" style={{ fontSize:"12.5pt", color:B, fontWeight:700, letterSpacing:"0.16em" }}>{basics.role}</p>
        <p className="m-0 mt-2 text-[9pt]" style={{ color:"#67718A" }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   ·   ")}</p>
      </header>
      <div className="grid gap-9" style={{ padding:"24px 50px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")} b={B}><RichTextRender html={basics.summary} style={{color:"#444F63",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Clinical Experience")} b={B}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]" style={{color:"#1A2438"}}>{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:V,fontWeight:700}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="ov-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#444F63"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")} b={B}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:"#1A2438"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#67718A"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Clinical Skills")} b={B}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt"}}>{skills.map((s,i)=>(<li key={i} className="flex items-start gap-2 mb-1" style={{color:"#333E54"}}><span style={{color:i%2?B:V,fontWeight:900}}>◉</span>{s}</li>))}</ul>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Licenses & Certs")} b={B}>
            <ul className="ov-b" style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#444F63"}}>{certifications.map((c,i)=>(<li key={i}>{c.name}{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")} b={B}>
            <div className="text-[9.5pt]" style={{color:"#444F63"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.ov-b li{position:relative;padding-left:15px;margin-bottom:2px}.ov-b li:before{content:"";position:absolute;left:0;top:6px;width:7px;height:7px;border-radius:50%;background:#2E6BD6}`}</style>
    </article>
  );
}
function Sec({ t, b, children }: { t:string; b:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11.5pt",fontWeight:800,letterSpacing:"0.1em",color:"#1A2438",borderBottom:`2px solid ${b}`,paddingBottom:3,display:"inline-block",whiteSpace:"nowrap"}}>{t}</h2>{children}</section>; }
