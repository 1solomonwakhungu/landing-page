import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChevronLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  tone?: "blue" | "ink";
  external?: boolean;
}

export function ChevronLink({
  href,
  tone = "blue",
  external,
  className,
  children,
  ...props
}: ChevronLinkProps) {
  const isExternal =
    external ?? (href.startsWith("http://") || href.startsWith("https://"));

  const classes = cn(
    "group inline-flex items-center gap-1 text-[14px] font-medium tracking-[-0.01em] cursor-pointer",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--t-blue)] rounded-sm",
    tone === "blue"
      ? "text-[var(--t-blue)] hover:text-[var(--t-blue-hover)]"
      : "text-[var(--t-ink)] hover:text-[var(--t-ink-secondary)]",
    className
  );

  const icon = isExternal ? (
    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 [transition-timing-function:var(--t-ease)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
  ) : (
    <ChevronRight className="h-4 w-4 transition-transform duration-200 [transition-timing-function:var(--t-ease)] group-hover:translate-x-0.5" />
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        <span className="group-hover:underline underline-offset-4">{children}</span>
        {icon}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      <span className="group-hover:underline underline-offset-4">{children}</span>
      {icon}
    </Link>
  );
}
