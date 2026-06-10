// TattooInk — Tattoo Artists, Piercers, Studio Artists (bold ink editorial)
// Black + parchment + ink-flourish + old-school banner + machine motif. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function TattooInk({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const I = "#C8A24E";
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#141210", color:"#E6DECF", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5 }}>
      <header className="relative" style={{ padding:"48px 50px 22px", textAlign:"center" }}>
        <svg viewBox="0 0 320 30" style={{ width:300, height:28, margin:"0 auto 6px", display:"block" }} fill="none" stroke={I} strokeWidth="1.6">
          <path d="M10 15 Q60 2 160 15 Q260 28 310 15"/><path d="M40 15 l-8 -7 M40 15 l-8 7 M280 15 l8 -7 M280 15 l8 7"/>
          <circle cx="160" cy="15" r="3.5" fill={I} stroke="none"/>
        </svg>
        <h1 className="m-0 uppercase" style={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:700, fontSize:"42pt", lineHeight:0.95, letterSpacing:"0.06em", color:"#F4EDDC" }}>{basics.fullName}</h1>
        <div className="relative mx-auto mt-3" style={{ width:330, background:I, color:"#141210", padding:"5px 0", clipPath:"polygon(6% 0,94% 0,100% 50%,94% 100%,6% 100%,0 50%)" }}>
          <p className="m-0 uppercase text-[11pt]" style={{ fontWeight:900, letterSpacing:"0.22em" }}>{basics.role}</p>
        </div>
        <p className="m-0 mt-3 text-[9pt]" style={{ color:"#9A9282" }}>{[basics.email,basics.phone,basics.website,basics.location].filter(Boolean).join("   ·   ")}</p>
      </header>
      <div className="grid gap-9" style={{ padding:"18px 50px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Artist Statement")} i={I}><RichTextRender html={basics.summary} style={{color:"#C2BAA8",fontSize:"10.5pt",fontStyle:"italic"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Studio Experience")} i={I}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[12pt]" style={{color:"#F4EDDC",fontFamily:'"Cormorant Garamond",serif',fontSize:"14pt"}}>{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:I,fontWeight:700}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="ti-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#C2BAA8"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Apprenticeship & Training")} i={I}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:"#F4EDDC"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#9A9282"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Styles")} i={I}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10.5pt"}}>{skills.map((s,i)=>(<li key={i} style={{padding:"4px 0",borderBottom:i<skills.length-1?"1px solid rgba(200,162,78,0.25)":"0",color:"#D8D0BE"}}><span style={{color:I,marginRight:8}}>✠</span>{s}</li>))}</ul>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Health & Safety")} i={I}>
            <ul className="ti-b" style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#C2BAA8"}}>{certifications.map((c,i)=>(<li key={i}>{c.name}{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")} i={I}>
            <p className="m-0 text-[10pt]" style={{color:"#C2BAA8"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(", ")}</p>
          </Sec>}
        </div>
      </div>
      <style>{`.ti-b li{position:relative;padding-left:15px;margin-bottom:2px}.ti-b li:before{content:"✦";position:absolute;left:0;color:#C8A24E;font-size:8pt}`}</style>
    </article>
  );
}
function Sec({ t, i, children }: { t:string; i:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5" style={{fontFamily:'"Cormorant Garamond",serif',fontSize:"16pt",fontWeight:700,color:i,letterSpacing:"0.04em",borderBottom:"1px solid rgba(200,162,78,0.35)",paddingBottom:4}}>{t}</h2>{children}</section>; }
