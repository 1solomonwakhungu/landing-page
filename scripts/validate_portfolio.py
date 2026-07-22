#!/usr/bin/env python3
"""Validate the static portfolio before and after deployment."""

from __future__ import annotations

import hashlib
import json
import re
import shutil
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path

from generate_case_studies import SOURCE_ROOT, STUDIES, markdown_body
from project_catalog import PROJECTS

ROOT = Path(__file__).resolve().parents[1]
BASE_URL = "http://127.0.0.1:4173/"
PRODUCTION_URL = "https://solomonwakhungu.vercel.app/"
MOBILE_ASSET_VERSION = "20260721-5"
SYNC_ASSET_VERSION = "20260721-11"
HOME_FRAMER_VERSION = "20260721-case-studies"
HOME_FRAMER_MODULE = "DxnAd94XALAlOlb85GxH1KrtnPelwWOHJrojrJuQUqk.H5UZOHAH.mjs"
FRAMER_ENTRY_MODULE = "default_script0.4LYAZALU.mjs"
SANITIZED_RESUME_SHA256 = "447ca1831440599d21985607c5273c7b30cc84b3c78745bc279ac8d417d7289e"
PAGES = [
    "index.html",
    "experience.html",
    "projects.html",
    "tools.html",
    "case-studies.html",
    "case-study-kubernetes.html",
    "case-study-autonomous-agents.html",
    "case-study-discord-cli.html",
]
ORIGINAL_PAGES = {"index.html", "experience.html", "projects.html", "tools.html"}
NAVIGATION_ROUTES = {
    "/experience": "experience.html",
    "/projects": "projects.html",
    "/tools": "tools.html",
}
REQUIRED_META = {
    "description",
    "author",
    "robots",
    "theme-color",
    "og:type",
    "og:title",
    "og:description",
    "og:url",
    "og:image",
    "twitter:card",
}
STALE_COPY = [
    "AWS Nuke",
    "Aviatrix Terraform Provider",
    "Python programming language",
    "Premium Tools",
    "mejed.lemonsqueezy.com",
]
EMAIL_PROTOCOL = "mail" + "to:"
GMAIL_DOMAIN = "gmail" + ".com"
EMAIL_ADDRESS_PATTERN = re.compile(
    rb"[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}",
    flags=re.IGNORECASE,
)
CASE_PAGES = {study["slug"]: study for study in STUDIES}
REQUIRED_CASE_COPY = {
    "case-study-kubernetes.html": [
        "This is a composite, anonymized account of recurring patterns",
        "No metrics below are client-reported figures",
        "Argo CD continuously reconciles against Git",
    ],
    "case-study-autonomous-agents.html": [
        "For ten nights (July 7-17)",
        "8,192 tokens",
        "20GB of RAM",
        "--context-length 32768",
    ],
    "case-study-discord-cli.html": [
        "connect-act-disconnect cycle",
        "roughly 50 commands",
        "twelve resource groups",
        "PrivilegedIntentsRequired",
    ],
}
UNSUPPORTED_CASE_COPY = [
    "8 concurrent agent slots",
    "16 platform controllers",
    "8 internal applications migrated",
    "roughly 50 minutes",
    "about four minutes",
    "50+ command",
]
EXCLUDED_PROJECTS = [
    "go-production-api-starter",
    "superset-agent-orchestrator",
    "gronify",
]


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.html_lang = ""
        self.in_head = False
        self.in_document_title = False
        self.title = ""
        self.h1_count = 0
        self.meta: dict[str, str] = {}
        self.canonical: list[str] = []
        self.hrefs: list[str] = []
        self.sources: list[str] = []
        self.ids: list[str] = []
        self.images_without_alt: list[str] = []
        self.jsonld: list[str] = []
        self._jsonld_depth = 0
        self._jsonld_buffer: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        data = dict(attrs)
        if tag == "html":
            self.html_lang = data.get("lang") or ""
        elif tag == "head":
            self.in_head = True
        elif tag == "title" and self.in_head:
            self.in_document_title = True
        elif tag == "h1":
            self.h1_count += 1
        elif tag == "meta":
            key = data.get("name") or data.get("property")
            if key:
                self.meta[key] = data.get("content") or ""
        elif tag == "link" and data.get("rel") == "canonical":
            self.canonical.append(data.get("href") or "")
        elif tag == "a" and data.get("href"):
            self.hrefs.append(data["href"] or "")
        elif tag in {"script", "img", "source"} and data.get("src"):
            self.sources.append(data["src"] or "")
        if tag == "img" and "alt" not in data:
            self.images_without_alt.append(data.get("src") or "<inline>")
        if data.get("id"):
            self.ids.append(data["id"] or "")
        if tag == "script" and data.get("type") == "application/ld+json":
            self._jsonld_depth = 1
            self._jsonld_buffer = []

    def handle_endtag(self, tag: str) -> None:
        if tag == "head":
            self.in_head = False
        elif tag == "title" and self.in_document_title:
            self.in_document_title = False
        elif tag == "script" and self._jsonld_depth:
            self.jsonld.append("".join(self._jsonld_buffer).strip())
            self._jsonld_depth = 0
            self._jsonld_buffer = []

    def handle_data(self, data: str) -> None:
        if self.in_document_title:
            self.title += data
        if self._jsonld_depth:
            self._jsonld_buffer.append(data)


