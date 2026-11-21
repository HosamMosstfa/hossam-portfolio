import { useState, useMemo } from "react";
import {
  Award,
  Layers,
  ExternalLink,
  Sparkles,
  ArrowUpDown,
  ChevronDown,
  RotateCcw,
} from "lucide-react";
import RevealSection from "../common/RevealSection";
import SpotlightCard from "../common/SpotlightCard";
import SmartPoolVisualPreview from "../common/SmartPoolVisualPreview";
import { GithubIcon } from "../common/Icons";
import { PROJECTS } from "../../data/portfolioData";

const CATEGORIES = ["All", "Full Stack & AI", "Back-End & .NET", "Front-End"];

const SORT_OPTIONS = [
  { id: "featured", label: "Featured First" },
  { id: "newest", label: "Newest First" },
  { id: "oldest", label: "Oldest First" },
];

export default function ProjectsSection({ onSelectProject }) {
  const [projectFilter, setProjectFilter] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const filteredAndSortedProjects = useMemo(() => {
    const filtered =
      projectFilter === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === projectFilter);

    return [...filtered].sort((a, b) => {
      if (sortBy === "newest") {
        return (b.sortDate || "").localeCompare(a.sortDate || "");
      }
      if (sortBy === "oldest") {
        return (a.sortDate || "").localeCompare(b.sortDate || "");
      }
      const priorityA = a.priority ?? (a.featured ? 10 : 99);
      const priorityB = b.priority ?? (b.featured ? 10 : 99);
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      return (b.sortDate || "").localeCompare(a.sortDate || "");
    });
  }, [projectFilter, sortBy]);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-b border-[#2B2D31]/15 py-14 dark:border-[#D9DADC]/15"
    >
      <RevealSection>
        {/* Row 1: Clean Title & Subtitle */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="projects-heading"
              className="text-2xl font-extrabold tracking-tight text-[#2B2D31] dark:text-[#D9DADC] sm:text-3xl"
            >
              Selected Engineering Projects
            </h2>
            <p className="mt-1.5 text-sm text-[#2B2D31]/80 dark:text-[#D9DADC]/80">
              Filter by domain, sort by timeline, or inspect system
              architecture.
            </p>
          </div>

          <span className="font-mono text-xs font-semibold text-[#2B2D31]/75 dark:text-[#D9DADC]/75">
            Showing {filteredAndSortedProjects.length} of {PROJECTS.length}{" "}
            builds
          </span>
        </div>

        {/* Row 2: Unified Control Toolbar (Filters Left | Sort Right) */}
        <div className="mt-6 flex flex-col justify-between gap-3 rounded-2xl border border-[#2B2D31]/15 bg-[#2B2D31]/5 p-2.5 backdrop-blur-sm dark:border-[#D9DADC]/15 dark:bg-[#D9DADC]/5 sm:flex-row sm:items-center">
          {/* Segmented Category Filter Pills */}
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-1.5"
          >
            {CATEGORIES.map((cat) => {
              const isActive = projectFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setProjectFilter(cat)}
                  className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#FFC93C] text-[#2B2D31] shadow-sm"
                      : "text-[#2B2D31]/80 hover:bg-[#2B2D31]/10 hover:text-[#2B2D31] dark:text-[#D9DADC]/80 dark:hover:bg-[#D9DADC]/10 dark:hover:text-[#D9DADC]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Sleek Sort Dropdown */}
          <div className="relative flex items-center self-start sm:self-auto">
            <ArrowUpDown
              aria-hidden="true"
              className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-[#2B2D31] dark:text-[#FFC93C]"
            />
            <select
              aria-label="Sort projects"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="cursor-pointer appearance-none rounded-xl border border-[#2B2D31]/20 bg-[#D9DADC] py-2 pl-8 pr-9 text-xs font-bold text-[#2B2D31] transition hover:border-[#FFC93C] focus:border-[#FFC93C] focus:outline-none dark:border-[#D9DADC]/20 dark:bg-[#2B2D31] dark:text-[#D9DADC]"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  Sort: {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-3 h-3.5 w-3.5 opacity-70"
            />
          </div>
        </div>
      </RevealSection>

      {/* Projects Grid or Empty State */}
      {filteredAndSortedProjects.length === 0 ? (
        <div className="mt-7 rounded-2xl border border-dashed border-[#2B2D31]/25 bg-[#2B2D31]/[0.03] p-10 text-center dark:border-[#D9DADC]/20 dark:bg-[#D9DADC]/[0.03]">
          <p className="text-sm font-bold text-[#2B2D31] dark:text-[#D9DADC]">
            No projects found in &ldquo;{projectFilter}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setProjectFilter("All");
              setSortBy("featured");
            }}
            className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-[#FFC93C] px-4 py-2 text-xs font-extrabold text-[#2B2D31] transition hover:opacity-90"
          >
            <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      ) : (
        <div className="mt-7 grid gap-6 md:grid-cols-2">
          {filteredAndSortedProjects.map((project, index) => (
            <RevealSection
              key={project.id ?? project.title}
              delay={index * 70}
              className={project.hasVisualPreview ? "md:col-span-2" : ""}
            >
              <SpotlightCard className="group flex h-full flex-col justify-between rounded-2xl border border-[#2B2D31]/20 bg-[#2B2D31] p-6 text-[#D9DADC] shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#FFC93C] dark:border-[#D9DADC]/20 dark:bg-[#D9DADC] dark:text-[#2B2D31]">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-[#FFC93C] px-2.5 py-1 font-mono text-xs font-extrabold text-[#2B2D31]">
                      {project.hasVisualPreview && (
                        <Award aria-hidden="true" className="h-3.5 w-3.5" />
                      )}
                      <span>{project.badge}</span>
                    </span>
                    <span className="font-mono text-xs font-semibold opacity-75">
                      {project.period}
                    </span>
                  </div>

                  <div
                    className={
                      project.hasVisualPreview
                        ? "mt-4 grid gap-6 lg:grid-cols-12 lg:items-center"
                        : ""
                    }
                  >
                    <div
                      className={
                        project.hasVisualPreview ? "lg:col-span-5" : ""
                      }
                    >
                      <h3 className="mt-2 text-xl font-extrabold leading-snug">
                        {project.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed opacity-90">
                        {project.description}
                      </p>

                      {Array.isArray(project.highlights) &&
                        project.highlights.length > 0 && (
                          <ul className="mt-4 space-y-2 text-xs leading-relaxed opacity-85">
                            {project.highlights.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span
                                  aria-hidden="true"
                                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFC93C]"
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                    </div>

                    {project.hasVisualPreview && (
                      <div className="lg:col-span-7">
                        <SmartPoolVisualPreview
                          compact
                          screenshots={project.screenshots || []}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 border-t border-[#D9DADC]/15 pt-4 dark:border-[#2B2D31]/15">
                  <ul
                    aria-label={`${project.title} tech stack`}
                    className="flex flex-wrap gap-1.5"
                  >
                    {(project.techStack || []).map((tech) => (
                      <li key={tech}>
                        <span className="inline-block rounded border border-[#D9DADC]/20 bg-[#D9DADC]/10 px-2 py-0.5 font-mono text-[11px] font-medium dark:border-[#2B2D31]/20 dark:bg-[#2B2D31]/10">
                          {tech}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#FFC93C] px-3 py-1.5 text-xs font-extrabold text-[#2B2D31] transition hover:opacity-90"
                    >
                      <Layers aria-hidden="true" className="h-3.5 w-3.5" />
                      <span>
                        {project.hasVisualPreview
                          ? "Inspect Visuals & Architecture"
                          : "Inspect Architecture"}
                      </span>
                    </button>

                    <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-md border border-[#D9DADC]/25 px-2.5 py-1 opacity-90 transition hover:border-[#FFC93C] hover:text-[#FFC93C] dark:border-[#2B2D31]/25 dark:hover:bg-[#2B2D31] dark:hover:text-[#FFC93C]"
                        >
                          <GithubIcon
                            aria-hidden="true"
                            className="h-3.5 w-3.5"
                          />
                          <span>GitHub Repo</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-md border border-[#FFC93C] bg-[#FFC93C]/10 px-2.5 py-1 text-[#FFC93C] transition hover:bg-[#FFC93C] hover:text-[#2B2D31] dark:border-[#2B2D31] dark:bg-[#2B2D31] dark:text-[#FFC93C] dark:hover:bg-[#FFC93C] dark:hover:text-[#2B2D31]"
                        >
                          <ExternalLink
                            aria-hidden="true"
                            className="h-3.5 w-3.5"
                          />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {!project.githubUrl && !project.liveUrl && (
                        <span className="inline-flex items-center gap-1 font-mono text-[11px] opacity-75">
                          <Sparkles
                            aria-hidden="true"
                            className="h-3.5 w-3.5 text-[#FFC93C]"
                          />
                          <span>Visual Case Study</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </RevealSection>
          ))}
        </div>
      )}
    </section>
  );
}
