import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Education & Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 nav-bar">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-blue-600 focus:px-3 focus:py-1.5 focus:text-xs focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-5xl items-center justify-between px-6 h-16"
      >
        <a
          href="#top"
          className="font-display text-sm sm:text-base font-semibold text-paper tracking-tight hover:text-blue-400 transition-colors"
        >
          Yim Sivatey
          <span className="ml-2 hidden sm:inline font-mono text-xs font-normal text-slate-400">
            / Software Engineering
          </span>
        </a>

        <ul className="hidden items-center gap-7 text-sm font-medium text-slate-400 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="py-1 transition-colors duration-150 hover:text-paper"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-slate-700 px-3 py-2 font-mono text-xs text-paper hover:border-blue-400 md:hidden transition-colors"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-slate-800 bg-ink px-6 py-3 text-sm font-medium text-slate-300 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center min-h-[44px] rounded-md px-2 hover:bg-surface hover:text-paper transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
