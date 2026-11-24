const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Education & Experience" },
  { href: "#contact", label: "Contact" },
];

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/sivatei",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "Freelancer",
    href: "https://www.freelancer.com/u/sivatey",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:sivateyyim@gmail.com",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const STACK = [
  { tech: "React + Vite", note: "Frontend" },
  { tech: "Tailwind CSS", note: "Styling" },
  { tech: "Express.js", note: "REST API" },
  { tech: "Supabase", note: "PostgreSQL" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/80 bg-ink">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <a
              href="#top"
              className="inline-block font-display text-base font-semibold text-paper hover:text-blue-400 transition-colors"
            >
              Yim Sivatey
            </a>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xs">
              Software Engineering student at CamTech University focusing on application
              development, backend systems, databases, and embedded systems.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              {SOCIALS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-md border border-slate-800 text-slate-400 hover:text-paper hover:border-blue-500/60 transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-blue-400 mb-3">
              Navigation
            </p>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-slate-400 hover:text-paper transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-blue-400 mb-3">
              Built With
            </p>
            <ul className="space-y-2 text-sm">
              {STACK.map(({ tech, note }) => (
                <li key={tech} className="flex items-center justify-between gap-4">
                  <span className="text-slate-400">{tech}</span>
                  <span className="font-mono text-[11px] text-slate-500">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-500">
          <p>&copy; {year} Yim Sivatey. All rights reserved.</p>
          <p>Software Engineering · CamTech University</p>
          <a href="#top" className="hover:text-blue-400 transition-colors">
            Back to top &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
