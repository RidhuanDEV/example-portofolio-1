import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="border border-white/10 bg-white/[0.02] p-8 text-center">
      <p className="text-base font-medium text-white">{title}</p>
      {description ? <p className="mt-2 text-sm text-zinc-400">{description}</p> : null}
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}
