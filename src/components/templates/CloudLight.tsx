// CloudLight — IT Project Managers, Cloud Architects, Solutions Architects (light variant)
// White + soft blue gradients + 3D cloud illustration + glassmorphism cards.
"use client";

import React from "react";
import { TemplateProps, dateRange, BulletsRender, getLabel, initials } from "./types";

export default function CloudLight({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"radial-gradient(circle at 92% 30%,rgba(61,139,255,0.18) 0%,transparent 38%),radial-gradient(circle at 5% 80%,rgba(199,221,250,0.6) 0%,transparent 35%),linear-gradient(165deg,#F8FBFF 0%,#E5EEFA 100%)", color:"#0F1B3D", fontFamily:'"Plus Jakarta Sans","Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5 }}>
      <div className="relative" style={{ padding:"44px 48px 40px" }}>
        <header className="grid items-center gap-7 mb-7" style={{ gridTemplateColumns:"190px 1fr" }}>
          <div style={{ width:190, height:190, borderRadius:"50%", padding:4, background:"linear-gradient(135deg,#1769E0 0%,#3D8BFF 50%,#C7DDFA 100%)", boxShadow:"0 12px 32px rgba(23,105,224,0.25)" }}>
            {basics.photoUrl
              ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}/>
              : <div style={{width:"100%",height:"100%",borderRadius:"50%",background:"radial-gradient(circle at 30% 25%,#E8F0FA 0%,#B8C8DA 60%,#94B0C8 100%)",display:"flex",alignItems:"center",justifyContent:"center",color:"#0F1B3D",fontWeight:800,fontSize:"64pt",letterSpacing:"-0.04em"}}>{initials(basics.fullName)}</div>}
          </div>
          <div>
            <h1 className="m-0" style={{ fontWeight:800, fontSize:"54pt", lineHeight:0.95, letterSpacing:"-0.035em", textTransform:"uppercase" }}>{splitName(basics.fullName)}</h1>
            <p className="m-0 mt-3 uppercase" style={{ display:"inline-block", padding:"0 0 6px", borderBottom:"3px solid #1769E0", fontSize:"13pt", color:"#1769E0", fontWeight:700, letterSpacing:"0.16em" }}>{basics.role}</p>
          </div>
        </header>

        <div className="grid gap-2 mb-6" style={{ gridTemplateColumns:"1fr 1fr 1fr", background:"rgba(255,255,255,0.55)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,0.85)", borderRadius:14, padding:"12px 16px", fontSize:"9.5pt", color:"#3A5A8A" }}>
          {basics.email && <div><b style={{color:"#1769E0",textTransform:"uppercase",letterSpacing:"0.12em",fontSize:"8pt"}}>Email</b><br/>{basics.email}</div>}
          {basics.phone && <div><b style={{color:"#1769E0",textTransform:"uppercase",letterSpacing:"0.12em",fontSize:"8pt"}}>Phone</b><br/>{basics.phone}</div>}
          {basics.location && <div><b style={{color:"#1769E0",textTransform:"uppercase",letterSpacing:"0.12em",fontSize:"8pt"}}>Location</b><br/>{basics.location}</div>}
        </div>

        <div className="grid gap-4 relative" style={{ gridTemplateColumns:"1fr 1fr" }}>
          <svg viewBox="0 0 320 340" style={{ position:"absolute", right:-30, top:-20, width:280, height:300, zIndex:0, pointerEvents:"none", filter:"drop-shadow(0 24px 40px rgba(23,105,224,0.18))" }}>
            <defs>
              <linearGradient id="cl-c" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#A7C8F2"/><stop offset="100%" stopColor="#5F95E8"/></linearGradient>
              <radialGradient id="cl-n" cx="0.5" cy="0.4" r="0.6"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="50%" stopColor="#3D8BFF"/><stop offset="100%" stopColor="#1769E0"/></radialGradient>
            </defs>
            <g transform="translate(60 22)">
              <ellipse cx="80" cy="80" rx="84" ry="58" fill="url(#cl-c)" opacity="0.85"/>
              <ellipse cx="42" cy="58" rx="46" ry="38" fill="#E8F0FA" opacity="0.85"/>
              <ellipse cx="118" cy="56" rx="38" ry="30" fill="#E8F0FA" opacity="0.85"/>
              <ellipse cx="60" cy="48" rx="40" ry="14" fill="#FFFFFF" opacity="0.45"/>
            </g>
            <circle cx="160" cy="200" r="16" fill="url(#cl-n)"/>
            <circle cx="98" cy="240" r="13" fill="url(#cl-n)"/>
            <circle cx="220" cy="240" r="13" fill="url(#cl-n)"/>
            <g stroke="#5F95E8" strokeWidth="1.2" fill="none" opacity="0.55">
              <line x1="160" y1="160" x2="160" y2="184"/><line x1="160" y1="200" x2="98" y2="240"/>
              <line x1="160" y1="200" x2="220" y2="240"/>
            </g>
          </svg>

          <Glass>
            <ST>{getLabel(data,"experience","Experience")}</ST>
            {experience.map((e,i)=>(
              <div key={i} className="mb-2 last:mb-0">
                <p className="m-0 font-bold text-[11pt]" style={{color:"#0F1B3D"}}>{e.role}</p>
                <p className="m-0 text-[10pt]" style={{color:"#1769E0",fontWeight:600}}>{e.company}{e.location?` · ${e.location}`:""}</p>
                <p className="m-0 text-[9pt]" style={{color:"#5A7A9A"}}>{dateRange(e.startDate,e.endDate,e.current)}</p>
                <BulletsRender bullets={e.bullets} className="cl-b" style={{margin:"3px 0 0",paddingLeft:18,fontSize:"10pt",color:"#3A5A8A"}}/>
              </div>
            ))}
          </Glass>

          <Glass>
            <ST>{getLabel(data,"skills","Skills")}</ST>
            <p className="m-0 text-[10.5pt]" style={{color:"#0F1B3D"}}>{skills.join(", ")}</p>
          </Glass>

          <Glass>
            <ST>{getLabel(data,"education","Education")}</ST>
            {education.map((e,i)=>(
              <div key={i} className="mb-1 last:mb-0">
                <p className="m-0 text-[10.5pt]" style={{color:"#0F1B3D"}}><b>{e.degree}</b> | {e.school}{e.notes?` | ${e.notes}`:""}</p>
              </div>
            ))}
          </Glass>

          {certifications.length>0 && (
            <Glass>
              <ST>{getLabel(data,"certifications","Certifications")}</ST>
              <p className="m-0 text-[10.5pt]" style={{color:"#0F1B3D"}}>{certifications.map(c=>c.name).join(", ")}</p>
            </Glass>
          )}
        </div>

        {languages.length>0 && (
          <div className="mt-4">
            <Glass>
              <ST>{getLabel(data,"languages","Languages")}</ST>
              <p className="m-0 text-[10pt]" style={{color:"#0F1B3D"}}>{languages.map((l,i)=><React.Fragment key={i}><b>{l.name}</b> — {l.level}{i<languages.length-1?" · ":""}</React.Fragment>)}</p>
            </Glass>
          </div>
        )}
      </div>
    </article>
  );
}

function splitName(name?: string){ const p=(name??"").trim().split(/\s+/); if(p.length<2) return name; return (<>{p[0]}<br/>{p.slice(1).join(" ")}</>); }
function ST({ children }: { children: React.ReactNode }){ return <h2 className="uppercase" style={{margin:0,marginBottom:8,fontWeight:800,fontSize:"13pt",color:"#0F1B3D",letterSpacing:"0.12em"}}>{children}</h2>; }
function Glass({ children }: { children: React.ReactNode }){ return <section style={{position:"relative",zIndex:1,background:"rgba(255,255,255,0.55)",backdropFilter:"blur(16px)",border:"1px solid rgba(255,255,255,0.65)",borderRadius:18,padding:"18px 20px",boxShadow:"0 1px 0 rgba(255,255,255,0.9) inset, 0 12px 32px rgba(23,105,224,0.10)"}}>{children}</section>; }
