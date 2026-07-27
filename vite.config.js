import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/vedika": {
        target: "https://api.vedika.io",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/vedika/, ""),
        secure: true,
      },
      "/geo": {
        target: "https://nominatim.openstreetmap.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/geo/, ""),
        secure: true,
        headers: {
          "User-Agent": "HathDekho/1.0 (kundali feature)",
        },
      },
    },
  },
});
