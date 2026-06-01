// HolographicSunset — Secondary Teachers, Trainers, Coaches, Lecturers
// Sunset orange→purple gradient hero + glowing hexagon photo + science motifs.
"use client";

import React from "react";
import { TemplateProps, dateRange, BulletsRender, getLabel, initials } from "./types";

export default function HolographicSunset({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#E8825A", color:"#3A2018", fontFamily:"Inter,sans-serif", fontSize:"10.5pt", lineHeight:1.55 }}>
      {/* Sunset hero */}
      <header className="relative" style={{ height:330, background:"linear-gradient(160deg,#5A2D5E 0%,#B5523F 45%,#E8825A 100%)", overflow:"hidden" }}>
        <div aria-hidden style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 40% 90%, rgba(255,180,120,0.55), transparent 60%)" }} />
        {/* glowing hexagon photo */}
        <div style={{ position:"absolute", top:50, right:60, width:230, height:250 }}>
          <svg viewBox="0 0 230 250" style={{ position:"absolute", inset:0, width:"100%", height:"100%", filter:"drop-shadow(0 0 28px rgba(255,170,90,0.7))" }}>
            <defs><linearGradient id="hs-hex" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFD9A0"/><stop offset="100%" stopColor="#E8722E"/></linearGradient></defs>
            <polygon points="115,8 215,68 215,182 115,242 15,182 15,68" fill="none" stroke="url(#hs-hex)" strokeWidth="7"/>
            <polygon points="115,24 200,75 200,175 115,226 30,175 30,75" fill="#C25A40"/>
          </svg>
          <div style={{ position:"absolute", top:24, left:30, width:170, height:202, clipPath:"polygon(50% 0%,100% 28%,100% 72%,50% 100%,0% 72%,0% 28%)", display:"flex", alignItems:"center", justifyContent:"center", color:"#FFE6CC", fontWeight:800, fontSize:"54pt" }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : initials(basics.fullName)}
          </div>
        </div>
        <div style={{ position:"absolute", left:56, top:90 }}>
          <h1 className="m-0" style={{ fontWeight:800, fontSize:"46pt", lineHeight:0.95, letterSpacing:"-0.02em", color:"#FFFFFF", textTransform:"uppercase" }}>{splitName(basics.fullName)}</h1>
          <p className="m-0 mt-2 uppercase" style={{ fontSize:"13pt", color:"#FFD9A0", fontWeight:700, letterSpacing:"0.12em" }}>{basics.role}</p>
        </div>
        {/* gold ribbon at base */}
        <svg viewBox="0 0 794 60" preserveAspectRatio="none" style={{ position:"absolute", bottom:-1, left:0, width:"100%", height:60 }}>
          <path d="M 0 30 C 200 10 360 50 540 28 C 660 14 740 36 794 24 L 794 60 L 0 60 Z" fill="#E8A23E"/>
        </svg>
      </header>

      <div className="relative" style={{ padding:"28px 56px 40px" }}>
        {/* molecule motif right */}
        <svg viewBox="0 0 120 120" style={{ position:"absolute", right:40, top:120, width:150, height:150, opacity:0.4, pointerEvents:"none" }} stroke="#7A3326" strokeWidth="1.5" fill="none">
          <circle cx="60" cy="40" r="7" fill="#C25A40"/><circle cx="30" cy="80" r="6" fill="#C25A40"/><circle cx="90" cy="80" r="6" fill="#C25A40"/><circle cx="60" cy="100" r="5" fill="#C25A40"/>
          <line x1="60" y1="40" x2="30" y2="80"/><line x1="60" y1="40" x2="90" y2="80"/><line x1="30" y1="80" x2="60" y2="100"/><line x1="90" y1="80" x2="60" y2="100"/>
        </svg>

        <div className="grid gap-8" style={{ gridTemplateColumns:"1.4fr 1fr" }}>
          <div>
            <HsTitle>{getLabel(data,"experience","Experience")}</HsTitle>
            {experience.map((e,i)=>(
              <div key={i} className="mb-3 last:mb-0">
                <p className="m-0 font-bold text-[11.5pt]" style={{color:"#FFFFFF"}}>{e.role}</p>
                <p className="m-0 text-[10pt]" style={{color:"#7A3326",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
                <BulletsRender bullets={e.bullets} className="hs-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#5A3528"}}/>
              </div>
            ))}
            <HsTitle>{getLabel(data,"education","Education")}</HsTitle>
            {education.map((e,i)=>(
              <div key={i} className="mb-2 last:mb-0">
                <p className="m-0 font-bold text-[11pt]" style={{color:"#FFFFFF"}}>{e.degree}</p>
                <p className="m-0 text-[10pt]" style={{color:"#5A3528"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p>
              </div>
            ))}
          </div>
          <div>
            <HsTitle>{getLabel(data,"skills","Skills")}</HsTitle>
            {skills.slice(0,7).map((s,i)=>(
              <div key={i} className="mb-2">
                <div className="text-[10pt]" style={{color:"#3A2018"}}>{s}</div>
                <div style={{height:7,marginTop:2,borderRadius:9999,background:"rgba(255,255,255,0.4)"}}><div style={{height:"100%",width:`${90-i*7}%`,borderRadius:9999,background:"linear-gradient(90deg,#FFFFFF,#E8A23E)"}}/></div>
              </div>
            ))}
            {certifications.length>0 && (<>
              <HsTitle>{getLabel(data,"certifications","Certifications")}</HsTitle>
              <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",color:"#3A2018"}}>
                {certifications.map((c,i)=>(<li key={i} className="mb-0.5"><b style={{color:"#FFFFFF"}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}
              </ul>
            </>)}
            <div className="mt-4 flex flex-col gap-1 text-[9.5pt]" style={{color:"#5A3528"}}>
              {basics.email && <span>✉ {basics.email}</span>}
              {basics.phone && <span>☎ {basics.phone}</span>}
              {basics.location && <span>⌖ {basics.location}</span>}
              {languages.length>0 && <span>{languages.map(l=>`${l.name} (${l.level})`).join(" · ")}</span>}
            </div>
          </div>
        </div>
      </div>
      <style>{`.hs-b li{position:relative;padding-left:14px;margin-bottom:2px}.hs-b li:before{content:"";position:absolute;left:0;top:7px;width:5px;height:5px;border-radius:50%;background:#7A3326}`}</style>
    </article>
  );
}

function splitName(name?: string){ const p=(name??"").trim().split(/\s+/); if(p.length<2) return name; return (<>{p[0]}<br/>{p.slice(1).join(" ")}</>); }
function HsTitle({ children }: { children: React.ReactNode }){ return <h2 className="m-0" style={{ marginTop:16, marginBottom:8, fontWeight:800, fontSize:"17pt", color:"#FFFFFF", textTransform:"uppercase", letterSpacing:"0.02em" }}>{children}</h2>; }
