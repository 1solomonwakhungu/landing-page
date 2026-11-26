import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SurfaceTile } from "@/components/tonal/surface-tile";
import { TonalChip } from "@/components/tonal/chip";
import { tonalButtonClasses } from "@/components/tonal/button";
import { ChevronLink } from "@/components/tonal/chevron-link";
import { CaseStudyProse } from "@/components/case-study-prose";
import { CASE_STUDIES, getCaseStudy } from "@/data/case-studies";
import { GITHUB_URL, LINKEDIN_URL, PROFILE, SITE_URL } from "@/data/portfolio";
import { caseStudyArticleSchema } from "@/lib/schema";

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  const url = `${SITE_URL}/case-studies/${study.slug}`;
  return {
    title: { absolute: study.pageTitle },
    description: study.description,
    alternates: { canonical: `/case-studies/${study.slug}` },
    openGraph: {
      type: "article",
      title: study.pageTitle,
      description: study.description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: study.pageTitle,
      description: study.description,
    },
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const currentIdx = CASE_STUDIES.findIndex((s) => s.slug === study.slug);
  const nextStudy = CASE_STUDIES[(currentIdx + 1) % CASE_STUDIES.length];

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-8 sm:pt-10 flex flex-col gap-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(caseStudyArticleSchema(study)),
        }}
      />

      {/* Breadcrumb & Study Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[var(--t-ink-muted)] hover:text-[var(--t-ink)] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          All case studies
        </Link>

        <nav aria-label="Case studies" className="flex flex-wrap items-center gap-1.5">
          {CASE_STUDIES.map((item) => {
            const active = item.slug === study.slug;
            return (
              <Link
                key={item.slug}
                href={`/case-studies/${item.slug}`}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "rounded-full bg-[var(--t-ink)] text-[var(--t-bg)] px-3.5 py-1.5 text-[12.5px] font-medium"
                    : "rounded-full bg-[var(--t-surface)] text-[var(--t-ink-muted)] hover:text-[var(--t-ink)] px-3.5 py-1.5 text-[12.5px] font-medium transition-colors"
                }
              >
                {item.shortTitle}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Article Header Canvas */}
      <header className="rounded-[var(--t-radius-hero)] bg-[var(--t-surface-cool)] px-6 py-9 sm:px-12 sm:py-12 flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2">
          <TonalChip tone="blue">{study.eyebrow}</TonalChip>
          {study.tags.map((tag) => (
            <TonalChip
              key={tag}
              tone="neutral"
              className="bg-[var(--t-elevated)] border border-[var(--t-border-subtle)] text-[11.5px]"
            >
              {tag}
            </TonalChip>
          ))}
        </div>
        <h1 className="t-display text-[32px] sm:text-[46px] max-w-4xl">
          {study.title}
        </h1>
        <p className="t-body text-[16px] max-w-3xl">{study.summary}</p>
      </header>

      {/* Main Article + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <article className="lg:col-span-8 flex flex-col gap-10">
          {study.releaseNote && (
            <SurfaceTile tone="mint" padding="sm" aria-label="Current release status">
              <p className="text-[12px] font-medium uppercase tracking-wider text-[var(--t-chip-mint-fg)] mb-1.5">
                {study.releaseNote.eyebrow}
              </p>
              <p className="text-[14.5px] leading-[1.6] text-[var(--t-ink-secondary)]">
                Since the single-file script audited below, the shipped{" "}
                <a
                  href={study.releaseNote.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[var(--t-blue)] hover:underline underline-offset-4"
                >
                  {study.releaseNote.repoLabel}
                </a>{" "}
                v1.9.0 package now provides{" "}
                <strong className="font-medium text-[var(--t-ink)]">
                  89 commands across 20 groups
                </strong>
                , installable via PyPI (
                <code className="font-mono text-[13px] bg-[var(--t-elevated)] px-1.5 py-0.5 rounded">
                  discordcli-agents
                </code>
                ),{" "}
                <a
                  href={study.releaseNote.homebrewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[var(--t-blue)] hover:underline underline-offset-4"
                >
                  Homebrew
                </a>
                , Docker, and GitHub Actions.
              </p>
            </SurfaceTile>
          )}

          {study.intro && (
            <SurfaceTile tone="warm" padding="md">
              <p className="text-[14.5px] leading-[1.68] text-[var(--t-ink-secondary)]">
                {study.intro}
              </p>
            </SurfaceTile>
          )}

          {study.sections.map((section) => (
            <section key={section.heading} className="flex flex-col gap-3.5">
              <h2 className="t-headline text-[24px] sm:text-[28px]">
                {section.heading}
              </h2>
              <CaseStudyProse blocks={section.blocks} />
            </section>
          ))}

          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--t-border-subtle)]">
            <Link
              href="/case-studies"
              className={tonalButtonClasses({ variant: "primary", size: "md" })}
            >
              All case studies
            </Link>
            <Link
              href={`/case-studies/${nextStudy.slug}`}
              className={tonalButtonClasses({ variant: "outline", size: "md" })}
            >
              Next: {nextStudy.shortTitle}
            </Link>
          </div>
        </article>

        <aside
          aria-label="Solomon Wakhungu profile"
          className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-5"
        >
          <SurfaceTile tone="neutral" padding="md" className="flex flex-col gap-4">
            <div className="text-[12px] font-medium uppercase tracking-wider text-[var(--t-ink-muted)]">
              Author
            </div>
            <div>
              <h2 className="t-headline text-[20px] mb-1.5">{PROFILE.name}</h2>
              <p className="t-body text-[14px]">{PROFILE.tagline}</p>
            </div>
            <div className="flex flex-col gap-2.5 pt-2 border-t border-[var(--t-border-subtle)]">
              <ChevronLink href={GITHUB_URL}>GitHub</ChevronLink>
              {study.repoUrl ? (
                <ChevronLink href={study.repoUrl} tone="ink">
                  Project repository
                </ChevronLink>
              ) : (
                <ChevronLink href={LINKEDIN_URL} tone="ink">
                  LinkedIn
                </ChevronLink>
              )}
              <ChevronLink href="/experience" tone="ink">
                Experience
              </ChevronLink>
              <ChevronLink href="/projects" tone="ink">
                Project catalog
              </ChevronLink>
            </div>
          </SurfaceTile>
        </aside>
      </div>
    </div>
  );
}
