import { Briefcase, GraduationCap } from "lucide-react";
import RevealSection from "../common/RevealSection";
import { EXPERIENCE, EDUCATION } from "../../data/portfolioData";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="border-b border-[#2B2D31]/15 py-14 dark:border-[#D9DADC]/15"
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <RevealSection>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFC93C] text-[#2B2D31]">
              <Briefcase className="h-4 w-4" />
            </span>
            <h2 className="text-xl font-extrabold text-[#2B2D31] dark:text-[#D9DADC] sm:text-2xl">
              Professional Experience
            </h2>
          </div>

          <div className="mt-6 space-y-6 border-l-2 border-[#2B2D31]/25 pl-5 dark:border-[#D9DADC]/25">
            {EXPERIENCE.map((exp, idx) => (
              <div key={idx} className="relative">
                <span className="absolute -left-[25px] top-1.5 h-2.5 w-2.5 rounded-full bg-[#FFC93C] ring-4 ring-[#D9DADC] dark:ring-[#2B2D31]" />
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h3 className="font-bold text-[#2B2D31] dark:text-[#D9DADC]">
                    {exp.role}
                  </h3>
                  <span className="font-mono text-xs text-[#2B2D31]/75 dark:text-[#D9DADC]/75">
                    {exp.period}
                  </span>
                </div>
                <p className="mt-0.5 inline-block rounded bg-[#2B2D31] px-2 py-0.5 text-xs font-bold text-[#FFC93C] dark:bg-transparent dark:p-0 dark:text-[#FFC93C]">
                  {exp.company} · {exp.location}
                </p>
                <ul className="mt-2.5 space-y-1.5 text-sm text-[#2B2D31]/90 dark:text-[#D9DADC]/90">
                  {exp.points.map((pt, i) => (
                    <li key={i}>• {pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection delay={120}>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFC93C] text-[#2B2D31]">
              <GraduationCap className="h-4 w-4" />
            </span>
            <h2 className="text-xl font-extrabold text-[#2B2D31] dark:text-[#D9DADC] sm:text-2xl">
              Education &amp; Intensive Tracks
            </h2>
          </div>

          <div className="mt-6 space-y-6 border-l-2 border-[#2B2D31]/25 pl-5 dark:border-[#D9DADC]/25">
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="relative">
                <span className="absolute -left-[25px] top-1.5 h-2.5 w-2.5 rounded-full bg-[#FFC93C] ring-4 ring-[#D9DADC] dark:ring-[#2B2D31]" />
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h3 className="font-bold text-[#2B2D31] dark:text-[#D9DADC]">
                    {edu.degree}
                  </h3>
                  <span className="font-mono text-xs text-[#2B2D31]/75 dark:text-[#D9DADC]/75">
                    {edu.period}
                  </span>
                </div>
                <p className="mt-0.5 inline-block rounded bg-[#2B2D31] px-2 py-0.5 text-xs font-bold text-[#FFC93C] dark:bg-transparent dark:p-0 dark:text-[#FFC93C]">
                  {edu.institution}
                </p>
                <p className="mt-2 text-sm text-[#2B2D31]/90 dark:text-[#D9DADC]/90">
                  {edu.details}
                </p>
              </div>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
