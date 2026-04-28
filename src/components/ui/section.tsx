import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type SectionProps = ComponentProps<"section">;

export function Section({ className, ...props }: SectionProps) {
  return <section className={cn("py-22", className)} {...props} />;
}
