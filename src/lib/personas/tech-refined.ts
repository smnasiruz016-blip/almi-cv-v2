import type { CVData } from "@/lib/cv-types";

/** Lin Wei — UX Engineer. Tech / Refined. */
export const techRefined: CVData = {
  basics: {
    fullName: "Lin Wei",
    role: "Senior UX Engineer — Design Systems",
    email: "lin@linwei.studio",
    phone: "+852 5555 0192",
    location: "Hong Kong, HK",
    website: "linwei.studio",
    linkedIn: "linkedin.com/in/lin-wei-ux",
    photoUrl:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=faces",
    summary:
      "UX Engineer at the intersection of design and code. 9 years owning design systems for fintech and consumer apps across <em>Hong Kong, Singapore, and London</em>. I bridge teams; I write the docs other engineers actually read.",
  },
  experience: [
    {
      company: "WeLab Bank",
      role: "Senior UX Engineer — Design System Lead",
      location: "Hong Kong, HK",
      startDate: "2021",
      bullets: [
        "Lead engineer on the bank's design system (180 components, React + React Native).",
        "Adoption climbed from 4 to 22 product squads in 18 months; 96% of new screens consume the system.",
        "Authored the system's accessibility playbook — WCAG 2.2 AA across all components, audited externally.",
        "Co-host a monthly design-system office hour for engineers and designers — packed every session.",
      ],
    },
    {
      company: "Grab",
      role: "UX Engineer",
      location: "Singapore, SG",
      startDate: "2018",
      endDate: "2021",
      bullets: [
        "Worked on the rider-app component library (Flutter) — components used across 8 markets.",
        "Co-led the dark-mode rollout — accessibility audit for 240 screens.",
        "Internal speaker series on motion design for engineers — 4 sessions, 200+ attendees.",
      ],
    },
    {
      company: "Monzo",
      role: "Frontend Engineer",
      location: "London, GB",
      startDate: "2015",
      endDate: "2018",
      bullets: [
        "Worked on the iOS card-management surfaces during the company's transition to a full bank.",
        "Shipped the first version of the freezing/unfreezing card flow — pattern still in use.",
      ],
    },
  ],
  education: [
    {
      school: "University College London",
      degree: "MSc — Human-Computer Interaction",
      location: "London, GB",
      startDate: "2013",
      endDate: "2015",
      notes: "Distinction. Dissertation on motion design as a usability tool in financial apps.",
    },
    {
      school: "Hong Kong University of Science and Technology",
      degree: "BSc — Computer Science",
      location: "Hong Kong, HK",
      startDate: "2009",
      endDate: "2013",
      notes: "First class honours.",
    },
  ],
  skills: [
    "Design Systems",
    "React / React Native",
    "Storybook",
    "Figma → Code Pipelines",
    "WCAG 2.2 / Accessibility",
    "Motion Design",
    "Component API Design",
    "Cross-team Documentation",
    "Cross-cultural Collaboration",
  ],
  projects: [
    {
      name: "type-rhythm",
      description:
        "Open-source typography-rhythm utility for design systems. Used by 8 banks and 30+ teams (1.6k GitHub stars).",
      url: "github.com/linwei/type-rhythm",
    },
  ],
  certifications: [
    { name: "IAAP CPACC — Accessibility Core Competencies", issuer: "IAAP", year: "2023" },
  ],
  languages: [
    { name: "English", level: "C2" },
    { name: "Cantonese", level: "C2" },
    { name: "Mandarin", level: "C2" },
    { name: "Japanese", level: "B1" },
  ],
  awards: [
    { title: "Awwwards Site of the Day — WeLab Onboarding", issuer: "Awwwards", year: "2023" },
  ],
  interests: ["Brush calligraphy", "Long-distance hiking on the MacLehose Trail", "Indie game design"],
};
