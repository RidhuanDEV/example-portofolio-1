"use client";

import { useTheme } from "@/components/providers/ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Render a fixed-size placeholder during SSR to prevent layout shift
  if (!mounted) {
    return <div className="h-9 w-9 shrink-0" />;
  }

  const isDark = theme === "dark";

  return (
    <div className="group relative">
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="grid h-9 w-9 place-items-center border border-black/10 text-zinc-600 btn-hover-lift dark:border-white/10 dark:text-zinc-400 overflow-hidden hover:border-black/30 hover:text-black dark:hover:border-white/20 dark:hover:text-white"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "dark" : "light"}
            initial={{ y: 15, opacity: 0, rotate: -45, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
            exit={{ y: -15, opacity: 0, rotate: 45, scale: 0.8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </motion.span>
        </AnimatePresence>
      </button>
      <span className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded bg-zinc-800 px-2 py-1 font-mono text-[10px] text-zinc-300 opacity-0 shadow-lg transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 dark:bg-zinc-800 dark:text-zinc-300">
        {isDark ? "Light mode" : "Dark mode"}
      </span>
    </div>
  );
}
