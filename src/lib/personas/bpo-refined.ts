import type { CVData } from "@/lib/cv-types";

/** Aisha Mwangi — Client Relations Specialist. BPO / Refined. */
export const bpoRefined: CVData = {
  basics: {
    fullName: "Aisha Mwangi",
    role: "Client Relations Specialist",
    email: "aisha.mwangi@savanna-relations.com",
    phone: "+254 20 555 0192",
    location: "Nairobi, KE",
    website: "aishamwangi.work",
    linkedIn: "linkedin.com/in/aisha-mwangi",
    photoUrl:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&crop=faces",
    summary:
      "Client Relations Specialist with 9 years caring for high-touch financial-services clients across East Africa. I'm the first call when a relationship starts to drift, and the person clients ask for by name when something complicated needs handling. <em>Trilingual</em> (English / Swahili / French) and Series 7 equivalent.",
  },
  experience: [
    {
      company: "Savanna Wealth Advisors",
      role: "Senior Client Relations Specialist",
      location: "Nairobi, KE",
      startDate: "2020",
      bullets: [
        "Lead point of contact for 84 high-net-worth client households representing $230M in AUM.",
        "Service-recovery hit rate 92% — clients flagged as at-risk who stayed and grew their relationship.",
        "Built the firm's onboarding-experience programme; new-client NPS climbed from 51 to 78.",
        "Trilingual liaison for francophone West African clients — only specialist in the firm with that coverage.",
      ],
    },
    {
      company: "Standard Chartered Bank — Premium Banking",
      role: "Client Relationship Officer",
      location: "Nairobi, KE",
      startDate: "2017",
      endDate: "2020",
      bullets: [
        "Managed a 220-client premium banking book; held it to a 96% retention rate over 3 years.",
        "Co-led the regional rollout of the new client-portal onboarding playbook.",
        "Won 'Client Champion' recognition four quarters in a row — bank-wide top 1%.",
      ],
    },
    {
      company: "Equity Bank",
      role: "Customer Service Officer → Branch CS Lead",
      location: "Nairobi, KE",
      startDate: "2014",
      endDate: "2017",
      bullets: [
        "Started in front-line branch service; promoted to branch CS Lead within 22 months.",
        "Trained 14 new joiners on the bank's complaint-handling framework.",
      ],
    },
  ],
  education: [
    {
      school: "Strathmore University",
      degree: "BCom — Finance & Banking",
      location: "Nairobi, KE",
      startDate: "2010",
      endDate: "2014",
      notes: "Second-class upper. Strathmore Public Speaking Society chair.",
    },
  ],
  skills: [
    "High-Net-Worth Client Care",
    "Service Recovery",
    "Cross-Cultural Communication",
    "Salesforce Financial Services Cloud",
    "Compliance — KYC / AML",
    "Onboarding Programme Design",
    "Translation (FR ↔ EN ↔ SW)",
    "Stakeholder Diplomacy",
  ],
  certifications: [
    { name: "CISI International Certificate in Wealth & Investment Management", issuer: "CISI", year: "2022" },
    { name: "Salesforce Financial Services Cloud Specialist", issuer: "Salesforce", year: "2023" },
    { name: "Anti-Money Laundering — Foundation", issuer: "ICA", year: "2021" },
  ],
  languages: [
    { name: "English", level: "C2" },
    { name: "Swahili", level: "C2" },
    { name: "French", level: "C1" },
  ],
  awards: [
    { title: "Client Champion — Standard Chartered (Q1–Q4 2019)", issuer: "Standard Chartered", year: "2019" },
  ],
  interests: ["Long-distance hiking on Mt Kenya", "Watercolour", "Mentoring with KCB Foundation"],
};
