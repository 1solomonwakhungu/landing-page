import type { Metadata } from "next";
import Link from "next/link";
import { SurfaceTile } from "@/components/tonal/surface-tile";
import { TonalChip } from "@/components/tonal/chip";
import { ChevronLink } from "@/components/tonal/chevron-link";
import { UpstreamSection } from "@/components/upstream-section";
import { ContactSection } from "@/components/contact-section";
import { CASE_STUDIES } from "@/data/case-studies";
import { PROJECTS, SITE_URL } from "@/data/portfolio";
import { caseStudiesCollectionSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Engineering Case Studies",
  description:
    "Engineering case studies by Solomon Wakhungu covering Kubernetes and GitOps platforms, autonomous engineering agents, and headless Discord tooling.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Engineering Case Studies | Solomon Wakhungu",
    description:
      "Engineering case studies by Solomon Wakhungu covering Kubernetes and GitOps platforms, autonomous engineering agents, and headless Discord tooling.",
    url: `${SITE_URL}/case-studies`,
  },
};

const OPEN_PROOF_IDS = [
  "kfleet",
  "tonal",
  "action-hub",
  "contexto",
  "googlemcp",
  "gronify",
  "discord-cli",
  "runpod-vllm-deployer",
  "typst-dev-container",
  "homebrew-tap",
  "terraform-aws-private-llm",
];

export default function CaseStudiesPage() {
  const openProof = OPEN_PROOF_IDS.map((id) =>
    PROJECTS.find((p) => p.id === id)
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-8 sm:pt-10 flex flex-col gap-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(caseStudiesCollectionSchema()),
        }}
      />

      <section className="rounded-[var(--t-radius-hero)] bg-[var(--t-surface-warm)] px-6 py-9 sm:px-12 sm:py-12 flex flex-col gap-5">
        <TonalChip tone="blue" className="w-fit">
          Selected engineering work
        </TonalChip>
        <h1 className="t-display text-[36px] sm:text-[50px] max-w-3xl">
          Engineering case studies.
        </h1>
        <p className="t-body text-[16px] sm:text-[17px] max-w-2xl">
          These studies focus on the constraint, the operating model, the
          architecture, and the lessons. The article bodies are published from
          Solomon&apos;s approved source studies without adding unsupported
          metrics.
        </p>

        <nav aria-label="Case study quick links" className="flex flex-wrap gap-2 pt-1">
          {CASE_STUDIES.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="rounded-full bg-[var(--t-elevated)] border border-[var(--t-border-subtle)] px-4 py-1.5 text-[13px] font-medium text-[var(--t-ink)] hover:bg-[var(--t-blue-tint)] hover:text-[var(--t-blue-hover)] transition-colors"
            >
              {study.shortTitle}
            </Link>
          ))}
        </nav>
      </section>

      {/* Case Study Cards */}
      <section aria-label="Case studies" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CASE_STUDIES.map((study) => (
          <SurfaceTile
            key={study.slug}
            tone={study.tone}
            padding="lg"
            className="flex flex-col justify-between gap-6"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[12px] font-medium text-[var(--t-ink-muted)]">
                  {study.eyebrow}
                </span>
                <TonalChip
                  tone="neutral"
                  className="bg-[var(--t-elevated)] border border-[var(--t-border-subtle)] font-mono text-[11.5px]"
                >
                  {study.mark}
                </TonalChip>
              </div>
              <h2 className="t-headline text-[23px]">{study.title}</h2>
              <p className="t-body text-[14.5px]">{study.summary}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {study.tags.map((tag) => (
                  <TonalChip
                    key={tag}
                    tone="neutral"
                    className="bg-[var(--t-elevated)]/80 text-[11px]"
                  >
                    {tag}
                  </TonalChip>
                ))}
              </div>
            </div>
            <ChevronLink href={`/case-studies/${study.slug}`}>
              Read full study
            </ChevronLink>
          </SurfaceTile>
        ))}
      </section>

      {/* Open Proof */}
      <section aria-labelledby="open-proof-heading" className="flex flex-col gap-6">
        <div>
          <p className="text-[13px] font-medium text-[var(--t-ink-muted)] mb-1">
            Public repositories &amp; live sites
          </p>
          <h2 id="open-proof-heading" className="t-headline text-[28px] sm:text-[34px]">
            Open proof
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {openProof.map((item) => (
            <SurfaceTile
              key={item.id}
              tone="white"
              bordered
              padding="sm"
              className="flex flex-col justify-between gap-4"
            >
              <div className="flex flex-col gap-2">
                <h3 className="t-headline text-[18px]">{item.name}</h3>
                <p className="t-body text-[13.5px]">{item.description}</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-[var(--t-border-subtle)]">
                {item.demoUrl && (
                  <ChevronLink href={item.demoUrl} className="text-[13px]">
                    {item.demoLabel ?? "Live demo"}
                  </ChevronLink>
                )}
                <ChevronLink
                  href={item.href}
                  tone={item.demoUrl ? "ink" : "blue"}
                  className="text-[13px]"
                >
                  GitHub
                </ChevronLink>
              </div>
            </SurfaceTile>
          ))}
        </div>
      </section>

      <UpstreamSection />

      <ContactSection />
    </div>
  );
}
