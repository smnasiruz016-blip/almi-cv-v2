// DispatcherRadio — 911 Dispatchers, Emergency Call Operators, Control Room
// Dark slate + amber radio-wave motif + channel chips + calm authority. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function DispatcherRadio({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], awards = [] } = data;
  const A = "#F5A623";
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#1C2128", color:"#D8DCE2", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5 }}>
      <header className="relative" style={{ padding:"44px 48px 22px" }}>
        <svg viewBox="0 0 120 80" style={{ position:"absolute", right:44, top:30, width:116, height:78, opacity:0.9 }} fill="none" stroke={A} strokeWidth="2">
          <circle cx="60" cy="44" r="7" fill={A}/>
          {[16,28,40].map((r,i)=>(<path key={i} d={`M${60-r} 44 a${r} ${r} 0 0 1 ${2*r} 0`} opacity={1-i*0.28}/>))}
          <line x1="60" y1="51" x2="60" y2="76"/>
        </svg>
        <p className="m-0 mb-1 text-[8.5pt] uppercase" style={{ color:A, letterSpacing:"0.3em", fontWeight:700 }}>⬤ ON CALL · 24/7</p>
        <h1 className="m-0 uppercase" style={{ fontWeight:900, fontSize:"37pt", lineHeight:0.95, letterSpacing:"-0.01em", color:"#F2F4F7" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 uppercase" style={{ fontSize:"12.5pt", color:A, fontWeight:800, letterSpacing:"0.16em" }}>{basics.role}</p>
        <p className="m-0 mt-2 text-[8.5pt]" style={{ color:"#8A93A0" }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   |   ")}</p>
      </header>
      {awards.length>0 && <div className="grid gap-3" style={{ padding:"8px 48px 0", gridTemplateColumns:`repeat(${Math.min(awards.length,4)},1fr)` }}>
        {awards.slice(0,4).map((a,i)=>(<div key={i} style={{ padding:"10px 12px", borderRadius:10, background:"#242A33", border:"1px solid #333B47" }}>
          <div style={{ fontWeight:900, fontSize:"15pt", lineHeight:1, color:A }}>{a.title}</div>
          {a.issuer&&<div className="text-[7.5pt] mt-1 uppercase" style={{ color:"#8A93A0", letterSpacing:"0.1em" }}>{a.issuer}</div>}
        </div>))}
      </div>}
      <div className="grid gap-7" style={{ padding:"22px 48px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")} a={A}><RichTextRender html={basics.summary} style={{color:"#AEB6C2",fontSize:"10pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experience")} a={A}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11pt]" style={{color:"#F2F4F7"}}>{e.role}</p>
              <p className="m-0 text-[9.5pt]" style={{color:A,fontWeight:700}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="dr-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#AEB6C2"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education & Training")} a={A}>
            {education.map((e,i)=>(<p key={i} className="m-0 mb-1 text-[10pt]" style={{color:"#AEB6C2"}}><b style={{color:"#F2F4F7"}}>{e.degree}</b>, {e.school}{e.endDate?` · ${e.endDate}`:""}</p>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Channels")} a={A}>
            <div className="flex flex-wrap gap-1.5">{skills.map((s,i)=>(<span key={i} style={{padding:"4px 11px",fontSize:"9pt",fontWeight:700,color:i%2?"#1C2128":A,background:i%2?A:"transparent",border:`1.5px solid ${A}`,borderRadius:9999}}>{s}</span>))}</div>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications")} a={A}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#AEB6C2"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><span style={{color:A}}>▣</span> {c.name}{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")} a={A}>
            <div className="text-[9.5pt]" style={{color:"#AEB6C2"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.dr-b li{position:relative;padding-left:14px;margin-bottom:1px}.dr-b li:before{content:"";position:absolute;left:0;top:6px;width:6px;height:6px;border-radius:50%;background:#F5A623}`}</style>
    </article>
  );
}
function Sec({ t, a, children }: { t:string; a:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11pt",fontWeight:900,letterSpacing:"0.12em",color:a,borderLeft:`4px solid ${a}`,paddingLeft:8}}>{t}</h2>{children}</section>; }
