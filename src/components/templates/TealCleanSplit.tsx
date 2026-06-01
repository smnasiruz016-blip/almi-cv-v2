// TealCleanSplit — Data Scientists, Analysts, Researchers, Consultants
// Solid teal header band + clean white two-column + skill pills. ATS-friendly.
"use client";

import React from "react";
import { TemplateProps, dateRange, RichTextRender, getLabel, initials } from "./types";

export default function TealCleanSplit({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], projects = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] bg-white print:shadow-none"
      style={{ color:"#2B3338", fontFamily:"Inter,sans-serif", fontSize:"10pt", lineHeight:1.5 }}>
      {/* Teal header */}
      <header style={{ background:"#147D6F", color:"#fff", padding:"34px 44px 30px", position:"relative" }}>
        <h1 className="m-0" style={{ fontWeight:300, fontSize:"38pt", lineHeight:1, letterSpacing:"0.02em", textTransform:"uppercase" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 uppercase" style={{ fontSize:"13pt", color:"#A6E0D5", fontWeight:500, letterSpacing:"0.08em" }}>{basics.role}</p>
        <p className="m-0 mt-3 text-[9pt]" style={{ color:"rgba(255,255,255,0.85)" }}>{[basics.email, basics.phone, basics.linkedIn||basics.website, basics.location].filter(Boolean).join("  |  ")}</p>
        {basics.photoUrl && <img src={basics.photoUrl} alt="" style={{ position:"absolute", top:34, right:44, width:90, height:90, borderRadius:10, objectFit:"cover", border:"3px solid rgba(255,255,255,0.4)" }} />}
      </header>

      <div className="grid gap-9" style={{ padding:"30px 44px 40px", gridTemplateColumns:"1fr 1fr" }}>
        <div>
          {basics.summary && (<Block title={getLabel(data,"summary","PROFILE")}><RichTextRender html={basics.summary} style={{color:"#4A555B",fontSize:"10pt"}}/></Block>)}
          <Block title={getLabel(data,"experience","EXPERIENCE")}>
            {experience.map((e,i)=>(
              <div key={i} className="mb-2.5 last:mb-0">
                <p className="m-0 font-bold text-[11pt]" style={{color:"#2B3338"}}>{e.role}</p>
                <p className="m-0 text-[9pt]" style={{color:"#147D6F",fontWeight:600}}>{e.company}  |  {dateRange(e.startDate,e.endDate,e.current)}</p>
                {e.bullets?.length ? <RichTextRender html={e.bullets[0]} style={{margin:"2px 0 0",fontSize:"9.5pt",color:"#4A555B"}}/> : null}
              </div>
            ))}
          </Block>
        </div>

        <div>
          <Block title={getLabel(data,"skills","SKILLS")}>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s,i)=>(<span key={i} style={{ padding:"4px 12px", fontSize:"10pt", color:"#2B3338", background:"#EDF2F1", border:"1px solid #D3E0DC", borderRadius:9999 }}>{s}</span>))}
            </div>
          </Block>
          <Block title={getLabel(data,"education","EDUCATION")}>
            {education.map((e,i)=>(
              <div key={i} className="mb-1.5 last:mb-0">
                <p className="m-0 font-bold text-[10.5pt]" style={{color:"#2B3338"}}>{e.degree}</p>
                <p className="m-0 text-[9.5pt]" style={{color:"#6B767B"}}>{e.school}  |  {dateRange(e.startDate,e.endDate)}</p>
              </div>
            ))}
          </Block>
          {certifications.length>0 && (
            <Block title={getLabel(data,"certifications","CERTIFICATIONS")}>
              <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",color:"#4A555B"}}>
                {certifications.map((c,i)=>(<li key={i} className="mb-0.5">{c.name}{c.issuer?` — ${c.issuer}`:""}</li>))}
              </ul>
            </Block>
          )}
          {projects.length>0 && (
            <Block title={getLabel(data,"projects","PROJECTS")}>
              {projects.map((p,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10pt]" style={{color:"#2B3338"}}>{p.name}</p>{p.description&&<p className="m-0 text-[9.5pt]" style={{color:"#4A555B"}}>{p.description}</p>}</div>))}
            </Block>
          )}
          {languages.length>0 && (
            <Block title={getLabel(data,"languages","LANGUAGES")}>
              <p className="m-0 text-[10pt]" style={{color:"#4A555B"}}>{languages.map((l,i)=><React.Fragment key={i}><b style={{color:"#2B3338"}}>{l.name}</b> {l.level}{i<languages.length-1?" · ":""}</React.Fragment>)}</p>
            </Block>
          )}
        </div>
      </div>
    </article>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }){
  return (<section className="mb-5 last:mb-0">
    <h2 className="m-0 mb-2.5" style={{ fontSize:"11pt", fontWeight:700, color:"#147D6F", letterSpacing:"0.06em", borderBottom:"2px solid #147D6F", paddingBottom:3, display:"inline-block" }}>{title}</h2>
    {children}
  </section>);
}
