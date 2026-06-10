// ParalegalBrief — Paralegals, Legal Assistants, Court Clerks (crisp legal)
// White + oxblood + slate + ruled brief-document feel + case-file tabs. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function ParalegalBrief({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const O = "#7A1F2B", S = "#3A4456";
  return (
    <article className="w-[794px] min-h-[1123px] bg-white relative overflow-hidden print:shadow-none"
      style={{ color:"#2E3340", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.6 }}>
      <span style={{ position:"absolute", left:64, top:0, bottom:0, width:1.5, background:"#E8B8BE" }}/>
      <header className="relative" style={{ padding:"46px 56px 22px 88px" }}>
        <p className="m-0 mb-1 uppercase text-[8.5pt]" style={{ color:O, letterSpacing:"0.34em", fontWeight:700 }}>Legal Support Professional</p>
        <h1 className="m-0" style={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:600, fontSize:"38pt", lineHeight:0.98, color:"#1E2330" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 uppercase" style={{ fontSize:"12pt", color:O, fontWeight:700, letterSpacing:"0.18em" }}>{basics.role}</p>
        <p className="m-0 mt-2 text-[9pt]" style={{ color:"#6E7585" }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   ·   ")}</p>
      </header>
      <div className="grid gap-9" style={{ padding:"16px 56px 46px 88px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Summary")} o={O}><RichTextRender html={basics.summary} style={{color:"#465064",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experience")} o={O}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <div className="flex items-start justify-between gap-3">
                <p className="m-0 font-bold text-[11pt]" style={{flex:1,minWidth:0,color:"#1E2330"}}>{e.role}</p>
                <span className="text-[9pt] whitespace-nowrap" style={{color:O,fontWeight:700,flexShrink:0,paddingTop:2}}>{dateRange(e.startDate,e.endDate,e.current)}</span>
              </div>
              <p className="m-0 italic text-[10pt]" style={{color:S}}>{e.company}</p>
              <BulletsRender bullets={e.bullets} className="plb-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#465064"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")} o={O}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:"#1E2330"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#6E7585"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Competencies")} o={O}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt"}}>{skills.map((s,i)=>(<li key={i} style={{padding:"4px 0",borderBottom:i<skills.length-1?"1px solid #EDE4E2":"0",color:"#39435A"}}><span style={{color:O,marginRight:8}}>§</span>{s}</li>))}</ul>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications")} o={O}>
            <div className="flex flex-col gap-1.5">{certifications.map((c,i)=>(<span key={i} style={{padding:"5px 12px",fontSize:"9pt",fontWeight:700,color:"#fff",background:i%2?S:O,borderRadius:"0 8px 8px 0",alignSelf:"flex-start"}}>{c.name}{c.year?` · ${c.year}`:""}</span>))}</div>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")} o={O}>
            <div className="text-[9.5pt]" style={{color:"#465064"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.plb-b li{position:relative;padding-left:14px;margin-bottom:2px}.plb-b li:before{content:"";position:absolute;left:0;top:7px;width:5px;height:5px;background:#7A1F2B;transform:rotate(45deg)}`}</style>
    </article>
  );
}
function Sec({ t, o, children }: { t:string; o:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11pt",fontWeight:800,letterSpacing:"0.14em",color:"#1E2330",borderBottom:`2px solid ${o}`,paddingBottom:3,display:"inline-block",whiteSpace:"nowrap"}}>{t}</h2>{children}</section>; }
