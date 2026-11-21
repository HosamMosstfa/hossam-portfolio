import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";
import RevealSection from "../common/RevealSection";
import { EXPERIENCE, EDUCATION } from "../../data/portfolioData";

function SectionHeading({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-start gap-3">
      <span
        aria-hidden="true"
        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFC93C] text-[#2B2D31] shadow-sm ring-1 ring-[#2B2D31]/15"
      >
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <h2 className="text-xl font-extrabold tracking-tight text-[#2B2D31] dark:text-[#D9DADC] sm:text-2xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-0.5 text-xs text-[#2B2D31]/75 dark:text-[#D9DADC]/70">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-label="Experience and Education"
      className="border-b border-[#2B2D31]/15 py-14 dark:border-[#D9DADC]/15"
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        {/* ---------- Professional Experience ---------- */}
        <RevealSection>
          <SectionHeading
            icon={Briefcase}
            title="Professional Experience"
            subtitle="Roles, delivery impact, and operational background"
          />

          <ol className="relative mt-7 space-y-5 border-l-2 border-[#2B2D31]/25 pl-6 dark:border-[#D9DADC]/20">
            {EXPERIENCE.map((exp) => (
              <li
                key={`${exp.role}-${exp.company}-${exp.period}`}
                className="group relative rounded-2xl border border-[#2B2D31]/20 bg-[#2B2D31] p-4 text-[#D9DADC] shadow-sm transition-all duration-200 hover:border-[#FFC93C] dark:border-[#D9DADC]/15 dark:bg-[#181A1E] dark:hover:border-[#FFC93C]/70"
              >
                {/* Timeline Dot */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[31px] top-5 h-3.5 w-3.5 rounded-full bg-[#FFC93C] ring-4 ring-[#D9DADC] transition-transform duration-200 group-hover:scale-110 dark:ring-[#2B2D31]"
                />

                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="text-base font-extrabold text-white">
                    {exp.role}
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-md border border-[#D9DADC]/15 bg-[#D9DADC]/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-[#D9DADC]/85">
                    <Calendar
                      aria-hidden="true"
                      className="h-3 w-3 text-[#FFC93C]"
                    />
                    <span>{exp.period}</span>
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-block rounded-md bg-[#FFC93C]/15 px-2.5 py-0.5 font-bold text-[#FFC93C] ring-1 ring-[#FFC93C]/30">
                    {exp.company}
                  </span>
                  {exp.location && (
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#D9DADC]/75">
                      <MapPin
                        aria-hidden="true"
                        className="h-3 w-3 text-[#FFC93C]"
                      />
                      <span>{exp.location}</span>
                    </span>
                  )}
                </div>

                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#D9DADC]/90">
                  {exp.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFC93C]"
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </RevealSection>

        {/* ---------- Education & Intensive Tracks ---------- */}
        <RevealSection delay={120}>
          <SectionHeading
            icon={GraduationCap}
            title="Education & Intensive Tracks"
            subtitle="Academic foundation and specialized software engineering training"
          />

          <ol className="relative mt-7 space-y-5 border-l-2 border-[#2B2D31]/25 pl-6 dark:border-[#D9DADC]/20">
            {EDUCATION.map((edu) => (
              <li
                key={`${edu.degree}-${edu.institution}-${edu.period}`}
                className="group relative rounded-2xl border border-[#2B2D31]/20 bg-[#2B2D31] p-4 text-[#D9DADC] shadow-sm transition-all duration-200 hover:border-[#FFC93C] dark:border-[#D9DADC]/15 dark:bg-[#181A1E] dark:hover:border-[#FFC93C]/70"
              >
                {/* Timeline Dot */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[31px] top-5 h-3.5 w-3.5 rounded-full bg-[#FFC93C] ring-4 ring-[#D9DADC] transition-transform duration-200 group-hover:scale-110 dark:ring-[#2B2D31]"
                />

                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="text-base font-extrabold text-white">
                    {edu.degree}
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-md border border-[#D9DADC]/15 bg-[#D9DADC]/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-[#D9DADC]/85">
                    <Calendar
                      aria-hidden="true"
                      className="h-3 w-3 text-[#FFC93C]"
                    />
                    <span>{edu.period}</span>
                  </span>
                </div>

                <p className="mt-2 inline-block rounded-md bg-[#FFC93C]/15 px-2.5 py-0.5 text-xs font-bold text-[#FFC93C] ring-1 ring-[#FFC93C]/30">
                  {edu.institution}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-[#D9DADC]/90">
                  {edu.details}
                </p>
              </li>
            ))}
          </ol>
        </RevealSection>
      </div>
    </section>
  );
}
