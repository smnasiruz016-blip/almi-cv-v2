// BankFinanceOps — Bank Tellers, Loan Officers, Branch Staff, Finance Ops
// Crisp white + forest green + gold pinstripe + column ledger feel. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function BankFinanceOps({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const G = "#1C5C42", GD = "#B89230";
  return (
    <article className="w-[794px] min-h-[1123px] bg-white relative overflow-hidden print:shadow-none"
      style={{ color:"#28332E", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <span style={{ position:"absolute", left:0, top:0, width:"100%", height:8, background:`repeating-linear-gradient(90deg,${G} 0 60px,${GD} 60px 72px)` }}/>
      <header className="relative grid items-center" style={{ padding:"44px 50px 24px", gridTemplateColumns: basics.photoUrl?"110px 1fr":"1fr", gap:20 }}>
        {basics.photoUrl && <div style={{ width:104, height:104, borderRadius:"50%", overflow:"hidden", border:`3px solid ${G}` }}><img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>}
        <div>
          <h1 className="m-0" style={{ fontWeight:800, fontSize:"34pt", lineHeight:1, letterSpacing:"-0.01em", color:G }}>{basics.fullName}</h1>
          <p className="m-0 mt-1 uppercase" style={{ fontSize:"12pt", color:GD, fontWeight:700, letterSpacing:"0.18em" }}>{basics.role}</p>
          <p className="m-0 mt-2 text-[9pt]" style={{ color:"#5E6A64" }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   ·   ")}</p>
        </div>
      </header>
      <div className="grid gap-9" style={{ padding:"18px 50px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")} c={G}><RichTextRender html={basics.summary} style={{color:"#44514A",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experience")} c={G}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <div className="flex items-start justify-between gap-3" style={{borderBottom:"1px dotted #CBD6CF",paddingBottom:2}}>
                <p className="m-0 font-bold text-[11pt]" style={{flex:1,minWidth:0,color:"#1E2A24"}}>{e.role}</p>
                <span className="text-[9pt] whitespace-nowrap" style={{color:GD,fontWeight:700,flexShrink:0,paddingTop:3}}>{dateRange(e.startDate,e.endDate,e.current)}</span>
              </div>
              <p className="m-0 text-[10pt]" style={{color:G,fontWeight:600}}>{e.company}</p>
              <BulletsRender bullets={e.bullets} className="bfo-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#44514A"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")} c={G}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:"#1E2A24"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#6E7A74"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Core Skills")} c={G}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt"}}>{skills.map((s,i)=>(<li key={i} style={{padding:"4px 0",borderBottom:i<skills.length-1?"1px solid #E4EAE6":"0",color:"#33403A"}}><span style={{color:GD,marginRight:8}}>▰</span>{s}</li>))}</ul>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Licenses & Certs")} c={G}>
            <ul className="bfo-b" style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#44514A"}}>{certifications.map((c,i)=>(<li key={i}>{c.name}{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")} c={G}>
            <div className="text-[9.5pt]" style={{color:"#44514A"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.bfo-b li{position:relative;padding-left:14px;margin-bottom:2px}.bfo-b li:before{content:"";position:absolute;left:0;top:7px;width:6px;height:6px;background:#1C5C42}`}</style>
    </article>
  );
}
function Sec({ t, c, children }: { t:string; c:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11.5pt",fontWeight:800,letterSpacing:"0.1em",color:c,borderBottom:`2px solid ${c}`,paddingBottom:3,display:"inline-block",whiteSpace:"nowrap"}}>{t}</h2>{children}</section>; }
