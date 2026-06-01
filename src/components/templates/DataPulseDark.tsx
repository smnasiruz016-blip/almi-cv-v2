// DataPulseDark — Data Analysts, BI Developers, Data Visualization Specialists
// Deep ink + teal→violet gradient + pie + waveform + neon skill bars. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function DataPulseDark({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const bars = Array.from({length:46}).map((_,i)=>14+Math.round(28*Math.abs(Math.sin(i*0.9))));
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#0B1020", color:"#D5DEEC", fontFamily:'"Plus Jakarta Sans","Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5 }}>
      <header className="relative grid items-center" style={{ gridTemplateColumns:"150px 1fr", gap:24, padding:"44px 48px 22px" }}>
        <div style={{ width:130, height:130, borderRadius:"50%", padding:3, background:"conic-gradient(#2DE0C0,#6C5CFF,#2DE0C0)" }}>
          <div style={{ width:"100%", height:"100%", borderRadius:"50%", background:"#0B1020", display:"flex", alignItems:"center", justifyContent:"center", color:"#2DE0C0", fontWeight:800, fontSize:"34pt", border:"3px solid #0B1020" }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}/> : initials(basics.fullName)}
          </div>
        </div>
        <div>
          <h1 className="m-0" style={{ fontWeight:800, fontSize:"40pt", lineHeight:0.95, letterSpacing:"-0.02em", textTransform:"uppercase", color:"#F3F7FF" }}>{basics.fullName}</h1>
          <p className="m-0 mt-1 uppercase" style={{ fontSize:"13pt", fontWeight:700, letterSpacing:"0.14em", background:"linear-gradient(90deg,#2DE0C0,#6C5CFF)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{basics.role}</p>
          <p className="m-0 mt-2 text-[9.5pt]" style={{ color:"#7C89A6" }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   ·   ")}</p>
        </div>
      </header>
      <div className="grid gap-6" style={{ padding:"6px 48px 20px", gridTemplateColumns:"1.45fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","PROFILE")}><RichTextRender html={basics.summary} style={{color:"#AEBAD0",fontSize:"10pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","EXPERIENCE")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]" style={{color:"#EAF0FB"}}>{e.role}</p>
              <p className="m-0 text-[9.5pt]" style={{color:"#2DE0C0",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="dpd-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#AEBAD0"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","EDUCATION")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:"#EAF0FB"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#8190AB"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","SKILLS")}>
            {skills.slice(0,8).map((s,i)=>(<div key={i} className="mb-2"><div className="text-[9.5pt]" style={{color:"#D5DEEC"}}>{s}</div><div style={{height:6,marginTop:3,borderRadius:5,background:"rgba(255,255,255,0.07)"}}><div style={{height:"100%",borderRadius:5,width:`${90-i*6}%`,background:"linear-gradient(90deg,#2DE0C0,#6C5CFF)"}}/></div></div>))}
          </Sec>
          <Sec t="ANALYTICS">
            <svg viewBox="0 0 120 120" style={{ width:118, height:118, display:"block", margin:"0 auto 8px" }}>
              <circle cx="60" cy="60" r="46" fill="none" stroke="#23304E" strokeWidth="16"/>
              <circle cx="60" cy="60" r="46" fill="none" stroke="#2DE0C0" strokeWidth="16" strokeDasharray="170 289" transform="rotate(-90 60 60)"/>
              <circle cx="60" cy="60" r="46" fill="none" stroke="#6C5CFF" strokeWidth="16" strokeDasharray="90 289" strokeDashoffset="-170" transform="rotate(-90 60 60)"/>
            </svg>
            <svg viewBox="0 0 230 50" style={{ width:"100%", height:42 }}>
              {bars.map((h,i)=>(<rect key={i} x={i*5} y={50-h} width="3" height={h} rx="1.5" fill={i%2?"#6C5CFF":"#2DE0C0"} opacity="0.9"/>))}
            </svg>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","CERTIFICATIONS")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#AEBAD0"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b style={{color:"#EAF0FB"}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
        </div>
      </div>
      <style>{`.dpd-b li{position:relative;padding-left:14px;margin-bottom:2px}.dpd-b li:before{content:"";position:absolute;left:0;top:6px;width:7px;height:7px;border-radius:2px;background:linear-gradient(135deg,#2DE0C0,#6C5CFF)}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11pt",fontWeight:800,letterSpacing:"0.14em",color:"#2DE0C0"}}>{t}</h2>{children}</section>; }
