// SocialPulse — Content Creators, Influencers, Social Media Managers, Creators
// White + vivid gradient + content-grid + engagement-metric tiles. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function SocialPulse({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], awards = [], projects = [] } = data;
  const tiles = awards.slice(0,3);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden bg-white print:shadow-none"
      style={{ color:"#241B2E", fontFamily:'"Plus Jakarta Sans","Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5 }}>
      <header className="relative" style={{ padding:"40px 48px 32px", background:"linear-gradient(115deg,#7C3AED 0%,#EC4899 55%,#F59E0B 110%)", color:"#fff" }}>
        <div style={{ display:"grid", gridTemplateColumns: basics.photoUrl?"110px 1fr":"1fr", gap:20, alignItems:"center" }}>
          {basics.photoUrl && <div style={{ width:106, height:106, borderRadius:"50%", overflow:"hidden", border:"4px solid rgba(255,255,255,0.85)" }}><img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>}
          <div>
            <h1 className="m-0" style={{ fontWeight:800, fontSize:"36pt", lineHeight:0.98, letterSpacing:"-0.02em" }}>{basics.fullName}</h1>
            <p className="m-0 mt-1 uppercase" style={{ fontSize:"12.5pt", letterSpacing:"0.14em", color:"rgba(255,255,255,0.92)", fontWeight:700 }}>{basics.role}</p>
            <p className="m-0 mt-2 text-[9pt]" style={{ color:"rgba(255,255,255,0.85)" }}>{[basics.email,basics.website,basics.location].filter(Boolean).join("   ·   ")}</p>
          </div>
        </div>
      </header>
      {tiles.length>0 && (
        <div className="grid gap-3" style={{ gridTemplateColumns:`repeat(${tiles.length},1fr)`, padding:"18px 48px 2px" }}>
          {tiles.map((t,i)=>(<div key={i} style={{ borderRadius:14, padding:"12px 14px", textAlign:"center", background:"linear-gradient(135deg,#F3E8FF,#FFE4F1)", border:"1px solid #F0D9F5" }}>
            <div style={{ fontWeight:800, fontSize:"18pt", lineHeight:1, color:"#9333EA" }}>{t.title}</div>
            {t.issuer && <div className="text-[8.5pt] uppercase mt-1" style={{ letterSpacing:"0.08em", color:"#8A6A9E", fontWeight:600 }}>{t.issuer}</div>}
          </div>))}
        </div>
      )}
      <div className="grid gap-9" style={{ padding:"20px 48px 16px", gridTemplateColumns:"1fr 1.5fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Bio")}><RichTextRender html={basics.summary} style={{color:"#473C53",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"skills","Skills")}>
            <div className="flex flex-wrap gap-1.5">{skills.map((s,i)=>(<span key={i} style={{padding:"4px 11px",fontSize:"9.5pt",fontWeight:600,color:"#9333EA",background:"#F6ECFF",borderRadius:9999}}>{s}</span>))}</div>
          </Sec>
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")}><div className="text-[10pt]" style={{color:"#473C53"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div></Sec>}
        </div>
        <div>
          <Sec t={getLabel(data,"experience","Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]">{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:"#EC4899",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="sp-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#473C53"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]">{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#7C6A86"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
      </div>
      {projects.length>0 && (
        <div style={{ padding:"0 48px 40px" }}>
          <h2 className="m-0 mb-3 uppercase" style={{ fontSize:"11.5pt", fontWeight:800, letterSpacing:"0.1em", color:"#9333EA" }}>{getLabel(data,"projects","Featured Content")}</h2>
          <div className="grid gap-3" style={{ gridTemplateColumns:"repeat(3,1fr)" }}>
            {projects.slice(0,6).map((p,i)=>(<div key={i} style={{ borderRadius:12, padding:"12px 14px", background:"#FAF5FF", borderTop:`4px solid ${["#7C3AED","#EC4899","#F59E0B"][i%3]}` }}>
              <p className="m-0 font-bold text-[10pt]">{p.name}</p>{p.description&&<p className="m-0 mt-0.5 text-[9pt]" style={{color:"#7C6A86"}}>{p.description}</p>}
            </div>))}
          </div>
        </div>
      )}
      <style>{`.sp-b li{position:relative;padding-left:15px;margin-bottom:1px}.sp-b li:before{content:"";position:absolute;left:0;top:6px;width:7px;height:7px;border-radius:50%;background:linear-gradient(135deg,#7C3AED,#EC4899)}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11.5pt",fontWeight:800,letterSpacing:"0.1em",color:"#9333EA"}}>{t}</h2>{children}</section>; }
