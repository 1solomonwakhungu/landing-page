"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  question: string;
  answer: string;
}

export function TonalAccordion({
  items,
  className,
}: {
  items: AccordionItemData[];
  className?: string;
}) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div
      className={cn(
        "divide-y divide-[var(--t-border-subtle)] border-y border-[var(--t-border-subtle)]",
        className
      )}
    >
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left cursor-pointer group"
            >
              <span className="text-[16px] font-medium tracking-[-0.015em] text-[var(--t-ink)] group-hover:text-[var(--t-blue)] transition-colors">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-[var(--t-ink-muted)] transition-transform duration-250 [transition-timing-function:var(--t-ease)]",
                  isOpen && "rotate-180 text-[var(--t-ink)]"
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-250 [transition-timing-function:var(--t-ease)]",
                isOpen
                  ? "grid-rows-[1fr] pb-5 opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="text-[14.5px] leading-[1.6] text-[var(--t-ink-secondary)] max-w-2xl">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
