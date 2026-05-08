import type { CVData } from "@/lib/cv-types";

/** Marcus Reilly — Master Electrician. Trades / Bold. */
export const tradesBold: CVData = {
  basics: {
    fullName: "Marcus Reilly",
    role: "Master Electrician — Industrial & Commercial",
    email: "marcus@reilly-electric.trade",
    phone: "+1 312 555 0177",
    location: "Chicago, US",
    website: "reilly-electric.trade",
    linkedIn: "linkedin.com/in/marcus-reilly-electric",
    photoUrl:
      "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&h=400&fit=crop&crop=faces",
    summary:
      "<strong>Master Electrician</strong> with 18 years on industrial and commercial work — high-voltage switchgear, motor controls, and design-build for warehouse and food-processing facilities. Run a 12-person crew, IL state-licensed, OSHA 30, and zero recordables across the last 1.4M crew-hours.",
  },
  experience: [
    {
      company: "Reilly Electric, LLC",
      role: "Owner / Master Electrician",
      location: "Chicago, US",
      startDate: "2017",
      bullets: [
        "Founded and run a 12-person commercial / industrial shop billing $4.8M annually.",
        "Bid and delivered design-build electrical scope on 23 warehouse and cold-storage projects, all on schedule.",
        "Zero OSHA recordables across 1.4M crew-hours since founding.",
        "Hold prime contracts with 4 Tier-1 GCs in Cook County including Pepper Construction and Walsh Group.",
      ],
    },
    {
      company: "Sargent Electric",
      role: "Foreman → General Foreman",
      location: "Chicago, US",
      startDate: "2009",
      endDate: "2017",
      bullets: [
        "Ran crews of 8–24 electricians on industrial work — refineries, food-processing, and pharma manufacturing.",
        "Lead foreman on a $9.2M power-distribution upgrade at the Bedford Park facility, finished 6 weeks early.",
        "Trained 18 apprentices through IBEW Local 134; 16 topped out as journeymen.",
      ],
    },
    {
      company: "IBEW Local 134 Apprenticeship",
      role: "Apprentice → Journeyman Electrician",
      location: "Chicago, US",
      startDate: "2005",
      endDate: "2009",
      bullets: [
        "Completed the 5-year IBEW / NECA inside wireman apprenticeship.",
        "Top-of-class on the journeyman exam (97th percentile).",
      ],
    },
  ],
  education: [
    {
      school: "Triton College",
      degree: "AAS — Electrical Construction Technology",
      location: "River Grove, US",
      startDate: "2003",
      endDate: "2005",
      notes: "Concurrent with IBEW Local 134 apprenticeship.",
    },
  ],
  skills: [
    "NEC 2023 Code",
    "Industrial Switchgear",
    "Motor Control Centers",
    "PLC & VFD Wiring",
    "Power Distribution Design",
    "Bluebeam Takeoffs",
    "OSHA 30 — Construction",
    "Crew Leadership",
    "Bid Estimation",
    "Arc-Flash Studies",
  ],
  certifications: [
    { name: "Master Electrician — State of Illinois", issuer: "IL DOL", year: "2014" },
    { name: "OSHA 30 — Construction", issuer: "OSHA", year: "2024" },
    { name: "NFPA 70E — Arc Flash Safety", issuer: "NFPA", year: "2023" },
    { name: "IBEW Local 134 Journeyman Wireman", issuer: "IBEW", year: "2009" },
  ],
  languages: [
    { name: "English", level: "C2" },
    { name: "Spanish", level: "B1" },
  ],
  awards: [
    {
      title: "ABC Excellence in Construction — Mechanical/Electrical",
      issuer: "Associated Builders & Contractors",
      year: "2022",
    },
  ],
  interests: ["Restoring vintage motorcycles", "Coaching little league", "Camping with the family"],
};
