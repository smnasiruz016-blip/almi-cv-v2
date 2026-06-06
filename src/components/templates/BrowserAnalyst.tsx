// BrowserAnalyst — Digital/Web Analysts, SEO, Web Designers (browser-window UI)
// Sky-blue desktop + white browser cards w/ traffic-light dots. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function BrowserAnalyst({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#34A3E0", color:"#1C2530", fontFamily:'"Inter",sans-serif', fontSize:"10pt", lineHeight:1.5, padding:"26px" }}>
      <div className="grid gap-5" style={{ gridTemplateColumns:"1fr 1fr" }}>
        <Card bar="#2C7BB0">
          <div style={{ width:"100%", height:150, overflow:"hidden", background:"#cfd8e0" }}>{basics.photoUrl && <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>}</div>
          <div style={{ background:"#fff", border:"3px solid #1C2530", borderTop:"none", padding:"8px 12px" }}>
            <h1 className="m-0" style={{ fontWeight:800, fontSize:"24pt", letterSpacing:"-0.01em" }}>{basics.fullName}</h1>
          </div>
        </Card>
        <div>
          <Card bar="#2C7BB0" search>
            <div style={{ padding:"4px 0" }}>
              <p className="m-0 uppercase text-center" style={{ fontWeight:700, letterSpacing:"0.22em", fontSize:"12pt", background:"#2C7BB0", color:"#fff", padding:"6px" }}>{basics.role}</p>
              {basics.summary && <div style={{ padding:"8px 4px 2px" }}><RichTextRender html={basics.summary} style={{fontSize:"10pt",color:"#33414F"}}/></div>}
            </div>
          </Card>
          <div style={{ height:14 }}/>
          <div className="text-white text-[9.5pt]" style={{ lineHeight:2 }}>
            {[basics.email,basics.location,basics.phone].filter(Boolean).map((x,i)=>(<div key={i}>◇ {x}</div>))}
          </div>
        </div>
      </div>
      <div style={{ height:18 }}/>
      <div className="grid gap-5" style={{ gridTemplateColumns:"1fr 1fr" }}>
        <div className="flex flex-col gap-4">
          <Card bar="#E8503A">
            <Body>
              <Hd>{getLabel(data,"education","Education")}</Hd>
              {education.map((e,i)=>(<div key={i} className="mb-2"><p className="m-0 font-bold text-[11pt]">{e.school}</p><p className="m-0 italic text-[9.5pt]" style={{color:"#5C6773"}}>{e.degree}{e.endDate?` / ${e.startDate||""}–${e.endDate}`:""}</p></div>))}
            </Body>
          </Card>
          <Card bar="#E8503A" solid="#F6A623">
            <div style={{ padding:"12px 14px" }}>
              <Hd light>{getLabel(data,"skills","Skills")}</Hd>
              {skills.slice(0,7).map((s,i)=>(<div key={i} className="flex items-center justify-between mb-1.5"><span className="text-[9.5pt]">{s}</span><span style={{display:"inline-block",width:88,height:9,border:"2px solid #1C2530",borderRadius:5,background:"#fff"}}><span style={{display:"block",height:"100%",borderRadius:3,width:`${88-i*6}%`,background:"#E8503A"}}/></span></div>))}
              {languages.length>0 && <><div style={{height:8}}/><Hd light>{getLabel(data,"languages","Language")}</Hd>
                {languages.map((l,i)=>(<div key={i} className="flex items-center justify-between mb-1"><span className="text-[9.5pt]">{l.name}</span><span className="text-[9pt]" style={{color:"#3C2E0A"}}>{l.level}</span></div>))}</>}
            </div>
          </Card>
        </div>
        <Card bar="#E8503A">
          <Body>
            <Hd>{getLabel(data,"experience","Experience")}</Hd>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11pt]">{e.role}</p>
              <p className="m-0 text-[9pt]" style={{color:"#2C7BB0",fontWeight:600,fontStyle:"italic"}}>{e.company} &nbsp; {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="ba-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#33414F"}}/>
            </div>))}
            {certifications.length>0 && <div className="mt-2 pt-2 text-[9pt]" style={{borderTop:"1px solid #E2E6EA",color:"#5C6773"}}>{certifications.map(c=>c.name).join(" · ")}</div>}
          </Body>
        </Card>
      </div>
      <style>{`.ba-b li{position:relative;padding-left:13px;margin-bottom:1px}.ba-b li:before{content:"›";position:absolute;left:0;color:#2C7BB0;font-weight:700}`}</style>
    </article>
  );
}
function Card({ bar, children, search, solid }: { bar:string; children:React.ReactNode; search?:boolean; solid?:string }){
  return (
    <section style={{ border:"3px solid #1C2530", background: solid||"#fff", boxShadow:"4px 4px 0 rgba(0,0,0,0.25)" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent: search?"space-between":"flex-end", background:bar, borderBottom:"3px solid #1C2530", padding:"5px 9px" }}>
        {search && <span style={{ width:20, height:16, background:"#F6A623", border:"2px solid #1C2530", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"9pt" }}>⚲</span>}
        <span className="flex gap-1.5">
          <span style={{width:11,height:11,borderRadius:"50%",background:"#fff",border:"2px solid #1C2530"}}/>
          <span style={{width:11,height:11,borderRadius:"50%",background:"#F6A623",border:"2px solid #1C2530"}}/>
        </span>
      </div>
      {children}
    </section>
  );
}
function Body({ children }: { children:React.ReactNode }){ return <div style={{ padding:"12px 14px" }}>{children}</div>; }
function Hd({ children, light }: { children:React.ReactNode; light?:boolean }){ return <h2 className="m-0 mb-2 uppercase" style={{ fontSize:"11pt", fontWeight:800, letterSpacing:"0.2em", color:"#1C2530", display:"inline-block", background:light?"#fff":"#FCE5A8", padding:"1px 6px" }}>{children}</h2>; }
