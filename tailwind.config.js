/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
        // BSTP NEXUS — Institutional Brand
        nexus: {
          50:  "#f0f0ff",
          100: "#e0e1ff",
          500: "#635bff",
          600: "#5147e5",
          700: "#3f35c9",
          900: "#0A1128",
        },
        // Semantic States
        success: { 50: "#f0fdf4", 100: "#dcfce7", 500: "#22c55e", 700: "#15803d" },
        warning: { 50: "#fffbeb", 100: "#fef3c7", 500: "#f59e0b", 700: "#b45309" },
        danger:  { 50: "#fff1f2", 100: "#ffe4e6", 500: "#ef4444", 700: "#b91c1c" },
        // Trust Badge Levels
        gold:    { 50: "#fffbeb", 100: "#fef3c7", 500: "#f59e0b", 600: "#d97706" },
        silver:  { 50: "#f8fafc", 100: "#f1f5f9", 500: "#94a3b8", 600: "#64748b" },
        bronze:  { 50: "#fff7ed", 100: "#ffedd5", 500: "#f97316", 600: "#ea580c" },
        primary: "#1a1a2e",
        primaryLight: "#16213e",
        primaryDark: "#0f3460",
        primaryBlue: "#667eea",
        primaryBlueDark: "#5a6fd6",
        accent: "#e94560",
      },
      fontFamily: {
        heading: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
