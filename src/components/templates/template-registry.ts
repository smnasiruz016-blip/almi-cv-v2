// ============================================================================
// AlmiCV Template Registry — 20 production templates
// ----------------------------------------------------------------------------
// Single source of truth. Order matters: suggestTemplate() returns the FIRST
// template whose suggestedRoles includes the requested roleSlug. More-specific
// templates appear earlier so they win over broader fallbacks.
//
// Adding a new template = drop a .tsx file in this folder, import below, add
// one entry to TEMPLATES. No other code changes.
// ============================================================================

import type { ComponentType } from "react";
import type { TemplateProps } from "./types";

// Batch 1 (10)
import ClassicSerif from "./ClassicSerif";
import ModernTwoColumn from "./ModernTwoColumn";
import TechMinimal from "./TechMinimal";
import Healthcare from "./Healthcare";
import CreativeDirector from "./CreativeDirector";
import Academic from "./Academic";
import CyberGrid from "./CyberGrid";
import CorporateBlue from "./CorporateBlue";
import WarmCreative from "./WarmCreative";
import ReligiousTraditional from "./ReligiousTraditional";
// Batch 2 (10)
import TradesIndustrial from "./TradesIndustrial";
import RealEstateElegant from "./RealEstateElegant";
import LogisticsDirect from "./LogisticsDirect";
import BeautyPortfolio from "./BeautyPortfolio";
import ManufacturingPrecise from "./ManufacturingPrecise";
import PublicServiceHonor from "./PublicServiceHonor";
import EducationWarm from "./EducationWarm";
import SalesModern from "./SalesModern";
import ServiceFriendly from "./ServiceFriendly";
import CreativePortfolio from "./CreativePortfolio";

export type TemplateCategory =
  | "ats-classic"
  | "professional"
  | "developer"
  | "medical"
  | "creative"
  | "scholarly"
  | "infographic"
  | "business"
  | "hospitality"
  | "faith-based"
  | "trades-industrial"
  | "real-estate"
  | "logistics"
  | "beauty"
  | "manufacturing"
  | "public-service"
  | "education-warm"
  | "sales"
  | "service";

export interface TemplateMeta {
  slug: string;
  name: string;
  description: string;
  /** Short hook for template cards. Defaults to first sentence of description
   *  via getTagline() — no need to set per entry unless overriding. */
  tagline?: string;
  category: TemplateCategory;
  component: ComponentType<TemplateProps>;
  atsSafe: boolean;
  supportsPhoto: boolean;
  /** Tier gating. Defaults to "free" via getTier(). All 20 ship Free for v1. */
  tier?: "free" | "premium";
  /** ISO 8601 datetime added to catalog. Defaults via getAddedAt() to the
   *  v1 ship date (2026-05-26) for the original 20. New templates should set
   *  their own. */
  addedAt?: string;
  /** Role slugs that are a visual fit. Drives suggestTemplate(). */
  suggestedRoles: string[];
  /** Broader industry buckets (used when no role match). */
  suggestedIndustries: string[];
  /** Pinned theme palettes — exposed in the editor as a quick-switch. */
  themes?: string[];
}

/** v1 ship date for the original 20 templates. New templates added later
 *  should set `addedAt` explicitly so the bridge layer can sort accurately. */
const V1_BASE_MS = Date.parse("2026-05-26T00:00:00.000Z");

/** Tier with default. */
export function getTier(t: TemplateMeta): "free" | "premium" {
  return t.tier ?? "free";
}

/** Short tagline — uses .tagline if set, else first sentence of description. */
export function getTagline(t: TemplateMeta): string {
  if (t.tagline) return t.tagline;
  const firstSentence = t.description.split(/[.!?](?=\s|$)/)[0]?.trim();
  return firstSentence || t.description;
}

