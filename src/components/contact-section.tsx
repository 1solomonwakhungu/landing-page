"use client";

import * as React from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { SurfaceTile } from "@/components/tonal/surface-tile";
import { TonalButton, tonalButtonClasses } from "@/components/tonal/button";
import { TonalChip } from "@/components/tonal/chip";
import { GITHUB_URL, LINKEDIN_URL } from "@/data/portfolio";

const OPPORTUNITIES = [
  "Senior engineering role",
  "Cloud platform project",
  "Kubernetes / DevOps engagement",
  "AI infrastructure consulting",
];

export function ContactSection() {
  const [name, setName] = React.useState("");
  const [opportunity, setOpportunity] = React.useState(OPPORTUNITIES[0]);
  const [message, setMessage] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const formattedDraft = React.useMemo(() => {
    const lines = [
      `Hi Solomon,`,
      ``,
      `Topic: ${opportunity}`,
      name.trim() ? `From: ${name.trim()}` : null,
      ``,
      message.trim() ||
        "Would love to connect about working together on cloud platforms, Kubernetes, or AI infrastructure.",
    ].filter((line): line is string => line !== null);
    return lines.join("\n");
  }, [name, opportunity, message]);

  const handleCopyDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(formattedDraft);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Clipboard may be unavailable; user can still connect on LinkedIn
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-24 flex flex-col gap-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[13px] font-medium text-[var(--t-ink-muted)] mb-1">
            Start a conversation
          </p>
          <h2
            id="contact-heading"
            className="t-headline text-[30px] sm:text-[38px]"
          >
            Let&apos;s build reliable systems together.
          </h2>
        </div>
        <TonalChip tone="mint">Open to senior roles &amp; advisory</TonalChip>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 flex flex-col gap-5">
          <SurfaceTile tone="warm" className="flex flex-col justify-between gap-5">
            <div>
              <p className="text-[12.5px] font-medium text-[var(--t-ink-muted)] mb-1.5">
                Engineering leadership
              </p>
              <h3 className="t-headline text-[21px] mb-2">
                Hiring for platform, cloud, or AI infrastructure?
              </h3>
              <p className="t-body text-[14px]">
                Connect on LinkedIn for senior software, platform, Kubernetes,
                or AI infrastructure engineering roles.
              </p>
            </div>
            <div>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="me noopener noreferrer"
                className={tonalButtonClasses({ variant: "primary", size: "md" })}
              >
                Connect on LinkedIn
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </SurfaceTile>

          <SurfaceTile tone="neutral" className="flex flex-col justify-between gap-5">
            <div>
              <p className="text-[12.5px] font-medium text-[var(--t-ink-muted)] mb-1.5">
                Project delivery &amp; open source
              </p>
              <h3 className="t-headline text-[21px] mb-2">
                Review code, architectures, and shipped tools.
              </h3>
              <p className="t-body text-[14px]">
                Inspect public repositories, Terraform modules, MCP servers, and
                CLI packages directly on GitHub.
              </p>
            </div>
            <div>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="me noopener noreferrer"
                className={tonalButtonClasses({ variant: "outline", size: "md" })}
              >
                Explore GitHub
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </SurfaceTile>
        </div>

        <SurfaceTile tone="cool" padding="lg" className="lg:col-span-7">
          <form onSubmit={handleCopyDraft} className="flex flex-col gap-4">
            <div>
              <h3 className="t-headline text-[22px] mb-1">
                Prepare a quick LinkedIn note
              </h3>
              <p className="t-body text-[14px]">
                Structure your inquiry here, copy it to your clipboard, and open
                LinkedIn directly.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5 text-[13px] font-medium text-[var(--t-ink)]">
                Your name
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Morgan"
                  className="rounded-[14px] bg-[var(--t-elevated)] border border-[var(--t-border-subtle)] px-4 py-2.5 text-[14px] font-normal text-[var(--t-ink)] placeholder:text-[var(--t-ink-muted)] focus:border-[var(--t-blue)] focus:outline-none transition-colors"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-[13px] font-medium text-[var(--t-ink)]">
                Opportunity
                <select
                  value={opportunity}
                  onChange={(e) => setOpportunity(e.target.value)}
                  className="rounded-[14px] bg-[var(--t-elevated)] border border-[var(--t-border-subtle)] px-4 py-2.5 text-[14px] font-normal text-[var(--t-ink)] focus:border-[var(--t-blue)] focus:outline-none transition-colors"
                >
                  {OPPORTUNITIES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="flex flex-col gap-1.5 text-[13px] font-medium text-[var(--t-ink)]">
              Context or timeline
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share a brief overview of the team, architecture goals, or role."
                className="rounded-[16px] bg-[var(--t-elevated)] border border-[var(--t-border-subtle)] px-4 py-3 text-[14px] font-normal text-[var(--t-ink)] placeholder:text-[var(--t-ink-muted)] focus:border-[var(--t-blue)] focus:outline-none transition-colors resize-y"
              />
            </label>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <TonalButton type="submit" variant="dark" size="md">
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Inquiry copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy inquiry brief
                  </>
                )}
              </TonalButton>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="me noopener noreferrer"
                className={tonalButtonClasses({ variant: "tonal", size: "md" })}
              >
                Open LinkedIn
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </form>
        </SurfaceTile>
      </div>
    </section>
  );
}
