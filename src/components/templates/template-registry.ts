import type { ComponentType } from "react";
import type { TemplateProps } from "./types";

// Core Popular & Professional Templates (Direct Clean Imports - 0% Error Risk)
import ClassicSerif from "./ClassicSerif";
import ModernTwoColumn from "./ModernTwoColumn";
import TechMinimal from "./TechMinimal";
import Healthcare from "./Healthcare";
import CreativeDirector from "./CreativeDirector";
import Academic from "./Academic";
import CorporateBlue from "./CorporateBlue";
import SalesModern from "./SalesModern";
import MonochromeMinimal from "./MonochromeMinimal";
import MidnightCyan from "./MidnightCyan";
import EmeraldExecutive from "./EmeraldExecutive";
import RoyalBlueCorporate from "./RoyalBlueCorporate";
import RoseEditorial from "./RoseEditorial";
import WineLegal from "./WineLegal";
import CoralSunset from "./CoralSunset";
import SageWatercolor from "./SageWatercolor";
import VioletGlass from "./VioletGlass";
import RetroModern from "./RetroModern";
import GeometricAbstract from "./GeometricAbstract";
import SlateMonoData from "./SlateMonoData";
import CharcoalTimeline from "./CharcoalTimeline";
import TerracottaCaregiver from "./TerracottaCaregiver";
import OceanTealSales from "./OceanTealSales";
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
  | "business"
  | "hospitality"
  | "sales"
  | "service"
  | "legal"
  | "finance"
  | "people-hr"
  | "beauty"
  | "portfolio"
  | "executive"
  | "marketing"
  | "aviation"
  | "real-estate"
  | "manufacturing"
  | "public-service"
  | "trades-industrial"
  | "creator"
  | "music"
  | "environmental";

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
    description: "Single-column, gold rule accents, Fraunces display. Safest professional choice.",
    category: "ats-classic",
    component: ClassicSerif,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["accountant", "lawyer", "consultant"],
    suggestedIndustries: ["finance", "legal"],
    themes: ["plum", "navy", "wine"],
  },
  {
    slug: "modern-two-column",
    name: "Modern Two-Column",
    description: "Peach sidebar for contact and skills, coral underline on every section.",
    category: "professional",
    component: ModernTwoColumn,
    atsSafe: true,
    supportsPhoto: true,
    suggestedRoles: ["administrative-assistant", "office-manager"],
    suggestedIndustries: ["administration", "marketing"],
    themes: ["coral", "plum", "sand"],
  },
  {
    slug: "midnight-cyan",
    name: "Midnight Cyan",
    description: "Dark navy canvas, cyan-violet glow, glowing skill bars and mono detailing.",
    category: "developer",
    component: MidnightCyan,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["devops-engineer", "sre"],
    suggestedIndustries: ["software", "devops"],
    themes: ["navy", "plum"],
  },
  {
    slug: "emerald-executive",
    name: "Emerald Executive",
    description: "Deep emerald header, gold rule and Fraunces display for finance leaders.",
    category: "finance",
    component: EmeraldExecutive,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["cfo", "finance-director"],
    suggestedIndustries: ["finance", "banking"],
    themes: ["forest", "ivory", "wine"],
  },
  {
    slug: "tech-minimal",
    name: "Tech Minimal",
    description: "Inter + JetBrains Mono, monospace stack listings.",
    category: "developer",
    component: TechMinimal,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["software-engineer", "web-developer"],
    suggestedIndustries: ["technology", "software"],
    themes: ["charcoal", "slate"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    description: "Forest + sage palette, credential pills, balanced two-column body.",
    category: "medical",
    component: Healthcare,
    atsSafe: true,
    supportsPhoto: true,
    suggestedRoles: ["registered-nurse", "physician"],
    suggestedIndustries: ["healthcare", "medical"],
    themes: ["forest", "linen"],
  },
  {
    slug: "creative-director",
    name: "Creative Director",
    description: "Dark plum hero with coral glow, sidebar card.",
    category: "creative",
    component: CreativeDirector,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["creative-director", "art-director"],
    suggestedIndustries: ["advertising", "media"],
    themes: ["plum", "wine"],
  },
  {
    slug: "corporate-blue",
    name: "Corporate Blue",
    description: "Navy hero band + clean white body, executive polish.",
    category: "business",
    component: CorporateBlue,
    atsSafe: true,
    supportsPhoto: true,
    suggestedRoles: ["project-manager", "product-manager"],
    suggestedIndustries: ["business", "management"],
    themes: ["navy", "sky"],
  },
  {
    slug: "sales-modern",
    name: "Sales Modern",
    description: "Orange-pink gradient hero, KPI tiles overlapping.",
    category: "sales",
    component: SalesModern,
    atsSafe: true,
    supportsPhoto: true,
    suggestedRoles: ["sales-representative", "account-executive"],
    suggestedIndustries: ["sales"],
    themes: ["coral", "plum"],
  },
  {
    slug: "monochrome-minimal",
    name: "Monochrome Minimal",
    description: "Pure black-on-white with generous whitespace.",
    category: "ats-classic",
    component: MonochromeMinimal,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["product-manager", "analyst"],
    suggestedIndustries: ["corporate"],
    themes: ["mono", "slate"],
  },
  {
    slug: "royal-blue-corporate",
    name: "Royal Blue Corporate",
    description: "Classic blue sidebar with photo and skill bars.",
    category: "business",
    component: RoyalBlueCorporate,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["operations-manager", "general-manager"],
    suggestedIndustries: ["operations", "corporate"],
    themes: ["navy", "royal"],
  },
  {
    slug: "rose-editorial",
    name: "Rose Editorial",
    description: "Elegant blush palette, DM Serif Display and centered masthead.",
    category: "marketing",
    component: RoseEditorial,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["marketing-manager", "brand-manager"],
    suggestedIndustries: ["marketing", "communications"],
    themes: ["blush", "wine"],
  },
  {
    slug: "wine-legal",
    name: "Wine Legal",
    description: "Refined wine-and-serif classic with centred headings.",
    category: "legal",
    component: WineLegal,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["lawyer", "attorney"],
    suggestedIndustries: ["legal", "corporate"],
    themes: ["wine", "ivory"],
  },
  {
    slug: "coral-sunset",
    name: "Coral Sunset",
    description: "Full-bleed coral-to-plum gradient hero, hexagon monogram.",
    category: "scholarly",
    component: CoralSunset,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["teacher", "lecturer"],
    suggestedIndustries: ["education"],
    themes: ["coral", "plum"],
  },
  {
    slug: "sage-watercolor",
    name: "Sage Watercolor",
    description: "Soft sage and peach watercolour washes, circular photo.",
    category: "medical",
    component: SageWatercolor,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["registered-nurse", "midwife"],
    suggestedIndustries: ["healthcare", "nursing"],
    themes: ["sage", "blush"],
  },
  {
    slug: "violet-glass",
    name: "Violet Glass",
    description: "Violet-to-pink gradient with frosted glass cards.",
    category: "creative",
    component: VioletGlass,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["product-designer", "ux-designer"],
    suggestedIndustries: ["design", "technology"],
    themes: ["plum", "violet"],
  },
  {
    slug: "retro-modern",
    name: "Retro Modern",
    description: "Bold retro blocks in burnt orange, gold and ink.",
    category: "creative",
    component: RetroModern,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["art-director", "brand-director"],
    suggestedIndustries: ["creative", "advertising"],
    themes: ["orange", "sand"],
  },
  {
    slug: "geometric-abstract",
    name: "Geometric Abstract",
    description: "Angular teal, yellow and coral shapes framing crisp layout.",
    category: "creative",
    component: GeometricAbstract,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["graphic-designer", "illustrator"],
    suggestedIndustries: ["design", "media"],
    themes: ["teal", "mint"],
  },
  {
    slug: "slate-mono-data",
    name: "Slate Mono Data",
    description: "Monospace terminal styling, teal accents, metric tiles.",
    category: "developer",
    component: SlateMonoData,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["data-analyst", "bi-developer"],
    suggestedIndustries: ["data", "analytics"],
    themes: ["slate", "teal"],
  },
  {
    slug: "charcoal-timeline",
    name: "Charcoal Timeline",
    description: "Charcoal header with an amber vertical timeline.",
    category: "business",
    component: CharcoalTimeline,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["project-manager", "scrum-master"],
    suggestedIndustries: ["project-management", "operations"],
    themes: ["slate", "amber"],
  },
  {
    slug: "terracotta-caregiver",
    name: "Terracotta Caregiver",
    description: "Warm terracotta with a soft rounded header and photo.",
    category: "medical",
    component: TerracottaCaregiver,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["care-assistant", "support-worker"],
    suggestedIndustries: ["care", "healthcare"],
    themes: ["terracotta", "sand"],
  },
  {
    slug: "ocean-teal-sales",
    name: "Ocean Teal Sales",
    description: "Teal gradient header over a bold metrics stripe.",
    category: "sales",
    component: OceanTealSales,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["sales-manager", "account-executive"],
    suggestedIndustries: ["sales", "saas"],
    themes: ["teal", "navy"],
  },
  {
    slug: "holographic-iridescent",
    name: "Holographic Iridescent",
    description: "Iridescent gradient over dark canvas with stat tiles.",
    category: "creative",
    component: HolographicIridescent,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["photographer", "visual-artist"],
    suggestedIndustries: ["photography", "media"],
    themes: ["plum", "violet"],
  },
  {
    slug: "isometric-indigo",
    name: "Isometric Indigo",
    description: "Indigo grid hero with isometric 3D cubes.",
    category: "developer",
    component: IsometricIndigo,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["cloud-architect", "solutions-architect"],
    suggestedIndustries: ["software", "cloud"],
    themes: ["navy", "plum"],
  },
  {
    slug: "forest-trades",
    name: "Forest Trades",
    description: "Sturdy forest-green and safety-amber with hazard stripe.",
    category: "trades-industrial",
    component: ForestTrades,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["site-manager", "construction-manager"],
    suggestedIndustries: ["construction", "trades"],
    themes: ["forest", "amber"],
  },
  {
    slug: "sunny-hospitality",
    name: "Sunny Hospitality",
    description: "Warm amber sunrise header with photo and friendly cards.",
    category: "hospitality",
    component: SunnyHospitality,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["hotel-manager", "hospitality-manager"],
    suggestedIndustries: ["hospitality", "tourism"],
    themes: ["amber", "coral"],
  },
  {
    slug: "fresh-graduate-mint",
    name: "Fresh Graduate Mint",
    description: "Bright mint, education-first layout with space for awards.",
    category: "scholarly",
    component: FreshGraduateMint,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["graduate", "student", "intern"],
    suggestedIndustries: ["graduate", "early-career"],
    themes: ["mint", "sage"],
  },
  {
    slug: "blueprint-architect",
    name: "Blueprint Architect",
    description: "Navy blueprint grid header with mono numbering.",
    category: "creative",
    component: BlueprintArchitect,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["architect", "project-architect"],
    suggestedIndustries: ["architecture", "construction"],
    themes: ["navy", "slate"],
  },
  {
    slug: "dark-luxe-gold",
    name: "Dark Luxe Gold",
    description: "Near-black with a gold hairline frame and centred serif.",
    category: "business",
    component: DarkLuxeGold,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["management-consultant", "strategy-consultant"],
    suggestedIndustries: ["consulting", "strategy"],
    themes: ["charcoal", "gold"],
  },
  {
    slug: "customer-service-coral",
    name: "Customer Service Coral",
    description: "Friendly coral sidebar with photo, skill bars and metrics.",
    category: "service",
    component: CustomerServiceCoral,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["customer-service-representative", "customer-success-specialist"],
    suggestedIndustries: ["customer-service", "support"],
    themes: ["coral", "blush"],
  },
  {
    slug: "ledger-accountant",
    name: "Ledger Accountant",
    description: "Double-rule ledger styling in forest green.",
    category: "finance",
    component: LedgerAccountant,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["accountant", "chartered-accountant"],
    suggestedIndustries: ["accounting", "finance"],
    themes: ["forest", "sage"],
  },
  {
    slug: "hr-people",
    name: "HR People",
    description: "Warm purple header with photo and soft lavender cards.",
    category: "people-hr",
    component: HRPeople,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["hr-business-partner", "hr-manager"],
    suggestedIndustries: ["human-resources", "recruiting"],
    themes: ["plum", "violet"],
  },
  {
    slug: "culinary-menu",
    name: "Culinary Menu",
    description: "Dark menu-card styling with ember red, dotted leaders.",
    category: "hospitality",
    component: CulinaryMenu,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["executive-chef", "head-chef"],
    suggestedIndustries: ["culinary", "restaurants"],
    themes: ["charcoal", "wine"],
  },
  {
    slug: "real-estate-navy",
    name: "Real Estate Navy",
    description: "Polished navy-and-gold with photo and sales volume stripe.",
    category: "real-estate",
    component: RealEstateNavy,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["real-estate-agent", "realtor"],
    suggestedIndustries: ["real-estate", "sales"],
    themes: ["navy", "gold"],
  },
  {
    slug: "fitness-coach",
    name: "Fitness Coach",
    description: "High-energy black with electric-lime accents and stats.",
    category: "sales",
    component: FitnessCoach,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["fitness-coach", "personal-trainer"],
    suggestedIndustries: ["fitness", "sports"],
    themes: ["lime", "charcoal"],
  },
  {
    slug: "journalist-column",
    name: "Journalist Column",
    description: "Newspaper masthead, drop-cap lead and two-column body.",
    category: "creative",
    component: JournalistColumn,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["journalist", "reporter", "editor"],
    suggestedIndustries: ["journalism", "publishing"],
    themes: ["charcoal", "slate"],
  },
  {
    slug: "mechanical-engineer",
    name: "Mechanical Engineer",
    description: "Steel-blue sidebar with orange accents and technical bars.",
    category: "manufacturing",
    component: MechanicalEngineer,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["mechanical-engineer", "design-engineer"],
    suggestedIndustries: ["engineering", "manufacturing"],
    themes: ["slate", "amber"],
  },
  {
    slug: "clinical-teal-np",
    name: "Clinical Teal NP",
    description: "Clean teal medical header with photo and credential chips.",
    category: "medical",
    component: ClinicalTealNP,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["nurse-practitioner", "registered-nurse"],
    suggestedIndustries: ["healthcare", "nursing"],
    themes: ["teal", "sage"],
  },
  {
    slug: "apothecary-pharmacist",
    name: "Apothecary Pharmacist",
    description: "Deep apothecary-green sidebar with clinical two-column body.",
    category: "medical",
    component: ApothecaryPharmacist,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["pharmacist", "pharmacy-manager"],
    suggestedIndustries: ["pharmacy", "healthcare"],
    themes: ["forest", "sage"],
  },
  {
    slug: "oxblood-litigation",
    name: "Oxblood Litigation",
    description: "Formal oxblood sidebar with gold crest and serif body.",
    category: "legal",
    component: OxbloodLitigation,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["barrister", "litigator"],
    suggestedIndustries: ["legal", "litigation"],
    themes: ["wine", "charcoal"],
  },
  {
    slug: "community-social-worker",
    name: "Community Social Worker",
    description: "Warm green rounded header with photo and compassionate cards.",
    category: "public-service",
    component: CommunitySocialWorker,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["social-worker", "case-manager"],
    suggestedIndustries: ["social-work", "public-service"],
    themes: ["forest", "amber"],
  },
  {
    slug: "skyline-cabin-crew",
    name: "Skyline Cabin Crew",
    description: "Sky-blue gradient with gold accents and language bars.",
    category: "aviation",
    component: SkylineCabinCrew,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["cabin-crew", "flight-attendant"],
    suggestedIndustries: ["aviation", "hospitality"],
    themes: ["sky", "navy"],
  },
  {
    slug: "voltage-electrician",
    name: "Voltage Electrician",
    description: "Bold black-and-yellow hazard styling with ticket chips.",
    category: "trades-industrial",
    component: VoltageElectrician,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["electrician", "electrical-technician"],
    suggestedIndustries: ["electrical", "construction"],
    themes: ["amber", "steel"],
  },
  {
    slug: "timeline-video-editor",
    name: "Timeline Video Editor",
    description: "Dark editor UI with colourful timeline scrubber.",
    category: "creator",
    component: TimelineVideoEditor,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["video-editor", "motion-designer"],
    suggestedIndustries: ["video", "media"],
    themes: ["plum", "blush"],
  },
  {
    slug: "lab-note-scientist",
    name: "Lab Note Scientist",
    description: "Cobalt header with hex molecule motif and publications.",
    category: "science",
    component: LabNoteScientist,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["research-scientist", "scientist"],
    suggestedIndustries: ["science", "academia"],
    themes: ["navy", "slate"],
  },
  {
    slug: "swiss-clinical-dentist",
    name: "Swiss Clinical Dentist",
    description: "Strict Swiss grid in clean sky-blue with a left rule.",
    category: "medical",
    component: SwissClinicalDentist,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["dentist", "dental-surgeon"],
    suggestedIndustries: ["dentistry", "healthcare"],
    themes: ["sky", "slate"],
  },
  {
    slug: "memphis-ux-researcher",
    name: "Memphis UX Researcher",
    description: "Playful Memphis shapes with bright pastel cards.",
    category: "creative",
    component: MemphisUXResearcher,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["ux-researcher", "user-researcher"],
    suggestedIndustries: ["design", "product"],
    themes: ["coral", "mint"],
  },
  {
    slug: "arcade-neon-gamedev",
    name: "Arcade Neon Gamedev",
    description: "Dark arcade grid with neon glow and mono code styling.",
    category: "game-dev",
    component: ArcadeNeonGamedev,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["game-developer", "gameplay-programmer"],
    suggestedIndustries: ["game-development", "gaming"],
    themes: ["plum", "navy"],
  },
  {
    slug: "art-deco-event-planner",
    name: "Art Deco Event Planner",
    description: "Emerald-and-gold deco styling with fan motifs.",
    category: "hospitality",
    component: ArtDecoEventPlanner,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["event-planner", "wedding-planner"],
    suggestedIndustries: ["events", "planning"],
    themes: ["forest", "gold"],
  },
  {
    slug: "linguist-translator",
    name: "Linguist Translator",
    description: "Type-driven and multilingual with language proficiency.",
    category: "linguist",
    component: LinguistTranslator,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["translator", "interpreter"],
    suggestedIndustries: ["translation", "localization"],
    themes: ["plum", "ivory"],
  },
  {
    slug: "meadow-veterinarian",
    name: "Meadow Veterinarian",
    description: "Warm meadow-green header with photo and paw motif.",
    category: "veterinary",
    component: MeadowVeterinarian,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["veterinarian", "vet-tech"],
    suggestedIndustries: ["veterinary", "animal-care"],
    themes: ["forest", "amber"],
  },
  {
    slug: "logistics-supply-chain",
    name: "Logistics Supply Chain",
    description: "Industrial navy-and-orange with route motif and KPI dashboard.",
    category: "logistics",
    component: LogisticsSupplyChain,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["supply-chain-manager", "logistics-manager"],
    suggestedIndustries: ["logistics", "procurement"],
    themes: ["navy", "orange"],
  },
  {
    slug: "magazine-copywriter",
    name: "Magazine Copywriter",
    description: "Editorial magazine spread with bold pull-quote.",
    category: "marketing",
    component: MagazineCopywriter,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["copywriter", "content-writer"],
    suggestedIndustries: ["copywriting", "advertising"],
    themes: ["wine", "charcoal"],
  },
  {
    slug: "paramedic-emergency",
    name: "Paramedic Emergency",
    description: "Bold red-and-charcoal with ECG pulse line.",
    category: "medical",
    component: ParamedicEmergency,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["paramedic", "emt"],
    suggestedIndustries: ["emergency-medical", "ems"],
    themes: ["wine", "steel"],
  },
  {
    slug: "nutrition-fresh-dietitian",
    name: "Nutrition Fresh Dietitian",
    description: "Fresh leaf-green gradient with clean calm cards.",
    category: "medical",
    component: NutritionFreshDietitian,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["dietitian", "nutritionist"],
    suggestedIndustries: ["dietetics", "healthcare"],
    themes: ["mint", "sage"],
  },
  {
    slug: "optometry-precision",
    name: "Optometry Precision",
    description: "Deep navy with concentric-lens motif and teal accents.",
    category: "medical",
    component: OptometryPrecision,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["optometrist", "optician"],
    suggestedIndustries: ["optometry", "healthcare"],
    themes: ["navy", "teal"],
  },
  {
    slug: "structural-civil-engineer",
    name: "Structural Civil Engineer",
    description: "Steel-grey sidebar with amber hazard rule and hex badge.",
    category: "manufacturing",
    component: StructuralCivilEngineer,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["civil-engineer", "structural-engineer"],
    suggestedIndustries: ["engineering", "infrastructure"],
    themes: ["slate", "amber"],
  },
  {
    slug: "interior-atelier",
    name: "Interior Atelier",
    description: "Warm taupe and terracotta with swatch row.",
    category: "creative",
    component: InteriorAtelier,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["interior-designer", "spatial-designer"],
    suggestedIndustries: ["interior-design", "architecture"],
    themes: ["sand", "terracotta"],
  },
  {
    slug: "studio-waveform-producer",
    name: "Studio Waveform Producer",
    description: "Dark studio look with gradient audio-waveform.",
    category: "music",
    component: StudioWaveformProducer,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["music-producer", "audio-engineer"],
    suggestedIndustries: ["music", "media"],
    themes: ["plum", "orange"],
  },
  {
    slug: "cafe-roast-barista",
    name: "Cafe Roast Barista",
    description: "Warm coffee browns with photo and rounded cards.",
    category: "hospitality",
    component: CafeRoastBarista,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["barista", "cafe-manager"],
    suggestedIndustries: ["coffee", "hospitality"],
    themes: ["terracotta", "gold"],
  },
  {
    slug: "sustain-mesh-esg",
    name: "Sustain Mesh ESG",
    description: "Green-and-teal mesh gradient header with impact stripe.",
    category: "environmental",
    component: SustainMeshESG,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["sustainability-manager", "esg-manager"],
    suggestedIndustries: ["sustainability", "esg"],
    themes: ["forest", "mint"],
  },
  {
    slug: "brutalist-creative-tech",
    name: "Brutalist Creative Tech",
    description: "Stark neo-brutalist blocks with heavy borders.",
    category: "developer",
    component: BrutalistCreativeTech,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["creative-technologist", "front-end-engineer"],
    suggestedIndustries: ["software", "technology"],
    themes: ["amber", "mono"],
  },
  {
    slug: "gradient-mesh-growth",
    name: "Gradient Mesh Growth",
    description: "Vibrant multi-colour mesh gradient hero with growth metrics.",
    category: "marketing",
    component: GradientMeshGrowth,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["growth-marketer", "performance-marketer"],
    suggestedIndustries: ["marketing", "saas"],
    themes: ["plum", "violet"],
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
