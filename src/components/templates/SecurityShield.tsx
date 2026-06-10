// SecurityShield — Security Guards, Security Officers, Loss Prevention
// Charcoal + steel blue + shield badge + patrol-grid + vigilance chips. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function SecurityShield({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const B = "#3E6FA8", K = "#23282E";
  return (
    <article className="w-[794px] min-h-[1123px] bg-white relative overflow-hidden print:shadow-none"
      style={{ color:"#2A3138", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <header className="relative" style={{ padding:"42px 48px 26px", background:K, color:"#fff" }}>
        <svg viewBox="0 0 70 80" style={{ position:"absolute", right:46, top:28, width:64, height:74 }} fill="none" stroke={B} strokeWidth="2.5">
          <path d="M35 4 L62 14 V38 C62 56 50 68 35 74 C20 68 8 56 8 38 V14 Z"/>
          <path d="M22 38 l9 9 L50 28" stroke="#7EB2E8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h1 className="m-0 uppercase" style={{ fontWeight:900, fontSize:"36pt", lineHeight:0.95, letterSpacing:"-0.01em" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 uppercase" style={{ fontSize:"13pt", color:"#7EB2E8", fontWeight:800, letterSpacing:"0.14em" }}>{basics.role}</p>
        <p className="m-0 mt-2 text-[9pt]" style={{ color:"#9AA6B2" }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   ·   ")}</p>
      </header>
      <div className="grid gap-9" style={{ padding:"26px 48px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")} b={B} k={K}><RichTextRender html={basics.summary} style={{color:"#46505A",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Security Experience")} b={B} k={K}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]" style={{color:K}}>{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:B,fontWeight:700}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="ss-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#46505A"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education & Training")} b={B} k={K}>
            {education.map((e,i)=>(<p key={i} className="m-0 mb-1 text-[10pt]" style={{color:"#46505A"}}><b style={{color:K}}>{e.degree}</b>, {e.school}{e.endDate?` · ${e.endDate}`:""}</p>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"certifications","Licenses")} b={B} k={K}>
            <div className="flex flex-wrap gap-1.5">{certifications.map((c,i)=>(<span key={i} style={{padding:"4px 11px",fontSize:"9pt",fontWeight:800,color:"#fff",background:i%2?B:K,borderRadius:6}}>{c.name}</span>))}</div>
          </Sec>
          <Sec t={getLabel(data,"skills","Skills")} b={B} k={K}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt"}}>{skills.map((s,i)=>(<li key={i} className="flex items-start gap-2 mb-1" style={{color:"#333D47"}}><span style={{color:B,fontWeight:900}}>▣</span>{s}</li>))}</ul>
          </Sec>
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")} b={B} k={K}>
            <div className="text-[9.5pt]" style={{color:"#46505A"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.ss-b li{position:relative;padding-left:15px;margin-bottom:2px}.ss-b li:before{content:"";position:absolute;left:0;top:6px;width:7px;height:7px;background:#3E6FA8}`}</style>
    </article>
  );
}
function Sec({ t, b, k, children }: { t:string; b:string; k:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11.5pt",fontWeight:900,letterSpacing:"0.08em",color:k,borderLeft:`5px solid ${b}`,paddingLeft:8}}>{t}</h2>{children}</section>; }
