import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const BRAND_BUTTON_CLASSES =
  "inline-flex min-h-[44px] items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold bg-mint text-navy-900 transition hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-mint/30";

export const OUTLINE_BUTTON_CLASSES =
  "inline-flex min-h-[44px] items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold border border-muted/40 bg-transparent text-soft-white hover:bg-muted/10 hover:border-muted transition focus:outline-none focus:ring-4 focus:ring-muted/20";

export const GHOST_BUTTON_CLASSES =
  "inline-flex min-h-[44px] items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-soft-white hover:bg-muted/10 transition focus:outline-none focus:ring-4 focus:ring-muted/20";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-semibold transition-colors duration-250 ease-out-expo focus:outline-none focus:ring-4 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-coral text-white hover:bg-coral-deep focus:ring-coral/30",
        secondary: "bg-mint text-[#0F4A42] hover:bg-mint/80 focus:ring-mint/30",
        ghost: "text-plum hover:bg-plum/5 focus:ring-plum/15",
      },
      size: {
        sm: "min-h-[36px] gap-1.5 rounded-lg px-3 py-1.5 text-sm",
        md: "min-h-[44px] gap-2 rounded-xl px-5 py-3 text-sm",
        lg: "min-h-[52px] gap-2 rounded-2xl px-7 py-4 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  loading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          <span className="sr-only">Loading</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
