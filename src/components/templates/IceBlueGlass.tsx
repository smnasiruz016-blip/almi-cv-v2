// IceBlueGlass — Secondary / High School Teachers, Tutors, STEM Educators
// Dark navy + cyan/purple wave + glass cards. Atom + pencil motifs.
"use client";

import React from "react";
import { TemplateProps, dateRange, RichTextRender, BulletsRender, getLabel, initials } from "./types";

export default function IceBlueGlass({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background: "linear-gradient(160deg,#0B1438 0%,#060B22 100%)", color: "#F8FAFF", fontFamily: '"Plus Jakarta Sans","Inter",sans-serif', fontSize: "10.5pt", lineHeight: 1.5 }}>
      <span style={{ position:"absolute", inset:0, pointerEvents:"none",
        background:"radial-gradient(circle at 90% 8%, rgba(124,92,255,0.30) 0%, transparent 40%),radial-gradient(circle at 5% 60%, rgba(45,212,215,0.18) 0%, transparent 35%)" }} />

      <header className="relative grid items-center gap-7" style={{ gridTemplateColumns:"200px 1fr", padding:"50px 56px 24px" }}>
        <div style={{ width:196, height:196, borderRadius:"50%", padding:4,
          background:"linear-gradient(135deg,#5EEAD4 0%,#7C5CFF 100%)",
          boxShadow:"0 0 0 4px rgba(94,234,212,0.18), 0 0 48px rgba(94,234,212,0.4)" }}>
          {basics.photoUrl
            ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover",border:"4px solid #0B1438"}}/>
            : <div style={{width:"100%",height:"100%",borderRadius:"50%",border:"4px solid #0B1438",background:"radial-gradient(circle at 30% 28%,#3C476B 0%,#131A30 100%)",display:"flex",alignItems:"center",justifyContent:"center",color:"#5EEAD4",fontWeight:800,fontSize:"60pt",letterSpacing:"-0.02em",textShadow:"0 0 32px rgba(94,234,212,0.5)"}}>{initials(basics.fullName)}</div>}
        </div>
        <div>
          <h1 className="m-0" style={{ fontWeight:800, fontSize:"56pt", lineHeight:0.92, letterSpacing:"-0.035em", textTransform:"uppercase" }}>{basics.fullName}</h1>
          <p className="m-0 mt-3 uppercase" style={{ fontSize:"15pt", color:"#5EEAD4", fontWeight:700, letterSpacing:"0.22em" }}>{basics.role}</p>
        </div>
        <svg viewBox="0 0 64 64" style={{ position:"absolute", top:48, right:48, width:64, height:64, opacity:0.6 }} fill="none" stroke="#B89BFF" strokeWidth="1.5">
          <circle cx="32" cy="32" r="6" fill="#B89BFF"/>
          <ellipse cx="32" cy="32" rx="24" ry="10"/>
          <ellipse cx="32" cy="32" rx="24" ry="10" transform="rotate(60 32 32)"/>
          <ellipse cx="32" cy="32" rx="24" ry="10" transform="rotate(120 32 32)"/>
        </svg>
      </header>

      <div className="relative" style={{ height:100, marginTop:-8, overflow:"hidden" }}>
        <svg viewBox="0 0 800 120" preserveAspectRatio="none" style={{ width:"110%", height:"100%", position:"absolute", left:"-5%" }}>
          <defs><linearGradient id="ibg-wv" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#2DD4D7"/><stop offset="55%" stopColor="#7C5CFF"/><stop offset="100%" stopColor="#3322A0"/></linearGradient></defs>
          <path d="M 0 90 C 130 40 280 130 420 70 C 560 12 690 90 800 50 L 800 120 L 0 120 Z" fill="url(#ibg-wv)" opacity="0.85"/>
          <path d="M 0 100 C 130 60 280 140 420 85 C 560 32 690 105 800 70 L 800 120 L 0 120 Z" fill="#7C5CFF" opacity="0.5"/>
        </svg>
        <svg style={{ position:"absolute", left:32, top:32, width:78, height:78, transform:"rotate(-25deg)" }} viewBox="0 0 80 80">
          <rect x="20" y="14" width="14" height="44" fill="#5C4BFA" stroke="#3322A0" strokeWidth="1.4"/>
          <polygon points="20,58 34,58 27,72" fill="#F4E4D1" stroke="#3322A0" strokeWidth="1.4"/>
          <rect x="20" y="10" width="14" height="6" fill="#F58CA7" stroke="#3322A0" strokeWidth="1.4"/>
        </svg>
      </div>

      <div className="grid gap-4 relative" style={{ padding:"8px 48px 44px", gridTemplateColumns:"1fr 1fr" }}>
        <Card>
          <h2 style={CT}>{getLabel(data,"summary","About Me")}</h2>
          <p style={{ margin:0, color:"#B7BFD8", fontSize:"10.5pt" }}>
            <b style={{color:"#F8FAFF"}}>Phone:</b> {basics.phone}<br/>
            <b style={{color:"#F8FAFF"}}>Email:</b> {basics.email}<br/>
            <b style={{color:"#F8FAFF"}}>Location:</b> {basics.location}
          </p>
          {basics.summary && <RichTextRender html={basics.summary} style={{ marginTop:14, color:"#B7BFD8", fontSize:"10pt" }} />}
        </Card>

        <Card>
          <h2 style={CT}>{getLabel(data,"experience","Experience")}</h2>
          {experience.slice(0,3).map((e,i)=>(
            <div key={i} className="mb-2.5 last:mb-0">
              <p className="m-0 font-bold text-[11pt]" style={{color:"#F8FAFF"}}>{e.role}</p>
              <p className="m-0 text-[9pt]" style={{color:"#5EEAD4",fontWeight:600}}>{dateRange(e.startDate,e.endDate,e.current)}</p>
              <p className="m-0 italic text-[10pt]" style={{color:"#B7BFD8"}}>{e.company}</p>
              <BulletsRender bullets={e.bullets} className="ibg-b" style={{margin:"2px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#B7BFD8"}} />
            </div>
          ))}
        </Card>

        <Card>
          <h2 style={CT}>{getLabel(data,"education","Education")}</h2>
          {education.map((e,i)=>(
            <div key={i} className="mb-1.5 last:mb-0">
              <p className="m-0 font-bold text-[10.5pt]" style={{color:"#F8FAFF"}}>{e.degree}</p>
              <p className="m-0 text-[10pt]" style={{color:"#B7BFD8"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p>
            </div>
          ))}
        </Card>

        <Card>
          <h2 style={CT}>{getLabel(data,"skills","Skills")}</h2>
          <ul style={{margin:0,padding:0,listStyle:"none"}}>
            {skills.slice(0,8).map((s,i)=>(
              <li key={i} style={{padding:"3px 0", fontSize:"10pt", color:"#B7BFD8", borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
                {s}
                <div style={{height:2, background:"linear-gradient(90deg,#5EEAD4,#7C5CFF 80%,transparent)", borderRadius:9999, width:"55%", marginTop:3}}/>
              </li>
            ))}
          </ul>
        </Card>

        {certifications.length>0 && (
          <Card><h2 style={CT}>{getLabel(data,"certifications","Certifications")}</h2>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",color:"#B7BFD8"}}>
              {certifications.map((c,i)=>(<li key={i} className="mb-0.5"><b style={{color:"#F8FAFF"}}>{c.name}</b>{c.issuer?` · ${c.issuer}`:""}{c.year?` · ${c.year}`:""}</li>))}
            </ul>
          </Card>
        )}
        {languages.length>0 && (
          <Card><h2 style={CT}>{getLabel(data,"languages","Languages")}</h2>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",color:"#B7BFD8"}}>
              {languages.map((l,i)=>(<li key={i}><b style={{color:"#F8FAFF"}}>{l.name}</b> — {l.level}</li>))}
            </ul>
          </Card>
        )}
      </div>
      <style>{`.ibg-b li{position:relative;padding-left:12px;margin-bottom:1px}.ibg-b li:before{content:"▸";position:absolute;left:0;color:#5EEAD4;font-size:8pt}`}</style>
    </article>
  );
}

const CT: React.CSSProperties = { margin:0, marginBottom:10, fontWeight:800, fontSize:"15pt", color:"#F8FAFF", textTransform:"uppercase", letterSpacing:"0.05em" };
function Card({ children }: { children: React.ReactNode }) {
  return <section style={{ background:"rgba(255,255,255,0.10)", backdropFilter:"blur(14px)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:18, padding:"18px 20px", boxShadow:"0 1px 0 rgba(255,255,255,0.10) inset" }}>{children}</section>;
}
