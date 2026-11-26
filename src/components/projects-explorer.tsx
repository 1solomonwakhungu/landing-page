"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { SurfaceTile } from "@/components/tonal/surface-tile";
import { TonalChip } from "@/components/tonal/chip";
import { ChevronLink } from "@/components/tonal/chevron-link";
import { PROJECTS, type ProjectCategory } from "@/data/portfolio";

const CATEGORIES: ProjectCategory[] = [
  "All",
  "Live on harlo.dev",
  "Kubernetes & Cloud",
  "MCP & AI",
  "CLI & Tooling",
];

export function ProjectsExplorer() {
  const [category, setCategory] = React.useState<ProjectCategory>("All");
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter((project) => {
      const matchesCategory =
        category === "All" || project.categories.includes(category);
      const matchesQuery =
        !q ||
        project.name.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div
          role="group"
          aria-label="Filter projects by category"
          className="flex flex-wrap items-center gap-2"
        >
          {CATEGORIES.map((cat) => {
            const active = category === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(cat)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-[12.5px] font-medium cursor-pointer transition-colors duration-200 [transition-timing-function:var(--t-ease)]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--t-blue)]",
                  active
                    ? "bg-[var(--t-ink)] text-[var(--t-bg)]"
                    : "bg-[var(--t-surface)] text-[var(--t-ink-muted)] hover:text-[var(--t-ink)]"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:w-64">
          <Search
            aria-hidden="true"
            className="h-4 w-4 text-[var(--t-ink-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter projects or stack..."
            aria-label="Filter projects or stack"
            className="w-full rounded-full bg-[var(--t-surface-cool)] pl-9 pr-4 py-2 text-[13px] text-[var(--t-ink)] placeholder:text-[var(--t-ink-muted)] border border-transparent focus:border-[var(--t-blue)] focus:bg-[var(--t-bg)] focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="text-[13px] text-[var(--t-ink-muted)]">
        Showing {filtered.length} of {PROJECTS.length} projects
      </div>

      {filtered.length === 0 ? (
        <SurfaceTile tone="neutral" className="text-center py-12">
          <p className="text-[15px] text-[var(--t-ink-secondary)] mb-3">
            No projects match your current filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setCategory("All");
              setQuery("");
            }}
            className="text-[13.5px] font-medium text-[var(--t-blue)] hover:underline cursor-pointer"
          >
            Reset filters
          </button>
        </SurfaceTile>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((project, idx) => (
            <SurfaceTile
              key={project.id}
              tone={project.tone}
              className="flex flex-col justify-between gap-6"
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {project.tags.map((tag) => (
                      <TonalChip
                        key={tag}
                        tone="neutral"
                        className="bg-[var(--t-elevated)] border border-[var(--t-border-subtle)] text-[11.5px]"
                      >
                        {tag}
                      </TonalChip>
                    ))}
                  </div>
                  <span className="text-[12px] font-mono text-[var(--t-ink-muted)] tabular-nums">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                <h2 className="t-headline text-[23px] sm:text-[25px]">
                  {project.name}
                </h2>
                <p className="t-body text-[14.5px]">{project.description}</p>
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-2 border-t border-[var(--t-border-subtle)]">
                {project.demoUrl && (
                  <ChevronLink href={project.demoUrl}>
                    {project.demoLabel ?? "Live site"}
                  </ChevronLink>
                )}
                <ChevronLink
                  href={project.href}
                  tone={project.demoUrl ? "ink" : "blue"}
                  external={project.external}
                >
                  {project.external ? "GitHub" : "Read case studies"}
                </ChevronLink>
              </div>
            </SurfaceTile>
          ))}
        </div>
      )}
    </div>
  );
}
