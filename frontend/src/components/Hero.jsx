const FEATURED_PREVIEWS = [
  {
    title: "Jomnes",
    category: "Mobile Application",
    summary:
      "Flutter & Supabase mentor booking app with authentication, student/teacher screens, and Stripe integration.",
    tags: ["Flutter", "Supabase", "Stripe"],
  },
  {
    title: "Movie E-Ticket Prototype",
    category: "Backend Systems",
    summary:
      "Node.js/Express booking & notification services using MySQL transactions, Redis seat locking, and Docker.",
    tags: ["Node.js", "MySQL", "Redis", "Docker"],
  },
  {
    title: "ESP32 Classroom Noise Monitor",
    category: "Embedded Systems",
    summary:
      "Real-time classroom noise threshold detection built on ESP32 and FreeRTOS with LED and buzzer alerts.",
    tags: ["ESP32", "FreeRTOS", "C / C++"],
  },
];

export default function Hero() {
  return (
    <section id="top" className="border-b border-slate-800/80 bg-ink">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className="eyebrow">CamTech University · Software Engineering</p>

          <h1 className="section-title mt-3 text-4xl sm:text-5xl text-paper leading-[1.12]">
            Yim Sivatey
          </h1>

          <p className="mt-3 font-display text-lg sm:text-xl font-medium text-blue-400 leading-snug">
            Software Engineering Student &amp; Aspiring Software Engineer.
          </p>

          <p className="mt-2 font-mono text-xs text-slate-400">
            Software Engineering &nbsp;|&nbsp; Application Development &nbsp;|&nbsp; Backend &amp; Systems
          </p>

          <p className="mt-5 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            I build practical web, mobile, and embedded applications with a focus on backend
            systems, database design, and reliable software architecture.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-3">
            <a href="#projects" className="btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn-secondary">
              Contact Me
            </a>
          </div>
        </div>

        {/* Featured Project Previews */}
        <div className="mt-14 pt-10 border-t border-slate-800/80">
          <div className="flex items-center justify-between gap-4 mb-5">
            <p className="font-mono text-xs uppercase tracking-wider text-slate-400">
              Featured Highlights
            </p>
            <a
              href="#projects"
              className="font-mono text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              All projects &rarr;
            </a>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {FEATURED_PREVIEWS.map((item) => (
              <a
                key={item.title}
                href="#projects"
                className="panel-card panel-card-hover p-5 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-mono text-[11px] text-blue-400">
                      {item.category}
                    </p>
                    <span className="font-mono text-xs text-slate-500 group-hover:text-blue-400 transition-colors">
                      &rarr;
                    </span>
                  </div>
                  <h2 className="section-title mt-1.5 text-base text-paper group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="badge text-[11px]">
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
