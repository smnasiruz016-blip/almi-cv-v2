// PurpleGradientPro — Backend / Software Engineers, Developers, Data Scientists
// Diagonal purple gradient header + two-column + skill bars + impact metric tiles.
"use client";

import React from "react";
import { TemplateProps, dateRange, RichTextRender, BulletsRender, getLabel, initials } from "./types";

export default function PurpleGradientPro({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], projects = [], awards = [] } = data;
  // Use first 3 awards as impact metric tiles if present.
  const metrics = awards.slice(0, 3);

  return (
    <article className="w-[794px] min-h-[1123px] bg-white relative print:shadow-none"
      style={{ color:"#1F2433", fontFamily:"Inter,sans-serif", fontSize:"10pt", lineHeight:1.5 }}>
      {/* Header gradient band */}
      <header className="relative" style={{ background:"linear-gradient(110deg,#3B1F8F 0%,#6D3BD4 55%,#7C4DE0 100%)", color:"#fff", padding:"30px 40px 34px" }}>
        <div className="grid items-center gap-6" style={{ gridTemplateColumns:"150px 1fr" }}>
          <div style={{ width:150, height:110, borderRadius:10, overflow:"hidden", background:"linear-gradient(180deg,#BBD6F2 0%,#8FB98F 100%)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:"34pt" }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : initials(basics.fullName)}
          </div>
          <div>
            <h1 className="m-0" style={{ fontWeight:300, fontSize:"34pt", lineHeight:1, letterSpacing:"0.01em" }}>{basics.fullName}</h1>
            <p className="m-0 mt-1 uppercase" style={{ fontSize:"13pt", color:"#C9B6F5", fontWeight:500, letterSpacing:"0.08em" }}>{basics.role}</p>
            <p className="m-0 mt-3 text-[9pt]" style={{ color:"rgba(255,255,255,0.8)" }}>
              {[basics.phone, basics.email, basics.linkedIn || basics.website, basics.location].filter(Boolean).join("   |   ")}
            </p>
          </div>
        </div>
      </header>
      {/* triangle accent */}
      <div style={{ width:0, height:0, borderLeft:"34px solid transparent", borderRight:"34px solid transparent", borderTop:"30px solid #7C4DE0", margin:"0 0 0 360px" }} />

      <div className="grid gap-9" style={{ padding:"6px 40px 40px", gridTemplateColumns:"1fr 1fr" }}>
        {/* LEFT */}
        <div>
          {basics.summary && (<Block title={getLabel(data,"summary","PROFESSIONAL SUMMARY")}><RichTextRender html={basics.summary} style={{color:"#4A4F60",fontSize:"10pt"}}/></Block>)}
          <Block title={getLabel(data,"experience","WORK EXPERIENCE")}>
            {experience.map((e,i)=>(
              <div key={i} className="mb-3 last:mb-0 relative" style={{ paddingLeft:16 }}>
                <span style={{position:"absolute",left:0,top:4,width:9,height:9,borderRadius:"50%",background:"#7C4DE0"}}/>
                <p className="m-0 text-[11pt]"><b style={{color:"#1F2433"}}>{e.role}</b><span style={{color:"#6D3BD4"}}> - {e.company}</span></p>
                <p className="m-0 text-[8.5pt]" style={{color:"#8A8F9E"}}>{dateRange(e.startDate,e.endDate,e.current)}</p>
                <BulletsRender bullets={e.bullets} className="pg-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#4A4F60"}}/>
              </div>
            ))}
          </Block>
          <Block title={getLabel(data,"education","EDUCATION")}>
            {education.map((e,i)=>(
              <p key={i} className="m-0 mb-1 text-[10pt]"><b style={{color:"#1F2433"}}>{e.degree}</b><span style={{color:"#4A4F60"}}> - {e.school} {e.endDate?`(${e.endDate})`:""}</span></p>
            ))}
          </Block>
        </div>

        {/* RIGHT */}
        <div>
          <Block title={getLabel(data,"skills","CORE SKILLS")}>
            {skills.slice(0,8).map((s,i)=>(
              <div key={i} className="flex items-center gap-3 mb-1.5">
                <span style={{flex:"0 0 8px",width:8,height:8,borderRadius:"50%",background:"#7C4DE0"}}/>
                <span className="text-[10pt]" style={{flex:1,color:"#1F2433"}}>{s}</span>
                <span style={{flex:"0 0 90px",height:5,borderRadius:9999,background:"#EDE7FA"}}><span style={{display:"block",height:"100%",width:`${88-i*6}%`,borderRadius:9999,background:"#7C4DE0"}}/></span>
              </div>
            ))}
          </Block>
          {projects.length>0 && (
            <Block title={getLabel(data,"projects","KEY PROJECTS")}>
              {projects.map((p,i)=>(
                <div key={i} className="mb-2 last:mb-0">
                  <p className="m-0 text-[10pt] font-bold" style={{color:"#1F2433"}}>{p.name}</p>
                  {p.description && <p className="m-0 text-[9.5pt]" style={{color:"#4A4F60"}}>{p.description}</p>}
                </div>
              ))}
            </Block>
          )}
          {metrics.length>0 && (
            <Block title={getLabel(data,"metrics","IMPACT METRICS")}>
              <div className="flex gap-2.5">
                {metrics.map((m,i)=>(
                  <div key={i} className="text-center" style={{ flex:1, background:"#231A45", borderRadius:8, padding:"12px 6px", color:"#fff" }}>
                    <div style={{fontSize:"15pt",fontWeight:700,color:"#A78BF0",lineHeight:1}}>{m.title}</div>
                    <div className="mt-1 text-[8pt]" style={{color:"#C9BEE8"}}>{m.issuer || m.year}</div>
                  </div>
                ))}
              </div>
            </Block>
          )}
          {certifications.length>0 && (
            <Block title={getLabel(data,"certifications","CERTIFICATIONS")}>
              <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",color:"#4A4F60"}}>
                {certifications.map((c,i)=>(<li key={i} className="mb-0.5">{c.name}{c.issuer?` — ${c.issuer}`:""}</li>))}
              </ul>
            </Block>
          )}
          {languages.length>0 && (
            <Block title={getLabel(data,"languages","LANGUAGES")}>
              <p className="m-0 text-[10pt]" style={{color:"#4A4F60"}}>{languages.map((l,i)=><React.Fragment key={i}><b style={{color:"#1F2433"}}>{l.name}</b> {l.level}{i<languages.length-1?" · ":""}</React.Fragment>)}</p>
            </Block>
          )}
        </div>
      </div>
      <div style={{ height:6, background:"linear-gradient(90deg,#3B1F8F,#7C4DE0)" }} />
      <style>{`.pg-b li{position:relative;padding-left:10px;margin-bottom:1px}.pg-b li:before{content:"-";position:absolute;left:0;color:#7C4DE0}`}</style>
    </article>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }){
  return (<section className="mb-5 last:mb-0">
    <h2 className="m-0 mb-2.5" style={{ fontSize:"11pt", fontWeight:700, color:"#6D3BD4", letterSpacing:"0.04em", display:"inline-block", borderBottom:"2px solid #7C4DE0", paddingBottom:2 }}>{title}</h2>
    {children}
  </section>);
}
