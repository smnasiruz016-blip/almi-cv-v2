// NeuroCleanLight — Neurologists, Physicians, Clinical Researchers (light clinical)
// Ice white card + gradient photo ring + pale blue dot timeline + publications. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function NeuroCleanLight({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], projects = [] } = data;
  const N = "#16275E", B = "#5B9BE8";
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#E9EEF5", color:"#2A3550", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <span aria-hidden style={{ position:"absolute", right:-40, top:-40, width:170, height:170, borderRadius:"50%", background:"#BBD4F0", opacity:0.7 }}/>
      <span aria-hidden style={{ position:"absolute", left:-30, bottom:120, width:120, height:120, borderRadius:"50%", background:"#C6DCF2", opacity:0.7 }}/>
      <div className="relative grid" style={{ margin:"40px 44px", background:"#fff", boxShadow:"0 16px 44px rgba(80,110,170,0.16)", gridTemplateColumns:"250px 1fr" }}>
        <aside style={{ background:"#F4F8FC", padding:"36px 26px" }}>
          <div style={{ width:160, height:160, borderRadius:"50%", margin:"0 auto", padding:6, background:"conic-gradient(#5B9BE8,#B89CF6,#5B9BE8)" }}>
            <div style={{ width:"100%", height:"100%", borderRadius:"50%", overflow:"hidden", background:"#E2E9F2", border:"5px solid #fff", display:"flex", alignItems:"center", justifyContent:"center" }}>
              {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <span style={{color:N,fontWeight:800,fontSize:"36pt"}}>{initials(basics.fullName)}</span>}
            </div>
          </div>
          <ul style={{ margin:"24px 0 0", padding:0, listStyle:"none", fontSize:"9.5pt", lineHeight:2, color:"#4A5A78", wordBreak:"break-word" }}>
            {[basics.email,basics.phone,basics.location,basics.website,basics.linkedIn].filter(Boolean).map((x,i)=>(<li key={i} className="flex items-start gap-2"><span style={{color:B}}>◍</span>{x}</li>))}
          </ul>
          <h2 className="m-0 mt-6 mb-2.5 uppercase" style={{ fontSize:"15pt", fontWeight:800, color:N }}>{getLabel(data,"skills","Skills")}</h2>
          {skills.slice(0,6).map((s,i)=>(<div key={i} className="mb-2.5"><div className="text-[9pt] mb-1" style={{color:"#4A5A78"}}>{s}</div><div style={{height:14,borderRadius:9999,background:"#E2EBF5"}}><div style={{height:"100%",borderRadius:9999,width:`${90-i*8}%`,background:"linear-gradient(90deg,#7EB8F0,#4D8BE8)"}}/></div></div>))}
          {languages.length>0 && <p className="m-0 mt-4 text-[9.5pt]" style={{color:"#4A5A78"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</p>}
        </aside>
        <main style={{ padding:"40px 38px 36px" }}>
          <header style={{ marginBottom:18, borderBottom:"1px solid #E2E9F2", paddingBottom:16 }}>
            <h1 className="m-0 uppercase" style={{ fontWeight:800, fontSize:"30pt", lineHeight:1, letterSpacing:"-0.005em", color:N }}>{basics.fullName}</h1>
            <p className="m-0 mt-1 uppercase" style={{ fontSize:"12.5pt", color:B, fontWeight:700, letterSpacing:"0.14em" }}>{basics.role}</p>
          </header>
          {basics.summary && <Sec t={getLabel(data,"summary","About Me")} c={N}><RichTextRender html={basics.summary} style={{color:"#4A5A78",fontSize:"10pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experience")} c={N}>
            {experience.map((e,i)=>(<div key={i} className="relative mb-3 last:mb-0" style={{ paddingLeft:20 }}>
              <span style={{ position:"absolute", left:0, top:5, width:9, height:9, borderRadius:"50%", background:B }}/>
              {i<experience.length-1 && <span style={{ position:"absolute", left:3.5, top:18, bottom:-14, width:2, background:"#D5E2F0" }}/>}
              <p className="m-0 font-bold text-[10.5pt]" style={{color:N}}>{e.role}</p>
              <p className="m-0 text-[9.5pt]" style={{color:B,fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="ncl-b" style={{margin:"2px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#4A5A78"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")} c={N}>
            {education.map((e,i)=>(<p key={i} className="m-0 mb-1 text-[10pt]" style={{color:"#4A5A78"}}><b style={{color:N}}>{e.degree}</b>, {e.school}{e.endDate?`, ${e.endDate}`:""}</p>))}
          </Sec>
          {projects.length>0 && <Sec t={getLabel(data,"projects","Publications")} c={N}>
            <ul className="ncl-b" style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#4A5A78"}}>{projects.map((p,i)=>(<li key={i}><b style={{color:N}}>{p.name}</b>{p.description?` — ${p.description}`:""}</li>))}</ul>
          </Sec>}
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Board Certifications")} c={N}>
            <p className="m-0 text-[9.5pt]" style={{color:"#4A5A78"}}>{certifications.map(c=>`${c.name}${c.year?` (${c.year})`:""}`).join("  ·  ")}</p>
          </Sec>}
        </main>
      </div>
      <style>{`.ncl-b li{position:relative;padding-left:13px;margin-bottom:2px}.ncl-b li:before{content:"";position:absolute;left:0;top:6px;width:6px;height:6px;border-radius:50%;background:#5B9BE8}`}</style>
    </article>
  );
}
function Sec({ t, c, children }: { t:string; c:string; children:React.ReactNode }){ return <section className="mb-4 last:mb-0"><h2 className="m-0 mb-2 uppercase" style={{fontSize:"13pt",fontWeight:800,letterSpacing:"0.02em",color:c}}>{t}</h2>{children}</section>; }
