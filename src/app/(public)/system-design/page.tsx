import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { ArchitectureDiagram } from "@/components/project/ArchitectureDiagram";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { getTranslations } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n-server";

export const dynamic = "force-dynamic";

const polyglotStarters = [
  {
    name: "modular-express-typescript-starter",
    stack: "Express + TypeScript + Sequelize + Zod + RBAC",
    repo: "https://github.com/RidhuanDEV/modular-express-typescript-starter",
  },
  {
    name: "modular-nestjs",
    stack: "NestJS + Modular DI + OpenAPI + Guards",
    repo: "https://github.com/RidhuanDEV/modular-nestjs",
  },
  {
    name: "golang-backend",
    stack: "Go + Modular Monolith + Structured Error Contracts",
    repo: "https://github.com/RidhuanDEV/golang-backend",
  },
  {
    name: "modular-fastapi",
    stack: "Python + FastAPI + Pydantic v2 + Async Services",
    repo: "https://github.com/RidhuanDEV/modular-fastapi",
  },
  {
    name: "modular-laravel",
    stack: "PHP + Laravel + Policy/Service Layering",
    repo: "https://github.com/RidhuanDEV/modular-laravel",
  },
  {
    name: "modular-springboot",
    stack: "Java + Spring Boot + Layered Clean Modules",
    repo: "https://github.com/RidhuanDEV/modular-springboot",
  },
  {
    name: "NET-backend",
    stack: "C# + .NET + Modular API Architecture",
    repo: "https://github.com/RidhuanDEV/NET-backend",
  },
  {
    name: "nextjs-template-csr-ssr-standard-enterprise",
    stack: "Next.js + TypeScript + Enterprise CSR/SSR Structure",
    repo: "https://github.com/RidhuanDEV/nextjs-template-csr---ssr-standard-enterprise",
  },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getTranslations(locale);
  return {
    title: dict.systemDesign.badge,
    description: dict.systemDesign.headline,
  };
}

export default async function SystemDesignPage() {
  const locale = await getServerLocale();
  const dict = getTranslations(locale);

  return (
    <main className="mx-auto max-w-[92vw] lg:max-w-[80vw] py-16">
      <AnimatedSection>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-200">
          {dict.systemDesign.badge}
        </p>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold text-white sm:text-5xl">
          {dict.systemDesign.headline}
        </h1>
      </AnimatedSection>

      <ArchitectureDiagram
        title={dict.systemDesign.diagramTitle}
        nodes={[
          { id: "edge", label: "OIDC / Gateway", tone: "teal" },
          { id: "rbac", label: "Policy & RBAC", tone: "amber" },
          { id: "async", label: "Redis / BullMQ", tone: "green" },
          { id: "data", label: "SQL + Audit Log", tone: "blue" },
        ]}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {dict.systemDesign.principles.map((principle, index) => (
          <div key={principle} className="card-hover-lift border border-white/10 bg-white/[0.025] p-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
              principle {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-4 text-xl leading-8 text-white">{principle}</p>
          </div>
        ))}
      </div>

      {/* Polyglot Modular Architecture Showcase */}
      <AnimatedSection className="mt-16 border-t border-white/10 pt-12">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-200">
          {dict.systemDesign.polyglotBadge}
        </p>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold text-white">
          {dict.systemDesign.polyglotTitle}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
          {dict.systemDesign.polyglotDescription}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {polyglotStarters.map((starter) => (
            <a
              key={starter.name}
              href={starter.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between card-hover-lift border border-white/10 bg-white/[0.025] p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-mono text-xs font-medium text-white group-hover:text-teal-200 break-all">
                  {starter.name}
                </h3>
                <ArrowUpRight size={15} className="shrink-0 text-zinc-500 group-hover:text-teal-200" />
              </div>
              <p className="mt-3 text-xs leading-5 text-zinc-400">{starter.stack}</p>
            </a>
          ))}
        </div>
      </AnimatedSection>
    </main>
  );
}
