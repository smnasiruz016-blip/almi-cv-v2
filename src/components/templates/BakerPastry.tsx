// BakerPastry — Bakers, Pastry Chefs, Cake Decorators (warm artisan)
// Warm flour cream + cocoa + wheat/whisk motif + recipe-card sections. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function BakerPastry({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const C = "#6B4226", P = "#D98E73";
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#FBF5EA", color:"#4A3A2C", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <header className="relative" style={{ padding:"46px 52px 22px", textAlign:"center" }}>
        <svg viewBox="0 0 60 60" style={{ width:48, height:48, margin:"0 auto 6px" }} fill="none" stroke={C} strokeWidth="2.2">
          <path d="M18 8 Q30 2 42 8 L38 26 a8 8 0 0 1-16 0 Z"/>
          <path d="M24 14 v8 M30 13 v10 M36 14 v8"/>
          <path d="M27 34 L24 52 M33 34 L36 52 M24 52 h12"/>
        </svg>
        <h1 className="m-0" style={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:600, fontSize:"40pt", lineHeight:0.98, color:"#3A2C1E" }}>{basics.fullName}</h1>
        <div className="flex items-center justify-center gap-3 mt-1.5" style={{ color:P }}>
          <span style={{flex:1,height:1,background:P,maxWidth:80}}/>
          <p className="m-0 uppercase" style={{ fontSize:"11.5pt", letterSpacing:"0.24em", fontWeight:700, color:"#B4623A" }}>{basics.role}</p>
          <span style={{flex:1,height:1,background:P,maxWidth:80}}/>
        </div>
        <p className="m-0 mt-2 text-[9pt]" style={{ color:"#8A7A66" }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   ·   ")}</p>
      </header>
      <div className="grid gap-9" style={{ padding:"16px 52px 46px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","About")} c={C}><RichTextRender html={basics.summary} style={{color:"#5C4A38",fontSize:"10.5pt",fontStyle:"italic"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Kitchen Experience")} c={C}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-semibold" style={{color:"#3A2C1E",fontFamily:'"Cormorant Garamond",serif',fontSize:"13.5pt"}}>{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:"#B4623A",fontWeight:700}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="bp-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#5C4A38"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Training")} c={C}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:"#3A2C1E"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#8A7A66"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Specialties")} c={C}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10.5pt"}}>{skills.map((s,i)=>(<li key={i} style={{padding:"4px 0",borderBottom:i<skills.length-1?"1px dotted #DCC8B4":"0",color:"#52422F"}}><span style={{color:P,marginRight:8}}>✿</span>{s}</li>))}</ul>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications")} c={C}>
            <ul className="bp-b" style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#5C4A38"}}>{certifications.map((c,i)=>(<li key={i}>{c.name}{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")} c={C}>
            <p className="m-0 text-[10pt]" style={{color:"#5C4A38"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(", ")}</p>
          </Sec>}
        </div>
      </div>
      <style>{`.bp-b li{position:relative;padding-left:14px;margin-bottom:2px}.bp-b li:before{content:"";position:absolute;left:0;top:6px;width:6px;height:6px;border-radius:50%;background:#D98E73}`}</style>
    </article>
  );
}
function Sec({ t, c, children }: { t:string; c:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5" style={{fontFamily:'"Cormorant Garamond",serif',fontSize:"16pt",fontWeight:600,color:c,borderBottom:"1px solid #DCC8B4",paddingBottom:3}}>{t}</h2>{children}</section>; }
