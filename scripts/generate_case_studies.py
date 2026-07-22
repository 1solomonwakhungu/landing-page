#!/usr/bin/env python3
"""Render the portfolio case-study pages from Solomon's approved Markdown."""

from __future__ import annotations

import html
import json
import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = Path(
    os.environ.get(
        "CASE_STUDY_SOURCE_DIR",
        "/Users/solomonwakhungu/Documents/Hermes/artifacts/career/case-studies",
    )
)
BASE_URL = "https://solomonwakhungu.vercel.app/"
LINKEDIN_URL = "https://www.linkedin.com/in/solomon-wakhungu-2712791bb/"
ASSET_VERSION = "20260721-3"

STUDIES = [
    {
        "source": "enterprise-kubernetes-platform.md",
        "slug": "case-study-kubernetes.html",
        "title": "Enterprise Kubernetes and GitOps Platform Work",
        "page_title": "Kubernetes and GitOps Platform Work | Solomon Wakhungu",
        "display": "KUBERNETES<br><span>AND GITOPS</span>",
        "eyebrow": "Platform engineering case study",
        "description": "A composite case study of enterprise Kubernetes work on AWS using Terraform, Argo CD, Helm, RBAC, CI, and observable GitOps delivery.",
        "summary": "Recurring enterprise platform patterns across Terraform-provisioned Kubernetes on AWS, Argo CD GitOps, Helm, RBAC, and operational controls.",
        "image": "images/kfleet-project.svg",
        "tags": ["Kubernetes", "AWS", "Terraform", "Argo CD", "GitOps"],
        "short": "Kubernetes",
    },
    {
        "source": "overnight-autonomous-agent-system.md",
        "slug": "case-study-autonomous-agents.html",
        "title": "An Overnight Autonomous Engineering System",
        "page_title": "Overnight Autonomous Engineering System | Solomon Wakhungu",
        "display": "AUTONOMOUS<br><span>ENGINEERING</span>",
        "eyebrow": "AI infrastructure case study",
        "description": "How an overnight engineering queue routes work between a local model and paid coding agents, verifies outputs, and reconciles task status.",
        "summary": "A nightly engineering queue that routes scoped work between a verified local model and paid coding agents, then checks the actual output.",
        "image": "images/case-studies-project.svg",
        "tags": ["Linear", "LM Studio", "Qwen", "Codex CLI", "Claude Code"],
        "short": "Agents",
    },
    {
        "source": "discord-cli.md",
        "slug": "case-study-discord-cli.html",
        "title": "discord-cli, a Headless Discord Management CLI",
        "page_title": "Headless Discord Management CLI | Solomon Wakhungu",
        "display": "DISCORD<br><span>CLI</span>",
        "eyebrow": "Developer tooling case study",
        "description": "How a headless Discord management CLI performs one action per connection and returns predictable JSON for scripts, people, and AI agents.",
        "summary": "A connect-act-disconnect Discord management CLI with predictable JSON output, human-readable tables, and explicit platform errors.",
        "image": "images/case-studies-project.svg",
        "tags": ["Python", "discord.py", "JSON", "argparse", "Automation"],
        "short": "Discord CLI",
    },
]


def inline_markup(value: str) -> str:
    escaped = html.escape(value, quote=False)
    escaped = re.sub(r"`([^`]+)`", r"<code>\1</code>", escaped)
    return re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", escaped)


def markdown_body(source: Path) -> str:
    lines = source.read_text(encoding="utf-8").splitlines()
    output: list[str] = []
    paragraph: list[str] = []
    list_type: str | None = None
    section_open = False
    in_code = False
    code_lines: list[str] = []

    def flush_paragraph() -> None:
        if paragraph:
            output.append(f"<p>{inline_markup(' '.join(paragraph))}</p>")
            paragraph.clear()

    def close_list() -> None:
        nonlocal list_type
        if list_type:
            output.append(f"</{list_type}>")
            list_type = None

    for raw in lines:
        stripped = raw.strip()
        if stripped.startswith("# "):
            continue
        if stripped == "```":
            flush_paragraph()
            close_list()
            if in_code:
                code = html.escape("\n".join(code_lines))
                output.append(f'<pre class="architecture-code"><code>{code}</code></pre>')
                code_lines.clear()
                in_code = False
            else:
                in_code = True
            continue
        if in_code:
            code_lines.append(raw)
            continue
        if stripped.startswith("## "):
            flush_paragraph()
            close_list()
            if section_open:
                output.append("</section>")
            output.append(f'<section class="article-section"><h2>{inline_markup(stripped[3:])}</h2>')
            section_open = True
            continue
        ordered = re.match(r"\d+\.\s+(.+)", stripped)
        unordered = re.match(r"-\s+(.+)", stripped)
        if ordered or unordered:
            flush_paragraph()
            desired = "ol" if ordered else "ul"
            if list_type != desired:
                close_list()
                output.append(f"<{desired}>")
                list_type = desired
            item = (ordered or unordered).group(1)
            output.append(f"<li>{inline_markup(item)}</li>")
            continue
        if not stripped:
            flush_paragraph()
            close_list()
            continue
        paragraph.append(stripped)

    flush_paragraph()
    close_list()
    if in_code:
        raise RuntimeError(f"Unclosed code fence in {source}")
    if section_open:
        output.append("</section>")
    return "\n".join(output)


