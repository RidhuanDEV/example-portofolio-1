"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, Cpu, BookOpen } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import type { Locale, Dictionary } from "@/lib/i18n";

interface NavItem {
  href: string;
  label: string;
}

interface MobileBottomBarProps {
  locale: Locale;
  dict: Dictionary;
  navItems: NavItem[];
}

export function MobileBottomBar({ locale, dict, navItems }: MobileBottomBarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="mobile-bottom-bar fixed bottom-0 left-0 right-0 z-40 h-16 bg-[#08090b] border-t border-white/10 md:hidden flex items-center justify-around px-2 pb-safe shadow-[0_-8px_24px_-6px_rgba(0,0,0,0.3)]">
      {/* Projects Tab */}
      <Link
        href="/projects"
        className={`flex flex-col items-center justify-center flex-1 h-full py-2 transition-colors ${isActive("/projects")
          ? "text-black dark:text-teal-200"
          : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-250"
          }`}
      >
        <BriefcaseBusiness size={20} className={isActive("/projects") ? "stroke-[2.5]" : "stroke-[1.8]"} />
        <span className="text-[10px] font-mono mt-0.5 tracking-wide">
          {dict.nav.projects}
        </span>
      </Link>

      {/* Systems Tab */}
      <Link
        href="/system-design"
        className={`flex flex-col items-center justify-center flex-1 h-full py-2 transition-colors ${isActive("/system-design")
          ? "text-black dark:text-teal-200"
          : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-250"
          }`}
      >
        <Cpu size={20} className={isActive("/system-design") ? "stroke-[2.5]" : "stroke-[1.8]"} />
        <span className="text-[10px] font-mono mt-0.5 tracking-wide">
          {dict.nav.systemDesign}
        </span>
      </Link>

      {/* Raised Center Home Avatar Button */}
      <Link href="/" className="relative flex flex-col items-center justify-center px-2 z-50">
        <div className="bottom-bar-home-ring relative flex h-14 w-14 items-center justify-center rounded-full bg-teal-200 p-0.5 shadow-lg border border-teal-300/40 ring-4 ring-white dark:ring-[#08090b] transition-transform hover:scale-105 active:scale-95 -mt-6">
          <span className="relative h-full w-full overflow-hidden rounded-full">
            <Image
              src="/profilsaya.jpg"
              alt="Home"
              fill
              sizes="48px"
              className="object-cover"
              priority
            />
          </span>
        </div>
      </Link>

      {/* Writing Tab */}
      <Link
        href="/writing"
        className={`flex flex-col items-center justify-center flex-1 h-full py-2 transition-colors ${isActive("/writing")
          ? "text-black dark:text-teal-200"
          : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-250"
          }`}
      >
        <BookOpen size={20} className={isActive("/writing") ? "stroke-[2.5]" : "stroke-[1.8]"} />
        <span className="text-[10px] font-mono mt-0.5 tracking-wide">
          {dict.nav.writing}
        </span>
      </Link>

      {/* Drawer Menu Tab */}
      <div className="flex-1 h-full flex items-center justify-center">
        <MobileMenu navItems={navItems} locale={locale} isBottomBarTrigger={true} />
      </div>
    </div>
  );
}
