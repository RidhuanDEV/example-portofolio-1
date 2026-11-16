import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "neutral" | "accent" | "subtle";

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}

const toneClasses: Record<BadgeTone, string> = {
  neutral: "border-white/10 text-zinc-400 bg-transparent",
  accent: "border-teal-300/35 text-teal-200 bg-teal-300/10",
  subtle: "border-white/10 text-zinc-300 bg-white/[0.03]",
};

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2.5 py-0.5 font-mono text-[11px]",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
