module.exports = {
	plugins: [
		require('tailwindcss'),
		require('autoprefixer'),
		process.env.NODE_ENV === 'production' &&
			require('@fullhuman/postcss-purgecss')({
				content: ['./src/**/*.svelte', './src/**/*.html'],
				whitelistPatterns: [/svelte-/],
				defaultExtractor: content => {
					const regExp = new RegExp(/[A-Za-z0-9-_:/]+/g)

					const matchedTokens = []

					let match = regExp.exec(content)

					while (match) {
						if (match[0].startsWith('class:')) {
							matchedTokens.push(match[0].substring(6))
						} else {
							matchedTokens.push(match[0])
						}

						match = regExp.exec(content)
					}

					return matchedTokens
				},
			}),
		process.env.NODE_ENV === 'production' &&
			require('cssnano')({ preset: 'default' }),
	],
}
