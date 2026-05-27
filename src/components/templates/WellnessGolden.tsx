// WellnessGolden — Massage Therapists, Spa Practitioners, Holistic Healers, Yoga
// Dark chocolate + glowing gold + hexagonal photo.
"use client";

import React from "react";
import { TemplateProps, dateRange, RichTextRender, BulletsRender, getLabel, initials } from "./types";

export default function WellnessGolden({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], awards = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"linear-gradient(160deg,#3A1F0E 0%,#180A04 100%)", color:"#F5E2BD", fontFamily:'"Cormorant Garamond","Playfair Display",serif', fontSize:"11pt", lineHeight:1.55 }}>
      <svg viewBox="0 0 794 800" preserveAspectRatio="none" style={{ position:"absolute", top:0, left:0, width:"100%", height:800, pointerEvents:"none" }}>
        <defs>
          <linearGradient id="wg-r" x1="0" x2="1" y1="0" y2="0"><stop offset="0%" stopColor="#F5C56E"/><stop offset="100%" stopColor="#A6791F"/></linearGradient>
          <radialGradient id="wg-glow" cx="0.5" cy="0.5"><stop offset="0%" stopColor="#F5C56E" stopOpacity="0.55"/><stop offset="100%" stopColor="#F5C56E" stopOpacity="0"/></radialGradient>
        </defs>
        <circle cx="400" cy="180" r="240" fill="url(#wg-glow)" opacity="0.7"/>
        <path d="M -50 240 C 120 160 280 320 440 230 C 600 140 720 280 834 200 L 834 260 C 720 330 600 200 440 290 C 280 380 120 230 -50 300 Z" fill="url(#wg-r)" opacity="0.85"/>
        <ellipse cx="640" cy="120" rx="14" ry="9" fill="#2A1607" stroke="#A6791F" strokeWidth="1"/>
        <ellipse cx="680" cy="200" rx="10" ry="6" fill="#2A1607" stroke="#A6791F" strokeWidth="1"/>
        <circle cx="540" cy="140" r="4" fill="#F5C56E"/><circle cx="600" cy="200" r="3" fill="#F5C56E"/>
      </svg>

      <div className="relative" style={{ padding:"36px 48px 40px" }}>
        <div className="flex items-start gap-6 mb-6">
          <div style={{ width:140, height:160, position:"relative", filter:"drop-shadow(0 0 24px rgba(245,197,110,0.55))" }}>
            <svg viewBox="0 0 140 160" style={{ position:"absolute", inset:0, width:"100%", height:"100%" }}>
              <defs><linearGradient id="wg-hex" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F5C56E"/><stop offset="100%" stopColor="#A6791F"/></linearGradient></defs>
              <polygon points="70,5 130,40 130,120 70,155 10,120 10,40" fill="none" stroke="url(#wg-hex)" strokeWidth="5"/>
              <polygon points="70,16 122,46 122,114 70,144 18,114 18,46" fill="#2A1607"/>
            </svg>
            <div style={{ position:"absolute", top:16, left:18, width:104, height:128, clipPath:"polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)", display:"flex", alignItems:"center", justifyContent:"center", color:"#F5C56E", fontWeight:600, fontSize:"42pt", fontFamily:'"Cormorant Garamond",serif' }}>
              {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : initials(basics.fullName)}
            </div>
          </div>
          <div className="pt-4">
            <h1 className="m-0" style={{ fontWeight:500, fontSize:"40pt", lineHeight:0.98, letterSpacing:"-0.01em", color:"#F5E2BD" }}>{basics.fullName}</h1>
            <p className="m-0 mt-1.5 italic" style={{ fontSize:"15pt", color:"#F5C56E" }}>{basics.role}</p>
            <div className="flex flex-wrap gap-y-1 gap-x-4 mt-3 text-[9.5pt]" style={{ fontFamily:"Inter,sans-serif", color:"#D6B98A" }}>
              {basics.email && <span>✉ {basics.email}</span>}
              {basics.phone && <span>☎ {basics.phone}</span>}
              {basics.location && <span>⌖ {basics.location}</span>}
              {basics.website && <span>⌘ {basics.website}</span>}
            </div>
          </div>
        </div>

        <div className="grid gap-4" style={{ gridTemplateColumns:"1fr 1.4fr" }}>
          <div className="flex flex-col gap-3">
            {basics.summary && <Card><CT>{getLabel(data,"summary","Profile")}</CT><RichTextRender html={basics.summary} style={{fontSize:"10.5pt",color:"#F5E2BD",fontStyle:"italic"}}/></Card>}
            <Card>
              <CT>{getLabel(data,"education","Education & Certifications")}</CT>
              <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",color:"#F5E2BD"}}>
                {education.map((e,i)=>(<li key={`e${i}`} className="mb-1.5"><b style={{color:"#F5C56E"}}>{e.degree}</b><br/>{e.school}{e.endDate?`, ${e.endDate}`:""}</li>))}
                {certifications.map((c,i)=>(<li key={`c${i}`} className="mb-1"><span style={{color:"#F5C56E"}}>✦ </span>{c.name}{c.issuer?` — ${c.issuer}`:""}{c.year?`, ${c.year}`:""}</li>))}
              </ul>
            </Card>
          </div>
          <div className="flex flex-col gap-3">
            <Card>
              <CT>{getLabel(data,"experience","Experience")}</CT>
              {experience.map((e,i)=>(
                <div key={i} className="mb-2.5 last:mb-0">
                  <p className="m-0 font-semibold" style={{fontSize:"12pt",color:"#F5E2BD"}}>{e.role}</p>
                  <p className="m-0 italic" style={{fontSize:"10pt",color:"#F5C56E"}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
                  <BulletsRender bullets={e.bullets} className="wg-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#D6B98A"}} />
                </div>
              ))}
            </Card>
            <Card>
              <CT>{getLabel(data,"skills","Specialties & Tools")}</CT>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s,i)=>(<span key={i} style={{padding:"3px 11px",fontSize:"9.5pt",color:"#F5E2BD",background:"rgba(245,197,110,0.12)",border:"1px solid rgba(245,197,110,0.4)",borderRadius:9999}}>{s}</span>))}
              </div>
            </Card>
            {(awards.length>0 || languages.length>0) && (
              <Card>
                {awards.length>0 && (<><CT>{getLabel(data,"awards","Awards")}</CT>
                  <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",color:"#F5E2BD"}}>
                    {awards.map((a,i)=>(<li key={i}><span style={{color:"#F5C56E"}}>✦ </span><b>{a.title}</b>{a.year?`, ${a.year}`:""}</li>))}
                  </ul></>)}
                {languages.length>0 && (<p className="m-0 mt-2 text-[10pt]" style={{color:"#D6B98A"}}>{languages.map((l,i)=><React.Fragment key={i}><b style={{color:"#F5C56E"}}>{l.name}</b> {l.level}{i<languages.length-1?" · ":""}</React.Fragment>)}</p>)}
              </Card>
            )}
          </div>
        </div>
      </div>
      <style>{`.wg-b li{padding-left:16px;position:relative;margin-bottom:1px}.wg-b li:before{content:"✦";position:absolute;left:0;color:#F5C56E}`}</style>
    </article>
  );
}

function CT({ children }: { children: React.ReactNode }){ return <h2 style={{margin:0,marginBottom:8,fontFamily:'"Cormorant Garamond",serif',fontWeight:600,fontSize:"15pt",color:"#F5C56E",letterSpacing:"0.02em"}}>{children}</h2>; }
function Card({ children }: { children: React.ReactNode }){ return <section style={{background:"rgba(80,45,18,0.45)",border:"1px solid rgba(245,197,110,0.30)",borderRadius:14,padding:"16px 18px",backdropFilter:"blur(8px)"}}>{children}</section>; }
