import type { ComponentType } from "react";
import type { TemplateProps } from "./types";

// New Masterclass Original Design Batch
import {
  NeoGlassmorphismTemplate,
  AsymmetricEditorialTemplate,
  CyberGeometricTemplate,
  BohoTerracottaTemplate,
} from "./batch-masterclass";

// Newly Imported French / Canva Templates Batch
import {
  MindMapGraphisteTemplate,
  SachaDuboisEventTemplate,
  ClipboardNotepadTemplate,
  SecurityBadgeTemplate,
  DottedNotebookTemplate,
  FloralBotanistTemplate,
  LouGarnierCommunityTemplate,
  LouHuetIllustratorTemplate,
  YaelleAllaouiTemplate,
  ThomasGarciaSoundTemplate,
} from "./batch-canva-imported";

// New Ultra-Creative Batch (Beauty, Childcare, Botanical, Curvy Agency)
import {
  BeautyMakeupArtistTemplate,
  MothercareChildcareTemplate,
  FloralBotanicalTemplate,
  CurvyWaveModernTemplate,
} from "./batch-ultra-creative";

// Canva Iconic Batch Templates
import {
  AveryDavisEditorialTemplate,
  OliviaWilsonTerracottaTemplate,
  PedroFernandesDarkTemplate,
  HelenaMoralesBlushTemplate,
} from "./batch-canva-icons";

// Batch Commercial & Job-Specific Templates
import {
  CyberDevTerminalTemplate,
  VogueCreativeArchTemplate,
  AeroFlightCaptainTemplate,
  LuxeRealEstateTemplate,
} from "./batch-commercial";

// Batch Medical & Healthcare Templates
import {
  AstridEmeraldTemplate,
  AuraMidwifeTemplate,
  CyberParamedicTemplate,
  RoyalDentalTemplate,
} from "./batch-medical";

// Next-Gen Canva & Modern Studio Templates
import { RetroDesktopWindowUI } from "./RetroDesktopWindowUI";
import { OrganicWaveEditorial } from "./OrganicWaveEditorial";
import { EditorialArchBlush } from "./EditorialArchBlush";
import { ModernDarkContrast } from "./ModernDarkContrast";
import { WarmCreativeMagazine } from "./WarmCreativeMagazine";
import { SoftPastelFloatingCards } from "./SoftPastelFloatingCards";
import { NurseICUPro } from "./NurseICUPro";
import { LegalPartnerLuxe } from "./LegalPartnerLuxe";
import { AiMlResearchArchitect } from "./AiMlResearchArchitect";
import { DevOpsPipelineTemplate } from "./DevOpsPipelineTemplate";

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

// Expansion batch: 28 templates
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

// Batch 12 (12)
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

// Design System kit (2): 30 templates
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

// Design System kit (3): 40 templates
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

