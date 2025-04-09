import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import envCompatible from "vite-plugin-env-compatible";
import { fileURLToPath, URL } from 'node:url'


export default defineConfig({
  envPrefix: 'REACT_APP',
  build: {
    outDir: "build",
    rollupOptions: {
      external: ['axios']
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    react(),
    envCompatible(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
});