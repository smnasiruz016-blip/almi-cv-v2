// Sourced role-CV content — the "verified role-content dataset" that un-thins the
// /cv-guide/[country]/[role] grid (each entry SOURCED via a SERP/research pass:
// what people actually ask about a [role] CV — sections, length, the skills &
// ATS keywords recruiters search). Honest: figures are sourced, never invented;
// banned-verb clean. Added in batches like the origin set; a role becomes
// self-canonical + indexable only once it has an entry here (real-data-or-noindex).

export type RoleCvContent = {
  /** What a [role] CV should include — the sections. */
  include: string;
  /** How long / format guidance. */
  length: string;
  hardSkills: string[];
  softSkills: string[];
  atsKeywords: string[];
  /** Sourced note on the keywords (e.g. "appear in 85%+ of nursing job descriptions"). */
  atsNote: string;
};

export const ROLE_CV_CONTENT: Record<string, RoleCvContent> = {
  // ── Batch 1 (sourced via live SERP 2026: Indeed, Nurse.org, enhancv, ATS guides) ──
  // NOTE: keys MUST be the canonical role slug from @smnasiruz016-blip/job-roles
  // (e.g. "registered-nurse", not "nurse" — there is no "nurse" slug).
  "registered-nurse": {
    include:
      "Your name and contact details, a short professional summary, your nursing registration and licence number, clinical experience with measurable achievements, education, certifications (BLS, ACLS, PALS), and a key-skills section.",
    length:
      "Recruiters scan in seconds, so keep it tight and tailored to the posting — lead with your strongest clinical experience and current certifications rather than listing every duty.",
    hardSkills: [
      "Patient assessment",
      "Medication administration",
      "IV therapy",
      "Wound care",
      "EHR (Epic / Cerner / Meditech)",
      "Infection control",
      "Care planning",
    ],
    softSkills: [
      "Communication",
      "Critical thinking",
      "Teamwork",
      "Time management",
      "Patient advocacy",
    ],
    atsKeywords: [
      "Patient Care",
      "Medication Administration",
      "Patient Assessment",
      "IV Therapy",
      "Care Planning",
      "BLS/ACLS Certified",
      "EHR",
    ],
    atsNote:
      "These appear in 85%+ of nursing job descriptions — use 15–25 drawn from the actual posting, integrated naturally, never keyword-stuffed.",
  },
  "software-engineer": {
    include:
      "A short professional summary (experience level, strongest stack, impact), an Experience section, a Skills section grouped by category (Languages, Frameworks, Cloud, Practices), Education, and a Projects section (personal builds, open-source, freelance).",
    length: "One page for junior/mid-level, two pages maximum for senior/staff — recruiters scan top-down, so keep skills high on page one.",
    hardSkills: ["Python", "JavaScript / TypeScript", "AWS / Azure / GCP", "Docker", "Kubernetes", "REST APIs", "SQL", "CI/CD", "Git"],
    softSkills: ["Problem solving", "Communication", "Collaboration", "Code review"],
    atsKeywords: ["Python", "JavaScript", "TypeScript", "AWS", "Docker", "Kubernetes", "REST API", "CI/CD", "SQL"],
    atsNote: "ATS keyword matching is literal — mirror the posting's exact terms (write \"JavaScript\", not \"JS\"), keep a clean single-column layout, and quantify every achievement.",
  },
  accountant: {
    include:
      "A professional summary, an Experience section focused on measurable outcomes, a Skills section (processes, software and standards), Certifications, and Education.",
    length: "One page (two for senior profiles) — section order affects your ATS score, so lead with the most relevant accounting experience.",
    hardSkills: ["General Ledger", "Accounts Payable / Receivable", "Month-End Close", "Reconciliation", "QuickBooks", "SAP", "Oracle / NetSuite", "Excel", "GAAP / IFRS"],
    softSkills: ["Attention to detail", "Confidentiality", "Deadline management", "Communication", "Problem solving"],
    atsKeywords: ["General Ledger", "Accounts Payable", "Reconciliation", "Month-End Close", "QuickBooks", "SAP", "GAAP", "SOX Compliance"],
    atsNote: "97%+ of companies filter with ATS — match the exact software named in the posting (QuickBooks/SAP/Oracle) and show measurable outcomes, not routine duties.",
  },
  "project-manager": {
    include:
      "A summary (certification, years, budget range), a Certifications section (PMP/CSM with issuing body and year), Experience that quantifies budget, team size, timeline and outcome, a Skills section (Agile, Waterfall, SAFe), Education, and tools (Jira, MS Project, Smartsheet).",
    length: "One to two pages — every bullet should carry at least one quantifiable metric (budget, team size, delivery rate).",
    hardSkills: ["Agile", "Scrum", "Waterfall", "Risk Management", "Budget Management", "Stakeholder Management", "Jira", "MS Project", "SAFe"],
    softSkills: ["Leadership", "Communication", "Negotiation", "Conflict resolution", "Decision-making"],
    atsKeywords: ["Project Management", "Agile", "Scrum", "PMP", "Stakeholder Management", "Risk Management", "Budget Management", "Jira"],
    atsNote: "Spell out certifications (PMP, CAPM, CSM, PMI-ACP) and place your primary one in the header; keywords in the summary and job titles carry more weight than a standalone list.",
  },
  "graphic-designer": {
    include:
      "A header with a clickable portfolio link, a summary (design philosophy and level), a Skills / tech-stack section, Experience in reverse-chronological order, Education, and optional certifications/awards (Adobe).",
    length: "Usually one page — place the portfolio link prominently at the top; a missing or broken link is an instant filter.",
    hardSkills: ["Adobe Photoshop", "Illustrator", "InDesign", "Figma", "Typography", "Branding", "UI/UX design", "Motion graphics"],
    softSkills: ["Creativity", "Communication", "Cross-team collaboration", "Attention to detail"],
    atsKeywords: ["Adobe Photoshop", "Illustrator", "InDesign", "Figma", "Brand Identity", "UI/UX", "Typography", "Motion Graphics"],
    atsNote: "Keep the design ATS-friendly — single column, readable fonts, text-based content (never an image-only resume); tailor the skills list per posting (Figma for UI, InDesign for print).",
  },
  "marketing-manager": {
    include:
      "A summary that matches the job title, Experience showing channels managed + tools used + business outcomes, a Skills section of 8–12 tools grouped by function, and Education.",
    length: "One page under ten years' experience, two pages maximum for senior roles.",
    hardSkills: ["Marketing Strategy", "Campaign Management", "SEO", "PPC", "Content Strategy", "Email Marketing", "Google Analytics (GA4)", "Google Ads", "Meta Ads", "HubSpot"],
    softSkills: ["Leadership", "Communication", "Analytical thinking", "Creativity"],
    atsKeywords: ["Marketing Strategy", "Campaign Management", "SEO", "Google Analytics", "HubSpot", "PPC", "Content Marketing", "Brand Management"],
    atsNote: "Make the exact phrase \"Marketing Manager\" appear in your summary or skills (ATS scores title match); quantify everything (CTR, conversion, ROI, pipeline) and weave tools into bullets, not a bare list.",
  },
  "data-analyst": {
    include:
      "Standard-labelled sections — Professional Summary, Technical Skills (organized by category), Experience, Projects, Education and Certifications (parsers skip creative labels like \"My Journey\").",
    length: "Usually one page — prioritize the most relevant tools at the top of the skills section.",
    hardSkills: ["SQL", "Python (pandas / NumPy)", "Tableau", "Power BI", "Looker", "Excel", "ETL", "A/B testing", "Statistics"],
    softSkills: ["Problem solving", "Communication", "Attention to detail", "Data storytelling"],
    atsKeywords: ["SQL", "Python", "Tableau", "Power BI", "Data Analysis", "ETL", "A/B Testing", "Excel"],
    atsNote: "ATS matches specific tools, not generic labels — list \"SQL (Snowflake, BigQuery)\" rather than just \"SQL\", and write bullets as Action + Task + Metric.",
  },
  "business-analyst": {
    include:
      "A summary, a Skills section listing BA tools and methodologies by category, a Certifications section (CBAP, IIBA, Agile), Experience and Education.",
    length: "One to two pages — put the most important keywords in your summary, job titles and the first bullet of each role.",
    hardSkills: ["Requirements Gathering", "User Stories", "SQL", "JIRA", "Agile / Scrum", "Process Mapping", "Gap Analysis", "Business Process Modeling", "Confluence"],
    softSkills: ["Stakeholder management", "Communication", "Analytical thinking", "Problem solving"],
    atsKeywords: ["Requirements Gathering", "User Stories", "SQL", "JIRA", "Agile", "Stakeholder Management", "Gap Analysis", "BRD"],
    atsNote: "Include 25–35 keywords matched to the posting; start from the job ad and list the skills it names at the top of your skills section.",
  },
  "sales-manager": {
    include:
      "A summary (years in sales management + team scale + revenue), an Experience section connecting each management action to a measurable team outcome, a Skills section (sales process + CRM), and Education.",
    length: "One to two pages — every bullet should include at least one number.",
    hardSkills: ["Sales Management", "Revenue Growth", "Quota Attainment", "Pipeline Management", "Salesforce", "HubSpot", "Sales Strategy", "Forecasting", "Territory Planning"],
    softSkills: ["Leadership", "Coaching", "Negotiation", "Communication"],
    atsKeywords: ["Sales Management", "Revenue Growth", "Quota Attainment", "Pipeline Management", "Salesforce", "Forecasting", "Territory Planning", "CRM"],
    atsNote: "Recruiters scan the first 7 seconds for quota attainment, revenue generated and CRM tools — make those three visible immediately; these keywords appear in 90%+ of sales-manager postings.",
  },
  "customer-service-representative": {
    include:
      "A skills-focused section at the top, a short summary, an Experience section with quantified results, a Skills section (CRM + interpersonal), and Education.",
    length: "Usually one page — a skills-first format puts your customer-service abilities front and center.",
    hardSkills: ["CRM (Zendesk / Salesforce)", "Conflict resolution", "De-escalation", "CSAT", "First Contact Resolution (FCR)", "Ticketing"],
    softSkills: ["Communication", "Empathy", "Emotional intelligence", "Problem solving", "Patience"],
    atsKeywords: ["Customer Service", "CRM", "Zendesk", "Conflict Resolution", "CSAT", "First Contact Resolution", "Ticketing"],
    atsNote: "Weave the posting's exact terms into your summary and bullets, and quantify results (CSAT %, tickets handled per day, FCR rate) — hiring managers skim for proof.",
  },
  "hr-manager": {
    include:
      "A summary (certification, years, team size and one anchor metric), a Skills section naming your HRIS and ATS platforms plus HR sub-functions, quantified Experience (time-to-fill, turnover, retention, cost-per-hire), a Certifications section and Education.",
    length: "One to two pages.",
    hardSkills: ["Employee Relations", "Talent Acquisition", "Full-Cycle Recruiting", "Performance Management", "HRIS (Workday / BambooHR)", "Onboarding", "Compliance (FMLA / ADA / EEOC)"],
    softSkills: ["Communication", "Conflict resolution", "Discretion", "Leadership"],
    atsKeywords: ["Employee Relations", "Talent Acquisition", "Performance Management", "HRIS", "Workday", "Onboarding", "Compliance", "Recruiting"],
    atsNote: "Name your HRIS/ATS platform explicitly (Workday, Greenhouse); use 15–25 keywords matched to the posting and anchor bullets with HR metrics (time-to-fill, turnover, cost-per-hire).",
  },
  "civil-engineer": {
    include:
      "A summary, a Skills list (engineering software + technical areas), quantified Experience, a Certifications section (e.g. PE/chartered status), Education and key Projects.",
    length: "One to two pages — quantify cost reductions, time saved and efficiency gains.",
    hardSkills: ["AutoCAD", "Civil 3D", "Revit", "MicroStation", "Structural Analysis", "Hydraulics", "Surveying", "Geotechnical Engineering", "Building Codes (IBC)"],
    softSkills: ["Project management", "Problem solving", "Communication", "Teamwork"],
    atsKeywords: ["AutoCAD", "Civil 3D", "Structural Analysis", "Geotechnical", "Surveying", "Revit", "Project Management", "Hydraulics"],
    atsNote: "Use the exact software and codes named in the posting; 97%+ of employers filter with ATS first, so the right keywords decide whether a human ever sees the resume.",
  },
  teacher: {
    include:
      "A personal-statement summary, an Experience section with results, Education and Certifications (placed above Experience if you're early-career), a Skills section, and student-teaching/practicum detail where relevant.",
    length: "One to two pages — list 8–12 relevant skills using the posting's exact phrases.",
    hardSkills: ["Lesson planning", "Differentiation", "Assessment", "Classroom / behaviour management", "Curriculum design", "Google Classroom", "Parent communication"],
    softSkills: ["Communication", "Patience", "Adaptability", "Collaboration"],
    atsKeywords: ["Lesson Planning", "Classroom Management", "Differentiation", "Assessment", "Curriculum", "Google Classroom", "Student Engagement"],
    atsNote: "Name your teaching certification (e.g. QTS) and replace duties with measurable results — \"improved student scores by 30%\" beats \"taught students\".",
  },
  "web-developer": {
    include:
      "A short skill-focused summary, a Skills section (front- and back-end stack), an Experience section, a Projects section (often matters more than titles), and Education.",
    length: "Usually one page, single-column — list 15–25 skills matched to the posting.",
    hardSkills: ["HTML5", "CSS3", "JavaScript (ES6+)", "React", "Node.js", "REST APIs", "Git", "Responsive Design", "Web Accessibility (WCAG)"],
    softSkills: ["Problem solving", "Communication", "Collaboration", "Attention to detail"],
    atsKeywords: ["JavaScript", "React", "HTML5", "CSS3", "REST API", "Git", "Responsive Design", "Node.js"],
    atsNote: "List both \"React\" and \"JavaScript\" as distinct keywords (ATS searches each separately); use a single column (two-column resumes parse as gibberish) and lead with projects.",
  },
  "product-manager": {
    include:
      "A three-sentence summary (top skills + biggest wins), an Experience section showing cross-functional leadership and business outcomes, a Skills section (strategy + methodologies + tools), Certifications spelled out (CSM, PSPO), and Education.",
    length: "One to two pages — keep the summary to 3–4 sentences with keywords from the posting.",
    hardSkills: ["Product Strategy", "Product Roadmap", "Go-to-Market", "Agile / Scrum", "User Stories", "Backlog Management", "JIRA", "Amplitude", "A/B testing"],
    softSkills: ["Leadership", "Stakeholder management", "Communication", "Critical thinking"],
    atsKeywords: ["Product Roadmap", "Product Strategy", "Agile", "JIRA", "Go-to-Market", "User Stories", "Stakeholder Management", "KPIs"],
    atsNote: "Include tool-specific keywords (Jira, Amplitude, Productboard) — missing them scores 30+ points lower on ATS scans; spell certifications out in full (CSM, PSPO).",
  },
};

