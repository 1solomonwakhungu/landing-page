import * as React from "react";
import { cn } from "@/lib/utils";

export type TonalButtonVariant = "primary" | "dark" | "outline" | "tonal" | "ghost";
export type TonalButtonSize = "sm" | "md" | "lg";

const sizeStyles: Record<TonalButtonSize, string> = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-6 py-3 text-[14px]",
  lg: "px-7 py-3.5 text-[15px]",
};

const variantStyles: Record<TonalButtonVariant, string> = {
  primary:
    "bg-[var(--t-cta-bg)] text-[var(--t-cta-fg,#ffffff)] hover:bg-[var(--t-cta-hover)]",
  dark: "bg-[var(--t-dark-btn-bg,#202124)] text-[var(--t-dark-btn-fg,#ffffff)] hover:bg-[var(--t-dark-btn-hover,#3c4043)]",
  outline:
    "bg-transparent text-[var(--t-ink)] border border-[var(--t-border)] hover:bg-[var(--t-hover-overlay,rgba(32,33,36,0.04))]",
  tonal:
    "bg-[var(--t-blue-tint)] text-[var(--t-blue-hover)] hover:bg-[var(--t-blue-tint-hover,#d2e3fc)]",
  ghost:
    "bg-transparent text-[var(--t-ink-secondary)] hover:bg-[var(--t-surface-muted)]",
};

export function tonalButtonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: TonalButtonVariant;
  size?: TonalButtonSize;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 font-medium leading-none tracking-[-0.01em] cursor-pointer select-none",
    "rounded-[var(--t-radius-btn)] transition-all duration-200 [transition-timing-function:var(--t-ease)] active:scale-[0.98]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--t-blue)] disabled:opacity-50 disabled:pointer-events-none",
    sizeStyles[size],
    variantStyles[variant],
    className
  );
}

export interface TonalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TonalButtonVariant;
  size?: TonalButtonSize;
}

export const TonalButton = React.forwardRef<HTMLButtonElement, TonalButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={tonalButtonClasses({ variant, size, className })}
        {...props}
      />
    );
  }
);

TonalButton.displayName = "TonalButton";
