"use client";

import type { CSSProperties, ReactNode } from "react";
import {
  AccentBlock,
  ContactList,
  DecorativeShape,
  HeaderBlock,
  HeroBanner,
  ICON_ALLOWLIST,
  LanguagesBlock,
  OrganicDivider,
  PatternStrip,
  PhotoFrame,
  SectionHeading,
  SingleColumnLayout,
  SkillsBlock,
  TimelineSection,
  TwoColumnLayout,
  type ContactItem,
  type FontDef,
  type LanguageItem,
  type ThemeColors,
  type TimelineEntry,
} from "@/components/templates/primitives";
import { renderRecipe } from "@/components/templates/engine";
import { healthcareBoldClinicalV1 } from "@/lib/recipes";
import { healthcareBold } from "@/lib/personas";

const HEADING_FONT: FontDef = {
  cssVar: "var(--font-fraunces)",
  fallback: "Georgia, serif",
};

const BODY_FONT: FontDef = {
  cssVar: "var(--font-inter)",
  fallback: "system-ui, sans-serif",
};

const LIGHT_WARM: ThemeColors = {
  primary: "#FFE8D6",
  primarySoft: "#FFF5E8",
  primaryText: "#2D1B3D",
  text: "#2D1B3D",
  textSoft: "#6B5B7A",
  textFaint: "#9D8FAB",
  accent: "#FF7A6B",
  surface: "#FFFBF5",
};

const DARK_COOL: ThemeColors = {
  primary: "#0F1729",
  primarySoft: "#1A2238",
  primaryText: "#F8FAFC",
  text: "#F8FAFC",
  textSoft: "#94A3B8",
  textFaint: "#64748B",
  accent: "#5EEAD4",
  surface: "#0A0F1F",
};

const SAMPLE_CONTACTS: ContactItem[] = [
  { kind: "email", value: "alex@example.com" },
  { kind: "phone", value: "+1 555 123 4567" },
  { kind: "location", value: "Berlin, DE" },
  { kind: "website", value: "alex.example.com" },
  { kind: "linkedin", value: "linkedin.com/in/alex" },
];

const SAMPLE_ENTRIES: TimelineEntry[] = [
  {
    title: "Acme Inc.",
    subtitle: "Senior Designer",
    meta: "Berlin",
    startDate: "2022",
    bullets: [
      "Led brand refresh across three product lines, lifting recall scores by 18%.",
      "Mentored four junior designers and ran weekly critiques.",
      "Shipped a unified component library used by 9 product teams.",
    ],
  },
  {
    title: "Studio Foo",
    subtitle: "Designer",
    meta: "Remote",
    startDate: "2019",
    endDate: "2022",
    bullets: [
      "Delivered 12 client projects spanning identity, web, and print.",
    ],
  },
];

const SAMPLE_SKILLS = [
  "Figma",
  "Sketch",
  "Brand Identity",
  "Typography",
  "Motion",
  "User Research",
];

const SAMPLE_GROUPED: Record<string, string[]> = {
  Design: ["Figma", "Sketch", "Illustrator", "Photoshop"],
  Web: ["HTML", "CSS", "React", "Next.js"],
  Process: ["User Research", "Interaction Design", "Prototyping"],
};

const SAMPLE_SKILL_LEVELS: Record<string, number> = {
  Figma: 95,
  Sketch: 80,
  "Brand Identity": 90,
  Typography: 85,
  Motion: 60,
  "User Research": 75,
};

const skillLevelExtractor = (skill: string): number =>
  SAMPLE_SKILL_LEVELS[skill] ?? 50;

const SAMPLE_LANGUAGES: LanguageItem[] = [
  { name: "English", level: "C2" },
  { name: "Spanish", level: "B2" },
  { name: "French", level: "A2" },
];

const FRIENDLY_LEVELS = { C2: "Native", B2: "Upper", A2: "Basic" };

function ThemeSurface({
  theme,
  label,
  children,
}: {
  theme: ThemeColors;
  label: string;
  children: ReactNode;
}) {
  const style: CSSProperties = {
    backgroundColor: theme.surface,
    color: theme.text,
    fontFamily: `${BODY_FONT.cssVar}, ${BODY_FONT.fallback}`,
    padding: "1.5rem",
    borderRadius: "0.75rem",
    border: `1px solid ${theme.textFaint}`,
    minHeight: "100%",
  };
  return (
    <div>
      <p
        style={{
          fontSize: "11px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#6B7280",
          margin: "0 0 0.5rem 0",
        }}
      >
        {label}
      </p>
      <div style={style}>{children}</div>
    </div>
  );
}