def metadata(
    *,
    page_title: str,
    description: str,
    slug: str,
    image: str,
    page_type: str,
    json_ld: dict,
) -> str:
    url = BASE_URL if not slug else BASE_URL + slug
    return f"""<meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>{html.escape(page_title)}</title>
  <meta name="description" content="{html.escape(description, quote=True)}">
  <meta name="author" content="Solomon Wakhungu">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <meta name="theme-color" content="#151312">
  <link rel="canonical" href="{url}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet">
  <link rel="stylesheet" href="portfolio-content.css?v={ASSET_VERSION}">
  <link rel="icon" href="images/favicon.svg" type="image/svg+xml">
  <meta property="og:type" content="{page_type}">
  <meta property="og:site_name" content="Solomon Wakhungu">
  <meta property="og:title" content="{html.escape(page_title, quote=True)}">
  <meta property="og:description" content="{html.escape(description, quote=True)}">
  <meta property="og:url" content="{url}">
  <meta property="og:image" content="{BASE_URL}{image}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{html.escape(page_title, quote=True)}">
  <meta name="twitter:description" content="{html.escape(description, quote=True)}">
  <meta name="twitter:image" content="{BASE_URL}{image}">
  <script type="application/ld+json">{json.dumps(json_ld, separators=(',', ':'))}</script>"""


def primary_nav() -> str:
    return """<a class="skip-link" href="#content">Skip to content</a>
<nav class="site-nav" aria-label="Primary"><div class="site-nav__pill"><a href="index.html">Home</a><a href="experience.html">Experience</a><a href="projects.html" aria-current="page">Projects</a><a href="tools.html">Tools</a></div></nav>"""


def profile(extra_link: str) -> str:
    return f"""<aside class="profile-card" aria-label="Solomon Wakhungu profile">
  <h2>SOLOMON<br>WAKHUNGU</h2>
  <p>Senior Software Engineer building reliable cloud platforms, Kubernetes systems, and AI infrastructure.</p>
  <div class="profile-links"><a href="case-studies.html">All studies</a>{extra_link}<a href="Solomon-Wakhungu-Resume.pdf">Resume</a></div>
</aside>"""


def study_nav(current_slug: str | None) -> str:
    links = [
        ("case-studies.html", "Index"),
        *((study["slug"], study["short"]) for study in STUDIES),
    ]
    rendered = []
    for slug, label in links:
        current = ' aria-current="page"' if slug == current_slug else ""
        rendered.append(f'<a href="{slug}"{current}>{label}</a>')
    return f'<nav class="case-nav" aria-label="Case studies">{"".join(rendered)}</nav>'


def article_schema(study: dict) -> dict:
    url = BASE_URL + study["slug"]
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "TechArticle",
                "headline": study["title"],
                "description": study["description"],
                "url": url,
                "mainEntityOfPage": url,
                "isPartOf": {"@type": "CollectionPage", "url": BASE_URL + "case-studies.html"},
                "author": {"@type": "Person", "name": "Solomon Wakhungu", "url": BASE_URL},
                "keywords": study["tags"],
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {"@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL},
                    {"@type": "ListItem", "position": 2, "name": "Case Studies", "item": BASE_URL + "case-studies.html"},
                    {"@type": "ListItem", "position": 3, "name": study["title"], "item": url},
                ],
            },
        ],
    }


def render_article(study: dict, position: int) -> str:
    body = markdown_body(SOURCE_ROOT / study["source"])
    next_study = STUDIES[(position + 1) % len(STUDIES)]
    tags = "".join(f'<span class="tag">{html.escape(tag)}</span>' for tag in study["tags"])
    repository = (
        '<a href="https://github.com/1solomonwakhungu/discord-cli">Repository</a>'
        if study["source"] == "discord-cli.md"
        else f'<a href="{LINKEDIN_URL}">LinkedIn</a>'
    )
    head = metadata(
        page_title=study["page_title"],
        description=study["description"],
        slug=study["slug"],
        image=study["image"],
        page_type="article",
        json_ld=article_schema(study),
    )
    return f"""<!doctype html>
<html lang="en">
<head>
  {head}
</head>
<body>
{primary_nav()}
<main class="page-shell" id="content">
{profile(repository)}
<article class="article">
  <p class="eyebrow">{study["eyebrow"]}</p>
  <h1 class="display-title">{study["display"]}</h1>
  <div class="article__meta">{tags}</div>
  {study_nav(study["slug"])}
  {body}
  <div class="article-actions"><a class="button" href="case-studies.html">All case studies</a><a class="button button--secondary" href="{next_study['slug']}">Next: {next_study['short']}</a></div>
</article>
</main>
<footer class="site-footer">Copyright © 2026 Solomon Wakhungu. <a href="case-studies.html">Engineering case studies</a></footer>
</body>
</html>
"""


