import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:8080',
				changeOrigin: true,
			},
			'/management': {
				target: 'http://localhost:8080',
				changeOrigin: true,
			},
		},
	},
	plugins: [sveltekit()],
	ssr: {
		noExternal: ['jhipster-svelte-library'],
	},
})
