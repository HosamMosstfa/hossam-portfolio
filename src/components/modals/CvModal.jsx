import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Printer, X } from "lucide-react";
import {
  PERSONAL_INFO,
  ROLE_PERSPECTIVES,
  PROJECTS,
  SKILLS_GROUPS,
  EXPERIENCE,
  EDUCATION,
} from "../../data/portfolioData";

/* ---------- tweakables ---------- */
const MAX_PROJECTS = 5; // projects shown on the CV
const MAX_POINTS = 1; // bullet points per experience (raise to 2 if the page still fits)
const LINKEDIN = PERSONAL_INFO.linkedin || "linkedin.com/in/hosammostfa";
const GITHUB = PERSONAL_INFO.github || "github.com/HosamMosstfa";

/* ---------- print rules (self-contained, no external CSS needed) ----------
   The modal is rendered in a portal on <body>, so on print we can simply hide
   every other direct child of <body>. That removes the blank pages the old
   "visibility: hidden" trick usually produces. */
const PRINT_CSS = `
@page { size: A4; margin: 11mm 12mm; }
@media print {
  html, body { background: #fff !important; }
  body > *:not(#cv-modal-backdrop) { display: none !important; }
  #cv-modal-backdrop {
    position: static !important; display: block !important; padding: 0 !important;
    background: #fff !important; backdrop-filter: none !important;
  }
  #cv-modal-box {
    max-height: none !important; overflow: visible !important; border: 0 !important;
    border-radius: 0 !important; box-shadow: none !important; max-width: none !important;
    animation: none !important;
  }
  #printable-cv {
    padding: 0 !important; color: #000 !important;
    font-family: Arial, Helvetica, sans-serif !important; font-size: 10pt !important;
    line-height: 1.35 !important;
  }
  #printable-cv h1 { font-size: 20pt !important; }
  .no-print { display: none !important; }
  .cv-item { break-inside: avoid; page-break-inside: avoid; }
  .cv-section > h2 { break-after: avoid; }
  a { color: inherit !important; text-decoration: none !important; }
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
`;

/* ---------- small helpers ---------- */
const absUrl = (u) => (/^(https?:|mailto:|tel:)/.test(u) ? u : `https://${u}`);
const prettyUrl = (u) =>
  u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
const telHref = (p) => `tel:${String(p).replace(/[^\d+]/g, "")}`;

function Section({ title, children }) {
  return (
    <section className="cv-section mt-4">
      <h2 className="border-b border-black pb-0.5 font-bold text-black">
        {title}
      </h2>
      <div className="mt-1.5">{children}</div>
    </section>
  );
}

/* One plain line: "Title | Place | Date". Keeping the date on the same line
   (not right-aligned in a separate cell) is what ATS parsers read best. */
function Line({ parts }) {
  return (
    <p className="font-bold text-black">{parts.filter(Boolean).join(" | ")}</p>
  );
}

function Segmented({ children }) {
  return (
    <div className="inline-flex overflow-hidden rounded-lg border border-[#2B2D31]/25 bg-white">
      {children}
    </div>
  );
}

function SegButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`px-3 py-1.5 text-xs font-bold transition-colors ${
        active
          ? "bg-[#2B2D31] text-[#FFC93C]"
          : "text-[#2B2D31] hover:bg-[#2B2D31]/10"
      }`}
    >
      {children}
    </button>
  );
}

