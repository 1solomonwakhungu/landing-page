import type { SurfaceTone } from "@/components/tonal/surface-tile";

export const SITE_URL = "https://harlo.dev";
export const SITE_NAME = "Solomon Wakhungu";
export const GITHUB_URL = "https://github.com/1solomonwakhungu";
export const LINKEDIN_URL =
  "https://www.linkedin.com/in/solomon-wakhungu-2712791bb/";
export const HOMEBREW_TAP_URL =
  "https://github.com/1solomonwakhungu/homebrew-tap";
export const TONAL_URL = "https://tonal.harlo.dev";

export const PROFILE = {
  name: "Solomon Wakhungu",
  alternateNames: ["harlo.dev", "1solomonwakhungu"],
  domain: "harlo.dev",
  location: "Houston, Texas",
  role: "Senior Software Engineer",
  company: "Credera",
  companyUrl: "https://www.credera.com/",
  alumniOf: "The University of Texas at Dallas",
  alumniUrl: "https://www.utdallas.edu/",
  degree: "Computer Science",
  credentials: [
    {
      name: "Databricks Certified Data Engineer Professional",
      issuer: "Databricks Academy",
      issuerUrl: "https://credentials.databricks.com/",
    },
  ],
  tagline:
    "Senior Software Engineer at Credera (ex-Amazon, Aviatrix), upstream contributor to Terraform, Helm, and VictoriaMetrics, and creator of harlo.dev.",
  bio: "Solomon Wakhungu is a Houston-based Senior Software Engineer at Credera (formerly Amazon and Aviatrix) who ships cloud platforms, multi-cluster Kubernetes tools, and AI agent infrastructure. He has 16+ merged upstream PRs across Terraform, Helm, and VictoriaMetrics, built an Amazon Alexa skill serving 407,000+ monthly requests, and runs five live developer tools on harlo.dev.",
  entitySummary:
    "Solomon Wakhungu is a Senior Software Engineer at Credera in Houston, Texas, and the creator of harlo.dev. Formerly at Amazon, Aviatrix, and Neurescence, he specializes in AWS, Kubernetes, Go, Python, Terraform, and Model Context Protocol (MCP) infrastructure. He has 16+ merged upstream open-source pull requests across HashiCorp Terraform AWS Provider, CNCF Helm, VictoriaMetrics, OpenRig, and Aviatrix, holds the Databricks Certified Data Engineer Professional credential, and maintains 13 open-source tools including kFLEET (14 MB Go Kubernetes control plane), gronify (1,000 MiB JSON in 3.63s at 65 MiB RSS), action-hub (10,000-tool meta-MCP layer in ~600 baseline tokens), Tonal (editorial UI design system), and discord-cli (89 commands across 20 groups).",
  disambiguatingDescription:
    "Houston-based Senior Software Engineer at Credera (formerly Amazon and Aviatrix), open-source contributor to HashiCorp Terraform, CNCF Helm, and VictoriaMetrics, and creator of the harlo.dev developer tools ecosystem.",
  knowsAbout: [
    "Go",
    "Python",
    "TypeScript",
    "Amazon Web Services",
    "Kubernetes",
    "Terraform",
    "Helm",
    "Argo CD",
    "GitOps",
    "Cloud Platform Engineering",
    "Model Context Protocol (MCP)",
    "AI Agent Infrastructure",
    "vLLM",
    "Data Engineering",
    "Design Systems",
  ],
};

export interface EngineeringReceipt {
  id: string;
  label: string;
  headline: string;
  detail: string;
  href: string;
  linkLabel: string;
  external?: boolean;
  tone: SurfaceTone;
}

