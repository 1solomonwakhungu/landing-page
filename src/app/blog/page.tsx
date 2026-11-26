import type { Metadata } from "next";
import Link from "next/link";
import { Rss } from "lucide-react";
import { SurfaceTile } from "@/components/tonal/surface-tile";
import { TonalChip } from "@/components/tonal/chip";
import { ChevronLink } from "@/components/tonal/chevron-link";
import { ContactSection } from "@/components/contact-section";
import { BLOG_POSTS } from "@/data/blog";
import { PROFILE, SITE_NAME, SITE_URL } from "@/data/portfolio";
import { blogCollectionSchema } from "@/lib/schema";

const BLOG_TITLE = "Blog | Solomon Wakhungu";
const BLOG_DESCRIPTION =
  "Engineering posts by Solomon Wakhungu on AI agent verification, compaction memory, write-ahead SQLite journals, and guarded developer CLIs.";

export const metadata: Metadata = {
  title: "Blog",
  description: BLOG_DESCRIPTION,
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": `${SITE_URL}/blog/rss.xml`,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    url: `${SITE_URL}/blog`,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: BLOG_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-8 sm:pt-10 flex flex-col gap-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogCollectionSchema()),
        }}
      />

      <section className="rounded-[var(--t-radius-hero)] bg-[var(--t-surface-warm)] px-6 py-9 sm:px-12 sm:py-12 flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <TonalChip tone="blue" className="w-fit">
            Engineering Blog · {PROFILE.name}
          </TonalChip>
          <a
            href="/blog/rss.xml"
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--t-elevated)] border border-[var(--t-border-subtle)] px-3.5 py-1.5 text-[12.5px] font-medium text-[var(--t-ink-secondary)] hover:text-[var(--t-blue)] transition-colors"
          >
            <Rss className="h-3.5 w-3.5" />
            RSS feed
          </a>
        </div>

        <h1 className="t-display text-[36px] sm:text-[50px] max-w-3xl">
          Notes from building deterministic tools for AI agents.
        </h1>
        <p className="t-body text-[16px] sm:text-[17px] max-w-2xl">
          Write-ups on real failure modes I hit while working with coding
          agents, the local tools I built to fix them, what broke in testing,
          and the trade-offs I chose not to make.
        </p>

        <nav aria-label="Blog quick links" className="flex flex-wrap gap-2 pt-1">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-full bg-[var(--t-elevated)] border border-[var(--t-border-subtle)] px-4 py-1.5 text-[13px] font-medium text-[var(--t-ink)] hover:bg-[var(--t-blue-tint)] hover:text-[var(--t-blue-hover)] transition-colors"
            >
              {post.shortTitle}
            </Link>
          ))}
        </nav>
      </section>

      <section aria-label="Blog posts" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BLOG_POSTS.map((post) => (
          <SurfaceTile
            key={post.slug}
            tone={post.tone}
            padding="lg"
            className="flex flex-col justify-between gap-6"
          >
            <div className="flex flex-col gap-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <TonalChip
                  tone="neutral"
                  className="bg-[var(--t-elevated)] border border-[var(--t-border-subtle)] text-[11.5px]"
                >
                  {post.category}
                </TonalChip>
                <div className="flex items-center gap-2 text-[12.5px] font-medium text-[var(--t-ink-muted)]">
                  <time dateTime={post.publishedAt}>{post.publishedLabel}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingTime}</span>
                </div>
              </div>

              <h2 className="t-headline text-[23px] sm:text-[26px]">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-[var(--t-blue)] transition-colors"
                >
                  {post.title}
                </Link>
              </h2>

              <p className="t-body text-[15px]">{post.excerpt}</p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {post.tags.map((tag) => (
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

            <div className="flex items-center justify-between gap-4 pt-3 border-t border-[var(--t-border-subtle)]">
              <span className="text-[13px] font-medium text-[var(--t-ink-muted)]">
                By {post.author}
              </span>
              <ChevronLink href={`/blog/${post.slug}`}>Read post</ChevronLink>
            </div>
          </SurfaceTile>
        ))}
      </section>

      <ContactSection />
    </div>
  );
}
