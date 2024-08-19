import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

declare const __dirname: string;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  server: {
    host: true,
    watch: {
      usePolling: true,
    },
  },
});
