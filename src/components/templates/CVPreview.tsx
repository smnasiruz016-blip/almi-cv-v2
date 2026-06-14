// ============================================================================
// CVPreview — thin client wrapper that renders any registry template at a
// chosen pixel width via CSS transform: scale.
//
// Used by:
//   - /templates main gallery (small thumbnails, width=240)
//   - /templates/role/[roleSlug] hub (medium preview, width=420)
//   - any future "preview this layout" UI
//
// Templates are designed at fixed A4 (794 × 1123 px @ 96 DPI). We scale
// the outer wrapper instead of re-styling each template so the preview
// is pixel-identical to the print output.
// ============================================================================
"use client";

import { renderToStaticMarkup } from "react-dom/server";
import { getTemplate } from "@/lib/templates";
import { mergeWithDefaults } from "@/components/templates/types";
import { isBatch3Slug, toCDShape } from "@/lib/cd-adapter";
import type { CVData } from "@/lib/cv-types";

const A4_W = 794;
const A4_H = 1123;

// A thumbnail is decoration — it must not contribute headings (especially a
// second <h1>) to the host page's outline and compete with the page's real
// SEO <h1>. Templates correctly use <h1> for the candidate's name (right for
// an actual CV, the editor, and print), so we leave the templates alone and
// instead demote every heading to a <div> in the preview render only. Styling
// is inline / className-based, so the swap is visually identical.
function demoteHeadings(html: string): string {
  return html
    .replace(/<(h[1-6])(\s|>)/g, "<div data-cv-heading$2")
    .replace(/<\/h[1-6]>/g, "</div>");
}

export function CVPreview({
  slug,
  data,
  width = 240,
  className,
}: {
  slug: string;
  /** Optional Partial<CVData>. Missing fields fall back to DEFAULT_DATA. */
  data?: Partial<CVData> | null;
  /** Pixel width of the rendered preview frame. Height is derived from A4. */
  width?: number;
  className?: string;
}) {
  const template = getTemplate(slug);
  const TemplateComponent = template.Component;
  const scale = width / A4_W;
  const height = A4_H * scale;
  // Batch 3 templates consume Claude Design's pseudo-CVData; adapt the
  // merged-defaults output at this seam. Batch 1+2 templates take CVData
  // directly so they pass through unchanged.
  const merged = mergeWithDefaults(data);
  const renderData = (
    isBatch3Slug(slug) ? toCDShape(merged) : merged
  ) as unknown as CVData;
  // Render once to static markup so we can demote the template's headings
  // before they reach the DOM. Identical on server and client (pure function
  // of data), and the preview is non-interactive, so no hydration is lost.
  const markup = demoteHeadings(
    renderToStaticMarkup(<TemplateComponent data={renderData} />)
  );

  return (
    <div
      className={className}
      style={{
        width,
        height,
        overflow: "hidden",
        background: "#fff",
        position: "relative",
      }}
      aria-label={`${template.name} preview`}
    >
      <div
        style={{
          width: A4_W,
          height: A4_H,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
          // Hard-disable interaction inside the preview; the wrapper element
          // owns the click target.
          pointerEvents: "none",
          userSelect: "none",
        }}
        aria-hidden
        dangerouslySetInnerHTML={{ __html: markup }}
      />
    </div>
  );
}
