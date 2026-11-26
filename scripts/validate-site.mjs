#!/usr/bin/env node
/**
 * Validate content, privacy, URL, and copy invariants for harlo.dev.
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const IGNORE_DIRS = new Set([".git", ".next", "node_modules", ".vercel", ".sidefx", "out"]);
const EMAIL_PATTERN = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const FORBIDDEN_PATTERNS = [
  { label: "em dash", test: (text) => text.includes("\u2014") },
  { label: "mailto link", test: (text) => text.toLowerCase().includes("mail" + "to:") },
  { label: "gmail domain", test: (text) => text.toLowerCase().includes("gmail" + ".com") },
  { label: "direct email address", test: (text) => EMAIL_PATTERN.test(text) },
  {
    label: "public resume PDF reference",
    test: (text) => text.toLowerCase().includes("solomon-wakhungu-resume.pdf"),
  },
  {
    label: "legacy solomonwakhungu.vercel.app URL",
    test: (text) => text.includes("solomonwakhungu.vercel.app"),
  },
  {
    label: "legacy gronify.vercel.app URL",
    test: (text) => text.includes("gronify.vercel.app"),
  },
  {
    label: "legacy kfleet.sullylab.de URL",
    test: (text) => text.includes("kfleet.sullylab.de"),
  },
];

const EXCLUDED_REPOS = [
  "go-production-api-starter",
  "superset-agent-orchestrator",
  "fund-allocator",
];

const REQUIRED_HARLO_URLS = [
  "https://harlo.dev",
  "https://tonal.harlo.dev",
  "https://gronify.harlo.dev",
  "https://kfleet.harlo.dev",
  "https://typst.harlo.dev",
  "https://vllm.harlo.dev",
];

const REQUIRED_CASE_COPY = [
  "This is a composite, anonymized account of recurring patterns",
  "No metrics below are client-reported figures",
  "Argo CD continuously reconciles against Git",
  "For ten nights (July 7-17)",
  "8,192 tokens",
  "20GB of RAM",
  "--context-length 32768",
  "connect-act-disconnect cycle",
  "roughly 50 commands",
  "twelve resource groups",
  "PrivilegedIntentsRequired",
];

const UNSUPPORTED_CASE_COPY = [
  "8 concurrent agent slots",
  "16 platform controllers",
  "8 internal applications migrated",
  "roughly 50 minutes",
  "about four minutes",
  "50+ command",
];

function walk(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, results);
    } else if (entry.isFile()) {
      results.push(fullPath);
    }
  }
  return results;
}

const errors = [];
const files = walk(ROOT);
const selfPath = path.resolve(ROOT, "scripts/validate-site.mjs");

for (const file of files) {
  const rel = path.relative(ROOT, file);
  if (file.endsWith(".pdf") && rel.toLowerCase().includes("resume")) {
    errors.push(`${rel}: public resume PDF must not be published`);
    continue;
  }
  if (
    file === selfPath ||
    rel === "package-lock.json" ||
    rel.startsWith(".impeccable/")
  ) {
    continue;
  }

  const text = fs.readFileSync(file, "utf8");
  for (const rule of FORBIDDEN_PATTERNS) {
    if (rule.test(text)) {
      errors.push(`${rel}: forbidden ${rule.label} found`);
    }
  }
  for (const excluded of EXCLUDED_REPOS) {
    if (text.includes(excluded)) {
      errors.push(`${rel}: excluded repository ${excluded} referenced`);
    }
  }
  for (const unsupported of UNSUPPORTED_CASE_COPY) {
    if (text.includes(unsupported)) {
      errors.push(`${rel}: unsupported case-study claim remains (${unsupported})`);
    }
  }
}

const portfolioSource = fs.readFileSync(
  path.join(ROOT, "src/data/portfolio.ts"),
  "utf8"
);
const llmsSource = fs.readFileSync(path.join(ROOT, "public/llms.txt"), "utf8");
for (const url of REQUIRED_HARLO_URLS) {
  if (!portfolioSource.includes(url)) {
    errors.push(`src/data/portfolio.ts: missing required URL ${url}`);
  }
  if (!llmsSource.includes(url)) {
    errors.push(`public/llms.txt: missing required URL ${url}`);
  }
}

const caseStudiesSource = fs.readFileSync(
  path.join(ROOT, "src/data/case-studies.ts"),
  "utf8"
);
for (const snippet of REQUIRED_CASE_COPY) {
  if (!caseStudiesSource.includes(snippet)) {
    errors.push(`src/data/case-studies.ts: missing approved copy "${snippet}"`);
  }
}

const REQUIRED_BLOG_SLUGS = [
  "verifying-ai-agent-handoffs-without-an-llm",
  "preserving-rules-and-test-history-across-compaction",
  "stopping-ai-agents-from-double-posting-with-sqlite",
  "why-i-built-a-headless-discord-cli-with-policy-guardrails",
];

const blogDataSource = fs.readFileSync(
  path.join(ROOT, "src/data/blog.ts"),
  "utf8"
);
const llmsFullSource = fs.readFileSync(
  path.join(ROOT, "public/llms-full.txt"),
  "utf8"
);
const siteShellSource = fs.readFileSync(
  path.join(ROOT, "src/components/site-shell.tsx"),
  "utf8"
);
const sitemapSource = fs.readFileSync(
  path.join(ROOT, "src/app/sitemap.ts"),
  "utf8"
);

for (const slug of REQUIRED_BLOG_SLUGS) {
  if (!blogDataSource.includes(`slug: "${slug}"`)) {
    errors.push(`src/data/blog.ts: missing required blog post slug "${slug}"`);
  }
  if (!llmsSource.includes(`/blog/${slug}`)) {
    errors.push(`public/llms.txt: missing blog post link /blog/${slug}`);
  }
  if (!llmsFullSource.includes(`/blog/${slug}`)) {
    errors.push(`public/llms-full.txt: missing blog post link /blog/${slug}`);
  }
}

if (!siteShellSource.includes('href: "/blog"')) {
  errors.push('src/components/site-shell.tsx: missing "/blog" navigation item');
}
if (!sitemapSource.includes("/blog")) {
  errors.push('src/app/sitemap.ts: missing "/blog" sitemap entry');
}

const BLOG_FILES = [
  "src/data/blog.ts",
  "src/app/blog/page.tsx",
  "src/app/blog/[slug]/page.tsx",
  "src/app/blog/rss.xml/route.ts",
  "src/components/blog-prose.tsx",
  "src/components/blog-diagrams.tsx",
  "src/components/blog-code-block.tsx",
];

const VERSION_NUMBER_PATTERN =
  /\bv\d+(?:\.\d+)*\b|\b\d+\.\d+\.\d+\b|\b(?:Python|SQLite|API|Node)\s+v?\d+\.\d+\b/i;

for (const relPath of BLOG_FILES) {
  const full = path.join(ROOT, relPath);
  if (!fs.existsSync(full)) {
    errors.push(`${relPath}: required blog file is missing`);
    continue;
  }
  const content = fs.readFileSync(full, "utf8");
  const versionMatch = content.match(VERSION_NUMBER_PATTERN);
  if (versionMatch) {
    errors.push(
      `${relPath}: version number not allowed in blog content ("${versionMatch[0]}")`
    );
  }
}

const blogLlmsMatches = [
  ...llmsSource
    .split("\n")
    .filter((line) => line.includes("/blog")),
  ...llmsFullSource
    .split("\n")
    .filter((line) => line.includes("/blog")),
];
for (const line of blogLlmsMatches) {
  const versionMatch = line.match(VERSION_NUMBER_PATTERN);
  if (versionMatch) {
    errors.push(
      `llms blog entry: version number not allowed ("${versionMatch[0]}") in "${line.trim()}"`
    );
  }
}

const nextBlogIndexHtml = path.join(ROOT, ".next/server/app/blog.html");
if (fs.existsSync(nextBlogIndexHtml)) {
  const htmlChecks = [
    {
      rel: ".next/server/app/blog.html",
      required: [
        'property="og:image"',
        'property="og:site_name"',
        'property="og:type" content="website"',
        'name="twitter:image"',
      ],
    },
    ...REQUIRED_BLOG_SLUGS.map((slug) => ({
      rel: `.next/server/app/blog/${slug}.html`,
      required: [
        'property="og:image"',
        'property="og:site_name"',
        'property="og:type" content="article"',
        'name="twitter:image"',
      ],
    })),
  ];

  for (const check of htmlChecks) {
    const fullHtmlPath = path.join(ROOT, check.rel);
    if (!fs.existsSync(fullHtmlPath)) {
      errors.push(`${check.rel}: built blog HTML missing`);
      continue;
    }
    const html = fs.readFileSync(fullHtmlPath, "utf8");
    for (const marker of check.required) {
      if (!html.includes(marker)) {
        errors.push(`${check.rel}: missing metadata tag ${marker}`);
      }
    }
  }
}

if (errors.length > 0) {
  console.error("Site validation failed:");
  for (const err of errors) {
    console.error(`- ${err}`);
  }
  process.exit(1);
}

console.log(`Site validation passed across ${files.length} files.`);