export const NOTABLE_RECEIPTS: EngineeringReceipt[] = [
  {
    id: "upstream-oss",
    label: "Upstream Open Source",
    headline: "16+ merged PRs in core cloud & observability projects",
    detail:
      "Fixed a perpetual ActiveMQ diff in hashicorp/terraform-provider-aws, bypassed stale CDN installer responses in helm/helm, extended vmalert templates in VictoriaMetrics, and landed 13 PRs across OpenRig and Aviatrix.",
    href: "/projects#upstream-heading",
    linkLabel: "Inspect merged PRs",
    tone: "cool",
  },
  {
    id: "systems-benchmarks",
    label: "Systems & AI Tooling",
    headline: "1 GB JSON in 3.63s, 14 MB K8s control plane, 10K-tool MCP",
    detail:
      "Built gronify (1,000 MiB JSON in 3.63s at 65 MiB RSS), kFLEET (14 MB single-binary Go multi-cluster Kubernetes control plane with 9 MCP tools), and action-hub (10,000 tools and 5,000 skills indexed in ~600 baseline tokens).",
    href: "/projects",
    linkLabel: "Explore all 13 projects",
    tone: "mint",
  },
  {
    id: "production-scale",
    label: "Production Track Record",
    headline: "Credera, Amazon (407K+ req/mo), Aviatrix & Neurescence",
    detail:
      "Delivers enterprise AWS and Kubernetes platforms at Credera; shipped an Alexa skill serving 407,000+ monthly requests at Amazon; automated 4-cloud infrastructure in Go and Terraform at Aviatrix; supported 5,000+ researchers at Neurescence.",
    href: "/experience",
    linkLabel: "View career timeline",
    tone: "warm",
  },
  {
    id: "ecosystem-credentials",
    label: "Ecosystem & Credentials",
    headline: "5 live harlo.dev apps, unified Homebrew tap & Databricks Pro",
    detail:
      "Distributes software across Homebrew (brew tap 1solomonwakhungu/tap), PyPI, npm, Docker, and GitHub Actions. UT Dallas Computer Science alumnus and Databricks Certified Data Engineer Professional.",
    href: HOMEBREW_TAP_URL,
    linkLabel: "Inspect Homebrew tap",
    external: true,
    tone: "neutral",
  },
];

export interface ExperienceItem {
  company: string;
  companyUrl: string;
  role: string;
  period: string;
  summary: string;
  focus: string[];
  tone: SurfaceTone;
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Credera",
    companyUrl: "https://www.credera.com/",
    role: "Senior Software Engineer",
    period: "Mar 2026 - Present",
    summary:
      "Senior Software Engineer delivering secure cloud platforms, Kubernetes operations, CI/CD automation, and maintainable backend systems for enterprise teams.",
    focus: ["Cloud Platforms", "Kubernetes", "CI/CD", "Backend Systems"],
    tone: "cool",
  },
  {
    company: "Amazon",
    companyUrl: "https://amazon.com/",
    role: "Software Development Engineer Intern",
    period: "May 2023 - Jul 2023",
    summary:
      "Built an Alexa skill serving 407,000+ monthly requests with AWS Lambda, S3, and DynamoDB, and evaluated managed LLM workflows on SageMaker.",
    focus: ["AWS Lambda", "DynamoDB", "S3", "SageMaker"],
    tone: "warm",
  },
  {
    company: "Aviatrix",
    companyUrl: "https://aviatrix.com/",
    role: "Cloud Infrastructure Engineer",
    period: "Nov 2021 - Aug 2022",
    summary:
      "Automated multi-cloud infrastructure across AWS, GCP, Azure, and OCI; migrated Python automation to Go; and used Terraform to make deployments repeatable.",
    focus: ["Multi-Cloud", "Go", "Python", "Terraform"],
    tone: "neutral",
  },
  {
    company: "Neurescence",
    companyUrl: "https://neurescence.com/",
    role: "Software Engineer",
    period: "May 2021 - Aug 2021",
    summary:
      "Maintained a Python image-processing platform supporting 5,000+ researchers and 130,000+ biological images, with Flask services and Google Cloud delivery pipelines.",
    focus: ["Python", "Flask", "Google Cloud", "Data Pipelines"],
    tone: "mint",
  },
];

