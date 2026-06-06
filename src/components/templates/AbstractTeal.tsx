// AbstractTeal — playful geometric teal/blue diagonal bars + circles + dots, photo
// For data, analysts, modern professionals, students — fresh & geometric. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

const TEAL="#86C5C7", BLUE="#AEC4F0", INK="#3A4A52";
export default function AbstractTeal({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#F4F3EF", color:INK, fontFamily:'"Plus Jakarta Sans","Inter",sans-serif', fontSize:"10pt", lineHeight:1.5 }}>
      <svg viewBox="0 0 300 260" style={{ position:"absolute", top:-10, left:-10, width:300, height:260, opacity:0.95 }} fill="none">
        {[0,1,2,3].map(i=>(<rect key={i} x={-30+i*26} y={-40} width="14" height={150+i*10} rx="7" fill={i%2?BLUE:TEAL} transform={`rotate(38 ${-23+i*26} 40)`} opacity={0.8}/>))}
        <circle cx="150" cy="40" r="20" fill={BLUE} opacity="0.7"/><circle cx="120" cy="80" r="12" fill={TEAL}/>
      </svg>
      <svg viewBox="0 0 200 200" style={{ position:"absolute", top:30, right:24, width:150, height:150 }} fill="none">
        {Array.from({length:16}).map((_,i)=>(<circle key={i} cx={20+(i%4)*42} cy={20+Math.floor(i/4)*42} r="6" fill={i%3?TEAL:BLUE} opacity="0.5"/>))}
      </svg>
      <header className="relative" style={{ padding:"40px 48px 14px", textAlign:"center" }}>
        <div className="mx-auto" style={{ width:138, height:138, borderRadius:"50%", padding:4, background:TEAL, marginBottom:14 }}>
          <div style={{ width:"100%", height:"100%", borderRadius:"50%", overflow:"hidden", background:"#B7BDC4", border:"3px solid #F4F3EF" }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"36pt",fontWeight:700}}>{initials(basics.fullName)}</div>}
          </div>
        </div>
        <h1 className="m-0" style={{ fontWeight:800, fontSize:"34pt", lineHeight:0.98, letterSpacing:"-0.01em", color:TEAL }}>{basics.fullName}</h1>
        <div className="inline-block mt-2" style={{ border:`1.5px solid ${TEAL}`, borderRadius:9999, padding:"4px 22px", fontSize:"11pt", letterSpacing:"0.18em", textTransform:"uppercase", color:INK, fontWeight:500 }}>{basics.role}</div>
      </header>
      <div className="relative grid gap-9" style={{ padding:"18px 48px 44px", gridTemplateColumns:"1.05fr 1fr" }}>
        <div>
          <Sec t={getLabel(data,"experience","Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11pt]" style={{color:TEAL}}>{e.role}</p>
              <p className="m-0 uppercase text-[8.5pt]" style={{color:"#7E8A90",letterSpacing:"0.1em"}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="at-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#4E5A60"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"skills","Expertise")}>
            {skills.slice(0,6).map((s,i)=>(<div key={i} className="mb-2 flex items-center gap-3"><span className="text-[9.5pt]" style={{width:120,color:"#4E5A60"}}>{s}</span><div style={{flex:1,height:6,borderRadius:4,background:"#E2E0DA"}}><div style={{height:"100%",borderRadius:4,width:`${88-i*7}%`,background:TEAL}}/></div></div>))}
          </Sec>
        </div>
        <div>
          {basics.summary && <Pill t={getLabel(data,"summary","Profile")}><RichTextRender html={basics.summary} style={{color:"#4E5A60",fontSize:"10pt"}}/></Pill>}
          <Pill t={getLabel(data,"contact","Contact")}>
            <div className="text-[9.5pt]" style={{color:"#4E5A60",lineHeight:1.85}}>{[basics.phone,basics.email,basics.website,basics.location].filter(Boolean).map((x,i)=>(<div key={i}>{x}</div>))}</div>
          </Pill>
          <Pill t={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10pt]" style={{color:INK}}>{e.school}</p><p className="m-0 text-[9.5pt]" style={{color:"#7E8A90"}}>{e.degree}{e.endDate?`, ${e.endDate}`:""}</p></div>))}
          </Pill>
          {certifications.length>0 && <Pill t={getLabel(data,"certifications","Certifications")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#4E5A60"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b style={{color:INK}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Pill>}
          {languages.length>0 && <Pill t={getLabel(data,"languages","Languages")}>
            <div className="text-[9.5pt]" style={{color:"#4E5A60"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Pill>}
        </div>
      </div>
      <style>{`.at-b li{position:relative;padding-left:13px;margin-bottom:2px}.at-b li:before{content:"";position:absolute;left:0;top:6px;width:6px;height:6px;border-radius:50%;background:${TEAL}}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 inline-block uppercase" style={{fontSize:"11pt",fontWeight:700,letterSpacing:"0.04em",color:"#fff",background:TEAL,padding:"4px 16px",borderRadius:9999}}>{t}</h2>{children}</section>; }
function Pill({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-4 last:mb-0"><h2 className="m-0 mb-2 inline-block uppercase" style={{fontSize:"10.5pt",fontWeight:700,letterSpacing:"0.12em",color:INK,border:`1.5px solid ${TEAL}`,padding:"3px 16px",borderRadius:9999}}>{t}</h2>{children}</section>; }
