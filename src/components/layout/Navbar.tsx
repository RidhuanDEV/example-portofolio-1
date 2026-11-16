import Link from "next/link";
import Image from "next/image";
import { BriefcaseBusiness, Code, Mail } from "lucide-react";
import { getProfile, getPublishedBlogPosts, getPublishedProjects } from "@/lib/data";
import { getTranslations, t } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n-server";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";

export async function Navbar() {
  const [locale, projects, posts, profile] = await Promise.all([
    getServerLocale(),
    getPublishedProjects(),
    getPublishedBlogPosts(),
    getProfile(),
  ]);
  const dict = getTranslations(locale);

  const navItems = [
    { href: "/projects", label: dict.nav.projects },
    { href: "/system-design", label: dict.nav.systemDesign },
    { href: "/writing", label: dict.nav.writing },
    { href: "/resume", label: dict.nav.resume },
    { href: "/contact", label: dict.nav.contact },
  ];

  const paletteProjects = projects.map((project) => ({
    title: t(project.title, locale),
    slug: project.slug,
    subtitle: project.year ? String(project.year) : undefined,
  }));

  const palettePosts = posts.map((post) => ({
    title: t(post.title, locale),
    slug: post.slug,
  }));

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#08090b] md:bg-[#08090b]/85 md:backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-[92vw] lg:max-w-[80vw] items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-teal-300/40">
              <Image
                src="/profilsaya.jpg"
                alt="Ridhuan Rangga Kusuma"
                fill
                sizes="32px"
                className="object-cover"
                priority
              />
            </span>
            <span className="text-sm font-medium text-zinc-100">Ridhuan Rangga</span>
          </Link>

          <nav className="hidden items-center gap-5 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link-underline text-sm text-zinc-400 transition-colors hover:text-zinc-50"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <CommandPalette
              locale={locale}
              dict={dict}
              projects={paletteProjects}
              posts={palettePosts}
              email={profile.email ?? "ridhuanranggakusuma@gmail.com"}
            />

            <div className="hidden items-center gap-2 md:flex">
              <div className="group relative">
                <a
                  href="https://github.com/RidhuanDEV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-9 w-9 place-items-center border border-white/10 text-zinc-400 btn-hover-lift"
                  aria-label="GitHub"
                >
                  <Code size={16} />
                </a>
                <span className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded bg-zinc-800 px-2 py-1 font-mono text-[10px] text-zinc-300 opacity-0 shadow-lg transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  GitHub
                </span>
              </div>
              <div className="group relative">
                <a
                  href="https://www.linkedin.com/in/ridhuan-rangga-kusuma-146241292/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-9 w-9 place-items-center border border-white/10 text-zinc-400 btn-hover-lift"
                  aria-label="LinkedIn"
                >
                  <BriefcaseBusiness size={16} />
                </a>
                <span className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded bg-zinc-800 px-2 py-1 font-mono text-[10px] text-zinc-300 opacity-0 shadow-lg transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  LinkedIn
                </span>
              </div>
              <ThemeToggle />
              <LanguageToggle currentLocale={locale} />
              <Link
                href="/contact"
                className="inline-flex h-9 items-center gap-2 border border-white/10 px-3 text-sm text-zinc-200 btn-hover-lift"
              >
                <Mail size={15} />
                {dict.nav.contact}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <MobileBottomBar locale={locale} dict={dict} navItems={navItems} />
    </>
  );
}
