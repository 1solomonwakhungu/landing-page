"use client";

import * as React from "react";
import { AlertCircle, Check, Copy } from "lucide-react";

type CopyState = "idle" | "copied" | "failed";

export function BlogCodeBlock({
  code,
  label,
}: {
  code: string;
  label?: string;
}) {
  const [copyState, setCopyState] = React.useState<CopyState>("idle");
  const timerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const scheduleReset = React.useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      setCopyState("idle");
      timerRef.current = null;
    }, 1800);
  }, []);

  const handleCopy = React.useCallback(async () => {
    if (
      typeof navigator === "undefined" ||
      !navigator.clipboard ||
      typeof navigator.clipboard.writeText !== "function"
    ) {
      setCopyState("failed");
      scheduleReset();
      return;
    }

    try {
      await navigator.clipboard.writeText(code);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
    scheduleReset();
  }, [code, scheduleReset]);

  const statusText =
    copyState === "copied"
      ? "Copied to clipboard"
      : copyState === "failed"
        ? "Copy failed"
        : "";

  return (
    <div className="my-5 overflow-hidden rounded-[20px] border border-[var(--t-border-subtle)] bg-[var(--t-surface)]">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--t-border-subtle)] px-4 py-2.5">
        <span className="text-[12px] font-medium text-[var(--t-ink-muted)]">
          {label ?? "Terminal"}
        </span>
        <div className="flex items-center gap-2">
          <span role="status" aria-live="polite" className="sr-only">
            {statusText}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium text-[var(--t-ink-muted)] hover:bg-[var(--t-surface-muted)] hover:text-[var(--t-ink)] cursor-pointer transition-colors"
            aria-label={
              copyState === "copied"
                ? "Copied command"
                : copyState === "failed"
                  ? "Copy failed"
                  : "Copy command"
            }
          >
            {copyState === "copied" ? (
              <>
                <Check className="h-3.5 w-3.5 text-[var(--t-chip-mint-fg)]" />
                <span className="text-[var(--t-chip-mint-fg)]">Copied</span>
              </>
            ) : copyState === "failed" ? (
              <>
                <AlertCircle className="h-3.5 w-3.5 text-[var(--t-ink)]" />
                <span className="text-[var(--t-ink)]">Copy failed</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
      <pre className="overflow-x-auto px-5 py-4">
        <code className="font-mono text-[13px] leading-[1.65] text-[var(--t-ink)]">
          {code}
        </code>
      </pre>
    </div>
  );
}
