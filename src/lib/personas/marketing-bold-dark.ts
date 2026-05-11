import type { CVData } from "@/lib/cv-types";

/** Alex Johnson — Senior Marketing Manager. Marketing / Bold / Dark.
 * US-based mid-senior marketer (Brooklyn, NY) with an achievements-led
 * career narrative. Per T1: basics.summary carries the hero tagline.
 * Per the marathon footer pattern: phone + linkedIn are populated for
 * ATS keyword matching and reuse on other templates, but Dark Bold
 * Marketing renders only email + portfolio in the page footer. */
export const marketingBoldDark: CVData = {
  basics: {
    fullName: "Alex Johnson",
    role: "Senior Marketing Manager",
    email: "alex.johnson@alexjohnsonmarketing.com",
    phone: "+1 718 555 0144",
    location: "Brooklyn, NY 11201",
    website: "alexjohnsonmarketing.com",
    linkedIn: "linkedin.com/in/alex-johnson-marketing",
    summary:
      "Senior marketer building brand-led growth at the intersection of content, data, and community.",
  },
  experience: [
    {
      company: "Sundial Brand Studio",
      role: "Senior Marketing Manager",
      location: "Brooklyn, NY",
      startDate: "Mar 2022",
      bullets: [
        "Led integrated marketing for 6 consumer brands; combined annual revenue $48M",
        "Built content engine producing 80+ assets per month across paid, organic, and CRM",
        "Grew flagship client's email list from 32k to 187k in 14 months through retention-led growth experiments",
      ],
    },
    {
      company: "Heartline Media",
      role: "Marketing Manager",
      location: "New York, NY",
      startDate: "Jun 2019",
      endDate: "Feb 2022",
      bullets: [
        "Managed acquisition for 4 DTC clients with combined media spend of $6M annually",
        "Built cross-functional partnerships between creative, performance, and CRM teams",
        "Reduced blended CAC 28% through audience segmentation overhaul",
      ],
    },
    {
      company: "Plum Digital",
      role: "Growth Marketing Associate",
      location: "New York, NY",
      startDate: "Aug 2016",
      endDate: "May 2019",
      bullets: [
        "Owned paid social testing pipeline for B2C clients on Meta and TikTok",
        "Promoted from Coordinator to Associate in 18 months",
      ],
    },
  ],
  education: [
    {
      school: "NYU Stern School of Business",
      degree: "Master of Business Administration (MBA)",
      location: "New York, NY",
      startDate: "2019",
      endDate: "2021",
      notes:
        "Specialization: Marketing & Brand Strategy · Stern Marketing Club, VP of Programming",
    },
    {
      school: "University of Michigan",
      degree: "Bachelor of Arts in Communication",
      location: "Ann Arbor, MI",
      startDate: "2012",
      endDate: "2016",
      notes: "Minor: Statistics · Cum Laude, Dean's List 6 of 8 semesters",
    },
  ],
  skills: [
    "Brand Strategy",
    "Performance Marketing (Meta, Google, TikTok)",
    "Content Strategy",
    "Lifecycle Marketing",
    "Data Analysis (GA4, Looker, Amplitude)",
    "Creative Direction",
    "Cross-functional Leadership",
    "Marketing Operations",
  ],
  achievements:
    "Built Heartline Media's first integrated growth team — a cross-functional pod of 7 spanning content, performance, and CRM — and shipped the case study that anchored the agency's <strong>Series A pitch in 2021</strong>. Recognized as <strong>40 Under 40 in Marketing</strong> by the New York Brand Council in 2023. Volunteer mentor at AdHoc, the NYC marketing apprenticeship program, since 2020.",
};
