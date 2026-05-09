"use client";

import {
  Children,
  Fragment,
  type CSSProperties,
  type ReactNode,
} from "react";
import type { CVData } from "@/lib/cv-types";
import {
  formatSectionTitle,
  resolveStyle,
  sectionLabel,
  sectionVariantStyle,
  withAlpha,
} from "@/lib/cv-themes";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";
import {
  PaginatedCV,
  type PaginatedSection,
} from "@/components/templates/PaginatedCV";
import {
  AccentBlock,
  ContactList,
  DecorativeShape,
  HeroBanner,
  LanguagesBlock,
  OrganicDivider,
  PatternStrip,
  PhotoFrame,
  SectionHeading,
  SkillsBlock,
  TimelineSection,
  type ContactItem,
} from "@/components/templates/primitives";
import type {
  ColorRef,
  DecoratorSlot,
  DecoratorSpec,
  RecipeBlock,
  RecipeFooter,
  RecipeHeader,
  SectionKey,
  TemplateRecipe,
} from "./recipe-types";

type RecipeCtx = ReturnType<typeof buildCtx>;

function buildCtx(data: CVData) {
  const resolved = resolveStyle(data?.style);
  return {
    theme: resolved.theme,
    themeName: resolved.themeName,
    themeCategory: resolved.themeCategory,
    headingFont: resolved.headingFont,
    bodyFont: resolved.bodyFont,
    density: resolved.density,
    sectionStyle: resolved.sectionStyle,
    photoStyle: resolved.photoStyle,
  };
}

function densityClass(d: RecipeCtx["density"]): string {
  return d === "compact" ? "compact" : d === "spacious" ? "spacious" : "";
}

/**
 * Resolves a ColorRef into a concrete CSS color string. The recipe
 * never knows the user's chosen theme — that's read live from
 * resolveStyle(). This lets one recipe look distinct under all 14
 * themes without baking in any palette.
 */
function resolveColor(ref: ColorRef | undefined, ctx: RecipeCtx): string | undefined {
  if (!ref) return undefined;
  if (typeof ref === "string") {
    switch (ref) {
      case "theme.primary":
        return ctx.theme.primary;
      case "theme.primarySoft":
        return ctx.theme.primarySoft;
      case "theme.primaryText":
        return ctx.theme.primaryText;
      case "theme.text":
        return ctx.theme.text;
      case "theme.textSoft":
        return ctx.theme.textSoft;
      case "theme.textFaint":
        return ctx.theme.textFaint;
      case "theme.accent":
        return ctx.theme.accent;
      case "theme.surface":
        return ctx.theme.surface;
    }
  }
  if (ref.kind === "alpha") {
    const base = resolveColor(ref.ref, ctx);
    if (!base) return undefined;
    if (!base.startsWith("#")) return base;
    return withAlpha(base, ref.alpha);
  }
  if (ref.kind === "literal") return ref.hex;
  return undefined;
}

function buildContacts(data: CVData): ContactItem[] {
  const b = data?.basics ?? { fullName: "", role: "", email: "" };
  const out: ContactItem[] = [];
  if (b.email) out.push({ kind: "email", value: b.email });
  if (b.phone) out.push({ kind: "phone", value: b.phone });
  if (b.location) out.push({ kind: "location", value: b.location });
  if (b.website) out.push({ kind: "website", value: b.website });
  if (b.linkedIn) out.push({ kind: "linkedin", value: b.linkedIn });
  return out;
}

function renderSectionHeading(
  recipe: TemplateRecipe,
  section: SectionKey,
  data: CVData,
  ctx: RecipeCtx,
  fallbackTitle: string,
): ReactNode {
  const heading = recipe.sectionHeading;
  const headingColor = resolveColor(heading.colorRef, ctx) ?? ctx.theme.text;
  const accent = resolveColor(heading.accentRef, ctx) ?? ctx.theme.accent;
  const icon = heading.iconMap?.[section];

  return (
    <SectionHeading
      variant={heading.variant}
      size={heading.size ?? "xs"}
      color={headingColor}
      accentColor={accent}
      icon={icon}
      headingFont={ctx.headingFont}
      style={sectionVariantStyle(ctx.sectionStyle, ctx.theme)}
    >
      {formatSectionTitle(
        sectionLabel(data, section, fallbackTitle),
        ctx.sectionStyle,
      )}
    </SectionHeading>
  );
}

