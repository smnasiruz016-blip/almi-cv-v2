// HRTalentWarm — HR, Recruiters, Talent Acquisition (warm people-first)
// Soft apricot header + rounded photo + people-dots motif + plum accents. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function HRTalentWarm({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const P = "#8E4585", A = "#F2935C";
  return (
    <article className="w-[794px] min-h-[1123px] bg-white relative overflow-hidden print:shadow-none"
      style={{ color:"#3A3340", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <header className="relative" style={{ padding:"42px 50px 30px", background:"linear-gradient(120deg,#FBE8DC 0%,#F7DCE8 100%)" }}>
        <svg viewBox="0 0 90 40" style={{ position:"absolute", right:46, top:28, width:96, height:44, opacity:0.8 }} fill={P}>
          {[14,40,66].map((x,i)=>(<g key={i} opacity={1-i*0.25}><circle cx={x} cy="13" r="7"/><path d={`M${x-10} 36 a10 9 0 0 1 20 0`}/></g>))}
        </svg>
        <div style={{ display:"grid", gridTemplateColumns: basics.photoUrl?"112px 1fr":"1fr", gap:20, alignItems:"center" }}>
          {basics.photoUrl && <div style={{ width:108, height:108, borderRadius:28, overflow:"hidden", border:"4px solid #fff", boxShadow:"0 6px 16px rgba(142,69,133,0.25)" }}><img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>}
          <div>
            <h1 className="m-0" style={{ fontWeight:800, fontSize:"34pt", lineHeight:1, letterSpacing:"-0.01em", color:P }}>{basics.fullName}</h1>
            <p className="m-0 mt-1 uppercase" style={{ fontSize:"12pt", color:"#C25B2E", fontWeight:700, letterSpacing:"0.14em" }}>{basics.role}</p>
            <p className="m-0 mt-2 text-[9pt]" style={{ color:"#7A6E80" }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   ·   ")}</p>
          </div>
        </div>
      </header>
      <div className="grid gap-9" style={{ padding:"24px 50px 44px", gridTemplateColumns:"1fr 1.5fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","About")} c={P}><RichTextRender html={basics.summary} style={{color:"#54495C",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"skills","Skills")} c={P}>
            <div className="flex flex-wrap gap-1.5">{skills.map((s,i)=>(<span key={i} style={{padding:"4px 12px",fontSize:"9.5pt",fontWeight:600,color:i%2?P:"#C25B2E",background:i%2?"#F7E8F4":"#FBEADF",borderRadius:9999}}>{s}</span>))}</div>
          </Sec>
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")} c={P}><div className="text-[10pt]" style={{color:"#54495C"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div></Sec>}
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications")} c={P}>
            <ul className="hrt-b" style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#54495C"}}>{certifications.map((c,i)=>(<li key={i}>{c.name}{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
        </div>
        <div>
          <Sec t={getLabel(data,"experience","Experience")} c={P}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]" style={{color:"#2E2733"}}>{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:"#C25B2E",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="hrt-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#54495C"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")} c={P}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:"#2E2733"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#7A6E80"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
      </div>
      <style>{`.hrt-b li{position:relative;padding-left:15px;margin-bottom:2px}.hrt-b li:before{content:"";position:absolute;left:0;top:6px;width:7px;height:7px;border-radius:50%;background:#F2935C}`}</style>
    </article>
  );
}
function Sec({ t, c, children }: { t:string; c:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11.5pt",fontWeight:800,letterSpacing:"0.1em",color:c,borderBottom:"2px solid #F2D8C8",paddingBottom:3}}>{t}</h2>{children}</section>; }
