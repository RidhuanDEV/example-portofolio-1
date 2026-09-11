"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit2, Trash2, CheckCircle2, AlertTriangle, Eye, EyeOff, Loader2 } from "lucide-react";
import type { ProjectRecord } from "@/types/domain";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

interface ProjectsTableProps {
  projects: ProjectRecord[];
  locale: Locale;
}

export function ProjectsTable({ projects, locale }: ProjectsTableProps) {
  const router = useRouter();
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete(slug: string) {
    setIsDeleting(true);
    setError(null);
    try {
      const response = await fetch(`/api/projects/${slug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      setDeletingSlug(null);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong while deleting");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="grid gap-4">
      {error && (
        <div className="flex items-center gap-2 border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200 rounded">
          <AlertTriangle size={16} />
          {error}
        </div>
      )}

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto rounded-lg border border-white/10 bg-zinc-950/40 backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-xs font-mono uppercase tracking-wider text-zinc-400">
              <th className="px-6 py-4 font-medium">Project Title</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Featured</th>
              <th className="px-6 py-4 font-medium">Year</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {projects.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-sm text-zinc-500">
                  No projects found. Click &quot;New&quot; to create one.
                </td>
              </tr>
            ) : (
              projects.map((project) => {
                const titleText = t(project.title, locale);
                const isConfirming = deletingSlug === project.slug;

                return (
                  <tr
                    key={project.slug}
                    className="group hover:bg-white/[0.01] transition-colors duration-150"
                  >
                    {/* Title & Slug */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
                          {titleText}
                        </span>
                        <span className="font-mono text-xs text-zinc-500 mt-0.5">
                          /{project.slug}
                        </span>
                      </div>
                    </td>

                    {/* Status badge */}
                    <td className="px-6 py-4">
                      {project.status === "published" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-teal-400 bg-teal-400/5 border border-teal-400/20 rounded-full">
                          <Eye size={12} />
                          Published
                        </span>
                      ) : project.status === "draft" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-amber-400 bg-amber-400/5 border border-amber-400/20 rounded-full">
                          <EyeOff size={12} />
                          Draft
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-zinc-400 bg-zinc-800 border border-zinc-700 rounded-full">
                          <EyeOff size={12} />
                          Archived
                        </span>
                      )}
                    </td>

                    {/* Featured Status */}
                    <td className="px-6 py-4">
                      {project.featured ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-cyan-400 bg-cyan-400/5 border border-cyan-400/20 rounded-full">
                          <CheckCircle2 size={12} />
                          Featured ({project.featuredOrder})
                        </span>
                      ) : (
                        <span className="text-zinc-600 font-mono">—</span>
                      )}
                    </td>

                    {/* Year */}
                    <td className="px-6 py-4 text-sm text-zinc-300 font-mono">
                      {project.year ?? "—"}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      {isConfirming ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            disabled={isDeleting}
                            onClick={() => handleDelete(project.slug)}
                            className="inline-flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-xs font-medium rounded transition duration-150 disabled:opacity-50 cursor-pointer"
                          >
                            {isDeleting ? (
                              <Loader2 size={12} className="animate-spin" />
                            ) : (
                              <Trash2 size={12} />
                            )}
                            Confirm
                          </button>
                          <button
                            disabled={isDeleting}
                            onClick={() => setDeletingSlug(null)}
                            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1.5 text-xs font-medium rounded border border-zinc-700 transition duration-150 disabled:opacity-50 cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                          <Link
                            href={`/admin/projects/${project.slug}`}
                            className="inline-flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white px-3 py-1.5 text-xs font-medium border border-zinc-800 hover:border-zinc-700 transition duration-150 rounded cursor-pointer"
                          >
                            <Edit2 size={12} />
                            Edit
                          </Link>
                          <button
                            onClick={() => setDeletingSlug(project.slug)}
                            className="inline-flex items-center gap-1.5 bg-transparent hover:bg-red-500/10 text-red-400 hover:text-red-300 px-3 py-1.5 text-xs font-medium border border-red-500/20 hover:border-red-500/30 transition duration-150 rounded cursor-pointer"
                          >
                            <Trash2 size={12} />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