function VariantBlock({
  title,
  propsLabel,
  light,
  dark,
}: {
  title: string;
  propsLabel: string;
  light: ReactNode;
  dark: ReactNode;
}) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <p
        style={{
          margin: "0 0 0.25rem 0",
          fontWeight: 600,
          color: "#111827",
        }}
      >
        {title}
      </p>
      <pre
        style={{
          margin: "0 0 0.75rem 0",
          fontSize: "12px",
          color: "#4B5563",
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
          whiteSpace: "pre-wrap",
        }}
      >
        {propsLabel}
      </pre>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
        }}
      >
        <ThemeSurface theme={LIGHT_WARM} label="LIGHT WARM">
          {light}
        </ThemeSurface>
        <ThemeSurface theme={DARK_COOL} label="DARK COOL">
          {dark}
        </ThemeSurface>
      </div>
    </div>
  );
}

function PrimitiveSection({
  letter,
  name,
  children,
}: {
  letter: string;
  name: string;
  children: ReactNode;
}) {
  return (
    <section
      style={{
        marginBottom: "3rem",
        paddingTop: "1.5rem",
        borderTop: "2px solid #E5E7EB",
      }}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          color: "#111827",
          margin: "0 0 1.25rem 0",
        }}
      >
        {letter}. {name}
      </h2>
      {children}
    </section>
  );
}

function renderSidebarBlock(theme: ThemeColors): ReactNode {
  return (
    <div style={{ padding: "1.25rem" }}>
      <p
        style={{
          fontSize: "11px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: theme.textSoft,
          margin: "0 0 0.5rem 0",
        }}
      >
        Contact
      </p>
      <ContactList
        items={SAMPLE_CONTACTS}
        orientation="vertical"
        textColor={theme.text}
        iconColor={theme.textSoft}
      />
    </div>
  );
}

function renderMainBlock(theme: ThemeColors): ReactNode {
  return (
    <div style={{ padding: "1.25rem" }}>
      <SectionHeading
        variant="plain"
        color={theme.text}
        accentColor={theme.accent}
        headingFont={HEADING_FONT}
      >
        EXPERIENCE
      </SectionHeading>
      <div style={{ marginTop: "0.75rem" }}>
        <TimelineSection
          entries={SAMPLE_ENTRIES.slice(0, 1)}
          textColor={theme.text}
          textSoftColor={theme.textSoft}
          accentColor={theme.accent}
        />
      </div>
    </div>
  );
}

function renderHeader(theme: ThemeColors): ReactNode {
  return (
    <HeaderBlock
      name="Alex Rivera"
      role="Senior Brand Designer"
      contacts={SAMPLE_CONTACTS.slice(0, 3)}
      headingFont={HEADING_FONT}
      bg={theme.primary}
      fg={theme.primaryText}
      fgSoft={theme.textSoft}
      accentColor={theme.accent}
    />
  );
}

