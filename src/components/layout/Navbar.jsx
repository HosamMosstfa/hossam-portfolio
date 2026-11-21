import { useState, useEffect } from "react";
import { FileText, Sun, Moon, X, Menu, MapPin } from "lucide-react";
import { BrandLogo } from "../common/Icons.jsx";

const NAV_LINKS = [
  { href: "#projects", id: "projects", label: "Projects" },
  { href: "#skills", id: "skills", label: "Skills" },
  { href: "#experience", id: "experience", label: "Experience" },
  { href: "#certificates", id: "certificates", label: "Certificates" },
  { href: "#contact", id: "contact", label: "Contact" },
];

export default function Navbar({
  darkMode,
  setDarkMode,
  regionKey,
  setRegionKey,
  onOpenCv,
  scrollProgress = 0,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll elevation and active section highlight
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);

      const scrollPosition = window.scrollY + 140;
      let current = "";
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el && el.offsetTop <= scrollPosition) {
          current = link.id;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 no-print ${
        isScrolled
          ? "border-b border-[#2B2D31]/15 bg-[#D9DADC]/95 shadow-md backdrop-blur-xl dark:border-[#D9DADC]/15 dark:bg-[#1C1E22]/95"
          : "border-b border-[#2B2D31]/10 bg-[#D9DADC]/80 backdrop-blur-md dark:border-[#D9DADC]/10 dark:bg-[#2B2D31]/85"
      }`}
    >
      {/* Top Scroll Progress Bar */}
      <div className="h-[2.5px] w-full bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[#FFC93C] via-[#FFD966] to-[#FFC93C] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 transition-all duration-300 sm:px-6 ${
          isScrolled ? "py-2.5" : "py-3.5"
        }`}
      >
        {/* Brand Identity */}
        <a
          href="#top"
          onClick={() => setActiveSection("")}
          className="group flex items-center gap-3 focus-visible:outline-none"
        >
          <BrandLogo className="h-9 w-9 shrink-0 transition-transform duration-300 group-hover:scale-105" />
          <div className="leading-tight">
            <span className="flex items-center gap-1.5 text-sm font-extrabold tracking-tight text-[#2B2D31] dark:text-[#D9DADC] sm:text-base">
              <span>Hossam Mostafa Farghaly</span>
              <span
                title="Available for opportunities"
                className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"
              />
            </span>
            <span className="block font-mono text-[10px] font-semibold tracking-wide text-[#2B2D31]/70 dark:text-[#FFC93C]/90">
              Full Stack .NET &amp; Front-End
            </span>
          </div>
        </a>

        {/* Center Pill Navigation (Desktop) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-1 rounded-full border border-[#2B2D31]/15 bg-[#2B2D31]/[0.04] p-1 backdrop-blur-sm dark:border-[#D9DADC]/15 dark:bg-[#141619]/70 md:flex"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-[#FFC93C] text-[#2B2D31] shadow-sm"
                    : "text-[#2B2D31]/80 hover:bg-[#2B2D31]/10 hover:text-[#2B2D31] dark:text-[#D9DADC]/80 dark:hover:bg-[#D9DADC]/10 dark:hover:text-white"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Region Switcher */}
          <div
            className="hidden items-center gap-1 rounded-xl border border-[#2B2D31]/20 bg-[#2B2D31]/5 p-1 text-xs font-bold dark:border-[#D9DADC]/15 dark:bg-[#141619]/70 sm:flex"
            role="group"
            aria-label="Select Location Context"
          >
            <MapPin
              aria-hidden="true"
              className="ml-1.5 h-3.5 w-3.5 text-[#2B2D31]/65 dark:text-[#FFC93C]"
            />
            <button
              type="button"
              onClick={() => setRegionKey("ksa")}
              className={`rounded-lg px-2.5 py-1 text-[11px] transition ${
                regionKey === "ksa"
                  ? "bg-[#FFC93C] font-extrabold text-[#2B2D31] shadow-sm"
                  : "text-[#2B2D31]/75 hover:text-[#2B2D31] dark:text-[#D9DADC]/75 dark:hover:text-white"
              }`}
            >
              KSA
            </button>
            <button
              type="button"
              onClick={() => setRegionKey("egypt")}
              className={`rounded-lg px-2.5 py-1 text-[11px] transition ${
                regionKey === "egypt"
                  ? "bg-[#FFC93C] font-extrabold text-[#2B2D31] shadow-sm"
                  : "text-[#2B2D31]/75 hover:text-[#2B2D31] dark:text-[#D9DADC]/75 dark:hover:text-white"
              }`}
            >
              Egypt
            </button>
          </div>

          {/* ATS CV Button */}
          <button
            type="button"
            onClick={onOpenCv}
            className="hidden items-center gap-1.5 rounded-xl bg-[#2B2D31] px-3.5 py-2 text-xs font-extrabold text-[#D9DADC] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#FFC93C] hover:text-[#2B2D31] dark:bg-[#FFC93C] dark:text-[#2B2D31] dark:hover:opacity-90 sm:inline-flex"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>ATS CV</span>
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle color theme"
            title={
              darkMode ? "Switch to Light Mode" : "Switch to Dark Charcoal Mode"
            }
            className="rounded-xl border border-[#2B2D31]/20 bg-[#2B2D31]/5 p-2 text-[#2B2D31] transition hover:border-[#FFC93C] hover:bg-[#FFC93C] dark:border-[#D9DADC]/15 dark:bg-[#141619]/70 dark:text-[#FFC93C] dark:hover:border-[#FFC93C] dark:hover:bg-[#FFC93C] dark:hover:text-[#2B2D31]"
          >
            {darkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="rounded-xl border border-[#2B2D31]/20 bg-[#2B2D31]/5 p-2 text-[#2B2D31] transition hover:border-[#FFC93C] dark:border-[#D9DADC]/15 dark:bg-[#141619]/70 dark:text-[#D9DADC] md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-[#2B2D31]/15 bg-[#D9DADC]/98 px-4 py-4 shadow-xl backdrop-blur-xl dark:border-[#D9DADC]/15 dark:bg-[#1C1E22]/98 md:hidden">
          <nav className="flex flex-col space-y-1.5">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-bold transition ${
                    isActive
                      ? "bg-[#FFC93C] text-[#2B2D31]"
                      : "text-[#2B2D31] hover:bg-[#2B2D31]/10 dark:text-[#D9DADC] dark:hover:bg-[#D9DADC]/10"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2B2D31]" />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#2B2D31]/15 pt-4 dark:border-[#D9DADC]/15">
            <div className="flex items-center gap-1 rounded-xl border border-[#2B2D31]/20 bg-[#2B2D31]/5 p-1 text-xs font-bold dark:border-[#D9DADC]/15 dark:bg-[#141619]">
              <button
                type="button"
                onClick={() => setRegionKey("ksa")}
                className={`rounded-lg px-3 py-1.5 transition ${
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
                className={`rounded-lg px-3 py-1.5 transition ${
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
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#FFC93C] px-4 py-2 text-xs font-extrabold text-[#2B2D31] shadow-sm"
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
