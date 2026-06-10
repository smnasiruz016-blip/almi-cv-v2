// CyberShieldLight — Cybersecurity, IT Security (light friendly card)
// Sky-blue bg + white rounded card + neon photo ring + shield/lock accents + gradient bars. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function CyberShieldLight({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], awards = [] } = data;
  const N = "#142A66";
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"linear-gradient(160deg,#BFE0F5 0%,#D5E9F8 60%,#C6E2F4 100%)", color:"#22325C", fontFamily:'"Plus Jakarta Sans","Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <div className="relative" style={{ margin:"34px 40px", background:"#FFFFFF", borderRadius:28, boxShadow:"0 18px 50px rgba(60,110,170,0.22)", padding:"42px 46px 38px" }}>
        <header className="flex items-center gap-5" style={{ marginBottom:24 }}>
          <div style={{ width:108, height:108, borderRadius:"50%", padding:4, border:"3px solid #2ED3E8", boxShadow:"0 0 16px rgba(46,211,232,0.5)", flexShrink:0 }}>
            <div style={{ width:"100%", height:"100%", borderRadius:"50%", overflow:"hidden", background:"#D9E8F5", display:"flex", alignItems:"center", justifyContent:"center" }}>
              {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <span style={{color:N,fontWeight:800,fontSize:"30pt"}}>{initials(basics.fullName)}</span>}
            </div>
          </div>
          <div>
            <h1 className="m-0 uppercase" style={{ fontWeight:900, fontSize:"32pt", lineHeight:0.98, letterSpacing:"-0.01em", color:N }}>{basics.fullName}</h1>
            <p className="m-0 mt-1 uppercase" style={{ fontSize:"13pt", color:"#1FA8D8", fontWeight:800, letterSpacing:"0.06em" }}>{basics.role}</p>
            <p className="m-0 mt-1.5 text-[9pt]" style={{ color:"#6B7CA0" }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   ·   ")}</p>
          </div>
        </header>
        <div className="grid gap-8" style={{ gridTemplateColumns:"1.4fr 1fr" }}>
          <div>
            <Sec t={getLabel(data,"experience","Experience")} c={N}>
              {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
                <p className="m-0 font-bold text-[11pt]" style={{color:N}}>{e.role}</p>
                <p className="m-0 text-[9.5pt]" style={{color:"#1FA8D8",fontWeight:700}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
                <BulletsRender bullets={e.bullets} className="csl-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#4A5A80"}}/>
              </div>))}
            </Sec>
            <Sec t={getLabel(data,"skills","Skills")} c={N}>
              <div className="text-[10pt]" style={{color:"#4A5A80",lineHeight:1.8}}>{skills.join(", ")}</div>
            </Sec>
            <Sec t={getLabel(data,"education","Education")} c={N}>
              {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:N}}>{e.degree}</p><p className="m-0 text-[9.5pt]" style={{color:"#6B7CA0"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p></div>))}
            </Sec>
            <Sec t={getLabel(data,"certifications","Certifications")} c={N}>
              <ul className="csl-b" style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#4A5A80"}}>{certifications.map((c,i)=>(<li key={i}>{c.name}{c.year?` · ${c.year}`:""}</li>))}</ul>
            </Sec>
          </div>
          <div>
            <svg viewBox="0 0 160 170" style={{ width:"100%", maxWidth:210, margin:"0 auto 14px", display:"block" }}>
              <rect x="30" y="120" width="100" height="26" rx="6" fill="#B89CF6" opacity="0.7"/>
              <path d="M80 18 L128 35 V78 C128 110 106 130 80 140 C54 130 32 110 32 78 V35 Z" fill="#7ED4F0" opacity="0.85"/>
              <path d="M80 18 L128 35 V78 C128 110 106 130 80 140 C54 130 32 110 32 78 V35 Z" fill="none" stroke="#2EA8D8" strokeWidth="2.5"/>
              <rect x="60" y="70" width="40" height="34" rx="5" fill="#1FA8D8"/>
              <path d="M67 70v-9a13 13 0 0 1 26 0v9" fill="none" stroke="#9AAFC4" strokeWidth="7" strokeLinecap="round"/>
              <circle cx="80" cy="86" r="5" fill="#0D2440"/>
              <rect x="20" y="58" width="14" height="14" rx="3" fill="#5BC8EC" opacity="0.7"/><rect x="128" y="100" width="13" height="13" rx="3" fill="#8E5CF6" opacity="0.6"/>
            </svg>
            {awards.length>0 && <><h3 className="m-0 mb-1 text-[10.5pt] font-bold" style={{color:N}}>{getLabel(data,"awards","Recent Awards")}</h3>
            <p className="m-0 mb-2 text-[9.5pt]" style={{color:"#6B7CA0"}}>{awards.map(a=>`${a.title}${a.year?` (${a.year})`:""}`).join(" · ")}</p></>}
            {skills.slice(0,4).map((_,i)=>(<div key={i} style={{height:9,borderRadius:5,background:"#E2EBF5",marginBottom:9}}><div style={{height:"100%",borderRadius:5,width:`${90-i*8}%`,background:"linear-gradient(90deg,#2EA8D8,#4D5BE8)"}}/></div>))}
            {languages.length>0 && <p className="m-0 mt-2 text-[9.5pt]" style={{color:"#4A5A80"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</p>}
          </div>
        </div>
      </div>
      <style>{`.csl-b li{position:relative;padding-left:13px;margin-bottom:2px}.csl-b li:before{content:"";position:absolute;left:0;top:6px;width:6px;height:6px;border-radius:50%;background:#1FA8D8}`}</style>
    </article>
  );
}
function Sec({ t, c, children }: { t:string; c:string; children:React.ReactNode }){ return <section className="mb-4 last:mb-0"><h2 className="m-0 mb-2 uppercase" style={{fontSize:"13pt",fontWeight:900,letterSpacing:"0.04em",color:c}}>{t}</h2>{children}</section>; }
