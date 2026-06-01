// RealEstateLuxe — Luxury Real Estate Agents, Brokers, Property Developers
// Near-black + champagne gold + skyline motif + serif/sans mix. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function RealEstateLuxe({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], awards = [] } = data;
  const tiles = awards.slice(0,3);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#15140F", color:"#E9E3D5", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5 }}>
      <header className="relative" style={{ padding:"48px 54px 22px" }}>
        <svg viewBox="0 0 240 70" preserveAspectRatio="none" style={{ position:"absolute", left:0, bottom:0, width:"100%", height:60, opacity:0.5 }}>
          {[10,40,66,96,120,150,176,206].map((x,i)=>{const h=22+((i*37)%40);return <rect key={i} x={x} y={70-h} width="20" height={h} fill="none" stroke="#C7A862" strokeWidth="1"/>;})}
        </svg>
        <p className="m-0 mb-1 uppercase text-[9pt]" style={{ color:"#9A8B63", letterSpacing:"0.34em" }}>Luxury Real Estate</p>
        <h1 className="m-0" style={{ fontWeight:300, fontSize:"42pt", lineHeight:1, letterSpacing:"0.04em", textTransform:"uppercase", color:"#F5F0E3" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 uppercase" style={{ fontSize:"12.5pt", color:"#C7A862", letterSpacing:"0.22em", fontWeight:600 }}>{basics.role}</p>
        <p className="m-0 mt-3 text-[9.5pt]" style={{ color:"#9A917D" }}>{[basics.email,basics.phone,basics.location,basics.website].filter(Boolean).join("   ·   ")}</p>
      </header>
      {tiles.length>0 && (
        <div className="grid gap-3" style={{ gridTemplateColumns:`repeat(${tiles.length},1fr)`, padding:"16px 54px 4px" }}>
          {tiles.map((t,i)=>(<div key={i} style={{ borderRadius:0, padding:"12px 14px", borderTop:"2px solid #C7A862", background:"rgba(199,168,98,0.06)" }}>
            <div style={{ fontWeight:700, fontSize:"18pt", lineHeight:1, color:"#E0C681" }}>{t.title}</div>
            {t.issuer && <div className="text-[8.5pt] uppercase mt-1" style={{ letterSpacing:"0.1em", color:"#9A917D" }}>{t.issuer}</div>}
          </div>))}
        </div>
      )}
      <div className="grid gap-9" style={{ padding:"20px 54px 44px", gridTemplateColumns:"1.55fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")}><RichTextRender html={basics.summary} style={{color:"#C5BCA6",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-semibold text-[11.5pt]" style={{color:"#F5F0E3"}}>{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:"#C7A862",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="rel-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#C5BCA6"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-semibold text-[10.5pt]" style={{color:"#F5F0E3"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#9A917D"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Expertise")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt"}}>{skills.map((s,i)=>(<li key={i} style={{padding:"4px 0",borderBottom:i<skills.length-1?"1px solid rgba(199,168,98,0.2)":"0",color:"#D6CDB8"}}><span style={{color:"#C7A862",marginRight:8}}>◆</span>{s}</li>))}</ul>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Credentials")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#C5BCA6"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b style={{color:"#F5F0E3"}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")}>
            <div className="text-[9.5pt]" style={{color:"#C5BCA6"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.rel-b li{position:relative;padding-left:14px;margin-bottom:2px}.rel-b li:before{content:"◆";position:absolute;left:0;color:#C7A862;font-size:7pt;top:4px}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11pt",fontWeight:700,letterSpacing:"0.18em",color:"#C7A862"}}>{t}</h2>{children}</section>; }
