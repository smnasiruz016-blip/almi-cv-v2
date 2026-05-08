import type { CVData } from "@/lib/cv-types";

/** Dr. James Okafor — ER Surgeon. Healthcare / Bold. */
export const healthcareBold: CVData = {
  basics: {
    fullName: "James Okafor, MD",
    role: "Emergency & Trauma Surgeon",
    email: "j.okafor@stmichaels-er.health",
    phone: "+44 20 7946 0123",
    location: "London, GB",
    website: "okafor-md.health",
    linkedIn: "linkedin.com/in/okafor-md",
    photoUrl:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=faces",
    summary:
      "Board-certified <strong>Emergency Surgeon</strong> with 12 years across Level I trauma centres in London and Lagos. <em>200+ trauma cases per year</em>, ATLS instructor, and led the rollout of an REBOA protocol that cut haemorrhagic mortality by 23% on our service.",
  },
  experience: [
    {
      company: "St Michael's University Hospital — London",
      role: "Consultant Trauma Surgeon",
      location: "London, GB",
      startDate: "2020",
      bullets: [
        "Lead surgeon on the night-shift trauma team — 240+ damage-control laparotomies and thoracotomies annually.",
        "Implemented REBOA protocol; haemorrhagic shock mortality dropped 23% over 18 months (peer-reviewed audit).",
        "Mentor 6 junior registrars; pass rate on FRCS (Tr&Orth) viva improved from 71% to 94%.",
        "Co-chair of the hospital's Major Incident Plan; ran 4 multi-casualty drills with London Ambulance Service.",
      ],
    },
    {
      company: "King's College Hospital — Trauma & Acute Care",
      role: "Senior Registrar, Trauma Surgery",
      location: "London, GB",
      startDate: "2016",
      endDate: "2020",
      bullets: [
        "Rotated through trauma, vascular, and HPB; 180+ procedures as primary surgeon during fellowship year.",
        "Published 7 peer-reviewed papers on penetrating abdominal trauma; cited 140+ times.",
        "ATLS / ASSET instructor since 2018 — trained 90+ junior doctors.",
      ],
    },
    {
      company: "Lagos University Teaching Hospital",
      role: "House Officer → Senior House Officer",
      location: "Lagos, NG",
      startDate: "2012",
      endDate: "2016",
      bullets: [
        "Rotated through general surgery, paediatric surgery, and emergency medicine in a 1,200-bed teaching hospital.",
        "First-author on a regional series of 312 motorbike-RTA cases — informed Lagos State helmet legislation.",
      ],
    },
  ],
  education: [
    {
      school: "Imperial College London",
      degree: "FRCS (Tr&Orth) — Royal College of Surgeons",
      location: "London, GB",
      startDate: "2018",
      endDate: "2020",
    },
    {
      school: "University College London",
      degree: "MSc Trauma Sciences",
      location: "London, GB",
      startDate: "2014",
      endDate: "2015",
      notes: "Distinction. Dissertation on REBOA in pre-hospital trauma.",
    },
    {
      school: "University of Lagos, College of Medicine",
      degree: "MBBS",
      location: "Lagos, NG",
      startDate: "2006",
      endDate: "2012",
    },
  ],
  skills: [
    "Damage-Control Laparotomy",
    "REBOA",
    "Vascular Repair",
    "Thoracotomy",
    "FAST Ultrasound",
    "ATLS Instructor",
    "Major Incident Triage",
    "Trauma Bay Leadership",
    "Surgical Education",
    "Audit & QI",
  ],
  certifications: [
    { name: "FRCS (Tr&Orth)", issuer: "Royal College of Surgeons of England", year: "2020" },
    { name: "ATLS Instructor", issuer: "American College of Surgeons", year: "2018" },
    { name: "GMC Specialist Register — Trauma & Orthopaedic", issuer: "GMC", year: "2020" },
    { name: "Diploma in Tropical Medicine & Hygiene", issuer: "LSHTM", year: "2014" },
  ],
  languages: [
    { name: "English", level: "C2" },
    { name: "Yoruba", level: "C2" },
    { name: "French", level: "B1" },
  ],
  awards: [
    {
      title: "President's Medal — Royal Society of Medicine",
      issuer: "Royal Society of Medicine",
      year: "2023",
    },
    {
      title: "Best Paper — Trauma & Critical Care Symposium",
      issuer: "RCS England",
      year: "2021",
    },
  ],
  interests: [
    "Open-water swimming",
    "Pre-hospital care research",
    "Mentoring junior doctors",
  ],
};
