import { BLOG_POSTS } from "@/data/blog";
import { PROFILE, SITE_URL } from "@/data/portfolio";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const itemsXml = BLOG_POSTS.map((post) => {
    const link = `${SITE_URL}/blog/${post.slug}`;
    const pubDate = new Date(`${post.publishedAt}T12:00:00Z`).toUTCString();
    const categories = [post.category, ...post.tags]
      .map((cat) => `      <category>${escapeXml(cat)}</category>`)
      .join("\n");

    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.description)}</description>
      <dc:creator>${escapeXml(post.author)}</dc:creator>
${categories}
    </item>`;
  }).join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(`${PROFILE.name} | Engineering Blog`)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml("Engineering posts by Solomon Wakhungu on AI agent verification, compaction memory, write-ahead SQLite journals, and guarded developer CLIs.")}</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>
`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