function renderBlock(
  block: RecipeBlock,
  recipe: TemplateRecipe,
  data: CVData,
  ctx: RecipeCtx,
): ReactNode {
  const v = block.variant;
  const heading = (fallback: string) =>
    renderSectionHeading(recipe, block.section, data, ctx, fallback);

  switch (block.section) {
    case "profile": {
      if (v.type !== "summary") return null;
      const summary = data?.basics?.summary ?? "";
      if (isRichTextEmpty(summary)) return null;
      const dropcap = v.tone === "dropcap";
      return (
        <section style={{ marginBottom: "1rem" }}>
          {heading("Profile")}
          <div style={{ marginTop: "0.5rem" }}>
            {dropcap ? (
              <RichTextRender
                html={summary}
                as="p"
                className="text-sm leading-relaxed"
                style={
                  {
                    color: ctx.theme.textSoft,
                    // First-letter drop cap via CSS — gracefully ignored
                    // by Chromium print without breaking layout.
                    ["--dropcap-color" as string]: ctx.theme.accent,
                  } as CSSProperties
                }
              />
            ) : (
              <RichTextRender
                html={summary}
                as="p"
                className="text-sm leading-relaxed"
                style={{ color: ctx.theme.textSoft }}
              />
            )}
          </div>
        </section>
      );
    }

    case "experience": {
      if (v.type !== "timeline") return null;
      const exp = data?.experience ?? [];
      if (exp.length === 0) return null;
      const dateBadgeBg = resolveColor(v.dateBadgeBg, ctx);
      return (
        <section style={{ marginBottom: "1rem" }}>
          {heading("Experience")}
          <div style={{ marginTop: "0.5rem" }}>
            <TimelineSection
              entries={exp.map((j) => ({
                title: j.company,
                subtitle: j.role,
                meta: j.location,
                startDate: j.startDate,
                endDate: j.endDate,
                bullets: j.bullets,
              }))}
              bulletStyle={v.bulletStyle ?? "dot"}
              showDateBadge={v.showDateBadge ?? false}
              textColor={ctx.theme.text}
              textSoftColor={ctx.theme.textSoft}
              accentColor={dateBadgeBg ?? ctx.theme.accent}
            />
          </div>
        </section>
      );
    }

    case "education": {
      const edu = data?.education ?? [];
      if (edu.length === 0) return null;
      // Education uses Timeline style by default but accepts list too.
      if (v.type === "timeline") {
        return (
          <section style={{ marginBottom: "1rem" }}>
            {heading("Education")}
            <div style={{ marginTop: "0.5rem" }}>
              <TimelineSection
                entries={edu.map((e) => ({
                  title: e.school,
                  subtitle: e.degree,
                  meta: e.location,
                  startDate: e.startDate,
                  endDate: e.endDate,
                  notes: e.notes,
                }))}
                bulletStyle={v.bulletStyle ?? "none"}
                showDateBadge={v.showDateBadge ?? false}
                textColor={ctx.theme.text}
                textSoftColor={ctx.theme.textSoft}
                accentColor={ctx.theme.accent}
              />
            </div>
          </section>
        );
      }
      return (
        <section style={{ marginBottom: "1rem" }}>
          {heading("Education")}
          <ul
            style={{
              marginTop: "0.5rem",
              paddingLeft: 0,
              listStyle: "none",
              fontSize: "0.875rem",
              lineHeight: 1.5,
              color: ctx.theme.textSoft,
            }}
          >
            {edu.map((e, i) => (
              <li key={i} style={{ marginBottom: "0.5rem" }}>
                <span style={{ color: ctx.theme.text, fontWeight: 500 }}>
                  {e.school}
                </span>
                {e.degree ? ` — ${e.degree}` : ""} · {e.startDate}–{e.endDate}
              </li>
            ))}
          </ul>
        </section>
      );
    }

    case "skills": {
      if (v.type !== "skills") return null;
      const skills = data?.skills ?? [];
      if (skills.length === 0) return null;
      const tagBg = resolveColor(v.tagBg, ctx) ?? ctx.theme.primarySoft;
      const barAccent = resolveColor(v.barAccent, ctx) ?? ctx.theme.accent;
      return (
        <section style={{ marginBottom: "1rem" }}>
          {heading("Skills")}
          <div style={{ marginTop: "0.5rem" }}>
            <SkillsBlock
              skills={skills}
              variant={v.style}
              accentColor={v.style === "bars" ? barAccent : tagBg}
              textColor={ctx.theme.text}
              textSoftColor={ctx.theme.textSoft}
            />
          </div>
        </section>
      );
    }

    case "languages": {
      if (v.type !== "languages") return null;
      const langs = data?.languages ?? [];
      if (langs.length === 0) return null;
      const accent = resolveColor(v.accentRef, ctx) ?? ctx.theme.accent;
      return (
        <section style={{ marginBottom: "1rem" }}>
          {heading("Languages")}
          <div style={{ marginTop: "0.5rem" }}>
            <LanguagesBlock
              languages={langs}
              variant={v.style}
              accentColor={accent}
              textColor={ctx.theme.text}
              textSoftColor={ctx.theme.textSoft}
            />
          </div>
        </section>
      );
    }

    case "projects": {
      const projects = data?.projects ?? [];
      if (projects.length === 0) return null;
      return (
        <section style={{ marginBottom: "1rem" }}>
          {heading("Projects")}
          <div style={{ marginTop: "0.5rem" }}>
            {projects.map((p, i) => (
              <div key={i} style={{ marginBottom: "0.5rem" }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: ctx.theme.text,
                  }}
                >
                  {p.name}
                </p>
                {p.description && (
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.8rem",
                      lineHeight: 1.5,
                      color: ctx.theme.textSoft,
                    }}
                  >
                    {p.description}
                  </p>
                )}
                {p.url && (
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.7rem",
                      color: ctx.theme.accent,
                    }}
                  >
                    {p.url}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      );
    }

    case "awards": {
      const awards = data?.awards ?? [];
      if (awards.length === 0) return null;
      return (
        <section style={{ marginBottom: "1rem" }}>
          {heading("Awards")}
          <ul
            style={{
              marginTop: "0.5rem",
              paddingLeft: 0,
              listStyle: "none",
              fontSize: "0.85rem",
              lineHeight: 1.5,
              color: ctx.theme.textSoft,
            }}
          >
            {awards.map((a, i) => (
              <li key={i}>
                <span style={{ color: ctx.theme.text, fontWeight: 500 }}>
                  {a.title}
                </span>
                {a.issuer ? ` · ${a.issuer}` : ""}
                {a.year ? ` · ${a.year}` : ""}
              </li>
            ))}
          </ul>
        </section>
      );
    }

    case "certifications": {
      const certs = data?.certifications ?? [];
      if (certs.length === 0) return null;
      return (
        <section style={{ marginBottom: "1rem" }}>
          {heading("Certifications")}
          <ul
            style={{
              marginTop: "0.5rem",
              paddingLeft: 0,
              listStyle: "none",
              fontSize: "0.85rem",
              lineHeight: 1.5,
              color: ctx.theme.textSoft,
            }}
          >
            {certs.map((c, i) => (
              <li key={i}>
                <span style={{ color: ctx.theme.text, fontWeight: 500 }}>
                  {c.name}
                </span>
                {c.issuer ? ` · ${c.issuer}` : ""}
                {c.year ? ` · ${c.year}` : ""}
              </li>
            ))}
          </ul>
        </section>
      );
    }

    case "interests": {
      const interests = data?.interests ?? [];
      if (interests.length === 0) return null;
      return (
        <section style={{ marginBottom: "1rem" }}>
          {heading("Interests")}
          <p
            style={{
              marginTop: "0.5rem",
              fontSize: "0.85rem",
              lineHeight: 1.6,
              color: ctx.theme.textSoft,
            }}
          >
            {interests.join(" · ")}
          </p>
        </section>
      );
    }
  }
}

