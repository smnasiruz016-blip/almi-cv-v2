// MuseumCurator — Curators, Gallery Managers, Conservators, Art Historians
// Gallery white + stone + plinth-frame photo + classical serif + exhibit labels. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function MuseumCurator({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], projects = [] } = data;
  const S = "#6E6256", K = "#26211C";
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#F7F5F1", color:"#3A352F", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.6 }}>
      <header className="relative" style={{ padding:"50px 56px 24px", display:"grid", gridTemplateColumns:"1fr 180px", gap:24, alignItems:"start" }}>
        <div>
          <p className="m-0 mb-2 uppercase text-[8.5pt]" style={{ color:S, letterSpacing:"0.38em", fontWeight:600 }}>Collections · Exhibitions · Research</p>
          <h1 className="m-0" style={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:600, fontSize:"40pt", lineHeight:0.98, color:K }}>{basics.fullName}</h1>
          <p className="m-0 mt-2 uppercase" style={{ fontSize:"11.5pt", color:S, letterSpacing:"0.24em", fontWeight:600 }}>{basics.role}</p>
          <p className="m-0 mt-3 text-[9pt]" style={{ color:"#857A6E" }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   ·   ")}</p>
        </div>
        <div style={{ justifySelf:"end", textAlign:"center" }}>
          <div style={{ width:160, height:190, overflow:"hidden", background:"#E8E2D8", border:`1px solid #C9BFB2`, boxShadow:"0 10px 24px rgba(60,50,40,0.14)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <span style={{color:S,fontWeight:600,fontSize:"40pt",fontFamily:'"Cormorant Garamond",serif'}}>{initials(basics.fullName)}</span>}
          </div>
          <div style={{ width:120, height:10, background:"#D8D0C4", margin:"0 auto", boxShadow:"0 4px 8px rgba(60,50,40,0.15)" }}/>
        </div>
      </header>
      <div style={{ margin:"0 56px", height:1, background:"#C9BFB2" }}/>
      <div className="grid gap-10" style={{ padding:"26px 56px 48px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Curatorial Statement")} s={S} k={K}><RichTextRender html={basics.summary} style={{color:"#52483D",fontSize:"10.5pt",textAlign:"justify"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Appointments")} s={S} k={K}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-semibold text-[12.5pt]" style={{color:K,fontFamily:'"Cormorant Garamond",serif',fontSize:"14pt"}}>{e.role}</p>
              <p className="m-0 italic text-[10pt]" style={{color:S}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="mc-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#52483D"}}/>
            </div>))}
          </Sec>
          {projects.length>0 && <Sec t={getLabel(data,"projects","Selected Exhibitions")} s={S} k={K}>
            {projects.map((p,i)=>(<div key={i} className="mb-2" style={{ borderLeft:`3px solid #C9BFB2`, paddingLeft:12 }}>
              <p className="m-0 font-semibold text-[10.5pt]" style={{color:K}}>{p.name}</p>
              {p.description&&<p className="m-0 text-[9.5pt] italic" style={{color:"#857A6E"}}>{p.description}</p>}
            </div>))}
          </Sec>}
        </div>
        <div>
          <Sec t={getLabel(data,"education","Education")} s={S} k={K}>
            {education.map((e,i)=>(<div key={i} className="mb-2"><p className="m-0 font-semibold text-[11pt]" style={{color:K}}>{e.degree}</p><p className="m-0 text-[9.5pt]" style={{color:"#857A6E"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p></div>))}
          </Sec>
          <Sec t={getLabel(data,"skills","Expertise")} s={S} k={K}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt"}}>{skills.map((s,i)=>(<li key={i} style={{padding:"4px 0",borderBottom:i<skills.length-1?"1px solid #E2DACE":"0",color:"#463F36"}}>{s}</li>))}</ul>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Affiliations")} s={S} k={K}>
            <ul className="mc-b" style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#52483D"}}>{certifications.map((c,i)=>(<li key={i}>{c.name}{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")} s={S} k={K}>
            <p className="m-0 text-[10pt]" style={{color:"#52483D"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(", ")}</p>
          </Sec>}
        </div>
      </div>
      <style>{`.mc-b li{position:relative;padding-left:14px;margin-bottom:2px}.mc-b li:before{content:"—";position:absolute;left:0;color:#A89B8A}`}</style>
    </article>
  );
}
function Sec({ t, s, k, children }: { t:string; s:string; k:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"10.5pt",fontWeight:700,letterSpacing:"0.26em",color:k}}>{t}</h2>{children}</section>; }
