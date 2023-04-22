import adapter from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'target/classes/static/',
			assets: 'target/classes/static/',
			fallback: 'index.html',
		}),
		appDir: '_app',
		files: {
			assets: 'src/main/webapp/static',
			lib: 'src/main/webapp/app/lib',
			routes: 'src/main/webapp/app/routes',
			serviceWorker: 'src/main/webapp/app/service-worker',
			appTemplate: 'src/main/webapp/app/app.html',
		},
		alias: {
			$lib: 'src/main/webapp/app/lib',
			'$lib/*': 'src/main/webapp/app/lib/*',
		},
		outDir: 'target/svelte-kit',
	},
}

export default config