// ============================================================================
// TEMPLATES — order = priority for suggestTemplate()
// ============================================================================
export const TEMPLATES: TemplateMeta[] = [

  // ---- Specialist verticals (most specific first) ----

  {
    slug: "religious-traditional",
    name: "Religious Traditional",
    description: "Cormorant Garamond + Amiri, deep green + gold, ornamental frame. Dignified template for faith-based roles across religions.",
    category: "faith-based",
    component: ReligiousTraditional,
    atsSafe: true, supportsPhoto: false,
    suggestedRoles: [
      "imam", "mufti", "qari", "hafiz", "madrasa-teacher", "khateeb", "muezzin",
      "islamic-scholar", "aalim", "maulana",
      "priest", "pastor", "minister", "deacon", "chaplain", "missionary",
      "hindu-priest", "pandit", "pujari", "yoga-teacher", "guru", "sanskrit-teacher",
      "buddhist-monk", "bhikkhu", "lama", "meditation-teacher",
      "rabbi", "cantor", "hebrew-teacher",
      "granthi", "sikh-religious-teacher",
      "interfaith-minister", "religious-studies-teacher",
    ],
    suggestedIndustries: ["religious", "faith-based", "spiritual"],
    themes: ["forest", "ivory", "wine"],
  },

  {
    slug: "public-service-honor",
    name: "Public Service Honor",
    description: "Navy + service-red shield emblem, dignified hero, awards as honored entries. For sworn service and uniformed roles.",
    category: "public-service",
    component: PublicServiceHonor,
    atsSafe: true, supportsPhoto: false,
    suggestedRoles: [
      "police-officer", "patrol-officer", "detective", "sergeant",
      "firefighter", "fire-captain", "fire-marshal",
      "paramedic", "emt", "emergency-medical-technician",
      "correctional-officer", "probation-officer",
      "border-patrol-agent", "federal-agent", "fbi-agent", "dea-agent",
      "military-officer", "military-veteran", "army-soldier",
      "navy-sailor", "air-force-airman", "marine",
      "coast-guard", "security-officer", "security-supervisor",
      "bodyguard", "park-ranger", "game-warden", "customs-officer",
    ],
    suggestedIndustries: ["public-service", "law-enforcement", "military", "emergency-services"],
    themes: ["navy", "midnight", "charcoal"],
  },

  {
    slug: "healthcare",
    name: "Healthcare",
    description: "Forest + sage palette, credential pills, balanced two-column body. Built for clinical and allied health roles.",
    category: "medical",
    component: Healthcare,
    atsSafe: true, supportsPhoto: true,
    suggestedRoles: [
      "registered-nurse", "nurse-practitioner", "licensed-practical-nurse",
      "doctor-physician", "physician", "surgeon", "anesthesiologist",
      "pediatrician", "psychiatrist", "general-practitioner",
      "medical-assistant", "caregiver", "care-assistant", "healthcare-assistant",
      "pharmacist", "pharmacy-technician", "clinical-pharmacist",
      "dental-assistant", "dentist", "dental-hygienist", "orthodontist",
      "physiotherapist", "physical-therapist", "occupational-therapist",
      "speech-therapist", "respiratory-therapist", "massage-therapist",
      "radiographer", "radiologic-technologist",
      "lab-technician", "medical-laboratory-scientist", "phlebotomist",
      "midwife", "doula",
      "medical-receptionist", "home-health-aide", "optician", "optometrist",
      "healthcare-administrator", "veterinarian", "veterinary-technician",
      "psychologist", "counselor", "therapist", "social-worker",
    ],
    suggestedIndustries: ["healthcare", "medical", "nursing", "wellness"],
    themes: ["forest", "linen", "ivory"],
  },

  {
    slug: "trades-industrial",
    name: "Trades & Industrial",
    description: "Steel grey + warm orange. Tool motifs, license pills, insurance/OSHA signals. Built for licensed trades.",
    category: "trades-industrial",
    component: TradesIndustrial,
    atsSafe: true, supportsPhoto: false,
    suggestedRoles: [
      "electrician", "journeyman-electrician", "master-electrician",
      "plumber", "pipefitter", "steamfitter",
      "carpenter", "framer", "finish-carpenter",
      "welder", "ironworker", "boilermaker",
      "hvac-technician", "hvac-installer", "refrigeration-technician",
      "mason", "bricklayer", "stonemason", "concrete-finisher",
      "roofer", "drywaller", "painter", "glazier",
      "construction-worker", "construction-foreman", "general-contractor",
      "construction-superintendent", "site-supervisor",
      "landscaper", "tree-surgeon", "arborist",
      "automotive-mechanic", "diesel-mechanic", "auto-body-technician",
      "heavy-equipment-operator", "crane-operator", "forklift-operator",
      "millwright", "tool-and-die-maker", "machinist",
      "locksmith", "elevator-mechanic",
    ],
    suggestedIndustries: ["construction", "trades", "skilled-trades", "industrial"],
    themes: ["charcoal", "midnight", "navy"],
  },

  {
    slug: "logistics-direct",
    name: "Logistics Direct",
    description: "Black + warning-yellow road stripe. License/endorsement table, ATS-clean. Built to parse perfectly for drivers and warehouse.",
    category: "logistics",
    component: LogisticsDirect,
    atsSafe: true, supportsPhoto: false,
    suggestedRoles: [
      "truck-driver", "cdl-driver", "long-haul-driver", "delivery-driver",
      "bus-driver", "taxi-driver", "rideshare-driver", "chauffeur",
      "warehouse-worker", "warehouse-associate", "warehouse-supervisor",
      "warehouse-manager",
      "logistics-coordinator", "logistics-manager", "dispatcher",
      "fleet-manager", "freight-broker",
      "shipping-clerk", "receiving-clerk", "inventory-clerk",
      "courier", "postal-worker", "package-handler",
      "supply-chain-coordinator", "supply-chain-analyst", "supply-chain-manager",
      "procurement-officer", "procurement-manager", "buyer",
    ],
    suggestedIndustries: ["logistics", "transportation", "supply-chain", "warehousing"],
    themes: ["charcoal", "midnight"],
  },

  {
    slug: "manufacturing-precise",
    name: "Manufacturing Precise",
    description: "Industrial navy + schematic grid, metric tiles, ISO/Lean certifications prominent. For production, quality, and plant roles.",
    category: "manufacturing",
    component: ManufacturingPrecise,
    atsSafe: true, supportsPhoto: false,
    suggestedRoles: [
      "production-supervisor", "production-manager", "plant-manager",
      "manufacturing-engineer", "process-engineer", "industrial-engineer",
      "quality-engineer", "quality-specialist", "quality-control-inspector",
      "quality-assurance-manager", "six-sigma-black-belt", "six-sigma-green-belt",
      "lean-specialist", "continuous-improvement-manager",
      "operations-supervisor", "shift-supervisor",
      "assembler", "machine-operator", "cnc-operator", "cnc-machinist",
      "production-planner", "production-scheduler",
      "tool-designer", "fabricator", "metal-fabricator",
      "compliance-officer", "ehs-specialist", "safety-officer",
      "iso-auditor", "production-engineer",
    ],
    suggestedIndustries: ["manufacturing", "production", "operations", "quality"],
    themes: ["navy", "charcoal", "slate"],
  },

  {
    slug: "cyber-grid",
    name: "Cyber Grid",
    description: "Midnight + neon cyan, glass cards, isometric server illustration, glowing skill bars. For IT, cloud, and security roles.",
    category: "infographic",
    component: CyberGrid,
    atsSafe: false, supportsPhoto: true,
    suggestedRoles: [
      "it-project-manager", "technical-program-manager", "engineering-manager",
      "devops-engineer", "site-reliability-engineer",
      "cloud-engineer", "cloud-architect", "solutions-architect",
      "platform-engineer", "infrastructure-engineer", "kubernetes-engineer",
      "cybersecurity-analyst", "security-engineer", "security-architect",
      "penetration-tester", "ethical-hacker", "incident-responder",
      "network-engineer", "network-administrator",
      "it-support-technician", "help-desk-technician", "it-manager",
      "data-scientist", "data-analyst", "machine-learning-engineer",
      "scrum-master", "agile-coach",
    ],
    suggestedIndustries: ["technology", "saas", "cloud-infrastructure", "cybersecurity"],
    themes: ["midnight", "charcoal", "navy"],
  },

  {
    slug: "tech-minimal",
    name: "Tech Minimal",
    description: "Inter + JetBrains Mono, monospace stack listings, mint underline. Built for engineers — clean code-friendly aesthetic.",
    category: "developer",
    component: TechMinimal,
    atsSafe: true, supportsPhoto: false,
    suggestedRoles: [
      "software-engineer", "software-developer", "web-developer",
      "frontend-developer", "backend-developer", "full-stack-developer",
      "mobile-app-developer", "ios-developer", "android-developer",
      "data-engineer", "database-administrator", "system-administrator",
      "qa-test-engineer", "automation-engineer", "test-engineer",
      "mechanical-engineer", "electrical-engineer", "civil-engineer",
      "structural-engineer", "chemical-engineer",
      "automotive-engineer", "aerospace-engineer", "petroleum-engineer",
      "biomedical-engineer", "environmental-engineer",
      "site-engineer", "project-engineer", "maintenance-engineer",
      "cad-technician", "cad-designer", "draftsman",
      "research-engineer", "firmware-engineer", "embedded-engineer",
    ],
    suggestedIndustries: ["technology", "software", "engineering"],
    themes: ["charcoal", "midnight", "slate"],
  },

  {
    slug: "real-estate-elegant",
    name: "Real Estate Elegant",
    description: "Navy + gold, classical headings, sales-achievement badges. Premium feel for real estate professionals.",
    category: "real-estate",
    component: RealEstateElegant,
    atsSafe: true, supportsPhoto: true,
    suggestedRoles: [
      "real-estate-agent", "real-estate-broker", "realtor",
      "property-manager", "leasing-agent", "leasing-consultant",
      "real-estate-appraiser", "home-inspector",
      "mortgage-broker", "mortgage-loan-officer", "mortgage-underwriter",
      "title-insurance-officer", "escrow-officer",
      "real-estate-photographer", "commercial-real-estate-agent",
      "real-estate-investor", "property-developer",
    ],
    suggestedIndustries: ["real-estate", "property", "housing"],
    themes: ["navy", "wine", "plum"],
  },

  {
    slug: "beauty-portfolio",
    name: "Beauty Portfolio",
    description: "Soft rose + cream, portfolio swatches, social-handle prominent. For beauty, hair, and personal-care roles.",
    category: "beauty",
    component: BeautyPortfolio,
    atsSafe: true, supportsPhoto: true,
    suggestedRoles: [
      "hair-stylist", "hairdresser", "colorist", "salon-manager",
      "barber", "master-barber",
      "makeup-artist", "mua", "bridal-makeup-artist",
      "nail-technician", "manicurist", "nail-artist",
      "esthetician", "skincare-specialist", "lash-technician",
      "spa-therapist", "spa-manager",
      "personal-trainer", "fitness-instructor", "yoga-instructor",
      "pilates-instructor", "cosmetologist",
      "tattoo-artist", "piercer",
    ],
    suggestedIndustries: ["beauty", "wellness", "personal-care", "salon", "spa"],
    themes: ["coral", "linen", "sand"],
  },

  // ---- Hospitality split: back-of-house (WarmCreative) vs front-of-house (ServiceFriendly) ----

  {
    slug: "warm-creative",
    name: "Warm Creative",
    description: "Terracotta sunset hero, photo-forward, soft curves. For kitchen, hotel-mgmt, event, and tourism roles.",
    category: "hospitality",
    component: WarmCreative,
    atsSafe: true, supportsPhoto: true,
    suggestedRoles: [
      "chef", "executive-chef", "sous-chef", "head-chef", "pastry-chef",
      "line-cook", "cook", "prep-cook", "kitchen-assistant",
      "kitchen-manager",
      "hotel-manager", "hotel-general-manager", "front-office-manager",
      "concierge", "housekeeping-supervisor", "housekeeper",
      "food-and-beverage-manager", "restaurant-manager", "restaurant-owner",
      "event-planner", "event-coordinator", "wedding-planner",
      "catering-manager", "catering-coordinator",
      "tour-guide", "tour-operator", "travel-agent", "travel-consultant",
      "flight-attendant", "cruise-staff", "cruise-director",
      "tourism-officer", "destination-marketer",
    ],
    suggestedIndustries: ["hospitality", "tourism", "food-service", "events", "hotels"],
    themes: ["coral", "sand", "terracotta", "linen"],
  },

  {
    slug: "service-friendly",
    name: "Service Friendly",
    description: "Mint + cream, customer-service signals. Front-of-house focused — distinct from kitchen and management.",
    category: "service",
    component: ServiceFriendly,
    atsSafe: true, supportsPhoto: true,
    suggestedRoles: [
      "waiter", "waitress", "server", "food-server",
      "bartender", "barback", "mixologist",
      "barista", "head-barista",
      "host", "hostess", "maitre-d",
      "retail-associate", "retail-sales-associate", "sales-associate",
      "cashier", "checkout-assistant", "store-clerk",
      "customer-service-representative", "customer-service-agent",
      "call-center-agent", "contact-center-representative",
      "front-desk-receptionist", "guest-service-agent",
      "valet", "doorman", "porter",
      "fast-food-worker", "drive-thru-attendant",
      "personal-shopper", "stylist-retail",
    ],
    suggestedIndustries: ["service", "retail", "customer-service", "food-beverage"],
    themes: ["coral", "linen", "ivory"],
  },

  // ---- Education split: warm classroom (EducationWarm) vs scholarly (Academic) ----

  {
    slug: "education-warm",
    name: "Education Warm",
    description: "Mustard + sage, dotted underlines, classroom-friendly. For early-years and primary educators.",
    category: "education-warm",
    component: EducationWarm,
    atsSafe: true, supportsPhoto: true,
    suggestedRoles: [
      "elementary-teacher", "primary-school-teacher", "primary-teacher",
      "preschool-teacher", "kindergarten-teacher", "nursery-teacher",
      "daycare-worker", "childcare-worker", "nursery-assistant",
      "early-years-educator", "early-childhood-educator",
      "teaching-assistant", "classroom-assistant", "learning-support-assistant",
      "special-education-teacher", "special-needs-assistant",
      "sen-teacher", "esl-teacher", "esl-english-teacher",
      "art-teacher-elementary", "music-teacher-elementary",
      "physical-education-teacher", "pe-teacher",
      "school-counselor", "school-counsellor",
      "after-school-coordinator", "summer-camp-counselor",
    ],
    suggestedIndustries: ["early-education", "primary-education", "childcare"],
    themes: ["sand", "linen", "ivory"],
  },

  {
    slug: "academic",
    name: "Academic",
    description: "Crimson Pro, centred classical header, publication-friendly. Built for researchers, professors, and secondary educators.",
    category: "scholarly",
    component: Academic,
    atsSafe: true, supportsPhoto: false,
    suggestedRoles: [
      "professor", "associate-professor", "assistant-professor",
      "lecturer", "senior-lecturer", "reader",
      "postdoctoral-researcher", "phd-candidate", "doctoral-researcher",
      "research-scientist", "research-associate", "research-assistant",
      "research-fellow", "principal-investigator",
      "secondary-school-teacher", "high-school-teacher", "secondary-teacher",
      "tutor", "academic-tutor",
      "trainer", "corporate-trainer", "instructional-designer",
      "education-coordinator", "education-administrator", "academic-advisor",
      "librarian", "archivist",
      "department-head", "dean", "provost",
    ],
    suggestedIndustries: ["academia", "research", "secondary-education", "higher-education"],
    themes: ["wine", "ivory", "plum"],
  },

  // ---- Creative split: portfolio (CreativePortfolio) vs leadership (CreativeDirector) ----

  {
    slug: "creative-portfolio",
    name: "Creative Portfolio",
    description: "Mustard + cream + plum, asymmetric work tiles, big watermark number. Portfolio-forward for IC designers and illustrators.",
    category: "creative",
    component: CreativePortfolio,
    atsSafe: false, supportsPhoto: false,
    suggestedRoles: [
      "graphic-designer", "junior-graphic-designer", "senior-graphic-designer",
      "illustrator", "digital-illustrator", "concept-artist",
      "3d-artist", "3d-designer", "character-designer",
      "motion-designer", "motion-graphics-artist",
      "ui-designer", "visual-designer", "web-designer",
      "package-designer", "print-designer",
      "publication-designer", "editorial-designer",
      "junior-ux-designer", "ux-designer",
      "junior-product-designer", "product-designer",
      "junior-brand-designer", "brand-designer",
    ],
    suggestedIndustries: ["design", "creative", "illustration", "visual-arts"],
    themes: ["sand", "ivory", "wine"],
  },

  {
    slug: "creative-director",
    name: "Creative Director",
    description: "Dark plum hero with coral glow, DM Serif Display H1, sidebar card. For senior design leadership and brand direction.",
    category: "creative",
    component: CreativeDirector,
    atsSafe: false, supportsPhoto: true,
    suggestedRoles: [
      "creative-director", "executive-creative-director",
      "art-director", "associate-art-director",
      "design-director", "head-of-design",
      "brand-director", "head-of-brand",
      "photographer", "fashion-photographer", "wedding-photographer",
      "videographer", "video-editor", "cinematographer",
      "content-creator", "content-director", "content-strategist",
      "fashion-designer", "fashion-stylist",
      "interior-designer", "interior-architect",
      "industrial-designer", "product-designer-physical",
      "copywriter", "creative-copywriter", "senior-copywriter",
    ],
    suggestedIndustries: ["design-leadership", "advertising", "fashion", "media"],
    themes: ["plum", "wine", "midnight"],
  },

  // ---- Business / management ----

  {
    slug: "sales-modern",
    name: "Sales Modern",
    description: "Orange→pink gradient hero, KPI tiles overlapping. Achievement-forward for quota-carrying sales roles.",
    category: "sales",
    component: SalesModern,
    atsSafe: true, supportsPhoto: true,
    suggestedRoles: [
      "sales-representative", "sales-rep", "sdr", "sales-development-representative",
      "bdr", "business-development-representative",
      "account-executive", "senior-account-executive",
      "account-manager", "senior-account-manager", "key-account-manager",
      "inside-sales-representative", "outside-sales-representative",
      "field-sales-representative", "territory-sales-manager",
      "regional-sales-manager", "sales-manager", "sales-director",
      "vp-of-sales", "chief-revenue-officer",
      "sales-engineer", "solutions-engineer", "pre-sales-consultant",
      "channel-account-manager", "partner-manager",
      "business-development-manager", "business-development-director",
      "telesales-agent", "telemarketer",
      "insurance-agent", "insurance-broker", "financial-advisor",
    ],
    suggestedIndustries: ["sales", "business-development"],
    themes: ["coral", "plum", "wine"],
  },

  {
    slug: "corporate-blue",
    name: "Corporate Blue",
    description: "Navy hero band + clean white body, executive polish. For project, product, and operations leadership.",
    category: "business",
    component: CorporateBlue,
    atsSafe: true, supportsPhoto: true,
    suggestedRoles: [
      "project-manager", "senior-project-manager", "project-coordinator",
      "program-manager", "portfolio-manager",
      "product-manager", "senior-product-manager", "group-product-manager",
      "product-director", "vp-of-product", "chief-product-officer",
      "operations-manager", "operations-director", "vp-of-operations",
      "general-manager", "regional-manager", "country-manager",
      "managing-director", "director", "vice-president",
      "chief-executive-officer", "chief-operating-officer",
      "business-analyst", "senior-business-analyst",
      "strategy-manager", "strategy-director",
    ],
    suggestedIndustries: ["business", "management", "operations"],
    themes: ["navy", "sky", "slate", "plum"],
  },

  {
    slug: "modern-two-column",
    name: "Modern Two-Column",
    description: "Peach sidebar for contact and skills, coral underline on every section. Built for marketing, admin, HR, and office roles.",
    category: "professional",
    component: ModernTwoColumn,
    atsSafe: true, supportsPhoto: true,
    suggestedRoles: [
      "administrative-assistant", "office-manager", "personal-assistant",
      "receptionist", "office-administrator", "secretary", "virtual-assistant",
      "office-clerk", "data-entry-clerk",
      "marketing-manager", "marketing-executive", "marketing-coordinator",
      "digital-marketing-specialist", "digital-marketing-manager",
      "seo-specialist", "ppc-specialist",
      "social-media-manager", "community-manager",
      "content-writer", "copywriter-marketing", "content-marketing-manager",
      "brand-manager", "brand-marketing-manager",
      "public-relations-officer", "pr-specialist",
      "market-research-analyst", "marketing-analyst",
      "human-resources-manager", "hr-coordinator", "hr-business-partner",
      "recruiter", "talent-acquisition-specialist",
      "training-coordinator", "learning-and-development-specialist",
    ],
    suggestedIndustries: ["administration", "marketing", "human-resources", "communications"],
    themes: ["coral", "plum", "sand", "linen"],
  },

  // ---- Default fallback (last in the array — catches anything not matched above) ----

  {
    slug: "classic-serif",
    name: "Classic Serif",
    description: "Single-column, gold rule accents, Fraunces display. Safest professional choice — also the default fallback.",
    category: "ats-classic",
    component: ClassicSerif,
    atsSafe: true, supportsPhoto: false,
    suggestedRoles: [
      "accountant", "senior-accountant", "junior-accountant",
      "accounts-assistant", "bookkeeper",
      "financial-analyst", "senior-financial-analyst",
      "auditor", "internal-auditor", "external-auditor",
      "tax-advisor", "tax-accountant", "tax-specialist",
      "payroll-officer", "credit-controller",
      "financial-controller", "chief-financial-officer", "treasurer",
      "investment-analyst", "investment-banker",
      "loan-officer", "underwriter",
      "actuary", "treasury-analyst", "risk-analyst", "compliance-officer-finance",
      "lawyer", "attorney", "paralegal", "legal-assistant",
      "general-counsel", "corporate-lawyer", "litigation-associate",
      "management-consultant", "strategy-consultant",
      "chief-of-staff", "executive-assistant",
    ],
    suggestedIndustries: ["finance", "accounting", "legal", "consulting", "executive"],
    themes: ["plum", "navy", "wine", "charcoal"],
  },
];

