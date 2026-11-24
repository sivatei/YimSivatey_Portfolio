/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b1120",       // Clean deep slate page background
        surface: "#111827",   // Primary card surface
        surface2: "#1e293b",  // Elevated surface / subtle hover
        border: "#1f2937",    // Crisp structural border
        fog: "#94a3b8",       // Muted secondary text
        paper: "#f8fafc",     // Primary readable text
        accent: "#3b82f6",    // Restrained cobalt blue accent
        accentHover: "#60a5fa",
        // Legacy aliases preserved for compatibility
        crimson: "#3b82f6",
        rose: "#60a5fa",
        blood: "#020617",
        ember: "#3b82f6",
        glow: "#3b82f6",
      },
      fontFamily: {
        display: ["'Poppins'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'Fira Code'", "monospace"],
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.2s ease-out both",
        "slide-up": "slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};
