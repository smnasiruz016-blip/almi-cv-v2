import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const BRAND_BUTTON_CLASSES =
  "inline-flex min-h-[44px] items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold bg-mint text-navy-900 transition hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-mint/30";

export const OUTLINE_BUTTON_CLASSES =
  "inline-flex min-h-[44px] items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold border border-muted/40 bg-transparent text-soft-white hover:bg-muted/10 hover:border-muted transition focus:outline-none focus:ring-4 focus:ring-muted/20";

export const GHOST_BUTTON_CLASSES =
  "inline-flex min-h-[44px] items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-soft-white hover:bg-muted/10 transition focus:outline-none focus:ring-4 focus:ring-muted/20";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "brand" | "outline" | "ghost";
};

export function Button({ className, variant = "brand", ...props }: ButtonProps) {
  const variantClasses =
    variant === "brand"
      ? BRAND_BUTTON_CLASSES
      : variant === "outline"
      ? OUTLINE_BUTTON_CLASSES
      : GHOST_BUTTON_CLASSES;

  return <button className={cn(variantClasses, className)} {...props} />;
}