export type ProjectCategory =
  | "All"
  | "Live on harlo.dev"
  | "Kubernetes & Cloud"
  | "MCP & AI"
  | "CLI & Tooling";

export interface ProjectItem {
  id: string;
  name: string;
  href: string;
  demoUrl?: string;
  demoLabel?: string;
  description: string;
  tags: string[];
  categories: Exclude<ProjectCategory, "All">[];
  external: boolean;
  featured?: boolean;
  tone: SurfaceTone;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "kfleet",
    name: "kFLEET",
    href: "https://github.com/1solomonwakhungu/kfleet",
    demoUrl: "https://kfleet.harlo.dev",
    demoLabel: "kfleet.harlo.dev",
    description:
      "14 MB single-binary Go control plane for Kubernetes fleets with a 3-rule read-only ClusterRole, embedded Primer React UI, SQLite timeline, and 9 read-only MCP tools.",
    tags: ["Kubernetes", "Go", "MCP"],
    categories: ["Live on harlo.dev", "Kubernetes & Cloud", "MCP & AI"],
    external: true,
    featured: true,
    tone: "cool",
  },
  {
    id: "tonal",
    name: "Tonal",
    href: "https://github.com/1solomonwakhungu/tonal",
    demoUrl: "https://tonal.harlo.dev",
    demoLabel: "tonal.harlo.dev",
    description:
      "Editorial tonal UI design system and shadcn-compatible component registry built with Google Sans, 12 flat surface CSS tokens, Soft Pill and Commerce modes, dark theme, and zero heavy dependencies.",
    tags: ["Design System", "React", "Tailwind CSS"],
    categories: ["Live on harlo.dev", "CLI & Tooling"],
    external: true,
    featured: true,
    tone: "warm",
  },
  {
    id: "gronify",
    name: "gronify",
    href: "https://github.com/1solomonwakhungu/gronify",
    demoUrl: "https://gronify.harlo.dev",
    demoLabel: "gronify.harlo.dev",
    description:
      "Streaming gron-style CLI on npm and Homebrew that flattens, searches, and unflattens gigabyte-scale JSON and NDJSON (1000 MiB in 3.63s at 65 MiB RSS).",
    tags: ["CLI", "JSON", "TypeScript"],
    categories: ["Live on harlo.dev", "CLI & Tooling"],
    external: true,
    featured: true,
    tone: "mint",
  },
  {
    id: "action-hub",
    name: "action-hub",
    href: "https://github.com/1solomonwakhungu/action-hub",
    demoUrl: "https://1solomonwakhungu.github.io/action-hub/",
    demoLabel: "Explainer",
    description:
      "Indexed on-demand meta-MCP layer replacing eager tool-schema bloat with a single cache-stable search, load, and execute tool (~600 baseline tokens; load-tested at 44 servers, 10,000 tools, and 5,000 skills).",
    tags: ["MCP", "AI Agents", "TypeScript"],
    categories: ["MCP & AI"],
    external: true,
    featured: true,
    tone: "sky",
  },
  {
    id: "runpod-vllm-deployer",
    name: "RunPod vLLM Deployer",
    href: "https://github.com/1solomonwakhungu/runpod-vllm-deployer",
    demoUrl: "https://vllm.harlo.dev",
    demoLabel: "vllm.harlo.dev",
    description:
      "Python CLI that plans offline, confirms billable actions, deploys, checks readiness, smoke tests, and tears down OpenAI-compatible vLLM servers on RunPod GPUs.",
    tags: ["Python", "GPU", "MLOps"],
    categories: ["Live on harlo.dev", "MCP & AI", "CLI & Tooling"],
    external: true,
    featured: true,
    tone: "sand",
  },
  {
    id: "typst-dev-container",
    name: "Typst Dev Container",
    href: "https://github.com/1solomonwakhungu/typst-dev-container",
    demoUrl: "https://typst.harlo.dev",
    demoLabel: "typst.harlo.dev",
    description:
      "Reproducible Typst, Pandoc, and Rust Dev Container published to ghcr.io with automated CI toolchain updates and smoke tests.",
    tags: ["Dev Containers", "Typst", "Docker"],
    categories: ["Live on harlo.dev", "Kubernetes & Cloud", "CLI & Tooling"],
    external: true,
    featured: true,
    tone: "neutral",
  },
  {
    id: "contexto",
    name: "contexto",
    href: "https://github.com/VentureForgre/contexto",
    description:
      "Zero-dependency local proxy keeping Claude Code and Codex under a fixed token bound by paging older turns to disk verbatim with MCP recall tools and reproducible benchmarks.",
    tags: ["AI Agents", "MCP", "Python"],
    categories: ["MCP & AI"],
    external: true,
    tone: "cool",
  },
  {
    id: "googlemcp",
    name: "googlemcp",
    href: "https://github.com/1solomonwakhungu/googlemcp",
    description:
      "Local stdio MCP server for 19 Google APIs (Gmail, Calendar, Drive, YouTube, Analytics, Search Console, Photos, Tasks, and more), read-only by default with per-product write and destructive opt-ins plus Terraform API enablement.",
    tags: ["MCP", "Google APIs", "Python"],
    categories: ["MCP & AI"],
    external: true,
    tone: "neutral",
  },
  {
    id: "discord-cli",
    name: "discord-cli",
    href: "https://github.com/1solomonwakhungu/discord-cli",
    description:
      "Headless REST-first Python CLI (v1.9.0) with 89 commands across 20 groups, deterministic safety policies, runtime JSON Schemas, human selectors, zero-gateway webhooks, PyPI/Homebrew/Docker/GitHub Action distribution, and an installable agent skill.",
    tags: ["Python", "CLI", "Automation"],
    categories: ["CLI & Tooling", "MCP & AI"],
    external: true,
    tone: "warm",
  },
  {
    id: "terraform-aws-private-llm",
    name: "Terraform AWS Private LLM",
    href: "https://github.com/1solomonwakhungu/terraform-aws-private-llm",
    description:
      "Reusable Terraform module for EC2-based Ollama and Open WebUI with encrypted EBS gp3, Caddy auto-TLS, and optional Route 53.",
    tags: ["Terraform", "AWS", "Ollama"],
    categories: ["Kubernetes & Cloud", "MCP & AI"],
    external: true,
    tone: "sky",
  },
  {
    id: "homebrew-tap",
    name: "Homebrew Tap",
    href: HOMEBREW_TAP_URL,
    description:
      "Unified Homebrew tap distributing kfleet, gronify, discordcli-agents, and openrig with automated CI formula updates.",
    tags: ["Homebrew", "CLI", "Distribution"],
    categories: ["CLI & Tooling"],
    external: true,
    tone: "mint",
  },
  {
    id: "case-studies",
    name: "Engineering Case Studies",
    href: "/case-studies",
    description:
      "Architecture and delivery accounts covering Kubernetes platforms, overnight autonomous agents, and headless Discord CLI engineering.",
    tags: ["Architecture", "Delivery", "Operations"],
    categories: ["Kubernetes & Cloud", "MCP & AI"],
    external: false,
    tone: "warm",
  },
  {
    id: "homeserver-infra",
    name: "Homeserver Infrastructure",
    href: "https://github.com/1solomonwakhungu/homeserver-infra",
    description:
      "Terraform and Terragrunt stacks for cloud-init Proxmox VMs, with reusable modules, remote state, validation, and operator runbooks.",
    tags: ["Terraform", "Terragrunt", "Proxmox"],
    categories: ["Kubernetes & Cloud"],
    external: true,
    tone: "neutral",
  },
];

