// UXPortfolioGrid — UX / Product / Interaction Designers, UX Researchers
// Off-white + ink + electric accent + asymmetric portfolio grid. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function UXPortfolioGrid({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], projects = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#F4F4F2", color:"#17171A", fontFamily:'"Plus Jakarta Sans","Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5 }}>
      <header className="relative grid items-end" style={{ gridTemplateColumns:"1fr auto", gap:18, padding:"46px 50px 22px", borderBottom:"3px solid #17171A" }}>
        <div>
          <h1 className="m-0" style={{ fontWeight:800, fontSize:"42pt", lineHeight:0.95, letterSpacing:"-0.03em" }}>{basics.fullName}</h1>
          <p className="m-0 mt-1 uppercase" style={{ fontSize:"12pt", fontWeight:700, letterSpacing:"0.14em", color:"#6C3BF5" }}>{basics.role}</p>
        </div>
        <p className="m-0 text-right text-[9pt]" style={{ color:"#5C5C63", lineHeight:1.7 }}>{[basics.email,basics.phone,basics.location,basics.website].filter(Boolean).map((x,i)=>(<span key={i} style={{display:"block"}}>{x}</span>))}</p>
      </header>
      <div className="grid gap-8" style={{ padding:"22px 50px 16px", gridTemplateColumns:"1.4fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","About")}><RichTextRender html={basics.summary} style={{color:"#3C3C42",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]">{e.role} <span style={{color:"#6C3BF5",fontWeight:600}}>· {e.company}</span></p>
              <p className="m-0 text-[9pt]" style={{color:"#86868E"}}>{dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="ux-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#3C3C42"}}/>
            </div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Toolkit")}>
            <div className="flex flex-wrap gap-1.5">{skills.map((s,i)=>(<span key={i} style={{padding:"4px 11px",fontSize:"9.5pt",fontWeight:600,color:"#17171A",background:"#fff",border:"1.5px solid #17171A",borderRadius:9999}}>{s}</span>))}</div>
          </Sec>
          <Sec t={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10pt]">{e.degree}</p><p className="m-0 text-[9.5pt]" style={{color:"#86868E"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p></div>))}
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certs")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#3C3C42"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")}>
            <div className="text-[9.5pt]" style={{color:"#3C3C42"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      {projects.length>0 && (
        <div style={{ padding:"4px 50px 40px" }}>
          <h2 className="m-0 mb-3 uppercase" style={{ fontSize:"10.5pt", fontWeight:800, letterSpacing:"0.14em" }}>{getLabel(data,"projects","Selected Work")}</h2>
          <div className="grid gap-3" style={{ gridTemplateColumns:"repeat(3,1fr)" }}>
            {projects.slice(0,6).map((p,i)=>(<div key={i} style={{ background:"#fff", border:"1px solid #E1E1DE", borderRadius:12, padding:"12px 14px", borderTop:`4px solid ${["#6C3BF5","#17171A","#FF5470"][i%3]}` }}>
              <p className="m-0 font-bold text-[10pt]">{p.name}</p>{p.description&&<p className="m-0 mt-0.5 text-[9pt]" style={{color:"#6C6C72"}}>{p.description}</p>}
            </div>))}
          </div>
        </div>
      )}
      <style>{`.ux-b li{position:relative;padding-left:14px;margin-bottom:2px}.ux-b li:before{content:"→";position:absolute;left:0;color:#6C3BF5}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"10.5pt",fontWeight:800,letterSpacing:"0.14em",color:"#17171A"}}>{t}</h2>{children}</section>; }
