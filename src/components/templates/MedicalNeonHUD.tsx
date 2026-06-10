// MedicalNeonHUD — Specialist Physicians, Surgeons, Cardiologists (dark neon)
// Deep ink + neon cyan corner brackets + glow photo ring + teal panel + timeline. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function MedicalNeonHUD({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], interests = [] } = data;
  const C = "#2EE6C8";
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"radial-gradient(110% 80% at 80% 0%,#0D2233 0%,#081420 60%)", color:"#D9E6EE", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5, display:"grid", gridTemplateColumns:"272px 1fr" }}>
      <Bracket style={{ left:14, top:14 }}/>
      <Bracket style={{ right:14, top:14, transform:"rotate(90deg)" }}/>
      <Bracket style={{ left:14, bottom:14, transform:"rotate(-90deg)" }}/>
      <Bracket style={{ right:14, bottom:14, transform:"rotate(180deg)" }}/>
      <aside style={{ padding:"46px 26px 40px 34px" }}>
        <div style={{ width:172, height:172, borderRadius:"50%", margin:"0 auto", padding:5, background:"transparent", border:`3px solid ${C}`, boxShadow:`0 0 24px rgba(46,230,200,0.55), inset 0 0 18px rgba(46,230,200,0.25)` }}>
          <div style={{ width:"100%", height:"100%", borderRadius:"50%", overflow:"hidden", background:"#10293C", display:"flex", alignItems:"center", justifyContent:"center" }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <span style={{color:C,fontWeight:800,fontSize:"40pt"}}>{initials(basics.fullName)}</span>}
          </div>
        </div>
        <ul style={{ margin:"22px 0 0", padding:0, listStyle:"none", fontSize:"9.5pt", lineHeight:2, color:"#A8BDCB", wordBreak:"break-word" }}>
          {[basics.email,basics.phone,basics.location].filter(Boolean).map((x,i)=>(<li key={i} className="flex items-start gap-2"><span style={{color:C}}>▣</span>{x}</li>))}
        </ul>
        <SecL t={getLabel(data,"skills","Skills")} c={C}>
          {skills.slice(0,7).map((s,i)=>(<div key={i} className="mb-2"><div style={{ height:16, borderRadius:9999, background:"#10293C", position:"relative", overflow:"hidden" }}><div style={{ position:"absolute", inset:0, width:`${90-i*6}%`, borderRadius:9999, background:"linear-gradient(90deg,#2E9BFF,#7C5CFF)" }}/><span style={{ position:"relative", display:"block", textAlign:"center", fontSize:"8pt", fontWeight:700, color:"#fff", lineHeight:"16px", letterSpacing:"0.04em" }}>{s}</span></div></div>))}
        </SecL>
        {languages.length>0 && <SecL t={getLabel(data,"languages","Languages")} c={C}>
          {languages.map((l,i)=>(<div key={i} className="flex justify-between mb-1 text-[9.5pt]"><span>{l.name}</span><span style={{color:"#7C95A6"}}>{l.level}</span></div>))}
        </SecL>}
        {interests.length>0 && <SecL t={getLabel(data,"interests","Hobbies")} c={C}>
          <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",lineHeight:1.9,color:"#A8BDCB"}}>{interests.map((x,i)=>(<li key={i} className="flex items-center gap-2"><span style={{color:C}}>◉</span>{x}</li>))}</ul>
        </SecL>}
      </aside>
      <main style={{ padding:"46px 44px 40px 10px" }}>
        <div style={{ background:"linear-gradient(120deg,#0E3A44,#0A2A38)", border:`1px solid rgba(46,230,200,0.3)`, borderRadius:8, padding:"24px 26px" }}>
          <h1 className="m-0 uppercase" style={{ fontWeight:900, fontSize:"34pt", lineHeight:0.95, letterSpacing:"-0.01em", color:"#F2FAFD" }}>{basics.fullName}</h1>
          <p className="m-0 mt-1 uppercase" style={{ fontSize:"15pt", color:C, fontWeight:800, letterSpacing:"0.08em" }}>{basics.role}</p>
          {basics.summary && <RichTextRender html={basics.summary} style={{ color:"#B7CCD9", fontSize:"9.5pt", marginTop:10 }}/>}
        </div>
        <div className="relative" style={{ marginTop:24, paddingLeft:30 }}>
          <span style={{ position:"absolute", left:7, top:8, bottom:8, width:2, background:"rgba(46,230,200,0.35)" }}/>
          <Node c={C}/><h2 className="m-0 mb-3 uppercase" style={hd2}>{getLabel(data,"experience","Work Experience")}</h2>
          {experience.map((e,i)=>(<div key={i} className="relative mb-4">
            <span style={{ position:"absolute", left:-29, top:4, width:12, height:12, borderRadius:"50%", background:C, boxShadow:`0 0 10px ${C}` }}/>
            <p className="m-0 font-bold text-[11.5pt]" style={{color:"#F2FAFD"}}>{e.role}</p>
            <p className="m-0 text-[9.5pt]" style={{color:C,fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
            <BulletsRender bullets={e.bullets} className="mnh-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#B7CCD9"}}/>
          </div>))}
          <Node c="#0E3A44"/><h2 className="m-0 mb-3 mt-6 uppercase" style={hd2}>{getLabel(data,"education","Education")}</h2>
          {education.map((e,i)=>(<div key={i} className="relative mb-2.5">
            <span style={{ position:"absolute", left:-29, top:4, width:12, height:12, borderRadius:"50%", border:`3px solid ${C}`, background:"#081420" }}/>
            <p className="m-0 font-bold text-[10.5pt]" style={{color:"#F2FAFD"}}>{e.degree}</p>
            <p className="m-0 text-[9.5pt]" style={{color:"#7C95A6"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p>
          </div>))}
          {certifications.length>0 && <><Node c={C}/><h2 className="m-0 mb-3 mt-6 uppercase" style={hd2}>{getLabel(data,"certifications","Certifications")}</h2>
          <ul className="mnh-b" style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#B7CCD9"}}>{certifications.map((c,i)=>(<li key={i}><b style={{color:"#F2FAFD"}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul></>}
        </div>
      </main>
      <style>{`.mnh-b li{position:relative;padding-left:14px;margin-bottom:2px}.mnh-b li:before{content:"";position:absolute;left:0;top:6px;width:6px;height:6px;border-radius:50%;background:#2EE6C8}`}</style>
    </article>
  );
}
const hd2: React.CSSProperties = { fontSize:"14pt", fontWeight:800, letterSpacing:"0.06em", color:"#F2FAFD" };
function Node({ c }: { c:string }){ return <span style={{ display:"none" }}/>; }
const Bracket = ({ style }: { style: React.CSSProperties }) => (<svg viewBox="0 0 80 80" style={{position:"absolute",width:64,height:64,...style}} fill="none" stroke="#2EE6C8" strokeWidth="6"><path d="M4 28 V10 a6 6 0 0 1 6-6 H28 M52 4 H70 a6 6 0 0 1 6 6 V28" strokeLinecap="round" opacity="0"/><path d="M6 30 V12 a6 6 0 0 1 6-6 h18" strokeLinecap="round"/></svg>);
function SecL({ t, c, children }: { t:string; c:string; children:React.ReactNode }){ return <section className="mt-5"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"12.5pt",fontWeight:800,letterSpacing:"0.08em",color:"#F2FAFD"}}>{t}</h2>{children}</section>; }
