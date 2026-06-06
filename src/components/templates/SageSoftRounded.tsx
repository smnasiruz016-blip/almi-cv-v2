// SageSoftRounded — Accountants, Finance, Admin (soft feminine professional)
// Sage green + cream blocks + rounded photo + circle motifs. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function SageSoftRounded({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#FBF1E6", color:"#33382C", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:330, background:"#C9D8BD" }} />
      <header className="relative grid items-center" style={{ gridTemplateColumns:"230px 1fr", gap:24, padding:"40px 48px 24px" }}>
        <div style={{ width:200, height:250, borderRadius:"100px 100px 24px 24px", overflow:"hidden", background:"#A7BF92", border:"4px solid #FBF1E6" }}>
          {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div className="flex items-center justify-center h-full" style={{color:"#FBF1E6",fontWeight:700,fontSize:"40pt"}}>{initials(basics.fullName)}</div>}
        </div>
        <div className="relative">
          <svg viewBox="0 0 110 110" style={{ position:"absolute", right:-6, top:-24, width:96, height:96 }}><circle cx="62" cy="48" r="38" fill="#86A86C"/><circle cx="40" cy="64" r="26" fill="none" stroke="#FBF1E6" strokeWidth="3"/></svg>
          <div style={{ width:6, height:96, background:"#86A86C", float:"left", marginRight:18 }} />
          <p className="m-0 tracking-[0.42em] uppercase" style={{ fontSize:"15pt", fontWeight:300, color:"#3A4530" }}>{firstName(basics.fullName)}</p>
          <h1 className="m-0" style={{ fontWeight:800, fontSize:"38pt", lineHeight:0.95, letterSpacing:"-0.01em", color:"#283021" }}>{lastName(basics.fullName)}</h1>
          <p className="m-0 mt-1 uppercase" style={{ fontSize:"12pt", letterSpacing:"0.16em", color:"#5A6B49", fontWeight:600 }}>{basics.role}</p>
        </div>
      </header>
      <div className="relative" style={{ padding:"8px 48px 8px" }}>
        <div style={{ display:"flex", flexWrap:"wrap", rowGap:6, columnGap:24, fontSize:"9pt", fontWeight:700, letterSpacing:"0.03em", color:"#3A4530", textTransform:"uppercase", lineHeight:1.3 }}>
          {[basics.phone&&`Tél : ${basics.phone}`, basics.email&&`Email : ${basics.email}`, basics.location&&`Adresse : ${basics.location}`, basics.website].filter(Boolean).map((x,i)=>(<span key={i} style={{whiteSpace:"nowrap"}}>{x}</span>))}
        </div>
      </div>
      <div className="relative grid gap-9" style={{ padding:"18px 48px 44px", gridTemplateColumns:"1fr 1.5fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","À Propos")}><RichTextRender html={basics.summary} style={{color:"#4C543F",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"education","Formation")}>
            {education.map((e,i)=>(<div key={i} className="mb-2.5"><p className="m-0 font-bold text-[10.5pt] uppercase" style={{letterSpacing:"0.03em"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#6B7A58"}}>{e.school}</p><p className="m-0 text-[9.5pt]" style={{color:"#8A977A"}}>{e.startDate}{e.endDate?`–${e.endDate}`:""}</p></div>))}
          </Sec>
          <Sec t={getLabel(data,"skills","Compétences")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt"}}>{skills.map((s,i)=>(<li key={i} className="flex items-center gap-2 mb-1"><span style={{width:7,height:7,borderRadius:"50%",background:"#86A86C",flexShrink:0}}/>{s}</li>))}</ul>
          </Sec>
          {languages.length>0 && <Sec t={getLabel(data,"languages","Langues")}>
            <p className="m-0 text-[10pt] uppercase" style={{letterSpacing:"0.04em",fontWeight:600,color:"#4C543F"}}>{languages.map(l=>l.name).join(", ")}</p>
            {languages.some(l=>l.level) && <p className="m-0 text-[9.5pt]" style={{color:"#8A977A"}}>{languages.map(l=>l.level).filter(Boolean).join(" · ")}</p>}
          </Sec>}
        </div>
        <div>
          <Sec t={getLabel(data,"experience","Expériences")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3.5 last:mb-0">
              <div className="flex items-start justify-between gap-3">
                <p className="m-0 font-bold text-[10.5pt] uppercase" style={{letterSpacing:"0.03em",flex:1,minWidth:0}}>{e.role}{e.company?`, ${e.company}`:""}{e.location?`, ${e.location}`:""}</p>
                <span className="text-[9pt] whitespace-nowrap" style={{color:"#8A977A",flexShrink:0,paddingTop:2}}>{dateRange(e.startDate,e.endDate,e.current)}</span>
              </div>
              <BulletsRender bullets={e.bullets} className="ssr-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#4C543F"}}/>
            </div>))}
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#4C543F"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
        </div>
      </div>
      <style>{`.ssr-b li{position:relative;padding-left:13px;margin-bottom:1px}.ssr-b li:before{content:"";position:absolute;left:0;top:7px;width:5px;height:5px;border-radius:50%;background:#86A86C}`}</style>
    </article>
  );
}
function firstName(n:string){ const p=(n||"").trim().split(/\s+/); return p.slice(0,-1).join(" ")||p[0]||""; }
function lastName(n:string){ const p=(n||"").trim().split(/\s+/); return p.length>1?p[p.length-1]:""; }
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5" style={{fontSize:"15pt",fontWeight:700,color:"#3A4530",letterSpacing:"0.04em",borderLeft:"5px solid #86A86C",paddingLeft:10}}>{t}</h2>{children}</section>; }
