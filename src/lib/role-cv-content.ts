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
  "brand-manager": {
    include:
      "A summary, a Skills section (strategy + research + campaigns + tools), and Experience anchored to revenue, brand-health and budget metrics.",
    length: "One to two pages; clean single-column layout, no graphics or tables.",
    hardSkills: ["Brand strategy", "Market research", "Competitive analysis", "Positioning & messaging", "Campaign management", "P&L management", "Consumer insights", "GA4 / SEMrush / HubSpot"],
    softSkills: ["Strategic thinking", "Cross-functional leadership", "Communication", "Creativity"],
    atsKeywords: ["Brand Strategy", "Campaign Management", "Market Research", "Positioning", "Consumer Insights", "P&L Management", "Go-to-Market", "Brand Management"],
    atsNote: "Use the channel/tool ATS keywords (Google Ads, Meta Business Suite, HubSpot, GA4, SEMrush) and state budget size you've owned ($50K/month, $500K annually); quantify brand-health metrics — awareness, preference, share of voice, conversion lift.",
  },
  "product-marketing-manager": {
    include:
      "A 2-3 sentence summary, a Skills section (GTM + positioning + enablement), and Experience tied to launch and adoption metrics.",
    length: "One to two pages; simple format, no tables/graphics, keywords matched to the posting.",
    hardSkills: ["Go-to-market (GTM) strategy", "Product positioning", "Messaging", "Competitive intelligence", "Sales enablement", "Launch execution", "Customer interviews", "Marketing analytics"],
    softSkills: ["Strategic thinking", "Cross-functional collaboration", "Storytelling", "Communication"],
    atsKeywords: ["Go-to-Market", "Product Positioning", "Messaging", "Sales Enablement", "Competitive Intelligence", "Launch Execution", "Product Marketing", "Customer Insights"],
    atsNote: "Naturally include both strategic (Go-to-Market, Product Positioning, Competitive Intelligence) and tactical keywords (Sales Enablement, Launch Execution, Customer Interviews); quantify launch impact, adoption and pipeline influence.",
  },
  "digital-marketing-manager": {
    include:
      "A summary, a prominent Skills section (the top 5 appear in 80%+ of postings), and Experience using metrics not adjectives.",
    length: "One to two pages; single-column, Calibri/Arial 11pt, no tables/graphics.",
    hardSkills: ["SEO", "SEM / PPC", "Email marketing", "Social media", "Analytics (GA4)", "Content strategy", "Marketing automation", "ROI analysis"],
    softSkills: ["Creativity", "Problem solving", "Communication", "Data-driven decision making"],
    atsKeywords: ["SEO", "SEM", "Email Marketing", "Social Media", "Google Analytics", "Marketing Automation", "Content Strategy", "ROI Analysis"],
    atsNote: "Lead with the five keywords in 80%+ of postings (SEO, SEM, Email Marketing, Social Media, Analytics) in a prominent skills section, name your stack (GA4, HubSpot, Marketo, SEMrush) and use metrics ('increased revenue by 35%', not 'improved performance').",
  },
  "email-marketing-specialist": {
    include:
      "A data-driven summary (years + program scale), a Skills section (ESP/automation + segmentation + HTML), and Experience with revenue and deliverability metrics.",
    length: "One to two pages; standard headings, platform names spelled out for ATS.",
    hardSkills: ["Email strategy & lifecycle automation", "ESPs (Klaviyo, Mailchimp, HubSpot)", "Salesforce Marketing Cloud / Marketo", "HTML email design", "A/B testing", "Segmentation", "Deliverability & list hygiene", "Analytics"],
    softSkills: ["Data-driven thinking", "Attention to detail", "Communication", "Testing mindset"],
    atsKeywords: ["Email Marketing", "Marketing Automation", "HTML Email", "Salesforce Marketing Cloud", "A/B Testing", "Segmentation", "Klaviyo", "Deliverability"],
    atsNote: "Name your specific ESP/automation platform (Klaviyo, Salesforce Marketing Cloud, HubSpot, Marketo) to clear screening and show depth (deliverability, list hygiene, segmentation); quantify revenue, open/click rate and deliverability score.",
  },
  "community-manager": {
    include:
      "A summary, a balanced Skills section (social tools + engagement + analytics), certifications, and Experience with numbers in 70%+ of bullets.",
    length: "One to two pages; clean ATS-safe layout, role-specific keywords.",
    hardSkills: ["Social media management", "Community engagement", "Content creation", "Social tools (Hootsuite, Sprout Social, Buffer)", "Data analysis", "Platform expertise (IG, TikTok, LinkedIn)", "Content calendars", "Moderation"],
    softSkills: ["Communication", "Empathy", "Conflict resolution", "Collaboration"],
    atsKeywords: ["Social Media Management", "Community Engagement", "Content Strategy", "Community Growth", "Hootsuite", "Sprout Social", "Engagement Rate", "Marketing Campaigns"],
    atsNote: "Integrate 'community engagement' and 'marketing campaigns' and name your tools (Hootsuite, Sprout Social, Buffer); put numbers in at least 70% of bullets (engagement rate, follower growth, conversion) and add CCM or Facebook Blueprint certs.",
  },
  "influencer-marketing-manager": {
    include:
      "A summary, a Skills section (campaign strategy + platforms + analytics), a section on 2-4 standout creator campaigns, and Experience with brand-lift metrics.",
    length: "One to two pages; bold headers + bullets, no tables/graphics.",
    hardSkills: ["Influencer outreach & vetting", "Campaign strategy", "Content partnerships (YouTube/IG/TikTok)", "Contract negotiation", "Campaign tracking", "Engagement-rate analysis", "Content calendars", "Tools (CapCut, Hootsuite)"],
    softSkills: ["Relationship building", "Communication", "Project management", "Negotiation"],
    atsKeywords: ["Influencer Marketing", "Influencer Outreach", "Campaign Strategy", "Content Strategy", "Engagement Rate", "TikTok", "Brand Partnerships", "Campaign Tracking"],
    atsNote: "Include platform and tactic keywords (TikTok, Instagram Reels, Influencer Outreach, Engagement Rate, Content Calendar) and lead bullets with Achieved/Led/Managed; quantify reach, engagement rate and brand-lift from your partnerships.",
  },
  "public-relations-specialist": {
    include:
      "A summary naming specialization + a headline win + tool keywords, a Skills section (8-10 hard, 6-7 soft), and a section on 2-4 standout campaigns.",
    length: "One to two pages; mirror the posting's exact tools/terminology.",
    hardSkills: ["Media relations & journalist outreach", "Press-release & pitch writing", "Media monitoring (Meltwater, Cision)", "Crisis communication", "Brand messaging", "Digital PR / SEO-driven PR", "Event management", "Social media communications"],
    softSkills: ["Relationship building", "Strategic thinking", "Composure under pressure", "Storytelling"],
    atsKeywords: ["Media Relations", "Press Release Writing", "Media Pitching", "Brand Messaging", "Crisis Communication", "Media Monitoring", "Digital PR", "Online Reputation Management"],
    atsNote: "Use the terms in 80%+ of PR postings (Digital PR, SEO-driven PR, online reputation management) and name your monitoring tools (Meltwater, Cision); show a media-placement track record with named publications and measurable impressions.",
  },
  "market-research-analyst": {
    include:
      "A summary, a Skills section (methods + analytics + tools), and Experience weaving a keyword into every quantified achievement.",
    length: "One to two pages; clean single-column, standard headings.",
    hardSkills: ["Survey design", "Quantitative & qualitative research", "Statistical analysis (SPSS, SAS)", "Data analysis (Excel, SQL)", "Data visualization (Tableau, Power BI)", "Competitive analysis", "Segmentation", "Report writing"],
    softSkills: ["Analytical thinking", "Presentation", "Attention to detail", "Stakeholder management"],
    atsKeywords: ["Market Research", "Survey Design", "Data Analysis", "Consumer Insights", "Quantitative Research", "SPSS", "Competitive Analysis", "Statistical Analysis"],
    atsNote: "Name your analytical tools (SPSS, SAS, Tableau, Power BI, SQL) and methods (focus groups, segmentation, trend forecasting), and weave a keyword into each achievement ('Led research that increased efficiency by 30%').",
  },
  "marketing-analyst": {
    include:
      "A summary containing the exact job title, a Skills section led by the 2026 priority tools, and Experience with measurable campaign outcomes.",
    length: "One to two pages; repeat a primary skill 2-3 times across summary/skills/bullets.",
    hardSkills: ["Google Analytics (GA4)", "SQL", "Tableau / Power BI", "A/B testing", "Attribution modeling", "PPC analytics", "Marketing automation", "ROI analysis"],
    softSkills: ["Analytical thinking", "Communication", "Problem solving", "Data storytelling"],
    atsKeywords: ["GA4", "SQL", "Tableau", "A/B Testing", "Attribution Modeling", "Marketing Analytics", "ROI Analysis", "PPC"],
    atsNote: "The highest-priority 2026 keywords are GA4, SQL, Tableau/Power BI, A/B testing and attribution modeling; put the exact job title in your summary (it makes an interview ~10x likelier) and repeat a primary skill 2-3 times across the resume.",
  },
  "art-director": {
    include:
      "A portfolio link at the top (a broken/missing link is an instant filter), a summary, a Skills section (tools + brand + direction), and outcome-anchored Experience.",
    length: "One to two pages; strong section headers, white space, clutter-free.",
    hardSkills: ["Art direction", "Adobe Creative Suite", "Figma", "Brand identity", "Design systems", "Visual storytelling", "Motion graphics", "Campaign management"],
    softSkills: ["Creative leadership", "Communication", "Collaboration", "Problem solving"],
    atsKeywords: ["Art Direction", "Adobe Creative Suite", "Brand Identity", "Creative Direction", "Visual Design", "Design Systems", "Figma", "Campaign Management"],
    atsNote: "Place your portfolio link at the top or right after your name — a missing or broken link is an immediate filter; include 'Adobe Creative Suite', 'brand strategy', 'visual storytelling' and anchor every bullet to an outcome (conversion lift, on-time launch, reduced revisions).",
  },
  "creative-director": {
    include:
      "A robust Skills section with posting keywords, a summary, and Experience that keeps creative achievements and business outcomes focal.",
    length: "One to two pages; strong headers and white space; balance visuals with readability.",
    hardSkills: ["Brand strategy", "Campaign development", "Art direction", "Adobe Creative Suite", "Video production", "UX/UI", "Creative strategy", "Content marketing"],
    softSkills: ["Creative leadership", "Strategic thinking", "Mentoring", "Decision making"],
    atsKeywords: ["Brand Strategy", "Campaign Development", "Creative Direction", "Art Direction", "Team Leadership", "Creative Strategy", "Content Marketing", "Adobe Creative Suite"],
    atsNote: "Blend artistic, marketing, leadership and technical keywords from the posting (brand strategy, campaign development, cross-functional leadership) and start bullets with Led/Directed/Concepted/Launched (not 'Responsible for'); quantify campaign performance and revenue.",
  },
  "illustrator": {
    include:
      "A portfolio link in the header, a summary, a Skills section (10-15, the top 5 in 80%+ of postings first), and Experience with action verbs.",
    length: "One to two pages; ATS weights the skills section, so order by relevance.",
    hardSkills: ["Illustration", "Digital art", "Drawing", "Adobe Creative Suite (Illustrator, Photoshop)", "Concept art", "Storyboarding", "Vector art", "Design theory"],
    softSkills: ["Creativity", "Storytelling", "Problem solving", "Collaboration"],
    atsKeywords: ["Illustration", "Digital Art", "Drawing", "Adobe Creative Suite", "Adobe Illustrator", "Concept Art", "Vector Art", "Storytelling"],
    atsNote: "Lead with the five keywords in 80%+ of postings (Illustration, Digital Art, Drawing, Adobe Creative Suite, Creativity) and put a portfolio link (Behance/Instagram/site) in the header; use verbs like designed/conceptualized/collaborated.",
  },
  "photographer": {
    include:
      "A portfolio URL near your name, a summary, a Skills section grouped (Technical/Software/Specialties/Business), and Experience with quantified impact.",
    length: "One to two pages; group skills into clear categories for scanning.",
    hardSkills: ["Studio & location lighting", "Composition", "Adobe Lightroom & Photoshop", "Retouching & color correction", "Portrait / product / event photography", "DSLR & mirrorless", "Capture One", "Image licensing"],
    softSkills: ["Artistic vision", "Client management", "Networking", "Attention to detail"],
    atsKeywords: ["Photography", "Adobe Lightroom", "Photoshop", "Photo Editing", "Studio Lighting", "Retouching", "Composition", "Visual Storytelling"],
    atsNote: "Put the portfolio URL near your name (it's your strongest asset) and name tools/genres (Lightroom, Photoshop, Capture One, portrait/product/event); quantify impact ('500+ product images that boosted conversions 12%').",
  },
  "videographer": {
    include:
      "A portfolio/reel link, a summary, a Skills section grouped (Camera/Editing/Lighting/Audio) with named gear and codecs, and Experience with hard numbers.",
    length: "One to two pages; keep soft skills out of the skills section — show them in experience.",
    hardSkills: ["Cinematography", "Adobe Premiere Pro / DaVinci Resolve", "Lighting setups (three-point, LED)", "Audio recording (boom, lavalier)", "Motion graphics", "Color grading", "Camera operation (Sony FS7, Canon C300)", "Post-production (ProRes, H.264/265)"],
    softSkills: ["Creativity", "Collaboration", "Communication", "Deadline discipline"],
    atsKeywords: ["Videography", "Cinematography", "Adobe Premiere Pro", "Post-Production", "Lighting", "Motion Graphics", "DaVinci Resolve", "Color Grading"],
    atsNote: "Name specific software and gear (Adobe Premiere Pro, not 'video editing'; Sony FS7, ProRes, H.265) and group skills by Camera/Editing/Lighting/Audio; quantify turnaround, output volume and engagement — keep soft skills out of the skills list.",
  },
  "legal-secretary": {
    include:
      "A summary, a Skills section (document prep + e-filing + calendaring + software), certifications (PLS), and Experience with action verbs and deadline metrics.",
    length: "One to two pages; 15-25 relevant keywords matched to the posting, no tables.",
    hardSkills: ["Legal document preparation & formatting", "E-filing (PACER, ECF)", "Docket & deadline management", "Calendar management", "Legal billing (TABS3, Bill4Time)", "Document management (NetDocuments, iManage)", "Service of process", "Client communication"],
    softSkills: ["Discretion", "Accuracy", "Time management", "Confidentiality"],
    atsKeywords: ["Legal Document Preparation", "E-Filing", "Docket Management", "Calendar Management", "PACER", "Legal Billing", "Deadline Tracking", "Case File Management"],
    atsNote: "Use exact legal-admin keywords (e-filing, docket management, deadline compliance) and name your systems (PACER/ECF, NetDocuments, TABS3); add the PLS designation and start each bullet with an action verb, not a duty.",
  },
  "legal-assistant": {
    include:
      "A summary with the exact title 'Legal Assistant', a Skills section (research + docketing + named tools), and Experience with accomplishments, not duties.",
    length: "One to two pages; clean headings; list specific tools, never 'computer skills'.",
    hardSkills: ["Legal research (Westlaw, LexisNexis)", "Legal document preparation", "Court filing / e-filing procedures", "Docket & calendar management", "Legal CRM (Clio, Lexicata)", "Adobe Acrobat Pro", "Case management", "Trial preparation"],
    softSkills: ["Discretion", "Confidentiality", "Attention to detail", "Time management"],
    atsKeywords: ["Legal Assistant", "Legal Research", "Westlaw", "LexisNexis", "Docketing", "E-Filing", "Clio", "Litigation Support"],
    atsNote: "Put the exact title 'Legal Assistant' in your resume and list specific tools by name (Clio, Westlaw, PACER, Adobe Acrobat Pro) — never 'computer skills'; start bullets with action verbs and quantify caseload.",
  },
  "compliance-officer": {
    include:
      "A summary stating your compliance focus, a Skills section organized by category (regulations + risk + audit), certifications, and Experience with metrics.",
    length: "One to two pages; name the regulation, not the category.",
    hardSkills: ["Regulatory compliance (BSA/AML, KYC, OFAC, SOX, GDPR)", "Risk assessment & control testing", "Transaction monitoring", "Due diligence", "Policy development", "Regulatory reporting", "Compliance auditing", "Gap analysis"],
    softSkills: ["Integrity", "Analytical judgment", "Communication", "Attention to detail"],
    atsKeywords: ["Regulatory Compliance", "AML", "KYC", "Risk Assessment", "SOX Compliance", "BSA", "Transaction Monitoring", "Due Diligence"],
    atsNote: "Name the regulation, not the category — 'BSA/AML compliance' beats 'financial compliance' — and include regulatory-body tokens (OCC, FDIC, FINRA, SEC); 97% of firms use ATS, so missing 'Regulatory Compliance' or 'SOX' disqualifies you. Add CRCM/AML certs.",
  },
  "notary": {
    include:
      "A summary, a Licenses & Certifications section with your commission, a Skills section (notarization + loan signing + platforms), and Experience with volume metrics.",
    length: "One page; list your commission clearly under a Licenses/Certifications header.",
    hardSkills: ["Notarization procedures", "Loan document review & signing", "Remote online notarization (RON)", "Electronic notarization (DocuSign, Snapdocs)", "Document verification", "State notary law", "Identity verification", "Mobile notary service"],
    softSkills: ["Attention to detail", "Confidentiality", "Time management", "Customer service"],
    atsKeywords: ["Commissioned Notary Public", "Loan Signing Agent", "RON Certified", "Notarization", "Loan Document Notarization", "Electronic Notarization", "Document Verification", "Remote Online Notarization"],
    atsNote: "Use exact credential phrases ('Commissioned Notary Public', 'RON Certified', 'Loan Signing Agent') under a Licenses header and name your platforms (DocuSign, Snapdocs); quantify signings completed and turnaround.",
  },
  "legal-counsel": {
    include:
      "A summary (title + years + industry + 1-2 measurable wins), a Skills section near the top (contracts + research + compliance), and quantified Experience.",
    length: "One to two pages; include the exact title 'Legal Counsel'; no tables/images.",
    hardSkills: ["Contract drafting & negotiation", "Legal research", "Regulatory analysis", "Compliance frameworks", "Litigation management", "M&A due diligence", "Dispute resolution", "Data privacy (GDPR, CCPA)"],
    softSkills: ["Judgment", "Negotiation", "Cross-functional communication", "Risk awareness"],
    atsKeywords: ["Contract Drafting", "Contract Negotiation", "Legal Research", "Compliance", "Litigation Management", "Regulatory Analysis", "Due Diligence", "Risk Management"],
    atsNote: "Put the exact title 'Legal Counsel' on the page and cite specific regulations (GDPR, CCPA, SOX, HIPAA, SEC); quantify achievements ('reduced litigation exposure 30%, saving $500K annually in outside-counsel fees').",
  },
  "tax-advisor": {
    include:
      "A summary showcasing tax expertise + credentials, a Skills section (tax + software + compliance), and Experience quantifying tax savings.",
    length: "One to two pages; balance tax terminology with soft skills for ATS.",
    hardSkills: ["Corporate tax planning", "Tax compliance", "ASC 740 / tax provision", "GAAP / IFRS", "Tax software", "Financial reporting", "International tax", "Internal controls (SOX)"],
    softSkills: ["Analytical judgment", "Attention to detail", "Client communication", "Integrity"],
    atsKeywords: ["Tax Compliance", "Corporate Tax", "Tax Advisory", "ASC 740", "GAAP", "Tax Planning", "CPA", "Financial Reporting"],
    atsNote: "Surface CPA/CTA/EA (and your IRS PTIN if an enrolled agent) and tax-specific keywords (tax compliance, corporate tax, ASC 740, tax provision); quantify tax savings and audit-readiness improvements.",
  },
  "financial-planner": {
    include:
      "A summary, a Certifications/Licenses section early (CFP catches the eye fast), a Skills section (planning + products + platforms), and Experience leading with AUM/client scope.",
    length: "One to two pages; standard headings, no images, clean layout.",
    hardSkills: ["Financial planning", "Retirement planning", "Portfolio management", "Tax strategy", "Estate planning", "Planning software (eMoney, MoneyGuidePro)", "Salesforce Financial Services Cloud", "Risk analysis"],
    softSkills: ["Client communication", "Trust building", "Analytical thinking", "Discretion"],
    atsKeywords: ["Financial Planning", "Retirement Planning", "Portfolio Management", "CFP", "Estate Planning", "Tax Strategy", "Client Relationship Management", "Asset Allocation"],
    atsNote: "List CFP (plus CFA/ChFC/CPA/EA) early in a Certifications/Licenses section; lead each role with scope (client accounts, assets under advisement) and name planning platforms (eMoney, MoneyGuidePro), quantifying retention and growth.",
  },
  "wealth-manager": {
    include:
      "A summary, a multi-column Skills section (portfolio + HNW relations + planning), licenses listed clearly, and Experience anchored to AUM and growth.",
    length: "One to two pages; 25-35 keywords; precise, compliant, professional language.",
    hardSkills: ["Portfolio management", "HNW/UHNW client relations", "Asset allocation", "Financial planning", "Estate & trust planning", "Tax-loss harvesting", "Bloomberg / FactSet", "Business development & prospecting"],
    softSkills: ["Relationship building", "Discretion", "Communication", "Trust"],
    atsKeywords: ["Wealth Management", "Portfolio Management", "Asset Allocation", "UHNW", "Series 7", "Financial Planning", "Client Acquisition", "Estate Planning"],
    atsNote: "List 'FINRA Series 7 & 66 Licensed' clearly (don't bury it) plus CFA/CPA/FRM, and include HNW/UHNW, Asset Allocation and Client Acquisition; recruiters screen for trust with client assets, so keep language precise and compliant.",
  },
  "portfolio-manager": {
    include:
      "A summary, a Skills section (portfolio + financial analysis + technologies), credentials (CFA), and Experience replacing vague claims with bps of alpha.",
    length: "One to two pages; anchor every skill in a measurable outcome.",
    hardSkills: ["Asset allocation", "Portfolio optimization", "Risk management", "Financial modeling (DCF)", "Portfolio attribution", "Bloomberg Terminal (PORT)", "Excel VBA / Python", "Investment strategy"],
    softSkills: ["Analytical judgment", "Decision making", "Communication", "Discipline"],
    atsKeywords: ["Portfolio Management", "Asset Allocation", "Risk Management", "Portfolio Optimization", "Bloomberg Terminal", "Financial Modeling", "CFA", "Investment Strategy"],
    atsNote: "Include 'Bloomberg Terminal'/'Bloomberg PORT', portfolio optimization and attribution, and list CFA/CAIA/FRM prominently; replace vague claims with hard numbers (bps of alpha, quantified efficiency gains) and keep it to 1-2 pages.",
  },
  "risk-analyst": {
    include:
      "A summary, a prominent Skills section near the top (risk types + models + software), and Experience naming the risk domains you've covered.",
    length: "One to two pages; 15+ industry keywords; no tables/graphics.",
    hardSkills: ["Risk assessment", "VaR modeling", "Monte Carlo simulation", "Quantitative analysis", "Risk software (IBM OpenPages, SAP GRC)", "Statistical analysis (R, Python, SAS)", "Regulatory compliance", "Enterprise risk management (ERM)"],
    softSkills: ["Analytical thinking", "Attention to detail", "Communication", "Problem solving"],
    atsKeywords: ["Risk Management", "Risk Assessment", "VaR Modeling", "Quantitative Analysis", "ERM", "Regulatory Compliance", "Monte Carlo", "Risk Modeling"],
    atsNote: "Place the skills section near the top and include 15+ exact keywords (ERM, VaR Modeling, Regulatory Compliance) plus your risk software (SAS, Tableau, IBM OpenPages); be specific about risk types covered (financial, operational, compliance).",
  },
  "quantitative-analyst": {
    include:
      "A summary, a Skills section (quant finance + languages + ML/modeling), and Experience embedding keywords inside quantified achievement statements.",
    length: "One to two pages; no tables/graphics; achievements over duties.",
    hardSkills: ["Quantitative finance", "Python / R", "Financial modeling", "Derivatives pricing", "Time series analysis", "Machine learning", "SQL", "Statistical analysis"],
    softSkills: ["Analytical thinking", "Problem solving", "Communication", "Rigor"],
    atsKeywords: ["Quantitative Finance", "Python", "Financial Modeling", "Machine Learning", "Time Series Analysis", "Derivatives Pricing", "SQL", "Quantitative Analytics"],
    atsNote: "ATS weights keywords more when they sit inside achievement statements, not standalone lists — embed Python, financial modeling and time-series in quantified bullets; prioritize the skills the posting names.",
  },
  "treasury-analyst": {
    include:
      "A summary, a Skills section (cash management + forecasting + tools), and Experience with specific, measurable accomplishments.",
    length: "One to two pages; identify and mirror the posting's hard skills.",
    hardSkills: ["Cash management", "Cash-flow forecasting", "Treasury management", "Bank reconciliation", "Liquidity management", "Excel / Power BI modeling", "Bloomberg Terminal / SAP", "Corporate finance"],
    softSkills: ["Analytical thinking", "Attention to detail", "Communication", "Collaboration"],
    atsKeywords: ["Treasury Management", "Cash Management", "Cash Flow Forecasting", "Financial Analysis", "Bank Reconciliation", "Liquidity Management", "Corporate Finance", "SAP"],
    atsNote: "Mirror the posting's hard skills (cash management, cash-flow forecasting, treasury management) and name high-value tools (Excel, Bloomberg Terminal, SAP, Power BI); make bullets measurable, not duty descriptions.",
  },
  "cost-accountant": {
    include:
      "A summary, a Skills section (cost accounting + ERP + lean), certifications (CMA), and Experience with cost-savings and variance metrics.",
    length: "One to two pages; feature keywords directly from the posting.",
    hardSkills: ["Cost accounting", "Variance analysis", "Activity-based costing", "General ledger", "Financial reporting", "SAP ERP", "Budgeting & forecasting", "Internal controls (SOX)"],
    softSkills: ["Attention to detail", "Analytical thinking", "Communication", "Integrity"],
    atsKeywords: ["Cost Accounting", "Variance Analysis", "General Ledger", "Financial Reporting", "SAP", "Manufacturing", "Internal Controls", "Account Reconciliation"],
    atsNote: "Feature cost-accounting keywords (variance analysis, activity-based costing, SAP ERP) and manufacturing/lean terms (5S, Kaizen); add CMA and quantify cost savings and efficiency gains.",
  },
  "forensic-accountant": {
    include:
      "A summary, a Skills section (forensic + fraud tools + analytics), the CFE credential, and Experience leading with caseload scope and investigations owned.",
    length: "One to two pages; weave keywords through summary, bullets and skills.",
    hardSkills: ["Forensic accounting", "Fraud examination & detection", "Investigative research", "Auditing", "Fraud-detection software (ACL, IDEA)", "Data analytics (Tableau, Power BI)", "e-Discovery", "Regulatory compliance (SOX)"],
    softSkills: ["Ethical judgment", "Critical thinking", "Attention to detail", "Communication"],
    atsKeywords: ["Forensic Accounting", "Fraud Investigation", "Fraud Examination", "Auditing", "Financial Analysis", "Fraud Detection", "Investigative Research", "Internal Controls"],
    atsNote: "The high-signal keywords are Financial Analysis, Fraud Examination, Auditing and Investigative Research (ATS used by 75%+ of employers); add the CFE credential and lead with caseload scope, jurisdictional reach and investigations owned intake-to-resolution.",
  },
  "heavy-equipment-operator": {
    include:
      "A summary (years + specialization + biggest proof point), a Skills section (equipment + GPS + safety), certifications, and Experience with cubic yards and grade tolerances.",
    length: "One to two pages; ATS scans for exact matches, so name equipment and GPS systems.",
    hardSkills: ["Excavators / bulldozers / graders", "GPS grading (Trimble, Topcon)", "Site work & earthmoving", "Grade & elevation control", "Equipment inspection & maintenance", "Blueprint reading", "Load handling", "Site safety"],
    softSkills: ["Safety awareness", "Communication", "Teamwork", "Problem solving"],
    atsKeywords: ["Heavy Equipment Operator", "Excavator", "Bulldozer", "GPS Grading", "Site Work", "Earthmoving", "Equipment Maintenance", "Safety"],
    atsNote: "Name the exact machines and GPS systems (Trimble, Topcon are high-value keywords) and list NCCER/CDL (NCCCO if crane-certified); quantify cubic yards moved, grade tolerances and project values.",
  },
  "surveyor": {
    include:
      "A summary with achievements, a Skills section (instruments + CAD + GNSS), Education/licensure with full certification names, and Experience tied to project outcomes.",
    length: "One to two pages; plain bullets, no columns/creative fonts (ATS misreads them).",
    hardSkills: ["Boundary surveys", "Topographic mapping", "Construction staking", "GNSS / GPS surveying", "Total station / robotic instruments", "AutoCAD / Civil 3D", "GIS mapping", "Data collection & adjustment"],
    softSkills: ["Attention to detail", "Problem solving", "Communication", "Precision"],
    atsKeywords: ["Land Surveying", "Boundary Surveys", "Topographic Mapping", "Construction Staking", "GNSS", "GIS", "AutoCAD", "Total Station"],
    atsNote: "Include exact terms (Boundary Surveys, Topographic Mapping, Construction Staking, GNSS) and name your instruments/software; list licensure (PLS where required) with the full certification name, issuer and date.",
  },
  "foreman": {
    include:
      "A summary, a Skills section balancing supervision + trade + software, and Experience with concrete crew sizes and on-time/on-budget metrics.",
    length: "One to two pages; place keywords inside accomplishment bullets, human-readable first.",
    hardSkills: ["Site supervision", "Crew & labor management", "Schedule management", "Subcontractor coordination", "Quality control", "Budget planning", "Blueprint reading", "Safety compliance (OSHA)"],
    softSkills: ["Leadership", "Communication", "Problem solving", "Conflict resolution"],
    atsKeywords: ["Construction Management", "Team Leadership", "Site Supervision", "Labor Management", "Quality Control", "Subcontractor Management", "Scheduling", "Safety Compliance"],
    atsNote: "Show concrete proof ('Supervised a crew of 10+', 'Reduced material waste 15%') with action verbs (Supervised, Coordinated); hiring managers want on-time/on-budget delivery, contractor relations and safety — put those keywords in accomplishment bullets.",
  },
  "structural-engineer": {
    include:
      "A summary, a Skills section led by analysis software + codes, PE/SE licensure prominent in Education, and Experience quantifying tonnage/spans/stories.",
    length: "One to two pages; Arial/Calibri 10-12pt; sections Summary/Skills/Experience/Education/Certifications.",
    hardSkills: ["Structural analysis (SAP2000, ETABS)", "RISA-3D / RAM", "Revit Structure / Tekla (BIM)", "Reinforced concrete design (ACI 318)", "Structural steel design (AISC 360)", "Seismic analysis", "Finite element analysis", "Load calculation"],
    softSkills: ["Analytical judgment", "Attention to detail", "Communication", "Decision making"],
    atsKeywords: ["Structural Engineering", "PE License", "SAP2000", "ETABS", "ACI 318", "AISC 360", "Finite Element Analysis", "Seismic Analysis"],
    atsNote: "Feature your PE/SE license prominently (70% of structural roles require it) and reference design codes (ACI 318, AISC 360, ASCE 7) to show code-compliant fluency; quantify steel tonnage, span lengths, story count and budget.",
  },
  "project-engineer": {
    include:
      "Sections in order Summary/Core Skills/Experience/Education/Certifications, skills grouped (engineering + project mgmt), and Experience turning responsibilities into measured achievements.",
    length: "One to two pages; 10-15 skills grouped by category; add the posting's skills word-for-word.",
    hardSkills: ["Project coordination", "Engineering design", "AutoCAD", "Primavera P6 / MS Project", "Schedule & budget management", "Quantity take-off", "BIM coordination", "Quality assurance"],
    softSkills: ["Team coordination", "Risk mitigation", "Communication", "Stakeholder management"],
    atsKeywords: ["Project Coordination", "Engineering Design", "AutoCAD", "Primavera P6", "Schedule Management", "Budget Tracking", "Risk Management", "Regulatory Compliance"],
    atsNote: "ATS scans for AutoCAD, Primavera P6 and MS Project — include them naturally — and add the job ad's skills word-for-word; start bullets with led/developed/optimized and close with measurable results.",
  },
  "site-engineer": {
    include:
      "A summary, a prominent Skills section (CAD + structural + site), PE license near the top if held, and Experience with quantified project scope.",
    length: "One to two pages; single-column, Calibri/Arial 11pt, 10-15 skills by relevance.",
    hardSkills: ["AutoCAD / Civil 3D", "Structural analysis", "Site planning & setting-out", "Construction management", "Building codes & permitting", "Surveying", "Geotechnical basics", "Quality & materials control"],
    softSkills: ["Critical thinking", "Project management", "Communication", "Problem solving"],
    atsKeywords: ["Civil Engineering", "AutoCAD", "Site Planning", "Construction Management", "Structural Analysis", "Building Codes", "Civil 3D", "Site Supervision"],
    atsNote: "Lead the skills section with the five terms in 80%+ of civil postings (CAD Design, Project Management, Structural Analysis, Building Codes, Site Analysis) and put your PE near the top if held; only use skills that appear in the posting.",
  },
  "construction-worker": {
    include:
      "A summary, a Skills section (tools/equipment + safety), OSHA certification, and Experience showing safety record and versatility.",
    length: "One to two pages; formatted for easy ATS scanning, 8+ industry keywords.",
    hardSkills: ["Hand & power tools", "Heavy machinery operation", "Blueprint reading", "Site preparation", "Concrete & framing", "Material handling", "Safety inspections", "Hazardous material handling"],
    softSkills: ["Reliability", "Teamwork", "Physical stamina", "Attention to detail"],
    atsKeywords: ["Construction", "OSHA", "Power Tools", "Site Preparation", "Blueprint Reading", "Safety Compliance", "Material Handling", "Heavy Machinery"],
    atsNote: "Get OSHA 10 or 30 — safety is a top priority and missing it greatly reduces your odds — and include 8+ keywords (OSHA, Power Tools, Site Preparation); describe how you reduced incidents and the equipment you've run.",
  },
  "petroleum-engineer": {
    include:
      "A summary, a Skills section grouped (Reservoir/Drilling/Software/Operations), and Experience with production-uplift and cost-per-barrel metrics.",
    length: "One to two pages; tailor language to each posting's tools, basins and KPIs.",
    hardSkills: ["Reservoir engineering & simulation", "Drilling engineering", "Production optimization", "Artificial lift", "Reservoir management", "Petrel / Eclipse / CMG / OFM", "Workover operations", "Field development"],
    softSkills: ["Analytical thinking", "Problem solving", "Communication", "HSE focus"],
    atsKeywords: ["Petroleum Engineering", "Reservoir Engineering", "Drilling", "Production Optimization", "Reservoir Simulation", "Petrel", "Artificial Lift", "Oil & Gas"],
    atsNote: "Name the exact software (Eclipse, CMG, OFM, Petrel) since recruiters search tool names; quantify production uplift %, drilling days saved, NPT reductions and cost per barrel using BOE/day, IP rates and reserve figures.",
  },
  "aerospace-engineer": {
    include:
      "A summary, a Skills section (analysis tools + systems + compliance), and Experience quantifying weight/thrust/reliability outcomes.",
    length: "One to two pages; spell keywords exactly as the posting does, standardized bullets.",
    hardSkills: ["MATLAB", "CFD (computational fluid dynamics)", "CAD software (CATIA/NX)", "GD&T", "Flight control systems", "Propulsion systems", "Composite materials", "Testing & validation"],
    softSkills: ["Analytical thinking", "Teamwork", "Communication", "Attention to detail"],
    atsKeywords: ["Aerospace Engineering", "MATLAB", "CFD", "GD&T", "Flight Control Systems", "Propulsion", "Composite Materials", "Safety Analysis"],
    atsNote: "Spell keywords exactly as the posting (MATLAB, CFD, GD&T, propulsion systems, composite materials) and lead with requirements analysis, testing & validation and regulatory compliance; quantify weight, thrust, drag, reliability and test pass rates.",
  },
  "automotive-engineer": {
    include:
      "A summary, a Skills section mixing tools/methods + execution behaviors, and Experience showing design-validate-launch of vehicle systems.",
    length: "One to two pages; match the posting's phrasing ('fuel efficiency' if it says so).",
    hardSkills: ["CAD software", "MATLAB", "DFMEA", "Vehicle dynamics", "Powertrain integration", "Vehicle testing & prototyping", "Validation processes", "Vehicle safety standards"],
    softSkills: ["Problem solving", "Communication", "Collaboration", "Strategic thinking"],
    atsKeywords: ["Automotive Engineering", "CAD", "MATLAB", "DFMEA", "Vehicle Dynamics", "Powertrain", "Validation", "Prototyping"],
    atsNote: "Use field terms (vehicle dynamics, powertrain, CAD software, DFMEA) and mirror the posting's wording — if it says 'fuel efficiency' use that exact phrase; show hands-on testing/prototyping and quantify validation improvements.",
  },
  "manufacturing-engineer": {
    include:
      "A summary, a Skills section grouped (Engineering Software / Manufacturing / Quality & Efficiency / Soft), certifications, and Experience with quantified savings.",
    length: "One to two pages; save as PDF for ATS parsability.",
    hardSkills: ["Lean manufacturing", "Six Sigma", "Process optimization", "SolidWorks / AutoCAD / CATIA", "CNC machining / injection molding", "SPC", "Value stream mapping", "FMEA / ISO 9001"],
    softSkills: ["Problem solving", "Collaboration", "Communication", "Continuous improvement"],
    atsKeywords: ["Lean Manufacturing", "Six Sigma", "Process Optimization", "SolidWorks", "CNC Machining", "Continuous Improvement", "FMEA", "SPC"],
    atsNote: "Include the posting's exact terms (Lean Six Sigma, FMEA, ISO 9001) and group skills into Engineering Software / Manufacturing / Quality categories; quantify cost reduction, efficiency boosts and process improvements.",
  },
  "process-engineer": {
    include:
      "A summary containing the exact title 'Process Engineer', a Skills section aligned to the posting, and Experience showing impact with numbers.",
    length: "One to two pages; mix hard and soft skills, prioritized from the job ad.",
    hardSkills: ["Lean Six Sigma", "Process mapping", "Statistical process control (SPC)", "Process optimization", "Data analysis", "AutoCAD", "Root cause analysis", "Technical writing"],
    softSkills: ["Project management", "Stakeholder communication", "Team coordination", "Problem solving"],
    atsKeywords: ["Process Engineering", "Lean Six Sigma", "Process Mapping", "Statistical Process Control", "Process Optimization", "Data Analysis", "Continuous Improvement", "Root Cause Analysis"],
    atsNote: "Put the exact title 'Process Engineer' on the page and align skills to the posting (Lean Six Sigma, process mapping, SPC, improved cycle times); show impact with numbers in every experience bullet.",
  },
  "chemist": {
    include:
      "A summary, a Skills section (instrumentation + techniques + compliance + LIMS), and Experience with achievement bullets that quantify method gains.",
    length: "One to two pages; tailor to the employer's focus to clear ATS.",
    hardSkills: ["HPLC", "GC-MS", "UV-Vis spectroscopy", "Chromatography & wet chemistry", "Method validation", "GLP / GMP / ISO", "LIMS / Empower 3", "QA/QC"],
    softSkills: ["Attention to detail", "Analytical thinking", "Communication", "Teamwork"],
    atsKeywords: ["HPLC", "GC-MS", "Method Validation", "Chromatography", "Spectroscopy", "GLP", "GMP", "Quality Control"],
    atsNote: "Lead with instrumentation keywords (HPLC, GC-MS, UV-Vis) and compliance terms (GLP, GMP, ISO) plus your LIMS/software (Empower 3, TrackWise); write achievements not duties ('enhanced HPLC throughput 20% via method optimization').",
  },
  "biologist": {
    include:
      "A summary naming your specialty, a Skills section (lab techniques + software), publications/conferences, and Experience with quantified impact.",
    length: "One to two pages (longer academic CV if research-heavy); feature the posting's exact terms.",
    hardSkills: ["PCR & DNA/RNA extraction", "Gene sequencing & genotyping", "Cell culture & assays", "Flow cytometry", "Microscopy", "Experimental design", "Statistical analysis (Python, R)", "Bioinformatics (GenBank, BLAST)"],
    softSkills: ["Analytical thinking", "Scientific writing", "Collaboration", "Attention to detail"],
    atsKeywords: ["Molecular Biology", "PCR", "Cell Culture", "Gene Sequencing", "Flow Cytometry", "Experimental Design", "Data Analysis", "Statistical Modeling"],
    atsNote: "Feature the posting's exact terms (PCR analysis, cell-based assays, statistical modeling) and name your specialty (molecular biology, environmental science, drug discovery); list publications/talks and quantify your research impact.",
  },
  "lecturer": {
    include:
      "A summary, a Skills section (teaching + research + LMS), Publications/Funding, and Experience quantifying teaching impact in every bullet.",
    length: "One to two pages (or a longer academic CV); name LMS and citation styles.",
    hardSkills: ["Curriculum development", "Lecture delivery", "Research methodologies", "Student assessment & design", "LMS (Canvas, Blackboard, Moodle)", "Academic writing (APA/MLA/Chicago)", "Academic advising", "e-Learning technologies"],
    softSkills: ["Public speaking", "Mentorship", "Communication", "Collaboration"],
    atsKeywords: ["Curriculum Development", "Learning Management Systems", "Student Assessment", "Research Methodologies", "Academic Advising", "Lecturing", "Course Design", "Higher Education"],
    atsNote: "Use exact keywords (curriculum development, learning management systems, student assessment) and name your LMS (Canvas, Blackboard, Moodle); quantify pass rates, retention gains, evaluation scores and published/funded work in every bullet.",
  },
  "tutor": {
    include:
      "A summary naming subjects and approach, a Skills section (subjects + methods + software), and Experience leading with measurable score gains.",
    length: "One to two pages; mirror the posting's subjects, tools and methodologies.",
    hardSkills: ["Subject-matter expertise", "Lesson planning", "Test preparation", "Differentiated instruction", "Progress assessment", "Online tutoring platforms", "Curriculum alignment", "Study-skills coaching"],
    softSkills: ["Patience", "Communication", "Empathy", "Enthusiasm"],
    atsKeywords: ["Tutoring", "Lesson Planning", "Test Preparation", "Subject-Matter Expertise", "Differentiated Instruction", "Student Assessment", "Academic Support", "Curriculum"],
    atsNote: "Name the specific subjects you tutor and any educational software/methodologies (exactly as the posting lists them), and lead with quantified results ('improved student scores by 30%', not 'taught students').",
  },
  "teaching-assistant": {
    include:
      "A 2-3 line summary (grade level + standout strength + certification), a Skills section grouped (instructional + classroom mgmt + tech), and Experience quantifying the classroom.",
    length: "One to two pages; include the exact title 'Teaching Assistant' for ATS.",
    hardSkills: ["Lesson-plan preparation", "Classroom management", "Small-group instruction", "IEP support", "Differentiated instruction", "Behavior management", "Data tracking", "EdTech (Google Classroom, Seesaw, ClassDojo)"],
    softSkills: ["Patience", "Collaboration", "Organization", "Communication"],
    atsKeywords: ["Teaching Assistant", "Classroom Management", "Differentiated Instruction", "Behavior Management", "IEP Support", "Small-Group Instruction", "Lesson Planning", "Student Support"],
    atsNote: "Put the exact title 'Teaching Assistant' on the page and use sought terms ('differentiated instruction', 'behavior management') plus your platforms (Google Classroom, Seesaw, ClassDojo); quantify students supported, grade levels and reading/math gains.",
  },
  "special-education-teacher": {
    include:
      "An opener naming caseload type + IEP experience + a measurable improvement, a focused 4-7 skill set, and reverse-chronological Experience.",
    length: "One to two pages; mirror the posting's methodology keywords (IEP, ABA).",
    hardSkills: ["Individualized education plans (IEP)", "Differentiated instruction", "Applied behavior analysis (ABA)", "Crisis intervention", "Adaptive teaching strategies", "Progress monitoring", "Behavior intervention plans", "Education law (IDEA)"],
    softSkills: ["Compassion", "Patience", "Collaboration", "Communication"],
    atsKeywords: ["Special Education", "IEP", "Individualized Education Plan", "Differentiated Instruction", "ABA", "Crisis Intervention", "Behavior Intervention", "Inclusion"],
    atsNote: "Spell out 'Individualized Education Plan (IEP)' and include ABA, crisis intervention and differentiated instruction; open with caseload type and at least one measurable student/behavior improvement, and note specializations (autism spectrum, behavioral analysis).",
  },
  "librarian": {
    include:
      "A summary quantifying your impact, a Skills section (ILS + cataloging + reference), the MLS credential, and Experience with measurable outcomes.",
    length: "One to two pages; clean single-column, Arial/Calibri 10-12pt.",
    hardSkills: ["Integrated library systems (Koha, Alma, SirsiDynix)", "Cataloging & metadata (MARC, Dublin Core)", "Collection development", "Reference & research services", "Information literacy instruction", "OCLC Connexion", "Authority control", "Database management"],
    softSkills: ["Service orientation", "Organization", "Communication", "Intellectual curiosity"],
    atsKeywords: ["Cataloging", "Reference Services", "Integrated Library System", "Collection Development", "MARC", "Information Literacy", "Metadata", "MLS"],
    atsNote: "Lead with cataloging, reference services and your ILS (Koha, Alma, SirsiDynix), and feature the MLS degree (Certified Archivist if held); quantify program attendance, reference response times, catalog accuracy and backlog reductions.",
  },
  "instructional-designer": {
    include:
      "A summary, a Skills section (authoring tools + models + LMS), a portfolio link, and Experience with quantified learning outcomes and SME collaboration.",
    length: "One to two pages; 97% of firms use ATS — exact keyword match beats portfolio alone.",
    hardSkills: ["ADDIE / SAM", "Articulate Storyline / Rise 360", "Adobe Captivate", "LMS / SCORM / xAPI", "Needs analysis", "Bloom's Taxonomy / Kirkpatrick", "Adult learning theory", "Camtasia"],
    softSkills: ["Collaboration", "Project management", "Communication", "Creativity"],
    atsKeywords: ["Instructional Design", "E-Learning", "Articulate Storyline", "ADDIE", "Learning Management Systems", "Curriculum Design", "Adult Learning Theory", "SCORM"],
    atsNote: "Include exact methodologies (ADDIE, SAM, Bloom's Taxonomy) and authoring tools (Articulate Storyline, Captivate, Rise 360) in both skills and experience — without them you're invisible even with a great portfolio; quantify completion rates and time-to-competency.",
  },
  "academic-advisor": {
    include:
      "A summary, a Skills section (systems + advising), a Certifications section, and Experience with quantified retention and student-outcome gains.",
    length: "One to two pages; name your student information systems for ATS.",
    hardSkills: ["Student advising", "Degree audits", "Case management", "Student information systems (Banner, PeopleSoft, DegreeWorks)", "Retention strategy", "Career counseling", "Data analysis", "LMS management"],
    softSkills: ["Active listening", "Communication", "Empathy", "Conflict resolution"],
    atsKeywords: ["Academic Advising", "Degree Audits", "Student Retention", "Case Management", "Student Success", "Banner", "DegreeWorks", "Student Information Systems"],
    atsNote: "Name your student information systems (Banner, PeopleSoft, DegreeWorks) for ATS matching and include 'degree audits', 'retention strategy' and 'student success'; quantify retention rate gains and student outcomes.",
  },
  "physics-teacher": {
    include:
      "A summary, a Skills section (pedagogy + lab + EdTech), and Experience replacing duties with measurable score gains.",
    length: "One to two pages; use full term 'Physics Teacher' and the posting's keywords.",
    hardSkills: ["Lesson planning", "Classroom management", "Laboratory instruction & safety", "Differentiated instruction", "Project-based learning", "Practical exam preparation", "Simulation software", "Educational technology (Google Classroom, Kahoot)"],
    softSkills: ["Explaining complex topics simply", "Patience", "Communication", "Critical thinking"],
    atsKeywords: ["Physics", "Lesson Planning", "Classroom Management", "Laboratory Skills", "Differentiated Instruction", "Project-Based Learning", "STEM Education", "Student Assessment"],
    atsNote: "Use 'lesson planning' and 'classroom management' from the posting plus 'practical exam preparation' and lab/simulation tools; replace duties with measurable results ('improved student scores by 30%').",
  },
  "chemistry-teacher": {
    include:
      "A summary, a Skills section (pedagogy + lab safety + tools), and Experience quantifying student success and lab-safety record.",
    length: "One to two pages; blend hard lab skills with interpersonal skills, mirror the posting.",
    hardSkills: ["Lesson planning", "Laboratory instruction & safety", "Curriculum development", "Differentiated instruction", "STEM education", "Rubric development", "Assessment tools", "EdTech (Google Classroom, Moodle)"],
    softSkills: ["Presentation", "Patience", "Communication", "Classroom management"],
    atsKeywords: ["Chemistry", "Lesson Planning", "Laboratory Safety", "Curriculum Development", "Differentiated Instruction", "STEM Education", "Classroom Management", "Student Assessment"],
    atsNote: "Match keywords like 'lesson planning' and 'laboratory safety' to the posting and quantify lab outcomes ('coordinated labs for 450 students annually, zero safety violations'); use strong action verbs and student-success rates.",
  },
  "biology-teacher": {
    include:
      "A summary, a Skills section (pedagogy + scientific communication + EdTech), and Experience with quantified assessment gains and lab-incident reductions.",
    length: "One to two pages; bullet points scannable, keywords from the posting.",
    hardSkills: ["Lesson planning", "Laboratory safety", "Curriculum development", "Student assessment", "Differentiated instruction", "Field studies", "Scientific communication", "Educational technology"],
    softSkills: ["Communication", "Patience", "Cultural sensitivity", "Resilience"],
    atsKeywords: ["Biology", "Lesson Planning", "Laboratory Safety", "Curriculum Development", "Student Assessment", "Differentiated Instruction", "STEM Education", "Classroom Management"],
    atsNote: "Use ATS-friendly keywords (lesson planning, laboratory safety, student assessment, curriculum development) and quantify impact — assessment gains, pass rates, lab-incident reduction, advanced-coursework participation.",
  },
  "mathematics-teacher": {
    include:
      "A summary, a Skills section (math domains + EdTech + pedagogy), professional memberships, and Experience with quantified outcomes.",
    length: "One to two pages; use full term 'Mathematics Teacher', simple layout, no tables.",
    hardSkills: ["Algebra / Calculus / Geometry / Statistics", "Lesson planning", "Differentiated instruction", "Formative assessment", "Curriculum development", "Inquiry-based / project-based learning", "EdTech (Desmos, GeoGebra, Google Classroom)", "Data-driven instruction"],
    softSkills: ["Adaptability", "Communication", "Patience", "Dedication"],
    atsKeywords: ["Mathematics", "Algebra", "Calculus", "Curriculum Development", "Differentiated Instruction", "Student Assessment", "Lesson Planning", "Formative Assessment"],
    atsNote: "Use the full term 'Mathematics Teacher' (not 'Math Teacher') and the posting's exact words (algebra, curriculum development, student assessment) plus tools (Desmos, GeoGebra); quantify outcomes ('positive feedback from 90% of students/parents').",
  },
  "computer-science-teacher": {
    include:
      "A summary, a Skills section (languages + pedagogy + platforms), certifications, and Experience with learning-gain and adoption metrics.",
    length: "One to two pages; name the languages and platforms exactly.",
    hardSkills: ["Python / Java / C++", "Curriculum development", "Classroom management", "Project-based learning", "Scratch / robotics", "STEM education", "GitHub Classroom", "Digital literacy"],
    softSkills: ["Communication", "Patience", "Adaptability", "Mentorship"],
    atsKeywords: ["Computer Science", "Python", "Curriculum Development", "Classroom Management", "Project-Based Learning", "STEM Education", "Coding", "Programming"],
    atsNote: "Name languages and tools (Python, Scratch, Robotics, GitHub Classroom) exactly as the posting lists them; quantify learning gains, pass-rate growth, reduced grading time and student-built apps used by real users.",
  },
  "research-scientist": {
    include:
      "A summary, a Skills section (techniques + instrumentation + programming + compliance), a Publications section with journal names, and quantified Experience.",
    length: "One to two pages (or a longer academic CV) — use a CV if publication-heavy.",
    hardSkills: ["Experimental design", "Data analysis (R, Python)", "Lab techniques & instrumentation", "Statistical methods", "Scientific writing", "Grant writing", "GLP / GMP compliance", "Project management"],
    softSkills: ["Analytical thinking", "Collaboration", "Communication", "Rigor"],
    atsKeywords: ["Research", "Experimental Design", "Data Analysis", "Scientific Writing", "Statistical Methods", "Lab Techniques", "Grant Writing", "Publications"],
    atsNote: "Use the standard title 'Research Scientist' (not a creative one) and the posting's keywords (experimental design, data analysis, R/Python) naturally — ATS flags stuffing; name journals and quantify sample sizes, grant amounts and impact factors.",
  },
  "environmental-scientist": {
    include:
      "A headline establishing the target role, a Skills section (GIS + fieldwork + regulatory + lab), and Experience showing scope, outcomes and operating context.",
    length: "One to two pages; 15-25 keywords matched to the posting.",
    hardSkills: ["GIS / ArcGIS", "Environmental monitoring & sampling", "NEPA / CEQA compliance", "Environmental impact assessment", "Water quality & groundwater analysis", "Field sampling (chain of custody)", "Laboratory techniques", "Environmental consulting"],
    softSkills: ["Analytical thinking", "Attention to detail", "Communication", "Problem solving"],
    atsKeywords: ["Environmental Science", "GIS", "Environmental Monitoring", "NEPA Compliance", "Environmental Impact Assessment", "Water Quality", "Field Sampling", "Environmental Compliance"],
    atsNote: "Include GIS/ArcGIS, environmental monitoring and the regulatory frameworks the posting names (NEPA, CEQA, Clean Water Act); fieldwork is foundational, so show proper protocol/chain-of-custody execution and use 15-25 matched keywords.",
  },
  "restaurant-manager": {
    include:
      "A summary, a Skills section grouped (operations + financial + team), certifications (ServSafe), and Experience with P&L-grade metrics.",
    length: "One to two pages; mirror the posting's exact terms (e.g. 'inventory management').",
    hardSkills: ["P&L management", "Inventory & cost control", "Staff scheduling & training", "POS systems (Toast, Square, Micros)", "Reservation platforms (OpenTable, Resy)", "Menu pricing", "Health & safety compliance", "Vendor relations"],
    softSkills: ["Leadership", "Conflict resolution", "Communication", "Decision making"],
    atsKeywords: ["Restaurant Management", "P&L Management", "Inventory Control", "Staff Scheduling", "Cost Management", "POS Systems", "ServSafe", "Customer Service"],
    atsNote: "Show P&L drivers like cover counts, average check and labor-cost % with the metric discipline of any P&L owner; name your POS/reservation/scheduling systems and add ServSafe Manager + TIPS certifications.",
  },
  "concierge": {
    include:
      "A hybrid format leading with a strong skills section (guest relations + PMS + languages), and Experience with a quantified satisfaction metric.",
    length: "One to two pages; reference 2-3 signature platforms hiring managers recognize.",
    hardSkills: ["Guest relations", "Opera PMS", "Reservation management (OpenTable)", "Itinerary & excursion planning", "Transportation coordination", "Complaint resolution", "Local knowledge", "Language proficiency"],
    softSkills: ["Attention to detail", "Discretion", "Communication", "Adaptability"],
    atsKeywords: ["Concierge", "Guest Relations", "Opera PMS", "Customer Service", "Reservation Management", "Conflict Resolution", "Front Desk Operations", "Guest Satisfaction"],
    atsNote: "Lead with guest relations, Opera PMS and conflict resolution, and reference signature tools (Opera PMS, OpenTable); include a quantified achievement ('98% guest satisfaction across 12,000 service requests at a five-star property').",
  },
  "front-desk-agent": {
    include:
      "A summary, a prominent bulleted Skills section (PMS + check-in + cash handling), and Experience with shift-volume and satisfaction metrics.",
    length: "One to two pages; standard headings ('Employment History', 'Skills').",
    hardSkills: ["Guest check-in / check-out", "Property management systems (Opera PMS, Fosse, RoomKey)", "Reservation management", "Cash handling", "Multi-line phone systems", "Complaint resolution", "Upselling", "Loyalty program enrollment"],
    softSkills: ["Customer service", "Multitasking", "Composure", "Communication"],
    atsKeywords: ["Front Desk", "Opera PMS", "Guest Check-In", "Reservation Systems", "Cash Handling", "Customer Service", "Guest Satisfaction", "Lobby Operations"],
    atsNote: "Name your PMS (Opera PMS, Fosse, RoomKey) and include 'cash handling' and 'reservation systems'; quantify check-in volume per shift, guest-satisfaction %, upsell revenue and loyalty-program sign-ups.",
  },
  "travel-agent": {
    include:
      "A summary, a Skills section near the top (GDS + itinerary + destinations + languages), and Experience with revenue/retention metrics.",
    length: "One to two pages; avoid tables/images; mirror the GDS the posting names.",
    hardSkills: ["GDS (Amadeus, Sabre, Galileo)", "Itinerary planning", "Fare calculation", "Booking systems", "Destination knowledge", "CRM platforms", "Travel-segment expertise (corporate/luxury/group)", "Customer service"],
    softSkills: ["Attention to detail", "Communication", "Problem solving", "Sales"],
    atsKeywords: ["Travel Booking", "Amadeus", "Sabre", "GDS", "Itinerary Planning", "Customer Service", "Fare Calculation", "Destination Knowledge"],
    atsNote: "62% of employers name a booking system (Amadeus, Sabre, Galileo) — put yours in a top skills section with destination knowledge and languages; quantify ('280+ corporate accounts, $1.4M annual bookings, 93% retention').",
  },
  "tour-guide": {
    include:
      "A reverse-chronological summary leading with tour scope (group sizes, regions, languages), a Skills section, and Experience with guest-experience metrics.",
    length: "One to two pages; avoid keyword stuffing — modern ATS flags unnatural repetition.",
    hardSkills: ["Itinerary & route planning", "Historical/cultural expertise", "Public speaking", "Group tour operations", "Event coordination", "Booking systems", "First aid", "Language proficiency"],
    softSkills: ["Charisma", "Communication", "Storytelling", "Problem solving"],
    atsKeywords: ["Tour Guide", "Customer Service", "Itinerary Planning", "Public Speaking", "Group Tours", "Guest Experience", "Route Planning", "Cultural Knowledge"],
    atsNote: "Lead with the scope of tours you've run (group sizes, tour types, regions, languages) and use exact keywords (itinerary planning, public speaking, group tour operations); quantify guest experience without stuffing — ATS detects unnatural repetition.",
  },
  "agricultural-technician": {
    include:
      "A 3-4 sentence summary stating specialty in the first seven words + scale, a Skills section (field/lab + precision-ag + certs), and quantified Experience.",
    length: "One to two pages; date certifications and refresh tool/imagery versions for 2026.",
    hardSkills: ["Crop management", "Soil testing & analysis", "Pest control (IPM)", "Irrigation systems", "Precision agriculture / GPS", "GIS & data analysis", "Pesticide application", "Safety protocols"],
    softSkills: ["Attention to detail", "Problem solving", "Communication", "Reliability"],
    atsKeywords: ["Agricultural Technician", "Crop Management", "Soil Testing", "Pest Control", "Precision Agriculture", "Irrigation", "Pesticide Application", "Data Analysis"],
    atsNote: "State your specialty (soil/crop/livestock/precision/irrigation) in the first seven words and quantify scale (acres, plots, samples/week); front-load Pesticide Applicator/CCA certs — many ATS filters key on exact certification strings.",
  },
  "veterinary-assistant": {
    include:
      "A summary, embedded keywords throughout experience (not a separate list), clinical/animal-care skills, and software you've used.",
    length: "One to two pages; include the exact title 'Veterinary Assistant' for ATS.",
    hardSkills: ["Animal restraint & handling", "Surgical assistance", "Medication administration", "Sample collection & phlebotomy", "Veterinary software (Cornerstone, ezyVet, IDEXX Neo)", "Lab work (microscopy, hematology)", "Wound dressing", "Emergency care"],
    softSkills: ["Compassion", "Communication", "Time management", "Teamwork"],
    atsKeywords: ["Veterinary Assistant", "Animal Care", "Animal Restraint", "Medication Administration", "Animal Handling", "Phlebotomy", "Client Communication", "Emergency Care"],
    atsNote: "Put the exact title 'Veterinary Assistant' on the page and embed keywords (animal restraint, medication administration, phlebotomy) inside experience rather than a bare list; name your practice software (Cornerstone, ezyVet, IDEXX Neo).",
  },
  "fleet-manager": {
    include:
      "A summary, a Skills section (fleet ops + maintenance + compliance + telematics), and Experience with uptime and cost metrics.",
    length: "One to two pages; match the posting's exact terms (fleet maintenance software, etc.).",
    hardSkills: ["Fleet operations management", "Preventive maintenance planning", "Fleet maintenance software / telematics", "GPS & route optimization", "DOT/regulatory compliance", "Budget & cost control", "Vendor management", "Safety management"],
    softSkills: ["Leadership", "Attention to detail", "Problem solving", "Communication"],
    atsKeywords: ["Fleet Management", "Preventive Maintenance", "Fleet Operations", "Regulatory Compliance", "Logistics Management", "Cost Reduction", "Telematics", "DOT Compliance"],
    atsNote: "Include 'fleet maintenance software', 'preventive maintenance' and 'regulatory compliance' from the posting and show transportation-law knowledge; quantify uptime gains, cost reductions and safety improvements ('+25%').",
  },
  "customs-officer": {
    include:
      "A summary (years + specialization + biggest proof point), a Skills section (compliance + inspection + risk), and Experience with quantified enforcement results.",
    length: "One to two pages; strong action verbs (inspect, conduct, seize, train).",
    hardSkills: ["Customs & border regulations", "Cargo & baggage inspection", "Document examination", "Risk assessment", "Fraud detection", "Contraband seizure", "Entry-process management", "Surveillance technology"],
    softSkills: ["Integrity", "Attention to detail", "Communication", "Decision making"],
    atsKeywords: ["Customs", "Border Security", "Regulatory Compliance", "Risk Assessment", "Inspection", "Document Examination", "Fraud Detection", "Enforcement"],
    atsNote: "Show knowledge of customs/border-security law and use exact keywords (regulatory compliance, risk assessment, document examination); use action verbs (inspect, conduct, seize) and quantify inspections, seizures and processing volumes.",
  },
  "facilities-manager": {
    include:
      "A summary, a Skills section grouped by category (building systems + operations + maintenance + software), certifications, and Experience with cost/uptime metrics.",
    length: "One to two pages; group skills into clear categories for skimming.",
    hardSkills: ["Facility management (FM)", "Building operations", "Preventive maintenance", "HVAC / electrical / plumbing systems", "Space planning", "Vendor & contract management", "Building Management System (BMS)", "HSE / fire & life safety compliance"],
    softSkills: ["Leadership", "Problem solving", "Communication", "Adaptability"],
    atsKeywords: ["Facilities Management", "Building Operations", "Preventive Maintenance", "HVAC", "Space Planning", "Vendor Management", "Contract Negotiation", "Health & Safety"],
    atsNote: "Group skills (Building Systems / Operations / Maintenance / Software) and use posting keywords (facilities management, building operations, preventive maintenance, HVAC); add Certified Facility Manager (CFM) / OSHA and quantify cost savings and uptime.",
  },
  "office-manager": {
    include:
      "A 2-3 sentence summary, a Skills section (15-25 keywords), evidence of leadership, and Experience with quantified savings/productivity.",
    length: "One to two pages; weave keywords into a compelling intro and bullets.",
    hardSkills: ["Office operations", "Vendor management", "Budget administration", "Facilities coordination", "Onboarding", "Microsoft Office Suite", "Calendar & scheduling", "Records management"],
    softSkills: ["Communication", "Interpersonal skills", "Attention to detail", "Cross-functional leadership"],
    atsKeywords: ["Office Operations", "Vendor Management", "Budget Administration", "Facilities Coordination", "Onboarding", "Microsoft Office", "Office Administration", "Scheduling"],
    atsNote: "Use 15-25 matched keywords led by Office Operations, Vendor Management and Budget Administration (highest-frequency: communication, MS Office, interpersonal); show leadership instances and quantify money saved / productivity gained.",
  },
  "personal-assistant": {
    include:
      "A summary, a 6-10 item Skills section (executive support + tools), and Experience with quantified accomplishments using the posting's exact terms.",
    length: "One to two pages; mirror terms like 'confidentiality' and 'support high-level executives'.",
    hardSkills: ["Calendar management", "Travel coordination", "Meeting preparation", "Expense reports (Concur)", "Microsoft Office (advanced Excel/PowerPoint)", "Google Workspace", "Executive communication", "Project coordination"],
    softSkills: ["Discretion", "Organization", "Time management", "Adaptability"],
    atsKeywords: ["Executive Support", "Calendar Management", "Travel Coordination", "Confidentiality", "Microsoft Office", "Expense Reports", "Meeting Preparation", "Administrative Support"],
    atsNote: "Use the listing's exact terms ('confidentiality', 'support high-level executives', 'proactively resolve issues') and name tools (Concur, advanced Excel/PowerPoint, Google Workspace); quantify your accomplishments.",
  },
  "virtual-assistant": {
    include:
      "A summary, a categorized Skills section (admin + communication + technical), remote 'trust signals', and Experience with quantified output.",
    length: "One to two pages; simple layout, keywords verbatim from the job ad.",
    hardSkills: ["Data entry", "Calendar & email management", "Travel arrangements", "CRM software", "Project management tools (Asana, Trello)", "Social media scheduling", "Customer service", "Basic HTML"],
    softSkills: ["Self-starter", "Async communication", "Time management", "Confidentiality"],
    atsKeywords: ["Virtual Assistant", "Calendar Management", "CRM Management", "Data Entry", "Email Management", "Social Media Scheduling", "Travel Logistics", "Administrative Support"],
    atsNote: "Infuse keywords verbatim (missing 'CRM management', 'travel logistics' or 'social media scheduling' filters you out) and add remote trust signals ('async communication', 'self-starter', 'confidentiality'); specify tools precisely (Excel: Pivot Tables, VLOOKUP).",
  },
  "data-entry-clerk": {
    include:
      "A summary emphasizing accuracy and speed, a Skills section (software + accuracy + speed), and Experience with volume and error-rate metrics.",
    length: "One to two pages; match software names exactly to the posting.",
    hardSkills: ["Data entry (10-key, typing speed)", "Microsoft Excel (data validation)", "Database software", "Salesforce / CRM data entry", "Records management", "Data verification & QA", "Invoice processing", "Document scanning"],
    softSkills: ["Accuracy", "Attention to detail", "Time management", "Reliability"],
    atsKeywords: ["Data Entry", "Data Accuracy", "Typing Speed", "Microsoft Excel", "Data Validation", "Database Management", "Records Management", "10-Key"],
    atsNote: "Match software names exactly to the posting and quantify everything — records/day, error rate, backlog cleared, audit pass rate ('250+ records/day into Salesforce at 99.8% accuracy'; '150 invoices/week, backlog −50%').",
  },
  "icu-nurse": {
    include:
      "A header with RN + CCRN credentials, a 3-4 line summary (ICU acuity + outcomes), a Skills section (critical-care + EHR + certs), and quantified Experience.",
    length: "One to two pages; break skills into 2-4 categories; ATS-safe fonts, no tables.",
    hardSkills: ["Critical-care monitoring", "Ventilator management (AC/VC, PRVC, APRV)", "Invasive lines (A-line, CVP, PA catheter)", "Patient assessment", "Medication & smart-pump administration", "Waveform interpretation", "EHR (Epic Beacon, Cerner iView)", "Wound care"],
    softSkills: ["Critical thinking", "Empathy", "Communication", "Composure under pressure"],
    atsKeywords: ["ICU", "Critical Care", "CCRN", "Ventilator Management", "Invasive Monitoring", "ACLS", "Patient Assessment", "Epic"],
    atsNote: "Put RN + CCRN by your name and ACLS/TNCC up top; name your EHR and modules (Epic Beacon, Cerner iView) and list ventilator modes/invasive lines exactly (AC/VC, PRVC, A-line, CVP, PA catheter); quantify recovery rates and reduced medication errors.",
  },
  "er-nurse": {
    include:
      "A header with RN + specialty credentials, a categorized Skills section (emergency care + tech), certifications (BLS/ACLS/PALS/CEN), and quantified Experience.",
    length: "One to two pages; 2-4 skill categories max; ATS-safe formatting.",
    hardSkills: ["Triage", "Emergency & trauma care", "Patient assessment", "IV therapy", "Medication administration", "Wound care", "EHR (Epic, Cerner, Meditech)", "Pyxis medication management"],
    softSkills: ["Critical thinking", "Patient advocacy", "Communication", "Composure under pressure"],
    atsKeywords: ["Triage", "Emergency Care", "ACLS", "Trauma Care", "IV Therapy", "CEN", "Patient Assessment", "Epic"],
    atsNote: "Use exact keywords (ACLS, Trauma Care, IV Therapy, Triage) and list BLS/ACLS/PALS/CEN; name your EHR + modules and break skills into 2-4 categories (Emergency Care / Technology); quantify patient volume and outcomes.",
  },
  "pediatric-nurse": {
    include:
      "A header with RN + CPN, a summary, a Skills section (pediatric clinical + EHR + certs), and Experience noting subspecialty (NICU/oncology) and family-centered care.",
    length: "One to two pages; ATS-compatible fonts (Rubik, Lato), no tables/columns/images.",
    hardSkills: ["Pediatric assessment", "Pediatric medication administration", "Pediatric IV insertion", "Neonatal resuscitation", "Vital signs monitoring", "Emergency response (PALS)", "EHR (Epic, Cerner)", "Patient & family communication"],
    softSkills: ["Empathy", "Communication with children", "Teamwork", "Patience"],
    atsKeywords: ["Pediatric Nursing", "PALS", "CPN", "Pediatric Medication Administration", "Neonatal Resuscitation", "Patient Assessment", "Family-Centered Care", "Epic"],
    atsNote: "Put RN + CPN (Certified Pediatric Nurse) and PALS/NRP up front, and use keywords like 'pediatric medication administration' and 'neonatal resuscitation'; mention subspecialty (oncology, cardiology, NICU) and family-centered care.",
  },
  "oncology-nurse": {
    include:
      "A header with RN + OCN, a summary, a Skills section (chemo + clinical + EHR), and Experience using reverse-chronological clinical roles.",
    length: "One to two pages; clear headings (education/experience/skills/certifications).",
    hardSkills: ["Chemotherapy administration", "Pain management", "IV therapy & port access", "Radiation safety", "Patient education & support", "Oncology clinical trials", "EMR (Epic, Cerner)", "Blood transfusion safety"],
    softSkills: ["Empathy", "Patient advocacy", "Critical thinking", "Team collaboration"],
    atsKeywords: ["Oncology Nursing", "Chemotherapy Administration", "OCN", "Pain Management", "Patient Education", "IV Therapy", "Radiation Safety", "Clinical Trials"],
    atsNote: "Lead with 'Chemotherapy Administration' and OCN (Oncology Certified Nurse), plus ACLS/PALS and chemo/transfusion-safety certs; use keywords like 'patient education and support', 'pain management' and 'oncology clinical trials'.",
  },
  "travel-nurse": {
    include:
      "A header with RN + active license #, a Skills section (15-25 clinical/tech keywords), every EMR you've used, and Experience showing multi-facility adaptability.",
    length: "One to two pages; simple labeled sections, no images/non-standard fonts.",
    hardSkills: ["Patient assessment", "Medication administration", "IV therapy", "Care planning", "Wound care", "Barcode medication administration (BCMA)", "EHR (Epic, Cerner, Meditech)", "Rapid onboarding"],
    softSkills: ["Adaptability", "Communication", "Independence", "Teamwork"],
    atsKeywords: ["Travel Nursing", "Patient Assessment", "IV Therapy", "ACLS", "BLS", "Epic", "Cerner", "RN License"],
    atsNote: "Include your active RN license number and copy 15-25 clinical/cert keywords straight from the posting; list every EMR you've documented in (Epic + modules, Cerner, Meditech) in order of proficiency — travel experience signals flexibility and fast onboarding.",
  },
  "anesthesiologist": {
    include:
      "A summary led by board status, a prominent Certifications section, a Skills section (anesthesia technical + safety), and Experience with case volumes.",
    length: "One to two pages (or academic CV); make current board standing obvious at a glance.",
    hardSkills: ["General & regional anesthesia", "Airway management", "Pharmacology", "Patient monitoring", "Pain management", "Anesthetic machines & monitors", "Patient safety", "Perioperative assessment"],
    softSkills: ["Composure under pressure", "Communication", "Vigilance", "Team collaboration"],
    atsKeywords: ["Anesthesiology", "Board Certified", "Regional Anesthesia", "Airway Management", "Pain Management", "ACLS", "Patient Safety", "Patient Assessment"],
    atsNote: "Board certification is a hiring filter, not decoration — lead with board status + ACLS/PALS and make current standing obvious; use keywords like 'regional anesthesia', 'airway management', 'patient safety' and quantify procedures performed.",
  },
  "cardiologist": {
    include:
      "A summary, a Certifications & Licenses section (board certified/eligible), a Skills section (procedures + diagnostics + EMR), and Research/Affiliations.",
    length: "One to two pages (or academic CV); reverse-chronological, clean headings.",
    hardSkills: ["Cardiac catheterization", "Echocardiography", "EKG interpretation", "Stress test analysis", "Pacemaker implantation", "Nuclear cardiology", "CT angiography", "EPIC / ICD-10"],
    softSkills: ["Clinical judgment", "Communication", "Collaboration", "Patient focus"],
    atsKeywords: ["Cardiology", "Board Certified", "Cardiac Catheterization", "Echocardiography", "EKG Interpretation", "Patient Care", "Nuclear Cardiology", "ICD-10"],
    atsNote: "State 'Board Certified (or Eligible) in Cardiology' plus state license up front, and include procedure/diagnostic keywords (cardiac catheterization, echocardiography, EKG interpretation); add Research/Presentations/Affiliations and EPIC + ICD-10.",
  },
  "radiologist": {
    include:
      "A summary identifying you as board-certified, a Skills section (modalities + software), board certifications/affiliations, and skill-action-result Experience.",
    length: "One to two pages (or academic CV); spell out modality + acronym.",
    hardSkills: ["Computed tomography (CT)", "Magnetic resonance imaging (MRI)", "Ultrasound imaging", "PET/CT", "X-ray radiography", "Interventional procedures", "PowerScribe 360", "Diagnostic interpretation"],
    softSkills: ["Diagnostic acumen", "Communication", "Interdisciplinary collaboration", "Attention to detail"],
    atsKeywords: ["Radiology", "Diagnostic Imaging", "Board Certified", "CT", "MRI", "Ultrasound", "Radiation Safety", "PACS"],
    atsNote: "List ABR (American Board of Radiology) certification and use both full term + acronym ('Magnetic Resonance Imaging (MRI)'); embed 'diagnostic imaging', 'radiation safety' and 'interdisciplinary collaboration', and use skill-action-result bullets tied to patient outcomes.",
  },
  "surgeon": {
    include:
      "A summary (expertise + leadership + precision), a dedicated Certifications section (board + license + ACLS/ATLS), a Skills section, and case-volume Experience.",
    length: "One to two pages (or academic CV); Arial/Calibri 10-12pt, bold headings, bullets.",
    hardSkills: ["Surgical procedures (open & minimally invasive)", "Preoperative assessment", "Postoperative care", "Surgical technique", "Patient safety", "Sterile technique", "Clinical decision making", "EMR"],
    softSkills: ["Precision", "Leadership", "Communication", "Composure under pressure"],
    atsKeywords: ["Surgery", "Board Certified", "Surgical Procedures", "Patient Care", "ACLS", "ATLS", "Perioperative Care", "Clinical Outcomes"],
    atsNote: "Always list board certification, state licensure and ACLS/ATLS in a dedicated section; include 'surgical procedures' and 'patient care', and quantify case volumes, complication rates and recovery-time reductions — metrics also boost ATS matching.",
  },
  "pediatrician": {
    include:
      "A 2-3 sentence summary, a Certifications section (ABP, PALS, NRP), a balanced Skills section (clinical + soft), and measurable Experience.",
    length: "One to two pages (or academic CV); standard sections in expected order.",
    hardSkills: ["Pediatric physical examinations", "Immunization administration", "Growth & development monitoring", "Neonatal care", "Diagnostic interpretation", "Pediatric asthma/preventive care", "EMR (Epic, Cerner)", "Telehealth"],
    softSkills: ["Bedside manner", "Communication with children & families", "Empathy", "Patience"],
    atsKeywords: ["Pediatrics", "Board Certified", "Immunization", "Pediatric Care", "Neonatal Care", "Patient Assessment", "Epic", "Preventive Medicine"],
    atsNote: "Include ABP (American Board of Pediatrics) certification, PALS and NRP plus state license, and weave keywords like 'pediatric care' and 'immunization'; emphasize bedside manner and family communication, with measurable achievements.",
  },
  "psychiatrist": {
    include:
      "A summary stating board-certified + expertise areas, a Certifications section (ABPN), a Skills section (assessment + treatment), and publications if any.",
    length: "One to two pages (or academic CV); standard layout, ATS-safe.",
    hardSkills: ["Psychiatric assessment & diagnosis", "Treatment planning", "Psychopharmacology / medication management", "Psychotherapy (CBT)", "Mood & anxiety disorders", "Risk assessment", "EMR", "DSM-5 diagnosis"],
    softSkills: ["Empathy", "Active listening", "Communication", "Clinical judgment"],
    atsKeywords: ["Psychiatry", "Board Certified", "Medication Management", "Treatment Plans", "Psychotherapy", "Patient Assessment", "Diagnosis", "Psychopharmacology"],
    atsNote: "Include ABPN (American Board of Psychiatry and Neurology) certification with year and use exact job-ad terms (Diagnosis, Treatment Plans, Psychotherapy, Medication Management); name expertise areas (mood disorders, psychopharmacology, CBT) and list journal publications.",
  },
  "sonographer": {
    include:
      "A summary, a Skills section (modalities + PACS + patient care), ARDMS/ARRT certifications, and Experience targeting each bullet to a posting requirement.",
    length: "One to two pages; swap in keywords from the listing in the skills section.",
    hardSkills: ["Diagnostic medical sonography", "Abdominal/OB-GYN/vascular ultrasound", "Ultrasound equipment operation", "Patient positioning & assessment", "PACS", "Image optimization", "Doppler", "BLS"],
    softSkills: ["Attention to detail", "Patient communication", "Teamwork", "Empathy"],
    atsKeywords: ["Sonography", "ARDMS", "Diagnostic Imaging", "Ultrasound", "PACS", "Vascular", "Patient Care", "Medical Imaging"],
    atsNote: "List ARDMS (and RDCS/ARRT where applicable) plus BLS/ACLS, and use 'diagnostic imaging', 'ultrasound technology' and 'patient assessments'; target each bullet to a posting requirement and name your modalities (abdominal, OB-GYN, vascular).",
  },
  "mri-technologist": {
    include:
      "A summary, ARRT-MRI certification listed prominently, a Skills section (imaging + safety + PACS), and Experience with positioning and image-acquisition detail.",
    length: "One to two pages; standard titles, Arial/Times, PDF/.docx, no tables/images.",
    hardSkills: ["MRI image acquisition", "Patient positioning", "MRI safety & screening", "Sequence selection", "Radiation/quality assurance", "PACS / CR / DR", "Contrast administration", "Patient care"],
    softSkills: ["Attention to detail", "Patient communication", "Composure", "Teamwork"],
    atsKeywords: ["MRI", "ARRT", "Radiology", "Patient Care", "Medical Imaging", "MRI Safety", "PACS", "Patient Positioning"],
    atsNote: "List ARRT(MR) certification prominently plus BLS/MRI Safety Officer, and include 'MRI', 'radiology', 'patient care' and PACS/CR/DR; describe patient positioning, safety screening and image acquisition. Add ASRT/RSNA membership.",
  },
  "dermatologist": {
    include:
      "A board-certified summary, an Education & Certifications section (ABD + license), a Skills section (procedures + EMR), and reverse-chronological Experience.",
    length: "One to two pages (or academic CV); traditional layout, Arial/Times, PDF/.docx.",
    hardSkills: ["Skin disease diagnosis", "Skin biopsy techniques", "Laser therapy / phototherapy", "Skin cancer treatment", "Chronic skin disorder management (psoriasis, eczema)", "Dermatoscopy", "Teledermatology", "EMR (Epic, Cerner)"],
    softSkills: ["Patient communication", "Empathy", "Attention to detail", "Clinical judgment"],
    atsKeywords: ["Dermatology", "Board Certified", "Skin Cancer Treatment", "Dermatology Procedures", "Laser Therapy", "Patient Care", "Skin Biopsy", "Teledermatology"],
    atsNote: "Include American Board of Dermatology certification and state license, and use keywords like 'dermatology procedures', 'skin cancer treatment' and 'laser therapy'; name dermatoscope/EMR proficiency and use a reverse-chronological ATS-safe layout.",
  },
  "account-executive": {
    include:
      "A summary, a 6-8 item Skills section (sales motion + CRM + methodology), and Experience where every bullet carries a number.",
    length: "One to two pages; tailor to the posting, ATS weights the skills section.",
    hardSkills: ["B2B sales", "Pipeline management", "Quota attainment", "Salesforce CRM", "Prospecting & cold calling", "Contract negotiation", "Sales methodology (MEDDPICC, Challenger)", "Subscription / SaaS sales"],
    softSkills: ["Consultative selling", "Communication", "Resilience", "Relationship building"],
    atsKeywords: ["Account Executive", "B2B Sales", "Quota Attainment", "Pipeline Management", "Salesforce", "Contract Negotiation", "Revenue Growth", "Client Acquisition"],
    atsNote: "Every bullet must include a number — quota attainment %, revenue closed, deal size, pipeline coverage, close rate; name your CRM (Salesforce) and methodology (MEDDPICC, Challenger), and include 'customer success'/'subscription sales' for SaaS roles.",
  },
  "regional-sales-manager": {
    include:
      "A summary, a Skills section (sales leadership + CRM/tools + territory), and Experience quantifying regional growth and quota.",
    length: "One to two pages; use specific terms (sales forecasting, territory management), not broad ones.",
    hardSkills: ["Sales management & coaching", "Territory planning", "B2B / consultative selling", "Contract negotiation", "Sales forecasting", "CRM (Salesforce, HubSpot)", "Performance management", "Market development"],
    softSkills: ["Leadership", "Communication", "Strategic thinking", "Coaching"],
    atsKeywords: ["Regional Sales Manager", "Territory Management", "Sales Management", "Team Leadership", "Sales Forecasting", "Salesforce", "Contract Negotiation", "Revenue Growth"],
    atsNote: "Use powerful territory keywords ('territory management', 'geographic expansion', 'market development') and name CRM/tools (Salesforce, Gong, Sales Navigator); quantify regional sales %, quota beats and market-share expansion.",
  },
  "inside-sales-representative": {
    include:
      "A summary, a Skills section (CRM + prospecting + closing), and role-relevant Experience bullets that surface the keywords in context.",
    length: "One to two pages; weave 'inside sales', 'lead qualification', 'pipeline' naturally.",
    hardSkills: ["Cold calling", "Lead qualification", "Pipeline management", "Salesforce / HubSpot CRM", "Email outreach", "Product demos", "Quota achievement", "Sales analytics"],
    softSkills: ["Communication", "Persistence", "Active listening", "Problem solving"],
    atsKeywords: ["Inside Sales", "CRM", "Cold Calling", "Pipeline Management", "Lead Qualification", "Salesforce", "Quota Achievement", "Product Demos"],
    atsNote: "Use 'inside sales', 'lead qualification', 'CRM', 'pipeline' and 'closing' naturally in summary, skills and bullets; name the exact CRM the posting repeats (e.g. Salesforce) — but only skills you can speak to in interview.",
  },
  "key-account-manager": {
    include:
      "A summary with top keywords up front, a Skills section (account growth + negotiation + CRM), and Experience pairing each keyword with a metric.",
    length: "One to two pages; ATS weights the top — keywords in summary, titles, first bullets.",
    hardSkills: ["Key account management", "Strategic account planning", "Executive relationship management", "Contract negotiation", "Upselling & cross-selling", "Client retention", "QBR facilitation", "Salesforce / SAP"],
    softSkills: ["Relationship building", "Consultative selling", "Communication", "Strategic thinking"],
    atsKeywords: ["Key Account Management", "Account Planning", "Client Retention", "Revenue Growth", "Contract Negotiation", "Upselling", "Relationship Management", "Salesforce"],
    atsNote: "Put the top keywords (key account management, executive relationship management, revenue growth, QBR) in your summary and first bullets — ATS weights the top; pair each with an outcome/metric/scope, and name CRM/ERP (Salesforce, SAP, Dynamics).",
  },
  "enterprise-account-executive": {
    include:
      "A summary naming complex-sales keywords, a 10-15 item Skills section (enterprise motion + methodology + stack), and metric-rich Experience.",
    length: "One to two pages; mirror exact methodology/platform names from the posting.",
    hardSkills: ["Enterprise sales", "Complex deal management", "C-suite / multi-threaded selling", "Solution & value selling", "Long sales cycles", "Sales methodology (MEDDIC, Challenger, SPIN)", "Salesforce + Outreach/Gong/Clari", "Forecasting"],
    softSkills: ["Executive presence", "Consultative selling", "Resilience", "Cross-functional collaboration"],
    atsKeywords: ["Enterprise Sales", "Strategic Selling", "C-Suite Selling", "Complex Deal Management", "Solution Selling", "MEDDIC", "Salesforce", "Revenue Growth"],
    atsNote: "Put 'complex sales cycles', 'C-level relationships' and 'solution selling' in your summary, list a methodology (MEDDIC/Challenger/SPIN) and the stack (Salesforce, Outreach, Gong, Clari); quantify ('grew territory 30%, 10 new logos in 12 months').",
  },
  "business-development-representative": {
    include:
      "A tight 2-3 line summary, 4-6 quantified bullets per role, and a Skills section surfacing high-signal outbound terms + your stack.",
    length: "One to two pages; numbers on every accomplishment.",
    hardSkills: ["Outbound prospecting", "Cold calling & cold email", "Email sequencing", "Lead qualification", "CRM (Salesforce, HubSpot)", "Engagement platforms (Outreach, SalesLoft)", "Prospecting tools (ZoomInfo, Sales Navigator)", "Pipeline generation"],
    softSkills: ["Communication", "Resilience", "Objection handling", "Teamwork"],
    atsKeywords: ["Business Development", "Outbound Prospecting", "Cold Calling", "Pipeline Generation", "Lead Qualification", "Salesforce", "Quota Attainment", "Social Selling"],
    atsNote: "Surface high-signal terms (Outbound Prospecting, Cold Email, Cold Calling, Pipeline Generation) and name your stack (Salesforce/HubSpot, Outreach/SalesLoft, ZoomInfo, Gong); attach numbers to every line ('qualified 250+ opportunities', '100 new clients').",
  },
  "talent-acquisition-specialist": {
    include:
      "A summary with 5-7 high-priority keywords, a Skills section (full-cycle + ATS tools + analytics), and Experience with time-to-fill and pipeline metrics.",
    length: "One to two pages; include the exact title 'Talent Acquisition Specialist'.",
    hardSkills: ["Full-cycle recruiting", "Boolean sourcing", "High-volume / technical recruiting", "ATS (Greenhouse, Workday, Lever)", "LinkedIn Recruiter", "Stakeholder management", "Employer branding", "Recruitment analytics"],
    softSkills: ["Communication", "Relationship building", "Adaptability", "Negotiation"],
    atsKeywords: ["Talent Acquisition", "Full-Cycle Recruiting", "Sourcing", "ATS", "High-Volume Recruiting", "Greenhouse", "Stakeholder Management", "Time-to-Fill"],
    atsNote: "Put the exact title and 5-7 keywords in the summary ('full-cycle recruiting, Boolean sourcing, Greenhouse ATS'); add 2026 high-value terms (AI sourcing, predictive analytics, DEI) and quantify reduced time-to-fill and diverse-pipeline gains.",
  },
  "hr-business-partner": {
    include:
      "A concise summary with strategic keywords, a Skills section (strategic HR + change + HRIS), and Experience with engagement/retention metrics.",
    length: "One to two pages; single-column, no tables/graphics.",
    hardSkills: ["Strategic HR / talent strategy", "Organizational design & development", "Change management", "Workforce planning", "Succession planning", "Performance management", "Employee relations", "HRIS (Workday, SAP SuccessFactors)"],
    softSkills: ["Stakeholder management", "Coaching", "Business acumen", "Communication"],
    atsKeywords: ["HR Business Partner", "Strategic HR", "Organizational Development", "Change Management", "Workforce Planning", "Succession Planning", "Stakeholder Management", "Employee Relations"],
    atsNote: "Include the strategic baseline keywords (Stakeholder Management, Succession Planning, Organizational Design, Change Management, Data-Driven Insights) — a resume full of 'benefits administration' but missing these gets screened as 'too junior'; quantify engagement-score gains.",
  },
  "it-project-manager": {
    include:
      "A summary stating methodology + certification + delivery scale in the first 4 lines, a Skills section, and Experience embedding keywords in context.",
    length: "One to two pages; the summary is the most heavily weighted ATS section.",
    hardSkills: ["Project planning", "Agile / Scrum / Waterfall", "Risk management", "Budget & timeline management", "Stakeholder management", "Jira / MS Project / Smartsheet", "Cross-functional team leadership", "Change management"],
    softSkills: ["Leadership", "Communication", "Problem solving", "Negotiation"],
    atsKeywords: ["Project Management", "Agile", "Scrum", "PMP", "Stakeholder Management", "Risk Management", "Jira", "Budget Management"],
    atsNote: "Put methodology + certification (PMP/PRINCE2/CSM) + delivery scale (budget, team size) in the first 4 lines; copy multi-word phrases exactly ('Agile methodology') and embed keywords in context ('managed portfolio in Jira' beats a bare 'Jira').",
  },
  "procurement-officer": {
    include:
      "A summary, a Skills section (sourcing + negotiation + software), and Experience with quantified savings and compliance metrics.",
    length: "One to two pages; 97% of firms use ATS — exact keywords are mandatory.",
    hardSkills: ["Strategic sourcing", "Vendor management", "Contract negotiation", "Spend analysis", "RFP/RFQ management", "Cost reduction", "Supplier relationship management", "SAP Ariba / Oracle"],
    softSkills: ["Negotiation", "Analytical thinking", "Communication", "Stakeholder management"],
    atsKeywords: ["Procurement", "Strategic Sourcing", "Vendor Management", "Contract Negotiation", "Spend Analysis", "RFP Management", "Cost Reduction", "Supply Chain"],
    atsNote: "Missing 'Strategic Sourcing', 'Spend Analysis' or 'Contract Negotiation' can auto-disqualify you; name your e-procurement software (SAP Ariba, Oracle) and quantify cost savings, efficiency and compliance metrics.",
  },
  "branch-manager": {
    include:
      "A summary, a Skills section mixing operations + leadership + (for banking) regulatory terms, and Experience with revenue and compliance metrics.",
    length: "One to two pages; review the posting and match keywords closely.",
    hardSkills: ["Branch operations", "Sales coaching", "Customer relationship management", "Risk management", "Staff development", "P&L / performance management", "Core banking systems / CRM", "AML / KYC (banking)"],
    softSkills: ["Leadership", "Communication", "Problem solving", "Relationship building"],
    atsKeywords: ["Branch Operations", "Sales Coaching", "Risk Management", "Customer Relationship Management", "Team Leadership", "P&L Management", "Staff Development", "Compliance"],
    atsNote: "Use 'branch operations', 'sales coaching' and 'risk management' (add AML/KYC, credit scoring, core banking for banks); quantify revenue growth, deposit/loan volume, audit results and customer-satisfaction or wait-time improvements.",
  },
  "plant-manager": {
    include:
      "A 3-5 sentence summary quantifying impact, a Skills section (manufacturing + lean + ERP), certifications, and metric-rich Experience.",
    length: "One to two pages; mirror the posting's terms (Lean Manufacturing, team leadership).",
    hardSkills: ["Manufacturing operations", "Lean Six Sigma implementation", "Quality assurance & control", "Root cause analysis", "Financial/P&L management", "Safety compliance (OSHA)", "ERP (SAP, Oracle)", "Process optimization"],
    softSkills: ["Leadership", "Problem solving", "Communication", "Team development"],
    atsKeywords: ["Plant Management", "Manufacturing Operations", "Lean Manufacturing", "Process Optimization", "Quality Control", "Cost Reduction", "Safety Compliance", "Team Leadership"],
    atsNote: "Feature 'Lean Manufacturing', 'process optimization', 'cost reduction' and 'team development', and name ERP (SAP, Oracle); add CMRP/CPE and quantify throughput, cost savings, safety records and OEE with action verbs (Achieved, Led).",
  },
  "assembler": {
    include:
      "A summary, a Skills section (assembly techniques + tools + QC), and Experience quantifying units/hour, defect rate and on-time work orders.",
    length: "One page; fill with industry keywords (mechanical assembly, blueprints).",
    hardSkills: ["Mechanical assembly", "Blueprint / technical-document reading", "Soldering / PCB assembly", "Power & hand tools", "Quality control inspection", "Assembly line operation", "Lean manufacturing", "Fastening / fitting"],
    softSkills: ["Attention to detail", "Physical stamina", "Teamwork", "Reliability"],
    atsKeywords: ["Assembly", "Mechanical Assembly", "Blueprint Reading", "Soldering", "Quality Control", "Lean Manufacturing", "Power Tools", "Production"],
    atsNote: "Fill the resume with industry keywords (mechanical assembly, AutoCAD, blueprints, soldering for electronics) and name tools (AutoCAD, SAP ERP); quantify units assembled/hour, defect rates and on-time work-order completion.",
  },
  "quality-control-inspector": {
    include:
      "A summary (title + years + industry), a Skills section (measurement tools + methods + standards), certifications, and Experience with defect/savings metrics.",
    length: "One to two pages; standard headings, keywords from the posting.",
    hardSkills: ["Inspection & reporting", "Calipers / micrometers / CMM", "GD&T", "ISO 9001 auditing", "Root cause analysis", "Six Sigma", "Quality audits", "Final product release"],
    softSkills: ["Attention to detail", "Analytical thinking", "Communication", "Integrity"],
    atsKeywords: ["Quality Control", "Quality Assurance", "Inspection", "GD&T", "ISO 9001", "Calipers", "Root Cause Analysis", "Six Sigma"],
    atsNote: "Name your measurement tools (calipers, micrometers, CMM) and methods (GD&T, ISO 9001 auditing, Six Sigma) exactly, and state your industry (manufacturing, aerospace, food); quantify defect-detection improvements, scrap reduction and dollars saved.",
  },
  // ── Batch 19 (sourced via live SERP 2026: StandOut-CV, Jobseeker, ResumeWorded, Zety, Resumaker, TealHQ, ResumeMentor, MyPerfectResume, ZipRecruiter) ──
  // Priorities this batch: skilled trades, plus remaining physician & finance specialties.
  "roofer": {
    include:
      "Your name and contact details, a short professional summary highlighting your roofing experience and safety record, a core-skills section, work experience in reverse chronological order with measurable detail (square footage, project values, safety record), and education listing apprenticeships and safety certifications (OSHA, Red Seal where applicable).",
    length:
      "One page is plenty — recruiters scan in seconds, so lead with your strongest install and repair experience and current safety tickets, and quantify with years, projects and square footage.",
    hardSkills: ["Shingle & tile installation", "Flat & pitched roofing", "Roof inspection & repair", "Flashing & waterproofing", "Material handling", "Working at height", "Blueprint reading"],
    softSkills: ["Reliability", "Safety awareness", "Teamwork", "Physical stamina", "Attention to detail"],
    atsKeywords: ["Roof Installation", "Shingle Installation", "Roof Repair", "Flashing", "Waterproofing", "OSHA", "Fall Protection", "Material Handling"],
    atsNote:
      "Mirror the posting's exact terms (\"shingle installation\", \"flat roofing\", \"flashing\") and name your safety tickets (OSHA 30, fall protection, Red Seal); a clean single-column layout parses reliably, and square-footage and safety-record numbers add credibility.",
  },
  "plasterer": {
    include:
      "Your contact details, a short profile of your plastering experience and finishes, a core-skills section, work experience covering the type of work (rendering, skimming, dry-lining) with project detail, and education listing your NVQ or apprenticeship and health-and-safety training.",
    length:
      "Keep it to one page — a targeted core-skills list plus quantified experience (project sizes, finishes, years) reads better than a long duty list.",
    hardSkills: ["Skimming & floating", "Rendering", "Dry-lining", "Plasterboard fixing", "Decorative & ornamental plaster", "Mixing materials", "Surface preparation"],
    softSkills: ["Attention to detail", "Reliability", "Time management", "Teamwork", "Customer communication"],
    atsKeywords: ["Plastering", "Skimming", "Rendering", "Dry Lining", "Plasterboard", "Surface Preparation", "NVQ"],
    atsNote:
      "List the finishes and methods a posting names exactly (\"skimming\", \"rendering\", \"dry-lining\") plus your NVQ level and CSCS/health-and-safety training; quantify with project sizes and finishes completed.",
  },
  "painter-decorator": {
    include:
      "Your contact details, a personal profile of your decorating experience and areas of expertise, a core-skills section, work experience across domestic and commercial projects with measurable detail, and education listing your NVQ or apprenticeship and health-and-safety training (COSHH, working at height).",
    length:
      "One page is right — lead with a targeted core-skills section matched to the advert and quantify with project values, property counts and years.",
    hardSkills: ["Surface preparation", "Paint application & spraying", "Wallpapering", "Colour matching", "Decorative finishes", "Access equipment", "Estimating & quoting"],
    softSkills: ["Attention to detail", "Customer communication", "Time management", "Reliability", "Tidiness"],
    atsKeywords: ["Painting and Decorating", "Surface Preparation", "Spray Painting", "Wallpapering", "Colour Matching", "COSHH", "NVQ"],
    atsNote:
      "Match the advert's wording (\"surface preparation\", \"spray painting\", \"wallpapering\") and show health-and-safety awareness (COSHH, PPE, working at height) plus your NVQ Level 2/3; a simple single-column CV parses cleanly.",
  },
  "laboratory-technician": {
    include:
      "Your contact details, a professional summary, a skills section grouped by category (techniques, instruments, software) near the top, work experience with measurable outcomes, certifications, and education.",
    length:
      "One page for most lab technicians; group your skills when you have ten or more, and keep the strongest hard skills high on page one where recruiters and the ATS scan first.",
    hardSkills: ["Specimen processing", "Hematology & chemistry analyzers", "Microscopy", "Quality control (QC/QA)", "LIMS software", "CLIA/CAP compliance", "Equipment calibration & maintenance"],
    softSkills: ["Attention to detail", "Problem solving", "Time management", "Communication", "Teamwork"],
    atsKeywords: ["Laboratory Testing", "Specimen Processing", "Quality Control", "Microscopy", "LIMS", "Calibration", "CLIA/CAP"],
    atsNote:
      "Use the posting's exact technical terms — instrument names, assays and methods, plus compliance frameworks (CLIA, CAP, GLP); ATS matching is literal, so spell out both the acronym and full term (e.g. \"LIMS (Laboratory Information Management System)\").",
  },
  "general-surgeon": {
    include:
      "Contact details, a professional summary, education and training placed prominently (medical degree, residency, fellowships), medical licences and board certifications with issuing body and dates, surgical experience in reverse chronological order with procedures and case volumes, a skills section, and research, publications and professional affiliations.",
    length:
      "A physician CV runs longer than a one-page resume — typically two-plus pages — but keep licences, board certification and your strongest surgical experience on page one; quantify case volumes and outcomes.",
    hardSkills: ["Open & laparoscopic surgery", "Trauma & emergency surgery", "Pre & post-operative care", "Surgical decision-making", "Patient assessment & diagnosis", "Sterile technique", "EHR documentation"],
    softSkills: ["Leadership", "Communication", "Decision-making under pressure", "Teamwork", "Empathy"],
    atsKeywords: ["General Surgery", "Board Certified", "Laparoscopic Surgery", "Trauma Surgery", "ATLS/ACLS", "Pre-operative Care", "Patient Care"],
    atsNote:
      "Lead with board certification (ABS) and state licence — non-negotiable parsing targets — and name specific procedures and case volumes the way the posting does; list ATLS/ACLS/BLS with current dates.",
  },
  "orthopedic-surgeon": {
    include:
      "Contact details, a professional summary, education and training (MD/DO, residency, fellowship) prominently, board certifications and state licences with dates, surgical experience listing procedures mastered (joint replacement, ACL reconstruction, fracture fixation) with case volumes, a skills section, and research, publications and affiliations.",
    length:
      "Use a multi-page physician CV, but keep board certification, licence and your strongest subspecialty experience on page one; quantify procedures performed and outcomes.",
    hardSkills: ["Joint replacement (hip/knee)", "Arthroscopy", "Fracture fixation", "ACL reconstruction", "Spinal procedures", "Surgical robotics & implants", "Advanced imaging interpretation"],
    softSkills: ["Leadership", "Communication", "Precision", "Collaboration", "Empathy"],
    atsKeywords: ["Orthopedic Surgery", "Board Certified", "Total Joint Replacement", "Arthroscopy", "Fracture Fixation", "ATLS/BLS", "Sports Medicine"],
    atsNote:
      "Name the specific procedures you have mastered exactly as postings phrase them (\"total knee arthroplasty\", \"ACL reconstruction\", \"fracture fixation\") and list board certification (ABOS), fellowship and current ATLS/BLS; quantify case volumes.",
  },
  "neurologist": {
    include:
      "Contact details, a professional summary, education and licences (medical council or state registration, board certification), clinical experience, a skills section blending diagnostics and patient care, and research and publications.",
    length:
      "A neurologist CV is typically multi-page; keep board certification, licence and your strongest clinical and diagnostic experience on page one, with research and publications below.",
    hardSkills: ["Neurological examination", "EEG interpretation", "EMG & nerve conduction studies", "MRI/CT interpretation", "Stroke & epilepsy management", "Lumbar puncture", "EHR documentation"],
    softSkills: ["Patient communication", "Critical thinking", "Empathy", "Collaboration", "Attention to detail"],
    atsKeywords: ["Neurology", "Board Certified", "EEG", "EMG", "MRI Interpretation", "Stroke Management", "ABPN"],
    atsNote:
      "List board certification (ABPN) and medical licence first — they are required and parsed top-down — and mirror the diagnostic terms the posting uses (\"EEG\", \"EMG\", \"MRI interpretation\"); pair each hard skill with patient-care context.",
  },
  "oncologist": {
    include:
      "Contact details, a professional summary, education and training, medical licence and board certification (e.g. Medical Oncology), clinical experience including tumour-board and clinical-trial work, a skills section, and research and publications.",
    length:
      "Use a multi-page physician CV; keep board certification, licence and your strongest oncology experience on page one, and detail clinical trials, tumour-board work and publications below.",
    hardSkills: ["Chemotherapy administration", "Treatment planning", "Tumor board participation", "Clinical trial management", "Radiation therapy coordination", "Palliative care", "EHR documentation"],
    softSkills: ["Empathy", "Communication", "Composure under pressure", "Collaboration", "Ethical judgement"],
    atsKeywords: ["Medical Oncology", "Board Certified", "Chemotherapy", "Clinical Trials", "Tumor Board", "Oncology Patient Care", "ABIM"],
    atsNote:
      "Lead with board certification (ABIM, Medical Oncology) and licence, then name the modalities and settings a posting lists (\"chemotherapy\", \"clinical trials\", \"tumor board\"); quantify patient panels and trial involvement.",
  },
  "ophthalmologist": {
    include:
      "Contact details, a concise professional summary (subspecialty, years, notable achievements), education and residency, board certifications and licences in a dedicated section, clinical and surgical experience, a skills section, and research, publications and professional affiliations.",
    length:
      "An ophthalmologist CV typically runs multiple pages; keep board certification, licence and your strongest surgical and clinical experience on page one, with research and memberships below.",
    hardSkills: ["Comprehensive eye exams", "Cataract surgery", "Refractive & LASIK procedures", "Retinal evaluation", "Glaucoma management", "OCT & slit-lamp diagnostics", "EHR documentation"],
    softSkills: ["Patient communication", "Empathy", "Precision", "Patience", "Collaboration"],
    atsKeywords: ["Ophthalmology", "Board Certified", "Cataract Surgery", "Glaucoma Management", "Refractive Surgery", "OCT", "Patient Care"],
    atsNote:
      "List board certification (ABO) and licence in a dedicated section parsed top-down, and name procedures and diagnostics exactly as the posting does (\"cataract surgery\", \"OCT\", \"glaucoma management\"); a dedicated certifications section keeps credentials scannable.",
  },
  "chartered-accountant": {
    include:
      "Contact details (with LinkedIn), a professional summary, your chartered qualification (ACA, ACCA or CIMA) in a dedicated section, work experience in reverse chronological order with quantified accomplishments, a categorised skills section, and education.",
    length:
      "One to two pages — keep your qualification, strongest technical skills (IFRS, financial reporting, tax) and quantified achievements high on page one.",
    hardSkills: ["IFRS & financial reporting", "Statutory & management accounts", "Audit", "Taxation & compliance", "Advanced Excel", "SAP / ERP", "Reconciliations"],
    softSkills: ["Analytical thinking", "Attention to detail", "Communication", "Ethical judgement", "Time management"],
    atsKeywords: ["Chartered Accountant", "ACA", "ACCA", "IFRS", "Financial Reporting", "Audit", "Taxation", "Reconciliation"],
    atsNote:
      "ATS matching is literal — use the posting's exact phrases (\"tax compliance\", not \"tax reporting\") and spell out both the acronym and full term (\"ACCA\", \"IFRS\"); list 10–15 categorised skills in a one-column layout.",
  },
  "certified-public-accountant": {
    include:
      "Contact details with \"CPA\" in the header, a professional summary stating your CPA status, a categorised skills section (financial accounting, software, compliance), work experience with quantified outcomes, a certifications section, and education.",
    length:
      "One page for 0–5 years, two pages for senior roles; put CPA status in the header and summary and keep your strongest accounting functions and software high on page one.",
    hardSkills: ["GAAP & financial reporting", "General ledger & month-end close", "Reconciliations", "Tax preparation", "Audit preparation", "QuickBooks / SAP / NetSuite", "SOX & internal controls"],
    softSkills: ["Attention to detail", "Problem solving", "Communication", "Collaboration", "Integrity"],
    atsKeywords: ["CPA", "GAAP", "Financial Reporting", "General Ledger", "Month-End Close", "Reconciliation", "Tax Preparation", "SOX"],
    atsNote:
      "Put \"CPA\" after your name and in a certifications section — ATS parses top-down — and include both full names and acronyms (\"GAAP (Generally Accepted Accounting Principles)\"); group keywords by function and quantify every bullet.",
  },
  "chief-financial-officer": {
    include:
      "Contact details, a professional summary, a core-competencies section grouped into four to five categories (financial strategy, M&A & capital, risk & compliance, technology & analytics), executive experience with quantified financial impact, education, and certifications (CPA/MBA).",
    length:
      "Two pages for a CFO — lead with a strong summary and core competencies, then experience that quantifies impact (dollars saved, percentage gains, team size, deals closed).",
    hardSkills: ["Financial planning & analysis (FP&A)", "Financial modeling", "M&A & capital markets", "Budgeting & forecasting", "Risk management", "GAAP & SOX compliance", "Investor relations", "ERP systems"],
    softSkills: ["Strategic leadership", "Board communication", "Decision-making", "Negotiation", "Talent development"],
    atsKeywords: ["Financial Planning and Analysis", "FP&A", "Financial Modeling", "M&A", "SOX Compliance", "GAAP", "Investor Relations", "Risk Management"],
    atsNote:
      "Mirror the posting's exact phrases (\"financial forecasting\", \"budget management\", \"FP&A\") in your core-competencies section, and quantify everything — dollars saved, percentage improvements, team sizes and deals closed.",
  },
  "internal-auditor": {
    include:
      "Contact details with certifications (CIA/CPA/CISA) in the header, a professional summary emphasising risk, compliance and controls, a skills section (risk & compliance, communications), work experience with quantified findings, a certifications section, and education.",
    length:
      "One to two pages in a single-column layout — put your certifications in the header and a dedicated section, and keep risk-assessment and internal-controls experience high on page one.",
    hardSkills: ["Risk assessment", "Internal controls evaluation", "Compliance audit", "Audit findings & reporting", "SOX testing", "Data analysis", "Audit planning"],
    softSkills: ["Analytical thinking", "Attention to detail", "Stakeholder management", "Communication", "Objectivity"],
    atsKeywords: ["Internal Audit", "Risk Assessment", "Internal Controls", "Compliance", "SOX", "CIA", "Audit Findings"],
    atsNote:
      "Put audit certifications (CIA, CPA, CISA, CFE) after your name and in a dedicated section — ATS parses top to bottom — and use a single-column layout with standard headers; quantify findings, risks mitigated and process improvements.",
  },
  "tax-consultant": {
    include:
      "Contact details, a professional summary stating your tax niche (corporate, individual, international) and years, a skills section pairing technical tax competencies with software (Drake, Lacerte, ProSeries), experience with accomplishment-focused bullets, and a certifications section (CPA, EA, CTP).",
    length:
      "One to two pages — state your tax specialism in the summary, group technical skills and software, and quantify tax savings, compliance improvements and client retention.",
    hardSkills: ["Tax planning", "Tax preparation & compliance", "Tax research", "Corporate & individual tax", "Tax software (Drake/Lacerte/ProSeries)", "Advanced Excel", "Regulatory knowledge"],
    softSkills: ["Analytical thinking", "Attention to detail", "Client consultation", "Communication", "Problem solving"],
    atsKeywords: ["Tax Planning", "Tax Compliance", "Tax Preparation", "Tax Research", "CPA", "Client Consultation", "Public Accounting"],
    atsNote:
      "Use the posting's frequent terms — \"tax planning\", \"compliance\", \"client consultation\" — name your tax software (Drake, Lacerte, ProSeries) and list CPA/EA/CTP in a dedicated section; avoid graphics that large accounting firms' ATS cannot parse.",
  },
  // ── Batch 20 (sourced via live SERP 2026: QwikResume, Resumaker, ResumeWorded, ResumeMentor, Indeed, Wozber, ZipRecruiter, Enhancv, VisualCV, CyberDefenders, Huntr) ──
  // Priorities: remaining physician specialties, finance, emerging fintech/cyber, technician.
  "cardiothoracic-surgeon": {
    include:
      "Contact details, a professional summary, education and training placed prominently (medical degree, general-surgery residency, cardiothoracic fellowship), board certifications and licences with dates, surgical experience listing procedures (CABG, valve repair/replacement, thoracic aortic surgery, minimally invasive and robotic cardiac surgery) with case volumes and outcomes, a skills section, and research, publications and affiliations.",
    length:
      "A surgeon's CV runs multiple pages; keep board certification, licence and your strongest cardiothoracic experience on page one, and quantify procedures performed and outcomes.",
    hardSkills: ["Coronary artery bypass grafting (CABG)", "Valve repair & replacement", "Thoracic aortic surgery", "Minimally invasive & robotic cardiac surgery", "Lung & esophageal resection", "Pre & post-operative critical care", "Cardiac diagnostics"],
    softSkills: ["Leadership", "Composure under pressure", "Precision", "Communication", "Teamwork"],
    atsKeywords: ["Cardiothoracic Surgery", "Board Certified", "CABG", "Valve Replacement", "Minimally Invasive Surgery", "ACLS/BLS", "Patient Outcomes"],
    atsNote:
      "Name the procedures exactly as postings phrase them (\"CABG\", \"valve repair\", \"minimally invasive cardiac surgery\") and lead with board certification (ABTS) and licence; quantify case volumes and outcomes.",
  },
  "endocrinologist": {
    include:
      "Contact details, a professional summary, education and training, board certification (e.g. Endocrinology, Diabetes & Metabolism) and licences, clinical experience, a focused skills section (six to ten skills), and research, publications and professional affiliations (e.g. the Endocrine Society).",
    length:
      "A physician CV is multi-page; keep board certification, licence and your strongest clinical experience on page one, and list six to ten focused skills rather than an exhaustive list.",
    hardSkills: ["Diabetes management", "Thyroid disorders & ultrasound", "Fine-needle aspiration biopsy", "Hormone & metabolic evaluation", "Osteoporosis management", "Insulin therapy", "EHR documentation"],
    softSkills: ["Patient communication", "Empathy", "Critical thinking", "Collaboration", "Attention to detail"],
    atsKeywords: ["Endocrinology", "Board Certified", "Diabetes Management", "Thyroid Disorders", "Metabolism", "Patient Care", "ABIM"],
    atsNote:
      "List board certification (ABIM, Endocrinology, Diabetes & Metabolism) and licence first, and mirror the posting's clinical terms (\"diabetes management\", \"thyroid\", \"metabolic\"); keep to six to ten focused skills.",
  },
  "gastroenterologist": {
    include:
      "Contact details, a professional summary, education and training (internal-medicine residency, GI fellowship), board certification and licences, clinical experience emphasising endoscopic procedures, a skills section, and research, publications and memberships (ACG, AGA).",
    length:
      "Use a multi-page physician CV; keep board certification, licence and your endoscopic and clinical experience on page one, and quantify procedure volumes.",
    hardSkills: ["Colonoscopy", "Upper GI endoscopy", "ERCP", "Polypectomy & biopsy", "GI disorder diagnosis & treatment", "Sigmoidoscopy", "EHR documentation"],
    softSkills: ["Patient communication", "Attention to detail", "Empathy", "Collaboration", "Composure"],
    atsKeywords: ["Gastroenterology", "Board Certified", "Colonoscopy", "Endoscopy", "ERCP", "Patient Care", "ABIM"],
    atsNote:
      "Name the endoscopic procedures the way postings do (\"colonoscopy\", \"upper GI endoscopy\", \"ERCP\") and lead with board certification (ABIM, Gastroenterology) and licence; quantify procedure volumes.",
  },
  "nephrologist": {
    include:
      "Contact details, a professional summary, education and training, board certification (Nephrology) and licences, clinical experience covering dialysis and chronic kidney disease, a skills section, and research, publications and presentations.",
    length:
      "A physician CV is multi-page; keep board certification, licence and your dialysis and CKD experience on page one, and quantify patient panels and outcomes.",
    hardSkills: ["Dialysis management (HD/PD)", "Chronic kidney disease management", "Transplant nephrology", "Electrolyte & acid-base management", "Hypertension management", "Kidney biopsy", "EHR documentation"],
    softSkills: ["Patient communication", "Critical thinking", "Empathy", "Collaboration", "Attention to detail"],
    atsKeywords: ["Nephrology", "Board Certified", "Dialysis", "Chronic Kidney Disease", "Transplant", "Patient Care", "ABIM"],
    atsNote:
      "Lead with board certification (ABIM, Nephrology) and licence, and mirror the posting's terms (\"dialysis\", \"chronic kidney disease\", \"transplant\"); pair clinical skills with patient-management context and quantify panels.",
  },
  "urologist": {
    include:
      "Contact details, a professional summary, education and training (urology residency, any fellowship), board certification (ABU) and licences with dates, surgical and clinical experience with procedures and volumes, a skills section, and research, publications and affiliations.",
    length:
      "Use a multi-page physician CV; keep board certification, licence and your surgical experience on page one, and quantify successful procedures and outcomes.",
    hardSkills: ["Endoscopic urological surgery", "Robotic-assisted surgery", "Kidney stone treatment", "Urodynamics", "Prostate & bladder procedures", "Male infertility management", "EHR documentation"],
    softSkills: ["Patient communication", "Precision", "Empathy", "Collaboration", "Composure"],
    atsKeywords: ["Urology", "Board Certified", "Robotic Surgery", "Urodynamics", "Kidney Stone Treatment", "Patient Care", "ABU"],
    atsNote:
      "Name procedures and techniques exactly (\"robotic-assisted surgery\", \"urodynamics\", \"kidney stone treatment\") and list board certification (ABU) and licence with current dates; quantify procedures performed.",
  },
  "neurosurgeon": {
    include:
      "Contact details, a professional summary, education and training, licensure and board certification (ABNS) in a dedicated section, clinical and surgical experience with specific procedures and surgical volume, a skills section, research and publications, and any teaching or academic roles.",
    length:
      "A neurosurgeon CV runs multiple pages; keep board certification, licence and your strongest surgical experience on page one, and quantify surgical volume for complex procedures.",
    hardSkills: ["Craniotomy & tumor resection", "Spinal fusion & decompression", "Aneurysm clipping", "Deep brain stimulation", "Cerebrovascular surgery", "Neurosurgical patient assessment", "EHR documentation"],
    softSkills: ["Precision", "Composure under pressure", "Leadership", "Communication", "Decision-making"],
    atsKeywords: ["Neurosurgery", "Board Certified", "Craniotomy", "Spinal Fusion", "Tumor Resection", "ATLS/BLS", "ABNS"],
    atsNote:
      "Detail specific procedures (\"deep brain stimulation\", \"aneurysm clipping\", \"spinal fusion\") rather than generic terms, lead with board certification (ABNS) and fellowship, and quantify surgical volume for complex cases.",
  },
  "investment-analyst": {
    include:
      "Contact details, a professional summary, a skills section blending hard skills (financial modeling, valuation, Excel) with soft skills, work experience in reverse chronological order with quantified results, education, and certifications (CFA) placed prominently.",
    length:
      "One to two pages — keep financial modeling, valuation and your strongest coverage or deal experience high on page one, and quantify returns and outcomes.",
    hardSkills: ["Financial modeling (DCF/LBO)", "Valuation", "Equity research", "Advanced Excel (VLOOKUP, pivot tables)", "Variance & financial analysis", "Capital markets", "Bloomberg / Capital IQ / FactSet"],
    softSkills: ["Analytical thinking", "Attention to detail", "Communication", "Problem solving", "Decision-making"],
    atsKeywords: ["Financial Modeling", "Valuation", "Equity Research", "DCF", "Advanced Excel", "Portfolio Management", "CFA"],
    atsNote:
      "Excel and modeling terms (VLOOKUP, pivot tables, DCF, financial modeling) appear in 95%+ of analyst job descriptions — mirror the posting's exact phrases, name your data tools (Bloomberg, Capital IQ, FactSet), and quantify returns.",
  },
  "equity-trader": {
    include:
      "Contact details, a professional summary stating your trading focus and years, a skills section with both hard and soft skills, work experience highlighting quantified results (portfolio managed, returns), and certifications (Series 7, CFA).",
    length:
      "One page is typical — lead with your trading focus and quantified results (returns, volumes, risk metrics), and keep your strongest experience and licences high on page one.",
    hardSkills: ["Equity trading", "Algorithmic trading", "Risk management", "Market & technical analysis", "Bloomberg Terminal", "Order execution", "Liquidity & hedging strategies"],
    softSkills: ["Decision-making under pressure", "Analytical thinking", "Discipline", "Communication", "Attention to detail"],
    atsKeywords: ["Equity Trading", "Risk Management", "Algorithmic Trading", "Bloomberg Terminal", "Market Analysis", "Series 7", "CFA"],
    atsNote:
      "Use the posting's exact terms (\"algorithmic trading\", \"risk management\", \"liquidity\") and name your platforms (Bloomberg Terminal); list Series 7/CFA and quantify portfolio size, returns and risk metrics.",
  },
  "controller": {
    include:
      "Contact details, a professional summary, a skills section grouped into categories (10–15 skills, technical plus leadership), work experience with accomplishment-focused bullets, education, and certifications (CPA).",
    length:
      "One to two pages — group at least ten skills by category, keep financial reporting, controls and consolidation high on page one, and show achievements (process improvements, savings, accuracy) rather than only duties.",
    hardSkills: ["Financial reporting", "Internal controls", "Month-end & year-end close", "Budgeting & forecasting", "GAAP / IFRS", "Financial consolidation", "SAP / ERP", "Variance analysis"],
    softSkills: ["Team leadership", "Communication", "Problem solving", "Stakeholder collaboration", "Attention to detail"],
    atsKeywords: ["Financial Reporting", "Internal Controls", "Forecasting", "GAAP", "Financial Consolidation", "Variance Analysis", "CPA"],
    atsNote:
      "Incorporate the posting's exact terms (\"financial analysis\", \"budget management\", \"cost control\"), list 10–15 categorised skills, and use a single-column layout with standard headers; quantify process improvements and savings.",
  },
  "external-auditor": {
    include:
      "Contact details with CPA/CIA status, a professional summary identifying your audit specialisation and years, a skills section (GAAP/IFRS, audit software, controls), work experience in reverse chronological order with metrics, certifications placed near education, and education.",
    length:
      "One to two pages in reverse-chronological order — put CPA/CIA status in the summary and near education, and keep audit-planning and controls experience high on page one.",
    hardSkills: ["Audit planning", "GAAP & IFRS", "Internal controls evaluation", "Risk assessment", "Compliance testing", "Data analytics", "ACL / audit software"],
    softSkills: ["Analytical thinking", "Communication", "Ethical decision-making", "Time management", "Objectivity"],
    atsKeywords: ["External Audit", "Audit Planning", "GAAP", "Internal Controls", "Risk Assessment", "Compliance", "CPA"],
    atsNote:
      "Emphasise ATS terms (\"audit planning\", \"GAAP\", \"data analytics\", \"internal controls\"), place CPA/CIA near education where recruiters expect them, and quantify results (hours saved, error rates reduced, clean opinions).",
  },
  "crypto-analyst": {
    include:
      "Contact details, a professional summary, a focused skills section (ten or fewer) covering blockchain-analysis tools, data analysis and market analysis, work experience with quantified results, education, and compliance awareness (AML/KYC).",
    length:
      "One to two pages — keep ten or fewer high-impact skills (on-chain analysis, data tools, market analysis) on page one, and quantify your analysis impact.",
    hardSkills: ["On-chain analysis (Etherscan, Chainalysis)", "Cryptocurrency market analysis", "Data analysis (Python, SQL)", "Tokenomics", "Financial modeling", "Data visualization (Tableau/Power BI)", "AML/KYC awareness"],
    softSkills: ["Analytical thinking", "Attention to detail", "Communication", "Curiosity", "Problem solving"],
    atsKeywords: ["Cryptocurrency", "Blockchain Analysis", "On-Chain Analysis", "Market Analysis", "Tokenomics", "Python", "Financial Modeling"],
    atsNote:
      "Include the posting's exact terms (\"blockchain\", \"cryptocurrency market analysis\", \"on-chain\") and name your tools (Chainalysis, Etherscan, Python); keep to ten or fewer skills and quantify your analysis impact.",
  },
  "defi-analyst": {
    include:
      "Contact details, a professional summary, a dedicated skills section covering DeFi protocols, on-chain metrics and financial analysis, work experience with quantified results, education, and compliance awareness (AML/KYC).",
    length:
      "One to two pages — lead with DeFi-protocol and on-chain experience and your strongest quantified analysis, and keep technical skills grouped on page one.",
    hardSkills: ["DeFi protocols (lending, yield farming)", "On-chain metrics & tokenomics", "DCF & financial modeling", "Data analysis (Python, SQL)", "Technical analysis", "Smart-contract literacy", "AML/KYC awareness"],
    softSkills: ["Analytical thinking", "Attention to detail", "Curiosity", "Communication", "Problem solving"],
    atsKeywords: ["DeFi", "Decentralized Finance", "On-Chain Analysis", "Tokenomics", "Financial Modeling", "Python", "Smart Contracts"],
    atsNote:
      "Mirror the posting's terms (\"DeFi protocols\", \"on-chain\", \"tokenomics\", \"yield farming\") and name your stack (Python, SQL, Dune/Etherscan); group skills in a dedicated section and quantify protocol-analysis impact.",
  },
  "soc-analyst": {
    include:
      "Contact details, certifications in the header (Security+, CISSP, CEH), a professional summary, a skills section naming SIEM and security tools exactly, work experience with quantified incident metrics, a certifications section, and education.",
    length:
      "One to two pages — put your security certifications in the summary, skills and certifications sections, keep SIEM and incident-response experience high on page one, and quantify incidents handled and response-time improvements.",
    hardSkills: ["SIEM (Splunk, QRadar, ArcSight)", "Incident response", "Threat detection & hunting", "Log analysis", "EDR & IDS/IPS", "Network security", "Threat intelligence"],
    softSkills: ["Analytical thinking", "Attention to detail", "Communication", "Composure under pressure", "Teamwork"],
    atsKeywords: ["SOC", "SIEM", "Splunk", "Incident Response", "Threat Detection", "Log Analysis", "Security+", "CISSP"],
    atsNote:
      "ATS systems match exact tool names — if the posting says \"Splunk\", write \"Splunk\", not just \"SIEM\" — and place Security+, CISSP or CEH in your summary, skills and certifications sections; quantify incidents handled and response-time improvements.",
  },
  "ekg-technician": {
    include:
      "Contact details, a professional summary, a certifications section (Certified EKG Technician — NHA/CET, BLS), a skills section, work experience, and education.",
    length:
      "One page — list your EKG certification and BLS prominently, keep a dedicated skills section near the top, and quantify procedure volumes and patient throughput.",
    hardSkills: ["EKG/ECG administration", "EKG interpretation", "Electrode placement", "Cardiac monitoring (Holter/stress)", "Equipment setup & calibration", "Vital signs", "Medical terminology"],
    softSkills: ["Patient care", "Attention to detail", "Communication", "Reliability", "Composure"],
    atsKeywords: ["EKG", "ECG", "Cardiac Monitoring", "Electrode Placement", "Patient Care", "BLS", "Certified EKG Technician"],
    atsNote:
      "Name your certification exactly (Certified EKG Technician — NHA/CET) and BLS, and mirror clinical terms (\"electrode placement\", \"cardiac monitoring\", \"Holter\"); a dedicated certifications section differentiates you and parses cleanly.",
  },
  // ── Batch 21 (sourced via live SERP 2026: ResumeMentor, QwikResume, Wozber, Resumaker, Enhancv, ResumeWorded, ZipRecruiter, OwlApply, ResumeAdapter, VisualCV) ──
  // Priorities: remaining physician specialties + finance/markets specialties.
  "pulmonologist": {
    include:
      "Contact details, a professional summary, education and training (internal-medicine residency, pulmonary/critical-care fellowship), board certification and licences, clinical experience emphasising diagnostic procedures, a skills section, and research, publications and affiliations.",
    length:
      "A physician CV is multi-page; keep board certification, licence and your strongest pulmonary and critical-care experience on page one, and quantify procedure volumes and outcomes.",
    hardSkills: ["Bronchoscopy", "Pulmonary function testing", "Critical-care & ventilator management", "Imaging interpretation", "Sleep medicine", "Smoking-cessation programmes", "EHR documentation"],
    softSkills: ["Patient communication", "Critical thinking", "Empathy", "Collaboration", "Attention to detail"],
    atsKeywords: ["Pulmonology", "Board Certified", "Bronchoscopy", "Pulmonary Function Tests", "Critical Care", "Patient Care", "ABIM"],
    atsNote:
      "Lead with board certification (ABIM, Pulmonary Disease) and licence, and mirror the posting's diagnostic terms (\"bronchoscopy\", \"pulmonary function tests\", \"critical care\"); quantify procedure volumes.",
  },
  "rheumatologist": {
    include:
      "Contact details, a professional summary, education and training, board certification (Rheumatology) and licence in a dedicated section, clinical experience with the conditions you manage, a skills section, and research, publications and affiliations.",
    length:
      "A physician CV is multi-page; board certification is often a hard filter, so place it and your licence prominently, keep your strongest clinical experience on page one, and cite specific conditions managed.",
    hardSkills: ["Autoimmune & inflammatory disease management", "Musculoskeletal ultrasound", "Joint injection & aspiration", "Diagnostic interpretation", "Treatment planning (DMARDs/biologics)", "EMR (Epic / Cerner)", "EHR documentation"],
    softSkills: ["Patient communication", "Advanced diagnostics", "Empathy", "Time management", "Teamwork"],
    atsKeywords: ["Rheumatology", "Board Certified", "Autoimmune Diseases", "Musculoskeletal Ultrasound", "Treatment Planning", "Patient Care", "ABIM"],
    atsNote:
      "Board certification (ABIM/AOBIM, Rheumatology) is frequently a hard filter — place it in a dedicated section with the date — and name the conditions and tools the posting cites (\"musculoskeletal ultrasound\", \"DMARDs\", \"biologics\").",
  },
  "vascular-surgeon": {
    include:
      "Contact details, a professional summary, education and training, board certification (Vascular Surgery) and licences, surgical experience detailing open and endovascular procedures with case volumes, a skills section, and research, publications and affiliations.",
    length:
      "A surgeon's CV runs multiple pages; keep board certification, licence and your strongest open and endovascular experience on page one, and quantify complex reconstructions and outcomes.",
    hardSkills: ["Open vascular reconstruction", "Endovascular techniques", "Aneurysm repair", "Carotid endarterectomy", "Peripheral bypass", "Angioplasty & stenting", "Doppler ultrasound & CT angiography"],
    softSkills: ["Surgical precision", "Leadership", "Communication", "Composure under pressure", "Complex case management"],
    atsKeywords: ["Vascular Surgery", "Board Certified", "Endovascular", "Aneurysm Repair", "Carotid Endarterectomy", "Angioplasty", "Patient Care"],
    atsNote:
      "Name procedures exactly (\"endovascular\", \"carotid endarterectomy\", \"aneurysm repair\", \"peripheral bypass\") and lead with board certification (ABS, Vascular Surgery) and licence; quantify complex reconstructions and outcomes.",
  },
  "plastic-surgeon": {
    include:
      "Contact details, a professional summary, education and training, board certification (Plastic Surgery) and licences, surgical experience in reverse chronological order with procedures and quantified outcomes, a skills section, and research, publications and affiliations.",
    length:
      "A surgeon's CV runs multiple pages; keep board certification, licence and your strongest reconstructive and cosmetic experience on page one, and quantify outcomes with numbers.",
    hardSkills: ["Reconstructive surgery", "Cosmetic surgery", "Microsurgery", "Hand surgery", "Rhinoplasty & facial procedures", "Breast & body contouring", "Surgical anatomy & technique"],
    softSkills: ["Precision", "Patient communication", "Leadership", "Aesthetic judgement", "Empathy"],
    atsKeywords: ["Plastic Surgery", "Board Certified", "Reconstructive Surgery", "Cosmetic Surgery", "Microsurgery", "ACLS/BLS", "Patient Care"],
    atsNote:
      "List board certification (ABPS) and licence prominently, and name procedures the way postings do (\"reconstructive surgery\", \"rhinoplasty\", \"microsurgery\"); write reverse-chronological bullets that quantify outcomes.",
  },
  "pathologist": {
    include:
      "Contact details, a professional summary, education and training, board certification (American Board of Pathology) in a dedicated section, clinical and diagnostic experience, a skills section pairing technical and interpersonal competencies, and research, publications and affiliations.",
    length:
      "A physician CV is multi-page; place board certification and subspecialty prominently, keep your diagnostic experience on page one, and name your instruments and software.",
    hardSkills: ["Anatomical pathology", "Clinical pathology", "Immunohistochemistry", "Molecular diagnostics", "Autopsy procedures", "LIS proficiency", "Microscopy & slide review"],
    softSkills: ["Attention to detail", "Analytical thinking", "Communication", "Collaboration", "Diagnostic judgement"],
    atsKeywords: ["Pathology", "Board Certified", "Anatomical Pathology", "Immunohistochemistry", "Molecular Diagnostics", "LIS", "ABPath"],
    atsNote:
      "Place board certification (American Board of Pathology) and subspecialty in a dedicated section with the date, and name your methods and systems (\"immunohistochemistry\", \"molecular diagnostics\", \"LIS\") exactly as the posting does.",
  },
  "nurse-anesthetist": {
    include:
      "Contact details, a professional summary, work experience, education, a certifications section (NBCRNA first, then APRN/RN licence, ACLS, BLS, PALS), and a skills section specific enough that another CRNA knows what you can do.",
    length:
      "Keep it tight and reverse-chronological — list NBCRNA certification first (it is the single credential hiring managers scan for), keep your strongest anaesthesia experience on page one, and quantify cases per year and complication rates.",
    hardSkills: ["General & regional anesthesia", "Airway management", "Nerve blocks", "Crisis & malignant-hyperthermia response", "Acute pain management", "Patient monitoring", "EHR documentation"],
    softSkills: ["Composure under pressure", "Communication", "Critical thinking", "Interdisciplinary collaboration", "Attention to detail"],
    atsKeywords: ["CRNA", "Nurse Anesthetist", "NBCRNA", "Regional Anesthesia", "Airway Management", "ACLS/BLS", "Patient Care"],
    atsNote:
      "List NBCRNA certification first, then APRN and RN licences, ACLS, BLS and PALS — that is the order hiring managers scan; name specific block types and quantify cases per year, complication rates and OR turnaround.",
  },
  "mortgage-broker": {
    include:
      "Contact details, a professional summary highlighting your experience and specialty, a skills section matching the posting (six to ten skills), work experience with quantified achievements, and credentials (licence, certifications) and education.",
    length:
      "One page suits most mortgage brokers — lead with a focused skills section and quantify funded volume, pull-through rate, time-to-close and pricing impact across your pipeline.",
    hardSkills: ["Loan origination", "Residential & commercial mortgages", "Refinancing", "Underwriting guidelines", "Pipeline management", "Financial analysis", "CRM & loan-origination software"],
    softSkills: ["Client relationship management", "Communication", "Negotiation", "Attention to detail", "Time management"],
    atsKeywords: ["Mortgage Lending", "Loan Origination", "Refinance", "Underwriting Guidelines", "Pipeline Management", "Customer Relationship Management", "Residential Mortgages"],
    atsNote:
      "Incorporate the posting's exact terms (\"loan origination\", \"underwriting guidelines\", \"pipeline management\") and name your loan-origination/CRM software; quantify funded volume, pull-through rate and time-to-close.",
  },
  "insurance-broker": {
    include:
      "Contact details, a professional summary highlighting your experience level and specialty areas, a skills section matched to the posting (six to ten skills), work experience with quantified achievements, and credentials (licences, certifications) and education.",
    length:
      "One to two pages — keep a focused skills section of six to ten relevant skills, lead with your specialty areas, and quantify policies placed, retention and premium handled.",
    hardSkills: ["Risk assessment", "Insurance policies & coverage", "Client management", "Premium auditing", "Claims processing", "Policy renewals", "Insurance software"],
    softSkills: ["Customer service", "Communication", "Relationship management", "Attention to detail", "Negotiation"],
    atsKeywords: ["Insurance Broker", "Risk Assessment", "Client Management", "Insurance Policies", "Claims Processing", "Premium Auditing", "Customer Service"],
    atsNote:
      "Match the posting's terms (\"risk assessment\", \"client management\", \"claims processing\") and keep to six to ten relevant skills; quantify policies placed, retention and premium handled, and keep the layout clean for the ATS.",
  },
  "stockbroker": {
    include:
      "Contact details, a professional summary, licences and certifications (Series 7, SIE, Series 63) and core competencies near the top, work experience that demonstrates skills inside the bullets, education, and the trading platforms you use.",
    length:
      "One to two pages — place Series 7/63 where recruiters see them first, demonstrate skills inside experience bullets rather than only a list, and quantify revenue, assets gathered, retention and compliance accuracy.",
    hardSkills: ["Equity trading", "Investment strategies", "Portfolio management", "Market analysis", "Client prospecting & acquisition", "Risk assessment", "Trading platforms"],
    softSkills: ["Client relationship management", "Communication", "Negotiation", "Discipline", "Resilience"],
    atsKeywords: ["Series 7", "Equity Trading", "Portfolio Management", "Investment Strategies", "Market Analysis", "Client Relationship Management", "Series 63"],
    atsNote:
      "Place Series 7, SIE and Series 63 where recruiters look first, name your trading platforms, and avoid vague phrases — quantify revenue, assets gathered, volume handled and compliance accuracy in every bullet.",
  },
  "private-equity-associate": {
    include:
      "Contact details, a professional summary, a skills section covering financial analysis and tools, work experience using ownership verbs with quantified impact, education, and certifications (CFA) where relevant.",
    length:
      "One page in plain single-column text — keep LBO modeling, due diligence and your strongest deal experience on page one, use ownership verbs (led, owned, drove) and quantify impact (IRR, margin lift, dollars).",
    hardSkills: ["LBO modeling", "Financial modeling & valuation", "Due diligence", "DCF & IRR analysis", "Deal sourcing", "Portfolio company analysis", "Bloomberg / FactSet / Advanced Excel"],
    softSkills: ["Analytical thinking", "Attention to detail", "Communication", "Ownership", "Problem solving"],
    atsKeywords: ["LBO Modeling", "Financial Modeling", "Due Diligence", "IRR", "DCF", "EBITDA", "Deal Sourcing"],
    atsNote:
      "ATS looks for \"LBO modeling\", \"IRR\", \"DCF\", \"EBITDA\", \"due diligence\" and \"deal sourcing\" — mirror them, keep a single-column plain-text layout, and quantify impact (IRR bps, margin lift, dollars saved).",
  },
  "m-a-analyst": {
    include:
      "Contact details, a professional summary, a skills section using industry-specific M&A terms, work experience (chronological or hybrid) with quantified deal results, and education; include the exact title \"Mergers and Acquisitions Analyst\" somewhere.",
    length:
      "One to two pages — keep financial modeling, valuation and due diligence high on page one, and quantify deal value, synergies and outcomes.",
    hardSkills: ["Financial modeling", "Valuation", "Due diligence", "Deal sourcing", "Synergy & integration analysis", "Corporate finance", "Capital markets"],
    softSkills: ["Analytical thinking", "Attention to detail", "Communication", "Stakeholder management", "Problem solving"],
    atsKeywords: ["Mergers & Acquisitions", "Financial Modeling", "Due Diligence", "Valuation", "Deal Sourcing", "Synergy", "Investment Banking"],
    atsNote:
      "Use M&A-specific terms (\"due diligence\", \"valuation\", \"synergy\", \"deal sourcing\") and put the exact title \"Mergers and Acquisitions Analyst\" in your resume; quantify deal value and outcomes.",
  },
  "fp-a-analyst": {
    include:
      "Contact details, a professional summary, a skills section organised by category (modeling, Excel, analysis, technical tools), work experience with quantified results, a projects section for financial models, and education.",
    length:
      "One to two pages — write \"financial planning and analysis (FP&A)\" once then repeat \"FP&A\" in bullets, keep forecasting and modeling high on page one, and include 25–35 relevant keywords matched to the posting.",
    hardSkills: ["Financial modeling", "Budgeting & forecasting", "Variance analysis", "Three-statement & rolling models", "Advanced Excel", "P&L & management reporting", "SQL / Power BI / Tableau"],
    softSkills: ["Analytical thinking", "Communication", "Attention to detail", "Business partnering", "Problem solving"],
    atsKeywords: ["FP&A", "Financial Modeling", "Forecasting", "Budgeting", "Variance Analysis", "Financial Reporting", "P&L Analysis"],
    atsNote:
      "Mirror the posting — write \"financial planning and analysis (FP&A)\" once then repeat \"FP&A\" in bullets — list forecasting, financial modeling, variance analysis and management reporting, and keep the format simple and text-based.",
  },
  "risk-manager": {
    include:
      "Contact details, a professional summary, work experience, education, a skills section, a dedicated certifications section (FRM/CRM) with full name and acronym, plus risk-specific sections (regulatory compliance frameworks, risk technology) and key projects with quantified outcomes.",
    length:
      "One to two pages — keep risk analysis, frameworks and your strongest risk initiatives on page one, list certifications in a dedicated section, and quantify outcomes on key projects.",
    hardSkills: ["Risk analysis & assessment", "Operational & financial risk", "ERM frameworks (Basel/COSO/ISO 31000)", "Regulatory compliance", "Statistical modeling", "Data reporting", "Risk technology systems"],
    softSkills: ["Analytical thinking", "Stakeholder engagement", "Communication", "Problem solving", "Decision-making"],
    atsKeywords: ["Risk Management", "Risk Assessment", "Operational Risk", "Regulatory Compliance", "ERM", "FRM", "Internal Controls"],
    atsNote:
      "Weave keywords through the summary, skills and experience (\"operational risk\", \"regulatory compliance\", \"ERM\", \"Basel\", \"ISO 31000\"), list FRM/CRM with full name and acronym in a certifications section, and quantify key-project outcomes.",
  },
  "business-intelligence-analyst": {
    include:
      "Contact details (with LinkedIn), a professional summary, a dedicated technical-skills section (SQL, BI platforms, data modeling), work experience with quantified impact, a projects section, and education.",
    length:
      "One to two pages — keep SQL, your BI platform and data-modeling skills in a dedicated section near the top, and quantify impact (e.g. processing time reduced, reporting automated).",
    hardSkills: ["SQL", "Power BI / Tableau / QlikView", "Data warehousing", "ETL", "Data modeling", "Python / R", "DAX & data visualization"],
    softSkills: ["Analytical thinking", "Problem solving", "Communication", "Attention to detail", "Project management"],
    atsKeywords: ["Business Intelligence", "SQL", "Power BI", "Tableau", "Data Warehousing", "ETL", "Data Modeling"],
    atsNote:
      "Mirror the posting's tools exactly — if it says \"Power BI\" or \"Tableau\", write that, not just \"BI tools\" — keep a dedicated technical-skills section, and quantify impact (e.g. \"reduced data-processing time 40% by optimising SQL queries\").",
  },
  // ── Batch 22 (sourced via live SERP 2026: ResumeAdapter, ResumeWorded, TealHQ, Enhancv, Zety, QwikResume, Indeed, ZipRecruiter, Resumaker, Wiz, VisualCV) ──
  // Priorities: tech/cloud/security, remaining physician specialties, trades, fintech/markets, execs.
  "backend-developer": {
    include:
      "A short professional summary, a skills section (10–15 skills ordered by relevance), work experience with achievement-focused bullets, a projects section, and education.",
    length:
      "One page for 0–5 years, two pages for senior roles — keep your core stack (languages, databases, APIs) high on page one and focus on relevant projects and measurable achievements, not every technology you have touched.",
    hardSkills: ["Node.js / Python / Java", "SQL & NoSQL (PostgreSQL, MongoDB, Redis)", "REST & GraphQL APIs", "Microservices", "Docker & Kubernetes", "Caching & query optimization", "CI/CD"],
    softSkills: ["Problem solving", "Communication", "Collaboration", "Code review", "Ownership"],
    atsKeywords: ["Node.js", "Python", "SQL", "REST API", "Microservices", "Docker", "Kubernetes", "PostgreSQL"],
    atsNote:
      "The top skills (Node.js, Python, SQL, APIs, databases) appear in 80%+ of backend postings — put them high in a dedicated skills section and echo the same terms inside outcome-based bullets; ATS contextual matching scores keywords-in-sentences higher than isolated lists.",
  },
  "frontend-developer": {
    include:
      "A short professional summary, a skills section grouped into logical buckets (10–15 skills by relevance), work experience with outcome-based bullets, a projects section, and education.",
    length:
      "One page for 0–5 years, two pages for senior — anchor React/JavaScript/TypeScript at the top and reinforce the same terms inside experience bullets and projects.",
    hardSkills: ["React / Next.js", "JavaScript (ES6+)", "TypeScript", "HTML & CSS", "State management", "Reusable component design", "Testing (Jest/RTL)"],
    softSkills: ["Problem solving", "Communication", "Collaboration", "Attention to detail", "Ownership"],
    atsKeywords: ["React", "JavaScript", "TypeScript", "CSS", "HTML", "Next.js", "REST API"],
    atsNote:
      "React, JavaScript, CSS, HTML and TypeScript appear in 80%+ of frontend postings — list the exact technologies from the job description (even the React version, which some ATS filter on) and reinforce them inside specific, quantified bullets rather than keyword lists.",
  },
  "aws-solutions-architect": {
    include:
      "A professional summary, a skills section covering cloud architecture and AWS services, a dedicated certifications section (AWS Certified Solutions Architect, with dates), work experience with quantified impact, and education.",
    length:
      "One to two pages — keep cloud architecture, core AWS services and your certification high on page one, and quantify every achievement (cost savings, latency, uptime, deployment speed).",
    hardSkills: ["AWS (EC2, S3, Lambda, VPC)", "CloudFormation / IaC", "Cloud architecture & migration", "Serverless computing", "CI/CD", "Security best practices", "Networking & high availability"],
    softSkills: ["Problem solving", "Communication", "Stakeholder management", "Decision-making", "Documentation"],
    atsKeywords: ["AWS", "Solutions Architect", "EC2", "S3", "Lambda", "CloudFormation", "Cloud Migration", "Serverless"],
    atsNote:
      "Name the exact AWS services and frameworks the posting lists (EC2, S3, Lambda, VPC, CloudFormation), put your AWS Certified Solutions Architect credential in a dedicated section with dates, and quantify cost savings, latency, uptime and deployment speed.",
  },
  "cybersecurity-engineer": {
    include:
      "A professional summary highlighting expertise and certifications, a dedicated skills section (tools, frameworks, methodologies), work experience with quantified impact, a certifications section, and education.",
    length:
      "One to two pages — place certifications, frameworks and platform names in the summary, skills section and first bullets of recent roles, where early visibility is highest.",
    hardSkills: ["Penetration testing & ethical hacking", "Vulnerability assessment & management", "SIEM (Splunk, QRadar)", "Network & application security", "Incident response", "Firewalls & IDS/IPS", "NIST / ISO 27001 / OWASP"],
    softSkills: ["Analytical thinking", "Attention to detail", "Communication", "Problem solving", "Composure under pressure"],
    atsKeywords: ["Cybersecurity", "Network Security", "Penetration Testing", "Vulnerability Assessment", "SIEM", "Incident Response", "CISSP"],
    atsNote:
      "If a posting says \"vulnerability assessment\", use that exact phrase, and name your tools and frameworks (Splunk, Burp Suite, NIST, ISO 27001, MITRE ATT&CK); place CISSP/CEH/Security+ in the summary, skills and certifications sections.",
  },
  "chief-technology-officer": {
    include:
      "An executive summary, a categorised core-competencies section balancing technical depth with leadership and business skills, experience with quantified business and technology impact, education, and certifications where relevant.",
    length:
      "Two pages for a CTO — lead with a strong executive summary and up to ten overlapping skills matched to the posting, then experience that quantifies impact (revenue, scale, cost, team size).",
    hardSkills: ["Technology strategy & roadmap", "Architecture & platform scaling", "Cloud & infrastructure", "Engineering leadership", "Budget & vendor management", "Data & analytics", "Emerging tech (AI, IoT)"],
    softSkills: ["Strategic leadership", "Communication", "Decision-making", "Business planning", "Team development"],
    atsKeywords: ["Technology Strategy", "Engineering Leadership", "Cloud", "Scalability", "Digital Transformation", "Budget Management", "Roadmap"],
    atsNote:
      "Mark the skills that overlap with the posting and include up to ten, balancing technical depth (cloud, architecture, data) with leadership and budget ownership; quantify business impact (revenue, scale, cost, team size).",
  },
  "emergency-medicine-doctor": {
    include:
      "Contact details, a professional summary, education and fellowship, licensure and board certification, clinical experience, a skills section (six to ten skills), and research, teaching, memberships and continuing medical education.",
    length:
      "A physician CV is multi-page; keep licensure and board certification (ABEM) and your strongest emergency and critical-care experience on page one, and quantify patient volumes and acuity.",
    hardSkills: ["Emergency & trauma care", "ACLS / ATLS / PALS", "Critical care", "Triage & rapid diagnosis", "Procedural skills (intubation, central lines)", "EMR (Epic / Cerner)", "Resuscitation"],
    softSkills: ["Decision-making under pressure", "Communication", "Composure", "Teamwork", "Empathy"],
    atsKeywords: ["Emergency Medicine", "Board Certified", "ACLS/ATLS", "Trauma Care", "Critical Care", "Triage", "ABEM"],
    atsNote:
      "List board certification (ABEM) and licence, and mirror the posting's terms (\"trauma care\", \"critical care\", \"triage\") with ACLS/ATLS/PALS current; quantify patient volume and acuity, and name your EMR (Epic, Cerner).",
  },
  "family-medicine-doctor": {
    include:
      "Contact details, a professional summary, education and residency, board certification and any areas of focus, clinical experience, a skills section blending clinical proficiency and interpersonal skills, and certifications and memberships.",
    length:
      "A physician CV is multi-page; keep board certification and your strongest primary-care experience on page one, and quantify panel size and quality outcomes.",
    hardSkills: ["Primary & preventive care", "Chronic disease management", "Patient education", "Pediatric & adult care", "Minor procedures", "EMR documentation", "Care coordination"],
    softSkills: ["Patient communication", "Empathy", "Critical thinking", "Collaboration", "Attention to detail"],
    atsKeywords: ["Family Medicine", "Board Certified", "Primary Care", "Chronic Disease Management", "Preventive Medicine", "Patient Care", "ABFM"],
    atsNote:
      "Lead with board certification (ABFM) and licence, and mirror the posting's terms (\"chronic disease management\", \"preventive medicine\", \"patient education\"); quantify panel size and quality measures.",
  },
  "gynecologist": {
    include:
      "Contact details, a professional summary, education and residency, board certification or eligibility (Obstetrics & Gynecology) and an unrestricted licence in a visible section, clinical and surgical experience, a skills section, and research, leadership and affiliations (ACOG).",
    length:
      "A physician CV is multi-page; keep board certification, licence and your strongest clinical and surgical experience on page one, and quantify deliveries and procedures.",
    hardSkills: ["Obstetrics & gynecology", "Prenatal & postnatal care", "Gynecologic surgery", "Minimally invasive surgery", "High-risk pregnancy management", "Reproductive health", "EMR documentation"],
    softSkills: ["Patient communication", "Empathy", "Composure under pressure", "Team leadership", "Attention to detail"],
    atsKeywords: ["Obstetrics and Gynecology", "Board Certified", "Gynecologic Surgery", "Prenatal Care", "Minimally Invasive Surgery", "Patient Care", "ACOG"],
    atsNote:
      "Make board certification or eligibility (OB-GYN) and an unrestricted licence visible and current, and name procedures the way postings do (\"gynecologic surgery\", \"minimally invasive surgery\", \"prenatal care\"); quantify deliveries and procedures.",
  },
  "bricklayer": {
    include:
      "A summary statement, a skills and certifications section, work experience with measurable detail, educational background and apprenticeships, and a dedicated certifications section (OSHA, safety training).",
    length:
      "One page — list at least five core bricklaying skills, quantify with project sizes and years, and keep your safety certifications and apprenticeship visible.",
    hardSkills: ["Bricklaying patterns (Flemish/header bond)", "Mortar mixing & types", "Trowel work", "Blueprint reading", "Scaffolding", "Quality control", "Masonry tools"],
    softSkills: ["Attention to detail", "Reliability", "Teamwork", "Physical stamina", "Time management"],
    atsKeywords: ["Bricklaying", "Masonry", "Mortar Mixing", "Blueprint Reading", "Scaffolding", "OSHA", "Quality Control"],
    atsNote:
      "List the patterns and methods a posting names (\"Flemish bond\", \"mortar mixing\", \"blueprint reading\") and put OSHA/safety training in a dedicated certifications section with dates and issuer; quantify with project sizes and years.",
  },
  "cad-technician": {
    include:
      "A professional summary, a technical-skills section (CAD software and standards), a design-specialties section where relevant, work experience describing how you applied skills with measurable results, and education with certifications.",
    length:
      "One page — keep your CAD software (AutoCAD, Revit, SolidWorks) and standards high on page one, and describe how you applied them on real projects with measurable results rather than only listing them.",
    hardSkills: ["AutoCAD", "Revit / Civil 3D", "SolidWorks", "3D modeling", "Technical drawing", "Engineering documentation", "ISO standards compliance"],
    softSkills: ["Attention to detail", "Communication", "Problem solving", "Time management", "Collaboration"],
    atsKeywords: ["AutoCAD", "Revit", "SolidWorks", "3D Modeling", "Technical Drawing", "Engineering Documentation", "Blueprint Reading"],
    atsNote:
      "Name the exact CAD software and standards the posting lists (AutoCAD, Revit, Civil 3D, SolidWorks, ISO), and rather than only listing skills, describe how you applied them on real projects with measurable results.",
  },
  "commodities-trader": {
    include:
      "A short headline or professional summary, a skills section with industry-specific keywords, work experience with quantified achievements (using action verbs), an interests section, and education.",
    length:
      "One to two pages — lead with a clear summary, keep market analysis and risk management high on page one, and quantify volumes, P&L and outcomes.",
    hardSkills: ["Market analysis", "Risk management", "Futures & options trading", "Hedging strategies", "Arbitrage", "Trading platforms", "Fundamental & technical analysis"],
    softSkills: ["Decision-making under pressure", "Negotiation", "Attention to detail", "Adaptability", "Team collaboration"],
    atsKeywords: ["Commodities Trading", "Market Analysis", "Risk Management", "Futures Trading", "Hedging", "Arbitrage", "Trading Strategies"],
    atsNote:
      "Include the posting's exact terms (\"market analysis\", \"risk management\", \"hedging\", \"futures trading\") and industry terms (\"liquidity\", \"arbitrage\"), and quantify achievements (e.g. trading volume up 25%, P&L impact).",
  },
  "hedge-fund-manager": {
    include:
      "A summary stating what you bring to the firm, a core-competencies section with industry keywords, work experience with quantified outcomes, education, and a skills section emphasising portfolio and risk management.",
    length:
      "Two pages is acceptable at this level — lead with a strong summary, keep portfolio management, risk management and your strongest returns on page one, and quantify AUM, returns and risk metrics.",
    hardSkills: ["Portfolio management", "Risk management", "Investment analysis", "Alternative investments", "Macro-economic analysis", "Technical analysis", "Fundraising & LP relations"],
    softSkills: ["Analytical thinking", "Decision-making", "Communication", "Relationship building", "Composure under pressure"],
    atsKeywords: ["Hedge Funds", "Portfolio Management", "Risk Management", "Alternative Investments", "Investment Analysis", "Asset Management", "Fundraising"],
    atsNote:
      "Use industry keywords (\"hedge funds\", \"alternative investments\", \"portfolio management\", \"risk management\") in a core-competencies section, and quantify AUM, returns, alpha and risk metrics in your experience bullets.",
  },
  "brand-strategist": {
    include:
      "A professional summary highlighting your specialty areas, a skills section organised by category and matched to the posting, work experience in problem-solution-result format with quantified achievements, and credentials and education.",
    length:
      "One to two pages — keep brand strategy, positioning and your strongest campaigns on page one, organise skills by category, and quantify outcomes (awareness, share, engagement).",
    hardSkills: ["Brand strategy", "Brand positioning", "Market & consumer insights", "Creative strategy", "Marketing strategy", "Content strategy", "Brand identity"],
    softSkills: ["Strategic thinking", "Communication", "Storytelling", "Collaboration", "Presentation"],
    atsKeywords: ["Brand Strategy", "Brand Positioning", "Market Analysis", "Consumer Insights", "Creative Strategy", "Marketing Strategy", "Content Strategy"],
    atsNote:
      "Incorporate the posting's exact terms (\"brand positioning\", \"market analysis\", \"consumer insights\", \"content strategy\"), organise skills by category, and write problem-solution-result bullets that quantify awareness, share and engagement.",
  },
  "chief-information-security-officer": {
    include:
      "An executive summary, a categorised skills section (technical plus leadership), professional experience with quantified risk and security outcomes, a certifications section, education, and notable achievements.",
    length:
      "Two pages for a CISO — lead with an executive summary on security strategy and risk, keep risk management, governance and incident response high on page one, and quantify risk reduced and programmes led.",
    hardSkills: ["Security strategy & governance", "Risk management", "Incident response", "Security architecture", "Cloud security (AWS/Azure/GCP)", "Compliance (GDPR, ISO 27001, SOC 2)", "Third-party risk management"],
    softSkills: ["Strategic leadership", "Board communication", "Decision-making under pressure", "Negotiation", "Team mentorship"],
    atsKeywords: ["Information Security", "Risk Management", "Security Governance", "Incident Response", "Compliance", "Cloud Security", "CISSP"],
    atsNote:
      "Lead with security strategy and risk in the executive summary, name your frameworks (ISO 27001, SOC 2, GDPR, NIST), and place CISSP/CISM/CISA in a certifications section; quantify risk reduced, audits passed and programmes led.",
  },
  // ── Batch 23 (sourced via live SERP 2026: ResumeWorded, TealHQ, Enhancv, ResumeMentor, ResumeAdapter, VisualCV, Huntr, QwikResume, Indeed, Jobscan) ──
  // Priorities: tech/cloud, digital marketing, beauty/wellness, medical, finance, exec, education.
  "azure-architect": {
    include:
      "A professional summary, a technical-skills section categorised (Cloud Technologies, Leadership & Communication), work experience with quantified impact, a projects section, a dedicated certifications section (Azure Solutions Architect Expert, with dates), and education.",
    length:
      "One to two pages in a hybrid format — keep your strongest Azure services and certification high on page one, put the most relevant skill category first, and quantify every achievement.",
    hardSkills: ["Azure (VMs, AKS, Functions, VNet)", "ARM / Bicep / Terraform", "Cloud architecture & migration", "Microservices & serverless", "CI/CD (Azure DevOps)", "Security & identity (Entra ID)", "Networking & high availability"],
    softSkills: ["Problem solving", "Communication", "Stakeholder management", "Decision-making", "Documentation"],
    atsKeywords: ["Azure", "Solutions Architect", "AKS", "Azure Functions", "Bicep / Terraform", "Cloud Migration", "Azure DevOps"],
    atsNote:
      "Name the exact Azure services the posting lists (AKS, Functions, VNet, Entra ID), put \"Microsoft Certified: Azure Solutions Architect Expert\" in a dedicated section with dates, and lead with the skill category the job emphasises.",
  },
  "game-developer": {
    include:
      "A professional summary starting with your title and years, a skills section grouped by category (languages, engines, tools), work experience with neatly organised bullets, a projects/shipped-titles section, and education and certifications.",
    length:
      "One page for 0–5 years, two for senior — lead with your engine and language strengths, connect them to shipped outcomes, and keep a single-column layout the ATS can parse.",
    hardSkills: ["Unity", "Unreal Engine", "C# / C++", "Gameplay systems", "3D graphics & physics", "AI / pathfinding", "Optimization & profiling"],
    softSkills: ["Problem solving", "Collaboration", "Creativity", "Communication", "Attention to detail"],
    atsKeywords: ["Unity", "Unreal Engine", "C++", "C#", "Game Design", "Gameplay Programming", "Optimization"],
    atsNote:
      "Mirror the job's engine, language and gameplay terms exactly (Unity, Unreal Engine, C++, C#) — ATS routes on them — and group 10–15 skills by category (languages, engines, tools); connect engine work to shipped-title outcomes.",
  },
  "enterprise-architect": {
    include:
      "A professional summary, a skills section spotlighting solution design, frameworks and leadership, work experience with quantified delivery, education, and certifications (TOGAF) where relevant.",
    length:
      "Two pages is acceptable — keep enterprise architecture, frameworks (TOGAF) and IT strategy high on page one, indicate proficiency without subjective terms, and save as a PDF.",
    hardSkills: ["Enterprise architecture", "TOGAF / Zachman frameworks", "Solution architecture", "IT strategy", "Systems integration", "Requirements analysis", "Cloud (AWS/Azure)"],
    softSkills: ["Strategic thinking", "Stakeholder communication", "Technical leadership", "Problem solving", "Collaboration"],
    atsKeywords: ["Enterprise Architecture", "TOGAF", "Solution Architecture", "IT Strategy", "Integration", "Requirements Analysis", "Cloud"],
    atsNote:
      "Use the posting's exact phrasing (\"enterprise architecture\", \"TOGAF\", \"solution architecture\", \"IT strategy\"), spotlight solution design and stakeholder communication, and indicate proficiency without subjective words like \"expert\".",
  },
  "embedded-systems-developer": {
    include:
      "A professional summary, a technical-skills section immediately after it grouped by category (languages, MCU/MPU, protocols, RTOS/OS, tools), a projects section showing hardware/software stacks, work experience in reverse chronological order, and education.",
    length:
      "One to two pages — keep a categorised skills section at the top, follow with a projects section (vital for embedded roles), and pair each language with the platform you used it on.",
    hardSkills: ["Embedded C / C++", "RTOS", "Microcontrollers (ARM Cortex-M)", "Device drivers", "Protocols (SPI, I2C, UART, CAN)", "Hardware debugging (JTAG/SWD)", "Firmware optimization"],
    softSkills: ["Problem solving", "Attention to detail", "Collaboration", "Analytical thinking", "Documentation"],
    atsKeywords: ["Embedded C", "RTOS", "Microcontrollers", "Device Drivers", "ARM Cortex-M", "JTAG", "Firmware"],
    atsNote:
      "Listing \"C\" alone is not enough — pair languages with platforms (\"C on ARM Cortex-M\"), name your protocols (SPI, I2C, UART, CAN) and debug tools (JTAG, logic analyzers), and lead with a categorised technical-skills section.",
  },
  "digital-marketing-specialist": {
    include:
      "Contact details (with LinkedIn/portfolio), a professional summary, a technical-skills section segmented by platform, work experience featuring measurable campaign results, and education.",
    length:
      "One to two pages — keep SEO, PPC, analytics and your strongest measurable campaigns high on page one, and integrate keywords inside campaign/achievement bullets, not isolated lists.",
    hardSkills: ["SEO & SEM", "PPC campaign management", "Google Analytics (GA4)", "Email marketing automation", "Conversion rate optimization (CRO)", "A/B testing", "SEMrush / Ahrefs / HubSpot"],
    softSkills: ["Creativity", "Analytical thinking", "Communication", "Problem solving", "Time management"],
    atsKeywords: ["SEO", "PPC", "Google Analytics", "Social Media Marketing", "Email Marketing", "Conversion Rate Optimization", "SEM"],
    atsNote:
      "Use the posting's exact terms (SEO, PPC, CRO, GA4) and name your tools (Google Ads, SEMrush, HubSpot, Mailchimp), and quantify outcomes (e.g. \"increased organic traffic 30% in 3 months\").",
  },
  "content-marketing-manager": {
    include:
      "Contact details, a professional summary, a skills section mixing hard skills, tools and methodologies with management soft skills, work experience in chronological format with quantified results, and education.",
    length:
      "One to two pages — use a chronological format (ATS parses it best), keep content strategy, SEO and your strongest results on page one, and make sure your target title appears in the summary or skills.",
    hardSkills: ["Content strategy", "SEO content", "Editorial calendar management", "Copywriting", "Marketing automation (HubSpot/Marketo)", "Analytics (GA4, SEMrush, Ahrefs)", "Brand voice"],
    softSkills: ["Team leadership", "Communication", "Storytelling", "Cross-functional alignment", "Budget oversight"],
    atsKeywords: ["Content Marketing", "Content Strategy", "SEO", "Editorial Calendar", "Copywriting", "Marketing Automation", "Analytics"],
    atsNote:
      "Use terms like \"content marketing\", \"editorial strategy\", \"SEO content\" and \"content performance\" naturally in the summary, skills and bullets, name your tools (GA4, HubSpot, SEMrush), and keep a clean single-column chronological layout.",
  },
  "growth-hacker": {
    include:
      "Contact details, a concise three-sentence summary positioning you as someone who drives measurable growth, a skills section grouped by category (analytics, A/B testing, automation), work experience describing impact, and education.",
    length:
      "One to two pages in a single-column layout — list growth-specific platforms (Mixpanel, Amplitude, Optimizely) before general tools, group skills by category, and quantify CAC, LTV and conversion gains.",
    hardSkills: ["Growth experimentation & A/B testing", "Conversion rate optimization (CRO)", "Funnel & cohort analysis", "Lifecycle marketing", "Analytics (GA4, Mixpanel, Amplitude)", "SQL / Python", "Marketing automation"],
    softSkills: ["Analytical thinking", "Curiosity", "Communication", "Creativity", "Problem solving"],
    atsKeywords: ["Growth Marketing", "A/B Testing", "Conversion Rate Optimization", "CAC", "LTV", "Funnel Optimization", "Product-Led Growth"],
    atsNote:
      "Position yourself as someone who drives measurable growth (not just runs campaigns), list growth platforms (Mixpanel, Amplitude, Optimizely) before general tools, and quantify CAC, LTV, ROAS and conversion gains in your bullets.",
  },
  "hair-stylist": {
    include:
      "Contact details, a professional summary, a skills section blending hard and soft skills, work experience with measurable detail, education, and a certifications section (state cosmetology licence, specialist certifications).",
    length:
      "One page — tailor a focused skills section to the salon's needs, keep your cutting, colouring and client-service strengths high, and list your cosmetology licence prominently.",
    hardSkills: ["Cutting & layering", "Colouring & highlights", "Chemical treatments (keratin, perms)", "Blow-dry & styling", "Client consultation", "Hair & scalp care", "POS / booking systems"],
    softSkills: ["Customer service", "Creativity", "Communication", "Time management", "Attention to detail"],
    atsKeywords: ["Hair Styling", "Hair Colouring", "Cutting", "Chemical Treatments", "Client Consultation", "Cosmetology License", "Customer Service"],
    atsNote:
      "Tailor the skills section to each salon's wording (\"balayage\", \"keratin\", \"layer cuts\"), list your state cosmetology licence and any specialist certifications (with issuer and date), and keep a clean single-column layout.",
  },
  "beautician": {
    include:
      "Contact details, a summary, a skills section (treatment knowledge plus customer-service soft skills), work experience with title, salon, dates and accomplishments, and a certifications section.",
    length:
      "One page — use consistent section labels (Summary, Skills, Experience, Certifications), keep your treatment specialisms and client-service strengths high, and quantify retail sales and client retention.",
    hardSkills: ["Facials & skin care", "Waxing & threading", "Manicure & pedicure", "Lash & brow treatments", "Make-up application", "Product & retail sales", "Hygiene & safety standards"],
    softSkills: ["Customer service", "Communication", "Rapport building", "Time management", "Attention to detail"],
    atsKeywords: ["Beauty Treatments", "Skin Care", "Waxing", "Facials", "Make-up Application", "Customer Service", "Cosmetology"],
    atsNote:
      "Name your treatment specialisms the way the salon does (\"facials\", \"lash extensions\", \"chemical peels\"), list industry certifications, and show retail-sales and client-retention numbers alongside your service skills.",
  },
  "clinical-pharmacist": {
    include:
      "Contact details, a professional summary, a skills section (clinical and technical), work experience showing responsibility, skill and outcome, an education section (PharmD), and a certifications section (BPS specialty, BLS/ACLS, state licence).",
    length:
      "One to two pages — keep your PharmD, BPS specialty and strongest clinical experience on page one, and write bullets that pair a responsibility and skill with a quantified outcome.",
    hardSkills: ["Medication therapy management", "Pharmacotherapy", "Drug utilization review", "Patient counseling", "Compounding & dispensing", "Pharmacy software", "Medication safety"],
    softSkills: ["Critical thinking", "Communication", "Attention to detail", "Collaboration", "Patient advocacy"],
    atsKeywords: ["Clinical Pharmacist", "Medication Therapy Management", "Pharmacotherapy", "Drug Utilization Review", "Patient Counseling", "Medication Safety", "BPS"],
    atsNote:
      "Use language that aligns with the posting (\"medication therapy management\", \"pharmacotherapy\", \"drug utilization review\"), and list your PharmD, BPS specialty (e.g. Ambulatory Care) and BLS/ACLS with issuer and date.",
  },
  "ent-specialist": {
    include:
      "Contact details, a professional summary, education and training (ENT residency, any sub-specialty fellowship), board certification (Otolaryngology) and licences, surgical and clinical experience with procedures, a skills section, and memberships (AAO).",
    length:
      "A physician CV is multi-page; keep board certification, licence and your surgical experience on page one, and name procedures and quantify volumes.",
    hardSkills: ["Endoscopic sinus surgery", "Tonsillectomy & septoplasty", "Thyroidectomy", "Audiometric testing", "Allergy testing", "Laser treatments", "EMR (Epic / Cerner)"],
    softSkills: ["Patient communication", "Precision", "Critical thinking under pressure", "Teamwork", "Time management"],
    atsKeywords: ["Otolaryngology", "Board Certified", "Endoscopic Sinus Surgery", "Tonsillectomy", "Septoplasty", "Audiometric Testing", "Patient Care"],
    atsNote:
      "List board certification (American Board of Otolaryngology) and licence, and name procedures the way postings do (\"endoscopic sinus surgery\", \"tonsillectomy\", \"septoplasty\"); quantify surgical volumes.",
  },
  "forensic-analyst": {
    include:
      "Contact details, a professional summary, a skills section (forensic tools plus analytical and ethical soft skills), work experience tailored to the posting, education, and a certifications section (GCFA/EnCE/CFCE).",
    length:
      "One to two pages with standard section titles — tailor the skills section to the job, keep your forensic tools and chain-of-custody experience high on page one, and quantify cases and outcomes.",
    hardSkills: ["Digital forensics (EnCase, FTK)", "Data analysis & recovery", "Chain-of-custody procedures", "Evidence preservation", "Investigative techniques", "SQL & database analysis", "Report writing"],
    softSkills: ["Attention to detail", "Problem solving", "Communication", "Ethical compliance", "Confidentiality"],
    atsKeywords: ["Forensic Analysis", "Digital Forensics", "EnCase", "FTK", "Chain of Custody", "Data Analysis", "Evidence Preservation"],
    atsNote:
      "Incorporate the posting's exact terms (\"data analysis\", \"investigative techniques\") and tools (EnCase, FTK), list certifications (GCFA, EnCE, CFCE) in a dedicated section, and quantify cases handled and outcomes.",
  },
  "chief-marketing-officer": {
    include:
      "Contact details, a professional summary, a categorised skills section separating technical (analytics, marketing automation) from strategic and interpersonal competencies, executive experience with revenue-growth metrics, a leadership section, and education.",
    length:
      "Two pages for a CMO — structure it chronologically, lead with revenue-growth metrics and brand examples, and categorise skills (technical vs strategic vs leadership) tailored to the posting.",
    hardSkills: ["Marketing strategy", "Brand management", "Marketing automation & analytics", "Demand generation", "Digital marketing", "Budget management", "Go-to-market strategy"],
    softSkills: ["Strategic leadership", "Cross-functional leadership", "Communication", "Decision-making", "Team development"],
    atsKeywords: ["Marketing Strategy", "Brand Management", "Demand Generation", "Marketing Automation", "Go-to-Market Strategy", "Revenue Growth", "Digital Marketing"],
    atsNote:
      "Incorporate the posting's keywords into the summary, experience and skills, categorise skills (technical vs strategic vs leadership), and quantify revenue growth, pipeline and brand metrics; leave out skills that are simply expected.",
  },
  "high-school-teacher": {
    include:
      "Contact details, a professional summary, a skills section (subject expertise plus teaching soft skills), teaching experience in reverse chronological order with classroom detail, a certifications section (state licence, subject endorsements), and education.",
    length:
      "One to two pages — keep your subject specialisation, advanced-coursework instruction and licence high on page one, and quantify outcomes (pass rates, exam scores, student growth).",
    hardSkills: ["Subject-matter expertise", "Lesson planning & curriculum delivery", "Classroom management", "Assessment & feedback", "AP/IB curriculum", "College & career readiness", "Standardized-test preparation"],
    softSkills: ["Communication", "Patience", "Adaptability", "Leadership", "Collaboration with families"],
    atsKeywords: ["High School Teacher", "Lesson Planning", "Classroom Management", "Curriculum Development", "Assessment", "AP/IB", "Differentiated Instruction"],
    atsNote:
      "List your state teaching licence and subject endorsements in a dedicated section, mirror the posting's terms (\"classroom management\", \"differentiated instruction\", \"AP/IB\"), and quantify outcomes (pass rates, exam scores, student growth).",
  },
  // ── Batch 24 (sourced via live SERP 2026: ResumeWorded, Wiz, TealHQ, Enhancv, Wozber, ZipRecruiter, ResumeMentor, VisualCV, Indeed, Resumaker, ResumeAdapter, Jobscan) ──
  // Priorities: tech/cloud/AI, digital marketing, nursing, pharmacy, wellness, admin/ops, finance, education.
  "google-cloud-architect": {
    include:
      "A professional summary naming your GCP certification, a skills section mirroring the posting's services, work experience leading with quantified achievements per platform, a projects section, a dedicated certifications section, and education.",
    length:
      "One to two pages — lead with quantified GCP achievements, keep your certification in the summary and a dedicated section, and group services by the role (infrastructure, data or DevOps).",
    hardSkills: ["GCP (Compute Engine, GKE, VPC, IAM)", "BigQuery / Dataflow / Pub/Sub", "Terraform / Deployment Manager", "Cloud architecture & migration", "Kubernetes / GKE", "CI/CD (Cloud Build)", "Monitoring & security"],
    softSkills: ["Problem solving", "Communication", "Stakeholder management", "Decision-making", "Documentation"],
    atsKeywords: ["Google Cloud Platform", "GCP", "BigQuery", "GKE", "Terraform", "Cloud Architecture", "Cloud Migration"],
    atsNote:
      "Put your GCP certification (Professional Cloud Architect) in the summary and a dedicated section — in cloud roles certifications often outweigh degrees — and name the exact services the posting lists (Compute Engine, BigQuery, GKE); quantify achievements per platform.",
  },
  "computer-vision-engineer": {
    include:
      "Contact details, a professional summary, a skills section positioning deep learning and computer vision first, work experience with quantified achievements, a projects section showing image-processing applications, education, and certifications.",
    length:
      "One to two pages — put deep learning, computer vision and your strongest frameworks at the forefront, and quantify results (e.g. model accuracy and the value it delivered).",
    hardSkills: ["Python / C++", "OpenCV", "PyTorch / TensorFlow", "CNNs, Transformers & GANs", "Object detection & segmentation", "CUDA / TensorRT / ONNX", "Docker & deployment"],
    softSkills: ["Problem solving", "Communication", "Teamwork", "Project management", "Analytical thinking"],
    atsKeywords: ["Computer Vision", "Deep Learning", "Python", "PyTorch", "TensorFlow", "OpenCV", "Object Detection"],
    atsNote:
      "Position \"deep learning\" and \"computer vision\" first, mirror the posting's frameworks (PyTorch, TensorFlow, OpenCV) and advanced terms (CUDA, TensorRT, ONNX, SLAM) where you genuinely use them, and quantify model accuracy and impact.",
  },
  "ai-research-scientist": {
    include:
      "Contact details, a professional summary with your target title and three to four top skills, a skills section balancing research domains, languages and frameworks, work experience with quantified results, a publications/projects section, and education.",
    length:
      "One to two pages (longer for an academic CV) — lead with the exact skills named in the posting, then closely related terms you genuinely use, and quantify outcomes.",
    hardSkills: ["Python / C++", "PyTorch / TensorFlow", "Machine & deep learning", "NLP / computer vision", "Mathematics & statistics", "MLOps (SageMaker/Vertex AI)", "Experiment design"],
    softSkills: ["Analytical thinking", "Communication", "Collaboration", "Problem solving", "Scientific writing"],
    atsKeywords: ["Machine Learning", "Deep Learning", "Python", "PyTorch", "NLP", "Computer Vision", "Research"],
    atsNote:
      "Anchor on the exact skills the posting names (Python, PyTorch, deep learning, NLP), use your target title plus three to four top skills in the summary, and quantify results (e.g. \"92% accuracy, $1.2M retained revenue\") rather than listing tasks.",
  },
  "google-ads-specialist": {
    include:
      "Contact details, a summary statement, a dedicated skills section clustered by platform and method near the top, work experience using the context-action-result framework with quantified results, and a certifications section (Google Ads).",
    length:
      "One to two pages — put core PPC competencies near the top so the ATS captures them, and favour metrics (CTR, conversion rate, CPA, ROAS, impression share).",
    hardSkills: ["Google Ads", "Keyword research", "PPC / paid search", "A/B testing", "Conversion tracking", "Audience segmentation", "Google Analytics & Ads Editor"],
    softSkills: ["Analytical thinking", "Attention to detail", "Communication", "Client management", "Problem solving"],
    atsKeywords: ["PPC", "Google Ads", "Paid Search Marketing", "Keyword Research", "Conversion Rate Optimization", "Google Analytics", "A/B Testing"],
    atsNote:
      "Place core competencies (keyword research, A/B testing, conversion tracking) in a dedicated skills section near the top, and use the context-action-result framework to quantify CTR, conversion rate, CPA and ROAS.",
  },
  "affiliate-marketer": {
    include:
      "Contact details, a professional summary, a skills section, work experience with quantified achievements, education, and the affiliate networks and tools you use.",
    length:
      "One page if you have under ten years of experience — keep affiliate program management, partner recruitment and performance tracking high, and quantify revenue and efficiency gains.",
    hardSkills: ["Affiliate program management", "Partner recruitment & negotiation", "CPA & ROI tracking", "Campaign optimization", "Attribution modeling", "Affiliate networks (CJ/ShareASale/Impact)", "Analytics (GA, Looker)"],
    softSkills: ["Relationship management", "Communication", "Analytical thinking", "Negotiation", "Attention to detail"],
    atsKeywords: ["Affiliate Marketing", "Affiliate Networks", "Campaign Management", "Performance Analytics", "Partner Recruitment", "CPA", "ROI Tracking"],
    atsNote:
      "Use affiliate-specific terms (\"affiliate networks\", \"partner negotiation\", \"performance reporting\") and name your platforms (CJ, ShareASale, Impact, Google Analytics); quantify revenue driven and efficiency gained.",
  },
  "cardiac-care-nurse": {
    include:
      "Contact details, a professional summary, a distinct licences-and-certifications section, professional experience with quantified outcomes, a technical-skills section, and education and awards.",
    length:
      "One to two pages — lead with cardiac monitoring and telemetry experience, keep BLS/ACLS current in a distinct section, and quantify patient outcomes in high-acuity settings.",
    hardSkills: ["Cardiac monitoring & telemetry", "ECG interpretation", "Cardiac pharmacology", "Medication administration", "Invasive line management", "Patient assessment", "EHR documentation"],
    softSkills: ["Critical thinking under pressure", "Communication", "Empathy", "Teamwork", "Adaptability"],
    atsKeywords: ["Telemetry", "Cardiac Monitoring", "ECG Interpretation", "ACLS", "BLS", "Medication Administration", "Patient Care"],
    atsNote:
      "Mirror the posting's terms (\"cardiac monitoring\", \"telemetry\", \"ECG interpretation\") and keep current BLS/ACLS in a distinct certifications section; quantify patient outcomes and acuity.",
  },
  "home-health-nurse": {
    include:
      "Contact details, a summary, a skills section, work experience with quantified outcomes, education, a certifications section, and optionally awards or professional memberships.",
    length:
      "One to two pages — keep clinical skills (wound care, medication management, patient assessment) and your certifications high, and show the caseloads you managed.",
    hardSkills: ["Patient assessment", "Medication management", "Wound care", "IV therapy", "Catheter care", "Care planning & documentation", "EHR documentation"],
    softSkills: ["Empathy", "Active listening", "Organization", "Time management", "Communication"],
    atsKeywords: ["Home Health", "Patient Assessment", "Wound Care", "Medication Management", "IV Therapy", "BLS", "Care Planning"],
    atsNote:
      "Customise to the posting's wording (\"wound care\", \"medication management\", \"patient assessment\"), list CPR/BLS/ACLS with issuer and date, and show the daily caseloads you managed.",
  },
  "hospital-pharmacist": {
    include:
      "Contact details, a two-to-three-sentence professional summary, a skills section drawn from the posting, employment history in reverse chronological order with quantified bullets, education and licensure, and a continuing-education or certifications section.",
    length:
      "One to two pages — keep your pharmacy degree, licensure and strongest clinical experience high, and quantify accuracy, turnaround and safety improvements.",
    hardSkills: ["Medication therapy management", "Pharmaceutical calculations", "Drug interactions & contraindications", "Compounding & dispensing", "Inventory & regulatory compliance", "Critical-care pharmacotherapy", "Pharmacy software"],
    softSkills: ["Attention to detail", "Communication", "Critical thinking", "Collaboration", "Patient confidentiality"],
    atsKeywords: ["Hospital Pharmacist", "Medication Therapy Management", "Compounding", "Drug Interactions", "Medication Safety", "Regulatory Compliance", "Pharmacotherapy"],
    atsNote:
      "Pull keywords from the posting (\"medication therapy management\", \"compounding\", \"medication safety\"), list your degree, licensure and immunisation/specialty certifications, and quantify accuracy, turnaround and error-prevention.",
  },
  "cosmetologist": {
    include:
      "A professional summary, a dedicated skills section (up to six skills balancing hard and soft), education (cosmetology school and courses), a separate certifications-and-licences section, and optional awards, memberships or a portfolio.",
    length:
      "One page — present a focused skills section of up to six relevant skills, keep your licence prominent, and quantify retail sales and client retention.",
    hardSkills: ["Cutting & styling", "Hair colouring", "Chemical treatments", "Skin & nail care", "Make-up application", "Beauty-product knowledge", "Salon hygiene & safety"],
    softSkills: ["Customer service", "Communication", "Creativity", "Time management", "Attention to detail"],
    atsKeywords: ["Cosmetology", "Hair Styling", "Hair Colouring", "Skin Care", "Make-up Application", "Cosmetology License", "Customer Service"],
    atsNote:
      "Keep a focused skills section of up to six skills unique to your expertise, list your cosmetology licence and any specialist certifications in a separate section with issuer and date, and quantify retail sales and rebookings.",
  },
  "aromatherapist": {
    include:
      "Contact details, a professional summary, a skills section (oil knowledge plus communication and organisation), work experience including client intake and case studies, a certifications section (NAHA/AIA-accredited), and education.",
    length:
      "One page — keep your accredited aromatherapy certification and oils knowledge high, note professional liability insurance and memberships, and reference case studies that show practical experience.",
    hardSkills: ["Essential-oil knowledge", "Blending & dilution", "Client intake & consultation", "Treatment planning", "Anatomy & physiology", "Case-study documentation", "Massage & application"],
    softSkills: ["Communication", "Empathy", "Organization", "Attention to detail", "Client care"],
    atsKeywords: ["Aromatherapy", "Essential Oils", "Holistic Therapy", "Client Consultation", "Treatment Planning", "Blending", "NAHA Certified"],
    atsNote:
      "List your accredited certification (NAHA or Alliance of International Aromatherapists), name your oils-knowledge and treatment skills, and reference client intake, case studies, liability insurance and professional memberships for credibility.",
  },
  "admin-operations-manager": {
    include:
      "Contact details, a professional summary, a core-competencies section organised by category, experience bullets pairing methodologies with measurable results, a skills/tools section, and a certifications section (Six Sigma, PMP).",
    length:
      "One to two pages — include 15–25 keywords matched to the posting, organise skills by category, and quantify results (e.g. \"reduced operational costs 20%\", \"increased efficiency 30%\").",
    hardSkills: ["Process improvement", "Lean Six Sigma", "KPI management", "Budget management", "Vendor management", "Resource allocation", "ERP / SAP / CRM systems"],
    softSkills: ["Team leadership", "Communication", "Problem solving", "Decision-making", "Stakeholder management"],
    atsKeywords: ["Operations Management", "Process Improvement", "Lean Six Sigma", "KPI Management", "Budget Management", "Vendor Management", "Operational Excellence"],
    atsNote:
      "Weave 15–25 posting-matched keywords (\"process improvement\", \"Lean Six Sigma\", \"KPI management\", \"vendor management\") across the summary, skills and bullets, name your systems (SAP, ERP), and quantify cost and efficiency gains.",
  },
  "executive-office-manager": {
    include:
      "Contact details, a professional summary, an experience section with measurable achievements, education, a skills section (hard plus soft), and a certifications section.",
    length:
      "One to two pages following Summary → Experience → Education → Skills → Certifications — use exact posting phrases (\"calendar management\", \"team coordination\") and quantify cost savings and process improvements.",
    hardSkills: ["Office operations", "Calendar & travel management", "Vendor & facilities coordination", "Budget administration", "HR support (onboarding, records)", "Microsoft Office / Google Workspace", "Bookkeeping (QuickBooks)"],
    softSkills: ["Organization", "Multi-tasking", "Confidentiality", "Communication", "Team coordination"],
    atsKeywords: ["Office Management", "Office Operations", "Calendar Management", "Vendor Management", "Budget Administration", "Team Coordination", "Microsoft Office"],
    atsNote:
      "Use exact posting phrases (\"calendar management\", \"team coordination\", \"inventory tracking\") in the summary, experience and skills, and quantify cost savings, process improvements and workplace gains rather than listing tasks.",
  },
  "credit-controller": {
    include:
      "Contact details, a summary, work experience with quantified collections results, education, a skills section organised by category (10–15 skills), and a certifications and languages section.",
    length:
      "One to two pages in a simple single-column layout — keep invoicing, reconciliation and collections high, and quantify aged-debt reduction and cash collected.",
    hardSkills: ["Accounts receivable & collections", "Invoicing", "Account reconciliation", "Credit analysis & scoring", "Aged-debt management", "Microsoft Excel", "SAP / accounting software"],
    softSkills: ["Communication", "Negotiation", "Attention to detail", "Customer service", "Proactivity"],
    atsKeywords: ["Credit Control", "Accounts Receivable", "Invoicing", "Reconciliation", "Collections", "Credit Analysis", "Account Management"],
    atsNote:
      "Use the posting's exact terms (\"invoicing\", \"reconciling\", \"accounts receivable\", \"collections\"), list 10–15 categorised skills (SAP, Excel, credit scoring plus negotiation), and quantify aged-debt reduction and cash collected.",
  },
  "academic-tutor": {
    include:
      "Contact details, an objective or summary of qualifications, work experience, educational background, a skills-and-proficiencies section (hard plus soft), and a certifications-and-licences section.",
    length:
      "One to two pages — match your skills to the listing for the ATS, keep your subject expertise and teaching methods high, and quantify student improvement (grades, exam scores).",
    hardSkills: ["Subject-matter expertise", "Lesson planning", "Curriculum differentiation", "Exam & test preparation", "Progress assessment", "Online learning platforms", "Teaching methodologies"],
    softSkills: ["Communication", "Patience", "Empathy", "Adaptability", "Problem solving"],
    atsKeywords: ["Tutoring", "Subject Matter Expertise", "Lesson Planning", "Test Preparation", "Differentiated Instruction", "Academic Support", "Student Assessment"],
    atsNote:
      "Match your skills to the listing's wording (\"test preparation\", \"differentiated instruction\", \"subject-matter expertise\"), highlight digital-tool and online-platform proficiency, and quantify student improvement (grades, exam scores).",
  },
  // ── Batch 25 (sourced via live SERP 2026: ResumeWorded, TealHQ, Enhancv, ResumeGenius, VisualCV, ZipRecruiter, ResumeMentor, Indeed, Resumaker, QwikResume, Medium/Reshtei) ──
  // Priorities: execs, tech/security, marketing/comms, nursing/care, science, hospitality, creative, HR/finance, support, childcare.
  "chief-information-officer": {
    include:
      "A professional summary, a categorised core-competencies section (technical depth plus executive soft skills), leadership experience with quantified impact, notable-projects and technology-initiative sections, and education and certifications.",
    length:
      "Two pages for a CIO — break the skills section into categories the hiring manager can scan, keep IT strategy and your strongest initiatives high on page one, and quantify budget, scale and business impact.",
    hardSkills: ["IT strategy & governance", "Enterprise architecture", "IT service management (ITIL)", "Cloud computing", "Cybersecurity oversight", "Technology budget management", "ERP / CRM & data"],
    softSkills: ["Strategic leadership", "Board communication", "Emotional intelligence", "Decision-making", "Team development"],
    atsKeywords: ["IT Strategy", "IT Management", "Enterprise Architecture", "Digital Transformation", "Cloud Computing", "ITIL", "Budget Management"],
    atsNote:
      "Break skills into scannable categories, keep only skills relevant to the posting, and weave IT-strategy terms (IT service management, enterprise architecture, digital transformation) into experience with quantified budget, scale and board-level impact.",
  },
  "cloud-project-manager": {
    include:
      "Contact details, a professional summary, a key-skills section (hard plus soft), an achievements section with tangible outcomes, work experience, and a separate certifications section (PMP, cloud certs).",
    length:
      "One to two pages — keep PMP/cloud certifications and your strongest delivery on page one, mirror the posting's skills, and quantify scope, budget and timeline outcomes.",
    hardSkills: ["Project management (Agile/Waterfall)", "Cloud infrastructure & networking", "Risk & change management", "Stakeholder communication", "Vendor & resource management", "Deliverables tracking", "Gantt / Jira / Kanban"],
    softSkills: ["Cross-functional leadership", "Communication", "Problem solving", "Organization", "Decision-making"],
    atsKeywords: ["Project Management", "PMP", "Agile", "Cloud Infrastructure", "Risk Management", "Stakeholder Communication", "Change Management"],
    atsNote:
      "Mirror the posting's terms (PMP, Agile, risk management, stakeholder communication) plus cloud specifics (cloud networking, infrastructure), put certifications in a separate section with issuer and date, and quantify scope, budget and timelines.",
  },
  "cryptographer": {
    include:
      "An IT-security summary, work experience with security duties and quantified achievements, an education section with relevant mathematics and cryptography coursework, a skills section, and certifications and clearances.",
    length:
      "One to two pages — keep cryptographic algorithms, encryption and your strongest projects on page one, reference a clean GitHub of cryptography work, and quantify impact (transactions secured, vulnerabilities reduced).",
    hardSkills: ["Cryptographic algorithms", "Data encryption", "Algorithm design", "NIST standards", "Python / C / C++", "Cryptographic libraries (OpenSSL)", "Number theory & discrete math"],
    softSkills: ["Problem solving", "Communication", "Attention to detail", "Ethical judgement", "Analytical thinking"],
    atsKeywords: ["Cryptography", "Encryption", "Cryptographic Algorithms", "Algorithm Design", "NIST", "Python", "Information Security"],
    atsNote:
      "Include the role's critical keywords (\"cryptography\", \"data encryption\", \"cryptographic algorithms\", \"NIST standards\"), list languages and libraries (Python, C/C++, OpenSSL), and quantify impact (transactions secured, vulnerabilities reduced).",
  },
  "digital-marketer": {
    include:
      "Contact details (with portfolio), a professional summary with niche-tailored keywords, a skills section listing tools and platforms in bullets, work experience with quantified results, education, and a certifications section.",
    length:
      "One to two pages — use standard headings the ATS understands, avoid graphics/skill-bars it cannot read, and quantify results (traffic, ROI, conversions).",
    hardSkills: ["SEO & SEM", "PPC & online advertising", "Campaign management", "Social media marketing", "Email marketing", "Analytics (GA4)", "Marketing tools (SEMrush, HubSpot, Mailchimp)"],
    softSkills: ["Creativity", "Analytical thinking", "Communication", "Adaptability", "Problem solving"],
    atsKeywords: ["Digital Marketing", "SEO", "PPC", "Campaign Management", "Social Media Marketing", "Google Analytics", "Email Marketing"],
    atsNote:
      "Tailor keywords to your niche (SEO: \"on-page SEO\", \"keyword mapping\"; PPC: \"Google Ads\", \"CTR optimization\"), name your tools, avoid icons/skill-bars ATS can't read, and quantify (e.g. \"organic traffic +35%\", \"ad ROI +25%\").",
  },
  "communications-director": {
    include:
      "Contact details, a professional summary, a skills section with proficiency levels, leadership-and-management experience with quantified impact, work experience, and education.",
    length:
      "Two pages for a director — show evidence of leading projects and people, integrate keywords into achievements, and use metrics (engagement, media placements, reach).",
    hardSkills: ["Strategic communications", "Corporate & internal communications", "Public & media relations", "Crisis communications", "Content strategy", "Reputation management", "Comms tools (Sprinklr, Hootsuite)"],
    softSkills: ["Leadership", "Strategic thinking", "Communication", "Stakeholder management", "Decision-making"],
    atsKeywords: ["Strategic Communications", "Corporate Communications", "Media Relations", "Crisis Communications", "Public Relations", "Content Strategy", "Reputation Management"],
    atsNote:
      "Use the posting's exact terms (\"internal communications\", \"crisis communications\", \"media relations\"), list tools with proficiency levels, show leadership evidence, and quantify with metrics (engagement +35%, media placements secured).",
  },
  "hospice-nurse": {
    include:
      "Contact details, a professional summary with empathy and metrics, a skills section organised by category, work experience with quantified outcomes, education, and a certifications section (CHPN, ACLS/CPR).",
    length:
      "One to two pages — organise skills by category (palliative care, pain management, family support), keep CHPN and your strongest end-of-life experience high, and quantify patients served.",
    hardSkills: ["Palliative & end-of-life care", "Pain & symptom management", "Patient & family education", "Care planning", "Grief & bereavement support", "Medication management", "EHR documentation"],
    softSkills: ["Compassion", "Empathy", "Communication", "Emotional resilience", "Teamwork"],
    atsKeywords: ["Hospice Care", "Palliative Care", "Pain Management", "End-of-Life Care", "Patient Education", "CHPN", "Symptom Management"],
    atsNote:
      "Organise skills by category (palliative care, pain management, family support), list CHPN/ACHPN and CPR/ACLS with issuer and date, and quantify experience (years, patients served) alongside the compassion the role demands.",
  },
  "healthcare-assistant": {
    include:
      "Contact details, a professional profile, a skills section balancing hard and soft skills, work experience describing patients and tasks, education, and additional sections (volunteer care, languages, references).",
    length:
      "One to two pages — keep patient-care, infection-control and vital-signs skills high, describe the patient types and tasks you handled, and lead with transferable strengths if you are early-career.",
    hardSkills: ["Personal & patient care", "Vital signs", "Infection control", "Mobility & manual handling", "Feeding & hygiene support", "Observation & reporting", "Record keeping"],
    softSkills: ["Communication", "Empathy", "Teamwork", "Patience", "Working under pressure"],
    atsKeywords: ["Healthcare Assistant", "Patient Care", "Vital Signs", "Infection Control", "Personal Care", "Manual Handling", "Record Keeping"],
    atsNote:
      "Balance hard skills (vital signs, infection control, manual handling) with soft skills (empathy, communication), mirror the posting's wording, and — if early-career — lead with transferable strengths and any care volunteering.",
  },
  "food-scientist": {
    include:
      "Contact details, a summary, professional experience, education, a skills section (after experience), and optional sections for publications, presentations and professional memberships.",
    length:
      "One to two pages — tailor the skills section to the posting, keep food safety, quality and process development high, and use bullets with measurable outcomes.",
    hardSkills: ["Food safety & quality assurance", "HACCP & regulatory compliance", "Sensory evaluation", "Process development", "Food chemistry & microbiology", "Lab analysis (HPLC, GC-MS)", "Statistical analysis (Minitab/JMP)"],
    softSkills: ["Scientific communication", "Cross-functional collaboration", "Project management", "Attention to detail", "Problem solving"],
    atsKeywords: ["Food Science", "Food Safety", "HACCP", "Quality Assurance", "Sensory Evaluation", "Product Development", "Regulatory Compliance"],
    atsNote:
      "Tailor the skills section to the posting (HACCP, FSMA, SQF, sensory evaluation, process development) and name your lab and analysis tools (HPLC, GC-MS, Minitab); use bullets with measurable outcomes.",
  },
  "food-beverage-manager": {
    include:
      "A professional summary, work experience in reverse chronological order focused on quantifiable results, a skills section mixing technical, tools and soft skills, and education with certifications.",
    length:
      "One to two pages — read the posting for repeated requirements (\"inventory management\", \"staff training\"), weave them in naturally, and quantify revenue, cost and guest-satisfaction outcomes.",
    hardSkills: ["F&B operations", "Inventory & cost control", "Menu development & engineering", "POS systems (MICROS)", "Banquet & event management", "P&L management", "Health & safety (ServSafe)"],
    softSkills: ["Leadership", "Customer service", "Communication", "Problem solving", "Team development"],
    atsKeywords: ["Food and Beverage", "Hospitality Management", "Inventory Management", "Cost Control", "Menu Development", "P&L Management", "Customer Service"],
    atsNote:
      "Incorporate terms that repeat in the posting (\"inventory management\", \"cost control\", \"menu engineering\", \"ServSafe\"), name your POS (MICROS), and quantify revenue, cost reduction and guest-satisfaction outcomes.",
  },
  "fashion-designer": {
    include:
      "A professional summary, a skills section (technical plus software), a portfolio section with a link or QR code to 3–5 standout pieces, work experience in reverse chronological order, education, and a certifications section.",
    length:
      "One to two pages — keep a prominent skills section and a portfolio link high on page one, and lead with your most recent work and any speciality (sustainable design, trend forecasting).",
    hardSkills: ["Sketching & illustration", "Pattern-making & draping", "Fabric & textile knowledge", "Adobe Creative Suite", "CLO 3D", "Trend forecasting", "Garment construction"],
    softSkills: ["Creativity", "Communication", "Attention to detail", "Collaboration", "Time management"],
    atsKeywords: ["Fashion Design", "Pattern Making", "Sketching", "Adobe Creative Suite", "CLO 3D", "Trend Forecasting", "Textiles"],
    atsNote:
      "List technical talents (sketching, pattern-making, draping) and software (Adobe Creative Suite, CLO 3D) in a dedicated section, include a portfolio link/QR to 3–5 pieces, and flag any speciality (sustainable design, trend forecasting).",
  },
  "compensation-benefits-analyst": {
    include:
      "Contact details, a professional summary, a skills section grouped by category (compensation, benefits administration, HRIS), work experience with action-verb bullets, and education and certifications.",
    length:
      "One to two pages — group up to 10–15 skills by category, keep compensation planning, job evaluation and HRIS high, and quantify programmes administered and savings.",
    hardSkills: ["Compensation planning & structures", "Benefits administration (401k, HSA/FSA, COBRA)", "Job evaluation & analysis", "HRIS (PeopleSoft/Workday)", "Market benchmarking", "Advanced Excel", "Compliance"],
    softSkills: ["Analytical thinking", "Attention to detail", "Communication", "Discretion", "Problem solving"],
    atsKeywords: ["Compensation", "Benefits Administration", "Job Evaluation", "HRIS", "Compensation Planning", "Market Benchmarking", "Compliance"],
    atsNote:
      "Group skills by category (compensation structures, benefits administration, HRIS), include keywords like \"job evaluation\", \"market benchmarking\" and your HRIS (PeopleSoft, Workday), and open each bullet with a strong action verb.",
  },
  "corporate-development-manager": {
    include:
      "Contact details, a professional summary, a skills section grouping related keywords (M&A, financial analysis), an experience section with achievements and metrics, and education and certifications.",
    length:
      "One to two pages — combine an action verb, a keyword and a quantifiable result in each bullet, and keep M&A, due diligence and valuation high on page one.",
    hardSkills: ["Mergers & acquisitions", "Due diligence & deal execution", "Financial modeling & valuation", "Post-merger integration", "Strategic planning", "Deal structuring", "Corporate finance"],
    softSkills: ["Analytical thinking", "Negotiation", "Communication", "Project management", "Stakeholder management"],
    atsKeywords: ["Mergers & Acquisitions", "Due Diligence", "Financial Modeling", "Valuation", "Strategic Planning", "Deal Execution", "Corporate Finance"],
    atsNote:
      "Group related keywords (\"M&A: due diligence, deal execution, post-merger integration\"; \"Financial: valuation, modeling, corporate finance\"), and write bullets that combine an action verb, a keyword and a quantifiable result.",
  },
  "customer-support-specialist": {
    include:
      "Contact details, a professional summary, a skills section mixing tools and soft skills tailored to the posting, work experience in reverse chronological order with quantified results, and education.",
    length:
      "One to two pages — keep ticket-resolution and communication skills high, name your support platforms exactly, and quantify CSAT, resolution time and ticket volume.",
    hardSkills: ["Ticket resolution", "CRM & helpdesk (Zendesk, Intercom, Salesforce Service Cloud)", "Live chat & email support", "Issue escalation", "Knowledge-base management", "Troubleshooting", "Phone support"],
    softSkills: ["Active listening", "Communication", "Conflict resolution", "Empathy", "Time management"],
    atsKeywords: ["Customer Support", "Ticket Resolution", "Zendesk", "Customer Satisfaction", "Issue Escalation", "Conflict Resolution", "Service Quality"],
    atsNote:
      "Use terms like \"customer support\", \"ticket resolution\" and \"issue escalation\" naturally, and name platforms exactly (Zendesk, Salesforce Service Cloud, Intercom) rather than \"helpdesk software\"; quantify CSAT, resolution time and volume.",
  },
  "childcare-worker": {
    include:
      "Contact details prominently, a summary, a skills section balancing hard and soft skills, work experience, and a certifications section (CPR/First Aid, CDA, ECE) shown in the summary and education.",
    length:
      "One to two pages in a hybrid format — display required certifications (CPR, First Aid, CDA) prominently, and use clear headings and bullets for child-development and safety skills.",
    hardSkills: ["Child development knowledge", "Safety & emergency procedures", "Educational activity planning", "Pediatric first aid", "Behaviour guidance", "Parent communication", "Documentation & record keeping"],
    softSkills: ["Patience", "Communication", "Creativity", "Teamwork", "Organization"],
    atsKeywords: ["Childcare", "Child Development", "Early Childhood Education", "CPR/First Aid", "Activity Planning", "Parental Communication", "Safety Procedures"],
    atsNote:
      "Review the posting for required credentials (CPR, First Aid, CDA, ECE) and display them in the summary and education, and balance hard skills (child development, safety procedures) with soft skills (patience, communication).",
  },
  // ── Batch 26 (sourced via live SERP 2026: ResumeWorded, TealHQ, QwikResume, LiveCareer, Resumaker, Enhancv, ResumeGenius, Zety, Resume.io, VisualCV, Indeed) ──
  // Priorities: pharmacy, mental health, beauty/wellness, education, fintech, finance, ops, support, logistics.
  "dispensing-assistant": {
    include:
      "Contact details at the top, a professional summary highlighting your qualifications, a strong experience section (dispensing, inventory, customer service), an education section (vocational training), and a skills section.",
    length:
      "One page — list around a dozen relevant skills, keep dispensing accuracy and customer service high, and quantify prescriptions processed and accuracy.",
    hardSkills: ["Medication dispensing", "Prescription processing & verification", "Inventory & stock control", "Secure medication storage", "Order documentation", "Payment processing", "Pharmaceutical terminology"],
    softSkills: ["Attention to detail", "Communication", "Empathy", "Reliability", "Teamwork"],
    atsKeywords: ["Pharmacy", "Dispensing", "Prescription Processing", "Inventory Management", "Stock Control", "Customer Service", "Medication"],
    atsNote:
      "Use specific terms (\"prescription verification\", \"dispensing\", \"stock control\") and pair medication knowledge with customer-service skills; quantify prescriptions processed and dispensing accuracy.",
  },
  "compounding-pharmacist": {
    include:
      "Contact details, a professional summary, a professional licence and certifications section, a pharmaceutical-skills section, relevant experience, continuing education, and patient-care and counseling skills.",
    length:
      "One to two pages — keep your licence, USP compounding standards and sterile-compounding experience high, and quantify accuracy and safety outcomes.",
    hardSkills: ["Sterile & non-sterile compounding", "USP <795>/<797> standards", "Pharmaceutical calculations", "Quality assurance", "Regulatory compliance", "Pharmaceutical documentation", "Inventory management"],
    softSkills: ["Attention to detail", "Communication", "Problem solving", "Collaboration", "Patient safety focus"],
    atsKeywords: ["Compounding", "Sterile Compounding", "USP 797", "Pharmaceutical Calculations", "Quality Assurance", "Regulatory Compliance", "Patient Safety"],
    atsNote:
      "Name the standards and techniques exactly (\"sterile compounding\", \"USP <797>\", \"quality assurance\"), list your licence and PCAB/ACA certifications, and quantify accuracy and patient-safety outcomes.",
  },
  "counseling-psychologist": {
    include:
      "Contact details, a professional summary, education, experience (Context-Action-Result framework), a skills section, a licences/certifications section, publications/presentations, and professional affiliations.",
    length:
      "Up to two pages, clean and well-sectioned — display your licensure and credentials prominently, and use the CAR framework to show achievements.",
    hardSkills: ["Psychotherapy", "Cognitive behavioural therapy (CBT)", "Psychological assessment", "Treatment planning", "Crisis intervention", "Group facilitation", "Trauma-informed care"],
    softSkills: ["Empathy", "Active listening", "Communication", "Ethics", "Client advocacy"],
    atsKeywords: ["Psychotherapy", "Cognitive Behavioral Therapy", "Treatment Planning", "Crisis Intervention", "Assessment", "Trauma-Informed Care", "Licensed"],
    atsNote:
      "Display licensure and credentials prominently (licensing is often required to practice), and include keywords like \"psychotherapy\", \"CBT\", \"treatment planning\" and \"trauma-informed care\" via the Context-Action-Result framework.",
  },
  "behavioral-health-technician": {
    include:
      "Contact details, a summary tailored to behavioural health, a certifications section (RBT first, with issue and expiry dates), a skills section, work experience, and education.",
    length:
      "One to two pages — list your RBT certification with status and dates, keep data-collection and behaviour-intervention skills high, and show collaboration with BCBAs.",
    hardSkills: ["Applied behaviour analysis (ABA)", "Behaviour-intervention plans", "Data collection & analysis", "Skill acquisition programmes", "Crisis de-escalation", "Progress documentation", "Family communication"],
    softSkills: ["Patience", "Empathy", "Consistency", "Communication", "Teamwork"],
    atsKeywords: ["Registered Behavior Technician", "RBT", "Applied Behavior Analysis", "ABA", "Data Collection", "Behavior Intervention", "BCBA"],
    atsNote:
      "List your BACB-registered RBT certification with issue and expiry dates first — it is the credential employers scan for — and show data collection, ABA intervention and collaboration with BCBAs.",
  },
  "nail-technician": {
    include:
      "Contact details, a professional summary, a skills section mixing technical and customer-service skills, work experience, and a dedicated certifications-and-licences section (licence first).",
    length:
      "One page — lead with your nail-technician licence, keep manicure/pedicure and gel/acrylic skills high, and quantify rebookings and retail sales.",
    hardSkills: ["Manicures & pedicures", "Gel & acrylic application", "Nail art & airbrush", "Sanitation & hygiene", "Nail-product knowledge", "Treatment application", "Retail & upselling"],
    softSkills: ["Customer service", "Communication", "Attention to detail", "Time management", "Creativity"],
    atsKeywords: ["Nail Technician", "Manicure", "Pedicure", "Gel & Acrylic", "Nail Art", "Sanitation", "Customer Service"],
    atsNote:
      "Put your nail-technician licence first in a dedicated certifications section, mix technical skills (gel, acrylic, nail art) with customer service, and quantify rebookings and retail sales.",
  },
  "reflexologist": {
    include:
      "Contact details, a professional summary opening with years and notable achievements, an experience section, a skills section, an education section, and a certifications heading (with awarding body and year).",
    length:
      "One to two pages — open with an impact summary, keep your reflexology techniques and certifications high, and list CPD courses under their own heading.",
    hardSkills: ["Foot & hand reflexology", "Reflexology techniques (RLD/MRM)", "Client assessment & intake", "Treatment planning", "Anatomy & physiology", "Hygiene & safety", "Holistic wellness advice"],
    softSkills: ["Communication", "Empathy", "Attention to detail", "Client care", "Professionalism"],
    atsKeywords: ["Reflexology", "Holistic Therapy", "Client Assessment", "Treatment Planning", "Foot Reflexology", "Wellness", "Certified Reflexologist"],
    atsNote:
      "Open with an impact statement (years, achievements), name your reflexology methods and any specialist training (RLD, MRM), and list certifications with awarding body and year under their own heading.",
  },
  "esl": {
    include:
      "Contact details, a professional summary leading with teaching years and student-achievement metrics, a teaching-experience section, education, a certifications section (TEFL/TESOL/CELTA), and a skills section.",
    length:
      "One to two pages — present TEFL/TESOL/CELTA prominently with in-class hours, keep teaching methodology and classroom management high, and quantify student-proficiency improvement.",
    hardSkills: ["ESL/EFL teaching methodology", "Grammar & pronunciation instruction", "Curriculum & lesson planning", "Classroom management", "Language assessment", "Cultural sensitivity", "Educational technology"],
    softSkills: ["Communication", "Patience", "Adaptability", "Creativity", "Cross-cultural awareness"],
    atsKeywords: ["ESL", "TEFL", "TESOL", "Lesson Planning", "Classroom Management", "Curriculum Development", "Language Assessment"],
    atsNote:
      "Present TEFL/TESOL/CELTA prominently with the certification name, issuer, date and in-class hours, mirror the posting's methodology terms, and quantify student-proficiency improvement.",
  },
  "education-coordinator": {
    include:
      "Contact details, a professional summary, an experience section with quantified results, education and certifications, and a skills section using exact posting keywords.",
    length:
      "One to two pages with standard headings — incorporate posting keywords (\"curriculum development\", \"student engagement\", \"program evaluation\"), and quantify impact (e.g. productivity +25%).",
    hardSkills: ["Curriculum development", "Program coordination & evaluation", "Student engagement", "Educational assessment", "Training-workshop delivery", "Scheduling & logistics", "Stakeholder communication"],
    softSkills: ["Organization", "Communication", "Problem solving", "Leadership", "Collaboration"],
    atsKeywords: ["Curriculum Development", "Program Coordination", "Student Engagement", "Educational Assessment", "Program Evaluation", "Training", "Stakeholder Communication"],
    atsNote:
      "Use standard headings and naturally incorporate the posting's keywords (\"curriculum development\", \"student engagement\", \"program evaluation\"), and quantify impact with numbers rather than vague phrasing.",
  },
  "forex-trader": {
    include:
      "Contact details, a summary, work experience as the centrepiece with strategies and results, education, a skills section (technical plus analytical), and additional sections (certifications, projects).",
    length:
      "One to two pages — keep technical analysis, risk management and your trading platforms high, and quantify P&L, win rate and risk-adjusted returns.",
    hardSkills: ["Technical & fundamental analysis", "Risk & leverage management", "Currency-pair analysis", "Trading platforms (MetaTrader)", "Bloomberg Terminal", "Trade execution", "Market research"],
    softSkills: ["Discipline", "Emotional resilience", "Rapid decision-making", "Analytical thinking", "Attention to detail"],
    atsKeywords: ["Forex Trading", "Technical Analysis", "Risk Management", "Currency Pairs", "MetaTrader", "Market Analysis", "Trade Execution"],
    atsNote:
      "Highlight technical analysis and risk management, name your platforms (MetaTrader, Bloomberg Terminal), and quantify P&L, win rate and risk-adjusted returns; show the discipline the role demands.",
  },
  "crypto-trader": {
    include:
      "Contact details, a summary stating years and key achievements, a work-experience section with quantified returns, an education section, and a skills section mixing technical and soft skills.",
    length:
      "One to two pages — keep trading strategies, exchange experience and risk management high, and quantify portfolio returns versus benchmarks.",
    hardSkills: ["Cryptocurrency trading strategies", "Exchange & order-book analysis", "Technical analysis", "Risk management", "Wallet & key management", "Arbitrage strategies", "On-chain & market data"],
    softSkills: ["Discipline", "Analytical thinking", "Decision-making under pressure", "Emotional resilience", "Attention to detail"],
    atsKeywords: ["Cryptocurrency Trading", "Technical Analysis", "Risk Management", "Trading Strategies", "Arbitrage", "Blockchain", "Market Analysis"],
    atsNote:
      "Name the exchanges and strategies you use (spot, futures, arbitrage), pair technical analysis with risk and key management, and quantify portfolio returns against market benchmarks.",
  },
  "payroll-officer": {
    include:
      "Contact details, a professional summary naming your payroll platforms and headcount, a technical-skills section (8–10) plus interpersonal skills, an experience section with quantified accomplishments, and education.",
    length:
      "One to two pages — open by stating headcount, payroll frequency and platforms (ADP, Workday, UKG), keep payroll processing and tax compliance high, and quantify accuracy and on-time filings.",
    hardSkills: ["Payroll processing (multi-state)", "Payroll tax compliance", "ADP / Paychex / Workday / UKG", "Garnishments & deductions", "Time & attendance integration", "GL payroll reconciliation", "Advanced Excel"],
    softSkills: ["Accuracy under deadline", "Confidentiality", "Communication", "Organization", "Problem resolution"],
    atsKeywords: ["Payroll Processing", "Payroll", "Payroll Tax Compliance", "ADP", "Workday", "Reconciliation", "HRIS"],
    atsNote:
      "Open the summary with headcount, payroll frequency and platforms (ADP Workforce Now, Workday, UKG) for keyword alignment, and quantify accuracy and on-time filings (e.g. \"bi-weekly payroll for 1,200 employees, zero late filings over 4 years\").",
  },
  "contracts-manager": {
    include:
      "Contact details, a recommended summary, a skills section, a professional-experience section, a projects section where applicable, and education and certifications — in reverse-chronological order.",
    length:
      "One to two pages — keep contract negotiation, lifecycle management and compliance high, mirror the posting's language, and quantify contract value and savings.",
    hardSkills: ["Contract negotiation", "Contract lifecycle management", "Contract drafting", "Risk management", "Legal compliance", "Vendor & procurement management", "CLM software"],
    softSkills: ["Attention to detail", "Communication", "Negotiation", "Analytical thinking", "Stakeholder management"],
    atsKeywords: ["Contract Management", "Contract Negotiation", "Contract Lifecycle Management", "Procurement", "Compliance", "Risk Management", "Vendor Management"],
    atsNote:
      "Mirror the posting's terms (\"contract negotiation\", \"vendor management\", \"contract lifecycle management\", \"compliance\"), avoid headers/footers/tables that confuse the ATS, and quantify contract value and savings.",
  },
  "call-centre-agent": {
    include:
      "Contact details, a professional summary, an experience section in reverse chronological order with quantified results, a skills section (communication, conflict handling, CRM use), and education.",
    length:
      "One page — keep call handling, CRM and customer-satisfaction strengths high, mirror the posting's terminology, and quantify CSAT, call volume and resolution rate.",
    hardSkills: ["Call handling", "CRM systems", "Active listening", "Conflict resolution", "Call logging", "Telephony platforms", "Order & complaint processing"],
    softSkills: ["Communication", "Empathy", "Patience", "Time management", "Problem solving"],
    atsKeywords: ["Call Center", "Customer Service", "CRM", "Call Handling", "Conflict Resolution", "Active Listening", "Customer Satisfaction"],
    atsNote:
      "Mix customer-facing strengths (conflict resolution, empathy) with tools (CRM, telephony, call logging), mirror the posting's terms, and quantify outcomes (e.g. \"95% customer-satisfaction rating over 12 months\").",
  },
  "driver": {
    include:
      "Contact details, a professional summary, a skills section (driving skills plus a clean record), work experience, and a licences-and-certifications section listing your licence class and endorsements (never the licence number).",
    length:
      "One page — list your licence class and endorsements (CDL, HME, passenger) in a dedicated section, keep safe-driving and route skills high, and show a clean safety record.",
    hardSkills: ["Safe & defensive driving", "Route planning & GPS navigation", "Vehicle inspection & maintenance checks", "Load handling", "Logbook & compliance", "Traffic-regulation adherence", "Time management"],
    softSkills: ["Reliability", "Attention to detail", "Communication", "Patience", "Customer service"],
    atsKeywords: ["Professional Driver", "Defensive Driving", "Route Planning", "Vehicle Inspection", "CDL", "Safety Record", "Logistics"],
    atsNote:
      "List your licence class and endorsements (CDL, HME, passenger, tanker) in a dedicated certifications section and a clean safety record, but never include the licence number; mirror the posting's vehicle and route terms.",
  },
  // ── Batch 27 (sourced via live SERP 2026: VisualCV, ResumeWorded, Resumaker, QwikResume, LiveCareer, ZipRecruiter, Enhancv, Indeed, TealHQ, BPS, GMC) ──
  // Priorities: faith, pharmacy specialties, beauty/wellness, finance/ops, public service, hospitality, animal care, medical.
  "chaplain": {
    include:
      "Contact details, a professional summary, education and certifications (Clinical Pastoral Education, denominational endorsement), pastoral experience, a skills section, and volunteer or outreach activities.",
    length:
      "One to two pages — keep your CPE and endorsement prominent, lead with pastoral-care and crisis-intervention experience, and show the settings you have served.",
    hardSkills: ["Pastoral care", "Spiritual guidance & counseling", "Crisis intervention", "Grief & bereavement support", "Worship & ritual leadership", "Interfaith ministry", "Confidentiality"],
    softSkills: ["Empathy", "Active listening", "Compassion", "Communication", "Conflict resolution"],
    atsKeywords: ["Pastoral Care", "Spiritual Care", "Chaplaincy", "Crisis Intervention", "Counseling", "Clinical Pastoral Education", "Grief Support"],
    atsNote:
      "List Clinical Pastoral Education (CPE) units and your denominational endorsement, and mirror the posting's terms (\"pastoral care\", \"spiritual care\", \"crisis intervention\"); show the settings served (hospital, hospice, military).",
  },
  "oncology-pharmacist": {
    include:
      "Contact details, a professional summary, a board-certification section (BCOP), a clinical-skills section, oncology experience with quantified outcomes, education and residency, and continuing education.",
    length:
      "One to two pages — keep BCOP and your oncology-pharmacotherapy experience on page one, and quantify regimens managed and outcomes.",
    hardSkills: ["Oncology pharmacotherapy", "Chemotherapy preparation & dispensing", "Treatment-protocol design", "Drug-interaction management", "Patient education & monitoring", "Sterile compounding", "Clinical documentation"],
    softSkills: ["Attention to detail", "Communication", "Critical thinking", "Collaboration", "Patient advocacy"],
    atsKeywords: ["Oncology Pharmacy", "BCOP", "Chemotherapy", "Pharmacotherapy", "Treatment Protocols", "Drug Interactions", "Patient Education"],
    atsNote:
      "Put BCOP (Board Certified Oncology Pharmacist) prominently and name oncology-specific terms (\"chemotherapy\", \"pharmacotherapy\", \"treatment protocols\"); quantify regimens managed and patient-outcome improvements.",
  },
  "pediatric-pharmacist": {
    include:
      "Contact details, a professional summary, a core-skills section emphasising paediatric pharmacology and dosing, work experience with quantified outcomes, education and licensure, and certifications (PALS, paediatric pharmacy).",
    length:
      "One to two pages — emphasise paediatric medications and dosing, keep licensure and certifications high, and quantify outcomes and parent/team communication.",
    hardSkills: ["Pediatric pharmacology & dosing", "Medication therapy management", "Compounding for paediatrics", "Drug-interaction review", "Patient & parent education", "PALS", "Clinical documentation"],
    softSkills: ["Communication", "Compassion", "Attention to detail", "Teamwork", "Problem solving"],
    atsKeywords: ["Pediatric Pharmacy", "Pediatric Dosing", "Medication Therapy Management", "Pharmacology", "PALS", "Patient Education", "Compounding"],
    atsNote:
      "Emphasise paediatric medications and dosing, list licensure plus PALS and any paediatric-pharmacy certification, and show clear communication with parents and care teams; quantify outcomes.",
  },
  "lash-technician": {
    include:
      "Contact details, a professional summary, a skills section (lash techniques plus customer service), a work-experience section in reverse chronological order, an education section (cosmetology/lash training), and a certifications section.",
    length:
      "One page — keep classic/volume/hybrid technique skills and your certifications high, and quantify retention and rebookings.",
    hardSkills: ["Classic, volume & hybrid lashes", "Lash mapping & customization", "Adhesive selection", "Lash lifts & tints", "Sanitation standards", "Eye anatomy & safety", "Retail & upselling"],
    softSkills: ["Customer service", "Attention to detail", "Communication", "Patience", "Time management"],
    atsKeywords: ["Lash Technician", "Eyelash Extensions", "Volume Lashes", "Lash Mapping", "Sanitation", "Customer Service", "Lash Lift"],
    atsNote:
      "Name the techniques (classic, volume, hybrid, lash mapping) and any certification (e.g. Xtreme Lashes) in a dedicated section, pair them with customer service, and quantify client retention and rebookings.",
  },
  "beauty-artist": {
    include:
      "Contact details, a professional summary, a skills section near the top (technical plus interpersonal), a portfolio link, work experience, education, and a certifications section.",
    length:
      "One to two pages — keep a skills section and portfolio link high, name your speciality (bridal, editorial, SFX), and quantify client volume, retention and revenue.",
    hardSkills: ["Makeup application & artistry", "Airbrushing & contouring", "Colour theory", "Skin preparation", "Special-effects (SFX) makeup", "Product knowledge", "Hygiene standards"],
    softSkills: ["Creativity", "Customer service", "Communication", "Attention to detail", "Adaptability"],
    atsKeywords: ["Makeup Artist", "Makeup Application", "Airbrushing", "Color Theory", "Bridal Makeup", "Special Effects", "Skin Preparation"],
    atsNote:
      "Place a skills section (color theory, airbrushing, SFX) near the top with a portfolio link, name your speciality (bridal, editorial, special effects), and quantify client volume, retention and revenue.",
  },
  "holistic-healer": {
    include:
      "Contact details, a summary or objective, a skills/highlights section, a certifications section, and a description of experience — formatted for easy navigation.",
    length:
      "One to two pages — keep client-assessment and wellness-planning skills high, list your holistic certifications, and show measurable client progress.",
    hardSkills: ["Client assessment", "Wellness & treatment planning", "Therapeutic techniques", "Nutrition & health education", "Holistic modalities (Reiki, yoga)", "Mind-body practices", "Case documentation"],
    softSkills: ["Empathy", "Communication", "Active listening", "Motivation", "Organization"],
    atsKeywords: ["Holistic Health", "Wellness Planning", "Client Assessment", "Therapeutic Techniques", "Nutrition", "Health Coaching", "Mind-Body"],
    atsNote:
      "Highlight client assessment, wellness planning and therapeutic techniques, list certifications (holistic/integrative medicine, CPR/AED, Mental Health First Aid), and show measurable client progress.",
  },
  "ayurvedic-practitioner": {
    include:
      "Contact details, a summary, an education-and-training section (formal credentials, Panchakarma/yoga qualifications), a skills section, clinical experience, and languages (Sanskrit/regional).",
    length:
      "One to two pages — keep your formal Ayurvedic credentials and diagnostic skills high, and list languages where they help client communication.",
    hardSkills: ["Ayurvedic diagnostics (Nadi Pariksha)", "Doshic assessment", "Herbal formulations", "Panchakarma therapies", "Diet & lifestyle planning", "Ayurvedic pharmacology", "Client counseling"],
    softSkills: ["Communication", "Empathy", "Diagnostic reasoning", "Patience", "Client care"],
    atsKeywords: ["Ayurveda", "Ayurvedic Medicine", "Panchakarma", "Herbal Formulations", "Doshic Assessment", "Holistic Health", "Wellness"],
    atsNote:
      "List your formal Ayurvedic training (hours/credits, NAMA certification where applicable) and diagnostic skills (Nadi Pariksha, Doshic assessment), and note languages (Sanskrit/regional) that aid client communication.",
  },
  "accounts-assistant": {
    include:
      "Contact details, a summary statement, an experience section, education, and a keyword-rich skills section using exact posting phrasing.",
    length:
      "One to two pages — keep invoicing, reconciliation and accounting software high, mirror the posting's exact wording, and quantify accuracy and volume.",
    hardSkills: ["Invoicing", "Bank reconciliation", "Accounts payable & receivable", "Ledger maintenance", "Microsoft Excel", "Accounting software (Sage/QuickBooks/SAP)", "Data entry"],
    softSkills: ["Attention to detail", "Communication", "Accuracy", "Organization", "Time management"],
    atsKeywords: ["Accounts Assistant", "Invoicing", "Reconciliation", "Accounts Payable", "Bank Reconciliation", "Sage", "Microsoft Excel"],
    atsNote:
      "Mirror the posting's exact phrasing (the ATS rarely recognises synonyms) — \"invoicing\", \"reconciling\", \"accounts payable\" — name your software (Sage, QuickBooks, Excel), and open bullets with action verbs.",
  },
  "inventory-controller": {
    include:
      "A professional summary, a skills section grouped under an inventory/supply-chain category, work experience in problem-solution-result format with quantified achievements, and credentials and education.",
    length:
      "One to two pages — group 10–15 skills by category, keep inventory management, cycle counting and ERP high, and quantify stock-accuracy and shrinkage improvements.",
    hardSkills: ["Inventory management", "Cycle counting & audits", "Stock reconciliation", "Demand forecasting", "ERP / WMS (SAP, Oracle)", "Barcode & RFID", "Data analysis"],
    softSkills: ["Attention to detail", "Problem solving", "Organization", "Team collaboration", "Communication"],
    atsKeywords: ["Inventory Management", "Cycle Counting", "ERP", "Stock Reconciliation", "Forecasting", "Warehouse Management", "Inventory Control"],
    atsNote:
      "Emphasise ATS terms (\"inventory management\", \"cycle counting\", \"ERP systems\", \"stock accuracy\"), name your systems (SAP, Oracle, WMS), and quantify stock-accuracy and shrinkage improvements with the problem-solution-result format.",
  },
  "civil-servant": {
    include:
      "Contact details, a personal statement, work experience in reverse chronological order, education, a skills section (technical plus soft), and certifications.",
    length:
      "One to two pages in a chronological format — order sections to match the post's priorities, mirror the job description's keywords, and quantify policy and service outcomes.",
    hardSkills: ["Policy analysis", "Public administration", "Stakeholder & government relations", "Research & briefing", "Programme delivery", "Budget & compliance", "Report writing"],
    softSkills: ["Communication", "Analytical thinking", "Teamwork", "Empathy", "Integrity"],
    atsKeywords: ["Public Administration", "Policy Analysis", "Government Relations", "Stakeholder Management", "Public Policy", "Programme Delivery", "Research"],
    atsNote:
      "Government bodies often use ATS — mirror the job description's keywords (\"policy analysis\", \"public administration\", \"stakeholder management\"), order sections to the post's priorities, and quantify policy and service outcomes.",
  },
  "catering-assistant": {
    include:
      "Contact details, a professional summary, work experience, education, and a skills section (after experience) covering food preparation, food safety and customer service.",
    length:
      "One page — keep food preparation, food safety and customer service high, pull as many relevant skills as possible from the listing, and show reliability.",
    hardSkills: ["Food preparation", "Food safety & HACCP", "Allergen management", "Service & plating", "Cleaning & sanitation", "Till operation", "Stock handling"],
    softSkills: ["Communication", "Teamwork", "Reliability", "Multitasking", "Customer service"],
    atsKeywords: ["Catering", "Food Preparation", "Food Safety", "Food Handling", "Customer Service", "HACCP", "Sanitation"],
    atsNote:
      "Pull relevant skills from the listing (\"food preparation\", \"food safety\", \"food handler\"), include HACCP and allergen awareness, and show reliability and teamwork; place the skills section after experience.",
  },
  "animal-care-specialist": {
    include:
      "Contact details, a summary, a focused skills section aligned with the posting, work experience, education, and any relevant certifications.",
    length:
      "One to two pages — keep animal handling, health assessment and welfare skills high, emphasise your passion for animals, and tailor skills to the posting.",
    hardSkills: ["Animal handling & restraint", "Health assessment & monitoring", "Feeding & nutritional care", "Kennel & enclosure management", "Vaccination support", "Animal-management software", "Sanitation & welfare standards"],
    softSkills: ["Compassion", "Communication", "Problem solving", "Attention to detail", "Reliability"],
    atsKeywords: ["Animal Care", "Animal Handling", "Health Assessment", "Kennel Management", "Animal Welfare", "Nutrition", "Customer Service"],
    atsNote:
      "Keep the skills section focused and aligned with the posting (\"animal handling\", \"health assessment\", \"kennel management\"), highlight relevant certifications, and convey genuine passion for animal welfare.",
  },
  "caretaker": {
    include:
      "Contact details, a summary, a skills section organised by category (patient care, medical support), work experience, education, and a certifications section (First Aid, CPR).",
    length:
      "One to two pages — balance hard skills (mobility assistance, vital signs, medication) with soft skills (compassion, communication), and add a languages line where the role needs it.",
    hardSkills: ["Personal care & hygiene assistance", "Mobility support", "Vital-signs monitoring", "Medication assistance", "Health & record documentation", "Meal preparation", "Use of medical equipment"],
    softSkills: ["Compassion", "Communication", "Active listening", "Patience", "Problem solving"],
    atsKeywords: ["Caregiving", "Personal Care", "Mobility Assistance", "Vital Signs", "Medication Administration", "First Aid/CPR", "Patient Care"],
    atsNote:
      "Organise skills by category (\"Patient Care\", \"Medical Support\"), list First Aid/CPR certifications, tailor to the posting, and add a languages line when the facility serves diverse clients.",
  },
  "hospital-consultant": {
    include:
      "Personal details, education, work and clinical experience, a skills section (hard plus soft), certifications, publications, continuing professional development, and references — ordered to the post's priorities.",
    length:
      "Keep a focused CV (1–2 pages for the summary CV; a full medical CV may run longer) — order sections to match the post, address the person specification, and list five years of CPD.",
    hardSkills: ["Specialist clinical practice", "Diagnosis & treatment planning", "Clinical governance", "Audit & quality improvement", "Teaching & supervision", "Multidisciplinary teamwork", "Research"],
    softSkills: ["Leadership", "Communication", "Decision-making", "Empathy", "Collaboration"],
    atsKeywords: ["Consultant", "Clinical Governance", "Diagnosis", "Treatment Planning", "Audit", "Continuing Professional Development", "Multidisciplinary"],
    atsNote:
      "Order sections to match the post's priorities and address the person specification directly, group clinical skills clearly, and list your last five years of CPD, audits and publications.",
  },
  // ── Batch 28 (sourced via live SERP 2026: LiveCareer, MinistryBoost, ResumeBuilder, Resumaker, JobHero, QwikResume, ResumeWorded, ResumeAdapter, Enhancv, Indeed, Medium/Reshtei) ──
  // Priorities: faith leaders (map to ReligiousTraditional template), medical, tech, therapy, sales, PM.
  "imam": {
    include:
      "Contact details, a professional summary, an education section (Islamic studies, Quran memorization, theology/jurisprudence), religious-leadership experience, a skills section, and languages (Arabic, Urdu, English).",
    length:
      "One to two pages — keep your Islamic-studies credentials and Quran/Arabic proficiency high, and show your community and pastoral-leadership experience.",
    hardSkills: ["Leading congregational prayers (Salah)", "Delivering sermons (Khutbah)", "Quran & hadith knowledge", "Islamic jurisprudence (Fiqh)", "Classical Arabic", "Religious education", "Community & youth programmes"],
    softSkills: ["Public speaking", "Pastoral care", "Mediation", "Empathy", "Community leadership"],
    atsKeywords: ["Imam", "Islamic Studies", "Quran", "Khutbah", "Pastoral Care", "Arabic", "Community Leadership"],
    atsNote:
      "Lead with your Islamic-studies credentials (madrasa/seminary, Quran memorization, Fiqh) and Arabic proficiency, and show community engagement (sermons, religious education, youth programmes, dispute mediation).",
  },
  "pastor": {
    include:
      "Contact details, a 2–3 sentence summary capturing your calling and leadership style, ministerial experience in reverse chronological order (with specialties), secular work experience, education, and a brief statement of faith and call to ministry.",
    length:
      "One to two pages — translate ministry outcomes into measurable results (attendance growth, volunteer teams, groups launched, budget managed), and keep a brief statement of faith and call to ministry.",
    hardSkills: ["Preaching & teaching", "Pastoral counseling", "Strategic planning", "Volunteer recruitment & development", "Community outreach", "Budget management", "Church software (Planning Center)"],
    softSkills: ["Communication", "Leadership", "Empathy", "Organization", "Initiative"],
    atsKeywords: ["Pastor", "Preaching", "Pastoral Care", "Ministry", "Counseling", "Community Outreach", "Discipleship"],
    atsNote:
      "Show pastoral heart alongside leadership skill, include a brief statement of faith and call to ministry, and quantify outcomes (attendance growth, volunteer teams built, small groups launched, baptisms, budget managed).",
  },
  "priest": {
    include:
      "Contact details, a summary or objective, religious-leadership experience, education (theology/religious studies, M.Div. or seminary), a skills section, and additional sections (languages, memberships, publications).",
    length:
      "One to two pages — keep your seminary education and liturgical and pastoral experience high, and demonstrate community engagement.",
    hardSkills: ["Leading religious services & liturgy", "Administering sacraments", "Preaching & homiletics", "Pastoral care & counseling", "Religious education", "Community outreach", "Theology & doctrine"],
    softSkills: ["Compassion", "Communication", "Active listening", "Leadership", "Discretion"],
    atsKeywords: ["Priest", "Liturgy", "Sacraments", "Pastoral Care", "Preaching", "Community Outreach", "Theology"],
    atsNote:
      "Highlight liturgy, the sacraments and pastoral care, keep your seminary education (M.Div. or equivalent) prominent, and show community engagement and counseling experience.",
  },
  "rabbi": {
    include:
      "Contact details, a professional summary, education and ordination (seminary), religious-leadership experience including life-cycle events and teaching, a core-competencies section, and languages.",
    length:
      "One to two pages — keep your ordination and pastoral and teaching experience high, and include specific life-cycle events (weddings, b'nai mitzvah, funerals).",
    hardSkills: ["Leading worship services", "Pastoral care & counseling", "Jewish law, customs & texts", "Life-cycle events", "Religious teaching (children & adults)", "Community building", "Hebrew & liturgy"],
    softSkills: ["Public speaking", "Leadership", "Empathy", "Networking", "Communication"],
    atsKeywords: ["Rabbi", "Jewish Studies", "Pastoral Care", "Worship Services", "Torah", "Community Building", "Hebrew"],
    atsNote:
      "Keep your ordination and seminary training prominent, show deep knowledge of Jewish law and texts, and include specific life-cycle events (weddings, b'nai mitzvah, funerals) and teaching experience.",
  },
  "mufti": {
    include:
      "Contact details, a professional summary, an education section (Alim/Ifta qualification, Islamic jurisprudence), religious-leadership and teaching experience, a skills section, and languages (Arabic, Urdu, English).",
    length:
      "One to two pages — keep your Ifta/Alim credentials and jurisprudence expertise high, and show teaching and fatwa-issuing or advisory experience.",
    hardSkills: ["Islamic jurisprudence (Fiqh)", "Fatwa (legal opinion) issuance", "Quran & hadith scholarship", "Classical Arabic", "Religious teaching", "Verbal reasoning", "Comparative jurisprudence"],
    softSkills: ["Scholarly rigour", "Communication", "Ethical judgement", "Patience", "Advisory skills"],
    atsKeywords: ["Mufti", "Islamic Jurisprudence", "Fiqh", "Fatwa", "Islamic Studies", "Arabic", "Sharia"],
    atsNote:
      "Emphasise your Ifta/Alim qualification and command of Islamic jurisprudence (Fiqh), Quran and hadith, and Classical Arabic; show fatwa-issuing, advisory and teaching experience.",
  },
  "internal-medicine-doctor": {
    include:
      "Contact details, a summary, education and training, licensure and board certification (ABIM), clinical experience, and a skills section (six to ten skills, hard plus soft).",
    length:
      "A physician CV is multi-page; keep board certification (ABIM) and your strongest clinical experience on page one, and quantify panels and outcomes.",
    hardSkills: ["Adult primary & acute care", "Chronic-disease management (diabetes, hypertension)", "Diagnostic & lab interpretation", "Treatment planning", "Preventive medicine", "EHR (Epic / Cerner)", "Care coordination"],
    softSkills: ["Clinical judgement", "Communication", "Empathy", "Teamwork", "Attention to detail"],
    atsKeywords: ["Internal Medicine", "Board Certified", "Chronic Disease Management", "Diagnosis", "Patient Care", "Preventive Medicine", "ABIM"],
    atsNote:
      "List board certification (ABIM) and licence, mirror the posting's terms (\"chronic disease management\", \"diagnosis\", \"preventive medicine\"), and quantify panel size and quality outcomes.",
  },
  "obstetrician": {
    include:
      "Contact details, a summary, education and residency, board certification or eligibility (OB-GYN) and an unrestricted licence in a visible section, clinical and surgical experience with delivery and procedure volumes, and a skills section.",
    length:
      "A physician CV is multi-page; keep board certification, licence and your delivery and surgical experience on page one, and quantify deliveries and procedures.",
    hardSkills: ["Labour & delivery management", "Prenatal & postnatal care", "Fetal monitoring", "Caesarean section", "High-risk pregnancy care", "Minimally invasive surgery", "EMR documentation"],
    softSkills: ["Composure under pressure", "Communication", "Empathy", "Team leadership", "Decision-making"],
    atsKeywords: ["Obstetrics", "Board Certified", "Labor and Delivery", "Prenatal Care", "Cesarean Section", "Fetal Monitoring", "ACOG"],
    atsNote:
      "Make board certification or eligibility (OB-GYN) and an unrestricted licence visible and current, mirror the posting's terms (\"labour and delivery\", \"fetal monitoring\", \"high-risk pregnancy\"), and quantify deliveries and procedures.",
  },
  "physical-therapist": {
    include:
      "Contact details, a professional summary, education (DPT first), a licensure-and-certifications section (with licence numbers and expiry), professional experience with quantified achievements, a skills section organised by category, and professional development.",
    length:
      "One to two pages — use standard headings (\"Professional Experience\", \"Licensure & Certifications\"), keep your DPT and licence high, and use 3–5 outcome-focused bullets per role.",
    hardSkills: ["Patient assessment & evaluation", "Manual therapy", "Gait & balance training", "Therapeutic exercise", "Orthopedic & neuro rehabilitation", "Treatment planning", "EHR documentation"],
    softSkills: ["Empathy", "Communication", "Patience", "Teamwork", "Motivation"],
    atsKeywords: ["Physical Therapy", "Rehabilitation", "Manual Therapy", "Patient Care", "Gait Training", "Therapeutic Exercise", "DPT"],
    atsNote:
      "Use natural keywords (\"rehabilitation\", \"manual therapy\", \"patient care\"), list your DPT and state licence with number and expiry, organise skills by category, and quantify functional-outcome improvements.",
  },
  "software-developer": {
    include:
      "A professional summary, a dedicated skills section with exact-match technical keywords, work experience and projects with keyword-rich, outcome-based bullets, and education.",
    length:
      "One page for 0–5 years, two for senior — place keywords inside experience and project bullets that show what you did, the tool you used and the result, with strong action verbs.",
    hardSkills: ["JavaScript / Python / Java", "React / Node.js / Django", "REST & GraphQL APIs", "SQL & NoSQL", "Git", "Docker & CI/CD", "Testing (TDD)"],
    softSkills: ["Problem solving", "Communication", "Collaboration", "Code review", "Ownership"],
    atsKeywords: ["JavaScript", "Python", "Java", "React", "Node.js", "REST API", "SQL", "Git"],
    atsNote:
      "Read the posting for the skills named in the title and requirements, place exact-match keywords in a dedicated skills section, and prove them inside project/experience bullets (what you did, the tool, the result).",
  },
  "mobile-app-developer": {
    include:
      "A header, a summary or objective using the exact target title (iOS/Android Developer), work experience with metrics, education, a skills section grouped by category, a certifications section, and an app-portfolio/projects section.",
    length:
      "One to two pages — use the exact job title from the posting, group skills by category (platforms, languages, integration), and quantify app performance, crash rates and user adoption.",
    hardSkills: ["iOS / Android", "Swift / Kotlin / Java", "API integration & web services", "Mobile UI/UX", "OOP & design patterns", "Performance optimization", "Git & CI/CD"],
    softSkills: ["Collaboration", "Communication", "Attention to detail", "Problem solving", "Adaptability"],
    atsKeywords: ["iOS", "Android", "Swift", "Kotlin", "Java", "Mobile Development", "API Integration"],
    atsNote:
      "Use exact titles (\"iOS Developer\", \"Android Developer\") to pass ATS filters, group skills by category (platforms, languages, integration), and quantify app performance, crash rate, release speed and user adoption.",
  },
  "system-administrator": {
    include:
      "A 4–5 line professional summary, a technical-skills matrix grouped by category (OS, virtualization, cloud, security) at the top, work experience with quantifiable achievements, a certifications section, and education.",
    length:
      "One to two pages in chronological format — display the skills matrix prominently, include 25–35 relevant keywords from the posting, and quantify uptime and resolution improvements.",
    hardSkills: ["Windows Server & Linux", "Active Directory", "PowerShell / Bash", "Virtualization (VMware/Hyper-V)", "Backup & disaster recovery", "Patch management & monitoring", "Cloud (AWS/Azure)"],
    softSkills: ["Problem solving", "Communication", "Attention to detail", "Time management", "Reliability"],
    atsKeywords: ["System Administration", "Windows Server", "Linux", "Active Directory", "PowerShell", "Virtualization", "Backup and Recovery"],
    atsNote:
      "Display a categorised skills matrix at the top (OS, virtualization, cloud, security), use exact tool names (Windows Server, Active Directory, VMware), and include certifications (MCSA, CompTIA Server+, Azure Administrator); quantify uptime.",
  },
  "licensed-massage-therapist": {
    include:
      "Contact details, a summary, education, a skills section (hard plus soft), work experience, and a certifications section listing your licence and modality training.",
    length:
      "One page — keep your licence and massage modalities high, list specialist modality training, and show client retention and rebookings.",
    hardSkills: ["Swedish massage", "Deep-tissue massage", "Trigger-point therapy", "Sports massage", "Client assessment", "Treatment planning", "Body mechanics & safety"],
    softSkills: ["Active listening", "Communication", "Empathy", "Adaptability", "Physical stamina"],
    atsKeywords: ["Massage Therapy", "Swedish Massage", "Deep Tissue", "Trigger Point Therapy", "Sports Massage", "Client Assessment", "Licensed Massage Therapist"],
    atsNote:
      "List your state licence and any board certification (NCBTMB), name the modalities you practise (Swedish, deep tissue, trigger point, sports), and show client retention and continuing education.",
  },
  "sales-development-representative": {
    include:
      "Contact details, a professional summary, work experience with metrics, education, and a skills section listing tools and processes (CRM, outbound) — in standard ATS-friendly sections.",
    length:
      "One page — keep lead generation, prospecting and CRM high, and quantify dials/day, meetings booked, conversion rates and quota attainment.",
    hardSkills: ["Lead generation", "Outbound prospecting & cold calling", "Lead qualification", "CRM (Salesforce, HubSpot)", "Email sequencing", "Demo booking", "Pipeline management"],
    softSkills: ["Communication", "Resilience", "Active listening", "Time management", "Persistence"],
    atsKeywords: ["Sales Development", "Lead Generation", "Cold Calling", "CRM", "Salesforce", "Prospecting", "B2B Sales"],
    atsNote:
      "Use terms like \"lead generation\", \"sales prospecting\", \"cold calling\" and \"CRM\", name your tools (Salesforce, HubSpot), and quantify dials/day, meetings booked, open rates and quota attainment.",
  },
  "technical-project-manager": {
    include:
      "Contact details, a professional summary, a technical-skills section (languages, methodologies, tools), project highlights with metrics, professional experience, and a dedicated certifications section (PMP, Scrum, cloud).",
    length:
      "One to two pages — keep Agile, stakeholder management and your strongest delivery on page one, reference certifications in the summary, and quantify scope, budget and timeline outcomes.",
    hardSkills: ["Project management (Agile/Scrum/Waterfall)", "Technical delivery", "Risk & change management", "Stakeholder management", "Budget & resource management", "Jira / Confluence", "Cross-functional leadership"],
    softSkills: ["Leadership", "Communication", "Problem solving", "Conflict resolution", "Decision-making"],
    atsKeywords: ["Technical Project Management", "Agile", "Scrum", "PMP", "Stakeholder Management", "Risk Management", "Jira"],
    atsNote:
      "Include the keywords in nearly every posting (Project Management, Agile, Scrum, PMP, stakeholder management, Jira), list PMP/Scrum and any cloud certs in a dedicated section, and quantify scope, budget and timelines.",
  },
  // ── Batch 29 (sourced via live SERP 2026: Wozber, LiveCareer, QwikResume, ResumeWorded, Enhancv, SikhNet, Resumaker, ResumeGemini, Indeed, Resume.io) ──
  // Priorities: surgery, nursing, tech, faith leaders, therapy, marketing.
  "oral-surgeon": {
    include:
      "Contact details, a professional summary, education (DDS/DMD, OMS residency, fellowships), board certification (ABOMS) prominently, surgical experience using the Context-Action-Result framework, a skills section, and publications and affiliations.",
    length:
      "A surgeon's CV is multi-page; keep board certification (ABOMS) and your strongest surgical experience on page one, and quantify procedures and outcomes.",
    hardSkills: ["Dentoalveolar surgery", "Dental implants", "Orthognathic surgery", "IV sedation & anaesthesia", "Bone grafting", "Maxillofacial trauma", "Pathology & extractions"],
    softSkills: ["Precision", "Patient communication", "Composure", "Teamwork", "Empathy"],
    atsKeywords: ["Oral and Maxillofacial Surgery", "Board Certified", "Dental Implants", "Orthognathic Surgery", "IV Sedation", "ABOMS", "Patient Care"],
    atsNote:
      "Feature board certification (ABOMS) prominently and name procedures the way postings do (\"dental implants\", \"orthognathic surgery\", \"IV sedation\"); use the Context-Action-Result format and quantify procedures.",
  },
  "orthodontist": {
    include:
      "Contact details, a 3–4 line summary, work experience, education (dental school, orthodontic residency), a board-certification and licensure section (bulleted, with issuer), and a skills section.",
    length:
      "One to two pages — keep your ABO board certification, licences and your strongest clinical experience high, and quantify cases and outcomes.",
    hardSkills: ["Braces & aligners (Invisalign)", "Diagnosis & treatment planning", "Cephalometric analysis", "Dental imaging", "Appliance fitting", "Patient management software", "Lingual orthodontics"],
    softSkills: ["Patient communication", "Attention to detail", "Customer service", "Organization", "Empathy"],
    atsKeywords: ["Orthodontics", "Board Certified", "Braces", "Aligners", "Treatment Planning", "Cephalometric Analysis", "ABO"],
    atsNote:
      "List ABO board certification and state licensure in a bulleted section with issuer and date, and name treatments the posting cites (\"braces\", \"aligners\", \"treatment planning\"); quantify cases.",
  },
  "pediatric-surgeon": {
    include:
      "Contact details, a professional summary, education and training, board certification (American Board of Surgery, Pediatric Surgery) with certificate number and date, surgical experience with case volumes, a skills section, and committee memberships and publications.",
    length:
      "A surgeon's CV is multi-page; keep board certification, licence and your strongest paediatric surgical experience on page one, and quantify case volumes and outcomes.",
    hardSkills: ["Pediatric general surgery", "Neonatal surgery", "Laparoscopic & robotic techniques", "Trauma management", "Pediatric anatomy & physiology", "Intensive care", "EHR documentation"],
    softSkills: ["Precision", "Composure under pressure", "Communication", "Empathy", "Team leadership"],
    atsKeywords: ["Pediatric Surgery", "Board Certified", "Neonatal Surgery", "Laparoscopic", "Trauma", "ATLS/PALS", "Patient Care"],
    atsNote:
      "List board certification (American Board of Surgery, Pediatric Surgery) with certificate number and date plus ATLS/PALS/NRP, and name paediatric procedures and techniques; quantify case volumes and outcomes.",
  },
  "trauma-surgeon": {
    include:
      "Contact details (credentials in the header, e.g. MD, FACS, board certified), a summary emphasising surgical expertise, surgical experience in reverse chronological order, education and a dedicated certifications section, and a technical-skills section.",
    length:
      "A surgeon's CV is multi-page; put credentials in the header, keep board certification and your strongest trauma experience on page one, and quantify cases and outcomes.",
    hardSkills: ["Emergency & trauma surgery", "Resuscitation & damage control", "Surgical decision-making", "Critical care", "Interventional procedures", "Trauma protocols", "EHR documentation"],
    softSkills: ["Decision-making under pressure", "Composure", "Leadership", "Communication", "Teamwork"],
    atsKeywords: ["Trauma Surgery", "Board Certified", "Resuscitation", "Critical Care", "ATLS/ACLS", "Emergency Surgery", "Patient Care"],
    atsNote:
      "Put credentials in the header (MD, FACS, Board Certified), list ABS certification and ATLS/ACLS/BLS in a dedicated section, and mirror trauma terms (\"resuscitation\", \"damage control\", \"critical care\"); quantify cases.",
  },
  "nurse-midwife": {
    include:
      "Contact details, a summary or objective, professional experience with action-verb bullets, education, a skills section (clinical plus interpersonal), and a certifications section (CNM via AMCB, BLS, NRP).",
    length:
      "One to two pages — keep your CNM certification and obstetric experience high, and quantify deliveries, patient panels and outcomes.",
    hardSkills: ["Prenatal & postnatal care", "Labour & delivery", "Newborn assessment", "Women's health & gynaecology", "Family-health counseling", "Patient education", "EHR documentation"],
    softSkills: ["Communication", "Empathy", "Composure", "Patient advocacy", "Teamwork"],
    atsKeywords: ["Nurse Midwife", "CNM", "Prenatal Care", "Labor and Delivery", "Women's Health", "Newborn Care", "BLS"],
    atsNote:
      "List your CNM certification (AMCB) plus BLS and NRP, mirror the posting's terms (\"prenatal care\", \"labour and delivery\", \"women's health\"), and quantify deliveries and outcomes.",
  },
  "mental-health-nurse": {
    include:
      "Contact details, a summary, professional experience, a skills section grouped by category (mental-health care, medication management, therapeutic techniques), a licences-and-certifications section (PMHN-BC, CPI, BLS), and education.",
    length:
      "One to two pages — keep psychiatric-assessment and crisis-intervention experience high, list de-escalation training, and quantify caseloads and outcomes.",
    hardSkills: ["Psychiatric evaluation & assessment", "Crisis intervention & de-escalation", "Medication management", "Treatment-plan development", "Suicide-risk assessment", "Therapeutic techniques (CBT/MI)", "EHR documentation"],
    softSkills: ["Empathy", "Communication", "Composure under pressure", "Patience", "Teamwork"],
    atsKeywords: ["Mental Health Nursing", "Psychiatric Assessment", "Crisis Intervention", "Medication Management", "Treatment Planning", "PMHN-BC", "De-escalation"],
    atsNote:
      "Group skills by category (mental-health care, medication management, therapeutic techniques), list PMHN-BC plus de-escalation training (CPI) and BLS/ACLS, and quantify caseloads and outcomes.",
  },
  "solutions-architect": {
    include:
      "A professional summary, a skills section leading with system architecture and cloud, work experience weaving keywords into outcome-based bullets, education, and a certifications section (AWS/Azure Solutions Architect).",
    length:
      "One to two pages — keep system architecture, cloud platforms and your strongest designs on page one, and quantify scale, reliability and cost outcomes.",
    hardSkills: ["Solution & system architecture", "Cloud platforms (AWS/Azure)", "Microservices", "DevOps & CI/CD", "Databases & SQL", "Technical design", "ITIL"],
    softSkills: ["Communication", "Stakeholder management", "Problem solving", "Decision-making", "Documentation"],
    atsKeywords: ["Solution Architecture", "Cloud Computing", "AWS", "Microservices", "System Architecture", "DevOps", "Technical Design"],
    atsNote:
      "The top skills (system architecture, technical design, enterprise solutions, cloud platforms, databases) appear in 80%+ of postings — prioritise them and weave them into bullets; list AWS/Azure Solutions Architect certifications.",
  },
  "granthi": {
    include:
      "Contact details, a professional summary, an experience section (Gurdwara service, ceremonies), education and training (Sikh Missionary College or equivalent), a skills section, and languages (Punjabi/Gurmukhi).",
    length:
      "One to two pages — keep your Gurbani knowledge, Kirtan and Gurdwara experience high, and note your years of service in a busy Gurdwara.",
    hardSkills: ["Gurbani recitation & Katha", "Kirtan (classical ragas)", "Harmonium & tabla", "Sikh ceremonies (Anand Karaj, Akhand Path)", "Punjabi & Gurmukhi", "Spiritual counseling", "Religious teaching"],
    softSkills: ["Oratory", "Empathy", "Community leadership", "Patience", "Devotion"],
    atsKeywords: ["Granthi", "Gurbani", "Kirtan", "Sikh Ceremonies", "Punjabi", "Spiritual Counseling", "Gurdwara"],
    atsNote:
      "Show extensive knowledge of Gurbani and Sikh principles, fluency in Punjabi/Gurmukhi and proficiency in Kirtan (ragas, harmonium, tabla), and note years of service in a busy Gurdwara and your training.",
  },
  "pandit": {
    include:
      "Contact details, a professional summary, an experience section detailing ceremonies performed (poojas, yagnas, samskaras), education and scriptural training, a skills section, and languages (Sanskrit/Hindi/regional).",
    length:
      "One to two pages — keep your scriptural knowledge and the range of ceremonies you perform high, and note community and temple service.",
    hardSkills: ["Vedic rituals & poojas", "Yagnas & havans", "Samskaras (life-cycle ceremonies)", "Mantra & scripture recitation", "Sanskrit & shastra knowledge", "Astrology (where applicable)", "Spiritual guidance"],
    softSkills: ["Public speaking", "Empathy", "Community outreach", "Patience", "Organization"],
    atsKeywords: ["Pandit", "Hindu Priest", "Vedic Rituals", "Pooja", "Sanskrit", "Ceremonies", "Spiritual Guidance"],
    atsNote:
      "Emphasise the ceremonies you perform (poojas, yagnas, samskaras), scriptural and Sanskrit knowledge, and pastoral/community outreach; note languages (Sanskrit, Hindi, regional) and temple service.",
  },
  "monk": {
    include:
      "Contact details, a professional summary highlighting spiritual growth and inclusive community, an experience section with quantified reach, a skills section, education and training, and any teaching or interfaith work.",
    length:
      "One to two pages — keep meditation-instruction and Dharma-teaching experience high, and quantify the groups and students you have led.",
    hardSkills: ["Meditation instruction", "Buddhist philosophy & Dharma teaching", "Mindfulness training", "Spiritual counseling", "Group facilitation", "Temple & community programmes", "Ethics & contemplative practice"],
    softSkills: ["Compassion", "Communication", "Patience", "Mindfulness", "Inclusivity"],
    atsKeywords: ["Meditation", "Buddhist Philosophy", "Dharma", "Mindfulness", "Spiritual Counseling", "Group Facilitation", "Wellness"],
    atsNote:
      "Highlight meditation instruction, Dharma teaching and mindfulness training, quantify the groups and students led, and note interfaith collaboration and youth/education programmes.",
  },
  "infrastructure-engineer": {
    include:
      "A summary, a skills section showing you can design, automate and operate reliable systems, work experience with quantified reliability gains, a projects section, education, and a certifications section.",
    length:
      "One to two pages — mirror the posting's cloud and IaC keywords, keep your strongest reliability work high, and quantify uptime and cost improvements.",
    hardSkills: ["Cloud (AWS/Azure/GCP)", "Infrastructure as Code (Terraform/Ansible)", "Kubernetes & Docker", "CI/CD pipelines", "Networking & security", "Monitoring & observability", "Linux"],
    softSkills: ["Problem solving", "Communication", "Collaboration", "Ownership", "Attention to detail"],
    atsKeywords: ["Infrastructure as Code", "AWS", "Terraform", "Kubernetes", "CI/CD", "Cloud", "Reliability"],
    atsNote:
      "Mirror the posting's keywords (\"Infrastructure as Code\", \"CI/CD pipelines\", \"Terraform\", \"Kubernetes\", \"AWS\"), show you design and operate reliable systems, and quantify uptime and cost improvements.",
  },
  "speech-therapist": {
    include:
      "Contact details, an objective or summary, work experience with bulleted duties, education (degree and Master's), a skills section (clinical plus interpersonal), and a certifications section (ASHA CCC-SLP, state licence).",
    length:
      "One to two pages — keep your CCC-SLP and clinical-assessment experience high, name your therapy techniques, and quantify caseloads and outcomes.",
    hardSkills: ["Speech & language assessment", "Swallowing (dysphagia) evaluation", "Cognitive-communication therapy", "Treatment planning", "Standardized testing", "AAC", "Progress documentation"],
    softSkills: ["Communication", "Empathy", "Patience", "Creativity", "Collaboration"],
    atsKeywords: ["Speech-Language Pathology", "CCC-SLP", "Dysphagia", "Articulation", "Treatment Planning", "Assessment", "ASHA"],
    atsNote:
      "List ASHA CCC-SLP and state licensure prominently, name therapy techniques and tools the posting cites (\"dysphagia\", \"AAC\", \"articulation\"), and quantify caseloads and functional outcomes.",
  },
  "marriage-family-therapist": {
    include:
      "Contact details, a 3–4 line professional summary, experience, education, and a certifications section with your LMFT licence upfront, naming the state where you hold it.",
    length:
      "One to two pages — keep your LMFT licence and therapeutic-modality experience high, and quantify caseloads and client outcomes.",
    hardSkills: ["Family-systems therapy", "Cognitive-behavioural therapy (CBT)", "Couples counseling", "Assessment & treatment planning", "Crisis intervention", "Case documentation", "Knowledge of regulations"],
    softSkills: ["Active listening", "Empathy", "Communication", "Rapport building", "Problem solving"],
    atsKeywords: ["Marriage and Family Therapy", "LMFT", "Family Systems Therapy", "CBT", "Couples Counseling", "Treatment Planning", "Crisis Intervention"],
    atsNote:
      "Put your LMFT licence (with the state) upfront to match the posting, name your therapeutic modalities (family systems, CBT), and quantify caseloads and client outcomes.",
  },
  "marketing-director": {
    include:
      "Contact details, a professional summary presenting strategic vision, a core-competencies section, professional experience with quantified impact, a significant-campaigns section, and education and certifications.",
    length:
      "One to two pages — include 10–20 posting-matched keywords, keep brand strategy, campaign management and your strongest results high, and quantify ROI, pipeline and growth.",
    hardSkills: ["Marketing strategy", "Brand strategy & messaging", "Campaign management", "Demand generation", "Digital marketing & SEO", "Marketing automation (HubSpot)", "Analytics (GA4) & ROI"],
    softSkills: ["Strategic leadership", "Team leadership", "Communication", "Decision-making", "Collaboration"],
    atsKeywords: ["Marketing Strategy", "Brand Strategy", "Campaign Management", "Demand Generation", "SEO", "Marketing Automation", "ROI Analysis"],
    atsNote:
      "Place posting terms (\"marketing strategy\", \"campaign management\", \"brand strategy\", \"go-to-market\") across the summary, competencies and experience, name tools (HubSpot, GA4), and quantify ROI, pipeline and growth.",
  },
  // ── Batch 30 (sourced via live SERP 2026: ResumeWorded, Enhancv, ResumeAdapter, QwikResume, TealHQ, Wozber, Medium/Reshtei, ResumeKraft, Zety, Indeed) ──
  // Priorities: emerging tech/AI, product, marketing, wellness.
  "kubernetes-engineer": {
    include:
      "A professional summary, a technical-skills section grouping tools by category (containers, CI/CD, cloud, IaC, monitoring), work experience with quantified achievements, and a certifications section (CKA/CKAD/CKS).",
    length:
      "One to two pages — group skills by category for ATS parsing, keep cluster management and your strongest deployments high, and quantify deployment-time and reliability gains.",
    hardSkills: ["Kubernetes (cluster management)", "Docker & containerization", "Helm", "Microservices", "CI/CD pipelines", "Terraform / IaC", "Monitoring (Prometheus/Grafana)"],
    softSkills: ["Problem solving", "Communication", "Collaboration", "Ownership", "Attention to detail"],
    atsKeywords: ["Kubernetes", "Docker", "Helm", "Microservices", "CI/CD", "Terraform", "CKA"],
    atsNote:
      "List \"Kubernetes\" under a clearly labelled technical-skills area grouped with Docker, Helm and cloud, put CKA/CKAD/CKS in a certifications section, and quantify achievements (e.g. \"reduced deployment time 40%\").",
  },
  "ml-operations-engineer": {
    include:
      "A professional summary, a skills section with 20–30 technical keywords grouped (infrastructure, ML platforms, cloud), work experience using Action + System + Keyword + Result bullets, and a certifications section.",
    length:
      "One to two pages — include the MLOps, model-deployment and production-infrastructure keywords (resumes lacking them are often filtered), and quantify throughput, latency and uptime.",
    hardSkills: ["MLOps & model deployment", "CI/CD for ML", "Kubernetes & Docker", "MLflow / Kubeflow / SageMaker", "Python", "Model serving (Triton/BentoML)", "Monitoring & drift detection"],
    softSkills: ["Problem solving", "Communication", "Collaboration", "Ownership", "Analytical thinking"],
    atsKeywords: ["MLOps", "Model Deployment", "Kubernetes", "CI/CD", "Python", "Docker", "SageMaker"],
    atsNote:
      "Include the keywords recruiters search (MLOps, model deployment, production ML, Kubernetes, model serving, drift detection) — resumes lacking them are often filtered — and write \"Action + system + keyword + result\" bullets (e.g. \"75K predictions/hour at 99.9% uptime\").",
  },
  "nlp-engineer": {
    include:
      "A professional summary, a skills section mirroring the posting's NLP libraries and frameworks, work experience with action verbs and metrics, a projects section, and education.",
    length:
      "One to two pages — mirror the posting's NLP terms (the exact libraries it names), keep your strongest models and outcomes high, and lead each bullet with a strong action verb.",
    hardSkills: ["Natural language processing", "Text classification & NER", "Sentiment analysis & topic modeling", "Transformers / BERT", "Python", "TensorFlow / PyTorch", "spaCy / NLTK / Hugging Face"],
    softSkills: ["Analytical thinking", "Problem solving", "Communication", "Collaboration", "Attention to detail"],
    atsKeywords: ["Natural Language Processing", "NLP", "Machine Learning", "Transformers", "Python", "PyTorch", "Named Entity Recognition"],
    atsNote:
      "Mirror the posting's exact NLP libraries (spaCy, NLTK, Hugging Face) and techniques (NER, sentiment analysis, transformers), include \"machine learning\" and \"natural language processing\", and lead bullets with action verbs and metrics.",
  },
  "prompt-engineer": {
    include:
      "A professional summary tying technical depth to business impact, a skills section grouped by category (LLMs, frameworks, prompting techniques), work experience and AI projects with measurable outcomes, and an education section listing relevant courses.",
    length:
      "One to two pages — use 15–25 posting-matched keywords, group skills (LLMs, frameworks, techniques), and tie model/method detail to outcomes (speed, cost, accuracy).",
    hardSkills: ["Prompt design & optimization", "Few-shot & chain-of-thought prompting", "RAG pipeline design", "LLM evaluation & testing", "LangChain / LlamaIndex", "OpenAI / Claude / Gemini APIs", "Python"],
    softSkills: ["Analytical thinking", "Communication", "Creativity", "Problem solving", "Attention to detail"],
    atsKeywords: ["Prompt Engineering", "LLM", "Prompt Design", "RAG", "LangChain", "Few-Shot Learning", "Generative AI"],
    atsNote:
      "Use 15–25 posting-matched keywords (prompt design, few-shot, chain-of-thought, RAG, LangChain, the specific LLMs), group skills into categories, list AI courses under Education, and tie model/method detail to outcomes (speed, cost, accuracy).",
  },
  "security-architect": {
    include:
      "Contact details, a summary, work experience, education, a skills section, and a certifications section (CISSP/CISM) — with frameworks and platforms placed in the summary, skills and first bullets.",
    length:
      "One to two pages — name the exact frameworks, controls and threat terms the posting uses, place certifications and frameworks in high-visibility spots, and quantify risk reduced.",
    hardSkills: ["Security architecture design", "Risk assessment", "Vulnerability management", "SIEM", "Network & cloud security", "Compliance (PCI DSS, ISO 27001)", "Identity & access management"],
    softSkills: ["Strategic thinking", "Communication", "Problem solving", "Stakeholder management", "Attention to detail"],
    atsKeywords: ["Security Architecture", "Information Security", "Risk Assessment", "Vulnerability Management", "SIEM", "PCI DSS", "CISSP"],
    atsNote:
      "Name the exact frameworks, controls and threat terms the posting uses (PCI DSS, ISO 27001, SIEM) rather than broad language, use both full term and abbreviation, and place CISSP/CISM in the summary, skills and first bullets.",
  },
  "quantum-computing-researcher": {
    include:
      "Contact details, a professional summary stating your degree and a unique specialism, a skills section (quantum languages plus mathematics), research experience with quantified achievements, a publications section, and education (MSc/PhD).",
    length:
      "One to two pages (longer for an academic CV) — establish your PhD/MSc and a specific specialism (e.g. quantum machine learning) in the summary, and showcase quantifiable research outcomes.",
    hardSkills: ["Quantum algorithms", "Qiskit / Cirq", "Quantum machine learning", "Advanced mathematics & linear algebra", "Python", "Quantum error correction", "Research & experiment design"],
    softSkills: ["Analytical thinking", "Problem solving", "Communication", "Collaboration", "Scientific writing"],
    atsKeywords: ["Quantum Computing", "Quantum Algorithms", "Qiskit", "Cirq", "Quantum Machine Learning", "Python", "Research"],
    atsNote:
      "Avoid generic phrases (\"hard-working\") and lead with unique skills — quantum programming (Qiskit, Cirq) and a specialism (quantum ML) — establish your MSc/PhD in the summary, and quantify research outcomes and publications.",
  },
  "smart-contract-developer": {
    include:
      "A powerful professional summary, a skills section focused on blockchain languages and toolchains, experience emphasising specific dApp/smart-contract projects with technical detail and impact, and education.",
    length:
      "One to two pages — keep Solidity, smart-contract security and your strongest projects high, and quantify impact (gas reduced, funds secured).",
    hardSkills: ["Solidity / Vyper", "Smart-contract development", "EVM toolchain (Hardhat, Foundry)", "DeFi protocols", "Smart-contract security & audits", "Web3.js / Ethers.js", "Blockchain protocols"],
    softSkills: ["Problem solving", "Attention to detail", "Communication", "Collaboration", "Security mindset"],
    atsKeywords: ["Smart Contract Development", "Solidity", "Blockchain", "DeFi", "Ethereum", "Web3", "Smart Contract Audit"],
    atsNote:
      "Include ATS terms (\"smart contract development\", \"solidity programming\", \"DeFi\", \"smart contract audit\"), name your toolchain (Hardhat, Foundry), and quantify impact (e.g. \"reduced gas costs 15%\", \"secured $X million in funds\").",
  },
  "yoga-teacher": {
    include:
      "Contact details, a professional summary, a dedicated skills section near the top featuring your certifications and yoga styles, teaching experience, education, and a certifications section (RYT-200/500).",
    length:
      "One to two pages — put your RYT certification and yoga styles in a skills section near the top, and show class sizes, retention and any specialisms (prenatal, trauma-informed).",
    hardSkills: ["Asana & sequencing", "Pranayama & meditation", "Anatomy & alignment", "Class planning", "Yoga styles (Hatha/Vinyasa/Yin)", "Hands-on adjustments", "Prenatal / therapeutic yoga"],
    softSkills: ["Communication", "Empathy", "Adaptability", "Patience", "Motivation"],
    atsKeywords: ["Yoga Instructor", "RYT-200", "Vinyasa", "Hatha", "Meditation", "Anatomy", "Class Planning"],
    atsNote:
      "Put RYT-200/500 (and any E-RYT or C-IAYT) in a skills section near the top with the yoga styles you teach, and show class sizes, retention and specialisms (prenatal, trauma-informed) with the awarding body.",
  },
  "reiki-practitioner": {
    include:
      "Contact details, a professional summary, a skills section, experience conducting sessions and assessments, an education section, and a certifications section (Reiki Level 2+/Master).",
    length:
      "One page — keep your Reiki level and energy-healing experience high, note client confidentiality and ethics, and show client outcomes.",
    hardSkills: ["Reiki energy healing", "Energy-field assessment", "Session & treatment planning", "Chakra balancing", "Client intake & records", "Relaxation techniques", "Holistic wellness"],
    softSkills: ["Empathy", "Active listening", "Communication", "Compassion", "Confidentiality"],
    atsKeywords: ["Reiki", "Energy Healing", "Holistic Therapy", "Treatment Planning", "Chakra", "Wellness", "Reiki Master"],
    atsNote:
      "List your Reiki certification level (Level 2, Master/Shinpiden) and awarding body, note client confidentiality and ethical practice, and show customised treatment plans and client outcomes.",
  },
  "wellness-coach": {
    include:
      "Contact details, a professional summary, work experience with quantifiable achievements, education and certifications establishing credibility, and a skills section of wellness-coaching competencies.",
    length:
      "One to two pages — emphasise quantifiable coaching outcomes, list your NBHWC-accredited certification, and cover nutrition, fitness and stress-management competencies.",
    hardSkills: ["Health & wellness coaching", "Behaviour-change techniques", "Nutrition guidance", "Stress management", "Goal setting & accountability", "Wellness program design", "Progress tracking"],
    softSkills: ["Communication", "Active listening", "Motivation", "Empathy", "Organization"],
    atsKeywords: ["Wellness Coaching", "Health Coaching", "Nutrition", "Behavior Change", "Stress Management", "Goal Setting", "NBHWC"],
    atsNote:
      "Establish credibility with an NBHWC-accredited certification (plus CHES/CPT/CPR), cover core competencies (nutrition, stress management, behaviour change), and quantify client outcomes (weight, adherence, programme completion).",
  },
  "ppc-specialist": {
    include:
      "Contact details, a summary, a skills section clustered (platforms, analytics, optimization, client-facing), work experience with metrics, and a dedicated certifications section (Google Ads).",
    length:
      "One to two pages — cluster skills (platforms, analytics, optimization), favour metrics (CTR, CPA, ROAS, impression share), and show optimisation judgement (A/B tests, wasted-spend reduction).",
    hardSkills: ["Google Ads & Bing Ads", "Keyword research", "Bid management & optimization", "Ad copywriting", "Conversion tracking", "A/B testing", "Google Analytics"],
    softSkills: ["Analytical thinking", "Attention to detail", "Communication", "Client management", "Problem solving"],
    atsKeywords: ["PPC", "Paid Search", "Google Ads", "SEM", "Keyword Research", "Conversion Rate Optimization", "Bid Management"],
    atsNote:
      "Cluster skills (platforms, analytics tools, optimization methods), include certifications with issuer and date, favour metrics (CTR, CPA, ROAS, impression share), and show optimisation judgement (A/B tests, wasted-spend reduction).",
  },
  "seo-manager": {
    include:
      "Contact details, a profile/summary, work experience, education, a skills section labelled \"Skills\", and certifications and projects sections.",
    length:
      "One to two pages — keep keyword research, technical SEO and your strongest traffic results high, label the skills section \"Skills\" for the ATS, and quantify rankings and organic-traffic growth.",
    hardSkills: ["Keyword research", "Technical SEO", "On-page optimization", "Content strategy", "Link building", "Google Analytics & Search Console", "SEO auditing"],
    softSkills: ["Analytical thinking", "Communication", "Project management", "Collaboration", "Problem solving"],
    atsKeywords: ["SEO", "Keyword Research", "Technical SEO", "On-Page SEO", "Link Building", "Google Analytics", "Content Optimization"],
    atsNote:
      "Label the section \"Skills\" so the ATS recognises it, tailor it to the posting (keyword research, technical SEO, Search Console, link building), and quantify rankings, organic traffic and revenue impact.",
  },
  "saas-product-manager": {
    include:
      "A title and summary, a focused skills section near the top (user research, A/B testing, analytics), experience with quantified outcomes, education, and certifications.",
    length:
      "One to two pages — mirror the exact title (\"SaaS Product Manager\"), keep roadmap, Agile and your strongest outcomes high, and quantify adoption, retention and revenue (ARR/MRR).",
    hardSkills: ["Product strategy & roadmap", "Agile / Scrum", "User research", "A/B testing", "Data analysis & SQL", "Stakeholder management", "Analytics (Mixpanel/Amplitude)"],
    softSkills: ["Leadership", "Communication", "Decision-making", "Problem solving", "Collaboration"],
    atsKeywords: ["Product Management", "Product Roadmap", "Agile", "A/B Testing", "User Research", "ARR/MRR", "Stakeholder Management"],
    atsNote:
      "Mirror the exact title (\"SaaS Product Manager\") at the top, keep a focused skills section (roadmap, Agile, A/B testing, SQL), and quantify adoption, retention and revenue (ARR/MRR) with before-and-after baselines.",
  },
  "platform-product-manager": {
    include:
      "A title and summary, a skills section organised by category (strategy, methodologies, metrics, tools), experience bullets with methodologies, tools and metrics, a projects section, and education.",
    length:
      "One to two pages — integrate keywords across summary, experience and skills, keep roadmap, APIs and your strongest platform work high, and quantify engagement and reliability.",
    hardSkills: ["Platform & product strategy", "Product roadmap", "API & developer experience", "Agile / Scrum", "User research & A/B testing", "Metrics (OKRs, KPIs)", "Tools (Jira, Amplitude, Figma)"],
    softSkills: ["Strategic thinking", "Communication", "Decision-making", "Collaboration", "Problem solving"],
    atsKeywords: ["Product Management", "Product Roadmap", "Platform", "Agile", "A/B Testing", "Stakeholder Management", "OKRs"],
    atsNote:
      "Organise keywords by category (strategy, methodologies, metrics, tools — Jira, Amplitude, Figma), write quantified bullets (\"delivered 15+ features, +40% engagement\"), and keep API/developer-experience work prominent for platform roles.",
  },
  // ── Batch 31 (sourced via live SERP 2026: ResumeWorded, ResumeAdapter, VisualCV, TealHQ, Enhancv, ZipRecruiter, LiveCareer, QwikResume, Indeed, GreatSampleResume) ──
  // Priorities: office/admin, medical, HR, sales, faith, education.
  "office-administrator": {
    include:
      "Contact details, a professional summary tailored to the posting, work experience in reverse chronological order with metrics, education, and a core-skills section using standard headings.",
    length:
      "One to two pages — keep scheduling, data entry and office management high, mirror the posting's exact phrasing, and quantify (e.g. \"reduced supply costs 15%\").",
    hardSkills: ["Office management", "Calendar & scheduling", "Data entry", "Microsoft Office Suite", "Vendor management", "Bookkeeping (QuickBooks)", "Record keeping"],
    softSkills: ["Organization", "Multi-tasking", "Communication", "Confidentiality", "Team coordination"],
    atsKeywords: ["Office Administration", "Scheduling", "Data Entry", "Microsoft Office", "Calendar Management", "Vendor Management", "Office Management"],
    atsNote:
      "Mirror the posting's wording (\"scheduling\", \"calendar management\", \"vendor management\") in the summary and core-skills section, quantify outcomes (cost reduced, schedules coordinated), and mention CAP/MOS certifications.",
  },
  "receptionist-hotel": {
    include:
      "Contact details, a professional summary, a work-history section, education, and a skills section mixing property-management systems with guest-facing soft skills.",
    length:
      "One page — keep reservation systems, check-in/out and guest service high, tailor to the posting's wording, and quantify guest-satisfaction and upsell results.",
    hardSkills: ["Property management systems (Opera)", "Reservation management", "Check-in & check-out", "Cash handling & payment processing", "Front-desk operations", "Booking platforms", "Bilingual communication"],
    softSkills: ["Customer service", "Communication", "Multitasking", "Diplomacy", "Conflict resolution"],
    atsKeywords: ["Hotel Receptionist", "Front Desk", "Reservation Management", "Property Management System", "Check-in", "Customer Service", "Cash Handling"],
    atsNote:
      "Show a mix of hard skills (property management systems, reservation management, cash handling) and guest-facing soft skills; tailor to the posting and quantify guest-satisfaction and upsell results.",
  },
  "secretary": {
    include:
      "Contact details, a resume summary of experience and key strengths, work experience in chronological order with quantified accomplishments, education, and a skills section.",
    length:
      "One to two pages — focus on accomplishments with numbers rather than routine duties, integrate skills into experience, and keep MS Office and scheduling high.",
    hardSkills: ["Microsoft Office (Word/Excel/Outlook)", "Calendar & scheduling", "Data entry", "Email & correspondence management", "Minute taking", "Filing & records", "Travel coordination"],
    softSkills: ["Organization", "Communication", "Discretion", "Time management", "Attention to detail"],
    atsKeywords: ["Secretary", "Administrative Support", "Microsoft Office", "Scheduling", "Data Entry", "Correspondence", "Calendar Management"],
    atsNote:
      "Use exact keywords from the posting (\"scheduling\", \"correspondence\", \"data entry\"), avoid listing routine duties, and integrate skills into accomplishment statements with numbers.",
  },
  "licensed-practical-nurse": {
    include:
      "Contact details, a professional summary, professional experience, education, a skills section (hard plus soft), and a certifications section (LPN licence, BLS) that reinforces your qualifications.",
    length:
      "One to two pages — list the posting's required skills first, keep patient-care and medication-administration experience high, and close with credentials.",
    hardSkills: ["Patient care", "Vital-signs monitoring", "Medication administration", "Wound care", "Specimen collection", "Charting & documentation", "EHR documentation"],
    softSkills: ["Communication", "Empathy", "Teamwork", "Attention to detail", "Time management"],
    atsKeywords: ["Licensed Practical Nurse", "LPN", "Patient Care", "Vital Signs", "Medication Administration", "Wound Care", "BLS"],
    atsNote:
      "List the posting's required skills first (\"patient care\", \"vital signs\", \"medication administration\"), and close with credentials (LPN licence, BLS/ACLS) with issuer and date.",
  },
  "medical-lab-technologist": {
    include:
      "Contact details, a summary capturing measurable outcomes, professional experience with quantified achievements, education, a skills section, and a certifications section (ASCP).",
    length:
      "One page for entry-level, two for 5+ years — lead with years and the lab techniques you have mastered, and quantify accuracy, turnaround and quality outcomes.",
    hardSkills: ["Diagnostic testing", "Quality control", "Hematology & chemistry analyzers", "PCR & molecular techniques", "Mass spectrometry", "Laboratory information systems (LIS)", "Analytical reasoning"],
    softSkills: ["Attention to detail", "Problem solving", "Communication", "Time management", "Teamwork"],
    atsKeywords: ["Medical Laboratory Science", "Diagnostic Testing", "Quality Control", "ASCP", "PCR", "LIS", "Hematology"],
    atsNote:
      "Certification is required in ~98% of postings — list ASCP/AMT prominently — and name the techniques the role uses (PCR, mass spectrometry, LIS); quantify accuracy, turnaround and quality outcomes.",
  },
  "retail-pharmacist": {
    include:
      "Contact details, a personal profile, work history, education, a skills section, and a certifications section (immunization, MTM).",
    length:
      "One to two pages — keep dispensing, patient counseling and customer-service strengths high, and quantify scripts filled, accuracy and community-health outcomes.",
    hardSkills: ["Dispensing & prescription verification", "Medication therapy management", "Immunization", "Patient counseling", "Drug-interaction review", "Inventory management", "Pharmacy software"],
    softSkills: ["Customer service", "Communication", "Attention to detail", "Problem solving", "Empathy"],
    atsKeywords: ["Retail Pharmacist", "Dispensing", "Medication Therapy Management", "Immunization", "Patient Counseling", "Customer Service", "Pharmacy"],
    atsNote:
      "Highlight customer service, dispensing accuracy and community-health initiatives, list immunization/MTM certifications, and quantify scripts filled, accuracy and improved patient outcomes.",
  },
  "hr-coordinator": {
    include:
      "Contact details, a summary, an experience section with achievement statements, education, and a skills section using standard headings near the top.",
    length:
      "One page for entry to mid-career — distribute 15–25 keywords across summary, skills and experience, and keep onboarding, HRIS and employee relations high.",
    hardSkills: ["Employee onboarding", "HRIS (Workday/BambooHR)", "Applicant tracking systems (ATS)", "Benefits administration", "Payroll processing", "Employee records", "Compliance"],
    softSkills: ["Communication", "Organization", "Problem solving", "Discretion", "Project management"],
    atsKeywords: ["Human Resources", "Onboarding", "HRIS", "Benefits Administration", "Payroll", "Employee Relations", "Compliance"],
    atsNote:
      "Distribute 15–25 keywords (onboarding, HRIS, payroll processing, employee relations, compliance) across summary, skills and experience, name your HRIS (Workday, BambooHR), and avoid burying the skills section.",
  },
  "employee-relations-officer": {
    include:
      "Contact details, a summary, an experience section, education, and a skills section using standard job titles and employee-relations keywords in the body text.",
    length:
      "One to two pages — keep employee relations, compliance and conflict resolution high, name your HRIS, and quantify cases handled and retention outcomes.",
    hardSkills: ["Employee relations management", "Conflict resolution & mediation", "Workplace investigations", "Labour-law compliance", "Performance management", "Grievance handling", "HRIS"],
    softSkills: ["Communication", "Empathy", "Discretion", "Problem solving", "Facilitation"],
    atsKeywords: ["Employee Relations", "Conflict Resolution", "Compliance", "Workplace Investigations", "Performance Management", "Labor Relations", "Mediation"],
    atsNote:
      "Use exact terms (\"employee relations management\", \"conflict resolution\", \"workplace investigations\", \"labour relations\") in the body text not just headers, name your HRIS, and quantify cases handled and retention.",
  },
  "outside-sales-representative": {
    include:
      "Contact details, a professional summary, work experience with quantified results, education, and a dedicated skills block of primary and secondary keywords.",
    length:
      "One to two pages in a clean single-column layout — keep territory management, CRM and quota performance high, and quantify pipeline, deals and quota attainment.",
    hardSkills: ["Field & territory sales", "Lead generation & prospecting", "CRM (Salesforce)", "Pipeline management", "Negotiation", "Account management", "B2B/B2C sales"],
    softSkills: ["Communication", "Relationship building", "Resilience", "Self-motivation", "Time management"],
    atsKeywords: ["Outside Sales Representative", "Field Sales", "Territory", "CRM", "Salesforce", "Pipeline", "Quota"],
    atsNote:
      "Include high-priority keywords (\"field sales\", \"territory\", \"CRM\", \"Salesforce\", \"pipeline\", \"quota\") in a dedicated skills block, use a single-column layout, and quantify pipeline, deals closed and quota attainment.",
  },
  "relationship-manager": {
    include:
      "Contact details, a professional summary highlighting core strengths, a skills section with keywords, and experience in reverse chronological order with quantified results.",
    length:
      "One to two pages — keep client relationship management, financial analysis and your strongest portfolio results high, and quantify portfolio growth and retention.",
    hardSkills: ["Client relationship management", "Financial analysis", "Portfolio & account management", "Cross-selling financial products", "Risk assessment", "Market-trend analysis", "Sales-target attainment"],
    softSkills: ["Communication", "Negotiation", "Relationship building", "Attention to detail", "Teamwork"],
    atsKeywords: ["Relationship Management", "Client Relationship Management", "Financial Analysis", "Portfolio Management", "Cross-Selling", "Risk Assessment", "Banking"],
    atsNote:
      "Use the posting's exact terms (\"client relationship management\", \"financial analysis\", \"portfolio management\") — not synonyms — in a dedicated skills section, and quantify portfolio growth, cross-sell and retention.",
  },
  "hafiz": {
    include:
      "Contact details, a professional summary, an education section (Hifz, Qira'a, any Ijaza), teaching experience (in-person or online), a skills section, and languages (Arabic and others).",
    length:
      "One to two pages — feature your Hafiz status and Tajweed/Qira'a credentials prominently, and show your years and methods of Quran teaching.",
    hardSkills: ["Quran memorization (Hifz)", "Tajweed & Qira'a", "Quran recitation & pronunciation", "Curriculum development", "Islamic studies", "Arabic", "Student assessment"],
    softSkills: ["Patience", "Communication", "Adaptability", "Cultural sensitivity", "Discipline"],
    atsKeywords: ["Hafiz", "Quran", "Tajweed", "Hifz", "Islamic Education", "Arabic", "Curriculum Development"],
    atsNote:
      "Feature your Hafiz status and Tajweed/Qira'a credentials (and any Ijaza) prominently, reflect both your Islamic credentials and teaching methodology, and use keywords like \"curriculum development\" and \"student assessment\".",
  },
  "qari": {
    include:
      "Contact details, a professional summary, an education section (Qira'a, Tajweed, Ijaza), teaching and recitation experience, a skills section, and languages (Arabic).",
    length:
      "One to two pages — feature your Qira'a and Tajweed mastery and any Ijaza, and show your teaching and recitation experience.",
    hardSkills: ["Quran recitation (Qira'a)", "Tajweed mastery", "Pronunciation (Makharij)", "Quran teaching with Tajweed", "Curriculum design", "Islamic studies", "Arabic"],
    softSkills: ["Patience", "Communication", "Cultural sensitivity", "Discipline", "Empathy"],
    atsKeywords: ["Qari", "Quran", "Tajweed", "Qira'a", "Recitation", "Islamic Education", "Arabic"],
    atsNote:
      "Emphasise your Qira'a and Tajweed mastery, good pronunciation (Makharij) and any Ijaza, and show teaching experience; use keywords like \"curriculum development\" and \"student assessment\".",
  },
  "online-tutor": {
    include:
      "Contact details, a professional summary, a dedicated skills section (subject expertise plus virtual-teaching tools), work experience that weaves skills into duties, education, and certifications.",
    length:
      "One to two pages — emphasise virtual-communication and technology skills (LMS, video tools), name the platforms you have used, and quantify student improvement.",
    hardSkills: ["Subject-matter expertise", "Online teaching tools & LMS", "Lesson planning", "Curriculum development", "Student assessment", "Synchronous & asynchronous tools", "Progress tracking"],
    softSkills: ["Communication", "Patience", "Adaptability", "Active listening", "Time management"],
    atsKeywords: ["Online Tutoring", "Virtual Learning", "Lesson Planning", "Curriculum Development", "Subject Matter Expertise", "Learning Management System", "Student Assessment"],
    atsNote:
      "Emphasise virtual-communication and technology skills (LMS, synchronous/asynchronous tools), name the online platforms you have used, weave skills into your experience bullets, and quantify student improvement.",
  },
  "office-coordinator": {
    include:
      "Contact details, a summary statement leading with your strengths, an experience section using role-specific keywords, education, and a skills section combining hard and soft skills.",
    length:
      "One to two pages — put the exact title \"Office Coordinator\" in the resume, mirror the posting's wording, and include accomplishments involving leading or collaborating with a team.",
    hardSkills: ["Office coordination", "Scheduling", "Data entry", "Microsoft Office & Excel", "Vendor management", "Invoicing", "Administrative support"],
    softSkills: ["Customer service", "Communication", "Multi-tasking", "Detail orientation", "Collaboration"],
    atsKeywords: ["Office Coordinator", "Scheduling", "Administrative Support", "Customer Service", "Data Entry", "Microsoft Office", "Vendor Management"],
    atsNote:
      "Put the exact title \"Office Coordinator\" in the resume, mirror the posting's wording (\"scheduling\", \"administrative support\", \"vendor management\"), and include 1–2 accomplishments involving leading or collaborating with a team.",
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
