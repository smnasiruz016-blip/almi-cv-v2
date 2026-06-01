// PhotographyGallery — Photographers, Videographers, Cinematographers, Visual Artists
// Charcoal gallery wall + filmstrip motif + serif display + aperture photo ring.
"use client";
import React from "react";
import { TemplateProps, dateRange, RichTextRender, BulletsRender, getLabel, initials } from "./types";

export default function PhotographyGallery({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], projects = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#16161A", color:"#E8E4DC", fontFamily:'"Cormorant Garamond","Inter",serif', fontSize:"11pt", lineHeight:1.55 }}>
      {/* filmstrip top */}
      <div style={{ height:26, background:"#0C0C0E", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 8px" }}>
        {Array.from({length:22}).map((_,i)=>(<span key={i} style={{width:14,height:11,background:"#2A2A30",borderRadius:2}}/>))}
      </div>
      <header className="relative" style={{ padding:"40px 56px 24px", textAlign:"center" }}>
        {/* aperture photo */}
        <div className="mx-auto" style={{ width:150, height:150, borderRadius:"50%", padding:5, background:"conic-gradient(#E8E4DC,#7A756A,#E8E4DC,#7A756A,#E8E4DC)", marginBottom:18 }}>
          <div style={{ width:"100%", height:"100%", borderRadius:"50%", background:"#0C0C0E", display:"flex", alignItems:"center", justifyContent:"center", color:"#C9A24E", fontWeight:600, fontSize:"42pt", fontFamily:'"Cormorant Garamond",serif' }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}/> : initials(basics.fullName)}
          </div>
        </div>
        <h1 className="m-0" style={{ fontWeight:500, fontSize:"42pt", lineHeight:1, letterSpacing:"0.06em", textTransform:"uppercase" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 italic" style={{ fontSize:"15pt", color:"#C9A24E", letterSpacing:"0.04em" }}>{basics.role}</p>
        <p className="m-0 mt-3 text-[9.5pt]" style={{ fontFamily:"Inter,sans-serif", color:"#9A958A", letterSpacing:"0.06em" }}>{[basics.email,basics.phone,basics.website,basics.location].filter(Boolean).join("   ·   ")}</p>
      </header>
      <div className="grid gap-9" style={{ padding:"16px 56px 40px", gridTemplateColumns:"1fr 1fr" }}>
        <div>
          {basics.summary && <PgBlk t={getLabel(data,"summary","Artist Statement")}><RichTextRender html={basics.summary} style={{color:"#C2BDB2",fontSize:"11pt",fontStyle:"italic"}}/></PgBlk>}
          <PgBlk t={getLabel(data,"experience","Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-semibold text-[12pt]" style={{fontFamily:'"Cormorant Garamond",serif'}}>{e.role}</p>
              <p className="m-0 italic text-[10pt]" style={{color:"#C9A24E",fontFamily:"Inter,sans-serif"}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="pg-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#B5B0A5",fontFamily:"Inter,sans-serif"}}/>
            </div>))}
          </PgBlk>
        </div>
        <div>
          {projects.length>0 && <PgBlk t={getLabel(data,"projects","Selected Work")}>
            {projects.map((p,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-semibold text-[11pt]" style={{fontFamily:'"Cormorant Garamond",serif'}}>{p.name}</p>{p.description&&<p className="m-0 text-[9.5pt]" style={{color:"#B5B0A5",fontFamily:"Inter,sans-serif"}}>{p.description}</p>}</div>))}
          </PgBlk>}
          <PgBlk t={getLabel(data,"skills","Skills & Tools")}>
            <div className="flex flex-wrap gap-1.5">{skills.map((s,i)=>(<span key={i} style={{padding:"3px 12px",fontSize:"9.5pt",fontFamily:"Inter,sans-serif",color:"#E8E4DC",border:"1px solid #4A463E",borderRadius:9999}}>{s}</span>))}</div>
          </PgBlk>
          <PgBlk t={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-semibold text-[11pt]" style={{fontFamily:'"Cormorant Garamond",serif'}}>{e.degree}</p><p className="m-0 text-[9.5pt]" style={{color:"#9A958A",fontFamily:"Inter,sans-serif"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p></div>))}
          </PgBlk>
          {certifications.length>0 && <PgBlk t={getLabel(data,"certifications","Recognition")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",color:"#B5B0A5",fontFamily:"Inter,sans-serif"}}>{certifications.map((c,i)=>(<li key={i} className="mb-0.5"><b style={{color:"#E8E4DC"}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </PgBlk>}
          {languages.length>0 && <p className="m-0 text-[10pt]" style={{color:"#B5B0A5",fontFamily:"Inter,sans-serif"}}>{languages.map(l=>`${l.name} (${l.level})`).join(" · ")}</p>}
        </div>
      </div>
      <div style={{ height:26, background:"#0C0C0E", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 8px" }}>
        {Array.from({length:22}).map((_,i)=>(<span key={i} style={{width:14,height:11,background:"#2A2A30",borderRadius:2}}/>))}
      </div>
      <style>{`.pg-b li{position:relative;padding-left:14px;margin-bottom:2px}.pg-b li:before{content:"—";position:absolute;left:0;color:#C9A24E}`}</style>
    </article>
  );
}
function PgBlk({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5" style={{fontSize:"15pt",fontWeight:500,fontFamily:'"Cormorant Garamond",serif',color:"#C9A24E",letterSpacing:"0.04em",borderBottom:"1px solid #3A362E",paddingBottom:4}}>{t}</h2>{children}</section>; }
