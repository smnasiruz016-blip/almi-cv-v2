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
      "Senior Product Designer with <strong>8 years</strong> building consumer fintech and SaaS at Acme, Globex, and earlier at Stripe. I lead <em>design systems</em>, run user research, and ship cohesive cross-platform experiences.",
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

export const marcusWebb: CVData = {
  basics: {
    fullName: "Marcus Webb",
    role: "Art Director",
    email: "marcus@webb.studio",
    phone: "+1 718 555 0142",
    location: "Brooklyn, NY",
    website: "marcuswebb.studio",
    linkedIn: "linkedin.com/in/marcuswebb",
    photoUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces",
    summary:
      "Creative director with 12 years building visual identities for global brands and emerging artists. I work at the intersection of branding, motion design, and editorial — Apple, Spotify, Nike — and the small studios that need a singular vision. Currently building my own brand consultancy.",
  },
  experience: [
    {
      company: "Independent",
      role: "Creative Director",
      location: "Brooklyn, NY",
      startDate: "2022",
      endDate: "Present",
      bullets: [
        "Lead branding for Apple at Worldwide Developer Conference 2024 — visual identity, motion, print collateral.",
        "Designed Spotify Wrapped 2023 visual identity — most-shared brand campaign in company history.",
        "Created the Nike Air 50th Anniversary capsule branding across 6 products and 14 markets.",
        "Built and led a team of 4 designers + 2 motion artists across project-based engagements.",
      ],
    },
    {
      company: "Pentagram",
      role: "Senior Designer",
      location: "New York, NY",
      startDate: "2018",
      endDate: "2022",
      bullets: [
        "Lead designer on identity rebrand for The New York Public Library system.",
        "Co-led the Mastercard sonic and visual identity refresh across 80+ touchpoints.",
        "Authored the studio's internal type-design playbook, still in use today.",
      ],
    },
    {
      company: "Wieden+Kennedy",
      role: "Designer",
      location: "Portland, OR",
      startDate: "2014",
      endDate: "2018",
      bullets: [
        "Design lead for Nike's Equality campaign — 2018 Cannes Lions Bronze.",
        "Created motion identity for Old Spice's 'The Man Your Man Could Smell Like' rebrand.",
      ],
    },
  ],
  education: [
    {
      school: "Rhode Island School of Design (RISD)",
      degree: "BFA Graphic Design",
      location: "Providence, RI",
      startDate: "2010",
      endDate: "2014",
      notes: "Senior thesis: Type as Architecture. Honors in Visual Identity.",
    },
  ],
  skills: [
    "Branding",
    "Motion Design",
    "Editorial Design",
    "Type Design",
    "Identity Systems",
    "Art Direction",
    "Creative Strategy",
    "Adobe Creative Suite",
    "Cinema 4D",
    "After Effects",
    "Print Production",
    "Color Theory",
  ],
  projects: [
    {
      name: "Apple WWDC 2024 — Visual Identity",
      description:
        "Branding, motion, and print collateral for Apple's annual developer conference. 50M+ views on launch keynote.",
    },
    {
      name: "Spotify Wrapped 2023",
      description:
        "Visual identity for the global year-end campaign. Most-shared brand campaign in Spotify's history.",
    },
    {
      name: "Nike Air 50th — Capsule Branding",
      description:
        "Branding system for the 50th anniversary collection across 6 products and 14 markets.",
    },
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "Spanish", level: "Conversational" },
  ],
  awards: [
    {
      title: "ADC Gold Cube — Brand Identity",
      issuer: "The One Club",
      year: "2023",
    },
    {
      title: "D&AD Wood Pencil — Editorial Design",
      issuer: "D&AD",
      year: "2022",
    },
    {
      title: "Cannes Lions Bronze — Equality Campaign",
      issuer: "Cannes Lions",
      year: "2018",
    },
  ],
  certifications: [
    {
      name: "TYPE@Cooper Certificate in Type Design",
      issuer: "Cooper Union",
      year: "2020",
    },
  ],
  interests: [
    "Vintage type specimens",
    "Analog photography",
    "Brutalist architecture",
    "Independent record stores",
  ],
};

