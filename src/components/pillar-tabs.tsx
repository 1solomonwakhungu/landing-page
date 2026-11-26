"use client";

import * as React from "react";
import { Check, Cloud, Cpu, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { SurfaceTile } from "@/components/tonal/surface-tile";
import { ChevronLink } from "@/components/tonal/chevron-link";
import { ENGINEERING_PILLARS } from "@/data/portfolio";

const ICONS = {
  "cloud-k8s": Cloud,
  "ai-mcp": Cpu,
  "cli-ui": Terminal,
} as const;

export function PillarTabs() {
  const [activeId, setActiveId] = React.useState(ENGINEERING_PILLARS[0].id);
  const active =
    ENGINEERING_PILLARS.find((pillar) => pillar.id === activeId) ??
    ENGINEERING_PILLARS[0];

  return (
    <SurfaceTile tone="cool" padding="lg" className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="Engineering focus areas"
          className="inline-flex flex-wrap gap-2"
        >
          {ENGINEERING_PILLARS.map((pillar) => {
            const Icon = ICONS[pillar.id as keyof typeof ICONS] ?? Cloud;
            const isActive = pillar.id === active.id;
            return (
              <button
                key={pillar.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(pillar.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13.5px] font-medium cursor-pointer transition-all duration-200 [transition-timing-function:var(--t-ease)]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--t-blue)]",
                  isActive
                    ? "bg-[var(--t-ink)] text-[var(--t-bg)]"
                    : "bg-[var(--t-elevated)] text-[var(--t-ink-secondary)] border border-[var(--t-border-subtle)] hover:bg-[var(--t-blue-tint)] hover:text-[var(--t-ink)]"
                )}
              >
                <Icon className="h-4 w-4" />
                {pillar.label}
              </button>
            );
          })}
        </div>

        <span className="text-[12.5px] font-mono text-[var(--t-ink-muted)]">
          {active.meta}
        </span>
      </div>

      <div
        role="tabpanel"
        aria-label={active.label}
        className="grid grid-cols-1 md:grid-cols-12 gap-5"
      >
        <div className="md:col-span-6 rounded-[20px] bg-[var(--t-elevated)] p-6 sm:p-7 border border-[var(--t-border-subtle)] flex flex-col justify-between gap-5">
          <div>
            <div className="text-[11.5px] font-medium uppercase tracking-wider text-[var(--t-ink-muted)] mb-2">
              {active.eyebrow}
            </div>
            <h3 className="t-headline text-[22px] sm:text-[26px] mb-3">
              {active.headline}
            </h3>
            <p className="t-body text-[14.5px]">{active.summary}</p>
          </div>
          <div className="flex flex-wrap items-center gap-5 pt-1">
            <ChevronLink href={active.primaryLink.href}>
              {active.primaryLink.label}
            </ChevronLink>
            <ChevronLink href={active.secondaryLink.href} tone="ink">
              {active.secondaryLink.label}
            </ChevronLink>
          </div>
        </div>

        <div className="md:col-span-6 rounded-[20px] bg-[var(--t-elevated)] p-6 sm:p-7 border border-[var(--t-border-subtle)] flex flex-col justify-between gap-4">
          <div>
            <div className="text-[11.5px] font-medium uppercase tracking-wider text-[var(--t-blue)] mb-3">
              Operating Principles
            </div>
            <ul className="flex flex-col gap-3.5 text-[14.5px] text-[var(--t-ink-secondary)]">
              {active.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5 leading-[1.5]">
                  <Check className="h-4 w-4 text-[var(--t-blue)] shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-[12px] text-[var(--t-ink-muted)] pt-2 border-t border-[var(--t-border-subtle)]">
            Every claim links to public repositories, live harlo.dev deployments, or merged pull requests.
          </div>
        </div>
      </div>
    </SurfaceTile>
  );
}
