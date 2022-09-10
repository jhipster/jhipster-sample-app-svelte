describe('Navbar', () => {
	beforeEach(() => {
		cy.unregisterServiceWorkers()
		cy.visit('/')
	})

	describe('unauthenticated user', () => {
		it('should display application name', () => {
			cy.getByTestId('svlAppName')
				.should('be.visible')
				.should('contain', 'SvelteDemoApplication')
		})

		it('should display application version', () => {
			cy.getByTestId('svlAppVersion')
				.should('be.visible')
				.should('contain', 'DEV')
		})

		it('should not display navigation toggle button', () => {
			cy.getByTestId('svlNavBtn').should('not.be.visible')
		})

		it('should not display account menu', () => {
			cy.getByTestId('svlAcctMenu').should('not.exist')
		})

		it('should display sign in link', () => {
			cy.getByTestId('svlLoginLink')
				.should('be.visible')
				.and('contain', 'Sign in')
		})
		it('should display register link', () => {
			cy.getByTestId('svlRegisterLink')
				.should('be.visible')
				.and('contain', 'Sign up')
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

		it('should not display register link', () => {
			cy.getByTestId('svlRegisterLink').should('not.exist')
		})

		it('should not display sign in link', () => {
			cy.getByTestId('svlLoginLink').should('not.exist')
		})

		it('should display account menu', () => {
			cy.getByTestId('svlAcctMenu')
				.should('be.visible')
				.getByTestId('svlAccountLink')
				.should('not.be.disabled')
				.click()

			cy.getByTestId('svlChgPwdLink')
				.should('be.visible')
				.and('have.attr', 'href', '/account/password')
				.and('contain', 'Change Password')

			cy.getByTestId('svlSettingsLink')
				.should('be.visible')
				.and('have.attr', 'href', '/account/settings')
				.and('contain', 'Settings')

			cy.getByTestId('svlSignoutLink')
				.should('be.visible')
				.and('have.attr', 'href', '/')
				.and('contain', 'Sign out')
		})

		it('should display administrator menu', () => {
			cy.getByTestId('svlAdminMenu')
				.should('be.visible')
				.getByTestId('svlAdminLink')
				.should('not.be.disabled')
				.click()

			cy.getByTestId('svlLoggerLink')
				.should('be.visible')
				.and('have.attr', 'href', '/admin/logger')
				.and('contain', 'Loggers')
			cy.getByTestId('svlUserMgmtLink')
				.should('be.visible')
				.and('have.attr', 'href', '/admin/user-management')
				.and('contain', 'User Management')
		})

		it('should navigate to change password page', () => {
			cy.getByTestId('svlAcctMenu').getByTestId('svlAccountLink').click()
			cy.getByTestId('svlChgPwdLink').should('be.visible').click()

			cy.location('pathname').should('eq', '/account/password')
		})

		it('should navigate to settings page', () => {
			cy.getByTestId('svlAcctMenu').getByTestId('svlAccountLink').click()
			cy.getByTestId('svlSettingsLink').should('be.visible').click()

			cy.location('pathname').should('eq', '/account/settings')
		})
		it('should logout user', () => {
			cy.getByTestId('svlAcctMenu').getByTestId('svlAccountLink').click()
			cy.getByTestId('svlSignoutLink').should('be.visible').click()

			cy.location('pathname').should('eq', '/')
			cy.getByTestId('svlLoginLink')
				.should('be.visible')
				.and('contain', 'Sign in')
		})
	})
	describe(`authenticated 'ROLE_USER' ROLE user`, () => {
		beforeEach(() => {
			cy.unregisterServiceWorkers()
			cy.loginByApi(
				Cypress.env('USER_USERNAME'),
				Cypress.env('USER_PASSWORD')
			)
			cy.visit('/')
		})

		it('should not display administrator menu', () => {
			cy.getByTestId('svlAdminMenu').should('not.exist')
		})
	})
})
