import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// import terser from '@rollup/plugin-terser';

export default () => {
  return defineConfig({
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
          },
        },
        plugins: [
        ],
      },
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    plugins: [react()],
  });
};
