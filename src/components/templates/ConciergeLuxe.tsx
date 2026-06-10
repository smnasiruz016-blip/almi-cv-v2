// ConciergeLuxe — Hotel Concierges, Butlers, Guest Relations, Private Service
// Midnight teal + champagne + key motif + refined serif + service chips. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function ConciergeLuxe({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const C = "#D8B86A";
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#10282A", color:"#E4E0D2", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <div style={{ position:"absolute", inset:16, border:"1px solid rgba(216,184,106,0.4)", pointerEvents:"none" }}/>
      <header className="relative" style={{ padding:"50px 56px 24px", textAlign:"center" }}>
        <svg viewBox="0 0 60 60" style={{ width:46, height:46, margin:"0 auto 8px" }} fill="none" stroke={C} strokeWidth="2">
          <circle cx="30" cy="20" r="11"/><circle cx="30" cy="20" r="4.5"/>
          <path d="M30 31 V52 M30 42 h9 M30 48 h7"/>
        </svg>
        <h1 className="m-0" style={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:600, fontSize:"40pt", lineHeight:0.98, letterSpacing:"0.03em", textTransform:"uppercase", color:"#F4EFDF" }}>{basics.fullName}</h1>
        <div className="flex items-center justify-center gap-3 mt-2" style={{ color:C }}>
          <span style={{flex:1,height:1,background:C,maxWidth:80,opacity:0.6}}/>
          <p className="m-0 uppercase" style={{ fontSize:"11.5pt", letterSpacing:"0.3em", fontWeight:600 }}>{basics.role}</p>
          <span style={{flex:1,height:1,background:C,maxWidth:80,opacity:0.6}}/>
        </div>
        <p className="m-0 mt-3 text-[9pt]" style={{ color:"#9AA396" }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   ·   ")}</p>
      </header>
      <div className="relative grid gap-9" style={{ padding:"16px 56px 48px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Service Philosophy")} c={C}><RichTextRender html={basics.summary} style={{color:"#C2BFAE",fontSize:"10.5pt",fontStyle:"italic"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experience")} c={C}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-semibold" style={{color:"#F4EFDF",fontFamily:'"Cormorant Garamond",serif',fontSize:"14pt"}}>{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:C,fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="cl-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#C2BFAE"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")} c={C}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-semibold text-[11pt]" style={{color:"#F4EFDF"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#9AA396"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Services")} c={C}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10.5pt"}}>{skills.map((s,i)=>(<li key={i} style={{padding:"4px 0",borderBottom:i<skills.length-1?"1px solid rgba(216,184,106,0.22)":"0",color:"#D8D4C2"}}><span style={{color:C,marginRight:8}}>⚜</span>{s}</li>))}</ul>
          </Sec>
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")} c={C}>
            {languages.map((l,i)=>(<div key={i} className="flex justify-between mb-1 text-[10pt]"><span style={{color:"#D8D4C2"}}>{l.name}</span><span style={{color:C}}>{l.level}</span></div>))}
          </Sec>}
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Memberships")} c={C}>
            <ul className="cl-b" style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#C2BFAE"}}>{certifications.map((c,i)=>(<li key={i}>{c.name}{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
        </div>
      </div>
      <style>{`.cl-b li{position:relative;padding-left:14px;margin-bottom:2px}.cl-b li:before{content:"·";position:absolute;left:2px;color:#D8B86A;font-weight:900}`}</style>
    </article>
  );
}
function Sec({ t, c, children }: { t:string; c:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11pt",fontWeight:700,letterSpacing:"0.22em",color:c}}>{t}</h2>{children}</section>; }
