import * as React from "react";

export type BrandMarkVariant = "mark" | "tile" | "mono";

export interface BrandMarkProps extends React.SVGProps<SVGSVGElement> {
  variant?: BrandMarkVariant;
}

/**
 * Solomon Relay monogram (harlo.dev) bound to Tonal design tokens.
 * - "mark": tight transparent dual-tone mark for navbars and inline lockups
 * - "tile": rounded tonal tile for app badges and cards
 * - "mono": single-color mark using currentColor
 */
export function BrandMark({
  variant = "mark",
  className,
  ...props
}: BrandMarkProps) {
  if (variant === "tile") {
    return (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
        className={className}
        {...props}
      >
        <rect
          width="64"
          height="64"
          rx="18"
          fill="var(--t-surface-cool)"
        />
        <path
          d="M43 18.5 H25.5 A6.75 6.75 0 0 0 25.5 32 H26.2"
          stroke="var(--t-ink)"
          strokeWidth="8.5"
          strokeLinecap="round"
        />
        <path
          d="M21 45.5 H38.5 A6.75 6.75 0 0 0 38.5 32 H37.8"
          stroke="var(--t-blue)"
          strokeWidth="8.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  const upperStroke = variant === "mono" ? "currentColor" : "var(--t-ink)";
  const lowerStroke = variant === "mono" ? "currentColor" : "var(--t-blue)";

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        d="M46 15.5 H24 A8.25 8.25 0 0 0 24 32 H25"
        stroke={upperStroke}
        strokeWidth="10.5"
        strokeLinecap="round"
      />
      <path
        d="M18 48.5 H40 A8.25 8.25 0 0 0 40 32 H39"
        stroke={lowerStroke}
        strokeWidth="10.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
