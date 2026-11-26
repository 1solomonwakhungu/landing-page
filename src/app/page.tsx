import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SurfaceTile } from "@/components/tonal/surface-tile";
import { TonalChip } from "@/components/tonal/chip";
import { tonalButtonClasses } from "@/components/tonal/button";
import { ChevronLink } from "@/components/tonal/chevron-link";
import { KpiGrid } from "@/components/tonal/kpi-grid";
import { PillarTabs } from "@/components/pillar-tabs";
import { UpstreamSection } from "@/components/upstream-section";
import { ContactSection } from "@/components/contact-section";
import {
  CORE_TOOLS,
  EXPERIENCE,
  GITHUB_URL,
  HARLO_LIVE_APPS,
  HOMEBREW_TAP_URL,
  LINKEDIN_URL,
  NOTABLE_RECEIPTS,
  PROFILE,
  PROJECTS,
} from "@/data/portfolio";
import { CASE_STUDIES } from "@/data/case-studies";
import { homeProfilePageSchema } from "@/lib/schema";

export default function HomePage() {
  const featuredProjects = PROJECTS.filter((p) => p.featured);

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-8 sm:pt-10 flex flex-col gap-16 sm:gap-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeProfilePageSchema()),
        }}
      />

      {/* Editorial Hero Canvas */}
      <section className="rounded-[var(--t-radius-hero)] bg-[var(--t-surface-warm)] px-6 py-9 sm:px-12 sm:py-14 transition-colors duration-300 [transition-timing-function:var(--t-ease)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 flex flex-col items-start">
            <TonalChip tone="blue" className="mb-5">
              {PROFILE.name} · {PROFILE.role}, {PROFILE.company} · {PROFILE.location}
            </TonalChip>
            <h1 className="t-display text-[36px] sm:text-[52px] lg:text-[56px] mb-5">
              Cloud platforms, upstream OSS, and AI infrastructure built to ship.
            </h1>
            <p className="t-body text-[16px] sm:text-[17px] max-w-xl mb-8">
              {PROFILE.bio}
            </p>

            <div className="flex flex-wrap items-center gap-3.5 mb-7">
              <Link
                href="/projects"
                className={tonalButtonClasses({ variant: "primary", size: "lg" })}
              >
                Explore projects
              </Link>
              <Link
                href="/case-studies"
                className={tonalButtonClasses({ variant: "outline", size: "lg" })}
              >
                Read case studies
              </Link>
              <ChevronLink href="/experience" className="ml-1">
                View experience
              </ChevronLink>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-[13px] font-medium text-[var(--t-ink-muted)]">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="me noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-[var(--t-ink)] transition-colors"
              >
                GitHub
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="me noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-[var(--t-ink)] transition-colors"
              >
                LinkedIn
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={HOMEBREW_TAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-[var(--t-ink)] transition-colors"
              >
                Homebrew Tap
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Live harlo.dev Ecosystem Card */}
          <div className="lg:col-span-5">
            <div className="rounded-[24px] bg-[var(--t-elevated)] border border-[var(--t-border-subtle)] p-5 sm:p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[12px] font-medium uppercase tracking-wider text-[var(--t-ink-muted)]">
                    Live on harlo.dev
                  </div>
                  <div className="text-[16px] font-medium text-[var(--t-ink)] tracking-[-0.015em]">
                    Shipped tools &amp; registries
                  </div>
                </div>
                <TonalChip tone="mint" className="text-[11px] px-2.5 py-0.5">
                  5 live apps
                </TonalChip>
              </div>

              <div className="flex flex-col divide-y divide-[var(--t-border-subtle)] border-t border-[var(--t-border-subtle)]">
                {HARLO_LIVE_APPS.map((app) => (
                  <a
                    key={app.host}
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group py-3 flex items-center justify-between gap-3 first:pt-3 last:pb-0"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-medium text-[var(--t-ink)] group-hover:text-[var(--t-blue)] transition-colors">
                          {app.name}
                        </span>
                        <span className="text-[11.5px] font-mono text-[var(--t-ink-muted)] truncate">
                          {app.host}
                        </span>
                      </div>
                      <p className="text-[12.5px] text-[var(--t-ink-muted)] truncate">
                        {app.summary}
                      </p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--t-ink-muted)] group-hover:text-[var(--t-blue)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights KPI Strip */}
      <section aria-label="Engineering highlights">
        <KpiGrid
          items={[
            {
              id: "years",
              title: "Production Scale",
              value: "407K+",
              delta: "req / mo",
              tone: "blue",
              subtitle: "Credera, Amazon, Aviatrix, Neurescence",
            },
            {
              id: "projects",
              title: "Shipped Catalog",
              value: String(PROJECTS.length),
              delta: "Open source",
              tone: "mint",
              subtitle: "K8s control planes, MCP servers, CLIs & UI",
            },
            {
              id: "harlo-apps",
              title: "Live on harlo.dev",
              value: String(HARLO_LIVE_APPS.length),
              delta: "Production",
              tone: "neutral",
              subtitle: "Tonal, kFLEET, gronify, Typst, vLLM",
            },
            {
              id: "upstream",
              title: "Upstream OSS Merges",
              value: "16+",
              delta: "Merged PRs",
              tone: "mint",
              subtitle: "Terraform AWS, Helm, VictoriaMetrics, OpenRig",
            },
          ]}
        />
      </section>

      {/* About / Notable Engineering Receipts */}
      <section aria-labelledby="about-heading" className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-[13px] font-medium text-[var(--t-ink-muted)] mb-1">
              About Solomon Wakhungu
            </p>
            <h2
              id="about-heading"
              className="t-headline text-[28px] sm:text-[36px]"
            >
              Verifiable engineering receipts, not buzzwords.
            </h2>
          </div>
          <ChevronLink href="/experience">Full background &amp; FAQ</ChevronLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {NOTABLE_RECEIPTS.map((receipt) => (
            <SurfaceTile
              key={receipt.id}
              tone={receipt.tone}
              className="flex flex-col justify-between gap-5"
            >
              <div className="flex flex-col gap-2.5">
                <span className="text-[12px] font-medium uppercase tracking-wider text-[var(--t-ink-muted)]">
                  {receipt.label}
                </span>
                <h3 className="t-headline text-[21px] sm:text-[23px]">
                  {receipt.headline}
                </h3>
                <p className="t-body text-[14.5px]">{receipt.detail}</p>
              </div>
              <div className="pt-2 border-t border-[var(--t-border-subtle)]">
                <ChevronLink
                  href={receipt.href}
                  external={receipt.external}
                >
                  {receipt.linkLabel}
                </ChevronLink>
              </div>
            </SurfaceTile>
          ))}
        </div>
      </section>

      {/* Interactive Engineering Focus Pillars */}
      <section className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <p className="text-[13px] font-medium text-[var(--t-ink-muted)] mb-1">
              Engineering focus
            </p>
            <h2 className="t-headline text-[28px] sm:text-[36px]">
              Built for reliability, observability, and calm operations.
            </h2>
          </div>
        </div>
        <PillarTabs />
      </section>

      {/* Featured Projects Bento */}
      <section aria-labelledby="featured-projects-heading" className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-[13px] font-medium text-[var(--t-ink-muted)] mb-1">
              Selected work
            </p>
            <h2
              id="featured-projects-heading"
              className="t-headline text-[28px] sm:text-[36px]"
            >
              Featured projects
            </h2>
          </div>
          <ChevronLink href="/projects">
            View all {PROJECTS.length} projects
          </ChevronLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredProjects.map((project) => (
            <SurfaceTile
              key={project.id}
              tone={project.tone}
              className="flex flex-col justify-between gap-6"
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  {project.tags.map((tag) => (
                    <TonalChip
                      key={tag}
                      tone="neutral"
                      className="bg-[var(--t-elevated)] border border-[var(--t-border-subtle)] text-[11.5px]"
                    >
                      {tag}
                    </TonalChip>
                  ))}
                </div>
                <h3 className="t-headline text-[22px]">{project.name}</h3>
                <p className="t-body text-[14px]">{project.description}</p>
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-2 border-t border-[var(--t-border-subtle)]">
                {project.demoUrl && (
                  <ChevronLink href={project.demoUrl}>
                    {project.demoLabel ?? "Live site"}
                  </ChevronLink>
                )}
                <ChevronLink
                  href={project.href}
                  tone={project.demoUrl ? "ink" : "blue"}
                  external={project.external}
                >
                  GitHub
                </ChevronLink>
              </div>
            </SurfaceTile>
          ))}
        </div>
      </section>

      {/* Experience Snapshot */}
      <section aria-labelledby="experience-heading" className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-[13px] font-medium text-[var(--t-ink-muted)] mb-1">
              Track record
            </p>
            <h2
              id="experience-heading"
              className="t-headline text-[28px] sm:text-[36px]"
            >
              Experience
            </h2>
          </div>
          <ChevronLink href="/experience">Full experience &amp; FAQ</ChevronLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {EXPERIENCE.map((item) => (
            <SurfaceTile
              key={`${item.company}-${item.period}`}
              tone="white"
              bordered
              className="flex flex-col justify-between gap-5"
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <a
                    href={item.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 t-headline text-[22px] hover:text-[var(--t-blue)] transition-colors"
                  >
                    {item.company}
                    <ArrowUpRight className="h-4 w-4 text-[var(--t-ink-muted)] group-hover:text-[var(--t-blue)]" />
                  </a>
                  <TonalChip tone="neutral" className="text-[11.5px]">
                    {item.period}
                  </TonalChip>
                </div>
                <p className="text-[13.5px] font-medium text-[var(--t-ink-muted)]">
                  {item.role}
                </p>
                <p className="t-body text-[14.5px]">{item.summary}</p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                {item.focus.map((tag) => (
                  <TonalChip key={tag} tone="warm" className="text-[11.5px]">
                    {tag}
                  </TonalChip>
                ))}
              </div>
            </SurfaceTile>
          ))}
        </div>
      </section>

      {/* Case Studies Preview */}
      <section aria-labelledby="case-studies-heading" className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-[13px] font-medium text-[var(--t-ink-muted)] mb-1">
              Architecture &amp; delivery
            </p>
            <h2
              id="case-studies-heading"
              className="t-headline text-[28px] sm:text-[36px]"
            >
              Engineering case studies
            </h2>
          </div>
          <ChevronLink href="/case-studies">All case studies</ChevronLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CASE_STUDIES.map((study) => (
            <SurfaceTile
              key={study.slug}
              tone={study.tone}
              className="flex flex-col justify-between gap-6"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12px] font-medium text-[var(--t-ink-muted)]">
                    {study.eyebrow}
                  </span>
                  <TonalChip
                    tone="neutral"
                    className="bg-[var(--t-elevated)] border border-[var(--t-border-subtle)] text-[11.5px] font-mono"
                  >
                    {study.mark}
                  </TonalChip>
                </div>
                <h3 className="t-headline text-[21px]">{study.title}</h3>
                <p className="t-body text-[14px]">{study.summary}</p>
              </div>
              <ChevronLink href={`/case-studies/${study.slug}`}>
                Read study
              </ChevronLink>
            </SurfaceTile>
          ))}
        </div>
      </section>

      {/* Merged Upstream OSS */}
      <UpstreamSection compact />

      {/* Core Stack Strip */}
      <section aria-labelledby="stack-heading" className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-[13px] font-medium text-[var(--t-ink-muted)] mb-1">
              Core tools
            </p>
            <h2 id="stack-heading" className="t-headline text-[28px] sm:text-[36px]">
              Production engineering stack
            </h2>
          </div>
          <ChevronLink href="/tools">Full stack &amp; matrix</ChevronLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CORE_TOOLS.map((tool) => (
            <a
              key={tool.name}
              href={tool.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-[20px] bg-[var(--t-surface)] hover:bg-[var(--t-surface-cool)] p-5 flex items-start justify-between gap-4 transition-colors duration-200"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[12px] font-medium text-[var(--t-ink-muted)]">
                  {tool.category}
                </span>
                <span className="t-headline text-[19px] group-hover:text-[var(--t-blue)] transition-colors">
                  {tool.name}
                </span>
                <span className="text-[13.5px] text-[var(--t-ink-secondary)]">
                  {tool.summary}
                </span>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 mt-1 text-[var(--t-ink-muted)] group-hover:text-[var(--t-blue)]" />
            </a>
          ))}
        </div>
      </section>

      {/* Contact */}
      <ContactSection />
    </div>
  );
}
