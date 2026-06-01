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
// Batch 3 (10) — Claude Design pseudo-CVData shape. Runtime adapter in
// src/lib/cd-adapter.ts converts AlmiCV CVData → CD's shape at the
// editor/print boundary. The casts below lie to TS so the registry
// presents a uniform ComponentType<TemplateProps> regardless of which
// shape each template actually consumes internally.
import LegalFormal from "./batch3/LegalFormal";
import FinancePrecise from "./batch3/FinancePrecise";
import FinanceElite from "./batch3/FinanceElite";
import PeopleWarm from "./batch3/PeopleWarm";
import OperationsStructured from "./batch3/OperationsStructured";
import InsuranceTrust from "./batch3/InsuranceTrust";
import VeterinaryCaring from "./batch3/VeterinaryCaring";
import AviationPrecise from "./batch3/AviationPrecise";
import HospitalityElegant from "./batch3/HospitalityElegant";
import LinguistMultilingual from "./batch3/LinguistMultilingual";
// Batch 4 (7) — Claude Design 2026-05-27. Schema-canonical: consume production
// CVData directly with no adapter (no asTemplate cast). Helpers (BulletsRender
// et al.) live in ./types alongside the helpers used by Batch 1+2.
import IceBlueGlass from "./IceBlueGlass";
import AdminFluid from "./AdminFluid";
import CyberEmerald from "./CyberEmerald";
import WellnessGolden from "./WellnessGolden";
import MedicalSurgical from "./MedicalSurgical";
import CloudLight from "./CloudLight";
import PharmacyPastel from "./PharmacyPastel";
// ---- Expansion batch (2026-06-01): 38 new templates ----
import ArchitectIsometric from "./ArchitectIsometric";
import AviationHUD from "./AviationHUD";
import BarberEditorial from "./BarberEditorial";
import ConstructionBlueprint from "./ConstructionBlueprint";
import CulinaryGold from "./CulinaryGold";
import DataPulseDark from "./DataPulseDark";
import DentalClean from "./DentalClean";
import EditorialInk from "./EditorialInk";
import EngineerBlueprint from "./EngineerBlueprint";
import EventLumen from "./EventLumen";
import FinanceAdvisorGold from "./FinanceAdvisorGold";
import FitnessDynamic from "./FitnessDynamic";
import GoldLiquidLuxe from "./GoldLiquidLuxe";
import HolographicSunset from "./HolographicSunset";
import IsometricSilver from "./IsometricSilver";
import LegalLuxe from "./LegalLuxe";
import MarketingGradient from "./MarketingGradient";
import NeonServerStack from "./NeonServerStack";
import NurseVitalSigns from "./NurseVitalSigns";
import PhotographyGallery from "./PhotographyGallery";
import ProductRoadmap from "./ProductRoadmap";
import PurpleGradientPro from "./PurpleGradientPro";
import RealEstateLuxe from "./RealEstateLuxe";
import SpaZenWatercolor from "./SpaZenWatercolor";
import TeacherChalk from "./TeacherChalk";
import TealCleanSplit from "./TealCleanSplit";
import TradesVolt from "./TradesVolt";
import UXPortfolioGrid from "./UXPortfolioGrid";

