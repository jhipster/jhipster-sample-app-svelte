describe('Routes', () => {
	beforeEach(() => {
		cy.unregisterServiceWorkers()
	})

	describe('unauthenticated user', () => {
		it('should not allow navigation to settings page', () => {
			cy.visit('/account/settings')

			cy.location('pathname').should('eq', '/login')
			cy.getByTestId('signInTitle')
				.should('be.visible')
				.should('contain', 'Sign in to SvelteDemoApplication')
		})

		it('should not allow navigation to user management page', () => {
			cy.visit('/admin/user-management')

			cy.location('pathname').should('eq', '/login')
			cy.getByTestId('signInTitle')
				.should('be.visible')
				.should('contain', 'Sign in to SvelteDemoApplication')
		})
		it('should not allow navigation to Loggers page', () => {
			cy.visit('/admin/logger')

			cy.location('pathname').should('eq', '/login')
			cy.getByTestId('signInTitle')
				.should('be.visible')
				.should('contain', 'Sign in to SvelteDemoApplication')
		})

		it('should allow navigation to home page', () => {
			cy.visit('/')

			cy.location('pathname').should('eq', '/')
			cy.getByTestId('welcomeTitle')
				.should('be.visible')
				.and('contain', 'Welcome, Svelte Hipster!')
		})
	})

	describe('authenticated user', () => {
		beforeEach(() => {
			cy.unregisterServiceWorkers()
			cy.loginByApi(
				Cypress.env('ADMIN_USERNAME'),
				Cypress.env('ADMIN_PASSWORD')
			)
		})

		it('should not allow navigation to login page', () => {
			cy.visit('/login')
			cy.location('pathname').should('eq', '/')
			cy.getByTestId('welcomeTitle')
				.should('be.visible')
				.and('contain', 'Welcome, Svelte Hipster!')
		})
		it('should not allow navigation to register page', () => {
			cy.visit('/account/register')

			cy.location('pathname').should('eq', '/')
			cy.getByTestId('welcomeTitle')
				.should('be.visible')
				.and('contain', 'Welcome, Svelte Hipster!')
		})
		it('should allow navigation to home page', () => {
			cy.visit('/')

			cy.location('pathname').should('eq', '/')
			cy.getByTestId('welcomeTitle')
				.should('be.visible')
				.and('contain', 'Welcome, Svelte Hipster!')
		})
	})

	describe('navigation context', () => {
		beforeEach(() => {
			cy.visit('/admin/logger')
			cy.location('pathname').should('eq', '/login')
		})

		it('should navigate to saved context', () => {
			cy.getByTestId('loginForm').within(() => {
				cy.root()
					.get("input[type='checkbox']")
					.eq(0)
					.check()
					.getByName('username')
					.type(Cypress.env('ADMIN_USERNAME'))
					.getByName('password')
					.type(Cypress.env('ADMIN_PASSWORD') + '{enter}', {
						log: false,
					})
			})
			cy.location('pathname').should('eq', '/admin/logger')
			cy.getByTestId('loggersTitle')
				.should('be.visible')
				.should('contain', 'Loggers')
		})
	})
})