/**
 * Builds the photo element with optional backdrop block + tint wash.
 * Returned element is positioned `relative` so the backdrop can sit
 * absolutely behind it. Returns null when the recipe has no photo
 * position OR the user has hidden their photo.
 */
function buildPhotoEl(
  h: RecipeHeader,
  data: CVData,
  ctx: RecipeCtx,
  printSafe: boolean,
  photoSize: number,
): { el: ReactNode; outerWidth: number; outerHeight: number } | null {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const displayName = basics.fullName?.trim() || "Untitled";
  const userPhoto = ctx.photoStyle;
  const showPhoto =
    h.photoPosition !== undefined &&
    userPhoto !== "none" &&
    Boolean(basics.photoUrl);
  if (!showPhoto || !basics.photoUrl) return null;

  const effectiveShape =
    h.photoShape ?? (userPhoto === "square" ? "square" : "circle");
  const fg = resolveColor(h.fg, ctx) ?? ctx.theme.primaryText;

  const tintColor = h.photoTint
    ? resolveColor(h.photoTint.color, ctx)
    : undefined;
  const tint =
    h.photoTint && tintColor
      ? {
          color: tintColor,
          mode: h.photoTint.mode,
          alpha: h.photoTint.alpha,
        }
      : undefined;

  const photo = (
    <PhotoFrame
      src={basics.photoUrl}
      alt={displayName}
      shape={effectiveShape}
      size={photoSize}
      border={{ color: fg, width: 2 }}
      tint={tint}
      printSafe={printSafe}
    />
  );

  // No backdrop — return the photo directly.
  if (!h.photoBackdrop) {
    return { el: photo, outerWidth: photoSize, outerHeight: photoSize };
  }

  // Backdrop path. The backdrop is an absolutely-positioned color
  // block sitting behind the photo. offsetX/offsetY are measured from
  // the photo's top-left corner; negative values push the block above
  // / left of the photo.
  const bd = h.photoBackdrop;
  const bdColor = resolveColor(bd.color, ctx) ?? ctx.theme.accent;
  const bdW = bd.width ?? Math.round(photoSize * 0.85);
  const bdH = bd.height ?? Math.round(photoSize * 1.1);
  const offsetX = bd.offsetX ?? -16;
  const offsetY = bd.offsetY ?? -16;

  // The wrapper's outer dimensions span the union of photo + backdrop
  // so flex/inline placement does not clip the backdrop.
  const minLeft = Math.min(0, offsetX);
  const minTop = Math.min(0, offsetY);
  const maxRight = Math.max(photoSize, offsetX + bdW);
  const maxBottom = Math.max(photoSize, offsetY + bdH);
  const outerWidth = maxRight - minLeft;
  const outerHeight = maxBottom - minTop;

  return {
    el: (
      <span
        style={{
          position: "relative",
          display: "inline-block",
          width: outerWidth,
          height: outerHeight,
        }}
      >
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: offsetY - minTop,
            left: offsetX - minLeft,
            width: bdW,
            height: bdH,
            backgroundColor: bdColor,
            zIndex: 0,
          }}
        />
        <span
          style={{
            position: "absolute",
            top: -minTop,
            left: -minLeft,
            zIndex: 1,
          }}
        >
          {photo}
        </span>
      </span>
    ),
    outerWidth,
    outerHeight,
  };
}

