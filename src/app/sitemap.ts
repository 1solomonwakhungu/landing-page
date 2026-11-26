import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/portfolio";
import { CASE_STUDIES } from "@/data/case-studies";
import { BLOG_POSTS } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-11-24");

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/experience`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/case-studies`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...CASE_STUDIES.map((study) => ({
      url: `${SITE_URL}/case-studies/${study.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...BLOG_POSTS.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}