export const juliaCortazar: CVData = {
  basics: {
    fullName: "Julia Cortázar",
    role: "Multimedia Artist & Creative Director",
    email: "julia.cortazar@studio.es",
    phone: "+34 612 458 901",
    location: "Barcelona, España",
    website: "juliacortazar.art",
    photoUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    summary:
      "Multimedia artist with 10+ years bridging fine art, motion design, and immersive installations. Featured in Ars Electronica, Sónar+D, and ZKM Karlsruhe. Currently directing creative at independent studio focused on cultural institutions and public art commissions.",
  },
  experience: [
    {
      role: "Creative Director",
      company: "Estudio Lumen",
      location: "Barcelona, ES",
      startDate: "Mar 2022",
      endDate: "Present",
      bullets: [
        "Direct multidisciplinary team of 8 across motion, 3D, and installation projects for clients including MACBA, CCCB, and Sónar Festival",
        "Led signature installation 'Mareas Digitales' — 12-meter projection commissioned by Barcelona City Council, viewed by 180k+ visitors",
        "Grew studio revenue 240% over 3 years while maintaining 100% creative-led project selection",
      ],
    },
    {
      role: "Senior Motion Designer",
      company: "Domestic Data Streamers",
      location: "Barcelona, ES",
      startDate: "Jun 2018",
      endDate: "Feb 2022",
      bullets: [
        "Designed motion identity systems for 30+ data-driven exhibitions across Europe and Latin America",
        "Co-authored visual language for permanent installation at Museu del Disseny (still on display since 2020)",
      ],
    },
    {
      role: "Freelance Multimedia Artist",
      company: "Independent",
      location: "Madrid → Barcelona",
      startDate: "Sep 2015",
      endDate: "May 2018",
      bullets: [
        "Selected for Ars Electronica Campus 2017 with generative piece 'Ecos del Bosque'",
        "Commissioned by Fundación Telefónica for 6-month digital residency",
      ],
    },
  ],
  education: [
    {
      school: "Universitat Pompeu Fabra",
      degree: "MFA Digital Arts",
      location: "Barcelona, ES",
      startDate: "2013",
      endDate: "2015",
    },
    {
      school: "Universidad Complutense de Madrid",
      degree: "BA Fine Arts",
      location: "Madrid, ES",
      startDate: "2009",
      endDate: "2013",
    },
  ],
  skills: [
    "Creative Direction",
    "Motion Design",
    "Generative Art",
    "Projection Mapping",
    "Installation Design",
    "Team Leadership",
  ],
  languages: [
    { name: "Español", level: "Native" },
    { name: "Català", level: "Fluent" },
    { name: "English", level: "Professional" },
  ],
  awards: [
    { title: "Ars Electronica Honorary Mention", year: "2023" },
    { title: "Laus Award Gold — Motion Design", year: "2021" },
    { title: "Sónar+D Featured Artist", year: "2020" },
    { title: "Premio Nacional Diseño Joven", year: "2019" },
  ],
};

