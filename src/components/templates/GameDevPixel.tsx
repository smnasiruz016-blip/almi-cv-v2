// GameDevPixel — Game Developers, Game Designers, QA, Technical Artists
// Dark indigo + arcade neon + pixel/8-bit accents + mono. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

const Heart = ({ c="#FF4D6D" }: { c?:string }) => (<svg width="16" height="16" viewBox="0 0 16 16" shapeRendering="crispEdges">{[[6,2],[8,2],[4,4],[6,4],[8,4],[10,4],[2,6],[4,6],[6,6],[8,6],[10,6],[12,6],[4,8],[6,8],[8,8],[10,8],[6,10],[8,10]].map(([x,y],i)=><rect key={i} x={x} y={y} width="2" height="2" fill={c}/>)}</svg>);

export default function GameDevPixel({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], projects = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#15132A", color:"#D8D4F0", fontFamily:'"JetBrains Mono","Inter",monospace', fontSize:"10pt", lineHeight:1.5 }}>
      <div aria-hidden style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"linear-gradient(rgba(124,108,255,0.06) 2px,transparent 2px),linear-gradient(90deg,rgba(124,108,255,0.06) 2px,transparent 2px)", backgroundSize:"32px 32px" }} />
      <header className="relative" style={{ padding:"40px 48px 22px", borderBottom:"3px solid #7C6CFF" }}>
        <div className="flex items-center gap-2 mb-2">{[0,1,2].map(i=><Heart key={i}/>)}<span className="text-[8.5pt]" style={{color:"#7C6CFF"}}>PLAYER 1</span></div>
        <h1 className="m-0" style={{ fontWeight:800, fontSize:"40pt", lineHeight:0.92, letterSpacing:"-0.01em", textTransform:"uppercase", color:"#F4F2FF", textShadow:"3px 3px 0 #7C6CFF" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 uppercase" style={{ fontSize:"12.5pt", color:"#3DF5C4", fontWeight:700, letterSpacing:"0.14em" }}>{basics.role}</p>
        <p className="m-0 mt-3 text-[8.5pt]" style={{ color:"#8E88B8" }}>{[basics.email,basics.phone,basics.location,basics.website].filter(Boolean).join("  ▪  ")}</p>
      </header>
      <div className="relative grid gap-7" style={{ padding:"24px 48px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","START")}><RichTextRender html={basics.summary} style={{color:"#B0AAD6",fontSize:"10pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","QUESTS")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11pt]" style={{color:"#F4F2FF"}}>{e.role}</p>
              <p className="m-0 text-[9pt]" style={{color:"#3DF5C4"}}>{e.company} [{dateRange(e.startDate,e.endDate,e.current)}]</p>
              <BulletsRender bullets={e.bullets} className="gd-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#B0AAD6"}}/>
            </div>))}
          </Sec>
          {projects.length>0 && <Sec t={getLabel(data,"projects","SHIPPED")}>
            {projects.map((p,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10pt]" style={{color:"#F4F2FF"}}>{p.name}</p>{p.description&&<p className="m-0 text-[9.5pt]" style={{color:"#8E88B8"}}>{p.description}</p>}</div>))}
          </Sec>}
        </div>
        <div>
          <Sec t={getLabel(data,"skills","STATS")}>
            {skills.slice(0,8).map((s,i)=>(<div key={i} className="mb-1.5"><div className="text-[9pt]" style={{color:"#D8D4F0"}}>{s}</div><div className="flex gap-0.5 mt-1">{Array.from({length:10}).map((_,j)=><span key={j} style={{width:14,height:7,background:j<(9-i*0.4)?"#3DF5C4":"#2A2748"}}/>)}</div></div>))}
          </Sec>
          <Sec t={getLabel(data,"education","LEVEL UP")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10pt]" style={{color:"#F4F2FF"}}>{e.degree}</p><p className="m-0 text-[9pt]" style={{color:"#8E88B8"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
          </Sec>
          {(certifications.length>0||languages.length>0) && <Sec t="EXTRAS">
            {certifications.length>0 && <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9pt",color:"#B0AAD6"}}>{certifications.map((c,i)=>(<li key={i}>★ {c.name}</li>))}</ul>}
            {languages.length>0 && <div className="text-[9pt] mt-1" style={{color:"#B0AAD6"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>}
          </Sec>}
        </div>
      </div>
      <style>{`.gd-b li{position:relative;padding-left:15px;margin-bottom:1px}.gd-b li:before{content:"▸";position:absolute;left:0;color:#3DF5C4}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11pt",fontWeight:800,letterSpacing:"0.14em",color:"#7C6CFF"}}>{t}</h2>{children}</section>; }
