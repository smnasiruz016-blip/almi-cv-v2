// TeacherChalk — Teachers, Tutors, Educators (playful chalkboard graphical)
// Chalkboard green + chalk white + warm accents + apple/pencil motif. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function TeacherChalk({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#2E3D35", color:"#EDEFE9", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <header className="relative" style={{ padding:"44px 50px 26px", borderBottom:"2px dashed rgba(237,239,233,0.35)" }}>
        <svg viewBox="0 0 50 54" style={{ position:"absolute", right:48, top:34, width:48, height:52 }} fill="none" stroke="#E8A04A" strokeWidth="2.2">
          <path d="M25 16 C16 8 6 14 8 28 C10 42 20 50 25 50 C30 50 40 42 42 28 C44 14 34 8 25 16 Z" fill="#C8482F" stroke="#C8482F"/>
          <path d="M25 16 C25 10 28 6 33 5" stroke="#5C7A3A" strokeWidth="3"/>
        </svg>
        <p className="m-0 mb-1 uppercase text-[9pt]" style={{ color:"#F2C14E", letterSpacing:"0.32em", fontWeight:600 }}>Educator</p>
        <h1 className="m-0" style={{ fontWeight:800, fontSize:"38pt", lineHeight:1, letterSpacing:"-0.01em", color:"#FBFCF8", fontFamily:'"Georgia",serif' }}>{basics.fullName}</h1>
        <p className="m-0 mt-1.5" style={{ fontSize:"13pt", color:"#9BD17C", fontWeight:600, letterSpacing:"0.02em" }}>{basics.role}</p>
        <p className="m-0 mt-3 text-[9.5pt]" style={{ color:"#B6C2B0" }}>{[basics.email,basics.phone,basics.location,basics.website].filter(Boolean).join("   ·   ")}</p>
      </header>
      <div className="grid gap-9" style={{ padding:"24px 50px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","About Me")}><RichTextRender html={basics.summary} style={{color:"#CBD4C5",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Teaching Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]" style={{color:"#FBFCF8"}}>{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:"#9BD17C",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="tc-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#CBD4C5"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:"#FBFCF8"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#A7B4A2"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Skills")}>
            <div className="flex flex-wrap gap-1.5">{skills.map((s,i)=>(<span key={i} style={{padding:"4px 11px",fontSize:"9.5pt",fontWeight:600,color:"#2E3D35",background:["#9BD17C","#F2C14E","#E8A04A","#7FC0E0"][i%4],borderRadius:9999}}>{s}</span>))}</div>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#CBD4C5"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b style={{color:"#FBFCF8"}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")}>
            <div className="text-[9.5pt]" style={{color:"#CBD4C5"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.tc-b li{position:relative;padding-left:16px;margin-bottom:2px}.tc-b li:before{content:"\\2713";position:absolute;left:0;color:#9BD17C;font-weight:700}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5" style={{fontSize:"13pt",fontWeight:700,color:"#FBFCF8",fontFamily:'"Georgia",serif',borderBottom:"2px dashed rgba(155,209,124,0.5)",paddingBottom:3,display:"inline-block"}}>{t}</h2>{children}</section>; }