export const sofiaMarchetti: CVData = {
  basics: {
    fullName: "Sofia Marchetti",
    role: "Brand Photographer & Visual Storyteller",
    email: "hello@sofiamarchetti.com",
    phone: "+39 333 142 8855",
    location: "Milano, Italia",
    website: "sofiamarchetti.com",
    photoUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    summary:
      "Independent brand photographer with 9 years documenting fashion houses, hospitality groups, and emerging luxury brands across Europe. Selected for Vogue Italia Fresh Eyes 2024. Currently splitting time between editorial commissions and a permanent gallery residency at Fondazione Sozzani.",
  },
  experience: [
    {
      role: "Lead Brand Photographer",
      company: "Studio Marchetti",
      location: "Milano, IT",
      startDate: "Jan 2021",
      endDate: "Present",
      bullets: [
        "Built independent studio servicing 40+ brands including Brunello Cucinelli, Aesop Italia, and Six Senses hotels with average project value €18k",
        "Lead photographer for Vogue Italia \"Sustainable Style\" editorial series 2023-2024 — 14 commissioned features published",
        "Manage team of 3 (assistant photographer, retoucher, production coordinator) across 60+ shoots annually",
      ],
    },
    {
      role: "Senior Photographer",
      company: "Condé Nast Italia",
      location: "Milano, IT",
      startDate: "Mar 2018",
      endDate: "Dec 2020",
      bullets: [
        "Staff photographer covering Vogue Italia, GQ Italia, and AD Italia campaigns and editorial spreads",
        "Shot covers for 8 issues across the three publications, including Vogue Italia's centennial relaunch",
        "Mentored 4 junior photographers through Condé Nast's emerging-talent program",
      ],
    },
    {
      role: "Freelance Photographer",
      company: "Independent",
      location: "Roma → Milano",
      startDate: "Jun 2015",
      endDate: "Feb 2018",
      bullets: [
        "Built portfolio with editorial commissions for Marie Claire Italia, L'Officiel, and Numéro Berlin",
        "Selected for Foam Talent 2017 — exhibited at Foam Amsterdam and Photo London",
      ],
    },
  ],
  education: [
    {
      school: "Istituto Europeo di Design (IED)",
      degree: "MA Photography",
      location: "Milano, IT",
      startDate: "2013",
      endDate: "2015",
    },
    {
      school: "Università IUAV di Venezia",
      degree: "BA Visual Arts",
      location: "Venezia, IT",
      startDate: "2009",
      endDate: "2013",
    },
  ],
  skills: [
    "Editorial Photography",
    "Brand Storytelling",
    "Studio Lighting",
    "Fashion Direction",
    "Color Grading",
    "Team Leadership",
  ],
  languages: [
    { name: "Italiano", level: "Native" },
    { name: "English", level: "Fluent" },
    { name: "Français", level: "Professional" },
  ],
  awards: [
    { title: "Vogue Italia Fresh Eyes", year: "2024" },
    { title: "Hasselblad Masters Finalist", year: "2022" },
    { title: "Italian Photography Award Editorial", year: "2021" },
    { title: "Foam Talent Selected", year: "2017" },
  ],
};

export const edwardLindqvist: CVData = {
  basics: {
    fullName: "Edward Lindqvist",
    role: "Senior Strategy Consultant",
    email: "edward.lindqvist@consulting.se",
    phone: "+46 70 458 1290",
    location: "Stockholm, Sweden",
    website: "edwardlindqvist.com",
    photoUrl: "",
    summary:
      "Senior consultant with 14 years advising Nordic financial institutions, energy companies, and family offices on strategic transformation. Former Bain & Company engagement manager. Currently leading the Nordic strategy practice at an independent advisory firm with €40M+ in mandates over the past three years.",
  },
  experience: [
    {
      role: "Partner",
      company: "Lindqvist Strategic Advisors",
      location: "Stockholm, SE",
      startDate: "Sep 2020",
      endDate: "Present",
      bullets: [
        "Founded boutique advisory firm focused on Nordic mid-market — grew to 12 consultants and €40M+ in cumulative mandates over 3 years",
        "Led strategic transformation engagements for clients including Nordea, Vattenfall, and three Wallenberg-controlled industrial groups",
        "Authored quarterly Nordic Strategy Outlook — 8,000+ subscribers across regional executive readership",
      ],
    },
    {
      role: "Engagement Manager",
      company: "Bain & Company",
      location: "Stockholm, SE",
      startDate: "Mar 2015",
      endDate: "Aug 2020",
      bullets: [
        "Managed 18 engagements across financial services, energy, and industrials with average team size of 6 consultants",
        "Promoted from Senior Consultant in 2.5 years (top quartile of cohort)",
        "Co-led Bain Stockholm's recruitment program at SSE and KTH — interviewed 200+ candidates annually",
      ],
    },
    {
      role: "Senior Analyst",
      company: "McKinsey & Company",
      location: "London, UK → Stockholm, SE",
      startDate: "Jul 2011",
      endDate: "Feb 2015",
      bullets: [
        "Joined out of LSE graduate program, transferred to Stockholm office after 18 months",
        "Specialized in financial services strategy across Northern European banking sector",
      ],
    },
  ],
  education: [
    {
      school: "London School of Economics",
      degree: "MSc Finance",
      location: "London, UK",
      startDate: "2009",
      endDate: "2011",
    },
    {
      school: "Stockholm School of Economics",
      degree: "BSc Business Administration",
      location: "Stockholm, SE",
      startDate: "2006",
      endDate: "2009",
    },
  ],
  skills: [
    "Strategic Planning",
    "Financial Analysis",
    "M&A Advisory",
    "Operating Model Design",
    "Board Communication",
    "Team Leadership",
  ],
  languages: [
    { name: "Svenska", level: "Native" },
    { name: "English", level: "Fluent" },
    { name: "Deutsch", level: "Professional" },
    { name: "Norsk", level: "Conversational" },
  ],
  awards: [
    { title: "Consulting Magazine Top 25 Under 35", year: "2022" },
    { title: "Bain Stockholm MVP Award", year: "2019" },
    { title: "LSE Distinguished Graduate", year: "2011" },
    { title: "Stockholm School of Economics Academic Excellence", year: "2009" },
  ],
};

