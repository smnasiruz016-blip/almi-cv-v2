// ProductRoadmap — Product Managers, Product Owners, PM leadership
// Light slate + indigo + roadmap timeline + metric tiles. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function ProductRoadmap({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], awards = [] } = data;
  const tiles = awards.slice(0,3);
  return (
    <article className="w-[794px] min-h-[1123px] bg-white relative overflow-hidden print:shadow-none"
      style={{ color:"#1B2233", fontFamily:'"Plus Jakarta Sans","Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5 }}>
      <header className="relative" style={{ padding:"44px 50px 26px", background:"linear-gradient(120deg,#EEF1FF 0%,#F6F4FF 100%)" }}>
        <h1 className="m-0" style={{ fontWeight:800, fontSize:"39pt", lineHeight:1, letterSpacing:"-0.02em", color:"#1B2233" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1.5 uppercase" style={{ fontSize:"12.5pt", color:"#5B5BF0", fontWeight:700, letterSpacing:"0.14em" }}>{basics.role}</p>
        <p className="m-0 mt-3 text-[9.5pt]" style={{ color:"#6A7187" }}>{[basics.email,basics.phone,basics.location,basics.website].filter(Boolean).join("   ·   ")}</p>
        <div className="flex items-center mt-5" style={{ gap:0 }}>
          {["Discover","Define","Build","Ship","Scale"].map((s,i)=>(<React.Fragment key={i}>
            <div className="flex flex-col items-center" style={{ width:62 }}>
              <div style={{ width:13, height:13, borderRadius:"50%", background:i<3?"#5B5BF0":"#C4C8F5" }}/>
              <span className="text-[7.5pt] mt-1 uppercase" style={{ color:"#6A7187", letterSpacing:"0.06em" }}>{s}</span>
            </div>
            {i<4 && <div style={{ flex:1, height:2, background:i<2?"#5B5BF0":"#C4C8F5", marginTop:-16 }}/>}
          </React.Fragment>))}
        </div>
      </header>
      {tiles.length>0 && (
        <div className="grid gap-3" style={{ gridTemplateColumns:`repeat(${tiles.length},1fr)`, padding:"18px 50px 4px" }}>
          {tiles.map((t,i)=>(<div key={i} style={{ borderRadius:12, padding:"12px 14px", background:"#0E1430", color:"#fff" }}>
            <div style={{ fontWeight:800, fontSize:"17pt", lineHeight:1, color:"#8C8CFF" }}>{t.title}</div>
            {t.issuer && <div className="text-[8.5pt] uppercase mt-1" style={{ letterSpacing:"0.1em", color:"#AEB3D6" }}>{t.issuer}</div>}
          </div>))}
        </div>
      )}
      <div className="grid gap-8" style={{ padding:"20px 50px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")}><RichTextRender html={basics.summary} style={{color:"#475067",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]">{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:"#5B5BF0",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="pr-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#475067"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]">{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#6A7187"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Skills")}>
            <div className="flex flex-wrap gap-1.5">{skills.map((s,i)=>(<span key={i} style={{padding:"4px 11px",fontSize:"9.5pt",fontWeight:600,color:"#3B3BC7",background:"#EEF0FF",borderRadius:8}}>{s}</span>))}</div>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#475067"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")}>
            <div className="text-[9.5pt]" style={{color:"#475067"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.pr-b li{position:relative;padding-left:14px;margin-bottom:2px}.pr-b li:before{content:"";position:absolute;left:0;top:6px;width:7px;height:7px;border-radius:2px;background:#5B5BF0}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"10.5pt",fontWeight:800,letterSpacing:"0.14em",color:"#1B2233"}}>{t}</h2>{children}</section>; }
