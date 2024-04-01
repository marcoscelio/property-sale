import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/property-sale/" : "/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://s3.us-west-2.amazonaws.com",
        changeOrigin: true,
        secure: false,
        // ws: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
        rewrite: (path) =>
          path.replace(/^\/api/, "cdn.number8.com/LA/listings.json"),
      },
    },
  },
});
