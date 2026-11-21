import { Layers } from "lucide-react";
import RevealSection from "../common/RevealSection";
import SpotlightCard from "../common/SpotlightCard";
import { SKILLS_GROUPS } from "../../data/portfolioData";

export default function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-b border-[#2B2D31]/15 py-14 dark:border-[#D9DADC]/15"
    >
      <RevealSection>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#2B2D31]/20 bg-[#2B2D31]/10 px-3 py-1 font-mono text-[11px] font-bold text-[#7A4F00] dark:border-[#D9DADC]/20 dark:bg-[#D9DADC]/10 dark:text-[#FFC93C]">
          <Layers aria-hidden="true" className="h-3.5 w-3.5" />
          <span>Capabilities</span>
        </div>

        <h2
          id="skills-heading"
          className="mt-2.5 text-2xl font-extrabold tracking-tight text-[#2B2D31] dark:text-[#D9DADC] sm:text-3xl"
        >
          Technical Stack &amp; Architecture
        </h2>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-[#2B2D31]/80 dark:text-[#D9DADC]/80">
          Core technologies across back-end .NET services, front-end SPAs, and
          relational/NoSQL databases.
        </p>
      </RevealSection>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {SKILLS_GROUPS.map((group, idx) => (
          <RevealSection key={group.title} delay={idx * 80}>
            <SpotlightCard className="flex h-full flex-col justify-between rounded-2xl border border-[#2B2D31]/20 bg-[#2B2D31] p-5 text-[#D9DADC] shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[#FFC93C] dark:border-[#D9DADC]/20 dark:bg-[#D9DADC] dark:text-[#2B2D31]">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-extrabold tracking-tight">
                    {group.title}
                  </h3>
                  <span className="rounded-md bg-[#FFC93C] px-2 py-0.5 font-mono text-[11px] font-extrabold text-[#2B2D31] dark:bg-[#2B2D31] dark:text-[#FFC93C]">
                    {group.skills.length}
                  </span>
                </div>

                <ul
                  aria-label={`${group.title} skills`}
                  className="mt-3.5 flex flex-wrap gap-2"
                >
                  {group.skills.map((skill) => (
                    <li key={skill}>
                      <span className="inline-block rounded-md border border-[#D9DADC]/20 bg-[#D9DADC]/10 px-2.5 py-1 font-mono text-xs font-medium transition hover:-translate-y-0.5 hover:border-[#FFC93C] hover:bg-[#FFC93C] hover:text-[#2B2D31] dark:border-[#2B2D31]/20 dark:bg-[#2B2D31]/10 dark:hover:border-[#2B2D31] dark:hover:bg-[#2B2D31] dark:hover:text-[#FFC93C]">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          </RevealSection>
        ))}
      </div>
    </section>
  );
}
