import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SurfaceTile } from "@/components/tonal/surface-tile";
import { TonalChip } from "@/components/tonal/chip";
import { SpecsTable } from "@/components/tonal/specs-table";
import { ContactSection } from "@/components/contact-section";
import { CORE_TOOLS, SITE_URL } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Engineering Stack",
  description:
    "The production engineering stack Solomon Wakhungu uses across Go, Python, AWS, Kubernetes, Terraform, and CI/CD.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Engineering Stack | Solomon Wakhungu",
    description:
      "The production engineering stack Solomon Wakhungu uses across Go, Python, AWS, Kubernetes, Terraform, and CI/CD.",
    url: `${SITE_URL}/tools`,
  },
};

const STACK_MATRIX = [
  {
    label: "Cloud & IaC",
    values: [
      "AWS, Terraform, Terragrunt, Proxmox",
      "Modular VPC/IAM/EKS stacks, remote state, plan/apply gates, private LLM deployments",
    ],
  },
  {
    label: "Containers & GitOps",
    values: [
      "Kubernetes, Argo CD, Helm, Docker, Dev Containers",
      "Declarative GitOps reconciliation, namespace RBAC, kFLEET observability, ghcr.io publishing",
    ],
  },
  {
    label: "Languages & CLIs",
    values: [
      "Go, Python, TypeScript, Bash",
      "Single-binary Go services, streaming JSON/NDJSON tools (gronify), headless JSON CLIs (discord-cli)",
    ],
  },
  {
    label: "AI & MCP Systems",
    values: [
      "Model Context Protocol, vLLM, RunPod, LM Studio, Ollama",
      "Read-only-by-default MCP servers (kfleet, googlemcp), meta-MCP indexing (action-hub), context paging (contexto)",
    ],
  },
  {
    label: "UI & Delivery",
    values: [
      "Tonal, React, Next.js, Tailwind CSS v4, GitHub Actions, Homebrew",
      "Flat tonal design systems (tonal.harlo.dev), automated CI releases, unified Homebrew tap distribution",
    ],
  },
];

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-8 sm:pt-10 flex flex-col gap-16">
      <section className="rounded-[var(--t-radius-hero)] bg-[var(--t-surface-cool)] px-6 py-9 sm:px-12 sm:py-12 flex flex-col gap-5">
        <TonalChip tone="blue" className="w-fit">
          Core Tools
        </TonalChip>
        <h1 className="t-display text-[36px] sm:text-[50px] max-w-3xl">
          Production engineering stack.
        </h1>
        <p className="t-body text-[16px] sm:text-[17px] max-w-2xl">
          Tools chosen for predictable operations, clean failure modes, and
          repeatable delivery across cloud platforms, Kubernetes clusters, and
          AI infrastructure.
        </p>
      </section>

      <section aria-labelledby="core-tools-heading" className="flex flex-col gap-6">
        <h2 id="core-tools-heading" className="t-headline text-[26px] sm:text-[32px]">
          Primary technologies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CORE_TOOLS.map((tool) => (
            <SurfaceTile
              key={tool.name}
              tone={tool.tone}
              className="flex flex-col justify-between gap-6"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <TonalChip
                    tone="neutral"
                    className="bg-[var(--t-elevated)] border border-[var(--t-border-subtle)] text-[11.5px]"
                  >
                    {tool.category}
                  </TonalChip>
                  <a
                    href={tool.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${tool.name} official site`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--t-elevated)] border border-[var(--t-border-subtle)] text-[var(--t-ink-muted)] hover:text-[var(--t-blue)] transition-colors"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
                <h3 className="t-headline text-[24px]">{tool.name}</h3>
                <p className="text-[13.5px] font-medium text-[var(--t-ink-muted)]">
                  {tool.summary}
                </p>
                <p className="t-body text-[14px]">{tool.details}</p>
              </div>
            </SurfaceTile>
          ))}
        </div>
      </section>

      <SpecsTable
        title="How the stack fits together"
        featureLabel="Domain"
        columns={["Technologies", "Where it runs in production"]}
        rows={STACK_MATRIX}
      />

      <ContactSection />
    </div>
  );
}