def collection_schema() -> dict:
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "name": "Engineering Case Studies",
                "url": BASE_URL + "case-studies.html",
                "description": "Engineering case studies by Solomon Wakhungu.",
                "author": {
                    "@type": "Person",
                    "name": "Solomon Wakhungu",
                    "url": BASE_URL,
                    "sameAs": ["https://github.com/1solomonwakhungu", LINKEDIN_URL],
                },
                "hasPart": [
                    {"@type": "TechArticle", "headline": study["title"], "url": BASE_URL + study["slug"]}
                    for study in STUDIES
                ],
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {"@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL},
                    {"@type": "ListItem", "position": 2, "name": "Case Studies", "item": BASE_URL + "case-studies.html"},
                ],
            },
        ],
    }


def render_index() -> str:
    description = "Engineering case studies by Solomon Wakhungu covering Kubernetes and GitOps platforms, autonomous engineering agents, and headless Discord tooling."
    head = metadata(
        page_title="Engineering Case Studies | Solomon Wakhungu",
        description=description,
        slug="case-studies.html",
        image="images/case-studies-project.svg",
        page_type="website",
        json_ld=collection_schema(),
    )
    cards = []
    marks = ["K8s", "AI", "CLI"]
    for study, mark in zip(STUDIES, marks):
        cards.append(
            f'<a class="case-card" href="{study["slug"]}"><div class="case-card__mark">{mark}</div>'
            f'<div><h2>{html.escape(study["title"])}</h2><p>{html.escape(study["summary"])}</p></div>'
            '<span class="case-card__arrow" aria-hidden="true">↗</span></a>'
        )
    return f"""<!doctype html>
<html lang="en">
<head>
  {head}
</head>
<body>
{primary_nav()}
<main class="page-shell" id="content">
{profile(f'<a href="{LINKEDIN_URL}" rel="me">LinkedIn</a>')}
<section>
  <p class="eyebrow">Selected engineering work</p>
  <h1 class="display-title">CASE<br><span>STUDIES</span></h1>
  {study_nav("case-studies.html")}
  <p class="lead">These studies focus on the constraint, the operating model, the architecture, and the lessons. The article bodies are published from Solomon's approved source studies without adding unsupported metrics.</p>
  <div class="card-grid">{"".join(cards)}</div>
  <h2 class="section-heading">OPEN<br><span>PROOF</span></h2>
  <div class="proof-grid">
    <a class="proof-card" href="https://github.com/1solomonwakhungu/kfleet"><strong>kFLEET</strong><span>Go and React tooling for multi-cluster Kubernetes management, agent onboarding, real-time updates, and MCP tools.</span></a>
    <a class="proof-card" href="https://github.com/1solomonwakhungu/discord-cli"><strong>discord-cli</strong><span>Python tooling for Discord server management with JSON-first automation support.</span></a>
    <a class="proof-card" href="https://github.com/1solomonwakhungu/terraform-aws-private-llm"><strong>terraform-aws-private-llm</strong><span>Reusable Terraform for private LLM infrastructure on AWS with automated TLS.</span></a>
    <a class="proof-card" href="https://github.com/1solomonwakhungu/go-production-api-starter"><strong>go-production-api-starter</strong><span>A production-oriented Go API foundation with auth, observability, Kubernetes, and CI/CD.</span></a>
  </div>
  <h2 class="section-heading">START A<br><span>CONVERSATION</span></h2>
  <div class="audience-grid">
    <div class="audience-card"><h3>Engineering leadership</h3><p>Hiring for senior software, platform, cloud, DevOps, or infrastructure engineering?</p><a class="button" href="index.html#contact">Use the contact form</a></div>
    <div class="audience-card"><h3>Project delivery</h3><p>Need AWS, Kubernetes, Terraform, Go, or private AI infrastructure designed and delivered?</p><a class="button button--secondary" href="{LINKEDIN_URL}">Connect on LinkedIn</a></div>
  </div>
</section>
</main>
<footer class="site-footer">Copyright © 2026 Solomon Wakhungu. <a href="{LINKEDIN_URL}">LinkedIn</a></footer>
</body>
</html>
"""


def main() -> None:
    missing = [study["source"] for study in STUDIES if not (SOURCE_ROOT / study["source"]).exists()]
    if missing:
        raise FileNotFoundError(f"Missing authoritative sources: {', '.join(missing)}")
    (ROOT / "case-studies.html").write_text(render_index(), encoding="utf-8")
    for position, study in enumerate(STUDIES):
        (ROOT / study["slug"]).write_text(render_article(study, position), encoding="utf-8")
    print(f"Rendered case-study index and {len(STUDIES)} articles from {SOURCE_ROOT}")


if __name__ == "__main__":
    main()
