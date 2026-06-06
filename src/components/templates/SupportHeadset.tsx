// SupportHeadset — Customer Support, Call Center, Help Desk, Client Success
// White + friendly teal + coral + chat-bubble/headset motif. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function SupportHeadset({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden bg-white print:shadow-none"
      style={{ color:"#21343A", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55, display:"grid", gridTemplateColumns:"258px 1fr" }}>
      <aside style={{ background:"#0E9094", color:"#E8F7F6", padding:"0 0 30px" }}>
        <div style={{ padding:"34px 26px 22px", textAlign:"center", position:"relative" }}>
          <div style={{ width:158, height:158, borderRadius:"50%", overflow:"hidden", background:"#0B7A7D", border:"4px solid #FFF", margin:"0 auto" }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div className="flex items-center justify-center h-full" style={{color:"#fff",fontWeight:700,fontSize:"38pt"}}>{initials(basics.fullName)}</div>}
          </div>
          <svg viewBox="0 0 40 40" style={{ position:"absolute", right:30, top:34, width:34, height:34 }} fill="none" stroke="#FFCBA4" strokeWidth="2.4"><path d="M8 22v-2a12 12 0 0 1 24 0v2"/><rect x="5" y="22" width="6" height="10" rx="3"/><rect x="29" y="22" width="6" height="10" rx="3"/><path d="M32 32v2a4 4 0 0 1-4 4h-6"/></svg>
        </div>
        <div style={{ padding:"0 26px" }}>
          <SecL t={getLabel(data,"contact","Contact")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",lineHeight:1.9,color:"#D2EEED",wordBreak:"break-word"}}>{[basics.phone,basics.email,basics.website,basics.location].filter(Boolean).map((x,i)=>(<li key={i}>{x}</li>))}</ul>
          </SecL>
          <SecL t={getLabel(data,"skills","Skills")}>
            {skills.slice(0,8).map((s,i)=>(<div key={i} className="mb-1.5"><div className="text-[9.5pt]">{s}</div><div style={{height:6,marginTop:2,borderRadius:4,background:"rgba(255,255,255,0.22)"}}><div style={{height:"100%",borderRadius:4,width:`${92-i*6}%`,background:"#FF8A5B"}}/></div></div>))}
          </SecL>
          {languages.length>0 && <SecL t={getLabel(data,"languages","Languages")}>
            {languages.map((l,i)=>(<div key={i} className="mb-0.5 text-[9.5pt]">{l.name}{l.level?<span style={{color:"#A6DAD8"}}> — {l.level}</span>:null}</div>))}
          </SecL>}
        </div>
      </aside>
      <main style={{ padding:"38px 44px 40px" }}>
        <header className="relative" style={{ marginBottom:18 }}>
          <svg viewBox="0 0 40 30" style={{ position:"absolute", right:0, top:0, width:44, height:33, opacity:0.5 }} fill="#FFD9C2"><path d="M4 2h32a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H16l-8 6v-6H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"/></svg>
          <h1 className="m-0" style={{ fontWeight:800, fontSize:"36pt", lineHeight:1, letterSpacing:"-0.01em", color:"#0E9094" }}>{basics.fullName}</h1>
          <p className="m-0 mt-1 uppercase" style={{ fontSize:"12.5pt", color:"#FF8A5B", letterSpacing:"0.16em", fontWeight:700 }}>{basics.role}</p>
        </header>
        {basics.summary && <Sec t={getLabel(data,"summary","Profile")}><RichTextRender html={basics.summary} style={{color:"#3E5359",fontSize:"10.5pt"}}/></Sec>}
        <Sec t={getLabel(data,"experience","Experience")}>
          {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
            <p className="m-0 font-bold text-[11.5pt]">{e.role}</p>
            <p className="m-0 text-[10pt]" style={{color:"#0E9094",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
            <BulletsRender bullets={e.bullets} className="sh-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#3E5359"}}/>
          </div>))}
        </Sec>
        <Sec t={getLabel(data,"education","Education")}>
          {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]">{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#6B7E84"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
        </Sec>
        {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications")}>
          <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#3E5359"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
        </Sec>}
      </main>
      <style>{`.sh-b li{position:relative;padding-left:16px;margin-bottom:1px}.sh-b li:before{content:"";position:absolute;left:0;top:5px;width:8px;height:8px;border-radius:8px 8px 8px 0;background:#FF8A5B}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11.5pt",fontWeight:800,letterSpacing:"0.1em",color:"#0E9094",borderBottom:"2px solid #CDEAE9",paddingBottom:3}}>{t}</h2>{children}</section>; }
function SecL({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5"><h2 className="m-0 mb-2 uppercase" style={{fontSize:"11pt",fontWeight:800,letterSpacing:"0.1em",color:"#FFCBA4"}}>{t}</h2>{children}</section>; }
