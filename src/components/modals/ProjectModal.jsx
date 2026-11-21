import { X, Database, Server, Layout, Cpu, ExternalLink } from "lucide-react";
import SmartPoolVisualPreview from "../common/SmartPoolVisualPreview";
import { GithubIcon } from "../common/Icons";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B2D31]/80 p-4 backdrop-blur-sm no-print"
      onClick={onClose}
    >
      <div
        className="animate-modal-pop max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#FFC93C]/40 bg-[#D9DADC] p-6 text-[#2B2D31] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#2B2D31]/15 pb-4">
          <div>
            <span className="inline-block rounded bg-[#2B2D31] px-2 py-0.5 font-mono text-xs font-bold text-[#FFC93C]">
              {project.badge}
            </span>
            <h3 className="mt-1.5 text-xl font-extrabold text-[#2B2D31]">
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-1.5 text-[#2B2D31] hover:bg-[#2B2D31]/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {project.hasVisualPreview && (
          <div className="mt-4">
            <SmartPoolVisualPreview />
          </div>
        )}

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {Object.entries(project.architecture).map(([layer, detail]) => (
            <div
              key={layer}
              className="rounded-xl border border-[#2B2D31]/15 bg-[#2B2D31] p-4 text-[#D9DADC]"
            >
              <div className="flex items-center gap-2 font-mono text-xs font-bold capitalize text-[#FFC93C]">
                {layer === "database" ? (
                  <Database className="h-3.5 w-3.5" />
                ) : layer === "backend" ? (
                  <Server className="h-3.5 w-3.5" />
                ) : layer === "frontend" ? (
                  <Layout className="h-3.5 w-3.5" />
                ) : (
                  <Cpu className="h-3.5 w-3.5" />
                )}
                <span>{layer} Layer</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#D9DADC]/90">
                {detail}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#2B2D31]/15 pt-4">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((t) => (
              <span
                key={t}
                className="rounded bg-[#2B2D31]/10 px-2 py-0.5 font-mono text-xs font-semibold text-[#2B2D31]"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#FFC93C] px-3.5 py-2 text-xs font-extrabold text-[#2B2D31] hover:opacity-90"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Live Demo</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#2B2D31] px-4 py-2 text-xs font-bold text-[#D9DADC] hover:opacity-90"
              >
                <GithubIcon className="h-4 w-4" />
                <span>GitHub Repo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
