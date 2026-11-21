import { useState, useEffect } from "react";
import { PERSONAL_INFO } from "./data/portfolioData";
import AmbientBackground from "./components/common/AmbientBackground";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/sections/HeroSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import SkillsSection from "./components/sections/SkillsSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import CertificatesSection from "./components/sections/CertificatesSection";
import ContactSection from "./components/sections/ContactSection";
import ProjectModal from "./components/modals/ProjectModal";
import CertificateModal from "./components/modals/CertificateModal";
import CvModal from "./components/modals/CvModal";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [regionKey, setRegionKey] = useState("ksa");
  const [roleKey, setRoleKey] = useState("fullstack");
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        docHeight > 0
          ? Math.min(100, Math.round((scrollTop / docHeight) * 100))
          : 0;
      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 450);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const region = PERSONAL_INFO.regions[regionKey];

  return (
    <div className="relative min-h-screen bg-[#D9DADC] text-[#2B2D31] transition-colors duration-300 dark:bg-[#2B2D31] dark:text-[#D9DADC]">
      <AmbientBackground darkMode={darkMode} />

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        regionKey={regionKey}
        setRegionKey={setRegionKey}
        onOpenCv={() => setCvModalOpen(true)}
        scrollProgress={scrollProgress}
      />

      <main
        id="top"
        className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 no-print"
      >
        <HeroSection
          region={region}
          roleKey={roleKey}
          setRoleKey={setRoleKey}
          onOpenCv={() => setCvModalOpen(true)}
        />
        <ProjectsSection onSelectProject={setSelectedProject} />
        <SkillsSection />
        <ExperienceSection />
        <CertificatesSection onSelectCert={setSelectedCert} />
        <ContactSection region={region} />
      </main>

      <Footer showBackToTop={showBackToTop} />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CertificateModal
        cert={selectedCert}
        onClose={() => setSelectedCert(null)}
      />

      <CvModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
        roleKey={roleKey}
        setRoleKey={setRoleKey}
        regionKey={regionKey}
        setRegionKey={setRegionKey}
      />
    </div>
  );
}
