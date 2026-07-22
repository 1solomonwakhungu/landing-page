"""Verified project catalog used by the portfolio generator and validator."""

PROJECTS = [
    {
        "name": "kFLEET",
        "href": "https://github.com/1solomonwakhungu/kfleet",
        "description": (
            "Go control plane with Kubernetes agents, an embedded web UI, "
            "WebSocket updates, SQLite inventory, and MCP tools."
        ),
        "tags": ["Kubernetes", "Go", "MCP"],
        "external": True,
    },
    {
        "name": "discord-cli",
        "href": "https://github.com/1solomonwakhungu/discord-cli",
        "description": (
            "Python CLI with 50+ Discord administration commands, structured JSON output, "
            "and single-action connections for scripts and agents."
        ),
        "tags": ["Python", "CLI", "Automation"],
        "external": True,
    },
    {
        "name": "RunPod vLLM Deployer",
        "href": "https://github.com/1solomonwakhungu/runpod-vllm-deployer",
        "description": (
            "Python CLI that plans, deploys, checks, smoke tests, and tears down "
            "OpenAI-compatible vLLM servers on RunPod GPUs."
        ),
        "tags": ["Python", "GPU", "MLOps"],
        "external": True,
    },
    {
        "name": "Engineering Case Studies",
        "href": "case-studies.html",
        "description": (
            "Architecture and delivery accounts covering Kubernetes platforms, "
            "overnight autonomous agents, and Discord CLI engineering."
        ),
        "tags": ["Architecture", "Delivery", "Operations"],
        "external": False,
    },
    {
        "name": "Homeserver Infrastructure",
        "href": "https://github.com/1solomonwakhungu/homeserver-infra",
        "description": (
            "Terraform and Terragrunt stacks for cloud-init Proxmox VMs, with reusable "
            "modules, remote state, validation, and operator runbooks."
        ),
        "tags": ["Terraform", "Terragrunt", "Proxmox"],
        "external": True,
    },
    {
        "name": "Homelab Core",
        "href": "https://github.com/1solomonwakhungu/homelab-core",
        "description": (
            "Sanitized architecture, monitoring examples, and runbooks for routing, "
            "observability, backups, restores, and incident response."
        ),
        "tags": ["Runbooks", "Prometheus", "Grafana"],
        "external": True,
    },
    {
        "name": "Terraform AWS Private LLM",
        "href": "https://github.com/1solomonwakhungu/terraform-aws-private-llm",
        "description": (
            "Terraform module for EC2-based Ollama and Open WebUI with encrypted EBS, "
            "Caddy, and optional Route 53 TLS."
        ),
        "tags": ["Terraform", "AWS", "Ollama"],
        "external": True,
    },
    {
        "name": "Typst Dev Container",
        "href": "https://github.com/1solomonwakhungu/typst-dev-container",
        "description": (
            "Dev Container template for Typst and Pandoc document workflows, with smoke "
            "tests and release automation."
        ),
        "tags": ["Dev Containers", "Typst", "Pandoc"],
        "external": True,
    },
    {
        "name": "Fund Allocator",
        "href": "https://github.com/1solomonwakhungu/fund-allocator",
        "description": (
            "Flask application that divides available funds across named accounts after "
            "reserving a checking balance and honoring minimum allocations."
        ),
        "tags": ["Flask", "Python", "Kubernetes"],
        "external": True,
    },
]
