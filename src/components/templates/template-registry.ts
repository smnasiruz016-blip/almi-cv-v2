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

// Batch 3 (10)
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

// Batch 4 (7)
import IceBlueGlass from "./IceBlueGlass";
import AdminFluid from "./AdminFluid";
import CyberEmerald from "./CyberEmerald";
import WellnessGolden from "./WellnessGolden";
import MedicalSurgical from "./MedicalSurgical";
import CloudLight from "./CloudLight";
import PharmacyPastel from "./PharmacyPastel";

// Design templates kit
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
  | "legal"
  | "finance"
  | "people-hr"
  | "operations"
  | "insurance"
  | "veterinary"
  | "aviation"
  | "hospitality-elegant"
  | "linguist"
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
  | "culinary"
  | "fitness"
  | "library"
  | "mobile"
  | "nursing"
  | "photography"
  | "portfolio"
  | "executive";

export interface TemplateMeta {
  slug: string;
  name: string;
  description: string;
  tagline?: string;
  category: TemplateCategory;
  component: ComponentType<TemplateProps>;
  atsSafe: boolean;
  supportsPhoto: boolean;
  tier?: "free" | "premium";
  addedAt?: string;
  suggestedRoles: string[];
  suggestedIndustries: string[];
  themes?: string[];
}

const V1_BASE_MS = Date.parse("2026-05-26T00:00:00.000Z");

export function getTier(t: TemplateMeta): "free" | "premium" {
  return t.tier ?? "free";
}

export function getTagline(t: TemplateMeta): string {
  if (t.tagline) return t.tagline;
  const firstSentence = t.description.split(/[.!?](?=\s|$)/)[0]?.trim();
  return firstSentence || t.description;
}

export const TEMPLATES: TemplateMeta[] = [
  {
    slug: "classic-serif",
    name: "Classic Serif",
    description: "Single-column, gold rule accents, Fraunces display. Safest professional choice — also the default fallback.",
    category: "ats-classic",
    component: ClassicSerif,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["accountant", "lawyer", "consultant", "executive-assistant"],
    suggestedIndustries: ["finance", "accounting", "legal", "consulting"],
    themes: ["plum", "navy", "wine", "charcoal"],
  },
  {
    slug: "modern-two-column",
    name: "Modern Two-Column",
    description: "Peach sidebar for contact and skills, coral underline on every section.",
    category: "professional",
    component: ModernTwoColumn,
    atsSafe: true,
    supportsPhoto: true,
    suggestedRoles: ["administrative-assistant", "office-manager", "marketing-manager"],
    suggestedIndustries: ["administration", "marketing", "human-resources"],
    themes: ["coral", "plum", "sand", "linen"],
  },
  {
    slug: "midnight-cyan",
    name: "Midnight Cyan",
    description: "Dark navy canvas, cyan-violet glow, glowing skill bars and mono detailing.",
    category: "developer",
    component: MidnightCyan,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["devops-engineer", "platform-engineer", "site-reliability-engineer", "sre"],
    suggestedIndustries: ["software", "technology", "devops"],
    themes: ["navy", "plum", "forest"],
  },
  {
    slug: "emerald-executive",
    name: "Emerald Executive",
    description: "Deep emerald header, gold rule and Fraunces display for finance leaders.",
    category: "finance",
    component: EmeraldExecutive,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["chief-financial-officer", "cfo", "finance-director", "vp-finance"],
    suggestedIndustries: ["finance", "banking", "executive"],
    themes: ["forest", "ivory", "wine"],
  },
  {
    slug: "tech-minimal",
    name: "Tech Minimal",
    description: "Inter + JetBrains Mono, monospace stack listings, mint underline.",
    category: "developer",
    component: TechMinimal,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["software-engineer", "software-developer", "web-developer"],
    suggestedIndustries: ["technology", "software", "engineering"],
    themes: ["charcoal", "midnight", "slate"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    description: "Forest + sage palette, credential pills, balanced two-column body.",
    category: "medical",
    component: Healthcare,
    atsSafe: true,
    supportsPhoto: true,
    suggestedRoles: ["registered-nurse", "nurse-practitioner", "physician"],
    suggestedIndustries: ["healthcare", "medical", "nursing"],
    themes: ["forest", "linen", "ivory"],
  },
  {
    slug: "creative-director",
    name: "Creative Director",
    description: "Dark plum hero with coral glow, DM Serif Display H1, sidebar card.",
    category: "creative",
    component: CreativeDirector,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["creative-director", "art-director", "design-director"],
    suggestedIndustries: ["design-leadership", "advertising", "fashion", "media"],
    themes: ["plum", "wine", "midnight"],
  },
  {
    slug: "corporate-blue",
    name: "Corporate Blue",
    description: "Navy hero band + clean white body, executive polish.",
    category: "business",
    component: CorporateBlue,
    atsSafe: true,
    supportsPhoto: true,
    suggestedRoles: ["project-manager", "program-manager", "product-manager", "operations-manager"],
    suggestedIndustries: ["business", "management", "operations"],
    themes: ["navy", "sky", "slate", "plum"],
  },
  {
    slug: "sales-modern",
    name: "Sales Modern",
    description: "Orange→pink gradient hero, KPI tiles overlapping.",
    category: "sales",
    component: SalesModern,
    atsSafe: true,
    supportsPhoto: true,
    suggestedRoles: ["sales-representative", "account-executive", "sales-manager"],
    suggestedIndustries: ["sales", "business-development"],
    themes: ["coral", "plum", "wine"],
  },
  {
    slug: "monochrome-minimal",
    name: "Monochrome Minimal",
    description: "Pure black-on-white with generous whitespace and hairline rules.",
    category: "ats-classic",
    component: MonochromeMinimal,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["product-manager", "professional", "manager", "analyst"],
    suggestedIndustries: ["universal", "professional", "corporate"],
    themes: ["mono", "ivory", "slate"],
  }
];

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

export function getAllRoleMappings(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const t of TEMPLATES) {
    for (const role of t.suggestedRoles) {
      if (!map[role]) map[role] = t.slug;
    }
  }
  return map;
}

export function getCoveredRoleCount(): number {
  const seen = new Set<string>();
  for (const t of TEMPLATES) for (const r of t.suggestedRoles) seen.add(r);
  return seen.size;
}
