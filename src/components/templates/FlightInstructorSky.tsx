// FlightInstructorSky — Flight Instructors, CFIs, Aviation Trainers (light sky)
// Sky gradient + altitude-line chart + cloud accents + log-book stats. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function FlightInstructorSky({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], awards = [] } = data;
  const B = "#1E6BB8", D = "#12365C";
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"linear-gradient(170deg,#D8ECFA 0%,#F4FAFE 38%,#FFFFFF 60%)", color:"#22364A", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <div aria-hidden>
        {[[560,40,90],[660,90,64],[80,120,70]].map(([x,y,w],i)=>(<span key={i} style={{position:"absolute",left:x,top:y,width:w,height:(w as number)*0.38,borderRadius:9999,background:"#fff",opacity:0.9,boxShadow:"14px 6px 0 -4px #fff, -12px 8px 0 -5px #fff"}}/>))}
      </div>
      <header className="relative" style={{ padding:"46px 50px 18px" }}>
        <svg viewBox="0 0 130 50" style={{ position:"absolute", right:46, top:36, width:128, height:50 }} fill="none">
          <path d="M4 44 Q40 38 70 24 Q100 10 126 6" stroke={B} strokeWidth="2" strokeDasharray="6 5"/>
          <path d="M112 4 l14 4 -10 8 1-6Z" fill={D}/>
        </svg>
        <h1 className="m-0" style={{ fontWeight:900, fontSize:"36pt", lineHeight:0.96, letterSpacing:"-0.01em", color:D }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 uppercase" style={{ fontSize:"12.5pt", color:B, fontWeight:800, letterSpacing:"0.16em" }}>{basics.role}</p>
        <p className="m-0 mt-2 text-[9pt]" style={{ color:"#5C7186" }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   ·   ")}</p>
      </header>
      {awards.length>0 && <div className="relative grid gap-3" style={{ padding:"12px 50px 0", gridTemplateColumns:`repeat(${Math.min(awards.length,4)},1fr)` }}>
        {awards.slice(0,4).map((a,i)=>(<div key={i} className="text-center" style={{ padding:"10px 12px", borderRadius:10, background:"#fff", border:"1px solid #CFE2F2", boxShadow:"0 4px 12px rgba(30,107,184,0.08)" }}>
          <div style={{ fontWeight:900, fontSize:"15pt", lineHeight:1, color:B }}>{a.title}</div>
          {a.issuer&&<div className="text-[7.5pt] mt-1 uppercase" style={{ color:"#7A8DA0", letterSpacing:"0.08em", fontWeight:700 }}>{a.issuer}</div>}
        </div>))}
      </div>}
      <div className="relative grid gap-9" style={{ padding:"20px 50px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")} b={B} d={D}><RichTextRender html={basics.summary} style={{color:"#41566B",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Flight Experience")} b={B} d={D}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]" style={{color:D}}>{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:B,fontWeight:700}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="fis-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#41566B"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")} b={B} d={D}>
            {education.map((e,i)=>(<p key={i} className="m-0 mb-1 text-[10pt]" style={{color:"#41566B"}}><b style={{color:D}}>{e.degree}</b>, {e.school}{e.endDate?` · ${e.endDate}`:""}</p>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"certifications","Ratings & Certificates")} b={B} d={D}>
            <div className="flex flex-wrap gap-1.5">{certifications.map((c,i)=>(<span key={i} style={{padding:"4px 11px",fontSize:"9pt",fontWeight:800,color:"#fff",background:i%2?B:D,borderRadius:9999}}>{c.name}</span>))}</div>
          </Sec>
          <Sec t={getLabel(data,"skills","Instruction Skills")} b={B} d={D}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt"}}>{skills.map((s,i)=>(<li key={i} className="flex items-start gap-2 mb-1" style={{color:"#32465A"}}><span style={{color:B,fontWeight:900}}>✈</span>{s}</li>))}</ul>
          </Sec>
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")} b={B} d={D}>
            <div className="text-[9.5pt]" style={{color:"#41566B"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.fis-b li{position:relative;padding-left:15px;margin-bottom:2px}.fis-b li:before{content:"";position:absolute;left:0;top:6px;width:7px;height:7px;border-radius:50%;background:#1E6BB8}`}</style>
    </article>
  );
}
function Sec({ t, b, d, children }: { t:string; b:string; d:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11.5pt",fontWeight:900,letterSpacing:"0.08em",color:d,borderBottom:`2px solid ${b}`,paddingBottom:3,display:"inline-block",whiteSpace:"nowrap"}}>{t}</h2>{children}</section>; }
