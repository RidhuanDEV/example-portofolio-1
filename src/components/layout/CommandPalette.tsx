"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Check,
  Copy,
  FileText,
  Globe,
  Layers,
  Mail,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import type { Dictionary, Locale } from "@/lib/i18n";

export interface PaletteItemLink {
  title: string;
  slug: string;
  subtitle?: string;
}

interface CommandPaletteProps {
  locale: Locale;
  dict: Dictionary;
  projects: PaletteItemLink[];
  posts: PaletteItemLink[];
  email: string;
}

interface CommandEntry {
  id: string;
  group: "navigation" | "caseStudies" | "articles" | "actions";
  label: string;
  hint?: string;
  run: () => void;
}

export function CommandPalette({
  locale,
  dict,
  projects,
  posts,
  email,
}: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      } else if (event.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const commands = useMemo<CommandEntry[]>(() => {
    const navigate = (href: string) => {
      setOpen(false);
      setQuery("");
      router.push(href);
    };

    const navCommands: CommandEntry[] = [
      { id: "nav-home", group: "navigation", label: "Home", hint: "/", run: () => navigate("/") },
      { id: "nav-projects", group: "navigation", label: dict.nav.projects, hint: "/projects", run: () => navigate("/projects") },
      { id: "nav-system", group: "navigation", label: dict.nav.systemDesign, hint: "/system-design", run: () => navigate("/system-design") },
      { id: "nav-writing", group: "navigation", label: dict.nav.writing, hint: "/writing", run: () => navigate("/writing") },
      { id: "nav-resume", group: "navigation", label: dict.nav.resume, hint: "/resume", run: () => navigate("/resume") },
      { id: "nav-contact", group: "navigation", label: dict.nav.contact, hint: "/contact", run: () => navigate("/contact") },
    ];

    const projectCommands: CommandEntry[] = projects.map((project) => ({
      id: `proj-${project.slug}`,
      group: "caseStudies",
      label: project.title,
      hint: project.subtitle,
      run: () => navigate(`/projects/${project.slug}`),
    }));

    const postCommands: CommandEntry[] = posts.map((post) => ({
      id: `post-${post.slug}`,
      group: "articles",
      label: post.title,
      hint: "/writing",
      run: () => navigate(`/writing/${post.slug}`),
    }));

    const actionCommands: CommandEntry[] = [
      {
        id: "act-theme",
        group: "actions",
        label: dict.commandPalette.toggleTheme,
        hint: theme === "dark" ? "Light" : "Dark",
        run: () => {
          setTheme(theme === "dark" ? "light" : "dark");
          setOpen(false);
        },
      },
      {
        id: "act-lang",
        group: "actions",
        label: dict.commandPalette.switchLang,
        hint: locale === "en" ? "ID" : "EN",
        run: () => {
          const nextLocale: Locale = locale === "en" ? "id" : "en";
          document.cookie = `locale=${nextLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
          setOpen(false);
          router.refresh();
        },
      },
      {
        id: "act-copy-email",
        group: "actions",
        label: dict.commandPalette.copyEmail,
        hint: email,
        run: () => {
          void navigator.clipboard?.writeText(email);
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
            setOpen(false);
          }, 900);
        },
      },
    ];

    return [...navCommands, ...projectCommands, ...postCommands, ...actionCommands];
  }, [dict, email, locale, posts, projects, router, setTheme, theme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        (item.hint?.toLowerCase().includes(q) ?? false),
    );
  }, [commands, query]);

  const groupLabels: Record<CommandEntry["group"], string> = {
    navigation: dict.commandPalette.navigation,
    caseStudies: dict.commandPalette.caseStudies,
    articles: dict.commandPalette.articles,
    actions: dict.commandPalette.actions,
  };

  function iconForGroup(entry: CommandEntry) {
    if (entry.id === "act-theme") return theme === "dark" ? <Sun size={14} /> : <Moon size={14} />;
    if (entry.id === "act-lang") return <Globe size={14} />;
    if (entry.id === "act-copy-email") return copied ? <Check size={14} className="text-teal-200" /> : <Copy size={14} />;
    if (entry.group === "caseStudies") return <Layers size={14} />;
    if (entry.group === "articles") return <BookOpen size={14} />;
    if (entry.id === "nav-resume") return <FileText size={14} />;
    if (entry.id === "nav-contact") return <Mail size={14} />;
    return <ArrowRight size={14} />;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={dict.commandPalette.triggerLabel}
        className="inline-flex h-9 items-center gap-2 border border-white/10 px-2.5 text-xs font-mono text-zinc-400 btn-hover-lift hover:text-zinc-100"
      >
        <Search size={14} />
        <span className="hidden lg:inline">{dict.commandPalette.triggerLabel}</span>
        <kbd className="hidden lg:inline border border-white/10 px-1.5 py-0.5 text-[10px] text-zinc-500">
          Ctrl+K
        </kbd>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/65 p-4 pt-20 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={dict.commandPalette.triggerLabel}
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xl border border-white/15 bg-[#08090b] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <Search size={16} className="shrink-0 text-teal-200" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={dict.commandPalette.placeholder}
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close command palette"
                className="grid h-7 w-7 place-items-center border border-white/10 text-zinc-400 hover:text-white"
              >
                <X size={14} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-zinc-400">
                  {dict.commandPalette.noResults}
                </p>
              ) : (
                (["navigation", "caseStudies", "articles", "actions"] as const).map((group) => {
                  const groupItems = filtered.filter((item) => item.group === group);
                  if (groupItems.length === 0) return null;
                  return (
                    <div key={group} className="mb-3 last:mb-0">
                      <p className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                        {groupLabels[group]}
                      </p>
                      <div className="grid gap-1">
                        {groupItems.map((entry) => (
                          <button
                            key={entry.id}
                            type="button"
                            onClick={entry.run}
                            className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm text-zinc-200 hover:bg-white/[0.04] hover:text-teal-200"
                          >
                            <span className="flex items-center gap-2.5 truncate">
                              <span className="text-zinc-500">{iconForGroup(entry)}</span>
                              <span className="truncate">
                                {entry.id === "act-copy-email" && copied
                                  ? dict.commandPalette.emailCopied
                                  : entry.label}
                              </span>
                            </span>
                            {entry.hint ? (
                              <span className="shrink-0 font-mono text-[11px] text-zinc-500">
                                {entry.hint}
                              </span>
                            ) : null}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 font-mono text-[11px] text-zinc-500">
              <span>{email}</span>
              <span>{dict.commandPalette.shortcutHint}</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
