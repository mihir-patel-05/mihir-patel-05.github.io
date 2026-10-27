import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  preview: {
    host: "0.0.0.0",
    port: Number(process.env.PORT) || 8080,
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
        notFound: path.resolve(__dirname, "404.html"),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
