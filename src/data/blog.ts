import type { SurfaceTone } from "@/components/tonal/surface-tile";
import type { BlogDiagramId } from "@/components/blog-diagrams";

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; label?: string; code: string }
  | { type: "callout"; title?: string; text: string; tone?: SurfaceTone }
  | { type: "diagram"; diagramId: BlogDiagramId };

export interface BlogSection {
  id: string;
  heading: string;
  blocks: BlogBlock[];
}

export interface BlogMetric {
  label: string;
  value: string;
  detail: string;
}

export interface BlogLink {
  label: string;
  href: string;
}

export interface BlogPost {
  slug: string;
  shortTitle: string;
  title: string;
  pageTitle: string;
  excerpt: string;
  description: string;
  publishedAt: string;
  publishedLabel: string;
  readingTime: string;
  category: string;
  author: string;
  tags: string[];
  tone: SurfaceTone;
  metrics: BlogMetric[];
  links: BlogLink[];
  sections: BlogSection[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "verifying-ai-agent-handoffs-without-an-llm",
    shortTitle: "handoff-verify",
    title: "Your Coding Agent Cited Line 48 Without Ever Opening the File",
    pageTitle:
      "Your Coding Agent Cited Line 48 Without Ever Opening the File | Solomon Wakhungu",
    excerpt:
      "Why I built a deterministic transcript verifier that checks file citations, quoted code, and 'no other callers' claims in under a millisecond without calling another model.",
    description:
      "How handoff-verify parses Claude Code and Codex CLI JSONL transcripts to catch unread file pointers, altered code quotes, and truncated searches deterministically.",
    publishedAt: "2026-11-24",
    publishedLabel: "Nov 24, 2026",
    readingTime: "6 min read",
    category: "Agent Verification",
    author: "Solomon Wakhungu",
    tags: ["AI Agents", "Claude Code", "Codex CLI", "Python"],
    tone: "cool",
    metrics: [
      {
        label: "Seeded eval",
        value: "100%",
        detail: "32 cases (16 clean, 16 failures), no false positives",
      },
      {
        label: "Median latency",
        value: "0.60 ms",
        detail: "Up to ~95 MB/s on 5.76 MB transcripts",
      },
      {
        label: "Real corpus",
        value: "1,571",
        detail: "Claude Code sessions calibrated locally",
      },
    ],
    links: [
      {
        label: "GitHub repository",
        href: "https://github.com/1solomonwakhungu/handoff-verify",
      },
      {
        label: "PyPI package",
        href: "https://pypi.org/project/handoff-verify/",
      },
    ],
    sections: [
      {
        id: "the-handoff-bug",
        heading: "Confident handoffs hide small grounding bugs",
        blocks: [
          {
            type: "paragraph",
            text: "A subagent finishes researching your repository and hands back a clean bulleted report citing line 48 of a file, quoting a function signature, and concluding there are no other callers anywhere in the codebase. Then you open the file and realize the agent never read it, or its search stopped after five matches inside one subfolder.",
          },
          {
            type: "paragraph",
            text: "Those mistakes slip past a quick skim because the prose looks methodical. When a subagent passes an ungrounded summary back to a parent agent, the parent treats it as fact and starts editing code on top of a false premise.",
          },
          {
            type: "paragraph",
            text: "I built handoff-verify to check every handoff claim against what the agent actually observed, using only Python's standard library and no extra model calls.",
          },
        ],
      },
      {
        id: "why-not-an-llm-judge",
        heading: "Why I did not use an LLM judge",
        blocks: [
          {
            type: "paragraph",
            text: "My first instinct was to run a fast model as a reviewer on every subagent summary. I dropped that idea quickly because it burns extra tokens on every turn, adds seconds of wait time to stop hooks (callbacks that run when an agent finishes a turn), and still guesses when checking whether line 48 fell inside a partial read window.",
          },
          {
            type: "paragraph",
            text: "All the ground truth is already sitting on disk. Claude Code and Codex CLI write every tool call and tool result into a local JSONL transcript, a plain text file with one JSON record per line, as the session runs.",
          },
          {
            type: "paragraph",
            text: "Checking whether a final summary matches a local log is a parsing and lookup problem, not a reasoning problem. Plain code solves it in under a millisecond and gives the exact same answer every time.",
          },
        ],
      },
      {
        id: "how-verification-works",
        heading: "Three deterministic checks against the transcript",
        blocks: [
          {
            type: "paragraph",
            text: "handoff-verify detects Claude Code session logs, Codex CLI rollout logs, and a documented generic JSONL format automatically. It scans the tool history once to build an evidence index, extracts claims from the final assistant message, and runs three checks.",
          },
          {
            type: "diagram",
            diagramId: "handoff-verify",
          },
          {
            type: "ul",
            items: [
              "**File and line pointers:** Checks whether each cited file was read, whether the cited line numbers fell inside the read window, and whether a later edit shifted those lines without a re-read. When you pass the repository path, it also checks whether the file exists on disk and whether the line number is still in bounds.",
              "**Verbatim code quotes:** Checks inline and fenced code snippets against every file read, file edit, search hit, and shell output the agent saw. It normalizes minor whitespace and operator formatting so harmless formatting differences do not trip false alarms, and flags snippets attributed to the wrong file.",
              "**Absence and completeness claims:** Whenever the summary says there are no other callers, no remaining references, or that all pages were reviewed, the verifier builds a scope receipt from actual searches and paginated tool calls. It catches missing searches, result-limit truncations, subdirectory-only searches passed off as repo-wide, and unread pagination cursors.",
            ],
          },
          {
            type: "paragraph",
            text: "Each failure returns one of twelve finding codes, the exact evidence from the transcript, and a concrete next step telling the agent which lines to read or which search to re-run.",
          },
        ],
      },
      {
        id: "real-session-calibration",
        heading: "What broke when I tested 1,571 real sessions",
        blocks: [
          {
            type: "paragraph",
            text: "On the bundled 32-case seeded regression suite (16 clean sessions and 16 planted failures across Claude Code, Codex CLI, and generic logs), handoff-verify hits 100% precision and 100% recall with a 0.60 ms median runtime. On synthetic scaling tests, it processes a 1.14 MB transcript in 12.7 ms and a 5.76 MB transcript in 60.8 ms, roughly 95 MB/s.",
          },
          {
            type: "paragraph",
            text: "Real developer sessions are much messier than hand-built fixtures, so I ran the verifier over 1,571 actual Claude Code transcripts from my own machine (972 main sessions and 599 subagents). The first pass flagged 512 of them (32.6%), and a lot of those flags were false alarms.",
          },
          {
            type: "paragraph",
            text: "Digging through those false alarms taught me more than writing the initial parser. Agents frequently inspect files through shell commands, redirect command output to a temporary log file and read it back, rely on grep context lines next to a match, or relay a subagent's citations under a shorter path spelling.",
          },
          {
            type: "paragraph",
            text: "They also write normal English sentences that look like absence claims to a naive pattern match, such as saying a file does not exist, or reporting no open pull requests, no warnings, or no changes.",
          },
          {
            type: "paragraph",
            text: "Fixing shell-read tracking and scratch-copy handling cut the flag rate from 32.6% down to 21.8% (343 of 1,571). Follow-up fixes addressed the five remaining false-alarm classes I saw in that set (redirected log readbacks, grep context lines, parent-subagent path relays, negated mentions, and non-code absence phrases), though I have not re-measured the full 1,571-session corpus since those later patches.",
          },
        ],
      },
      {
        id: "hook-details-and-limits",
        heading: "Claude Code hook edge cases and known limits",
        blocks: [
          {
            type: "paragraph",
            text: "Wiring a verifier into Claude Code's Stop and SubagentStop hooks surfaced three practical details that matter in daily use.",
          },
          {
            type: "paragraph",
            text: "First, SubagentStop reads only the subagent's own transcript path and never falls back to the parent session transcript, so a subagent is never blamed for something the parent wrote.",
          },
          {
            type: "paragraph",
            text: "Second, Claude Code sometimes fires the stop hook before the final assistant message finishes flushing to disk. The hook compares the file against the last assistant message in the hook payload, waits up to one second for disk to catch up, and otherwise checks the payload text directly against the tool evidence already logged.",
          },
          {
            type: "paragraph",
            text: "Third, the hook respects Claude Code's active-stop-hook flag so it can never trap an agent in an infinite retry loop. Clean passes print nothing at all.",
          },
          {
            type: "callout",
            title: "What it does not cover",
            tone: "warm",
            text: "handoff-verify checks whether claims are backed by the transcript, not whether the code is right or tests pass. If an agent inspects a file through a custom inline Python script that slices lines dynamically, the verifier cannot always map that back to exact line numbers. Treat a finding as 'the transcript does not show this' and start in advise mode before turning on block mode.",
          },
        ],
      },
      {
        id: "try-it",
        heading: "Check your last session in ten seconds",
        blocks: [
          {
            type: "paragraph",
            text: "You can audit the most recent Claude Code transcript in your current repository without installing anything globally:",
          },
          {
            type: "code",
            label: "Audit your latest session",
            code: "uvx handoff-verify check --latest",
          },
          {
            type: "paragraph",
            text: "If you want automatic checks on every Stop and SubagentStop event in advise mode, install the tool and merge the hook config into your project settings:",
          },
          {
            type: "code",
            label: "Install and wire Claude Code hooks",
            code: "uv tool install handoff-verify\nhandoff-verify init --write\nhandoff-verify doctor",
          },
          {
            type: "paragraph",
            text: "Full documentation, Codex CLI rollout instructions, and the Claude Code plugin setup are in the GitHub repository.",
          },
        ],
      },
    ],
  },
  {
    slug: "preserving-rules-and-test-history-across-compaction",
    shortTitle: "compact-ledger",
    title:
      "Context Compaction Keeps Erasing Your Rules Right When Precision Matters",
    pageTitle:
      "Context Compaction Keeps Erasing Your Rules Right When Precision Matters | Solomon Wakhungu",
    excerpt:
      "How compact-ledger captures verbatim user constraints, mid-session overrides, and failing test trajectories before compaction and re-injects them in about 50 milliseconds.",
    description:
      "A deterministic PreCompact and SessionStart memory injector for Claude Code and Codex CLI that keeps hard rules, corrections, and test failure histories intact across compaction.",
    publishedAt: "2026-11-24",
    publishedLabel: "Nov 24, 2026",
    readingTime: "6 min read",
    category: "Agent Memory",
    author: "Solomon Wakhungu",
    tags: ["AI Agents", "Claude Code", "Codex CLI", "Python"],
    tone: "warm",
    metrics: [
      {
        label: "162 KB transcript",
        value: "11.7 ms",
        detail: "In-process parse across 80 edit/test loops",
      },
      {
        label: "Injected size",
        value: "~274 tok",
        detail: "1,098 chars rendered from 162 KB log",
      },
      {
        label: "Verification",
        value: "346 tests",
        detail: "Plus 24/24 seeded eval cases in ~50 ms",
      },
    ],
    links: [
      {
        label: "GitHub repository",
        href: "https://github.com/1solomonwakhungu/compact-ledger",
      },
      {
        label: "PyPI package",
        href: "https://pypi.org/project/compact-ledger/",
      },
    ],
    sections: [
      {
        id: "the-compaction-amnesia",
        heading: "What disappears the moment your session compacts",
        blocks: [
          {
            type: "paragraph",
            text: "Forty minutes into a billing refactor, Claude Code compacts your conversation, and on the very next turn the agent starts editing database migrations you told it never to touch. A minute later it reintroduces a June 30 cutoff you already changed to July 31, then tries a broken fix whose exact test failure you already saw twenty minutes ago.",
          },
          {
            type: "paragraph",
            text: "Lossy compaction summaries are fine for broad narrative context, but they quietly drop negative rules, blend mid-session corrections with the old brief, and erase exact assertion values from failing tests.",
          },
          {
            type: "paragraph",
            text: "I built compact-ledger to preserve those exact details verbatim across compaction without calling another language model.",
          },
        ],
      },
      {
        id: "why-deterministic-memory",
        heading: "Why summarizing with another LLM misses the point",
        blocks: [
          {
            type: "paragraph",
            text: "Compaction already uses an LLM to compress conversation history. Adding a second model call to write a 'better' summary still paraphrases your instructions, costs tokens, and adds seconds of wait time right when you want to keep moving.",
          },
          {
            type: "paragraph",
            text: "What survives compaction should not be a softer paraphrase. It should be your exact words for rules and overrides, plus a structured list of observed test values and edit loops pulled straight from the session log.",
          },
          {
            type: "paragraph",
            text: "That is why compact-ledger runs locally with no third-party dependencies and no LLM calls. On an Apple Silicon Mac, parsing a 162 KB transcript with 80 failing edit and test cycles takes 11.7 ms in-process, and the cold CLI hooks complete in 51 to 55 ms including Python startup.",
          },
        ],
      },
      {
        id: "four-priority-tiers",
        heading: "Four priority tiers inside a strict character cap",
        blocks: [
          {
            type: "paragraph",
            text: "In Claude Code, compact-ledger attaches to two lifecycle hooks (callbacks the harness triggers around compaction). Right before compaction runs, the PreCompact hook reads the session JSONL transcript (a line-by-line JSON log of every turn and tool call) and saves a clean snapshot in a local gitignored project folder. When the compacted session resumes, the SessionStart hook loads that snapshot and injects a compact Markdown block capped at 6,000 characters by default.",
          },
          {
            type: "diagram",
            diagramId: "compact-ledger",
          },
          {
            type: "ol",
            items: [
              "**Manual pins and active overrides:** Rules pinned explicitly by you or the agent, plus mid-session corrections printed right next to the stale instruction they retired. Seeing both the live rule and what it superseded stops the compaction summary from reviving the old date or package manager.",
              "**Active verbatim user constraints:** Positive and negative directives split one pin per rule, even if four rules arrived in one opening brief. Casual chatter and harness-generated messages like hook feedback or system reminders are filtered out.",
              "**Test failure trajectories and edit-thrash warnings:** Parses pytest, vitest, jest, go test, and generic command failures, listing observed values oldest first and classifying each test as oscillating, stalled, progressing, single failure, or resolved. If an edit reverts an earlier change while tests keep failing, it emits an explicit thrash warning.",
              "**Modified files summary:** A deduplicated list of touched files, normalized relative to the project root.",
            ],
          },
          {
            type: "paragraph",
            text: "The priority ordering matters when you tighten the character cap. Under a 400-character or 1,200-character limit, manual pins and overrides always win over auto-extracted rules, test histories, and file lists, and the output never exceeds the cap.",
          },
        ],
      },
      {
        id: "tricky-override-and-thrash-details",
        heading: "Handling rule overrides and oscillating tests",
        blocks: [
          {
            type: "paragraph",
            text: "One subtle case tripped me up early: what happens when you set a broad negative rule and later change your mind? If turn one says 'Never use spaces' and turn twelve says 'Actually use two spaces instead of tabs', the override needs to retire that broad ban. At the same time, a scoped ban like 'Never use spaces in filenames' has to stay active.",
          },
          {
            type: "paragraph",
            text: "Splitting long briefs into single-rule pins solved a related headache. Retiring the June 30 billing cutoff from a four-rule opening prompt now retires only that one sentence, leaving the migration freeze and Decimal money rule intact.",
          },
          {
            type: "paragraph",
            text: "On the testing side, showing observed values in order makes dead ends obvious at a glance. Seeing a test move from 400 to 200 and back to 400 alongside a revert warning on the same file tells the post-compaction agent immediately not to try that same edit again. Across that 162 KB benchmark transcript with 80 failing cycles, the entire rendered ledger compresses down to 1,098 characters, roughly 274 tokens.",
          },
        ],
      },
      {
        id: "safety-and-limits",
        heading: "Fail-open hooks and where this stops",
        blocks: [
          {
            type: "paragraph",
            text: "A memory hook should never break your coding session. Both hook commands fail open by default, exiting cleanly with empty output if stdin is malformed or a file disappears, and snapshots reject symlinks and quarantine corrupt JSON to timestamped backups rather than crashing.",
          },
          {
            type: "callout",
            title: "Trade-offs and limits",
            tone: "cool",
            text: "Automatic compaction hooks are currently Claude Code native because Codex CLI does not expose a compaction hook yet. Codex rollouts (including code-mode exec and apply-patch events) still parse end-to-end through explicit snapshot and inject CLI commands. Also, automatic rule detection from free-form prose is heuristic, so use manual pins for any constraint you cannot afford to lose. Finally, compact-ledger is session-scoped compaction memory, not cross-session project memory.",
          },
        ],
      },
      {
        id: "getting-started",
        heading: "Run the eval suite or wire it into your project",
        blocks: [
          {
            type: "paragraph",
            text: "You can run the bundled 24-case deterministic evaluation suite anywhere without installing the package:",
          },
          {
            type: "code",
            label: "Run the 24-case eval suite",
            code: "uvx compact-ledger eval",
          },
          {
            type: "paragraph",
            text: "To install the CLI, wire PreCompact and SessionStart hooks into Claude Code, and pin a hard rule in your current session:",
          },
          {
            type: "code",
            label: "Install hooks and pin a rule",
            code: "uv tool install compact-ledger\ncompact-ledger init --write\ncompact-ledger doctor\ncompact-ledger pin \"Never push to main\" --negative --tag git",
          },
          {
            type: "paragraph",
            text: "The repository also ships as a no-setup Claude Code plugin and an installable agent skill so your agent remembers to pin rules as soon as you state them.",
          },
        ],
      },
    ],
  },
  {
    slug: "stopping-ai-agents-from-double-posting-with-sqlite",
    shortTitle: "sidefx",
    title: "Stopping AI Agents from Double-Posting When Tools Time Out",
    pageTitle:
      "Stopping AI Agents from Double-Posting When Tools Time Out | Solomon Wakhungu",
    excerpt:
      "Putting a local SQLite write-ahead journal, deterministic preflight rules, and read-only crash reconciliation in front of mutating MCP and CLI calls.",
    description:
      "How sidefx stops AI coding agents from creating duplicate GitHub issues, pushes, and MCP writes after timeouts while generating ground-truth session receipts from SQLite.",
    publishedAt: "2026-11-24",
    publishedLabel: "Nov 24, 2026",
    readingTime: "7 min read",
    category: "Agent Reliability",
    author: "Solomon Wakhungu",
    tags: ["AI Agents", "MCP", "SQLite", "Python"],
    tone: "mint",
    metrics: [
      {
        label: "Chaos suite",
        value: "6/6 pass",
        detail: "0 duplicate writes, 100% receipt accuracy",
      },
      {
        label: "Read passthrough",
        value: "+0.02 ms",
        detail: "No SQLite writes on read-only MCP calls",
      },
      {
        label: "Write-ahead cost",
        value: "~8.0 ms",
        detail: "Two full-fsync SQLite WAL commits on macOS",
      },
    ],
    links: [
      {
        label: "GitHub repository",
        href: "https://github.com/1solomonwakhungu/sidefx",
      },
      {
        label: "PyPI package",
        href: "https://pypi.org/project/sidefx/",
      },
    ],
    sections: [
      {
        id: "the-timeout-double-write",
        heading: "Timeouts turn helpful agents into duplicate-write machines",
        blocks: [
          {
            type: "paragraph",
            text: "Your coding agent creates a GitHub issue or fires a webhook, the call times out right after the server accepts it, and the agent immediately retries. Now you have two identical issues, a duplicate comment, or a double webhook delivery.",
          },
          {
            type: "paragraph",
            text: "Then, at the end of a long session, the agent summarizes its external changes from compressed chat memory and either misses a git push or claims a timed-out write landed.",
          },
          {
            type: "paragraph",
            text: "I built sidefx to put a durable local SQLite write-ahead journal in front of mutating MCP (Model Context Protocol, the standard way agents talk to external tool servers) and shell calls, so retries reconcile instead of double-posting and session receipts come straight from database rows.",
          },
        ],
      },
      {
        id: "why-local-sqlite",
        heading: "Why a local SQLite WAL instead of prompt rules or a hosted proxy",
        blocks: [
          {
            type: "paragraph",
            text: "Telling an agent in a system prompt not to retry blindly does not work when a timeout leaves the agent with no way to know whether the write landed. Standing up a separate proxy server or external database for local CLI workflows is overkill nobody will actually maintain.",
          },
          {
            type: "paragraph",
            text: "SQLite with a WAL (write-ahead log, SQLite's crash-safe commit log) and full synchronous disk flushes is already built into Python's standard library. It handles concurrent local worker processes cleanly, survives crashes, needs no third-party dependencies, and lives inside an owner-only local directory that automatically gitignores itself.",
          },
          {
            type: "paragraph",
            text: "I also made a deliberate privacy trade-off early: the journal stores SHA-256 hashes of tool arguments and command arrays rather than raw payloads, and redacts URL credentials, webhook path tokens, auth headers, and API keys before saving targets or error snippets.",
          },
        ],
      },
      {
        id: "proxy-wrapper-and-reconciliation",
        heading: "How the MCP proxy, CLI wrapper, and crash reconcilers fit together",
        blocks: [
          {
            type: "paragraph",
            text: "sidefx sits in front of external writes in two places: a drop-in stdio MCP proxy for Claude Code, Cursor, or Codex, and a CLI wrapper for shell commands like git push, GitHub CLI writes, and curl webhooks.",
          },
          {
            type: "diagram",
            diagramId: "sidefx",
          },
          {
            type: "paragraph",
            text: "In the MCP proxy, read-only tools and protocol handshakes pass straight through with roughly 0.02 ms of median overhead. Mutating tool calls first hit deterministic preflight rules in your project config, where you can enforce required arguments, numeric caps like maximum refund amounts, protected-branch denylists, and allowed email domains. A violation fails closed before anything reaches the upstream server.",
          },
          {
            type: "paragraph",
            text: "Calls that pass preflight take two durable WAL commits: first writing the action as pending (keyed by actor, target, and action ID) before calling upstream, and second marking it confirmed once the reply arrives. On macOS with full fsync (flushing data all the way to disk) enabled, those two commits add about 8.0 ms of median overhead.",
          },
          {
            type: "paragraph",
            text: "Once confirmed, identical MCP retries in the same session replay directly from disk in 0.044 ms without touching upstream when deterministic IDs are enabled or when an explicit action ID is supplied. Reusing the same action ID with modified arguments is rejected immediately as a payload mismatch.",
          },
          {
            type: "paragraph",
            text: "When a call times out or crashes mid-flight, sidefx marks the row unknown and blocks blind retries with an explicit outcome-unknown error containing exact recovery commands. For git push, the built-in reconciler checks the remote read-only with git ls-remote. For GitHub issues, pull requests, and comments, sidefx injects a tiny hidden HTML comment marker into outgoing bodies and checks both open and closed items through the GitHub REST API to recover the exact URL instead of creating a duplicate.",
          },
        ],
      },
      {
        id: "redaction-bug-story",
        heading: "The stderr redaction bug that could have stranded pending writes",
        blocks: [
          {
            type: "paragraph",
            text: "Hardening the CLI wrapper before launch turned up a failure mode I almost missed. When a wrapped command fails, sidefx scrubs secrets out of stderr before storing a short error line in SQLite.",
          },
          {
            type: "paragraph",
            text: "If a failing child command echoed a malformed URL, like an invalid port number or broken IPv6 brackets, Python's built-in URL parser raised a ValueError right inside the redaction step. Because that happened right before finalizing the journal row, an uncaught redaction error could crash the wrapper and leave the action stranded in pending.",
          },
          {
            type: "paragraph",
            text: "The fix was twofold: isolate URL redaction behind a safe fallback so malformed strings can never raise, and tighten the URL scanner with a negative lookbehind so long noisy error lines always scan in linear time instead of backtracking. A logging helper should never be able to wedge the durability layer it serves.",
          },
        ],
      },
      {
        id: "receipts-and-chaos-testing",
        heading: "Ground-truth receipts and a real chaos suite",
        blocks: [
          {
            type: "paragraph",
            text: "Because every write lives in SQLite, session summaries no longer rely on chat memory. Running the report command opens the journal in strict read-only mode and prints confirmed, reconciled, failed, and unresolved actions in Markdown, plain text, or JSON. A bundled Claude Code Stop hook stays completely silent when no external writes occurred and warns loudly if anything is still pending or unknown.",
          },
          {
            type: "paragraph",
            text: "To test crash behavior for real instead of mocking every function call, sidefx ships with a self-contained chaos test suite. It spins up a local mock GitHub HTTP server, a real bare git repository with fault-injecting receive hooks, a subprocess stdio MCP server with an fsync-backed ledger, and four concurrent OS worker processes racing on the same action ID.",
          },
          {
            type: "paragraph",
            text: "Across all six chaos scenarios (pre-commit crashes, post-commit response loss, concurrent duplicate dispatch, payload mutation on reused IDs, preflight policy denials, and mixed session receipts), it passes 6 of 6 with 0 duplicate remote writes and 100% receipt accuracy (17 of 17 checks) in about 13 seconds.",
          },
        ],
      },
      {
        id: "tradeoffs-and-limits",
        heading: "Manual resolution and wedged MCP servers",
        blocks: [
          {
            type: "paragraph",
            text: "Not every external API has a built-in reconciler yet. Right now automatic read-only reconciliation covers git push and GitHub issues, pull requests, and comments. When an arbitrary MCP server or custom webhook times out, sidefx refuses to guess and leaves the action unknown. You or the agent inspect the remote system read-only and record the verdict with the resolve command (either landed with a reference URL, or not landed to re-open the retry).",
          },
          {
            type: "callout",
            title: "Wedged single-threaded servers",
            tone: "sand",
            text: "Some local stdio MCP servers are single-threaded and hang permanently after a timeout. sidefx provides an opt-in restart-on-timeout flag that probes the server on the next request, terminates the process group if unresponsive, and replays the MCP initialize handshake transparently. It stays off by default so slow-but-healthy serial servers can finish in-flight work and reconcile cleanly.",
          },
        ],
      },
      {
        id: "try-sidefx",
        heading: "Run the chaos suite or wrap your next push",
        blocks: [
          {
            type: "paragraph",
            text: "You can watch the six fault-injection scenarios run locally without installing anything:",
          },
          {
            type: "code",
            label: "Run the built-in chaos suite",
            code: "uvx sidefx eval --verbose",
          },
          {
            type: "paragraph",
            text: "To start journaling shell writes and configuring preflight guardrails in a repository:",
          },
          {
            type: "code",
            label: "Initialize and wrap a mutating command",
            code: "uv tool install sidefx\nsidefx init\nsidefx wrap -- git push origin HEAD\nsidefx report",
          },
          {
            type: "paragraph",
            text: "Drop-in MCP proxy snippets for Claude Code, Cursor, and Codex, plus the Claude Code plugin and agent skill, live in the GitHub repository.",
          },
        ],
      },
    ],
  },
  {
    slug: "why-i-built-a-headless-discord-cli-with-policy-guardrails",
    shortTitle: "discord-cli",
    title:
      "Giving AI Agents Safe Access to Discord Without MCP Schema Bloat",
    pageTitle:
      "Giving AI Agents Safe Access to Discord Without MCP Schema Bloat | Solomon Wakhungu",
    excerpt:
      "Why I built a REST-first Discord CLI with 89 commands, operator policy ceilings, offline dry-run confirmation tokens, and random-nonce prompt-injection boundaries.",
    description:
      "Design trade-offs behind discord-cli (discordcli-agents): REST-first headless execution, deterministic safety tiers, prompt-injection envelopes, PII redaction, and runtime JSON schemas.",
    publishedAt: "2026-11-24",
    publishedLabel: "Nov 24, 2026",
    readingTime: "6 min read",
    category: "CLI & Guardrails",
    author: "Solomon Wakhungu",
    tags: ["CLI", "Discord", "AI Agents", "Python"],
    tone: "sky",
    metrics: [
      {
        label: "Surface area",
        value: "89 cmds",
        detail: "Organized across 20 command groups",
      },
      {
        label: "Policy tiers",
        value: "3 levels",
        detail: "Read-only, allow-write, allow-destructive",
      },
      {
        label: "Transport",
        value: "REST-first",
        detail: "No persistent bot daemon or WebSocket",
      },
    ],
    links: [
      {
        label: "GitHub repository",
        href: "https://github.com/1solomonwakhungu/discord-cli",
      },
      {
        label: "PyPI (discordcli-agents)",
        href: "https://pypi.org/project/discordcli-agents/",
      },
      {
        label: "Homebrew tap",
        href: "https://github.com/1solomonwakhungu/homebrew-tap",
      },
    ],
    sections: [
      {
        id: "the-discord-agent-problem",
        heading: "One public message should not be able to delete a channel",
        blocks: [
          {
            type: "paragraph",
            text: "One message posted in a public Discord channel can tell your AI agent to delete a channel or kick a member, and an unrestricted bot token will let it. On top of that, exposing all 89 Discord operations as eager MCP (Model Context Protocol) tools dumps a huge block of JSON schemas into your prompt before the agent even knows whether it needs Discord.",
          },
          {
            type: "paragraph",
            text: "I measured the full command manifest in this repository: 20.5 KB minified (roughly 5,100 tokens) and 42.7 KB pretty-printed. Even with lazy MCP tool loading, I still wanted shell composability with jq, offline schema discovery, standard Unix exit codes, and policy enforcement that lives outside the model's prompt.",
          },
          {
            type: "paragraph",
            text: "I built discord-cli (distributed on PyPI as discordcli-agents) as a headless, JSON-first CLI with deterministic safety policies enforced inside the tool before any network request opens.",
          },
        ],
      },
      {
        id: "why-cli-and-rest-first",
        heading: "Why a REST-first CLI beats a persistent bot daemon",
        blocks: [
          {
            type: "paragraph",
            text: "Most Discord libraries assume you are running a long-lived bot process connected over a WebSocket gateway. That model makes sense for interactive slash-command bots, not for a cron job, a GitHub Action, or an agent running one command.",
          },
          {
            type: "paragraph",
            text: "discord-cli defaults to REST-first execution. It authenticates with your bot token, runs one command against Discord's REST API, prints a consistent JSON envelope, and exits. Webhook sends skip bot authentication altogether, and WebSocket gateway mode stays opt-in for the rare workflows that need it.",
          },
          {
            type: "paragraph",
            text: "Instead of loading 89 tool schemas into every agent turn, the CLI pairs with a compact agent skill and runtime self-description commands. An agent can list commands with their risk levels and pull the exact JSON Schema for one subcommand only when it needs it.",
          },
        ],
      },
      {
        id: "policy-ceilings-and-dry-run",
        heading: "Flags can tighten your limits, never loosen them",
        blocks: [
          {
            type: "paragraph",
            text: "Every one of the 89 commands across 20 groups carries explicit risk metadata: read, write, or destructive. Dynamic commands like raw API requests or inactive-member pruning compute their risk from the actual HTTP method or flags, and unknown commands fail closed as write.",
          },
          {
            type: "diagram",
            diagramId: "discord-cli",
          },
          {
            type: "paragraph",
            text: "Operators lock down an agent using environment variables for policy ceiling (read-only, allow-write, or allow-destructive), allowed guild IDs, allowed channel IDs, allowed command groups, and maximum bulk deletions. Those limits follow a monotonic ceiling rule: command-line flags can only tighten an operator's environment setting, never loosen it.",
          },
          {
            type: "paragraph",
            text: "If an operator sets a read-only ceiling in the environment and a prompt-injected agent passes allow-destructive on the command line, the stricter environment ceiling silently wins. Read commands still work, while any write or delete command is rejected with semantic exit code 6 before any network connection opens.",
          },
          {
            type: "paragraph",
            text: "For mutations, universal dry-run mode intercepts any write or destructive command offline and returns the execution plan plus a deterministic confirmation token bound to the command, guild ID, and canonicalized arguments (signed with HMAC, a keyed cryptographic signature, when an operator secret is set). In token-only confirmation mode, the simple yes flag is disabled so destructive actions require an operator-reviewed dry-run token.",
          },
        ],
      },
      {
        id: "prompt-injection-and-selectors",
        heading: "Defending against prompt injection and opaque snowflake IDs",
        blocks: [
          {
            type: "paragraph",
            text: "Reading messages, usernames, channel topics, or audit logs from a Discord server means pulling attacker-controlled text straight into your model's context window. To draw a clear boundary between instructions and external data, the untrusted-envelope flag wraps every external string field in a fresh random 64-bit nonce (a one-time random string) XML tag.",
          },
          {
            type: "paragraph",
            text: "For example, a retrieved message arrives wrapped inside matching untrusted_dcli_4337fdc0... tags generated fresh for that single invocation, and any spoofed closing tags inside the user's message are escaped automatically so an attacker posting in Discord cannot guess the tag or break out of the boundary.",
          },
          {
            type: "paragraph",
            text: "Turning on PII redaction scrubs leaked credentials (such as bot tokens, API keys, and webhook URLs) and email addresses before the JSON reaches the model. Optional JSONL audit logging records every invocation with timing, risk, and exit code without writing bot tokens to disk.",
          },
          {
            type: "paragraph",
            text: "On the usability side, memorizing 18-digit Discord snowflake IDs is miserable for humans and error-prone for agents. discord-cli accepts human selectors like #announcements, category-qualified paths, role names, member handles, and full Discord message URLs. If a selector matches more than one channel or role, resolution fails closed with a structured candidate list instead of silently picking the first hit.",
          },
        ],
      },
      {
        id: "packaging-and-limits",
        heading: "Distribution for real CI workflows, and key trade-offs",
        blocks: [
          {
            type: "paragraph",
            text: "A CLI that only runs from a local checkout never makes it into production automation. I package discord-cli on PyPI (as discordcli-agents) and Homebrew for local developer machines, plus a Distroless container image and composite GitHub Action so CI workflows can run it without managing a Python environment.",
          },
          {
            type: "callout",
            title: "Trade-offs to keep in mind",
            tone: "cool",
            text: "REST-first execution avoids maintaining a WebSocket cache, which means commands that list or resolve large servers make live HTTP calls and remain subject to Discord's API rate limits and privileged intent toggles for member lists and message content. Also, because third-party entry-point plugins run in the same Python process, locked-down agent setups should disable plugins alongside setting policy ceilings.",
          },
        ],
      },
      {
        id: "try-discord-cli",
        heading: "Install it and preview a guarded workflow",
        blocks: [
          {
            type: "paragraph",
            text: "Install the CLI with uv (the PyPI package is discordcli-agents and the installed command is discord-cli):",
          },
          {
            type: "code",
            label: "Install with uv",
            code: "uv tool install discordcli-agents",
          },
          {
            type: "paragraph",
            text: "Or install through Homebrew on macOS and Linux:",
          },
          {
            type: "code",
            label: "Install with Homebrew",
            code: "brew install 1solomonwakhungu/tap/discordcli-agents",
          },
          {
            type: "paragraph",
            text: "Offline command discovery and dry-run previews work without any Discord credentials, while live read commands like channel list need your bot token and target server ID:",
          },
          {
            type: "code",
            label: "Discover offline, preview a write, and run a guarded read",
            code: "discord-cli describe list --compact\ndiscord-cli --dry-run message send \"#releases\" --content \"Deploy finished\"\n\nexport DISCORD_BOT_TOKEN=\"your-bot-token\"\nexport DISCORD_GUILD_ID=\"your-server-id\"\nDISCORD_CLI_POLICY=read-only discord-cli --untrusted-envelope --redact-pii channel list",
          },
          {
            type: "paragraph",
            text: "You can grab the bundled agent skill, CI recipes, and full policy reference from the GitHub repository.",
          },
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
