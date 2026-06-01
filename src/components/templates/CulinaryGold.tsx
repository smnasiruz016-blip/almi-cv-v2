// CulinaryGold — Chefs, Executive/Sous/Pastry Chefs, Culinary Directors
// Charcoal + warm gold + plate motif + elegant serif. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function CulinaryGold({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#16130F", color:"#EDE6D6", fontFamily:'"Cormorant Garamond","Inter",serif', fontSize:"11pt", lineHeight:1.55 }}>
      <header className="relative" style={{ padding:"46px 56px 26px", textAlign:"center" }}>
        <svg viewBox="0 0 140 140" style={{ position:"absolute", left:"50%", top:30, transform:"translateX(-50%)", width:128, height:128, opacity:0.5 }}>
          <circle cx="70" cy="70" r="60" fill="none" stroke="#C9A24E" strokeWidth="1.4"/>
          <circle cx="70" cy="70" r="48" fill="none" stroke="#C9A24E" strokeWidth="0.8"/>
        </svg>
        <div className="relative mx-auto" style={{ width:118, height:118, borderRadius:"50%", padding:4, background:"linear-gradient(135deg,#F4D58A,#9C7320)", marginBottom:14 }}>
          <div style={{ width:"100%", height:"100%", borderRadius:"50%", background:"#16130F", display:"flex", alignItems:"center", justifyContent:"center", color:"#E7BE63", fontWeight:600, fontSize:"36pt" }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}/> : initials(basics.fullName)}
          </div>
        </div>
        <h1 className="m-0 relative" style={{ fontWeight:600, fontSize:"40pt", lineHeight:1, letterSpacing:"0.04em", textTransform:"uppercase", color:"#F6EFDF" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 relative uppercase" style={{ fontSize:"13pt", color:"#E7BE63", letterSpacing:"0.28em", fontFamily:'"Inter",sans-serif', fontWeight:600 }}>{basics.role}</p>
        <div className="relative mx-auto mt-4" style={{ width:120, height:1, background:"linear-gradient(90deg,transparent,#C9A24E,transparent)" }}/>
        <p className="m-0 mt-3 relative text-[9.5pt]" style={{ color:"#A99C82", fontFamily:'"Inter",sans-serif' }}>{[basics.email,basics.phone,basics.location,basics.website].filter(Boolean).join("   ·   ")}</p>
      </header>
      <div className="grid gap-9" style={{ padding:"10px 56px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")}><RichTextRender html={basics.summary} style={{color:"#C7BCA4",fontSize:"11pt",fontStyle:"italic"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-semibold text-[13pt]" style={{color:"#F6EFDF"}}>{e.role}</p>
              <p className="m-0 italic text-[10.5pt]" style={{color:"#E7BE63",fontFamily:'"Inter",sans-serif'}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="cg-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#C7BCA4",fontFamily:'"Inter",sans-serif'}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-semibold text-[12pt]" style={{color:"#F6EFDF"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#A99C82",fontFamily:'"Inter",sans-serif'}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Specialties")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10.5pt",fontFamily:'"Inter",sans-serif'}}>{skills.map((s,i)=>(<li key={i} style={{padding:"4px 0",borderBottom:i<skills.length-1?"1px solid rgba(201,162,78,0.22)":"0",color:"#D8CFB8"}}><span style={{color:"#E7BE63",marginRight:8}}>◆</span>{s}</li>))}</ul>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Honors")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",color:"#C7BCA4",fontFamily:'"Inter",sans-serif'}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b style={{color:"#F6EFDF"}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")}>
            <p className="m-0 text-[10pt]" style={{color:"#C7BCA4",fontFamily:'"Inter",sans-serif'}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(", ")}</p>
          </Sec>}
        </div>
      </div>
      <style>{`.cg-b li{position:relative;padding-left:14px;margin-bottom:2px}.cg-b li:before{content:"—";position:absolute;left:0;color:#E7BE63}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5" style={{fontSize:"16pt",fontWeight:600,color:"#E7BE63",letterSpacing:"0.04em",borderBottom:"1px solid rgba(201,162,78,0.3)",paddingBottom:4}}>{t}</h2>{children}</section>; }
