import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  publicDir: "public",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "framer-motion": ["framer-motion"],
          "ui-components": ["lucide-react", "clsx"],
        },
      },
    },
    chunkSizeWarningLimit: 2000,
  },
  optimizeDeps: {
    include: ["framer-motion", "react-router-dom"],
    exclude: ["hls.js"],
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
