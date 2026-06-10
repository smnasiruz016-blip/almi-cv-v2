// LibrarianNeonWave — Librarians, Archivists, Information Specialists (dark blue)
// Deep navy + sweeping blue/white wave + neon hexagon photo + bold white sections. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function LibrarianNeonWave({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#0D1B45", color:"#DCE4F5", fontFamily:'"Plus Jakarta Sans","Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <svg viewBox="0 0 794 1123" preserveAspectRatio="none" style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
        <path d="M0 330 Q200 250 420 300 Q640 350 794 270 L794 320 Q640 400 420 350 Q200 300 0 380 Z" fill="#2E5BE8"/>
        <path d="M0 380 Q200 300 420 350 Q640 400 794 320 L794 345 Q640 425 420 375 Q200 325 0 405 Z" fill="#E8EDF8"/>
        <circle cx="660" cy="560" r="3" fill="#5B8BF6" opacity="0.8"/><circle cx="700" cy="760" r="4" fill="#5B8BF6" opacity="0.5"/><circle cx="630" cy="950" r="3" fill="#5B8BF6" opacity="0.7"/>
      </svg>
      <header className="relative" style={{ padding:"46px 48px 12px", display:"grid", gridTemplateColumns:"1fr 220px", gap:20 }}>
        <div>
          <h1 className="m-0 uppercase" style={{ fontWeight:900, fontSize:"40pt", lineHeight:0.96, letterSpacing:"-0.01em", color:"#FFFFFF" }}>{basics.fullName}</h1>
          <p className="m-0 mt-1 uppercase" style={{ fontSize:"14pt", color:"#4D9BF5", fontWeight:800, letterSpacing:"0.1em" }}>{basics.role}</p>
        </div>
        <div className="relative" style={{ width:190, height:200, justifySelf:"end" }}>
          <svg viewBox="0 0 100 110" style={{ position:"absolute", inset:0, width:"100%", height:"100%", filter:"drop-shadow(0 0 14px rgba(77,155,245,0.9))" }}>
            <polygon points="50,4 94,30 94,80 50,106 6,80 6,30" fill="none" stroke="#4D9BF5" strokeWidth="3"/>
          </svg>
          <div style={{ position:"absolute", inset:14, clipPath:"polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)", overflow:"hidden", background:"#1A2E66", display:"flex", alignItems:"center", justifyContent:"center" }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <span style={{color:"#4D9BF5",fontWeight:800,fontSize:"34pt"}}>{initials(basics.fullName)}</span>}
          </div>
        </div>
      </header>
      <div className="relative grid gap-8" style={{ padding:"160px 48px 44px", gridTemplateColumns:"1.35fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")}><RichTextRender html={basics.summary} style={{color:"#B6C4E2",fontSize:"10pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11pt]" style={{color:"#FFF"}}>{e.role} <span style={{color:"#4D9BF5",fontWeight:600}}>| {e.company}</span></p>
              <p className="m-0 text-[9pt]" style={{color:"#7C8DB5"}}>{dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="lnw-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#B6C4E2"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:"#FFF"}}>{e.degree}</p><p className="m-0 text-[9.5pt]" style={{color:"#7C8DB5"}}>{e.school}{e.endDate?` | ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Skills")}>
            <div className="text-[9.5pt]" style={{color:"#B6C4E2",lineHeight:1.9}}>{skills.join("  |  ")}</div>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications")}>
            <ul className="lnw-b" style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#B6C4E2"}}>{certifications.map((c,i)=>(<li key={i}>{c.name}{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")}>
            <div className="text-[9.5pt]" style={{color:"#B6C4E2"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" | ")}</div>
          </Sec>}
          <Sec t={getLabel(data,"contact","Contact")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",lineHeight:1.9,color:"#B6C4E2",wordBreak:"break-word"}}>{[basics.email,basics.phone,basics.website,basics.location].filter(Boolean).map((x,i)=>(<li key={i}>{x}</li>))}</ul>
          </Sec>
        </div>
      </div>
      <style>{`.lnw-b li{position:relative;padding-left:13px;margin-bottom:2px}.lnw-b li:before{content:"";position:absolute;left:0;top:6px;width:6px;height:6px;border-radius:50%;background:#4D9BF5}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2 uppercase" style={{fontSize:"16pt",fontWeight:900,letterSpacing:"0.04em",color:"#FFFFFF"}}>{t}</h2>{children}</section>; }