const BY_SLUG = ROLE_CV_CONTENT;
export function getRoleCvContent(roleSlug: string): RoleCvContent | undefined {
  return BY_SLUG[roleSlug];
}
export function hasRoleCvContent(roleSlug: string): boolean {
  return roleSlug in BY_SLUG;
}
export const ROLE_CV_CONTENT_SLUGS: string[] = Object.keys(ROLE_CV_CONTENT);

// ── Curated CV-destination countries (founder gate, real-data-or-noindex) ────
// The ~40 markets where CV norms genuinely differ and CV/resume search demand is
// real: anglophone + European (Europass) + Gulf (photo) + the largest origin
// markets. A role×country grid cell is self-canonical + indexed only when the
// role has sourced content AND the country is in this set — keeps the grid from
// becoming 99k near-duplicates (the AlmiPrep 26k→4k lesson).
export const CURATED_CV_COUNTRIES: readonly string[] = [
  // Anglophone
  "united-states", "united-kingdom", "canada", "australia", "new-zealand", "ireland",
  // Europe (Europass / distinct conventions)
  "germany", "france", "netherlands", "spain", "italy", "sweden", "switzerland",
  "belgium", "austria", "poland", "portugal", "norway", "denmark", "finland",
  // Gulf / Middle East (photo conventions, migration)
  "united-arab-emirates", "saudi-arabia", "qatar", "oman", "kuwait", "bahrain",
  // Largest origin markets / high CV demand
  "india", "pakistan", "bangladesh", "philippines", "nigeria", "kenya",
  "south-africa", "egypt", "singapore", "malaysia", "indonesia", "japan", "brazil",
];

const CURATED_SET = new Set(CURATED_CV_COUNTRIES);
export function isCuratedCvCountry(slug: string): boolean {
  return CURATED_SET.has(slug);
}

/** Grid gate: a role×country page is self-canonical + indexable only where the
 *  role has sourced CV content AND the country is a curated CV destination. */
export function isRoleCountryIndexable(roleSlug: string, countrySlug: string): boolean {
  return hasRoleCvContent(roleSlug) && isCuratedCvCountry(countrySlug);
}
