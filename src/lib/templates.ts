import type { ComponentType } from "react";
import type { CVData } from "@/lib/cv-types";
import { ClassicSerif } from "@/components/templates/ClassicSerif";
import { ModernMono } from "@/components/templates/ModernMono";
import { EditorialBold } from "@/components/templates/EditorialBold";
import { PhotoForward } from "@/components/templates/PhotoForward";
import { MinimalistMono } from "@/components/templates/MinimalistMono";
import { Atelier } from "@/components/templates/Atelier";
import { Director } from "@/components/templates/Director";
import { AtelierPro } from "@/components/templates/AtelierPro";
import { BoldColorBlock } from "@/components/templates/BoldColorBlock";
import { SoftPastelRomantic } from "@/components/templates/SoftPastelRomantic";
import { TimelinePro } from "@/components/templates/TimelinePro";
import { Pearl } from "@/components/templates/Pearl";
import { HealthcareBoldICU } from "@/components/templates/HealthcareBoldICU";
import { ClinicalCream } from "@/components/templates/ClinicalCream";
import { HealthcareLightBlue } from "@/components/templates/HealthcareLightBlue";
import { ProjectManagementOrange } from "@/components/templates/ProjectManagementOrange";
import { EditorialNavy } from "@/components/templates/EditorialNavy";
import { DarkBoldMarketing } from "@/components/templates/DarkBoldMarketing";
import { CulinaryChef } from "@/components/templates/CulinaryChef";
import { VisualStoryteller } from "@/components/templates/VisualStoryteller";
import { ScrapbookJournal } from "@/components/templates/ScrapbookJournal";
import { BeautyArtist } from "@/components/templates/BeautyArtist";
import { ChefMenu } from "@/components/templates/ChefMenu";
import { CyberNeonAdmin } from "@/components/templates/CyberNeonAdmin";
import { VelvetGoldAdmin } from "@/components/templates/VelvetGoldAdmin";
import { AmberCyberAdmin } from "@/components/templates/AmberCyberAdmin";
import {
  alexChen,
  amaraHassan,
  ayeshaKhan,
  edwardLindqvist,
  juliaCortazar,
  laylaHassan,
  marcusWebb,
  mayaRodriguez,
  priyaPatel,
  saraKhan,
  sofiaMarchetti,
  zaraOkonkwo,
} from "@/lib/sample-cv-data";
import { makeRecipeComponent } from "@/components/templates/engine";
import type {
  CulturalFitISO,
  RecipeMood,
  RecipeRole,
} from "@/components/templates/engine/recipe-types";
import { RECIPE_LIST } from "@/lib/recipes";
import {
  PERSONAS,
  bpoBold,
  healthcareBoldIcu,
  healthcareRefined,
  projectManagementBoldSenior,
  marketingEditorialSenior,
  marketingBoldDark,
  type PersonaId,
} from "@/lib/personas";
import { hospitalityBold } from "@/lib/personas/hospitality-bold";

export type TemplateMeta = {
  slug: string;
  name: string;
  tier: "free" | "premium";
  tagline: string;
  description: string;
  /**
   * Component contract. `printSafe` is added in Stage 2 — recipe-driven
   * templates honor it, hand-coded templates ignore it (extra props on
   * a React component are harmless).
   */
  Component: ComponentType<{ data: CVData; paginated?: boolean }>;
  sampleData?: CVData;
  /** Stage 2 metadata. Hand-coded universal templates leave these
   * unset; recipe-driven role × mood templates populate them. */
  role?: RecipeRole;
  mood?: RecipeMood;
  /** ISO-3166 alpha-2. Internal-only — surfaced on /jobs/<country>
   * recommendations, never exposed as a chip on /templates. */
  culturalFit?: CulturalFitISO[];
  /** "recipe" | "hand-coded". Dual-source registry; the eyeballs of
   * the picker can't tell the difference, but the editor & paywall
   * code paths can. */
  source: "recipe" | "hand-coded";
  /** Discovery tags. Mirrors `tags` on TemplateRecipe; surfaces in
   * /jobs/<country> and search-style filters. Optional — universal
   * hand-coded templates leave it unset. */
  tags?: string[];
  /** ISO 8601 datetime when this template was added to the catalog.
   * REQUIRED — drives the homepage's descending-by-date sort, so that
   * newly shipped templates surface at the top without anyone having to
   * touch a manual allowlist. For hand-coded templates this is sourced
   * from `git log --diff-filter=A --follow`; for recipe-driven templates
   * it's propagated from `TemplateRecipe.addedAt` via the registry
   * mapper below. */
  addedAt: string;
};

