import type { ComponentType } from "react";
import type { TemplateProps } from "./types";

// Core Popular & Professional Templates (Direct Imports - 0% Error Risk)
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
  // --------------------------------------------------------------------------
  // ALL POPULAR & ORIGINAL TEMPLATES (Full Catalog Restored)
  // --------------------------------------------------------------------------
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
    description: "Peach sidebar for contact and skills, coral underline on every section. Built for marketing, admin, HR, and office roles.",
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
    description: "Deep emerald header, gold rule and Fraunces display for finance leaders and the C-suite.",
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
    suggestedRoles: ["project-manager", "program-manager", "product-manager"],
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
  },
  {
    slug: "royal-blue-corporate",
    name: "Royal Blue Corporate",
    description: "Classic blue sidebar with photo, skill bars and contact over clean white body.",
    category: "business",
    component: RoyalBlueCorporate,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["operations-manager", "business-manager", "general-manager"],
    suggestedIndustries: ["business", "operations", "corporate"],
    themes: ["navy", "royal", "slate"],
  },
  {
    slug: "rose-editorial",
    name: "Rose Editorial",
    description: "Elegant blush palette, DM Serif Display and a centred editorial masthead.",
    category: "marketing",
    component: RoseEditorial,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["marketing-manager", "brand-manager", "communications-manager"],
    suggestedIndustries: ["marketing", "branding", "communications"],
    themes: ["blush", "wine", "rose"],
  },
  {
    slug: "wine-legal",
    name: "Wine Legal",
    description: "Refined wine-and-serif classic with centred headings. ATS-safe for lawyers.",
    category: "legal",
    component: WineLegal,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["lawyer", "corporate-counsel", "attorney"],
    suggestedIndustries: ["legal", "law", "corporate"],
    themes: ["wine", "ivory", "forest"],
  },
  {
    slug: "coral-sunset",
    name: "Coral Sunset",
    description: "Full-bleed coral-to-plum gradient hero, hexagon monogram and gradient skill bars.",
    category: "education-warm",
    component: CoralSunset,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["teacher", "secondary-school-teacher", "primary-school-teacher"],
    suggestedIndustries: ["education", "teaching", "schools"],
    themes: ["coral", "plum", "sunset"],
  },
  {
    slug: "sage-watercolor",
    name: "Sage Watercolor",
    description: "Soft sage and peach watercolour washes, circular photo and calm credential chips.",
    category: "nursing",
    component: SageWatercolor,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["registered-nurse", "nurse", "midwife"],
    suggestedIndustries: ["healthcare", "nursing", "medical"],
    themes: ["sage", "ivory", "blush"],
  },
  {
    slug: "violet-glass",
    name: "Violet Glass",
    description: "Violet-to-pink gradient with frosted glass cards and an impact-metrics strip.",
    category: "creative",
    component: VioletGlass,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["product-designer", "ux-designer", "ui-designer"],
    suggestedIndustries: ["design", "product", "technology"],
    themes: ["plum", "blush", "violet"],
  },
  {
    slug: "retro-modern",
    name: "Retro Modern",
    description: "Bold retro blocks in burnt orange, gold and ink with chunky Archivo display.",
    category: "creative",
    component: RetroModern,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["art-director", "brand-director", "creative-director"],
    suggestedIndustries: ["creative", "branding", "advertising"],
    themes: ["orange", "sunset", "sand"],
  },
  {
    slug: "geometric-abstract",
    name: "Geometric Abstract",
    description: "Angular teal, yellow and coral shapes framing a crisp two-column layout.",
    category: "creative",
    component: GeometricAbstract,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["graphic-designer", "visual-designer", "illustrator"],
    suggestedIndustries: ["design", "creative", "media"],
    themes: ["teal", "mint", "coral"],
  },
  {
    slug: "slate-mono-data",
    name: "Slate Mono Data",
    description: "Monospace terminal styling, teal accents, metric tiles and a mini bar chart.",
    category: "web-analytics",
    component: SlateMonoData,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["data-analyst", "business-intelligence-analyst", "bi-developer"],
    suggestedIndustries: ["data", "analytics", "technology"],
    themes: ["slate", "teal", "navy"],
  },
  {
    slug: "charcoal-timeline",
    name: "Charcoal Timeline",
    description: "Charcoal header with an amber vertical timeline tracing the career path.",
    category: "operations",
    component: CharcoalTimeline,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["project-manager", "programme-manager", "scrum-master"],
    suggestedIndustries: ["project-management", "operations", "consulting"],
    themes: ["slate", "amber", "charcoal"],
  },
  {
    slug: "terracotta-caregiver",
    name: "Terracotta Caregiver",
    description: "Warm terracotta with a soft rounded header, photo and friendly cards.",
    category: "caregiving",
    component: TerracottaCaregiver,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["care-assistant", "support-worker", "healthcare-assistant"],
    suggestedIndustries: ["care", "social-care", "healthcare"],
    themes: ["terracotta", "sand", "blush"],
  },
  {
    slug: "ocean-teal-sales",
    name: "Ocean Teal Sales",
    description: "Teal gradient header over a bold metrics stripe built to show numbers.",
    category: "sales",
    component: OceanTealSales,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["sales-manager", "business-development-manager", "account-executive"],
    suggestedIndustries: ["sales", "business-development", "saas"],
    themes: ["teal", "ocean", "navy"],
  },
  {
    slug: "holographic-iridescent",
    name: "Holographic Iridescent",
    description: "Iridescent pink-to-mint gradient over a dark canvas with gradient stat tiles.",
    category: "photography",
    component: HolographicIridescent,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["photographer", "visual-artist", "commercial-photographer"],
    suggestedIndustries: ["photography", "creative", "media"],
    themes: ["plum", "violet", "blush"],
  },
  {
    slug: "isometric-indigo",
    name: "Isometric Indigo",
    description: "Indigo grid hero with isometric 3D cubes, glowing skill bars and dark panels.",
    category: "developer",
    component: IsometricIndigo,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["cloud-architect", "solutions-architect", "devops-engineer"],
    suggestedIndustries: ["software", "cloud", "technology"],
    themes: ["navy", "plum", "slate"],
  },
  {
    slug: "forest-trades",
    name: "Forest Trades",
    description: "Sturdy forest-green and safety-amber with a hazard stripe and condensed type.",
    category: "trades-industrial",
    component: ForestTrades,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["site-manager", "construction-manager", "site-foreman"],
    suggestedIndustries: ["construction", "trades", "building"],
    themes: ["forest", "amber", "sand"],
  },
  {
    slug: "sunny-hospitality",
    name: "Sunny Hospitality",
    description: "Warm amber sunrise header with photo and friendly rounded card sections.",
    category: "hospitality",
    component: SunnyHospitality,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["hotel-manager", "front-office-manager", "hospitality-manager"],
    suggestedIndustries: ["hospitality", "hotels", "tourism"],
    themes: ["amber", "coral", "sand"],
  },
  {
    slug: "fresh-graduate-mint",
    name: "Fresh Graduate Mint",
    description: "Bright mint, education-first layout with space for awards. Built for students.",
    category: "professional",
    component: FreshGraduateMint,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["graduate", "student", "intern", "entry-level"],
    suggestedIndustries: ["graduate", "entry-level", "early-career"],
    themes: ["mint", "sage", "ivory"],
  },
  {
    slug: "blueprint-architect",
    name: "Blueprint Architect",
    description: "Navy blueprint grid header with mono numbering and a technical two-column body.",
    category: "creative",
    component: BlueprintArchitect,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["architect", "project-architect", "architectural-designer"],
    suggestedIndustries: ["architecture", "design", "construction"],
    themes: ["navy", "slate", "royal"],
  },
  {
    slug: "dark-luxe-gold",
    name: "Dark Luxe Gold",
    description: "Near-black with a gold hairline frame and centred serif. Quietly premium.",
    category: "business",
    component: DarkLuxeGold,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["management-consultant", "strategy-consultant", "partner"],
    suggestedIndustries: ["consulting", "strategy", "executive"],
    themes: ["charcoal", "gold", "wine"],
  },
  {
    slug: "customer-service-coral",
    name: "Customer Service Coral",
    description: "Friendly coral sidebar with photo, skill bars and a metrics stripe.",
    category: "customer-support",
    component: CustomerServiceCoral,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["customer-service-representative", "customer-success-specialist"],
    suggestedIndustries: ["customer-service", "support", "saas"],
    themes: ["coral", "blush", "sand"],
  },
  {
    slug: "ledger-accountant",
    name: "Ledger Accountant",
    description: "Double-rule ledger styling in forest green with tabular figures.",
    category: "finance",
    component: LedgerAccountant,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["accountant", "chartered-accountant", "cpa"],
    suggestedIndustries: ["accounting", "finance", "audit"],
    themes: ["forest", "ivory", "sage"],
  },
  {
    slug: "hr-people",
    name: "HR People",
    description: "Warm purple header with photo and soft lavender cards.",
    category: "people-hr",
    component: HRPeople,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["hr-business-partner", "hr-manager", "recruiter"],
    suggestedIndustries: ["human-resources", "people", "recruiting"],
    themes: ["plum", "violet", "blush"],
  },
  {
    slug: "culinary-menu",
    name: "Culinary Menu",
    description: "Dark menu-card styling with ember red, dotted leaders and a gold frame.",
    category: "culinary",
    component: CulinaryMenu,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["executive-chef", "head-chef", "chef"],
    suggestedIndustries: ["culinary", "restaurants", "hospitality"],
    themes: ["charcoal", "wine", "gold"],
  },
  {
    slug: "real-estate-navy",
    name: "Real Estate Navy",
    description: "Polished navy-and-gold with photo and a sales-volume metrics stripe.",
    category: "real-estate",
    component: RealEstateNavy,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["real-estate-agent", "realtor", "estate-agent"],
    suggestedIndustries: ["real-estate", "property", "sales"],
    themes: ["navy", "gold", "slate"],
  },
  {
    slug: "fitness-coach",
    name: "Fitness Coach",
    description: "High-energy black with electric-lime accents, condensed type and big stats.",
    category: "fitness",
    component: FitnessCoach,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["fitness-coach", "personal-trainer", "strength-coach"],
    suggestedIndustries: ["fitness", "coaching", "sports"],
    themes: ["lime", "charcoal", "forest"],
  },
  {
    slug: "journalist-column",
    name: "Journalist Column",
    description: "Newspaper masthead, drop-cap lead and a two-column body.",
    category: "creative",
    component: JournalistColumn,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["journalist", "reporter", "editor"],
    suggestedIndustries: ["journalism", "media", "publishing"],
    themes: ["charcoal", "ivory", "slate"],
  },
  {
    slug: "mechanical-engineer",
    name: "Mechanical Engineer",
    description: "Steel-blue sidebar with orange accents, mono labels and technical skill bars.",
    category: "manufacturing",
    component: MechanicalEngineer,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["mechanical-engineer", "design-engineer", "product-engineer"],
    suggestedIndustries: ["engineering", "manufacturing", "automotive"],
    themes: ["slate", "amber", "steel"],
  },
  {
    slug: "clinical-teal-np",
    name: "Clinical Teal NP",
    description: "Clean teal medical header with photo, cross motif and credential chips.",
    category: "nursing",
    component: ClinicalTealNP,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["nurse-practitioner", "advanced-practice-nurse", "registered-nurse"],
    suggestedIndustries: ["healthcare", "nursing", "medical"],
    themes: ["teal", "ivory", "sage"],
  },
  {
    slug: "apothecary-pharmacist",
    name: "Apothecary Pharmacist",
    description: "Deep apothecary-green sidebar with a clinical, methodical two-column body.",
    category: "medical",
    component: ApothecaryPharmacist,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["pharmacist", "clinical-pharmacist", "pharmacy-manager"],
    suggestedIndustries: ["pharmacy", "healthcare", "medical"],
    themes: ["forest", "sage", "ivory"],
  },
  {
    slug: "oxblood-litigation",
    name: "Oxblood Litigation",
    description: "Formal oxblood sidebar with gold crest and serif body.",
    category: "legal",
    component: OxbloodLitigation,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["barrister", "litigator", "trial-lawyer"],
    suggestedIndustries: ["legal", "law", "litigation"],
    themes: ["wine", "gold", "charcoal"],
  },
  {
    slug: "community-social-worker",
    name: "Community Social Worker",
    description: "Warm green rounded header with photo and compassionate card sections.",
    category: "public-service",
    component: CommunitySocialWorker,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["social-worker", "case-manager", "community-worker"],
    suggestedIndustries: ["social-work", "community", "public-service"],
    themes: ["forest", "sage", "amber"],
  },
  {
    slug: "skyline-cabin-crew",
    name: "Skyline Cabin Crew",
    description: "Sky-blue gradient with gold accents, photo and language proficiency bars.",
    category: "aviation",
    component: SkylineCabinCrew,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["cabin-crew", "flight-attendant", "purser"],
    suggestedIndustries: ["aviation", "airline", "hospitality"],
    themes: ["sky", "gold", "navy"],
  },
  {
    slug: "voltage-electrician",
    name: "Voltage Electrician",
    description: "Bold black-and-yellow hazard styling with condensed type and ticket chips.",
    category: "trades-industrial",
    component: VoltageElectrician,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["electrician", "electrical-technician"],
    suggestedIndustries: ["electrical", "trades", "construction"],
    themes: ["amber", "charcoal", "steel"],
  },
  {
    slug: "timeline-video-editor",
    name: "Timeline Video Editor",
    description: "Dark editor UI with a colourful timeline scrubber and gradient stat tiles.",
    category: "creator",
    component: TimelineVideoEditor,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["video-editor", "motion-designer", "video-producer"],
    suggestedIndustries: ["video", "media", "creative"],
    themes: ["plum", "violet", "blush"],
  },
  {
    slug: "lab-note-scientist",
    name: "Lab Note Scientist",
    description: "Cobalt header with hex molecule motif and a numbered publications list.",
    category: "science",
    component: LabNoteScientist,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["research-scientist", "scientist", "postdoctoral-researcher"],
    suggestedIndustries: ["science", "research", "academia"],
    themes: ["navy", "cobalt", "slate"],
  },
  {
    slug: "swiss-clinical-dentist",
    name: "Swiss Clinical Dentist",
    description: "Strict Swiss grid in clean sky-blue with a left rule. Precise and ATS-friendly.",
    category: "medical",
    component: SwissClinicalDentist,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["dentist", "dental-surgeon", "orthodontist"],
    suggestedIndustries: ["dentistry", "healthcare", "medical"],
    themes: ["sky", "ivory", "slate"],
  },
  {
    slug: "memphis-ux-researcher",
    name: "Memphis UX Researcher",
    description: "Playful Memphis shapes in coral, yellow and teal with bright pastel cards.",
    category: "creative",
    component: MemphisUXResearcher,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["ux-researcher", "user-researcher", "design-researcher"],
    suggestedIndustries: ["design", "research", "product"],
    themes: ["coral", "mint", "blush"],
  },
  {
    slug: "arcade-neon-gamedev",
    name: "Arcade Neon Gamedev",
    description: "Dark arcade grid with neon magenta and cyan glow and mono code styling.",
    category: "game-dev",
    component: ArcadeNeonGamedev,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["game-developer", "gameplay-programmer", "game-programmer"],
    suggestedIndustries: ["game-development", "software", "gaming"],
    themes: ["plum", "violet", "navy"],
  },
  {
    slug: "art-deco-event-planner",
    name: "Art Deco Event Planner",
    description: "Emerald-and-gold deco styling with fan motifs and centred serif elegance.",
    category: "hospitality",
    component: ArtDecoEventPlanner,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["event-planner", "event-manager", "wedding-planner"],
    suggestedIndustries: ["events", "hospitality", "planning"],
    themes: ["forest", "gold", "ivory"],
  },
  {
    slug: "linguist-translator",
    name: "Linguist Translator",
    description: "Type-driven and multilingual with elegant dot-scale language proficiency.",
    category: "linguist",
    component: LinguistTranslator,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["translator", "interpreter", "linguist"],
    suggestedIndustries: ["translation", "languages", "localization"],
    themes: ["plum", "violet", "ivory"],
  },
  {
    slug: "meadow-veterinarian",
    name: "Meadow Veterinarian",
    description: "Warm meadow-green header with photo, paw motif and friendly cards.",
    category: "veterinary",
    component: MeadowVeterinarian,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["veterinary-surgeon", "veterinarian", "vet"],
    suggestedIndustries: ["veterinary", "animal-care", "healthcare"],
    themes: ["forest", "sage", "amber"],
  },
  {
    slug: "logistics-supply-chain",
    name: "Logistics Supply Chain",
    description: "Industrial navy-and-orange with a route motif and a four-up KPI dashboard.",
    category: "logistics",
    component: LogisticsSupplyChain,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["supply-chain-manager", "logistics-manager", "procurement-manager"],
    suggestedIndustries: ["logistics", "supply-chain", "procurement"],
    themes: ["navy", "orange", "slate"],
  },
  {
    slug: "magazine-copywriter",
    name: "Magazine Copywriter",
    description: "Editorial magazine spread with a bold pull-quote and a two-column body.",
    category: "marketing",
    component: MagazineCopywriter,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["copywriter", "senior-copywriter", "content-writer"],
    suggestedIndustries: ["copywriting", "marketing", "advertising"],
    themes: ["wine", "ivory", "charcoal"],
  },
  {
    slug: "paramedic-emergency",
    name: "Paramedic Emergency",
    description: "Bold red-and-charcoal with an ECG pulse line and condensed display type.",
    category: "medical",
    component: ParamedicEmergency,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["paramedic", "emt", "emergency-medical-technician"],
    suggestedIndustries: ["emergency-medical", "healthcare", "ems"],
    themes: ["wine", "charcoal", "steel"],
  },
  {
    slug: "nutrition-fresh-dietitian",
    name: "Nutrition Fresh Dietitian",
    description: "Fresh leaf-green gradient with photo and clean, calm card sections.",
    category: "medical",
    component: NutritionFreshDietitian,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["dietitian", "nutritionist", "clinical-dietitian"],
    suggestedIndustries: ["dietetics", "nutrition", "healthcare"],
    themes: ["mint", "forest", "sage"],
  },
  {
    slug: "optometry-precision",
    name: "Optometry Precision",
    description: "Deep navy with a concentric-lens motif and crisp teal accents.",
    category: "medical",
    component: OptometryPrecision,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["optometrist", "eye-doctor", "optician"],
    suggestedIndustries: ["optometry", "eye-care", "healthcare"],
    themes: ["navy", "teal", "slate"],
  },
  {
    slug: "structural-civil-engineer",
    name: "Structural Civil Engineer",
    description: "Steel-grey sidebar with amber hazard rule, hex badge and technical bars.",
    category: "manufacturing",
    component: StructuralCivilEngineer,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["civil-engineer", "structural-engineer", "geotechnical-engineer"],
    suggestedIndustries: ["engineering", "construction", "infrastructure"],
    themes: ["slate", "amber", "steel"],
  },
  {
    slug: "interior-atelier",
    name: "Interior Atelier",
    description: "Warm taupe and terracotta with a photo and a material-palette swatch row.",
    category: "creative",
    component: InteriorAtelier,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["interior-designer", "interior-architect", "spatial-designer"],
    suggestedIndustries: ["interior-design", "design", "architecture"],
    themes: ["sand", "terracotta", "ivory"],
  },
  {
    slug: "studio-waveform-producer",
    name: "Studio Waveform Producer",
    description: "Dark studio look with a gradient audio-waveform and orange-violet accents.",
    category: "music",
    component: StudioWaveformProducer,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["music-producer", "mix-engineer", "audio-engineer"],
    suggestedIndustries: ["music", "audio", "media"],
    themes: ["plum", "orange", "violet"],
  },
  {
    slug: "cafe-roast-barista",
    name: "Cafe Roast Barista",
    description: "Warm coffee browns with photo and inviting rounded card sections.",
    category: "hospitality",
    component: CafeRoastBarista,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["barista", "cafe-manager", "coffee-specialist"],
    suggestedIndustries: ["coffee", "hospitality", "food-and-beverage"],
    themes: ["terracotta", "sand", "gold"],
  },
  {
    slug: "sustain-mesh-esg",
    name: "Sustain Mesh ESG",
    description: "Green-and-teal mesh-gradient header with an impact-metrics stripe.",
    category: "environmental",
    component: SustainMeshESG,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["sustainability-manager", "esg-manager", "environmental-manager"],
    suggestedIndustries: ["sustainability", "environmental", "esg"],
    themes: ["forest", "teal", "mint"],
  },
  {
    slug: "brutalist-creative-tech",
    name: "Brutalist Creative Tech",
    description: "Stark neo-brutalist blocks, heavy borders and high-vis yellow.",
    category: "developer",
    component: BrutalistCreativeTech,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["creative-technologist", "creative-developer", "front-end-engineer"],
    suggestedIndustries: ["software", "creative-tech", "technology"],
    themes: ["amber", "charcoal", "mono"],
  },
  {
    slug: "gradient-mesh-growth",
    name: "Gradient Mesh Growth",
    description: "Vibrant multi-colour mesh-gradient hero with a bold growth-metrics stripe.",
    category: "marketing",
    component: GradientMeshGrowth,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["growth-marketer", "performance-marketer", "demand-generation-manager"],
    suggestedIndustries: ["marketing", "growth", "saas"],
    themes: ["plum", "blush", "violet"],
  },
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
