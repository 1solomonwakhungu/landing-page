# Solomon Wakhungu Portfolio

Source for [solomonwakhungu.vercel.app](https://solomonwakhungu.vercel.app/).

## Content

- `index.html`: homepage
- `experience.html`: professional experience
- `projects.html`: featured engineering work
- `tools.html`: engineering stack
- `case-studies.html`: case study index
- `case-study-*.html`: detailed architecture and delivery case studies
- `sitemap.xml` and `robots.txt`: search discovery

The original Framer visual design is preserved. Portfolio copy, project evidence, metadata, structured data, SEO, and AEO content are maintained directly in this repository.

## Local verification

```bash
python3 -m http.server 4173
python3 scripts/validate_portfolio.py
```

Open `http://localhost:4173/` and verify all pages before pushing to `main`. The validator checks every public route, internal references, metadata, JSON-LD, approved case-study copy, forbidden direct-email content, generated JavaScript syntax, the sitemap, robots.txt, and required assets.

## Case-study publishing

The three article bodies are generated from the approved career artifacts:

- `overnight-autonomous-agent-system.md`
- `discord-cli.md`
- `enterprise-kubernetes-platform.md`

Set `CASE_STUDY_SOURCE_DIR` when the artifacts are stored somewhere other than Solomon's standard Hermes artifact directory, then run:

```bash
python3 scripts/generate_case_studies.py
python3 scripts/validate_portfolio.py
```

Vercel deploys the static production site from this repository after changes reach `main`.
