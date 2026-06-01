// ConstructionBlueprint — Construction Managers, Civil Engineers, Architects, Surveyors
// Concrete charcoal + safety amber + blueprint grid + isometric crane motif.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, getLabel, initials } from "./types";

export default function ConstructionBlueprint({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#1C1F24", color:"#E6E8EC", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5 }}>
      <div aria-hidden style={{ position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage:"linear-gradient(rgba(245,166,35,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(245,166,35,0.06) 1px,transparent 1px)", backgroundSize:"28px 28px" }} />
      <header className="relative" style={{ padding:"40px 48px 28px", borderBottom:"4px solid #F5A623" }}>
        <span style={{ position:"absolute", top:0, left:0, width:8, height:"100%", background:"repeating-linear-gradient(45deg,#F5A623 0 12px,#1C1F24 12px 24px)" }} />
        <h1 className="m-0" style={{ fontWeight:900, fontSize:"46pt", lineHeight:0.96, letterSpacing:"-0.02em", textTransform:"uppercase", marginLeft:16, marginBottom:8 }}>{basics.fullName}</h1>
        <p className="m-0 uppercase" style={{ fontSize:"15pt", color:"#F5A623", fontWeight:700, letterSpacing:"0.14em", marginLeft:16 }}>{basics.role}</p>
        {/* iso crane */}
        <svg viewBox="0 0 120 100" style={{ position:"absolute", right:48, top:24, width:130, height:108, opacity:0.85 }} fill="none" stroke="#F5A623" strokeWidth="1.6">
          <path d="M30 96 L30 20 L96 8"/><path d="M30 20 L70 32"/><line x1="50" y1="14" x2="50" y2="26"/><line x1="70" y1="10" x2="70" y2="28"/>
          <rect x="22" y="92" width="16" height="6" fill="#F5A623"/><line x1="96" y1="8" x2="96" y2="26"/><rect x="90" y="26" width="12" height="8" fill="rgba(245,166,35,0.3)"/>
        </svg>
      </header>
      <div className="relative grid gap-7" style={{ padding:"28px 48px 40px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <CbBlk t={getLabel(data,"summary","SUMMARY")}><div dangerouslySetInnerHTML={{__html:basics.summary}} style={{color:"#B6BAC2",fontSize:"10pt"}}/></CbBlk>}
          <CbBlk t={getLabel(data,"experience","EXPERIENCE")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]">{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:"#F5A623",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="cb-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#B6BAC2"}}/>
            </div>))}
          </CbBlk>
          <CbBlk t={getLabel(data,"education","EDUCATION")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]">{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#8C9098"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p></div>))}
          </CbBlk>
        </div>
        <div>
          <CbBlk t={getLabel(data,"skills","SKILLS")}>
            {skills.slice(0,8).map((s,i)=>(<div key={i} className="mb-2"><div className="text-[10pt]">{s}</div><div style={{height:6,marginTop:2,background:"#2E323A"}}><div style={{height:"100%",width:`${90-i*7}%`,background:"#F5A623"}}/></div></div>))}
          </CbBlk>
          {certifications.length>0 && <CbBlk t={getLabel(data,"certifications","CERTIFICATIONS")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",color:"#B6BAC2"}}>{certifications.map((c,i)=>(<li key={i} className="mb-0.5"><b style={{color:"#E6E8EC"}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </CbBlk>}
          <CbBlk t={getLabel(data,"contact","CONTACT")}>
            <div className="flex flex-col gap-1 text-[9.5pt]" style={{color:"#B6BAC2"}}>
              {basics.email && <span>✉ {basics.email}</span>}{basics.phone && <span>☎ {basics.phone}</span>}{basics.location && <span>⌖ {basics.location}</span>}
              {languages.length>0 && <span>{languages.map(l=>`${l.name} (${l.level})`).join(" · ")}</span>}
            </div>
          </CbBlk>
        </div>
      </div>
      <style>{`.cb-b li{position:relative;padding-left:14px;margin-bottom:2px}.cb-b li:before{content:"▸";position:absolute;left:0;color:#F5A623;font-size:8pt}`}</style>
    </article>
  );
}
function CbBlk({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11pt",fontWeight:800,letterSpacing:"0.16em",color:"#F5A623",borderLeft:"4px solid #F5A623",paddingLeft:8}}>{t}</h2>{children}</section>; }
