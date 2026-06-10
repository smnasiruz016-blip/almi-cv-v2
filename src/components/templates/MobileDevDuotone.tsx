// MobileDevDuotone — Mobile App Developers (Flutter, React Native, iOS, Android)
// White + teal + orange duotone, project cards, KPI footer band. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function MobileDevDuotone({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], certifications = [], projects = [], awards = [] } = data;
  const kpis = awards.slice(0,4);
  return (
    <article className="w-[794px] min-h-[1123px] bg-white relative overflow-hidden print:shadow-none"
      style={{ color:"#22313A", fontFamily:'"Plus Jakarta Sans","Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5, display:"flex", flexDirection:"column" }}>
      <span style={{ position:"absolute", left:0, top:0, width:12, height:190, background:"#0E8C7F" }}/>
      <span style={{ position:"absolute", left:0, top:198, width:12, height:80, background:"#F2700C" }}/>
      <header style={{ padding:"48px 48px 24px 60px", background:"#F7F9FA" }}>
        <h1 className="m-0" style={{ fontWeight:300, fontSize:"40pt", lineHeight:0.95, letterSpacing:"-0.01em", color:"#22313A" }}>{firstWord(basics.fullName)}</h1>
        <h1 className="m-0" style={{ fontWeight:800, fontSize:"40pt", lineHeight:0.95, letterSpacing:"-0.01em", color:"#0E8C7F" }}>{restWords(basics.fullName)||"\u00A0"}</h1>
        <p className="m-0 mt-1 uppercase" style={{ fontSize:"12pt", color:"#F2700C", fontWeight:700, letterSpacing:"0.16em" }}>{basics.role}</p>
        <div className="flex items-center gap-4 mt-4">
          {basics.photoUrl && <div style={{ width:84, height:84, borderRadius:"50%", overflow:"hidden", border:"3px solid #fff", boxShadow:"0 2px 8px rgba(0,0,0,0.12)" }}><img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>}
          <div className="text-[9.5pt]" style={{ color:"#5A6B74", lineHeight:1.8 }}>
            <p className="m-0 font-bold" style={{ color:"#0E8C7F" }}>{getLabel(data,"contact","Contact")}</p>
            <p className="m-0">{[basics.phone,basics.email].filter(Boolean).join("   |   ")}</p>
            <p className="m-0">{[basics.website,basics.location].filter(Boolean).join("   |   ")}</p>
          </div>
        </div>
      </header>
      <div className="grid gap-9 flex-1" style={{ padding:"24px 48px 28px 60px", gridTemplateColumns:"1.4fr 1fr" }}>
        <div>
          <Sec t={getLabel(data,"experience","Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]">{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:"#F2700C",fontWeight:600}}>{e.company} | {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="mdd-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#46555E"}}/>
            </div>))}
          </Sec>
          {projects.length>0 && <Sec t={getLabel(data,"projects","Key Projects")}>
            <div className="grid gap-3" style={{ gridTemplateColumns:"1fr 1fr" }}>
              {projects.slice(0,4).map((p,i)=>(<div key={i} style={{ border:"1px solid #E2E8EB", borderRadius:12, padding:"12px 14px", background:"#fff" }}>
                <div style={{ width:30, height:30, borderRadius:8, marginBottom:6, background:i%2?"#7C4DE8":"#3DBE6B", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:"12pt" }}>{(p.name||"P")[0]}</div>
                <p className="m-0 font-bold text-[10pt]">{p.name}</p>
                {p.description&&<p className="m-0 text-[9pt]" style={{color:"#6B7B84"}}>{p.description}</p>}
              </div>))}
            </div>
          </Sec>}
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Skills")}>
            {skills.slice(0,7).map((s,i)=>(<div key={i} className="mb-2.5"><div className="flex justify-between text-[9.5pt]"><span>{s}</span><span style={{color:"#8A99A1"}}>{92-i*5}%</span></div><div style={{height:7,marginTop:3,borderRadius:5,background:"#E2E8EB"}}><div style={{height:"100%",borderRadius:5,width:`${92-i*5}%`,background:"#0E8C7F"}}/></div></div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:"#0E8C7F"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#46555E"}}>{e.school}</p><p className="m-0 text-[9.5pt]" style={{color:"#8A99A1"}}>{e.startDate}{e.endDate?` - ${e.endDate}`:""}{e.notes?` | ${e.notes}`:""}</p></div>))}
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications")}>
            <ul className="mdd-b" style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#46555E"}}>{certifications.map((c,i)=>(<li key={i}>{c.name}{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
        </div>
      </div>
      {kpis.length>0 && (
        <footer style={{ background:"#22313A", padding:"20px 48px", display:"grid", gridTemplateColumns:`repeat(${kpis.length},1fr)`, gap:18, textAlign:"center" }}>
          {kpis.map((k,i)=>(<div key={i}><div style={{ fontWeight:800, fontSize:"19pt", lineHeight:1, color:"#F2700C" }}>{k.title}</div>{k.issuer&&<div className="text-[8.5pt] mt-1" style={{ color:"#AEBDC5" }}>{k.issuer}</div>}</div>))}
        </footer>
      )}
      <style>{`.mdd-b li{position:relative;padding-left:13px;margin-bottom:2px}.mdd-b li:before{content:"-";position:absolute;left:0;color:#F2700C;font-weight:700}`}</style>
    </article>
  );
}
function firstWord(n:string){ return (n||"").trim().split(/\s+/)[0]||""; }
function restWords(n:string){ return (n||"").trim().split(/\s+/).slice(1).join(" "); }
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11.5pt",fontWeight:800,letterSpacing:"0.1em",color:"#0E8C7F",borderBottom:"3px solid #F2700C",paddingBottom:3,display:"inline-block",whiteSpace:"nowrap"}}>{t}</h2>{children}</section>; }
