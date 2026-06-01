// EditorialInk — Writers, Journalists, Editors, Content Strategists, Authors
// Cream newsprint + bold serif masthead + column rules + drop-cap. ATS-safe.
"use client";
import React from "react";
import { TemplateProps, dateRange, RichTextRender, BulletsRender, getLabel } from "./types";

export default function EditorialInk({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], projects = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] bg-[#FBF8F1] print:shadow-none"
      style={{ color:"#1A1A1A", fontFamily:'"Georgia","Cormorant Garamond",serif', fontSize:"10.5pt", lineHeight:1.55, padding:"44px 56px 40px" }}>
      <header style={{ borderBottom:"3px double #1A1A1A", paddingBottom:14, marginBottom:6 }}>
        <h1 className="m-0 text-center" style={{ fontWeight:700, fontSize:"46pt", lineHeight:0.95, letterSpacing:"-0.01em", textTransform:"uppercase" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 text-center uppercase" style={{ fontSize:"11pt", letterSpacing:"0.34em", color:"#7A2E1E", fontFamily:"Inter,sans-serif", fontWeight:600 }}>{basics.role}</p>
      </header>
      <p className="m-0 text-center text-[9pt] uppercase" style={{ letterSpacing:"0.12em", color:"#555", fontFamily:"Inter,sans-serif", borderBottom:"1px solid #1A1A1A", paddingBottom:10, marginBottom:14 }}>
        {[basics.location,basics.email,basics.phone,basics.website].filter(Boolean).join("   |   ")}
      </p>
      {basics.summary && (
        <div className="ei-summary" style={{ marginBottom:16 }}>
          <RichTextRender html={basics.summary} style={{ fontSize:"10.5pt", color:"#2A2A2A", textAlign:"justify" }} />
        </div>
      )}
      <div className="grid gap-8" style={{ gridTemplateColumns:"2fr 1fr" }}>
        <div style={{ borderRight:"1px solid #C9C2B2", paddingRight:24 }}>
          <EiBlk t={getLabel(data,"experience","Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <div className="flex justify-between items-baseline gap-3">
                <p className="m-0 font-bold text-[12pt]">{e.role}</p>
                <span className="text-[9pt]" style={{color:"#7A2E1E",fontFamily:"Inter,sans-serif",whiteSpace:"nowrap"}}>{dateRange(e.startDate,e.endDate,e.current)}</span>
              </div>
              <p className="m-0 italic text-[10.5pt]" style={{color:"#555"}}>{e.company}</p>
              <BulletsRender bullets={e.bullets} className="ei-b" style={{margin:"3px 0 0",paddingLeft:16,fontSize:"10pt",color:"#2A2A2A"}}/>
            </div>))}
          </EiBlk>
          {projects.length>0 && <EiBlk t={getLabel(data,"projects","Selected Bylines")}>
            {projects.map((p,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]">{p.name}</p>{p.description&&<p className="m-0 text-[9.5pt]" style={{color:"#555"}}>{p.description}</p>}</div>))}
          </EiBlk>}
        </div>
        <div>
          <EiBlk t={getLabel(data,"skills","Expertise")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt"}}>{skills.map((s,i)=>(<li key={i} style={{padding:"2px 0",borderBottom:i<skills.length-1?"1px solid #D8D1C0":"0"}}>{s}</li>))}</ul>
          </EiBlk>
          <EiBlk t={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10pt]">{e.degree}</p><p className="m-0 text-[9.5pt]" style={{color:"#555"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p></div>))}
          </EiBlk>
          {certifications.length>0 && <EiBlk t={getLabel(data,"certifications","Awards")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt"}}>{certifications.map((c,i)=>(<li key={i} className="mb-0.5">{c.name}{c.year?` · ${c.year}`:""}</li>))}</ul>
          </EiBlk>}
          {languages.length>0 && <EiBlk t={getLabel(data,"languages","Languages")}>
            <p className="m-0 text-[10pt]">{languages.map(l=>`${l.name} (${l.level})`).join(", ")}</p>
          </EiBlk>}
        </div>
      </div>
      <style>{`.ei-summary:first-letter{font-size:42pt;font-weight:700;float:left;line-height:0.8;padding:4px 8px 0 0;color:#7A2E1E}.ei-b{list-style:square}.ei-b li{margin-bottom:2px}`}</style>
    </article>
  );
}
function EiBlk({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-4 last:mb-0"><h2 className="m-0 mb-2 uppercase" style={{fontSize:"10.5pt",fontWeight:700,letterSpacing:"0.18em",fontFamily:"Inter,sans-serif",borderBottom:"2px solid #1A1A1A",paddingBottom:3}}>{t}</h2>{children}</section>; }
