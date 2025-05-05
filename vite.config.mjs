import react from '@vitejs/plugin-react'
import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import envCompatible from 'vite-plugin-env-compatible'
import svgrPlugin from 'vite-plugin-svgr'

export default defineConfig({
	envPrefix: 'REACT_APP',
	build: {
		outDir: 'build',
		rollupOptions: {
			external: ['axios'],
			output: {
				entryFileNames: `assets/[name].js`,
				chunkFileNames: `assets/[name].js`,
				assetFileNames: `assets/[name].[ext]`
			  }
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
				icon: true
			}
		})
	]
})