"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  BookOpen,
  FileText,
  Gauge,
  Settings,
  User,
  Workflow,
  LogOut,
  Globe,
  Menu,
  X,
} from "lucide-react";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: Gauge },
  { href: "/admin/projects", label: "Projects", icon: Workflow },
  { href: "/admin/blog", label: "Writing", icon: FileText },
  { href: "/admin/profile", label: "Profile", icon: User },
  { href: "/admin/site-settings", label: "Settings", icon: Settings },
  { href: "/admin/adrs", label: "ADRs", icon: BookOpen },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleSignOut() {
    signOut({ callbackUrl: "/" });
  }

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full bg-[#0b0d10] lg:bg-transparent p-6 lg:p-4 lg:w-64">
      <div className="grid gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-400">
            control plane
          </p>
          <h2 className="mt-1.5 text-lg font-semibold text-white tracking-tight">Admin CMS</h2>
        </div>

        <nav className="grid gap-1">
          {adminLinks.map((item) => {
            const Icon = item.icon;
            // Match exact path for dashboard, or prefix matches for subpaths
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-all duration-150 relative ${
                  isActive
                    ? "text-cyan-400 bg-cyan-500/5 font-medium border-l-2 border-cyan-400 pl-[10px]"
                    : "text-zinc-400 hover:bg-white/[0.02] hover:text-zinc-200 border-l-2 border-transparent"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="grid gap-2 border-t border-white/5 pt-4 mt-6">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 hover:text-zinc-200 transition duration-150"
        >
          <Globe size={16} />
          Back to Site
        </Link>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/5 hover:text-red-300 transition duration-150 w-full text-left cursor-pointer"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="lg:hidden flex items-center justify-between border-b border-white/10 bg-[#08090b] px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">CMS</span>
          <span className="h-4 w-[1px] bg-white/20" />
          <span className="text-sm font-semibold text-white">Portfolio Admin</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-zinc-400 hover:text-white transition cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Sidebar Slide-out Overlay */}
      {mobileOpen ? (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm">
          <aside className="fixed bottom-0 left-0 top-[57px] w-72 bg-[#0b0d10] border-r border-white/10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </aside>
          {/* Transparent click-to-close zone */}
          <div className="absolute inset-0 -z-10" onClick={() => setMobileOpen(false)} />
        </div>
      ) : null}

      {/* Desktop Sidebar (Sidebar on left) */}
      <aside className="hidden lg:flex flex-col border-r border-white/10 bg-[#0b0d10]/40 backdrop-blur-md min-h-[100vh] sticky top-0">
        {sidebarContent}
      </aside>
    </>
  );
}
