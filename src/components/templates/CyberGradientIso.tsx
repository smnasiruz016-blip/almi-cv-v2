// CyberGradientIso — Cybersecurity Analysts, SecOps (light gradient sidebar)
// Violet→cyan gradient sidebar + iso security line-art + white content cards. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function CyberGradientIso({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const D = "#221B4E";
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#EDF1FA", color:"#2A2750", fontFamily:'"Plus Jakarta Sans","Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55, display:"grid", gridTemplateColumns:"250px 1fr" }}>
      <aside className="relative" style={{ margin:"26px 0 26px 26px", borderRadius:24, background:"linear-gradient(175deg,#8E5CF6 0%,#5C8BF6 55%,#3DE0E8 100%)", color:"#fff", padding:"30px 22px", overflow:"hidden" }}>
        <div aria-hidden>
          <svg viewBox="0 0 60 64" style={{ position:"absolute", left:24, top:26, width:58, height:62, opacity:0.7 }} fill="none" stroke="#fff" strokeWidth="1.6"><rect x="10" y="6" width="40" height="52" rx="4"/><line x1="16" y1="16" x2="44" y2="16"/><line x1="16" y1="24" x2="44" y2="24"/><line x1="16" y1="32" x2="36" y2="32"/></svg>
          <svg viewBox="0 0 50 50" style={{ position:"absolute", right:20, top:96, width:46, height:46, opacity:0.7 }} fill="none" stroke="#fff" strokeWidth="1.6"><rect x="6" y="6" width="38" height="38" rx="6"/><path d="M25 14c-5 5-5 17 0 22M25 14c5 5 5 17 0 22M14 25h22"/></svg>
          <svg viewBox="0 0 44 52" style={{ position:"absolute", left:24, bottom:160, width:42, height:50, opacity:0.75 }} fill="none" stroke="#fff" strokeWidth="1.8"><path d="M22 4 L40 11 V27 C40 39 32 46 22 49 C12 46 4 39 4 27 V11 Z"/><rect x="15" y="22" width="14" height="12" rx="2"/><path d="M18 22v-4a4 4 0 0 1 8 0v4"/></svg>
          <svg viewBox="0 0 60 40" style={{ position:"absolute", right:18, bottom:60, width:58, height:40, opacity:0.75 }} fill="none" stroke="#fff" strokeWidth="1.6"><rect x="6" y="4" width="48" height="26" rx="3"/><path d="M2 36h56"/></svg>
        </div>
        <div className="relative" style={{ marginTop:120, textAlign:"center" }}>
          <div style={{ width:140, height:140, borderRadius:"50%", margin:"0 auto", padding:5, background:"rgba(255,255,255,0.4)", border:"3px solid #fff" }}>
            <div style={{ width:"100%", height:"100%", borderRadius:"50%", overflow:"hidden", background:"#6D5BD0", display:"flex", alignItems:"center", justifyContent:"center" }}>
              {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <span style={{color:"#fff",fontWeight:800,fontSize:"34pt"}}>{initials(basics.fullName)}</span>}
            </div>
          </div>
          <ul style={{ margin:"22px 0 0", padding:0, listStyle:"none", fontSize:"9pt", lineHeight:2, textAlign:"left", color:"rgba(255,255,255,0.95)", wordBreak:"break-word" }}>
            {[basics.email,basics.phone,basics.website,basics.location].filter(Boolean).map((x,i)=>(<li key={i}>{x}</li>))}
          </ul>
        </div>
      </aside>
      <main style={{ padding:"44px 40px 40px 30px" }}>
        <header style={{ marginBottom:16 }}>
          <h1 className="m-0 uppercase" style={{ fontWeight:900, fontSize:"36pt", lineHeight:0.96, letterSpacing:"-0.01em", color:D }}>{basics.fullName}</h1>
          <p className="m-0 mt-1 uppercase" style={{ fontSize:"13pt", fontWeight:800, letterSpacing:"0.08em" }}><span style={{color:"#8E5CF6"}}>{(basics.role||"").split(" ").slice(0,-1).join(" ")} </span><span style={{color:"#3DBFE8"}}>{(basics.role||"").split(" ").slice(-1)[0]}</span></p>
        </header>
        <Card>
          <h2 className="m-0 mb-2 uppercase" style={hd}>{getLabel(data,"experience","Experience")}</h2>
          {experience.map((e,i)=>(<div key={i} className="mb-2.5 last:mb-0">
            <p className="m-0 font-bold text-[10.5pt]" style={{color:D}}>{e.role} <span style={{color:"#8E5CF6"}}>· {e.company}</span></p>
            <p className="m-0 text-[9pt]" style={{color:"#8A87A8"}}>{dateRange(e.startDate,e.endDate,e.current)}</p>
            <BulletsRender bullets={e.bullets} className="cgi-b" style={{margin:"2px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#4A4768"}}/>
          </div>))}
          <h2 className="m-0 mb-2 mt-4 uppercase" style={hd}>{getLabel(data,"skills","Skills")}</h2>
          <div className="grid gap-x-8 gap-y-1 text-[9.5pt]" style={{ gridTemplateColumns:"1fr 1fr", color:"#4A4768" }}>
            {skills.map((s,i)=>(<div key={i}>{i===0?<b style={{color:D}}>{s}</b>:s}</div>))}
          </div>
        </Card>
        <Card>
          <h2 className="m-0 mb-2 uppercase" style={hd}>{getLabel(data,"education","Education")}</h2>
          <div className="grid gap-x-8" style={{ gridTemplateColumns:"1fr 1fr" }}>
            <div>{education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10pt]" style={{color:D}}>{e.degree}</p><p className="m-0 text-[9.5pt]" style={{color:"#4A4768"}}>{e.school}</p><p className="m-0 text-[9pt]" style={{color:"#8A87A8"}}>{e.startDate}{e.endDate?` - ${e.endDate}`:""}</p></div>))}</div>
            <div className="text-[9.5pt]" style={{color:"#4A4768"}}>{languages.length>0 && <p className="m-0">{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</p>}</div>
          </div>
        </Card>
        {certifications.length>0 && <Card>
          <h2 className="m-0 mb-2 uppercase" style={hd}>{getLabel(data,"certifications","Certifications")}</h2>
          <div className="grid gap-x-8" style={{ gridTemplateColumns:"1fr 1fr" }}>
            <div>{certifications.map((c,i)=>(<p key={i} className="m-0 mb-1 text-[9.5pt]"><b style={{color:D}}>{c.name}</b>{c.year?` · ${c.year}`:""}</p>))}</div>
            <div>{certifications.slice(0,3).map((_,i)=>(<div key={i} style={{height:9,borderRadius:5,background:"#DDE3F2",marginBottom:8}}><div style={{height:"100%",borderRadius:5,width:`${88-i*14}%`,background:"linear-gradient(90deg,#8E5CF6,#3DBFE8)"}}/></div>))}</div>
          </div>
        </Card>}
      </main>
      <style>{`.cgi-b li{position:relative;padding-left:13px;margin-bottom:1px}.cgi-b li:before{content:"";position:absolute;left:0;top:6px;width:6px;height:6px;border-radius:2px;background:#8E5CF6}`}</style>
    </article>
  );
}
const hd: React.CSSProperties = { fontSize:"12pt", fontWeight:800, letterSpacing:"0.08em", color:"#221B4E" };
function Card({ children }: { children:React.ReactNode }){ return <div style={{ background:"#fff", borderRadius:16, padding:"18px 20px", marginBottom:16, boxShadow:"0 6px 20px rgba(90,90,160,0.08)" }}>{children}</div>; }
