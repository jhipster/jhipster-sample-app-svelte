import { sveltekit } from '@sveltejs/kit/vite'

/** @type {import('vite').UserConfig} */
const config = {
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
}

export default config
