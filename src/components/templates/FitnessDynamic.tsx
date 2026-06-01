// FitnessDynamic — Personal Trainers, Fitness Coaches, Sports Instructors
// Black + neon lime/red diagonal slashes + bold condensed type + energy bars.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, getLabel, initials } from "./types";

export default function FitnessDynamic({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#0D0D0F", color:"#F2F2F2", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5 }}>
      <svg viewBox="0 0 794 1123" preserveAspectRatio="none" style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
        <polygon points="0,0 175,0 0,175" fill="#C6FF3A" opacity="0.95"/>
        <polygon points="794,0 614,0 794,180" fill="#FF2E4D" opacity="0.92"/>
        <polygon points="0,1123 0,940 165,1123" fill="#C6FF3A" opacity="0.10"/>
        <polygon points="794,1123 794,975 640,1123" fill="#FF2E4D" opacity="0.08"/>
      </svg>
      <header className="relative" style={{ padding:"128px 48px 20px" }}>
        <h1 className="m-0" style={{ fontWeight:900, fontSize:"56pt", lineHeight:0.86, letterSpacing:"-0.03em", textTransform:"uppercase", fontStyle:"italic", color:"#C6FF3A" }}>{splitName(basics.fullName)}</h1>
        <p className="m-0 mt-2 uppercase" style={{ fontSize:"16pt", color:"#F2F2F2", fontWeight:800, letterSpacing:"0.1em", fontStyle:"italic" }}>{basics.role}</p>
        {basics.photoUrl && <img src={basics.photoUrl} alt="" style={{ position:"absolute", top:42, right:46, width:120, height:120, borderRadius:"50%", objectFit:"cover", border:"4px solid #C6FF3A", zIndex:2 }} />}
      </header>
      <div className="relative grid gap-7" style={{ padding:"24px 48px 40px", gridTemplateColumns:"1.4fr 1fr" }}>
        <div>
          {basics.summary && <FdBlk t={getLabel(data,"summary","ABOUT")} c="#C6FF3A"><div dangerouslySetInnerHTML={{__html:basics.summary}} style={{color:"#C2C2C2",fontSize:"10pt"}}/></FdBlk>}
          <FdBlk t={getLabel(data,"experience","EXPERIENCE")} c="#C6FF3A">
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]">{e.role} <span style={{color:"#FF2E4D"}}>/ {e.company}</span></p>
              <p className="m-0 text-[9pt]" style={{color:"#8A8A8A"}}>{dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="fd-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#C2C2C2"}}/>
            </div>))}
          </FdBlk>
          <FdBlk t={getLabel(data,"education","EDUCATION")} c="#C6FF3A">
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]">{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#8A8A8A"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p></div>))}
          </FdBlk>
        </div>
        <div>
          <FdBlk t={getLabel(data,"skills","SKILLS")} c="#FF2E4D">
            {skills.slice(0,8).map((s,i)=>(<div key={i} className="mb-2"><div className="flex justify-between text-[10pt]"><span>{s}</span></div><div style={{height:8,marginTop:2,background:"#1E1E22",transform:"skewX(-20deg)"}}><div style={{height:"100%",width:`${92-i*6}%`,background:i%2?"#FF2E4D":"#C6FF3A"}}/></div></div>))}
          </FdBlk>
          {certifications.length>0 && <FdBlk t={getLabel(data,"certifications","CERTIFICATIONS")} c="#FF2E4D">
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",color:"#C2C2C2"}}>{certifications.map((c,i)=>(<li key={i} className="mb-0.5"><b style={{color:"#F2F2F2"}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </FdBlk>}
          <div className="flex flex-col gap-1 text-[9.5pt] mt-3" style={{color:"#A8A8A8"}}>
            {basics.email && <span>✉ {basics.email}</span>}{basics.phone && <span>☎ {basics.phone}</span>}{basics.location && <span>⌖ {basics.location}</span>}
            {languages.length>0 && <span>{languages.map(l=>`${l.name} (${l.level})`).join(" · ")}</span>}
          </div>
        </div>
      </div>
      <style>{`.fd-b li{position:relative;padding-left:14px;margin-bottom:2px}.fd-b li:before{content:"›";position:absolute;left:0;color:#C6FF3A;font-weight:800}`}</style>
    </article>
  );
}
function splitName(n?:string){const p=(n??"").trim().split(/\s+/);if(p.length<2)return n;return(<>{p[0]}<br/>{p.slice(1).join(" ")}</>);}
function FdBlk({ t, c, children }: { t:string; c:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"13pt",fontWeight:900,letterSpacing:"0.1em",color:c,fontStyle:"italic"}}>{t}</h2>{children}</section>; }
