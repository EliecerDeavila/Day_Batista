import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://day-diana.netlify.app",
  vite: {
    plugins: [tailwindcss()],
  },
});
