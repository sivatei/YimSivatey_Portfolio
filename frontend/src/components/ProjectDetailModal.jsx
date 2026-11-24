import { useState, useEffect } from "react";
import { getProjectDetails } from "../data/projectDetails.js";

function DetailSection({ title, children }) {
  if (!children) return null;
  return (
    <div className="space-y-1.5">
      <h4 className="font-mono text-[11px] uppercase tracking-wider text-blue-400">
        {title}
      </h4>
      <div className="text-sm text-slate-300 leading-relaxed">{children}</div>
    </div>
  );
}

export default function ProjectDetailModal({ project, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images =
    Array.isArray(project?.imageUrls) && project.imageUrls.length > 0
      ? project.imageUrls
      : project?.imageUrl
      ? [project.imageUrl]
      : [];

  useEffect(() => {
    setCurrentSlide(0);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  const details = getProjectDetails(project);
  const category = details?.category || project.role || "Software Project";
  const projectType = details?.type || project.role;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl border border-slate-700 bg-surface shadow-2xl animate-slide-up flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Modal Header */}
        <div className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-slate-800 bg-surface/95 px-6 py-4 backdrop-blur-sm">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-wider text-blue-400 truncate">
              {category}
              {projectType ? ` · ${projectType}` : ""}
            </p>
            <h3
              id="project-modal-title"
              className="section-title text-xl sm:text-2xl text-paper mt-0.5 truncate"
            >
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-700 bg-ink p-2 text-slate-400 hover:border-slate-500 hover:text-paper transition-colors shrink-0"
            aria-label="Close project details"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Real Screenshots Gallery */}
        {images.length > 0 && (
          <div className="bg-slate-950 border-b border-slate-800">
            <div className="relative h-56 sm:h-72 w-full overflow-hidden flex items-center justify-center">
              <img
                src={images[currentSlide]}
                alt={`${project.title} screenshot ${currentSlide + 1}`}
                className="h-full w-full object-contain"
              />

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentSlide((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-md border border-slate-700 bg-slate-950/90 p-2 text-paper hover:border-blue-400 transition-colors"
                    aria-label="Previous screenshot"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentSlide((prev) => (prev + 1) % images.length)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-slate-700 bg-slate-950/90 p-2 text-paper hover:border-blue-400 transition-colors"
                    aria-label="Next screenshot"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-800/80 bg-ink/70">
                <div className="flex items-center gap-1.5">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`View screenshot ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === currentSlide
                          ? "w-5 bg-blue-400"
                          : "w-1.5 bg-slate-600 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-mono text-[11px] text-slate-400 tabular-nums">
                  {currentSlide + 1} / {images.length}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-7 space-y-6">
          <DetailSection title="Project Overview">
            <p>{project.description}</p>
          </DetailSection>

          {details?.problem && details?.solution && (
            <div className="grid gap-5 sm:grid-cols-2 rounded-lg border border-slate-800 bg-ink/75 p-5">
              <DetailSection title="Problem Statement">
                <p>{details.problem}</p>
              </DetailSection>
              <DetailSection title="Technical Approach">
                <p>{details.solution}</p>
              </DetailSection>
            </div>
          )}

          {details?.features && details.features.length > 0 && (
            <DetailSection title="Main Features">
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                {details.features.map((feat) => (
                  <li key={feat}>{feat}</li>
                ))}
              </ul>
            </DetailSection>
          )}

          {Array.isArray(project.techStack) && project.techStack.length > 0 && (
            <DetailSection title="Technologies Used">
              <div className="flex flex-wrap gap-2 pt-1">
                {project.techStack.map((tech) => (
                  <span key={tech} className="badge">
                    {tech}
                  </span>
                ))}
              </div>
            </DetailSection>
          )}

          {(details?.architecture || details?.databaseDesign) && (
            <div className="grid gap-5 sm:grid-cols-2 pt-2 border-t border-slate-800/80">
              {details.architecture && (
                <DetailSection title="System Architecture">
                  <p>{details.architecture}</p>
                </DetailSection>
              )}
              {details.databaseDesign && (
                <DetailSection title="Database Design">
                  <p>{details.databaseDesign}</p>
                </DetailSection>
              )}
            </div>
          )}

          {details?.personalContribution && (
            <div className="pt-2 border-t border-slate-800/80">
              <DetailSection title="My Personal Contribution">
                <p>{details.personalContribution}</p>
              </DetailSection>
            </div>
          )}

          {(details?.challenges || details?.outcomes) && (
            <div className="grid gap-5 sm:grid-cols-2 pt-2 border-t border-slate-800/80">
              {details.challenges && (
                <DetailSection title="Challenges & Solutions">
                  <p>{details.challenges}</p>
                </DetailSection>
              )}
              {details.outcomes && (
                <DetailSection title="Results & Learning Outcomes">
                  <p>{details.outcomes}</p>
                </DetailSection>
              )}
            </div>
          )}

          {/* Links Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-slate-800">
            <span className="font-mono text-xs text-slate-400">
              {!project.githubUrl && !project.liveUrl
                ? "Repository / live demo not publicly hosted yet."
                : "Project Links"}
            </span>
            <div className="flex flex-wrap gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary text-xs py-2 px-4"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub Repository
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary text-xs py-2 px-4"
                >
                  Live Demo &rarr;
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
