// GovPolicyCrest — Government, Public Policy, Civil Service, Diplomats, NGO leads
// Ivory + deep navy + gold crest + dignified serif. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function GovPolicyCrest({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#FBFAF5", color:"#1E2A3A", fontFamily:'"Cormorant Garamond","Inter",serif', fontSize:"11pt", lineHeight:1.55 }}>
      <header className="relative" style={{ background:"#16263D", color:"#F4F1E6", padding:"40px 52px 30px", textAlign:"center" }}>
        <svg viewBox="0 0 60 64" style={{ width:54, height:58, margin:"0 auto 8px" }} fill="none" stroke="#C8A24E" strokeWidth="2">
          <path d="M30 4 L52 12 V34 C52 50 42 58 30 62 C18 58 8 50 8 34 V12 Z"/>
          <path d="M30 16 L34 26 L44 26 L36 33 L39 43 L30 37 L21 43 L24 33 L16 26 L26 26 Z" fill="#C8A24E" stroke="none"/>
        </svg>
        <h1 className="m-0" style={{ fontWeight:600, fontSize:"36pt", lineHeight:1, letterSpacing:"0.03em", textTransform:"uppercase", color:"#FBFAF5" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 uppercase" style={{ fontSize:"12pt", color:"#D6B66A", letterSpacing:"0.26em", fontFamily:'"Inter",sans-serif', fontWeight:600 }}>{basics.role}</p>
        <div className="mx-auto mt-3" style={{ width:120, height:1, background:"#C8A24E" }} />
        <p className="m-0 mt-3 text-[9.5pt]" style={{ color:"#B9C2CF", fontFamily:'"Inter",sans-serif' }}>{[basics.email,basics.phone,basics.location,basics.website].filter(Boolean).join("   ·   ")}</p>
      </header>
      <div className="grid gap-9" style={{ padding:"26px 52px 44px", gridTemplateColumns:"1.55fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Statement")}><RichTextRender html={basics.summary} style={{color:"#3A4655",fontSize:"11pt",textAlign:"justify"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Appointments & Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-semibold text-[13pt]" style={{color:"#16263D"}}>{e.role}</p>
              <p className="m-0 italic text-[10.5pt]" style={{color:"#9A7B2E",fontFamily:'"Inter",sans-serif'}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="gpc-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#3A4655",fontFamily:'"Inter",sans-serif'}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-semibold text-[12pt]" style={{color:"#16263D"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#5A6675",fontFamily:'"Inter",sans-serif'}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Areas of Expertise")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10.5pt",fontFamily:'"Inter",sans-serif'}}>{skills.map((s,i)=>(<li key={i} style={{padding:"4px 0",borderBottom:i<skills.length-1?"1px solid #E6E0CF":"0",color:"#2E3A48"}}><span style={{color:"#C8A24E",marginRight:8}}>★</span>{s}</li>))}</ul>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Honours & Clearances")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",color:"#3A4655",fontFamily:'"Inter",sans-serif'}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b style={{color:"#16263D"}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")}>
            <p className="m-0 text-[10pt]" style={{color:"#3A4655",fontFamily:'"Inter",sans-serif'}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(", ")}</p>
          </Sec>}
        </div>
      </div>
      <style>{`.gpc-b li{position:relative;padding-left:15px;margin-bottom:2px}.gpc-b li:before{content:"";position:absolute;left:0;top:7px;width:5px;height:5px;background:#C8A24E;transform:rotate(45deg)}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5" style={{fontSize:"15pt",fontWeight:600,color:"#16263D",letterSpacing:"0.02em",borderBottom:"2px solid #C8A24E",paddingBottom:3}}>{t}</h2>{children}</section>; }