// Design templates kit (56)
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
  // NEW MASTERCLASS ORIGINAL DESIGN BATCH
  // --------------------------------------------------------------------------
  {
    slug: "neo-glassmorphism-executive",
    name: "Neo-Glassmorphism Executive",
    description: "Deep obsidian canvas with frosted glass cards, neon ambient orbs, and executive precision.",
    category: "executive",
    component: NeoGlassmorphismTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-30T10:00:00.000Z",
    suggestedRoles: ["cto", "vp-engineering", "chief-technology-officer", "tech-lead"],
    suggestedIndustries: ["technology", "executive", "software"],
    themes: ["midnight", "indigo", "cyan"],
  },
  {
    slug: "asymmetric-editorial",
    name: "Asymmetric Editorial Masthead",
    description: "Warm champagne and burnt wine magazine style with massive display serif headers and vertical lines.",
    category: "creative",
    component: AsymmetricEditorialTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: false,
    addedAt: "2026-08-30T09:50:00.000Z",
    suggestedRoles: ["editor-in-chief", "editorial-director", "brand-consultant", "journalist"],
    suggestedIndustries: ["editorial", "publishing", "marketing"],
    themes: ["sand", "wine", "ivory"],
  },
  {
    slug: "cyber-geometric-matrix",
    name: "Cyber-Geometric Matrix Data Hub",
    description: "Midnight ink with electric cyan tech grid, asymmetric geometry, and high-contrast telemetry metrics.",
    category: "developer",
    component: CyberGeometricTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: false,
    addedAt: "2026-08-30T09:40:00.000Z",
    suggestedRoles: ["cybersecurity-architect", "penetration-tester", "systems-engineer", "security-lead"],
    suggestedIndustries: ["cybersecurity", "technology", "infosec"],
    themes: ["midnight", "cyan", "slate"],
  },
  {
    slug: "boho-organic-terracotta",
    name: "Boho Organic Terracotta",
    description: "Warm sand and soft clay organic curved blobs with soft rounded skill pills and mindful layout.",
    category: "creative",
    component: BohoTerracottaTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: true,
    addedAt: "2026-08-30T09:30:00.000Z",
    suggestedRoles: ["product-designer", "ux-researcher", "content-writer", "wellness-coach"],
    suggestedIndustries: ["design", "creative", "wellness"],
    themes: ["terracotta", "sand", "ivory"],
  },

  // --------------------------------------------------------------------------
  // RECENTLY IMPORTED CANVA TEMPLATES (Mind-Map, Clipboard, ID Badge, Notebook)
  // --------------------------------------------------------------------------
  {
    slug: "mind-map-graphiste",
    name: "Mind-Map Graphiste (Chloé Vallet)",
    description: "Famous Canva radial mind-map layout with central circular portrait and hand-drawn pointer arrows.",
    category: "creative",
    component: MindMapGraphisteTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-16T09:00:00.000Z",
    suggestedRoles: ["graphiste", "designer-graphique", "art-director", "ui-designer"],
    suggestedIndustries: ["creative", "design", "communication"],
    themes: ["sand", "wine", "ivory"],
  },
  {
    slug: "sacha-dubois-event",
    name: "Modern Event Manager (Sacha Dubois)",
    description: "Clean modern layout with top-right red fluid wave header, circular portrait, and bold typography.",
    category: "professional",
    component: SachaDuboisEventTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: true,
    addedAt: "2026-08-16T08:50:00.000Z",
    suggestedRoles: ["chargee-de-projet", "event-manager", "project-coordinator", "marketing-manager"],
    suggestedIndustries: ["events", "marketing", "corporate"],
    themes: ["coral", "mono", "ivory"],
  },
  {
    slug: "clipboard-notepad",
    name: "Clipboard Notepad (Clémence Laurent)",
    description: "Realistic blue clipboard mockup with polaroid photo frame and handwritten notepad styling.",
    category: "creative",
    component: ClipboardNotepadTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-16T08:40:00.000Z",
    suggestedRoles: ["designer-graphique", "freelance-designer", "photographer", "art-director"],
    suggestedIndustries: ["creative", "freelance", "photography"],
    themes: ["navy", "mono", "ivory"],
  },
  {
    slug: "security-badge-pr",
    name: "Security ID Badge PR (Jonathan Martin)",
    description: "Professional PR layout featuring a realistic security ID pass badge and minimalist grid boxes.",
    category: "professional",
    component: IdBadgeModernTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: true,
    addedAt: "2026-08-16T08:30:00.000Z",
    suggestedRoles: ["relations-publiques", "communication-manager", "pr-specialist", "attachse-de-presse"],
    suggestedIndustries: ["communications", "pr", "corporate"],
    themes: ["slate", "mono", "ivory"],
  },
  {
    slug: "dotted-notebook-elsa",
    name: "Dotted Notebook (Elsa Belvaux)",
    description: "Spiral notebook aesthetic with dotted grid background, polaroid photo, and yellow marker highlights.",
    category: "creative",
    component: NotebookDottedGridTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-16T08:20:00.000Z",
    suggestedRoles: ["chargee-de-communication", "content-strategist", "community-manager", "redacteur"],
    suggestedIndustries: ["communication", "marketing", "media"],
    themes: ["sand", "amber", "ivory"],
  },
  {
    slug: "floral-botanist-helene",
    name: "Floral Botanist (Hélène Roux)",
    description: "Delicate floral motifs, soft rose/terracotta palette, and organic botanical leaf frames.",
    category: "beauty",
    component: FloralBotanistTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: true,
    addedAt: "2026-08-16T08:10:00.000Z",
    suggestedRoles: ["fleuriste", "botaniste", "floral-designer", "landscape-designer"],
    suggestedIndustries: ["floristry", "nature", "gardening"],
    themes: ["rose", "sand", "ivory"],
  },
  {
    slug: "lou-garnier-community",
    name: "Lou Garnier Community Manager",
    description: "Cheerful botanical layout with soft pastel green accents, circular photo frame, and friendly vibe.",
    category: "creative",
    component: LouGarnierCommunityTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: true,
    addedAt: "2026-08-16T08:00:00.000Z",
    suggestedRoles: ["community-manager", "social-media-manager", "content-creator", "digital-marketer"],
    suggestedIndustries: ["social-media", "marketing", "community"],
    themes: ["sage", "forest", "ivory"],
  },
  {
    slug: "lou-huet-illustrator",
    name: "Lou Huet Illustrator Pop",
    description: "Vibrant pink and yellow pop aesthetic with sticker badges and playful typography for illustrators.",
    category: "creative",
    component: LouHuetIllustratorTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-16T07:50:00.000Z",
    suggestedRoles: ["illustrateur", "graphiste", "concept-artist", "visual-artist"],
    suggestedIndustries: ["illustration", "creative", "art"],
    themes: ["coral", "lime", "blush"],
  },
  {
    slug: "yaelle-allaoui-folded",
    name: "Yaelle Allaoui Crumpled Paper",
    description: "Pink folded/crumpled paper look with dark charcoal base and high-contrast creative layout.",
    category: "creative",
    component: YaelleAllaouiTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-16T07:40:00.000Z",
    suggestedRoles: ["designer-graphique", "art-director", "brand-designer", "creative-lead"],
    suggestedIndustries: ["design", "creative", "branding"],
    themes: ["plum", "coral", "charcoal"],
  },
  {
    slug: "thomas-garcia-sound",
    name: "Thomas Garcia Sound Tech",
    description: "Dark audio/media technician theme with card blocks, project grids, and technical playlist pills.",
    category: "developer",
    component: ThomasGarciaSoundTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-16T07:30:00.000Z",
    suggestedRoles: ["technicien-son", "sound-engineer", "audio-producer", "video-editor"],
    suggestedIndustries: ["audio", "media", "production"],
    themes: ["slate", "sky", "midnight"],
  },

  // --------------------------------------------------------------------------
  // ULTRA-CREATIVE BATCH (Beauty, Childcare, Botanical, Curvy Agency)
  // --------------------------------------------------------------------------
  {
    slug: "beauty-makeup-artist",
    name: "Beauty & Makeup Artist Pro",
    description: "Nude rose gold aesthetic with cosmetic props, floating lipstick/brush accents, and elegant layout.",
    category: "beauty",
    component: BeautyMakeupArtistTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-16T07:00:00.000Z",
    suggestedRoles: ["makeup-artist", "beauty-stylist", "hair-stylist", "esthetician", "salon-manager"],
    suggestedIndustries: ["beauty", "cosmetics", "wellness"],
    themes: ["rose", "blush", "sand"],
  },
  {
    slug: "mothercare-childcare",
    name: "Mothercare & Childcare Warmth",
    description: "Soft pastel aqua/peach organic waves with childcare toy motifs, friendly headings, and warm cards.",
    category: "childcare",
    component: MothercareChildcareTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: true,
    addedAt: "2026-08-16T06:50:00.000Z",
    suggestedRoles: ["nanny", "childcare-worker", "babysitter", "preschool-teacher", "early-years-educator"],
    suggestedIndustries: ["childcare", "education", "family-care"],
    themes: ["sage", "sky", "ivory"],
  },
  {
    slug: "floral-botanical-wellness",
    name: "Floral Botanical Wellness",
    description: "Calm sage green palette with hand-drawn leaf motifs, serif typography, and natural aesthetic.",
    category: "beauty",
    component: FloralBotanicalTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: true,
    addedAt: "2026-08-16T06:40:00.000Z",
    suggestedRoles: ["florist", "floral-designer", "holistic-therapist", "wellness-coach", "botanist"],
    suggestedIndustries: ["floristry", "wellness", "nature"],
    themes: ["sage", "forest", "ivory"],
  },
  {
    slug: "curvy-wave-modern-agency",
    name: "Curvy Wave Modern Agency",
    description: "Asymmetrical liquid gradient waves, glowing pill cards, and vibrant modern aesthetic for creative agencies.",
    category: "creative",
    component: CurvyWaveModernTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-16T06:30:00.000Z",
    suggestedRoles: ["growth-marketer", "digital-marketer", "social-media-strategist", "campaign-manager"],
    suggestedIndustries: ["marketing", "digital-agency", "growth"],
    themes: ["midnight", "sky", "plum"],
  },

  // --------------------------------------------------------------------------
  // CANVA ICONIC BATCH (Viral & High-Converting Archetypes)
  // --------------------------------------------------------------------------
  {
    slug: "avery-davis-editorial",
    name: "Avery Davis Minimal Serif",
    description: "Classic Canva-style editorial serif with centered portrait, clean hairline borders, and Swiss symmetry.",
    category: "ats-classic",
    component: AveryDavisEditorialTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: true,
    addedAt: "2026-08-16T06:00:00.000Z",
    suggestedRoles: ["marketing-lead", "brand-strategist", "consultant", "journalist", "executive-assistant"],
    suggestedIndustries: ["marketing", "consulting", "editorial", "corporate"],
    themes: ["mono", "sand", "ivory"],
  },
  {
    slug: "olivia-wilson-terracotta",
    name: "Olivia Wilson Terracotta",
    description: "Famous Canva terracotta split-column layout with photo circle, skill bars, and warm coffee hues.",
    category: "creative",
    component: OliviaWilsonTerracottaTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-16T05:50:00.000Z",
    suggestedRoles: ["graphic-designer", "ui-designer", "art-director", "illustrator", "content-creator"],
    suggestedIndustries: ["creative", "design", "marketing"],
    themes: ["terracotta", "sand", "linen"],
  },
  {
    slug: "pedro-fernandes-dark",
    name: "Pedro Fernandes Executive Dark",
    description: "Bold charcoal sidebar with monochrome high-contrast content blocks and clean executive hierarchy.",
    category: "executive",
    component: PedroFernandesDarkTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-16T05:40:00.000Z",
    suggestedRoles: ["executive-director", "operations-manager", "project-director", "consultant", "general-manager"],
    suggestedIndustries: ["executive", "operations", "business"],
    themes: ["charcoal", "slate", "mono"],
  },
  {
    slug: "helena-morales-blush",
    name: "Helena Morales Blush & Lavender",
    description: "Gentle organic wave curves with soft pastel purple/blush palette and rounded glass cards.",
    category: "creative",
    component: HelenaMoralesBlushTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-16T05:30:00.000Z",
    suggestedRoles: ["content-writer", "copywriter", "social-media-manager", "creative-assistant", "communications-specialist"],
    suggestedIndustries: ["creative", "writing", "communications"],
    themes: ["blush", "plum", "ivory"],
  },

  // --------------------------------------------------------------------------
  // COMMERCIAL & TECH HIGH-IMPACT BATCH
  // --------------------------------------------------------------------------
  {
    slug: "cyber-dev-terminal",
    name: "Cyber Dev Terminal UI",
    description: "High-impact developer terminal with bash controls, KPI metric tiles, and git commit history branch lines.",
    category: "developer",
    component: CyberDevTerminalTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-16T04:00:00.000Z",
    suggestedRoles: ["software-engineer", "full-stack-developer", "devops-engineer", "ai-engineer"],
    suggestedIndustries: ["technology", "software"],
    themes: ["midnight", "emerald", "navy"],
  },
  {
    slug: "vogue-creative-arch",
    name: "Vogue Creative Arch",
    description: "Haute couture editorial layout with roman arch photo portal, classic serif masthead, and swatch color cards.",
    category: "creative",
    component: VogueCreativeArchTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-16T03:50:00.000Z",
    suggestedRoles: ["creative-director", "art-director", "brand-strategist", "fashion-designer"],
    suggestedIndustries: ["creative", "fashion", "marketing"],
    themes: ["wine", "sand", "ivory"],
  },
  {
    slug: "aero-flight-captain",
    name: "Aero Flight Captain",
    description: "Cockpit HUD artificial horizon bar, total flight hour counters, and ATPL command license pills.",
    category: "aviation",
    component: AeroFlightCaptainTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-16T03:40:00.000Z",
    suggestedRoles: ["pilot", "airline-pilot", "captain", "first-officer"],
    suggestedIndustries: ["aviation", "airline"],
    themes: ["navy", "charcoal", "sky"],
  },
  {
    slug: "luxe-real-estate",
    name: "Luxe Real Estate Executive",
    description: "High-roller luxury realty theme with skyscraper gold crest, $150M+ volume KPI badges, and star ratings.",
    category: "real-estate",
    component: LuxeRealEstateTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-16T03:30:00.000Z",
    suggestedRoles: ["real-estate-agent", "luxury-real-estate-broker", "property-manager"],
    suggestedIndustries: ["real-estate", "sales"],
    themes: ["midnight", "wine", "sand"],
  },

  // --------------------------------------------------------------------------
  // MEDICAL & CLINICAL BATCH
  // --------------------------------------------------------------------------
  {
    slug: "astrid-emerald",
    name: "Astrid Rose Emerald",
    description: "Luxury dark emerald canvas with liquid rose gold fluid wave ribbons, frosted glass translucent sidebar, and prism hexagon avatar frame.",
    category: "medical",
    component: AstridEmeraldTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-16T03:00:00.000Z",
    suggestedRoles: [
      "occupational-therapist", "physiotherapist", "physical-therapist",
      "speech-therapist", "rehabilitation-specialist", "clinical-director", "hand-therapist"
    ],
    suggestedIndustries: ["healthcare", "rehabilitation", "clinical-care"],
    themes: ["emerald", "rose", "forest"],
  },
  {
    slug: "aura-midwife",
    name: "Aura Midwife Organic",
    description: "Soft pastel organic flow with dual-ring avatar, warm coral and lilac waves, and holistic clinical milestone timeline.",
    category: "nursing",
    component: AuraMidwifeTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: true,
    addedAt: "2026-08-16T02:30:00.000Z",
    suggestedRoles: [
      "midwife", "certified-nurse-midwife", "doula", "lactation-consultant",
      "labor-and-delivery-nurse", "neonatal-nurse", "maternity-care-specialist"
    ],
    suggestedIndustries: ["healthcare", "maternity", "nursing"],
    themes: ["coral", "blush", "ivory"],
  },
  {
    slug: "cyber-paramedic",
    name: "Cyber Paramedic HUD",
    description: "High-contrast dark terminal with cyan and emergency neon-red glowing rails, trauma metrics, and tactical service record.",
    category: "medical",
    component: CyberParamedicTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-16T02:00:00.000Z",
    suggestedRoles: [
      "flight-paramedic", "critical-care-paramedic", "paramedic", "emt",
      "emergency-medical-technician", "trauma-medic", "first-responder", "er-technician"
    ],
    suggestedIndustries: ["emergency-services", "healthcare", "public-safety"],
    themes: ["midnight", "charcoal", "wine"],
  },
  {
    slug: "royal-dental",
    name: "Royal Dental & Surgical",
    description: "Deep imperial violet and liquid metallic gold ribbons with diamond-cut portrait frame and clinical procedure ratings.",
    category: "medical",
    component: RoyalDentalTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-16T01:30:00.000Z",
    suggestedRoles: [
      "dentist", "dental-surgeon", "cosmetic-dentist", "orthodontist",
      "periodontist", "oral-surgeon", "implantologist", "prosthodontist"
    ],
    suggestedIndustries: ["dentistry", "cosmetic-surgery", "healthcare"],
    themes: ["plum", "wine", "charcoal"],
  },

  // --------------------------------------------------------------------------
  // NEXT-GEN STUDIO TEMPLATES
  // --------------------------------------------------------------------------
  {
    slug: "retro-desktop-window",
    name: "90s Retro Window Desktop",
    description: "Playful 90s OS window UI with micro-grid background, dial meters, purple title bars, and retro action controls.",
    category: "creative",
    component: RetroDesktopWindowUI as unknown as ComponentType<TemplateProps>,
    atsSafe: false,
    supportsPhoto: true,
    addedAt: "2026-08-16T01:00:00.000Z",
    suggestedRoles: ["graphic-designer", "illustrator", "ui-designer", "visual-designer", "game-designer", "creative-technologist"],
    suggestedIndustries: ["creative", "design", "gaming", "media"],
    themes: ["plum", "sand", "mono"],
  },
  {
    slug: "organic-wave-editorial",
    name: "Organic Wave Editorial",
    description: "Canva-inspired bold crimson and blush palette with fluid header ribbons, pill highlight badges, and clean timeline structure.",
    category: "creative",
    component: OrganicWaveEditorial as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: true,
    addedAt: "2026-08-16T00:00:00.000Z",
    suggestedRoles: ["creative-director", "art-director", "brand-strategist", "marketing-lead", "project-lead", "graphic-designer"],
    suggestedIndustries: ["creative", "fashion", "marketing", "media"],
    themes: ["rose", "wine", "coral"],
  },
  {
    slug: "editorial-arch-blush",
    name: "Editorial Arch Blush",
    description: "Canva-style pastel layout featuring an arched portrait frame, luxury serif titles, and asymmetric 2-column split.",
    category: "creative",
    component: EditorialArchBlush as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: true,
    addedAt: "2026-08-15T19:00:00.000Z",
    suggestedRoles: ["creative-director", "brand-strategist", "copywriter", "marketing-lead", "stylist"],
    suggestedIndustries: ["creative", "marketing", "media", "fashion"],
    themes: ["amber", "rose", "forest"],
  },
  {
    slug: "modern-dark-contrast",
    name: "Modern Dark Contrast",
    description: "Solid full-bleed slate sidebar with neon emerald accents, executive career milestones, and clean grid structure.",
    category: "executive",
    component: ModernDarkContrast as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: true,
    addedAt: "2026-08-15T18:30:00.000Z",
    suggestedRoles: ["cto", "vp-engineering", "director", "architect", "tech-lead"],
    suggestedIndustries: ["technology", "executive", "engineering"],
    themes: ["charcoal", "emerald", "navy"],
  },
  {
    slug: "warm-creative-magazine",
    name: "Warm Creative Magazine",
    description: "Terracotta warm color block with rating-dots skills, editorial serif display, and circular portrait frame.",
    category: "portfolio",
    component: WarmCreativeMagazine as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: true,
    addedAt: "2026-08-15T18:00:00.000Z",
    suggestedRoles: ["art-director", "photographer", "curator", "visual-designer", "freelancer"],
    suggestedIndustries: ["arts", "design", "publishing"],
    themes: ["amber", "wine", "charcoal"],
  },
  {
    slug: "soft-pastel-floating-cards",
    name: "Soft Pastel Floating Cards",
    description: "Modern startup HR layout with floating rounded cards, soft drop shadows, and friendly approachable styling.",
    category: "operations",
    component: SoftPastelFloatingCards as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: true,
    addedAt: "2026-08-15T17:30:00.000Z",
    suggestedRoles: ["hr-partner", "people-ops", "operations-manager", "talent-acquisition", "scrum-master"],
    suggestedIndustries: ["human-resources", "startups", "operations"],
    themes: ["plum", "sky", "emerald"],
  },
  {
    slug: "ai-ml-architect",
    name: "AI & Machine Learning Architect",
    description: "Neural matrix layout with parameter/latency KPI metrics, model deployment pipeline, and arXiv publication blocks.",
    category: "developer",
    component: AiMlResearchArchitect as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: true,
    addedAt: "2026-08-14T23:00:00.000Z",
    suggestedRoles: [
      "ai-engineer", "machine-learning-engineer", "mlops-engineer",
      "ai-researcher", "deep-learning-scientist", "nlp-engineer", "computer-vision-engineer"
    ],
    suggestedIndustries: ["artificial-intelligence", "software", "data-science"],
    themes: ["midnight", "forest", "plum"],
  },
  {
    slug: "nurse-icu-pro",
    name: "Nurse ICU Clinical Pro",
    description: "Clinical patient care layout with ECG cardiac waveform divider, BLS/ACLS license pills, and clinical competencies.",
    category: "nursing",
    component: NurseICUPro as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: true,
    addedAt: "2026-08-14T22:30:00.000Z",
    suggestedRoles: [
      "registered-nurse", "icu-nurse", "er-nurse", "nurse-practitioner",
      "clinical-nurse", "pediatric-nurse", "surgical-nurse", "charge-nurse"
    ],
    suggestedIndustries: ["healthcare", "nursing", "clinical-medicine"],
    themes: ["sky", "forest", "ivory"],
  },
  {
    slug: "legal-partner-luxe",
    name: "Legal Chambers Executive",
    description: "Classical serif masthead with bar admissions badge, notable litigation matters, and judicial records.",
    category: "legal",
    component: LegalPartnerLuxe as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: true,
    addedAt: "2026-08-14T22:00:00.000Z",
    suggestedRoles: [
      "attorney", "lawyer", "general-counsel", "litigation-partner",
      "corporate-counsel", "solicitor", "barrister", "legal-director"
    ],
    suggestedIndustries: ["legal", "corporate-law", "litigation"],
    themes: ["wine", "charcoal", "ivory"],
  },
  {
    slug: "devops-pipeline-pro",
    name: "DevOps Pipeline Pro",
    description: "High-contrast terminal layout with real-time CSS palette bindings, CI/CD history line, and tech stack tags.",
    category: "developer",
    component: DevOpsPipelineTemplate as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: true,
    addedAt: "2026-08-14T00:00:00.000Z",
    suggestedRoles: [
      "devops-engineer", "cloud-engineer", "site-reliability-engineer",
      "platform-engineer", "infrastructure-engineer", "kubernetes-engineer",
      "software-engineer", "systems-architect"
    ],
    suggestedIndustries: ["technology", "cloud", "devops"],
    themes: ["midnight", "forest", "navy"],
  },

  // --------------------------------------------------------------------------
  // BATCH 1 TO 4 & EXTENSIVE CATALOG TEMPLATES
  // --------------------------------------------------------------------------
  {
    slug: "religious-traditional",
    name: "Religious Traditional",
    description: "Cormorant Garamond + Amiri, deep green + gold, ornamental frame. Dignified template for faith-based roles across religions.",
    category: "faith-based",
    component: ReligiousTraditional,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["imam", "mufti", "priest", "pastor", "rabbi", "chaplain"],
    suggestedIndustries: ["religious", "faith-based", "spiritual"],
    themes: ["forest", "ivory", "wine"],
  },
  {
    slug: "medical-surgical",
    name: "Medical Surgical",
    description: "White + bold red angular corners, dotted timeline. For surgeons and specialist doctors.",
    category: "medical",
    component: MedicalSurgical,
    atsSafe: true,
    supportsPhoto: true,
    suggestedRoles: ["surgeon", "orthopedic-surgeon", "cardiothoracic-surgeon"],
    suggestedIndustries: ["surgical-medicine", "specialist-medicine"],
    themes: ["plum", "wine"],
  },
  {
    slug: "pharmacy-pastel",
    name: "Pharmacy Pastel",
    description: "Lavender + gold soft waves, hexagonal photo. Built for pharmacy professionals.",
    category: "medical",
    component: PharmacyPastel,
    atsSafe: true,
    supportsPhoto: true,
    suggestedRoles: ["pharmacist", "clinical-pharmacist", "pharmacy-technician"],
    suggestedIndustries: ["pharmacy", "pharmaceutical"],
    themes: ["plum", "ivory"],
  },
  {
    slug: "wellness-golden",
    name: "Wellness Golden",
    description: "Dark chocolate + glowing gold + hexagonal photo. For massage therapists and holistic wellness.",
    category: "beauty",
    component: WellnessGolden,
    atsSafe: true,
    supportsPhoto: true,
    suggestedRoles: ["massage-therapist", "spa-therapist", "wellness-coach"],
    suggestedIndustries: ["wellness", "spa", "holistic-health"],
    themes: ["wine", "ivory"],
  },
  {
    slug: "ice-blue-glass",
    name: "Ice Blue Glass",
    description: "Dark navy + cyan/purple wave + glass cards. Built for STEM teachers and academic instructors.",
    category: "scholarly",
    component: IceBlueGlass,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["secondary-school-teacher", "physics-teacher", "stem-teacher"],
    suggestedIndustries: ["secondary-education", "stem-education"],
    themes: ["midnight", "navy"],
  },
  {
    slug: "cloud-light",
    name: "Cloud Light",
    description: "Light cream + soft blue + 3D cloud illustration. Lighter variant for IT PMs and architects.",
    category: "infographic",
    component: CloudLight,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["it-project-manager", "cloud-architect", "solutions-architect"],
    suggestedIndustries: ["cloud-infrastructure", "saas"],
    themes: ["sky", "ivory"],
  },
  {
    slug: "cyber-emerald",
    name: "Cyber Emerald",
    description: "Deep emerald + neon green isometric. For office managers with a tech edge.",
    category: "business",
    component: CyberEmerald,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["office-manager", "operations-coordinator", "facilities-manager"],
    suggestedIndustries: ["operations", "tech-office"],
    themes: ["midnight"],
  },
  {
    slug: "admin-fluid",
    name: "Admin Fluid",
    description: "Soft ice-blue with flowing blue ribbons and glassmorphism cards. Built for office and admin support.",
    category: "professional",
    component: AdminFluid,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["administrative-assistant", "executive-assistant", "receptionist"],
    suggestedIndustries: ["administration", "office-support"],
    themes: ["sky", "slate"],
  },
  {
    slug: "legal-formal",
    name: "Legal Formal",
    description: "Cream base + navy + gold wavy top band, scales watermark.",
    category: "legal",
    component: LegalFormal as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["lawyer", "attorney", "solicitor", "paralegal"],
    suggestedIndustries: ["legal", "law"],
    themes: ["plum", "navy", "wine"],
  },
  {
    slug: "finance-precise",
    name: "Finance Precise",
    description: "White + forest green + amber. Ledger-line divider, refined grid.",
    category: "finance",
    component: FinancePrecise as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["accountant", "cpa", "auditor", "tax-advisor"],
    suggestedIndustries: ["accounting", "audit", "tax"],
    themes: ["forest", "ivory", "wine"],
  },
  {
    slug: "finance-elite",
    name: "Finance Elite",
    description: "Cream + deep teal + rose gold, wavy right-side accent.",
    category: "finance",
    component: FinanceElite as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["investment-banker", "financial-analyst", "portfolio-manager"],
    suggestedIndustries: ["investment-banking", "private-equity", "hedge-funds"],
    themes: ["midnight", "wine", "plum"],
  },
  {
    slug: "people-warm",
    name: "People Warm",
    description: "Cream + coral + sage, top wave divider, network-nodes motif.",
    category: "people-hr",
    component: PeopleWarm as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: true,
    suggestedRoles: ["hr-manager", "hr-business-partner", "recruiter", "talent-acquisition-specialist"],
    suggestedIndustries: ["human-resources", "talent-acquisition"],
    themes: ["coral", "sand", "linen"],
  },
  {
    slug: "operations-structured",
    name: "Operations Structured",
    description: "White + slate blue + amber, diagonal accent panels, KPI tiles.",
    category: "operations",
    component: OperationsStructured as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: true,
    suggestedRoles: ["operations-manager", "operations-director", "supply-chain-manager"],
    suggestedIndustries: ["operations", "supply-chain"],
    themes: ["navy", "slate", "midnight"],
  },
  {
    slug: "insurance-trust",
    name: "Insurance Trust",
    description: "Ivory + teal + bronze, shield emblem, middle trust-bar.",
    category: "insurance",
    component: InsuranceTrust as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["insurance-agent", "underwriter", "claims-adjuster", "risk-manager"],
    suggestedIndustries: ["insurance", "risk-management"],
    themes: ["navy", "ivory", "linen"],
  },
  {
    slug: "veterinary-caring",
    name: "Veterinary Caring",
    description: "Cream + sage + dusty rose, wavy side bar with paw silhouettes.",
    category: "veterinary",
    component: VeterinaryCaring as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["veterinarian", "vet-tech", "animal-trainer"],
    suggestedIndustries: ["veterinary", "animal-care"],
    themes: ["forest", "linen", "sand"],
  },
  {
    slug: "aviation-precise",
    name: "Aviation Precise",
    description: "Sky-blue gradient + silver, wings emblem, altitude-line dividers.",
    category: "aviation",
    component: AviationPrecise as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["pilot", "flight-attendant", "air-traffic-controller"],
    suggestedIndustries: ["aviation", "airline"],
    themes: ["sky", "ivory"],
  },
  {
    slug: "hospitality-elegant",
    name: "Hospitality Elegant",
    description: "Champagne + burgundy + gold, top wave + monogram.",
    category: "hospitality-elegant",
    component: HospitalityElegant as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["hotel-manager", "resort-manager", "concierge-director"],
    suggestedIndustries: ["luxury-hospitality", "hotels", "resorts"],
    themes: ["wine", "ivory", "sand"],
  },
  {
    slug: "linguist-multilingual",
    name: "Linguist Multilingual",
    description: "White + lavender + rose gold, multi-script header.",
    category: "linguist",
    component: LinguistMultilingual as unknown as ComponentType<TemplateProps>,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["translator", "interpreter", "localization-specialist"],
    suggestedIndustries: ["translation", "localization", "linguistics"],
    themes: ["plum", "linen", "ivory"],
  },
  {
    slug: "public-service-honor",
    name: "Public Service Honor",
    description: "Navy + service-red shield emblem, dignified hero.",
    category: "public-service",
    component: PublicServiceHonor,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["police-officer", "firefighter", "military-veteran"],
    suggestedIndustries: ["public-service", "law-enforcement", "military"],
    themes: ["navy", "midnight", "charcoal"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    description: "Forest + sage palette, credential pills, balanced two-column body.",
    category: "medical",
    component: Healthcare,
    atsSafe: true,
    supportsPhoto: true,
    suggestedRoles: ["registered-nurse", "doctor-physician", "pharmacist"],
    suggestedIndustries: ["healthcare", "medical", "nursing"],
    themes: ["forest", "linen", "ivory"],
  },
  {
    slug: "trades-industrial",
    name: "Trades & Industrial",
    description: "Steel grey + warm orange. Tool motifs, license pills.",
    category: "trades-industrial",
    component: TradesIndustrial,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["electrician", "plumber", "carpenter", "welder"],
    suggestedIndustries: ["construction", "trades", "industrial"],
    themes: ["charcoal", "midnight", "navy"],
  },
  {
    slug: "logistics-direct",
    name: "Logistics Direct",
    description: "Black + warning-yellow road stripe. License/endorsement table.",
    category: "logistics",
    component: LogisticsDirect,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["truck-driver", "delivery-driver", "warehouse-worker"],
    suggestedIndustries: ["logistics", "transportation", "supply-chain"],
    themes: ["charcoal", "midnight"],
  },
  {
    slug: "manufacturing-precise",
    name: "Manufacturing Precise",
    description: "Industrial navy + schematic grid, metric tiles.",
    category: "manufacturing",
    component: ManufacturingPrecise,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["production-manager", "plant-manager", "quality-engineer"],
    suggestedIndustries: ["manufacturing", "production", "quality"],
    themes: ["navy", "charcoal", "slate"],
  },
  {
    slug: "cyber-grid",
    name: "Cyber Grid",
    description: "Midnight + neon cyan, glass cards, isometric server illustration.",
    category: "infographic",
    component: CyberGrid,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["devops-engineer", "cloud-architect", "cybersecurity-analyst"],
    suggestedIndustries: ["technology", "saas", "cybersecurity"],
    themes: ["midnight", "charcoal", "navy"],
  },
  {
    slug: "real-estate-elegant",
    name: "Real Estate Elegant",
    description: "Navy + gold, classical headings, sales-achievement badges.",
    category: "real-estate",
    component: RealEstateElegant,
    atsSafe: true,
    supportsPhoto: true,
    suggestedRoles: ["real-estate-agent", "property-manager", "mortgage-broker"],
    suggestedIndustries: ["real-estate", "property", "housing"],
    themes: ["navy", "wine", "plum"],
  },
  {
    slug: "beauty-portfolio",
    name: "Beauty Portfolio",
    description: "Soft rose + cream, portfolio swatches, social-handle prominent.",
    category: "beauty",
    component: BeautyPortfolio,
    atsSafe: true,
    supportsPhoto: true,
    suggestedRoles: ["hair-stylist", "makeup-artist", "esthetician"],
    suggestedIndustries: ["beauty", "wellness", "salon"],
    themes: ["coral", "linen", "sand"],
  },
  {
    slug: "warm-creative",
    name: "Warm Creative",
    description: "Terracotta sunset hero, photo-forward, soft curves.",
    category: "hospitality",
    component: WarmCreative,
    atsSafe: true,
    supportsPhoto: true,
    suggestedRoles: ["chef", "event-planner", "tour-guide"],
    suggestedIndustries: ["hospitality", "tourism", "events"],
    themes: ["coral", "sand", "terracotta"],
  },
  {
    slug: "service-friendly",
    name: "Service Friendly",
    description: "Mint + cream, customer-service signals. Front-of-house focused.",
    category: "service",
    component: ServiceFriendly,
    atsSafe: true,
    supportsPhoto: true,
    suggestedRoles: ["waiter", "bartender", "retail-associate", "customer-service-representative"],
    suggestedIndustries: ["service", "retail", "customer-service"],
    themes: ["coral", "linen", "ivory"],
  },
  {
    slug: "education-warm",
    name: "Education Warm",
    description: "Mustard + sage, dotted underlines, classroom-friendly.",
    category: "education-warm",
    component: EducationWarm,
    atsSafe: true,
    supportsPhoto: true,
    suggestedRoles: ["elementary-teacher", "preschool-teacher", "teaching-assistant"],
    suggestedIndustries: ["early-education", "primary-education"],
    themes: ["sand", "linen", "ivory"],
  },
  {
    slug: "academic",
    name: "Academic",
    description: "Crimson Pro, centred classical header, publication-friendly.",
    category: "scholarly",
    component: Academic,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["professor", "lecturer", "research-scientist"],
    suggestedIndustries: ["academia", "research", "higher-education"],
    themes: ["wine", "ivory", "plum"],
  },
  {
    slug: "creative-portfolio",
    name: "Creative Portfolio",
    description: "Mustard + cream + plum, asymmetric work tiles, big watermark number.",
    category: "creative",
    component: CreativePortfolio,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["graphic-designer", "illustrator", "motion-designer"],
    suggestedIndustries: ["design", "creative", "illustration"],
    themes: ["sand", "ivory", "wine"],
  },
  {
    slug: "sales-modern",
    name: "Sales Modern",
    description: "Orange→pink gradient hero, KPI tiles overlapping.",
    category: "sales",
    component: SalesModern,
    atsSafe: true,
    supportsPhoto: true,
    suggestedRoles: ["account-executive", "sales-manager", "business-development-manager"],
    suggestedIndustries: ["sales", "business-development"],
    themes: ["coral", "plum", "wine"],
  },
  {
    slug: "classic-serif",
    name: "Classic Serif",
    description: "Single-column, gold rule accents, Fraunces display. Default fallback.",
    category: "ats-classic",
    component: ClassicSerif,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["accountant", "lawyer", "consultant"],
    suggestedIndustries: ["finance", "legal", "consulting"],
    themes: ["plum", "navy", "wine", "charcoal"],
  },
  {
    slug: "midnight-cyan",
    name: "Midnight Cyan",
    description: "Dark navy canvas, cyan-violet glow, glowing skill bars.",
    category: "developer",
    component: MidnightCyan,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["devops-engineer", "cloud-engineer"],
    suggestedIndustries: ["software", "technology", "devops"],
    themes: ["navy", "plum", "forest"],
  },
  {
    slug: "coral-sunset",
    name: "Coral Sunset",
    description: "Full-bleed coral-to-plum gradient hero, hexagon monogram.",
    category: "education-warm",
    component: CoralSunset,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["teacher", "lecturer", "tutor"],
    suggestedIndustries: ["education", "teaching"],
    themes: ["coral", "plum", "sunset"],
  },
  {
    slug: "emerald-executive",
    name: "Emerald Executive",
    description: "Deep emerald header, gold rule and Fraunces display.",
    category: "finance",
    component: EmeraldExecutive,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["chief-financial-officer", "cfo", "finance-director"],
    suggestedIndustries: ["finance", "banking", "executive"],
    themes: ["forest", "ivory", "wine"],
  },
  {
    slug: "royal-blue-corporate",
    name: "Royal Blue Corporate",
    description: "Classic blue sidebar with photo, skill bars and clean body.",
    category: "business",
    component: RoyalBlueCorporate,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["operations-manager", "business-manager", "general-manager"],
    suggestedIndustries: ["business", "operations", "corporate"],
    themes: ["navy", "royal", "slate"],
  },
  {
    slug: "sage-watercolor",
    name: "Sage Watercolor",
    description: "Soft sage and peach watercolour washes, circular photo.",
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
    description: "Violet-to-pink gradient with frosted glass cards.",
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
    description: "Bold retro blocks in burnt orange, gold and ink.",
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
    description: "Angular teal, yellow and coral shapes framing a crisp layout.",
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
    description: "Monospace terminal styling, teal accents, metric tiles.",
    category: "web-analytics",
    component: SlateMonoData,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["data-analyst", "bi-developer", "data-scientist"],
    suggestedIndustries: ["data", "analytics", "technology"],
    themes: ["slate", "teal", "navy"],
  },
  {
    slug: "rose-editorial",
    name: "Rose Editorial",
    description: "Elegant blush palette, DM Serif Display and centred masthead.",
    category: "marketing",
    component: RoseEditorial,
    atsSafe: false,
    supportsPhoto: true,
    suggestedRoles: ["marketing-manager", "brand-manager", "communications-manager"],
    suggestedIndustries: ["marketing", "branding", "communications"],
    themes: ["blush", "wine", "rose"],
  },
  {
    slug: "charcoal-timeline",
    name: "Charcoal Timeline",
    description: "Charcoal header with an amber vertical timeline.",
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
    description: "Warm terracotta with soft rounded header and photo.",
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
    description: "Teal gradient header over a bold metrics stripe.",
    category: "sales",
    component: OceanTealSales,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["sales-manager", "business-development-manager", "account-executive"],
    suggestedIndustries: ["sales", "business-development", "saas"],
    themes: ["teal", "ocean", "navy"],
  },
  {
    slug: "wine-legal",
    name: "Wine Legal",
    description: "Refined wine-and-serif classic with centred headings.",
    category: "legal",
    component: WineLegal,
    atsSafe: true,
    supportsPhoto: false,
    suggestedRoles: ["lawyer", "corporate-counsel", "attorney"],
    suggestedIndustries: ["legal", "law", "corporate"],
    themes: ["wine", "ivory", "forest"],
  },
  {
    slug: "holographic-iridescent",
    name: "Holographic Iridescent",
    description: "Iridescent pink-to-mint gradient over a dark canvas.",
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
    description: "Indigo grid hero with isometric 3D cubes.",
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
    description: "Sturdy forest-green and safety-amber with hazard stripe.",
    category: "trades-industrial",
    component: ForestTrades,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["site-manager", "construction-manager", "foreman"],
    suggestedIndustries: ["construction", "trades", "building"],
    themes: ["forest", "amber", "sand"],
  },
  {
    slug: "sunny-hospitality",
    name: "Sunny Hospitality",
    description: "Warm amber sunrise header with photo and friendly cards.",
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
    description: "Bright mint, education-first layout with space for awards.",
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
    description: "Navy blueprint grid header with mono numbering.",
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
    description: "Near-black with a gold hairline frame and centred serif.",
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
    description: "Friendly coral sidebar with photo, skill bars and metrics.",
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
    description: "Dark menu-card styling with ember red, dotted leaders.",
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
    description: "Polished navy-and-gold with photo and sales-volume stripe.",
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
    description: "High-energy black with electric-lime accents and stats.",
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
    description: "Newspaper masthead, drop-cap lead and two-column body.",
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
    description: "Steel-blue sidebar with orange accents and technical bars.",
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
    description: "Clean teal medical header with photo and credential chips.",
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
    description: "Deep apothecary-green sidebar with a clinical two-column body.",
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
    description: "Warm green rounded header with photo and card sections.",
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
    description: "Sky-blue gradient with gold accents and language bars.",
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
    description: "Bold black-and-yellow hazard styling with ticket chips.",
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
    description: "Dark editor UI with colourful timeline scrubber.",
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
    description: "Cobalt header with hex molecule motif and publications.",
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
    description: "Strict Swiss grid in clean sky-blue with a left rule.",
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
    description: "Playful Memphis shapes with bright pastel cards.",
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
    description: "Dark arcade grid with neon glow and mono code styling.",
    category: "game-dev",
    component: ArcadeNeonGamedev,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["game-developer", "gameplay-programmer", "engine-programmer"],
    suggestedIndustries: ["game-development", "software", "gaming"],
    themes: ["plum", "violet", "navy"],
  },
  {
    slug: "art-deco-event-planner",
    name: "Art Deco Event Planner",
    description: "Emerald-and-gold deco styling with fan motifs.",
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
    description: "Type-driven and multilingual with language proficiency.",
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
    description: "Warm meadow-green header with photo and paw motif.",
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
    description: "Industrial navy-and-orange with route motif and KPI dashboard.",
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
    description: "Editorial magazine spread with bold pull-quote.",
    category: "marketing",
    component: MagazineCopywriter,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["copywriter", "content-writer", "creative-copywriter"],
    suggestedIndustries: ["copywriting", "marketing", "advertising"],
    themes: ["wine", "ivory", "charcoal"],
  },
  {
    slug: "paramedic-emergency",
    name: "Paramedic Emergency",
    description: "Bold red-and-charcoal with ECG pulse line.",
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
    description: "Fresh leaf-green gradient with clean calm card sections.",
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
    description: "Deep navy with concentric-lens motif and crisp teal accents.",
    category: "medical",
    component: OptometryPrecision,
    atsSafe: false,
    supportsPhoto: false,
    suggestedRoles: ["optometrist", "optician", "ophthalmologist"],
    suggestedIndustries: ["optometry", "eye-care", "healthcare"],
    themes: ["navy", "teal", "slate"],
  },
  {
    slug: "structural-civil-engineer",
    name: "Structural Civil Engineer",
    description: "Steel-grey sidebar with amber hazard rule and hex badge.",
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
    description: "Warm taupe and terracotta with swatch row.",
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
    description: "Dark studio look with gradient audio-waveform.",
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
    description: "Warm coffee browns with photo and rounded card sections.",
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
    description: "Green-and-teal mesh-gradient header with impact stripe.",
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
    description: "Stark neo-brutalist blocks with heavy borders.",
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
    description: "Vibrant multi-colour mesh-gradient hero with growth-metrics.",
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
