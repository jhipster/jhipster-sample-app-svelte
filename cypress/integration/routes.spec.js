describe('Routes', () => {
	beforeEach(() => {
		cy.unregisterServiceWorkers()
	})

	describe('unauthenticated user', () => {
		it('should not allow navigation to settings page', () => {
			cy.visit('/account/settings')

			cy.location('pathname').should('eq', '/login')
			cy.getBySel('signInTitle')
				.should('be.visible')
				.should('contain', 'Sign in to SvelteDemoApplication')
		})

		it('should not allow navigation to user management page', () => {
			cy.visit('/admin/user-management')

			cy.location('pathname').should('eq', '/login')
			cy.getBySel('signInTitle')
				.should('be.visible')
				.should('contain', 'Sign in to SvelteDemoApplication')
		})
		it('should not allow navigation to Loggers page', () => {
			cy.visit('/admin/logger')

			cy.location('pathname').should('eq', '/login')
			cy.getBySel('signInTitle')
				.should('be.visible')
				.should('contain', 'Sign in to SvelteDemoApplication')
		})

		it('should allow navigation to home page', () => {
			cy.visit('/')

			cy.location('pathname').should('eq', '/')
			cy.getBySel('welcomeTitle')
				.should('be.visible')
				.and('contain', 'Welcome, Svelte Hipster!')
		})
	})

	describe('authenticated user', () => {
		beforeEach(() => {
			cy.unregisterServiceWorkers()
			cy.loginByApi('admin', 'admin')
		})

		it('should not allow navigation to login page', () => {
			cy.visit('/login')

			cy.location('pathname').should('eq', '/')
			cy.getBySel('welcomeTitle')
				.should('be.visible')
				.and('contain', 'Welcome, Svelte Hipster!')
		})
		it('should not allow navigation to register page', () => {
			cy.visit('/account/register')

			cy.location('pathname').should('eq', '/')
			cy.getBySel('welcomeTitle')
				.should('be.visible')
				.and('contain', 'Welcome, Svelte Hipster!')
		})
		it('should allow navigation to home page', () => {
			cy.visit('/')

			cy.location('pathname').should('eq', '/')
			cy.getBySel('welcomeTitle')
				.should('be.visible')
				.and('contain', 'Welcome, Svelte Hipster!')
		})
	})
})
