import type { CVData } from "@/lib/cv-types";

/** Fatima Hassan — Site Supervisor. Trades / Refined. */
export const tradesRefined: CVData = {
  basics: {
    fullName: "Fatima Hassan",
    role: "Site Supervisor — Heritage & Restoration",
    email: "fatima@stonehouse-restoration.uk",
    phone: "+44 131 555 0148",
    location: "Edinburgh, GB",
    website: "fatimahassan-build.uk",
    linkedIn: "linkedin.com/in/fatima-hassan-build",
    photoUrl:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=faces",
    summary:
      "Site Supervisor specialising in <em>listed-building restoration and traditional masonry</em> — 12 years delivering Grade A and Grade B projects across Edinburgh's New Town and the Borders. CSCS Black, SMSTS, and a quiet record of bringing in heritage work without delays or surprises.",
  },
  experience: [
    {
      company: "Stonehouse Restoration Ltd",
      role: "Site Supervisor",
      location: "Edinburgh, GB",
      startDate: "2018",
      bullets: [
        "Lead supervisor on 9 Grade A listed projects in the New Town conservation area, total contract value £14M.",
        "Coordinate with Historic Environment Scotland on every consent application — zero refusals or stop-notices in 7 years.",
        "Manage crews of 12–25 trades — masons, joiners, plasterers, leadworkers — across concurrent sites.",
        "Trained 6 apprentice masons through CITB's heritage-skills programme.",
      ],
    },
    {
      company: "Borders Heritage Builders",
      role: "Working Foreman",
      location: "Melrose, GB",
      startDate: "2014",
      endDate: "2018",
      bullets: [
        "Foreman on a £2.1M Abbotsford House restoration — Sir Walter Scott's home; press-covered project.",
        "Specialised in lime-mortar pointing, ashlar dressing, and slate roof rebuilds on 18th-century stone.",
        "Authored the company's heritage method statements, still in use today.",
      ],
    },
    {
      company: "Brown Brothers Building",
      role: "Apprentice Stonemason → Mason",
      location: "Edinburgh, GB",
      startDate: "2010",
      endDate: "2014",
      bullets: [
        "Completed the 4-year stonemasonry apprenticeship through Edinburgh College & SQA.",
        "City & Guilds Level 3 Diploma in Heritage Skills — distinction.",
      ],
    },
  ],
  education: [
    {
      school: "Edinburgh College",
      degree: "SVQ Level 3 — Stonemasonry (Heritage Skills)",
      location: "Edinburgh, GB",
      startDate: "2010",
      endDate: "2014",
      notes: "Distinction. CITB heritage-skills bursary.",
    },
  ],
  skills: [
    "Listed Building Consent Process",
    "Lime Mortar & Pointing",
    "Ashlar Stone Dressing",
    "Heritage Method Statements",
    "SMSTS / SSSTS",
    "CSCS Black (Manager)",
    "CDM 2015 Compliance",
    "Crew Coordination",
    "Stakeholder Liaison",
  ],
  certifications: [
    { name: "CSCS Black — Construction Manager", issuer: "CSCS", year: "2020" },
    { name: "SMSTS — Site Management Safety Training Scheme", issuer: "CITB", year: "2022" },
    { name: "First Aid at Work", issuer: "St John Ambulance", year: "2024" },
    { name: "City & Guilds Level 3 Heritage Skills", issuer: "City & Guilds", year: "2014" },
  ],
  languages: [
    { name: "English", level: "C2" },
    { name: "Arabic", level: "C2" },
    { name: "Scottish Gaelic", level: "A2" },
  ],
  awards: [
    {
      title: "Edinburgh World Heritage Conservation Craft Award",
      issuer: "EWH",
      year: "2022",
    },
  ],
  interests: ["Hill walking in the Cairngorms", "Calligraphy", "Mentoring women in trades"],
};
