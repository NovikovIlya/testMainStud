import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import envCompatible from "vite-plugin-env-compatible";
import { fileURLToPath, URL } from 'node:url'


// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: 'REACT_APP',
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    sourcemap: true, 
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
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
});