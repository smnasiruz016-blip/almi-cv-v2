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

export const alexChen: CVData = {
  basics: {
    fullName: "Alex Chen",
    role: "Frontend Engineer",
    email: "alex@dev.io",
    phone: "+1 415 555 0142",
    location: "San Francisco, CA",
    website: "alexchen.dev",
    linkedIn: "linkedin.com/in/achen",
    photoUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces",
    summary:
      "Senior Frontend Engineer with 7 years shipping React, TypeScript, and Edge-first apps at Stripe and Vercel. I lead performance, design-system architecture, and developer-experience tooling — turning slow flows into fast ones and tangled code into systems teams love.",
  },
  experience: [
    {
      company: "Stripe",
      role: "Senior Engineer",
      location: "San Francisco, CA",
      startDate: "2022",
      endDate: "Present",
      bullets: [
        "Migrated payment flow to a micro-frontend architecture serving 40+ teams; cut build times 60%.",
        "Reduced bundle size 38% via aggressive code splitting and React Server Components rollout.",
        "Led the Stripe Connect onboarding redesign; conversion lifted 14% across 12 markets.",
        "Mentored 6 engineers across 3 product teams; 4 promoted to senior within 18 months.",
        "Built internal Edge cache layer now used by 8 product surfaces.",
      ],
    },
    {
      company: "Vercel",
      role: "Engineer",
      location: "Remote",
      startDate: "2020",
      endDate: "2022",
      bullets: [
        "Built the Edge Functions developer dashboard from zero to GA in 9 months.",
        "Shipped real-time deployment logs feature; adopted by 80% of paid users in first quarter.",
        "Authored internal RFC framework still in use across the platform team.",
      ],
    },
    {
      company: "Independent",
      role: "Frontend Consultant",
      location: "Remote",
      startDate: "2018",
      endDate: "2020",
      bullets: [
        "Delivered React + Next.js builds for 11 startups; 3 raised Series A using shipped product.",
        "Wrote technical content read by 200K+ developers monthly on personal blog.",
      ],
    },
  ],
  education: [
    {
      school: "Stanford University",
      degree: "BS Computer Science",
      location: "Stanford, CA",
      startDate: "2014",
      endDate: "2018",
      notes:
        "Concentration in Human-Computer Interaction. Senior thesis on Edge-rendering performance budgets.",
    },
  ],
  skills: [
    "React",
    "TypeScript",
    "Node.js",
    "GraphQL",
    "AWS",
    "Edge Functions",
    "Next.js",
    "Performance Engineering",
    "Design Systems",
    "Webpack / Turbopack",
    "PostgreSQL",
    "Storybook",
  ],
  projects: [
    {
      name: "react-aria-tabs",
      description:
        "Open-source accessible tabs primitive. 2.4k stars, used by 18 production apps.",
      url: "github.com/achen/react-aria-tabs",
    },
    {
      name: "Vercel Edge Config Dashboard",
      description:
        "Internal tool used by 2k+ teams; reduced support ticket volume by 35%.",
    },
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "Mandarin", level: "Professional" },
    { name: "Japanese", level: "Conversational" },
  ],
  awards: [
    { title: "GitHub Stars program", issuer: "GitHub", year: "2023" },
    { title: "React Conf invited speaker", issuer: "React Foundation", year: "2023" },
  ],
  certifications: [
    { name: "AWS Certified Solutions Architect", issuer: "Amazon", year: "2022" },
  ],
  interests: ["Climbing", "Open-source", "Synthwave music", "Specialty coffee"],
};

