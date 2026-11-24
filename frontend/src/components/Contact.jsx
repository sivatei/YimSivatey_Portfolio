import { useState } from "react";
import { sendContactMessage } from "../api.js";

const initialForm = { name: "", email: "", message: "" };

const DIRECT_LINKS = [
  {
    label: "Email",
    value: "sivateyyim@gmail.com",
    href: "mailto:sivateyyim@gmail.com",
    external: false,
    icon: (
      <svg className="w-4 h-4 shrink-0 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "github.com/sivatei",
    href: "https://github.com/sivatei",
    external: true,
    icon: (
      <svg className="w-4 h-4 shrink-0 text-blue-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "Freelancer",
    value: "freelancer.com/u/sivatey",
    href: "https://www.freelancer.com/u/sivatey",
    external: true,
    icon: (
      <svg className="w-4 h-4 shrink-0 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      // 1. Send email notification via Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "8e9ccb33-6e00-45f0-bd07-4984ef30b3f4",
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || "Email service failed");
      }

      // 2. Save to Supabase database backup via backend API
      try {
        await sendContactMessage(form);
      } catch (dbErr) {
        console.warn("Could not save to DB, but email was sent.", dbErr);
      }

      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setErrorMsg(err.message);
      setStatus("error");
    }
  }

  return (
    <section id="contact">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <p className="eyebrow">05 / Contact</p>
        <h2 className="section-title mt-2 text-2xl sm:text-3xl text-paper">
          Get in Touch
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          Open to software engineering internships, entry-level roles, and technical collaborations.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-12 items-start">
          {/* Direct Contact & CV */}
          <div className="md:col-span-5 panel-card p-6 sm:p-7 space-y-5">
            <h3 className="font-mono text-xs uppercase tracking-wider text-blue-400">
              Direct Links
            </h3>

            <ul className="divide-y divide-slate-800 text-sm">
              {DIRECT_LINKS.map((item) => (
                <li key={item.label} className="py-3.5 first:pt-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5">{item.icon}</span>
                    <div className="min-w-0">
                      <p className="font-mono text-[11px] text-slate-400">
                        {item.label}
                      </p>
                      <a
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noreferrer" : undefined}
                        className="mt-0.5 inline-block text-paper hover:text-blue-400 transition-colors break-all"
                      >
                        {item.value}
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-7 panel-card p-6 sm:p-7 space-y-4"
          >
            <h3 className="font-mono text-xs uppercase tracking-wider text-blue-400">
              Send a Message
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block text-xs font-mono text-slate-400 uppercase tracking-wider"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="input-field"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1.5 block text-xs font-mono text-slate-400 uppercase tracking-wider"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-1.5 block text-xs font-mono text-slate-400 uppercase tracking-wider"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Tell me about the opportunity or project..."
                className="input-field resize-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <p role="status" className="font-mono text-xs text-emerald-400">
                  Message sent. Thank you for reaching out.
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="font-mono text-xs text-red-400">
                  Could not send message: {errorMsg}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
