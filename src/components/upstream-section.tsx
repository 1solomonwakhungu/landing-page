"use client";

import * as React from "react";
import { ArrowUpRight, Check, Copy, Terminal } from "lucide-react";
import { SurfaceTile } from "@/components/tonal/surface-tile";
import { TonalChip } from "@/components/tonal/chip";
import { ChevronLink } from "@/components/tonal/chevron-link";
import { HOMEBREW_TAP_URL, UPSTREAM_CONTRIBUTIONS } from "@/data/portfolio";

const BREW_COMMAND = "brew tap 1solomonwakhungu/tap";

export function UpstreamSection({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(BREW_COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Ignore clipboard permission errors
    }
  };

  return (
    <section
      aria-labelledby="upstream-heading"
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[13px] font-medium text-[var(--t-ink-muted)] mb-1">
            Open Source
          </p>
          <h2
            id="upstream-heading"
            className="t-headline text-[28px] sm:text-[34px]"
          >
            Merged upstream contributions
          </h2>
        </div>
        <p className="t-body text-[14.5px] max-w-md">
          Verified pull requests merged into Terraform, Helm, VictoriaMetrics,
          OpenRig, and Aviatrix open-source repositories.
        </p>
      </div>

      <div className="rounded-[var(--t-radius-card)] border border-[var(--t-border-subtle)] bg-[var(--t-bg)] overflow-hidden divide-y divide-[var(--t-border-subtle)]">
        {UPSTREAM_CONTRIBUTIONS.map((entry) => (
          <a
            key={entry.title}
            href={entry.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-5 hover:bg-[var(--t-surface)] transition-colors duration-200"
          >
            <div className="flex flex-col gap-1.5 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <TonalChip tone="mint" className="text-[11.5px] px-2.5 py-0.5">
                  {entry.badge}
                </TonalChip>
                <span className="font-medium text-[15px] text-[var(--t-ink)] group-hover:text-[var(--t-blue)] transition-colors">
                  {entry.title}
                </span>
              </div>
              {!compact && (
                <p className="text-[14px] text-[var(--t-ink-secondary)] leading-[1.55] max-w-3xl">
                  {entry.summary}
                </p>
              )}
              {compact && (
                <p className="text-[13.5px] text-[var(--t-ink-muted)] leading-[1.5] max-w-2xl">
                  {entry.summary}
                </p>
              )}
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--t-ink-muted)] group-hover:text-[var(--t-blue)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        ))}
      </div>

      <SurfaceTile
        tone="neutral"
        padding="sm"
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--t-elevated)] border border-[var(--t-border-subtle)] text-[var(--t-ink)]">
            <Terminal className="h-4 w-4" />
          </span>
          <div className="flex flex-col">
            <span className="text-[12px] font-medium text-[var(--t-ink-muted)]">
              Homebrew Tap · kfleet, gronify, discordcli-agents, openrig
            </span>
            <code className="text-[13.5px] font-mono text-[var(--t-ink)]">
              {BREW_COMMAND}
            </code>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--t-elevated)] border border-[var(--t-border-subtle)] px-3.5 py-1.5 text-[12.5px] font-medium text-[var(--t-ink)] hover:bg-[var(--t-surface-muted)] cursor-pointer transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-[var(--t-chip-mint-fg)]" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy
              </>
            )}
          </button>
          <ChevronLink href={HOMEBREW_TAP_URL} className="text-[13px]">
            Repository
          </ChevronLink>
        </div>
      </SurfaceTile>
    </section>
  );
}
