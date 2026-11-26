import * as React from "react";
import { cn } from "@/lib/utils";
import { TonalChip, type TonalChipProps } from "./chip";

export interface KpiMetric {
  id?: string;
  title: string;
  value: string;
  delta?: string;
  tone?: TonalChipProps["tone"];
  subtitle?: string;
}

export interface KpiGridProps extends React.HTMLAttributes<HTMLDivElement> {
  items: KpiMetric[];
  columns?: 2 | 3 | 4;
}

const columnClasses: Record<2 | 3 | 4, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
};

export function KpiGrid({
  items,
  columns = 4,
  className,
  ...props
}: KpiGridProps) {
  return (
    <div
      className={cn("grid gap-4", columnClasses[columns], className)}
      {...props}
    >
      {items.map((kpi) => (
        <div
          key={kpi.id ?? kpi.title}
          className="rounded-[20px] bg-[var(--t-surface)] p-5 flex flex-col justify-between gap-3 transition-colors duration-200 [transition-timing-function:var(--t-ease)]"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[12.5px] font-medium text-[var(--t-ink-muted)] truncate">
              {kpi.title}
            </span>
            {kpi.delta && (
              <TonalChip
                tone={kpi.tone ?? "neutral"}
                className="px-2.5 py-0.5 text-[11px] shrink-0"
              >
                {kpi.delta}
              </TonalChip>
            )}
          </div>
          <div>
            <div className="text-[30px] font-medium tracking-[-0.03em] leading-none text-[var(--t-ink)] tabular-nums mb-1.5">
              {kpi.value}
            </div>
            {kpi.subtitle && (
              <div className="text-[12px] text-[var(--t-ink-muted)]">
                {kpi.subtitle}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
