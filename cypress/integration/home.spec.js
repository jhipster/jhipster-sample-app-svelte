describe('Home page', () => {
	beforeEach(() => {
		cy.unregisterServiceWorkers()
		cy.visit('/')
	})

	it('should greets with welcome title', () => {
		cy.getBySel('welcomeTitle')
			.should('be.visible')
			.and('contain', 'Welcome, Svelte Hipster!')
	})

	describe('unauthenticated user', () => {
		it('should have login instructions', () => {
			cy.getBySel('loginInstructions')
				.should('be.visible')
				.and('contain', 'you can try the default accounts')
				.and(
					'contain',
					'Administrator (login="admin" and password="admin")'
				)
				.and('contain', 'User (login="user" and password="user").')
		})
		it('should have user registration link', () => {
			cy.getBySel('svlRegisterHomeLink')
				.should('be.visible')
				.and('have.attr', 'href', '/account/register')
				.and('contain', 'Register a new account')
		})
	})

	describe('authenticated user', () => {
		beforeEach(() => {
			cy.unregisterServiceWorkers()
			cy.loginByApi(
				Cypress.env('ADMIN_USERNAME'),
				Cypress.env('ADMIN_PASSWORD')
			)
			cy.visit('/')
		})

		it('should greets logged in user', () => {
			cy.getBySel('greetMsg')
				.should('be.visible')
				.and(
					'contain',
					`You are logged in as user "${Cypress.env(
						'ADMIN_USERNAME'
					)}".`
				)
		})
	})
})