export function PreviewClient() {
  return (
    <main
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "2rem",
        color: "#111827",
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, sans-serif",
      }}
    >
      <header style={{ marginBottom: "2rem" }}>
        <p
          style={{
            display: "inline-block",
            padding: "0.25rem 0.75rem",
            borderRadius: "9999px",
            backgroundColor: "#FEF3C7",
            color: "#92400E",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            margin: "0 0 0.75rem 0",
          }}
        >
          Internal · Not visible in production
        </p>
        <h1
          style={{
            margin: 0,
            fontSize: "2rem",
            fontWeight: 700,
          }}
        >
          Layout Primitives — Preview
        </h1>
        <p
          style={{
            margin: "0.5rem 0 0 0",
            color: "#4B5563",
            fontSize: "0.95rem",
            maxWidth: 720,
          }}
        >
          Each primitive is rendered with two mock themes side by side
          (light/warm on the left, dark/cool on the right) so styling reacts to
          theme changes the same way it will in real templates.
        </p>
      </header>

      <PrimitiveSection letter="A" name="TwoColumnLayout">
        <VariantBlock
          title="Left sidebar at 35% — typical resume layout"
          propsLabel='sidebarPosition="left"  sidebarWidthPercent={35}'
          light={
            <TwoColumnLayout
              sidebarPosition="left"
              sidebarWidthPercent={35}
              sidebarBg={LIGHT_WARM.primarySoft}
              mainBg={LIGHT_WARM.surface}
              sidebar={renderSidebarBlock(LIGHT_WARM)}
              main={renderMainBlock(LIGHT_WARM)}
            />
          }
          dark={
            <TwoColumnLayout
              sidebarPosition="left"
              sidebarWidthPercent={35}
              sidebarBg={DARK_COOL.primarySoft}
              mainBg={DARK_COOL.surface}
              sidebar={renderSidebarBlock(DARK_COOL)}
              main={renderMainBlock(DARK_COOL)}
            />
          }
        />
        <VariantBlock
          title="Right sidebar at 30% — sidebar flipped"
          propsLabel='sidebarPosition="right"  sidebarWidthPercent={30}'
          light={
            <TwoColumnLayout
              sidebarPosition="right"
              sidebarWidthPercent={30}
              sidebarBg={LIGHT_WARM.primary}
              mainBg={LIGHT_WARM.surface}
              sidebar={renderSidebarBlock(LIGHT_WARM)}
              main={renderMainBlock(LIGHT_WARM)}
            />
          }
          dark={
            <TwoColumnLayout
              sidebarPosition="right"
              sidebarWidthPercent={30}
              sidebarBg={DARK_COOL.primary}
              mainBg={DARK_COOL.surface}
              sidebar={renderSidebarBlock(DARK_COOL)}
              main={renderMainBlock(DARK_COOL)}
            />
          }
        />
      </PrimitiveSection>

      <PrimitiveSection letter="B" name="SingleColumnLayout">
        <VariantBlock
          title="Constrained width with white surface"
          propsLabel='maxWidth={680}  padding="2rem"  bg="white"'
          light={
            <SingleColumnLayout maxWidth={680} padding="2rem" bg="white">
              {renderMainBlock(LIGHT_WARM)}
            </SingleColumnLayout>
          }
          dark={
            <SingleColumnLayout
              maxWidth={680}
              padding="2rem"
              bg={DARK_COOL.surface}
            >
              {renderMainBlock(DARK_COOL)}
            </SingleColumnLayout>
          }
        />
      </PrimitiveSection>

      <PrimitiveSection letter="C" name="HeaderBlock">
        <VariantBlock
          title="Banner header — circle photo, left-aligned"
          propsLabel='photoShape="circle"  photoPosition="left"  align="left"'
          light={renderHeader(LIGHT_WARM)}
          dark={renderHeader(DARK_COOL)}
        />
        <VariantBlock
          title="Centered name + role, no photo"
          propsLabel='photoShape="none"  photoPosition="center"  align="center"'
          light={
            <HeaderBlock
              name="Alex Rivera"
              role="Senior Brand Designer"
              contacts={SAMPLE_CONTACTS.slice(0, 3)}
              headingFont={HEADING_FONT}
              photoShape="none"
              photoPosition="center"
              align="center"
              bg={LIGHT_WARM.primarySoft}
              fg={LIGHT_WARM.text}
              fgSoft={LIGHT_WARM.textSoft}
              accentColor={LIGHT_WARM.accent}
            />
          }
          dark={
            <HeaderBlock
              name="Alex Rivera"
              role="Senior Brand Designer"
              contacts={SAMPLE_CONTACTS.slice(0, 3)}
              headingFont={HEADING_FONT}
              photoShape="none"
              photoPosition="center"
              align="center"
              bg={DARK_COOL.primarySoft}
              fg={DARK_COOL.text}
              fgSoft={DARK_COOL.textSoft}
              accentColor={DARK_COOL.accent}
            />
          }
        />
      </PrimitiveSection>

      <PrimitiveSection letter="D" name="SectionHeading">
        <VariantBlock
          title="Plain (default) — uppercase tracking, no decoration"
          propsLabel='variant="plain"  size="xs"'
          light={
            <SectionHeading
              variant="plain"
              color={LIGHT_WARM.text}
              headingFont={HEADING_FONT}
            >
              EXPERIENCE
            </SectionHeading>
          }
          dark={
            <SectionHeading
              variant="plain"
              color={DARK_COOL.text}
              headingFont={HEADING_FONT}
            >
              EXPERIENCE
            </SectionHeading>
          }
        />
        <VariantBlock
          title="Underline + briefcase icon"
          propsLabel='variant="underline"  icon="briefcase"  accentColor={theme.accent}'
          light={
            <SectionHeading
              variant="underline"
              color={LIGHT_WARM.text}
              accentColor={LIGHT_WARM.accent}
              icon="briefcase"
              headingFont={HEADING_FONT}
              size="sm"
            >
              Work history
            </SectionHeading>
          }
          dark={
            <SectionHeading
              variant="underline"
              color={DARK_COOL.text}
              accentColor={DARK_COOL.accent}
              icon="briefcase"
              headingFont={HEADING_FONT}
              size="sm"
            >
              Work history
            </SectionHeading>
          }
        />
        <VariantBlock
          title="Accent bar with graduation-cap icon"
          propsLabel='variant="accent-bar"  icon="graduation-cap"'
          light={
            <SectionHeading
              variant="accent-bar"
              color={LIGHT_WARM.text}
              accentColor={LIGHT_WARM.accent}
              icon="graduation-cap"
              headingFont={HEADING_FONT}
              size="md"
            >
              Education
            </SectionHeading>
          }
          dark={
            <SectionHeading
              variant="accent-bar"
              color={DARK_COOL.text}
              accentColor={DARK_COOL.accent}
              icon="graduation-cap"
              headingFont={HEADING_FONT}
              size="md"
            >
              Education
            </SectionHeading>
          }
        />
      </PrimitiveSection>

      <PrimitiveSection letter="E" name="TimelineSection">
        <VariantBlock
          title="Default — dot bullets, inline date"
          propsLabel='showDateBadge={false}  bulletStyle="dot"'
          light={
            <TimelineSection
              entries={SAMPLE_ENTRIES}
              textColor={LIGHT_WARM.text}
              textSoftColor={LIGHT_WARM.textSoft}
              accentColor={LIGHT_WARM.accent}
            />
          }
          dark={
            <TimelineSection
              entries={SAMPLE_ENTRIES}
              textColor={DARK_COOL.text}
              textSoftColor={DARK_COOL.textSoft}
              accentColor={DARK_COOL.accent}
            />
          }
        />
        <VariantBlock
          title="Date badge + dash bullets"
          propsLabel='showDateBadge={true}  bulletStyle="dash"'
          light={
            <TimelineSection
              entries={SAMPLE_ENTRIES}
              showDateBadge
              bulletStyle="dash"
              textColor={LIGHT_WARM.text}
              textSoftColor={LIGHT_WARM.textSoft}
              accentColor={LIGHT_WARM.accent}
            />
          }
          dark={
            <TimelineSection
              entries={SAMPLE_ENTRIES}
              showDateBadge
              bulletStyle="dash"
              textColor={DARK_COOL.text}
              textSoftColor={DARK_COOL.textSoft}
              accentColor={DARK_COOL.accent}
            />
          }
        />
      </PrimitiveSection>

      <PrimitiveSection letter="F" name="SkillsBlock">
        <VariantBlock
          title="Plain list (default)"
          propsLabel='variant="plain-list"  delimiter=" · "'
          light={
            <SkillsBlock
              skills={SAMPLE_SKILLS}
              textColor={LIGHT_WARM.text}
              textSoftColor={LIGHT_WARM.textSoft}
            />
          }
          dark={
            <SkillsBlock
              skills={SAMPLE_SKILLS}
              textColor={DARK_COOL.text}
              textSoftColor={DARK_COOL.textSoft}
            />
          }
        />
        <VariantBlock
          title="Tag pills"
          propsLabel='variant="tags"  accentColor={theme.accent}'
          light={
            <SkillsBlock
              skills={SAMPLE_SKILLS}
              variant="tags"
              accentColor={LIGHT_WARM.accent}
              textColor={LIGHT_WARM.primaryText}
            />
          }
          dark={
            <SkillsBlock
              skills={SAMPLE_SKILLS}
              variant="tags"
              accentColor={DARK_COOL.accent}
              textColor={DARK_COOL.primary}
            />
          }
        />
        <VariantBlock
          title="Bars (with mock level extractor)"
          propsLabel='variant="bars"  levelExtractor={(s) => SAMPLE_SKILL_LEVELS[s]}'
          light={
            <SkillsBlock
              skills={SAMPLE_SKILLS}
              variant="bars"
              accentColor={LIGHT_WARM.accent}
              textColor={LIGHT_WARM.text}
              textSoftColor={LIGHT_WARM.textSoft}
              levelExtractor={skillLevelExtractor}
            />
          }
          dark={
            <SkillsBlock
              skills={SAMPLE_SKILLS}
              variant="bars"
              accentColor={DARK_COOL.accent}
              textColor={DARK_COOL.text}
              textSoftColor={DARK_COOL.textSoft}
              levelExtractor={skillLevelExtractor}
            />
          }
        />
        <VariantBlock
          title="Grouped"
          propsLabel='variant="grouped"  groups={...}'
          light={
            <SkillsBlock
              skills={[]}
              variant="grouped"
              groups={SAMPLE_GROUPED}
              textColor={LIGHT_WARM.text}
              textSoftColor={LIGHT_WARM.textSoft}
            />
          }
          dark={
            <SkillsBlock
              skills={[]}
              variant="grouped"
              groups={SAMPLE_GROUPED}
              textColor={DARK_COOL.text}
              textSoftColor={DARK_COOL.textSoft}
            />
          }
        />
      </PrimitiveSection>

      <PrimitiveSection letter="G" name="LanguagesBlock">
        <VariantBlock
          title="Plain (default)"
          propsLabel='variant="plain"'
          light={
            <LanguagesBlock
              languages={SAMPLE_LANGUAGES}
              textSoftColor={LIGHT_WARM.textSoft}
            />
          }
          dark={
            <LanguagesBlock
              languages={SAMPLE_LANGUAGES}
              textSoftColor={DARK_COOL.textSoft}
            />
          }
        />
        <VariantBlock
          title="Tags with friendly level labels"
          propsLabel='variant="tags"  levelLabels={{ C2: "Native", B2: "Upper", A2: "Basic" }}'
          light={
            <LanguagesBlock
              languages={SAMPLE_LANGUAGES}
              variant="tags"
              accentColor={LIGHT_WARM.accent}
              textColor={LIGHT_WARM.primaryText}
              levelLabels={FRIENDLY_LEVELS}
            />
          }
          dark={
            <LanguagesBlock
              languages={SAMPLE_LANGUAGES}
              variant="tags"
              accentColor={DARK_COOL.accent}
              textColor={DARK_COOL.primary}
              levelLabels={FRIENDLY_LEVELS}
            />
          }
        />
        <VariantBlock
          title="Bars with default CEFR scoring"
          propsLabel='variant="bars"'
          light={
            <LanguagesBlock
              languages={SAMPLE_LANGUAGES}
              variant="bars"
              accentColor={LIGHT_WARM.accent}
              textColor={LIGHT_WARM.text}
              textSoftColor={LIGHT_WARM.textSoft}
            />
          }
          dark={
            <LanguagesBlock
              languages={SAMPLE_LANGUAGES}
              variant="bars"
              accentColor={DARK_COOL.accent}
              textColor={DARK_COOL.text}
              textSoftColor={DARK_COOL.textSoft}
            />
          }
        />
      </PrimitiveSection>

      <PrimitiveSection letter="H" name="ContactList">
        <VariantBlock
          title="Horizontal (default) — header strip"
          propsLabel='orientation="horizontal"  iconStyle="outline"'
          light={
            <ContactList
              items={SAMPLE_CONTACTS}
              textColor={LIGHT_WARM.text}
              iconColor={LIGHT_WARM.accent}
            />
          }
          dark={
            <ContactList
              items={SAMPLE_CONTACTS}
              textColor={DARK_COOL.text}
              iconColor={DARK_COOL.accent}
            />
          }
        />
        <VariantBlock
          title="Vertical — sidebar style"
          propsLabel='orientation="vertical"  textSize="sm"'
          light={
            <ContactList
              items={SAMPLE_CONTACTS}
              orientation="vertical"
              textSize="sm"
              textColor={LIGHT_WARM.text}
              iconColor={LIGHT_WARM.textSoft}
            />
          }
          dark={
            <ContactList
              items={SAMPLE_CONTACTS}
              orientation="vertical"
              textSize="sm"
              textColor={DARK_COOL.text}
              iconColor={DARK_COOL.textSoft}
            />
          }
        />
        <VariantBlock
          title="Grid 2-column"
          propsLabel='orientation="grid-2col"'
          light={
            <ContactList
              items={SAMPLE_CONTACTS}
              orientation="grid-2col"
              textColor={LIGHT_WARM.text}
              iconColor={LIGHT_WARM.textSoft}
            />
          }
          dark={
            <ContactList
              items={SAMPLE_CONTACTS}
              orientation="grid-2col"
              textColor={DARK_COOL.text}
              iconColor={DARK_COOL.textSoft}
            />
          }
        />
      </PrimitiveSection>

      <PrimitiveSection letter="I" name="DecorativeShape (Stage 2)">
        <VariantBlock
          title="Organic — blob, leaf, swirl, wave, arc"
          propsLabel='shape="blob" | "leaf" | "swirl" | "wave" | "arc"'
          light={
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <DecorativeShape shape="blob" color={LIGHT_WARM.accent} width={80} height={80} />
              <DecorativeShape shape="leaf" color={LIGHT_WARM.primary} width={80} height={80} />
              <DecorativeShape shape="swirl" color={LIGHT_WARM.accent} width={80} height={80} />
              <DecorativeShape shape="wave" color={LIGHT_WARM.primary} width={80} height={80} />
              <DecorativeShape shape="arc" color={LIGHT_WARM.accent} width={80} height={80} />
            </div>
          }
          dark={
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <DecorativeShape shape="blob" color={DARK_COOL.accent} width={80} height={80} />
              <DecorativeShape shape="leaf" color={DARK_COOL.primarySoft} width={80} height={80} />
              <DecorativeShape shape="swirl" color={DARK_COOL.accent} width={80} height={80} />
              <DecorativeShape shape="wave" color={DARK_COOL.primarySoft} width={80} height={80} />
              <DecorativeShape shape="arc" color={DARK_COOL.accent} width={80} height={80} />
            </div>
          }
        />
        <VariantBlock
          title="Geometric — circle, triangle, hexagon, diamond"
          propsLabel='shape="circle" | "triangle" | "hexagon" | "diamond"'
          light={
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <DecorativeShape shape="circle" color={LIGHT_WARM.primary} width={70} height={70} />
              <DecorativeShape shape="triangle" color={LIGHT_WARM.accent} width={70} height={70} />
              <DecorativeShape shape="hexagon" color={LIGHT_WARM.primary} width={70} height={70} />
              <DecorativeShape shape="diamond" color={LIGHT_WARM.accent} width={70} height={70} />
            </div>
          }
          dark={
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <DecorativeShape shape="circle" color={DARK_COOL.primarySoft} width={70} height={70} />
              <DecorativeShape shape="triangle" color={DARK_COOL.accent} width={70} height={70} />
              <DecorativeShape shape="hexagon" color={DARK_COOL.primarySoft} width={70} height={70} />
              <DecorativeShape shape="diamond" color={DARK_COOL.accent} width={70} height={70} />
            </div>
          }
        />
        <VariantBlock
          title="printSafe — organic shapes flatten to plain colored blocks"
          propsLabel='printSafe={true}  // blob → rounded rectangle; geometric stays as-is'
          light={
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <DecorativeShape shape="blob" color={LIGHT_WARM.accent} width={80} height={80} printSafe />
              <DecorativeShape shape="leaf" color={LIGHT_WARM.primary} width={80} height={80} printSafe />
              <DecorativeShape shape="hexagon" color={LIGHT_WARM.accent} width={80} height={80} printSafe />
            </div>
          }
          dark={
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <DecorativeShape shape="blob" color={DARK_COOL.accent} width={80} height={80} printSafe />
              <DecorativeShape shape="leaf" color={DARK_COOL.primarySoft} width={80} height={80} printSafe />
              <DecorativeShape shape="hexagon" color={DARK_COOL.accent} width={80} height={80} printSafe />
            </div>
          }
        />
      </PrimitiveSection>

      <PrimitiveSection letter="J" name="AccentBlock (Stage 2)">
        <VariantBlock
          title="Solid bars — page-edge rails and section accents"
          propsLabel='color={theme.accent}  width=6  height={120}  rounded="full"'
          light={
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <AccentBlock color={LIGHT_WARM.accent} width={6} height={120} rounded="full" />
              <AccentBlock color={LIGHT_WARM.primary} width={120} height={6} rounded="full" />
              <AccentBlock color={LIGHT_WARM.accent} width={60} height={60} rounded="lg" />
            </div>
          }
          dark={
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <AccentBlock color={DARK_COOL.accent} width={6} height={120} rounded="full" />
              <AccentBlock color={DARK_COOL.primarySoft} width={120} height={6} rounded="full" />
              <AccentBlock color={DARK_COOL.accent} width={60} height={60} rounded="lg" />
            </div>
          }
        />
      </PrimitiveSection>

      <PrimitiveSection letter="K" name="HeroBanner (Stage 2)">
        <VariantBlock
          title="Diagonal-bottom clip — confident header band"
          propsLabel='clipPath="diagonal-bottom"'
          light={
            <HeroBanner
              bg={LIGHT_WARM.primary}
              fg={LIGHT_WARM.primaryText}
              clipPath="diagonal-bottom"
            >
              <h2 style={{ margin: 0, fontFamily: HEADING_FONT.cssVar }}>Alex Rivera</h2>
              <p style={{ margin: 0 }}>Senior Brand Designer</p>
            </HeroBanner>
          }
          dark={
            <HeroBanner
              bg={DARK_COOL.primary}
              fg={DARK_COOL.primaryText}
              clipPath="diagonal-bottom"
            >
              <h2 style={{ margin: 0, fontFamily: HEADING_FONT.cssVar }}>Alex Rivera</h2>
              <p style={{ margin: 0 }}>Senior Brand Designer</p>
            </HeroBanner>
          }
        />
        <VariantBlock
          title="With a decoration overlay — organic blob behind copy"
          propsLabel='decoration={<DecorativeShape shape="blob" ... />}'
          light={
            <HeroBanner
              bg={LIGHT_WARM.primary}
              fg={LIGHT_WARM.primaryText}
              decoration={
                <DecorativeShape
                  shape="blob"
                  color={LIGHT_WARM.accent}
                  width={200}
                  height={200}
                  opacity={0.4}
                  style={{ position: "absolute", top: -40, right: -40 }}
                />
              }
            >
              <h2 style={{ margin: 0, fontFamily: HEADING_FONT.cssVar }}>Alex Rivera</h2>
              <p style={{ margin: 0 }}>Senior Brand Designer</p>
            </HeroBanner>
          }
          dark={
            <HeroBanner
              bg={DARK_COOL.primary}
              fg={DARK_COOL.primaryText}
              decoration={
                <DecorativeShape
                  shape="blob"
                  color={DARK_COOL.accent}
                  width={200}
                  height={200}
                  opacity={0.4}
                  style={{ position: "absolute", top: -40, right: -40 }}
                />
              }
            >
              <h2 style={{ margin: 0, fontFamily: HEADING_FONT.cssVar }}>Alex Rivera</h2>
              <p style={{ margin: 0 }}>Senior Brand Designer</p>
            </HeroBanner>
          }
        />
      </PrimitiveSection>

      <PrimitiveSection letter="L" name="PhotoFrame (Stage 2)">
        <VariantBlock
          title="All shapes — circle, square, rounded, hexagon, diamond, soft"
          propsLabel='shape="circle" | "square" | "rounded" | "hexagon" | "diamond" | "soft"'
          light={
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {(["circle", "square", "rounded", "hexagon", "diamond", "soft"] as const).map(
                (s) => (
                  <PhotoFrame
                    key={s}
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=240&h=240&fit=crop&crop=faces"
                    alt={`${s} sample`}
                    shape={s}
                    size={80}
                    border={{ color: LIGHT_WARM.accent, width: 3 }}
                  />
                ),
              )}
            </div>
          }
          dark={
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {(["circle", "square", "rounded", "hexagon", "diamond", "soft"] as const).map(
                (s) => (
                  <PhotoFrame
                    key={s}
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=240&h=240&fit=crop&crop=faces"
                    alt={`${s} sample`}
                    shape={s}
                    size={80}
                    border={{ color: DARK_COOL.accent, width: 3 }}
                  />
                ),
              )}
            </div>
          }
        />
      </PrimitiveSection>

      <PrimitiveSection letter="M" name="PatternStrip (Stage 2)">
        <VariantBlock
          title="All 6 patterns at medium density"
          propsLabel='pattern="dots" | "lines-h" | "lines-v" | "grid" | "diagonal" | "chevron"'
          light={
            <div style={{ display: "grid", gap: "0.5rem", gridTemplateColumns: "1fr 1fr 1fr" }}>
              {(["dots", "lines-h", "lines-v", "grid", "diagonal", "chevron"] as const).map(
                (p) => (
                  <div key={p}>
                    <p style={{ fontSize: "10px", margin: "0 0 4px 0", color: LIGHT_WARM.textSoft }}>{p}</p>
                    <PatternStrip
                      pattern={p}
                      color={LIGHT_WARM.primary}
                      density="medium"
                      width="100%"
                      height={48}
                      opacity={0.6}
                    />
                  </div>
                ),
              )}
            </div>
          }
          dark={
            <div style={{ display: "grid", gap: "0.5rem", gridTemplateColumns: "1fr 1fr 1fr" }}>
              {(["dots", "lines-h", "lines-v", "grid", "diagonal", "chevron"] as const).map(
                (p) => (
                  <div key={p}>
                    <p style={{ fontSize: "10px", margin: "0 0 4px 0", color: DARK_COOL.textSoft }}>{p}</p>
                    <PatternStrip
                      pattern={p}
                      color={DARK_COOL.accent}
                      density="medium"
                      width="100%"
                      height={48}
                      opacity={0.6}
                    />
                  </div>
                ),
              )}
            </div>
          }
        />
        <VariantBlock
          title="printSafe — patterns collapse to a flat tinted band"
          propsLabel='printSafe={true}  // moiré-free in Chromium print pipeline'
          light={
            <PatternStrip
              pattern="dots"
              color={LIGHT_WARM.primary}
              density="medium"
              width="100%"
              height={48}
              opacity={0.6}
              printSafe
            />
          }
          dark={
            <PatternStrip
              pattern="dots"
              color={DARK_COOL.accent}
              density="medium"
              width="100%"
              height={48}
              opacity={0.6}
              printSafe
            />
          }
        />
      </PrimitiveSection>

      <PrimitiveSection letter="N" name="OrganicDivider (Stage 2)">
        <VariantBlock
          title="All 5 variants"
          propsLabel='variant="wave" | "scribble" | "dotted" | "soft-line" | "leaf-vine"'
          light={
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {(["wave", "scribble", "dotted", "soft-line", "leaf-vine"] as const).map((v) => (
                <div key={v}>
                  <p style={{ fontSize: "10px", margin: "0 0 4px 0", color: LIGHT_WARM.textSoft }}>{v}</p>
                  <OrganicDivider variant={v} color={LIGHT_WARM.primary} thickness={2} />
                </div>
              ))}
            </div>
          }
          dark={
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {(["wave", "scribble", "dotted", "soft-line", "leaf-vine"] as const).map((v) => (
                <div key={v}>
                  <p style={{ fontSize: "10px", margin: "0 0 4px 0", color: DARK_COOL.textSoft }}>{v}</p>
                  <OrganicDivider variant={v} color={DARK_COOL.accent} thickness={2} />
                </div>
              ))}
            </div>
          }
        />
      </PrimitiveSection>

      <PrimitiveSection letter="O" name="Recipe Engine — live render">
        <p
          style={{
            margin: "0 0 1rem 0",
            color: "#4B5563",
            fontSize: "0.95rem",
            maxWidth: 720,
          }}
        >
          The proof recipe (<code>healthcare-bold-clinical-v1</code>) rendered
          via <code>renderRecipe()</code> with the bundled persona. The same
          component is registered in the TEMPLATES catalog and is reachable
          at <code>/templates/healthcare-bold-clinical-v1</code>.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#6B7280",
                margin: "0 0 0.5rem 0",
              }}
            >
              SCREEN MODE
            </p>
            {renderRecipe(healthcareBoldClinicalV1, healthcareBold, {
              paginated: false,
              printSafe: false,
            })}
          </div>
          <div>
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#6B7280",
                margin: "0 0 0.5rem 0",
              }}
            >
              PRINT-SAFE MODE
            </p>
            {renderRecipe(healthcareBoldClinicalV1, healthcareBold, {
              paginated: false,
              printSafe: true,
            })}
          </div>
        </div>
      </PrimitiveSection>

      <footer
        style={{
          marginTop: "3rem",
          paddingTop: "1.5rem",
          borderTop: "2px solid #E5E7EB",
          fontSize: "12px",
          color: "#6B7280",
        }}
      >
        <p style={{ margin: 0 }}>
          Icon allowlist exposes {Object.keys(ICON_ALLOWLIST).length} names —
          recipes (Stage 2) reference them by string. Unknown names render
          nothing. Stage 2 added 6 decorator primitives + the recipe engine;
          all decorators honor a <code>printSafe</code> flag forwarded by
          the Puppeteer print pipeline.
        </p>
      </footer>
    </main>
  );
}
