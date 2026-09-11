"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Menu, X, Code, BriefcaseBusiness, Mail, BookOpen, Cpu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import type { Locale } from "@/lib/i18n";

interface NavItem {
  href: string;
  label: string;
}

interface MobileMenuProps {
  navItems: NavItem[];
  locale: Locale;
  isBottomBarTrigger?: boolean;
}

export function MobileMenu({ navItems, locale, isBottomBarTrigger }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const sidebarVariants: Variants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const backdropVariants: Variants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  const itemVariants: Variants = {
    closed: { opacity: 0, x: 24 },
    open: { opacity: 1, x: 0 },
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Get matching icon for navigation items
  const getIcon = (href: string, active: boolean) => {
    const iconClass = active
      ? "text-black dark:text-teal-200 stroke-[2.5]"
      : "text-zinc-500 dark:text-teal-300/60 stroke-[1.8]";
    switch (href) {
      case "/projects":
        return <BriefcaseBusiness size={18} className={iconClass} />;
      case "/system-design":
        return <Cpu size={18} className={iconClass} />;
      case "/writing":
        return <BookOpen size={18} className={iconClass} />;
      case "/contact":
        return <Mail size={18} className={iconClass} />;
      default:
        return null;
    }
  };

  return (
    <div className={isBottomBarTrigger ? "w-full h-full flex items-center justify-center" : "md:hidden"}>
      {/* Trigger Button */}
      {isBottomBarTrigger ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center justify-center w-full h-full py-2 text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-teal-200 focus:outline-none bg-transparent border-0 cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu size={20} className="stroke-[1.8]" />
          <span className="text-[10px] font-mono mt-0.5 tracking-wide text-zinc-500 hover:text-black dark:hover:text-teal-200">
            Menu
          </span>
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="grid h-10 w-10 place-items-center border border-black/10 text-zinc-600 btn-hover-lift dark:border-white/10 dark:text-zinc-400 hover:border-black/30 hover:text-black dark:hover:border-white/20 dark:hover:text-white"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={backdropVariants}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 dark:bg-[#08090b]/80 backdrop-blur-md"
            />

            {/* Sliding Menu Pane */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className="fixed top-0 right-0 bottom-0 z-[60] flex w-full max-w-[290px] flex-col border-l border-black/10 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#08090b]"
            >
              {/* Header inside Menu */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">Navigation</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="grid h-10 w-10 place-items-center border border-black/10 text-zinc-600 btn-hover-lift dark:border-white/10 dark:text-zinc-400 hover:border-black/30 hover:text-black dark:hover:border-white/20 dark:hover:text-white"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Items (Cascading Animation) */}
              <nav className="mt-12 flex flex-col gap-6">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <motion.div key={item.href} variants={itemVariants}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3.5 text-lg font-medium transition-colors ${
                          active
                            ? "text-black dark:text-teal-200 font-semibold"
                            : "text-zinc-800 hover:text-black dark:text-zinc-100 dark:hover:text-teal-200"
                        }`}
                      >
                        {getIcon(item.href, active)}
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Action Section (Divider + Toggles) */}
              <motion.div variants={itemVariants} className="mt-auto border-t border-black/10 pt-6 dark:border-white/10">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <LanguageToggle currentLocale={locale} />
                  </div>
                  
                  {/* Social/Developer Icons */}
                  <div className="flex items-center gap-2">
                    <a
                      href="https://github.com/RidhuanDEV"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid h-9 w-9 place-items-center border border-black/10 text-zinc-600 btn-hover-lift dark:border-white/10 dark:text-zinc-400 hover:border-black/30 hover:text-black dark:hover:border-white/20 dark:hover:text-white"
                      aria-label="GitHub"
                    >
                      <Code size={16} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/ridhuan-rangga-kusuma-146241292/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid h-9 w-9 place-items-center border border-black/10 text-zinc-600 btn-hover-lift dark:border-white/10 dark:text-zinc-400 hover:border-black/30 hover:text-black dark:hover:border-white/20 dark:hover:text-white"
                      aria-label="LinkedIn"
                    >
                      <BriefcaseBusiness size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
