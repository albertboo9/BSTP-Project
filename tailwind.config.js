/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // BSTP NEXUS — Institutional Brand (light-optimized)
        nexus: {
          50:  "#f0f0ff",
          100: "#e0e1ff",
          200: "#c2c4ff",
          300: "#9d9fff",
          400: "#7c7eff",
          500: "#635bff",
          600: "#5147e5",
          700: "#3f35c9",
          800: "#2d2599",
          900: "#1a1566",
        },
        // Semantic States — refined for light UI
        success: { 50: "#ecfdf5", 100: "#d1fae5", 200: "#a7f3d0", 500: "#10b981", 600: "#059669", 700: "#047857" },
        warning: { 50: "#fffbeb", 100: "#fef3c7", 200: "#fde68a", 500: "#f59e0b", 600: "#d97706", 700: "#b45309" },
        danger:  { 50: "#fef2f2", 100: "#fee2e2", 200: "#fecaca", 500: "#ef4444", 600: "#dc2626", 700: "#b91c1c" },
        info:    { 50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 500: "#3b82f6", 600: "#2563eb" },
        // Trust Badge Levels
        gold:    { 50: "#fffbeb", 100: "#fef3c7", 500: "#f59e0b", 600: "#d97706" },
        silver:  { 50: "#f8fafc", 100: "#f1f5f9", 500: "#94a3b8", 600: "#64748b" },
        bronze:  { 50: "#fff7ed", 100: "#ffedd5", 500: "#f97316", 600: "#ea580c" },
        // Surface / Background
        surface: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
      },
      fontFamily: {
        heading: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.03), 0 1px 2px -1px rgba(0, 0, 0, 0.02)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.06), 0 4px 6px -4px rgba(0, 0, 0, 0.03)',
        'elevated': '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};