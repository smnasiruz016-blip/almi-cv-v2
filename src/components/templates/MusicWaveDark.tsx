// MusicWaveDark — Musicians, Producers, DJs, Audio Engineers, Sound Designers
// Near-black + neon magenta/cyan waveform + equalizer bars. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function MusicWaveDark({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], projects = [] } = data;
  const wave = Array.from({length:60}).map((_,i)=>10+Math.round(30*Math.abs(Math.sin(i*0.6)*Math.cos(i*0.21))));
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#0C0A12", color:"#E4DEEF", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5 }}>
      <header className="relative" style={{ padding:"42px 48px 18px" }}>
        <h1 className="m-0" style={{ fontWeight:900, fontSize:"44pt", lineHeight:0.92, letterSpacing:"-0.02em", textTransform:"uppercase", background:"linear-gradient(90deg,#FF3DAE,#5BE0FF)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 uppercase" style={{ fontSize:"13pt", color:"#5BE0FF", fontWeight:700, letterSpacing:"0.18em" }}>{basics.role}</p>
        <p className="m-0 mt-2 text-[9pt]" style={{ color:"#8A82A0" }}>{[basics.email,basics.phone,basics.location,basics.website].filter(Boolean).join("   ·   ")}</p>
        <svg viewBox="0 0 700 56" preserveAspectRatio="none" style={{ width:"100%", height:46, marginTop:10 }}>
          {wave.map((h,i)=>(<rect key={i} x={i*11.6} y={28-h/2} width="5" height={h} rx="2.5" fill={i%2?"#FF3DAE":"#5BE0FF"} opacity="0.9"/>))}
        </svg>
      </header>
      <div className="grid gap-7" style={{ padding:"12px 48px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Bio")}><RichTextRender html={basics.summary} style={{color:"#B7AECB",fontSize:"10pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]" style={{color:"#F2EDFA"}}>{e.role}</p>
              <p className="m-0 text-[9.5pt]" style={{color:"#FF3DAE",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="mw-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#B7AECB"}}/>
            </div>))}
          </Sec>
          {projects.length>0 && <Sec t={getLabel(data,"projects","Releases & Projects")}>
            {projects.map((p,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-semibold text-[10pt]" style={{color:"#F2EDFA"}}>{p.name}</p>{p.description&&<p className="m-0 text-[9.5pt]" style={{color:"#8A82A0"}}>{p.description}</p>}</div>))}
          </Sec>}
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Skills")}>
            {skills.slice(0,9).map((s,i)=>(<div key={i} className="mb-1.5"><div className="text-[9.5pt]" style={{color:"#E4DEEF"}}>{s}</div><div style={{height:6,marginTop:2,borderRadius:4,background:"rgba(255,255,255,0.08)"}}><div style={{height:"100%",borderRadius:4,width:`${92-i*6}%`,background:"linear-gradient(90deg,#FF3DAE,#5BE0FF)"}}/></div></div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10pt]" style={{color:"#F2EDFA"}}>{e.degree}</p><p className="m-0 text-[9.5pt]" style={{color:"#8A82A0"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
          </Sec>
          {(certifications.length>0||languages.length>0) && <Sec t={getLabel(data,"languages","More")}>
            {certifications.length>0 && <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#B7AECB"}}>{certifications.map((c,i)=>(<li key={i}>{c.name}{c.year?` · ${c.year}`:""}</li>))}</ul>}
            {languages.length>0 && <div className="text-[9.5pt] mt-1" style={{color:"#B7AECB"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>}
          </Sec>}
        </div>
      </div>
      <style>{`.mw-b li{position:relative;padding-left:14px;margin-bottom:1px}.mw-b li:before{content:"";position:absolute;left:0;top:6px;width:6px;height:6px;border-radius:50%;background:#5BE0FF;box-shadow:0 0 6px #5BE0FF}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11pt",fontWeight:800,letterSpacing:"0.14em",color:"#FF3DAE"}}>{t}</h2>{children}</section>; }
