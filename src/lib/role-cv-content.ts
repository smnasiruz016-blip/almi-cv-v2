// Sourced role-CV content — the "verified role-content dataset" that un-thins the
// /cv-guide/[country]/[role] grid (each entry SOURCED via a SERP/research pass:
// what people actually ask about a [role] CV — sections, length, the skills &
// ATS keywords recruiters search). Honest: figures are sourced, never invented;
// banned-verb clean. Added in batches like the origin set; a role becomes
// self-canonical + indexable only once it has an entry here (real-data-or-noindex).

import { COUNTRIES_SERVED } from "@/lib/countries";

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
  // ── Batch 2 (sourced via live SERP 2026: Indeed, enhancv, beamjobs, ResumeWorded, ResumeAdapter) ──
  doctor: {
    include:
      "A hybrid academic/clinical résumé — header, a professional summary, licensure and board certifications (USMLE/MBBS, state) in their own section, clinical Experience with measurable patient outcomes, Education and training, research/publications where relevant, and separated hard and soft skills.",
    length: "Use reverse-chronological or hybrid format and focus on results, patient outcomes and systems improvement — avoid academic-detail overload.",
    hardSkills: ["Patient care", "Clinical diagnosis", "Board-certified procedures", "EHR (Epic)", "Treatment planning", "Multidisciplinary collaboration"],
    softSkills: ["Communication", "Empathy", "Teamwork", "Leadership"],
    atsKeywords: ["Patient Care", "Board Certified", "Clinical", "Diagnosis", "EHR", "USMLE", "Treatment Planning"],
    atsNote: "Recruiters scan for clinical competence, board certifications and measurable outcomes — avoid generic \"dedicated/passionate\" (on 90% of rejected physician resumes) and keep licensure current and visible.",
  },
  pharmacist: {
    include:
      "Contact details, a summary (years, setting, licensure, strongest credential), Experience with clinical and operational metrics, Education (PharmD), a Licensure section (state license number, NABP), Certifications (BCPS, immunization, MTM, BLS/ACLS), and Skills.",
    length: "Clean single-column format — list your state license and NABP number prominently; employers verify before interviews.",
    hardSkills: ["Medication Therapy Management", "Drug Utilization Review", "Prescription Verification", "Compounding", "Patient Counseling", "Clinical Pharmacy", "Pharmacy software (Epic Willow / Cerner)"],
    softSkills: ["Communication", "Attention to detail", "Compliance", "Patient care"],
    atsKeywords: ["Medication Therapy Management", "Patient Counseling", "Drug Utilization Review", "Clinical Pharmacy", "Compounding", "NAPLEX", "Compliance"],
    atsNote: "These keywords appear in 90%+ of pharmacist postings — use 25–35 matched to the role; 97%+ of pharmacy employers filter with ATS first.",
  },
  "mechanical-engineer": {
    include:
      "A summary, a Skills section grouped by category (CAD/CAE, Analysis methods, Manufacturing processes, Programming), Experience framed around projects (scope, role, tools, measurable outcome), Certifications and Education.",
    length: "One to two pages — weave tools into project bullets (e.g. \"developed a fluid-flow model in SolidWorks\").",
    hardSkills: ["SolidWorks", "CATIA", "AutoCAD", "ANSYS", "FEA", "CFD", "GD&T (ASME Y14.5)", "DFM", "MATLAB"],
    softSkills: ["Problem solving", "Project management", "Communication", "Teamwork"],
    atsKeywords: ["SolidWorks", "GD&T", "FEA", "AutoCAD", "Thermodynamics", "DFM", "CATIA", "ANSYS"],
    atsNote: "Name specific CAD software (SOLIDWORKS, CATIA), not generic \"CAD\" — ATS scans for exact matches like \"SolidWorks\" and \"GD&T\"; cite standards (ASME Y14.5, ISO 9001).",
  },
  "electrical-engineer": {
    include:
      "A summary, a Skills section by category (Design software, Hardware, Standards, Methodologies), Experience showing results, Certifications and Education.",
    length: "One to two pages — list 8–12 skills, prioritizing those named in the posting.",
    hardSkills: ["AutoCAD Electrical", "Altium", "ETAP", "PLC (Allen-Bradley / Siemens)", "Power systems", "Circuit design", "PCB design", "MATLAB", "Testing & commissioning"],
    softSkills: ["Critical thinking", "Technical writing", "Active listening", "Problem solving"],
    atsKeywords: ["Circuit Design", "Power Systems", "PLC", "AutoCAD", "PCB Design", "ETAP", "NEC", "MATLAB"],
    atsNote: "Use exact tool/standard names (Altium, ETAP, NEC, IEEE, UL) — generic \"circuit design\" without the specific tools the posting names makes you invisible to the ATS.",
  },
  "financial-analyst": {
    include:
      "A summary, a Skills section (modeling + analysis + tools), Experience with metric-driven bullets, Certifications (e.g. CFA), and Education.",
    length: "Usually one page — customize the skills section to each posting.",
    hardSkills: ["Financial Modeling (DCF, 3-statement)", "Variance Analysis", "Budget Forecasting", "Advanced Excel", "Financial Reporting", "GAAP", "SQL", "Power BI / Tableau", "FP&A"],
    softSkills: ["Analytical thinking", "Communication", "Attention to detail", "Presentation"],
    atsKeywords: ["Financial Modeling", "Variance Analysis", "Excel", "Forecasting", "FP&A", "GAAP", "DCF", "Financial Reporting"],
    atsNote: "The #1 rejection cause is missing financial-modeling, Excel and variance-analysis keywords — use 25–35 matched to the posting and quantify (e.g. cut forecast variance 12%→3%).",
  },
  electrician: {
    include:
      "A summary stating your license level and years, a Licenses & Certifications section (Journeyman/Master, OSHA), Experience describing scope of work and building types, a Skills section, and quantified achievements.",
    length: "Short, sharp and keyword-focused — only relevant experience and skills.",
    hardSkills: ["NEC code compliance", "Conduit bending", "Commercial / industrial wiring", "Circuit design", "Blueprint reading", "Lockout/Tagout", "EV / renewable infrastructure"],
    softSkills: ["Safety awareness", "Problem solving", "Teamwork", "Reliability"],
    atsKeywords: ["NEC Compliance", "Electrical Installation", "Commercial Wiring", "OSHA", "Conduit", "Troubleshooting", "Journeyman"],
    atsNote: "State your license level immediately (e.g. \"Licensed Journeyman\") and include \"NEC Compliance\"/\"Commercial Wiring\" + OSHA/Lockout-Tagout — without them even a Master Electrician gets filtered.",
  },
  chef: {
    include:
      "A 2–3 sentence summary (experience level and specialties), Experience with achievements and impact, an Education & Certifications section (ServSafe, HACCP), and a Skills section grouped by category (Culinary, Kitchen Management, Safety, Cuisine types).",
    length: "One to two pages — focus on quantifiable results, not duties.",
    hardSkills: ["Menu development", "Food cost control", "Kitchen operations", "Inventory management", "HACCP", "Food safety", "Scheduling", "Vendor management"],
    softSkills: ["Leadership", "Time management", "Creativity", "Communication"],
    atsKeywords: ["Menu Development", "Food Safety", "Inventory Management", "Kitchen Management", "Food Cost Control", "HACCP", "ServSafe"],
    atsNote: "ServSafe and HACCP are non-negotiable for most kitchen roles — list them inline; avoid tables/graphics ATS can't parse.",
  },
  "administrative-assistant": {
    include:
      "A summary, a Skills section (software + organizational), Experience with quantified achievements, Certifications (CAP, MOS), and Education.",
    length: "Concise — include 20–30 keywords matched to the posting, using its exact phrasing.",
    hardSkills: ["Microsoft Office (Word/Excel/PowerPoint/Outlook)", "Calendar management", "Scheduling", "Data entry", "Travel coordination", "Expense reporting", "Google Workspace"],
    softSkills: ["Communication", "Discretion", "Time management", "Multitasking", "Prioritization"],
    atsKeywords: ["Microsoft Office", "Calendar Management", "Scheduling", "Data Entry", "Travel Coordination", "Expense Reporting", "Confidentiality"],
    atsNote: "These appear in 90%+ of admin postings — quantify (e.g. \"coordinated 60+ meetings/week for 5 executives with 99% accuracy\") rather than \"managed calendars\".",
  },
  dentist: {
    include:
      "A summary, a Licensure & Certifications section of its own (INBDE, ADEX, state, DEA, BLS/ACLS) — recruiters read these first, Experience with measurable outcomes, Education, and 10–15 skills grouped (clinical + interpersonal).",
    length: "One to two pages.",
    hardSkills: ["Restorative dentistry", "Endodontics", "Prosthodontics", "Radiography", "Patient care", "CBCT treatment planning", "Charting software"],
    softSkills: ["Patient communication", "Attention to detail", "Team collaboration"],
    atsKeywords: ["Restorative Dentistry", "Patient Care", "Radiography", "Endodontics", "Prophylaxis", "Prosthodontics", "Oral Health"],
    atsNote: "Put licensure/certifications (INBDE, ADEX) in a separate section so ATS parses the credentials; quantify (e.g. \"500+ restorative procedures, 95% satisfaction\").",
  },
  architect: {
    include:
      "Contact details with a portfolio link, a summary (design approach, certifications, key projects), a Skills section (technical + soft), 2–4 Key Projects (role, tools, outcome), Certifications (RA, LEED AP, NCARB) and Education.",
    length: "Clean single-column with standard headings — put the portfolio link at the top.",
    hardSkills: ["Revit", "AutoCAD", "BIM", "3D rendering", "Sustainable Design (LEED)", "Construction Documentation", "Adobe Suite", "Zoning knowledge"],
    softSkills: ["Creativity", "Communication", "Project management", "Collaboration"],
    atsKeywords: ["BIM", "Revit", "AutoCAD", "Sustainable Design", "LEED AP", "Construction Documentation", "Project Management"],
    atsNote: "Keep it single-column with standard headings (ATS can't read graphics/icons); include RA/LEED AP/NCARB credentials and quantify (e.g. \"cut design time 25%\").",
  },
  "operations-manager": {
    include:
      "A summary, a Skills section (methodologies + management + supply chain), Experience built around operational KPIs, and Education.",
    length: "Simple one-column format — include 25–35 keywords matched to the posting.",
    hardSkills: ["Lean Six Sigma", "Process Improvement", "KPI Management", "Supply Chain Management", "Inventory Management", "Budget Management", "ERP systems", "Vendor Management"],
    softSkills: ["Leadership", "Strategic planning", "Stakeholder management", "Problem solving"],
    atsKeywords: ["Process Improvement", "Lean Six Sigma", "KPI Management", "Supply Chain", "Inventory Management", "Budget Management", "ERP"],
    atsNote: "Missing \"Process Improvement\", \"Lean Six Sigma\" or \"KPI Management\" can instantly disqualify; ops hiring is metric-driven — show throughput, cost reductions ($ and %), SLA/defect rates.",
  },
  "content-writer": {
    include:
      "A profile summary (SEO, storytelling, content strategy), Experience with measurable results, a Skills section (writing specialties + tools), a portfolio link with 3–5 samples, and Certifications.",
    length: "Usually one page — put keywords from the posting in your summary.",
    hardSkills: ["SEO writing", "Copywriting", "Blog / long-form content", "WordPress", "Google Analytics", "SEMrush / Ahrefs", "Content strategy", "Editing"],
    softSkills: ["Creativity", "Research", "Communication", "Adaptability"],
    atsKeywords: ["SEO Content Writing", "Copywriting", "Content Strategy", "WordPress", "Google Analytics", "SEMrush", "Content Calendar"],
    atsNote: "Include SEO + analytics tool names (Google Analytics, SEMrush, Ahrefs) and a portfolio link; show metrics per piece (traffic, rankings) and mirror the posting's exact terms.",
  },
  "ux-designer": {
    include:
      "A summary, a Skills section in labeled categories (UX, UI, Tools, Research) totalling ~18–25, Experience with STAR-method bullets that reference portfolio case studies, a portfolio link, and Education.",
    length: "Stick to a proven single-column template — save the creativity for your portfolio.",
    hardSkills: ["User Research", "Wireframing", "Prototyping", "Figma", "Design Systems", "Usability Testing", "Accessibility (WCAG)", "Information Architecture"],
    softSkills: ["Communication", "Collaboration", "Problem solving", "Empathy"],
    atsKeywords: ["User Research", "Wireframing", "Prototyping", "Figma", "Design Systems", "Usability Testing", "UX", "UI"],
    atsNote: "List exact tool names (Figma, Sketch, Adobe XD) — \"design tools\" is invisible to ATS; organize 18–25 skills by category and reference portfolio case studies in your bullets.",
  },
  "devops-engineer": {
    include:
      "A summary, a Skills section (cloud + containers + CI/CD + IaC + observability), Experience with quantified pipeline/infrastructure results, Certifications (AWS DevOps, CKA, Terraform Associate), and Education.",
    length: "Clean format, standard fonts, no graphics.",
    hardSkills: ["CI/CD", "Docker", "Kubernetes", "AWS / GCP / Azure", "Terraform", "Jenkins / GitHub Actions", "Ansible", "Linux", "Python / Bash", "Prometheus / Grafana"],
    softSkills: ["Problem solving", "Collaboration", "Incident response", "Communication"],
    atsKeywords: ["CI/CD", "Docker", "Kubernetes", "AWS", "Terraform", "Jenkins", "Ansible", "Infrastructure as Code"],
    atsNote: "Core keywords (CI/CD, Docker, Kubernetes, AWS, Terraform) are must-haves — missing more than two filters you out; name your cloud + CI/CD platform explicitly and quantify (e.g. \"cut deployment time 20%\").",
  },
  // ── Batch 3 (sourced via live SERP 2026: Indeed, enhancv, beamjobs, ResumeWorded, ResumeAdapter) ──
  "data-scientist": {
    include:
      "Standard, parseable sections — Professional Summary, a flat comma-separated Technical Skills section, Experience, Projects and Education (industry format, not an academic CV; ATS parsers misclassify Publications/Research headings).",
    length: "Aim for ~70% keyword overlap with the job description; every experience bullet a quantified outcome.",
    hardSkills: ["Python", "SQL", "R", "Machine Learning", "TensorFlow", "PyTorch", "scikit-learn", "Spark", "Statistical Modeling", "NLP"],
    softSkills: ["Problem solving", "Communication", "Data storytelling", "Collaboration"],
    atsKeywords: ["Python", "SQL", "Machine Learning", "TensorFlow", "PyTorch", "Statistical Modeling", "NLP", "Deep Learning"],
    atsNote: "ATS clears when keyword overlap with the posting is ~70%+; list skills flat and comma-separated (Python, pandas, scikit-learn) so each is an independent keyword, and quantify every bullet.",
  },
  "sales-representative": {
    include:
      "A positioning summary (years + vertical + quota attainment + primary tools), a Skills section (CRM + methodologies + tools), Experience that shows quota history year by year, and Education.",
    length: "One page under five years, up to two pages for 10+ — use chronological/combination format (a functional resume hides your quota timeline and raises suspicion).",
    hardSkills: ["Quota attainment", "Pipeline management", "Prospecting", "CRM (Salesforce / HubSpot)", "Cold calling", "Sales forecasting", "Account management", "Territory management"],
    softSkills: ["Negotiation", "Communication", "Relationship building", "Resilience"],
    atsKeywords: ["Quota Attainment", "Pipeline", "CRM", "Salesforce", "Prospecting", "New Business Development", "Account Management", "Revenue Growth"],
    atsNote: "List your CRM (Salesforce/HubSpot) or you're filtered at 90%+ of corporate sales roles; recruiters scan the first 7 seconds for quota %, revenue and CRM.",
  },
  lawyer: {
    include:
      "A professional profile, Experience, a Skills section, Education, Certifications, and a dedicated Bar Admissions section (jurisdiction + year), in reverse-chronological order.",
    length: "Plain text with simple headings — no tables (ATS treats table cells inconsistently); show impact with metrics.",
    hardSkills: ["Litigation", "Corporate Law", "Contract Drafting", "Legal Research (Westlaw / LexisNexis)", "Negotiation", "Due Diligence", "Compliance", "M&A"],
    softSkills: ["Analytical thinking", "Communication", "Attention to detail"],
    atsKeywords: ["Litigation", "Corporate Law", "Contract Drafting", "Legal Research", "Westlaw", "Negotiation", "Compliance", "Due Diligence"],
    atsNote: "Put bar admission(s) in a dedicated section (e.g. \"New York, 2020\"); 95%+ of firms filter with ATS — missing practice-area terms (\"M&A\", \"Securities\", \"Westlaw\") disqualifies even elite credentials.",
  },
  "cybersecurity-analyst": {
    include:
      "A summary naming your SIEM tools, a Skills section (those you hold) with the rest proven in bullets, a Certifications section (CISSP / Security+ / CEH), STAR-method Experience, and Education.",
    length: "20–30 keywords matched to the posting — every security keyword tied to a measurable outcome.",
    hardSkills: ["SIEM (Splunk / QRadar)", "Incident response", "Vulnerability assessment", "Threat detection", "Network security", "Firewalls / IDS-IPS", "Log analysis", "MITRE ATT&CK", "Penetration testing"],
    softSkills: ["Analytical thinking", "Attention to detail", "Communication", "Problem solving"],
    atsKeywords: ["SIEM", "Incident Response", "Threat Detection", "Vulnerability Assessment", "SOC Operations", "MITRE ATT&CK", "CompTIA Security+", "Splunk"],
    atsNote: "CISSP, Security+ and CEH are the most-scanned security keywords — put them in a dedicated section; include 20–30 tools/frameworks matched to the posting, each tied to a measurable outcome.",
  },
  "full-stack-developer": {
    include:
      "A summary stating your stack (e.g. React, Node.js, PostgreSQL), a Skills section grouped (Frontend, Backend, Databases, DevOps, Testing), Experience with measurable results, Projects and Education.",
    length: "Single column — carry BOTH front-end and back-end keywords.",
    hardSkills: ["JavaScript / TypeScript", "React", "Node.js / Express", "Python / Django", "PostgreSQL / MongoDB", "REST APIs / GraphQL", "Docker", "Git", "CI/CD"],
    softSkills: ["Problem solving", "Communication", "Collaboration", "Adaptability"],
    atsKeywords: ["React", "TypeScript", "Node.js", "JavaScript", "PostgreSQL", "REST API", "Docker", "GraphQL"],
    atsNote: "Your resume must carry both front-end (React, TypeScript, CSS) and back-end (Node.js, PostgreSQL, Docker) keywords; if the posting names React/Node/PostgreSQL, make those appear in your bullets and quantify (uptime, response time, user growth).",
  },
  "nurse-practitioner": {
    include:
      "Licensure and certifications at the top/header, a summary, a dedicated credentials section (APRN license + state, national board cert e.g. FNP-BC/AGPCNP-BC, DEA registration, prescriptive-authority status), quantified Experience, Skills and Education.",
    length: "15–25 keywords matched to the posting.",
    hardSkills: ["Advanced clinical assessment", "Differential diagnosis", "Prescribing", "Patient management", "Chronic disease management", "EHR (Epic / Cerner)", "Prescriptive authority"],
    softSkills: ["Patient-centered care", "Communication", "Critical thinking", "Collaboration"],
    atsKeywords: ["Autonomous Practice", "Prescriptive Authority", "Differential Diagnosis", "Patient Assessment", "Epic EHR", "AANP/ANCC Certified", "DEA Licensed", "FNP"],
    atsNote: "Place APRN license, board certification (FNP-BC, AGPCNP-BC), DEA and prescriptive-authority status at the top for immediate verification; quantify (e.g. \"panel of 1,200 patients, 20–22/day\").",
  },
  "supply-chain-manager": {
    include:
      "A summary, a Skills section (procurement + logistics + S&OP + ERP), Experience built on results (not responsibilities), Certifications (CSCP / MCIPS / Six Sigma), and Education.",
    length: "Single-column with standard headings — include 25–35 keywords matched to the posting.",
    hardSkills: ["Supply Chain Management", "Procurement", "Inventory Management", "Demand Planning", "Logistics", "S&OP", "SAP / ERP", "Vendor Management", "Cost Reduction"],
    softSkills: ["Leadership", "Negotiation", "Strategic planning", "Problem solving"],
    atsKeywords: ["Supply Chain Management", "Procurement", "Inventory Management", "Demand Forecasting", "Logistics", "SAP", "ERP", "S&OP"],
    atsNote: "The top failure is listing responsibilities instead of results — show OTIF, cost reductions, order accuracy and fulfilment speed; 25–35 keywords matched, single-column layout.",
  },
  "secondary-school-teacher": {
    include:
      "A profile, Experience with results, Education and Certifications (subject credential/QTS, safeguarding), a Skills section (instruction + soft, 10–15), and your subject expertise.",
    length: "One to two pages — use the posting's exact phrasing (e.g. \"classroom management\"), not synonyms.",
    hardSkills: ["Subject-matter expertise", "Lesson planning", "Differentiation", "Assessment", "Behaviour management", "Curriculum delivery", "Safeguarding", "IEP collaboration"],
    softSkills: ["Communication", "Student engagement", "Adaptability", "Pastoral care"],
    atsKeywords: ["Lesson Planning", "Classroom Management", "Differentiation", "Assessment", "Curriculum", "Subject Knowledge", "Safeguarding", "QTS"],
    atsNote: "Name your subject expertise and teaching credential/QTS (recruiters filter for explicit credentials); show measurable results (e.g. test-score gains), not just duties.",
  },
  "executive-assistant": {
    include:
      "A summary, a Skills section (C-suite support + software + board-level terms), Experience with quantified impact, and Education.",
    length: "15–25 keywords matched to the posting.",
    hardSkills: ["C-suite support", "Calendar management", "Board meeting preparation", "Travel coordination", "Expense reporting (Concur)", "Microsoft Office", "Project coordination"],
    softSkills: ["Discretion / confidentiality", "Time management", "Communication", "Prioritization"],
    atsKeywords: ["C-Suite Support", "Calendar Management", "Board Meeting Preparation", "Travel Coordination", "Concur", "Microsoft Office", "Confidentiality"],
    atsNote: "Board-level terms (\"board of directors\", \"governance documents\", \"executive confidentiality\", \"NDA protocols\") signal seniority; include 15–25 matched keywords and quantify executive support.",
  },
  receptionist: {
    include:
      "A summary, a Skills section (front-office software + interpersonal), Experience with measurable results, and Education.",
    length: "Concise and customized to the listing.",
    hardSkills: ["Front desk operations", "Multi-line phone handling", "Appointment scheduling", "MS Office", "Data entry", "CRM", "Cash handling"],
    softSkills: ["Communication", "Phone etiquette", "Organization", "Professionalism"],
    atsKeywords: ["Front Office", "Customer Service", "Scheduling", "Multi-line Phone", "Microsoft Office", "Administrative", "Data Entry"],
    atsNote: "Tailor to the sector — hotels: Opera PMS, guest satisfaction; medical: patient scheduling, insurance verification, EMR, HIPAA; use the posting's exact keywords and quantify.",
  },
  "social-media-manager": {
    include:
      "A Professional Summary, a Core Skills section, Career History, a social-media project portfolio (campaigns), and Certifications.",
    length: "Single column, standard fonts; use action verbs (launched, collaborated, promoted).",
    hardSkills: ["Social Media Management", "Content Creation", "Analytics", "Copywriting", "Community Engagement", "Paid Social", "Visual Design", "Scheduling tools"],
    softSkills: ["Creativity", "Communication", "Crisis management", "Adaptability"],
    atsKeywords: ["Social Media Marketing", "Content Creation", "Analytics", "Community Engagement", "Digital Marketing", "Copywriting", "Instagram", "Facebook"],
    atsNote: "The first five (Social Media Management, Content Creation, Community Engagement, Analytics, Copywriting) are in 80%+ of postings — prioritize them; show measurable results (\"increased conversions 145%\", \"managed 50+ accounts\").",
  },
  "dental-assistant": {
    include:
      "A summary, a Skills section (chairside + radiography + sterilization), Experience (radiographs, patient education, sterilization), and Certifications (CDA, BLS, X-ray certification).",
    length: "Match the posting's keywords rather than listing every possible skill.",
    hardSkills: ["Chairside assistance", "Dental radiography (X-ray)", "Sterilization / infection control", "Patient education", "Dental records", "Treatment planning support", "CPR / First Aid"],
    softSkills: ["Communication", "Attention to detail", "Team collaboration", "Empathy"],
    atsKeywords: ["Chairside Assistance", "Dental Radiography", "Sterilization", "Infection Control", "Patient Care", "X-ray", "CDA"],
    atsNote: "List certifications — Certified Dental Assistant (CDA), BLS, and especially X-ray certification (it raises earning potential and is often filtered for).",
  },
  "scrum-master": {
    include:
      "A summary, a Skills section (Scrum events + tools), Certifications prominently (CSM / PSM / SAFe), Experience with quantified impact, and Education.",
    length: "Single column — include 20–30 keywords matched to the posting.",
    hardSkills: ["Scrum", "Agile", "Kanban", "Sprint Planning", "Retrospectives", "Backlog Refinement", "Jira", "Confluence", "Continuous Improvement"],
    softSkills: ["Facilitation", "Coaching", "Servant leadership", "Conflict resolution"],
    atsKeywords: ["Scrum", "Agile", "Sprint Planning", "Backlog Refinement", "JIRA", "Retrospective", "CSM", "Kanban"],
    atsNote: "Missing \"Sprint Planning\", \"Backlog Refinement\" or \"JIRA\" can disqualify even with years of Agile; put certifications (CSM, PSM, SAFe) prominently — they're often hard ATS filters.",
  },
  "it-support-specialist": {
    include:
      "A summary (support specialization + years), a Technical Skills section by category (Ticketing, OS, Tools, Remote, Networking), Certifications (CompTIA A+, ITIL) in both the skills and certifications sections, and Experience with metrics.",
    length: "Keyword-matched to the posting.",
    hardSkills: ["Technical support", "Troubleshooting", "Active Directory", "Windows Server", "Ticketing (ServiceNow / Jira)", "Microsoft 365", "Networking (TCP/IP, DNS, DHCP)", "ITIL"],
    softSkills: ["Customer communication", "Problem solving", "Patience", "Teamwork"],
    atsKeywords: ["Technical Support", "Troubleshooting", "Active Directory", "Help Desk", "ServiceNow", "ITIL", "Windows", "Networking"],
    atsNote: "List certifications (CompTIA A+, ITIL) in BOTH the certifications and skills sections for ATS visibility; quantify first-call resolution, tickets/day, CSAT and mean-time-to-resolution.",
  },
  // ── Batch 4 (sourced via live SERP 2026: Indeed, enhancv, beamjobs, ResumeWorded, ResumeAdapter) ──
  "network-engineer": {
    include:
      "A Skills section near the top (Cisco certifications, protocols, tools), outcome-driven Experience (including lab/homelab projects), a prominent Certifications section (CCNA/CCNP/CCIE), and Education.",
    length: "Standard headings, no tables — demonstrate skills through results, not a standalone keyword list.",
    hardSkills: ["Cisco IOS", "Routing protocols (OSPF / BGP / EIGRP)", "TCP/IP", "VLANs", "Network security", "MPLS", "Wireshark", "SD-WAN / SD-Access", "Ansible"],
    softSkills: ["Problem solving", "Communication", "Analytical thinking", "Teamwork"],
    atsKeywords: ["CCNA", "Cisco", "OSPF", "BGP", "TCP/IP", "VLAN", "Network Security", "MPLS"],
    atsNote: "Put CCNA/CCNP/CCIE at the top (they carry as much weight as degrees); name exact protocols/tools (OSPF, BGP, NX-OS, Wireshark) and prove them in outcome-driven bullets.",
  },
  "quantity-surveyor": {
    include:
      "A profile, a Skills section (take-off, cost estimation, software), Experience (cost estimation, budgeting, contract administration), Certifications (RICS), and Education.",
    length: "Focus on measurable cost achievements.",
    hardSkills: ["Quantity take-off", "Cost estimation", "Budgeting", "Contract administration", "Value engineering", "CostX", "Primavera P6", "Bluebeam", "Advanced Excel"],
    softSkills: ["Negotiation", "Communication", "Attention to detail", "Analytical thinking"],
    atsKeywords: ["Cost Estimation", "Quantity Take-off", "Budgeting", "Contract Administration", "Value Engineering", "Procurement", "CostX"],
    atsNote: "Include \"cost estimation\", \"value engineering\" and \"procurement strategies\" plus the software named in the posting (CostX, Primavera); cite RICS and quantify cost outcomes.",
  },
  bookkeeper: {
    include:
      "A summary, a Skills section (software + processes), Experience that shows initiative beyond transaction recording, Certifications (Certified Bookkeeper, QuickBooks ProAdvisor), and Education.",
    length: "Keep it to one page with clean, standard headings.",
    hardSkills: ["QuickBooks (Online / Desktop)", "Xero", "General ledger", "Bank reconciliation", "Accounts payable / receivable", "Payroll", "Advanced Excel"],
    softSkills: ["Reliability", "Discretion", "Organization", "Time management"],
    atsKeywords: ["QuickBooks", "Reconciliation", "Accounts Payable", "Accounts Receivable", "General Ledger", "Payroll", "Xero"],
    atsNote: "Name the specific platform the posting uses (QuickBooks/Xero) — recruiters scan for QuickBooks, reconciliation and attention to detail within seconds; list Certified Bookkeeper / QuickBooks ProAdvisor.",
  },
  "financial-controller": {
    include:
      "A summary, a Skills section (ERP + GAAP/IFRS + reporting tools + compliance), Experience built on process-improvement accomplishments, Certifications (e.g. CPA), and Education.",
    length: "List at least 10 key skills to clear ATS scans.",
    hardSkills: ["GAAP", "IFRS", "SAP / Oracle ERP", "Financial Reporting", "Internal Controls", "SOX Compliance", "Financial Modeling", "Forecasting", "Budgeting", "Audit Coordination"],
    softSkills: ["Leadership", "Communication", "Critical thinking", "Adaptability"],
    atsKeywords: ["Financial Reporting", "GAAP", "Internal Controls", "SOX", "ERP", "Forecasting", "Budgeting", "Audit"],
    atsNote: "Show accomplishments, not duties — e.g. \"reduced month-end close from 10 to 5 days, improving reporting efficiency 50%\".",
  },
  "qa-engineer": {
    include:
      "A summary, a Skills section grouped (Testing types, Tools, Programming, Methodologies), Experience leading with test design / regression ownership / defect triage, and Education.",
    length: "Name the actual tools, not \"testing tools\".",
    hardSkills: ["Manual testing", "Automated testing", "Regression testing", "API testing", "Selenium WebDriver", "Jira", "Postman", "JMeter", "Java / Python / SQL"],
    softSkills: ["Attention to detail", "Problem solving", "Communication", "Collaboration"],
    atsKeywords: ["Selenium", "Jira", "API Testing", "Automated Testing", "Regression Testing", "Test Planning", "Postman", "SQL"],
    atsNote: "Call out actual tools by name (Selenium, Jira, Postman) — \"testing tools\" won't pass ATS; lead with test design, regression ownership and defect triage (you're expected to have touched at least one browser-automation tool).",
  },
  paralegal: {
    include:
      "A summary that includes the title \"Paralegal\" and your specializations, a Skills section (legal research + tools + practice areas), Experience with metrics, Certifications, and Education.",
    length: "Put the exact title in your summary — ATS searches for it.",
    hardSkills: ["Legal research (Westlaw / LexisNexis)", "Legal document preparation", "E-filing (PACER)", "Docketing", "Case management (Clio / MyCase)", "Discovery", "Litigation support"],
    softSkills: ["Attention to detail", "Communication", "Organization", "Time management"],
    atsKeywords: ["Legal Research", "Legal Document Preparation", "E-Filing", "Westlaw", "Clio", "Docketing", "Litigation", "Discovery"],
    atsNote: "Specify practice areas (Litigation, Corporate) and tools (Clio, Westlaw, PACER) — missing \"Legal Document Preparation\" or \"E-Filing\" filters you out; quantify (e.g. \"13 discovery packages/month\").",
  },
  physiotherapist: {
    include:
      "A summary, your licensure and DPT/education, clinical specializations, a Skills section (clinical competencies + software), Experience with quantified patient outcomes, and Certifications.",
    length: "Clear, standard headings so both ATS and hiring managers can scan.",
    hardSkills: ["Therapeutic exercise", "Gait training", "Manual therapy", "Musculoskeletal assessment", "Neurological rehab", "Standardized measures (FIM / TUG)", "EMR (WebPT)", "Modalities"],
    softSkills: ["Compassion", "Communication", "Attention to detail", "Interpersonal skills"],
    atsKeywords: ["Therapeutic Exercise", "Gait Training", "Manual Therapy", "Patient Care", "Rehabilitation", "WebPT", "DPT", "Licensure"],
    atsNote: "Lead with DPT degree, state licensure and clinical specializations (OCS, NCS, etc.); name PT software (WebPT, Therabill) and quantify outcomes (goal attainment, visits-to-discharge, satisfaction).",
  },
  radiographer: {
    include:
      "A summary, a Skills section listing imaging modalities by specific type, a Certifications section (ARRT, BLS), Experience with metrics, and patient-care/safety examples.",
    length: "Group skills by category for quick scanning.",
    hardSkills: ["Digital radiography (DR)", "Computed radiography (CR)", "CT", "MRI", "Radiation safety", "Imaging workflow", "PACS", "Patient positioning"],
    softSkills: ["Compassion", "Attention to detail", "Communication", "Teamwork"],
    atsKeywords: ["Digital Radiography", "Computed Tomography", "Radiation Safety", "ARRT", "Imaging", "MRI", "Patient Care", "PACS"],
    atsNote: "Use specific equipment types (\"Digital radiography (DR)\", \"CT\"), not \"X-ray machine\"; list ARRT certification + BLS and quantify (e.g. \"improved patient throughput 25%\").",
  },
  "store-manager": {
    include:
      "A profile summary, a Skills section aligned to the posting, Experience showing P&L, team size and comparable-store sales, and Education/Certifications.",
    length: "Clean one-column layout with standard headings.",
    hardSkills: ["Inventory management", "Staff scheduling", "KPI tracking", "Loss prevention", "Sales forecasting", "P&L ownership", "Visual merchandising", "POS systems"],
    softSkills: ["Leadership", "Communication", "Coaching", "Conflict resolution"],
    atsKeywords: ["Inventory Management", "Sales Forecasting", "KPI Tracking", "Loss Prevention", "Customer Service", "P&L", "Staff Scheduling"],
    atsNote: "At this level recruiters look for P&L ownership, team size, turnover reduction and comparable-store sales growth — quantify (sales growth %, shrink reduction, conversion rate, CSAT).",
  },
  recruiter: {
    include:
      "A summary, a Skills section (sourcing + ATS platforms + methodologies), Experience with hiring metrics, Certifications (SHRM-CP / PHR / AIRS), and Education.",
    length: "Single column — pick 8–15 genuine keywords (parsers penalize density above ~1.5%).",
    hardSkills: ["Full-cycle recruiting", "Talent sourcing", "Boolean search", "ATS management (Greenhouse / Lever / Workday)", "Employer branding", "Pipeline management", "LinkedIn Recruiter"],
    softSkills: ["Communication", "Relationship building", "Negotiation", "Organization"],
    atsKeywords: ["Full-Cycle Recruiting", "Talent Sourcing", "Boolean Search", "ATS", "Employer Branding", "Candidate Experience", "Pipeline Management"],
    atsNote: "Name your ATS/HRIS by version (e.g. \"Greenhouse (admin, 4 yrs), Workday Recruiting\"); these keywords appear in 85%+ of talent-acquisition postings.",
  },
  "primary-school-teacher": {
    include:
      "A summary, a Skills section categorized (Classroom management, Curriculum, EdTech, Assessment), Experience with student-outcome metrics, and Certifications (state certification, grade levels).",
    length: "Include the full name AND the acronym for key terms (e.g. PBIS).",
    hardSkills: ["Lesson planning", "Differentiated instruction", "Classroom management (PBIS)", "Phonics / Science of Reading", "Google Classroom / Seesaw", "Formative assessment", "IEP development"],
    softSkills: ["Communication", "Patience", "Adaptability", "Collaboration"],
    atsKeywords: ["Lesson Planning", "Classroom Management", "Differentiated Instruction", "PBIS", "Google Classroom", "Assessment", "Phonics", "IEP"],
    atsNote: "Principals scan for certification status, student-outcome data and differentiated instruction — quantify (growth %, proficiency rates) and replace \"patience/caring\" with evidence (e.g. \"PBIS, zero major referrals in 3 years\").",
  },
  plumber: {
    include:
      "A summary stating your license level and state, a Licenses & Certifications section (with number and expiry), a Skills section (code compliance + materials), and Experience with metrics.",
    length: "15–25 keywords matched to the posting — your actual skills and license level, not keyword stuffing.",
    hardSkills: ["Pipe installation & repair", "UPC/IPC code compliance", "Blueprint / isometric reading", "Soldering / brazing", "Backflow testing", "Leak detection", "Materials (Copper / PVC / PEX)", "Water heater servicing"],
    softSkills: ["Problem solving", "Communication", "Time management", "Customer service"],
    atsKeywords: ["Pipe Installation", "Plumbing Code Compliance", "Blueprint Reading", "Backflow Testing", "Leak Detection", "Journeyman", "UPC/IPC"],
    atsNote: "State your license level + state (\"California Licensed Journeyman Plumber\") with number/expiry; name code compliance (UPC/IPC) and the materials you've mastered (Copper, PVC, PEX) — without them ATS passes you over.",
  },
  welder: {
    include:
      "A summary, a Skills section (processes + materials + qualified positions), a Certifications section with codes (AWS, ASME, Red Seal), and Experience with quality metrics.",
    length: "Match the posting's exact processes and material types.",
    hardSkills: ["MIG (GMAW)", "TIG (GTAW)", "Stick (SMAW)", "FCAW", "Metal fabrication", "Blueprint reading", "Pipe welding", "Plasma cutting", "Qualified positions (6G / 5G)"],
    softSkills: ["Attention to detail", "Safety awareness", "Reliability", "Teamwork"],
    atsKeywords: ["MIG Welding", "TIG Welding", "SMAW", "Metal Fabrication", "Blueprint Reading", "AWS D1.1", "Pipe Welding", "FCAW"],
    atsNote: "Certifications are the highest-priority welding keywords — list all current ones with codes (AWS D1.1, ASME, CWB, Red Seal); match the exact processes (MIG/TIG) and materials (stainless, aluminum) the posting names, with first-pass inspection rates.",
  },
  "machine-operator": {
    include:
      "A summary, a Skills section (machine operation + safety), Experience with reliability and output metrics, Certifications (OSHA, CNC), and Education.",
    length: "Embed role-specific keywords matched to the posting.",
    hardSkills: ["CNC machine operation", "Blueprint reading", "Production workflow", "Preventive maintenance", "Safety compliance (OSHA)", "Lockout/Tagout", "Quality inspection", "Forklift operation"],
    softSkills: ["Attention to detail", "Reliability", "Dexterity", "Communication"],
    atsKeywords: ["Machine Operation", "CNC", "Blueprint Reading", "OSHA", "Lockout/Tagout", "Preventive Maintenance", "Safety Compliance", "Production"],
    atsNote: "Embed role-specific keywords (\"machine operator\", \"CNC\") plus safety terms (OSHA, LOTO, PPE); list OSHA/CNC certifications and quantify reliability and output.",
  },
  // ── Batch 5 (sourced via live SERP 2026: Indeed, enhancv, beamjobs, ResumeWorded, ResumeAdapter) ──
  copywriter: {
    include:
      "A summary, a Skills section (featured in both the skills list and your work history), Experience with results, a prominent portfolio link, and Education.",
    length: "Reverse-chronological — use keywords from the posting.",
    hardSkills: ["Website copywriting", "SEO writing", "Content strategy", "Brand voice", "Email copy", "Social media copy", "Market research", "Editing"],
    softSkills: ["Creativity", "Adaptability", "Communication", "Research"],
    atsKeywords: ["Copywriting", "Content Strategy", "SEO", "Brand Identity", "Website Copy", "Email Marketing", "Market Research"],
    atsNote: "Recruiters check your portfolio for versatility — add the link prominently; feature skills in both the skills section and work history, mirroring the posting's keywords.",
  },
  "seo-specialist": {
    include:
      "A summary that leads with organic-traffic growth and ranking gains, a Technical Skills section (8–10 hard + 6–7 soft), Experience, and Education.",
    length: "Clean single column, standard fonts — add the exact title \"SEO Specialist\".",
    hardSkills: ["Technical SEO", "Keyword research", "On-page optimization", "Link building", "Google Search Console", "GA4", "Ahrefs / SEMrush", "Screaming Frog", "Schema markup", "Core Web Vitals"],
    softSkills: ["Analytical thinking", "Attention to detail", "Communication", "Problem solving"],
    atsKeywords: ["Technical SEO", "Keyword Research", "On-Page Optimization", "Link Building", "Google Search Console", "Core Web Vitals", "Schema Markup", "Organic Traffic"],
    atsNote: "Add the exact title \"SEO Specialist\" to clear screeners; lead with organic-traffic growth % and keyword-ranking improvements; mirror SEO tool names (Ahrefs, SEMrush, GSC) from the posting.",
  },
  "account-manager": {
    include:
      "A professional summary (core strengths + measurable outcomes), a Skills section with the top 8–10 visible, Experience with metrics, Certifications, and Education.",
    length: "Single column with standard fonts.",
    hardSkills: ["Account management", "Client retention", "CRM (Salesforce / HubSpot)", "Upselling", "Relationship building", "Sales", "Customer success", "Negotiation"],
    softSkills: ["Communication", "Problem solving", "Leadership", "Collaboration"],
    atsKeywords: ["Account Management", "Client Retention", "CRM", "Salesforce", "Customer Success", "Upselling", "Relationship Building", "Negotiation"],
    atsNote: "Ensure your top 8–10 skills are clearly visible (ATS prioritizes skills matching); name your CRM (Salesforce/HubSpot) and quantify retention, upsell and revenue.",
  },
  "business-development-manager": {
    include:
      "A tailored summary, Experience with quantified outcomes, a Skills section of 10–15 aligned to the posting, and Certifications.",
    length: "Single column — avoid tables/graphics.",
    hardSkills: ["Business development", "Strategic partnerships", "Lead generation", "Market analysis", "Pipeline management", "Negotiation", "Proposal writing", "Salesforce"],
    softSkills: ["Communication", "Networking", "Stakeholder management", "Strategic thinking"],
    atsKeywords: ["Business Development", "Strategic Partnerships", "Lead Generation", "Pipeline Management", "Revenue Growth", "Market Analysis", "Negotiation", "ARR"],
    atsNote: "The first five (Business Development, Sales, Relationship Building, Negotiation, Market Analysis) are in 80%+ of postings; 95%+ of SaaS/tech firms filter on ATS — missing \"ARR\", \"Strategic Partnerships\" or \"Salesforce\" disqualifies; quantify (e.g. \"qualified 250+ opportunities\").",
  },
  "financial-advisor": {
    include:
      "Licenses & Certifications up front (CFP / CFA / Series 7 / Series 66), a summary, a Skills section near the top (certs + planning + CRM), Experience with AUM/retention metrics, and a compliance statement per role.",
    length: "Hybrid format — strongest credentials at the top, clear work history below.",
    hardSkills: ["Financial planning", "Portfolio management", "Retirement planning", "Wealth management", "Asset allocation", "CRM software", "Series 7 / 66", "CFP"],
    softSkills: ["Communication", "Relationship building", "Analytical thinking", "Integrity"],
    atsKeywords: ["Financial Planning", "Portfolio Management", "Wealth Management", "Retirement Planning", "Series 7", "CFP", "Asset Allocation", "Fiduciary"],
    atsNote: "Lead with licenses/certs (CFP, CFA, Series 7, Series 66 — recruiters screen these first); use standard abbreviations + full name once; quantify AUM growth, client acquisition and retention, and add a compliance statement (e.g. \"zero U4 disclosures\").",
  },
  "loan-officer": {
    include:
      "A summary leading with production numbers, your NMLS number, a Skills section (LOS + product knowledge + compliance), and Experience with close/pull-through rates.",
    length: "Mirror the posting's exact phrasing.",
    hardSkills: ["Mortgage origination", "Underwriting", "NMLS", "Loan Origination Systems (Encompass / Calyx)", "FHA / VA / Conventional", "TRID / RESPA", "Pipeline management", "DU / LP"],
    softSkills: ["Sales & relationship building", "Communication", "Financial analysis", "Attention to detail"],
    atsKeywords: ["Mortgage Origination", "Underwriting", "NMLS", "Encompass", "FHA", "VA", "Pipeline Management", "TRID"],
    atsNote: "List your NMLS number (the first thing a mortgage employer checks); missing \"NMLS\", \"Loan Origination\" or \"Pipeline Management\" disqualifies; lead with production (\"originated $45M annually\") + close/pull-through rates.",
  },
  "insurance-agent": {
    include:
      "A summary, a Licenses section (P&C and L&H by full name + abbreviation), a Skills section (lines of business + CRM/AMS), and Experience with production metrics.",
    length: "Use keywords naturally — ATS flags keyword stuffing.",
    hardSkills: ["Policy sales", "Client relationship management", "Underwriting", "Lines of business (Auto / Home / Life / Commercial)", "CRM/AMS (Applied Epic / EZLynx / Salesforce)", "Retention"],
    softSkills: ["Communication", "Relationship building", "Negotiation", "Attention to detail"],
    atsKeywords: ["Policy Sales", "Client Relationship Management", "Underwriting", "Life Insurance", "Property and Casualty", "Retention", "Applied Epic"],
    atsNote: "List state licenses (P&C, L&H) by full name + abbreviation and each line of business separately (Auto, Home, Life — distinct ATS categories); show written premium, policy count and retention; name your AMS (Applied Epic/EZLynx).",
  },
  barista: {
    include:
      "A summary, a Skills section (espresso + POS + service), Experience with quantified results, and Education, in reverse-chronological order.",
    length: "Emphasize transferable skills (customer service, multitasking).",
    hardSkills: ["Espresso preparation", "Drink customization", "Milk steaming", "POS systems", "Cash handling", "Station cleanliness", "Opening / closing duties"],
    softSkills: ["Customer service", "Teamwork", "Multitasking", "Communication"],
    atsKeywords: ["Customer Service", "Espresso Preparation", "POS Systems", "Cash Handling", "Food Safety", "Barista", "Drink Customization"],
    atsNote: "Large coffee chains screen with ATS — use the posting's keywords; emphasize transferable skills and quantify (satisfaction ratings, sales contribution).",
  },
  "security-guard": {
    include:
      "A summary (situational awareness, de-escalation), a credentials section (guard card / state license — required in all 50 states), a Skills section (surveillance + access control), and Experience with metrics.",
    length: "Mirror the posting's terms for surveillance, access control and patrol.",
    hardSkills: ["Surveillance", "Access control (Lenel / CCURE / Genetec)", "CCTV monitoring", "Incident report writing", "Patrolling", "Emergency response", "CPR / AED"],
    softSkills: ["Situational awareness", "De-escalation", "Communication under pressure", "Attention to detail"],
    atsKeywords: ["Surveillance", "Access Control", "CCTV", "Incident Reporting", "Patrolling", "Physical Security", "De-escalation"],
    atsNote: "Put your guard card / state license (type, issuer, expiry) where a recruiter sees it in seconds; without \"Access Control\", \"Patrolling\" or \"Incident Reporting\" you're filtered instantly.",
  },
  "truck-driver": {
    include:
      "A Licenses & Certifications section (CDL class + endorsements), a summary, a Skills section (compliance + equipment + technology), and Experience with safety metrics.",
    length: "Mirror the posting's exact terms.",
    hardSkills: ["CDL Class A / B", "Endorsements (HazMat / Tanker / Doubles)", "DOT / FMCSA compliance", "Hours of Service", "Pre-trip inspection", "ELD", "Equipment (Flatbed / Reefer)", "GPS / TMS"],
    softSkills: ["Reliability", "Time management", "Communication", "Attention to detail"],
    atsKeywords: ["CDL Class A", "HAZMAT", "DOT Compliance", "Hours of Service", "Pre-Trip Inspection", "ELD", "Tractor-Trailer", "FMCSA"],
    atsNote: "97%+ of carriers filter with ATS — state your CDL class + endorsements and \"DOT Compliance\"/\"Hours of Service\"; quantify on-time delivery and accident-free miles.",
  },
  "medical-assistant": {
    include:
      "A professional profile with the exact title \"Medical Assistant\", a Skills section (clinical + administrative), Certifications (CMA / RMA / CCMA / BLS), EHR systems, HIPAA, and Experience.",
    length: "Simple, clearly-labeled sections.",
    hardSkills: ["Phlebotomy", "Vital signs", "Injections", "EKG", "Appointment scheduling", "Insurance verification", "ICD-10 / CPT coding", "EHR (Epic / Cerner)"],
    softSkills: ["Communication", "Attention to detail", "Empathy", "Teamwork"],
    atsKeywords: ["Medical Assistant", "Vital Signs", "Phlebotomy", "EHR", "Appointment Scheduling", "HIPAA", "EKG", "CMA"],
    atsNote: "Add the exact title \"Medical Assistant\" to pass screeners; list certification (CMA/RMA/CCMA) and EHR (Epic/Cerner); HIPAA-compliance keywords rank high.",
  },
  phlebotomist: {
    include:
      "A 2–3 sentence summary (certification + setting + a standout achievement), a Skills section (collection techniques), Certifications (CPT / PBT, full name + acronym), and compliance (HIPAA / OSHA).",
    length: "25–35 keywords matched to the posting.",
    hardSkills: ["Venipuncture", "Capillary / butterfly collection", "Specimen processing / labeling", "Patient identification", "Blood collection", "Infection control", "Medical terminology"],
    softSkills: ["Attention to detail", "Communication", "Compassion", "Reliability"],
    atsKeywords: ["Venipuncture", "Blood Collection", "Specimen Processing", "Patient Identification", "Infection Control", "Phlebotomy", "CPT", "PBT"],
    atsNote: "Most employers (LabCorp, Quest) require certification — include CPT (NHA) / PBT (ASCP) full name + acronym; show success rates (draw accuracy) and HIPAA/OSHA awareness; pediatric/geriatric/mobile experience is a 2026 premium signal.",
  },
  "occupational-therapist": {
    include:
      "A summary, a Clinical Skills section (settings + populations worked), Education and Licensure (registered OT where required), Certifications (NDT / ATP), and Experience.",
    length: "Mirror the posting's language.",
    hardSkills: ["OT evaluation", "Treatment planning", "ADL / IADL training", "Sensory integration", "Discharge planning", "Care coordination", "EMR", "Telehealth"],
    softSkills: ["Empathy", "Communication", "Team collaboration", "Patience"],
    atsKeywords: ["Occupational Therapy", "ADL Training", "Patient Assessment", "Treatment Planning", "Sensory Integration", "Rehabilitation", "Discharge Planning", "EMR"],
    atsNote: "Mirror posting language (\"ADL retraining\", \"discharge planning\", \"sensory integration\"); include \"registered occupational therapist\" if the job requires it, plus your license and certs (NDT, ATP).",
  },
  "social-worker": {
    include:
      "A summary, credentials/licenses near the top (LCSW / LMSW / MSW), a Skills section (case management + assessment + populations), and Experience with quantified outcomes.",
    length: "Keep to one page (ATS often rejects longer); reverse-chronological.",
    hardSkills: ["Case management", "Crisis intervention", "Psychosocial assessment", "Treatment planning", "Motivational interviewing", "CBT", "Discharge planning", "EHR"],
    softSkills: ["Empathy", "Communication", "Advocacy", "Cultural competence"],
    atsKeywords: ["Case Management", "Crisis Intervention", "Psychosocial Assessment", "LCSW", "MSW", "Treatment Planning", "EHR", "Caseload Management"],
    atsNote: "Place licenses (LCSW, LMSW, MSW) near the top — an unlicensed candidate is filtered before a human reviews; quantify outcomes (caseload size, readmission reductions, PHQ-9 improvements).",
  },
  "pharmacy-technician": {
    include:
      "A 2-3 sentence summary led by your CPhT certification and setting, a Certifications section, a Skills section (pharmacy systems + clinical + safety), and Experience with daily script volume and accuracy.",
    length: "One page, reverse-chronological; spell out abbreviations at least once (e.g. Certified Pharmacy Technician (CPhT)).",
    hardSkills: ["Prescription processing", "Sterile IV compounding (USP 797/800)", "Insurance billing/adjudication", "Inventory management", "Unit-dose packaging", "Controlled substance handling", "HIPAA", "Pharmacy software (Rx30, QS/1, Epic Willow)"],
    softSkills: ["Accuracy", "Patient communication", "Teamwork", "Time management"],
    atsKeywords: ["CPhT", "PTCB Certified", "Sterile Compounding", "USP 797", "Insurance Billing", "Patient Counseling", "HIPAA", "Workflow Optimization"],
    atsNote: "Lead with 'CPhT' and 'Certified' — recruiters routinely filter out resumes missing the word 'certified'; name the specific setting (retail, hospital, specialty, long-term care) and the dispensing system you use.",
  },
  "veterinarian": {
    include:
      "A summary, your DVM and state license + DEA registration near the top, a Skills section (clinical + software + lab), and Experience with quantified clinical volume and practice type.",
    length: "One to two pages; every line should add value.",
    hardSkills: ["Surgery", "Anesthesia", "Diagnostic imaging (radiology/ultrasound)", "Hematology/urinalysis/cytology", "Dentistry", "Preventive care", "Veterinary software (Cornerstone, ImproMed, AVImark)"],
    softSkills: ["Client communication", "Composure under pressure", "Team leadership", "Compassion"],
    atsKeywords: ["DVM", "Licensed Veterinarian", "DEA Registration", "Small Animal", "Emergency Medicine", "Surgery", "Cornerstone", "Fear Free"],
    atsNote: "Lead with DVM, state license, and DEA registration — these are screened first; tailor to practice type (general, emergency, specialty) and add Fear Free / VECCS or board eligibility if held.",
  },
  "optometrist": {
    include:
      "A summary, your OD degree and state license + certifications, a Skills section (clinical + equipment + EMR), and Experience with patient volume and exam types.",
    length: "One to two pages, reverse-chronological; clean ATS-safe layout (no images or non-standard fonts).",
    hardSkills: ["Comprehensive eye exams", "Refraction", "Contact lens fitting", "OCT/visual field testing", "Glaucoma management", "Ophthalmic pharmacology", "EMR software"],
    softSkills: ["Patient communication", "Empathy", "Attention to detail", "Time management"],
    atsKeywords: ["Optometry", "Eye Examination", "Refraction", "Contact Lenses", "Glaucoma", "OCT", "Visual Field Testing", "Patient Care"],
    atsNote: "Include your degree and state license up front, plus terms like refraction, OCT and glaucoma naturally through the summary and skills; quantify patients seen per day/week and add TPA/glaucoma certification where it applies.",
  },
  "dietitian": {
    include:
      "Credentials (RDN/LDN) right after your name, a Licensure & Certifications section, a Skills section (MNT + tools + counseling), and Experience with measurable patient outcomes.",
    length: "One to two pages; list highest degree and ACEND-accredited internship in Education.",
    hardSkills: ["Medical nutrition therapy (MNT)", "Nutrition assessment", "Enteral/parenteral nutrition", "Motivational interviewing", "Food service management", "EMR (Epic)", "Diabetes/renal/oncology nutrition"],
    softSkills: ["Counseling", "Communication", "Empathy", "Education delivery"],
    atsKeywords: ["RDN", "Registered Dietitian", "Medical Nutrition Therapy", "MNT", "Enteral Nutrition", "Motivational Interviewing", "Epic", "Patient Education"],
    atsNote: "Show RDN/LDN and any state license clearly near the top (an unlicensed dietitian is filtered first); use both 'RDN' and 'Registered Dietitian Nutritionist', and quantify outcomes (length-of-stay reductions, class attendance).",
  },
  "quality-engineer": {
    include:
      "A summary naming your methodology focus, a Skills section (quality systems + statistical tools + software), Certifications (ASQ CQE / Six Sigma), and Experience with CAPA closure and defect metrics.",
    length: "One to two pages; list 8-12 prioritized skills mirroring the posting.",
    hardSkills: ["ISO 9001", "Six Sigma (Green/Black Belt)", "FMEA", "PPAP", "SPC", "CAPA", "Root cause analysis", "Minitab", "Auditing"],
    softSkills: ["Problem solving", "Attention to detail", "Cross-functional collaboration", "Communication"],
    atsKeywords: ["ISO 9001", "Six Sigma", "FMEA", "SPC", "CAPA", "Root Cause Analysis", "DMAIC", "Process Improvement"],
    atsNote: "Mirror the posting's quality acronyms exactly (ISO 9001, FMEA, SPC, CAPA) and include both 'Six Sigma' and your belt level; attach CAPA closure rates and defect-reduction numbers to bullets.",
  },
  "industrial-engineer": {
    include:
      "A summary, a Skills section (lean tools + software + analytics), and Experience with quantified efficiency gains; add a projects section for improvement initiatives.",
    length: "One to two pages; list 8-12 skills, prioritizing those in the job description.",
    hardSkills: ["Lean manufacturing", "Six Sigma", "Value stream mapping", "Time studies", "Capacity planning", "Process optimization", "AutoCAD", "SAP", "Data analytics"],
    softSkills: ["Analytical thinking", "Continuous improvement", "Communication", "Project management"],
    atsKeywords: ["Lean Manufacturing", "Six Sigma", "Process Optimization", "Value Stream Mapping", "Continuous Improvement", "Kaizen", "Capacity Planning", "Root Cause Analysis"],
    atsNote: "Use the exact posting terms and include both acronyms and full terms (Lean Manufacturing, Six Sigma); quantify impact ('improved production efficiency by 15% through process optimization') and add simulation/IIoT/analytics for 2026.",
  },
  "chemical-engineer": {
    include:
      "A summary naming your specialization (process design, plant operations, or process safety) and industry, a Skills section (core engineering + simulation software + safety), and Experience with throughput/yield/energy metrics.",
    length: "One to two pages; feature PE/FE licensure prominently for design-authority roles.",
    hardSkills: ["Process design", "Process safety (PSM/HAZOP)", "Aspen Plus/HYSYS", "P&ID/PFD", "Thermodynamics", "Heat & mass transfer", "Scale-up", "GMP/cGMP", "MATLAB"],
    softSkills: ["Problem solving", "Cross-functional collaboration", "Attention to detail", "Communication"],
    atsKeywords: ["Process Design", "Process Safety", "PSM", "HAZOP", "Aspen Plus", "P&ID", "Six Sigma", "OSHA Compliance"],
    atsNote: "Mirror process-simulation and regulatory keywords from the posting (Aspen/HYSYS, HAZOP, PSM, P&ID); attach throughput, yield or energy-saving metrics to bullets and feature PE/FE licensure where design authority is required.",
  },
  "sous-chef": {
    include:
      "A summary, a Skills section (culinary techniques + kitchen management + safety), cuisines you've run, and Experience with quantified impact (covers, food cost, team size).",
    length: "One page; start bullets with strong action verbs.",
    hardSkills: ["Menu development", "Food cost control", "Inventory management", "HACCP/food safety", "Kitchen line management", "Advanced culinary techniques", "Staff training", "Portion control"],
    softSkills: ["Leadership", "Communication", "Teamwork", "Composure under pressure"],
    atsKeywords: ["Menu Development", "Cost Control", "HACCP", "Food Safety", "Inventory Management", "Kitchen Management", "Staff Leadership", "Quality Assurance"],
    atsNote: "Mirror the posting's culinary keywords in the skills and experience sections and cite cuisines that overlap the role; quantify impact (food-cost %, covers per service, team size) and lead with HACCP/food-safety certification.",
  },
  "waiter": {
    include:
      "A 2-3 sentence summary, a Skills section anchored on POS proficiency and certifications, and Experience with quantified service metrics (covers, upsell, satisfaction).",
    length: "One page; the strongest 2026 server resumes list 15-25 skills.",
    hardSkills: ["POS systems (Toast, Aloha, Micros, Square)", "Order accuracy", "Menu & allergen knowledge", "Upselling", "Cash handling", "Table service", "ServSafe/TIPS", "Multitasking"],
    softSkills: ["Customer service", "Communication", "Teamwork", "Composure under pressure"],
    atsKeywords: ["POS Systems", "Customer Service", "Food Safety", "Upselling", "ServSafe", "TIPS", "Cash Handling", "Guest Satisfaction"],
    atsNote: "Name the specific POS systems you've used (Toast, Aloha, Micros, Square) and put ServSafe/TIPS up top; ATS matching is literal, so include both 'POS system' and 'point-of-sale', and quantify upsell rates and guest-satisfaction scores.",
  },
  "bartender": {
    include:
      "A profile summary, a 6-10 item Skills section mixing craft skills and POS/certs, and Experience with quantified metrics (covers per shift, sales).",
    length: "One page unless you have 5+ years with management experience.",
    hardSkills: ["Craft cocktail preparation", "Mixology", "Wine & beer knowledge", "POS systems (Toast, Square, Aloha)", "Cash handling & closing", "Inventory management", "Responsible alcohol service"],
    softSkills: ["Customer service", "Conflict resolution", "Teamwork", "Speed under pressure"],
    atsKeywords: ["Bartending", "Mixology", "POS Systems", "Customer Service", "Cash Handling", "Inventory Management", "Responsible Alcohol Service", "Cocktail Preparation"],
    atsNote: "If a state alcohol permit (or TIPS) is mandatory for the location, place it immediately after the summary so it's visible in the first 6 seconds; use literal job-ad terms and quantify customers served per shift.",
  },
  "housekeeper": {
    include:
      "A short summary, a Skills section (cleaning techniques + safety + equipment), and Experience with bullet points starting on action verbs and metrics (rooms per shift, inspection scores).",
    length: "One page; clean ATS-safe layout — no graphics or unusual fonts.",
    hardSkills: ["Room/deep cleaning", "Safety protocols", "Housekeeping equipment", "Linen & laundry management", "Eco-friendly cleaning", "Inventory of supplies", "Sanitation standards"],
    softSkills: ["Attention to detail", "Time management", "Reliability", "Communication"],
    atsKeywords: ["Housekeeping", "Cleaning", "Sanitation", "Safety Protocols", "Attention to Detail", "Time Management", "Room Attendant", "Guest Satisfaction"],
    atsNote: "Cross-reference the posting and weave its exact terms (sanitation, deep cleaning, safety protocols) into experience and skills; quantify rooms cleaned per shift and any inspection/quality scores.",
  },
  "hotel-manager": {
    include:
      "A summary, a Skills section led by revenue/operations strengths and PMS software, and Experience that always states room count, annual revenue and team size.",
    length: "One to two pages; use standard headings (Professional Summary, Skills, Work Experience, Education).",
    hardSkills: ["Revenue management", "Property management systems (Opera, FOSSE)", "P&L management", "OTA management", "Budgeting", "Front office operations", "Staff training", "Dynamic pricing"],
    softSkills: ["Hospitality leadership", "Guest service", "Staff development", "Problem solving under pressure"],
    atsKeywords: ["Revenue Management", "P&L Management", "Guest Satisfaction", "Opera PMS", "OTA Management", "Staff Training", "Budgeting", "Front Office Operations"],
    atsNote: "Lead with revenue management, P&L and Opera PMS to match hospitality job descriptions; always specify room count, annual revenue and team size so recruiters can gauge your scope.",
  },
  "interior-designer": {
    include:
      "A profile, a Skills section heavy on design software and project typology, a verified portfolio link, and Experience with project management and FF&E scope.",
    length: "One to two pages; double-check the portfolio link — one typo can cost the interview.",
    hardSkills: ["AutoCAD", "SketchUp", "Revit", "3ds Max", "Space planning", "FF&E selection", "Color theory", "Lighting design", "Project management"],
    softSkills: ["Creativity", "Client communication", "Collaboration", "Attention to detail"],
    atsKeywords: ["AutoCAD", "Revit", "SketchUp", "Space Planning", "FF&E", "Color Theory", "Project Management", "Residential/Commercial Design"],
    atsNote: "Design directors first screen by ATS for tool proficiency (AutoCAD, Revit, SketchUp, 3ds Max) and project typology (hospitality, healthcare, commercial, residential) — name yours explicitly, and the resume's job is to pass the filter so the portfolio can close the interview.",
  },
  "journalist": {
    include:
      "A summary, a verified portfolio/clips link, a Skills section (reporting + multimedia + CMS), and Experience with quantified reach or output (stories, audience growth).",
    length: "One to two pages; start each bullet with a strong action verb.",
    hardSkills: ["Reporting & sourcing", "News & feature writing", "Data journalism", "SEO content", "CMS (WordPress)", "Photo/video editing", "Interviewing", "Fact-checking"],
    softSkills: ["Storytelling", "Deadline discipline", "Curiosity", "Communication"],
    atsKeywords: ["Reporting", "News Writing", "Data Journalism", "SEO", "Content Management Systems", "Editing", "Multimedia", "Sourcing"],
    atsNote: "Weave a few keywords from the posting into your summary and show a strong portfolio of published clips; add emerging skills (podcast production, AI content curation, data journalism) to appeal to digital newsrooms.",
  },
  "radiologic-technologist": {
    include:
      "A summary opening with your ARRT registration and modalities, a Certifications & Licensure section, a Skills section (modalities + PACS/RIS + safety), and Experience with quantified imaging volume.",
    length: "One to two pages, reverse-chronological; clean single-column ATS-safe layout.",
    hardSkills: ["Radiographic positioning", "Fluoroscopy / C-arm", "CT scanning", "Contrast media administration", "PACS / RIS", "Radiation dose optimization (ALARA)", "Portable imaging", "QA"],
    softSkills: ["Patient communication", "Composure", "Attention to detail", "Team collaboration"],
    atsKeywords: ["ARRT", "RT(R)", "Diagnostic Imaging", "X-Ray", "CT Scan", "PACS", "Radiation Safety", "Radiographic Positioning"],
    atsNote: "Lead with your ARRT registration (credential number + expiry) and primary modalities — it's the first thing imaging recruiters search; name the equipment you've run (GE, Siemens, Philips, Canon) and use 'RT(R)' plus 'radiologic technologist'.",
  },
  "respiratory-therapist": {
    include:
      "Your CRT/RRT credential next to your name, a Licensure & Certifications section (RRT, BLS, ACLS, PALS), a Skills section (ventilation + diagnostics + therapies), and Experience with clinical settings.",
    length: "One to two pages; list degree, certificate and state license in Education/Licensure.",
    hardSkills: ["Mechanical ventilation", "Airway management", "ABG analysis", "Pulmonary function tests", "Aerosol medication", "CPAP/BiPAP therapy", "Cardiopulmonary therapies"],
    softSkills: ["Clinical judgment", "Communication", "Composure under pressure", "Teamwork"],
    atsKeywords: ["RRT", "Mechanical Ventilation", "ABG Analysis", "Airway Management", "BiPAP", "Pulmonary Function", "BLS", "ACLS"],
    atsNote: "Put RRT (the nationally recognized gold standard) and state licensure next to your name; include exact job-ad terms like 'ABG analysis' and 'nebulizer therapy', and list BLS/ACLS/PALS.",
  },
  "surgical-technologist": {
    include:
      "A summary, a Certifications section (CST + BLS), a Skills section (sterile technique + instrumentation + OR setup), and Experience with procedures assisted and specialties.",
    length: "One page, reverse-chronological; well-structured for ATS scanning.",
    hardSkills: ["Sterile technique", "Surgical instrumentation", "Operating room setup", "Instrument sterilization", "Infection control", "Specimen handling", "EHR management"],
    softSkills: ["Attention to detail", "Team collaboration", "Composure", "Adaptability"],
    atsKeywords: ["CST", "Sterile Technique", "Surgical Instrumentation", "Operating Room", "Infection Control", "BLS", "Surgical Procedures", "Aseptic Technique"],
    atsNote: "Lead with CST and BLS (hospitals filter on certification first); use industry-standard terms (sterile technique, surgical instrumentation, OR setup) and quantify procedures assisted and specialties covered.",
  },
  "lab-technician": {
    include:
      "A summary, certifications (e.g. MLT(ASCP)) listed prominently, a Skills section (departments + instruments + LIS), and Experience with quantified testing volume and turnaround.",
    length: "One to two pages; clean single-column layout — no tables or multi-column.",
    hardSkills: ["Clinical chemistry", "Hematology", "Microbiology", "Blood banking", "Pipetting", "PCR", "Quality control", "LIMS / LIS"],
    softSkills: ["Accuracy", "Attention to detail", "Time management", "Communication"],
    atsKeywords: ["MLT(ASCP)", "Clinical Chemistry", "Hematology", "Microbiology", "PCR", "LIMS", "Quality Control", "CLIA"],
    atsNote: "List the full certification name (MLT(ASCP)) at the top, name specific analyzer brands and your LIS by name, and use regulatory keywords (CLIA, CAP, GLP); quantify testing volume, accuracy and turnaround times.",
  },
  "clinical-research-associate": {
    include:
      "A summary, a Skills section led by GCP and monitoring systems, a Regulatory section, and Experience with trial phases, therapeutic areas and sites monitored.",
    length: "One to two pages; detail is everything — show you understand the regulatory environment.",
    hardSkills: ["Good Clinical Practice (ICH-GCP)", "Clinical site monitoring", "CTMS", "EDC (Medidata Rave, REDCap)", "Protocol adherence", "Regulatory submissions", "Risk-based monitoring", "Query resolution"],
    softSkills: ["Attention to detail", "Communication", "Organization", "Stakeholder management"],
    atsKeywords: ["GCP", "Clinical Monitoring", "CTMS", "EDC", "Protocol Adherence", "IRB Submission", "Clinical Trials", "Data Integrity"],
    atsNote: "Include exact compliance keywords (GCP, IRB Submission, Protocol Adherence) — missing them reads as a compliance risk; name EDC/CTMS platforms (Medidata Rave, REDCap) and your therapeutic areas.",
  },
  "maintenance-technician": {
    include:
      "A summary, a Skills section grouped by category (electrical/mechanical/controls + tools + software), certifications, and Experience with uptime and downtime metrics.",
    length: "One to two pages; list 10-15 skills grouped by category.",
    hardSkills: ["Preventive maintenance", "PLC (Siemens, Allen Bradley)", "Hydraulics & pneumatics", "Electrical troubleshooting", "VFD troubleshooting", "HVAC systems", "CMMS", "Welding"],
    softSkills: ["Problem solving", "Communication", "Teamwork", "Reliability"],
    atsKeywords: ["Preventive Maintenance", "PLC", "Troubleshooting", "Hydraulic Systems", "CMMS", "Electrical Troubleshooting", "Pneumatics", "VFD"],
    atsNote: "Manufacturing employers specifically want to see PLC programming (name Siemens / Allen Bradley) and hydraulic-systems experience; quantify uptime gains, reduced downtime hours and on-time PM completion.",
  },
  "hvac-technician": {
    include:
      "A summary, your EPA 608 level near the top, a Certifications section (NATE, OSHA), a Skills section (systems + diagnostics + brands), and Experience with quantified callbacks/efficiency.",
    length: "One to two pages; clean ATS-friendly format — avoid tables and graphics.",
    hardSkills: ["HVAC installation & repair", "Refrigerant recovery", "Load calculations", "Split systems / RTU", "Heat pumps & mini-splits", "Electrical troubleshooting", "Ductwork design", "Building automation (BAS)"],
    softSkills: ["Diagnostics", "Customer service", "Reliability", "Communication"],
    atsKeywords: ["EPA 608 Universal", "Refrigerant Recovery", "Troubleshooting", "RTU", "Split Systems", "Load Calculations", "Heat Pump", "NATE"],
    atsNote: "Place your EPA Section 608 level (Type I/II/III/Universal — Universal preferred) and NATE near the top; include brand experience (Carrier, Trane, Lennox, York, Rheem) and use 25-30 keywords matching the posting.",
  },
  "carpenter": {
    include:
      "A tailored summary, detailed work experience with quantified outcomes, a Skills section aligned to the posting, and certifications (OSHA 10/30).",
    length: "One page if under 10 years; reverse-chronological, simple ATS-safe layout (no tables/columns/images).",
    hardSkills: ["Framing (rough carpentry)", "Finish carpentry", "Blueprint reading", "Layout & measuring", "Cabinetry", "Site safety", "Power & hand tools", "Estimating"],
    softSkills: ["Precision", "Reliability", "Teamwork", "Problem solving"],
    atsKeywords: ["Framing", "Finish Carpentry", "Blueprint Reading", "OSHA 10/30", "Layout", "Site Safety", "Rough Carpentry", "Commercial/Residential"],
    atsNote: "Match keywords from the posting (framing, finish carpentry, blueprint reading, OSHA 10/30, residential vs commercial); save as a simple .docx/PDF with standard headings and quantify projects completed.",
  },
  "logistics-coordinator": {
    include:
      "A summary, a Skills section grouped under Supply Chain / Logistics Operations / Transportation, and Experience weaving keywords into quantified results (on-time delivery, cost).",
    length: "One to two pages; mirror the posting's exact systems and terms.",
    hardSkills: ["Freight coordination", "Inventory management", "Order fulfillment", "Transportation management (TMS)", "Warehouse operations (WMS)", "Route planning", "Carrier selection", "SAP / Oracle SCM"],
    softSkills: ["Organization", "Communication", "Problem solving", "Vendor management"],
    atsKeywords: ["Supply Chain", "Freight Coordination", "Inventory Management", "TMS", "WMS", "Order Fulfillment", "SAP", "On-Time Delivery"],
    atsNote: "Name the systems you've run by brand (SAP, Oracle SCM, Manhattan WMS, Blue Yonder, TMS) and weave them into experience bullets, not just a keyword list; quantify on-time-delivery and cost improvements.",
  },
  "data-engineer": {
    include:
      "A summary (one line scope, one stack, one business value), a Skills section of 10-15 prioritized tools, and Experience using Action + System + Keyword + Result bullets.",
    length: "One to two pages; specify databases by name, not generic 'database management'.",
    hardSkills: ["Apache Spark", "Python", "SQL", "ETL/ELT", "Apache Kafka", "AWS", "Airflow", "Data warehousing (Snowflake/BigQuery)", "Docker"],
    softSkills: ["Problem solving", "Collaboration", "Communication", "Ownership"],
    atsKeywords: ["Apache Spark", "ETL", "Python", "SQL", "Kafka", "AWS", "Data Pipelines", "Data Warehousing"],
    atsNote: "Use specific tool names to clear ATS (name MySQL/MongoDB, Spark, Kafka — not just 'database'); a keyword proven in an Experience bullet outranks the same word in a bare Skills list. Start bullets with built/structured/streamlined.",
  },
  "machine-learning-engineer": {
    include:
      "A summary foregrounding deployment outcomes, a Skills section of 20-30 keywords matching the posting, and Experience showing production ownership (serving, monitoring, scaling).",
    length: "One to two pages; lead with production/MLOps, not just 'analysis'.",
    hardSkills: ["Python", "PyTorch", "MLOps", "Model deployment / serving", "Kubernetes & Docker", "LLMs / RAG", "MLflow", "Drift detection & monitoring"],
    softSkills: ["Problem solving", "Collaboration", "Communication", "Ownership"],
    atsKeywords: ["PyTorch", "MLOps", "Model Deployment", "Kubernetes", "LLMs", "RAG", "Latency Optimization", "Model Serving"],
    atsNote: "PyTorch is the single most important 2026 framework keyword; without MLOps, Kubernetes, Latency Optimization or Model Serving, ATS files you as a 'Data Scientist' not an 'ML Engineer' — foreground deployment and monitoring.",
  },
  "cloud-architect": {
    include:
      "A summary led by quantified platform achievements, a Skills section (platforms + IaC + security), a Certifications section with renewal dates, and Experience with cost/uptime metrics.",
    length: "One to two pages; mirror both platform-specific terms and broad concepts from the posting.",
    hardSkills: ["AWS", "Azure", "Google Cloud", "Terraform / CloudFormation", "Kubernetes", "Cloud security (IAM, CSPM)", "Ansible", "Cloud migration"],
    softSkills: ["Architecture judgment", "Cross-team collaboration", "Communication", "Cost optimization"],
    atsKeywords: ["AWS", "Azure", "Terraform", "Kubernetes", "Cloud Security Architecture", "IAM", "Infrastructure as Code", "Cloud Migration"],
    atsNote: "Lead with quantified achievements across named platforms (AWS/Azure/GCP) and list certs (AWS Solutions Architect, Azure, GCP Professional Cloud Architect) with renewal dates; include both platform terms ('Azure Policy') and broad concepts ('governance guardrails').",
  },
  "database-administrator": {
    include:
      "A title containing the DBA keyword (ATS scans it first), a Skills section grouped by engine, and Experience with tuning, backup and migration outcomes.",
    length: "One to two pages; hard-skill-heavy mix with a few job-critical soft skills.",
    hardSkills: ["SQL", "Microsoft SQL Server", "Oracle Database", "PL/SQL", "Performance tuning", "Backup & recovery (RMAN)", "Database migration", "Cloud databases (RDS/Aurora, Azure SQL)"],
    softSkills: ["Problem solving", "Attention to detail", "Communication", "On-call reliability"],
    atsKeywords: ["Database Administration", "SQL", "Oracle Database", "PL/SQL", "Performance Tuning", "RMAN", "Backup and Recovery", "Database Migration"],
    atsNote: "Put the DBA/engine keyword in your title (ATS scans the title first); group skills by engine (Oracle 19c, SQL Server, MySQL) and include 'performance tuning', 'backup procedures' and 'database migration' / 'cloud databases'.",
  },
  "network-administrator": {
    include:
      "A summary, a Certifications section (CCNA, Network+), a Skills section (technologies + hardware + tools), and Experience with measurable reliability gains.",
    length: "One to two pages; clear headings (Skills, Experience, Certifications) for ATS parsing.",
    hardSkills: ["TCP/IP, DNS, DHCP, VPN", "Routing & switching", "Firewall configuration", "VLANs", "Network troubleshooting", "Monitoring (SolarWinds, Wireshark)", "Scripting (Python, PowerShell)", "LAN/WAN"],
    softSkills: ["Problem solving", "Communication", "Reliability", "Documentation"],
    atsKeywords: ["CCNA", "TCP/IP", "Routing and Switching", "Firewall Configuration", "VLAN", "Network Troubleshooting", "VPN", "LAN/WAN"],
    atsNote: "List CCNA / CompTIA Network+ in a clear Certifications section and use Cisco-specific terms ('Cisco router configuration', 'switch configuration'); quantify impact like 'reduced network downtime by 40%'.",
  },
  "actuary": {
    include:
      "Sections in order: contact, summary, actuarial exams passed (with dates), experience, education, technical skills, certifications. Show exams and designations in the summary.",
    length: "One to two pages; clean single-column layout — insurers parse resumes into structured fields.",
    hardSkills: ["Actuarial modeling", "Loss reserving", "Pricing analysis", "Predictive modeling", "SQL", "R", "Python", "Actuarial software (Prophet, GGY AXIS)"],
    softSkills: ["Analytical judgment", "Communication", "Attention to detail", "Problem solving"],
    atsKeywords: ["Actuarial Modeling", "Loss Reserving", "Pricing Analysis", "ASA", "Exam P", "Exam FM", "Predictive Modeling", "SQL"],
    atsNote: "List the exams you've passed by full name at least once ('Exam P: Probability', 'Exam FM: Financial Mathematics') with dates, plus designations (ASA, CERA); use a single-column layout so the ATS parses your exam record.",
  },
  "statistician": {
    include:
      "A summary, a Skills section near the top (languages + methods + visualization), and Experience bullets that name the method and tool you actually used.",
    length: "One to two pages; simple single-column layout, no graphics or tables.",
    hardSkills: ["R", "Python", "SAS", "SQL", "Regression analysis", "Hypothesis testing", "Experimental design", "Bayesian methods", "Data visualization"],
    softSkills: ["Analytical thinking", "Communication", "Attention to detail", "Collaboration"],
    atsKeywords: ["Statistics", "R", "SAS", "Regression Analysis", "Hypothesis Testing", "Experimental Design", "Bayesian", "Predictive Modeling"],
    atsNote: "Use the exact wording from job ads (R, SAS, regression analysis, A/B testing, time series, Bayesian) in the summary, skills and the bullets where you used them; for clinical-trial roles include CDISC and SAS specifically.",
  },
  "tax-accountant": {
    include:
      "A summary showcasing tax software and your CPA, a Skills section (compliance + software + reporting), and Experience with quantified compliance/savings outcomes.",
    length: "One to two pages; standard headings, 10-12pt Arial/Calibri for clean ATS parsing.",
    hardSkills: ["Tax preparation", "GAAP", "Tax software (ProSystem fx, Lacerte, UltraTax)", "Financial reporting", "General ledger", "Bank reconciliation", "Month-end close", "Regulatory compliance"],
    softSkills: ["Attention to detail", "Confidentiality", "Integrity", "Deadline management"],
    atsKeywords: ["GAAP", "Tax Preparation", "CPA", "Financial Reporting", "General Ledger", "Bank Reconciliation", "Month-End Close", "Regulatory Compliance"],
    atsNote: "Surface your CPA and tax-prep software (ProSystem fx, Lacerte, UltraTax) in the summary; GAAP, General Ledger, AP/AR and Bank Reconciliation appear in 90%+ of accounting postings — use the exact terms, not synonyms.",
  },
  "auditor": {
    include:
      "Credentials (CPA/CIA/CISA) in or just below the contact block, a Skills section (audit + standards + software), and Experience leading with findings and control improvements.",
    length: "One to two pages; 10-12pt standard fonts. ATS parses top-to-bottom — put credentials in the first 20%.",
    hardSkills: ["Audit planning & risk assessment", "SOX compliance testing", "Internal controls (COSO)", "PCAOB/IIA standards", "Audit software (TeamMate, AuditBoard)", "Data analytics (ACL, IDEA)", "Financial controls"],
    softSkills: ["Professional skepticism", "Report writing", "Stakeholder management", "Ethical judgment"],
    atsKeywords: ["Internal Audit", "SOX Compliance", "Risk Assessment", "CPA", "CIA", "COSO", "Audit Planning", "Internal Controls"],
    atsNote: "Put CPA/CIA/CISA in or immediately below the contact block (a credential buried at the bottom gets less ATS weight); lead experience with major findings and quantify by risk-reduction % or financial impact.",
  },
  "credit-analyst": {
    include:
      "A summary, a hard-skill-heavy Skills section (analysis + models + tools), and Experience with portfolio scope and underwriting outcomes.",
    length: "One to two pages; 6-10 highly relevant skills, mostly hard skills; 10-12pt standard fonts.",
    hardSkills: ["Financial statement analysis & spreading", "Credit risk modeling", "Cash flow analysis", "Ratio analysis (DSCR, leverage, liquidity)", "Loan structuring & covenants", "Excel financial modeling", "Moody's Analytics / S&P Capital IQ"],
    softSkills: ["Analytical judgment", "Risk communication", "Credit-memo writing", "Independent decision making"],
    atsKeywords: ["Financial Statement Analysis", "Credit Risk", "Credit Scoring", "Risk Assessment", "Cash Flow Analysis", "Loan Structuring", "Excel", "Underwriting"],
    atsNote: "Mirror the posting's exact terms (financial statement analysis, credit risk modeling, risk rating) and name your tools (Moody's Analytics, S&P Capital IQ); reference OCC/FDIC standards where relevant and quantify improved underwriting decisions.",
  },
  "investment-banker": {
    include:
      "A summary, a dedicated technical Skills section, and a 'Selected Transactions' / Deal Sheet showing M&A, IPO and debt deals with the keywords those deals carry.",
    length: "One page (IB convention); a clean, dense layout. Never list Microsoft Office.",
    hardSkills: ["Financial modeling", "DCF valuation", "LBO analysis", "Comparable company analysis (Comps)", "Precedent transactions", "M&A execution", "Due diligence", "Bloomberg / Capital IQ / FactSet"],
    softSkills: ["Attention to detail", "Stamina under deadline", "Communication", "Discretion"],
    atsKeywords: ["Financial Modeling", "DCF", "LBO", "Valuation", "Mergers & Acquisitions", "Comparable Company Analysis", "Capital Markets", "Due Diligence"],
    atsNote: "ATS does exact-string matching — if the posting says 'leveraged buyout analysis' use that, not 'LBO' alone; include a Deal Sheet, name modeling tools (Bloomberg, Capital IQ, FactSet, VBA) and never list Word/Excel/PowerPoint.",
  },
  "forklift-operator": {
    include:
      "A summary, certifications with the standard number and validity, a Skills section (equipment + safety + WMS), and Experience with throughput and safety metrics.",
    length: "One page; simple ATS-safe layout, keywords woven through summary/experience/skills.",
    hardSkills: ["Forklift operation (sit-down, reach, cherry picker)", "OSHA safety compliance", "Pallet jack", "RF scanner", "Warehouse management systems (WMS)", "Load handling", "Shipping/receiving", "Inventory management"],
    softSkills: ["Safety awareness", "Reliability", "Team collaboration", "Time management"],
    atsKeywords: ["Forklift Operator", "OSHA Certified", "Warehouse", "Pallet Jack", "WMS", "RF Scanner", "Material Handling", "Safety Compliance"],
    atsNote: "Include the certification name + OSHA standard number + validity period for keyword coverage, and match the exact forklift types and WMS named in the posting; quantify pallets per shift and days without incident.",
  },
  "delivery-driver": {
    include:
      "A summary, skills grouped (driving + customer service + technical), licenses (CDL/clean MVR/DOT card), and Experience with on-time and volume metrics.",
    length: "One page; a summary beats an objective for experienced drivers.",
    hardSkills: ["Route optimization", "GPS navigation", "Defensive driving", "Vehicle inspection", "Package handling", "DOT compliance", "Delivery apps", "Inventory management"],
    softSkills: ["Customer service", "Reliability", "Time management", "Communication"],
    atsKeywords: ["Delivery Driver", "Route Management", "CDL", "DOT Compliance", "GPS Navigation", "Customer Service", "Package Handling", "Vehicle Inspection"],
    atsNote: "Show a clean driving record (MVR), valid license/CDL and DOT physical card up front, and use the posting's exact terms (route management, last-mile, DOT compliance); quantify on-time-delivery % and packages handled per shift.",
  },
  "dispatcher": {
    include:
      "A summary, a Skills section (planning + dispatch software + regulations), and Experience tying each skill to a measurable result (fuel savings, on-time rate).",
    length: "One to two pages; connect every skill to a concrete action and metric.",
    hardSkills: ["Route planning & optimization", "Load planning", "Dispatch software (TMW Suite, NextLoad)", "GPS/fleet tracking", "TMS platforms & load boards", "Freight scheduling", "Driver communication", "DOT regulations"],
    softSkills: ["Communication", "Multitasking", "Problem solving", "Composure under pressure"],
    atsKeywords: ["Dispatch Software", "Route Optimization", "Load Planning", "Driver Communication", "Fleet Management", "Freight Scheduling", "TMS", "On-Time Delivery"],
    atsNote: "Name your dispatch/TMS software by brand (TMW Suite, NextLoad, FleetComplete) and use the posting's exact terms (load planning, route optimization, driver communication); quantify wins like improved on-time-delivery rate or fuel/cost savings.",
  },
  "translator": {
    include:
      "A summary, language pairs listed directionally, a Skills section (interpretation + CAT tools + domains), certifications, and Experience with quantified volume/accuracy.",
    length: "One to two pages; 10-15 skills categorized by language, CAT tools and soft skills.",
    hardSkills: ["Document translation & localization", "Simultaneous & consecutive interpretation", "CAT tools (SDL Trados, MemoQ)", "Translation memory management", "Legal/medical terminology", "Proofreading & QA", "Glossary management"],
    softSkills: ["Linguistic precision", "Cultural sensitivity", "Active listening", "Concentration"],
    atsKeywords: ["Translation", "Localization", "CAT Tools", "SDL Trados", "MemoQ", "Interpretation", "Translation Memory", "Proofreading"],
    atsNote: "List language pairs in the working direction ('Spanish > English') — ATS and recruiters search directional pairs, not just languages; name CAT tools (Trados, MemoQ) tied to projects and quantify word volume, accuracy and turnaround.",
  },
  "editor": {
    include:
      "A summary, a Skills section (editing + style guides + tools), style-guide expertise, and Experience showing brand-voice and editorial-quality outcomes.",
    length: "One to two pages; clearly labeled standard sections for ATS parsing.",
    hardSkills: ["Copy editing", "Proofreading", "AP & Chicago style", "Fact-checking", "Adobe InDesign", "CMS", "SEO", "Headline writing"],
    softSkills: ["Attention to detail", "Brand-voice judgment", "Collaboration", "Prioritization"],
    atsKeywords: ["Copy Editing", "Proofreading", "AP Style", "Chicago Style", "Fact-Checking", "Content Management Systems", "SEO", "Editing"],
    atsNote: "Name the style guides you work in (AP, Chicago) and tools (InDesign, CMS, SEO) explicitly — if the posting lists 'content management systems' or 'AI editing tools', those exact phrases need to appear in your experience or skills.",
  },
  "technical-writer": {
    include:
      "A summary, a Skills section (documentation types + authoring tools + docs-as-code), a portfolio/samples link, and Experience with quantified docs scope.",
    length: "One to two pages; tailor the skills section to the exact role (API docs vs user guides).",
    hardSkills: ["Technical documentation", "API documentation", "Docs-as-code (Markdown, Git)", "Authoring tools (MadCap Flare, FrameMaker, Oxygen XML)", "DITA / structured authoring", "Single-sourcing", "Information architecture", "Style guides"],
    softSkills: ["Audience analysis", "Clarity", "Collaboration", "Attention to detail"],
    atsKeywords: ["Technical Writing", "API Documentation", "Docs-as-Code", "Markdown", "DITA", "MadCap Flare", "User Guides", "Information Architecture"],
    atsNote: "ATS and hiring managers specifically look for developer-documentation authoring, Markdown/MDX fluency and docs-as-code in Git — name your authoring tools (MadCap Flare, FrameMaker, Oxygen XML) and add CPTC or the Google Technical Writing certificate for an edge.",
  },
  "animator": {
    include:
      "A 3-4 sentence profile (specialization + key accomplishment), a portfolio/demo-reel link in the header, a Skills section (10-15 tools), and Experience with strong verbs.",
    length: "One page (studios review hundreds); PDF/DOCX, clean fonts, no columns or graphics.",
    hardSkills: ["Character animation", "Maya", "Blender", "After Effects", "Rigging", "Keyframe animation", "Motion graphics", "Storyboarding", "Lip sync", "Toon Boom Harmony"],
    softSkills: ["Creativity", "Collaboration", "Storytelling", "Time management"],
    atsKeywords: ["Character Animation", "Maya", "After Effects", "Blender", "Rigging", "Motion Graphics", "Storyboarding", "Keyframe Animation"],
    atsNote: "Put a demo-reel/portfolio link (Vimeo, Behance, ArtStation) in the header — keep the reel 60-90s, best work first; start bullets with Animated/Produced/Created (never 'Worked on'), and mirror the posting's software list.",
  },
  "video-editor": {
    include:
      "A summary, a Skills section (5-10 editing skills + software), a portfolio/reel link, and Experience with 2-3 tools per bullet and measurable impact.",
    length: "One to two pages; simple labeled sections, no images or non-standard fonts.",
    hardSkills: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "Color grading", "Motion graphics", "Audio sync & mixing", "Transitions & VFX", "Storytelling"],
    softSkills: ["Creativity", "Attention to detail", "Collaboration", "Deadline discipline"],
    atsKeywords: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "Color Grading", "Video Editing", "Motion Graphics", "Final Cut Pro", "Post-Production"],
    atsNote: "Name your editing software (Premiere Pro, After Effects, DaVinci Resolve) and put 2-3 tools/techniques in each experience bullet so the ATS catches them; include a reel link and quantify views, turnaround or output volume.",
  },
  "cashier": {
    include:
      "A short summary, a Skills section (register + inventory + compliance hard skills plus customer-facing soft skills), and Experience with quantified accuracy/volume.",
    length: "One page; clean ATS-safe layout, skills list under the summary.",
    hardSkills: ["Cash handling", "POS system operation", "Returns processing", "Loss prevention", "ID verification", "Basic math", "Inventory management", "Coupon redemption"],
    softSkills: ["Customer service", "Accuracy", "Reliability", "Communication"],
    atsKeywords: ["Cash Handling", "Point-of-Sale", "Customer Service", "Register Operations", "Loss Prevention", "Returns Processing", "Transaction Accuracy", "POS"],
    atsNote: "Use both 'point-of-sale' and 'POS' (ATS matching is literal) and name the register/POS system if the posting does; quantify cash handled, customers per shift and your accuracy rate.",
  },
  "retail-sales-associate": {
    include:
      "A targeted 2-4 line summary (retail niche + years + a standout strength), a Skills section matching the posting, and Experience with quantified sales results.",
    length: "One page; clean formatting, keywords tailored to each role.",
    hardSkills: ["Point-of-sale systems", "Visual merchandising", "Inventory management", "Upselling & cross-selling", "Product knowledge", "Stock replenishment", "Loss prevention", "Mobile checkout"],
    softSkills: ["Customer service", "Communication", "Persuasion", "Teamwork"],
    atsKeywords: ["Retail Sales", "Customer Service", "Point of Sale", "Visual Merchandising", "Inventory Management", "Upselling", "Product Knowledge", "Sales Goals"],
    atsNote: "Name specific POS systems (NCR, Toshiba) since retailers list them in postings, and put your sales numbers on the page — percentage increase in sales or loyalty-member sign-ups; mirror the posting's exact terms.",
  },
  "cleaner": {
    include:
      "A summary emphasizing role-specific skills (e.g. eco-friendly practices), a Skills section, and Experience with measurable achievements; a combination format works well.",
    length: "One to two pages; run it through an ATS checker for keyword/format gaps.",
    hardSkills: ["Floor care (mopping, vacuuming, sweeping)", "Sanitation & disinfection", "Cleaning chemical knowledge", "Material safety data sheets (MSDS)", "Heavy equipment operation", "Dusting", "Inventory of supplies", "Waste disposal"],
    softSkills: ["Attention to detail", "Reliability", "Independence", "Time management"],
    atsKeywords: ["Cleaning Experience", "Janitor", "Sanitation", "Mopping", "Vacuuming", "Disinfection", "Safety Compliance", "Customer Service"],
    atsNote: "Lead with the top employer keywords (Cleaning Experience, Janitor, Mopping, Sanitation) and reference MSDS/chemical knowledge; quantify square footage covered and any inspection scores.",
  },
  "cook": {
    include:
      "A summary that names stations + a measurable achievement + certification, a Skills section grouped by technique, and Experience using standard headings.",
    length: "One page, single-column; standard headings ('Professional Experience', not 'Kitchen Journey').",
    hardSkills: ["Station setup & mise en place", "Knife skills", "Grill / sauté / fry / roast methods", "Food safety & sanitation (ServSafe)", "Recipe execution", "Portion control", "Kitchen equipment operation"],
    softSkills: ["Speed & efficiency", "Teamwork", "Attention to detail", "Physical stamina"],
    atsKeywords: ["Line Cooking", "Knife Skills", "Food Safety", "ServSafe", "Mise en Place", "Station Management", "Portion Control", "Sanitation"],
    atsNote: "Use standard section headings (ATS rejects 'Culinary Adventures') and weave the posting's exact phrases ('scratch cooking', 'banquet experience', a cuisine) naturally; list ServSafe and quantify covers per service.",
  },
  "caregiver": {
    include:
      "A profile highlighting hands-on care + populations served, a Certifications section (CPR/First Aid/CNA), a Skills section (clinical + soft), and Experience with outcomes.",
    length: "One to two pages; simple labeled sections for ATS parsing.",
    hardSkills: ["Personal care & hygiene assistance", "Medication management", "Vital signs monitoring", "Mobility & transfer assistance", "Meal preparation", "Dementia care", "Infection control", "EHR documentation"],
    softSkills: ["Empathy", "Patience", "Communication", "Adaptability"],
    atsKeywords: ["Personal Care", "Medication Management", "Dementia Care", "Patient Care", "Mobility Assistance", "Vital Signs", "CPR Certified", "Care Coordination"],
    atsNote: "Name the populations and specialized care you've handled (dementia, special-needs) and list CPR/First Aid/CNA up front (they raise pay $2-5/hr); quantify clients cared for, satisfaction ratings and incident reductions.",
  },
  "home-health-aide": {
    include:
      "A profile, an Education & Certifications section led by HHA/CHHA, a Skills section (teachable clinical tasks + soft skills), and Experience with patient-outcome metrics.",
    length: "One to two pages; simple, clearly labeled sections; action verbs.",
    hardSkills: ["Activities of daily living (ADL) support", "Vital signs (blood pressure)", "Wound dressing changes", "Hoyer lift operation", "Medication reminders", "Meal preparation", "Mobility assistance", "Light housekeeping"],
    softSkills: ["Compassion", "Patience", "Communication", "Reliability"],
    atsKeywords: ["Home Health Aide", "HHA", "CNA", "CPR Certified", "Patient Care", "Activities of Daily Living", "Vital Signs", "Mobility Assistance"],
    atsNote: "List your HHA/CHHA license (or CNA/CPR) prominently — it's the first screen; use exact teachable-task keywords (Hoyer lift, blood pressure, dressing changes) and quantify patients cared for and condition improvements.",
  },
  "nursing-assistant": {
    include:
      "A summary led by your credential, an Education section (ATS reads it first), a Skills section (clinical + interpersonal), and Experience with action verbs and metrics.",
    length: "One to two pages; standard section titles, no tables or images.",
    hardSkills: ["Activities of daily living (ADL) care", "Vital signs", "Hoyer lift", "Infection control", "Patient hygiene & bathing", "Mobility & transfers", "EHR charting", "Phlebotomy basics"],
    softSkills: ["Compassion", "Active listening", "Teamwork", "Stress management"],
    atsKeywords: ["Certified Nursing Assistant", "CNA", "Patient Care", "HIPAA Compliant", "Infection Control", "Vital Signs", "Activities of Daily Living", "CPR Certification"],
    atsNote: "Write 'Certified Nursing Assistant' in full on at least one line (not only 'CNA') and include NNAAP score + supervised clinical hours; use explicit keywords ('HIPAA Compliant', 'Hoyer Lift Experienced', 'Infection Control').",
  },
  "massage-therapist": {
    include:
      "A 2-4 sentence summary led by your LMT license + modalities + settings, a Licenses & Certifications section, a Skills/modalities list, and Experience with action verbs.",
    length: "One to two pages; standard headings, no tables/columns/graphics.",
    hardSkills: ["Swedish massage", "Deep tissue", "Neuromuscular therapy", "Myofascial release", "Hot stone", "Lymphatic drainage", "Prenatal massage", "SOAP documentation"],
    softSkills: ["Client communication", "Empathy", "Physical stamina", "Professionalism"],
    atsKeywords: ["LMT", "Licensed Massage Therapist", "Deep Tissue", "Swedish Massage", "Myofascial Release", "Hot Stone", "Lymphatic Drainage", "Client Retention"],
    atsNote: "List your state LMT license with number plus every modality you're trained in — spa/clinic ATS filter for specific technique keywords ('hot stone', 'lymphatic drainage'); lead the summary with session volume and client-retention rate.",
  },
  "hairdresser": {
    include:
      "A summary, a Licenses section (cosmetology + specialty certs), a Skills section (cutting/coloring/styling), and a list of signature services with client feedback.",
    length: "One page; match the posting's exact service terms.",
    hardSkills: ["Hair cutting", "Hair coloring (balayage, highlights)", "Hair styling", "Extensions", "Bridal styling", "Chemical treatments", "Hair straightening", "Client consultations"],
    softSkills: ["Customer service", "Communication", "Creativity", "Anticipating client needs"],
    atsKeywords: ["Hairstylist", "Cosmetology", "Hair Cutting", "Hair Coloring", "Balayage", "Hair Extensions", "Customer Service", "Salon"],
    atsNote: "Lead with 'Hairstylist' and 'Cosmetology' (the highest-frequency keywords) plus your license; detail signature services (balayage, extensions, bridal) and match the posting's exact terms ('hairstyling', 'facial treatments').",
  },
  "makeup-artist": {
    include:
      "A hybrid format leading with a focused Skills section, then reverse-chronological experience, plus a portfolio link of 8-12 labeled looks.",
    length: "One to two pages; strongest technical skills near the top for ATS + recruiters.",
    hardSkills: ["Airbrush makeup", "Color theory & matching", "Bridal makeup", "Special effects (SFX)", "Theatrical/film & TV makeup", "Contouring & highlighting", "Corrective makeup", "Sanitation practices"],
    softSkills: ["Client consultation", "Communication", "Collaboration", "Adaptability"],
    atsKeywords: ["Makeup Artist", "Airbrush Makeup", "Color Theory", "Bridal Makeup", "Special Effects Makeup", "Sanitation", "Client Consultation", "Photo Shoot Makeup"],
    atsNote: "Lead with technical skills (airbrush, color theory, sanitation) so ATS registers them, and pair the resume with a portfolio of 8-12 labeled looks across skin tones; quantify bookings per month, repeat clients and named publication features.",
  },
  "dental-hygienist": {
    include:
      "A summary led by your RDH credential + years, an Education section (ATS reads it first to confirm state standards), and a Skills section keyed to the posting.",
    length: "One to two pages; simple labeled sections, action verbs, no images.",
    hardSkills: ["Ultrasonic & hand scaling", "Digital radiography", "Air polishing", "Intraoral photography", "Periodontal charting", "Local anesthesia administration", "Sterilization", "Dental practice-management software"],
    softSkills: ["Patient communication", "Empathy", "Detail orientation", "Team collaboration"],
    atsKeywords: ["RDH", "Dental Hygiene", "Digital Radiography", "Ultrasonic Scaling", "Periodontal Charting", "Local Anesthesia", "Sterilization", "Patient Education"],
    atsNote: "Lead with RDH licensure (plus DANB, local-anesthesia and nitrous-oxide certs where applicable) and write skills exactly as the posting lists them; education is parsed first, so keep it clear, and quantify patients seen per day.",
  },
  "veterinary-technician": {
    include:
      "A summary led by your RVT/LVT/CVT credential + VTNE, a Skills section (clinical procedures), and Experience quantifying caseload and species.",
    length: "One to two pages; plain bullet lists, left-aligned, no tables/columns/graphics.",
    hardSkills: ["Anesthesia monitoring", "Venipuncture / phlebotomy", "IV catheter placement", "Radiography", "Dental prophylaxis", "Lab diagnostics", "Surgical assisting", "Patient handling"],
    softSkills: ["Compassion", "Composure", "Communication", "Teamwork"],
    atsKeywords: ["CVT", "RVT", "VTNE", "Anesthesia Monitoring", "Venipuncture", "Radiography", "Dental Prophylaxis", "IV Catheter Placement"],
    atsNote: "Lead with your RVT/LVT/CVT credential and VTNE, and use exact job-post keywords ('anesthesia monitoring', 'dental prophylaxis') naturally — don't keyword-stuff, ATS flags it; quantify surgeries assisted and anesthesia cases per week.",
  },
  "bank-teller": {
    include:
      "A summary, a Skills section (cash operations + named platforms + compliance), Education/certifications, and a short achievements section (challenge-action-result).",
    length: "One to two pages; name specific platforms rather than 'banking software'.",
    hardSkills: ["Cash handling & drawer balancing", "Teller platforms (Fiserv, Jack Henry, FIS)", "Check processing & verification", "Currency transaction reporting", "Counterfeit detection", "Account opening", "Wire transfers", "Cross-selling"],
    softSkills: ["Attention to detail", "Customer service", "Integrity", "Time management"],
    atsKeywords: ["Cash Handling", "Drawer Balancing", "Customer Transactions", "Financial Services", "Fraud Detection", "Account Management", "Fiserv", "Regulatory Compliance"],
    atsNote: "Name your teller platform (Fiserv, Jack Henry, FIS, nCino) rather than generic 'banking software' to lift your ATS match; include 'cash handling', 'fraud detection' and 'currency transaction reporting', and quantify drawer accuracy and cross-sells.",
  },
  "claims-adjuster": {
    include:
      "A clear summary using core claims keywords, a Skills section (investigation + software + insurance terms), a Licensing section, and quantified Experience.",
    length: "One to two pages; single-column, no graphics/tables — 97% of insurers use ATS.",
    hardSkills: ["Claims investigation", "Damage assessment", "Policy interpretation", "Xactimate", "Subrogation", "Liability assessment", "Fraud detection", "Negotiation & settlement"],
    softSkills: ["Analytical judgment", "Communication", "Negotiation", "Attention to detail"],
    atsKeywords: ["Claims Investigation", "Damage Assessment", "Policy Interpretation", "Xactimate", "Subrogation", "Liability Assessment", "Property & Casualty", "Fraud Detection"],
    atsNote: "Missing exact terms like 'Liability Assessment', 'Subrogation' or 'Guidewire'/'Xactimate' can auto-disqualify you; include your state adjuster license and certifications (AIC, CPCU) and quantify claims handled and cycle-time/cost outcomes.",
  },
  "underwriter": {
    include:
      "A summary, a Skills section grouped (underwriting + risk + product lines), a Certifications section (CPCU, AU), and Experience showing loss-ratio and retention outcomes.",
    length: "One to two pages; group skills into categories for readability.",
    hardSkills: ["Risk assessment", "Policy analysis", "Loss ratio analysis", "Catastrophe modeling", "Reinsurance", "Premium determination", "Regulatory compliance", "Property & casualty / life product knowledge"],
    softSkills: ["Analytical judgment", "Negotiation", "Attention to detail", "Decision making"],
    atsKeywords: ["Underwriting", "Risk Assessment", "Loss Ratio Analysis", "Policy Administration", "Regulatory Compliance", "Claims Management", "CPCU", "Customer Retention"],
    atsNote: "97% of insurers use ATS — missing 'Underwriting', 'Loss Ratio Analysis' or 'Risk Assessment' can auto-disqualify you; name your line of business (auto/home/P&C/life), list CPCU or AU, and quantify loss-ratio and retention outcomes.",
  },
  "esthetician": {
    include:
      "A summary, a Licenses & Certifications section, a Skills section leading with technical treatments + tools, and Experience with quantified retail/rebooking results.",
    length: "One to two pages; mirror the posting's exact treatment terms.",
    hardSkills: ["Facials & skin analysis", "Chemical peels", "Microdermabrasion", "Waxing", "Microneedling", "Light therapy", "Sanitation protocols", "Skincare product knowledge"],
    softSkills: ["Client communication", "Empathetic listening", "Attention to detail", "Retail sales"],
    atsKeywords: ["Esthetician", "Skincare", "Chemical Peels", "Microdermabrasion", "Waxing", "Skin Analysis", "Sanitation", "Product Knowledge"],
    atsNote: "Name your license (Licensed Esthetician, Certified Laser Technician) and use the posting's exact treatment words (microdermabrasion, chemical peels, waxing); quantify rebooking rate and retail product sales.",
  },
  "barber": {
    include:
      "Contact, a three-line summary, a Licenses & Certifications section in the top third (barber license, Barbicide, BBP), Experience with named shops + numbers, and a Skills section.",
    length: "One page, single-column; save as PDF named with your full name + role.",
    hardSkills: ["Fades & tapers", "Straight-razor shaves", "Beard trimming & lineups", "Precision haircutting", "Hair styling", "Color techniques", "POS / Booksy", "Retail product sales"],
    softSkills: ["Client consultation", "Customer service", "Creativity", "Reliability"],
    atsKeywords: ["Barber", "Fades", "Straight-Razor Shave", "Beard Trimming", "Precision Haircutting", "Cosmetology", "Client Consultation", "Customer Service"],
    atsNote: "Put your state barber license + Barbicide/OSHA BBP in the top third, and lead every experience bullet with a verb and a number (cuts per shift, rebook %, Booksy stars, retail $); weave in 'precision haircutting' and 'client consultation'.",
  },
  "medical-receptionist": {
    include:
      "A summary, a Skills section (front-desk + EHR systems + compliance), and Experience weaving keywords into quantified workload (patients checked in, calls handled).",
    length: "One to two pages; clean labeled sections, tailored to the posting.",
    hardSkills: ["Appointment scheduling", "Electronic health records (Epic, Cerner, Athenahealth)", "Patient registration", "Medical billing & coding basics", "Insurance verification", "Medical terminology", "HIPAA compliance", "Data entry"],
    softSkills: ["Multitasking", "Calm under pressure", "Communication", "Customer service"],
    atsKeywords: ["Medical Receptionist", "EHR", "Appointment Scheduling", "Patient Registration", "Medical Terminology", "HIPAA Compliance", "Insurance Verification", "Medical Records"],
    atsNote: "Name the EHR/EMR you've used (Epic, Cerner, Athenahealth) and use the posting's exact terms ('patient scheduling', 'medical records management'); quantify patient volume, call load and scheduling accuracy.",
  },
  "optician": {
    include:
      "A Professional Summary led by ABO status, a Skills section (dispensing + measurement + software), a Certifications section, and Experience with sales and accuracy metrics.",
    length: "One to two pages; standard headings, concise bullet points, ATS-safe layout.",
    hardSkills: ["Prescription interpretation", "Frame & lens fitting", "PD measurement", "Visual acuity testing", "Optical equipment operation", "Optical software (Eyefinity, VisionWeb)", "Insurance (EyeMed, VSP)", "Frame adjustment"],
    softSkills: ["Customer service", "Attention to detail", "Communication", "Time management"],
    atsKeywords: ["Optician", "ABO", "NCLE", "Dispensing", "Frame Fitting", "Lens Fitting", "PD Measurement", "Contact Lenses"],
    atsNote: "Lead with ABO (and NCLE) certification and include exact dispensing keywords (frame fitting, lens fitting, PD measurement) plus the vision-plan/software names (EyeMed, VSP, Eyefinity); quantify dispensing accuracy and sales.",
  },
  "audiologist": {
    include:
      "A 2-3 sentence summary, an Education & Credentials section (Au.D., ASHA, state license — ATS filters on these), and a Skills section grouped by diagnostics/amplification/software.",
    length: "One to two pages; standard headings, Calibri/Arial 10-12pt, no multi-column.",
    hardSkills: ["Audiometric testing", "Hearing aid fitting", "Real ear measurement", "Cerumen management", "Tinnitus management", "Fitting platforms (NOAH, Phonak Target, Inspire)", "Vestibular assessment", "EHR"],
    softSkills: ["Patient communication", "Empathy", "Critical thinking", "Analytical thinking"],
    atsKeywords: ["Audiologist", "Au.D.", "ASHA", "Audiometric Testing", "Hearing Aid Fitting", "Real Ear Measurement", "NOAH", "Diagnostics"],
    atsNote: "List Au.D., ASHA certification and state license by exact abbreviation (employers filter on them), and name fitting platforms/tests (NOAH, Phonak Target, real ear measurement) — mirror the posting's exact phrasing.",
  },
  "midwife": {
    include:
      "A summary establishing your clinical identity, a Certifications/Education section (CNM or Licensed Midwife), a Skills section (clinical + education), and Experience with caseload metrics.",
    length: "One to two pages; no tables/graphics; action verbs (managed, provided, coordinated).",
    hardSkills: ["Labor & delivery support", "Prenatal & postpartum care", "Maternal care", "Newborn assessment", "VBAC support", "Patient/prenatal education", "Evidence-based practice", "Obstetric assessment"],
    softSkills: ["Empathy", "Active listening", "Composure under pressure", "Teamwork"],
    atsKeywords: ["Certified Nurse-Midwife", "CNM", "Labor and Delivery", "Maternal Care", "Prenatal Care", "VBAC", "Patient Education", "Evidence-Based Practice"],
    atsNote: "Include your exact credential ('Certified Nurse-Midwife (CNM)' or 'Licensed Midwife') and the posting's keywords ('labor and delivery', 'maternal care', 'VBAC', 'evidence-based practice'); quantify births attended and caseload.",
  },
  "paramedic": {
    include:
      "A 3-4 sentence summary quantifying your impact, a Certifications section using exact abbreviations, and a Skills section (clinical + soft) with measurable Experience.",
    length: "One to two pages; EMS portals parse credential abbreviations exactly.",
    hardSkills: ["Advanced life support (ALS)", "Patient assessment", "Airway management", "IV/IO access", "Cardiac monitoring & 12-lead", "Medication administration", "Trauma care", "MCI triage"],
    softSkills: ["Crisis management", "Composure under pressure", "Teamwork", "Communication"],
    atsKeywords: ["NREMT-P", "Paramedic", "ACLS", "PALS", "CPR/BLS", "Patient Assessment", "Airway Management", "ALS"],
    atsNote: "Write credentials exactly as agencies parse them — 'NREMT-P' not 'National Registry Paramedic' — and list ACLS/PALS/ITLS/PHTLS; mirror the posting and attach measurable results (response times, calls per shift) to every bullet.",
  },
  "clinical-psychologist": {
    include:
      "A 3-4 sentence summary with the exact job title, a Licensure section, a Skills section (assessments + therapeutic approaches + software), and quantified Experience.",
    length: "One to two pages; include the exact title 'Clinical Psychologist' to clear screeners.",
    hardSkills: ["Psychological assessment", "Psychotherapy", "Cognitive behavioral therapy (CBT)", "DBT / ACT", "Suicide risk assessment", "Treatment planning", "Evidence-based interventions", "EHR / SPSS"],
    softSkills: ["Empathy", "Active listening", "Clinical judgment", "Interdisciplinary collaboration"],
    atsKeywords: ["Clinical Psychology", "Psychological Assessment", "Cognitive Behavioral Therapy", "Psychotherapy", "Treatment Planning", "Evidence-Based Interventions", "Licensed Clinical Psychologist", "HIPAA"],
    atsNote: "Use the full phrase 'cognitive behavioral therapy' (not just CBT) and put the exact title 'Clinical Psychologist' and 'Licensed Clinical Psychologist' on the page; name modalities and assessments that match the posting and quantify caseload.",
  },
  "therapist": {
    include:
      "Licensure on a plain line under your name (exact state title), a summary stating who/how/outcomes you treat, a Skills section naming every modality, and quantified Experience.",
    length: "One to two pages; ATS relies on literal matches — repeat the posting's phrasing verbatim.",
    hardSkills: ["CBT", "DBT", "EMDR", "Motivational interviewing (MI)", "ACT", "Trauma-informed care", "Treatment planning", "Risk assessment & safety planning"],
    softSkills: ["Empathy", "Active listening", "Rapport building", "Cultural competence"],
    atsKeywords: ["Licensed Professional Counselor", "LPC", "LMHC", "CBT", "DBT", "EMDR", "Trauma-Informed Care", "Treatment Planning"],
    atsNote: "Lead with the exact state license the requisition names (LPC, LMHC, LCMHC, LPCC) + state + license number under your name; name every evidence-based modality (CBT, DBT, EMDR) and specify populations/diagnoses, quantifying caseload ('28 weekly sessions').",
  },
  "firefighter": {
    include:
      "A tailored summary, a Skills section (10-15, grouped technical + soft), a Certifications section, and Experience with quantified outcomes.",
    length: "One to two pages; Arial/Calibri 10-12pt, mirror the posting's keywords.",
    hardSkills: ["Fire suppression", "Search & rescue", "SCBA & PPE operation", "HazMat response", "EMS (EMT/Paramedic)", "Apparatus operation", "Ventilation", "Vehicle extrication (Jaws of Life)"],
    softSkills: ["Courage", "Physical fitness", "Teamwork", "Quick decision making"],
    atsKeywords: ["Fire Suppression", "Search and Rescue", "HazMat", "EMT", "Firefighter I & II", "SCBA", "Incident Command", "NFPA"],
    atsNote: "List Firefighter I & II, EMT, HazMat Operations and NFPA certifications (missing ones get you filtered) and mirror the posting's keywords; group 10-15 skills by category and quantify response outcomes.",
  },
  "police-officer": {
    include:
      "A summary, a Skills section (operations + investigation + systems), a Certifications section (POST, CIT), and Experience with quantified, accomplishment-driven bullets.",
    length: "One to two pages; clean ATS-safe layout, no images.",
    hardSkills: ["Patrol operations", "Criminal investigation", "Community policing", "De-escalation & crisis intervention", "Report writing & legal documentation", "Evidence collection", "Traffic enforcement", "CAD / RMS systems"],
    softSkills: ["Integrity", "Decision making under pressure", "Communication", "Active listening"],
    atsKeywords: ["Law Enforcement", "Patrol", "Criminal Investigation", "Community Policing", "De-escalation", "Report Writing", "POST Certified", "Crisis Intervention"],
    atsNote: "Include POST certification, CIT training and SFST/FTO/SWAT credentials by name — missing them filters you out — and use exact terms (community policing, de-escalation, evidence collection); name CAD/RMS systems and quantify outcomes.",
  },
  "customer-success-manager": {
    include:
      "A tailored summary, a Skills section (CX strategy + platforms + retention), a Certifications section, and Experience with quantified churn/renewal outcomes.",
    length: "One to two pages; clean layout, no images; mirror the posting's exact terms.",
    hardSkills: ["Customer onboarding", "Churn analysis & reduction", "Renewal & expansion management", "CX strategy", "Salesforce", "Gainsight / Totango", "Account health scoring", "Product adoption"],
    softSkills: ["Relationship building", "Communication", "Conflict resolution", "Cross-functional leadership"],
    atsKeywords: ["Customer Success", "Churn Reduction", "Customer Retention", "Onboarding", "SaaS", "Salesforce", "Gainsight", "Renewals"],
    atsNote: "If the posting says 'churn analysis' or 'customer onboarding', put those exact terms in your skills; name CS platforms (Salesforce, Gainsight, Totango) and quantify churn reduction %, renewal/expansion $ and adoption gains.",
  },
  "sales-engineer": {
    include:
      "A summary on cross-functional sales collaboration, a Skills section (10-15 technical + tools), certifications, and pre-sales Experience bullets that name deal context + tool + outcome.",
    length: "One to two pages; keep summary and skills consistent so ATS matches both.",
    hardSkills: ["Solution architecture", "Product demonstrations", "Requirements gathering", "Technical documentation", "Pre-sales engineering", "SQL / Python", "Cloud (AWS, Kubernetes, Docker)", "SaaS solutions"],
    softSkills: ["Presentation", "Client communication", "Discovery", "Collaboration"],
    atsKeywords: ["Sales Engineering", "Pre-Sales", "Solution Architecture", "Product Demonstrations", "Requirements Gathering", "SaaS", "Technical Documentation", "Cloud Computing"],
    atsNote: "Reflect the same technical skills in both summary and skills section for ATS consistency; make each pre-sales bullet pull triple duty (deal context + tool/method + outcome) and mirror posting phrases like 'present technical information clearly'.",
  },
  "site-reliability-engineer": {
    include:
      "A title like 'Site Reliability Engineer (SRE)', a summary, a Skills section clustered (observability + IaC + orchestration + reliability), and Experience telling 'I did X with Y, achieving Z'.",
    length: "One to two pages; put keywords in titles, summary, skills and the first bullet of each role.",
    hardSkills: ["Observability & monitoring (Prometheus, Grafana, DataDog)", "Reliability metrics (SLI/SLO/SLA, error budgets)", "Kubernetes", "Terraform / Ansible", "Incident management & post-mortems", "On-call & chaos engineering", "CI/CD (Jenkins, ArgoCD)", "Go / Python"],
    softSkills: ["Incident leadership", "Cross-functional coordination", "Mentoring", "Communication"],
    atsKeywords: ["Site Reliability Engineer", "SRE", "Observability", "SLO", "Kubernetes", "Terraform", "Incident Management", "Error Budgets"],
    atsNote: "Missing SRE-specific terms ('Observability', 'SLOs', 'Chaos Engineering') gets you rejected before a human looks; aim for 15-25 keywords at 60-80% coverage and quantify SLO attainment, MTTR and on-call outcomes.",
  },
  "penetration-tester": {
    include:
      "A tailored summary, a Certifications section (OSCP, CEH, Security+), a Skills section (tools + languages), a Methodologies section (OWASP, NIST, PTES), and quantified Experience.",
    length: "One to two pages; standard section titles (Work Experience, Skills, Education).",
    hardSkills: ["Vulnerability assessment", "Web/network/mobile pen testing", "Metasploit", "Burp Suite", "Nmap / Wireshark", "Python scripting", "OWASP Top 10", "Exploit development"],
    softSkills: ["Analytical thinking", "Report writing", "Communication", "Cross-team collaboration"],
    atsKeywords: ["Penetration Testing", "OSCP", "CEH", "Burp Suite", "Metasploit", "OWASP", "Vulnerability Assessment", "Ethical Hacking"],
    atsNote: "Showcase OSCP/CEH/Security+ and name your tools (Metasploit, Burp Suite, Nmap) and frameworks (OWASP, NIST, PTES); quantify vulnerabilities found and incident reductions, and state the environments tested (cloud/on-prem/hybrid).",
  },
  "firmware-engineer": {
    include:
      "A results-driven summary, a Skills section listing languages clearly (e.g. 'C/C++', 'embedded Linux'), and Experience quantifying performance gains.",
    length: "One page if under 10 years; list programming languages explicitly for ATS.",
    hardSkills: ["Embedded C / C++", "RTOS", "Microcontrollers (ARM Cortex-M)", "Device drivers", "SPI / I2C / UART / CAN", "Hardware debugging (JTAG/SWD)", "Firmware optimization", "Git"],
    softSkills: ["Problem solving", "Attention to detail", "Hardware-software collaboration", "Communication"],
    atsKeywords: ["Firmware", "Embedded C", "Embedded Systems", "RTOS", "Microcontrollers", "Device Drivers", "I2C", "Debugging"],
    atsNote: "List languages exactly as ATS searches them ('C/C++', 'embedded Linux') plus Embedded C, RTOS, microcontrollers and bus protocols; quantify gains ('improved device startup time by 25%', 'reduced latency 30%').",
  },
  "android-developer": {
    include:
      "A summary leading with Kotlin/Java + a measurable app outcome, a Skills section (8-12), and Experience with action verbs and metrics (crash rate, load time).",
    length: "One to two pages; single-column, standard headings.",
    hardSkills: ["Kotlin", "Jetpack Compose", "Android SDK", "MVVM / Clean Architecture", "Coroutines & Flow", "Retrofit / Room", "Firebase", "CI/CD & testing (JUnit/Espresso)"],
    softSkills: ["Problem solving", "Collaboration", "Communication", "Ownership"],
    atsKeywords: ["Kotlin", "Jetpack Compose", "Android SDK", "MVVM", "Coroutines", "Firebase", "Android Studio", "REST APIs"],
    atsNote: "Lead with Kotlin/Java and notable app launches; mirror exact posting terms (if it says 'Dependency Injection' include both that and 'Hilt') and quantify reduced crash rates or faster load times.",
  },
  "ios-developer": {
    include:
      "A keyword-rich summary, a hard-skill-heavy Skills section plus targeted collaboration skills, and Experience with quantified impact and domain (fintech/health).",
    length: "One to two pages; single-column, standard headings.",
    hardSkills: ["Swift", "SwiftUI", "UIKit", "Xcode", "Core Data", "Combine", "REST APIs", "App Store Connect / TestFlight"],
    softSkills: ["Problem solving", "Collaboration", "Communication", "Ownership"],
    atsKeywords: ["Swift", "SwiftUI", "UIKit", "Xcode", "Core Data", "Combine", "MVVM", "App Store"],
    atsNote: "Keep the summary keyword-rich (Swift, SwiftUI, UIKit, Xcode) and include Core Data, Combine and REST APIs to clear screening; quantify impact ('increased sales by 25%') and highlight domain experience (fintech, healthcare).",
  },
  "qa-automation-engineer": {
    include:
      "A summary, a Skills section categorized (language + frameworks + automation tools + CI/CD), and Experience with quantified coverage/defect impact.",
    length: "One page under 5 years, two max for senior; single-column, no tables.",
    hardSkills: ["Selenium WebDriver", "Cypress / Playwright", "Java / Python / JavaScript", "API testing (Postman, RestAssured)", "CI/CD (Jenkins, GitHub Actions)", "Cucumber / JUnit", "Git", "Performance testing"],
    softSkills: ["Attention to detail", "Analytical thinking", "Collaboration", "Communication"],
    atsKeywords: ["Test Automation", "Selenium WebDriver", "Cypress", "CI/CD", "API Testing", "Python", "Java", "Performance Testing"],
    atsNote: "Use exact keyword matches ('Selenium WebDriver', not just 'Selenium') and categorize skills (Programming / Frameworks / Automation Tools / CI/CD); quantify defect-escape reduction, coverage and run-time savings.",
  },
  "platform-engineer": {
    include:
      "A summary with product-thinking, a Skills section clustered (Cloud + Kubernetes + IaC + Observability + Security), certifications, and Experience leading each role with scope of ownership.",
    length: "One to two pages; pattern-match the posting's top 2-3 tools verbatim.",
    hardSkills: ["Kubernetes", "Terraform", "CI/CD & GitOps (ArgoCD)", "Cloud platforms (AWS/Azure/GCP)", "Go / Python", "Developer portals (Backstage)", "Observability", "FinOps"],
    softSkills: ["Product thinking", "Developer empathy", "Collaboration", "Communication"],
    atsKeywords: ["Platform Engineering", "Kubernetes", "Terraform", "CI/CD", "Infrastructure as Code", "GitOps", "Developer Experience", "Observability"],
    atsNote: "Speak the language of scalable platforms (Kubernetes, Terraform, GitOps, platform-as-a-product) and add CKA / AWS / Terraform Associate; quantify everything — workloads migrated, SLO attainment, deploy frequency, FinOps savings, developer adoption.",
  },
  "it-manager": {
    include:
      "A summary, keywords embedded in outcome bullets (not a 40-tool list), a Certifications section, and Experience using Problem-Solution-Result.",
    length: "One to two pages; 15-25 keywords at 60-80% coverage, woven in naturally.",
    hardSkills: ["IT infrastructure", "Team & vendor management", "Budget management", "ITIL / service delivery", "Project management", "Security compliance", "Disaster recovery", "Cloud platforms (AWS, Azure)"],
    softSkills: ["Leadership", "Stakeholder engagement", "Change management", "Communication"],
    atsKeywords: ["IT Infrastructure", "Team Management", "ITIL", "Budget Management", "Vendor Management", "Service Delivery", "Active Directory", "Disaster Recovery"],
    atsNote: "Embed keywords in outcome bullets — ATS now penalizes a bare 40-tool 'Skills' list; include the named systems (Active Directory, Windows Server, ServiceNow) plus ITIL 4 / Azure Administrator certs and quantify budget/SLA impact.",
  },
  "it-director": {
    include:
      "A Professional Summary (experience level + specialty), a Skills section matching the posting, Work Experience in Problem-Solution-Result with bottom-line metrics, and Credentials.",
    length: "One to two pages; 25-35 keywords; embed them in bullets, not a 40-tool list.",
    hardSkills: ["IT strategy", "Digital transformation", "Budget & P&L management", "Vendor management", "IT governance", "Solution architecture", "IT service management", "Security & infrastructure"],
    softSkills: ["Executive leadership", "Strategic thinking", "Stakeholder management", "Communication"],
    atsKeywords: ["IT Strategy", "Digital Transformation", "Team Leadership", "Budget Management", "Vendor Management", "IT Governance", "ServiceNow", "Infrastructure"],
    atsNote: "97% of firms use ATS — missing 'Active Directory', 'Network Troubleshooting' or 'ServiceNow' disqualifies you; embed 25-35 keywords in outcome bullets (ATS penalizes bare tool lists) and tie achievements to the company's bottom line.",
  },
  "help-desk-technician": {
    include:
      "A summary, a Skills section (ticketing + OS/AD + remote tools), a Certifications section (CompTIA A+, ITIL), and Experience with resolution-rate metrics.",
    length: "One to two pages; 15-25 keywords woven into skills, summary and bullets.",
    hardSkills: ["Technical support / troubleshooting", "Ticketing systems (ServiceNow, Zendesk, Jira)", "Active Directory", "Windows / macOS support", "Remote desktop tools", "Networking basics", "Hardware/peripheral support", "IT asset management"],
    softSkills: ["Active listening", "Empathy", "Patience", "Communication"],
    atsKeywords: ["Technical Support", "Help Desk", "Active Directory", "ServiceNow", "Troubleshooting", "Ticketing Systems", "CompTIA A+", "Remote Support"],
    atsNote: "Name your ticketing system (ServiceNow, Zendesk, Jira Service Desk) and certs (CompTIA A+, ITIL Foundation); quantify impact like 'increased ticket resolution rate by 25% through improved documentation'.",
  },
  "cloud-engineer": {
    include:
      "A reverse-chronological summary, skills grouped into clusters (Cloud / Kubernetes / IaC / Observability / Security / FinOps), and roles led with scope of ownership.",
    length: "One to two pages; pattern-match the posting's top 2-3 tools verbatim.",
    hardSkills: ["AWS (EC2, EKS, Lambda, IAM)", "Terraform / CloudFormation", "Docker & Kubernetes", "Ansible / Jenkins", "Azure / GCP", "CloudWatch & observability", "FinOps", "Networking (VPC, Transit Gateway)"],
    softSkills: ["Problem solving", "Collaboration", "Ownership", "Cost awareness"],
    atsKeywords: ["AWS", "Terraform", "Kubernetes", "Docker", "CloudFormation", "DevOps", "Infrastructure as Code", "CloudWatch"],
    atsNote: "Lead each role with scope of ownership (AWS accounts managed, regions/environments, team coordination) and group skills into clusters; add HashiCorp Terraform Associate / FinOps Practitioner and match the posting's top tools verbatim.",
  },
  "blockchain-developer": {
    include:
      "A summary highlighting smart-contract expertise, a robust Skills section, and Experience detailing specific dApp/smart-contract projects with security and gas metrics.",
    length: "One to two pages; full-stack knowledge is a plus — show cross-functional delivery.",
    hardSkills: ["Solidity", "Smart contract development", "EVM / Hardhat / Foundry", "Ethers.js / Web3.js", "Gas optimization", "Security best practices / audits", "Solana / Rust", "Cryptography & consensus"],
    softSkills: ["Problem solving", "Security mindset", "Collaboration", "Communication"],
    atsKeywords: ["Solidity", "Smart Contracts", "Ethereum", "Hardhat", "EVM", "Gas Optimization", "dApp Development", "Web3"],
    atsNote: "ATS filters for Solidity, EVM, Hardhat/Foundry and an L2 you shipped to; include 'smart contract development', 'blockchain protocols' and quantify impact ('reduced gas costs 15% across 5 contracts', 'audited contracts securing $X').",
  },
  "ux-researcher": {
    include:
      "A summary, a Skills section categorized (research methods + tools + synthesis), and Experience with specific studies and measurable outcomes.",
    length: "One to two pages; simple ATS-safe formatting, mirror the posting's exact phrasing.",
    hardSkills: ["Usability testing", "User interviews", "Surveys & card sorting", "Contextual inquiry / diary studies", "A/B testing", "Research tools (Dovetail, Maze, UserTesting)", "Thematic analysis & affinity mapping", "Journey mapping / personas"],
    softSkills: ["Empathy", "Storytelling", "Cross-functional collaboration", "Communication"],
    atsKeywords: ["UX Research", "Usability Testing", "User Interviews", "Surveys", "Card Sorting", "A/B Testing", "Journey Mapping", "Qualitative Research"],
    atsNote: "Mirror the posting's exact phrasing (use 'cross-functional collaboration' verbatim, not 'teamwork') and name your methods and tools (Dovetail, Maze, UserTesting); quantify outcomes ('15+ interviews → 30% increase in retention').",
  },
  "ai-engineer": {
    include:
      "A summary led by production metrics, a Skills section (LLM + frameworks + MLOps), and Experience proving you shipped models serving real users at scale.",
    length: "One to two pages; production metrics > model metrics > framework fluency > credentials.",
    hardSkills: ["LLMs & fine-tuning", "RAG pipelines", "Vector databases", "LangChain / LlamaIndex", "PyTorch / Hugging Face", "MLOps (CI/CD for ML, drift detection)", "Kubernetes & model serving", "REST APIs"],
    softSkills: ["Problem solving", "Product thinking", "Collaboration", "Communication"],
    atsKeywords: ["LLMs", "RAG", "LangChain", "Vector Database", "MLOps", "PyTorch", "Model Deployment", "Hugging Face"],
    atsNote: "Mirror exact phrasing — if the job says 'LangChain', write 'LangChain' (not 'LLM orchestration framework'); lead with production metrics (latency, throughput, cost) and include the MLOps layer (monitoring, CI/CD for ML, drift detection) that seniors are screened for.",
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

// ── CV-destination countries: EVERY country we serve (family standing rule) ──
// AlmiWorld rule: every product covers every country, FROM and TO — same as the
// test-prep products' 191 sourced/localized origins. The grid country set is the
// full COUNTRIES_SERVED (193), NOT a curated subset. The real-data-or-noindex
// gate now lives entirely on the ROLE side: a role×country cell is self-canonical
// + indexed once the ROLE has sourced CV content (genuine ATS/skills/length
// substance) — and 171 of the 193 also carry a sourced localized "applying from"
// block (currency/cities/agencies/credential body). Un-sourced roles stay noindex.
// (Earlier this was capped at 39 curated countries — that silently shrank AlmiCV
// below the family rule; corrected to the full 193 on 2026-06-20.)
export const CV_GRID_COUNTRIES: readonly string[] = COUNTRIES_SERVED.map((c) => c.slug);

const SERVED_SET = new Set(CV_GRID_COUNTRIES);
export function isServedCvCountry(slug: string): boolean {
  return SERVED_SET.has(slug);
}

/** Grid gate: a role×country page is self-canonical + indexable where the role
 *  has sourced CV content AND the country is one we serve (all 193). The country
 *  side never blocks a real country — the role content is the substance gate. */
export function isRoleCountryIndexable(roleSlug: string, countrySlug: string): boolean {
  return hasRoleCvContent(roleSlug) && isServedCvCountry(countrySlug);
}