export const priyaPatel: CVData = {
  basics: {
    fullName: "Priya Patel",
    role: "Marketing Director",
    email: "priya@patel.studio",
    phone: "+44 20 7946 0958",
    location: "London, UK",
    website: "priyapatel.studio",
    linkedIn: "linkedin.com/in/priyapatel",
    photoUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces",
    summary:
      "Brand strategist with 10+ years scaling consumer brands across APAC and EMEA. Led campaigns reaching 200M+ users at Nike and Adobe. Cannes Lion + Effie Award recipient. Specialty: turning cultural insight into commercial growth.",
  },
  experience: [
    {
      company: "Nike",
      role: "Marketing Director, EMEA",
      location: "London, UK",
      startDate: "2021",
      endDate: "Present",
      bullets: [
        "Led the ROAR global campaign — 600M impressions, 32% lift in unaided brand recall across 14 markets.",
        "Owned the EMEA rebrand for Nike Women; revenue up 18% YoY in launch markets.",
        "Built and led a 24-person cross-functional team spanning brand, performance, and PR.",
        "Negotiated co-marketing partnerships with adidas-owned (yes, that one) properties — first time in 8 years.",
      ],
    },
    {
      company: "Adobe",
      role: "Senior Marketing Manager",
      location: "London, UK",
      startDate: "2017",
      endDate: "2021",
      bullets: [
        "Launched Creative Cloud for Education in 23 markets; subscriptions up 47% in year one.",
        "Designed Adobe MAX London — the conference grew from 800 to 4,200 attendees in 3 years.",
        "Authored Adobe's first DEI-led marketing playbook, now used across all regional teams.",
      ],
    },
    {
      company: "Saatchi & Saatchi",
      role: "Account Director",
      location: "London, UK",
      startDate: "2014",
      endDate: "2017",
      bullets: [
        "Led brand strategy for Procter & Gamble's haircare portfolio across UK and Ireland.",
        "Effie Gold winner for the Pantene #StrongIsBeautiful campaign.",
      ],
    },
  ],
  education: [
    {
      school: "Wharton School",
      degree: "MBA, Marketing",
      location: "Philadelphia, PA",
      startDate: "2015",
      endDate: "2017",
      notes: "Concentration in consumer behavior. Wharton Marketing Club VP.",
    },
    {
      school: "King's College London",
      degree: "BA, English Literature",
      location: "London, UK",
      startDate: "2010",
      endDate: "2013",
    },
  ],
  skills: [
    "Brand Strategy",
    "Campaign Leadership",
    "Cross-functional Team Building",
    "Consumer Research",
    "Cultural Insight",
    "Performance Marketing",
    "Partnership Negotiation",
    "Storytelling",
    "DEI in Marketing",
    "Cannes Lions Jury",
    "Effie Jury",
    "Public Speaking",
  ],
  projects: [
    {
      name: "Nike ROAR — Global Campaign 2022",
      description:
        "600M impressions across 14 markets. Cultural moment for women's sport in EMEA.",
    },
    {
      name: "Adobe Create Your World",
      description:
        "Multi-year campaign localized across 47 markets. 12% lift in brand consideration among Gen Z.",
    },
    {
      name: "P&G Insider Newsletter",
      description:
        "Internal marketing publication I founded; reached 18,000 P&G employees globally.",
    },
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "Hindi", level: "Native" },
    { name: "Gujarati", level: "Conversational" },
    { name: "French", level: "Basic" },
  ],
  awards: [
    {
      title: "Cannes Lion · Bronze, Brand Experience",
      issuer: "Cannes Lions",
      year: "2022",
    },
    {
      title: "Effie Gold, Sustained Success",
      issuer: "Effie Awards",
      year: "2021",
    },
    {
      title: "Marketing Week Top 100 — Rising Stars",
      issuer: "Marketing Week",
      year: "2020",
    },
  ],
  certifications: [
    {
      name: "Cannes Lions Jury Member",
      issuer: "Cannes Lions Festival",
      year: "2023",
    },
  ],
  interests: [
    "Cultural anthropology",
    "Hindi cinema",
    "Open-water swimming",
    "Long-form journalism",
  ],
};

