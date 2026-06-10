// SocialWorkerBridge — Social Workers, Case Managers, Community Outreach
// Warm white + dusty blue + terracotta + bridge/connection motif. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function SocialWorkerBridge({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const B = "#4A7BA6", T = "#C96F4A";
  return (
    <article className="w-[794px] min-h-[1123px] bg-white relative overflow-hidden print:shadow-none"
      style={{ color:"#34404A", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <header className="relative" style={{ padding:"44px 50px 26px", background:"#F2F6F9", borderBottom:`3px solid ${B}` }}>
        <svg viewBox="0 0 130 60" style={{ position:"absolute", right:44, top:34, width:128, height:60 }} fill="none" stroke={B} strokeWidth="2.2">
          <path d="M6 50 Q65 0 124 50"/><path d="M6 50 H124"/>
          {[26,46,65,84,104].map((x,i)=>{const y=50-(25-Math.abs(x-65)*0.42);return <line key={i} x1={x} y1={y} x2={x} y2="50"/>;})}
          <circle cx="30" cy="22" r="4.5" fill={T} stroke="none"/><circle cx="100" cy="22" r="4.5" fill={T} stroke="none"/>
        </svg>
        <h1 className="m-0" style={{ fontWeight:800, fontSize:"35pt", lineHeight:0.98, letterSpacing:"-0.01em", color:"#22313E" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 uppercase" style={{ fontSize:"12.5pt", color:T, fontWeight:700, letterSpacing:"0.14em" }}>{basics.role}</p>
        <p className="m-0 mt-2 text-[9pt]" style={{ color:"#67767F" }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   ·   ")}</p>
      </header>
      <div className="grid gap-9" style={{ padding:"24px 50px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Practice Statement")} b={B}><RichTextRender html={basics.summary} style={{color:"#44525E",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Casework Experience")} b={B}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]" style={{color:"#22313E"}}>{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:B,fontWeight:700}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="swb-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#44525E"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")} b={B}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:"#22313E"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#67767F"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Practice Skills")} b={B}>
            <div className="flex flex-wrap gap-1.5">{skills.map((s,i)=>(<span key={i} style={{padding:"4px 12px",fontSize:"9.5pt",fontWeight:600,color:i%2?B:T,background:i%2?"#E8F0F6":"#F9E9E2",borderRadius:9999}}>{s}</span>))}</div>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Licensure")} b={B}>
            <ul className="swb-b" style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#44525E"}}>{certifications.map((c,i)=>(<li key={i}>{c.name}{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")} b={B}>
            <div className="text-[9.5pt]" style={{color:"#44525E"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.swb-b li{position:relative;padding-left:15px;margin-bottom:2px}.swb-b li:before{content:"";position:absolute;left:0;top:6px;width:7px;height:7px;border-radius:50%;background:#C96F4A}`}</style>
    </article>
  );
}
function Sec({ t, b, children }: { t:string; b:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11.5pt",fontWeight:800,letterSpacing:"0.1em",color:"#22313E",borderBottom:`2px solid ${b}`,paddingBottom:3,display:"inline-block",whiteSpace:"nowrap"}}>{t}</h2>{children}</section>; }
