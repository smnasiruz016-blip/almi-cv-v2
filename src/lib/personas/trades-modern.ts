import type { CVData } from "@/lib/cv-types";

/** David Kim — Construction Project Manager. Trades / Modern. */
export const tradesModern: CVData = {
  basics: {
    fullName: "David Kim",
    role: "Senior Construction Project Manager",
    email: "dkim@haldenbuilds.construction",
    phone: "+1 206 555 0119",
    location: "Seattle, US",
    website: "davidkim.build",
    linkedIn: "linkedin.com/in/david-kim-construction",
    photoUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
    summary:
      "<strong>Construction PM</strong> with 14 years delivering commercial and mid-rise residential ground-up across the Pacific Northwest. $200M+ in lifetime put-in-place; PMP, LEED AP BD+C, and a track record of finishing on budget and on schedule.",
  },
  experience: [
    {
      company: "Halden Build Group",
      role: "Senior Project Manager",
      location: "Seattle, US",
      startDate: "2019",
      bullets: [
        "Lead PM on the Capitol Hill mixed-use ($62M, 8 stories, 142 units) — delivered 11 days early and 1.8% under budget.",
        "Run a portfolio of 3 concurrent ground-up projects totaling $130M with PEs, supers, and 18 trades.",
        "Cut RFI turnaround from 7 to 2.5 days by rolling out Procore Build to all subs and updating the prime contract template.",
        "Coach 4 Project Engineers — two promoted to APM in the last 24 months.",
      ],
    },
    {
      company: "Sellen Construction",
      role: "Project Engineer → Assistant Project Manager",
      location: "Seattle, US",
      startDate: "2014",
      endDate: "2019",
      bullets: [
        "Supported PMs on a $94M Amazon office tenant-improvement and a $48M life-sciences ground-up.",
        "Owned submittal log, RFI workflow, and pay-app review for both projects.",
        "Authored the firm's commissioning checklist, now standard on all life-sciences work.",
      ],
    },
    {
      company: "Mortenson",
      role: "Field Engineer",
      location: "Minneapolis, US",
      startDate: "2011",
      endDate: "2014",
      bullets: [
        "Field engineer on healthcare projects — Children's Minnesota expansion and Mayo Clinic Square.",
        "Daily QA/QC walkdowns; punchlist program closeout averaged 3 weeks faster than peers.",
      ],
    },
  ],
  education: [
    {
      school: "University of Washington",
      degree: "BSc Construction Management",
      location: "Seattle, US",
      startDate: "2007",
      endDate: "2011",
      notes: "AGC Outstanding Student Award. CMAA student chapter president.",
    },
  ],
  skills: [
    "Procore",
    "Primavera P6",
    "Bluebeam Revu",
    "Cost Forecasting",
    "Subcontractor Management",
    "Lean Construction (Last Planner)",
    "OSHA 30",
    "Closeout & Commissioning",
    "Stakeholder Reporting",
  ],
  certifications: [
    { name: "PMP — Project Management Professional", issuer: "PMI", year: "2018" },
    { name: "LEED AP BD+C", issuer: "USGBC", year: "2017" },
    { name: "OSHA 30 — Construction", issuer: "OSHA", year: "2023" },
  ],
  languages: [
    { name: "English", level: "C2" },
    { name: "Korean", level: "B2" },
  ],
  awards: [
    { title: "AGC Build Washington Award — Mixed-Use", issuer: "AGC", year: "2023" },
  ],
  interests: ["Trail running", "Woodworking", "Volunteer Habitat for Humanity build days"],
};
