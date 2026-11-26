import type { Metadata } from "next";
import { TonalChip } from "@/components/tonal/chip";
import { ChevronLink } from "@/components/tonal/chevron-link";
import { ProjectsExplorer } from "@/components/projects-explorer";
import { UpstreamSection } from "@/components/upstream-section";
import { ContactSection } from "@/components/contact-section";
import {
  GITHUB_URL,
  HARLO_LIVE_APPS,
  PROJECTS,
  SITE_URL,
} from "@/data/portfolio";
import { projectsItemListSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Projects & Case Studies",
  description:
    "A thirteen-project engineering portfolio spanning Tonal UI, Kubernetes, MCP tooling, AI agents, streaming CLIs, Terraform, and merged upstream open-source contributions.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects & Case Studies | Solomon Wakhungu",
    description:
      "A thirteen-project engineering portfolio spanning Tonal UI, Kubernetes, MCP tooling, AI agents, streaming CLIs, Terraform, and merged upstream open-source contributions.",
    url: `${SITE_URL}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-8 sm:pt-10 flex flex-col gap-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectsItemListSchema()),
        }}
      />

      <section className="rounded-[var(--t-radius-hero)] bg-[var(--t-surface-warm)] px-6 py-9 sm:px-12 sm:py-12 flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2.5">
          <TonalChip tone="blue">{PROJECTS.length} Projects</TonalChip>
          <TonalChip tone="mint">{HARLO_LIVE_APPS.length} Live on harlo.dev</TonalChip>
        </div>
        <h1 className="t-display text-[36px] sm:text-[50px] max-w-3xl">
          Project collection &amp; open-source proof.
        </h1>
        <p className="t-body text-[16px] sm:text-[17px] max-w-2xl">
          Selected work across Kubernetes control planes, Tonal editorial UI,
          MCP tooling, AI agents, streaming CLIs, GPU inference, infrastructure
          automation, and merged upstream open source.
        </p>
        <div className="flex flex-wrap items-center gap-5 pt-1">
          <ChevronLink href={GITHUB_URL}>All GitHub repositories</ChevronLink>
          <ChevronLink href="/case-studies" tone="ink">
            Architecture case studies
          </ChevronLink>
        </div>
      </section>

      <ProjectsExplorer />

      <UpstreamSection />

      <ContactSection />
    </div>
  );
}
