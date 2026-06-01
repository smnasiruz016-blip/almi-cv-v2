// NurseVitalSigns — Nurses, NPs, Caregivers, Allied Health (graphical caring)
// White + medical teal/green + ECG heartbeat divider + credential pills. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function NurseVitalSigns({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const creds = certifications.slice(0,4);
  return (
    <article className="w-[794px] min-h-[1123px] bg-white relative overflow-hidden print:shadow-none"
      style={{ color:"#193A36", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <header className="relative grid items-center" style={{ gridTemplateColumns:"132px 1fr", gap:22, padding:"40px 48px 22px", background:"linear-gradient(120deg,#EAF7F2 0%,#E2F1FB 100%)" }}>
        <div style={{ width:128, height:128, borderRadius:"50%", padding:4, background:"linear-gradient(135deg,#2BB89A,#3FA9F5)" }}>
          <div style={{ width:"100%", height:"100%", borderRadius:"50%", background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", color:"#2BB89A", fontWeight:700, fontSize:"38pt" }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}/> : initials(basics.fullName)}
          </div>
        </div>
        <div>
          {creds.length>0 && <div className="flex flex-wrap gap-1.5 mb-1.5">{creds.map((c,i)=>(<span key={i} style={{padding:"2px 10px",fontSize:"8pt",fontWeight:700,color:"#0E6B5A",background:"#fff",border:"1px solid #9FE0CE",borderRadius:9999}}>{c.name}</span>))}</div>}
          <h1 className="m-0" style={{ fontWeight:800, fontSize:"31pt", lineHeight:1.05, letterSpacing:"-0.01em", color:"#103A33" }}>{basics.fullName}</h1>
          <p className="m-0 mt-1 uppercase" style={{ fontSize:"11.5pt", color:"#2BB89A", fontWeight:700, letterSpacing:"0.16em" }}>{basics.role}</p>
          <p className="m-0 mt-2 text-[9.5pt]" style={{ color:"#5A7C76" }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   ·   ")}</p>
        </div>
      </header>
      <svg viewBox="0 0 794 26" preserveAspectRatio="none" style={{ display:"block", width:"100%", height:22 }}>
        <path d="M0 13 H300 l10 -10 l10 22 l12 -30 l12 30 l10 -12 H450 l8 -6 l8 12 H794" fill="none" stroke="#2BB89A" strokeWidth="2"/>
      </svg>
      <div className="grid gap-9" style={{ padding:"22px 48px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")}><RichTextRender html={basics.summary} style={{color:"#3D5C56",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Clinical Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]" style={{color:"#103A33"}}>{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:"#2BB89A",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="nvs-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#3D5C56"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:"#103A33"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#5A7C76"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Clinical Skills")}>
            <div className="grid gap-y-1 text-[10pt]" style={{color:"#27433E"}}>{skills.map((s,i)=>(<div key={i}><span style={{color:"#2BB89A",fontWeight:700,marginRight:6}}>+</span>{s}</div>))}</div>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Licenses & Certs")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#3D5C56"}}>{certifications.map((c,i)=>(<li key={i} style={{padding:"3px 0",borderBottom:i<certifications.length-1?"1px solid #E0EFEB":"0"}}><b style={{color:"#103A33"}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")}>
            <div className="text-[9.5pt]" style={{color:"#3D5C56"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.nvs-b li{position:relative;padding-left:15px;margin-bottom:2px}.nvs-b li:before{content:"";position:absolute;left:0;top:6px;width:7px;height:7px;border-radius:50%;background:#3FA9F5}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 flex items-center gap-2" style={{fontSize:"12pt",fontWeight:700,color:"#103A33"}}><span style={{width:9,height:9,borderRadius:"50%",background:"#2BB89A"}}/>{t}</h2>{children}</section>; }
