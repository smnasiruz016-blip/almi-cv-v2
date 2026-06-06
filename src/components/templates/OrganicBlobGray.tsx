// OrganicBlobGray — soft gray organic blob shape + peach accents, photo, two-column
// For accountants, finance, admin, operations — warm-neutral professional. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

const GRAY="#9A9A98", PEACH="#F2C0A0", INK="#3A3A3A";
export default function OrganicBlobGray({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#FBFAF8", color:INK, fontFamily:'"Plus Jakarta Sans","Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <svg viewBox="0 0 420 1123" preserveAspectRatio="none" style={{ position:"absolute", left:0, top:0, width:420, height:1123 }}>
        <path d="M0 0 H300 C360 120 250 230 300 360 C360 520 230 640 250 820 C265 980 150 1040 120 1123 H0 Z" fill={GRAY} opacity="0.92"/>
      </svg>
      <svg viewBox="0 0 200 200" style={{ position:"absolute", left:-30, top:-20, width:200, height:200 }}><path d="M40 60 C20 30 70 6 110 18 C150 30 170 70 150 100 C130 130 80 120 60 100 C45 86 52 76 40 60 Z" fill={PEACH} opacity="0.85"/></svg>
      <header className="relative" style={{ padding:"40px 50px 10px", display:"grid", gridTemplateColumns:"232px 1fr", gap:24, alignItems:"center" }}>
        <div className="mx-auto" style={{ width:172, height:172, borderRadius:"50%", overflow:"hidden", border:"5px solid #fff", boxShadow:"0 8px 20px rgba(0,0,0,0.18)", background:"#B7B7B5" }}>
          {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"44pt"}}>{initials(basics.fullName)}</div>}
        </div>
        <div>
          <h1 className="m-0" style={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:600, fontSize:"38pt", lineHeight:1, color:INK }}>{basics.fullName}</h1>
          <div className="inline-block mt-2" style={{ background:PEACH, color:"#5A3A2A", padding:"3px 18px", fontSize:"10.5pt", letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:600 }}>{basics.role}</div>
          {basics.summary && <div className="mt-3"><RichTextRender html={basics.summary} style={{color:"#4A4A4A",fontSize:"10.5pt"}}/></div>}
        </div>
      </header>
      <div className="relative grid gap-8" style={{ padding:"20px 50px 44px", gridTemplateColumns:"270px 1fr" }}>
        <div style={{ paddingTop:6 }}>
          <SecLight t={getLabel(data,"contact","Contacto")}>
            <div className="text-[10pt]" style={{color:"#EDEDEB",lineHeight:1.9}}>{[basics.email,basics.phone,basics.website,basics.location].filter(Boolean).map((x,i)=>(<div key={i}>{x}</div>))}</div>
          </SecLight>
          <SecLight t={getLabel(data,"education","Educación")}>
            {education.map((e,i)=>(<div key={i} className="mb-2"><p className="m-0 font-bold text-[10.5pt]" style={{color:"#fff"}}>{e.school}</p><p className="m-0 text-[9.5pt]" style={{color:"#E0E0DE"}}>{dateRange(e.startDate,e.endDate)} · {e.degree}</p></div>))}
          </SecLight>
          <SecLight t={getLabel(data,"languages","Idiomas")}>
            <div className="text-[10pt]" style={{color:"#EDEDEB"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(", ")||"—"}</div>
          </SecLight>
        </div>
        <div>
          <SecDark t={getLabel(data,"experience","Experiencia Laboral")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0" style={{background:"#fff",border:"1px solid #EFE7DF",boxShadow:"0 3px 10px rgba(0,0,0,0.05)",padding:"12px 16px"}}>
              <p className="m-0 font-extrabold text-[11.5pt]" style={{color:INK}}>{e.role}</p>
              <p className="m-0 text-[9.5pt]" style={{background:"#EDEDEB",display:"inline-block",padding:"1px 8px",color:"#555"}}>{e.company}, {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="obg-b" style={{margin:"4px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#4A4A4A"}}/>
            </div>))}
          </SecDark>
          {certifications.length>0 && <SecDark t={getLabel(data,"certifications","Otros conocimientos")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",color:"#4A4A4A"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1" style={{display:"flex",gap:7}}><span style={{color:PEACH}}>•</span><span><b style={{color:INK}}>{c.name}</b>{c.year?` · ${c.year}`:""}</span></li>))}</ul>
          </SecDark>}
        </div>
      </div>
      <style>{`.obg-b li{position:relative;padding-left:14px;margin-bottom:2px}.obg-b li:before{content:"•";position:absolute;left:0;color:${PEACH}}`}</style>
    </article>
  );
}
function SecLight({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2 uppercase" style={{fontSize:"11pt",fontWeight:700,letterSpacing:"0.1em",color:"#fff",borderBottom:"1.5px solid rgba(255,255,255,0.4)",paddingBottom:3}}>{t}</h2>{children}</section>; }
function SecDark({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 inline-block" style={{fontSize:"12.5pt",fontWeight:700,color:INK,background:PEACH,padding:"3px 16px",borderRadius:9999}}>{t}</h2>{children}</section>; }
