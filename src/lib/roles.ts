/**
 * AlmiCV — canonical role registry, ported from `almijob-v2/lib/job-roles.ts`
 * (which itself is canonical across the AlmiWorld product family).
 *
 * 283 roles across 18 sectors:
 *   - 254 from AlmiCV_Job_Roles_List.docx
 *   - 9 religious roles (PR #32 in almijob-v2): religious-scholar base + 8
 *     aliases (imam, khateeb, mufti, priest, pastor, rabbi, pandit, monk)
 *   - 20 religious + 1 special added via PR #52 from
 *     AlmiCV_Religious_Roles_List.docx (Qari, Hafiz, Madrasa Teacher,
 *     Muezzin, Islamic Scholar, Deacon, Chaplain, Missionary, Yoga Teacher,
 *     Guru, Sanskrit Teacher, Lama, Meditation Teacher, Cantor, Hebrew
 *     Teacher, Granthi, Sikh Religious Teacher, Interfaith Minister,
 *     Religious Studies Teacher, Open CV)
 *
 * Sync discipline: when AlmiJob's `lib/job-roles.ts` evolves, mirror here.
 * Slugs are ASCII-kebab and globally unique — cross-product deep links
 * (AlmiJob ↔ AlmiSalary ↔ AlmiStudy ↔ AlmiCV) rely on slug identity.
 *
 * Used by:
 *   - app/cv-guide/[country]/[role]/page.tsx — programmatic SEO route
 *   - sitemap generation
 *   - cross-product deep links to AlmiJob /jobs/{country}/{role} +
 *     AlmiSalary /salary/{country}/{role}
 */

export type Role = {
  name: string;
  slug: string;
  sector: string;
  aliases?: string[];
};

