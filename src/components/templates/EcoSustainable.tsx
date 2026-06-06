// EcoSustainable — Environmental, Sustainability, ESG, Conservation, NGO
// Warm paper + forest/leaf green + organic leaf motifs. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

const Leaf = ({ s=22, c="#7BA05B" }: { s?:number; c?:string }) => (
  <svg viewBox="0 0 24 24" width={s} height={s} fill={c}><path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14Z"/><path d="M5 19C9 13 13 11 17 9" stroke="#F4F1E8" strokeWidth="1.2" fill="none"/></svg>
);

export default function EcoSustainable({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], interests = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#F5F2E9", color:"#2E3A28", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55, display:"grid", gridTemplateColumns:"260px 1fr" }}>
      <aside style={{ background:"#34492C", color:"#E6EEDC", padding:"0 0 30px" }}>
        <div style={{ padding:"34px 26px 24px", textAlign:"center", position:"relative" }}>
          <div style={{ width:160, height:160, borderRadius:"50%", overflow:"hidden", background:"#4C6440", border:"4px solid #A7C188", margin:"0 auto" }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div className="flex items-center justify-center h-full" style={{color:"#CDE0B5",fontWeight:700,fontSize:"38pt"}}>{initials(basics.fullName)}</div>}
          </div>
          <span style={{ position:"absolute", left:30, top:30 }}><Leaf s={26} c="#A7C188"/></span>
        </div>
        <div style={{ padding:"0 26px" }}>
          <SecL t={getLabel(data,"contact","Contact")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",lineHeight:1.9,color:"#CFE0BC",wordBreak:"break-word"}}>{[basics.phone,basics.email,basics.website,basics.location].filter(Boolean).map((x,i)=>(<li key={i}>{x}</li>))}</ul>
          </SecL>
          <SecL t={getLabel(data,"skills","Skills")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",lineHeight:1.7,color:"#CFE0BC"}}>{skills.map((s,i)=>(<li key={i} className="flex items-start gap-2 mb-0.5"><span style={{color:"#A7C188"}}>❧</span>{s}</li>))}</ul>
          </SecL>
          {languages.length>0 && <SecL t={getLabel(data,"languages","Languages")}>
            {languages.map((l,i)=>(<div key={i} className="mb-0.5 text-[9.5pt]">{l.name}{l.level?<span style={{color:"#9DB683"}}> — {l.level}</span>:null}</div>))}
          </SecL>}
          {interests.length>0 && <SecL t={getLabel(data,"interests","Interests")}>
            <div className="text-[9.5pt]" style={{color:"#CFE0BC"}}>{interests.join(" · ")}</div>
          </SecL>}
        </div>
      </aside>
      <main style={{ padding:"38px 44px 40px" }}>
        <header className="relative" style={{ marginBottom:18 }}>
          <span style={{ position:"absolute", right:0, top:-6 }}><Leaf s={34} c="#C3D6A6"/></span>
          <h1 className="m-0" style={{ fontWeight:800, fontSize:"36pt", lineHeight:1, letterSpacing:"-0.01em", color:"#2E3A28" }}>{basics.fullName}</h1>
          <p className="m-0 mt-1 uppercase" style={{ fontSize:"12.5pt", color:"#5E7A47", letterSpacing:"0.16em", fontWeight:600 }}>{basics.role}</p>
        </header>
        {basics.summary && <Sec t={getLabel(data,"summary","Profile")}><RichTextRender html={basics.summary} style={{color:"#46543C",fontSize:"10.5pt"}}/></Sec>}
        <Sec t={getLabel(data,"experience","Experience")}>
          {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
            <p className="m-0 font-bold text-[11.5pt]">{e.role}</p>
            <p className="m-0 text-[10pt]" style={{color:"#5E7A47",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
            <BulletsRender bullets={e.bullets} className="eco-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#46543C"}}/>
          </div>))}
        </Sec>
        <Sec t={getLabel(data,"education","Education")}>
          {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]">{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#6B7A5C"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
        </Sec>
        {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications")}>
          <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#46543C"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
        </Sec>}
      </main>
      <style>{`.eco-b li{position:relative;padding-left:15px;margin-bottom:1px}.eco-b li:before{content:"";position:absolute;left:0;top:6px;width:7px;height:7px;border-radius:0 50% 50% 50%;background:#7BA05B}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11.5pt",fontWeight:800,letterSpacing:"0.1em",color:"#34492C",borderBottom:"2px solid #C3D6A6",paddingBottom:3}}>{t}</h2>{children}</section>; }
function SecL({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5"><h2 className="m-0 mb-2 uppercase" style={{fontSize:"11pt",fontWeight:800,letterSpacing:"0.1em",color:"#A7C188"}}>{t}</h2>{children}</section>; }
