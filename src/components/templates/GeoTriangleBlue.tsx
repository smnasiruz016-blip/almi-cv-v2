// GeoTriangleBlue — Marketing, Business, Management (clean geometric)
// White + steel-blue triangle corners + semicircle skill dials. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function GeoTriangleBlue({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], interests = [] } = data;
  const dials = skills.slice(0,3);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden bg-white print:shadow-none"
      style={{ color:"#2A2E33", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <svg viewBox="0 0 794 1123" preserveAspectRatio="none" style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
        <polygon points="794,0 794,300 540,0" fill="#3F7CAC"/>
        <polygon points="0,1123 300,1123 0,820" fill="#3F7CAC"/>
        <polygon points="0,1123 180,1123 0,950" fill="#2E5E84"/>
      </svg>
      <header className="relative grid items-center" style={{ gridTemplateColumns:"210px 1fr", gap:26, padding:"46px 56px 26px" }}>
        <div style={{ width:190, height:230, overflow:"hidden", background:"#dfe6ec" }}>
          {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div className="flex items-center justify-center h-full" style={{color:"#3F7CAC",fontWeight:700,fontSize:"40pt"}}>{initials(basics.fullName)}</div>}
        </div>
        <div>
          <h1 className="m-0" style={{ fontWeight:800, fontSize:"40pt", lineHeight:0.98, letterSpacing:"-0.02em", color:"#23282D" }}>{basics.fullName}</h1>
          <p className="m-0 mt-1 uppercase" style={{ fontSize:"13pt", letterSpacing:"0.22em", color:"#3F7CAC", fontWeight:600 }}>{basics.role}</p>
        </div>
      </header>
      <div className="relative grid gap-9" style={{ padding:"6px 56px 30px", gridTemplateColumns:"200px 1fr" }}>
        <aside>
          <div className="flex flex-col gap-1 text-[9.5pt]" style={{ color:"#3C424A" }}>
            {[basics.phone,basics.email,basics.website,basics.location].filter(Boolean).map((x,i)=>(<div key={i} className="flex items-start gap-2"><span style={{color:"#3F7CAC",fontWeight:700}}>▸</span>{x}</div>))}
          </div>
          {languages.length>0 && <SecH t={getLabel(data,"languages","Idiomas")}>{languages.map((l,i)=>(<p key={i} className="m-0 mb-0.5"><b>{l.name}:</b> <span style={{color:"#5C636B"}}>{l.level}</span></p>))}</SecH>}
          {(interests.length>0||certifications.length>0) && <SecH t={getLabel(data,"interests","Más información")}>
            <ul className="gtb-b" style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#3C424A"}}>{[...interests, ...certifications.map(c=>c.name)].map((x,i)=>(<li key={i}>{x}</li>))}</ul>
          </SecH>}
        </aside>
        <main>
          {basics.summary && <Sec t={getLabel(data,"summary","Sobre mí")}><RichTextRender html={basics.summary} style={{color:"#454B52",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experiencia laboral")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11pt]">{e.role}</p>
              <p className="m-0 text-[9.5pt]" style={{color:"#3F7CAC",fontWeight:600}}>{e.company} | {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="gtb-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#454B52"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Datos académicos")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]">{e.school}</p><p className="m-0 text-[9.5pt]" style={{color:"#5C636B"}}>{e.degree}{e.endDate?` | ${e.endDate}`:""}</p></div>))}
          </Sec>
          {dials.length>0 && <Sec t={getLabel(data,"skills","Habilidades")}>
            <div className="flex justify-around" style={{ paddingTop:6 }}>
              {dials.map((s,i)=>(<div key={i} className="flex flex-col items-center" style={{ width:120 }}>
                <svg viewBox="0 0 100 56" style={{ width:100, height:56 }}>
                  <path d="M8 52 A42 42 0 0 1 92 52" fill="none" stroke="#D7E1E9" strokeWidth="9" strokeLinecap="round"/>
                  <path d="M8 52 A42 42 0 0 1 92 52" fill="none" stroke="#3F7CAC" strokeWidth="9" strokeLinecap="round" strokeDasharray={`${(0.92-i*0.08)*132} 200`}/>
                </svg>
                <span className="text-center text-[9pt]" style={{ marginTop:-4, color:"#3C424A" }}>{s}</span>
              </div>))}
            </div>
          </Sec>}
        </main>
      </div>
      <style>{`.gtb-b li{position:relative;padding-left:14px;margin-bottom:2px}.gtb-b li:before{content:"";position:absolute;left:0;top:6px;width:6px;height:6px;background:#3F7CAC;transform:rotate(45deg)}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5" style={{fontSize:"14pt",fontWeight:700,color:"#23282D",borderBottom:"2px solid #2A2E33",paddingBottom:3}}>{t}</h2>{children}</section>; }
function SecH({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mt-5"><h2 className="m-0 mb-2" style={{fontSize:"12pt",fontWeight:700,color:"#23282D",borderBottom:"2px solid #2A2E33",paddingBottom:3}}>{t}</h2>{children}</section>; }