export interface HarloLiveApp {
  name: string;
  host: string;
  url: string;
  repoUrl: string;
  summary: string;
  chip: string;
  tone: SurfaceTone;
}

export const HARLO_LIVE_APPS: HarloLiveApp[] = [
  {
    name: "Tonal",
    host: "tonal.harlo.dev",
    url: "https://tonal.harlo.dev",
    repoUrl: "https://github.com/1solomonwakhungu/tonal",
    summary: "Editorial tonal UI design system & shadcn registry",
    chip: "Design System",
    tone: "warm",
  },
  {
    name: "kFLEET",
    host: "kfleet.harlo.dev",
    url: "https://kfleet.harlo.dev",
    repoUrl: "https://github.com/1solomonwakhungu/kfleet",
    summary: "14 MB Go multi-cluster Kubernetes control plane & MCP server",
    chip: "Kubernetes",
    tone: "cool",
  },
  {
    name: "gronify",
    host: "gronify.harlo.dev",
    url: "https://gronify.harlo.dev",
    repoUrl: "https://github.com/1solomonwakhungu/gronify",
    summary: "Streaming gigabyte-scale JSON & NDJSON CLI",
    chip: "CLI",
    tone: "mint",
  },
  {
    name: "Typst Dev Container",
    host: "typst.harlo.dev",
    url: "https://typst.harlo.dev",
    repoUrl: "https://github.com/1solomonwakhungu/typst-dev-container",
    summary: "Reproducible Typst, Pandoc, and Rust container on ghcr.io",
    chip: "Dev Containers",
    tone: "neutral",
  },
  {
    name: "RunPod vLLM Deployer",
    host: "vllm.harlo.dev",
    url: "https://vllm.harlo.dev",
    repoUrl: "https://github.com/1solomonwakhungu/runpod-vllm-deployer",
    summary: "Offline-planned OpenAI-compatible vLLM GPU deployments",
    chip: "GPU / MLOps",
    tone: "sand",
  },
];

