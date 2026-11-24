import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  verifyAdminKey,
} from "../api.js";
import ProjectCard from "./ProjectCard.jsx";
import ProjectForm from "./ProjectForm.jsx";
import ProjectDetailModal from "./ProjectDetailModal.jsx";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [errorMsg, setErrorMsg] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [keyInput, setKeyInput] = useState("");
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [adminError, setAdminError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  async function loadProjects() {
    setStatus("loading");
    try {
      const data = await getProjects();
      setProjects(Array.isArray(data) ? data : []);
      setStatus("ready");
    } catch (err) {
      setErrorMsg(err.message);
      setStatus("error");
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function handleUnlock(e) {
    e.preventDefault();
    setAdminError("");
    if (!keyInput.trim()) {
      setAdminError("Please enter an admin key.");
      return;
    }
    try {
      await verifyAdminKey(keyInput);
      setAdminKey(keyInput);
      setIsAdmin(true);
      setShowAdminInput(false);
    } catch (err) {
      setAdminError(err.message || "Invalid admin key.");
    }
  }

  async function handleCreateOrUpdate(formData) {
    setSubmitting(true);
    setAdminError("");
    try {
      if (editingProject) {
        await updateProject(editingProject._id, formData, adminKey);
      } else {
        await createProject(formData, adminKey);
      }
      setShowForm(false);
      setEditingProject(null);
      await loadProjects();
    } catch (err) {
      setAdminError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(project) {
    if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    setAdminError("");
    try {
      await deleteProject(project._id, adminKey);
      await loadProjects();
    } catch (err) {
      setAdminError(err.message);
    }
  }

  const featuredProjects = projects.filter((p) => p.featured !== false);
  const otherProjects = projects.filter((p) => p.featured === false);

  return (
    <section id="projects" className="border-b border-slate-800/80">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">03 / Projects</p>
            <h2 className="section-title mt-2 text-2xl sm:text-3xl text-paper">
              Selected Software Projects
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Full-stack, mobile, embedded systems, and frontend projects. Select any project to
              review its architecture, personal contributions, and technical details.
            </p>
          </div>

          {/* Unobtrusive Admin Controls */}
          <div className="flex items-center gap-2">
            {!isAdmin ? (
              showAdminInput ? (
                <form onSubmit={handleUnlock} className="flex items-center gap-2">
                  <input
                    type="password"
                    placeholder="Admin key"
                    value={keyInput}
                    onChange={(e) => setKeyInput(e.target.value)}
                    className="w-36 rounded-md border border-slate-700 bg-ink px-3 py-1.5 font-mono text-xs text-paper outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="btn-secondary text-xs py-1.5 px-3"
                  >
                    Unlock
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAdminInput(false)}
                    className="font-mono text-xs text-slate-400 hover:text-paper px-1.5"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAdminInput(true)}
                  className="font-mono text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  Manage Projects
                </button>
              )
            ) : (
              <button
                type="button"
                onClick={() => {
                  setShowForm(true);
                  setEditingProject(null);
                }}
                className="btn-primary text-xs py-2 px-4"
              >
                + Add Project
              </button>
            )}
          </div>
        </div>

        {adminError && (
          <p role="alert" className="mt-4 font-mono text-xs text-red-400">
            {adminError}
          </p>
        )}

        {isAdmin && showForm && (
          <ProjectForm
            initialProject={editingProject}
            submitting={submitting}
            onSubmit={handleCreateOrUpdate}
            onCancel={() => {
              setShowForm(false);
              setEditingProject(null);
            }}
          />
        )}

        <div className="mt-10">
          {status === "loading" && (
            <div className="panel-card p-8 flex items-center gap-3 font-mono text-sm text-slate-400">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
              Loading projects...
            </div>
          )}

          {status === "error" && (
            <div className="panel-card border-red-900/50 p-6 font-mono text-xs sm:text-sm text-red-300">
              Could not load projects: {errorMsg}. Please check that the backend API is running and
              VITE_API_URL is configured.
            </div>
          )}

          {status === "ready" && projects.length === 0 && (
            <div className="panel-card p-8 text-center">
              <p className="font-mono text-sm text-slate-400">
                No projects found. Add one using Manage Projects or run{" "}
                <code className="text-blue-400">npm run seed:supabase</code> in the backend.
              </p>
            </div>
          )}

          {status === "ready" && projects.length > 0 && (
            <div className="space-y-14">
              {/* Primary Engineering Projects: Flagship split card + balanced 2-column grid */}
              {featuredProjects.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2">
                  {featuredProjects.map((project, index) => (
                    <ProjectCard
                      key={project._id || project.id}
                      project={project}
                      spotlight={index === 0 && featuredProjects.length % 2 === 1}
                      isAdmin={isAdmin}
                      onEdit={(p) => {
                        setEditingProject(p);
                        setShowForm(true);
                      }}
                      onDelete={handleDelete}
                      onClick={setSelectedProject}
                    />
                  ))}
                </div>
              )}

              {/* Secondary UI/UX & Other Projects */}
              {otherProjects.length > 0 && (
                <div className="pt-12 border-t border-slate-800/80">
                  <div className="mb-6">
                    <h3 className="section-title text-lg sm:text-xl text-paper">
                      UI/UX &amp; Other Projects
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-400">
                      Interface prototypes, design studies, and frontend practice builds.
                    </p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {otherProjects.map((project) => (
                      <ProjectCard
                        key={project._id || project.id}
                        project={project}
                        compact
                        isAdmin={isAdmin}
                        onEdit={(p) => {
                          setEditingProject(p);
                          setShowForm(true);
                        }}
                        onDelete={handleDelete}
                        onClick={setSelectedProject}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
}
