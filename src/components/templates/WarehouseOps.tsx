// WarehouseOps — Warehouse, Supply Chain, Forklift, Inventory, Dispatch
// Steel grey + safety orange + box/pallet + route motif. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function WarehouseOps({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden bg-white print:shadow-none"
      style={{ color:"#222831", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5 }}>
      <header className="relative grid items-center" style={{ gridTemplateColumns:"150px 1fr", gap:24, padding:"36px 48px 28px", background:"#2B333E", color:"#fff" }}>
        <div style={{ position:"absolute", top:0, left:0, width:"100%", height:6, background:"repeating-linear-gradient(45deg,#F5871F 0 16px,#2B333E 16px 32px)" }} />
        <div style={{ width:140, height:140, overflow:"hidden", background:"#3D4654", border:"3px solid #F5871F" }}>
          {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div className="flex items-center justify-center h-full" style={{color:"#F5871F",fontWeight:800,fontSize:"38pt"}}>{initials(basics.fullName)}</div>}
        </div>
        <div>
          <h1 className="m-0" style={{ fontWeight:900, fontSize:"36pt", lineHeight:0.95, letterSpacing:"-0.01em", textTransform:"uppercase" }}>{basics.fullName}</h1>
          <p className="m-0 mt-1 uppercase" style={{ fontSize:"13pt", color:"#F5871F", fontWeight:700, letterSpacing:"0.16em" }}>{basics.role}</p>
          <p className="m-0 mt-2 text-[9pt]" style={{ color:"#AEB6C2" }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   ·   ")}</p>
        </div>
      </header>
      <div className="grid gap-8" style={{ padding:"26px 48px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")}><RichTextRender html={basics.summary} style={{color:"#48505C",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]">{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:"#C96A12",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="wo-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#48505C"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education & Training")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]">{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#727C88"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Skills")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt"}}>{skills.map((s,i)=>(<li key={i} className="flex items-start gap-2 mb-1" style={{color:"#333B45"}}><span style={{color:"#F5871F",fontWeight:800}}>▪</span>{s}</li>))}</ul>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications & Licenses")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#48505C"}}>{certifications.map((c,i)=>(<li key={i} style={{padding:"3px 0",borderBottom:i<certifications.length-1?"1px solid #EEE":"0"}}><b style={{color:"#222831"}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")}>
            <div className="text-[9.5pt]" style={{color:"#48505C"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.wo-b li{position:relative;padding-left:15px;margin-bottom:1px}.wo-b li:before{content:"";position:absolute;left:0;top:5px;width:8px;height:8px;background:#F5871F}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11.5pt",fontWeight:800,letterSpacing:"0.08em",color:"#222831",borderBottom:"3px solid #F5871F",paddingBottom:3,display:"inline-block"}}>{t}</h2>{children}</section>; }
