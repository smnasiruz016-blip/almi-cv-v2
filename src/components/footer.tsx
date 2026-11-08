// RR-398 · the AlmiWorld family footer (the same columns and links as almiworld.com), from the one generated kit
// (src/lib/almiworld-family.ts + src/components/almiworld/, made by almiworld-site/tools/make-family-kit.mjs). No eBooks, no old
// WordPress links. AlmiCV's own links sit in one row under the columns.
import { AlmiWorldFooter } from "@/components/almiworld/AlmiWorldFooter";

export function Footer() {
  return (
    <AlmiWorldFooter
      own={[
        { label: "AlmiCV", href: "/" },
        { label: "Templates", href: "/templates" },
        { label: "Pricing", href: "/pricing" },
        { label: "CV guide", href: "/cv-guide" },
      ]}
    />
  );
}
