const PHOTO_SRC = "/avatar.jpg";

const PROFILE_FACTS = [
  { label: "University", value: "CamTech University" },
  { label: "Degree", value: "B.Sc. Software Engineering" },
  { label: "Focus", value: "Backend, Databases & Embedded Systems" },
  { label: "Email", value: "sivateyyim@gmail.com", href: "mailto:sivateyyim@gmail.com" },
];

export default function About() {
  return (
    <section id="about" className="border-b border-slate-800/80">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <p className="eyebrow">01 / About</p>
        <h2 className="section-title mt-2 text-2xl sm:text-3xl text-paper">About Me</h2>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 items-start">
          {/* Bio */}
          <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p>
              I&apos;m a Software Engineering student at CamTech University who enjoys learning how
              software works and how different technologies connect.
            </p>
            <p>
              I have experience working on web applications, mobile application projects, database
              design, and UI/UX prototyping. Through university projects and personal experiments,
              I&apos;ve explored different technologies and learned how to approach technical
              problems.
            </p>
            <p>
              I&apos;m particularly interested in backend development, system design, and embedded
              systems. I enjoy challenging myself with new technologies and improving my ability to
              build practical, reliable software.
            </p>
          </div>

          {/* Photo + Profile Summary */}
          <aside className="lg:col-span-5 panel-card p-6 space-y-5">
            <div className="flex items-center gap-4 pb-5 border-b border-slate-800">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-slate-700 bg-slate-800">
                <img
                  src={PHOTO_SRC}
                  alt="Yim Sivatey"
                  className="h-full w-full object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling.style.display = "flex";
                  }}
                />
                <div
                  className="absolute inset-0 items-center justify-center font-display text-base font-semibold text-blue-400"
                  style={{ display: "none" }}
                >
                  YS
                </div>
              </div>
              <div className="min-w-0">
                <p className="font-display text-base font-semibold text-paper truncate">
                  Yim Sivatey
                </p>
                <p className="text-xs text-slate-400">
                  Software Engineering Student
                </p>
              </div>
            </div>

            <dl className="space-y-3.5 text-sm">
              {PROFILE_FACTS.map(({ label, value, href }) => (
                <div
                  key={label}
                  className="grid grid-cols-[88px_1fr] items-baseline gap-3"
                >
                  <dt className="font-mono text-xs text-slate-400">{label}</dt>
                  <dd className="text-slate-200 font-medium text-xs sm:text-sm leading-snug break-words">
                    {href ? (
                      <a
                        href={href}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
