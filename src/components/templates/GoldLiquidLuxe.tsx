// GoldLiquidLuxe — Administrative Assistants, Office Managers, Coordinators (luxe)
// Black + flowing gold liquid ribbons + glass folder cards. Premium dark.
"use client";

import React from "react";
import { TemplateProps, dateRange, RichTextRender, BulletsRender, getLabel, initials } from "./types";

export default function GoldLiquidLuxe({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#0B0B10", color:"#F4ECD6", fontFamily:'"Plus Jakarta Sans","Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5 }}>
      {/* faint tech grid */}
      <div aria-hidden style={{ position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage:"linear-gradient(rgba(212,175,55,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.05) 1px,transparent 1px)", backgroundSize:"40px 40px" }} />
      {/* gold liquid ribbons */}
      <svg viewBox="0 0 794 1123" preserveAspectRatio="none" style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
        <defs>
          <linearGradient id="gl-r" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stopColor="#FBE08A"/><stop offset="45%" stopColor="#D4A92A"/><stop offset="100%" stopColor="#8A6410"/></linearGradient>
        </defs>
        <path d="M -40 380 C 180 300 300 470 520 400 C 680 348 760 300 834 360 L 834 470 C 760 410 680 458 520 510 C 300 580 180 410 -40 490 Z" fill="url(#gl-r)"/>
        <path d="M 834 760 C 640 690 520 850 320 800 C 180 762 80 800 -40 760 L -40 880 C 80 920 180 882 320 920 C 520 970 640 810 834 880 Z" fill="url(#gl-r)" opacity="0.9"/>
        {/* paper plane */}
        <g transform="translate(540 380) rotate(-18)"><polygon points="0,20 60,0 30,30 24,22" fill="#FBE08A"/><polygon points="0,20 30,30 18,40" fill="#C9971C"/></g>
      </svg>

      <header className="relative" style={{ padding:"40px 48px 8px" }}>
        <h1 className="m-0" style={{ fontWeight:900, fontSize:"60pt", lineHeight:0.9, letterSpacing:"-0.02em", textTransform:"uppercase", color:"#F4C842" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1" style={{ fontSize:"20pt", color:"#C9C9CF", fontWeight:500 }}>{basics.role}</p>
      </header>

      <div className="relative grid gap-6" style={{ padding:"20px 48px 40px", gridTemplateColumns:"220px 1fr" }}>
        <div className="flex flex-col gap-6">
          {/* photo frame */}
          <div style={{ width:200, height:240, borderRadius:16, padding:6, background:"linear-gradient(135deg,#FBE08A,#8A6410)", boxShadow:"0 0 28px rgba(212,169,42,0.45)" }}>
            <div style={{ width:"100%", height:"100%", borderRadius:11, background:"#15140E", display:"flex", alignItems:"center", justifyContent:"center", color:"#F4C842", fontWeight:800, fontSize:"56pt" }}>
              {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:11}}/> : initials(basics.fullName)}
            </div>
          </div>
          <Folder title={getLabel(data,"skills","Skills")}>
            {skills.slice(0,6).map((s,i)=>(
              <div key={i} className="mb-2">
                <div className="text-[10pt]" style={{color:"#F4ECD6"}}>{s}</div>
                <div style={{height:3,marginTop:2,borderRadius:9999,background:"#2A2820"}}><div style={{height:"100%",width:`${90-i*8}%`,borderRadius:9999,background:"linear-gradient(90deg,#FBE08A,#D4A92A)"}}/></div>
              </div>
            ))}
          </Folder>
          <Folder title={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(
              <div key={i} className="mb-1.5 last:mb-0">
                <p className="m-0 font-bold text-[10.5pt]" style={{color:"#FFFFFF"}}>{e.degree}</p>
                <p className="m-0 text-[10pt]" style={{color:"#B8B19A"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p>
              </div>
            ))}
          </Folder>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3" style={{ color:"#F4C842" }}>
            <span style={{flex:"0 0 auto",fontWeight:900,fontSize:"19pt",letterSpacing:"0.04em"}}>{getLabel(data,"experience","EXPERIENCE")}</span>
            <span style={{flex:1,height:1,background:"linear-gradient(90deg,#D4A92A,transparent)"}}/>
          </div>
          {experience.map((e,i)=>(
            <GlassCard key={i}>
              <p className="m-0 font-bold text-[12pt]" style={{color:"#FFFFFF"}}>{e.company}</p>
              <p className="m-0 text-[11pt]" style={{color:"#E6D9A8"}}>{e.role} <span style={{color:"#9A926F"}}>· {dateRange(e.startDate,e.endDate,e.current)}</span></p>
              <BulletsRender bullets={e.bullets} className="gl-b" style={{margin:"6px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#C9C2A8"}}/>
            </GlassCard>
          ))}
          {certifications.length>0 && (
            <GlassCard>
              <p className="m-0 font-bold text-[11.5pt]" style={{color:"#F4C842"}}>{getLabel(data,"certifications","Certifications")}</p>
              <ul style={{margin:"6px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#C9C2A8"}}>
                {certifications.map((c,i)=>(<li key={i} className="mb-0.5"><b style={{color:"#FFFFFF"}}>{c.name}</b>{c.issuer?` · ${c.issuer}`:""}{c.year?` · ${c.year}`:""}</li>))}
              </ul>
            </GlassCard>
          )}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[9.5pt]" style={{color:"#9A926F"}}>
            {basics.email && <span>✉ {basics.email}</span>}
            {basics.phone && <span>☎ {basics.phone}</span>}
            {basics.location && <span>⌖ {basics.location}</span>}
            {languages.length>0 && <span>{languages.map(l=>`${l.name} (${l.level})`).join(" · ")}</span>}
          </div>
        </div>
      </div>
      <style>{`.gl-b li{position:relative;padding-left:14px;margin-bottom:2px}.gl-b li:before{content:"";position:absolute;left:0;top:7px;width:5px;height:5px;border-radius:50%;background:#D4A92A}`}</style>
    </article>
  );
}

function GlassCard({ children }: { children: React.ReactNode }){ return <section style={{ background:"linear-gradient(135deg,rgba(60,52,28,0.55),rgba(20,18,12,0.55))", border:"1px solid rgba(212,169,42,0.35)", borderRadius:12, padding:"16px 18px", backdropFilter:"blur(8px)", boxShadow:"0 4px 18px rgba(0,0,0,0.4)" }}>{children}</section>; }
function Folder({ title, children }: { title: string; children: React.ReactNode }){
  return (<section>
    <div style={{ display:"inline-block", background:"linear-gradient(135deg,#3A3320,#1A170E)", border:"1px solid rgba(212,169,42,0.4)", borderRadius:"10px 10px 0 0", padding:"5px 16px 5px 12px", clipPath:"polygon(0 0,82% 0,100% 100%,0 100%)" }}>
      <span style={{ fontWeight:900, fontSize:"13pt", color:"#F4C842", letterSpacing:"0.04em", textTransform:"uppercase" }}>{title}</span>
    </div>
    <div style={{ background:"rgba(20,18,12,0.5)", border:"1px solid rgba(212,169,42,0.25)", borderRadius:"0 12px 12px 12px", padding:"14px 16px" }}>{children}</div>
  </section>);
}
