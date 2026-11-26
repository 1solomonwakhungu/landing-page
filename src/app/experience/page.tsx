import type { Metadata } from "next";
import { ArrowUpRight, Award, GraduationCap } from "lucide-react";
import { SurfaceTile } from "@/components/tonal/surface-tile";
import { TonalChip } from "@/components/tonal/chip";
import { ChevronLink } from "@/components/tonal/chevron-link";
import { TonalAccordion } from "@/components/tonal/accordion";
import { ContactSection } from "@/components/contact-section";
import {
  EXPERIENCE,
  EXPERIENCE_FAQ,
  GITHUB_URL,
  LINKEDIN_URL,
  PROFILE,
  SITE_URL,
} from "@/data/portfolio";
import { experiencePageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Experience & Background",
  description:
    "Solomon Wakhungu's career across Credera, Amazon (407K+ monthly Alexa requests), Aviatrix, and Neurescence, UT Dallas CS education, and Databricks Data Engineer Professional certification.",
  alternates: { canonical: "/experience" },
  openGraph: {
    title: "Experience & Background | Solomon Wakhungu",
    description:
      "Solomon Wakhungu's career across Credera, Amazon (407K+ monthly Alexa requests), Aviatrix, and Neurescence, UT Dallas CS education, and Databricks Data Engineer Professional certification.",
    url: `${SITE_URL}/experience`,
  },
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-8 sm:pt-10 flex flex-col gap-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(experiencePageSchema()),
        }}
      />

      {/* Header Canvas */}
      <section className="rounded-[var(--t-radius-hero)] bg-[var(--t-surface-cool)] px-6 py-9 sm:px-12 sm:py-12 flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2.5">
          <TonalChip tone="blue">{PROFILE.location}</TonalChip>
          <TonalChip tone="neutral" className="bg-[var(--t-elevated)] border border-[var(--t-border-subtle)]">
            {PROFILE.role} · {PROFILE.company}
          </TonalChip>
        </div>
        <h1 className="t-display text-[36px] sm:text-[50px] max-w-3xl">
          Experience across Credera, Amazon, Aviatrix, and Neurescence.
        </h1>
        <p className="t-body text-[16px] sm:text-[17px] max-w-2xl">
          {PROFILE.bio}
        </p>
        <div className="flex flex-wrap items-center gap-5 pt-1">
          <ChevronLink href={LINKEDIN_URL}>LinkedIn profile</ChevronLink>
          <ChevronLink href={GITHUB_URL} tone="ink">
            GitHub repositories
          </ChevronLink>
          <ChevronLink href="/case-studies" tone="ink">
            Architecture case studies
          </ChevronLink>
        </div>
      </section>

      {/* Role Timeline */}
      <section aria-labelledby="roles-heading" className="flex flex-col gap-5">
        <h2 id="roles-heading" className="t-headline text-[26px] sm:text-[32px]">
          Roles
        </h2>

        <div className="flex flex-col gap-5">
          {EXPERIENCE.map((item) => (
            <SurfaceTile
              key={`${item.company}-${item.period}`}
              tone={item.tone}
              padding="lg"
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            >
              <div className="lg:col-span-4 flex flex-col gap-2">
                <TonalChip
                  tone="neutral"
                  className="w-fit bg-[var(--t-elevated)] border border-[var(--t-border-subtle)] text-[12px]"
                >
                  {item.period}
                </TonalChip>
                <a
                  href={item.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 t-headline text-[26px] hover:text-[var(--t-blue)] transition-colors"
                >
                  {item.company}
                  <ArrowUpRight className="h-4 w-4 text-[var(--t-ink-muted)] group-hover:text-[var(--t-blue)]" />
                </a>
                <p className="text-[14px] font-medium text-[var(--t-ink-secondary)]">
                  {item.role}
                </p>
              </div>

              <div className="lg:col-span-8 flex flex-col gap-5">
                <p className="t-body text-[15.5px]">{item.summary}</p>
                <div className="flex flex-wrap items-center gap-2">
                  {item.focus.map((tag) => (
                    <TonalChip
                      key={tag}
                      tone="neutral"
                      className="bg-[var(--t-elevated)] border border-[var(--t-border-subtle)]"
                    >
                      {tag}
                    </TonalChip>
                  ))}
                </div>
              </div>
            </SurfaceTile>
          ))}
        </div>
      </section>

      {/* Education & Certifications */}
      <section aria-labelledby="education-heading" className="flex flex-col gap-5">
        <h2 id="education-heading" className="t-headline text-[26px] sm:text-[32px]">
          Education &amp; credentials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <SurfaceTile
            tone="white"
            bordered
            className="flex flex-col justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--t-surface-cool)] text-[var(--t-blue)]">
                <GraduationCap className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[12px] font-medium uppercase tracking-wider text-[var(--t-ink-muted)] mb-1">
                  Education
                </p>
                <h3 className="t-headline text-[20px] mb-1">
                  {PROFILE.alumniOf}
                </h3>
                <p className="t-body text-[14.5px]">
                  Computer Science &amp; Software Engineering foundations supporting
                  distributed systems, cloud platforms, and developer tooling.
                </p>
              </div>
            </div>
          </SurfaceTile>

          {PROFILE.credentials.map((credential) => (
            <SurfaceTile
              key={credential.name}
              tone="white"
              bordered
              className="flex flex-col justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--t-surface-mint)] text-[var(--t-chip-mint-fg)]">
                  <Award className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[12px] font-medium uppercase tracking-wider text-[var(--t-ink-muted)] mb-1">
                    {credential.issuer}
                  </p>
                  <h3 className="t-headline text-[20px] mb-1">
                    {credential.name}
                  </h3>
                  <p className="t-body text-[14.5px]">
                    Validates production data engineering architecture, pipeline
                    optimization, security, and operational reliability on
                    Databricks.
                  </p>
                </div>
              </div>
            </SurfaceTile>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-3xl w-full flex flex-col gap-5">
        <div>
          <p className="text-[13px] font-medium text-[var(--t-ink-muted)] mb-1">
            Quick answers
          </p>
          <h2 className="t-headline text-[26px] sm:text-[32px]">
            About Solomon Wakhungu &amp; verification
          </h2>
        </div>
        <TonalAccordion items={EXPERIENCE_FAQ} />
      </section>

      <ContactSection />
    </div>
  );
}
