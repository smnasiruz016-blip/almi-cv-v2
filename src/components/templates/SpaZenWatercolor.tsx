// SpaZenWatercolor — Massage Therapists, Spa, Wellness, Estheticians (light)
// White + soft mint/teal watercolor waves + lotus motifs. Calm, airy, gold thread.
"use client";

import React from "react";
import { TemplateProps, dateRange, RichTextRender, getLabel, initials } from "./types";

export default function SpaZenWatercolor({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] bg-white relative overflow-hidden print:shadow-none"
      style={{ color:"#4A5550", fontFamily:'"Cormorant Garamond","Inter",serif', fontSize:"11pt", lineHeight:1.6 }}>
      {/* watercolor waves */}
      <svg viewBox="0 0 794 1123" preserveAspectRatio="none" style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
        <defs>
          <linearGradient id="sz-w1" x1="0" x2="1" y1="0" y2="0"><stop offset="0%" stopColor="#BFE8D4"/><stop offset="100%" stopColor="#A7D8E8"/></linearGradient>
          <linearGradient id="sz-w2" x1="0" x2="1" y1="0" y2="0"><stop offset="0%" stopColor="#D4EFE0"/><stop offset="60%" stopColor="#C3B8E8"/><stop offset="100%" stopColor="#BFE8D4"/></linearGradient>
        </defs>
        <path d="M 0 460 C 200 380 360 540 540 470 C 660 425 740 470 794 450 L 794 600 C 740 560 660 600 540 640 C 360 700 200 540 0 620 Z" fill="url(#sz-w1)" opacity="0.55"/>
        <path d="M 0 520 C 200 450 360 600 540 530 C 660 488 740 530 794 515 L 794 660 C 740 625 660 660 540 700 C 360 760 200 600 0 680 Z" fill="url(#sz-w2)" opacity="0.45"/>
        {/* gold thread */}
        <path d="M 120 540 C 320 470 520 600 720 470" fill="none" stroke="#D9B36A" strokeWidth="1.5" opacity="0.7"/>
      </svg>

      {/* Lotus + stones */}
      <Lotus x={600} y={350} s={0.9} />
      <Lotus x={150} y={500} s={1.1} />
      <Stones x={150} y={800} />

      <div className="relative" style={{ padding:"48px 56px 44px" }}>
        <header className="grid items-start gap-8 mb-2" style={{ gridTemplateColumns:"210px 1fr" }}>
          <div style={{ width:210, height:250, borderRadius:24, background:"linear-gradient(180deg,#D8CCF0 0%,#C3B8E8 100%)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:600, fontSize:"56pt", fontFamily:'"Cormorant Garamond",serif' }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:24}}/> : initials(basics.fullName)}
          </div>
          <div>
            <h1 className="m-0" style={{ fontWeight:600, fontSize:"34pt", lineHeight:1.05, color:"#3D4A44", letterSpacing:"0.01em" }}>{basics.fullName}</h1>
            <p className="m-0 mt-1 italic" style={{ fontSize:"15pt", color:"#6FA88C" }}>{basics.role}</p>
            <h2 className="m-0 mt-5 font-bold text-[13pt]" style={{ color:"#3D4A44", fontFamily:"Inter,sans-serif" }}>Contact Info</h2>
            <div className="mt-2" style={{ display:"grid", gridTemplateColumns:"60px 1fr", rowGap:5, fontSize:"10pt", fontFamily:"Inter,sans-serif", color:"#6B736E" }}>
              {basics.email && (<><b style={{color:"#3D4A44"}}>Email</b><span>{basics.email}</span></>)}
              {basics.phone && (<><b style={{color:"#3D4A44"}}>Phone</b><span>{basics.phone}</span></>)}
              {basics.website && (<><b style={{color:"#3D4A44"}}>Web</b><span>{basics.website}</span></>)}
              {basics.location && (<><b style={{color:"#3D4A44"}}>City</b><span>{basics.location}</span></>)}
              {certifications[0] && (<><b style={{color:"#3D4A44"}}>Cert</b><span>{certifications[0].name}</span></>)}
            </div>
          </div>
        </header>

        <div className="grid gap-8" style={{ gridTemplateColumns:"1fr 1.3fr", marginTop:150 }}>
          <div>
            <ZTitle>{getLabel(data,"education","Education")}</ZTitle>
            {education.map((e,i)=>(
              <div key={i} className="mb-2 last:mb-0">
                <p className="m-0 font-semibold text-[11.5pt]" style={{color:"#3D4A44"}}>{e.degree}</p>
                <p className="m-0 text-[10.5pt]" style={{color:"#6B736E"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p>
              </div>
            ))}
            {certifications.length>1 && (<>
              <ZTitle>{getLabel(data,"certifications","Certifications")}</ZTitle>
              <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10.5pt",color:"#4A5550"}}>
                {certifications.slice(1).map((c,i)=>(<li key={i} className="mb-0.5">{c.name}{c.year?` · ${c.year}`:""}</li>))}
              </ul>
            </>)}
          </div>

          <div>
            <ZTitle>{getLabel(data,"experience","Work Experience")}</ZTitle>
            {experience.map((e,i)=>(
              <div key={i} className="mb-3 last:mb-0">
                <p className="m-0 font-semibold text-[12pt]" style={{color:"#3D4A44"}}>{e.role}</p>
                <p className="m-0 italic text-[10.5pt]" style={{color:"#6FA88C"}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
                {e.bullets?.length ? <RichTextRender html={e.bullets[0]} style={{margin:"2px 0 0",fontSize:"10.5pt",color:"#6B736E"}}/> : null}
              </div>
            ))}
            <ZTitle>{getLabel(data,"skills","Skills")}</ZTitle>
            {skills.slice(0,6).map((s,i)=>(
              <div key={i} className="flex items-center gap-3 mb-1.5">
                <span className="text-[10.5pt]" style={{flex:"0 0 130px",color:"#4A5550"}}>{s}</span>
                <span style={{flex:1,height:7,borderRadius:9999,background:"#E4EFE9"}}><span style={{display:"block",height:"100%",width:`${88-i*7}%`,borderRadius:9999,background:"linear-gradient(90deg,#A7D8E8,#6FA88C)"}}/></span>
              </div>
            ))}
            {languages.length>0 && (<p className="m-0 mt-3 text-[10.5pt]" style={{color:"#6B736E",fontFamily:"Inter,sans-serif"}}>{languages.map((l,i)=><React.Fragment key={i}><b style={{color:"#3D4A44"}}>{l.name}</b> {l.level}{i<languages.length-1?"  ·  ":""}</React.Fragment>)}</p>)}
          </div>
        </div>
      </div>
    </article>
  );
}

function ZTitle({ children }: { children: React.ReactNode }){ return <h2 className="m-0" style={{ marginTop:18, marginBottom:8, fontWeight:700, fontSize:"14pt", color:"#3D4A44", fontFamily:"Inter,sans-serif" }}>{children}</h2>; }
function Lotus({ x, y, s }: { x:number; y:number; s:number }){
  return (<svg viewBox="0 0 80 60" style={{ position:"absolute", left:x, top:y, width:80*s, height:60*s, opacity:0.92, pointerEvents:"none" }}>
    <g>
      <ellipse cx="40" cy="42" rx="30" ry="10" fill="#F4C6D2"/>
      <path d="M40 14 C 32 28 32 40 40 44 C 48 40 48 28 40 14 Z" fill="#F6B9C8"/>
      <path d="M22 22 C 22 36 32 42 40 44 C 36 34 30 26 22 22 Z" fill="#F8C9D6"/>
      <path d="M58 22 C 58 36 48 42 40 44 C 44 34 50 26 58 22 Z" fill="#F8C9D6"/>
      <ellipse cx="40" cy="40" rx="8" ry="5" fill="#F4D98A"/>
    </g>
  </svg>);
}
function Stones({ x, y }: { x:number; y:number }){
  return (<svg viewBox="0 0 80 60" style={{ position:"absolute", left:x, top:y, width:80, height:60, opacity:0.85, pointerEvents:"none" }}>
    <ellipse cx="40" cy="48" rx="26" ry="8" fill="#B8BCB8"/>
    <ellipse cx="40" cy="34" rx="20" ry="7" fill="#9CA39C"/>
    <ellipse cx="40" cy="22" rx="14" ry="6" fill="#C2C7C2"/>
  </svg>);
}
