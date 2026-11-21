import { useState } from "react";
import {
  ArrowUp,
  Mail,
  MapPin,
  Copy,
  Check,
  Terminal,
  ExternalLink,
} from "lucide-react";
import { BrandLogo, GithubIcon, LinkedinIcon } from "../common/Icons";
import { PERSONAL_INFO } from "../../data/portfolioData";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

async function copyTextSafe(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const input = document.createElement("textarea");
  input.value = value;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
}

export default function Footer({ showBackToTop }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await copyTextSafe(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PERSONAL_INFO.email}`;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="relative z-10 mt-8 border-t border-[#2B2D31]/20 bg-[#2B2D31]/[0.05] text-[#2B2D31] dark:border-[#D9DADC]/15 dark:bg-[#141619]/80 dark:text-[#D9DADC] no-print">
        {/* Top Accent Line */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="h-[2.5px] w-24 rounded-full bg-[#FFC93C]" />
        </div>

        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          {/* Main 3-Column Grid */}
          <div className="grid gap-10 md:grid-cols-12">
            {/* Column 1: Brand & Engineering Positioning */}
            <div className="space-y-4 md:col-span-5">
              <div className="flex items-center gap-3">
                <BrandLogo className="h-9 w-9 shrink-0" />
                <div>
                  <p className="text-base font-extrabold tracking-tight text-[#2B2D31] dark:text-white">
                    {PERSONAL_INFO.name}
                  </p>
                  <p className="font-mono text-[11px] font-bold text-[#9A6700] dark:text-[#FFC93C]">
                    Full Stack .NET &amp; Front-End Developer
                  </p>
                </div>
              </div>

              <p className="max-w-sm text-xs leading-relaxed text-[#2B2D31]/85 dark:text-[#D9DADC]/75">
                Architecting secure ASP.NET Core backends, relational SQL
                databases, and responsive Angular &amp; React interfaces with
                clean, maintainable code.
              </p>

              {/* Status & Location Pill */}
              <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px]">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2B2D31]/20 bg-white/80 px-3 py-1 font-bold text-[#2B2D31] shadow-2xs dark:border-[#FFC93C]/30 dark:bg-[#FFC93C]/10 dark:text-[#FFC93C]">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"
                  />
                  <span>Open to Full-Time &amp; Remote Roles</span>
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-[#2B2D31]/75 dark:text-[#D9DADC]/70">
                  <MapPin
                    aria-hidden="true"
                    className="h-3.5 w-3.5 text-[#9A6700] dark:text-[#FFC93C]"
                  />
                  <span>Dammam, KSA · Cairo, EG</span>
                </span>
              </div>
            </div>

            {/* Column 2: Quick Navigation */}
            <div className="md:col-span-3">
              <h3 className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#9A6700] dark:text-[#FFC93C]">
                Navigation
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm font-semibold">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="inline-flex items-center gap-2 text-[#2B2D31]/85 transition hover:translate-x-1 hover:text-[#2B2D31] dark:text-[#D9DADC]/80 dark:hover:text-[#FFC93C]"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-[#FFC93C]"
                      />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Direct Connect & Socials */}
            <div className="md:col-span-4">
              <h3 className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#9A6700] dark:text-[#FFC93C]">
                Direct Connect
              </h3>
              <p className="mt-4 text-xs leading-relaxed text-[#2B2D31]/85 dark:text-[#D9DADC]/75">
                Have an engineering role or project in mind? Reach out directly
                or copy my email below.
              </p>

              {/* Copyable Email Box */}
              <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-[#2B2D31]/20 bg-white/85 px-3 py-2 shadow-2xs dark:border-[#D9DADC]/15 dark:bg-[#1C1E22]">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex min-w-0 items-center gap-2 truncate font-mono text-xs font-semibold text-[#2B2D31] transition hover:text-[#9A6700] dark:text-[#D9DADC] dark:hover:text-[#FFC93C]"
                >
                  <Mail
                    aria-hidden="true"
                    className="h-3.5 w-3.5 shrink-0 text-[#9A6700] dark:text-[#FFC93C]"
                  />
                  <span className="truncate">{PERSONAL_INFO.email}</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  title="Copy email address"
                  aria-label="Copy email address"
                  className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-[#FFC93C] px-2.5 py-1 font-mono text-[11px] font-extrabold text-[#2B2D31] transition hover:opacity-90"
                >
                  {copied ? (
                    <>
                      <Check aria-hidden="true" className="h-3 w-3" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy aria-hidden="true" className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <span className="sr-only" aria-live="polite">
                {copied ? "Email address copied to clipboard" : ""}
              </span>

              {/* Social Links */}
              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#2B2D31]/20 bg-white/85 px-3.5 py-2 text-xs font-bold text-[#2B2D31] shadow-2xs transition hover:-translate-y-0.5 hover:border-[#FFC93C] hover:bg-[#FFC93C] dark:border-[#D9DADC]/15 dark:bg-[#1C1E22] dark:text-[#D9DADC] dark:hover:border-[#FFC93C] dark:hover:bg-[#FFC93C] dark:hover:text-[#2B2D31]"
                >
                  <GithubIcon aria-hidden="true" className="h-4 w-4" />
                  <span>GitHub</span>
                  <ExternalLink
                    aria-hidden="true"
                    className="h-3 w-3 opacity-65"
                  />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#2B2D31]/20 bg-white/85 px-3.5 py-2 text-xs font-bold text-[#2B2D31] shadow-2xs transition hover:-translate-y-0.5 hover:border-[#FFC93C] hover:bg-[#FFC93C] dark:border-[#D9DADC]/15 dark:bg-[#1C1E22] dark:text-[#D9DADC] dark:hover:border-[#FFC93C] dark:hover:bg-[#FFC93C] dark:hover:text-[#2B2D31]"
                >
                  <LinkedinIcon aria-hidden="true" className="h-4 w-4" />
                  <span>LinkedIn</span>
                  <ExternalLink
                    aria-hidden="true"
                    className="h-3 w-3 opacity-65"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright, Stack Badge & Inline Scroll Top */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#2B2D31]/15 pt-6 text-xs text-[#2B2D31]/80 dark:border-[#D9DADC]/15 dark:text-[#D9DADC]/70 sm:flex-row">
            <p>
              © {new Date().getFullYear()}{" "}
              <span className="font-bold text-[#2B2D31] dark:text-[#D9DADC]">
                {PERSONAL_INFO.name}
              </span>
              . All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium">
                <Terminal
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-[#9A6700] dark:text-[#FFC93C]"
                />
                <span>Engineered with React · Vite · Tailwind</span>
              </span>

              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1 rounded-lg border border-[#2B2D31]/20 bg-white/80 px-2.5 py-1 font-mono text-[11px] font-bold text-[#2B2D31] transition hover:border-[#FFC93C] hover:bg-[#FFC93C] dark:border-[#D9DADC]/20 dark:bg-[#1C1E22] dark:text-[#D9DADC] dark:hover:border-[#FFC93C] dark:hover:bg-[#FFC93C] dark:hover:text-[#2B2D31]"
              >
                <span>Top</span>
                <ArrowUp aria-hidden="true" className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFC93C] text-[#2B2D31] shadow-lg ring-2 ring-[#2B2D31]/15 transition hover:-translate-y-1 hover:shadow-xl no-print"
        >
          <ArrowUp aria-hidden="true" className="h-4 w-4" />
        </button>
      )}
    </>
  );
}
