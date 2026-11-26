import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SurfaceTile } from "@/components/tonal/surface-tile";
import { TonalChip } from "@/components/tonal/chip";
import { tonalButtonClasses } from "@/components/tonal/button";
import { ChevronLink } from "@/components/tonal/chevron-link";
import { BlogProse } from "@/components/blog-prose";
import { BLOG_POSTS, getBlogPost } from "@/data/blog";
import { GITHUB_URL, PROFILE, SITE_NAME, SITE_URL } from "@/data/portfolio";
import { blogPostingSchema } from "@/lib/schema";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: { absolute: post.pageTitle },
    description: post.description,
    authors: [{ name: post.author, url: SITE_URL }],
    alternates: {
      canonical: `/blog/${post.slug}`,
      types: {
        "application/rss+xml": `${SITE_URL}/blog/rss.xml`,
      },
    },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      title: post.pageTitle,
      description: post.description,
      url,
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: post.pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.pageTitle,
      description: post.description,
      images: ["/opengraph-image"],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const currentIdx = BLOG_POSTS.findIndex((item) => item.slug === post.slug);
  const nextPost = BLOG_POSTS[(currentIdx + 1) % BLOG_POSTS.length];
  const relatedPosts = BLOG_POSTS.filter((item) => item.slug !== post.slug);

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-8 sm:pt-10 flex flex-col gap-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingSchema(post)),
        }}
      />

      {/* Breadcrumb & Post Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[var(--t-ink-muted)] hover:text-[var(--t-ink)] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          All posts
        </Link>

        <nav aria-label="Blog posts" className="flex flex-wrap items-center gap-1.5">
          {BLOG_POSTS.map((item) => {
            const active = item.slug === post.slug;
            return (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
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
          <TonalChip tone="blue">{post.category}</TonalChip>
          {post.tags.map((tag) => (
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
          {post.title}
        </h1>

        <p className="t-body text-[16px] sm:text-[17px] max-w-3xl">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-2.5 pt-1 text-[13.5px] font-medium text-[var(--t-ink-muted)]">
          <span className="text-[var(--t-ink)]">By {post.author}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.publishedAt}>{post.publishedLabel}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
        </div>
      </header>

      {/* Verified Numbers Strip */}
      <section
        aria-label="Key numbers"
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {post.metrics.map((metric) => (
          <SurfaceTile
            key={metric.label}
            tone="white"
            bordered
            padding="sm"
            className="flex flex-col gap-1"
          >
            <span className="text-[12px] font-medium uppercase tracking-wider text-[var(--t-ink-muted)]">
              {metric.label}
            </span>
            <span className="t-display text-[28px] sm:text-[32px]">
              {metric.value}
            </span>
            <span className="text-[13px] text-[var(--t-ink-secondary)]">
              {metric.detail}
            </span>
          </SurfaceTile>
        ))}
      </section>

      {/* Main Article + Sticky Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <article className="lg:col-span-8 flex flex-col gap-10">
          {post.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 flex flex-col gap-3.5"
            >
              <h2 className="t-headline text-[24px] sm:text-[28px]">
                {section.heading}
              </h2>
              <BlogProse blocks={section.blocks} />
            </section>
          ))}

          {/* Bottom Navigation */}
          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[var(--t-border-subtle)]">
            <Link
              href="/blog"
              className={tonalButtonClasses({ variant: "primary", size: "md" })}
            >
              All posts
            </Link>
            <Link
              href={`/blog/${nextPost.slug}`}
              className={tonalButtonClasses({ variant: "outline", size: "md" })}
            >
              Next: {nextPost.shortTitle}
            </Link>
          </div>
        </article>

        <aside
          aria-label="Post details and navigation"
          className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-5"
        >
          <SurfaceTile tone="neutral" padding="md" className="flex flex-col gap-4">
            <div className="text-[12px] font-medium uppercase tracking-wider text-[var(--t-ink-muted)]">
              Try &amp; Source
            </div>
            <div className="flex flex-col gap-2.5">
              {post.links.map((link) => (
                <ChevronLink key={link.href} href={link.href} external>
                  {link.label}
                </ChevronLink>
              ))}
            </div>
          </SurfaceTile>

          <SurfaceTile tone="white" bordered padding="md" className="flex flex-col gap-3.5">
            <div className="text-[12px] font-medium uppercase tracking-wider text-[var(--t-ink-muted)]">
              On this page
            </div>
            <nav aria-label="Table of contents" className="flex flex-col gap-2">
              {post.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-[13.5px] leading-[1.45] text-[var(--t-ink-secondary)] hover:text-[var(--t-blue)] transition-colors"
                >
                  {section.heading}
                </a>
              ))}
            </nav>
          </SurfaceTile>

          <SurfaceTile tone="neutral" padding="md" className="flex flex-col gap-4">
            <div className="text-[12px] font-medium uppercase tracking-wider text-[var(--t-ink-muted)]">
              Author
            </div>
            <div>
              <p className="t-headline text-[20px] mb-1.5">{PROFILE.name}</p>
              <p className="t-body text-[14px]">{PROFILE.tagline}</p>
            </div>
            <div className="flex flex-col gap-2.5 pt-2 border-t border-[var(--t-border-subtle)]">
              <ChevronLink href={GITHUB_URL}>GitHub</ChevronLink>
              <ChevronLink href="/projects" tone="ink">
                Project catalog
              </ChevronLink>
              <ChevronLink href="/case-studies" tone="ink">
                Case studies
              </ChevronLink>
            </div>
          </SurfaceTile>
        </aside>
      </div>

      {/* Related Posts */}
      <section
        aria-labelledby="more-posts-heading"
        className="flex flex-col gap-5 pt-6 border-t border-[var(--t-border-subtle)]"
      >
        <div className="flex items-end justify-between gap-4">
          <h2 id="more-posts-heading" className="t-headline text-[24px] sm:text-[28px]">
            More from the blog
          </h2>
          <ChevronLink href="/blog">View all posts</ChevronLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {relatedPosts.map((item) => (
            <SurfaceTile
              key={item.slug}
              tone={item.tone}
              padding="sm"
              className="flex flex-col justify-between gap-4"
            >
              <div className="flex flex-col gap-2">
                <span className="text-[12px] font-medium text-[var(--t-ink-muted)]">
                  {item.category} · {item.readingTime}
                </span>
                <h3 className="t-headline text-[19px]">
                  <Link
                    href={`/blog/${item.slug}`}
                    className="hover:text-[var(--t-blue)] transition-colors"
                  >
                    {item.title}
                  </Link>
                </h3>
                <p className="t-body text-[13.5px]">{item.excerpt}</p>
              </div>
              <ChevronLink href={`/blog/${item.slug}`} className="text-[13.5px]">
                Read post
              </ChevronLink>
            </SurfaceTile>
          ))}
        </div>
      </section>
    </div>
  );
}
