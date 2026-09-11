import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="grid gap-6">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-200">new project</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Create case study</h1>
      </div>
      <ProjectForm mode="create" />
    </div>
  );
}
