// MedicalSurgical — Surgeons, Specialist Doctors, Hospital Consultants
// White + bold red angular corners. Cross watermark + circle progress.
"use client";

import React from "react";
import { TemplateProps, dateRange, RichTextRender, BulletsRender, getLabel, initials } from "./types";

export default function MedicalSurgical({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], awards = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] bg-white relative overflow-hidden print:shadow-none"
      style={{ color:"#1A1A1A", fontFamily:"Inter,sans-serif", fontSize:"10.5pt", lineHeight:1.5 }}>
      <svg viewBox="0 0 794 1123" preserveAspectRatio="none" style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
        <polygon points="0,0 360,0 220,200 0,200" fill="#D92F2F"/>
        <polygon points="794,0 480,0 620,180 794,180" fill="#D92F2F" opacity="0.95"/>
        <polygon points="794,1123 600,1123 720,940 794,940" fill="#D92F2F"/>
        <polygon points="0,1123 280,1123 160,960 0,960" fill="#D92F2F" opacity="0.9"/>
        <g opacity="0.06"><rect x="600" y="260" width="80" height="22" fill="#D92F2F"/><rect x="629" y="231" width="22" height="80" fill="#D92F2F"/></g>
      </svg>

      <div className="relative" style={{ padding:"38px 56px 40px" }}>
        <header className="mb-6">
          <p className="m-0" style={{ fontWeight:900, fontSize:"30pt", lineHeight:1, color:"#1A1A1A", textTransform:"uppercase", letterSpacing:"-0.01em" }}>DR.</p>
          <h1 className="m-0" style={{ fontWeight:900, fontSize:"38pt", lineHeight:1, color:"#1A1A1A", textTransform:"uppercase", letterSpacing:"-0.02em" }}>{basics.fullName}</h1>
          <div className="mt-2" style={{ width:"56%", height:1, background:"#D92F2F" }}/>
          <p className="m-0 mt-2 uppercase" style={{ fontWeight:800, fontSize:"15pt", color:"#D92F2F", letterSpacing:"0.06em" }}>{basics.role}</p>
        </header>

        <div className="grid gap-7" style={{ gridTemplateColumns:"220px 1fr", marginTop:32 }}>
          <div className="flex flex-col gap-5">
            <div style={{ width:200, height:200, background:"#2A2F3A", border:"5px solid #D92F2F", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", color:"#FFFFFF", fontWeight:800, fontSize:"60pt", letterSpacing:"-0.02em" }}>
              {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:7}}/> : initials(basics.fullName)}
            </div>
            <ul style={{ margin:0, padding:0, listStyle:"none", fontSize:"10pt", color:"#1A1A1A" }}>
              {basics.email && <li className="relative mb-1" style={{ paddingLeft:18 }}><span style={{ position:"absolute", left:0, color:"#D92F2F" }}>●</span>{basics.email}</li>}
              {basics.phone && <li className="relative mb-1" style={{ paddingLeft:18 }}><span style={{ position:"absolute", left:0, color:"#D92F2F" }}>●</span>{basics.phone}</li>}
              {basics.location && <li className="relative mb-1" style={{ paddingLeft:18 }}><span style={{ position:"absolute", left:0, color:"#D92F2F" }}>●</span>{basics.location}</li>}
            </ul>
            {skills.length>0 && (
              <div>
                <ST>{getLabel(data,"skills","Skills")}</ST>
                {skills.slice(0,4).map((s,i)=>(
                  <div key={i} className="flex items-center gap-3 mb-2">
                    <svg viewBox="0 0 40 40" style={{ width:36, height:36, flexShrink:0 }}>
                      <circle cx="20" cy="20" r="16" fill="none" stroke="#F3D9D9" strokeWidth="5"/>
                      <circle cx="20" cy="20" r="16" fill="none" stroke="#D92F2F" strokeWidth="5" strokeDasharray={`${78 + i*5} 100`} strokeDashoffset="25" transform="rotate(-90 20 20)" strokeLinecap="round"/>
                    </svg>
                    <span className="text-[10pt]" style={{color:"#1A1A1A"}}>{s}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative" style={{ borderLeft:"2px dotted rgba(217,47,47,0.4)", paddingLeft:24 }}>
            {basics.summary && <Sec title={getLabel(data,"summary","Profile")}><RichTextRender html={basics.summary} style={{fontSize:"10.5pt",color:"#3A3A3A"}}/></Sec>}
            {experience.length>0 && (
              <Sec title={getLabel(data,"experience","Surgical Experience")}>
                {experience.map((e,i)=>(
                  <div key={i} className="mb-2.5 last:mb-0">
                    <p className="m-0 font-bold text-[11.5pt]" style={{color:"#1A1A1A"}}>{e.role}</p>
                    <p className="m-0 text-[10pt]" style={{color:"#D92F2F",fontWeight:600}}>{e.company}{e.location?` · ${e.location}`:""}</p>
                    <p className="m-0 text-[9pt]" style={{color:"#666"}}>{dateRange(e.startDate,e.endDate,e.current)}</p>
                    <BulletsRender bullets={e.bullets} className="ms-b" style={{margin:"3px 0 0",paddingLeft:18,fontSize:"10pt",color:"#3A3A3A"}}/>
                  </div>
                ))}
              </Sec>
            )}
            <Sec title={getLabel(data,"education","Education")}>
              {education.map((e,i)=>(
                <div key={i} className="mb-1.5 last:mb-0">
                  <p className="m-0 font-bold text-[10.5pt]" style={{color:"#1A1A1A"}}>{e.degree}</p>
                  <p className="m-0 text-[10pt]" style={{color:"#666"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p>
                </div>
              ))}
            </Sec>
            {certifications.length>0 && (
              <Sec title={getLabel(data,"certifications","Specializations & Certifications")}>
                <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",color:"#1A1A1A"}}>
                  {certifications.map((c,i)=>(<li key={i} className="relative mb-0.5" style={{paddingLeft:14}}><span style={{position:"absolute",left:0,color:"#D92F2F"}}>•</span><b>{c.name}</b>{c.issuer?<span style={{color:"#666"}}> · {c.issuer}</span>:""}{c.year?<span style={{color:"#666"}}> · {c.year}</span>:""}</li>))}
                </ul>
              </Sec>
            )}
            {awards.length>0 && (
              <Sec title={getLabel(data,"awards","Publications & Awards")}>
                <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",color:"#3A3A3A"}}>
                  {awards.map((a,i)=>(<li key={i}><b style={{color:"#1A1A1A"}}>{a.title}</b>{a.issuer?` — ${a.issuer}`:""}{a.year?`, ${a.year}`:""}</li>))}
                </ul>
              </Sec>
            )}
            {languages.length>0 && (
              <Sec title={getLabel(data,"languages","Languages")}>
                <p className="m-0 text-[10pt]" style={{color:"#1A1A1A"}}>{languages.map((l,i)=><React.Fragment key={i}><b>{l.name}</b> — {l.level}{i<languages.length-1?"  ●  ":""}</React.Fragment>)}</p>
              </Sec>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function ST({ children }: { children: React.ReactNode }){ return <h3 className="uppercase" style={{margin:0,marginBottom:8,fontWeight:900,fontSize:"11pt",letterSpacing:"0.18em",color:"#1A1A1A",paddingBottom:3,borderBottom:"2px solid #D92F2F",display:"inline-block"}}>{children}</h3>; }
function Sec({ title, children }: { title: string; children: React.ReactNode }){
  return (<section className="mb-4 last:mb-0 relative">
    <span style={{position:"absolute",left:-31,top:6,width:12,height:12,borderRadius:"50%",background:"#D92F2F"}}/>
    <h3 className="uppercase" style={{margin:0,marginBottom:6,fontWeight:900,fontSize:"12pt",letterSpacing:"0.04em",color:"#1A1A1A"}}>{title}<span style={{display:"block",width:60,height:2,background:"#D92F2F",marginTop:3}}/></h3>
    {children}
  </section>);
}