// ============================================================================
// Helpers
// ============================================================================

/** Memoized addedAt — staggers V1 templates by 1 minute per registry index
 *  so the homepage sort (addedAt desc) preserves registry order without ties.
 *  Built once at module load after TEMPLATES is initialized. */
const ADDED_AT_CACHE: Map<string, string> = (() => {
  const m = new Map<string, string>();
  for (let i = 0; i < TEMPLATES.length; i++) {
    const t = TEMPLATES[i];
    if (!t.addedAt) {
      m.set(t.slug, new Date(V1_BASE_MS + i * 60_000).toISOString());
    }
  }
  return m;
})();

/** addedAt with default. */
export function getAddedAt(t: TemplateMeta): string {
  return t.addedAt ?? ADDED_AT_CACHE.get(t.slug) ?? new Date(V1_BASE_MS).toISOString();
}

export function getTemplate(slug: string | null | undefined): TemplateMeta {
  if (!slug) return defaultTemplate();
  return TEMPLATES.find((t) => t.slug === slug) ?? defaultTemplate();
}

export function defaultTemplate(): TemplateMeta {
  return TEMPLATES.find((t) => t.slug === "classic-serif") ?? TEMPLATES[TEMPLATES.length - 1];
}

/**
 * Suggest a template for a freshly uploaded Canva PNG. Drives the /admin
 * upload pipeline (auto-tag the layout — admin can override) and the
 * /cv/new flow (auto-pick a layout when the user clicks a PNG).
 */
export function suggestTemplate(opts: {
  roleSlug?: string;
  industrySlug?: string;
}): TemplateMeta {
  const { roleSlug, industrySlug } = opts;
  if (roleSlug) {
    const exact = TEMPLATES.find((t) => t.suggestedRoles.includes(roleSlug));
    if (exact) return exact;
  }
  if (industrySlug) {
    const byIndustry = TEMPLATES.find((t) =>
      t.suggestedIndustries.includes(industrySlug),
    );
    if (byIndustry) return byIndustry;
  }
  return defaultTemplate();
}

export function templatesByCategory(category: TemplateCategory): TemplateMeta[] {
  return TEMPLATES.filter((t) => t.category === category);
}

/** Flat map of every supported role -> templateSlug. Use this for one-time
 *  backfill across the 246 TemplateImage rows. */
export function getAllRoleMappings(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const t of TEMPLATES) {
    for (const role of t.suggestedRoles) {
      if (!map[role]) map[role] = t.slug;
    }
  }
  return map;
}

/** Total number of unique roles covered. */
export function getCoveredRoleCount(): number {
  const seen = new Set<string>();
  for (const t of TEMPLATES) for (const r of t.suggestedRoles) seen.add(r);
  return seen.size;
}
