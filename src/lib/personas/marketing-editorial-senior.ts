import type { CVData } from "@/lib/cv-types";

/** Layla Hadi — Senior Marketing Manager. Marketing / Editorial / Senior.
 * Gulf-focused multilingual archetype (Arabic / English / French) for the
 * Editorial Navy template. Phone and linkedIn are populated for ATS keyword
 * matching and reuse on other templates; Editorial Navy's hero only renders
 * 3 lines (Address / Email / Portfolio) by design. */
export const marketingEditorialSenior: CVData = {
  basics: {
    fullName: "Layla Hadi",
    role: "Senior Marketing Manager",
    email: "layla.hadi@laylahadi.marketing",
    phone: "+971 4 555 0117",
    location: "Dubai, United Arab Emirates",
    website: "laylahadi.marketing",
    linkedIn: "linkedin.com/in/layla-hadi-marketing",
    summary:
      "Senior marketing manager with <strong>10+ years</strong> building brand-led growth strategies across the GCC and broader EMEA region. Specialist in <strong>multilingual campaigns</strong> spanning Arabic, English, and French, with hands-on experience in performance marketing, content strategy, and regional brand voice. Led cross-functional teams of 25+ at hubs in Dubai and Abu Dhabi.",
  },
  experience: [
    {
      company: "Brand Strategy Partners",
      role: "Senior Marketing Manager",
      location: "Dubai, UAE",
      startDate: "Mar 2021",
      bullets: [
        "Led B2C marketing for 8 retail and hospitality brands across the GCC; combined media spend AED 12M+ annually",
        "Built multilingual content engines (Arabic / English) producing 200+ assets per month across paid social, search, and CRM",
        "Reduced blended customer acquisition cost 32% through audience segmentation overhaul in 2023",
      ],
    },
    {
      company: "Majid Al Futtaim",
      role: "Marketing Manager",
      location: "Dubai, UAE",
      startDate: "Jun 2017",
      endDate: "Feb 2021",
      bullets: [
        "Managed brand marketing for Mall of Emirates events portfolio — 50+ activations per year",
        "Coordinated cross-brand campaigns with regional partners including Carrefour, VOX Cinemas, and Magic Planet",
        "Increased event footfall 18% year-over-year through targeted GCC-wide media planning",
      ],
    },
    {
      company: "Edelman Middle East",
      role: "Marketing Coordinator",
      location: "Dubai, UAE",
      startDate: "Jul 2014",
      endDate: "May 2017",
      bullets: [
        "Coordinated PR and marketing campaigns for 12 regional and international clients",
        "Managed media relations across Arabic and English business press in the UAE",
        "Promoted to Manager role within 35 months",
      ],
    },
  ],
  education: [
    {
      school: "INSEAD",
      degree: "Master of Business Administration (MBA)",
      location: "Abu Dhabi, UAE",
      startDate: "2015",
      endDate: "2017",
      notes: "Specialization: Marketing Strategy · Dean's List",
    },
    {
      school: "American University in Dubai",
      degree: "Bachelor of Communication and Media Studies",
      location: "Dubai, UAE",
      startDate: "2009",
      endDate: "2013",
      notes: "Minor: Arabic Literature · Cum Laude",
    },
  ],
  skills: [
    "Digital Marketing",
    "Content Strategy",
    "Brand Management",
    "Performance Marketing (Google Ads, Meta)",
    "Data Analysis (GA4, Looker, Mixpanel)",
    "Multilingual Campaign Management",
  ],
  languages: [
    { name: "Arabic", level: "C2" },
    { name: "English", level: "C1" },
    { name: "French", level: "B1" },
  ],
};
