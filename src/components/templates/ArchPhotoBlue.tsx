// ArchPhotoBlue — Product/Project Managers, Business leads (dark sidebar)
// Navy sidebar + arched photo + blue header block + skill bars. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function ArchPhotoBlue({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden bg-white print:shadow-none"
      style={{ color:"#27313B", fontFamily:'"Inter",sans-serif', fontSize:"10pt", lineHeight:1.5, display:"grid", gridTemplateColumns:"262px 1fr" }}>
      <aside style={{ background:"#0E2236", color:"#DCE6F0", padding:"0 0 30px" }}>
        <div style={{ background:"#1E5BB8", padding:"22px 22px 30px", display:"flex", justifyContent:"center" }}>
          <div style={{ width:172, height:206, borderRadius:"86px 86px 0 0", overflow:"hidden", background:"#15314f", border:"3px solid #fff" }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div className="flex items-center justify-center h-full" style={{color:"#fff",fontWeight:700,fontSize:"40pt"}}>{initials(basics.fullName)}</div>}
          </div>
        </div>
        <div style={{ padding:"24px 24px 0" }}>
          <SecL t={getLabel(data,"contact","Contact")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9pt",lineHeight:1.9,color:"#C4D2E2",wordBreak:"break-word"}}>{[basics.phone,basics.email,basics.website,basics.location].filter(Boolean).map((x,i)=>(<li key={i} className="flex gap-2"><span style={{color:"#5B9BE8"}}>◆</span>{x}</li>))}</ul>
          </SecL>
          <SecL t={getLabel(data,"skills","Skills")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",lineHeight:1.7,color:"#C4D2E2"}}>{skills.map((s,i)=>(<li key={i} className="flex items-start gap-2 mb-1"><span style={{color:"#5B9BE8",marginTop:1}}>•</span>{s}</li>))}</ul>
          </SecL>
          {languages.length>0 && <SecL t={getLabel(data,"languages","Languages")}>
            {languages.map((l,i)=>(<div key={i} className="mb-2"><div className="flex justify-between text-[9pt]"><span>{l.name}</span></div><div style={{height:6,marginTop:2,borderRadius:4,background:"#23405e"}}><div style={{height:"100%",borderRadius:4,width:`${92-i*10}%`,background:"#1E5BB8"}}/></div></div>))}
          </SecL>}
        </div>
      </aside>
      <main style={{ display:"flex", flexDirection:"column" }}>
        <header style={{ background:"#1E5BB8", color:"#fff", padding:"40px 40px 30px" }}>
          <h1 className="m-0" style={{ fontWeight:900, fontSize:"38pt", lineHeight:0.96, letterSpacing:"-0.01em" }}>{basics.fullName}</h1>
          <p className="m-0 mt-1 uppercase" style={{ fontSize:"13pt", letterSpacing:"0.24em", color:"#DCE9FA", fontWeight:400 }}>{basics.role}</p>
        </header>
        <div style={{ padding:"26px 40px 40px" }}>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")}><RichTextRender html={basics.summary} style={{color:"#46525F",fontSize:"10pt"}}/></Sec>}
          <Sec t={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt] uppercase" style={{letterSpacing:"0.02em"}}>{e.degree}</p><p className="m-0 text-[9.5pt]" style={{color:"#5B6B79"}}>{e.school}{e.startDate?` (${e.startDate}${e.endDate?`-${e.endDate}`:""})`:""}</p></div>))}
          </Sec>
          <Sec t={getLabel(data,"experience","Work Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11pt] uppercase" style={{letterSpacing:"0.02em"}}>{e.role}</p>
              <p className="m-0 text-[9.5pt]" style={{color:"#1E5BB8",fontWeight:600}}>{e.company} {e.startDate&&`(${dateRange(e.startDate,e.endDate,e.current)})`}</p>
              <BulletsRender bullets={e.bullets} className="apb-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#46525F"}}/>
            </div>))}
          </Sec>
        </div>
      </main>
      <style>{`.apb-b li{position:relative;padding-left:14px;margin-bottom:1px}.apb-b li:before{content:"";position:absolute;left:0;top:6px;width:6px;height:6px;border-radius:50%;background:#1E5BB8}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"13pt",fontWeight:800,letterSpacing:"0.04em",color:"#0E2236",borderBottom:"2px solid #1E5BB8",paddingBottom:3,display:"inline-block",whiteSpace:"nowrap"}}>{t}</h2>{children}</section>; }
function SecL({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5"><h2 className="m-0 mb-2 uppercase" style={{fontSize:"11.5pt",fontWeight:800,letterSpacing:"0.1em",color:"#fff",borderBottom:"1px solid #2E4A66",paddingBottom:3}}>{t}</h2>{children}</section>; }
