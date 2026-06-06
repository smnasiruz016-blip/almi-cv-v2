// PeachGridOrganic — Graphic Designers, Illustrators, Social/Brand creatives
// Cream + peach organic blobs + grid texture + black label bars. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function PeachGridOrganic({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], certifications = [], interests = [] } = data;
  const soft = interests.length ? interests : [];
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#FFFCF8", color:"#2B2B2B", fontFamily:'"Inter",sans-serif', fontSize:"10pt", lineHeight:1.5 }}>
      {/* decorative corners */}
      <svg viewBox="0 0 794 1123" preserveAspectRatio="none" style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
        <path d="M794 0 Q620 60 660 180 Q700 300 794 250 Z" fill="#F4B79E" opacity="0.85"/>
        <path d="M794 60 Q700 120 740 210 Q780 280 794 230 Z" fill="#F9D9C2" opacity="0.9"/>
        <path d="M0 1123 Q150 1040 110 920 Q70 820 0 880 Z" fill="#F4B79E" opacity="0.7"/>
        <path d="M0 1050 Q90 1000 70 930 Q50 870 0 910 Z" fill="#F9D9C2" opacity="0.8"/>
        {Array.from({length:7}).map((_,i)=><line key={"v"+i} x1={20+i*26} y1="20" x2={20+i*26} y2="180" stroke="#F4B79E" strokeWidth="2" opacity="0.5"/>)}
        {Array.from({length:6}).map((_,i)=><line key={"h"+i} x1="20" y1={20+i*26} x2="176" y2={20+i*26} stroke="#F4B79E" strokeWidth="2" opacity="0.5"/>)}
        <circle cx="1280" cy="0" r="0" fill="none"/>
        <circle cx="40" cy="700" r="7" fill="#E8C9A0"/><circle cx="120" cy="780" r="5" fill="#E8C9A0"/><circle cx="1300" cy="600" r="0"/>
      </svg>
      <header className="relative grid items-center" style={{ gridTemplateColumns:"230px 1fr", gap:24, padding:"46px 48px 20px" }}>
        <div style={{ width:200, height:200, borderRadius:"50%", overflow:"hidden", background:"#C99", border:"7px solid #9E6B72", justifySelf:"center" }}>
          {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div className="flex items-center justify-center h-full" style={{background:"#9E6B72",color:"#fff",fontWeight:700,fontSize:"40pt"}}>{initials(basics.fullName)}</div>}
        </div>
        <div>
          <h1 className="m-0" style={{ fontWeight:800, fontSize:"42pt", lineHeight:0.92, textTransform:"uppercase", letterSpacing:"-0.01em", color:"#9E5560" }}>{basics.fullName}</h1>
          <p className="m-0 mt-1" style={{ fontSize:"15pt", color:"#B98088", fontWeight:400 }}>{basics.role}</p>
          {basics.summary && <div className="mt-3"><Bar>{getLabel(data,"summary","Profile")}</Bar><div style={{marginTop:6}}><RichTextRender html={basics.summary} style={{fontSize:"10pt",color:"#4A4A4A"}}/></div></div>}
        </div>
      </header>
      <div className="relative grid gap-8" style={{ padding:"14px 48px 48px", gridTemplateColumns:"1fr 1.6fr" }}>
        <div className="flex flex-col gap-4">
          <div><Bar>{getLabel(data,"contact","Contact")}</Bar><ul style={{margin:"6px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",lineHeight:1.8,color:"#3C3C3C"}}>{[basics.phone,basics.email,basics.website,basics.location].filter(Boolean).map((x,i)=>(<li key={i}>{x}</li>))}</ul></div>
          <div><Bar>{getLabel(data,"skills","Design Skills")}</Bar><ul className="pgo-li" style={{margin:"6px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#3C3C3C"}}>{skills.map((s,i)=>(<li key={i}>{s}</li>))}</ul></div>
          {soft.length>0 && <div><Bar>{getLabel(data,"interests","Soft Skills")}</Bar><ul className="pgo-li" style={{margin:"6px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#3C3C3C"}}>{soft.map((s,i)=>(<li key={i}>{s}</li>))}</ul></div>}
        </div>
        <div className="flex flex-col gap-4">
          <div><Bar>{getLabel(data,"experience","Experience")}</Bar>
            <div style={{marginTop:8}}>{experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold italic text-[11pt]">{e.role}</p>
              <p className="m-0 text-[9.5pt]" style={{color:"#9E6B72",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="pgo-b" style={{margin:"2px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#4A4A4A"}}/>
            </div>))}</div>
          </div>
          <div><Bar>{getLabel(data,"education","Education")}</Bar>
            <div style={{marginTop:8}}>{education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold italic text-[10pt]">{e.degree}</p><p className="m-0 text-[9.5pt]" style={{color:"#6C6C6C"}}>{e.school}{e.endDate?` | ${e.endDate}`:""}</p></div>))}</div>
          </div>
          {certifications.length>0 && <div><Bar>{getLabel(data,"certifications","Certifications")}</Bar><ul className="pgo-b" style={{margin:"8px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#4A4A4A"}}>{certifications.map((c,i)=>(<li key={i}>{c.name}{c.year?` – ${c.year}`:""}</li>))}</ul></div>}
        </div>
      </div>
      <style>{`.pgo-li li,.pgo-b li{position:relative;padding-left:14px;margin-bottom:2px}.pgo-li li:before,.pgo-b li:before{content:"";position:absolute;left:0;top:6px;width:6px;height:6px;border-radius:50%;background:#E0876A}`}</style>
    </article>
  );
}
function Bar({ children }: { children:React.ReactNode }){ return <span style={{ display:"inline-block", background:"#1F1F1F", color:"#fff", fontWeight:800, fontSize:"12pt", letterSpacing:"0.04em", padding:"4px 16px 4px 12px", textTransform:"uppercase" }}>{children}</span>; }
