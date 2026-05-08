import type { CVData } from "@/lib/cv-types";

/** Maya Patel, PNP — Pediatric Nurse Practitioner. Healthcare / Refined. */
export const healthcareRefined: CVData = {
  basics: {
    fullName: "Maya Patel, MSN, CPNP-PC",
    role: "Pediatric Nurse Practitioner",
    email: "mpatel@willowpediatrics.health",
    phone: "+1 617 555 0144",
    location: "Boston, US",
    website: "mayapatel-pnp.health",
    linkedIn: "linkedin.com/in/maya-patel-cpnp",
    photoUrl:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=faces",
    summary:
      "Certified Pediatric Nurse Practitioner with <em>11 years</em> caring for newborns through adolescents in primary and acute care. Bilingual practice (English / Gujarati), trauma-informed approach, and a long history of partnering with families through complex chronic care.",
  },
  experience: [
    {
      company: "Willow Pediatrics",
      role: "Pediatric Nurse Practitioner — Lead Provider",
      location: "Boston, US",
      startDate: "2019",
      bullets: [
        "Maintain a panel of 1,200 pediatric patients with focus on chronic-care continuity (asthma, T1D, ADHD).",
        "Co-designed the practice's trauma-informed-care training; required for all clinical staff since 2021.",
        "Lead the developmental-screening program — Bright Futures milestones achieved on 96% of well-child visits.",
        "Preceptor for 14 PNP students from MGH Institute of Health Professions.",
      ],
    },
    {
      company: "Boston Children's Hospital",
      role: "Pediatric Nurse Practitioner, General Pediatrics Inpatient",
      location: "Boston, US",
      startDate: "2015",
      endDate: "2019",
      bullets: [
        "Inpatient management for medically complex children on a 24-bed general pediatrics unit.",
        "Led the unit's family-centered rounds initiative — parent satisfaction scores rose from 78% to 91%.",
        "Co-author on 4 peer-reviewed papers in J. Pediatric Nursing.",
      ],
    },
    {
      company: "Massachusetts General Hospital",
      role: "Staff RN, Pediatric ICU",
      location: "Boston, US",
      startDate: "2012",
      endDate: "2015",
      bullets: [
        "Cared for critically ill infants and children in a 14-bed PICU.",
        "Bedside lead on the unit's family-presence-during-resuscitation pilot.",
      ],
    },
  ],
  education: [
    {
      school: "MGH Institute of Health Professions",
      degree: "MSN — Pediatric Nurse Practitioner (Primary Care)",
      location: "Boston, US",
      startDate: "2013",
      endDate: "2015",
      notes: "Sigma Theta Tau International. Clinical placements at Boston Children's & MGH.",
    },
    {
      school: "Boston College, Connell School of Nursing",
      degree: "BSN — Bachelor of Science in Nursing",
      location: "Chestnut Hill, US",
      startDate: "2008",
      endDate: "2012",
      notes: "Cum laude. Senior thesis on pediatric pain assessment.",
    },
  ],
  skills: [
    "Pediatric Primary Care",
    "Developmental Screening",
    "Family-Centered Care",
    "Trauma-Informed Care",
    "Asthma & Chronic Disease Management",
    "Bright Futures Anticipatory Guidance",
    "Vaccination Counseling",
    "Behavioral Health Triage",
    "Spanish & Gujarati Bilingual Care",
  ],
  certifications: [
    { name: "CPNP-PC — PNCB", issuer: "Pediatric Nursing Certification Board", year: "2015" },
    { name: "RN — Massachusetts Board of Registration", issuer: "MA BORN", year: "2012" },
    { name: "PALS Provider", issuer: "American Heart Association", year: "2024" },
  ],
  languages: [
    { name: "English", level: "C2" },
    { name: "Gujarati", level: "C2" },
    { name: "Spanish", level: "B2" },
  ],
  awards: [
    {
      title: "Excellence in Pediatric Nursing — MA Coalition of Nurse Practitioners",
      issuer: "MCNP",
      year: "2022",
    },
  ],
  interests: ["Watercolor painting", "Pediatric global-health volunteering", "Bharatanatyam"],
};
