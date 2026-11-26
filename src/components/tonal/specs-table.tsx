import * as React from "react";
import { cn } from "@/lib/utils";

export interface SpecRow {
  label: string;
  values: string[];
}

export interface SpecsTableProps {
  title?: string;
  featureLabel?: string;
  columns: string[];
  rows: SpecRow[];
  highlightFirstColumn?: boolean;
  className?: string;
}

export function SpecsTable({
  title,
  featureLabel = "Area",
  columns,
  rows,
  highlightFirstColumn = true,
  className,
}: SpecsTableProps) {
  return (
    <section className={cn("flex flex-col gap-5", className)}>
      {title && (
        <h2 className="t-headline text-[28px] sm:text-[34px]">{title}</h2>
      )}

      <div className="rounded-[var(--t-radius-card)] border border-[var(--t-border-subtle)] overflow-hidden bg-[var(--t-bg)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[520px]">
            <thead>
              <tr className="bg-[var(--t-surface)] text-[13px] font-medium text-[var(--t-ink-muted)] border-b border-[var(--t-border-subtle)]">
                <th
                  scope="col"
                  className="py-4 px-6 font-medium text-[var(--t-ink-muted)] w-1/4 min-w-[140px]"
                >
                  {featureLabel}
                </th>
                {columns.map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className="py-4 px-6 font-medium text-[var(--t-ink)]"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--t-border-subtle)] text-[14px]">
              {rows.map((row) => (
                <tr
                  key={row.label}
                  className="hover:bg-[var(--t-surface)]/50 transition-colors duration-150"
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-[var(--t-ink-muted)] align-top"
                  >
                    {row.label}
                  </th>
                  {columns.map((col, idx) => (
                    <td
                      key={`${row.label}-${col}`}
                      className={cn(
                        "py-4 px-6 align-top leading-[1.55]",
                        highlightFirstColumn && idx === 0
                          ? "text-[var(--t-ink)] font-medium"
                          : "text-[var(--t-ink-secondary)]"
                      )}
                    >
                      {row.values[idx] ?? "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
