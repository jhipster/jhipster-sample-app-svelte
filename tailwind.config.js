const colors = require('tailwindcss/colors')

module.exports = {
	darkMode: 'class',
	purge: false,
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			gray: colors.trueGray,
			white: colors.white,
			blue: colors.lightBlue,
			green: colors.green,
			yellow: colors.amber,
			red: colors.red,
			black: colors.black,
		},
		extend: {
			width: {
				112: '28rem',
			},
			padding: {
				7: '1.75rem',
			},
			fontFamily: {
				sans: [
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'Roboto',
					'Helvetica Neue',
					'Arial',
					'sans-serif',
				],
			},
		},
	},
	variants: {
		extend: {
			backgroundColor: ['checked'],
			borderColor: ['checked'],
		},
	},
	plugins: [],
	future: {},
}
