import { BlogForm } from "@/components/admin/BlogForm";

export default function NewBlogPage() {
  return (
    <div className="grid gap-6">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-200">new article</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Write article</h1>
      </div>
      <BlogForm mode="create" />
    </div>
  );
}