class FramerRegionParser(HTMLParser):
    """Collect text and links from selected named Framer regions."""

    def __init__(self, region_name: str) -> None:
        super().__init__(convert_charrefs=True)
        self.region_name = region_name
        self.regions: list[tuple[str, list[tuple[str, str]]]] = []
        self._depth = 0
        self._text: list[str] = []
        self._links: list[tuple[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        data = dict(attrs)
        if not self._depth and tag == "div" and data.get("data-framer-name") == self.region_name:
            self._depth = 1
            self._text = []
            self._links = []
            return
        if not self._depth:
            return
        if tag == "div":
            self._depth += 1
        elif tag == "a":
            self._links.append((data.get("data-framer-name") or "", data.get("href") or ""))

    def handle_endtag(self, tag: str) -> None:
        if not self._depth or tag != "div":
            return
        self._depth -= 1
        if not self._depth:
            text = " ".join(" ".join(self._text).split())
            self.regions.append((text, self._links))

    def handle_data(self, data: str) -> None:
        if self._depth:
            self._text.append(data)


def fail(errors: list[str], message: str) -> None:
    errors.append(message)


def fetch(url: str) -> tuple[int, bytes, dict[str, str]]:
    request = urllib.request.Request(url, headers={"User-Agent": "portfolio-validator/1.0"})
    with urllib.request.urlopen(request, timeout=20) as response:
        return response.status, response.read(), dict(response.headers.items())


def expected_canonical(page: str) -> str:
    return PRODUCTION_URL if page == "index.html" else urllib.parse.urljoin(PRODUCTION_URL, page)


def verify_internal_reference(page: str, reference: str, errors: list[str]) -> None:
    parsed = urllib.parse.urlparse(reference)
    if parsed.scheme in {"http", "https", "mailto", "tel"} or reference.startswith("//"):
        return
    path = parsed.path
    if not path:
        target = ROOT / page
    elif path.startswith("/"):
        target = ROOT / path.lstrip("/")
    else:
        target = ROOT / page
        target = target.parent / path
    if target.is_dir():
        target = target / "index.html"
    if not target.exists():
        fail(errors, f"{page}: broken local reference {reference}")
        return
    if parsed.fragment and target.suffix.lower() == ".html":
        parser = PageParser()
        parser.feed(target.read_text(encoding="utf-8"))
        if parsed.fragment not in parser.ids:
            fail(errors, f"{page}: missing fragment #{parsed.fragment} in {target.name}")


def validate() -> list[str]:
    errors: list[str] = []
    seen_canonicals: set[str] = set()

    forbidden_bytes = [EMAIL_PROTOCOL.encode(), GMAIL_DOMAIN.encode()]
    em_dash = "\u2014".encode("utf-8")
    for path in ROOT.rglob("*"):
        if (
            not path.is_file()
            or ".git" in path.parts
            or "__pycache__" in path.parts
            or ".tmp-validation-venv" in path.parts
        ):
            continue
        data = path.read_bytes().lower()
        if any(needle in data for needle in forbidden_bytes):
            fail(errors, f"{path.relative_to(ROOT)}: legacy direct-email content found")
        if EMAIL_ADDRESS_PATTERN.search(data):
            fail(errors, f"{path.relative_to(ROOT)}: email address found")
        if em_dash in data:
            fail(errors, f"{path.relative_to(ROOT)}: em dash found")

    for page in PAGES:
        path = ROOT / page
        if not path.exists():
            fail(errors, f"missing page: {page}")
            continue
        source = path.read_text(encoding="utf-8")
        parser = PageParser()
        parser.feed(source)

        if parser.html_lang != "en":
            fail(errors, f"{page}: html lang must be en")
        if not parser.title.strip():
            fail(errors, f"{page}: missing title")
        if len(parser.title.strip()) > 65:
            fail(errors, f"{page}: title exceeds 65 characters")
        if page in ORIGINAL_PAGES:
            if parser.h1_count < 1:
                fail(errors, f"{page}: missing h1 across Framer responsive variants")
        elif parser.h1_count != 1:
            fail(errors, f"{page}: expected one h1, found {parser.h1_count}")
        missing_meta = sorted(REQUIRED_META - set(parser.meta))
        if missing_meta:
            fail(errors, f"{page}: missing metadata {', '.join(missing_meta)}")
        description_length = len(parser.meta.get("description", ""))
        if not 70 <= description_length <= 180:
            fail(errors, f"{page}: description length is {description_length}")
        canonical = parser.canonical[0] if len(parser.canonical) == 1 else ""
        if canonical != expected_canonical(page):
            fail(errors, f"{page}: canonical mismatch {canonical!r}")
        if canonical in seen_canonicals:
            fail(errors, f"{page}: duplicate canonical {canonical}")
        seen_canonicals.add(canonical)
        if parser.meta.get("og:url") != expected_canonical(page):
            fail(errors, f"{page}: og:url mismatch")
        if parser.images_without_alt:
            fail(errors, f"{page}: images missing alt: {parser.images_without_alt}")
        if not parser.jsonld:
            fail(errors, f"{page}: missing JSON-LD")
        for index, block in enumerate(parser.jsonld, start=1):
            try:
                json.loads(block)
            except json.JSONDecodeError as exc:
                fail(errors, f"{page}: JSON-LD block {index} invalid: {exc}")
        if page in ORIGINAL_PAGES:
            sync_references = re.findall(r'portfolio-content-sync\.js(?:\?v=[^"<]+)?', source)
            if sync_references != [f"portfolio-content-sync.js?v={SYNC_ASSET_VERSION}"]:
                fail(errors, f"{page}: content sync script missing or duplicated")
            mobile_references = re.findall(r'portfolio-mobile-fixes\.css(?:\?v=[^"<]+)?', source)
            if mobile_references != [f"portfolio-mobile-fixes.css?v={MOBILE_ASSET_VERSION}"]:
                fail(errors, f"{page}: mobile stylesheet missing or duplicated")
            for broken_route, working_route in NAVIGATION_ROUTES.items():
                if working_route not in parser.hrefs:
                    fail(errors, f"{page}: missing working navigation route {working_route}")
                broken_references = {broken_route, broken_route.lstrip("/"), f".{broken_route}"}
                if broken_references & set(parser.hrefs):
                    fail(errors, f"{page}: extensionless navigation route remains for {broken_route}")
        if page == "index.html":
            card_parser = FramerRegionParser("Card")
            card_parser.feed(source)
            case_studies_cards = [
                links for text, links in card_parser.regions
                if text == "READ ENGINEERING CASE STUDIES"
            ]
            if not case_studies_cards:
                fail(errors, "index.html: case-studies hero card missing")
            for links in case_studies_cards:
                arrow_targets = [href for name, href in links if name == "Arrow Button"]
                if arrow_targets != ["case-studies.html"]:
                    fail(errors, f"index.html: case-studies hero Arrow Button targets {arrow_targets}")
            if "projects.html" not in parser.hrefs:
                fail(errors, "index.html: Projects navigation must target projects.html")
            framer_root = "sites/UpKjbusrEfSd0EVu97xOs/"
            for asset in [HOME_FRAMER_MODULE, FRAMER_ENTRY_MODULE]:
                expected_asset = f"{framer_root}{asset}?v={HOME_FRAMER_VERSION}"
                if source.count(expected_asset) != 1:
                    fail(errors, f"index.html: homepage Framer asset is not cache-safe: {asset}")
        for reference in parser.hrefs + parser.sources:
            verify_internal_reference(page, reference, errors)
        for stale in STALE_COPY:
            if stale in source:
                fail(errors, f"{page}: stale copy remains: {stale}")
        for unsupported in UNSUPPORTED_CASE_COPY:
            if unsupported in source:
                fail(errors, f"{page}: unsupported case-study copy remains: {unsupported}")
        for required in REQUIRED_CASE_COPY.get(page, []):
            if required not in source:
                fail(errors, f"{page}: approved source copy missing: {required}")

        if page == "case-studies.html":
            for case_page in CASE_PAGES:
                if case_page not in parser.hrefs:
                    fail(errors, f"{page}: missing case-study link {case_page}")
        elif page in CASE_PAGES:
            required_navigation = {"case-studies.html", *CASE_PAGES}
            missing_navigation = sorted(required_navigation - set(parser.hrefs))
            if missing_navigation:
                fail(errors, f"{page}: missing case-study navigation {missing_navigation}")

        if page == "projects.html":
            parsed_jsonld = []
            for block in parser.jsonld:
                try:
                    parsed_jsonld.append(json.loads(block))
                except json.JSONDecodeError:
                    continue
            item_lists = [block for block in parsed_jsonld if block.get("@type") == "ItemList"]
            if len(item_lists) != 1:
                fail(errors, f"{page}: expected one project ItemList schema")
            else:
                item_list = item_lists[0]
                entries = item_list.get("itemListElement", [])
                expected_entries = []
                for position, project in enumerate(PROJECTS, start=1):
                    public_url = project["href"] if project["external"] else urllib.parse.urljoin(
                        PRODUCTION_URL, project["href"]
                    )
                    expected_entries.append((position, project["name"], public_url, project["description"]))
                actual_entries = [
                    (
                        entry.get("position"),
                        entry.get("item", {}).get("name"),
                        entry.get("item", {}).get("url"),
                        entry.get("item", {}).get("description"),
                    )
                    for entry in entries
                ]
                if item_list.get("numberOfItems") != len(PROJECTS):
                    fail(errors, f"{page}: project schema count mismatch")
                if actual_entries != expected_entries:
                    fail(errors, f"{page}: project schema catalog mismatch")

        try:
            status, body, _ = fetch(urllib.parse.urljoin(BASE_URL, page))
            if status != 200 or not body:
                fail(errors, f"{page}: local HTTP check returned {status}")
        except (urllib.error.URLError, TimeoutError) as exc:
            fail(errors, f"{page}: local HTTP check failed: {exc}")

    for asset in [
        "portfolio-content.css",
        "portfolio-mobile-fixes.css",
        "portfolio-content-sync.js",
        "Solomon-Wakhungu-Resume.pdf",
        "robots.txt",
        "sitemap.xml",
    ]:
        try:
            status, body, _ = fetch(urllib.parse.urljoin(BASE_URL, asset))
            if status != 200 or not body:
                fail(errors, f"{asset}: local HTTP check returned {status}")
        except (urllib.error.URLError, TimeoutError) as exc:
            fail(errors, f"{asset}: local HTTP check failed: {exc}")

    sitemap = ET.parse(ROOT / "sitemap.xml")
    namespace = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    sitemap_urls = {node.text for node in sitemap.findall("sm:url/sm:loc", namespace) if node.text}
    expected_urls = {expected_canonical(page) for page in PAGES}
    if sitemap_urls != expected_urls:
        fail(errors, f"sitemap URLs differ: expected {sorted(expected_urls)}, found {sorted(sitemap_urls)}")
    robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
    if f"Sitemap: {PRODUCTION_URL}sitemap.xml" not in robots:
        fail(errors, "robots.txt does not declare the production sitemap")

    deployed_resume = ROOT / "Solomon-Wakhungu-Resume.pdf"
    deployed_hash = hashlib.sha256(deployed_resume.read_bytes()).hexdigest()
    if deployed_hash != SANITIZED_RESUME_SHA256:
        fail(errors, "portfolio resume differs from the verified sanitized artifact")
    pdftotext = shutil.which("pdftotext")
    extracted_pdf_text: bytes | None = None
    if pdftotext:
        result = subprocess.run(
            [pdftotext, str(deployed_resume), "-"],
            cwd=ROOT,
            capture_output=True,
            check=False,
        )
        if result.returncode:
            fail(errors, "resume PDF text extraction failed")
        else:
            extracted_pdf_text = result.stdout
    else:
        try:
            from pypdf import PdfReader
        except ImportError:
            fail(errors, "pdftotext or pypdf is required for the resume email scan")
        else:
            reader = PdfReader(deployed_resume)
            extracted_pdf_text = "\n".join(
                page.extract_text() or "" for page in reader.pages
            ).encode("utf-8")
    if extracted_pdf_text is not None and (
        EMAIL_ADDRESS_PATTERN.search(extracted_pdf_text)
        or EMAIL_PROTOCOL.encode() in extracted_pdf_text.lower()
        or GMAIL_DOMAIN.encode() in extracted_pdf_text.lower()
    ):
        fail(errors, "resume PDF contains direct-email content")

    if SOURCE_ROOT.exists():
        for study in STUDIES:
            approved_body = markdown_body(SOURCE_ROOT / study["source"])
            generated = (ROOT / study["slug"]).read_text(encoding="utf-8")
            if approved_body not in generated:
                fail(errors, f"{study['slug']}: article body differs from authoritative Markdown")

    for stylesheet in ["portfolio-content.css", "portfolio-mobile-fixes.css"]:
        css = (ROOT / stylesheet).read_text(encoding="utf-8")
        if "overflow-x: clip" not in css:
            fail(errors, f"{stylesheet}: root overflow clipping rule missing")
        if "overflow-x: hidden" in css:
            fail(errors, f"{stylesheet}: hidden overflow masks responsive defects")
        if "100vw" in css:
            fail(errors, f"{stylesheet}: viewport width unit can cause horizontal overflow")

    runtime_sync = (ROOT / "portfolio-content-sync.js").read_text(encoding="utf-8")
    catalog_match = re.search(
        r"// BEGIN GENERATED PROJECT CATALOG\s+const projects = (\[.*?\]);\s+"
        r"// END GENERATED PROJECT CATALOG",
        runtime_sync,
        flags=re.S,
    )
    if not catalog_match:
        fail(errors, "portfolio-content-sync.js: generated project catalog missing")
    else:
        try:
            runtime_projects = json.loads(catalog_match.group(1))
            if runtime_projects != PROJECTS:
                fail(errors, "portfolio-content-sync.js: generated project catalog differs from source")
        except json.JSONDecodeError as exc:
            fail(errors, f"portfolio-content-sync.js: project catalog JSON invalid: {exc}")
    for required in [
        "portfolio-project-collection",
        "portfolio-featured-projects",
        "projects.slice(0, 3)",
        'project.tags.join(" · ")',
        'const isProjectsPage = window.location.pathname === "/projects.html";',
    ]:
        if required not in runtime_sync:
            fail(errors, f"portfolio-content-sync.js: missing project collection safeguard {required}")
    project_source = (ROOT / "projects.html").read_text(encoding="utf-8") + runtime_sync
    for excluded in EXCLUDED_PROJECTS:
        if excluded in project_source:
            fail(errors, f"project collection includes excluded repository {excluded}")
    for required in ["#contact", "scrollIntoView", ".framer-108jl35-container", "LinkedIn"]:
        if required not in runtime_sync:
            fail(errors, f"portfolio-content-sync.js: missing hydration safeguard {required}")
    for broken_route, working_route in NAVIGATION_ROUTES.items():
        route_mapping = f'["{broken_route}", "{working_route}"]'
        if route_mapping not in runtime_sync:
            fail(errors, f"portfolio-content-sync.js: missing navigation mapping {route_mapping}")
    for required in [
        'attributes: true',
        'attributeFilter: ["href"]',
        'document.addEventListener("click"',
        "caseStudiesHeroArrow(anchor)",
        "event.stopImmediatePropagation()",
        "window.location.assign(url.href)",
    ]:
        if required not in runtime_sync:
            fail(errors, f"portfolio-content-sync.js: missing href hydration safeguard {required}")

    hydration_source = "\n".join(
        path.read_text(encoding="utf-8") for path in ROOT.glob("sites/**/*.mjs")
    )
    hydration_marker = 'children:"READ ENGINEERING"'
    marker_index = hydration_source.find(hydration_marker)
    label_index = hydration_source.find('children:"CASE STUDIES"', marker_index, marker_index + 3000)
    links_start = hydration_source.find("links:[", label_index, label_index + 1200)
    links_end = hydration_source.find("],children:", links_start, links_start + 1200)
    if min(marker_index, label_index, links_start, links_end) < 0:
        fail(errors, "Framer hydration: case-studies hero links missing")
    else:
        hero_links = hydration_source[links_start:links_end]
        if hero_links.count('href:"case-studies.html"') != 4:
            fail(errors, "Framer hydration: case-studies hero must target case-studies.html")
        if 'href:{webPageId:"anMi4_oPG"}' in hero_links:
            fail(errors, "Framer hydration: case-studies hero still targets projects.html")
    if 'href:{webPageId:"anMi4_oPG"}' not in hydration_source:
        fail(errors, "Framer hydration: Projects navigation route missing")
    entry_source = (ROOT / "sites" / "UpKjbusrEfSd0EVu97xOs" / FRAMER_ENTRY_MODULE).read_text(
        encoding="utf-8"
    )
    expected_import = f'import("./{HOME_FRAMER_MODULE}?v={HOME_FRAMER_VERSION}")'
    if expected_import not in entry_source:
        fail(errors, "Framer entry module: homepage hydration import is not cache-safe")

    javascript_files = [ROOT / "portfolio-content-sync.js", *ROOT.glob("sites/**/*.mjs")]
    for javascript in javascript_files:
        result = subprocess.run(
            ["node", "--check", str(javascript)],
            cwd=ROOT,
            capture_output=True,
            text=True,
            check=False,
        )
        if result.returncode:
            fail(errors, f"{javascript.relative_to(ROOT)}: JavaScript syntax error: {result.stderr.strip()}")

    return errors


if __name__ == "__main__":
    problems = validate()
    if problems:
        print("Portfolio validation failed:")
        for problem in problems:
            print(f"- {problem}")
        sys.exit(1)
    print(f"Portfolio validation passed for {len(PAGES)} pages and required assets.")
