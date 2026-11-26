import * as React from "react";
import { ArrowDown, ArrowRight } from "lucide-react";

export type BlogDiagramId =
  | "handoff-verify"
  | "compact-ledger"
  | "sidefx"
  | "discord-cli";

function DiagramShell({
  eyebrow,
  title,
  caption,
  children,
}: {
  eyebrow: string;
  title: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-7 rounded-[24px] border border-[var(--t-border-subtle)] bg-[var(--t-surface)] p-5 sm:p-7">
      <div className="mb-5 flex flex-col gap-1">
        <span className="text-[11.5px] font-medium uppercase tracking-wider text-[var(--t-ink-muted)]">
          {eyebrow}
        </span>
        <div className="text-[16px] font-medium tracking-[-0.015em] text-[var(--t-ink)]">
          {title}
        </div>
      </div>
      {children}
      <figcaption className="mt-5 border-t border-[var(--t-border-subtle)] pt-3.5 text-[13px] leading-[1.55] text-[var(--t-ink-muted)]">
        {caption}
      </figcaption>
    </figure>
  );
}

function FlowArrow({ vertical = false }: { vertical?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center text-[var(--t-ink-muted)]"
    >
      {vertical ? (
        <ArrowDown className="h-4 w-4" />
      ) : (
        <>
          <ArrowDown className="h-4 w-4 md:hidden" />
          <ArrowRight className="hidden h-4 w-4 md:block" />
        </>
      )}
    </div>
  );
}

function NodeCard({
  label,
  title,
  detail,
  tone = "elevated",
}: {
  label: string;
  title: string;
  detail: string;
  tone?: "elevated" | "cool" | "mint" | "warm" | "sand";
}) {
  const bgMap = {
    elevated: "bg-[var(--t-elevated)] border-[var(--t-border-subtle)]",
    cool: "bg-[var(--t-surface-cool)] border-[var(--t-border-subtle)]",
    mint: "bg-[var(--t-surface-mint)] border-[var(--t-border-subtle)]",
    warm: "bg-[var(--t-surface-warm)] border-[var(--t-border-subtle)]",
    sand: "bg-[var(--t-surface-sand)] border-[var(--t-border-subtle)]",
  };

  return (
    <div className={`rounded-[16px] border p-4 ${bgMap[tone]}`}>
      <div className="text-[11px] font-medium uppercase tracking-wider text-[var(--t-ink-muted)]">
        {label}
      </div>
      <div className="mt-1 text-[14.5px] font-medium text-[var(--t-ink)]">
        {title}
      </div>
      <div className="mt-1 text-[12.5px] leading-[1.5] text-[var(--t-ink-secondary)]">
        {detail}
      </div>
    </div>
  );
}

function HandoffVerifyDiagram() {
  return (
    <DiagramShell
      eyebrow="Verification pipeline"
      title="How handoff-verify checks claims against local transcripts"
      caption="Every claim in the final assistant message is cross-checked locally against tool outputs already logged on disk. Clean passes stay silent; ungrounded claims return an exact read or search suggestion."
    >
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
          <NodeCard
            label="1. Input"
            title="Session JSONL Transcript"
            detail="Claude Code main or subagent logs, Codex CLI rollouts, or generic JSONL records."
            tone="warm"
          />
          <FlowArrow />
          <NodeCard
            label="2. Index"
            title="Evidence & Claim Extractor"
            detail="Indexes file read windows, post-edit shifts, search roots, truncations, and unread pagination cursors."
            tone="elevated"
          />
        </div>

        <FlowArrow vertical />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <NodeCard
            label="Verifier A"
            title="File Pointers"
            detail="Checks read coverage, line windows, stale edits, and optional live repo bounds."
            tone="cool"
          />
          <NodeCard
            label="Verifier B"
            title="Verbatim Quotes"
            detail="Matches inline and fenced snippets against observed reads, edits, and command output."
            tone="cool"
          />
          <NodeCard
            label="Verifier C"
            title="Scope Receipts"
            detail="Verifies absence and completeness claims against search roots, limits, and cursors."
            tone="cool"
          />
        </div>

        <FlowArrow vertical />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <NodeCard
            label="Pass (exit 0)"
            title="Silent Handoff"
            detail="Zero noise when every cited line, quote, and scope claim is grounded."
            tone="mint"
          />
          <NodeCard
            label="Findings (advise or block)"
            title="Actionable Repair Prompt"
            detail="Reports the finding code, exact evidence, and the missing read or full-repo search to run."
            tone="sand"
          />
        </div>
      </div>
    </DiagramShell>
  );
}

