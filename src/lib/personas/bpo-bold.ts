import type { CVData } from "@/lib/cv-types";

/** Hassan Khan — Senior Account Manager. BPO / Bold. */
export const bpoBold: CVData = {
  basics: {
    fullName: "Hassan Khan",
    role: "Senior Account Manager — BPO Enterprise",
    email: "hassan.khan@northstar-bpo.com",
    phone: "+92 21 555 0167",
    location: "Karachi, PK",
    website: "hassankhan-bpo.com",
    linkedIn: "linkedin.com/in/hassan-khan-bpo",
    photoUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=faces",
    summary:
      "Enterprise <strong>Account Manager</strong> with 11 years owning multi-million-dollar BPO portfolios for North American and UK clients. I run the Karachi delivery for two Fortune-500 logos — <em>$8.4M ARR combined</em> — and have grown both accounts every year I've held them.",
  },
  experience: [
    {
      company: "Northstar BPO",
      role: "Senior Account Manager — Enterprise",
      location: "Karachi, PK",
      startDate: "2019",
      bullets: [
        "Own two enterprise accounts totalling $8.4M ARR — a US fintech and a UK logistics platform.",
        "Grew the fintech account from $1.9M to $5.2M in 4 years through three contract expansions and one new line of business.",
        "QBR cadence with C-suite stakeholders quarterly; CSAT held above 4.6/5 across 14 consecutive quarters.",
        "Lead a delivery team of 240 agents and 28 team leads across voice, chat, and back-office.",
      ],
    },
    {
      company: "Ovex Technologies",
      role: "Account Manager",
      location: "Karachi, PK",
      startDate: "2015",
      endDate: "2019",
      bullets: [
        "Managed mid-market healthcare and retail accounts ($800K – $2.4M ARR).",
        "Hit or exceeded portfolio retention targets every year (100% logo retention 2017–2019).",
        "Designed the company's QBR template, still in use across the account-management org.",
      ],
    },
    {
      company: "TRG Pakistan",
      role: "Team Leader → Operations Supervisor",
      location: "Karachi, PK",
      startDate: "2012",
      endDate: "2015",
      bullets: [
        "Promoted from agent to team leader within 14 months — top-quintile QA scores throughout.",
        "Supervised 38 agents on a US insurance campaign; kept AHT 12% below client target.",
      ],
    },
  ],
  education: [
    {
      school: "Institute of Business Administration (IBA), Karachi",
      degree: "MBA — Marketing",
      location: "Karachi, PK",
      startDate: "2013",
      endDate: "2015",
      notes: "Dean's List. Thesis on customer-success metrics in offshore BPO.",
    },
    {
      school: "University of Karachi",
      degree: "BBA — Business Administration",
      location: "Karachi, PK",
      startDate: "2008",
      endDate: "2012",
    },
  ],
  skills: [
    "Enterprise Account Growth",
    "QBR & Executive Reporting",
    "Salesforce / HubSpot",
    "Forecasting & Pipeline",
    "SLA Negotiation",
    "Voice / Chat / Back-Office Ops",
    "Team Leadership",
    "Client Escalation Management",
    "BPO Pricing Models",
  ],
  certifications: [
    { name: "Six Sigma Green Belt", issuer: "ASQ", year: "2020" },
    { name: "COPC Customer Experience Standard — Foundations", issuer: "COPC Inc.", year: "2021" },
  ],
  languages: [
    { name: "English", level: "C2" },
    { name: "Urdu", level: "C2" },
    { name: "Punjabi", level: "C1" },
  ],
  awards: [
    {
      title: "Account Manager of the Year — Northstar BPO",
      issuer: "Northstar BPO",
      year: "2023",
    },
  ],
  interests: ["Cricket", "Squash", "Mentoring at Karachi Youth Initiative"],
};
