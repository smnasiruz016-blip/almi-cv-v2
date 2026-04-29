import type { CVData } from "./cv-types";

export const mayaRodriguez: CVData = {
  basics: {
    fullName: "Maya Rodriguez",
    role: "Senior Product Designer",
    email: "maya@rodriguez.design",
    phone: "+1 415 555 0142",
    location: "San Francisco, CA",
    website: "mayarodriguez.design",
    linkedIn: "linkedin.com/in/mayarod",
    photoUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces",
    summary:
      "Senior Product Designer with 8 years building consumer fintech and SaaS at Acme, Globex, and earlier at Stripe. I lead design systems, run user research, and ship cohesive cross-platform experiences.",
  },
  experience: [
    {
      company: "Acme Inc.",
      role: "Senior Product Designer",
      location: "San Francisco, CA",
      startDate: "2021",
      bullets: [
        "Led team of 8 designers across 3 product lines; reduced design-to-engineering handoff time by 35%.",
        "Shipped end-to-end mobile redesign that grew daily active users 40% and lifted retention 18% within two quarters.",
        "Established the Acme Design System (180+ components) now adopted across web, iOS, and Android by 12 product squads.",
        "Ran weekly research cadence with 60+ customer interviews, surfacing the insight that drove a $4.2M annual recurring revenue lift.",
        "Mentored 4 junior designers; 2 promoted to mid-level within 18 months.",
      ],
    },
    {
      company: "Globex Corp",
      role: "Product Designer",
      location: "New York, NY",
      startDate: "2018",
      endDate: "2021",
      bullets: [
        "Owned end-to-end design for the B2B fintech vertical, scaling MRR from $400K to $2.1M over three years.",
        "Designed and launched Globex API v2 onboarding, cutting time-to-first-call from 4 days to 22 minutes.",
        "Partnered with engineering and risk to redesign KYC flow; conversion improved 31% with no fraud impact.",
        "Built the first Globex pattern library, now the foundation of the company-wide design system.",
      ],
    },
    {
      company: "Stripe",
      role: "Product Designer",
      location: "San Francisco, CA",
      startDate: "2016",
      endDate: "2018",
      bullets: [
        "Designed core merchant dashboard surfaces used by 500K+ businesses across 40+ countries.",
        "Led the rebrand of Stripe Atlas onboarding; activation rate climbed 22% in the first quarter post-launch.",
        "Collaborated with brand and marketing on Sessions 2017 keynote visual narrative.",
        "Co-authored the internal accessibility playbook adopted by 30+ design and engineering teams.",
      ],
    },
  ],
  education: [
    {
      school: "Massachusetts Institute of Technology",
      degree: "BSc Computer Science",
      location: "Cambridge, MA",
      startDate: "2014",
      endDate: "2018",
      notes: "Minor in Cognitive Science. GPA 3.91. Senior thesis on adaptive UI in low-bandwidth contexts.",
    },
    {
      school: "Rhode Island School of Design",
      degree: "Continuing Studies Certificate, Interaction Design",
      location: "Providence, RI",
      startDate: "2017",
      endDate: "2017",
    },
  ],
  skills: [
    "Product Strategy",
    "Design Systems",
    "User Research",
    "Interaction Design",
    "Prototyping",
    "Figma",
    "A/B Testing",
    "Accessibility (WCAG 2.2)",
    "Cross-functional Leadership",
    "Workshop Facilitation",
    "Information Architecture",
    "Motion Design",
  ],
  projects: [
    {
      name: "Acme Mobile Redesign",
      description:
        "End-to-end redesign of the Acme consumer iOS and Android apps. Shipped 2023 to 4.8M users; in-app conversion lifted 27% and App Store rating moved from 3.9 to 4.6.",
      url: "mayarodriguez.design/acme-mobile",
    },
    {
      name: "Globex API v2 Launch",
      description:
        "Lead designer on the developer-facing API v2 surface. Reduced time-to-first-API-call from 4 days to 22 minutes and was cited in TechCrunch as the cleanest fintech onboarding of 2020.",
      url: "mayarodriguez.design/globex-api",
    },
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "Spanish", level: "Professional" },
    { name: "French", level: "Conversational" },
  ],
  awards: [
    {
      title: "Fast Company Innovation by Design Award",
      issuer: "Fast Company",
      year: "2023",
    },
    {
      title: "AIGA Design for Good Honor",
      issuer: "AIGA",
      year: "2022",
    },
  ],
  certifications: [
    {
      name: "Certified Scrum Product Owner",
      issuer: "Scrum Alliance",
      year: "2022",
    },
    {
      name: "Nielsen Norman UX Certification",
      issuer: "NN/g",
      year: "2020",
    },
  ],
  interests: ["Sustainable design", "Mentoring", "Trail running", "Specialty coffee"],
};
