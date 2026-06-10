// TranslatorGlobal — Translators, Interpreters, Localization Specialists
// White + indigo + globe/speech-bubble motif + language proficiency bars. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function TranslatorGlobal({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const I = "#3B4CC8", T = "#2BAFA4";
  return (
    <article className="w-[794px] min-h-[1123px] bg-white relative overflow-hidden print:shadow-none"
      style={{ color:"#272D42", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <header className="relative" style={{ padding:"42px 50px 26px", borderBottom:`3px solid ${I}` }}>
        <svg viewBox="0 0 100 70" style={{ position:"absolute", right:44, top:28, width:104, height:74, opacity:0.9 }} fill="none">
          <circle cx="40" cy="36" r="26" stroke={I} strokeWidth="2"/>
          <ellipse cx="40" cy="36" rx="12" ry="26" stroke={I} strokeWidth="1.6"/>
          <path d="M14 36h52M18 24h44M18 48h44" stroke={I} strokeWidth="1.6"/>
          <rect x="62" y="8" width="34" height="24" rx="7" fill={T}/>
          <text x="79" y="25" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff">文A</text>
        </svg>
        <h1 className="m-0" style={{ fontWeight:800, fontSize:"36pt", lineHeight:0.98, letterSpacing:"-0.01em", color:"#1C2238" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 uppercase" style={{ fontSize:"12.5pt", color:I, fontWeight:700, letterSpacing:"0.16em" }}>{basics.role}</p>
        <p className="m-0 mt-2 text-[9pt]" style={{ color:"#6E7488" }}>{[basics.email,basics.phone,basics.location,basics.website].filter(Boolean).join("   ·   ")}</p>
      </header>
      <div className="grid gap-9" style={{ padding:"24px 50px 44px", gridTemplateColumns:"1fr 1.5fr" }}>
        <div>
          {languages.length>0 && <Sec t={getLabel(data,"languages","Working Languages")} c={I}>
            {languages.map((l,i)=>(<div key={i} className="mb-2.5"><div className="flex justify-between text-[10pt]"><b>{l.name}</b><span style={{color:T,fontWeight:700}}>{l.level||""}</span></div><div style={{height:7,marginTop:3,borderRadius:5,background:"#E6E9F5"}}><div style={{height:"100%",borderRadius:5,width:`${94-i*12}%`,background:`linear-gradient(90deg,${I},${T})`}}/></div></div>))}
          </Sec>}
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")} c={I}><RichTextRender html={basics.summary} style={{color:"#454D66",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"skills","Specialisations")} c={I}>
            <div className="flex flex-wrap gap-1.5">{skills.map((s,i)=>(<span key={i} style={{padding:"4px 11px",fontSize:"9.5pt",fontWeight:600,color:I,background:"#ECEEFB",borderRadius:8}}>{s}</span>))}</div>
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"experience","Experience")} c={I}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]" style={{color:"#1C2238"}}>{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:T,fontWeight:700}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="tg-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#454D66"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")} c={I}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:"#1C2238"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#6E7488"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Accreditations")} c={I}>
            <ul className="tg-b" style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#454D66"}}>{certifications.map((c,i)=>(<li key={i}>{c.name}{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
        </div>
      </div>
      <style>{`.tg-b li{position:relative;padding-left:15px;margin-bottom:2px}.tg-b li:before{content:"❝";position:absolute;left:0;color:#3B4CC8;font-size:9pt}`}</style>
    </article>
  );
}
function Sec({ t, c, children }: { t:string; c:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11.5pt",fontWeight:800,letterSpacing:"0.1em",color:c,borderBottom:"2px solid #E0E4F2",paddingBottom:3}}>{t}</h2>{children}</section>; }
