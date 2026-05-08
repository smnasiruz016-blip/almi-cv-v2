import type { CVData } from "@/lib/cv-types";

/** Priya Sharma — Customer Success Lead. BPO / Modern. */
export const bpoModern: CVData = {
  basics: {
    fullName: "Priya Sharma",
    role: "Customer Success Team Lead",
    email: "priya@arclight-cs.com",
    phone: "+91 80 555 0173",
    location: "Bangalore, IN",
    website: "priya-sharma.cs",
    linkedIn: "linkedin.com/in/priya-sharma-cs",
    photoUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces",
    summary:
      "Customer Success Lead with 8 years across SaaS support and onboarding. I run a 24-person CS team for a US B2B platform — <strong>NPS 64</strong>, gross-retention 96%, and a playbook the founders ask me to share with every new investor.",
  },
  experience: [
    {
      company: "Arclight",
      role: "Customer Success Team Lead",
      location: "Bangalore, IN",
      startDate: "2021",
      bullets: [
        "Lead a 24-person customer success team supporting a $42M ARR US B2B SaaS platform.",
        "Held gross retention at 96% and net retention at 118% across the last 8 quarters.",
        "Authored the onboarding-to-90-day playbook — drove time-to-first-value from 22 to 9 days.",
        "Coach 4 Senior CSMs; two promoted to manager in the last year.",
      ],
    },
    {
      company: "Freshworks",
      role: "Senior Customer Success Manager",
      location: "Bangalore, IN",
      startDate: "2018",
      endDate: "2021",
      bullets: [
        "Managed a portfolio of 90 mid-market accounts ($2K–$25K MRR).",
        "Highest portfolio NRR in the segment for 6 of 10 quarters; expansion revenue grew 41% YoY.",
        "Subject-matter lead for the Freshdesk-to-Freshworks-CRM bundle launch — CS-side rollout playbook.",
      ],
    },
    {
      company: "Zoho Corporation",
      role: "Support Engineer → Customer Success Manager",
      location: "Chennai, IN",
      startDate: "2016",
      endDate: "2018",
      bullets: [
        "Started in tier-2 support, promoted to CSM within 18 months on the strength of customer feedback.",
        "Owned 140 SMB accounts; renewals consistently above team mean.",
      ],
    },
  ],
  education: [
    {
      school: "BITS Pilani",
      degree: "BE — Information Technology",
      location: "Pilani, IN",
      startDate: "2012",
      endDate: "2016",
      notes: "First class. President of the Toastmasters chapter.",
    },
  ],
  skills: [
    "Customer Onboarding",
    "QBR & Health-Score Analysis",
    "Gainsight",
    "HubSpot",
    "Salesforce",
    "SQL — Reporting",
    "Churn-Risk Forecasting",
    "Team Coaching",
    "Process Documentation",
  ],
  certifications: [
    { name: "Gainsight Admin — Level 2", issuer: "Gainsight", year: "2022" },
    { name: "HubSpot Solutions Partner — CS", issuer: "HubSpot", year: "2023" },
  ],
  languages: [
    { name: "English", level: "C2" },
    { name: "Hindi", level: "C2" },
    { name: "Tamil", level: "C1" },
  ],
  awards: [
    {
      title: "President's Club — Arclight FY24",
      issuer: "Arclight",
      year: "2024",
    },
  ],
  interests: ["Bharatanatyam", "Cycling on the Bangalore-Mysore highway", "Indie pottery"],
};
