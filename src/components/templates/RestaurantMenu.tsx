// RestaurantMenu — Servers, Hosts, Restaurant/Hospitality FOH, Bartenders
// Cream menu-card + warm terracotta + elegant serif + rule dividers. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function RestaurantMenu({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#FBF4E9", color:"#3A2E24", fontFamily:'"Cormorant Garamond","Inter",serif', fontSize:"11pt", lineHeight:1.55 }}>
      <div style={{ position:"absolute", inset:14, border:"2px solid #C5783E", pointerEvents:"none" }} />
      <div style={{ position:"absolute", inset:20, border:"1px solid #D8A26A", pointerEvents:"none" }} />
      <header className="relative" style={{ padding:"48px 56px 18px", textAlign:"center" }}>
        <p className="m-0 mb-2 uppercase text-[9pt]" style={{ color:"#9A6233", letterSpacing:"0.4em", fontFamily:'"Inter",sans-serif' }}>★ ★ ★</p>
        <h1 className="m-0" style={{ fontWeight:600, fontSize:"42pt", lineHeight:1, letterSpacing:"0.02em", textTransform:"uppercase", color:"#3A2E24" }}>{basics.fullName}</h1>
        <div className="flex items-center justify-center gap-3 mt-2" style={{ color:"#9A6233" }}>
          <span style={{flex:1,height:1,background:"#C5783E",maxWidth:90}}/>
          <span className="uppercase" style={{ fontSize:"11pt", letterSpacing:"0.24em", fontFamily:'"Inter",sans-serif', fontWeight:600 }}>{basics.role}</span>
          <span style={{flex:1,height:1,background:"#C5783E",maxWidth:90}}/>
        </div>
        <p className="m-0 mt-3 text-[9.5pt]" style={{ color:"#7A6450", fontFamily:'"Inter",sans-serif' }}>{[basics.email,basics.phone,basics.location,basics.website].filter(Boolean).join("   ·   ")}</p>
      </header>
      <div className="relative grid gap-9" style={{ padding:"14px 56px 48px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","About")}><RichTextRender html={basics.summary} style={{color:"#5A4A3A",fontSize:"11pt",fontStyle:"italic"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <div className="flex items-start justify-between gap-2" style={{borderBottom:"1px dotted #D2B48C",paddingBottom:2}}>
                <p className="m-0 font-semibold text-[13pt]" style={{color:"#3A2E24",flex:1,minWidth:0}}>{e.role}</p>
                <span className="text-[9pt] whitespace-nowrap" style={{color:"#9A6233",fontFamily:'"Inter",sans-serif',flexShrink:0,paddingTop:4}}>{dateRange(e.startDate,e.endDate,e.current)}</span>
              </div>
              <p className="m-0 italic text-[10.5pt]" style={{color:"#9A6233"}}>{e.company}</p>
              <BulletsRender bullets={e.bullets} className="rm-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#5A4A3A",fontFamily:'"Inter",sans-serif'}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-semibold text-[12pt]">{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#7A6450",fontFamily:'"Inter",sans-serif'}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Specialties")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10.5pt",fontFamily:'"Inter",sans-serif'}}>{skills.map((s,i)=>(<li key={i} style={{padding:"4px 0",borderBottom:i<skills.length-1?"1px dotted #D2B48C":"0",color:"#4A3A2C"}}><span style={{color:"#C5783E",marginRight:8}}>♦</span>{s}</li>))}</ul>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",color:"#5A4A3A",fontFamily:'"Inter",sans-serif'}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b style={{color:"#3A2E24"}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")}>
            <p className="m-0 text-[10pt]" style={{color:"#5A4A3A",fontFamily:'"Inter",sans-serif'}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(", ")}</p>
          </Sec>}
        </div>
      </div>
      <style>{`.rm-b li{position:relative;padding-left:14px;margin-bottom:2px}.rm-b li:before{content:"·";position:absolute;left:2px;color:#C5783E;font-weight:700}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5" style={{fontSize:"16pt",fontWeight:600,color:"#9A6233",letterSpacing:"0.02em",borderBottom:"1px solid #C5783E",paddingBottom:3}}>{t}</h2>{children}</section>; }
