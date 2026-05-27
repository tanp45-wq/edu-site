import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ["gsap", "gsap/ScrollTrigger", "gsap/ScrollToPlugin"],
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          reactrouter: ["react-router", "react-router-dom"]
        }
      }
    }
  }
});
