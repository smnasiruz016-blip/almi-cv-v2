// LabResearch — Scientists, Researchers, R&D, Biotech, Chemists, Lab techs
// White + clean teal + molecule/DNA motif + publications. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function LabResearch({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], projects = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden bg-white print:shadow-none"
      style={{ color:"#1B2E33", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <header className="relative" style={{ padding:"42px 48px 24px", background:"linear-gradient(120deg,#0E6E73 0%,#13898F 100%)", color:"#fff" }}>
        <svg viewBox="0 0 130 110" style={{ position:"absolute", right:36, top:24, width:120, height:100, opacity:0.5 }} fill="none" stroke="#BFECEC" strokeWidth="2">
          <circle cx="30" cy="30" r="8"/><circle cx="95" cy="24" r="8"/><circle cx="62" cy="62" r="8"/><circle cx="100" cy="84" r="8"/><circle cx="34" cy="86" r="8"/>
          <path d="M37 33 L55 58 M70 60 L88 30 M68 66 L94 80 M55 64 L41 80"/>
        </svg>
        <h1 className="m-0" style={{ fontWeight:800, fontSize:"34pt", lineHeight:1, letterSpacing:"-0.01em" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 uppercase" style={{ fontSize:"12.5pt", color:"#D2F2F2", letterSpacing:"0.16em", fontWeight:600 }}>{basics.role}</p>
        <p className="m-0 mt-3 text-[9pt]" style={{ color:"#BFE7E8" }}>{[basics.email,basics.phone,basics.location,basics.website].filter(Boolean).join("   ·   ")}</p>
      </header>
      <div className="grid gap-9" style={{ padding:"24px 48px 44px", gridTemplateColumns:"1fr 1.5fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Research Profile")}><RichTextRender html={basics.summary} style={{color:"#3C5358",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"skills","Techniques")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt"}}>{skills.map((s,i)=>(<li key={i} className="flex items-center gap-2 mb-1" style={{color:"#27403F"}}><span style={{width:7,height:7,borderRadius:"50%",background:"#0E6E73",flexShrink:0}}/>{s}</li>))}</ul>
          </Sec>
          <Sec t={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(<div key={i} className="mb-2"><p className="m-0 font-bold text-[10.5pt]">{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#13898F"}}>{e.school}</p><p className="m-0 text-[9.5pt]" style={{color:"#7A8E90"}}>{e.startDate}{e.endDate?`–${e.endDate}`:""}</p></div>))}
          </Sec>
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")}><div className="text-[10pt]" style={{color:"#3C5358"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div></Sec>}
        </div>
        <div>
          <Sec t={getLabel(data,"experience","Research & Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]">{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:"#0E6E73",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="lab-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#3C5358"}}/>
            </div>))}
          </Sec>
          {projects.length>0 && <Sec t={getLabel(data,"projects","Publications & Projects")}>
            {projects.map((p,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-semibold text-[10pt]">{p.name}</p>{p.description&&<p className="m-0 text-[9.5pt] italic" style={{color:"#7A8E90"}}>{p.description}</p>}</div>))}
          </Sec>}
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#3C5358"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
        </div>
      </div>
      <style>{`.lab-b li{position:relative;padding-left:15px;margin-bottom:1px}.lab-b li:before{content:"";position:absolute;left:0;top:6px;width:7px;height:7px;border-radius:50%;border:2px solid #0E6E73}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11.5pt",fontWeight:800,letterSpacing:"0.1em",color:"#0E6E73",borderBottom:"2px solid #BFE3E3",paddingBottom:3}}>{t}</h2>{children}</section>; }
