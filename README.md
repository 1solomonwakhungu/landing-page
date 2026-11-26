# Solomon Wakhungu · harlo.dev

Personal landing page for [harlo.dev](https://harlo.dev), built with **Tonal** ([tonal.harlo.dev](https://tonal.harlo.dev)) on Next.js 15, React 19, and Tailwind CSS v4.

## Routes

- `/` : Overview, live `harlo.dev` apps, engineering pillars, featured projects, experience, case studies, merged upstream OSS, stack, and contact
- `/experience` : Roles at Credera, Amazon, Aviatrix, and Neurescence, education, and FAQ
- `/projects` : Interactive 13-project catalog (including Tonal) and merged upstream open-source contributions
- `/tools` : Core production engineering stack and domain matrix
- `/case-studies` : Case study index and open proof
- `/case-studies/kubernetes` : Enterprise Kubernetes and GitOps Platform Work
- `/case-studies/autonomous-agents` : An Overnight Autonomous Engineering System
- `/case-studies/discord-cli` : discord-cli, a Headless Discord Management CLI
- `/sitemap.xml`, `/robots.txt`, `/llms.txt` : Search and LLM discovery

Legacy `.html` paths (`/experience.html`, `/projects.html`, `/tools.html`, `/case-studies.html`, and `/case-study-*.html`) permanently redirect (308) to their clean App Router equivalents.

## Local Development & Verification

```bash
npm install
npm run dev
```

Run typechecking, production build, and content/privacy validation before pushing:

```bash
npm run lint
npm run validate
npm run build
```

## Privacy & Content Invariants

- Direct email addresses and public resume PDFs are intentionally excluded and blocked by `scripts/validate-site.mjs`.
- Em dashes are disallowed across repository source files.
- Approved case-study prose is preserved without adding unsupported metrics.