export const zaraOkonkwo: CVData = {
  basics: {
    fullName: "Zara Okonkwo",
    role: "Creative Director",
    email: "zara@okonkwo.studio",
    phone: "+44 7700 912 348",
    location: "London, UK",
    website: "zaraokonkwo.com",
    photoUrl:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
    summary:
      "Creative Director shaping brand identities for music labels, fashion houses, and cultural institutions. 7 years across Lagos and London. Currently leading creative at independent agency Kindred & Co. Recent work for Boiler Room, Skepta, and the V&A Africa Fashion exhibition. Believes great brand work happens at the intersection of subculture and craft.",
  },
  experience: [
    {
      role: "Creative Director",
      company: "Kindred & Co",
      location: "London, UK",
      startDate: "Apr 2022",
      endDate: "Present",
      bullets: [
        "Lead creative across 25+ projects annually with team of 6 designers and 3 strategists, billing average £35k per engagement",
        "Directed identity system for V&A Africa Fashion exhibition — winner of D&AD Wood Pencil 2023 and Brand Impact Award",
        "Built agency reputation in music + culture vertical — clients now include Boiler Room, NTS Radio, Skepta's SK Music, and three Universal Music sub-labels",
      ],
    },
    {
      role: "Senior Designer",
      company: "Pentagram London",
      location: "London, UK",
      startDate: "Aug 2019",
      endDate: "Mar 2022",
      bullets: [
        "Worked on Daniel Weil's team across cultural institution rebrands including Tate Modern wayfinding refresh and Royal Opera House digital identity",
        "Selected for Pentagram's emerging talent showcase 2021 — featured in Eye Magazine and It's Nice That",
        "Mentored 2 junior designers through to associate level",
      ],
    },
    {
      role: "Brand Designer",
      company: "Studio Lagos",
      location: "Lagos, Nigeria",
      startDate: "Jul 2017",
      endDate: "Jul 2019",
      bullets: [
        "Co-founded studio with 2 partners — built portfolio across Nigerian fashion brands (Kenneth Ize, Orange Culture) and Lagos cultural events",
        "Selected for Lagos Design Week 2018 emerging studios cohort",
        "Designed identity for Lagos Photo Festival 2019 — used across all festival surfaces",
      ],
    },
  ],
  education: [
    {
      school: "Royal College of Art",
      degree: "MA Communication Design",
      location: "London, UK",
      startDate: "2015",
      endDate: "2017",
    },
    {
      school: "Yaba College of Technology",
      degree: "BA Graphic Design",
      location: "Lagos, Nigeria",
      startDate: "2011",
      endDate: "2015",
    },
  ],
  skills: [
    "Brand Identity",
    "Art Direction",
    "Type Design",
    "Creative Strategy",
    "Team Leadership",
    "Cultural Insight",
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "Yorùbá", level: "Native" },
    { name: "French", level: "Conversational" },
  ],
  awards: [
    { title: "D&AD Wood Pencil — Brand Identity", year: "2023" },
    { title: "Brand Impact Award — Cultural Sector", year: "2023" },
    { title: "Pentagram Emerging Talent", year: "2021" },
    { title: "Lagos Design Week Selected Studio", year: "2018" },
  ],
};

