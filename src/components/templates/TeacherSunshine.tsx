// TeacherSunshine — Primary/Elementary Teachers (warm light playful)
// Warm cream + sunny yellow/sky blue waves + sun motif + crayon-color chips. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function TeacherSunshine({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const Y = "#F2A60D", B = "#3E8FD8";
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#FFFDF6", color:"#3A3A33", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <svg viewBox="0 0 794 1123" preserveAspectRatio="none" style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
        <path d="M0 0 H794 V150 Q600 215 400 175 Q200 135 0 195 Z" fill="#FCE9B8"/>
        <path d="M0 195 Q200 135 400 175 Q600 215 794 150 L794 175 Q600 240 400 200 Q200 160 0 220 Z" fill="#BFDCF5"/>
        <path d="M0 1123 H794 V1030 Q600 985 400 1020 Q200 1052 0 1010 Z" fill="#FCE9B8"/>
      </svg>
      <header className="relative" style={{ padding:"40px 50px 14px", display:"grid", gridTemplateColumns:"1fr 190px", gap:20, alignItems:"center" }}>
        <div>
          <h1 className="m-0" style={{ fontWeight:900, fontSize:"38pt", lineHeight:0.96, color:"#2E5070", letterSpacing:"-0.01em" }}>{basics.fullName}</h1>
          <p className="m-0 mt-1.5 uppercase" style={{ fontSize:"12.5pt", color:Y, fontWeight:800, letterSpacing:"0.12em" }}>{basics.role}</p>
          <p className="m-0 mt-2 text-[9pt]" style={{ color:"#7C7C70" }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   ·   ")}</p>
        </div>
        <div className="relative" style={{ width:170, height:170, justifySelf:"end" }}>
          <svg viewBox="0 0 100 100" style={{ position:"absolute", inset:-14, width:"calc(100% + 28px)", height:"calc(100% + 28px)" }}>
            {Array.from({length:12}).map((_,i)=>{const a=i*Math.PI/6;return <line key={i} x1={50+44*Math.cos(a)} y1={50+44*Math.sin(a)} x2={50+50*Math.cos(a)} y2={50+50*Math.sin(a)} stroke={Y} strokeWidth="3.4" strokeLinecap="round"/>;})}
          </svg>
          <div style={{ position:"absolute", inset:0, borderRadius:"50%", overflow:"hidden", border:`6px solid ${Y}`, background:"#FCF3D8", display:"flex", alignItems:"center", justifyContent:"center" }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <span style={{color:Y,fontWeight:900,fontSize:"38pt"}}>{initials(basics.fullName)}</span>}
          </div>
        </div>
      </header>
      <div className="relative grid gap-8" style={{ padding:"60px 50px 110px", gridTemplateColumns:"1.4fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","About Me")} c="#2E5070"><RichTextRender html={basics.summary} style={{color:"#54544A",fontSize:"10pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Teaching Experience")} c="#2E5070">
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11pt]" style={{color:"#2E5070"}}>{e.role}</p>
              <p className="m-0 text-[9.5pt]" style={{color:B,fontWeight:700}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="tsh-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#54544A"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")} c="#2E5070">
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:"#2E5070"}}>{e.degree}</p><p className="m-0 text-[9.5pt]" style={{color:"#7C7C70"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Skills")} c="#2E5070">
            <div className="flex flex-wrap gap-1.5">{skills.map((s,i)=>(<span key={i} style={{padding:"4px 12px",fontSize:"9pt",fontWeight:700,color:"#fff",background:["#F2A60D","#3E8FD8","#E8654F","#52B788"][i%4],borderRadius:9999}}>{s}</span>))}</div>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications")} c="#2E5070">
            <ul className="tsh-b" style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#54544A"}}>{certifications.map((c,i)=>(<li key={i}>{c.name}{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")} c="#2E5070">
            <div className="text-[9.5pt]" style={{color:"#54544A"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.tsh-b li{position:relative;padding-left:15px;margin-bottom:2px}.tsh-b li:before{content:"✏";position:absolute;left:0;font-size:8pt;top:1px}`}</style>
    </article>
  );
}
function Sec({ t, c, children }: { t:string; c:string; children:React.ReactNode }){ return <section className="mb-4 last:mb-0"><h2 className="m-0 mb-2" style={{fontSize:"13.5pt",fontWeight:900,color:c,borderBottom:"3px solid #F2A60D",paddingBottom:3,display:"inline-block",whiteSpace:"nowrap"}}>{t}</h2>{children}</section>; }