// asTemplate — narrow cast used only for Batch 3 components whose data
// prop is CD's pseudo-CVData. Editor + print routes pipe data through
// toCDShape() before passing to these components, so the cast is sound
// at runtime even though the static types disagree.
const asTemplate = <T>(c: T) => c as unknown as ComponentType<TemplateProps>;

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
  | "service"
  // Batch 3 — new vertical specialists
  | "legal"
  | "finance"
  | "people-hr"
  | "operations"
  | "insurance"
  | "veterinary"
  | "aviation"
  | "hospitality-elegant"
  | "linguist";

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

  // ---- Batch 4 specialists (Claude Design, 2026-05-27). Schema-canonical:
  //      consume production CVData directly, no adapter, no cast. Placed
  //      above Batch 3 + broad fallbacks so they win for surgeons,
  //      pharmacists, massage therapists, IT PMs, admin assistants,
  //      office managers, and secondary-school teachers. ----

  {
    slug: "medical-surgical",
    name: "Medical Surgical",
    description: "White + bold red angular corners, dotted timeline. For surgeons and specialist doctors.",
    category: "medical",
    component: MedicalSurgical,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-05-27T10:00:00.000Z",
    suggestedRoles: [
      "surgeon", "orthopedic-surgeon", "cardiothoracic-surgeon",
      "neurosurgeon", "plastic-surgeon", "general-surgeon", "vascular-surgeon",
      "trauma-surgeon", "oral-surgeon", "pediatric-surgeon",
      "hospital-consultant", "specialist-doctor", "senior-consultant",
    ],
    suggestedIndustries: ["surgical-medicine", "specialist-medicine"],
    themes: ["plum", "wine"],
  },

  {
    slug: "pharmacy-pastel",
    name: "Pharmacy Pastel",
    description: "Lavender + gold soft waves, hexagonal photo. Built for pharmacy professionals.",
    category: "medical",
    component: PharmacyPastel,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-05-27T10:01:00.000Z",
    suggestedRoles: [
      "pharmacist", "clinical-pharmacist", "retail-pharmacist", "hospital-pharmacist",
      "compounding-pharmacist", "oncology-pharmacist", "pediatric-pharmacist",
      "pharmacy-technician", "pharmacy-assistant", "dispensing-assistant",
      "pharmaceutical-care-specialist",
    ],
    suggestedIndustries: ["pharmacy", "pharmaceutical"],
    themes: ["plum", "ivory"],
  },

  {
    slug: "wellness-golden",
    name: "Wellness Golden",
    description: "Dark chocolate + glowing gold + hexagonal photo. For massage therapists and holistic wellness.",
    category: "beauty",
    component: WellnessGolden,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-05-27T10:02:00.000Z",
    suggestedRoles: [
      "massage-therapist", "licensed-massage-therapist", "sports-massage-therapist",
      "spa-therapist", "holistic-healer", "reiki-practitioner",
      "aromatherapist", "reflexologist", "wellness-coach", "yoga-instructor",
      "meditation-instructor", "sound-healer", "ayurvedic-practitioner",
    ],
    suggestedIndustries: ["wellness", "spa", "holistic-health"],
    themes: ["wine", "ivory"],
  },

  {
    slug: "ice-blue-glass",
    name: "Ice Blue Glass",
    description: "Dark navy + cyan/purple wave + glass cards. Built for STEM teachers and academic instructors.",
    category: "scholarly",
    component: IceBlueGlass,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-05-27T10:03:00.000Z",
    suggestedRoles: [
      "secondary-school-teacher", "high-school-teacher", "stem-teacher",
      "physics-teacher", "chemistry-teacher", "biology-teacher", "mathematics-teacher",
      "computer-science-teacher", "tutor", "academic-tutor", "online-tutor",
    ],
    suggestedIndustries: ["secondary-education", "stem-education"],
    themes: ["midnight", "navy"],
  },

  {
    slug: "cloud-light",
    name: "Cloud Light",
    description: "Light cream + soft blue + 3D cloud illustration. Lighter variant for IT PMs and architects.",
    category: "infographic",
    component: CloudLight,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-05-27T10:04:00.000Z",
    suggestedRoles: [
      "it-project-manager", "technical-project-manager", "cloud-project-manager",
      "cloud-architect", "solutions-architect", "enterprise-architect",
      "saas-product-manager", "platform-product-manager",
    ],
    suggestedIndustries: ["cloud-infrastructure", "saas"],
    themes: ["sky", "ivory"],
  },

  {
    slug: "cyber-emerald",
    name: "Cyber Emerald",
    description: "Deep emerald + neon green isometric. For office managers with a tech edge.",
    category: "business",
    component: CyberEmerald,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-05-27T10:05:00.000Z",
    suggestedRoles: [
      "office-manager", "operations-coordinator", "facilities-manager",
      "it-office-manager", "executive-office-manager",
      "operations-supervisor", "admin-operations-manager",
    ],
    suggestedIndustries: ["operations", "tech-office"],
    themes: ["midnight"],
  },

  {
    slug: "admin-fluid",
    name: "Admin Fluid",
    description: "Soft ice-blue with flowing blue ribbons and glassmorphism cards. Built for office and admin support.",
    category: "professional",
    component: AdminFluid,
    atsSafe: true, supportsPhoto: false,
    addedAt: "2026-05-27T10:06:00.000Z",
    suggestedRoles: [
      "administrative-assistant", "office-assistant", "executive-assistant",
      "office-coordinator", "office-administrator", "secretary", "receptionist",
      "personal-assistant", "virtual-assistant", "data-entry-clerk", "office-clerk",
    ],
    suggestedIndustries: ["administration", "office-support"],
    themes: ["sky", "slate"],
  },

  // ---- Batch 3 specialists (Claude Design, 2026-05-26). Placed here so
  //      they win the suggestTemplate() lookup against broader Batch 1+2
  //      fallbacks (classic-serif for legal/finance, modern-two-column
  //      for HR, healthcare for veterinary, warm-creative for hospitality,
  //      etc.). Each component takes CD's pseudo-CVData internally;
  //      lib/cd-adapter.ts converts at the editor/print boundary. ----

  {
    slug: "legal-formal",
    name: "Legal Formal",
    description: "Cream base + navy + gold wavy top band, scales watermark. Authority through typography, not heavy darks.",
    category: "legal",
    component: asTemplate(LegalFormal),
    atsSafe: true, supportsPhoto: false,
    suggestedRoles: [
      "lawyer", "attorney", "barrister", "solicitor", "advocate",
      "corporate-lawyer", "criminal-defense-attorney", "litigation-associate",
      "litigation-attorney", "intellectual-property-attorney", "ip-attorney",
      "tax-attorney", "real-estate-attorney", "family-law-attorney",
      "employment-attorney", "immigration-attorney", "patent-attorney",
      "paralegal", "legal-assistant", "legal-secretary",
      "general-counsel", "associate-general-counsel", "deputy-general-counsel",
      "judge", "magistrate", "law-clerk", "court-clerk",
      "compliance-counsel", "in-house-counsel", "contract-attorney",
      "legal-analyst", "law-firm-partner", "law-firm-associate",
    ],
    suggestedIndustries: ["legal", "law"],
    themes: ["plum", "navy", "wine"],
  },

  {
    slug: "finance-precise",
    name: "Finance Precise",
    description: "White + forest green + amber. Ledger-line divider, refined grid. For accounting, audit, and tax professionals.",
    category: "finance",
    component: asTemplate(FinancePrecise),
    atsSafe: true, supportsPhoto: false,
    suggestedRoles: [
      "accountant", "senior-accountant", "junior-accountant", "staff-accountant",
      "accounts-assistant", "accounts-payable-clerk", "accounts-receivable-clerk",
      "bookkeeper", "senior-bookkeeper",
      "cpa", "certified-public-accountant", "chartered-accountant",
      "auditor", "internal-auditor", "external-auditor", "audit-manager", "audit-senior",
      "tax-advisor", "tax-accountant", "tax-specialist", "tax-manager", "tax-consultant",
      "payroll-officer", "payroll-manager", "payroll-specialist",
      "credit-controller", "credit-analyst",
      "financial-controller", "controller", "assistant-controller",
      "treasury-analyst", "treasurer",
      "billing-specialist", "cost-accountant", "forensic-accountant",
    ],
    suggestedIndustries: ["accounting", "audit", "tax", "bookkeeping"],
    themes: ["forest", "ivory", "wine"],
  },

  {
    slug: "finance-elite",
    name: "Finance Elite",
    description: "Cream + deep teal + rose gold, wavy right-side accent. Achievement-focused — deal size, AUM, returns.",
    category: "finance",
    component: asTemplate(FinanceElite),
    atsSafe: true, supportsPhoto: false,
    suggestedRoles: [
      "investment-banker", "investment-banking-analyst", "ib-analyst", "ib-associate",
      "investment-analyst", "senior-investment-analyst",
      "financial-analyst", "senior-financial-analyst",
      "private-equity-analyst", "pe-analyst", "private-equity-associate",
      "hedge-fund-analyst", "hedge-fund-manager",
      "portfolio-manager", "asset-manager", "wealth-manager",
      "equity-research-analyst", "research-analyst-finance",
      "venture-capital-analyst", "vc-analyst", "vc-associate",
      "trader", "derivatives-trader", "quantitative-analyst", "quant",
      "fund-manager", "investment-manager",
    ],
    suggestedIndustries: ["investment-banking", "private-equity", "hedge-funds", "asset-management"],
    themes: ["midnight", "wine", "plum"],
  },

  {
    slug: "people-warm",
    name: "People Warm",
    description: "Cream + coral + sage, top wave divider, network-nodes motif. Approachable but professional for HR & talent.",
    category: "people-hr",
    component: asTemplate(PeopleWarm),
    atsSafe: true, supportsPhoto: true,
    suggestedRoles: [
      "human-resources-manager", "hr-manager", "hr-coordinator", "hr-generalist",
      "hr-business-partner", "hrbp", "senior-hr-business-partner",
      "hr-director", "vp-of-hr", "chief-human-resources-officer", "chro",
      "recruiter", "senior-recruiter", "executive-recruiter",
      "talent-acquisition-specialist", "talent-acquisition-manager",
      "technical-recruiter", "head-of-talent", "head-of-recruiting",
      "people-operations-manager", "people-operations-specialist",
      "employee-relations-manager", "employee-experience-manager",
      "training-coordinator", "training-manager",
      "learning-and-development-specialist", "l-and-d-manager", "l-and-d-director",
      "diversity-equity-inclusion-manager", "dei-manager",
      "compensation-and-benefits-analyst", "comp-and-benefits-manager",
    ],
    suggestedIndustries: ["human-resources", "talent-acquisition", "people-operations"],
    themes: ["coral", "sand", "linen"],
  },

  {
    slug: "operations-structured",
    name: "Operations Structured",
    description: "White + slate blue + amber, diagonal accent panels, KPI tiles. For operations & supply-chain leadership.",
    category: "operations",
    component: asTemplate(OperationsStructured),
    atsSafe: true, supportsPhoto: true,
    suggestedRoles: [
      "operations-manager", "operations-director", "vp-of-operations",
      "chief-operating-officer", "coo",
      "head-of-operations", "operations-lead",
      "business-operations-manager", "business-operations-analyst",
      "process-improvement-manager", "continuous-improvement-manager",
      "process-improvement-specialist",
      "supply-chain-director", "head-of-supply-chain",
      "operations-analyst", "senior-operations-analyst",
      "operations-consultant",
    ],
    suggestedIndustries: ["operations", "supply-chain"],
    themes: ["navy", "slate", "midnight"],
  },

  {
    slug: "insurance-trust",
    name: "Insurance Trust",
    description: "Ivory + teal + bronze, shield emblem, middle trust-bar. Licenses and certifications front and centre.",
    category: "insurance",
    component: asTemplate(InsuranceTrust),
    atsSafe: true, supportsPhoto: false,
    suggestedRoles: [
      "insurance-agent", "licensed-insurance-agent", "insurance-broker",
      "insurance-sales-agent", "insurance-account-manager",
      "underwriter", "insurance-underwriter", "commercial-underwriter",
      "life-insurance-agent", "health-insurance-agent", "property-casualty-agent",
      "claims-adjuster", "claims-examiner", "claims-specialist",
      "insurance-claims-specialist", "claims-manager",
      "actuary", "actuarial-analyst",
      "risk-analyst", "risk-manager", "risk-officer", "enterprise-risk-manager",
      "compliance-officer-finance",
    ],
    suggestedIndustries: ["insurance", "risk-management"],
    themes: ["navy", "ivory", "linen"],
  },

  {
    slug: "veterinary-caring",
    name: "Veterinary Caring",
    description: "Cream + sage + dusty rose, wavy side bar with paw silhouettes. Warm but professional — distinct from clinical Healthcare.",
    category: "veterinary",
    component: asTemplate(VeterinaryCaring),
    atsSafe: true, supportsPhoto: false,
    suggestedRoles: [
      "veterinarian", "vet", "veterinary-surgeon", "exotic-animal-veterinarian",
      "veterinary-technician", "vet-tech", "veterinary-assistant",
      "veterinary-nurse", "registered-veterinary-technician",
      "animal-hospital-administrator", "veterinary-practice-manager",
      "animal-care-specialist", "animal-trainer", "dog-trainer",
      "kennel-attendant", "groomer", "pet-groomer",
      "wildlife-biologist", "zookeeper", "zoological-technician",
      "animal-control-officer", "shelter-manager",
    ],
    suggestedIndustries: ["veterinary", "animal-care", "wildlife"],
    themes: ["forest", "linen", "sand"],
  },

  {
    slug: "aviation-precise",
    name: "Aviation Precise",
    description: "Sky-blue gradient + silver, wings emblem, altitude-line dividers. Technical precision for aviation roles.",
    category: "aviation",
    component: asTemplate(AviationPrecise),
    atsSafe: true, supportsPhoto: false,
    suggestedRoles: [
      "pilot", "commercial-pilot", "airline-pilot", "first-officer", "captain",
      "co-pilot", "private-pilot", "charter-pilot", "helicopter-pilot",
      "flight-attendant", "cabin-crew", "senior-flight-attendant", "purser",
      "air-traffic-controller", "atc", "tower-controller",
      "aviation-mechanic", "aircraft-mechanic", "a-and-p-mechanic",
      "avionics-technician", "flight-engineer",
      "aviation-safety-inspector", "aviation-dispatcher",
      "ground-staff", "airport-operations-agent", "airline-operations-agent",
      "drone-pilot", "uav-pilot",
    ],
    suggestedIndustries: ["aviation", "airline", "aerospace-operations"],
    themes: ["sky", "ivory"],
  },

  {
    slug: "hospitality-elegant",
    name: "Hospitality Elegant",
    description: "Champagne + burgundy + gold, top wave + monogram. Premium feel for hotel and hospitality leadership.",
    category: "hospitality-elegant",
    component: asTemplate(HospitalityElegant),
    atsSafe: true, supportsPhoto: false,
    suggestedRoles: [
      "hotel-manager", "hotel-general-manager", "general-manager-hotel",
      "hospitality-director", "director-of-hospitality",
      "resort-manager", "resort-general-manager",
      "front-office-manager", "rooms-division-manager",
      "concierge-director", "head-concierge",
      "food-and-beverage-director", "director-of-food-and-beverage",
      "executive-housekeeper", "director-of-housekeeping",
      "revenue-manager", "director-of-revenue",
      "director-of-sales-hospitality", "director-of-marketing-hospitality",
      "spa-director", "guest-services-director",
      "hotel-owner", "boutique-hotel-owner",
    ],
    suggestedIndustries: ["luxury-hospitality", "hotels", "resorts"],
    themes: ["wine", "ivory", "sand"],
  },

  {
    slug: "linguist-multilingual",
    name: "Linguist Multilingual",
    description: "White + lavender + rose gold, multi-script header, languages-as-hero section. Built for translators and interpreters.",
    category: "linguist",
    component: asTemplate(LinguistMultilingual),
    atsSafe: true, supportsPhoto: false,
    suggestedRoles: [
      "translator", "professional-translator", "literary-translator",
      "technical-translator", "legal-translator", "medical-translator",
      "interpreter", "professional-interpreter",
      "court-interpreter", "medical-interpreter", "conference-interpreter",
      "simultaneous-interpreter", "consecutive-interpreter",
      "sign-language-interpreter", "asl-interpreter",
      "linguist", "computational-linguist", "applied-linguist",
      "localization-specialist", "localization-manager", "localization-engineer",
      "language-coordinator", "language-services-manager",
      "subtitler", "subtitle-translator", "dubbing-director",
      "language-teacher", "foreign-language-teacher",
    ],
    suggestedIndustries: ["translation", "localization", "linguistics"],
    themes: ["plum", "linen", "ivory"],
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

  // ──────── Expansion batch (2026-06-01): 38 new templates. Placed above the
  //          generic fallbacks (corporate-blue / modern-two-column /
  //          classic-serif) so new specialists outrank only the catch-alls,
  //          never the existing tuned specialists above. ────────
{
    slug: "spa-zen-watercolor", name: "Spa Zen Watercolor",
    description: "White + soft mint/teal watercolor waves + lotus motifs. Calm, airy, light alternative for spa & wellness.",
    category: "beauty", component: SpaZenWatercolor,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-06-01T00:00:00.000Z",
    suggestedRoles: [
      "esthetician", "skincare-specialist", "spa-manager", "spa-attendant",
      "facialist", "lash-technician", "wellness-consultant",
      "beauty-therapist", "holistic-therapist", "wellness-retreat-host",
    ],
    suggestedIndustries: ["spa", "wellness", "beauty"],
    themes: ["sage", "linen", "ivory"],
  },

  {
    slug: "teal-clean-split", name: "Teal Clean Split",
    description: "Solid teal header band + clean white two-column + skill pills. ATS-friendly. For data and analytics roles.",
    category: "developer", component: TealCleanSplit,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-06-01T00:00:00.000Z",
    suggestedRoles: [
      "data-analyst", "senior-data-analyst", "business-intelligence-analyst",
      "data-scientist", "junior-data-scientist", "research-analyst",
      "analytics-consultant", "insights-analyst", "reporting-analyst",
      "quantitative-researcher", "statistician", "data-consultant",
    ],
    suggestedIndustries: ["data-analytics", "business-intelligence"],
    themes: ["forest", "sky", "slate"],
  },

  {
    slug: "editorial-ink", name: "Editorial Ink",
    description: "Cream newsprint + bold serif masthead + column rules + drop-cap. ATS-safe. For writers, editors, journalists.",
    category: "creative", component: EditorialInk,
    atsSafe: true, supportsPhoto: false,
    addedAt: "2026-06-01T00:00:00.000Z",
    suggestedRoles: [
      "writer", "content-writer", "copywriter", "senior-copywriter",
      "journalist", "reporter", "staff-writer", "feature-writer",
      "editor", "managing-editor", "senior-editor", "content-editor",
      "content-strategist", "content-manager", "author", "ghostwriter",
      "editorial-assistant", "proofreader", "technical-writer",
      "communications-specialist", "communications-manager",
    ],
    suggestedIndustries: ["publishing", "media", "communications"],
    themes: ["wine", "ivory", "plum"],
  },

  {
    slug: "holographic-sunset", name: "Holographic Sunset",
    description: "Sunset orange→purple gradient hero + glowing hexagon photo + science motifs. For trainers, coaches, lecturers.",
    category: "scholarly", component: HolographicSunset,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-01T00:00:00.000Z",
    suggestedRoles: [
      "corporate-trainer", "soft-skills-trainer", "leadership-coach",
      "life-coach", "career-coach", "public-speaking-coach",
      "motivational-speaker", "learning-facilitator", "workshop-facilitator",
      "professional-development-trainer",
    ],
    suggestedIndustries: ["training", "coaching", "professional-development"],
    themes: ["coral", "plum", "midnight"],
  },

  {
    slug: "purple-gradient-pro", name: "Purple Gradient Pro",
    description: "Diagonal purple gradient header + two-column + glowing skill bars + impact metric tiles. For developers.",
    category: "developer", component: PurpleGradientPro,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-01T00:00:00.000Z",
    suggestedRoles: [
      "backend-developer", "full-stack-developer", "software-developer",
      "senior-software-engineer", "lead-developer", "application-developer",
      "api-developer", "platform-developer", "machine-learning-engineer",
    ],
    suggestedIndustries: ["software", "technology"],
    themes: ["plum", "midnight", "wine"],
  },

  {
    slug: "isometric-silver", name: "Isometric Silver",
    description: "Deep navy + silver metallic wave + diamond photo frame + floating 3D motifs. For executive/corporate support.",
    category: "professional", component: IsometricSilver,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-01T00:00:00.000Z",
    suggestedRoles: [
      "executive-support-specialist", "corporate-coordinator", "board-secretary",
      "senior-executive-assistant", "operations-support-lead", "office-operations-manager",
    ],
    suggestedIndustries: ["corporate-support", "operations"],
    themes: ["navy", "midnight", "slate"],
  },

  {
    slug: "gold-liquid-luxe", name: "Gold Liquid Luxe",
    description: "Black + flowing gold liquid ribbons + glass folder cards. Premium dark luxe for senior admin & coordinators.",
    category: "professional", component: GoldLiquidLuxe,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-01T00:00:00.000Z",
    suggestedRoles: [
      "chief-of-staff", "executive-coordinator", "luxury-office-manager",
      "private-office-manager", "estate-manager", "household-manager",
      "personal-executive-assistant",
    ],
    suggestedIndustries: ["executive-support", "luxury-administration"],
    themes: ["midnight", "wine", "plum"],
  },

  {
    slug: "construction-blueprint", name: "Construction Blueprint",
    description: "Concrete charcoal + safety amber + blueprint grid + isometric crane. For construction & civil leadership.",
    category: "trades-industrial", component: ConstructionBlueprint,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-01T00:00:00.000Z",
    suggestedRoles: [
      "construction-manager", "construction-project-manager", "civil-engineer",
      "structural-engineer-construction", "site-engineer-construction", "architect",
      "quantity-surveyor", "building-surveyor", "land-surveyor",
      "estimator", "construction-estimator", "project-engineer-construction",
      "site-manager", "building-inspector",
    ],
    suggestedIndustries: ["construction", "civil-engineering", "architecture"],
    themes: ["charcoal", "midnight"],
  },

  {
    slug: "fitness-dynamic", name: "Fitness Dynamic",
    description: "Black + neon lime/red diagonal slashes + bold italic display + energy bars. For trainers & sports coaches.",
    category: "service", component: FitnessDynamic,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-01T00:00:00.000Z",
    suggestedRoles: [
      "personal-trainer", "fitness-coach", "strength-and-conditioning-coach",
      "sports-coach", "athletic-trainer", "fitness-instructor",
      "crossfit-coach", "gym-manager", "performance-coach",
      "bootcamp-instructor", "spin-instructor", "sports-instructor",
    ],
    suggestedIndustries: ["fitness", "sports", "athletics"],
    themes: ["midnight", "charcoal"],
  },

  {
    slug: "photography-gallery", name: "Photography Gallery",
    description: "Charcoal gallery wall + filmstrip motif + serif display + aperture photo ring. For photographers & cinematographers.",
    category: "creative", component: PhotographyGallery,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-01T00:00:00.000Z",
    suggestedRoles: [
      "photographer", "portrait-photographer", "wedding-photographer",
      "editorial-photographer", "fashion-photographer", "commercial-photographer",
      "videographer", "cinematographer", "director-of-photography",
      "visual-artist", "photo-editor", "studio-photographer",
    ],
    suggestedIndustries: ["photography", "visual-arts", "film"],
    themes: ["midnight", "charcoal", "wine"],
  },

  {
    slug: "neon-server-stack", name: "Neon Server Stack",
    description: "Deep navy + neon cyan/blue, isometric server stack, glass cards. For network & infrastructure engineers.",
    category: "developer", component: NeonServerStack,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-01T00:00:00.000Z",
    suggestedRoles: [
      "network-engineer", "senior-network-engineer", "network-administrator",
      "systems-administrator", "sysadmin", "infrastructure-engineer",
      "noc-engineer", "network-architect", "voip-engineer",
      "wireless-engineer", "datacenter-technician", "network-technician",
    ],
    suggestedIndustries: ["networking", "infrastructure", "telecommunications"],
    themes: ["midnight", "navy"],
  },

  {
    slug: "data-pulse-dark", name: "Data Pulse Dark",
    description: "Ink + teal→violet gradient, pie + waveform + neon bars, circular photo. For data analysts & BI.",
    category: "developer", component: DataPulseDark,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-01T00:00:00.000Z",
    suggestedRoles: [
      "business-intelligence-developer", "bi-developer", "bi-analyst",
      "data-visualization-specialist", "analytics-engineer",
      "marketing-analyst", "product-analyst", "growth-analyst",
      "tableau-developer", "power-bi-developer", "dashboard-developer",
    ],
    suggestedIndustries: ["data-analytics", "business-intelligence"],
    themes: ["midnight", "plum"],
  },

  {
    slug: "marketing-gradient", name: "Marketing Gradient",
    description: "Vibrant coral→magenta→violet hero, KPI tiles, skill chips. For digital marketing & growth.",
    category: "creative", component: MarketingGradient,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-01T00:00:00.000Z",
    suggestedRoles: [
      "digital-marketing-manager", "digital-marketing-specialist", "growth-marketer",
      "growth-manager", "performance-marketing-manager", "social-media-manager",
      "social-media-strategist", "seo-specialist", "seo-manager",
      "content-marketing-manager", "email-marketing-manager", "ppc-specialist",
      "brand-marketing-manager", "marketing-coordinator",
    ],
    suggestedIndustries: ["marketing", "advertising", "growth"],
    themes: ["coral", "plum", "wine"],
  },

  {
    slug: "culinary-gold", name: "Culinary Gold",
    description: "Charcoal + warm gold, plate motif, elegant serif. Premium graphical option for chefs & culinary leads.",
    category: "hospitality", component: CulinaryGold,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-01T00:00:00.000Z",
    suggestedRoles: [
      "chef", "executive-chef", "head-chef", "sous-chef", "pastry-chef",
      "culinary-director", "chef-de-partie", "private-chef", "personal-chef",
      "banquet-chef", "catering-chef", "culinary-instructor",
    ],
    suggestedIndustries: ["culinary", "fine-dining", "hospitality"],
    themes: ["midnight", "wine", "ivory"],
  },

  {
    slug: "nurse-vital-signs", name: "Nurse Vital Signs",
    description: "White + medical teal/green, ECG heartbeat divider, credential pills. Graphical-yet-clean for nursing.",
    category: "medical", component: NurseVitalSigns,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-06-01T00:00:00.000Z",
    suggestedRoles: [
      "registered-nurse", "nurse-practitioner", "licensed-practical-nurse",
      "staff-nurse", "charge-nurse", "icu-nurse", "er-nurse", "pediatric-nurse",
      "oncology-nurse", "surgical-nurse", "nurse-manager", "clinical-nurse-specialist",
      "home-health-nurse", "travel-nurse", "nursing-assistant",
    ],
    suggestedIndustries: ["nursing", "healthcare", "clinical-care"],
    themes: ["forest", "sky", "ivory"],
  },

  {
    slug: "engineer-blueprint", name: "Engineer Blueprint",
    description: "Blueprint navy + cyan grid, gear motif, mono accents. For mechanical/electrical/aerospace engineers.",
    category: "trades-industrial", component: EngineerBlueprint,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-01T00:00:00.000Z",
    suggestedRoles: [
      "mechanical-engineer", "electrical-engineer", "automotive-engineer",
      "aerospace-engineer", "robotics-engineer", "mechatronics-engineer",
      "design-engineer", "manufacturing-engineer-graphical", "controls-engineer",
      "hardware-engineer", "rd-engineer", "product-engineer",
    ],
    suggestedIndustries: ["engineering", "manufacturing", "automotive"],
    themes: ["navy", "midnight"],
  },

  {
    slug: "legal-luxe", name: "Legal Luxe",
    description: "Near-black plum + gold + scales motif, serif. Premium dark option for senior legal.",
    category: "legal", component: LegalLuxe,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-01T00:00:00.000Z",
    suggestedRoles: [
      "managing-partner", "senior-partner", "law-firm-partner",
      "trial-lawyer", "trial-attorney", "litigation-partner",
      "senior-counsel", "queens-counsel", "kings-counsel", "senior-barrister",
      "prosecutor", "district-attorney",
    ],
    suggestedIndustries: ["legal", "law"],
    themes: ["midnight", "wine"],
  },

  {
    slug: "architect-isometric", name: "Architect Isometric",
    description: "Warm off-white + terracotta + isometric building line-art. For architects & spatial designers.",
    category: "creative", component: ArchitectIsometric,
    atsSafe: true, supportsPhoto: false,
    addedAt: "2026-06-01T00:00:00.000Z",
    suggestedRoles: [
      "architect", "architectural-designer", "design-architect", "project-architect",
      "interior-designer", "interior-architect", "landscape-architect",
      "urban-planner", "urban-designer", "town-planner", "spatial-designer",
      "bim-manager", "revit-specialist",
    ],
    suggestedIndustries: ["architecture", "design", "urban-planning"],
    themes: ["sand", "linen", "ivory"],
  },

  {
    slug: "finance-advisor-gold", name: "Finance Advisor Gold",
    description: "Navy + gold + growth-chart motif + metric tiles. For financial advisors and planners.",
    category: "finance", component: FinanceAdvisorGold,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-01T00:00:00.000Z",
    suggestedRoles: [
      "financial-advisor", "financial-planner", "certified-financial-planner",
      "wealth-advisor", "investment-advisor", "retirement-planner",
      "financial-consultant", "personal-financial-advisor", "estate-planner",
      "relationship-manager-finance", "private-banker",
    ],
    suggestedIndustries: ["financial-advisory", "wealth-management"],
    themes: ["navy", "midnight", "wine"],
  },

  {
    slug: "product-roadmap", name: "Product Roadmap",
    description: "Slate + indigo + roadmap timeline + metric tiles. Graphical option for product management.",
    category: "business", component: ProductRoadmap,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-01T00:00:00.000Z",
    suggestedRoles: [
      "product-manager", "senior-product-manager", "product-owner",
      "technical-product-manager", "group-product-manager", "principal-product-manager",
      "director-of-product", "head-of-product", "associate-product-manager",
      "growth-product-manager",
    ],
    suggestedIndustries: ["product-management", "technology"],
    themes: ["sky", "plum", "slate"],
  },

  {
    slug: "ux-portfolio-grid", name: "UX Portfolio Grid",
    description: "Off-white + electric violet + asymmetric work grid. For UX/product designers & researchers.",
    category: "creative", component: UXPortfolioGrid,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-01T00:00:00.000Z",
    suggestedRoles: [
      "ux-designer", "senior-ux-designer", "ui-ux-designer", "ux-ui-designer",
      "interaction-designer", "ux-researcher", "user-researcher",
      "design-lead", "ux-lead", "service-designer", "information-architect",
    ],
    suggestedIndustries: ["ux-design", "product-design", "design"],
    themes: ["plum", "ivory", "wine"],
  },

  {
    slug: "real-estate-luxe", name: "Real Estate Luxe",
    description: "Near-black + champagne gold + skyline motif. Premium dark option for luxury real estate.",
    category: "real-estate", component: RealEstateLuxe,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-01T00:00:00.000Z",
    suggestedRoles: [
      "luxury-real-estate-agent", "luxury-real-estate-broker", "luxury-property-consultant",
      "real-estate-broker", "commercial-real-estate-broker", "commercial-real-estate-agent",
      "property-developer", "real-estate-developer", "estate-agent",
      "real-estate-investor",
    ],
    suggestedIndustries: ["luxury-real-estate", "property", "real-estate"],
    themes: ["midnight", "wine", "sand"],
  },

  {
    slug: "trades-volt", name: "Trades Volt",
    description: "Steel black + electric yellow + bolt motif + skew skill bars. Bold graphical option for licensed trades.",
    category: "trades-industrial", component: TradesVolt,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-01T00:00:00.000Z",
    suggestedRoles: [
      "electrician", "master-electrician", "journeyman-electrician",
      "plumber", "pipefitter", "hvac-technician", "hvac-installer",
      "welder", "ironworker", "millwright", "industrial-electrician",
      "maintenance-technician",
    ],
    suggestedIndustries: ["trades", "skilled-trades", "industrial"],
    themes: ["charcoal", "midnight"],
  },

  {
    slug: "aviation-hud", name: "Aviation HUD",
    description: "Deep navy + cyan HUD + horizon/compass motif + mono accents. Graphical option for flight crew.",
    category: "aviation", component: AviationHUD,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-01T00:00:00.000Z",
    suggestedRoles: [
      "pilot", "airline-pilot", "commercial-pilot", "first-officer", "captain",
      "co-pilot", "helicopter-pilot", "cabin-crew", "flight-attendant",
      "air-traffic-controller", "flight-engineer", "drone-pilot",
    ],
    suggestedIndustries: ["aviation", "airline", "aerospace-operations"],
    themes: ["midnight", "navy"],
  },

  {
    slug: "dental-clean", name: "Dental Clean",
    description: "White + clinical teal/mint + tooth motif + credential pills. Built for dental professionals.",
    category: "medical", component: DentalClean,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-06-01T00:00:00.000Z",
    suggestedRoles: [
      "dentist", "dental-surgeon", "orthodontist", "endodontist", "periodontist",
      "prosthodontist", "oral-surgeon-dental", "pediatric-dentist",
      "dental-hygienist", "oral-hygienist", "dental-assistant", "dental-therapist",
    ],
    suggestedIndustries: ["dentistry", "dental-care", "healthcare"],
    themes: ["forest", "sky", "ivory"],
  },

  {
    slug: "barber-editorial", name: "Barber Editorial",
    description: "Black + cream + red accent + bold editorial type + razor motif. For barbers & men's grooming.",
    category: "beauty", component: BarberEditorial,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-01T00:00:00.000Z",
    suggestedRoles: [
      "barber", "master-barber", "mens-stylist", "mens-grooming-specialist",
      "grooming-specialist", "barbershop-owner", "barber-apprentice",
    ],
    suggestedIndustries: ["grooming", "barbering", "personal-care"],
    themes: ["charcoal", "wine"],
  },

  {
    slug: "event-lumen", name: "Event Lumen",
    description: "Deep plum + gold + string-lights motif + elegant serif. For event & wedding professionals.",
    category: "hospitality", component: EventLumen,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-01T00:00:00.000Z",
    suggestedRoles: [
      "event-planner", "wedding-planner", "event-coordinator", "event-producer",
      "event-manager", "conference-organizer", "party-planner",
      "catering-event-manager", "experiential-producer", "venue-manager",
    ],
    suggestedIndustries: ["events", "weddings", "hospitality"],
    themes: ["plum", "wine", "midnight"],
  },

  {
    slug: "teacher-chalk", name: "Teacher Chalk",
    description: "Chalkboard green + chalk white + apple motif + playful chips. Warm graphical option for educators.",
    category: "education-warm", component: TeacherChalk,
    atsSafe: true, supportsPhoto: false,
    addedAt: "2026-06-01T00:00:00.000Z",
    suggestedRoles: [
      "teacher", "classroom-teacher", "substitute-teacher", "montessori-teacher",
      "middle-school-teacher", "subject-teacher", "homeroom-teacher",
      "language-arts-teacher", "history-teacher", "geography-teacher",
      "drama-teacher", "music-teacher",
    ],
    suggestedIndustries: ["education", "k12-education", "teaching"],
    themes: ["forest", "sand", "ivory"],
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
