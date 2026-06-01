// MarketingGradient — Digital Marketing, Growth, Social, SEO, Brand
// Vibrant coral→magenta→violet hero + KPI tiles + clean white body. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function MarketingGradient({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], awards = [] } = data;
  const kpis = awards.slice(0,3);
  return (
    <article className="w-[794px] min-h-[1123px] bg-white relative overflow-hidden print:shadow-none"
      style={{ color:"#221A2E", fontFamily:'"Plus Jakarta Sans","Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5 }}>
      <header className="relative" style={{ padding:"44px 48px 34px", background:"linear-gradient(115deg,#FF5E7E 0%,#C13BD6 48%,#7C3AED 100%)", color:"#fff" }}>
        <div style={{ position:"absolute", right:-40, top:-40, width:200, height:200, borderRadius:"50%", background:"rgba(255,255,255,0.12)" }}/>
        <div style={{ position:"absolute", right:70, bottom:-30, width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,0.10)" }}/>
        <h1 className="m-0 relative" style={{ fontWeight:800, fontSize:"42pt", lineHeight:0.95, letterSpacing:"-0.02em" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1.5 relative uppercase" style={{ fontSize:"13pt", fontWeight:700, letterSpacing:"0.14em", color:"rgba(255,255,255,0.92)" }}>{basics.role}</p>
        <p className="m-0 mt-3 relative text-[9.5pt]" style={{ color:"rgba(255,255,255,0.85)" }}>{[basics.email,basics.phone,basics.location,basics.website].filter(Boolean).join("   ·   ")}</p>
      </header>
      {kpis.length>0 && (
        <div className="grid gap-3" style={{ gridTemplateColumns:`repeat(${kpis.length},1fr)`, padding:"18px 48px 4px" }}>
          {kpis.map((k,i)=>(<div key={i} style={{ borderRadius:14, padding:"12px 14px", background:"linear-gradient(135deg,#FFF0F4,#F3ECFF)", border:"1px solid #F0DBF0" }}>
            <div style={{ fontWeight:800, fontSize:"18pt", lineHeight:1, color:"#C13BD6" }}>{k.title}</div>
            {k.issuer && <div className="text-[8.5pt] uppercase mt-1" style={{ letterSpacing:"0.1em", color:"#7A6A86", fontWeight:600 }}>{k.issuer}</div>}
          </div>))}
        </div>
      )}
      <div className="grid gap-9" style={{ padding:"20px 48px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")}><RichTextRender html={basics.summary} style={{color:"#4A4055",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]" style={{color:"#221A2E"}}>{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:"#C13BD6",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="mg-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#4A4055"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]">{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#7A6A86"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Skills")}>
            <div className="flex flex-wrap gap-1.5">{skills.map((s,i)=>(<span key={i} style={{padding:"4px 12px",fontSize:"9.5pt",fontWeight:600,color:"#7C3AED",background:"#F3ECFF",borderRadius:9999,border:"1px solid #E6D6FB"}}>{s}</span>))}</div>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#4A4055"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")}>
            <div className="text-[9.5pt]" style={{color:"#4A4055"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.mg-b li{position:relative;padding-left:14px;margin-bottom:2px}.mg-b li:before{content:"";position:absolute;left:0;top:6px;width:7px;height:7px;border-radius:50%;background:linear-gradient(135deg,#FF5E7E,#7C3AED)}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5" style={{fontSize:"11.5pt",fontWeight:800,letterSpacing:"0.02em",color:"#C13BD6"}}>{t}</h2>{children}</section>; }