export const ayeshaKhan: CVData = {
  basics: {
    fullName: "Ayesha Khan",
    role: "UX Designer · Stockholm",
    email: "ayesha@khan.design",
    phone: "+46 70 555 0142",
    location: "Stockholm, Sweden",
    website: "ayeshakhan.design",
    linkedIn: "linkedin.com/in/ayeshakhan",
    photoUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces",
    summary:
      "Designer focused on inclusive interfaces. 6+ years across e-commerce, fintech, and edtech in EU and APAC. I lead user research, build cross-cultural design systems, and ship products that work for everyone — from first-time smartphone users in rural Pakistan to power users in Stockholm.",
  },
  experience: [
    {
      company: "Daraz",
      role: "Lead UX Designer",
      location: "Karachi, Pakistan (Remote from Stockholm)",
      startDate: "2022",
      endDate: "Present",
      bullets: [
        "Redesigned the checkout flow across 4 markets — cart abandonment dropped 22% in three months.",
        "Built the Daraz design system (Lotus) — now used by 60+ designers across South Asia.",
        "Led user research with 200+ first-time mobile commerce users in Pakistan and Bangladesh.",
        "Mentored a team of 4 designers; 2 promoted to senior within 18 months.",
      ],
    },
    {
      company: "Easypaisa",
      role: "Senior UX Designer",
      location: "Karachi, Pakistan",
      startDate: "2019",
      endDate: "2022",
      bullets: [
        "Designed the bills-and-utilities flow used by 8M+ active users monthly.",
        "Owned the merchant onboarding redesign — onboarding completion rate up 31%.",
        "Co-authored Easypaisa's first accessibility guidelines.",
      ],
    },
    {
      company: "Independent",
      role: "UX Designer",
      location: "Karachi, Pakistan",
      startDate: "2018",
      endDate: "2019",
      bullets: [
        "Designed for early-stage startups across edtech and health-tech.",
        "Wrote a Urdu-language UX blog read by 12K designers in Pakistan and India.",
      ],
    },
  ],
  education: [
    {
      school: "NUST (National University of Sciences and Technology)",
      degree: "BS Communication Design",
      location: "Islamabad, Pakistan",
      startDate: "2014",
      endDate: "2018",
      notes: "Final-year project: Inclusive UI patterns for low-literacy users.",
    },
    {
      school: "Hyper Island",
      degree: "Service Design Intensive",
      location: "Stockholm, Sweden",
      startDate: "2021",
      endDate: "2021",
    },
  ],
  skills: [
    "Figma",
    "Prototyping",
    "User Research",
    "Design Systems",
    "A/B Testing",
    "Inclusive Design",
    "Cross-cultural UX",
    "Workshop Facilitation",
    "Service Design",
    "Accessibility (WCAG)",
    "Storybook",
    "User Interviews",
  ],
  projects: [
    {
      name: "Daraz Lotus Design System",
      description:
        "Multi-market design system supporting RTL languages and low-bandwidth contexts. Adopted by 60+ designers.",
    },
    {
      name: "Easypaisa Bills Redesign",
      description:
        "Reduced average task time from 47 to 18 seconds for utility bill payments. Used by 8M+ users.",
    },
  ],
  languages: [
    { name: "Urdu", level: "Native" },
    { name: "English", level: "Native" },
    { name: "Swedish", level: "Conversational" },
    { name: "French", level: "Basic" },
  ],
  awards: [
    {
      title: "Awwwards · Honorable Mention",
      issuer: "Awwwards",
      year: "2023",
    },
    {
      title: "Adobe Design Achievement Award",
      issuer: "Adobe",
      year: "2021",
    },
  ],
  certifications: [
    {
      name: "NN/g UX Certification",
      issuer: "Nielsen Norman Group",
      year: "2022",
    },
    {
      name: "IBM Enterprise Design Thinking",
      issuer: "IBM",
      year: "2020",
    },
  ],
  interests: [
    "South Asian textile design",
    "Urdu poetry",
    "Cycling",
    "Open-source typography",
  ],
};
