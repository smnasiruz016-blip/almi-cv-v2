// NeonServerStack — Network / Systems / Infrastructure Engineers, NOC, SysAdmin
// Deep navy + neon cyan/blue + isometric server stack + glass cards. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function NeonServerStack({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"radial-gradient(120% 80% at 82% -5%,#16315F 0%,#0A1126 55%,#070B1A 100%)", color:"#D7E2F5", fontFamily:'"Plus Jakarta Sans","Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5 }}>
      <div aria-hidden style={{ position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage:"linear-gradient(rgba(90,170,255,0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(90,170,255,0.045) 1px,transparent 1px)", backgroundSize:"34px 34px" }} />
      <header className="relative" style={{ padding:"48px 48px 22px" }}>
        <h1 className="m-0" style={{ fontWeight:800, fontSize:"45pt", lineHeight:0.92, letterSpacing:"-0.02em", textTransform:"uppercase", color:"#F2F7FF", textShadow:"0 0 26px rgba(56,160,255,0.45)" }}>{basics.fullName}</h1>
        <p className="m-0 mt-2 uppercase" style={{ fontSize:"14pt", color:"#37B6FF", fontWeight:700, letterSpacing:"0.16em" }}>{basics.role}</p>
        <p className="m-0 mt-3 text-[9.5pt]" style={{ color:"#7E93B8" }}>{[basics.email,basics.phone,basics.location,basics.website].filter(Boolean).join("   ·   ")}</p>
        <svg viewBox="0 0 200 180" style={{ position:"absolute", right:40, top:26, width:172, height:155, opacity:0.95 }}>
          {[0,1,2].map(i=>{ const y=44+i*42; return (<g key={i}>
            <polygon points={`60,${y} 110,${y-20} 162,${y} 112,${y+20}`} fill="#274F92" stroke="#46AEFF" strokeWidth="1.4"/>
            <polygon points={`60,${y} 112,${y+20} 112,${y+44} 60,${y+24}`} fill="#152E59" stroke="#46AEFF" strokeWidth="1.2"/>
            <polygon points={`162,${y} 112,${y+20} 112,${y+44} 162,${y+24}`} fill="#1D3E73" stroke="#46AEFF" strokeWidth="1.2"/>
            <circle cx="72" cy={y+30} r="2.4" fill="#5BE0A0"/><circle cx="80" cy={y+32} r="2.4" fill="#37B6FF"/>
          </g>); })}
          <circle cx="110" cy="22" r="9" fill="none" stroke="#5BE0A0" strokeWidth="1.6"/><path d="M104 22a6 6 0 0 1 12 0" fill="none" stroke="#5BE0A0" strokeWidth="1.6"/>
        </svg>
      </header>
      <div className="relative grid gap-6" style={{ padding:"10px 48px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div className="flex flex-col gap-4">
          {basics.summary && <Glass><Hd c="#37B6FF">{getLabel(data,"summary","PROFILE")}</Hd><RichTextRender html={basics.summary} style={{color:"#AFC0DC",fontSize:"10pt"}}/></Glass>}
          <Glass><Hd c="#37B6FF">{getLabel(data,"experience","EXPERIENCE")}</Hd>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]" style={{color:"#EAF1FF"}}>{e.role}</p>
              <p className="m-0 text-[9.5pt]" style={{color:"#37B6FF",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="nss-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#AFC0DC"}}/>
            </div>))}
          </Glass>
          <Glass><Hd c="#37B6FF">{getLabel(data,"education","EDUCATION")}</Hd>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:"#EAF1FF"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#8597B8"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p></div>))}
          </Glass>
        </div>
        <div className="flex flex-col gap-4">
          <Glass><Hd c="#5BE0A0">{getLabel(data,"skills","SKILLS")}</Hd>
            {skills.slice(0,9).map((s,i)=>(<div key={i} className="mb-2"><div className="text-[9.5pt]" style={{color:"#D7E2F5"}}>{s}</div><div style={{height:5,marginTop:3,borderRadius:4,background:"rgba(255,255,255,0.08)"}}><div style={{height:"100%",borderRadius:4,width:`${92-i*6}%`,background:"linear-gradient(90deg,#37B6FF,#5BE0A0)",boxShadow:"0 0 10px rgba(55,182,255,0.55)"}}/></div></div>))}
          </Glass>
          {certifications.length>0 && <Glass><Hd c="#5BE0A0">{getLabel(data,"certifications","CERTIFICATIONS")}</Hd>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#AFC0DC"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b style={{color:"#EAF1FF"}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Glass>}
          {languages.length>0 && <Glass><Hd c="#5BE0A0">{getLabel(data,"languages","LANGUAGES")}</Hd>
            <div className="text-[9.5pt]" style={{color:"#AFC0DC"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Glass>}
        </div>
      </div>
      <style>{`.nss-b li{position:relative;padding-left:14px;margin-bottom:2px}.nss-b li:before{content:"";position:absolute;left:0;top:7px;width:6px;height:6px;border-radius:50%;background:#37B6FF;box-shadow:0 0 8px #37B6FF}`}</style>
    </article>
  );
}
function Glass({ children }: { children:React.ReactNode }){ return <section style={{ background:"rgba(20,38,72,0.55)", border:"1px solid rgba(74,150,255,0.22)", borderRadius:16, padding:"16px 18px", backdropFilter:"blur(8px)", boxShadow:"inset 0 1px 0 rgba(255,255,255,0.05)" }}>{children}</section>; }
function Hd({ c, children }: { c:string; children:React.ReactNode }){ return <h2 className="m-0 mb-2.5 uppercase" style={{ fontSize:"11pt", fontWeight:800, letterSpacing:"0.14em", color:c }}>{children}</h2>; }
