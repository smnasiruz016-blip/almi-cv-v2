import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        mint: "border border-mint/30 bg-mint/10 text-mint",
        gold: "border border-gold/30 bg-gold/10 text-gold",
        muted: "border border-muted/30 bg-muted/10 text-muted",
        success: "border border-mint/40 bg-mint/15 text-mint",
      },
    },
    defaultVariants: {
      variant: "muted",
    },
  }
);

export type BadgeProps = ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
