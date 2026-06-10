// PhotoRealEstate — Real-estate / Architecture Photographers, Drone Operators
// White + charcoal + sky accent + viewfinder frame + property-grid feel. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function PhotoRealEstate({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], projects = [] } = data;
  const S = "#2B7DB8", K = "#1E2226";
  return (
    <article className="w-[794px] min-h-[1123px] bg-white relative overflow-hidden print:shadow-none"
      style={{ color:"#2A2E33", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <header className="relative" style={{ padding:"46px 50px 24px" }}>
        <svg viewBox="0 0 60 60" style={{ position:"absolute", right:46, top:34, width:58, height:58 }} stroke={K} strokeWidth="3" fill="none">
          <path d="M4 16 V4 H16 M44 4 H56 V16 M56 44 V56 H44 M16 56 H4 V44"/>
          <circle cx="30" cy="30" r="10" stroke={S}/><circle cx="30" cy="30" r="3.5" fill={S} stroke="none"/>
        </svg>
        <p className="m-0 mb-1 uppercase text-[8.5pt]" style={{ color:S, letterSpacing:"0.32em", fontWeight:700 }}>Property · Interiors · Aerial</p>
        <h1 className="m-0" style={{ fontWeight:900, fontSize:"38pt", lineHeight:0.95, letterSpacing:"-0.02em", color:K }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 uppercase" style={{ fontSize:"12pt", color:"#5C656E", fontWeight:700, letterSpacing:"0.18em" }}>{basics.role}</p>
        <p className="m-0 mt-2 text-[9pt]" style={{ color:"#7A828B" }}>{[basics.email,basics.phone,basics.website,basics.location].filter(Boolean).join("   ·   ")}</p>
      </header>
      <div className="grid gap-9" style={{ padding:"14px 50px 20px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")} s={S} k={K}><RichTextRender html={basics.summary} style={{color:"#454C54",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experience")} s={S} k={K}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]" style={{color:K}}>{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:S,fontWeight:700}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="pre-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#454C54"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")} s={S} k={K}>
            {education.map((e,i)=>(<p key={i} className="m-0 mb-1 text-[10pt]" style={{color:"#454C54"}}><b style={{color:K}}>{e.degree}</b>, {e.school}{e.endDate?` · ${e.endDate}`:""}</p>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Kit & Skills")} s={S} k={K}>
            <div className="flex flex-wrap gap-1.5">{skills.map((s,i)=>(<span key={i} style={{padding:"4px 11px",fontSize:"9pt",fontWeight:700,color:i%2?"#fff":K,background:i%2?K:"#E8F1F8",borderRadius:6}}>{s}</span>))}</div>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Licenses")} s={S} k={K}>
            <ul className="pre-b" style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#454C54"}}>{certifications.map((c,i)=>(<li key={i}>{c.name}{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")} s={S} k={K}>
            <div className="text-[9.5pt]" style={{color:"#454C54"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      {projects.length>0 && (
        <div style={{ padding:"0 50px 44px" }}>
          <h2 className="m-0 mb-3 uppercase" style={{ fontSize:"11pt", fontWeight:900, letterSpacing:"0.12em", color:K }}>{getLabel(data,"projects","Selected Shoots")}</h2>
          <div className="grid gap-3" style={{ gridTemplateColumns:"repeat(3,1fr)" }}>
            {projects.slice(0,3).map((p,i)=>(<div key={i} style={{ border:`2px solid ${K}`, padding:"10px 12px", position:"relative" }}>
              <span style={{ position:"absolute", right:-2, top:-2, width:14, height:14, borderRight:`3px solid ${S}`, borderTop:`3px solid ${S}` }}/>
              <p className="m-0 font-bold text-[10pt]" style={{color:K}}>{p.name}</p>
              {p.description&&<p className="m-0 mt-0.5 text-[9pt]" style={{color:"#6E767E"}}>{p.description}</p>}
            </div>))}
          </div>
        </div>
      )}
      <style>{`.pre-b li{position:relative;padding-left:14px;margin-bottom:2px}.pre-b li:before{content:"";position:absolute;left:0;top:6px;width:7px;height:7px;border:2px solid #2B7DB8}`}</style>
    </article>
  );
}
function Sec({ t, s, k, children }: { t:string; s:string; k:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11pt",fontWeight:900,letterSpacing:"0.12em",color:k,borderBottom:`2px solid ${s}`,paddingBottom:3,display:"inline-block",whiteSpace:"nowrap"}}>{t}</h2>{children}</section>; }
