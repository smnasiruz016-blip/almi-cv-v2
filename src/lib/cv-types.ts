export type CVData = {
  basics: {
    fullName: string;
    role: string;
    email: string;
    phone?: string;
    location?: string;
    website?: string;
    linkedIn?: string;
    photoUrl?: string;
    summary?: string;
  };
  experience: Array<{
    company: string;
    role: string;
    location?: string;
    startDate: string;
    endDate?: string;
    bullets: string[];
  }>;
  education: Array<{
    school: string;
    degree: string;
    location?: string;
    startDate: string;
    endDate: string;
    notes?: string;
  }>;
  skills: string[];
  projects?: Array<{
    name: string;
    description: string;
    url?: string;
  }>;
  languages?: Array<{
    name: string;
    level: string;
  }>;
  awards?: Array<{
    title: string;
    issuer?: string;
    year: string;
  }>;
  certifications?: Array<{
    name: string;
    issuer?: string;
    year?: string;
  }>;
  interests?: string[];
  style?: {
    themeKey?: ThemeKey;
    headingFont?: HeadingFontKey;
    bodyFont?: BodyFontKey;
    accent?: AccentKey;
    sectionStyle?: SectionStyleKey;
    photoStyle?: PhotoStyleKey;
    density?: DensityKey;
  };
};

export type ThemeKey =
  | "plum"
  | "navy"
  | "forest"
  | "wine"
  | "charcoal"
  | "coral"
  | "sky"
  | "slate"
  | "terracotta"
  | "midnight"
  | "ivory"
  | "linen"
  | "pearl"
  | "sand";
export type HeadingFontKey =
  | "fraunces"
  | "playfair"
  | "inter"
  | "jakarta"
  | "crimson"
  | "manrope"
  | "dmserif"
  | "lora";

export type BodyFontKey =
  | "inter"
  | "plex"
  | "source"
  | "dmsans"
  | "worksans"
  | "nunito";

export type AccentKey = "mint" | "gold" | "coral" | "lavender" | "sage" | "sky";
export type SectionStyleKey = "uppercase" | "titlecase" | "underlined" | "boxed";
export type PhotoStyleKey = "round" | "square" | "none";
export type DensityKey = "spacious" | "comfortable" | "compact";