export interface UpstreamContribution {
  title: string;
  href: string;
  badge: string;
  summary: string;
}

export const UPSTREAM_CONTRIBUTIONS: UpstreamContribution[] = [
  {
    title: "hashicorp/terraform-provider-aws#48962",
    href: "https://github.com/hashicorp/terraform-provider-aws/pull/48962",
    badge: "Merged PR",
    summary:
      "Fixed a perpetual in-place diff on ActiveMQ brokers where shared_resources stayed unset after refresh. Closed two issues.",
  },
  {
    title: "helm/helm#32339",
    href: "https://github.com/helm/helm/pull/32339",
    badge: "Merged PR",
    summary:
      "Made get-helm-3 and get-helm-4 bypass stale CDN responses so machines running the installer after a release get the same Helm version.",
  },
  {
    title: "VictoriaMetrics/VictoriaMetrics#11258",
    href: "https://github.com/VictoriaMetrics/VictoriaMetrics/pull/11258",
    badge: "Merged PR",
    summary:
      "Added .Interval to vmalert templates so alert annotations and dashboard links can reference the group evaluation interval directly.",
  },
  {
    title: "mvschwarz/openrig",
    href: "https://github.com/mvschwarz/openrig/pulls?q=is%3Apr+author%3A1solomonwakhungu+is%3Amerged",
    badge: "4 Merged PRs",
    summary:
      "Four merged daemon fixes: retries after transient provider failures, factual startup-exit errors, retained queue-wake diagnostics, and opt-in end-to-end tests.",
  },
  {
    title: "Aviatrix Terraform modules & lab docs",
    href: "https://github.com/search?q=author%3A1solomonwakhungu+is%3Apr+is%3Amerged+org%3Aterraform-aviatrix-modules+org%3AAviatrixSystems&type=pullrequests",
    badge: "9 Merged PRs",
    summary:
      "Nine merged PRs across terraform-aviatrix-gcp-edge-demo and avxlabs-docs, including an Edge ZTP ISO fix and CI checks for the course content pipeline.",
  },
];

