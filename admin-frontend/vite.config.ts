import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// import terser from '@rollup/plugin-terser';

export default (mode) => {
  return defineConfig({
    envDir: mode.mode === "development" ? "./" : "./env",
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
          },
        },
        plugins: [
          // terser({
          //   mangle: {
          //     toplevel: true,
          //   },
          // }),
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