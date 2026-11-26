import type { SurfaceTone } from "@/components/tonal/surface-tile";

export interface CaseStudyBlock {
  type: "paragraph" | "ul" | "ol" | "code";
  text?: string;
  items?: string[];
}

export interface CaseStudySection {
  heading: string;
  blocks: CaseStudyBlock[];
}

export interface CaseStudy {
  slug: string;
  shortTitle: string;
  mark: string;
  eyebrow: string;
  title: string;
  pageTitle: string;
  description: string;
  summary: string;
  tags: string[];
  tone: SurfaceTone;
  intro?: string;
  releaseNote?: {
    eyebrow: string;
    repoUrl: string;
    repoLabel: string;
    homebrewUrl: string;
  };
  repoUrl?: string;
  sections: CaseStudySection[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "kubernetes",
    shortTitle: "Kubernetes",
    mark: "K8s",
    eyebrow: "Platform engineering case study",
    title: "Enterprise Kubernetes and GitOps Platform Work",
    pageTitle: "Kubernetes and GitOps Platform Work | Solomon Wakhungu",
    description:
      "A composite case study of enterprise Kubernetes work on AWS using Terraform, Argo CD, Helm, RBAC, CI, and observable GitOps delivery.",
    summary:
      "Recurring enterprise platform patterns across Terraform-provisioned Kubernetes on AWS, Argo CD GitOps, Helm, RBAC, and operational controls.",
    tags: ["Kubernetes", "AWS", "Terraform", "Argo CD", "GitOps"],
    tone: "cool",
    intro:
      "This case study describes recurring patterns from enterprise platform engineering engagements: building and operating Kubernetes infrastructure on AWS, Terraform-managed provisioning, and Argo CD-based GitOps delivery for internal enterprise tooling. Client names, internal system names, and any business-specific logic have been removed or generalized. No metrics below are client-reported figures; where a number would normally appear, it is omitted rather than estimated. This is a composite, anonymized account of recurring patterns, not a specific named engagement.",
    sections: [
      {
        heading: "Problem",
        blocks: [
          {
            type: "paragraph",
            text: "Enterprise teams adopting Kubernetes commonly reach a point where the cluster itself is no longer the hard part. The infrastructure exists, but getting a change from a developer's laptop into production safely, repeatedly, and with a clear audit trail is not solved by `kubectl apply`. Manual deployments create drift between what is running and what is declared in source control, rollbacks depend on someone remembering the last-known-good configuration, and basic questions like \"who changed this, and when\" are hard to answer once enough services and teams share a cluster.",
          },
        ],
      },
      {
        heading: "Approach",
        blocks: [
          {
            type: "paragraph",
            text: "The recurring approach across these engagements has been to treat Git as the single source of truth for both infrastructure and application state, and to let a GitOps controller reconcile the cluster to match it rather than pushing changes imperatively:",
          },
          {
            type: "ul",
            items: [
              "**Infrastructure as code.** Terraform provisions the Kubernetes cluster on AWS along with its supporting networking and IAM resources, so cluster-level changes go through the same review and plan/apply discipline as application code.",
              "**GitOps delivery.** Argo CD watches Git repositories containing Helm charts and Kubernetes manifests and continuously reconciles the live cluster state to match them. A deployment is a merged commit, not a manual step, and the running state of the cluster is always diffable against Git.",
              "**Access control at the cluster layer.** Namespace-scoped RBAC and Kubernetes-native access controls determine who can act on which workloads, so cluster access follows the same reviewable configuration model as everything else deployed through GitOps.",
              "**CI as a gate, not a bypass.** CI pipelines build, test, and package changes into container images and chart versions, but do not deploy directly. Deployment authority stays with the GitOps controller reading from Git, which keeps the pipeline's job limited to producing a reviewable, versioned artifact.",
            ],
          },
        ],
      },
      {
        heading: "Architecture",
        blocks: [
          {
            type: "code",
            text: `Developer PR --> CI (build, test, package image + chart)
                     |
                     v
              Merge to Git (source of truth)
                     |
                     v
              Argo CD reconciliation loop
                     |
        +------------+-------------+
        |                          |
        v                          v
  Kubernetes cluster (Terraform-  Helm-templated
  provisioned on AWS: networking,   workloads,
  IAM, node groups)                 ingress, RBAC
        |                          |
        v                          v
  Namespace-scoped RBAC gates   Observability
  cluster + Argo CD access      (metrics, logs)
                                 feed rollout health`,
          },
        ],
      },
      {
        heading: "Deployment Safety and Tradeoffs",
        blocks: [
          {
            type: "paragraph",
            text: "Because Argo CD continuously reconciles against Git, a manual `kubectl edit` against a live resource is corrected back to the Git-declared state on the next sync rather than silently persisting as drift. That property is valuable for auditability but has a real cost: it removes the option of a quick manual hotfix under pressure, and teams have to be deliberate about sync windows, health checks, and automated pruning so that a broken commit does not get reconciled into production before anyone notices. Rollback becomes a Git revert rather than a bespoke recovery procedure, which is simpler to reason about but only as reliable as the health checks gating promotion; a rollout that passes a shallow readiness probe but is functionally broken will still get promoted.",
          },
          {
            type: "paragraph",
            text: "Centralizing deployment authority in a GitOps controller also concentrates risk: the reconciliation loop's scope and permissions have to be deliberately bounded, since a controller with cluster-wide write access is a single point of failure for both good and bad changes. Observability has to cover the reconciliation process itself, not just the workloads it deploys, so that a stuck or misbehaving sync is visible before it is mistaken for a healthy, idle state.",
          },
        ],
      },
      {
        heading: "Outcome and Lessons",
        blocks: [
          {
            type: "paragraph",
            text: "The consistent lesson across these engagements is that GitOps and infrastructure-as-code do not remove operational judgment, they relocate it. Instead of deciding whether a deployment looks safe at the moment of `kubectl apply`, the judgment goes into what the CI pipeline verifies before merge, what the readiness and liveness checks actually test, and how tightly the reconciliation loop's scope and permissions are bounded. Getting that judgment right, and documenting it so the next engineer does not have to rediscover it by reading Argo CD sync logs at 2 a.m., is the actual work behind \"we use GitOps.\"",
          },
        ],
      },
    ],
  },
  {
    slug: "autonomous-agents",
    shortTitle: "Agents",
    mark: "AI",
    eyebrow: "AI infrastructure case study",
    title: "An Overnight Autonomous Engineering System",
    pageTitle: "Overnight Autonomous Engineering System | Solomon Wakhungu",
    description:
      "How an overnight engineering queue routes work between a local model and paid coding agents, verifies outputs, and reconciles task status.",
    summary:
      "A nightly engineering queue that routes scoped work between a verified local model and paid coding agents, then checks the actual output.",
    tags: ["Linear", "LM Studio", "Qwen", "Codex CLI", "Claude Code"],
    tone: "warm",
    sections: [
      {
        heading: "Problem",
        blocks: [
          {
            type: "paragraph",
            text: "Engineering time is finite, and most of it competes with a day job. The question behind this project was narrow and practical: could a personal engineering backlog keep moving between 1 a.m. and 7 a.m., without a human present, without paying frontier-model API rates for every task, and without silently losing work if something broke overnight?",
          },
          {
            type: "paragraph",
            text: "The constraints made this harder than \"run an agent in a loop.\" A local model running on a personal machine is free but limited in context and reliability. Cloud coding agents are capable but cost money per task and are easy to over-provision if used for everything. And any system that runs unattended for six hours needs a way to know, the next morning, whether it actually did what it reported doing.",
          },
        ],
      },
      {
        heading: "Approach",
        blocks: [
          {
            type: "paragraph",
            text: "The system is built around three roles rather than one model:",
          },
          {
            type: "ol",
            items: [
              "**Task source.** A brainstorming pass (using a larger hosted model) turns rough ideas into concrete tasks, which are created and tracked as issues in Linear. Linear is the single source of truth for what is queued, in progress, or done.",
              "**First-pass local delegation.** A cron-driven startup script brings up LM Studio and loads Qwen3.6-35B-A3B locally on a Mac with 48GB of RAM. Simple, narrowly-scoped tasks are dispatched to this local model first, since it costs nothing to run.",
              "**Overflow to paid agents.** Tasks that exceed the local model's context budget or complexity are routed to Codex CLI, Claude Code, or a larger hosted model (GLM-5.2 via OpenRouter), which run externally and are not subject to the local model's context limits.",
            ],
          },
        ],
      },
      {
        heading: "Architecture",
        blocks: [
          {
            type: "code",
            text: `Linear (task source)
      |
      v
1am-7am cron dispatcher
      |
      v
 Try: local Qwen3.6-35B-A3B (LM Studio, 32K context)
      |
      +--> succeeds (task is small/simple) --> write output --> verify artifact
      |
      +--> fails / too complex
              |
              v
      Overflow: Codex CLI / Claude Code / GLM-5.2 (OpenRouter)
              |
              v
      write output --> verify artifact
              |
              v
   Verification gate (confirm output files and
   loaded model context actually exist, not just
   a reported status)
              |
              v
   Linear reconciliation (Done only if verified, else Backlog)`,
          },
        ],
      },
      {
        heading: "Outcome and Lessons",
        blocks: [
          {
            type: "paragraph",
            text: "The most important result of this project was not a feature. It was catching a failure mode where the system looked healthy while doing nothing.",
          },
          {
            type: "paragraph",
            text: "For ten nights (July 7-17), every task dispatched to the local Qwen3.6 model failed immediately: each call hit a context-length-exceeded error after a single API call, completed in two to three seconds, and wrote no files. The delegation framework's own status field showed \"completed\" for these runs, which was an artifact of the process exiting, not a genuine report that any work had been done. The cause was a mismatch between LM Studio's default loaded context window (8,192 tokens) and the actual context injected by the delegation framework for each subagent (system prompt, tool schemas, and task prompt, typically 10-20K tokens). The model was technically loaded and would answer simple prompts directly, so a basic health check (\"is the model running?\") passed every night. But the moment a real delegated task arrived with its full context payload, the request exceeded the loaded window and failed after that single API call. The system's fallback logic routed the actual work to paid APIs, so tasks still completed, but the local model contributed nothing for over a week while consuming 20GB of RAM.",
          },
          {
            type: "paragraph",
            text: "The fix was straightforward once diagnosed: reload the model explicitly with `--context-length 32768` rather than relying on the API request to override context length (it cannot), and verify the loaded context via the model listing endpoint before declaring startup successful. The startup script now checks `loaded_context_length` directly against the running model and refuses to proceed if it falls short, instead of trusting that a loaded model is a working model.",
          },
          {
            type: "paragraph",
            text: "The broader lesson was procedural, not just technical: a subagent's own \"completed\" status is not evidence that anything happened. The local model still has a real role in this system, but only for short, narrowly-scoped tasks that fit comfortably inside its verified context budget. Everything else goes to Codex CLI or Claude Code, and a task is only marked Done in Linear after its actual output, not its reported status, has been checked.",
          },
        ],
      },
    ],
  },
  {
    slug: "discord-cli",
    shortTitle: "Discord CLI",
    mark: "CLI",
    eyebrow: "Developer tooling case study",
    title: "discord-cli, a Headless Discord Management CLI",
    pageTitle: "Headless Discord Management CLI | Solomon Wakhungu",
    description:
      "How discord-cli runs one Discord management action per connection with predictable JSON output, now shipped as v1.9.0 with 89 commands across 20 groups.",
    summary:
      "A connect-act-disconnect Discord management CLI with predictable JSON output, now shipped as v1.9.0 with 89 commands across 20 groups on PyPI, Homebrew, Docker (GHCR), and GitHub Actions.",
    tags: ["Python", "discord.py", "JSON", "argparse", "Automation"],
    tone: "mint",
    repoUrl: "https://github.com/1solomonwakhungu/discord-cli",
    releaseNote: {
      eyebrow: "Current release: v1.9.0",
      repoUrl: "https://github.com/1solomonwakhungu/discord-cli",
      repoLabel: "discord-cli",
      homebrewUrl: "https://github.com/1solomonwakhungu/homebrew-tap",
    },
    sections: [
      {
        heading: "Problem",
        blocks: [
          {
            type: "paragraph",
            text: "Managing a Discord server through the standard client does not scale for repetitive administration, bulk operations, or any workflow where an AI agent needs to act on a server directly. Creating channels in bulk, auditing roles, moderating members, exporting message history, or reacting to a message from a script all require either clicking through the GUI by hand or standing up and maintaining a long-running bot process for tasks that are fundamentally one-shot.",
          },
          {
            type: "paragraph",
            text: "The goal was a command-line tool that could perform a single Discord management action, return a predictable result, and exit, without keeping a bot online and without requiring anything beyond a terminal and a bot token.",
          },
        ],
      },
      {
        heading: "Approach",
        blocks: [
          {
            type: "paragraph",
            text: "`discord_cli.py` is built on `discord.py` but inverts the usual bot pattern. Instead of a persistent client that stays connected and reacts to events, the CLI connects, waits for the `on_ready` event, performs exactly one requested action, and disconnects. Every invocation is a full connect-act-disconnect cycle. Output is JSON by default, structured as `{\"ok\": true/false, \"data\": ... }` or `{\"ok\": false, \"error\": {...}}`, so results can be piped into `jq`, parsed by a script, or consumed directly by another AI agent via `subprocess` and `json.loads`. A `--human` flag switches to a readable table view for interactive use.",
          },
        ],
      },
      {
        heading: "Architecture",
        blocks: [
          {
            type: "code",
            text: `CLI args (argparse: resource + command)
        |
        v
 build_parser() resolves one of 12 resource groups:
 channel, category, role, member, message, guild,
 permissions, webhook, invite, thread, search, export
        |
        v
 ManagementClient(discord.Client)
        |
        v
 on_ready --> run the single requested action()
        |
        +--> success --> result dict
        +--> discord.HTTPException --> {type, message, status, code}
        +--> PrivilegedIntentsRequired --> retry with fallback intents
        |
        v
 make_payload({ok, data|error}) --> JSON (or --human table) --> exit code (0/1)`,
          },
          {
            type: "paragraph",
            text: "The command surface covers roughly 50 commands across those twelve resource groups, for example `channel create/delete/edit/move/info`, `role assign/remove/edit`, `member kick/ban/timeout`, `message purge/pin/react`, and `export channel` (to JSON or CSV). Each resource is its own argparse subparser wired to a dedicated `action_*` coroutine, so adding a command means adding one function and one subparser entry rather than touching a shared dispatch table.",
          },
          {
            type: "paragraph",
            text: "Two design choices stand out. First, token loading checks the environment variable `DISCORD_BOT_TOKEN` first, then falls back to a local `.env` file next to the script or in the working directory, so the same script runs the same way in a developer's shell or inside an automated pipeline. Second, the client attempts to connect with full `discord.Intents.all()` first, and if Discord rejects the connection for lacking privileged intents, retries automatically with a reduced, non-privileged intent set and tags the result with a warning rather than failing outright. That fallback exists because Discord's privileged intents (message content, server members) require explicit opt-in in the bot's developer portal settings, and a CLI meant to be dropped into different servers cannot assume every bot has them enabled.",
          },
        ],
      },
      {
        heading: "Auditability and Platform Constraints",
        blocks: [
          {
            type: "paragraph",
            text: "Every command produces the same envelope shape, whether it succeeds or fails, which makes output diffable and safe to log wholesale: nothing is printed except the one JSON object describing what happened. Errors carry the actual Discord API status code and error code alongside a message, rather than a generic failure string, which matters when the caller is another automated process deciding whether to retry.",
          },
          {
            type: "paragraph",
            text: "The tradeoffs are the ones inherent to Discord's platform, not the tool's design: privileged intents are gated per-bot by Discord regardless of what the CLI requests, rate limits apply exactly as they would to any bot client, and each invocation pays a fresh gateway handshake cost since there is no persistent connection to amortize it against. For low-frequency administrative commands this is a reasonable trade for not running a bot process at all; for high-frequency automation it would be worth adding a persistent daemon mode.",
          },
        ],
      },
      {
        heading: "Outcome and Lessons",
        blocks: [
          {
            type: "paragraph",
            text: "The script reviewed here is the working, single-file implementation in active local use. Separately, a repository under this name is publicly hosted on GitHub under the MIT license, confirmed via the GitHub API as public with one star as of this writing. That star count is not evidence of adoption and is not claimed as such here; the repository's public status and license are the only claims made about it. The GitHub history also shows the project continuing to evolve past the version reviewed in this case study, including a later refactor into a modular package structure, which is a separate, ongoing effort from the script audited above.",
          },
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}