export interface CoreTool {
  name: string;
  category: string;
  summary: string;
  details: string;
  href: string;
  tone: SurfaceTone;
}

export const CORE_TOOLS: CoreTool[] = [
  {
    name: "Python",
    category: "Backend & AI Tooling",
    summary: "Backend engineering and automation",
    details:
      "Production services, MCP servers (googlemcp, contexto), headless CLIs (discord-cli, runpod-vllm-deployer), and data pipelines.",
    href: "https://www.python.org/",
    tone: "cool",
  },
  {
    name: "Go",
    category: "Platform Engineering",
    summary: "Cloud services and platform tooling",
    details:
      "Single-binary Kubernetes control planes (kFLEET), high-reliability infrastructure automation, and Terraform provider contributions.",
    href: "https://go.dev/",
    tone: "sky",
  },
  {
    name: "Terraform",
    category: "Infrastructure as Code",
    summary: "Repeatable cloud infrastructure",
    details:
      "Modular AWS, multi-cloud, and Proxmox stacks with remote state, plan/apply gates, and upstream AWS provider bug fixes.",
    href: "https://www.terraform.io/",
    tone: "warm",
  },
  {
    name: "Kubernetes",
    category: "Container Orchestration",
    summary: "Container orchestration",
    details:
      "Multi-cluster observability, Argo CD GitOps reconciliation, Helm chart packaging, and namespace-scoped RBAC.",
    href: "https://kubernetes.io/",
    tone: "neutral",
  },
  {
    name: "AWS",
    category: "Cloud Platform",
    summary: "Cloud platform",
    details:
      "EKS, Lambda, DynamoDB, S3, SageMaker, EC2 GPU/LLM hosts, IAM least privilege, and Route 53 automation.",
    href: "https://aws.amazon.com/",
    tone: "sand",
  },
  {
    name: "GitHub Actions",
    category: "Delivery & Release CI",
    summary: "CI/CD automation",
    details:
      "Automated container publishing to ghcr.io, Homebrew tap formula updates, multi-platform release artifacts, and verification gates.",
    href: "https://github.com/features/actions",
    tone: "mint",
  },
];

export const ENGINEERING_PILLARS = [
  {
    id: "cloud-k8s",
    label: "Cloud & Kubernetes",
    eyebrow: "Platform Engineering",
    headline: "Git-driven clusters with bounded blast radius and zero drift.",
    summary:
      "Provisioning AWS and multi-cloud infrastructure with Terraform, reconciling Kubernetes workloads through Argo CD and Helm, and building read-only fleet observability like kFLEET (14 MB Go binary, 3-rule ClusterRole, 9 MCP tools).",
    highlights: [
      "Terraform-managed AWS networking, IAM, and Kubernetes",
      "Argo CD GitOps reconciliation with explicit health checks",
      "Upstream merges in terraform-provider-aws, helm, and VictoriaMetrics",
    ],
    primaryLink: { label: "Read Kubernetes case study", href: "/case-studies/kubernetes" },
    secondaryLink: { label: "Explore kfleet.harlo.dev", href: "https://kfleet.harlo.dev" },
    meta: "Go · Terraform · AWS · Argo CD",
  },
  {
    id: "ai-mcp",
    label: "AI Infrastructure & MCP",
    eyebrow: "Agent & Inference Systems",
    headline: "Predictable token budgets, verified outputs, and safe tool boundaries.",
    summary:
      "Designing MCP servers and agent proxies that stay cache-stable and read-only by default: action-hub (~600 baseline tokens at 10,000 indexed tools), contexto for verbatim disk paging, googlemcp across 19 Google APIs, and RunPod vLLM deployments.",
    highlights: [
      "Read-only by default with explicit opt-ins for mutations",
      "Offline cost planning and readiness verification on GPU deploys",
      "Output-verified overnight delegation across local and hosted models",
    ],
    primaryLink: {
      label: "Read Autonomous Agents case study",
      href: "/case-studies/autonomous-agents",
    },
    secondaryLink: { label: "Explore vllm.harlo.dev", href: "https://vllm.harlo.dev" },
    meta: "MCP · Python · TypeScript · vLLM",
  },
  {
    id: "cli-ui",
    label: "CLIs & Tonal UI",
    eyebrow: "Developer Experience",
    headline: "Calm interfaces and fast, composable command-line tools.",
    summary:
      "Shipping tools that respect operators' time: gronify flattens 1000 MiB JSON in 3.63s at 65 MiB RSS, discord-cli delivers 89 headless JSON commands via PyPI, Homebrew, Docker, and GitHub Actions, and Tonal distills calm editorial UI down to 12 CSS tokens.",
    highlights: [
      "Unified distribution via brew tap 1solomonwakhungu/tap",
      "Machine-readable JSON envelopes alongside human-readable modes",
      "Tonal shadcn registry powering harlo.dev and tonal.harlo.dev",
    ],
    primaryLink: { label: "Read discord-cli case study", href: "/case-studies/discord-cli" },
    secondaryLink: { label: "Explore tonal.harlo.dev", href: "https://tonal.harlo.dev" },
    meta: "TypeScript · React · Homebrew · PyPI",
  },
];

