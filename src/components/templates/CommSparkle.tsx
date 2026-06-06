// CommSparkle — Communications, PR, Content Strategists (elegant holographic)
// White + holographic corner gradients + sparkles + bold serif + purple bars. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

const Spark = ({ x, y, s=18, c="#A98BD0" }: { x:number; y:number; s?:number; c?:string }) => (
  <path d={`M${x} ${y-s} C${x+s*0.18} ${y-s*0.18} ${x+s*0.18} ${y-s*0.18} ${x+s} ${y} C${x+s*0.18} ${y+s*0.18} ${x+s*0.18} ${y+s*0.18} ${x} ${y+s} C${x-s*0.18} ${y+s*0.18} ${x-s*0.18} ${y+s*0.18} ${x-s} ${y} C${x-s*0.18} ${y-s*0.18} ${x-s*0.18} ${y-s*0.18} ${x} ${y-s} Z`} fill="none" stroke={c} strokeWidth="1.6"/>
);

export default function CommSparkle({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden bg-white print:shadow-none"
      style={{ color:"#241B2E", fontFamily:'"Fraunces","Cormorant Garamond",serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <svg viewBox="0 0 794 1123" preserveAspectRatio="none" style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
        <defs>
          <radialGradient id="cs1" cx="0%" cy="0%" r="80%"><stop offset="0%" stopColor="#F4B9A8" stopOpacity="0.9"/><stop offset="45%" stopColor="#E5C7E8" stopOpacity="0.7"/><stop offset="100%" stopColor="#C7D8F0" stopOpacity="0"/></radialGradient>
          <radialGradient id="cs2" cx="100%" cy="100%" r="80%"><stop offset="0%" stopColor="#EBD2A0" stopOpacity="0.85"/><stop offset="50%" stopColor="#E5B7D8" stopOpacity="0.55"/><stop offset="100%" stopColor="#C7D8F0" stopOpacity="0"/></radialGradient>
        </defs>
        <rect x="-40" y="-40" width="360" height="320" fill="url(#cs1)"/>
        <rect x="494" y="843" width="360" height="320" fill="url(#cs2)"/>
        <g>{[[150,560],[120,640],[180,690],[700,120],[670,200],[730,170]].map(([x,y],i)=><Spark key={i} x={x} y={y} s={i%2?12:18}/>)}</g>
      </svg>
      <header className="relative grid items-start" style={{ gridTemplateColumns:"1fr 200px", gap:24, padding:"52px 52px 18px" }}>
        <div>
          <h1 className="m-0" style={{ fontWeight:600, fontSize:"46pt", lineHeight:0.98, letterSpacing:"-0.01em", color:"#1F1729" }}>{firstName(basics.fullName)}</h1>
          <h1 className="m-0" style={{ fontWeight:600, fontSize:"46pt", lineHeight:0.98, letterSpacing:"-0.01em", color:"#1F1729" }}>{lastName(basics.fullName)}</h1>
          <p className="m-0 mt-1 uppercase" style={{ fontSize:"12pt", color:"#8A6BB0", letterSpacing:"0.16em", fontFamily:'"Inter",sans-serif', fontWeight:600 }}>{basics.role}</p>
        </div>
        <div style={{ width:180, height:180, borderRadius:"50%", overflow:"hidden", background:"#E8DCEC", justifySelf:"end" }}>
          {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div className="flex items-center justify-center h-full" style={{color:"#8A6BB0",fontWeight:600,fontSize:"40pt"}}>{initials(basics.fullName)}</div>}
        </div>
      </header>
      <div className="relative grid gap-9" style={{ padding:"16px 52px 46px", gridTemplateColumns:"1fr 1.3fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","À propos de moi")}><RichTextRender html={basics.summary} style={{color:"#473C53",fontSize:"10.5pt",fontFamily:'"Inter",sans-serif'}}/></Sec>}
          <Sec t={getLabel(data,"education","Formations")}>
            {education.map((e,i)=>(<div key={i} className="mb-2.5"><p className="m-0 font-bold text-[11pt]" style={{fontFamily:'"Inter",sans-serif'}}>{e.degree}</p><p className="m-0 text-[9.5pt]" style={{color:"#8A6BB0",fontFamily:'"Inter",sans-serif'}}>{e.startDate}{e.endDate?` – ${e.endDate}`:""}</p><p className="m-0 text-[10pt]" style={{color:"#6C627A",fontFamily:'"Inter",sans-serif'}}>{e.school}</p></div>))}
          </Sec>
          <Sec t={getLabel(data,"skills","Compétences")}>
            {skills.slice(0,7).map((s,i)=>(<div key={i} className="mb-2" style={{fontFamily:'"Inter",sans-serif'}}><div className="text-[9.5pt]">{s}</div><div style={{height:7,marginTop:3,borderRadius:5,background:"#ECE4F0"}}><div style={{height:"100%",borderRadius:5,width:`${90-i*6}%`,background:"#9B7BC4"}}/></div></div>))}
          </Sec>
          {languages.length>0 && <Sec t={getLabel(data,"languages","Langues")}><div className="text-[10pt]" style={{color:"#473C53",fontFamily:'"Inter",sans-serif'}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div></Sec>}
        </div>
        <div>
          <div className="text-[9.5pt] mb-5" style={{ color:"#473C53", fontFamily:'"Inter",sans-serif', lineHeight:2 }}>
            {[basics.phone&&["Téléphone",basics.phone],basics.email&&["E-mail",basics.email],basics.website&&["Site internet",basics.website],basics.location&&["Adresse",basics.location]].filter((p): p is [string,string] => Boolean(p)).map((p,i)=>(<div key={i} className="flex gap-2"><span style={{color:"#8A6BB0",fontWeight:700,width:90,flexShrink:0}}>{p[0]}</span><span>{p[1]}</span></div>))}
          </div>
          <Sec t={getLabel(data,"experience","Expériences professionnelles")}>
            {experience.map((e,i)=>(<div key={i} className="relative mb-4 last:mb-0" style={{ paddingLeft:24, fontFamily:'"Inter",sans-serif' }}>
              <span style={{ position:"absolute", left:0, top:1 }}><svg width="16" height="16" viewBox="0 0 20 20"><Spark x={10} y={10} s={8} c="#9B7BC4"/></svg></span>
              {i<experience.length-1 && <span style={{ position:"absolute", left:7, top:20, bottom:-16, borderLeft:"1px dotted #C9B8DC" }}/>}
              <p className="m-0 uppercase text-[9pt]" style={{color:"#8A6BB0",fontWeight:700,letterSpacing:"0.06em"}}>{dateRange(e.startDate,e.endDate,e.current)}</p>
              <p className="m-0 font-bold text-[11pt]">{e.role}</p>
              <p className="m-0 uppercase text-[9pt]" style={{color:"#6C627A",letterSpacing:"0.04em"}}>{e.company}</p>
              <BulletsRender bullets={e.bullets} className="cms-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#473C53"}}/>
            </div>))}
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications")}><ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#473C53",fontFamily:'"Inter",sans-serif'}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul></Sec>}
        </div>
      </div>
      <style>{`.cms-b li{position:relative;padding-left:13px;margin-bottom:1px}.cms-b li:before{content:"";position:absolute;left:0;top:6px;width:5px;height:5px;border-radius:50%;background:#9B7BC4}`}</style>
    </article>
  );
}
function firstName(n:string){ const p=(n||"").trim().split(/\s+/); return p.slice(0,-1).join(" ")||p[0]||""; }
function lastName(n:string){ const p=(n||"").trim().split(/\s+/); return p.length>1?p[p.length-1]:""; }
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5" style={{fontSize:"17pt",fontWeight:600,color:"#1F1729"}}>{t}</h2>{children}</section>; }
