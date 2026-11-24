import { getProjectDetails } from "../data/projectDetails.js";

export default function ProjectCard({
  project,
  isAdmin,
  onEdit,
  onDelete,
  onClick,
  spotlight = false,
  compact = false,
}) {
  const details = getProjectDetails(project);
  const category = details?.category || project.role || "Software Project";
  const previewImage =
    (project.imageUrls && project.imageUrls.length > 0 && project.imageUrls[0]) ||
    project.imageUrl ||
    "";
  const techStack = Array.isArray(project.techStack) ? project.techStack : [];
  const visibleTech = techStack.slice(0, spotlight ? 6 : compact ? 3 : 4);
  const extraCount = techStack.length - visibleTech.length;

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(project);
    }
  };

  /* ── Flagship Horizontal Split Card (prevents orphan slots in 5-item featured grid) ── */
  if (spotlight) {
    return (
      <article
        onClick={() => onClick(project)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${project.title}`}
        className="md:col-span-2 panel-card panel-card-hover overflow-hidden group cursor-pointer grid md:grid-cols-12"
      >
        {previewImage && (
          <div className="md:col-span-5 relative aspect-[16/10] md:aspect-auto md:min-h-[260px] bg-slate-950 border-b md:border-b-0 md:border-r border-slate-800 overflow-hidden">
            <img
              src={previewImage}
              alt={`${project.title} preview`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        )}

        <div
          className={`${
            previewImage ? "md:col-span-7" : "md:col-span-12"
          } p-6 sm:p-7 flex flex-col justify-between`}
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-mono text-xs text-blue-400">{category}</p>
              {project.role && (
                <span className="rounded border border-slate-700 bg-ink px-2 py-0.5 font-mono text-[11px] text-slate-300">
                  {project.role}
                </span>
              )}
            </div>

            <h3 className="section-title mt-2 text-xl sm:text-2xl text-paper group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>

            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              {project.description}
            </p>

            {visibleTech.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-1.5">
                {visibleTech.map((tech) => (
                  <span key={tech} className="badge text-[11px]">
                    {tech}
                  </span>
                ))}
                {extraCount > 0 && (
                  <span className="badge text-[11px] text-slate-400">
                    +{extraCount}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <span className="text-slate-300 group-hover:text-blue-400 transition-colors">
              Read case study &rarr;
            </span>
            <div className="flex items-center gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-slate-400 hover:text-paper transition-colors"
                >
                  GitHub
                </a>
              )}
              {isAdmin && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex gap-3 border-l border-slate-800 pl-4"
                >
                  <button
                    type="button"
                    onClick={() => onEdit(project)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(project)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  /* ── Standard / Text-First Engineering Card ── */
  return (
    <article
      onClick={() => onClick(project)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
      className={`panel-card panel-card-hover flex flex-col overflow-hidden group cursor-pointer ${
        !previewImage ? "border-t-2 border-t-blue-500/60" : ""
      }`}
    >
      {/* Only render image banner when a real screenshot exists (no duplicate placeholder boxes) */}
      {previewImage && (
        <div className="relative aspect-[16/10] bg-slate-950 border-b border-slate-800 overflow-hidden">
          <img
            src={previewImage}
            alt={`${project.title} preview`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          {project.role && (
            <span className="absolute top-3 right-3 rounded bg-slate-950/90 border border-slate-700/80 px-2 py-0.5 font-mono text-[10px] text-slate-200">
              {project.role}
            </span>
          )}
        </div>
      )}

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-[11px] text-blue-400">{category}</p>
          {!previewImage && project.role && (
            <span className="rounded border border-slate-700 bg-ink px-2 py-0.5 font-mono text-[10px] text-slate-300">
              {project.role}
            </span>
          )}
        </div>

        <h3 className="section-title mt-1.5 text-base sm:text-lg text-paper group-hover:text-blue-400 transition-colors leading-snug">
          {project.title}
        </h3>

        <p
          className={`mt-2.5 text-xs sm:text-sm text-slate-400 leading-relaxed flex-1 ${
            previewImage ? "line-clamp-3" : ""
          }`}
        >
          {project.description}
        </p>

        {/* Tech stack badges */}
        {visibleTech.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {visibleTech.map((tech) => (
              <span key={tech} className="badge text-[11px]">
                {tech}
              </span>
            ))}
            {extraCount > 0 && (
              <span className="badge text-[11px] text-slate-400">
                +{extraCount}
              </span>
            )}
          </div>
        )}

        {/* Footer link cue */}
        <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400 group-hover:text-blue-400 transition-colors">
            View details &rarr;
          </span>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-slate-400 hover:text-paper transition-colors"
            >
              GitHub
            </a>
          )}
        </div>

        {/* Admin controls */}
        {isAdmin && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-3 flex gap-4 border-t border-slate-800 pt-2.5 font-mono text-xs"
          >
            <button
              type="button"
              onClick={() => onEdit(project)}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(project)}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
