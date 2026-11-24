const SKILL_CATEGORIES = [
  {
    title: "Programming Languages",
    description:
      "Core languages used across coursework, web applications, databases, and embedded systems.",
    skills: ["Java", "JavaScript", "SQL", "C / C++"],
  },
  {
    title: "Frontend & Mobile",
    description:
      "Building responsive web interfaces and cross-platform mobile applications.",
    skills: ["React", "Vue.js", "HTML", "CSS", "Tailwind CSS", "Flutter"],
  },
  {
    title: "Backend & Database",
    description:
      "Designing REST APIs, relational schemas, transactions, caching, and cloud data layers.",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "PostgreSQL",
      "Supabase",
      "MySQL",
      "MongoDB",
      "Redis",
      "Firebase",
      "DBeaver",
    ],
  },
  {
    title: "Tools & Platforms",
    description:
      "Version control, containerization, embedded tooling, and interface prototyping.",
    skills: ["Git", "GitHub", "Docker", "Linux", "Figma", "ESP32 / FreeRTOS"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="border-b border-slate-800/80">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <p className="eyebrow">02 / Technical Skills</p>
        <h2 className="section-title mt-2 text-2xl sm:text-3xl text-paper">
          Technologies &amp; Tools
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          Technologies I have worked with across university coursework, team projects, and personal
          engineering builds.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.title} className="panel-card p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-base font-semibold text-paper">
                  {category.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {category.description}
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
