// ArchitectIsometric — Architects, Interior/Landscape Designers, Urban Planners
// Warm off-white + ink + terracotta + isometric building line-art. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function ArchitectIsometric({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], projects = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#F6F3EC", color:"#26221C", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <header className="relative" style={{ padding:"46px 52px 26px" }}>
        <svg viewBox="0 0 150 130" style={{ position:"absolute", right:48, top:34, width:150, height:130 }} fill="none" stroke="#C2603C" strokeWidth="1.5">
          <polygon points="40,70 75,52 110,70 75,88" fill="#F0E5DA"/><line x1="40" y1="70" x2="40" y2="100"/><line x1="110" y1="70" x2="110" y2="100"/><line x1="75" y1="88" x2="75" y2="118"/><line x1="40" y1="100" x2="75" y2="118"/><line x1="110" y1="100" x2="75" y2="118"/>
          <polygon points="62,44 80,34 98,44 80,54" fill="#F0E5DA"/><line x1="62" y1="44" x2="62" y2="58"/><line x1="98" y1="44" x2="98" y2="58"/>
        </svg>
        <h1 className="m-0" style={{ fontWeight:800, fontSize:"38pt", lineHeight:1, letterSpacing:"-0.02em", color:"#1E1A14" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1.5 uppercase" style={{ fontSize:"12pt", color:"#C2603C", fontWeight:700, letterSpacing:"0.2em" }}>{basics.role}</p>
        <div className="mt-3" style={{ width:64, height:3, background:"#C2603C" }}/>
        <p className="m-0 mt-3 text-[9.5pt]" style={{ color:"#6E665A" }}>{[basics.email,basics.phone,basics.location,basics.website].filter(Boolean).join("   ·   ")}</p>
      </header>
      <div className="grid gap-9" style={{ padding:"10px 52px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")}><RichTextRender html={basics.summary} style={{color:"#4A4338",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]" style={{color:"#1E1A14"}}>{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:"#C2603C",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="ai-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#4A4338"}}/>
            </div>))}
          </Sec>
          {projects.length>0 && <Sec t={getLabel(data,"projects","Selected Projects")}>
            {projects.map((p,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]">{p.name}</p>{p.description&&<p className="m-0 text-[9.5pt]" style={{color:"#6E665A"}}>{p.description}</p>}</div>))}
          </Sec>}
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Capabilities")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt"}}>{skills.map((s,i)=>(<li key={i} style={{padding:"3px 0",color:"#3C362D"}}><span style={{color:"#C2603C",marginRight:8}}>▱</span>{s}</li>))}</ul>
          </Sec>
          <Sec t={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10pt]">{e.degree}</p><p className="m-0 text-[9.5pt]" style={{color:"#6E665A"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p></div>))}
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Licenses")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#4A4338"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")}>
            <div className="text-[9.5pt]" style={{color:"#4A4338"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.ai-b li{position:relative;padding-left:14px;margin-bottom:2px}.ai-b li:before{content:"";position:absolute;left:0;top:6px;width:6px;height:6px;background:#C2603C}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"10.5pt",fontWeight:800,letterSpacing:"0.16em",color:"#1E1A14"}}>{t}</h2>{children}</section>; }