function renderHeader(
  recipe: TemplateRecipe,
  data: CVData,
  ctx: RecipeCtx,
  printSafe: boolean,
): ReactNode {
  const h = recipe.header;
  if (h.layout === "none") return null;
  // The split layout is rendered piecewise by the engine — see
  // renderSplitSidebarHeader / renderSplitMainHeader.
  if (h.layout === "split") return null;
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const displayName = basics.fullName?.trim() || "Untitled";

  const bg = resolveColor(h.bg, ctx) ?? ctx.theme.primary;
  const fg = resolveColor(h.fg, ctx) ?? ctx.theme.primaryText;
  const fgSoft = resolveColor(h.fgSoftRef, ctx) ?? withAlpha(fg, 0.85);

  const contacts = buildContacts(data);
  const showContacts = h.showContacts ?? true;

  const photoBuilt = buildPhotoEl(h, data, ctx, printSafe, 96);
  const photoEl = photoBuilt?.el ?? null;

  const nameStyle: CSSProperties = {
    fontFamily: `${ctx.headingFont.cssVar}, ${ctx.headingFont.fallback}`,
    color: fg,
    fontSize: "2rem",
    fontWeight: 500,
    margin: 0,
    lineHeight: 1.1,
  };
  const roleStyle: CSSProperties = {
    color: fgSoft,
    fontStyle: "italic",
    fontSize: "1rem",
    margin: "0.25rem 0 0",
  };

  const headerInner = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection:
          h.photoPosition === "center"
            ? "column"
            : h.photoPosition === "right"
              ? "row-reverse"
              : "row",
        gap: "1.25rem",
        textAlign: h.align ?? "left",
      }}
    >
      {photoEl}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1 style={nameStyle}>{displayName}</h1>
        {basics.role && <p style={roleStyle}>{basics.role}</p>}
        {showContacts && contacts.length > 0 && (
          <div style={{ marginTop: "0.75rem" }}>
            <ContactList
              items={contacts}
              orientation={h.contactsOrientation ?? "horizontal"}
              textColor={fg}
              iconColor={fgSoft}
              textSize="xs"
            />
          </div>
        )}
      </div>
    </div>
  );

  if (h.layout === "full-bleed") {
    return (
      <HeroBanner
        bg={bg}
        fg={fg}
        clipPath={h.clipPath ?? "none"}
        printSafe={printSafe}
        decoration={renderHeaderBgDecorators(recipe, ctx, printSafe)}
      >
        {headerInner}
      </HeroBanner>
    );
  }

  if (h.layout === "sidebar-embedded") {
    // Renders inside the sidebar slot — caller handles positioning.
    return (
      <div
        style={{
          color: fg,
          padding: "1rem 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {photoEl && <div style={{ marginBottom: "0.75rem" }}>{photoEl}</div>}
        <h1
          style={{
            ...nameStyle,
            fontSize: "1.5rem",
            textAlign: "center",
          }}
        >
          {displayName}
        </h1>
        {basics.role && (
          <p style={{ ...roleStyle, textAlign: "center" }}>{basics.role}</p>
        )}
        {showContacts && contacts.length > 0 && (
          <div style={{ marginTop: "0.75rem", width: "100%" }}>
            <ContactList
              items={contacts}
              orientation="vertical"
              textColor={fg}
              iconColor={fgSoft}
              textSize="xs"
            />
          </div>
        )}
      </div>
    );
  }

  // inset
  return (
    <div
      style={{
        backgroundColor: bg,
        color: fg,
        padding: "1.75rem 2rem",
        borderRadius: "0.75rem",
        marginBottom: "1.25rem",
      }}
    >
      {headerInner}
    </div>
  );
}

/**
 * Split header — sidebar half. Renders the photo (with backdrop +
 * tint, if declared) at the top of the sidebar slot. Pairs with
 * renderSplitMainHeader, which puts the name + contacts in the main
 * slot of the same row.
 */
function renderSplitSidebarHeader(
  recipe: TemplateRecipe,
  data: CVData,
  ctx: RecipeCtx,
  printSafe: boolean,
): ReactNode {
  if (recipe.header.layout !== "split") return null;
  const built = buildPhotoEl(recipe.header, data, ctx, printSafe, 140);
  if (!built) return null;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        marginBottom: "1.25rem",
      }}
    >
      {built.el}
    </div>
  );
}

/**
 * Split header — main half. Renders the display name, optional role
 * line, and contacts (defaulting to horizontal-ruled) at the top of
 * the main slot.
 */
function renderSplitMainHeader(
  recipe: TemplateRecipe,
  data: CVData,
  ctx: RecipeCtx,
): ReactNode {
  const h = recipe.header;
  if (h.layout !== "split") return null;
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const displayName = basics.fullName?.trim() || "Untitled";

  const fg = resolveColor(h.fg, ctx) ?? ctx.theme.text;
  const fgSoft = resolveColor(h.fgSoftRef, ctx) ?? ctx.theme.textSoft;

  const contacts = buildContacts(data);
  const showContacts = h.showContacts ?? true;

  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <h1
        style={{
          fontFamily: `${ctx.headingFont.cssVar}, ${ctx.headingFont.fallback}`,
          color: fg,
          fontSize: "3rem",
          fontWeight: 500,
          margin: 0,
          lineHeight: 1.05,
          letterSpacing: "-0.01em",
        }}
      >
        {displayName}
      </h1>
      {basics.role && (
        <p
          style={{
            color: fgSoft,
            fontSize: "1rem",
            margin: "0.25rem 0 0",
            fontStyle: "italic",
          }}
        >
          {basics.role}
        </p>
      )}
      {showContacts && contacts.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <ContactList
            items={contacts}
            orientation={h.contactsOrientation ?? "horizontal-ruled"}
            textColor={fg}
            iconColor={fgSoft}
            ruleColor={withAlpha(fg, 0.4)}
            textSize="xs"
          />
        </div>
      )}
    </div>
  );
}

