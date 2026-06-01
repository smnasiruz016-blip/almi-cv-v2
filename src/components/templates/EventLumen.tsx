// EventLumen — Event Planners, Wedding Planners, Coordinators, Producers
// Deep plum + gold + string-lights/confetti motif + elegant. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function EventLumen({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], awards = [] } = data;
  const tiles = awards.slice(0,3);
  const dots = Array.from({length:16}).map((_,i)=>({x:30+i*48, y:18+(i%2?14:0)}));
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#241038", color:"#EDE3F2", fontFamily:'"Cormorant Garamond","Inter",serif', fontSize:"11pt", lineHeight:1.55 }}>
      <header className="relative" style={{ padding:"50px 54px 26px", textAlign:"center" }}>
        <svg viewBox="0 0 794 50" preserveAspectRatio="none" style={{ position:"absolute", left:0, top:0, width:"100%", height:46 }}>
          <path d={`M0 6 ${dots.map(d=>`Q ${d.x-12} ${d.y+10} ${d.x} ${d.y}`).join(" ")}`} fill="none" stroke="#C8A24E" strokeWidth="1"/>
          {dots.map((d,i)=>(<circle key={i} cx={d.x} cy={d.y} r="2.6" fill="#F0CE7A"/>))}
        </svg>
        <p className="m-0 mb-1 mt-3 uppercase text-[9pt]" style={{ color:"#C8A24E", letterSpacing:"0.34em", fontFamily:'"Inter",sans-serif' }}>Events · Celebrations</p>
        <h1 className="m-0" style={{ fontWeight:600, fontSize:"42pt", lineHeight:1, letterSpacing:"0.02em", color:"#F7EFFA" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 uppercase" style={{ fontSize:"12.5pt", color:"#E0BE6E", letterSpacing:"0.22em", fontFamily:'"Inter",sans-serif', fontWeight:600 }}>{basics.role}</p>
        <div className="mx-auto mt-3" style={{ width:120, height:1, background:"linear-gradient(90deg,transparent,#C8A24E,transparent)" }}/>
        <p className="m-0 mt-3 text-[9.5pt]" style={{ color:"#B59EC4", fontFamily:'"Inter",sans-serif' }}>{[basics.email,basics.phone,basics.location,basics.website].filter(Boolean).join("   ·   ")}</p>
      </header>
      {tiles.length>0 && (
        <div className="grid gap-3" style={{ gridTemplateColumns:`repeat(${tiles.length},1fr)`, padding:"6px 54px 4px" }}>
          {tiles.map((t,i)=>(<div key={i} style={{ borderRadius:12, padding:"12px 14px", textAlign:"center", background:"rgba(200,162,78,0.08)", border:"1px solid rgba(200,162,78,0.3)" }}>
            <div style={{ fontWeight:600, fontSize:"19pt", lineHeight:1, color:"#F0CE7A" }}>{t.title}</div>
            {t.issuer && <div className="text-[8.5pt] uppercase mt-1" style={{ letterSpacing:"0.1em", color:"#B59EC4", fontFamily:'"Inter",sans-serif' }}>{t.issuer}</div>}
          </div>))}
        </div>
      )}
      <div className="grid gap-9" style={{ padding:"18px 54px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")}><RichTextRender html={basics.summary} style={{color:"#CBBBD6",fontSize:"11pt",fontStyle:"italic"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-semibold text-[13pt]" style={{color:"#F7EFFA"}}>{e.role}</p>
              <p className="m-0 italic text-[10.5pt]" style={{color:"#E0BE6E",fontFamily:'"Inter",sans-serif'}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="el-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#CBBBD6",fontFamily:'"Inter",sans-serif'}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-semibold text-[12pt]" style={{color:"#F7EFFA"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#B59EC4",fontFamily:'"Inter",sans-serif'}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Specialties")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10.5pt",fontFamily:'"Inter",sans-serif'}}>{skills.map((s,i)=>(<li key={i} style={{padding:"4px 0",borderBottom:i<skills.length-1?"1px solid rgba(200,162,78,0.2)":"0",color:"#DCD0E4"}}><span style={{color:"#E0BE6E",marginRight:8}}>✦</span>{s}</li>))}</ul>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",color:"#CBBBD6",fontFamily:'"Inter",sans-serif'}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b style={{color:"#F7EFFA"}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")}>
            <p className="m-0 text-[10pt]" style={{color:"#CBBBD6",fontFamily:'"Inter",sans-serif'}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(", ")}</p>
          </Sec>}
        </div>
      </div>
      <style>{`.el-b li{position:relative;padding-left:14px;margin-bottom:2px}.el-b li:before{content:"✦";position:absolute;left:0;color:#E0BE6E;font-size:8pt}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5" style={{fontSize:"15pt",fontWeight:600,color:"#E0BE6E",letterSpacing:"0.03em",borderBottom:"1px solid rgba(200,162,78,0.3)",paddingBottom:4}}>{t}</h2>{children}</section>; }