export const JOB_ROLES: Role[] = [
  // Technology & IT
  { name: "Software Engineer", slug: "software-engineer", sector: "Technology & IT" },
  { name: "Software Developer", slug: "software-developer", sector: "Technology & IT" },
  { name: "Web Developer", slug: "web-developer", sector: "Technology & IT" },
  { name: "Frontend Developer", slug: "frontend-developer", sector: "Technology & IT" },
  { name: "Backend Developer", slug: "backend-developer", sector: "Technology & IT" },
  { name: "Full Stack Developer", slug: "full-stack-developer", sector: "Technology & IT" },
  { name: "Mobile App Developer", slug: "mobile-app-developer", sector: "Technology & IT" },
  { name: "DevOps Engineer", slug: "devops-engineer", sector: "Technology & IT" },
  { name: "Data Analyst", slug: "data-analyst", sector: "Technology & IT" },
  { name: "Data Scientist", slug: "data-scientist", sector: "Technology & IT" },
  { name: "Data Engineer", slug: "data-engineer", sector: "Technology & IT" },
  { name: "Machine Learning Engineer", slug: "machine-learning-engineer", sector: "Technology & IT" },
  { name: "IT Support Technician", slug: "it-support-technician", sector: "Technology & IT" },
  { name: "Help Desk Technician", slug: "help-desk-technician", sector: "Technology & IT" },
  { name: "System Administrator", slug: "system-administrator", sector: "Technology & IT" },
  { name: "Network Engineer", slug: "network-engineer", sector: "Technology & IT" },
  { name: "Cloud Engineer", slug: "cloud-engineer", sector: "Technology & IT" },
  { name: "Cybersecurity Analyst", slug: "cybersecurity-analyst", sector: "Technology & IT" },
  { name: "QA", slug: "qa", sector: "Technology & IT", aliases: ["Test Engineer"] },
  { name: "Database Administrator", slug: "database-administrator", sector: "Technology & IT" },
  { name: "IT Project Manager", slug: "it-project-manager", sector: "Technology & IT" },
  { name: "Product Manager", slug: "product-manager", sector: "Technology & IT" },
  { name: "UX Designer", slug: "ux-designer", sector: "Technology & IT" },
  { name: "UI Designer", slug: "ui-designer", sector: "Technology & IT" },
  { name: "Scrum Master", slug: "scrum-master", sector: "Technology & IT" },
  // Healthcare & Medical
  { name: "Registered Nurse", slug: "registered-nurse", sector: "Healthcare & Medical", aliases: ["Nurse", "RN"] },
  { name: "Nurse Practitioner", slug: "nurse-practitioner", sector: "Healthcare & Medical" },
  { name: "Doctor", slug: "doctor", sector: "Healthcare & Medical", aliases: ["Physician", "GP"] },
  { name: "Medical Assistant", slug: "medical-assistant", sector: "Healthcare & Medical" },
  { name: "Caregiver", slug: "caregiver", sector: "Healthcare & Medical", aliases: ["Care Assistant"] },
  { name: "Healthcare Assistant", slug: "healthcare-assistant", sector: "Healthcare & Medical" },
  { name: "Pharmacist", slug: "pharmacist", sector: "Healthcare & Medical" },
  { name: "Pharmacy Technician", slug: "pharmacy-technician", sector: "Healthcare & Medical" },
  { name: "Dental Assistant", slug: "dental-assistant", sector: "Healthcare & Medical" },
  { name: "Dentist", slug: "dentist", sector: "Healthcare & Medical" },
  { name: "Physiotherapist", slug: "physiotherapist", sector: "Healthcare & Medical" },
  { name: "Occupational Therapist", slug: "occupational-therapist", sector: "Healthcare & Medical" },
  { name: "Radiographer", slug: "radiographer", sector: "Healthcare & Medical" },
  { name: "Lab Technician", slug: "lab-technician", sector: "Healthcare & Medical" },
  { name: "Phlebotomist", slug: "phlebotomist", sector: "Healthcare & Medical" },
  { name: "Midwife", slug: "midwife", sector: "Healthcare & Medical" },
  { name: "Paramedic", slug: "paramedic", sector: "Healthcare & Medical" },
  { name: "Medical Receptionist", slug: "medical-receptionist", sector: "Healthcare & Medical" },
  { name: "Home Health Aide", slug: "home-health-aide", sector: "Healthcare & Medical" },
  { name: "Optician", slug: "optician", sector: "Healthcare & Medical" },
  { name: "Massage Therapist", slug: "massage-therapist", sector: "Healthcare & Medical" },
  // Education & Training
  { name: "Teacher", slug: "teacher", sector: "Education & Training" },
  { name: "Primary School Teacher", slug: "primary-school-teacher", sector: "Education & Training" },
  { name: "Secondary School Teacher", slug: "secondary-school-teacher", sector: "Education & Training" },
  { name: "Teaching Assistant", slug: "teaching-assistant", sector: "Education & Training" },
  { name: "Lecturer", slug: "lecturer", sector: "Education & Training" },
  { name: "Tutor", slug: "tutor", sector: "Education & Training" },
  { name: "ESL", slug: "esl", sector: "Education & Training", aliases: ["English Teacher"] },
  { name: "Special Education Teacher", slug: "special-education-teacher", sector: "Education & Training" },
  { name: "School Counsellor", slug: "school-counsellor", sector: "Education & Training" },
  { name: "Academic Advisor", slug: "academic-advisor", sector: "Education & Training" },
  { name: "Trainer", slug: "trainer", sector: "Education & Training" },
  { name: "Instructional Designer", slug: "instructional-designer", sector: "Education & Training" },
  { name: "Education Coordinator", slug: "education-coordinator", sector: "Education & Training" },
  { name: "Librarian", slug: "librarian", sector: "Education & Training" },
  { name: "Childcare Worker", slug: "childcare-worker", sector: "Education & Training" },
  { name: "Nursery Assistant", slug: "nursery-assistant", sector: "Education & Training" },
  // Business, Office & Admin
  { name: "Administrative Assistant", slug: "administrative-assistant", sector: "Business, Office & Admin" },
  { name: "Office Manager", slug: "office-manager", sector: "Business, Office & Admin" },
  { name: "Executive Assistant", slug: "executive-assistant", sector: "Business, Office & Admin" },
  { name: "Personal Assistant", slug: "personal-assistant", sector: "Business, Office & Admin" },
  { name: "Receptionist", slug: "receptionist", sector: "Business, Office & Admin" },
  { name: "Office Administrator", slug: "office-administrator", sector: "Business, Office & Admin" },
  { name: "Data Entry Clerk", slug: "data-entry-clerk", sector: "Business, Office & Admin" },
  { name: "Secretary", slug: "secretary", sector: "Business, Office & Admin" },
  { name: "Operations Manager", slug: "operations-manager", sector: "Business, Office & Admin" },
  { name: "Project Manager", slug: "project-manager", sector: "Business, Office & Admin" },
  { name: "Business Analyst", slug: "business-analyst", sector: "Business, Office & Admin" },
  { name: "Management Consultant", slug: "management-consultant", sector: "Business, Office & Admin" },
  { name: "Project Coordinator", slug: "project-coordinator", sector: "Business, Office & Admin" },
  { name: "Office Clerk", slug: "office-clerk", sector: "Business, Office & Admin" },
  { name: "Virtual Assistant", slug: "virtual-assistant", sector: "Business, Office & Admin" },
  // Finance & Accounting
  { name: "Accountant", slug: "accountant", sector: "Finance & Accounting" },
  { name: "Accounts Assistant", slug: "accounts-assistant", sector: "Finance & Accounting" },
  { name: "Bookkeeper", slug: "bookkeeper", sector: "Finance & Accounting" },
  { name: "Financial Analyst", slug: "financial-analyst", sector: "Finance & Accounting" },
  { name: "Auditor", slug: "auditor", sector: "Finance & Accounting" },
  { name: "Tax Advisor", slug: "tax-advisor", sector: "Finance & Accounting" },
  { name: "Payroll Officer", slug: "payroll-officer", sector: "Finance & Accounting" },
  { name: "Credit Controller", slug: "credit-controller", sector: "Finance & Accounting" },
  { name: "Financial Controller", slug: "financial-controller", sector: "Finance & Accounting" },
  { name: "Investment Analyst", slug: "investment-analyst", sector: "Finance & Accounting" },
  { name: "Bank Teller", slug: "bank-teller", sector: "Finance & Accounting" },
  { name: "Loan Officer", slug: "loan-officer", sector: "Finance & Accounting" },
  { name: "Insurance Agent", slug: "insurance-agent", sector: "Finance & Accounting" },
  { name: "Actuary", slug: "actuary", sector: "Finance & Accounting" },
  { name: "Treasury Analyst", slug: "treasury-analyst", sector: "Finance & Accounting" },
  // Sales & Marketing
  { name: "Sales Representative", slug: "sales-representative", sector: "Sales & Marketing" },
  { name: "Sales Manager", slug: "sales-manager", sector: "Sales & Marketing" },
  { name: "Account Manager", slug: "account-manager", sector: "Sales & Marketing" },
  { name: "Business Development Manager", slug: "business-development-manager", sector: "Sales & Marketing" },
  { name: "Marketing Manager", slug: "marketing-manager", sector: "Sales & Marketing" },
  { name: "Marketing Executive", slug: "marketing-executive", sector: "Sales & Marketing" },
  { name: "Digital Marketing Specialist", slug: "digital-marketing-specialist", sector: "Sales & Marketing" },
  { name: "SEO Specialist", slug: "seo-specialist", sector: "Sales & Marketing" },
  { name: "Social Media Manager", slug: "social-media-manager", sector: "Sales & Marketing" },
  { name: "Content Writer", slug: "content-writer", sector: "Sales & Marketing" },
  { name: "Copywriter", slug: "copywriter", sector: "Sales & Marketing" },
  { name: "Brand Manager", slug: "brand-manager", sector: "Sales & Marketing" },
  { name: "Public Relations Officer", slug: "public-relations-officer", sector: "Sales & Marketing" },
  { name: "Market Research Analyst", slug: "market-research-analyst", sector: "Sales & Marketing" },
  { name: "Sales Assistant", slug: "sales-assistant", sector: "Sales & Marketing" },
  { name: "Telesales Agent", slug: "telesales-agent", sector: "Sales & Marketing" },
  // Engineering
  { name: "Mechanical Engineer", slug: "mechanical-engineer", sector: "Engineering" },
  { name: "Electrical Engineer", slug: "electrical-engineer", sector: "Engineering" },
  { name: "Civil Engineer", slug: "civil-engineer", sector: "Engineering" },
  { name: "Structural Engineer", slug: "structural-engineer", sector: "Engineering" },
  { name: "Chemical Engineer", slug: "chemical-engineer", sector: "Engineering" },
  { name: "Industrial Engineer", slug: "industrial-engineer", sector: "Engineering" },
  { name: "Process Engineer", slug: "process-engineer", sector: "Engineering" },
  { name: "Project Engineer", slug: "project-engineer", sector: "Engineering" },
  { name: "Maintenance Engineer", slug: "maintenance-engineer", sector: "Engineering" },
  { name: "Automotive Engineer", slug: "automotive-engineer", sector: "Engineering" },
  { name: "Aerospace Engineer", slug: "aerospace-engineer", sector: "Engineering" },
  { name: "Petroleum Engineer", slug: "petroleum-engineer", sector: "Engineering" },
  { name: "Quality Engineer", slug: "quality-engineer", sector: "Engineering" },
  { name: "Manufacturing Engineer", slug: "manufacturing-engineer", sector: "Engineering" },
  { name: "Site Engineer", slug: "site-engineer", sector: "Engineering" },
  { name: "CAD Technician", slug: "cad-technician", sector: "Engineering" },
  // Hospitality, Tourism & Food
  { name: "Chef", slug: "chef", sector: "Hospitality, Tourism & Food" },
  { name: "Sous Chef", slug: "sous-chef", sector: "Hospitality, Tourism & Food" },
  { name: "Cook", slug: "cook", sector: "Hospitality, Tourism & Food" },
  { name: "Kitchen Assistant", slug: "kitchen-assistant", sector: "Hospitality, Tourism & Food" },
  { name: "Waiter", slug: "waiter", sector: "Hospitality, Tourism & Food", aliases: ["Waitress", "Server"] },
  { name: "Barista", slug: "barista", sector: "Hospitality, Tourism & Food" },
  { name: "Bartender", slug: "bartender", sector: "Hospitality, Tourism & Food" },
  { name: "Restaurant Manager", slug: "restaurant-manager", sector: "Hospitality, Tourism & Food" },
  { name: "Hotel Manager", slug: "hotel-manager", sector: "Hospitality, Tourism & Food" },
  { name: "Receptionist (Hotel)", slug: "receptionist-hotel", sector: "Hospitality, Tourism & Food" },
  { name: "Housekeeper", slug: "housekeeper", sector: "Hospitality, Tourism & Food" },
  { name: "Concierge", slug: "concierge", sector: "Hospitality, Tourism & Food" },
  { name: "Event Coordinator", slug: "event-coordinator", sector: "Hospitality, Tourism & Food" },
  { name: "Travel Agent", slug: "travel-agent", sector: "Hospitality, Tourism & Food" },
  { name: "Tour Guide", slug: "tour-guide", sector: "Hospitality, Tourism & Food" },
  { name: "Catering Assistant", slug: "catering-assistant", sector: "Hospitality, Tourism & Food" },
  { name: "Food & Beverage Manager", slug: "food-beverage-manager", sector: "Hospitality, Tourism & Food" },
  // Construction & Skilled Trades
  { name: "Electrician", slug: "electrician", sector: "Construction & Skilled Trades" },
  { name: "Plumber", slug: "plumber", sector: "Construction & Skilled Trades" },
  { name: "Carpenter", slug: "carpenter", sector: "Construction & Skilled Trades" },
  { name: "Welder", slug: "welder", sector: "Construction & Skilled Trades" },
  { name: "Painter & Decorator", slug: "painter-decorator", sector: "Construction & Skilled Trades" },
  { name: "Bricklayer", slug: "bricklayer", sector: "Construction & Skilled Trades", aliases: ["Mason"] },
  { name: "Construction Worker", slug: "construction-worker", sector: "Construction & Skilled Trades" },
  { name: "Site Manager", slug: "site-manager", sector: "Construction & Skilled Trades" },
  { name: "Quantity Surveyor", slug: "quantity-surveyor", sector: "Construction & Skilled Trades" },
  { name: "Architect", slug: "architect", sector: "Construction & Skilled Trades" },
  { name: "Surveyor", slug: "surveyor", sector: "Construction & Skilled Trades" },
  { name: "HVAC Technician", slug: "hvac-technician", sector: "Construction & Skilled Trades" },
  { name: "Heavy Equipment Operator", slug: "heavy-equipment-operator", sector: "Construction & Skilled Trades" },
  { name: "Roofer", slug: "roofer", sector: "Construction & Skilled Trades" },
  { name: "Plasterer", slug: "plasterer", sector: "Construction & Skilled Trades" },
  { name: "Foreman", slug: "foreman", sector: "Construction & Skilled Trades" },
  // Creative, Design & Media
  { name: "Graphic Designer", slug: "graphic-designer", sector: "Creative, Design & Media" },
  { name: "Web Designer", slug: "web-designer", sector: "Creative, Design & Media" },
  { name: "Interior Designer", slug: "interior-designer", sector: "Creative, Design & Media" },
  { name: "Fashion Designer", slug: "fashion-designer", sector: "Creative, Design & Media" },
  { name: "Photographer", slug: "photographer", sector: "Creative, Design & Media" },
  { name: "Videographer", slug: "videographer", sector: "Creative, Design & Media" },
  { name: "Video Editor", slug: "video-editor", sector: "Creative, Design & Media" },
  { name: "Animator", slug: "animator", sector: "Creative, Design & Media" },
  { name: "Illustrator", slug: "illustrator", sector: "Creative, Design & Media" },
  { name: "Art Director", slug: "art-director", sector: "Creative, Design & Media" },
  { name: "Creative Director", slug: "creative-director", sector: "Creative, Design & Media" },
  { name: "Journalist", slug: "journalist", sector: "Creative, Design & Media" },
  { name: "Editor", slug: "editor", sector: "Creative, Design & Media" },
  { name: "Producer", slug: "producer", sector: "Creative, Design & Media" },
  { name: "Sound Engineer", slug: "sound-engineer", sector: "Creative, Design & Media" },
  { name: "Makeup Artist", slug: "makeup-artist", sector: "Creative, Design & Media" },
  { name: "Beauty Artist", slug: "beauty-artist", sector: "Creative, Design & Media" },
  // Logistics, Transport & Supply Chain
  { name: "Driver", slug: "driver", sector: "Logistics, Transport & Supply Chain" },
  { name: "Delivery Driver", slug: "delivery-driver", sector: "Logistics, Transport & Supply Chain" },
  { name: "Truck Driver", slug: "truck-driver", sector: "Logistics, Transport & Supply Chain" },
  { name: "Warehouse Operative", slug: "warehouse-operative", sector: "Logistics, Transport & Supply Chain" },
  { name: "Forklift Operator", slug: "forklift-operator", sector: "Logistics, Transport & Supply Chain" },
  { name: "Logistics Coordinator", slug: "logistics-coordinator", sector: "Logistics, Transport & Supply Chain" },
  { name: "Supply Chain Manager", slug: "supply-chain-manager", sector: "Logistics, Transport & Supply Chain" },
  { name: "Procurement Officer", slug: "procurement-officer", sector: "Logistics, Transport & Supply Chain" },
  { name: "Inventory Controller", slug: "inventory-controller", sector: "Logistics, Transport & Supply Chain" },
  { name: "Dispatcher", slug: "dispatcher", sector: "Logistics, Transport & Supply Chain" },
  { name: "Fleet Manager", slug: "fleet-manager", sector: "Logistics, Transport & Supply Chain" },
  { name: "Courier", slug: "courier", sector: "Logistics, Transport & Supply Chain" },
  { name: "Shipping Clerk", slug: "shipping-clerk", sector: "Logistics, Transport & Supply Chain" },
  { name: "Customs Officer", slug: "customs-officer", sector: "Logistics, Transport & Supply Chain" },
  // Customer Service & Retail
  { name: "Customer Service Representative", slug: "customer-service-representative", sector: "Customer Service & Retail" },
  { name: "Call Centre Agent", slug: "call-centre-agent", sector: "Customer Service & Retail" },
  { name: "Customer Support Specialist", slug: "customer-support-specialist", sector: "Customer Service & Retail" },
  { name: "Retail Sales Associate", slug: "retail-sales-associate", sector: "Customer Service & Retail" },
  { name: "Cashier", slug: "cashier", sector: "Customer Service & Retail" },
  { name: "Store Manager", slug: "store-manager", sector: "Customer Service & Retail" },
  { name: "Shop Assistant", slug: "shop-assistant", sector: "Customer Service & Retail" },
  { name: "Visual Merchandiser", slug: "visual-merchandiser", sector: "Customer Service & Retail" },
  { name: "Customer Success Manager", slug: "customer-success-manager", sector: "Customer Service & Retail" },
  { name: "Front Desk Agent", slug: "front-desk-agent", sector: "Customer Service & Retail" },
  { name: "Stock Associate", slug: "stock-associate", sector: "Customer Service & Retail" },
  // Beauty & Personal Care
  { name: "Hairdresser", slug: "hairdresser", sector: "Beauty & Personal Care" },
  { name: "Hair Stylist", slug: "hair-stylist", sector: "Beauty & Personal Care" },
  { name: "Barber", slug: "barber", sector: "Beauty & Personal Care" },
  { name: "Beautician", slug: "beautician", sector: "Beauty & Personal Care" },
  { name: "Nail Technician", slug: "nail-technician", sector: "Beauty & Personal Care" },
  { name: "Esthetician", slug: "esthetician", sector: "Beauty & Personal Care" },
  { name: "Spa Therapist", slug: "spa-therapist", sector: "Beauty & Personal Care" },
  { name: "Makeup Artist (Beauty)", slug: "makeup-artist-beauty", sector: "Beauty & Personal Care" },
  { name: "Lash Technician", slug: "lash-technician", sector: "Beauty & Personal Care" },
  { name: "Cosmetologist", slug: "cosmetologist", sector: "Beauty & Personal Care" },
  // Human Resources
  { name: "HR Manager", slug: "hr-manager", sector: "Human Resources" },
  { name: "HR Assistant", slug: "hr-assistant", sector: "Human Resources" },
  { name: "Recruiter", slug: "recruiter", sector: "Human Resources" },
  { name: "Talent Acquisition Specialist", slug: "talent-acquisition-specialist", sector: "Human Resources" },
  { name: "HR Business Partner", slug: "hr-business-partner", sector: "Human Resources" },
  { name: "Training & Development Officer", slug: "training-development-officer", sector: "Human Resources" },
  { name: "Compensation & Benefits Analyst", slug: "compensation-benefits-analyst", sector: "Human Resources" },
  { name: "Employee Relations Officer", slug: "employee-relations-officer", sector: "Human Resources" },
  { name: "HR Coordinator", slug: "hr-coordinator", sector: "Human Resources" },
  // Legal
  { name: "Lawyer", slug: "lawyer", sector: "Legal", aliases: ["Solicitor", "Attorney"] },
  { name: "Paralegal", slug: "paralegal", sector: "Legal" },
  { name: "Legal Assistant", slug: "legal-assistant", sector: "Legal" },
  { name: "Legal Secretary", slug: "legal-secretary", sector: "Legal" },
  { name: "Compliance Officer", slug: "compliance-officer", sector: "Legal" },
  { name: "Contracts Manager", slug: "contracts-manager", sector: "Legal" },
  { name: "Legal Counsel", slug: "legal-counsel", sector: "Legal" },
  { name: "Notary", slug: "notary", sector: "Legal" },
  // Science & Research
  { name: "Research Scientist", slug: "research-scientist", sector: "Science & Research" },
  { name: "Laboratory Technician", slug: "laboratory-technician", sector: "Science & Research" },
  { name: "Biologist", slug: "biologist", sector: "Science & Research" },
  { name: "Chemist", slug: "chemist", sector: "Science & Research" },
  { name: "Research Assistant", slug: "research-assistant", sector: "Science & Research" },
  { name: "Clinical Research Associate", slug: "clinical-research-associate", sector: "Science & Research" },
  { name: "Environmental Scientist", slug: "environmental-scientist", sector: "Science & Research" },
  { name: "Food Scientist", slug: "food-scientist", sector: "Science & Research" },
  { name: "Statistician", slug: "statistician", sector: "Science & Research" },
  // Manufacturing & Production
  { name: "Production Operative", slug: "production-operative", sector: "Manufacturing & Production" },
  { name: "Machine Operator", slug: "machine-operator", sector: "Manufacturing & Production" },
  { name: "Production Manager", slug: "production-manager", sector: "Manufacturing & Production" },
  { name: "Assembler", slug: "assembler", sector: "Manufacturing & Production" },
  { name: "Quality Control Inspector", slug: "quality-control-inspector", sector: "Manufacturing & Production" },
  { name: "Plant Manager", slug: "plant-manager", sector: "Manufacturing & Production" },
  { name: "Maintenance Technician", slug: "maintenance-technician", sector: "Manufacturing & Production" },
  { name: "Shift Supervisor", slug: "shift-supervisor", sector: "Manufacturing & Production" },
  // Public Sector, Social & Other
  { name: "Social Worker", slug: "social-worker", sector: "Public Sector, Social & Other" },
  { name: "Civil Servant", slug: "civil-servant", sector: "Public Sector, Social & Other" },
  { name: "Police Officer", slug: "police-officer", sector: "Public Sector, Social & Other" },
  { name: "Firefighter", slug: "firefighter", sector: "Public Sector, Social & Other" },
  { name: "Security Guard", slug: "security-guard", sector: "Public Sector, Social & Other" },
  { name: "Cleaner", slug: "cleaner", sector: "Public Sector, Social & Other", aliases: ["Janitor"] },
  { name: "Caretaker", slug: "caretaker", sector: "Public Sector, Social & Other" },
  { name: "Farm Worker", slug: "farm-worker", sector: "Public Sector, Social & Other" },
  { name: "Agricultural Technician", slug: "agricultural-technician", sector: "Public Sector, Social & Other" },
  { name: "Charity", slug: "charity", sector: "Public Sector, Social & Other", aliases: ["NGO Worker"] },
  { name: "Translator", slug: "translator", sector: "Public Sector, Social & Other", aliases: ["Interpreter"] },
  // Religious — merged via almijob-v2 PR #32 (cross-product sync with
  // AlmiSalary v2's religious-scholar base role + 8 aliases).
  { name: "Religious Scholar", slug: "religious-scholar", sector: "Public Sector, Social & Other", aliases: ["Cleric", "Clergy"] },
  { name: "Imam", slug: "imam", sector: "Public Sector, Social & Other", aliases: ["Mosque Imam"] },
  { name: "Khateeb", slug: "khateeb", sector: "Public Sector, Social & Other", aliases: ["Khatib", "Friday Preacher"] },
  { name: "Mufti", slug: "mufti", sector: "Public Sector, Social & Other" },
  { name: "Priest", slug: "priest", sector: "Public Sector, Social & Other", aliases: ["Catholic Priest"] },
  { name: "Pastor", slug: "pastor", sector: "Public Sector, Social & Other", aliases: ["Minister"] },
  { name: "Rabbi", slug: "rabbi", sector: "Public Sector, Social & Other" },
  { name: "Pandit", slug: "pandit", sector: "Public Sector, Social & Other", aliases: ["Pujari", "Hindu Priest"] },
  { name: "Monk", slug: "monk", sector: "Public Sector, Social & Other", aliases: ["Buddhist Monk", "Bhikkhu"] },
  // Religious — extended via PR #52 from AlmiCV_Religious_Roles_List.docx.
  // Naming convention: native term as primary where widely searched, with
  // English gloss in parens (e.g. "Granthi (Sikh Priest)") so the dropdown
  // surfaces under both queries. Existing 9 entries above kept untouched so
  // their slugs (and SEO surface) don't change.
  { name: "Qari (Quran Reciter)", slug: "qari", sector: "Public Sector, Social & Other", aliases: ["Quran Reciter"] },
  { name: "Hafiz (Quran Memorizer)", slug: "hafiz", sector: "Public Sector, Social & Other", aliases: ["Quran Memorizer"] },
  { name: "Madrasa Teacher", slug: "madrasa-teacher", sector: "Public Sector, Social & Other", aliases: ["Islamic School Teacher"] },
  { name: "Muezzin (Adhan Caller)", slug: "muezzin", sector: "Public Sector, Social & Other", aliases: ["Adhan Caller"] },
  { name: "Islamic Scholar (Aalim)", slug: "islamic-scholar", sector: "Public Sector, Social & Other", aliases: ["Aalim", "Alim"] },
  { name: "Deacon", slug: "deacon", sector: "Public Sector, Social & Other" },
  { name: "Chaplain", slug: "chaplain", sector: "Public Sector, Social & Other" },
  { name: "Missionary", slug: "missionary", sector: "Public Sector, Social & Other" },
  { name: "Yoga Teacher", slug: "yoga-teacher", sector: "Public Sector, Social & Other", aliases: ["Yoga Instructor"] },
  { name: "Guru (Spiritual Teacher)", slug: "guru", sector: "Public Sector, Social & Other", aliases: ["Spiritual Teacher"] },
  { name: "Sanskrit Teacher", slug: "sanskrit-teacher", sector: "Public Sector, Social & Other" },
  { name: "Lama", slug: "lama", sector: "Public Sector, Social & Other", aliases: ["Tibetan Buddhist Teacher"] },
  { name: "Meditation Teacher", slug: "meditation-teacher", sector: "Public Sector, Social & Other", aliases: ["Mindfulness Teacher"] },
  { name: "Cantor", slug: "cantor", sector: "Public Sector, Social & Other", aliases: ["Hazzan"] },
  { name: "Hebrew Teacher", slug: "hebrew-teacher", sector: "Public Sector, Social & Other" },
  { name: "Granthi (Sikh Priest)", slug: "granthi", sector: "Public Sector, Social & Other", aliases: ["Sikh Priest"] },
  { name: "Sikh Religious Teacher", slug: "sikh-religious-teacher", sector: "Public Sector, Social & Other" },
  { name: "Interfaith Minister", slug: "interfaith-minister", sector: "Public Sector, Social & Other" },
  { name: "Religious Studies Teacher", slug: "religious-studies-teacher", sector: "Public Sector, Social & Other" },
  // "Open CV" is a generic flagship — not a profession. Lives here so the
  // builder pre-fill prompt has a fallback target when a TemplateImage
  // doesn't clearly read as any specific role.
  { name: "Open CV", slug: "open-cv", sector: "Public Sector, Social & Other", aliases: ["General CV", "Generic Template", "All-Purpose"] },
];

/**
 * The 11 base roles — those that own salary data in AlmiSalary v2.
 * All other 252 entries in JOB_ROLES are aliases mapping to one of these.
 * Used by AlmiCV's cv-guide to identify which roles have the deepest
 * cross-product backlinks (every alias still works for routing).
 */
export const BASE_ROLES: readonly string[] = [
  "registered-nurse",
  "software-engineer",
  "doctor",
  "teacher",
  "accountant",
  "electrician",
  "chef",
  "data-scientist",
  "marketing-manager",
  "driver",
  "religious-scholar",
];

export const JOB_ROLES_BY_SLUG: Map<string, Role> = new Map(
  JOB_ROLES.map((r) => [r.slug, r]),
);

export const JOB_ROLES_BY_SECTOR: Map<string, Role[]> = (() => {
  const m = new Map<string, Role[]>();
  for (const r of JOB_ROLES) {
    const arr = m.get(r.sector) ?? [];
    arr.push(r);
    m.set(r.sector, arr);
  }
  return m;
})();

export function getRoleBySlug(slug: string): Role | undefined {
  return JOB_ROLES_BY_SLUG.get(slug);
}
