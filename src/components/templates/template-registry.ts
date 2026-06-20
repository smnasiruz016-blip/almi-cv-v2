// ============================================================================
// AlmiCV Template Registry — 147 production templates
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
// Batch 12 (12) — Design System kit (1): soft/feminine family + verticals
import WatercolorBlush from "./WatercolorBlush";
import BotanicalSage from "./BotanicalSage";
import GradientAura from "./GradientAura";
import PlayfulPop from "./PlayfulPop";
import OrganicBlush from "./OrganicBlush";
import AbstractTeal from "./AbstractTeal";
import BrushScriptBlue from "./BrushScriptBlue";
import SunsetBoldSerif from "./SunsetBoldSerif";
import OrganicBlobGray from "./OrganicBlobGray";
import RedAccentClean from "./RedAccentClean";
import TherapyCalm from "./TherapyCalm";
import RetailVibrant from "./RetailVibrant";
// Design System kit (2) — 2026-06-06: 30 new vertical/niche templates
import AgricultureField from "./AgricultureField";
import ArchPhotoBlue from "./ArchPhotoBlue";
import AutomotiveGarage from "./AutomotiveGarage";
import BroadcastMedia from "./BroadcastMedia";
import BrowserAnalyst from "./BrowserAnalyst";
import BubbleMinimal from "./BubbleMinimal";
import CaregiverWarm from "./CaregiverWarm";
import ChildcarePlayful from "./ChildcarePlayful";
import CommSparkle from "./CommSparkle";
import CurvedWaveNavy from "./CurvedWaveNavy";
import CyberMatrix from "./CyberMatrix";
import DaisyFieldGreen from "./DaisyFieldGreen";
import DarkSplitPro from "./DarkSplitPro";
import EcoSustainable from "./EcoSustainable";
import FashionVogue from "./FashionVogue";
import GameDevPixel from "./GameDevPixel";
import GeoTriangleBlue from "./GeoTriangleBlue";
import GovPolicyCrest from "./GovPolicyCrest";
import LabResearch from "./LabResearch";
import MusicWaveDark from "./MusicWaveDark";
import NonprofitHeart from "./NonprofitHeart";
import PeachGridOrganic from "./PeachGridOrganic";
import RestaurantMenu from "./RestaurantMenu";
import RetroDesktopOS from "./RetroDesktopOS";
import SageSoftRounded from "./SageSoftRounded";
import SocialPulse from "./SocialPulse";
import SupportHeadset from "./SupportHeadset";
import TimelineSpineNavy from "./TimelineSpineNavy";
import TravelCompass from "./TravelCompass";
import WarehouseOps from "./WarehouseOps";
// Design System kit (3) — 2026-06-10: 40 new vertical/niche templates
import BakerPastry from "./BakerPastry";
import BankFinanceOps from "./BankFinanceOps";
import ConciergeLuxe from "./ConciergeLuxe";
import CourierRoute from "./CourierRoute";
import CyberGradientIso from "./CyberGradientIso";
import CyberShieldLight from "./CyberShieldLight";
import DataAdminMono from "./DataAdminMono";
import DevOpsPipeline from "./DevOpsPipeline";
import DispatcherRadio from "./DispatcherRadio";
import EduGradientPills from "./EduGradientPills";
import EsportsStream from "./EsportsStream";
import FlightInstructorSky from "./FlightInstructorSky";
import FloristBloom from "./FloristBloom";
import HRTalentWarm from "./HRTalentWarm";
import HoloPremiumLight from "./HoloPremiumLight";
import LabTechDark from "./LabTechDark";
import LibrarianNeonWave from "./LibrarianNeonWave";
import MedicalNeonHUD from "./MedicalNeonHUD";
import MobileDevDuotone from "./MobileDevDuotone";
import MuseumCurator from "./MuseumCurator";
import NeonCircuitDev from "./NeonCircuitDev";
import NeuroCleanLight from "./NeuroCleanLight";
import NurseGlassPastel from "./NurseGlassPastel";
import NurseryMeadow from "./NurseryMeadow";
import OptometristVision from "./OptometristVision";
import ParalegalBrief from "./ParalegalBrief";
import ParamedicPulse from "./ParamedicPulse";
import PhotoRealEstate from "./PhotoRealEstate";
import SecurityShield from "./SecurityShield";
import SkillRadarNavy from "./SkillRadarNavy";
import SocialWorkerBridge from "./SocialWorkerBridge";
import SportsCoachField from "./SportsCoachField";
import SynthwaveGrid from "./SynthwaveGrid";
import TattooInk from "./TattooInk";
import TeacherSunshine from "./TeacherSunshine";
import TealCodeTimeline from "./TealCodeTimeline";
import TranslatorGlobal from "./TranslatorGlobal";
import UtilityLineworker from "./UtilityLineworker";
import VetTechPaws from "./VetTechPaws";
import WarmMinimalDials from "./WarmMinimalDials";
// ---- Design templates request kit (56) — 2026-06-20 ----
import MidnightCyan from "./MidnightCyan";
import CoralSunset from "./CoralSunset";
import EmeraldExecutive from "./EmeraldExecutive";
import RoyalBlueCorporate from "./RoyalBlueCorporate";
import SageWatercolor from "./SageWatercolor";
import VioletGlass from "./VioletGlass";
import RetroModern from "./RetroModern";
import GeometricAbstract from "./GeometricAbstract";
import SlateMonoData from "./SlateMonoData";
import RoseEditorial from "./RoseEditorial";
import CharcoalTimeline from "./CharcoalTimeline";
import TerracottaCaregiver from "./TerracottaCaregiver";
import OceanTealSales from "./OceanTealSales";
import WineLegal from "./WineLegal";
import HolographicIridescent from "./HolographicIridescent";
import IsometricIndigo from "./IsometricIndigo";
import ForestTrades from "./ForestTrades";
import SunnyHospitality from "./SunnyHospitality";
import FreshGraduateMint from "./FreshGraduateMint";
import BlueprintArchitect from "./BlueprintArchitect";
import DarkLuxeGold from "./DarkLuxeGold";
import CustomerServiceCoral from "./CustomerServiceCoral";
import LedgerAccountant from "./LedgerAccountant";
import HRPeople from "./HRPeople";
import CulinaryMenu from "./CulinaryMenu";
import RealEstateNavy from "./RealEstateNavy";
import FitnessCoach from "./FitnessCoach";
import JournalistColumn from "./JournalistColumn";
import MechanicalEngineer from "./MechanicalEngineer";
import MonochromeMinimal from "./MonochromeMinimal";
import ClinicalTealNP from "./ClinicalTealNP";
import ApothecaryPharmacist from "./ApothecaryPharmacist";
import OxbloodLitigation from "./OxbloodLitigation";
import CommunitySocialWorker from "./CommunitySocialWorker";
import SkylineCabinCrew from "./SkylineCabinCrew";
import VoltageElectrician from "./VoltageElectrician";
import TimelineVideoEditor from "./TimelineVideoEditor";
import LabNoteScientist from "./LabNoteScientist";
import SwissClinicalDentist from "./SwissClinicalDentist";
import MemphisUXResearcher from "./MemphisUXResearcher";
import ArcadeNeonGamedev from "./ArcadeNeonGamedev";
import ArtDecoEventPlanner from "./ArtDecoEventPlanner";
import LinguistTranslator from "./LinguistTranslator";
import MeadowVeterinarian from "./MeadowVeterinarian";
import LogisticsSupplyChain from "./LogisticsSupplyChain";
import MagazineCopywriter from "./MagazineCopywriter";
import ParamedicEmergency from "./ParamedicEmergency";
import NutritionFreshDietitian from "./NutritionFreshDietitian";
import OptometryPrecision from "./OptometryPrecision";
import StructuralCivilEngineer from "./StructuralCivilEngineer";
import InteriorAtelier from "./InteriorAtelier";
import StudioWaveformProducer from "./StudioWaveformProducer";
import CafeRoastBarista from "./CafeRoastBarista";
import SustainMeshESG from "./SustainMeshESG";
import BrutalistCreativeTech from "./BrutalistCreativeTech";
import GradientMeshGrowth from "./GradientMeshGrowth";

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
  | "linguist"
  // Design System kit (2) — 2026-06-06: new vertical/niche categories
  | "agriculture"
  | "automotive"
  | "broadcast"
  | "web-analytics"
  | "caregiving"
  | "childcare"
  | "communications"
  | "cybersecurity"
  | "marketing"
  | "environmental"
  | "fashion"
  | "game-dev"
  | "government"
  | "science"
  | "music"
  | "nonprofit"
  | "restaurant"
  | "creator"
  | "customer-support"
  | "travel"
  | "warehouse"
  // Design System kit (3) — 2026-06-10: new vertical/niche categories
  | "culinary"
  | "fitness"
  | "library"
  | "mobile"
  | "nursing"
  | "photography";

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

  // ---- Batch 12 — Design System kit (1): soft/feminine family + verticals (added 2026-06-06) ----
  {
    slug: "watercolor-blush", name: "Watercolor Blush",
    description: "Soft pink/blush watercolor washes, elegant serif + script name, photo block. Feminine & premium.",
    category: "creative", component: WatercolorBlush,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-06-06T00:00:00Z",
    suggestedRoles: [
      "graphic-designer", "creative-assistant", "brand-designer-feminine",
      "marketing-assistant", "communications-coordinator", "executive-assistant-creative",
      "social-media-coordinator", "content-creator", "illustrator-feminine",
    ],
    suggestedIndustries: ["design", "creative", "marketing"],
    themes: ["blush", "linen", "ivory"],
  },
  {
    slug: "botanical-sage", name: "Botanical Sage",
    description: "Soft sage green with botanical leaf motifs and a vertical script name. Calm, organic, eco-minded.",
    category: "professional", component: BotanicalSage,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-06-06T00:00:00Z",
    suggestedRoles: [
      "environmental-engineer", "sustainability-consultant", "sustainability-manager",
      "environmental-scientist", "conservation-officer", "renewable-energy-engineer",
      "ngo-coordinator", "csr-manager", "ecology-researcher", "horticulturist",
      "wellness-consultant-botanical",
    ],
    suggestedIndustries: ["environment", "sustainability", "renewable-energy"],
    themes: ["sage", "linen", "ivory"],
  },
  {
    slug: "gradient-aura", name: "Gradient Aura",
    description: "Soft blue→pink aesthetic gradient aura, elegant serif, outlined pill headers. Modern feminine.",
    category: "creative", component: GradientAura,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-06-06T00:00:00Z",
    suggestedRoles: [
      "marketing-specialist", "digital-marketing-strategist", "social-media-strategist",
      "content-strategist-feminine", "community-manager", "brand-strategist",
      "influencer-manager", "marketing-consultant", "communications-manager-feminine",
    ],
    suggestedIndustries: ["marketing", "social-media", "branding"],
    themes: ["sky", "blush", "plum"],
  },
  {
    slug: "playful-pop", name: "Playful Pop",
    description: "Colorful bold pop — rounded cards, thick black borders, lime/lavender/pink. Fun & confident.",
    category: "creative", component: PlayfulPop,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-06T00:00:00Z",
    suggestedRoles: [
      "copywriter-freelance", "creative-copywriter", "freelance-creative",
      "content-designer", "social-media-creative", "art-director-junior",
      "creative-strategist", "brand-copywriter", "creative-freelancer",
    ],
    suggestedIndustries: ["creative", "advertising", "freelance"],
    themes: ["lime", "lavender", "blush"],
  },
  {
    slug: "organic-blush", name: "Organic Blush",
    description: "Warm cream/beige with organic floral background and colored timeline date bars. Warm professional.",
    category: "finance", component: OrganicBlush,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-06-06T00:00:00Z",
    suggestedRoles: [
      "accountant", "public-accountant", "staff-accountant", "bookkeeper",
      "financial-analyst-feminine", "administrative-coordinator", "office-administrator-feminine",
      "auditor", "tax-preparer", "consultant-feminine",
    ],
    suggestedIndustries: ["accounting", "administration", "consulting"],
    themes: ["sand", "blush", "sage"],
  },
  {
    slug: "abstract-teal", name: "Abstract Teal",
    description: "Playful geometric teal/blue diagonal bars, dot grid, circular photo. Fresh, modern, friendly.",
    category: "developer", component: AbstractTeal,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-06-06T00:00:00Z",
    suggestedRoles: [
      "data-analyst-feminine", "junior-data-analyst", "business-analyst",
      "research-assistant", "operations-analyst", "marketing-analyst-feminine",
      "recent-graduate", "entry-level-analyst", "project-coordinator",
    ],
    suggestedIndustries: ["data-analytics", "business", "operations"],
    themes: ["teal", "sky", "linen"],
  },
  {
    slug: "brush-script-blue", name: "Brush Script Blue",
    description: "White + sky-blue watercolor brush strokes, script section headers, round photo. Light, editorial, feminine.",
    category: "creative", component: BrushScriptBlue,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-06-06T00:00:00Z",
    suggestedRoles: [
      "content-writer-feminine", "copywriter-feminine", "journalist-feminine",
      "blogger", "content-creator-writer", "editorial-assistant-feminine",
      "communications-coordinator-feminine", "pr-coordinator", "social-media-writer",
    ],
    suggestedIndustries: ["writing", "media", "communications"],
    themes: ["sky", "ivory", "linen"],
  },
  {
    slug: "sunset-bold-serif", name: "Sunset Bold Serif",
    description: "Warm coral→peach gradient aura with a huge bold display-serif name. Confident, editorial, creative.",
    category: "creative", component: SunsetBoldSerif,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-06-06T00:00:00Z",
    suggestedRoles: [
      "creative-director-feminine", "marketing-director-feminine", "brand-director",
      "design-lead-feminine", "digital-marketing-lead", "creative-manager",
      "campaign-manager", "marketing-manager-creative",
    ],
    suggestedIndustries: ["creative", "marketing", "branding"],
    themes: ["coral", "sand", "blush"],
  },
  {
    slug: "organic-blob-gray", name: "Organic Blob Gray",
    description: "Soft gray organic blob with peach accents, round photo, two-column. Warm-neutral professional.",
    category: "finance", component: OrganicBlobGray,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-06-06T00:00:00Z",
    suggestedRoles: [
      "accountant-feminine", "junior-accountant", "bookkeeper-feminine",
      "financial-administrator", "office-administrator-organic", "administrative-assistant-feminine",
      "operations-assistant", "billing-specialist", "payroll-administrator",
    ],
    suggestedIndustries: ["accounting", "administration", "finance"],
    themes: ["slate", "sand", "blush"],
  },
  {
    slug: "red-accent-clean", name: "Red Accent Clean",
    description: "Crisp white + light-gray sidebar, bold red pill accents and divider rule. Clean, confident, versatile.",
    category: "professional", component: RedAccentClean,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-06-06T00:00:00Z",
    suggestedRoles: [
      "designer-illustrator", "illustrator", "graphic-designer-clean",
      "web-designer", "ui-designer-feminine", "brand-designer-clean",
      "content-designer-clean", "junior-designer", "visual-designer",
    ],
    suggestedIndustries: ["design", "illustration", "creative"],
    themes: ["coral", "slate", "ivory"],
  },
  {
    slug: "therapy-calm", name: "Therapy Calm",
    description: "Soft warm beige + muted sage/terracotta, rounded calm layout with a gentle timeline. For mental-health pros.",
    category: "medical", component: TherapyCalm,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-06-06T00:00:00Z",
    suggestedRoles: [
      "psychologist", "clinical-psychologist", "counselor", "therapist",
      "psychotherapist", "marriage-family-therapist", "mental-health-counselor",
      "social-worker", "clinical-social-worker", "case-manager",
      "behavioral-therapist", "child-psychologist", "school-counselor",
    ],
    suggestedIndustries: ["mental-health", "counseling", "social-services"],
    themes: ["sage", "sand", "ivory"],
  },
  {
    slug: "retail-vibrant", name: "Retail Vibrant",
    description: "Bright friendly orange/teal with bold rounded headers and skill chips. Energetic, approachable, front-line.",
    category: "service", component: RetailVibrant,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-06-06T00:00:00Z",
    suggestedRoles: [
      "retail-associate", "sales-associate", "store-associate", "cashier",
      "customer-service-representative", "retail-supervisor", "store-supervisor",
      "shop-assistant", "barista", "front-desk-associate", "brand-ambassador",
      "sales-assistant", "floor-supervisor",
    ],
    suggestedIndustries: ["retail", "customer-service", "hospitality"],
    themes: ["coral", "forest", "ivory"],
  },
  // ==== Design System kit (2) — 2026-06-06: 30 new vertical/niche templates ====

  {
    addedAt: "2026-06-06T00:00:00.000Z",
    slug: "agriculture-field", name: "Agriculture Field",
    description: "Cream + harvest green + wheat gold + field/wheat motif. For farmers, agronomists & agricultural roles.",
    category: "agriculture", component: AgricultureField,
    atsSafe: true, supportsPhoto: false,
    suggestedRoles: [
      "farmer", "agronomist", "agricultural-technician", "farm-manager", "rancher",
      "horticulturist", "crop-specialist", "agricultural-engineer", "livestock-manager",
      "viticulturist", "agricultural-consultant", "greenhouse-manager",
    ],
    suggestedIndustries: ["agriculture", "farming", "agribusiness"],
  },
  {
    addedAt: "2026-06-06T00:01:00.000Z",
    slug: "arch-photo-blue", name: "Arch Photo Blue",
    description: "Navy sidebar + arched photo + blue header block + skill bars. Confident look for product & project managers.",
    category: "business", component: ArchPhotoBlue,
    atsSafe: false, supportsPhoto: true,
    suggestedRoles: [
      "product-manager", "project-manager", "program-manager",
      "business-manager", "delivery-manager", "scrum-master",
      "product-owner", "business-development-manager",
    ],
    suggestedIndustries: ["product-management", "project-management", "business"],
  },
  {
    addedAt: "2026-06-06T00:02:00.000Z",
    slug: "automotive-garage", name: "Automotive Garage",
    description: "Carbon black + racing red + gear/checkered motif + bold condensed. For mechanics & auto technicians.",
    category: "automotive", component: AutomotiveGarage,
    atsSafe: false, supportsPhoto: false,
    suggestedRoles: [
      "mechanic", "automotive-technician", "auto-technician", "service-advisor",
      "diesel-mechanic", "auto-body-technician", "car-detailer", "tire-technician",
      "automotive-electrician", "vehicle-inspector", "workshop-foreman",
    ],
    suggestedIndustries: ["automotive", "auto-repair", "transportation"],
  },
  {
    addedAt: "2026-06-06T00:03:00.000Z",
    slug: "broadcast-media", name: "Broadcast Media",
    description: "White + bold red + charcoal + ON-AIR badge + mic/play motif. For journalists, broadcasters & presenters.",
    category: "broadcast", component: BroadcastMedia,
    atsSafe: true, supportsPhoto: true,
    suggestedRoles: [
      "journalist", "broadcast-journalist", "news-reporter", "news-anchor", "tv-presenter",
      "radio-host", "radio-presenter", "correspondent", "news-producer", "broadcaster",
      "video-journalist", "podcast-host",
    ],
    suggestedIndustries: ["broadcast", "media", "journalism"],
  },
  {
    addedAt: "2026-06-06T00:04:00.000Z",
    slug: "browser-analyst", name: "Browser Analyst",
    description: "Sky-blue desktop + white browser-window cards with traffic-light dots. For digital, web & SEO analysts.",
    category: "web-analytics", component: BrowserAnalyst,
    atsSafe: false, supportsPhoto: true,
    suggestedRoles: [
      "digital-analyst", "web-analyst", "web-analytics-specialist", "seo-analyst",
      "digital-marketing-analyst", "web-designer", "ux-analyst",
      "conversion-analyst", "ecommerce-analyst", "digital-strategist",
    ],
    suggestedIndustries: ["digital", "web", "analytics"],
  },
  {
    addedAt: "2026-06-06T00:05:00.000Z",
    slug: "bubble-minimal", name: "Bubble Minimal",
    description: "White + soft grey blobs + circle photo + elegant serif + center divider. Calm minimal look for any professional.",
    category: "professional", component: BubbleMinimal,
    atsSafe: true, supportsPhoto: true,
    suggestedRoles: [
      "marketing-coordinator", "administrative-assistant", "office-administrator",
      "project-assistant", "account-coordinator", "customer-success",
      "operations-assistant", "general-professional",
    ],
    suggestedIndustries: ["administration", "marketing", "business"],
  },
  {
    addedAt: "2026-06-06T00:06:00.000Z",
    slug: "caregiver-warm", name: "Caregiver Warm",
    description: "Soft rose + sage + warm cream + heart-hand motif. Gentle look for caregivers & home-health aides.",
    category: "caregiving", component: CaregiverWarm,
    atsSafe: true, supportsPhoto: true,
    suggestedRoles: [
      "caregiver", "home-health-aide", "personal-support-worker", "elderly-care-assistant",
      "care-assistant", "live-in-carer", "disability-support-worker", "hospice-aide",
      "companion-caregiver", "certified-nursing-assistant", "patient-care-technician",
    ],
    suggestedIndustries: ["caregiving", "home-care", "healthcare"],
  },
  {
    addedAt: "2026-06-06T00:07:00.000Z",
    slug: "childcare-playful", name: "Childcare Playful",
    description: "White + soft rainbow pastels + rounded shapes + star motif. For childcare, early years & nannies.",
    category: "childcare", component: ChildcarePlayful,
    atsSafe: true, supportsPhoto: true,
    suggestedRoles: [
      "childcare-worker", "early-years-educator", "preschool-teacher", "nanny", "au-pair",
      "daycare-assistant", "nursery-nurse", "kindergarten-teacher", "babysitter",
      "early-childhood-educator", "childminder", "teaching-assistant-early-years",
    ],
    suggestedIndustries: ["childcare", "early-education", "education"],
  },
  {
    addedAt: "2026-06-06T00:08:00.000Z",
    slug: "comm-sparkle", name: "Comm Sparkle",
    description: "White + holographic corner gradients + sparkle accents + bold serif + purple bars. Elegant look for comms & PR.",
    category: "communications", component: CommSparkle,
    atsSafe: true, supportsPhoto: true,
    suggestedRoles: [
      "communications-specialist", "communications-manager", "pr-specialist",
      "public-relations-manager", "content-strategist", "communications-officer",
      "corporate-communications", "media-relations-specialist", "brand-communications",
    ],
    suggestedIndustries: ["communications", "public-relations", "media"],
  },
  {
    addedAt: "2026-06-06T00:09:00.000Z",
    slug: "curved-wave-navy", name: "Curved Wave Navy",
    description: "White + navy curved wave header + circle photo + condensed caps. Polished look for advisors & consultants.",
    category: "finance", component: CurvedWaveNavy,
    atsSafe: true, supportsPhoto: true,
    suggestedRoles: [
      "financial-advisor", "financial-consultant", "business-consultant",
      "management-consultant", "investment-consultant", "account-manager",
      "relationship-manager", "advisory-consultant",
    ],
    suggestedIndustries: ["finance", "consulting", "advisory"],
  },
  {
    addedAt: "2026-06-06T00:10:00.000Z",
    slug: "cyber-matrix", name: "Cyber Matrix",
    description: "Black + matrix green + shield/lock + monospace terminal blocks. Hacker-aesthetic look for cybersecurity & InfoSec.",
    category: "cybersecurity", component: CyberMatrix,
    atsSafe: false, supportsPhoto: false,
    suggestedRoles: [
      "cybersecurity-analyst", "security-engineer", "information-security-analyst",
      "penetration-tester", "ethical-hacker", "soc-analyst", "security-architect",
      "incident-responder", "security-consultant", "malware-analyst", "devsecops-engineer",
    ],
    suggestedIndustries: ["cybersecurity", "information-security", "technology"],
  },
  {
    addedAt: "2026-06-06T00:11:00.000Z",
    slug: "daisy-field-green", name: "Daisy Field Green",
    description: "Deep green sidebar + daisy motifs + flower-icon timeline. Friendly, fresh look for students & entry-level creatives.",
    category: "creative", component: DaisyFieldGreen,
    atsSafe: false, supportsPhoto: true,
    suggestedRoles: [
      "student", "recent-graduate", "intern", "junior-designer",
      "entry-level", "junior-marketing", "content-creator", "social-media-assistant",
      "administrative-assistant", "junior-coordinator",
    ],
    suggestedIndustries: ["entry-level", "creative", "education"],
  },
  {
    addedAt: "2026-06-06T00:12:00.000Z",
    slug: "dark-split-pro", name: "Dark Split Pro",
    description: "Charcoal + blue highlight section bars + footer contact band. Bold dark look for marketing & strategy.",
    category: "marketing", component: DarkSplitPro,
    atsSafe: false, supportsPhoto: true,
    suggestedRoles: [
      "marketing-manager", "marketing-strategist", "brand-strategist",
      "digital-strategist", "marketing-director", "communications-strategist",
      "campaign-manager", "marketing-lead",
    ],
    suggestedIndustries: ["marketing", "strategy", "advertising"],
  },
  {
    addedAt: "2026-06-06T00:13:00.000Z",
    slug: "eco-sustainable", name: "Eco Sustainable",
    description: "Warm paper + forest/leaf green + organic leaf motifs. For environmental, sustainability & ESG roles.",
    category: "environmental", component: EcoSustainable,
    atsSafe: true, supportsPhoto: true,
    suggestedRoles: [
      "environmental-scientist", "sustainability-manager", "sustainability-consultant",
      "esg-analyst", "environmental-engineer", "conservation-officer", "ecologist",
      "climate-analyst", "environmental-consultant", "sustainability-coordinator",
    ],
    suggestedIndustries: ["environmental", "sustainability", "conservation"],
  },
  {
    addedAt: "2026-06-06T00:14:00.000Z",
    slug: "fashion-vogue", name: "Fashion Vogue",
    description: "White + black editorial + thin serif masthead + magazine grid + grayscale photo. For fashion & stylists.",
    category: "fashion", component: FashionVogue,
    atsSafe: false, supportsPhoto: true,
    suggestedRoles: [
      "fashion-designer", "fashion-stylist", "stylist", "model", "fashion-editor",
      "beauty-editor", "creative-director-fashion", "wardrobe-stylist", "fashion-buyer",
      "merchandiser", "fashion-marketing", "makeup-artist",
    ],
    suggestedIndustries: ["fashion", "beauty", "editorial"],
  },
  {
    addedAt: "2026-06-06T00:15:00.000Z",
    slug: "game-dev-pixel", name: "Game Dev Pixel",
    description: "Dark indigo + arcade neon + pixel/8-bit accents + stat bars + mono. For game developers & designers.",
    category: "game-dev", component: GameDevPixel,
    atsSafe: false, supportsPhoto: false,
    suggestedRoles: [
      "game-developer", "game-designer", "game-programmer", "gameplay-engineer",
      "technical-artist", "game-qa-tester", "level-designer", "unity-developer",
      "unreal-developer", "game-producer", "3d-game-artist",
    ],
    suggestedIndustries: ["gaming", "game-development", "interactive-media"],
  },
  {
    addedAt: "2026-06-06T00:16:00.000Z",
    slug: "geo-triangle-blue", name: "Geo Triangle Blue",
    description: "White + steel-blue triangle corners + semicircle skill dials. Clean geometric look for marketing & management.",
    category: "marketing", component: GeoTriangleBlue,
    atsSafe: true, supportsPhoto: true,
    suggestedRoles: [
      "marketing-manager", "marketing-coordinator", "marketing-executive",
      "business-manager", "account-manager", "project-coordinator",
      "operations-manager", "team-lead", "general-manager",
    ],
    suggestedIndustries: ["marketing", "business", "management"],
  },
  {
    addedAt: "2026-06-06T00:17:00.000Z",
    slug: "gov-policy-crest", name: "Gov Policy Crest",
    description: "Ivory + deep navy + gold crest + dignified serif. For government, public policy & civil service.",
    category: "government", component: GovPolicyCrest,
    atsSafe: true, supportsPhoto: false,
    suggestedRoles: [
      "policy-analyst", "policy-advisor", "public-policy-specialist", "civil-servant",
      "government-affairs-manager", "legislative-assistant", "public-administrator",
      "diplomat", "foreign-service-officer", "program-officer", "public-affairs-specialist",
    ],
    suggestedIndustries: ["government", "public-policy", "public-administration"],
  },
  {
    addedAt: "2026-06-06T00:18:00.000Z",
    slug: "lab-research", name: "Lab Research",
    description: "White + clean teal + molecule/DNA motif + publications section. For scientists, researchers & R&D.",
    category: "science", component: LabResearch,
    atsSafe: true, supportsPhoto: false,
    suggestedRoles: [
      "research-scientist", "scientist", "laboratory-technician", "lab-technician",
      "research-associate", "biologist", "chemist", "biochemist", "microbiologist",
      "clinical-researcher", "r-and-d-scientist", "biotech-researcher", "data-scientist-research",
    ],
    suggestedIndustries: ["research", "science", "biotech", "pharmaceutical"],
  },
  {
    addedAt: "2026-06-06T00:19:00.000Z",
    slug: "music-wave-dark", name: "Music Wave Dark",
    description: "Near-black + neon magenta/cyan waveform + equalizer bars. For musicians, producers, DJs & audio engineers.",
    category: "music", component: MusicWaveDark,
    atsSafe: false, supportsPhoto: false,
    suggestedRoles: [
      "musician", "music-producer", "audio-engineer", "sound-designer", "dj",
      "sound-engineer", "recording-engineer", "mixing-engineer", "composer",
      "session-musician", "music-director", "beatmaker",
    ],
    suggestedIndustries: ["music", "audio", "entertainment"],
  },
  {
    addedAt: "2026-06-06T00:20:00.000Z",
    slug: "nonprofit-heart", name: "Nonprofit Heart",
    description: "Warm cream + coral + teal + heart/hands motif + impact tiles. For nonprofit, NGO & fundraising roles.",
    category: "nonprofit", component: NonprofitHeart,
    atsSafe: true, supportsPhoto: true,
    suggestedRoles: [
      "nonprofit-manager", "program-manager-nonprofit", "fundraising-manager", "development-officer",
      "volunteer-coordinator", "grant-writer", "community-outreach-coordinator", "ngo-program-officer",
      "charity-coordinator", "donor-relations-manager", "social-impact-manager",
    ],
    suggestedIndustries: ["nonprofit", "ngo", "social-impact"],
  },
  {
    addedAt: "2026-06-06T00:21:00.000Z",
    slug: "peach-grid-organic", name: "Peach Grid Organic",
    description: "Cream + peach organic blobs + grid texture + black label bars. Warm, modern look for graphic & brand designers.",
    category: "creative", component: PeachGridOrganic,
    atsSafe: false, supportsPhoto: true,
    suggestedRoles: [
      "graphic-designer", "brand-designer", "social-media-designer",
      "visual-identity-designer", "junior-graphic-designer", "marketing-designer",
      "freelance-designer", "creative-designer",
    ],
    suggestedIndustries: ["design", "branding", "creative"],
  },
  {
    addedAt: "2026-06-06T00:22:00.000Z",
    slug: "restaurant-menu", name: "Restaurant Menu",
    description: "Cream menu-card + warm terracotta border + elegant serif + rule dividers. For servers, hosts & restaurant FOH.",
    category: "restaurant", component: RestaurantMenu,
    atsSafe: true, supportsPhoto: false,
    suggestedRoles: [
      "server", "waiter", "waitress", "host", "hostess", "bartender",
      "restaurant-server", "food-runner", "barback", "restaurant-supervisor",
      "front-of-house-manager", "maitre-d", "sommelier",
    ],
    suggestedIndustries: ["restaurant", "hospitality", "food-service"],
  },
  {
    addedAt: "2026-06-06T00:23:00.000Z",
    slug: "retro-desktop-os", name: "Retro Desktop OS",
    description: "Mauve desktop + beige retro windows w/ title bars + X buttons + mono type. Playful 90s-UI look for creatives.",
    category: "creative", component: RetroDesktopOS,
    atsSafe: false, supportsPhoto: true,
    suggestedRoles: [
      "graphic-designer", "illustrator", "motion-designer", "animator",
      "digital-artist", "multimedia-designer", "art-director", "visual-designer",
      "game-designer", "creative-technologist",
    ],
    suggestedIndustries: ["design", "creative", "media"],
  },
  {
    addedAt: "2026-06-06T00:24:00.000Z",
    slug: "sage-soft-rounded", name: "Sage Soft Rounded",
    description: "Sage green + cream blocks + rounded photo + circle motifs. Soft, refined ATS-safe look for finance & admin.",
    category: "finance", component: SageSoftRounded,
    atsSafe: true, supportsPhoto: true,
    suggestedRoles: [
      "accountant", "senior-accountant", "junior-accountant", "bookkeeper",
      "accounts-payable", "accounts-receivable", "payroll-specialist",
      "financial-analyst", "auditor", "tax-associate", "office-administrator",
    ],
    suggestedIndustries: ["accounting", "finance", "administration"],
  },
  {
    addedAt: "2026-06-06T00:25:00.000Z",
    slug: "social-pulse", name: "Social Pulse",
    description: "White + vivid purple→pink→amber gradient + content grid + engagement-metric tiles. For creators & social media.",
    category: "creator", component: SocialPulse,
    atsSafe: false, supportsPhoto: true,
    suggestedRoles: [
      "content-creator", "social-media-manager", "influencer", "social-media-coordinator",
      "community-manager", "social-media-strategist", "content-producer", "youtuber",
      "digital-content-creator", "social-media-specialist", "brand-ambassador-creator",
    ],
    suggestedIndustries: ["social-media", "content-creation", "digital-media"],
  },
  {
    addedAt: "2026-06-06T00:26:00.000Z",
    slug: "support-headset", name: "Support Headset",
    description: "White + friendly teal + coral + headset/chat-bubble motif. For customer support & call-center roles.",
    category: "customer-support", component: SupportHeadset,
    atsSafe: true, supportsPhoto: true,
    suggestedRoles: [
      "customer-support-specialist", "customer-service-representative", "call-center-agent",
      "help-desk-technician", "client-success-manager", "customer-success-specialist",
      "technical-support", "support-team-lead", "contact-center-agent", "customer-care-agent",
    ],
    suggestedIndustries: ["customer-service", "support", "bpo"],
  },
  {
    addedAt: "2026-06-06T00:27:00.000Z",
    slug: "timeline-spine-navy", name: "Timeline Spine Navy",
    description: "White + navy circular icon nodes down a vertical spine + slate header. Clean ATS-safe look for admin & managers.",
    category: "professional", component: TimelineSpineNavy,
    atsSafe: true, supportsPhoto: true,
    suggestedRoles: [
      "administrative-manager", "office-manager", "operations-coordinator",
      "general-manager", "business-administrator", "team-manager",
      "department-manager", "project-coordinator", "executive-assistant",
    ],
    suggestedIndustries: ["administration", "management", "operations"],
  },
  {
    addedAt: "2026-06-06T00:28:00.000Z",
    slug: "travel-compass", name: "Travel Compass",
    description: "Sunset gradient + compass/globe + passport-stamp chips + plane timeline. For travel, tourism & flight crew.",
    category: "travel", component: TravelCompass,
    atsSafe: true, supportsPhoto: true,
    suggestedRoles: [
      "travel-agent", "travel-consultant", "tour-guide", "tourism-manager",
      "flight-attendant", "cabin-crew-travel", "concierge", "reservations-agent",
      "travel-coordinator", "destination-specialist", "cruise-staff", "tour-operator",
    ],
    suggestedIndustries: ["travel", "tourism", "hospitality"],
  },
  {
    addedAt: "2026-06-06T00:29:00.000Z",
    slug: "warehouse-ops", name: "Warehouse Ops",
    description: "Steel grey + safety orange + hazard stripe + box/pallet motif. For warehouse, supply-chain & logistics ops.",
    category: "warehouse", component: WarehouseOps,
    atsSafe: true, supportsPhoto: true,
    suggestedRoles: [
      "warehouse-associate", "warehouse-worker", "forklift-operator", "inventory-specialist",
      "warehouse-supervisor", "shipping-receiving-clerk", "order-picker", "dispatch-coordinator",
      "logistics-coordinator", "material-handler", "stock-controller", "warehouse-manager",
    ],
    suggestedIndustries: ["warehousing", "supply-chain", "logistics"],
  },


  // ════════════ Design System kit (3) — 2026-06-10: 40 new vertical/niche templates ════════════

  {
    slug: "baker-pastry", name: "Baker Pastry",
    description: "Warm flour cream + cocoa + wheat/whisk motif + artisan serif. For bakers, pastry chefs & cake decorators.",
    category: "culinary", component: BakerPastry,
    atsSafe: true, supportsPhoto: false,
    addedAt: "2026-06-10T10:00:00.000Z",
    suggestedRoles: [
      "baker", "pastry-chef", "head-baker", "artisan-baker", "cake-decorator",
      "chocolatier", "patissier", "bakery-manager", "bread-baker", "dessert-chef",
    ],
    suggestedIndustries: ["bakery", "pastry", "food-service"],
    themes: ["sand", "wine", "ivory"],
  },

  {
    slug: "bank-finance-ops", name: "Bank Finance Ops",
    description: "Crisp white + forest green + gold pinstripe + ledger-style rows. For bank branch & finance operations staff.",
    category: "finance", component: BankFinanceOps,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-06-10T10:01:00.000Z",
    suggestedRoles: [
      "bank-teller", "loan-officer", "mortgage-advisor", "branch-manager",
      "personal-banker", "credit-analyst", "underwriter", "finance-operations-analyst",
      "accounts-payable-specialist", "payroll-specialist", "bookkeeper",
    ],
    suggestedIndustries: ["banking", "finance-operations", "financial-services"],
    themes: ["forest", "sand", "ivory"],
  },

  {
    slug: "concierge-luxe", name: "Concierge Luxe",
    description: "Midnight teal + champagne + key motif + refined serif + service list. For concierges & private service.",
    category: "hospitality-elegant", component: ConciergeLuxe,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-10T10:02:00.000Z",
    suggestedRoles: [
      "concierge", "head-concierge", "hotel-concierge", "butler", "private-butler",
      "guest-relations-manager", "guest-services-agent", "vip-services-coordinator",
      "lifestyle-manager", "residence-concierge",
    ],
    suggestedIndustries: ["luxury-hospitality", "private-service", "hotels"],
    themes: ["midnight", "forest", "sand"],
  },

  {
    slug: "courier-route", name: "Courier Route",
    description: "Navy + amber route-map pins + dashed delivery timeline + record tiles. For drivers & last-mile couriers.",
    category: "logistics", component: CourierRoute,
    atsSafe: true, supportsPhoto: false,
    addedAt: "2026-06-10T10:03:00.000Z",
    suggestedRoles: [
      "delivery-driver", "courier", "van-driver", "truck-driver", "cdl-driver",
      "rideshare-driver", "last-mile-driver", "route-driver", "bike-courier",
      "food-delivery-driver", "chauffeur",
    ],
    suggestedIndustries: ["delivery", "logistics", "transportation"],
    themes: ["navy", "sand"],
  },

  {
    slug: "cyber-gradient-iso", name: "Cyber Gradient Iso",
    description: "Violet→cyan gradient sidebar + isometric security line-art + white content cards. Modern light cyber look.",
    category: "cybersecurity", component: CyberGradientIso,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-10T10:04:00.000Z",
    suggestedRoles: [
      "cybersecurity-specialist", "security-analyst", "it-security-analyst",
      "network-security-engineer", "cloud-security-engineer", "grc-analyst",
      "vulnerability-analyst", "threat-intelligence-analyst",
    ],
    suggestedIndustries: ["cybersecurity", "information-security", "technology"],
    themes: ["plum", "sky"],
  },

  {
    slug: "cyber-shield-light", name: "Cyber Shield Light",
    description: "Sky-blue + white rounded card + neon photo ring + shield/lock illustration + gradient bars. Friendly light cyber look.",
    category: "cybersecurity", component: CyberShieldLight,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-06-10T10:05:00.000Z",
    suggestedRoles: [
      "junior-cybersecurity-analyst", "soc-analyst-tier1", "security-operations-analyst",
      "information-security-officer", "it-auditor", "compliance-analyst-security",
      "security-administrator", "identity-access-analyst",
    ],
    suggestedIndustries: ["cybersecurity", "it-security", "technology"],
    themes: ["sky", "navy", "ivory"],
  },

  {
    slug: "data-admin-mono", name: "Data Admin Mono",
    description: "White + big black sans name + circle photo + thin teal rules. Ultra-clean ATS-safe for DBAs & IT ops.",
    category: "professional", component: DataAdminMono,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-06-10T10:06:00.000Z",
    suggestedRoles: [
      "database-administrator", "dba", "sql-developer", "database-engineer",
      "data-engineer", "etl-developer", "it-operations-specialist", "systems-analyst",
      "it-administrator", "middleware-administrator",
    ],
    suggestedIndustries: ["data", "it-operations", "technology"],
    themes: ["slate", "sky", "ivory"],
  },

  {
    slug: "devops-pipeline", name: "DevOps Pipeline",
    description: "Slate + electric green CI/CD pipeline stages + mono accents + metric tiles. For DevOps, SRE & platform engineers.",
    category: "developer", component: DevOpsPipeline,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-10T10:07:00.000Z",
    suggestedRoles: [
      "devops-engineer", "site-reliability-engineer", "sre", "platform-engineer",
      "cloud-engineer", "infrastructure-developer", "kubernetes-engineer",
      "ci-cd-engineer", "release-engineer", "automation-engineer",
    ],
    suggestedIndustries: ["devops", "cloud", "infrastructure"],
    themes: ["charcoal", "midnight", "emerald"],
  },

  {
    slug: "dispatcher-radio", name: "Dispatcher Radio",
    description: "Dark slate + amber radio-wave motif + channel chips + metric tiles. Calm authority for emergency comms.",
    category: "public-service", component: DispatcherRadio,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-10T10:08:00.000Z",
    suggestedRoles: [
      "911-dispatcher", "emergency-dispatcher", "police-dispatcher", "fire-dispatcher",
      "emergency-call-operator", "control-room-operator", "dispatch-supervisor",
      "transit-dispatcher", "flight-dispatcher", "security-control-operator",
    ],
    suggestedIndustries: ["emergency-services", "public-safety", "operations"],
    themes: ["charcoal", "midnight"],
  },

  {
    slug: "edu-gradient-pills", name: "Edu Gradient Pills",
    description: "Deep navy + orange→gold gradient pill section bars + glow photo ring + wave footer. Playful-dark for education coordinators.",
    category: "scholarly", component: EduGradientPills,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-10T10:09:00.000Z",
    suggestedRoles: [
      "education-coordinator", "academic-coordinator", "school-administrator",
      "education-administrator", "curriculum-coordinator", "librarian",
      "school-librarian", "media-specialist", "education-program-manager",
      "admissions-coordinator", "student-affairs-coordinator",
    ],
    suggestedIndustries: ["education", "academic-administration", "library"],
    themes: ["midnight", "coral", "sand"],
  },

  {
    slug: "esports-stream", name: "Esports Stream",
    description: "Near-black + electric violet/cyan + hexagon photo + angular stat tiles. For esports players, streamers & casters.",
    category: "game-dev", component: EsportsStream,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-10T10:10:00.000Z",
    suggestedRoles: [
      "esports-player", "professional-gamer", "streamer", "content-creator-gaming",
      "esports-coach", "shoutcaster", "esports-manager", "gaming-community-manager",
      "twitch-streamer", "esports-analyst",
    ],
    suggestedIndustries: ["esports", "gaming", "streaming"],
    themes: ["midnight", "plum"],
  },

  {
    slug: "flight-instructor-sky", name: "Flight Instructor Sky",
    description: "Sky gradient + climb-path line + cloud accents + log-book stat tiles. Light look for flight instructors & CFIs.",
    category: "aviation", component: FlightInstructorSky,
    atsSafe: true, supportsPhoto: false,
    addedAt: "2026-06-10T10:11:00.000Z",
    suggestedRoles: [
      "flight-instructor", "certified-flight-instructor", "cfi", "cfii",
      "aviation-instructor", "simulator-instructor", "ground-instructor",
      "chief-flight-instructor", "aerobatic-instructor",
    ],
    suggestedIndustries: ["aviation-training", "flight-school", "aviation"],
    themes: ["sky", "navy", "ivory"],
  },

  {
    slug: "florist-bloom", name: "Florist Bloom",
    description: "Cream + rose/sage + hand-drawn bloom motifs + arch photo. Soft botanical for florists & garden designers.",
    category: "beauty", component: FloristBloom,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-06-10T10:12:00.000Z",
    suggestedRoles: [
      "florist", "floral-designer", "garden-designer", "landscape-designer",
      "landscaper", "gardener", "nursery-worker-plants", "botanical-stylist",
      "wedding-florist", "plant-care-specialist",
    ],
    suggestedIndustries: ["floristry", "gardening", "landscaping"],
    themes: ["wine", "sage", "ivory"],
  },

  {
    slug: "hr-talent-warm", name: "HR Talent Warm",
    description: "Soft apricot header + rounded photo + people-dots motif + plum accents. Warm people-first look for HR & recruiting.",
    category: "people-hr", component: HRTalentWarm,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-06-10T10:13:00.000Z",
    suggestedRoles: [
      "hr-manager", "hr-generalist", "hr-specialist", "recruiter", "talent-acquisition-specialist",
      "talent-acquisition-manager", "hr-coordinator", "people-operations-manager",
      "hr-business-partner", "recruitment-consultant", "sourcer",
    ],
    suggestedIndustries: ["human-resources", "recruiting", "people-operations"],
    themes: ["plum", "coral", "ivory"],
  },

  {
    slug: "holo-premium-light", name: "Holo Premium Light",
    description: "Soft pearl + holographic pastel sheen corners + thin gold rules + elegant serif. Premium light for senior professionals.",
    category: "professional", component: HoloPremiumLight,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-06-10T10:14:00.000Z",
    suggestedRoles: [
      "senior-consultant", "management-consultant-premium", "executive-consultant",
      "director", "vice-president", "senior-manager", "partner-consulting",
      "strategy-director", "principal-consultant",
    ],
    suggestedIndustries: ["consulting", "executive", "professional-services"],
    themes: ["ivory", "sand", "linen"],
  },

  {
    slug: "lab-tech-dark", name: "Lab Tech Dark",
    description: "Deep teal-black + cyan/violet beaker + specimen grid + glow bars. Dramatic dark for lab professionals.",
    category: "science", component: LabTechDark,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-10T10:15:00.000Z",
    suggestedRoles: [
      "medical-laboratory-scientist", "medical-lab-technician", "pathology-technician",
      "histotechnologist", "phlebotomist", "clinical-lab-technologist",
      "quality-control-analyst-lab", "forensic-lab-technician", "chemistry-analyst",
    ],
    suggestedIndustries: ["laboratory", "diagnostics", "science"],
    themes: ["midnight", "emerald"],
  },

  {
    slug: "librarian-neon-wave", name: "Librarian Neon Wave",
    description: "Deep navy + sweeping blue/white wave + neon hexagon photo + bold white sections. For librarians & information specialists.",
    category: "library", component: LibrarianNeonWave,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-10T10:16:00.000Z",
    suggestedRoles: [
      "librarian", "digital-librarian", "archivist", "information-specialist",
      "cataloging-librarian", "research-librarian", "records-manager",
      "knowledge-manager", "information-officer", "library-technician",
    ],
    suggestedIndustries: ["library", "information-management", "education"],
    themes: ["navy", "midnight", "sky"],
  },

  {
    slug: "medical-neon-hud", name: "Medical Neon HUD",
    description: "Deep ink + neon cyan corner brackets + glow photo ring + teal hero panel + glowing timeline. Dramatic option for specialist physicians.",
    category: "medical", component: MedicalNeonHUD,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-10T10:17:00.000Z",
    suggestedRoles: [
      "cardiologist", "neurologist", "radiologist", "oncologist", "anesthesiologist",
      "dermatologist", "gastroenterologist", "pulmonologist", "nephrologist",
      "endocrinologist", "physician", "medical-specialist", "attending-physician",
    ],
    suggestedIndustries: ["medicine", "specialist-medicine", "healthcare"],
    themes: ["midnight", "navy"],
  },

  {
    slug: "mobile-dev-duotone", name: "Mobile Dev Duotone",
    description: "White + teal/orange duotone + app project cards + KPI footer band. For mobile app developers.",
    category: "mobile", component: MobileDevDuotone,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-06-10T10:18:00.000Z",
    suggestedRoles: [
      "mobile-app-developer", "mobile-developer", "flutter-developer", "react-native-developer",
      "ios-developer", "android-developer", "swift-developer", "kotlin-developer",
      "cross-platform-developer", "mobile-engineer",
    ],
    suggestedIndustries: ["mobile-development", "software", "apps"],
    themes: ["forest", "coral", "ivory"],
  },

  {
    slug: "museum-curator", name: "Museum Curator",
    description: "Gallery white + stone + plinth-frame photo + classical serif + exhibit labels. For curators & conservators.",
    category: "scholarly", component: MuseumCurator,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-06-10T10:19:00.000Z",
    suggestedRoles: [
      "curator", "museum-curator", "gallery-manager", "art-conservator",
      "collections-manager", "exhibitions-manager", "art-historian", "registrar-museum",
      "gallery-director", "museum-educator",
    ],
    suggestedIndustries: ["museums", "galleries", "cultural-heritage"],
    themes: ["sand", "linen", "ivory"],
  },

  {
    slug: "neon-circuit-dev", name: "Neon Circuit Dev",
    description: "Deep blue→violet circuit board + glow name + neon ring dials sidebar + white panel. Bold dark for full-stack devs.",
    category: "developer", component: NeonCircuitDev,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-10T10:20:00.000Z",
    suggestedRoles: [
      "full-stack-engineer", "javascript-engineer", "mern-developer", "mean-developer",
      "web-application-developer", "senior-full-stack-developer", "react-node-developer",
    ],
    suggestedIndustries: ["software", "web-development", "technology"],
    themes: ["midnight", "navy", "plum"],
  },

  {
    slug: "neuro-clean-light", name: "Neuro Clean Light",
    description: "Ice white card + gradient photo ring + pale blue dot timeline + publications section. Light clinical for physicians.",
    category: "medical", component: NeuroCleanLight,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-06-10T10:21:00.000Z",
    suggestedRoles: [
      "neurologist-light", "internist", "general-practitioner", "family-physician",
      "hospitalist", "clinical-researcher", "medical-officer", "resident-physician",
      "psychiatrist", "pediatrician",
    ],
    suggestedIndustries: ["medicine", "healthcare", "clinical-research"],
    themes: ["sky", "ivory", "slate"],
  },

  {
    slug: "nurse-glass-pastel", name: "Nurse Glass Pastel",
    description: "Icy pastel blue + glassmorphism card + floating orbs/capsule + donut dials. Soft modern look for nursing.",
    category: "nursing", component: NurseGlassPastel,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-10T10:22:00.000Z",
    suggestedRoles: [
      "nurse-practitioner", "registered-nurse-np", "family-nurse-practitioner",
      "clinical-nurse", "pediatric-nurse-practitioner", "acute-care-np",
      "physician-assistant", "medical-assistant", "clinical-officer",
    ],
    suggestedIndustries: ["nursing", "healthcare", "clinical-care"],
    themes: ["sky", "ivory"],
  },

  {
    slug: "nursery-meadow", name: "Nursery Meadow",
    description: "White + layered green/yellow meadow waves + rounded yellow photo frame + daisies + smiling sun. For nursery & early years.",
    category: "childcare", component: NurseryMeadow,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-06-10T10:23:00.000Z",
    suggestedRoles: [
      "nursery-assistant", "nursery-practitioner", "nursery-teacher",
      "early-years-assistant", "daycare-teacher", "preschool-assistant",
      "playgroup-leader", "creche-assistant",
    ],
    suggestedIndustries: ["childcare", "early-education", "nursery"],
    themes: ["forest", "sand", "ivory"],
  },

  {
    slug: "optometrist-vision", name: "Optometrist Vision",
    description: "White + iris blue/violet + eye/lens motif + acuity-chart accent. For optometrists & eye-care staff.",
    category: "medical", component: OptometristVision,
    atsSafe: true, supportsPhoto: false,
    addedAt: "2026-06-10T10:24:00.000Z",
    suggestedRoles: [
      "optometrist", "optician", "dispensing-optician", "ophthalmic-technician",
      "ophthalmologist", "optical-assistant", "vision-therapist", "contact-lens-specialist",
    ],
    suggestedIndustries: ["eye-care", "optometry", "healthcare"],
    themes: ["sky", "plum", "ivory"],
  },

  {
    slug: "paralegal-brief", name: "Paralegal Brief",
    description: "White + oxblood + ruled brief-document margin line + case-file tabs. Crisp legal-support look.",
    category: "legal", component: ParalegalBrief,
    atsSafe: true, supportsPhoto: false,
    addedAt: "2026-06-10T10:25:00.000Z",
    suggestedRoles: [
      "paralegal", "senior-paralegal", "legal-assistant", "legal-secretary",
      "litigation-paralegal", "corporate-paralegal", "court-clerk", "law-clerk",
      "legal-administrator", "compliance-assistant",
    ],
    suggestedIndustries: ["legal", "legal-support", "law"],
    themes: ["wine", "slate", "ivory"],
  },

  {
    slug: "paramedic-pulse", name: "Paramedic Pulse",
    description: "Navy + emergency red + star-of-life + pulse line + readiness chips. Bold urgent look for EMS.",
    category: "medical", component: ParamedicPulse,
    atsSafe: true, supportsPhoto: false,
    addedAt: "2026-06-10T10:26:00.000Z",
    suggestedRoles: [
      "paramedic", "emt", "emergency-medical-technician", "ambulance-technician",
      "first-responder", "emergency-responder", "flight-paramedic", "er-technician",
      "firefighter-emt", "rescue-technician",
    ],
    suggestedIndustries: ["emergency-services", "ems", "healthcare"],
    themes: ["navy", "wine"],
  },

  {
    slug: "photo-real-estate", name: "Photo Real Estate",
    description: "White + charcoal + sky accent + viewfinder corner frame + property-grid shoots. For property & aerial photographers.",
    category: "photography", component: PhotoRealEstate,
    atsSafe: true, supportsPhoto: false,
    addedAt: "2026-06-10T10:27:00.000Z",
    suggestedRoles: [
      "real-estate-photographer", "architecture-photographer", "interior-photographer",
      "drone-photographer", "drone-operator", "property-videographer",
      "virtual-tour-photographer", "matterport-technician",
    ],
    suggestedIndustries: ["photography", "real-estate-media", "drone-services"],
    themes: ["slate", "sky", "ivory"],
  },

  {
    slug: "security-shield", name: "Security Shield",
    description: "Charcoal + steel blue + shield badge + vigilance chips. For security guards & loss prevention.",
    category: "public-service", component: SecurityShield,
    atsSafe: true, supportsPhoto: false,
    addedAt: "2026-06-10T10:28:00.000Z",
    suggestedRoles: [
      "security-guard", "security-officer", "loss-prevention-officer", "surveillance-operator",
      "corporate-security-officer", "event-security", "campus-security", "armed-security-officer",
      "security-supervisor", "patrol-officer",
    ],
    suggestedIndustries: ["security", "protective-services", "facilities"],
    themes: ["charcoal", "navy"],
  },

  {
    slug: "skill-radar-navy", name: "Skill Radar Navy",
    description: "Navy sidebar + circle photo + pentagon radar skill chart + geometric accents. Infographic look for web developers.",
    category: "developer", component: SkillRadarNavy,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-10T10:29:00.000Z",
    suggestedRoles: [
      "frontend-developer", "front-end-developer", "web-developer", "junior-web-developer",
      "javascript-developer", "react-developer", "vue-developer", "ui-developer",
      "html-css-developer", "web-designer-developer",
    ],
    suggestedIndustries: ["web-development", "software", "technology"],
    themes: ["navy", "coral", "sand"],
  },

  {
    slug: "social-worker-bridge", name: "Social Worker Bridge",
    description: "Warm white + dusty blue + terracotta + bridge/connection motif. For social workers & case managers.",
    category: "nonprofit", component: SocialWorkerBridge,
    atsSafe: true, supportsPhoto: false,
    addedAt: "2026-06-10T10:30:00.000Z",
    suggestedRoles: [
      "social-worker", "licensed-clinical-social-worker", "case-manager", "caseworker",
      "child-welfare-worker", "school-social-worker", "medical-social-worker",
      "community-outreach-worker", "family-support-worker", "youth-worker",
    ],
    suggestedIndustries: ["social-services", "community", "welfare"],
    themes: ["sky", "coral", "ivory"],
  },

  {
    slug: "sports-coach-field", name: "Sports Coach Field",
    description: "Pitch-green header with tactic-board arrows + stat tiles + badge chips. For sports coaches & PE teachers.",
    category: "fitness", component: SportsCoachField,
    atsSafe: true, supportsPhoto: false,
    addedAt: "2026-06-10T10:31:00.000Z",
    suggestedRoles: [
      "sports-coach-team", "football-coach", "soccer-coach", "basketball-coach",
      "pe-teacher", "physical-education-teacher", "athletic-director",
      "team-manager-sports", "youth-coach", "swimming-coach", "tennis-coach",
    ],
    suggestedIndustries: ["sports", "coaching", "education"],
    themes: ["forest", "midnight"],
  },

  {
    slug: "synthwave-grid", name: "Synthwave Grid",
    description: "Black→sunset horizon + neon pink perspective grid + glow photo ring + white content cards. Retro-futuristic for UI designers.",
    category: "creative", component: SynthwaveGrid,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-10T10:32:00.000Z",
    suggestedRoles: [
      "ui-designer", "visual-designer", "digital-designer", "web-designer",
      "digital-artist", "creative-technologist", "motion-designer", "3d-artist",
      "brand-designer", "graphic-designer-digital",
    ],
    suggestedIndustries: ["design", "digital-art", "creative"],
    themes: ["midnight", "plum", "wine"],
  },

  {
    slug: "tattoo-ink", name: "Tattoo Ink",
    description: "Black + parchment + gold old-school banner + ink flourish. Bold editorial for tattoo & studio artists.",
    category: "beauty", component: TattooInk,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-10T10:33:00.000Z",
    suggestedRoles: [
      "tattoo-artist", "tattooist", "piercer", "body-piercer", "permanent-makeup-artist",
      "tattoo-apprentice", "studio-artist", "flash-artist",
    ],
    suggestedIndustries: ["tattoo", "body-art", "studio"],
    themes: ["charcoal", "midnight", "wine"],
  },

  {
    slug: "teacher-sunshine", name: "Teacher Sunshine",
    description: "Warm cream + sunny yellow/sky waves + sun-ray photo ring + crayon chips. Light playful for primary teachers.",
    category: "education-warm", component: TeacherSunshine,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-06-10T10:34:00.000Z",
    suggestedRoles: [
      "primary-school-teacher", "elementary-teacher", "primary-teacher",
      "grade-school-teacher", "reception-teacher", "year-one-teacher",
      "elementary-school-teacher", "junior-school-teacher",
    ],
    suggestedIndustries: ["primary-education", "education", "teaching"],
    themes: ["sand", "sky", "ivory"],
  },

  {
    slug: "teal-code-timeline", name: "Teal Code Timeline",
    description: "Teal header band + circle photo + code watermarks + dot timeline + skill bars + footer contact band. ATS-safe dev look.",
    category: "developer", component: TealCodeTimeline,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-06-10T10:35:00.000Z",
    suggestedRoles: [
      "senior-frontend-developer", "fullstack-developer", "full-stack-developer",
      "software-engineer", "web-engineer", "angular-developer", "typescript-developer",
      "node-developer", "php-developer", "wordpress-developer",
    ],
    suggestedIndustries: ["software", "web-development", "technology"],
    themes: ["forest", "sky", "slate"],
  },

  {
    slug: "translator-global", name: "Translator Global",
    description: "White + indigo + globe/speech-bubble motif + language proficiency bars. For translators & interpreters.",
    category: "linguist", component: TranslatorGlobal,
    atsSafe: true, supportsPhoto: false,
    addedAt: "2026-06-10T10:36:00.000Z",
    suggestedRoles: [
      "translator", "interpreter", "localization-specialist", "localization-manager",
      "conference-interpreter", "medical-interpreter", "legal-translator",
      "subtitler", "transcreation-specialist", "bilingual-coordinator",
    ],
    suggestedIndustries: ["translation", "localization", "language-services"],
    themes: ["navy", "sky", "ivory"],
  },

  {
    slug: "utility-lineworker", name: "Utility Lineworker",
    description: "Slate blue + high-vis yellow + power-line motif + safety stripe. For lineworkers & utility field crew.",
    category: "trades-industrial", component: UtilityLineworker,
    atsSafe: true, supportsPhoto: false,
    addedAt: "2026-06-10T10:37:00.000Z",
    suggestedRoles: [
      "lineworker", "lineman", "power-line-technician", "utility-technician",
      "cable-technician", "telecom-field-technician", "fiber-optic-technician",
      "meter-technician", "substation-technician", "utility-locator",
    ],
    suggestedIndustries: ["utilities", "power", "telecommunications"],
    themes: ["slate", "navy"],
  },

  {
    slug: "vet-tech-paws", name: "Vet Tech Paws",
    description: "Soft cream + teal + paw-print trail + organic blob photo + care chips. Warm look for veterinary support.",
    category: "veterinary", component: VetTechPaws,
    atsSafe: true, supportsPhoto: true,
    addedAt: "2026-06-10T10:38:00.000Z",
    suggestedRoles: [
      "veterinary-technician", "vet-tech", "veterinary-nurse", "veterinary-assistant",
      "animal-care-technician", "kennel-technician", "animal-shelter-worker",
      "dog-groomer", "pet-sitter", "zookeeper-assistant",
    ],
    suggestedIndustries: ["veterinary", "animal-care", "pet-services"],
    themes: ["forest", "coral", "ivory"],
  },

  {
    slug: "warm-minimal-dials", name: "Warm Minimal Dials",
    description: "Cream + terracotta/sage + big serif name + donut percentage dials + dot timeline. Warm infographic for generalist tech.",
    category: "developer", component: WarmMinimalDials,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-10T10:39:00.000Z",
    suggestedRoles: [
      "full-stack-developer-warm", "software-developer-generalist", "web-developer-freelance",
      "freelance-developer", "creative-developer", "indie-developer", "consultant-developer",
    ],
    suggestedIndustries: ["software", "freelance", "technology"],
    themes: ["sand", "linen", "ivory"],
  },

  // ---- Design templates request kit (56) - 2026-06-20 ----
  {
    slug: "midnight-cyan", name: "Midnight Cyan",
    description: "Dark navy canvas, cyan-violet glow, glowing skill bars and mono detailing. Bold infographic for DevOps and platform engineers.",
    category: "developer", component: MidnightCyan,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:55:00.000Z",
    suggestedRoles: ["devops-engineer", "platform-engineer", "site-reliability-engineer", "sre", "cloud-engineer", "infrastructure-engineer", "backend-engineer"],
    suggestedIndustries: ["software", "technology", "devops"],
    themes: ["navy", "plum", "forest"],
  },
  {
    slug: "coral-sunset", name: "Coral Sunset",
    description: "Full-bleed coral-to-plum gradient hero, hexagon monogram and gradient skill bars. Warm template for teachers and educators.",
    category: "education-warm", component: CoralSunset,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:54:00.000Z",
    suggestedRoles: ["teacher", "secondary-school-teacher", "primary-school-teacher", "science-teacher", "lecturer", "tutor", "education-coordinator"],
    suggestedIndustries: ["education", "teaching", "schools"],
    themes: ["coral", "plum", "sunset"],
  },
  {
    slug: "emerald-executive", name: "Emerald Executive",
    description: "Deep emerald header, gold rule and Fraunces display. Refined, ATS-safe template for finance leaders and the C-suite.",
    category: "finance", component: EmeraldExecutive,
    atsSafe: true, supportsPhoto: false,
    addedAt: "2026-06-20T12:53:00.000Z",
    suggestedRoles: ["chief-financial-officer", "cfo", "finance-director", "vp-finance", "head-of-finance", "financial-controller", "investment-director"],
    suggestedIndustries: ["finance", "banking", "executive"],
    themes: ["forest", "ivory", "wine"],
  },
  {
    slug: "royal-blue-corporate", name: "Royal Blue Corporate",
    description: "Classic blue sidebar with photo, skill bars and contact over a clean white body. Dependable template for business and operations managers.",
    category: "business", component: RoyalBlueCorporate,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-20T12:52:00.000Z",
    suggestedRoles: ["operations-manager", "business-manager", "general-manager", "office-manager", "operations-director", "business-development-manager"],
    suggestedIndustries: ["business", "operations", "corporate"],
    themes: ["navy", "royal", "slate"],
  },
  {
    slug: "sage-watercolor", name: "Sage Watercolor",
    description: "Soft sage and peach watercolour washes, circular photo and calm credential chips. Gentle template for nurses and healthcare.",
    category: "nursing", component: SageWatercolor,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-20T12:51:00.000Z",
    suggestedRoles: ["registered-nurse", "nurse", "paediatric-nurse", "staff-nurse", "clinical-nurse", "ward-nurse", "midwife"],
    suggestedIndustries: ["healthcare", "nursing", "medical"],
    themes: ["sage", "ivory", "blush"],
  },
  {
    slug: "violet-glass", name: "Violet Glass",
    description: "Violet-to-pink gradient with frosted glass cards and an impact-metrics strip. Modern template for product and UX designers.",
    category: "creative", component: VioletGlass,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-20T12:50:00.000Z",
    suggestedRoles: ["product-designer", "ux-designer", "ui-designer", "senior-product-designer", "interaction-designer", "design-lead"],
    suggestedIndustries: ["design", "product", "technology"],
    themes: ["plum", "blush", "violet"],
  },
  {
    slug: "retro-modern", name: "Retro Modern",
    description: "Bold retro blocks in burnt orange, gold and ink with chunky Archivo display. Confident template for brand and art directors.",
    category: "creative", component: RetroModern,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:49:00.000Z",
    suggestedRoles: ["art-director", "brand-director", "creative-director", "brand-designer", "senior-designer", "design-director"],
    suggestedIndustries: ["creative", "branding", "advertising"],
    themes: ["orange", "sunset", "sand"],
  },
  {
    slug: "geometric-abstract", name: "Geometric Abstract",
    description: "Angular teal, yellow and coral shapes framing a crisp two-column layout. Playful template for graphic and visual designers.",
    category: "creative", component: GeometricAbstract,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:48:00.000Z",
    suggestedRoles: ["graphic-designer", "visual-designer", "senior-graphic-designer", "communication-designer", "brand-designer", "illustrator"],
    suggestedIndustries: ["design", "creative", "media"],
    themes: ["teal", "mint", "coral"],
  },
  {
    slug: "slate-mono-data", name: "Slate Mono Data",
    description: "Monospace terminal styling, teal accents, metric tiles and a mini bar chart. Data-driven template for analysts and BI specialists.",
    category: "web-analytics", component: SlateMonoData,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:47:00.000Z",
    suggestedRoles: ["data-analyst", "business-intelligence-analyst", "bi-developer", "analytics-engineer", "data-scientist", "reporting-analyst"],
    suggestedIndustries: ["data", "analytics", "technology"],
    themes: ["slate", "teal", "navy"],
  },
  {
    slug: "rose-editorial", name: "Rose Editorial",
    description: "Elegant blush palette, DM Serif Display and a centred editorial masthead. Refined template for marketing managers.",
    category: "marketing", component: RoseEditorial,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-20T12:46:00.000Z",
    suggestedRoles: ["marketing-manager", "brand-manager", "marketing-director", "senior-marketing-manager", "communications-manager", "marketing-specialist"],
    suggestedIndustries: ["marketing", "branding", "communications"],
    themes: ["blush", "wine", "rose"],
  },
  {
    slug: "charcoal-timeline", name: "Charcoal Timeline",
    description: "Charcoal header with an amber vertical timeline tracing the career path. Structured template for project and programme managers.",
    category: "operations", component: CharcoalTimeline,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:45:00.000Z",
    suggestedRoles: ["project-manager", "programme-manager", "senior-project-manager", "program-manager", "delivery-manager", "pmo-lead", "scrum-master"],
    suggestedIndustries: ["project-management", "operations", "consulting"],
    themes: ["slate", "amber", "charcoal"],
  },
  {
    slug: "terracotta-caregiver", name: "Terracotta Caregiver",
    description: "Warm terracotta with a soft rounded header, photo and friendly cards. Compassionate template for carers and support workers.",
    category: "caregiving", component: TerracottaCaregiver,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-20T12:44:00.000Z",
    suggestedRoles: ["care-assistant", "senior-care-assistant", "support-worker", "carer", "healthcare-assistant", "home-carer"],
    suggestedIndustries: ["care", "social-care", "healthcare"],
    themes: ["terracotta", "sand", "blush"],
  },
  {
    slug: "ocean-teal-sales", name: "Ocean Teal Sales",
    description: "Teal gradient header over a bold metrics stripe built to show numbers. Results-led template for sales and business development.",
    category: "sales", component: OceanTealSales,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:43:00.000Z",
    suggestedRoles: ["sales-manager", "business-development-manager", "account-executive", "sales-representative", "sales-director", "account-manager"],
    suggestedIndustries: ["sales", "business-development", "saas"],
    themes: ["teal", "ocean", "navy"],
  },
  {
    slug: "wine-legal", name: "Wine Legal",
    description: "Refined wine-and-serif classic with centred headings. Quietly authoritative and ATS-safe for lawyers and counsel.",
    category: "legal", component: WineLegal,
    atsSafe: true, supportsPhoto: false,
    addedAt: "2026-06-20T12:42:00.000Z",
    suggestedRoles: ["lawyer", "corporate-counsel", "solicitor", "attorney", "legal-counsel", "general-counsel", "associate-lawyer"],
    suggestedIndustries: ["legal", "law", "corporate"],
    themes: ["wine", "ivory", "forest"],
  },
  {
    slug: "holographic-iridescent", name: "Holographic Iridescent",
    description: "Iridescent pink-to-mint gradient over a dark canvas with gradient stat tiles. Striking template for photographers and visual artists.",
    category: "photography", component: HolographicIridescent,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:41:00.000Z",
    suggestedRoles: ["photographer", "visual-artist", "commercial-photographer", "fashion-photographer", "creative-photographer", "art-photographer"],
    suggestedIndustries: ["photography", "creative", "media"],
    themes: ["plum", "violet", "blush"],
  },
  {
    slug: "isometric-indigo", name: "Isometric Indigo",
    description: "Indigo grid hero with isometric 3D cubes, glowing skill bars and dark panels. Technical template for cloud architects.",
    category: "developer", component: IsometricIndigo,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:40:00.000Z",
    suggestedRoles: ["cloud-architect", "solutions-architect", "cloud-solutions-architect", "cloud-engineer", "infrastructure-architect", "devops-engineer"],
    suggestedIndustries: ["software", "cloud", "technology"],
    themes: ["navy", "plum", "slate"],
  },
  {
    slug: "forest-trades", name: "Forest Trades",
    description: "Sturdy forest-green and safety-amber with a hazard stripe and condensed type. Rugged template for construction and trades.",
    category: "trades-industrial", component: ForestTrades,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:39:00.000Z",
    suggestedRoles: ["site-manager", "construction-manager", "site-foreman", "construction-supervisor", "building-supervisor", "trades-supervisor"],
    suggestedIndustries: ["construction", "trades", "building"],
    themes: ["forest", "amber", "sand"],
  },
  {
    slug: "sunny-hospitality", name: "Sunny Hospitality",
    description: "Warm amber sunrise header with photo and friendly rounded card sections. Welcoming template for hotels and hospitality.",
    category: "hospitality", component: SunnyHospitality,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-20T12:38:00.000Z",
    suggestedRoles: ["hotel-manager", "front-office-manager", "hospitality-manager", "guest-relations-manager", "hotel-operations-manager", "duty-manager"],
    suggestedIndustries: ["hospitality", "hotels", "tourism"],
    themes: ["amber", "coral", "sand"],
  },
  {
    slug: "fresh-graduate-mint", name: "Fresh Graduate Mint",
    description: "Bright mint, education-first layout with space for awards. Built for students and first-job applicants.",
    category: "professional", component: FreshGraduateMint,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:37:00.000Z",
    suggestedRoles: ["graduate", "student", "intern", "entry-level", "junior-analyst", "trainee", "apprentice"],
    suggestedIndustries: ["graduate", "entry-level", "early-career"],
    themes: ["mint", "sage", "ivory"],
  },
  {
    slug: "blueprint-architect", name: "Blueprint Architect",
    description: "Navy blueprint grid header with mono numbering and a technical two-column body. Precise template for architects.",
    category: "creative", component: BlueprintArchitect,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:36:00.000Z",
    suggestedRoles: ["architect", "project-architect", "chartered-architect", "design-architect", "architectural-designer", "associate-architect"],
    suggestedIndustries: ["architecture", "design", "construction"],
    themes: ["navy", "slate", "royal"],
  },
  {
    slug: "dark-luxe-gold", name: "Dark Luxe Gold",
    description: "Near-black with a gold hairline frame and centred serif. Quietly premium template for consultants and executives.",
    category: "business", component: DarkLuxeGold,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:35:00.000Z",
    suggestedRoles: ["management-consultant", "strategy-consultant", "partner", "principal-consultant", "senior-consultant", "advisor"],
    suggestedIndustries: ["consulting", "strategy", "executive"],
    themes: ["charcoal", "gold", "wine"],
  },
  {
    slug: "customer-service-coral", name: "Customer Service Coral",
    description: "Friendly coral sidebar with photo, skill bars and a metrics strip. Warm template for customer service and CX roles.",
    category: "customer-support", component: CustomerServiceCoral,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-20T12:34:00.000Z",
    suggestedRoles: ["customer-service-representative", "customer-success-specialist", "customer-support-agent", "support-specialist", "cx-specialist", "client-success-manager"],
    suggestedIndustries: ["customer-service", "support", "saas"],
    themes: ["coral", "blush", "sand"],
  },
  {
    slug: "ledger-accountant", name: "Ledger Accountant",
    description: "Double-rule ledger styling in forest green with tabular figures. Precise and ATS-safe for accountants.",
    category: "finance", component: LedgerAccountant,
    atsSafe: true, supportsPhoto: false,
    addedAt: "2026-06-20T12:33:00.000Z",
    suggestedRoles: ["accountant", "chartered-accountant", "senior-accountant", "cpa", "financial-accountant", "management-accountant", "auditor"],
    suggestedIndustries: ["accounting", "finance", "audit"],
    themes: ["forest", "ivory", "sage"],
  },
  {
    slug: "hr-people", name: "HR People",
    description: "Warm purple header with photo and soft lavender cards. People-first template for HR and recruiting.",
    category: "people-hr", component: HRPeople,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-20T12:32:00.000Z",
    suggestedRoles: ["hr-business-partner", "hr-manager", "hr-advisor", "people-partner", "recruiter", "talent-acquisition-specialist", "hr-generalist"],
    suggestedIndustries: ["human-resources", "people", "recruiting"],
    themes: ["plum", "violet", "blush"],
  },
  {
    slug: "culinary-menu", name: "Culinary Menu",
    description: "Dark menu-card styling with ember red, dotted leaders and a gold frame. Characterful template for chefs.",
    category: "culinary", component: CulinaryMenu,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:31:00.000Z",
    suggestedRoles: ["executive-chef", "head-chef", "chef", "sous-chef", "chef-de-partie", "culinary-director", "kitchen-manager"],
    suggestedIndustries: ["culinary", "restaurants", "hospitality"],
    themes: ["charcoal", "wine", "gold"],
  },
  {
    slug: "real-estate-navy", name: "Real Estate Navy",
    description: "Polished navy-and-gold with photo and a sales-volume metrics stripe. Confident template for real estate agents.",
    category: "real-estate", component: RealEstateNavy,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-20T12:30:00.000Z",
    suggestedRoles: ["real-estate-agent", "realtor", "estate-agent", "property-consultant", "sales-agent", "luxury-real-estate-agent"],
    suggestedIndustries: ["real-estate", "property", "sales"],
    themes: ["navy", "gold", "slate"],
  },
  {
    slug: "fitness-coach", name: "Fitness Coach",
    description: "High-energy black with electric-lime accents, condensed type and big stats. Bold template for coaches and trainers.",
    category: "fitness", component: FitnessCoach,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:29:00.000Z",
    suggestedRoles: ["fitness-coach", "strength-coach", "personal-trainer", "strength-and-conditioning-coach", "fitness-instructor", "gym-coach"],
    suggestedIndustries: ["fitness", "coaching", "sports"],
    themes: ["lime", "charcoal", "forest"],
  },
  {
    slug: "journalist-column", name: "Journalist Column",
    description: "Newspaper masthead, drop-cap lead and a two-column body. Monochrome editorial template for journalists and writers.",
    category: "creative", component: JournalistColumn,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:28:00.000Z",
    suggestedRoles: ["journalist", "reporter", "editor", "investigative-journalist", "staff-writer", "news-reporter", "feature-writer"],
    suggestedIndustries: ["journalism", "media", "publishing"],
    themes: ["charcoal", "ivory", "slate"],
  },
  {
    slug: "mechanical-engineer", name: "Mechanical Engineer",
    description: "Steel-blue sidebar with orange accents, mono labels and technical skill bars. Engineering-grade template for mechanical engineers.",
    category: "manufacturing", component: MechanicalEngineer,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:27:00.000Z",
    suggestedRoles: ["mechanical-engineer", "mechanical-design-engineer", "design-engineer", "product-engineer", "manufacturing-engineer", "robotics-engineer"],
    suggestedIndustries: ["engineering", "manufacturing", "automotive"],
    themes: ["slate", "amber", "steel"],
  },
  {
    slug: "monochrome-minimal", name: "Monochrome Minimal",
    description: "Pure black-on-white with generous whitespace and hairline rules. Timeless, ATS-safe template for any role.",
    category: "ats-classic", component: MonochromeMinimal,
    atsSafe: true, supportsPhoto: false,
    addedAt: "2026-06-20T12:26:00.000Z",
    suggestedRoles: ["product-manager", "professional", "manager", "analyst", "consultant", "specialist", "coordinator"],
    suggestedIndustries: ["universal", "professional", "corporate"],
    themes: ["mono", "ivory", "slate"],
  },
  {
    slug: "clinical-teal-np", name: "Clinical Teal NP",
    description: "Clean teal medical header with photo, cross motif and credential chips. Clinical template for nurse practitioners.",
    category: "nursing", component: ClinicalTealNP,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-20T12:25:00.000Z",
    suggestedRoles: ["nurse-practitioner", "family-nurse-practitioner", "advanced-practice-nurse", "registered-nurse", "clinical-nurse", "aprn"],
    suggestedIndustries: ["healthcare", "nursing", "medical"],
    themes: ["teal", "ivory", "sage"],
  },
  {
    slug: "apothecary-pharmacist", name: "Apothecary Pharmacist",
    description: "Deep apothecary-green sidebar with a clinical, methodical two-column body. Trusted template for pharmacists.",
    category: "medical", component: ApothecaryPharmacist,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-20T12:24:00.000Z",
    suggestedRoles: ["pharmacist", "clinical-pharmacist", "community-pharmacist", "hospital-pharmacist", "dispensing-pharmacist", "pharmacy-manager"],
    suggestedIndustries: ["pharmacy", "healthcare", "medical"],
    themes: ["forest", "sage", "ivory"],
  },
  {
    slug: "oxblood-litigation", name: "Oxblood Litigation",
    description: "Formal oxblood sidebar with gold crest and serif body. Chambers-ready template for litigators and barristers.",
    category: "legal", component: OxbloodLitigation,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-20T12:23:00.000Z",
    suggestedRoles: ["barrister", "litigator", "litigation-lawyer", "trial-lawyer", "advocate", "commercial-barrister", "civil-litigator"],
    suggestedIndustries: ["legal", "law", "litigation"],
    themes: ["wine", "gold", "charcoal"],
  },
  {
    slug: "community-social-worker", name: "Community Social Worker",
    description: "Warm green rounded header with photo and compassionate card sections. People-centred template for social workers.",
    category: "public-service", component: CommunitySocialWorker,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-20T12:22:00.000Z",
    suggestedRoles: ["social-worker", "clinical-social-worker", "case-manager", "community-worker", "family-support-worker", "child-protection-worker"],
    suggestedIndustries: ["social-work", "community", "public-service"],
    themes: ["forest", "sage", "amber"],
  },
  {
    slug: "skyline-cabin-crew", name: "Skyline Cabin Crew",
    description: "Sky-blue gradient with gold accents, photo and language proficiency bars. Polished template for cabin crew.",
    category: "aviation", component: SkylineCabinCrew,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-20T12:21:00.000Z",
    suggestedRoles: ["cabin-crew", "flight-attendant", "senior-cabin-crew", "air-hostess", "purser", "airline-steward"],
    suggestedIndustries: ["aviation", "airline", "hospitality"],
    themes: ["sky", "gold", "navy"],
  },
  {
    slug: "voltage-electrician", name: "Voltage Electrician",
    description: "Bold black-and-yellow hazard styling with condensed type and ticket chips. High-vis template for electricians.",
    category: "trades-industrial", component: VoltageElectrician,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:20:00.000Z",
    suggestedRoles: ["electrician", "qualified-electrician", "lead-electrician", "industrial-electrician", "electrical-technician", "maintenance-electrician"],
    suggestedIndustries: ["electrical", "trades", "construction"],
    themes: ["amber", "charcoal", "steel"],
  },
  {
    slug: "timeline-video-editor", name: "Timeline Video Editor",
    description: "Dark editor UI with a colourful timeline scrubber and gradient stat tiles. Energetic template for video and motion editors.",
    category: "creator", component: TimelineVideoEditor,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:19:00.000Z",
    suggestedRoles: ["video-editor", "motion-designer", "video-producer", "content-editor", "film-editor", "motion-graphics-designer"],
    suggestedIndustries: ["video", "media", "creative"],
    themes: ["plum", "violet", "blush"],
  },
  {
    slug: "lab-note-scientist", name: "Lab Note Scientist",
    description: "Cobalt header with hex molecule motif and a numbered publications list. Rigorous template for researchers and scientists.",
    category: "science", component: LabNoteScientist,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:18:00.000Z",
    suggestedRoles: ["research-scientist", "scientist", "principal-investigator", "postdoctoral-researcher", "molecular-biologist", "lab-scientist", "research-fellow"],
    suggestedIndustries: ["science", "research", "academia"],
    themes: ["navy", "cobalt", "slate"],
  },
  {
    slug: "swiss-clinical-dentist", name: "Swiss Clinical Dentist",
    description: "Strict Swiss grid in clean sky-blue with a left rule. Precise and ATS-friendly template for dentists.",
    category: "medical", component: SwissClinicalDentist,
    atsSafe: true, supportsPhoto: false,
    addedAt: "2026-06-20T12:17:00.000Z",
    suggestedRoles: ["dentist", "general-dentist", "dental-surgeon", "associate-dentist", "lead-dentist", "dental-practitioner"],
    suggestedIndustries: ["dentistry", "healthcare", "medical"],
    themes: ["sky", "ivory", "slate"],
  },
  {
    slug: "memphis-ux-researcher", name: "Memphis UX Researcher",
    description: "Playful Memphis shapes in coral, yellow and teal with bright pastel cards. Fun template for UX researchers.",
    category: "creative", component: MemphisUXResearcher,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:16:00.000Z",
    suggestedRoles: ["ux-researcher", "user-researcher", "design-researcher", "senior-ux-researcher", "research-lead", "ux-research-specialist"],
    suggestedIndustries: ["design", "research", "product"],
    themes: ["coral", "mint", "blush"],
  },
  {
    slug: "arcade-neon-gamedev", name: "Arcade Neon Gamedev",
    description: "Dark arcade grid with neon magenta and cyan glow and mono code styling. Vibrant template for game developers.",
    category: "game-dev", component: ArcadeNeonGamedev,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:15:00.000Z",
    suggestedRoles: ["game-developer", "gameplay-programmer", "game-programmer", "engine-programmer", "gameplay-engineer", "game-engineer"],
    suggestedIndustries: ["game-development", "software", "gaming"],
    themes: ["plum", "violet", "navy"],
  },
  {
    slug: "art-deco-event-planner", name: "Art Deco Event Planner",
    description: "Emerald-and-gold deco styling with fan motifs and centred serif elegance. Refined template for event planners.",
    category: "hospitality", component: ArtDecoEventPlanner,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:14:00.000Z",
    suggestedRoles: ["event-planner", "event-manager", "wedding-planner", "events-director", "event-coordinator", "conference-planner"],
    suggestedIndustries: ["events", "hospitality", "planning"],
    themes: ["forest", "gold", "ivory"],
  },
  {
    slug: "linguist-translator", name: "Linguist Translator",
    description: "Type-driven and multilingual with elegant dot-scale language proficiency. Elegant template for translators and interpreters.",
    category: "linguist", component: LinguistTranslator,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:13:00.000Z",
    suggestedRoles: ["translator", "interpreter", "conference-interpreter", "linguist", "localization-specialist", "language-specialist"],
    suggestedIndustries: ["translation", "languages", "localization"],
    themes: ["plum", "violet", "ivory"],
  },
  {
    slug: "meadow-veterinarian", name: "Meadow Veterinarian",
    description: "Warm meadow-green header with photo, paw motif and friendly cards. Caring template for veterinary surgeons.",
    category: "veterinary", component: MeadowVeterinarian,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-20T12:12:00.000Z",
    suggestedRoles: ["veterinary-surgeon", "veterinarian", "vet", "small-animal-vet", "veterinary-doctor", "equine-vet"],
    suggestedIndustries: ["veterinary", "animal-care", "healthcare"],
    themes: ["forest", "sage", "amber"],
  },
  {
    slug: "logistics-supply-chain", name: "Logistics Supply Chain",
    description: "Industrial navy-and-orange with a route motif and a four-up KPI dashboard. Metrics-led template for supply chain roles.",
    category: "logistics", component: LogisticsSupplyChain,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:11:00.000Z",
    suggestedRoles: ["supply-chain-manager", "logistics-manager", "procurement-manager", "supply-chain-analyst", "procurement-lead", "operations-planner"],
    suggestedIndustries: ["logistics", "supply-chain", "procurement"],
    themes: ["navy", "orange", "slate"],
  },
  {
    slug: "magazine-copywriter", name: "Magazine Copywriter",
    description: "Editorial magazine spread with a bold pull-quote and a two-column body. Expressive template for copywriters.",
    category: "marketing", component: MagazineCopywriter,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:10:00.000Z",
    suggestedRoles: ["copywriter", "senior-copywriter", "content-writer", "creative-copywriter", "brand-copywriter", "content-strategist"],
    suggestedIndustries: ["copywriting", "marketing", "advertising"],
    themes: ["wine", "ivory", "charcoal"],
  },
  {
    slug: "paramedic-emergency", name: "Paramedic Emergency",
    description: "Bold red-and-charcoal with an ECG pulse line and condensed display type. Urgent template for paramedics and EMS.",
    category: "medical", component: ParamedicEmergency,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:09:00.000Z",
    suggestedRoles: ["paramedic", "emergency-medical-technician", "emt", "lead-paramedic", "ambulance-paramedic", "emergency-care-practitioner"],
    suggestedIndustries: ["emergency-medical", "healthcare", "ems"],
    themes: ["wine", "charcoal", "steel"],
  },
  {
    slug: "nutrition-fresh-dietitian", name: "Nutrition Fresh Dietitian",
    description: "Fresh leaf-green gradient with photo and clean, calm card sections. Bright template for dietitians and nutritionists.",
    category: "medical", component: NutritionFreshDietitian,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-20T12:08:00.000Z",
    suggestedRoles: ["dietitian", "registered-dietitian", "clinical-dietitian", "nutritionist", "community-nutritionist", "sports-dietitian"],
    suggestedIndustries: ["dietetics", "nutrition", "healthcare"],
    themes: ["mint", "forest", "sage"],
  },
  {
    slug: "optometry-precision", name: "Optometry Precision",
    description: "Deep navy with a concentric-lens motif and crisp teal accents. Clinical template for optometrists.",
    category: "medical", component: OptometryPrecision,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:07:00.000Z",
    suggestedRoles: ["optometrist", "eye-doctor", "optician", "ophthalmic-optometrist", "clinical-optometrist", "vision-specialist"],
    suggestedIndustries: ["optometry", "eye-care", "healthcare"],
    themes: ["navy", "teal", "slate"],
  },
  {
    slug: "structural-civil-engineer", name: "Structural Civil Engineer",
    description: "Steel-grey sidebar with amber hazard rule, hex badge and technical bars. Engineering-grade template for civil engineers.",
    category: "manufacturing", component: StructuralCivilEngineer,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:06:00.000Z",
    suggestedRoles: ["civil-engineer", "structural-engineer", "senior-structural-engineer", "structural-civil-engineer", "geotechnical-engineer", "construction-engineer"],
    suggestedIndustries: ["engineering", "construction", "infrastructure"],
    themes: ["slate", "amber", "steel"],
  },
  {
    slug: "interior-atelier", name: "Interior Atelier",
    description: "Warm taupe and terracotta with a photo and a material-palette swatch row. Elegant template for interior designers.",
    category: "creative", component: InteriorAtelier,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-20T12:05:00.000Z",
    suggestedRoles: ["interior-designer", "senior-interior-designer", "interior-architect", "spatial-designer", "design-consultant", "interior-stylist"],
    suggestedIndustries: ["interior-design", "design", "architecture"],
    themes: ["sand", "terracotta", "ivory"],
  },
  {
    slug: "studio-waveform-producer", name: "Studio Waveform Producer",
    description: "Dark studio look with a gradient audio-waveform and orange-violet accents. Atmospheric template for music producers.",
    category: "music", component: StudioWaveformProducer,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:04:00.000Z",
    suggestedRoles: ["music-producer", "mix-engineer", "audio-engineer", "record-producer", "sound-engineer", "mastering-engineer"],
    suggestedIndustries: ["music", "audio", "media"],
    themes: ["plum", "orange", "violet"],
  },
  {
    slug: "cafe-roast-barista", name: "Cafe Roast Barista",
    description: "Warm coffee browns with photo and inviting rounded card sections. Cosy template for baristas and cafe managers.",
    category: "hospitality", component: CafeRoastBarista,
    atsSafe: false, supportsPhoto: true,
    addedAt: "2026-06-20T12:03:00.000Z",
    suggestedRoles: ["barista", "head-barista", "cafe-manager", "coffee-specialist", "cafe-supervisor", "coffee-shop-manager"],
    suggestedIndustries: ["coffee", "hospitality", "food-and-beverage"],
    themes: ["terracotta", "sand", "gold"],
  },
  {
    slug: "sustain-mesh-esg", name: "Sustain Mesh ESG",
    description: "Green-and-teal mesh-gradient header with an impact-metrics stripe. Modern template for sustainability and ESG roles.",
    category: "environmental", component: SustainMeshESG,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:02:00.000Z",
    suggestedRoles: ["sustainability-manager", "head-of-sustainability", "esg-manager", "sustainability-lead", "environmental-manager", "esg-analyst"],
    suggestedIndustries: ["sustainability", "environmental", "esg"],
    themes: ["forest", "teal", "mint"],
  },
  {
    slug: "brutalist-creative-tech", name: "Brutalist Creative Tech",
    description: "Stark neo-brutalist blocks, heavy borders and high-vis yellow. Unapologetic template for creative technologists and devs.",
    category: "developer", component: BrutalistCreativeTech,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:01:00.000Z",
    suggestedRoles: ["creative-technologist", "creative-developer", "front-end-developer", "front-end-engineer", "web-developer", "interactive-developer"],
    suggestedIndustries: ["software", "creative-tech", "technology"],
    themes: ["amber", "charcoal", "mono"],
  },
  {
    slug: "gradient-mesh-growth", name: "Gradient Mesh Growth",
    description: "Vibrant multi-colour mesh-gradient hero with a bold growth-metrics stripe. Punchy template for growth marketers.",
    category: "marketing", component: GradientMeshGrowth,
    atsSafe: false, supportsPhoto: false,
    addedAt: "2026-06-20T12:00:00.000Z",
    suggestedRoles: ["growth-marketer", "growth-marketing-lead", "performance-marketer", "demand-generation-manager", "digital-marketing-manager", "growth-lead"],
    suggestedIndustries: ["marketing", "growth", "saas"],
    themes: ["plum", "blush", "violet"],
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
