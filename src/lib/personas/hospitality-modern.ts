import type { CVData } from "@/lib/cv-types";

/** Yuki Tanaka — Restaurant Operations Manager. Hospitality / Modern. */
export const hospitalityModern: CVData = {
  basics: {
    fullName: "Yuki Tanaka",
    role: "Restaurant Operations Manager",
    email: "yuki@harbour-hospitality.jp",
    phone: "+81 3 5555 0136",
    location: "Tokyo, JP",
    website: "yuki-tanaka.work",
    linkedIn: "linkedin.com/in/yuki-tanaka-ops",
    photoUrl:
      "https://images.unsplash.com/photo-1542178243-bc20204b769f?w=400&h=400&fit=crop&crop=faces",
    summary:
      "Operations manager running a <strong>4-venue restaurant group</strong> in Tokyo and Yokohama — 240 covers nightly, $14M annual revenue. Bilingual Japanese / English, P&L owner, and the person the founders trust to open new sites without surprises.",
  },
  experience: [
    {
      company: "Harbour Hospitality Group",
      role: "Operations Manager",
      location: "Tokyo, JP",
      startDate: "2020",
      bullets: [
        "P&L owner for 4 venues totalling $14M annual revenue and 240 covers nightly.",
        "Held food cost at 28% and labour at 31% across all venues for 11 consecutive months.",
        "Project lead on the Yokohama site opening (2023) — opened 2 weeks ahead of plan, 6% under capex.",
        "Roll out weekly KPI dashboards via Toast + Looker; managers use them in pre-shift.",
      ],
    },
    {
      company: "Park Hyatt Tokyo — F&B",
      role: "Assistant F&B Manager",
      location: "Tokyo, JP",
      startDate: "2017",
      endDate: "2020",
      bullets: [
        "Supported the F&B Director across 6 outlets including the New York Bar.",
        "Owned banquet operations — 180-cover weddings monthly, average satisfaction 4.8/5.",
        "Co-led the Forbes 5-Star service training programme for 90 line staff.",
      ],
    },
    {
      company: "Mandarin Oriental Tokyo",
      role: "Floor Captain → Restaurant Supervisor",
      location: "Tokyo, JP",
      startDate: "2014",
      endDate: "2017",
      bullets: [
        "Captain on the 38-cover signature restaurant; promoted to supervisor within 18 months.",
        "Wine list refresh project — co-curated 240 selections with the head sommelier.",
      ],
    },
  ],
  education: [
    {
      school: "Cornell University, School of Hotel Administration",
      degree: "MMH — Master of Management in Hospitality",
      location: "Ithaca, US",
      startDate: "2012",
      endDate: "2014",
      notes: "Concentration in F&B Operations. Cornell Hotel Society Asia chapter co-founder.",
    },
    {
      school: "Sophia University",
      degree: "BA — Business Administration",
      location: "Tokyo, JP",
      startDate: "2008",
      endDate: "2012",
    },
  ],
  skills: [
    "P&L Management",
    "Toast POS / Looker",
    "Labour Forecasting",
    "Cost & Inventory Control",
    "New-Site Openings",
    "Service Training",
    "Wine & Beverage Programs",
    "Vendor Negotiation",
    "Bilingual Operations (JP / EN)",
  ],
  certifications: [
    { name: "Forbes 5-Star Service Standards", issuer: "Forbes Travel Guide", year: "2019" },
    { name: "WSET Level 3 Award in Wines", issuer: "WSET", year: "2018" },
  ],
  languages: [
    { name: "Japanese", level: "C2" },
    { name: "English", level: "C2" },
    { name: "Korean", level: "B1" },
  ],
  awards: [
    { title: "Hotelier of Tomorrow — Asia Hospitality Awards", issuer: "Asia Hospitality Awards", year: "2022" },
  ],
  interests: ["Tea ceremony", "Long-distance cycling", "Volunteer at Second Harvest Japan"],
};
