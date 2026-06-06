// TravelCompass — Travel agents, Tourism, Flight attendants, Hospitality concierge
// Warm sunset + teal + compass/globe + passport-stamp motifs. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function TravelCompass({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], interests = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden bg-white print:shadow-none"
      style={{ color:"#28333A", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <header className="relative" style={{ padding:"40px 48px 30px", background:"linear-gradient(115deg,#F2994A 0%,#EB5E55 55%,#9B4DCA 110%)", color:"#fff" }}>
        <svg viewBox="0 0 100 100" style={{ position:"absolute", right:38, top:24, width:96, height:96, opacity:0.85 }} fill="none" stroke="#FFF" strokeWidth="2">
          <circle cx="50" cy="50" r="40"/><circle cx="50" cy="50" r="5" fill="#fff"/>
          <polygon points="50,16 58,50 50,46 42,50" fill="#fff"/><polygon points="50,84 42,50 50,54 58,50" fill="rgba(255,255,255,0.5)"/>
          <path d="M16 50h12M72 50h12M50 16v0M50 84v0" />
        </svg>
        <div style={{ display:"grid", gridTemplateColumns:"120px 1fr", gap:20, alignItems:"center" }}>
          <div style={{ width:116, height:116, borderRadius:"50%", overflow:"hidden", background:"rgba(255,255,255,0.25)", border:"3px solid #fff" }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div className="flex items-center justify-center h-full" style={{color:"#fff",fontWeight:700,fontSize:"34pt"}}>{initials(basics.fullName)}</div>}
          </div>
          <div>
            <h1 className="m-0" style={{ fontWeight:800, fontSize:"34pt", lineHeight:1, letterSpacing:"-0.01em" }}>{basics.fullName}</h1>
            <p className="m-0 mt-1 uppercase" style={{ fontSize:"12.5pt", letterSpacing:"0.18em", color:"rgba(255,255,255,0.92)", fontWeight:600 }}>{basics.role}</p>
            <p className="m-0 mt-2 text-[9pt]" style={{ color:"rgba(255,255,255,0.85)" }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   ·   ")}</p>
          </div>
        </div>
      </header>
      <div className="grid gap-9" style={{ padding:"24px 48px 44px", gridTemplateColumns:"1fr 1.5fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","About")}><RichTextRender html={basics.summary} style={{color:"#465058",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"skills","Skills")}>
            {skills.slice(0,8).map((s,i)=>(<div key={i} className="mb-2"><div className="text-[9.5pt]" style={{color:"#28333A"}}>{s}</div><div style={{height:6,marginTop:2,borderRadius:4,background:"#F0E2DA"}}><div style={{height:"100%",borderRadius:4,width:`${90-i*6}%`,background:"linear-gradient(90deg,#F2994A,#EB5E55)"}}/></div></div>))}
          </Sec>
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")}>
            {languages.map((l,i)=>(<div key={i} className="flex items-center justify-between mb-1 text-[10pt]"><span>{l.name}</span><span style={{color:"#13898F",fontWeight:600}}>{l.level}</span></div>))}
          </Sec>}
          {interests.length>0 && <Sec t={getLabel(data,"interests","Destinations")}>
            <div className="flex flex-wrap gap-1.5">{interests.map((x,i)=>(<span key={i} style={{padding:"3px 10px",fontSize:"9pt",fontWeight:600,color:"#13898F",background:"#E2F2F2",borderRadius:9999}}>{x}</span>))}</div>
          </Sec>}
        </div>
        <div>
          <Sec t={getLabel(data,"experience","Experience")}>
            {experience.map((e,i)=>(<div key={i} className="relative mb-4 last:mb-0" style={{ paddingLeft:24 }}>
              <span style={{ position:"absolute", left:0, top:2, width:14, height:14, borderRadius:"50%", border:"3px solid #EB5E55", background:"#fff" }}/>
              {i<experience.length-1 && <span style={{ position:"absolute", left:6, top:18, bottom:-16, borderLeft:"2px dashed #F0C9C0" }}/>}
              <p className="m-0 font-bold text-[11.5pt]">{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:"#EB5E55",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="tc-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#465058"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]">{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#6B767D"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#465058"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
        </div>
      </div>
      <style>{`.tc-b li{position:relative;padding-left:15px;margin-bottom:1px}.tc-b li:before{content:"✈";position:absolute;left:0;color:#F2994A;font-size:8pt;top:1px}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11.5pt",fontWeight:800,letterSpacing:"0.1em",color:"#EB5E55",borderBottom:"2px solid #F7D9D2",paddingBottom:3}}>{t}</h2>{children}</section>; }