export const EXPERIENCE_FAQ = [
  {
    question: "Who is Solomon Wakhungu?",
    answer:
      "Solomon Wakhungu is a Houston-based Senior Software Engineer at Credera (formerly Amazon, Aviatrix, and Neurescence) and the creator of harlo.dev. He specializes in AWS, Kubernetes, Go, Python, Terraform, and AI agent infrastructure, with 16+ merged upstream open-source PRs and 13 public developer tools.",
  },
  {
    question: "What has Solomon Wakhungu built?",
    answer:
      "Solomon Wakhungu created 13 open-source engineering projects and 5 live production web apps on harlo.dev, including kFLEET (a 14 MB single-binary Go Kubernetes fleet control plane and MCP server), gronify (a streaming JSON CLI flattening 1,000 MiB in 3.63s at 65 MiB RSS), action-hub (a meta-MCP layer load-tested at 10,000 tools and 5,000 skills in ~600 baseline tokens), Tonal (an editorial UI design system and shadcn registry), discord-cli (89 headless commands across 20 groups), contexto, googlemcp, and RunPod vLLM Deployer.",
  },
  {
    question: "What open-source projects has Solomon Wakhungu contributed to?",
    answer:
      "He has 16+ merged upstream pull requests across major infrastructure and observability projects, including HashiCorp's terraform-provider-aws (#48962), CNCF's helm/helm (#32339), VictoriaMetrics (#11258), mvschwarz/openrig (4 merged PRs), and Aviatrix Terraform modules and lab documentation (9 merged PRs).",
  },
  {
    question: "What is Solomon Wakhungu's career background and credentials?",
    answer:
      "He is a Senior Software Engineer at Credera. Previously, he built an Alexa skill serving 407,000+ monthly requests and evaluated SageMaker LLM workflows at Amazon, automated multi-cloud infrastructure (AWS, GCP, Azure, OCI) in Go and Terraform at Aviatrix, and maintained a scientific image platform serving 5,000+ researchers and 130,000+ images at Neurescence. He studied Computer Science at The University of Texas at Dallas and holds the Databricks Certified Data Engineer Professional certification.",
  },
  {
    question: "How can we get in touch about a role, advisory, or collaboration?",
    answer:
      "Connect on LinkedIn or use the structured inquiry builder in the Contact section to draft a message. Public direct email addresses and public resume PDFs are intentionally omitted from harlo.dev.",
  },
];
