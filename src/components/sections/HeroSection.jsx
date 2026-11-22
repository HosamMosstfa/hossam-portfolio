import { useState, useEffect } from 'react';
import {
  MapPin,
  Code2,
  FileText,
  Award,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Maximize2,
  X,
} from 'lucide-react';
import RevealSection from '../common/RevealSection';
import SpotlightCard from '../common/SpotlightCard';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import { PERSONAL_INFO, ROLE_PERSPECTIVES, PROJECTS } from '../../data/portfolioData';

/* ---------- shared class strings ---------- */
const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B2D31] dark:focus-visible:outline-[#FFC93C]';

const BTN_BASE =
  'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs sm:text-sm transition motion-safe:hover:-translate-y-0.5 ' +
  FOCUS;

const BTN_PRIMARY = `${BTN_BASE} bg-[#FFC93C] font-extrabold text-[#2B2D31] shadow-md hover:opacity-95`;

const BTN_DARK = `${BTN_BASE} bg-[#2B2D31] font-bold text-[#D9DADC] hover:ring-2 hover:ring-[#FFC93C] dark:bg-[#D9DADC] dark:text-[#2B2D31]`;

const BTN_OUTLINE = `${BTN_BASE} border border-[#2B2D31]/25 bg-[#2B2D31]/10 px-3 font-bold text-[#2B2D31] hover:border-[#FFC93C] hover:bg-[#FFC93C] hover:text-[#2B2D31] dark:border-[#D9DADC]/25 dark:bg-[#D9DADC]/10 dark:text-[#D9DADC] dark:hover:border-[#FFC93C] dark:hover:bg-[#2B2D31] dark:hover:text-[#FFC93C]`;

/* ---------- small presentational pieces ---------- */
function Credential({ icon: Icon, title, text }) {
  return (
    <li className="flex items-start gap-2.5">
      <span
        aria-hidden="true"
        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#FFC93C] text-[#2B2D31] shadow-2xs"
      >
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0">
        <p className="text-[13px] font-bold leading-snug text-white dark:text-[#2B2D31]">{title}</p>
        <p className="text-[11px] leading-snug text-[#D9DADC]/75 dark:text-[#2B2D31]/75">{text}</p>
      </div>
    </li>
  );
}

function Metric({ value, label }) {
  return (
    <div className="px-1.5">
      <p className="font-mono text-sm font-extrabold text-[#FFC93C] dark:text-[#2B2D31] sm:text-base">
        {value}
      </p>
      <p className="mt-0.5 text-[10px] leading-tight text-[#D9DADC]/70 dark:text-[#2B2D31]/75">
        {label}
      </p>
    </div>
  );
}

function initials(name) {
  if (!name || typeof name !== 'string') return 'HF';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return 'HF';
  const first = parts[0]?.[0] || '';
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] || '' : '';
  return (first + last || 'HF').toUpperCase();
}

