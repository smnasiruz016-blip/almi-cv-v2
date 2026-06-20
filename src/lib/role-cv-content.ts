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