/**
 * Footer band — full-bleed strip at the bottom of the page. Renders a
 * single section (skills / interests / languages / etc.) as a
 * left-label + right-content row. The section is automatically
 * removed from the body block sequence so it doesn't show twice.
 *
 * Single-section by design (Phase 5b-1 Q4).
 */
function renderFooterBand(
  footer: RecipeFooter,
  recipe: TemplateRecipe,
  data: CVData,
  ctx: RecipeCtx,
): ReactNode {
  const bg = resolveColor(footer.bg, ctx) ?? ctx.theme.primary;
  const fg = resolveColor(footer.fg, ctx) ?? ctx.theme.primaryText;
  const padding = footer.padding ?? "1.25rem 2rem";

  const heading = recipe.sectionHeading;
  // Footer label uses the same heading variant as the rest of the
  // recipe but forces the color to the footer fg so it reads against
  // the band background.
  const headingNode = (
    <SectionHeading
      variant={heading.variant}
      size={heading.size ?? "xs"}
      color={fg}
      accentColor={fg}
      icon={heading.iconMap?.[footer.section]}
      headingFont={ctx.headingFont}
    >
      {sectionLabel(data, footer.section, footer.section)}
    </SectionHeading>
  );

  // Body content — flat inline summary by section type.
  let body: ReactNode = null;
  switch (footer.section) {
    case "skills": {
      const items = data?.skills ?? [];
      if (items.length > 0) {
        body = (
          <p
            style={{
              margin: 0,
              fontSize: "0.85rem",
              lineHeight: 1.5,
              color: fg,
              opacity: 0.9,
            }}
          >
            {items.join(", ")}.
          </p>
        );
      }
      break;
    }
    case "interests": {
      const items = data?.interests ?? [];
      if (items.length > 0) {
        body = (
          <p
            style={{
              margin: 0,
              fontSize: "0.85rem",
              lineHeight: 1.5,
              color: fg,
              opacity: 0.9,
            }}
          >
            {items.join(" · ")}
          </p>
        );
      }
      break;
    }
    case "languages": {
      const items = data?.languages ?? [];
      if (items.length > 0) {
        body = (
          <p
            style={{
              margin: 0,
              fontSize: "0.85rem",
              lineHeight: 1.5,
              color: fg,
              opacity: 0.9,
            }}
          >
            {items
              .map((l) => (l.level ? `${l.name} (${l.level})` : l.name))
              .join(" · ")}
          </p>
        );
      }
      break;
    }
    case "certifications": {
      const items = data?.certifications ?? [];
      if (items.length > 0) {
        body = (
          <p
            style={{
              margin: 0,
              fontSize: "0.85rem",
              lineHeight: 1.5,
              color: fg,
              opacity: 0.9,
            }}
          >
            {items.map((c) => c.name).join(" · ")}
          </p>
        );
      }
      break;
    }
    case "awards": {
      const items = data?.awards ?? [];
      if (items.length > 0) {
        body = (
          <p
            style={{
              margin: 0,
              fontSize: "0.85rem",
              lineHeight: 1.5,
              color: fg,
              opacity: 0.9,
            }}
          >
            {items.map((a) => a.title).join(" · ")}
          </p>
        );
      }
      break;
    }
    default:
      // Other section keys (profile, experience, education, projects)
      // are layout-heavy and don't fit the single-line footer band.
      // Recipe authors should pick a flat-list section.
      body = null;
  }

  if (!body) return null;

  return (
    <div
      style={{
        backgroundColor: bg,
        color: fg,
        padding,
        minHeight: footer.height,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "1.5rem",
      }}
    >
      <div style={{ flexShrink: 0, minWidth: "32%" }}>{headingNode}</div>
      <div style={{ flex: 1, minWidth: 0 }}>{body}</div>
    </div>
  );
}

function renderDecorator(
  spec: DecoratorSpec,
  ctx: RecipeCtx,
  printSafe: boolean,
): ReactNode {
  if (spec.kind === "accent-block") {
    const color = resolveColor(spec.color, ctx) ?? ctx.theme.accent;
    return (
      <AccentBlock
        color={color}
        width={spec.width}
        height={spec.height}
        rounded={spec.rounded}
        opacity={spec.opacity}
        position="absolute"
        top={spec.offset?.top}
        left={spec.offset?.left}
        right={spec.offset?.right}
        bottom={spec.offset?.bottom}
        printSafe={printSafe}
      />
    );
  }
  if (spec.kind === "shape") {
    const color = resolveColor(spec.color, ctx) ?? ctx.theme.accent;
    return (
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: spec.offset?.top,
          left: spec.offset?.left,
          right: spec.offset?.right,
          bottom: spec.offset?.bottom,
          pointerEvents: "none",
        }}
      >
        <DecorativeShape
          shape={spec.shape}
          color={color}
          width={spec.width}
          height={spec.height}
          opacity={spec.opacity}
          rotate={spec.rotate}
          printSafe={printSafe}
        />
      </div>
    );
  }
  if (spec.kind === "pattern") {
    const color = resolveColor(spec.color, ctx) ?? ctx.theme.textFaint;
    return (
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: spec.offset?.top,
          left: spec.offset?.left,
          right: spec.offset?.right,
          bottom: spec.offset?.bottom,
          pointerEvents: "none",
          width: spec.width,
          height: spec.height,
        }}
      >
        <PatternStrip
          pattern={spec.pattern}
          color={color}
          density={spec.density}
          opacity={spec.opacity}
          width="100%"
          height="100%"
          printSafe={printSafe}
        />
      </div>
    );
  }
  // dividers are placed inline by the section renderer, not as floating
  // decorators — handled in renderBlocks() below.
  return null;
}

