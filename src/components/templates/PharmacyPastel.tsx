// PharmacyPastel — Pharmacists, Pharmacy Techs, Dispensers, Clinical Pharmacy
// White + soft purple/gold gentle waves + hexagonal photo.
"use client";

import React from "react";
import { TemplateProps, dateRange, RichTextRender, BulletsRender, getLabel, initials } from "./types";

export default function PharmacyPastel({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] bg-white relative overflow-hidden print:shadow-none"
      style={{ color:"#2D1B4E", fontFamily:"Inter,sans-serif", fontSize:"10.5pt", lineHeight:1.55 }}>
      <svg viewBox="0 0 794 340" preserveAspectRatio="none" style={{ position:"absolute", top:0, left:0, width:"100%", height:340 }}>
        <defs>
          <linearGradient id="pp-w1" x1="0" x2="1" y1="0" y2="0"><stop offset="0%" stopColor="#C7B2EA"/><stop offset="100%" stopColor="#8A6BBF"/></linearGradient>
          <linearGradient id="pp-w2" x1="0" x2="1" y1="0" y2="0"><stop offset="0%" stopColor="#F0DDA0"/><stop offset="100%" stopColor="#D4A24C"/></linearGradient>
        </defs>
        <path d="M 0 240 C 200 180 380 280 540 230 C 660 195 740 250 794 220 L 794 280 C 740 310 660 250 540 290 C 380 340 200 240 0 300 Z" fill="url(#pp-w1)" opacity="0.85"/>
        <path d="M 240 270 C 380 230 520 300 680 250 C 730 235 770 260 794 250 L 794 320 C 770 330 730 295 680 310 C 520 360 380 290 240 320 Z" fill="url(#pp-w2)" opacity="0.85"/>
        <g opacity="0.10">
          <rect x="660" y="50" width="40" height="14" rx="7" stroke="#2D1B4E" strokeWidth="1.5" fill="none"/>
          <rect x="680" y="50" width="20" height="14" rx="7" fill="#2D1B4E"/>
          <circle cx="120" cy="60" r="14" stroke="#2D1B4E" strokeWidth="1.5" fill="none"/>
          <line x1="120" y1="74" x2="120" y2="100" stroke="#2D1B4E" strokeWidth="1.5"/>
          <line x1="120" y1="100" x2="140" y2="115" stroke="#2D1B4E" strokeWidth="1.5"/>
          <circle cx="540" cy="60" r="3" fill="#2D1B4E"/><circle cx="555" cy="80" r="2" fill="#2D1B4E"/>
        </g>
      </svg>

      <div className="relative" style={{ padding:"32px 48px 40px" }}>
        <header className="grid items-center gap-7 mb-8" style={{ gridTemplateColumns:"170px 1fr" }}>
          <div style={{ width:160, height:180, position:"relative", filter:"drop-shadow(0 6px 18px rgba(212,162,76,0.45))" }}>
            <svg viewBox="0 0 160 180" style={{ position:"absolute", inset:0, width:"100%", height:"100%" }}>
              <defs><linearGradient id="pp-hex" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F0DDA0"/><stop offset="100%" stopColor="#A88129"/></linearGradient></defs>
              <polygon points="80,5 150,45 150,135 80,175 10,135 10,45" fill="none" stroke="url(#pp-hex)" strokeWidth="5"/>
              <polygon points="80,18 138,50 138,130 80,162 22,130 22,50" fill="#F8EBC2"/>
            </svg>
            <div style={{ position:"absolute", top:18, left:22, width:116, height:144, clipPath:"polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)", display:"flex", alignItems:"center", justifyContent:"center", color:"#8A6BBF", fontWeight:700, fontSize:"40pt", fontFamily:"Inter,sans-serif" }}>
              {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : initials(basics.fullName)}
            </div>
          </div>
          <div>
            <h1 className="m-0" style={{ fontWeight:900, fontSize:"50pt", lineHeight:0.95, letterSpacing:"-0.03em", textTransform:"uppercase", color:"#2D1B4E" }}>{splitName(basics.fullName)}</h1>
            <p className="m-0 mt-2 uppercase" style={{ fontSize:"15pt", color:"#2D1B4E", fontWeight:500, letterSpacing:"0.16em" }}>{basics.role}</p>
            <div className="flex flex-wrap gap-y-1 gap-x-4 mt-3 text-[9.5pt]" style={{ color:"#5A4978" }}>
              {basics.email && <span>✉ {basics.email}</span>}
              {basics.phone && <span>☎ {basics.phone}</span>}
              {basics.location && <span>⌖ {basics.location}</span>}
            </div>
          </div>
        </header>

        <div className="grid gap-7 mt-4" style={{ gridTemplateColumns:"1fr 1.2fr" }}>
          <div style={{ background:"linear-gradient(180deg,#E0D2F3 0%,#C7B2EA 100%)", borderRadius:18, padding:"22px 22px" }}>
            <PT>{getLabel(data,"experience","Experience")}</PT>
            {experience.map((e,i)=>(
              <div key={i} className="mb-2 last:mb-0">
                <p className="m-0 font-bold text-[11pt]" style={{color:"#2D1B4E"}}>{e.role}</p>
                <p className="m-0 italic text-[10pt]" style={{color:"#4A2F7A"}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
                <BulletsRender bullets={e.bullets} className="pp-b" style={{margin:"3px 0 0",paddingLeft:18,fontSize:"10pt",color:"#3D2960"}}/>
              </div>
            ))}
            <PT>{getLabel(data,"skills","Skills")}</PT>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",color:"#2D1B4E"}}>
              {skills.map((s,i)=>(<li key={i} className="mb-0.5">{s}</li>))}
            </ul>
          </div>

          <div>
            {basics.summary && (<section className="mb-5">
              <ST>{getLabel(data,"summary","Profile")}</ST>
              <RichTextRender html={basics.summary} style={{fontSize:"10.5pt",color:"#2D1B4E"}}/>
            </section>)}

            <section className="mb-5">
              <ST>{getLabel(data,"education","Education")}</ST>
              {education.map((e,i)=>(
                <div key={i} className="mb-1.5 last:mb-0">
                  <p className="m-0 font-bold text-[10.5pt] uppercase" style={{color:"#2D1B4E",letterSpacing:"0.04em"}}>{e.degree}</p>
                  <p className="m-0 text-[10pt]" style={{color:"#A88129",fontWeight:600}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p>
                </div>
              ))}
            </section>

            {certifications.length>0 && (
              <section className="mb-5">
                <ST>{getLabel(data,"certifications","Certifications")}</ST>
                <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",color:"#2D1B4E"}}>
                  {certifications.map((c,i)=>(<li key={i} className="mb-1"><span style={{color:"#A88129"}}>● </span><b>{c.name}</b>{c.issuer?<span style={{color:"#5A4978"}}> · {c.issuer}</span>:""}{c.year?<span style={{color:"#5A4978"}}> · {c.year}</span>:""}</li>))}
                </ul>
              </section>
            )}

            <section>
              <ST>{getLabel(data,"contact","Contact")}</ST>
              <div className="flex flex-col gap-1.5">
                {[basics.email, basics.phone, basics.location, basics.website].filter(Boolean).map((v,i)=>(
                  <div key={i} className="flex items-center gap-2.5">
                    <span style={{width:36, height:4, background:"linear-gradient(90deg,#A88129,#D4A24C)", borderRadius:9999, flexShrink:0}}/>
                    <span className="text-[10pt]" style={{color:"#2D1B4E"}}>{v}</span>
                  </div>
                ))}
                {languages.length>0 && languages.map((l,i)=>(
                  <div key={`l${i}`} className="flex items-center gap-2.5">
                    <span style={{width:36, height:4, background:"linear-gradient(90deg,#A88129,#D4A24C)", borderRadius:9999, flexShrink:0}}/>
                    <span className="text-[10pt]" style={{color:"#2D1B4E"}}><b>{l.name}</b> — {l.level}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
}

function splitName(name?: string){ const p=(name??"").trim().split(/\s+/); if(p.length<2) return name; return (<>{p[0]}<br/>{p.slice(1).join(" ")}</>); }
function PT({ children }: { children: React.ReactNode }){ return <h2 className="uppercase" style={{margin:0,marginTop:14,marginBottom:8,fontWeight:800,fontSize:"13pt",letterSpacing:"0.04em",color:"#2D1B4E"}}>{children}</h2>; }
function ST({ children }: { children: React.ReactNode }){ return <h2 className="uppercase" style={{margin:0,marginBottom:8,fontWeight:800,fontSize:"13pt",letterSpacing:"0.04em",color:"#A88129"}}>{children}</h2>; }
