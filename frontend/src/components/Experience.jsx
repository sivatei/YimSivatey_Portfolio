const EDUCATION = [
  {
    degree: "Bachelor of Computer Science / Software Engineering",
    institution: "CamTech University",
    period: "2025 – 2028 (Expected)",
    coursework: [
      "OOP",
      "DSA",
      "Database Systems",
      "Software Engineering",
      "Computer Architecture",
      "HCI",
    ],
  },
];

const EXPERIENCE = [
  {
    role: "UX/UI Design & Frontend Implementation",
    organization: "HomeSweet — Internship / Team Project",
    period: "2025 – 2027",
    responsibilities: [
      "Created wireframes and interface designs in Figma.",
      "Collaborated with team members on layout structure and user flows.",
      "Implemented responsive frontend components using React and Tailwind CSS.",
    ],
    technologies: ["Figma", "React", "Tailwind CSS"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="border-b border-slate-800/80">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <p className="eyebrow">04 / Background</p>
        <h2 className="section-title mt-2 text-2xl sm:text-3xl text-paper">
          Education &amp; Experience
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          Academic background and team development experience.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 items-stretch">
          {/* Education Column */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-blue-400">
              Education
            </h3>
            {EDUCATION.map((edu) => (
              <article
                key={edu.degree}
                className="panel-card p-6 flex-1 flex flex-col justify-between"
              >
                <div>
                  <p className="font-mono text-xs text-slate-400 tabular-nums">
                    {edu.period}
                  </p>
                  <h4 className="section-title mt-2 text-lg text-paper">
                    {edu.degree}
                  </h4>
                  <p className="mt-1 text-sm font-medium text-blue-400">
                    {edu.institution}
                  </p>

                  <div className="mt-4">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-2">
                      Relevant Coursework
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.coursework.map((course) => (
                        <span key={course} className="badge text-[11px]">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Experience Column */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-blue-400">
              Experience
            </h3>
            {EXPERIENCE.map((exp) => (
              <article
                key={exp.organization}
                className="panel-card p-6 flex-1 flex flex-col justify-between"
              >
                <div>
                  <p className="font-mono text-xs text-slate-400 tabular-nums">
                    {exp.period}
                  </p>
                  <h4 className="section-title mt-2 text-lg text-paper">
                    {exp.role}
                  </h4>
                  <p className="mt-1 text-sm font-medium text-blue-400">
                    {exp.organization}
                  </p>

                  <ul className="mt-4 list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {exp.responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="badge text-[11px]">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