export default function HeroSection({ region, roleKey, setRoleKey, onOpenCv }) {
  const activeRole = ROLE_PERSPECTIVES[roleKey] || Object.values(ROLE_PERSPECTIVES)[0];
  const [imgError, setImgError] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  const liveProjects = PROJECTS.filter((p) => p.liveUrl).length;
  const hasValidAvatar = !imgError && Boolean(PERSONAL_INFO.avatar);

  // Close modal with Escape key and lock background scroll while open
  useEffect(() => {
    if (!isAvatarOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsAvatarOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAvatarOpen]);

  return (
    <>
      <section
        aria-labelledby="hero-title"
        className="border-b border-[#2B2D31]/15 py-8 dark:border-[#D9DADC]/15 sm:py-11 lg:py-12"
      >
        <RevealSection>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-8">
            {/* ---------- Left: intro, role switcher, CTAs ---------- */}
            <div className="flex min-w-0 flex-col justify-between lg:col-span-7 xl:col-span-8">
              <div>
                {/* status + location */}
                <div className="mb-3.5 flex flex-col items-start gap-2 text-xs font-bold sm:flex-row sm:flex-wrap sm:items-center sm:gap-2.5">
                  <span className="inline-flex max-w-full items-center gap-2 rounded-2xl bg-[#FFC93C] px-3 py-1 text-left leading-snug text-[#2B2D31] shadow-sm sm:rounded-full">
                    <span aria-hidden="true" className="relative flex h-2 w-2 shrink-0">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-[#2B2D31] opacity-60 motion-safe:animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2B2D31]" />
                    </span>
                    {region.availability}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2B2D31]/20 bg-[#2B2D31]/10 px-3 py-1 text-[#2B2D31] dark:border-[#D9DADC]/25 dark:bg-[#D9DADC]/10 dark:text-[#D9DADC]">
                    <MapPin
                      aria-hidden="true"
                      className="h-3.5 w-3.5 shrink-0 text-[#2B2D31] dark:text-[#FFC93C]"
                    />
                    {region.location}
                  </span>
                </div>

                <h1
                  id="hero-title"
                  className="break-words text-3xl font-extrabold leading-[1.1] tracking-tight text-[#2B2D31] dark:text-[#D9DADC] sm:text-4xl lg:text-[2.85rem]"
                >
                  {PERSONAL_INFO.name}
                </h1>

                {/* role switcher */}
                <div className="mt-4">
                  <p
                    id="role-switch-label"
                    className="mb-1.5 font-mono text-[11px] text-[#2B2D31]/75 dark:text-[#D9DADC]/75"
                  >
                    Select recruiter perspective:
                  </p>
                  <div
                    role="group"
                    aria-labelledby="role-switch-label"
                    className="grid w-full grid-cols-3 gap-1 rounded-xl border border-[#2B2D31]/20 bg-[#2B2D31]/10 p-1 backdrop-blur-sm dark:border-[#D9DADC]/20 dark:bg-[#D9DADC]/10 sm:inline-flex sm:w-auto sm:gap-1"
                  >
                    {Object.values(ROLE_PERSPECTIVES).map((role) => {
                      const active = roleKey === role.id;
                      return (
                        <button
                          key={role.id}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setRoleKey(role.id)}
                          className={`rounded-lg px-2 py-2 text-center text-xs font-bold leading-tight transition-all sm:px-3.5 sm:py-1.5 ${FOCUS} ${
                            active
                              ? 'bg-[#FFC93C] text-[#2B2D31] shadow-sm'
                              : 'text-[#2B2D31]/80 hover:bg-[#2B2D31]/10 dark:text-[#D9DADC]/85 dark:hover:bg-[#D9DADC]/10'
                          }`}
                        >
                          {role.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <h2 className="mt-4 inline-block max-w-full rounded-lg bg-[#2B2D31] px-3 py-1 text-base font-extrabold text-[#FFC93C] dark:bg-transparent dark:px-0 dark:py-0 sm:text-xl">
                  {activeRole.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#2B2D31]/90 dark:text-[#D9DADC]/90">
                  {activeRole.summary}
                </p>

                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Core focus">
                  {activeRole.coreFocus.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-[#2B2D31]/20 bg-[#2B2D31]/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-[#2B2D31] transition motion-safe:hover:-translate-y-0.5 hover:border-[#FFC93C] hover:bg-[#FFC93C] hover:text-[#2B2D31] dark:border-[#D9DADC]/20 dark:bg-[#D9DADC]/10 dark:text-[#D9DADC] dark:hover:border-[#FFC93C] dark:hover:bg-[#2B2D31] dark:hover:text-[#FFC93C]"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTAs: single clean row on desktop */}
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
                <a href="#projects" className={`${BTN_PRIMARY} w-full sm:w-auto`}>
                  <Code2 aria-hidden="true" className="h-4 w-4 shrink-0" />
                  <span>Explore Projects</span>
                </a>
                <button type="button" onClick={onOpenCv} className={`${BTN_DARK} w-full sm:w-auto`}>
                  <FileText aria-hidden="true" className="h-4 w-4 shrink-0" />
                  <span>
                    <span className="sm:hidden">CV · {activeRole.label}</span>
                    <span className="hidden sm:inline">Preview CV ({activeRole.label})</span>
                  </span>
                </button>
                <div className="grid grid-cols-2 gap-2.5 sm:flex sm:gap-2">
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile (opens in a new tab)"
                    className={BTN_OUTLINE}
                  >
                    <GithubIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile (opens in a new tab)"
                    className={BTN_OUTLINE}
                  >
                    <LinkedinIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* ---------- Right: balanced executive card ---------- */}
            <SpotlightCard className="flex min-w-0 flex-col justify-between rounded-2xl border border-[#2B2D31]/20 bg-[#2B2D31] p-5 text-[#D9DADC] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#FFC93C] dark:border-[#D9DADC]/20 dark:bg-[#D9DADC] dark:text-[#2B2D31] lg:col-span-5 xl:col-span-4">
              {/* Top: Interactive Portrait + Role */}
              <div className="flex items-center gap-4">
                <div className="relative h-24 w-24 shrink-0">
                  <button
                    type="button"
                    disabled={!hasValidAvatar}
                    onClick={() => hasValidAvatar && setIsAvatarOpen(true)}
                    aria-label="View full profile photo"
                    title={hasValidAvatar ? 'Click to enlarge photo' : undefined}
                    className={`group relative h-full w-full overflow-hidden rounded-2xl bg-[#E5E7EB] ring-2 ring-[#FFC93C] ring-offset-2 ring-offset-[#2B2D31] dark:ring-[#2B2D31] dark:ring-offset-[#D9DADC] ${
                      hasValidAvatar ? 'cursor-zoom-in transition hover:ring-4' : 'cursor-default'
                    } ${FOCUS}`}
                  >
                    {hasValidAvatar ? (
                      <>
                        <img
                          src={PERSONAL_INFO.avatar}
                          alt={PERSONAL_INFO.name}
                          width={192}
                          height={192}
                          fetchPriority="high"
                          decoding="sync"
                          onError={() => setImgError(true)}
                          className="h-full w-full object-cover object-[center_15%] [backface-visibility:hidden] [transform:translateZ(0)]"
                        />
                        {/* Subtle hover overlay indicating zoom */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 flex items-center justify-center bg-[#141619]/45 opacity-0 backdrop-blur-[1px] transition-opacity duration-200 group-hover:opacity-100"
                        >
                          <Maximize2 className="h-5 w-5 text-[#FFC93C]" />
                        </span>
                      </>
                    ) : (
                      <div
                        aria-hidden="true"
                        className="flex h-full w-full items-center justify-center font-mono text-xl font-extrabold text-[#FFC93C] dark:text-[#2B2D31]"
                      >
                        {initials(PERSONAL_INFO.name)}
                      </div>
                    )}
                  </button>

                  <span
                    title="Open to work"
                    className="pointer-events-none absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-lg border-2 border-[#2B2D31] bg-[#FFC93C] text-[#2B2D31] dark:border-[#D9DADC]"
                  >
                    <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5" />
                    <span className="sr-only">Open to work</span>
                  </span>
                </div>

                <div className="min-w-0">
                  <span className="inline-flex items-center gap-1 rounded bg-[#FFC93C] px-2 py-0.5 font-mono text-[10px] font-extrabold uppercase tracking-wider text-[#2B2D31]">
                    <Sparkles aria-hidden="true" className="h-3 w-3" />
                    <span>Engineering Profile</span>
                  </span>
                  <p className="mt-1 text-sm font-extrabold leading-snug text-white dark:text-[#2B2D31] sm:text-base">
                    {activeRole.title}
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] text-[#D9DADC]/75 dark:text-[#2B2D31]/75">
                    B.Sc. CS · Full Stack .NET Track
                  </p>
                </div>
              </div>

              {/* Middle: Quick Metrics */}
              <div className="my-4 grid grid-cols-3 divide-x divide-[#D9DADC]/15 rounded-xl border border-[#D9DADC]/15 bg-[#16181B]/70 py-2.5 text-center dark:divide-[#2B2D31]/15 dark:border-[#2B2D31]/15 dark:bg-[#2B2D31]/10">
                <Metric value={liveProjects} label="Live Projects" />
                <Metric value="3rd" label="Google DevFest" />
                <Metric value="ITI" label=".NET Alumni" />
              </div>

              {/* Bottom: Credentials */}
              <div className="border-t border-[#D9DADC]/15 pt-4 dark:border-[#2B2D31]/15">
                <ul className="grid gap-3 text-sm md:grid-cols-2 lg:grid-cols-1">
                  <Credential
                    icon={Award}
                    title="3rd Place · Google DevFest"
                    text="SMARTPOOL AI Drowning Detection (Assiut)"
                  />
                  <Credential
                    icon={GraduationCap}
                    title="Full Stack .NET Track"
                    text="ITI intensive track · NutriGuide graduation project"
                  />
                  <Credential
                    icon={ShieldCheck}
                    title="B.Sc. Computer Science"
                    text="Egyptian E-Learning University"
                  />
                </ul>
              </div>
            </SpotlightCard>
          </div>
        </RevealSection>
      </section>

      {/* ---------- Full-Resolution Portrait Lightbox Modal ---------- */}
      {isAvatarOpen && hasValidAvatar && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="avatar-modal-title"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 px-4 pb-6 pt-20 backdrop-blur-sm"
          onClick={() => setIsAvatarOpen(false)}
        >
          <div
            className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-[#FFC93C]/50 bg-[#141619] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between gap-3 border-b border-[#D9DADC]/15 bg-[#1B1D20] px-4 py-3">
              <div className="min-w-0">
                <h3 id="avatar-modal-title" className="truncate text-sm font-extrabold text-white">
                  {PERSONAL_INFO.name}
                </h3>
                <p className="truncate font-mono text-[11px] text-[#FFC93C]">
                  {activeRole.title} · {region.location}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAvatarOpen(false)}
                aria-label="Close photo preview"
                className={`shrink-0 rounded-lg bg-[#2B2D31] p-1.5 text-[#D9DADC] transition hover:bg-[#FFC93C] hover:text-[#2B2D31] ${FOCUS}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Full Portrait Image */}
            <div className="flex items-center justify-center bg-[#E5E7EB]">
              <img
                src={PERSONAL_INFO.avatar}
                alt={PERSONAL_INFO.name}
                className="max-h-[58vh] w-full object-contain"
              />
            </div>

            {/* Footer Caption */}
            <div className="flex items-center justify-between border-t border-[#D9DADC]/15 bg-[#1B1D20] px-4 py-2.5 font-mono text-[11px] text-[#D9DADC]/80">
              <span>B.Sc. CS · Full Stack .NET Track</span>
              <span className="text-[#FFC93C]">ESC to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