/**
 * Hand-coded universal templates. The 12 entries below are LOCKED — Stage
 * 2 of the factory is additive only. Any visual changes here would
 * silently re-style users' saved CVs. Don't touch.
 */
const HAND_CODED_TEMPLATES: TemplateMeta[] = [
  {
    slug: "classic-serif",
    name: "Classic Serif",
    tier: "free",
    tagline: "Timeless · Formal · Single-column",
    description:
      "A timeless, formal CV layout with a single-column structure. Designed for executives, consultants, and traditional industries.",
    Component: ClassicSerif,
    sampleData: mayaRodriguez,
    source: "hand-coded",
    addedAt: "2026-04-29T03:03:26Z",
  },
  {
    slug: "modern-mono",
    name: "Modern Mono",
    tier: "free",
    tagline: "Modern · Tech · Sidebar",
    description:
      "A clean tech-focused layout with a mint sidebar for contact and skills, content on the right.",
    Component: ModernMono,
    sampleData: alexChen,
    source: "hand-coded",
    addedAt: "2026-04-29T20:06:30Z",
  },
  {
    slug: "editorial-bold",
    name: "Editorial Bold",
    tier: "free",
    tagline: "Bold · Creative · Magazine",
    description:
      "A magazine-style CV with a gold banner header and 2-column body. Perfect for marketing, brand, and creative roles.",
    Component: EditorialBold,
    sampleData: priyaPatel,
    source: "hand-coded",
    addedAt: "2026-04-29T03:03:26Z",
  },
  {
    slug: "photo-forward",
    name: "Photo Forward",
    tier: "free",
    tagline: "Editorial · Photo-Led · Confident",
    description:
      "Big-photo editorial layout for photographers, designers, and visual creatives. Vogue-spread feel with restrained typography.",
    Component: PhotoForward,
    sampleData: sofiaMarchetti,
    source: "hand-coded",
    addedAt: "2026-04-30T03:10:00Z",
  },
  {
    slug: "minimalist-mono",
    name: "Minimalist Mono",
    tier: "free",
    tagline: "Executive · Pure Typography · Restrained",
    description:
      "For senior executives, consultants, and advisors. Zero color, generous whitespace, confident typographic restraint. The black suit of CV templates.",
    Component: MinimalistMono,
    sampleData: edwardLindqvist,
    source: "hand-coded",
    addedAt: "2026-04-30T03:50:14Z",
  },
  {
    slug: "atelier",
    name: "Atelier",
    tier: "premium",
    tagline: "Card-based · Multilingual · Feminine",
    description:
      "Soft peach-and-lavender card-based layout. Multilingual-friendly. Designed for designers, students, and creative professionals.",
    Component: Atelier,
    sampleData: ayeshaKhan,
    source: "hand-coded",
    addedAt: "2026-04-29T03:03:26Z",
  },
  {
    slug: "director",
    name: "Director",
    tier: "premium",
    tagline: "Bold · Creative · Editorial",
    description:
      "Sage-and-cream split with bold typography. Built for art directors, creative leads, and design veterans.",
    Component: Director,
    sampleData: marcusWebb,
    source: "hand-coded",
    addedAt: "2026-04-29T03:03:26Z",
  },
  {
    slug: "atelier-pro",
    name: "Atelier Pro",
    tier: "premium",
    tagline: "Sidebar · Multilingual · Premium",
    description:
      "Cream content with a gold premium sidebar. Logros, Software, Competencias style. For multilingual professionals and senior creatives.",
    Component: AtelierPro,
    sampleData: juliaCortazar,
    source: "hand-coded",
    addedAt: "2026-04-30T01:37:37Z",
  },
  {
    slug: "bold-color-block",
    name: "Bold Color Block",
    tier: "premium",
    tagline: "Geometric · Vibrant · Agency",
    description:
      "Geometric color shapes, confident type, agency-grade visual energy. For creative directors, designers, and marketers whose work is visual.",
    Component: BoldColorBlock,
    sampleData: zaraOkonkwo,
    source: "hand-coded",
    addedAt: "2026-04-30T04:00:22Z",
  },
  {
    slug: "soft-pastel-romantic",
    name: "Soft Pastel",
    tier: "free",
    tagline: "Warm · Organic · Hand-Crafted Feel",
    description:
      "Soft pastels, organic shapes, and gentle typography. For wellness practitioners, educators, hospitality professionals, and anyone whose work is rooted in care.",
    Component: SoftPastelRomantic,
    sampleData: amaraHassan,
    source: "hand-coded",
    addedAt: "2026-04-30T04:13:53Z",
  },
  {
    slug: "timeline-pro",
    name: "Timeline Pro",
    tier: "premium",
    tagline: "Show your career trajectory",
    description:
      "Vertical timeline layout with dated milestones for mid-senior professionals with a clear career arc. Coral rail and connectors highlight progression. Ideal for marketers, product managers, brand strategists, and consultants.",
    Component: TimelinePro,
    sampleData: laylaHassan,
    source: "hand-coded",
    addedAt: "2026-05-06T04:42:31Z",
  },
  {
    slug: "pearl",
    name: "Pearl",
    tier: "premium",
    tagline: "Elegant sidebar with pill labels",
    description:
      "Two-column premium template with peach sidebar, photo prominence, and pill-shaped section labels. Inspired by editorial CV design. Ideal for marketers, brand managers, and consumer-facing professionals who want warmth and elegance.",
    Component: Pearl,
    sampleData: saraKhan,
    source: "hand-coded",
    addedAt: "2026-05-06T04:59:33Z",
  },
  {
    slug: "healthcare-bold-icu-handcoded",
    name: "Trusted Critical Care",
    tier: "premium",
    tagline: "Clinical · Color-Blocked · ICU-Ready",
    description:
      "Hand-coded healthcare layout with cream-and-sage color blocking, tinted clinical photo, and a navy specialised-skills strip. Built for ICU, ER, and critical-care nurses — especially the Filipino nursing diaspora applying into the Gulf, UK, and Singapore.",
    Component: HealthcareBoldICU,
    sampleData: healthcareBoldIcu,
    role: "healthcare",
    mood: "bold",
    culturalFit: ["PH", "AE", "SA", "KW", "QA", "SG", "GB", "IE"],
    source: "hand-coded",
    tags: [
      "healthcare",
      "nurse",
      "icu",
      "critical-care",
      "bold",
      "color-blocked",
      "filipino-diaspora",
    ],
    addedAt: "2026-05-09T17:00:45Z",
  },
  {
    slug: "healthcare-clinical-cream-handcoded",
    name: "Clinical Cream",
    tier: "premium",
    tagline: "Clinical · Cream Canvas · ICU-Ready",
    description:
      "Hand-coded healthcare layout with a cream canvas, an 18px sage stripe at photo left, and teal accents on heading and footer. Five horizontal zones with clinical experience prioritized in the right column. For ICU, ER, and critical-care nurses — same audience as Trusted Critical Care, in a softer cream-dominant palette.",
    Component: ClinicalCream,
    sampleData: healthcareBoldIcu,
    role: "healthcare",
    mood: "refined",
    culturalFit: ["PH", "AE", "SA", "KW", "QA", "SG", "GB", "IE"],
    source: "hand-coded",
    tags: [
      "healthcare",
      "nurse",
      "icu",
      "critical-care",
      "clinical",
      "cream",
      "refined",
      "filipino-diaspora",
    ],
    addedAt: "2026-05-11T01:14:44Z",
  },
  {
    slug: "healthcare-light-blue-handcoded",
    name: "Light-blue Label-Column",
    tier: "premium",
    tagline: "Calm · Refined · Healthcare · Label-column",
    description:
      "Refined alternative to Clinical Cream for healthcare professionals who prefer a cool, calm aesthetic. Light-blue page background, italic display name, uppercase section labels in a left column, and a 2-column certifications grid at the bottom. Designed for nurses, allied health professionals, and clinical generalists.",
    Component: HealthcareLightBlue,
    sampleData: healthcareRefined,
    role: "healthcare",
    mood: "refined",
    culturalFit: ["PH", "AE", "SA", "KW", "QA", "SG", "GB", "IE"],
    source: "hand-coded",
    tags: [
      "healthcare",
      "nurse",
      "clinical",
      "refined",
      "label-column",
      "light-blue",
      "certifications-grid",
      "italic-display",
    ],
    addedAt: "2026-05-11T21:26:12Z",
  },
  {
    slug: "project-management-orange-handcoded",
    name: "Orange Project Manager",
    tier: "premium",
    tagline: "Bold corporate CV with warm orange hero and editorial spine",
    description:
      "Designed for senior project managers, program leaders, and corporate strategists. Warm orange hero band carries name, summary, and contact, with a signature 6-petal asterisk and a subtle navy spine line running through the body. Two-column layout pairs Work Experience and Additional Experience (certifications) on the left with Skills and Education on the right. Sun-burst accent anchors the bottom-right. Authority with warmth.",
    Component: ProjectManagementOrange,
    sampleData: projectManagementBoldSenior,
    role: "project-management",
    mood: "bold",
    culturalFit: ["GB", "US", "DE", "ES", "FR", "NL", "AE", "SG"],
    source: "hand-coded",
    tags: [
      "project-management",
      "pm",
      "corporate",
      "bold",
      "orange",
      "two-column",
      "additional-experience",
      "asterisk",
      "multilingual",
    ],
    addedAt: "2026-05-11T22:27:43Z",
  },
  {
    slug: "editorial-navy-handcoded",
    name: "Editorial Navy",
    tier: "premium",
    tagline: "Premium dark-navy CV with editorial typography and circular photo",
    description:
      "A typography-led CV on a deep navy canvas with warm cream text. Single-color treatment — hierarchy comes from weight, size, and whitespace alone, with no decorative flourishes. Hero pairs a dominant name and uppercase role with a circular photo slot (graceful initials fallback if no photo). Two-column body places Summary and Education on the left, Experience and Skills on the right. Designed for senior marketing managers, communications strategists, and consulting roles where editorial gravitas signals premium quality.",
    Component: EditorialNavy,
    sampleData: marketingEditorialSenior,
    role: "marketing",
    mood: "bold",
    culturalFit: ["AE", "SA", "QA", "KW", "EG", "FR", "ES", "IT", "DE"],
    source: "hand-coded",
    tags: [
      "marketing",
      "editorial",
      "navy",
      "dark-bg",
      "single-color",
      "circular-photo",
      "two-column",
      "typography-led",
      "premium",
    ],
    addedAt: "2026-05-11T23:01:41Z",
  },
  {
    slug: "dark-bold-marketing-handcoded",
    name: "Dark Bold Marketing",
    tier: "premium",
    tagline: "Bold charcoal CV with yellow accent name and achievements-led structure",
    description:
      "The boldest visual statement in the library. Pure charcoal canvas, a single warm-yellow accent reserved for the name, and a magazine-masthead layout where uppercase section labels run down the left margin and content fills the right. The asterisk-in-circle logo echoes Orange Project Manager's asterisk motif inverted for dark backgrounds. Includes a single-column ACHIEVEMENTS section for measurable wins — ideal for senior marketers, growth managers, and consulting roles where results take center stage.",
    Component: DarkBoldMarketing,
    sampleData: marketingBoldDark,
    role: "marketing",
    mood: "bold",
    culturalFit: ["US", "GB", "CA", "AU", "DE", "NL", "SG", "AE"],
    source: "hand-coded",
    tags: [
      "marketing",
      "dark",
      "bold",
      "yellow-accent",
      "charcoal",
      "left-margin-labels",
      "achievements",
      "asterisk-circle",
      "two-column-content",
    ],
    addedAt: "2026-05-11T23:34:18Z",
  },
  {
    slug: "culinary-chef-handcoded",
    name: "Culinary Chef",
    tier: "premium",
    tagline: "Warm, kitchen-toned CV that instantly reads as culinary",
    description:
      "Designed for chefs, sous chefs, and culinary professionals. Charcoal header with a chef's-toque mark and fork-and-knife divider; warm wood contact strip; clean cream body with Kitchen Experience, Specialties, Certifications and Education. Profession-evident at a glance.",
    Component: CulinaryChef,
    sampleData: hospitalityBold,
    role: "hospitality-chef",
    mood: "bold",
    culturalFit: ["IT", "GB", "US", "FR", "AE", "ES"],
    source: "hand-coded",
    tags: [
      "chef",
      "culinary",
      "kitchen",
      "hospitality",
      "warm",
      "photo",
      "two-column",
    ],
    addedAt: "2026-05-18T19:10:29Z",
  },
  {
    slug: "visual-storyteller-handcoded",
    name: "Visual Storyteller",
    tier: "premium",
    tagline: "Dark cinematic photographer CV with film-strip rail and amber accents",
    description:
      "Designed for photographers, visual creatives, and brand storytellers. Stage-black hero with a camera-aperture mark, perforated film-strip rail along the left edge, and amber accents in the headline. Clean paper body with Experience, Exhibitions & Awards, Skills and Education. Profession-evident at a glance.",
    Component: VisualStoryteller,
    sampleData: sofiaMarchetti,
    mood: "bold",
    source: "hand-coded",
    tags: [
      "photography",
      "photographer",
      "visual-creative",
      "cinematic",
      "dark",
      "film-strip",
      "amber",
      "bold",
      "two-column",
    ],
    addedAt: "2026-05-18T19:50:03Z",
  },
  {
    slug: "scrapbook-journal-handcoded",
    name: "Scrapbook Journal",
    tier: "premium",
    tagline: "A warm hand-crafted journal — washi, doodles, polaroid; for creative & artistic CVs",
    description:
      "Scrapbook/journal premium template: kraft texture, torn note cards, hand-drawn doodle frames, washi tape, polaroid photo (3-branch photoUrl), lined-notepad skills. Sections: Profile, Experience, Education, Skills, Awards.",
    Component: ScrapbookJournal,
    sampleData: juliaCortazar,
    mood: "bold",
    source: "hand-coded",
    tags: [
      "scrapbook",
      "journal",
      "creative",
      "multimedia",
      "hand-crafted",
      "washi-tape",
      "polaroid",
      "torn-paper",
      "kraft",
      "bold",
    ],
    addedAt: "2026-05-18T22:50:37Z",
  },
  {
    slug: "beauty-artist-handcoded",
    name: "Beauty Artist",
    tier: "premium",
    tagline: "Hand-illustrated beauty CV — roses, rose-gold brushes, blush marble; for makeup & salon",
    description:
      "Premium beauty/cosmetic template: blush-marble page with hand-drawn SVG roses and rose-gold makeup brushes cascading left, white content card right, circular rose-gold photo frame (3-branch photoUrl), elegant serif headings. Sections: Profile, Experience, Education, Skills, Awards.",
    Component: BeautyArtist,
    sampleData: juliaCortazar,
    mood: "bold",
    source: "hand-coded",
    tags: [
      "beauty",
      "makeup",
      "cosmetic",
      "salon",
      "elegant",
      "floral",
      "rose-gold",
      "feminine",
      "hand-illustrated",
    ],
    addedAt: "2026-05-19T01:25:35Z",
  },
  {
    slug: "chef-menu-handcoded",
    name: "Chef Menu",
    tier: "premium",
    tagline: "Menu-style chef CV on a kitchen flatlay — wooden card, real ingredients, scattered herbs",
    description:
      "Premium chef/hospitality template designed like a printed restaurant menu on a wooden cutting board. Real photographic kitchen flatlay backdrop (knife, herbs, garlic, tomatoes, mushrooms on slate). Centered cream paper card with section title + accent label rows (MENU, SIGNATURE, TRAINING, HONORS), thin gold rules, dark olive bullets. White serif name and chef-toque mark crown the page above the card.",
    Component: ChefMenu,
    sampleData: hospitalityBold,
    role: "hospitality-chef",
    mood: "bold",
    culturalFit: ["IT", "GB", "US", "FR", "AE", "ES", "MX"],
    source: "hand-coded",
    tags: [
      "chef",
      "culinary",
      "kitchen",
      "hospitality",
      "menu",
      "wooden",
      "dark",
      "photographic",
      "flatlay",
      "cutting-board",
    ],
    addedAt: "2026-05-19T02:31:12Z",
  },
  {
    slug: "cyber-neon-admin-handcoded",
    name: "Cyber Neon Admin",
    tier: "premium",
    tagline: "Futuristic dark CV with neon-green accents, hex-mesh, and an octagon badge — for tech-forward admin & ops roles",
    description:
      "Premium cyberpunk/tech-UI template for office managers, executive assistants, and operations leads who work alongside engineering teams. Deep emerald canvas with sweeping neon-green light streaks, hex-mesh texture top-left, isometric building blocks and circuit graphs on the right, and a top-right neon octagon badge that frames the photo (or shows a neon avatar silhouette when none). Content sits in a sci-fi UI panel with neon border and hex-cut corners. Chrome-styled name with neon outline.",
    Component: CyberNeonAdmin,
    sampleData: bpoBold,
    mood: "bold",
    source: "hand-coded",
    tags: [
      "admin",
      "office-manager",
      "operations",
      "tech-adjacent",
      "cyber",
      "neon",
      "dark",
      "futuristic",
      "octagon",
      "hex-mesh",
      "circuit",
    ],
    addedAt: "2026-05-24T01:30:00Z",
  },
  {
    slug: "velvet-gold-admin-handcoded",
    name: "Velvet Gold Admin",
    tier: "premium",
    tagline: "Dark velvet CV with a swirling satin ribbon, gold name, and floating office props — for refined admin & ops roles",
    description:
      "Premium velvet/satin template for office managers, executive assistants, and operations leads who want a refined dark aesthetic rather than a cyber one. Deep indigo canvas with violet and peach halos, a signature silky satin ribbon swirling diagonally across the page, scattered gold diamond sparkles, and floating isometric office props (desktop monitor, office chair, document stack) on the right. Bright gold display name with glow; circular cream-bordered photo top-left.",
    Component: VelvetGoldAdmin,
    sampleData: bpoBold,
    mood: "refined",
    source: "hand-coded",
    tags: [
      "admin",
      "office-manager",
      "operations",
      "executive-assistant",
      "velvet",
      "satin",
      "silk-ribbon",
      "gold",
      "dark",
      "refined",
      "office-props",
    ],
    addedAt: "2026-05-24T03:15:00Z",
  },
  {
    slug: "amber-cyber-admin-handcoded",
    name: "Amber Cyber Admin",
    tier: "premium",
    tagline: "Warm-amber neon counterpart to Cyber Neon Admin — for tech-forward admin & ops roles",
    description:
      "Premium cyber/tech-UI template, warm-amber colorway. The hot cousin of Cyber Neon Admin (cool cyan-green): near-black canvas with sweeping amber light streaks, octagon photo badge top-left (mirrored from the green version), chevron-marker section titles (▶ EXPERIENCE), and a dense right-column tech cluster (server racks, network graph, terminal panel, bar chart, wireframe cubes). Chrome-styled name with amber outline. Same audience as Cyber Neon: office managers, executive assistants, ops leads.",
    Component: AmberCyberAdmin,
    sampleData: bpoBold,
    mood: "bold",
    source: "hand-coded",
    tags: [
      "admin",
      "office-manager",
      "operations",
      "tech-adjacent",
      "cyber",
      "amber",
      "neon",
      "dark",
      "futuristic",
      "octagon",
      "chevron",
      "server-rack",
    ],
    addedAt: "2026-05-24T04:45:00Z",
  },
];

