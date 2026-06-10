// NeonCircuitDev — Full-stack / Software Developers (dark circuit neon)
// Deep blue→violet circuit board + glow name + neon ring dials sidebar + white panel. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

const Ring = ({ pct, label }: { pct:number; label:string }) => (
  <div className="text-center mb-4">
    <svg viewBox="0 0 80 80" style={{ width:76, height:76 }}>
      <circle cx="40" cy="40" r="31" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="7"/>
      <circle cx="40" cy="40" r="31" fill="none" stroke="#5BD0FF" strokeWidth="7" strokeDasharray={`${pct*1.95} 195`} strokeLinecap="round" transform="rotate(-90 40 40)" style={{filter:"drop-shadow(0 0 6px rgba(91,208,255,0.9))"}}/>
      <text x="40" y="46" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff">{pct}%</text>
    </svg>
    <p className="m-0 mt-1 text-[9.5pt] font-bold" style={{ color:"#EAF6FF" }}>{label}</p>
  </div>
);

export default function NeonCircuitDev({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], projects = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"linear-gradient(150deg,#101A6E 0%,#2A1E9E 55%,#4A1AB8 100%)", color:"#1E2438", fontFamily:'"Plus Jakarta Sans","Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5 }}>
      <svg aria-hidden viewBox="0 0 794 240" preserveAspectRatio="none" style={{ position:"absolute", inset:"0 0 auto", width:"100%", height:230, opacity:0.35 }} stroke="#7BD8FF" strokeWidth="1.2" fill="none">
        {[[40,20,200,20,200,90],[300,10,300,70,420,70],[560,30,700,30,700,110],[80,160,180,160,180,220],[640,150,640,200,740,200]].map((p,i)=>(<polyline key={i} points={`${p[0]},${p[1]} ${p[2]},${p[3]} ${p[4]},${p[5]}`}/>))}
        {[[200,90],[300,70],[700,110],[180,220],[640,150]].map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r="4" fill="#7BD8FF"/>))}
      </svg>
      <header className="relative" style={{ padding:"46px 48px 24px", textAlign:"center" }}>
        <h1 className="m-0 uppercase" style={{ fontWeight:900, fontSize:"42pt", lineHeight:0.95, letterSpacing:"0.01em", color:"#FFFFFF", textShadow:"0 0 22px rgba(123,216,255,0.7)" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1" style={{ fontSize:"15pt", color:"#5BE0FF", fontWeight:800, textShadow:"0 0 14px rgba(91,224,255,0.8)" }}>{basics.role}</p>
        <p className="m-0 mt-2 text-[9pt]" style={{ color:"#B8C4F2" }}>{[basics.email,basics.phone,basics.website].filter(Boolean).join("   ·   ")}</p>
      </header>
      <div className="relative grid" style={{ margin:"6px 40px 40px", gridTemplateColumns:"218px 1fr", gap:0 }}>
        <aside style={{ background:"rgba(30,30,120,0.55)", border:"1px solid rgba(123,216,255,0.35)", borderRadius:"22px 0 0 22px", padding:"26px 18px", backdropFilter:"blur(6px)" }}>
          {skills.slice(0,4).map((s,i)=>(<Ring key={i} pct={[90,85,75,70][i]} label={s}/>))}
          {skills.length>4 && <p className="m-0 text-center text-[8.5pt]" style={{color:"#B8C4F2"}}>{skills.slice(4).join(" · ")}</p>}
        </aside>
        <main style={{ background:"#FFFFFF", borderRadius:"0 22px 22px 22px", padding:"28px 30px", boxShadow:"0 18px 50px rgba(10,10,60,0.45)" }}>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")}><RichTextRender html={basics.summary} style={{color:"#46506B",fontSize:"10pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11pt]">{e.role} <span style={{color:"#5B3BD6"}}>· {e.company}</span></p>
              <p className="m-0 text-[9pt]" style={{color:"#8A92AC"}}>{dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="ncd-b" style={{margin:"2px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#46506B"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(<p key={i} className="m-0 mb-1 text-[10pt]" style={{color:"#46506B"}}><b style={{color:"#1E2438"}}>{e.degree}</b>, {e.school}{e.endDate?` · ${e.endDate}`:""}</p>))}
          </Sec>
          {projects.length>0 && <Sec t={getLabel(data,"projects","Projects")}>
            <div className="grid gap-x-6 gap-y-1" style={{gridTemplateColumns:"1fr 1fr"}}>{projects.slice(0,4).map((p,i)=>(<p key={i} className="m-0 text-[9.5pt]" style={{color:"#46506B"}}><b style={{color:"#5B3BD6"}}>{p.name}</b>{p.description?` — ${p.description}`:""}</p>))}</div>
          </Sec>}
          {(certifications.length>0||languages.length>0) && <Sec t={getLabel(data,"certifications","Certifications")}>
            {certifications.length>0 && <p className="m-0 text-[9.5pt]" style={{color:"#46506B"}}>{certifications.map(c=>c.name).join("  ·  ")}</p>}
            {languages.length>0 && <p className="m-0 mt-1 text-[9.5pt]" style={{color:"#8A92AC"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join("  ·  ")}</p>}
          </Sec>}
        </main>
      </div>
      <style>{`.ncd-b li{position:relative;padding-left:13px;margin-bottom:1px}.ncd-b li:before{content:"";position:absolute;left:0;top:6px;width:6px;height:6px;border-radius:2px;background:#5B3BD6}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-4 last:mb-0"><h2 className="m-0 mb-2" style={{fontSize:"14pt",fontWeight:800,color:"#1E2438"}}>{t}</h2>{children}</section>; }
