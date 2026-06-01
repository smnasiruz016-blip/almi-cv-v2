// IsometricSilver — Executive Assistants, Operations, Corporate Support
// Deep navy + silver metallic wave + diamond photo frame + floating 3D motifs.
"use client";

import React from "react";
import { TemplateProps, dateRange, BulletsRender, getLabel, initials } from "./types";

export default function IsometricSilver({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"linear-gradient(160deg,#0E1F47 0%,#0A1733 100%)", color:"#DCE6F5", fontFamily:'"Plus Jakarta Sans","Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5 }}>
      <div aria-hidden style={{ position:"absolute", inset:0, pointerEvents:"none", background:"repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0 2px, transparent 2px 8px)" }} />

      <header className="relative" style={{ padding:"56px 56px 0" }}>
        <h1 className="m-0" style={{ fontWeight:800, fontSize:"52pt", lineHeight:0.92, letterSpacing:"-0.02em", color:"#E8EEF8", textTransform:"uppercase" }}>{splitName(basics.fullName)}</h1>
        <p className="m-0 mt-2" style={{ fontSize:"19pt", color:"#5BA8E8", fontWeight:600 }}>{basics.role}</p>

        {/* diamond photo */}
        <div style={{ position:"absolute", top:50, right:56, width:200, height:200, transform:"rotate(45deg)", borderRadius:18, padding:5, background:"linear-gradient(135deg,#EAF1FB,#7C93B5)", boxShadow:"0 0 30px rgba(91,168,232,0.6)" }}>
          <div style={{ width:"100%", height:"100%", borderRadius:14, background:"#16294F", overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{ transform:"rotate(-45deg)", color:"#5BA8E8", fontWeight:800, fontSize:"40pt" }}>
              {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:200,height:200,objectFit:"cover",transform:"rotate(-45deg)"}}/> : initials(basics.fullName)}
            </div>
          </div>
        </div>
      </header>

      {/* silver metallic wave */}
      <svg viewBox="0 0 794 150" preserveAspectRatio="none" style={{ width:"100%", height:150, display:"block", marginTop:24 }}>
        <defs><linearGradient id="is-w" x1="0" x2="1" y1="0" y2="0"><stop offset="0%" stopColor="#9FB2CC"/><stop offset="50%" stopColor="#EAF1FB"/><stop offset="100%" stopColor="#7C93B5"/></linearGradient></defs>
        <path d="M 0 70 C 180 20 320 120 500 80 C 640 50 720 90 794 60 L 794 96 C 720 126 640 86 500 116 C 320 156 180 56 0 106 Z" fill="url(#is-w)"/>
        <path d="M 0 80 C 180 30 320 130 500 90 C 640 60 720 100 794 70" fill="none" stroke="#3B6BA8" strokeWidth="2" opacity="0.6"/>
      </svg>

      <div className="relative" style={{ padding:"10px 56px 44px" }}>
        <SilverBar>{getLabel(data,"experience","Experience")}</SilverBar>
        {experience.map((e,i)=>(
          <div key={i} className="mb-3">
            <p className="m-0 text-[12pt]"><b style={{color:"#E8EEF8"}}>{e.company}</b><span style={{color:"#9FB2CC"}}> - {e.role} ({dateRange(e.startDate,e.endDate,e.current)})</span></p>
            <BulletsRender bullets={e.bullets} className="is-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#AEBCD4"}}/>
          </div>
        ))}

        <SilverBar>{getLabel(data,"skills","Skills")}</SilverBar>
        <div className="grid gap-x-6 gap-y-1" style={{ gridTemplateColumns:"1fr 1fr", fontSize:"10.5pt", color:"#DCE6F5" }}>
          {skills.map((s,i)=>(<div key={i}>{s}</div>))}
        </div>

        <SilverBar>{getLabel(data,"education","Education")}</SilverBar>
        {education.map((e,i)=>(
          <div key={i} className="mb-1.5">
            <p className="m-0 font-bold text-[11pt]" style={{color:"#E8EEF8"}}>{e.degree}</p>
            <p className="m-0 text-[10pt]" style={{color:"#9FB2CC"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p>
          </div>
        ))}

        {certifications.length>0 && (<>
          <SilverBar>{getLabel(data,"certifications","Certifications")}</SilverBar>
          <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",color:"#AEBCD4"}}>
            {certifications.map((c,i)=>(<li key={i} className="mb-0.5"><b style={{color:"#E8EEF8"}}>{c.name}</b>{c.issuer?` · ${c.issuer}`:""}{c.year?` · ${c.year}`:""}</li>))}
          </ul>
        </>)}

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-[9.5pt]" style={{color:"#7E91B0"}}>
          {basics.email && <span>✉ {basics.email}</span>}
          {basics.phone && <span>☎ {basics.phone}</span>}
          {basics.location && <span>⌖ {basics.location}</span>}
          {languages.length>0 && <span>{languages.map(l=>`${l.name} (${l.level})`).join(" · ")}</span>}
        </div>
      </div>
      <style>{`.is-b li{position:relative;padding-left:14px;margin-bottom:2px}.is-b li:before{content:"◆";position:absolute;left:0;color:#5BA8E8;font-size:7pt;top:3px}`}</style>
    </article>
  );
}

function splitName(name?: string){ const p=(name??"").trim().split(/\s+/); if(p.length<2) return name; return (<>{p[0]}<br/>{p.slice(1).join(" ")}</>); }
function SilverBar({ children }: { children: React.ReactNode }){
  return (<div style={{ display:"inline-block", margin:"18px 0 12px", padding:"5px 28px 5px 16px", background:"linear-gradient(135deg,#C2CEDF,#7C93B5)", borderRadius:"4px", clipPath:"polygon(0 0,90% 0,100% 100%,0 100%)", boxShadow:"0 2px 8px rgba(0,0,0,0.3)" }}>
    <span style={{ fontWeight:800, fontSize:"13pt", color:"#16294F", textTransform:"uppercase", letterSpacing:"0.12em" }}>{children}</span>
  </div>);
}
