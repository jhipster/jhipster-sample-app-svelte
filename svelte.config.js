import adapter from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'target/classes/static/',
			assets: 'target/classes/static/',
			fallback: 'index.html',
		}),
		target: '#svelte',
		appDir: '_app',
		files: {
			assets: 'src/main/webapp/static',
			hooks: 'src/main/webapp/hooks',
			lib: 'src/main/webapp/app/lib',
			routes: 'src/main/webapp/app/routes',
			serviceWorker: 'src/main/webapp/app/service-worker',
			template: 'src/main/webapp/app/app.html',
		},
		vite: () => ({
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
		}),
	},
}

export default config