function renderDecoratorsForSlot(
  recipe: TemplateRecipe,
  slot: DecoratorSlot,
  ctx: RecipeCtx,
  printSafe: boolean,
): ReactNode {
  const decs = recipe.decorators.filter(
    (d) => d.kind !== "divider" && d.slot === slot,
  );
  if (decs.length === 0) return null;
  return (
    <>
      {decs.map((d, i) => (
        <Fragment key={`${slot}-${i}`}>
          {renderDecorator(d, ctx, printSafe)}
        </Fragment>
      ))}
    </>
  );
}

function renderHeaderBgDecorators(
  recipe: TemplateRecipe,
  ctx: RecipeCtx,
  printSafe: boolean,
): ReactNode {
  const headerSlots: DecoratorSlot[] = ["header-bg", "header-corner"];
  const decs = recipe.decorators.filter(
    (d) => d.kind !== "divider" && headerSlots.includes(d.slot),
  );
  if (decs.length === 0) return null;
  return (
    <>
      {decs.map((d, i) => (
        <Fragment key={`hdr-${i}`}>
          {renderDecorator(d, ctx, printSafe)}
        </Fragment>
      ))}
    </>
  );
}

/** Build the ordered list of section nodes for one slot, weaving in any
 * inline dividers the recipe declared `between: [a, b]`. Skips any
 * block whose section is being rendered into the layout footer band
 * (so the section doesn't appear twice). */
function buildBlocksForSlot(
  recipe: TemplateRecipe,
  data: CVData,
  ctx: RecipeCtx,
  slot: "main" | "sidebar",
  printSafe: boolean,
): PaginatedSection[] {
  const footerSection = recipe.layout.footer?.section;
  const blocks = recipe.blocks.filter(
    (b) => b.slot === slot && b.section !== footerSection,
  );
  const dividers = recipe.decorators.filter(
    (d): d is Extract<DecoratorSpec, { kind: "divider" }> =>
      d.kind === "divider" && d.slot === slot,
  );

  const out: PaginatedSection[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const node = renderBlock(block, recipe, data, ctx);
    if (!node) continue;

    out.push({ key: `${slot}-${block.section}`, node });

    // Insert any divider decorator that fires between this section and
    // the next.
    if (i < blocks.length - 1) {
      const next = blocks[i + 1];
      const div = dividers.find(
        (d) =>
          d.between.length >= 2 &&
          d.between.includes(block.section) &&
          d.between.includes(next.section),
      );
      if (div) {
        const color = resolveColor(div.color, ctx) ?? ctx.theme.textFaint;
        out.push({
          key: `${slot}-divider-${i}`,
          node: (
            <div style={{ margin: "0.75rem 0" }}>
              <OrganicDivider
                variant={div.variant}
                color={color}
                thickness={div.thickness}
                opacity={div.opacity}
                printSafe={printSafe}
              />
            </div>
          ),
        });
      }
    }
  }
  return out;
}

type ArticleShellProps = {
  recipe: TemplateRecipe;
  ctx: RecipeCtx;
  printSafe: boolean;
  children: ReactNode;
  sidebarChildren?: ReactNode;
  /** Pre-rendered footer band (full-bleed strip across the bottom of
   * the page). Caller is responsible for resolving the layout's
   * `footer` config and skipping the footer-section from blocks. */
  footer?: ReactNode;
};

