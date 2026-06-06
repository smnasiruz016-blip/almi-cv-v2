// NonprofitHeart — Nonprofit, NGO, Fundraising, Volunteer Coordinators, Charity
// Warm cream + coral + teal + heart/hands motif. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function NonprofitHeart({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], awards = [] } = data;
  const tiles = awards.slice(0,3);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden bg-white print:shadow-none"
      style={{ color:"#374049", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <header className="relative" style={{ padding:"38px 48px 28px", background:"linear-gradient(120deg,#FF7A66 0%,#F2A65A 100%)", color:"#fff" }}>
        <svg viewBox="0 0 60 56" style={{ position:"absolute", right:40, top:30, width:60, height:56, opacity:0.85 }} fill="#fff">
          <path d="M30 52C30 52 6 38 6 20A13 13 0 0 1 30 12A13 13 0 0 1 54 20C54 38 30 52 30 52Z" opacity="0.5"/>
          <circle cx="22" cy="24" r="5"/><circle cx="38" cy="24" r="5"/><path d="M14 40a8 8 0 0 1 16 0M30 40a8 8 0 0 1 16 0" stroke="#fff" strokeWidth="2.5" fill="none"/>
        </svg>
        <div style={{ display:"grid", gridTemplateColumns: basics.photoUrl?"104px 1fr":"1fr", gap:18, alignItems:"center" }}>
          {basics.photoUrl && <div style={{ width:100, height:100, borderRadius:"50%", overflow:"hidden", border:"3px solid #fff" }}><img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>}
          <div>
            <h1 className="m-0" style={{ fontWeight:800, fontSize:"34pt", lineHeight:1, letterSpacing:"-0.01em" }}>{basics.fullName}</h1>
            <p className="m-0 mt-1 uppercase" style={{ fontSize:"12pt", letterSpacing:"0.16em", color:"rgba(255,255,255,0.92)", fontWeight:600 }}>{basics.role}</p>
            <p className="m-0 mt-2 text-[9pt]" style={{ color:"rgba(255,255,255,0.85)" }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   ·   ")}</p>
          </div>
        </div>
      </header>
      {tiles.length>0 && (
        <div className="grid gap-3" style={{ gridTemplateColumns:`repeat(${tiles.length},1fr)`, padding:"18px 48px 2px" }}>
          {tiles.map((t,i)=>(<div key={i} style={{ borderRadius:14, padding:"12px 14px", background:"#EAF6F4", border:"1px solid #CDE9E4", textAlign:"center" }}>
            <div style={{ fontWeight:800, fontSize:"17pt", lineHeight:1, color:"#159B8E" }}>{t.title}</div>
            {t.issuer && <div className="text-[8.5pt] uppercase mt-1" style={{ letterSpacing:"0.08em", color:"#6B8581", fontWeight:600 }}>{t.issuer}</div>}
          </div>))}
        </div>
      )}
      <div className="grid gap-9" style={{ padding:"20px 48px 44px", gridTemplateColumns:"1fr 1.5fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","About")}><RichTextRender html={basics.summary} style={{color:"#4A545E",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"skills","Skills")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt"}}>{skills.map((s,i)=>(<li key={i} className="flex items-center gap-2 mb-1" style={{color:"#374049"}}><span style={{color:"#FF7A66"}}>♥</span>{s}</li>))}</ul>
          </Sec>
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")}><div className="text-[10pt]" style={{color:"#4A545E"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div></Sec>}
        </div>
        <div>
          <Sec t={getLabel(data,"experience","Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]">{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:"#159B8E",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="nh-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#4A545E"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]">{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#73808B"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#4A545E"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
        </div>
      </div>
      <style>{`.nh-b li{position:relative;padding-left:15px;margin-bottom:1px}.nh-b li:before{content:"♥";position:absolute;left:0;color:#FF7A66;font-size:8pt;top:1px}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11.5pt",fontWeight:800,letterSpacing:"0.1em",color:"#E8654F",borderBottom:"2px solid #FAD9D1",paddingBottom:3}}>{t}</h2>{children}</section>; }