export const amaraHassan: CVData = {
  basics: {
    fullName: "Amara Hassan",
    role: "Wellness Coach & Yoga Instructor",
    email: "amara@stillbreath.co",
    phone: "+212 661 487 209",
    location: "Marrakech, Morocco",
    website: "stillbreath.co",
    photoUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    summary:
      "Wellness coach blending traditional Moroccan healing practices with modern somatic therapy. 8 years guiding individuals and small groups through breath work, movement, and quiet ritual. Founder of Still Breath retreat in the Atlas Mountains. Trained at the Esalen Institute and certified in Somatic Experiencing.",
  },
  experience: [
    {
      role: "Founder & Lead Practitioner",
      company: "Still Breath Retreats",
      location: "Atlas Mountains, Morocco",
      startDate: "Jan 2021",
      endDate: "Present",
      bullets: [
        "Founded boutique wellness retreat hosting 6-day intensives for groups of 8-12 — 92% repeat or referral booking rate across 3 years",
        "Designed proprietary curriculum blending Moroccan hammam traditions, somatic experiencing, and contemplative practice",
        "Built sustainable operation employing 6 local women year-round, with all profits above operating costs reinvested in community wellness programs",
      ],
    },
    {
      role: "Senior Yoga Instructor",
      company: "Soulshine Studios",
      location: "Bali, Indonesia",
      startDate: "Jun 2017",
      endDate: "Dec 2020",
      bullets: [
        "Lead teacher across 200-hour and 500-hour yoga teacher training programs — graduated 180+ certified instructors",
        "Curated weekly workshop series on breath, embodiment, and trauma-aware practice — consistently sold out",
        "Mentored 24 junior teachers through Soulshine's apprenticeship program",
      ],
    },
    {
      role: "Movement Therapy Apprentice",
      company: "Esalen Institute",
      location: "Big Sur, California",
      startDate: "Sep 2015",
      endDate: "May 2017",
      bullets: [
        "Selected for two-year residency studying somatic practice under Esalen's senior faculty",
        "Co-led weekly community classes in gentle movement and contemplative inquiry",
      ],
    },
  ],
  education: [
    {
      school: "Somatic Experiencing International",
      degree: "Certification in Somatic Experiencing",
      location: "Boulder, USA",
      startDate: "2018",
      endDate: "2020",
    },
    {
      school: "American University in Cairo",
      degree: "BA Comparative Religion",
      location: "Cairo, Egypt",
      startDate: "2010",
      endDate: "2014",
    },
  ],
  skills: [
    "Somatic Practice",
    "Breathwork",
    "Yoga Instruction",
    "Group Facilitation",
    "Trauma-Aware Coaching",
    "Retreat Design",
  ],
  languages: [
    { name: "العربية", level: "Native" },
    { name: "English", level: "Fluent" },
    { name: "Français", level: "Fluent" },
    { name: "Bahasa Indonesia", level: "Conversational" },
  ],
  awards: [
    { title: "Conde Nast Traveller Top 50 Wellness Retreats", year: "2024" },
    { title: "Yoga Journal Featured Practitioner", year: "2023" },
    { title: "Esalen Institute Resident Fellowship", year: "2017" },
    { title: "AUC Distinguished Graduate", year: "2014" },
  ],
};

