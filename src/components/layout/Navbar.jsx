import { useState } from "react";
import { FileText, Sun, Moon, X, Menu } from "lucide-react";
import { BrandLogo } from "../common/Icons.jsx";

const NAV_LINKS = [
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({
  darkMode,
  setDarkMode,
  regionKey,
  setRegionKey,
  onOpenCv,
  scrollProgress,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#2B2D31]/15 bg-[#D9DADC]/90 backdrop-blur-lg dark:border-[#D9DADC]/15 dark:bg-[#2B2D31]/90 no-print">
      <div
        className="h-[3px] bg-[#FFC93C] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a href="#top" className="group flex items-center gap-2.5">
          <BrandLogo className="h-9 w-9 transition-transform duration-300 group-hover:scale-105" />
          <div className="leading-tight">
            <span className="block font-bold tracking-tight text-[#2B2D31] dark:text-[#D9DADC]">
              Hossam Farghaly
            </span>
            <span className="block font-mono text-[10px] text-[#2B2D31]/75 dark:text-[#D9DADC]/75">
              .NET &amp; Front-End Dev
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-[#2B2D31]/85 dark:text-[#D9DADC]/85 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 transition-colors hover:text-[#2B2D31] hover:underline hover:decoration-[#FFC93C] hover:decoration-2 hover:underline-offset-4 dark:hover:text-[#FFC93C] dark:hover:no-underline"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div
            className="hidden rounded-lg border border-[#2B2D31]/20 bg-[#2B2D31]/5 p-0.5 text-xs font-bold dark:border-[#D9DADC]/20 dark:bg-[#D9DADC]/10 sm:flex"
            role="group"
            aria-label="Select Location Context"
          >
            <button
              type="button"
              onClick={() => setRegionKey("ksa")}
              className={`rounded-md px-2.5 py-1 transition ${
                regionKey === "ksa"
                  ? "bg-[#FFC93C] text-[#2B2D31] shadow-sm"
                  : "text-[#2B2D31]/75 hover:text-[#2B2D31] dark:text-[#D9DADC]/75 dark:hover:text-[#D9DADC]"
              }`}
            >
              KSA
            </button>
            <button
              type="button"
              onClick={() => setRegionKey("egypt")}
              className={`rounded-md px-2.5 py-1 transition ${
                regionKey === "egypt"
                  ? "bg-[#FFC93C] text-[#2B2D31] shadow-sm"
                  : "text-[#2B2D31]/75 hover:text-[#2B2D31] dark:text-[#D9DADC]/75 dark:hover:text-[#D9DADC]"
              }`}
            >
              Egypt
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenCv}
            className="hidden items-center gap-1.5 rounded-lg border border-[#2B2D31]/25 bg-[#2B2D31] px-3 py-1.5 text-xs font-bold text-[#D9DADC] shadow-sm transition hover:bg-[#FFC93C] hover:text-[#2B2D31] dark:border-[#D9DADC]/25 dark:bg-[#D9DADC] dark:text-[#2B2D31] dark:hover:bg-[#FFC93C] sm:inline-flex"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>ATS CV</span>
          </button>

          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle color theme"
            title={
              darkMode
                ? "Switch to 60% Silver Mode"
                : "Switch to 60% Charcoal Mode"
            }
            className="rounded-lg border border-[#2B2D31]/25 bg-[#2B2D31]/10 p-2 text-[#2B2D31] transition hover:border-[#FFC93C] hover:bg-[#FFC93C] dark:border-[#D9DADC]/25 dark:bg-[#D9DADC]/10 dark:text-[#FFC93C] dark:hover:bg-[#FFC93C] dark:hover:text-[#2B2D31]"
          >
            {darkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="rounded-lg border border-[#2B2D31]/25 bg-[#2B2D31]/10 p-2 text-[#2B2D31] dark:border-[#D9DADC]/25 dark:bg-[#D9DADC]/10 dark:text-[#D9DADC] md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-[#2B2D31]/15 bg-[#D9DADC] px-4 py-4 dark:border-[#D9DADC]/15 dark:bg-[#2B2D31] md:hidden">
          <nav className="flex flex-col space-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-bold text-[#2B2D31] hover:bg-[#2B2D31]/10 dark:text-[#D9DADC] dark:hover:bg-[#D9DADC]/10"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#2B2D31]/15 pt-4 dark:border-[#D9DADC]/15">
            <div className="flex rounded-lg border border-[#2B2D31]/20 bg-[#2B2D31]/5 p-0.5 text-xs font-bold dark:border-[#D9DADC]/20 dark:bg-[#D9DADC]/10">
              <button
                type="button"
                onClick={() => setRegionKey("ksa")}
                className={`rounded-md px-3 py-1.5 ${
                  regionKey === "ksa"
                    ? "bg-[#FFC93C] text-[#2B2D31]"
                    : "text-[#2B2D31]/80 dark:text-[#D9DADC]/80"
                }`}
              >
                Dammam, KSA
              </button>
              <button
                type="button"
                onClick={() => setRegionKey("egypt")}
                className={`rounded-md px-3 py-1.5 ${
                  regionKey === "egypt"
                    ? "bg-[#FFC93C] text-[#2B2D31]"
                    : "text-[#2B2D31]/80 dark:text-[#D9DADC]/80"
                }`}
              >
                Cairo, Egypt
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCv();
              }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#FFC93C] px-3.5 py-2 text-xs font-bold text-[#2B2D31]"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Open ATS CV</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