function ArticleShell({
  recipe,
  ctx,
  printSafe,
  children,
  sidebarChildren,
  footer,
}: ArticleShellProps) {
  const paginated = false;
  const dCls = densityClass(ctx.density);
  const bodyFontStyle: CSSProperties = {
    fontFamily: `${ctx.bodyFont.cssVar}, ${ctx.bodyFont.fallback}`,
    color: ctx.theme.text,
    backgroundColor: ctx.theme.surface,
  };

  const layout = recipe.layout;
  const isTwo = layout.type === "two-column";

  const baseClass =
    `cv-page ${paginated ? "" : "mx-auto aspect-[210/297] max-w-[800px]"} ` +
    `w-full overflow-hidden rounded-lg shadow-warm-card-hover ${dCls}`.trim();

  // The flex-column wrap is only needed when a footer band sits below
  // the body — otherwise we keep the previous block-level article so
  // existing recipes render bit-for-bit identically to before.
  const hasFooter = footer != null;
  const flexShell: CSSProperties = hasFooter
    ? { display: "flex", flexDirection: "column" }
    : {};
  const articleStyle: CSSProperties = paginated
    ? {
        ...bodyFontStyle,
        width: 794,
        minHeight: 1123,
        position: "relative",
        ...flexShell,
      }
    : {
        ...bodyFontStyle,
        position: "relative",
        ...flexShell,
      };

  // Page-edge decorators sit above bg, below content.
  const edgeDecorators = (
    <>
      {renderDecoratorsForSlot(recipe, "page-edge-left", ctx, printSafe)}
      {renderDecoratorsForSlot(recipe, "page-edge-right", ctx, printSafe)}
      {renderDecoratorsForSlot(recipe, "page-edge-top", ctx, printSafe)}
      {renderDecoratorsForSlot(recipe, "page-edge-bottom", ctx, printSafe)}
    </>
  );

  if (isTwo) {
    const sidebarBg = resolveColor(layout.sidebarBg, ctx) ?? ctx.theme.primarySoft;
    const sidebarPadding = layout.sidebarPadding ?? "2rem 1.5rem";
    const mainPadding = layout.mainPadding ?? "2rem 2rem";
    const sidebarWidth = `${layout.sidebarWidthPercent}%`;
    const mainWidth = `${100 - layout.sidebarWidthPercent}%`;
    const sidebarOnLeft = layout.sidebarPosition === "left";

    const sidebarPanel = (
      <aside
        style={{
          width: sidebarWidth,
          flexShrink: 0,
          backgroundColor: sidebarBg,
          padding: sidebarPadding,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {renderDecoratorsForSlot(recipe, "sidebar-bg", ctx, printSafe)}
        {renderDecoratorsForSlot(recipe, "sidebar-corner", ctx, printSafe)}
        <div style={{ position: "relative", zIndex: 1 }}>
          {sidebarChildren}
        </div>
      </aside>
    );

    const mainPanel = (
      <div
        style={{
          width: mainWidth,
          flexShrink: 0,
          padding: mainPadding,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {renderDecoratorsForSlot(recipe, "main-corner", ctx, printSafe)}
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </div>
    );

    const innerRow = (
      <div
        style={{
          display: "flex",
          width: "100%",
          ...(hasFooter ? { flex: 1, minHeight: 0 } : {}),
        }}
      >
        {sidebarOnLeft ? sidebarPanel : mainPanel}
        {sidebarOnLeft ? mainPanel : sidebarPanel}
      </div>
    );

    return (
      <article className={baseClass} style={articleStyle}>
        {edgeDecorators}
        {innerRow}
        {footer}
      </article>
    );
  }

  // single-column. Caller passes a pre-rendered header via children when
  // the recipe declares one — we don't re-render here.
  const padding = layout.padding ?? "2.5rem";
  if (hasFooter) {
    return (
      <article className={baseClass} style={articleStyle}>
        {edgeDecorators}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            flex: 1,
            padding,
            minWidth: 0,
          }}
        >
          {children}
        </div>
        {footer}
      </article>
    );
  }
  return (
    <article className={baseClass} style={{ ...articleStyle, padding }}>
      {edgeDecorators}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </article>
  );
}

export type RenderRecipeOptions = {
  paginated?: boolean;
  printSafe?: boolean;
};

/**
 * Single entrypoint. Returns a JSX element that satisfies the
 * `Component: ComponentType<{ data: CVData; paginated?: boolean }>`
 * contract used by the existing TEMPLATES registry.
 *
 * - paginated: wrap in PaginatedCV measuring/repacking shell.
 * - printSafe: forward to all decorators so they flatten to print-safe
 *   visuals. The Puppeteer print pipeline passes printSafe=true.
 */
export function renderRecipe(
  recipe: TemplateRecipe,
  data: CVData,
  options: RenderRecipeOptions = {},
): React.ReactElement {
  const ctx = buildCtx(data);
  const paginated = options.paginated ?? false;
  const printSafe = options.printSafe ?? false;
  const layout = recipe.layout;
  const isTwo = layout.type === "two-column";

  const mainSections = buildBlocksForSlot(recipe, data, ctx, "main", printSafe);
  const sidebarSections = isTwo
    ? buildBlocksForSlot(recipe, data, ctx, "sidebar", printSafe)
    : [];

  // Header dispatch by layout. Each layout puts the header in a
  // different slot:
  //   sidebar-embedded → photo + name + contacts all in sidebar
  //   split            → photo in sidebar, name + contacts in main
  //   full-bleed/inset → header in main column above body
  //   none             → no recipe-level header
  const isSplitHeader = recipe.header.layout === "split";
  const sidebarHeader =
    recipe.header.layout === "sidebar-embedded" ? (
      <div style={{ marginBottom: "1rem" }}>
        {renderHeader(recipe, data, ctx, printSafe)}
      </div>
    ) : isSplitHeader ? (
      renderSplitSidebarHeader(recipe, data, ctx, printSafe)
    ) : null;
  const sidebarChildren = (
    <>
      {sidebarHeader}
      {sidebarSections.map((s) => (
        <Fragment key={s.key}>{s.node}</Fragment>
      ))}
    </>
  );

  const mainHeaderInline =
    recipe.header.layout === "full-bleed" || recipe.header.layout === "inset"
      ? renderHeader(recipe, data, ctx, printSafe)
      : isSplitHeader
        ? renderSplitMainHeader(recipe, data, ctx)
        : null;

  // Footer band — full-bleed strip pinned to the bottom of the page
  // (or the last paginated page). The footer.section block is already
  // filtered out of mainSections / sidebarSections by buildBlocksForSlot.
  const footerNode = recipe.layout.footer
    ? renderFooterBand(recipe.layout.footer, recipe, data, ctx)
    : null;

  if (paginated) {
    const fullBleedHeaderMargin =
      recipe.header.layout === "full-bleed" ||
      recipe.header.layout === "inset";
    const hasFooter = footerNode != null;
    const PageShell = (props: {
      pageIndex: number;
      pageCount: number;
      isFirstPage: boolean;
      children: ReactNode;
    }) => {
      const arr = Children.toArray(props.children);
      const isLastPage = props.pageIndex === props.pageCount - 1;
      return (
        <article
          className={`cv-page w-full overflow-hidden rounded-lg ${densityClass(ctx.density)}`.trim()}
          style={{
            fontFamily: `${ctx.bodyFont.cssVar}, ${ctx.bodyFont.fallback}`,
            color: ctx.theme.text,
            backgroundColor: ctx.theme.surface,
            width: 794,
            minHeight: 1123,
            position: "relative",
            ...(hasFooter
              ? { display: "flex", flexDirection: "column" }
              : { display: isTwo ? "flex" : "block" }),
          }}
        >
          {renderDecoratorsForSlot(recipe, "page-edge-left", ctx, printSafe)}
          {renderDecoratorsForSlot(recipe, "page-edge-right", ctx, printSafe)}
          {renderDecoratorsForSlot(recipe, "page-edge-top", ctx, printSafe)}
          {renderDecoratorsForSlot(recipe, "page-edge-bottom", ctx, printSafe)}
          <div
            style={{
              display: isTwo ? "flex" : "block",
              ...(hasFooter ? { flex: 1, minHeight: 0 } : {}),
            }}
          >
            {isTwo && (
              <aside
                style={{
                  width: `${(layout as Extract<typeof layout, { type: "two-column" }>).sidebarWidthPercent}%`,
                  flexShrink: 0,
                  backgroundColor:
                    resolveColor(
                      (layout as Extract<typeof layout, { type: "two-column" }>)
                        .sidebarBg,
                      ctx,
                    ) ?? ctx.theme.primarySoft,
                  padding:
                    (layout as Extract<typeof layout, { type: "two-column" }>)
                      .sidebarPadding ?? "2rem 1.5rem",
                  position: "relative",
                  overflow: "hidden",
                  order:
                    (layout as Extract<typeof layout, { type: "two-column" }>)
                      .sidebarPosition === "right"
                      ? 2
                      : 0,
                }}
              >
                {renderDecoratorsForSlot(recipe, "sidebar-bg", ctx, printSafe)}
                <div style={{ position: "relative", zIndex: 1 }}>
                  {sidebarChildren}
                </div>
              </aside>
            )}
            <div
              style={{
                flex: isTwo ? 1 : undefined,
                padding: isTwo
                  ? (layout as Extract<typeof layout, { type: "two-column" }>)
                      .mainPadding ?? "2rem"
                  : layout.type === "single-column"
                    ? layout.padding ?? "2.5rem"
                    : "2rem",
                position: "relative",
                zIndex: 1,
              }}
            >
              {props.isFirstPage && mainHeaderInline && (
                <div
                  style={
                    fullBleedHeaderMargin
                      ? { margin: "-2rem -2rem 1.25rem" }
                      : { marginBottom: "1.25rem" }
                  }
                >
                  {mainHeaderInline}
                </div>
              )}
              {arr.map((c, i) => (
                <Fragment key={i}>{c}</Fragment>
              ))}
            </div>
          </div>
          {isLastPage && footerNode}
        </article>
      );
    };

    const layoutTwo =
      layout.type === "two-column"
        ? (layout as Extract<typeof layout, { type: "two-column" }>)
        : null;
    return (
      <PaginatedCV
        sections={mainSections}
        PageShell={PageShell}
        contentWidth={
          layoutTwo
            ? Math.round(794 * (1 - layoutTwo.sidebarWidthPercent / 100))
            : 698
        }
        pageHeight={1027}
      />
    );
  }

  // Non-paginated (single page preview)
  return (
    <ArticleShell
      recipe={recipe}
      ctx={ctx}
      printSafe={printSafe}
      sidebarChildren={sidebarChildren}
      footer={footerNode}
    >
      {(isSplitHeader || !isTwo) && mainHeaderInline}
      {mainSections.map((s) => (
        <Fragment key={s.key}>{s.node}</Fragment>
      ))}
    </ArticleShell>
  );
}

/**
 * Component wrapper around renderRecipe. Used by the server-safe
 * factory in factory.ts — server modules can REFERENCE this client
 * component (they can't INVOKE it), and React's renderer marshals the
 * boundary correctly when the element finally reaches the client.
 */
export function RecipeRenderer(props: {
  recipe: TemplateRecipe;
  data: CVData;
  paginated?: boolean;
  printSafe?: boolean;
}): React.ReactElement {
  return renderRecipe(props.recipe, props.data, {
    paginated: props.paginated ?? false,
    printSafe: props.printSafe ?? false,
  });
}
