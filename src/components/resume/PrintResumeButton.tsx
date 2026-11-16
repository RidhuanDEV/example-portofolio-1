"use client";

import { Printer } from "lucide-react";

interface PrintResumeButtonProps {
  label: string;
}

export function PrintResumeButton({ label }: PrintResumeButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 border border-white/10 px-4 py-2.5 text-sm font-medium text-zinc-200 btn-hover-lift print:hidden"
    >
      <Printer size={16} />
      {label}
    </button>
  );
}