function CompactLedgerDiagram() {
  return (
    <DiagramShell
      eyebrow="Compaction lifecycle"
      title="How compact-ledger carries rules and test trajectories across compaction"
      caption="Snapshots are written atomically under a local gitignored project directory before compaction, then re-injected in strict priority order on resume without touching an LLM."
    >
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <NodeCard
            label="1. PreCompact Hook"
            title="Read JSONL Transcript"
            detail="Linear scan of turns, user overrides, runner outputs, and file edits."
            tone="warm"
          />
          <FlowArrow />
          <NodeCard
            label="2. Atomic Store"
            title="Local Session Snapshot"
            detail="File-locked JSON snapshot saved per session alongside manual pins."
            tone="elevated"
          />
          <FlowArrow />
          <NodeCard
            label="3. SessionStart Hook"
            title="Bounded Markdown Block"
            detail="Injected on compact or resume strictly inside the character budget."
            tone="mint"
          />
        </div>

        <div className="mt-1 rounded-[18px] border border-[var(--t-border-subtle)] bg-[var(--t-elevated)] p-4">
          <div className="mb-3 text-[11.5px] font-medium uppercase tracking-wider text-[var(--t-ink-muted)]">
            Budget priority order (highest tier survives tightest caps)
          </div>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-[12px] bg-[var(--t-blue-tint)] p-3">
              <div className="text-[11px] font-medium text-[var(--t-blue-hover)]">
                Tier 1
              </div>
              <div className="mt-0.5 text-[13.5px] font-medium text-[var(--t-ink)]">
                Manual Pins &amp; Overrides
              </div>
              <div className="mt-0.5 text-[12px] text-[var(--t-ink-secondary)]">
                Locked rules and superseding corrections.
              </div>
            </div>
            <div className="rounded-[12px] bg-[var(--t-surface-cool)] p-3">
              <div className="text-[11px] font-medium text-[var(--t-ink-muted)]">
                Tier 2
              </div>
              <div className="mt-0.5 text-[13.5px] font-medium text-[var(--t-ink)]">
                User Constraints
              </div>
              <div className="mt-0.5 text-[12px] text-[var(--t-ink-secondary)]">
                One pin per rule, chatter stripped.
              </div>
            </div>
            <div className="rounded-[12px] bg-[var(--t-surface-sand)] p-3">
              <div className="text-[11px] font-medium text-[var(--t-ink-muted)]">
                Tier 3
              </div>
              <div className="mt-0.5 text-[13.5px] font-medium text-[var(--t-ink)]">
                Test Trajectories
              </div>
              <div className="mt-0.5 text-[12px] text-[var(--t-ink-secondary)]">
                Observed values and edit-thrash warnings.
              </div>
            </div>
            <div className="rounded-[12px] border border-[var(--t-border-subtle)] bg-[var(--t-surface-muted)] p-3">
              <div className="text-[11px] font-medium text-[var(--t-ink-muted)]">
                Tier 4
              </div>
              <div className="mt-0.5 text-[13.5px] font-medium text-[var(--t-ink)]">
                Modified Files
              </div>
              <div className="mt-0.5 text-[12px] text-[var(--t-ink-secondary)]">
                Deduplicated paths relative to repo root.
              </div>
            </div>
          </div>
        </div>
      </div>
    </DiagramShell>
  );
}

function SidefxDiagram() {
  return (
    <DiagramShell
      eyebrow="Write-ahead durability"
      title="How sidefx prevents duplicate external writes after timeouts and crashes"
      caption="Every mutating call claims an atomic pending row in local SQLite WAL before touching the network. Timeouts move the row to unknown and block blind retries until read-only reconciliation confirms what landed."
    >
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <NodeCard
            label="1. Intercept"
            title="MCP Proxy or CLI Wrap"
            detail="Read-only tools pass straight through; mutating calls enter the journal."
            tone="warm"
          />
          <FlowArrow />
          <NodeCard
            label="2. Preflight"
            title="Deterministic Rules"
            detail="Checks numeric caps, protected branches, required args, and allowed domains."
            tone="elevated"
          />
          <FlowArrow />
          <NodeCard
            label="3. Write-Ahead Log"
            title="SQLite WAL (Pending)"
            detail="Atomically claims actor, target, and action ID with a SHA-256 payload hash."
            tone="cool"
          />
        </div>

        <FlowArrow vertical />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <NodeCard
            label="Clean Reply"
            title="Confirmed & Cached"
            detail="Marks confirmed. Identical retries replay from SQLite without calling upstream."
            tone="mint"
          />
          <NodeCard
            label="Timeout or Crash"
            title="Unknown (Fail Closed)"
            detail="Blocks blind retries. Reconciles via read-only GitHub API or git ls-remote."
            tone="sand"
          />
          <NodeCard
            label="Session End"
            title="Ground-Truth Receipt"
            detail="Stop hook and report command read SQLite in read-only mode to list real writes."
            tone="elevated"
          />
        </div>
      </div>
    </DiagramShell>
  );
}

function DiscordCliDiagram() {
  return (
    <DiagramShell
      eyebrow="Guardrail architecture"
      title="How discord-cli keeps agent calls bounded from CLI ingress to JSON output"
      caption="Operator environment ceilings are evaluated before any Discord network request opens. Outgoing writes can be previewed offline with dry-run confirmation tokens, and incoming text can be isolated in random-nonce boundaries."
    >
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <NodeCard
            label="1. Policy Gate"
            title="Monotonic Ceilings"
            detail="Env policy tier, guild/channel/group allowlists, and mutation caps. Flags can only tighten."
            tone="warm"
          />
          <FlowArrow />
          <NodeCard
            label="2. Confirmation"
            title="Dry-Run & Bound Token"
            detail="Offline dry-run returns a deterministic confirmation token tied to command, guild, and args."
            tone="sand"
          />
          <FlowArrow />
          <NodeCard
            label="3. Transport"
            title="REST-First Client"
            detail="One-shot Discord REST call with fail-closed human selectors and zero persistent daemon."
            tone="cool"
          />
        </div>

        <FlowArrow vertical />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <NodeCard
            label="4. Safe Output"
            title="Nonce Envelope & PII Scrubbing"
            detail="Wraps external text in random 64-bit nonce XML tags and redacts tokens, keys, and emails."
            tone="mint"
          />
          <NodeCard
            label="5. Observability"
            title="JSON Envelope & Audit Log"
            detail="Consistent JSON payload, semantic exit codes, and secret-free JSONL audit records."
            tone="elevated"
          />
        </div>
      </div>
    </DiagramShell>
  );
}

export function BlogDiagram({ id }: { id: BlogDiagramId }) {
  switch (id) {
    case "handoff-verify":
      return <HandoffVerifyDiagram />;
    case "compact-ledger":
      return <CompactLedgerDiagram />;
    case "sidefx":
      return <SidefxDiagram />;
    case "discord-cli":
      return <DiscordCliDiagram />;
  }
}
