"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Moon, Sun } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { cn } from "@/lib/utils";
import {
  GITHUB_URL,
  HOMEBREW_TAP_URL,
  LINKEDIN_URL,
  TONAL_URL,
} from "@/data/portfolio";

const NAV_ITEMS = [
  { href: "/", label: "Overview" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/tools", label: "Stack" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    try {
      const saved = window.localStorage.getItem("tonal-theme");
      if (saved === "light" || saved === "dark") {
        setTheme(saved);
      } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setTheme("dark");
      }
    } catch {
      // Ignore storage access errors
    }
  }, []);

  React.useEffect(() => {
    document.documentElement.dataset.tonalTheme = theme;
  }, [theme]);

  const toggleTheme = React.useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        window.localStorage.setItem("tonal-theme", next);
      } catch {
        // Ignore storage access errors
      }
      return next;
    });
  }, []);

  const isRouteActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div
      data-tonal-mode="pill"
      data-tonal-theme={theme}
      className="min-h-screen bg-[var(--t-bg)] text-[var(--t-ink)] flex flex-col transition-colors duration-200"
    >
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <header className="sticky top-0 z-40 bg-[var(--t-bg)]/90 backdrop-blur-md border-b border-[var(--t-border-subtle)] transition-colors duration-200">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-[16.5px] font-medium tracking-[-0.02em] text-[var(--t-ink)]"
            >
              <BrandMark variant="mark" className="h-5 w-5 shrink-0" />
              <span>Solomon Wakhungu</span>
            </Link>

            <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const active = isRouteActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-[13.5px] font-medium transition-colors duration-200",
                      active
                        ? "bg-[var(--t-blue-tint)] text-[var(--t-blue-hover)]"
                        : "text-[var(--t-ink-muted)] hover:text-[var(--t-ink)] hover:bg-[var(--t-surface)]"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[13px] font-medium text-[var(--t-ink-muted)] hover:text-[var(--t-ink)] hover:bg-[var(--t-surface)] transition-colors duration-200"
            >
              GitHub
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-[var(--t-surface-muted)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--t-ink)] hover:bg-[var(--t-blue-tint)] hover:text-[var(--t-blue-hover)] transition-colors duration-200"
            >
              Contact
            </Link>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              title={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              className="inline-flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-[var(--t-surface)] border border-[var(--t-border-subtle)] text-[var(--t-ink-secondary)] hover:text-[var(--t-ink)] hover:bg-[var(--t-surface-muted)] cursor-pointer transition-colors duration-200"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile route switcher */}
        <nav
          aria-label="Mobile navigation"
          className="md:hidden flex items-center gap-1.5 overflow-x-auto px-5 pb-2.5"
        >
          {NAV_ITEMS.map((item) => {
            const active = isRouteActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "shrink-0 px-3 py-1 rounded-full text-[12.5px] font-medium transition-colors",
                  active
                    ? "bg-[var(--t-blue-tint)] text-[var(--t-blue-hover)]"
                    : "text-[var(--t-ink-muted)] bg-[var(--t-surface)]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main id="main-content" className="flex-1">
        {children}
      </main>

      <footer className="border-t border-[var(--t-border-subtle)] mt-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[13px] text-[var(--t-ink-muted)]">
          <div className="flex flex-wrap items-center gap-2">
            <BrandMark variant="mark" className="h-4 w-4 shrink-0" />
            <span className="font-medium text-[var(--t-ink)]">
              Solomon Wakhungu
            </span>
            <span>·</span>
            <span>harlo.dev</span>
            <span>·</span>
            <span>
              Built with{" "}
              <a
                href={TONAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--t-ink-secondary)] hover:text-[var(--t-blue)] underline underline-offset-4 transition-colors"
              >
                Tonal
              </a>
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="me noopener noreferrer"
              className="hover:text-[var(--t-ink)] transition-colors"
            >
              GitHub
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="me noopener noreferrer"
              className="hover:text-[var(--t-ink)] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={HOMEBREW_TAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--t-ink)] transition-colors"
            >
              Homebrew Tap
            </a>
            <Link href="/case-studies" className="hover:text-[var(--t-ink)] transition-colors">
              Case Studies
            </Link>
            <Link href="/blog" className="hover:text-[var(--t-ink)] transition-colors">
              Blog
            </Link>
            <a href="/blog/rss.xml" className="hover:text-[var(--t-ink)] transition-colors">
              RSS
            </a>
            <a href="/llms.txt" className="hover:text-[var(--t-ink)] transition-colors">
              llms.txt
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
