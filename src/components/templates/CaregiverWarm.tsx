// CaregiverWarm — Caregivers, Home Health Aides, Elderly Care, Personal Support
// Soft rose + sage + warm cream + heart-hand motif. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function CaregiverWarm({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#FCF6F2", color:"#4A3F42", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55, display:"grid", gridTemplateColumns:"256px 1fr" }}>
      <aside style={{ background:"#C98A8E", color:"#FFF6F3", padding:"0 0 30px" }}>
        <div style={{ padding:"34px 26px 22px", textAlign:"center", position:"relative" }}>
          <div style={{ width:158, height:158, borderRadius:"50%", overflow:"hidden", background:"#B97478", border:"4px solid #FFF", margin:"0 auto" }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div className="flex items-center justify-center h-full" style={{color:"#fff",fontWeight:700,fontSize:"38pt"}}>{initials(basics.fullName)}</div>}
          </div>
          <svg viewBox="0 0 40 38" style={{ position:"absolute", right:30, top:34, width:34, height:32 }} fill="#F4D2CE"><path d="M20 36C20 36 4 26 4 14A9 9 0 0 1 20 9A9 9 0 0 1 36 14C36 26 20 36 20 36Z"/></svg>
        </div>
        <div style={{ padding:"0 26px" }}>
          <SecL t={getLabel(data,"contact","Contact")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",lineHeight:1.9,color:"#FBE6E1",wordBreak:"break-word"}}>{[basics.phone,basics.email,basics.website,basics.location].filter(Boolean).map((x,i)=>(<li key={i}>{x}</li>))}</ul>
          </SecL>
          <SecL t={getLabel(data,"skills","Skills")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",lineHeight:1.7,color:"#FBE6E1"}}>{skills.map((s,i)=>(<li key={i} className="flex items-start gap-2 mb-0.5"><span style={{color:"#F4D2CE"}}>♥</span>{s}</li>))}</ul>
          </SecL>
          {languages.length>0 && <SecL t={getLabel(data,"languages","Languages")}>
            {languages.map((l,i)=>(<div key={i} className="mb-0.5 text-[9.5pt]">{l.name}{l.level?<span style={{color:"#E8B7B2"}}> — {l.level}</span>:null}</div>))}
          </SecL>}
          {certifications.length>0 && <SecL t={getLabel(data,"certifications","Certifications")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9pt",lineHeight:1.6,color:"#FBE6E1"}}>{certifications.map((c,i)=>(<li key={i}>{c.name}{c.year?` (${c.year})`:""}</li>))}</ul>
          </SecL>}
        </div>
      </aside>
      <main style={{ padding:"38px 44px 40px" }}>
        <header style={{ marginBottom:18 }}>
          <h1 className="m-0" style={{ fontWeight:800, fontSize:"35pt", lineHeight:1, letterSpacing:"-0.01em", color:"#9C5D62" }}>{basics.fullName}</h1>
          <p className="m-0 mt-1 uppercase" style={{ fontSize:"12pt", color:"#7C9474", letterSpacing:"0.16em", fontWeight:600 }}>{basics.role}</p>
        </header>
        {basics.summary && <Sec t={getLabel(data,"summary","About Me")}><RichTextRender html={basics.summary} style={{color:"#5C5054",fontSize:"10.5pt"}}/></Sec>}
        <Sec t={getLabel(data,"experience","Experience")}>
          {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
            <p className="m-0 font-bold text-[11.5pt]" style={{color:"#4A3F42"}}>{e.role}</p>
            <p className="m-0 text-[10pt]" style={{color:"#7C9474",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
            <BulletsRender bullets={e.bullets} className="cw-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#5C5054"}}/>
          </div>))}
        </Sec>
        <Sec t={getLabel(data,"education","Education")}>
          {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]">{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#8A7E81"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
        </Sec>
      </main>
      <style>{`.cw-b li{position:relative;padding-left:15px;margin-bottom:1px}.cw-b li:before{content:"♥";position:absolute;left:0;color:#C98A8E;font-size:7pt;top:2px}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11.5pt",fontWeight:800,letterSpacing:"0.1em",color:"#9C5D62",borderBottom:"2px solid #EAD3CF",paddingBottom:3}}>{t}</h2>{children}</section>; }
function SecL({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5"><h2 className="m-0 mb-2 uppercase" style={{fontSize:"11pt",fontWeight:800,letterSpacing:"0.1em",color:"#FBE6E1"}}>{t}</h2>{children}</section>; }
