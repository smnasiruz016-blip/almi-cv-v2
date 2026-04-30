import DOMPurify from "isomorphic-dompurify";
import type { ElementType, HTMLAttributes } from "react";

const ALLOWED_TAGS = ["strong", "b", "em", "i", "u", "br", "p"];
const ALLOWED_ATTR: string[] = [];

export function sanitizeRichText(html: string): string {
  if (!html) return "";
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    KEEP_CONTENT: true,
  });
}

export function stripRichText(html: string): string {
  if (!html) return "";
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: [], KEEP_CONTENT: true });
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
