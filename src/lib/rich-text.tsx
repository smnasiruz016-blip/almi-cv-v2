import sanitizeHtml from "sanitize-html";
import type { ElementType, HTMLAttributes } from "react";

const ALLOWED_TAGS = ["strong", "b", "em", "i", "u", "br", "p"];

export function sanitizeRichText(html: string): string {
  if (!html) return "";
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {},
    allowedSchemes: [],
    disallowedTagsMode: "discard",
  });
}

export function stripRichText(html: string): string {
  if (!html) return "";
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} });
}

export function isRichTextEmpty(html: string | undefined | null): boolean {
  if (!html) return true;
  return stripRichText(html).replace(/\s+/g, "").length === 0;
}

type RichTextRenderProps = {
  html: string;
  as?: ElementType;
} & Omit<HTMLAttributes<HTMLElement>, "dangerouslySetInnerHTML" | "children">;

export function RichTextRender({
  html,
  as: Tag = "span",
  ...rest
}: RichTextRenderProps) {
  return (
    <Tag {...rest} dangerouslySetInnerHTML={{ __html: sanitizeRichText(html) }} />
  );
}
