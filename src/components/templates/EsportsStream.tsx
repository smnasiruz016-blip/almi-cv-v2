// EsportsStream — Esports players, Streamers, Casters, Gaming community managers
// Near-black + electric violet/cyan + angular HUD frame + stat tiles. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function EsportsStream({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], awards = [] } = data;
  const V = "#9B5CFF", C = "#3DE8F5";
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#0C0C14", color:"#DCD8EC", fontFamily:'"Plus Jakarta Sans","Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5 }}>
      <div aria-hidden style={{ position:"absolute", inset:0, pointerEvents:"none", background:"radial-gradient(60% 40% at 20% 0%, rgba(155,92,255,0.25), transparent 70%), radial-gradient(50% 35% at 90% 10%, rgba(61,232,245,0.18), transparent 70%)" }}/>
      <header className="relative" style={{ padding:"44px 48px 20px", display:"grid", gridTemplateColumns: basics.photoUrl?"130px 1fr":"1fr", gap:22, alignItems:"center" }}>
        {basics.photoUrl && <div style={{ width:124, height:124, clipPath:"polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)", background:`linear-gradient(135deg,${V},${C})`, padding:4, display:"flex" }}>
          <div style={{ flex:1, clipPath:"polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)", overflow:"hidden" }}><img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>
        </div>}
        <div>
          <p className="m-0 mb-1 text-[8.5pt] uppercase" style={{ color:C, letterSpacing:"0.3em", fontWeight:700 }}>● LIVE</p>
          <h1 className="m-0 uppercase" style={{ fontWeight:900, fontSize:"38pt", lineHeight:0.92, letterSpacing:"-0.01em", color:"#F4F2FF", textShadow:`0 0 20px rgba(155,92,255,0.6)` }}>{basics.fullName}</h1>
          <p className="m-0 mt-1 uppercase" style={{ fontSize:"12.5pt", color:V, fontWeight:800, letterSpacing:"0.16em" }}>{basics.role}</p>
          <p className="m-0 mt-2 text-[8.5pt]" style={{ color:"#8A86A4" }}>{[basics.email,basics.website,basics.location].filter(Boolean).join("   ·   ")}</p>
        </div>
      </header>
      {awards.length>0 && <div className="relative grid gap-3" style={{ padding:"10px 48px 0", gridTemplateColumns:`repeat(${Math.min(awards.length,4)},1fr)` }}>
        {awards.slice(0,4).map((a,i)=>(<div key={i} style={{ padding:"10px 12px", background:"rgba(155,92,255,0.1)", border:`1px solid rgba(155,92,255,0.35)`, clipPath:"polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)" }}>
          <div style={{ fontWeight:900, fontSize:"15pt", lineHeight:1, color:C }}>{a.title}</div>
          {a.issuer&&<div className="text-[7.5pt] mt-1 uppercase" style={{ color:"#8A86A4", letterSpacing:"0.1em" }}>{a.issuer}</div>}
        </div>))}
      </div>}
      <div className="relative grid gap-7" style={{ padding:"22px 48px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Player Bio")} v={V}><RichTextRender html={basics.summary} style={{color:"#AFA9C8",fontSize:"10pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Career")} v={V}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11pt]" style={{color:"#F4F2FF"}}>{e.role}</p>
              <p className="m-0 text-[9.5pt]" style={{color:C,fontWeight:700}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="es-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#AFA9C8"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")} v={V}>
            {education.map((e,i)=>(<p key={i} className="m-0 mb-1 text-[10pt]" style={{color:"#AFA9C8"}}><b style={{color:"#F4F2FF"}}>{e.degree}</b>, {e.school}{e.endDate?` · ${e.endDate}`:""}</p>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Loadout")} v={V}>
            <div className="flex flex-wrap gap-1.5">{skills.map((s,i)=>(<span key={i} style={{padding:"4px 11px",fontSize:"9pt",fontWeight:700,color:i%2?C:V,border:`1px solid ${i%2?"rgba(61,232,245,0.4)":"rgba(155,92,255,0.4)"}`,borderRadius:6}}>{s}</span>))}</div>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Achievements")} v={V}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#AFA9C8"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><span style={{color:C}}>🏆</span> {c.name}{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")} v={V}>
            <div className="text-[9.5pt]" style={{color:"#AFA9C8"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.es-b li{position:relative;padding-left:14px;margin-bottom:1px}.es-b li:before{content:"▸";position:absolute;left:0;color:#3DE8F5}`}</style>
    </article>
  );
}
function Sec({ t, v, children }: { t:string; v:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11pt",fontWeight:900,letterSpacing:"0.14em",color:v}}>{t}</h2>{children}</section>; }
