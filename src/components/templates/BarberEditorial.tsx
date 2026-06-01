// BarberEditorial — Barbers, Master Barbers, Men's Stylists, Grooming
// Black + cream + red accent + bold editorial type + razor/comb motif. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function BarberEditorial({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#111110", color:"#EDE9E1", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5 }}>
      <header className="relative" style={{ padding:"46px 50px 24px" }}>
        <div style={{ position:"absolute", left:0, top:0, width:"100%", height:8, background:"repeating-linear-gradient(90deg,#C8332E 0 22px,#EDE9E1 22px 44px,#111110 44px 66px)" }}/>
        <p className="m-0 mb-1 mt-3 uppercase text-[9pt]" style={{ color:"#C8332E", letterSpacing:"0.4em", fontWeight:700 }}>Est. Craft · Grooming</p>
        <h1 className="m-0" style={{ fontWeight:900, fontSize:"50pt", lineHeight:0.88, letterSpacing:"-0.03em", textTransform:"uppercase", color:"#F6F2EA" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 uppercase" style={{ fontSize:"14pt", color:"#C8332E", fontWeight:800, letterSpacing:"0.18em" }}>{basics.role}</p>
        <p className="m-0 mt-3 text-[9.5pt]" style={{ color:"#9A958A" }}>{[basics.email,basics.phone,basics.location,basics.website].filter(Boolean).join("   ·   ")}</p>
        <svg viewBox="0 0 90 24" style={{ position:"absolute", right:50, top:50, width:96, height:26, opacity:0.85 }} fill="none" stroke="#C8332E" strokeWidth="2"><path d="M2 12 H58"/><circle cx="68" cy="12" r="9"/><path d="M77 12 H88"/></svg>
      </header>
      <div className="grid gap-9" style={{ padding:"16px 50px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","About")}><RichTextRender html={basics.summary} style={{color:"#C2BDB1",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[12pt]" style={{color:"#F6F2EA"}}>{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:"#C8332E",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="be-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#C2BDB1"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Training")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:"#F6F2EA"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#9A958A"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Specialties")}>
            <div className="flex flex-wrap gap-1.5">{skills.map((s,i)=>(<span key={i} style={{padding:"4px 11px",fontSize:"9.5pt",fontWeight:600,color:"#EDE9E1",border:"1px solid #3A372F",borderRadius:4}}>{s}</span>))}</div>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#C2BDB1"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b style={{color:"#F6F2EA"}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")}>
            <div className="text-[9.5pt]" style={{color:"#C2BDB1"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.be-b li{position:relative;padding-left:14px;margin-bottom:2px}.be-b li:before{content:"";position:absolute;left:0;top:6px;width:7px;height:7px;background:#C8332E}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11pt",fontWeight:900,letterSpacing:"0.14em",color:"#F6F2EA",borderBottom:"2px solid #C8332E",paddingBottom:3,display:"inline-block"}}>{t}</h2>{children}</section>; }
