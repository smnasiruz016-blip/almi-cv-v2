// ChildcarePlayful — Childcare, Early Years, Nannies, Preschool, Au Pairs
// White + soft rainbow pastels + rounded shapes + star/crayon motif. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function ChildcarePlayful({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], interests = [] } = data;
  const pal = ["#FF9AA2","#FFB85C","#FFE066","#8FD9A8","#7EC8E3","#C3AED6"];
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden bg-white print:shadow-none"
      style={{ color:"#4A4458", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <svg viewBox="0 0 794 1123" preserveAspectRatio="none" style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
        <circle cx="60" cy="900" r="36" fill="#FFE066" opacity="0.5"/><circle cx="740" cy="980" r="48" fill="#8FD9A8" opacity="0.4"/><circle cx="120" cy="1010" r="22" fill="#7EC8E3" opacity="0.5"/>
      </svg>
      <header className="relative" style={{ padding:"34px 46px 26px", background:"linear-gradient(120deg,#FFD3DA 0%,#D9E8FF 55%,#DDF3E4 110%)", borderRadius:"0 0 40px 40px" }}>
        <div style={{ display:"grid", gridTemplateColumns: basics.photoUrl?"118px 1fr":"1fr", gap:20, alignItems:"center" }}>
          {basics.photoUrl && <div style={{ width:114, height:114, borderRadius:"50%", overflow:"hidden", border:"5px solid #fff", boxShadow:"0 4px 10px rgba(0,0,0,0.08)" }}><img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>}
          <div>
            <h1 className="m-0" style={{ fontWeight:800, fontSize:"34pt", lineHeight:1, letterSpacing:"-0.01em", color:"#5B4E73" }}>{basics.fullName}</h1>
            <p className="m-0 mt-1" style={{ fontSize:"13pt", color:"#E0709A", fontWeight:700 }}>{basics.role}</p>
            <p className="m-0 mt-2 text-[9pt]" style={{ color:"#6E6880" }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   ·   ")}</p>
          </div>
        </div>
      </header>
      <div className="relative grid gap-9" style={{ padding:"24px 46px 44px", gridTemplateColumns:"1fr 1.5fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","About Me")} c="#E0709A"><RichTextRender html={basics.summary} style={{color:"#5A5468",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"skills","Skills")} c="#3DA56F">
            <div className="flex flex-wrap gap-1.5">{skills.map((s,i)=>(<span key={i} style={{padding:"4px 11px",fontSize:"9.5pt",fontWeight:600,color:"#fff",background:pal[i%pal.length],borderRadius:9999}}>{s}</span>))}</div>
          </Sec>
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")} c="#5B9BD9"><div className="text-[10pt]" style={{color:"#5A5468"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div></Sec>}
          {interests.length>0 && <Sec t={getLabel(data,"interests","Hobbies")} c="#E8943A"><div className="text-[10pt]" style={{color:"#5A5468"}}>{interests.join(" · ")}</div></Sec>}
        </div>
        <div>
          <Sec t={getLabel(data,"experience","Experience")} c="#E0709A">
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]" style={{color:"#5B4E73"}}>{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:"#E0709A",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="cp-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#5A5468"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")} c="#3DA56F">
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:"#5B4E73"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#857F95"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications")} c="#5B9BD9">
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#5A5468"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b style={{color:"#5B4E73"}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
        </div>
      </div>
      <style>{`.cp-b li{position:relative;padding-left:16px;margin-bottom:1px}.cp-b li:before{content:"★";position:absolute;left:0;color:#FFC93C;font-size:8pt;top:1px}`}</style>
    </article>
  );
}
function Sec({ t, c, children }: { t:string; c:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5" style={{fontSize:"12pt",fontWeight:800,color:c,display:"inline-block",borderBottom:`3px solid ${c}`,paddingBottom:2}}>{t}</h2>{children}</section>; }
