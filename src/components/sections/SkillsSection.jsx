import RevealSection from "../common/RevealSection";
import SpotlightCard from "../common/SpotlightCard";
import { SKILLS_GROUPS } from "../../data/portfolioData";

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="border-b border-[#2B2D31]/15 py-14 dark:border-[#D9DADC]/15"
    >
      <RevealSection>
        <h2 className="text-2xl font-extrabold tracking-tight text-[#2B2D31] dark:text-[#D9DADC] sm:text-3xl">
          Technical Stack &amp; Architecture
        </h2>
        <p className="mt-1.5 text-sm text-[#2B2D31]/80 dark:text-[#D9DADC]/80">
          Core technologies across back-end .NET services, front-end SPAs, and
          relational/NoSQL databases.
        </p>
      </RevealSection>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {SKILLS_GROUPS.map((group, idx) => (
          <RevealSection key={group.title} delay={idx * 80}>
            <SpotlightCard className="h-full rounded-2xl border border-[#2B2D31]/20 bg-[#2B2D31] p-5 text-[#D9DADC] shadow-md transition hover:border-[#FFC93C] dark:border-[#D9DADC]/20 dark:bg-[#D9DADC] dark:text-[#2B2D31]">
              <h3 className="text-sm font-extrabold">{group.title}</h3>
              <div className="mt-3.5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-[#D9DADC]/20 bg-[#D9DADC]/10 px-2.5 py-1 font-mono text-xs font-medium transition hover:border-[#FFC93C] hover:bg-[#FFC93C] hover:text-[#2B2D31] dark:border-[#2B2D31]/20 dark:bg-[#2B2D31]/10 dark:hover:bg-[#FFC93C] dark:hover:text-[#2B2D31]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </RevealSection>
        ))}
      </div>
    </section>
  );
}
