module.exports = {
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.js$': 'babel-jest',
		'^.+\\.svelte$': 'svelte-jester',
	},
	testMatch: ['<rootDir>/(src/main/webapp/**/*.spec.js)'],
	transformIgnorePatterns: ['node_modules/(?!fa-svelte)'],
	moduleFileExtensions: ['js', 'svelte'],
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
	resolver: 'jest-svelte-resolver',
	coverageDirectory: '<rootDir>/target/jest-coverage/',
	cacheDirectory: '<rootDir>/target/jest-cache',
	reporters: [
		'default',
		[
			'jest-junit',
			{
				outputDirectory: './target/test-results/jest',
				outputName: 'TESTS-results-sonar.xml',
			},
		],
		[
			'jest-sonar',
			{
				outputDirectory: 'target/test-results/jest',
				outputName: 'TESTS-results-sonar.xml',
				reportedFilePath: 'relative',
			},
		],
	],
}