export const laylaHassan: CVData = {
  basics: {
    fullName: "Layla Hassan",
    role: "Brand Strategy Director",
    email: "layla@hassanstrategy.co",
    phone: "+44 20 7946 0958",
    location: "London, UK",
    website: "laylahassan.co",
    linkedIn: "linkedin.com/in/laylahassan",
    summary:
      "<p>Brand strategist with 8 years building consumer brands across MENA and Europe. Currently leading brand strategy at an independent firm focused on fintech and consumer apps. Specialty: turning cultural insight into commercial growth.</p>",
  },
  experience: [
    {
      company: "Acme Co",
      role: "Brand Director",
      location: "Dubai, UAE",
      startDate: "2022",
      bullets: [
        "Led EMEA rebrand reaching 10M users across 14 markets",
        "Built brand team from 2 to 8 specialists; promoted 3 to senior",
        "Owned $4M annual brand budget; achieved 32% lift in unaided awareness",
      ],
    },
    {
      company: "Globex",
      role: "Senior Brand Manager",
      location: "London, UK",
      startDate: "2019",
      endDate: "2022",
      bullets: [
        "Owned EMEA campaigns across consumer fintech vertical",
        "Ran weekly user research surfacing insight that drove $4.2M revenue lift",
        "Mentored 4 junior brand managers; 2 promoted within 18 months",
      ],
    },
    {
      company: "Stripe",
      role: "Brand Manager",
      location: "San Francisco, CA",
      startDate: "2017",
      endDate: "2019",
      bullets: [
        "Designed merchant brand system used by 500K businesses across 40+ countries",
        "Led rebrand of Stripe Atlas; activation rate climbed 22%",
        "Collaborated with marketing on Sessions 2017 keynote visual narrative",
      ],
    },
  ],
  education: [
    {
      school: "Stanford University",
      degree: "BA Marketing",
      location: "Stanford, CA",
      startDate: "2013",
      endDate: "2017",
      notes: "Concentration in Consumer Behavior",
    },
  ],
  skills: [
    "Brand Strategy",
    "Consumer Insight",
    "Campaign Leadership",
    "Cross-functional Team Building",
    "Cultural Storytelling",
    "Brand Architecture",
    "Performance Marketing",
    "Stakeholder Management",
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "Arabic", level: "Native" },
    { name: "French", level: "Conversational" },
  ],
  awards: [
    { title: "Cannes Lion · Bronze", year: "2023" },
    { title: "Effie Gold", year: "2021" },
  ],
};

export const saraKhan: CVData = {
  basics: {
    fullName: "Sara Khan",
    role: "Senior Marketing Manager",
    email: "sara@khan.marketing",
    phone: "+44 20 7946 0958",
    location: "Manchester, UK",
    website: "sarakhan.marketing",
    linkedIn: "linkedin.com/in/sarakhan",
    summary:
      "<p>Marketing manager with 9 years building consumer brands across UK and South Asia. Led campaigns for fintech, hospitality, and lifestyle brands. Specialty: turning audience insight into measurable growth.</p>",
  },
  experience: [
    {
      company: "Lloyds Bank",
      role: "Senior Marketing Manager",
      location: "Manchester, UK",
      startDate: "2022",
      bullets: [
        "Led brand refresh campaign reaching 8M customers across UK retail banking",
        "Owned £2.5M annual marketing budget; achieved 28% lift in brand consideration",
        "Mentored team of 4 marketing specialists; promoted 2 to senior level",
      ],
    },
    {
      company: "Boots UK",
      role: "Marketing Manager",
      location: "London",
      startDate: "2019",
      endDate: "2022",
      bullets: [
        "Managed seasonal campaigns across health and beauty categories",
        "Led customer research initiatives surfacing insights that drove £1.8M revenue lift",
        "Coordinated cross-functional launches with merchandising and digital teams",
      ],
    },
    {
      company: "Unilever Pakistan",
      role: "Marketing Executive",
      location: "Karachi",
      startDate: "2016",
      endDate: "2019",
      bullets: [
        "Executed 360-degree campaigns for personal care brands across South Asia",
        "Localized global campaigns for Pakistani market; improved engagement by 35%",
        "Built influencer marketing program from zero to 50+ partnerships",
      ],
    },
  ],
  education: [
    {
      school: "University of Manchester",
      degree: "BA Marketing & Communications",
      location: "Manchester, UK",
      startDate: "2012",
      endDate: "2016",
      notes:
        "First-class honours; dissertation on cross-cultural brand storytelling",
    },
  ],
  skills: [
    "Brand Strategy",
    "Campaign Management",
    "Audience Research",
    "Content Marketing",
    "Stakeholder Engagement",
    "Performance Analytics",
    "Cross-cultural Marketing",
    "Team Leadership",
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "Urdu", level: "Native" },
    { name: "Punjabi", level: "Conversational" },
  ],
};
