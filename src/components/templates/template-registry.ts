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
  IdBadgeModernTemplate,
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
  // MASTERCLASS & CANVA IMPORTED BATCH
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

  // Ultra-Creative Batch
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
  // CORE & CATALOG TEMPLATES
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
