import { useState, useEffect } from "react";

const emptyForm = {
  title: "",
  description: "",
  techStack: "",
  role: "",
  githubUrl: "",
  liveUrl: "",
  imageUrls: "",
  featured: true,
  order: 0,
};

export default function ProjectForm({ initialProject, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialProject) {
      setForm({
        title: initialProject.title || "",
        description: initialProject.description || "",
        techStack: (initialProject.techStack || []).join(", "),
        imageUrls: (initialProject.imageUrls || []).join(", "),
        role: initialProject.role || "",
        githubUrl: initialProject.githubUrl || "",
        liveUrl: initialProject.liveUrl || "",
        featured: initialProject.featured !== false,
        order: initialProject.order ?? 0,
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialProject]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      ...form,
      techStack: form.techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      imageUrls: form.imageUrls
        ? form.imageUrls
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-4 rounded-xl border border-slate-700 bg-surface p-6"
    >
      <p className="font-mono text-xs uppercase tracking-wider text-blue-400">
        {initialProject ? "Edit Project" : "New Project"}
      </p>

      <div>
        <label className="mb-1 block text-xs text-fog uppercase tracking-wider font-mono">
          Title
        </label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-fog uppercase tracking-wider font-mono">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          rows={3}
          className="input-field resize-none"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs text-fog uppercase tracking-wider font-mono">
            Tech Stack (comma separated)
          </label>
          <input
            name="techStack"
            value={form.techStack}
            onChange={handleChange}
            placeholder="React, Express.js, Supabase"
            className="input-field"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-fog uppercase tracking-wider font-mono">
            Role / Type
          </label>
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="Solo Project, Team Project..."
            className="input-field"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs text-fog uppercase tracking-wider font-mono">
            GitHub URL
          </label>
          <input
            name="githubUrl"
            value={form.githubUrl}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-fog uppercase tracking-wider font-mono">
            Live URL
          </label>
          <input
            name="liveUrl"
            value={form.liveUrl}
            onChange={handleChange}
            className="input-field"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 items-end">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs text-fog uppercase tracking-wider font-mono">
            Image URLs (comma separated)
          </label>
          <input
            name="imageUrls"
            value={form.imageUrls}
            onChange={handleChange}
            placeholder="/img1.png, /img2.png"
            className="input-field"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-fog uppercase tracking-wider font-mono">
            Display Order
          </label>
          <input
            type="number"
            name="order"
            value={form.order}
            onChange={handleChange}
            className="input-field"
          />
        </div>
      </div>

      <label className="inline-flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer">
        <input
          type="checkbox"
          name="featured"
          checked={form.featured}
          onChange={handleChange}
          className="rounded border-slate-600 bg-ink text-blue-600 focus:ring-blue-500"
        />
        Display in Featured Engineering Projects (uncheck for UI/UX &amp; Other Projects)
      </label>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary text-xs py-2 px-4 disabled:opacity-50"
        >
          {submitting ? "Saving..." : initialProject ? "Save Changes" : "Create Project"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary text-xs py-2 px-4"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
