import type { CVData } from "@/lib/cv-types";

/** Adrián Vega — Senior Project Manager. Project Management / Bold / Senior.
 * Title is "Senior Project Manager" (template positioning); summary and
 * actual job titles reflect program-management work at scale. The mismatch
 * is intentional — corporate PMs use "project" and "program" near-
 * interchangeably and the template name leads with "Project Manager". */
export const projectManagementBoldSenior: CVData = {
  basics: {
    fullName: "Adrián Vega",
    role: "Senior Project Manager",
    email: "adrian.vega@advega.pm",
    phone: "+34 91 555 0117",
    location: "Madrid, Spain",
    website: "advega.pm",
    linkedIn: "linkedin.com/in/adrian-vega-pmp",
    summary:
      "Senior Project Manager with 11 years' experience delivering large-scale digital transformation and infrastructure programs across European markets. Native Spanish, fluent English, conversational French. PMP, PRINCE2, and CSM certified. Track record of reducing delivery risk and accelerating cycle time on portfolios up to €40M.",
  },
  experience: [
    {
      company: "Telefónica Tech",
      role: "Senior Program Manager",
      location: "Madrid, Spain",
      startDate: "May 2020",
      bullets: [
        "Led EU-wide digital transformation programs across 12 countries; €40M annual portfolio",
        "Built cross-functional teams of 60+ engineers, product, and design across 3 hub cities",
        "Reduced delivery cycle time 28% through Scrum-at-scale rollout in 2022",
      ],
    },
    {
      company: "Acciona Energía",
      role: "Project Coordinator",
      location: "Madrid, Spain",
      startDate: "Sep 2016",
      endDate: "Apr 2020",
      bullets: [
        "Coordinated infrastructure deployment across 8 European wind farms; €18M capex",
        "Managed stakeholder alignment between local councils, EPC vendors, and regulators",
        "Cut schedule overrun rate from 22% to 7% via critical-path-method discipline",
      ],
    },
    {
      company: "Indra Sistemas",
      role: "Junior Analyst",
      location: "Madrid, Spain",
      startDate: "Jun 2013",
      endDate: "Aug 2016",
      bullets: [
        "Supported PMO with portfolio dashboards across 40+ active projects",
        "Built Excel-VBA + Power BI reporting cutting weekly status time by 12 hours",
        "Promoted to Coordinator role in 36 months",
      ],
    },
  ],
  education: [
    {
      school: "IESE Business School",
      degree: "Master of Business Administration (MBA)",
      location: "Barcelona, Spain",
      startDate: "2016",
      endDate: "2018",
      notes:
        "Specialization: Operations & Strategy · Dean's List, top 10% of cohort",
    },
    {
      school: "Universidad Carlos III de Madrid",
      degree: "Bachelor of Business Administration",
      location: "Madrid, Spain",
      startDate: "2009",
      endDate: "2013",
      notes:
        "Specialization: International Business · Erasmus exchange: HEC Paris (Spring 2012)",
    },
  ],
  skills: [
    "Strategic Planning",
    "Team Leadership",
    "Stakeholder Management",
    "Agile / Scrum-at-Scale",
    "Portfolio Management",
    "Risk Management",
    "Budget Management (€40M+)",
  ],
  certifications: [
    {
      name: "Project Management Professional (PMP)",
      issuer: "Project Management Institute",
      year: "2017",
    },
    {
      name: "PRINCE2 Practitioner",
      issuer: "AXELOS",
      year: "2019",
    },
    {
      name: "Certified Scrum Master (CSM)",
      issuer: "Scrum Alliance",
      year: "2021",
    },
  ],
  languages: [
    { name: "Spanish", level: "C2" },
    { name: "English", level: "C1" },
    { name: "French", level: "B1" },
  ],
};
