// DentalClean — Dentists, Hygienists, Orthodontists, Dental Assistants
// White + clinical teal/mint + tooth motif + credential pills. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function DentalClean({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const creds = certifications.slice(0,4);
  return (
    <article className="w-[794px] min-h-[1123px] bg-white relative overflow-hidden print:shadow-none"
      style={{ color:"#173A3E", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <header className="relative grid items-center" style={{ gridTemplateColumns:"126px 1fr", gap:22, padding:"40px 48px 24px", background:"linear-gradient(120deg,#E8F7F5 0%,#F0FBF8 100%)" }}>
        <div style={{ width:122, height:122, borderRadius:"50%", padding:4, background:"linear-gradient(135deg,#16A9A0,#5AD0C4)" }}>
          <div style={{ width:"100%", height:"100%", borderRadius:"50%", background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", color:"#16A9A0", fontWeight:700, fontSize:"36pt" }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}/> : initials(basics.fullName)}
          </div>
        </div>
        <div>
          {creds.length>0 && <div className="flex flex-wrap gap-1.5 mb-1.5">{creds.map((c,i)=>(<span key={i} style={{padding:"2px 10px",fontSize:"8pt",fontWeight:700,color:"#0C6B64",background:"#fff",border:"1px solid #9FE0D8",borderRadius:9999}}>{c.name}</span>))}</div>}
          <h1 className="m-0" style={{ fontWeight:800, fontSize:"31pt", lineHeight:1.05, letterSpacing:"-0.01em", color:"#103A37" }}>{basics.fullName}</h1>
          <p className="m-0 mt-1 uppercase" style={{ fontSize:"11.5pt", color:"#16A9A0", fontWeight:700, letterSpacing:"0.16em" }}>{basics.role}</p>
          <p className="m-0 mt-2 text-[9.5pt]" style={{ color:"#5A7C78" }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   ·   ")}</p>
        </div>
        <svg viewBox="0 0 40 44" style={{ position:"absolute", right:40, top:26, width:38, height:42, opacity:0.5 }} fill="none" stroke="#16A9A0" strokeWidth="2"><path d="M20 6 C12 0 4 4 4 16 C4 26 8 42 12 42 C16 42 16 30 20 30 C24 30 24 42 28 42 C32 42 36 26 36 16 C36 4 28 0 20 6 Z"/></svg>
      </header>
      <div className="grid gap-9" style={{ padding:"24px 48px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")}><RichTextRender html={basics.summary} style={{color:"#3D5C58",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Clinical Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]" style={{color:"#103A37"}}>{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:"#16A9A0",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="dc-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#3D5C58"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:"#103A37"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#5A7C78"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Clinical Skills")}>
            <div className="grid gap-y-1 text-[10pt]" style={{color:"#27433F"}}>{skills.map((s,i)=>(<div key={i}><span style={{color:"#16A9A0",fontWeight:700,marginRight:6}}>✚</span>{s}</div>))}</div>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Licenses & Certs")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#3D5C58"}}>{certifications.map((c,i)=>(<li key={i} style={{padding:"3px 0",borderBottom:i<certifications.length-1?"1px solid #E0EFEC":"0"}}><b style={{color:"#103A37"}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")}>
            <div className="text-[9.5pt]" style={{color:"#3D5C58"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.dc-b li{position:relative;padding-left:15px;margin-bottom:2px}.dc-b li:before{content:"";position:absolute;left:0;top:6px;width:7px;height:7px;border-radius:50%;background:#16A9A0}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 flex items-center gap-2" style={{fontSize:"12pt",fontWeight:700,color:"#103A37"}}><span style={{width:9,height:9,borderRadius:"50%",background:"#16A9A0"}}/>{t}</h2>{children}</section>; }
