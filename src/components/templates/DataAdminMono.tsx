// DataAdminMono — Database Administrators, IT Ops, SysAdmins (clean minimal)
// White + big black sans name + circle photo + thin teal rules. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function DataAdminMono({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const T = "#6BAFB4";
  return (
    <article className="w-[794px] min-h-[1123px] bg-white relative overflow-hidden print:shadow-none"
      style={{ color:"#17191C", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.6 }}>
      <header className="grid" style={{ padding:"56px 56px 28px", gridTemplateColumns:"1fr 210px", gap:24, alignItems:"start" }}>
        <div>
          <h1 className="m-0" style={{ fontWeight:800, fontSize:"46pt", lineHeight:0.95, letterSpacing:"-0.03em" }}>{basics.fullName}</h1>
          <p className="m-0 mt-3 uppercase" style={{ fontSize:"14pt", fontWeight:700, letterSpacing:"0.06em" }}>{basics.role}</p>
          <div className="mt-3 text-[9.5pt]" style={{ color:"#4A4F55", lineHeight:1.9 }}>
            {[basics.location&&`Address: ${basics.location}`, basics.email&&`Email: ${basics.email}`, basics.website&&`Portfolio: ${basics.website}`, basics.phone&&`Phone: ${basics.phone}`].filter(Boolean).map((x,i)=>(<p key={i} className="m-0">{x}</p>))}
          </div>
        </div>
        <div style={{ width:200, height:200, borderRadius:"50%", overflow:"hidden", background:"#E8ECEE", justifySelf:"end" }}>
          {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div className="flex items-center justify-center h-full" style={{color:T,fontWeight:800,fontSize:"48pt"}}>{initials(basics.fullName)}</div>}
        </div>
      </header>
      <div className="grid gap-10" style={{ padding:"26px 56px 48px", gridTemplateColumns:"1fr 1.15fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Summary")} c={T}><RichTextRender html={basics.summary} style={{color:"#3A4045",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"education","Education")} c={T}>
            {education.map((e,i)=>(<div key={i} className="mb-3"><p className="m-0 font-bold text-[11pt]">{e.school}</p><p className="m-0 italic text-[10pt]" style={{color:"#4A4F55"}}>{e.degree}{e.endDate?`, ${e.endDate}`:""}</p>{e.notes&&<p className="m-0 text-[9.5pt]" style={{color:"#6B7176"}}>{e.notes}</p>}</div>))}
          </Sec>
          <Sec t={getLabel(data,"languages","Languages")} c={T}>
            <p className="m-0 text-[10pt]" style={{color:"#3A4045"}}>{languages.length?languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · "):"—"}</p>
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"experience","Work Experience")} c={T}>
            {experience.map((e,i)=>(<div key={i} className="mb-3.5 last:mb-0">
              <p className="m-0 font-bold text-[11pt]">{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:"#4A4F55"}}>{e.company}</p>
              <p className="m-0 text-[9.5pt]" style={{color:"#8A9096"}}>{dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="dam-b" style={{margin:"4px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#3A4045"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"skills","Skills")} c={T}>
            <ul className="dam-b" style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",color:"#3A4045"}}>{skills.map((s,i)=>(<li key={i}>{s}</li>))}</ul>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications")} c={T}>
            <ul className="dam-b" style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",color:"#3A4045"}}>{certifications.map((c,i)=>(<li key={i}>{c.name}{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
        </div>
      </div>
      <style>{`.dam-b li{position:relative;padding-left:16px;margin-bottom:3px}.dam-b li:before{content:"";position:absolute;left:0;top:7px;width:6px;height:6px;border-radius:50%;background:#17191C}`}</style>
    </article>
  );
}
function Sec({ t, c, children }: { t:string; c:string; children:React.ReactNode }){ return <section className="mb-6 last:mb-0"><h2 className="m-0 uppercase" style={{fontSize:"14pt",fontWeight:800,letterSpacing:"0.02em"}}>{t}</h2><div style={{height:2,background:c,margin:"8px 0 12px",width:"100%",maxWidth:340}}/>{children}</section>; }