export default function CvModal({
  isOpen,
  onClose,
  roleKey,
  setRoleKey,
  regionKey,
  setRegionKey,
}) {
  const closeRef = useRef(null);

  // Escape to close, lock page scroll, focus the close button
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  const region = PERSONAL_INFO.regions[regionKey];
  const activeRole = ROLE_PERSPECTIVES[roleKey];

  const contact = [
    <span key="loc">{region.location}</span>,
    <a key="tel" href={telHref(region.phone)}>
      {region.phone}
    </a>,
    <a key="mail" href={`mailto:${PERSONAL_INFO.email}`}>
      {PERSONAL_INFO.email}
    </a>,
    <a key="in" href={absUrl(LINKEDIN)}>
      {prettyUrl(LINKEDIN)}
    </a>,
    <a key="gh" href={absUrl(GITHUB)}>
      {prettyUrl(GITHUB)}
    </a>,
  ];

  return createPortal(
    <div
      id="cv-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-name"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B2D31]/80 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <style>{PRINT_CSS}</style>

      <div
        id="cv-modal-box"
        className="animate-modal-pop max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-[#D9DADC]/30 bg-white text-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ---------- toolbar (never printed) ---------- */}
        <div className="no-print sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-[#2B2D31]/15 bg-[#D9DADC]/95 px-4 py-3 backdrop-blur sm:px-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2B2D31]">
                Role
              </span>
              <Segmented>
                {Object.values(ROLE_PERSPECTIVES).map((r) => (
                  <SegButton
                    key={r.id}
                    active={roleKey === r.id}
                    onClick={() => setRoleKey(r.id)}
                  >
                    {r.label}
                  </SegButton>
                ))}
              </Segmented>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2B2D31]">
                Region
              </span>
              <Segmented>
                {Object.entries(PERSONAL_INFO.regions).map(([key, r]) => (
                  <SegButton
                    key={key}
                    active={regionKey === key}
                    onClick={() => setRegionKey(key)}
                  >
                    {r.label}
                  </SegButton>
                ))}
              </Segmented>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#FFC93C] px-3.5 py-2 text-xs font-extrabold text-[#2B2D31] shadow-sm transition hover:brightness-95"
            >
              <Printer className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Print / Save PDF</span>
            </button>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close CV"
              className="rounded-lg p-1.5 text-[#2B2D31] transition hover:bg-[#2B2D31]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B2D31]"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* ---------- the CV (single column, plain text = ATS-safe) ---------- */}
        <div
          id="printable-cv"
          className="p-6 font-sans text-[13px] leading-snug text-slate-900 sm:p-10"
        >
          <header className="border-b-2 border-black pb-3 text-center">
            <h1
              id="cv-name"
              className="text-[26px] font-bold leading-tight text-black"
            >
              {PERSONAL_INFO.name}
            </h1>
            <p className="mt-0.5 text-[15px] font-semibold text-slate-700">
              {activeRole.title}
            </p>
            <p className="mt-1.5">
              {contact.map((item, i) => (
                <React.Fragment key={item.key}>
                  {i > 0 && " | "}
                  {item}
                </React.Fragment>
              ))}
            </p>
          </header>

          <Section title="Professional Summary">
            <p>
              {activeRole.summary} Based in {region.location}, seeking a{" "}
              {activeRole.title} role.
            </p>
          </Section>

          <Section title="Technical Skills">
            <div className="space-y-0.5">
              {SKILLS_GROUPS.map((g) => (
                <p key={g.title}>
                  <b>{g.title}:</b> {g.skills.join(", ")}
                </p>
              ))}
            </div>
          </Section>

          <Section title="Projects">
            <div className="space-y-2.5">
              {PROJECTS.slice(0, MAX_PROJECTS).map((proj) => {
                const live = proj.liveUrl || proj.link || proj.demo;
                const repo = proj.githubUrl || proj.github || proj.repo;
                return (
                  <article key={proj.id} className="cv-item">
                    <Line parts={[proj.title, proj.period]} />
                    <p>{proj.description}</p>
                    {live || repo ? (
                      <p>
                        {live ? (
                          <>
                            <b>Live:</b>{" "}
                            <a href={absUrl(live)}>{prettyUrl(live)}</a>
                          </>
                        ) : null}
                        {live && repo ? " | " : null}
                        {repo ? (
                          <>
                            <b>GitHub:</b>{" "}
                            <a href={absUrl(repo)}>{prettyUrl(repo)}</a>
                          </>
                        ) : null}
                      </p>
                    ) : null}
                    <p>
                      <b>Tech Stack:</b> {proj.techStack.join(", ")}
                    </p>
                  </article>
                );
              })}
            </div>
          </Section>

          <Section title="Professional Experience">
            <div className="space-y-2.5">
              {EXPERIENCE.map((exp, i) => (
                <article key={i} className="cv-item">
                  <Line
                    parts={[exp.role, exp.company, exp.location, exp.period]}
                  />
                  <ul className="list-disc pl-5">
                    {exp.points.slice(0, MAX_POINTS).map((p, j) => (
                      <li key={j}>{p}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Section>

          <Section title="Education">
            <div className="space-y-1.5">
              {EDUCATION.map((edu, i) => (
                <article key={i} className="cv-item">
                  <Line parts={[edu.degree, edu.institution, edu.period]} />
                </article>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>,
    document.body,
  );
}