/**
 * Recipe-driven templates — Stage 2. Built from TemplateRecipe objects
 * via makeRecipeComponent(). Adding a new role × mood × variant means
 * dropping a recipe file under src/lib/recipes/<role>/ and importing
 * it from src/lib/recipes/index.ts; the registry picks it up here
 * automatically.
 */
const RECIPE_TEMPLATES: TemplateMeta[] = RECIPE_LIST.map((recipe) => ({
  slug: recipe.slug,
  name: recipe.name,
  tier: recipe.tier,
  tagline: recipe.tagline,
  description: recipe.description,
  Component: makeRecipeComponent(recipe),
  sampleData: PERSONAS[recipe.preview_persona_id as PersonaId],
  role: recipe.role,
  mood: recipe.mood,
  culturalFit: recipe.cultural_fit,
  source: "recipe",
  addedAt: recipe.addedAt,
}));

export const TEMPLATE_LIST: TemplateMeta[] = [
  ...HAND_CODED_TEMPLATES,
  ...RECIPE_TEMPLATES,
];

export const TEMPLATES: Record<string, TemplateMeta> = Object.fromEntries(
  TEMPLATE_LIST.map((t) => [t.slug, t]),
);

export function getTemplate(slug: string): TemplateMeta {
  return TEMPLATES[slug] ?? TEMPLATES["classic-serif"];
}

export function isKnownTemplate(slug: string): boolean {
  return slug in TEMPLATES;
}
