module.exports = {
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.svelte$': 'svelte-jester',
	},
	testMatch: ['<rootDir>/(src/main/webapp/**/*.spec.js)'],
	transformIgnorePatterns: ['node_modules/(?!(jhipster-svelte-library))'],
	moduleFileExtensions: ['js', 'svelte'],
	extensionsToTreatAsEsm: ['.svelte'],
	moduleNameMapper: {
		'^\\$lib(.*)$': '<rootDir>/src/main/webapp/app/lib$1',
	},
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
