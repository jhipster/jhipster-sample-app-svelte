describe('Navbar', () => {
	beforeEach(() => {
		cy.unregisterServiceWorkers()
		cy.visit('/')
	})

	describe('unauthenticated user', () => {
		it('should display application name', () => {
			cy.getBySel('svlAppName')
				.should('be.visible')
				.should('contain', 'SvelteDemoApplication')
		})

		it('should display application version', () => {
			cy.getBySel('svlAppVersion')
				.should('be.visible')
				.should('contain', 'DEV')
		})

		it('should not display navigation toggle button', () => {
			cy.getBySel('svlNavBtn').should('not.be.visible')
		})

		it('should not display account menu', () => {
			cy.getBySel('svlAcctMenu').should('not.exist')
		})

		it('should display sign in link', () => {
			cy.getBySel('svlLoginLink')
				.should('be.visible')
				.and('contain', 'Sign in')
		})
		it('should display register link', () => {
			cy.getBySel('svlRegisterLink')
				.should('be.visible')
				.and('contain', 'Sign up')
		})
	})

	describe('authenticated user', () => {
		beforeEach(() => {
			cy.unregisterServiceWorkers()
			cy.loginByApi('admin', 'admin')
			cy.visit('/')
		})

		it('should not display register link', () => {
			cy.getBySel('svlRegisterLink').should('not.exist')
		})

		it('should not display sign in link', () => {
			cy.getBySel('svlLoginLink').should('not.exist')
		})

		it('should display account menu', () => {
			cy.getBySel('svlAcctMenu')
				.should('be.visible')
				.getBySel('svlAccountLink')
				.should('not.be.disabled')
				.click()

			cy.getBySel('svlChgPwdLink')
				.should('be.visible')
				.and('have.attr', 'href', '/account/password')
				.and('contain', 'Change Password')

			cy.getBySel('svlSettingsLink')
				.should('be.visible')
				.and('have.attr', 'href', '/account/settings')
				.and('contain', 'Settings')

			cy.getBySel('svlSignoutLink')
				.should('be.visible')
				.and('have.attr', 'href', '/')
				.and('contain', 'Sign out')
		})

		it('should display administrator menu', () => {
			cy.getBySel('svlAdminMenu')
				.should('be.visible')
				.getBySel('svlAdminLink')
				.should('not.be.disabled')
				.click()

			cy.getBySel('svlLoggerLink')
				.should('be.visible')
				.and('have.attr', 'href', '/admin/logger')
				.and('contain', 'Loggers')
			cy.getBySel('svlUserMgmtLink')
				.should('be.visible')
				.and('have.attr', 'href', '/admin/user-management')
				.and('contain', 'User Management')
		})

		it('should navigate to change password page', () => {
			cy.getBySel('svlAcctMenu').getBySel('svlAccountLink').click()
			cy.getBySel('svlChgPwdLink').should('be.visible').click()

			cy.location('pathname').should('eq', '/account/password')
		})

		it('should navigate to settings page', () => {
			cy.getBySel('svlAcctMenu').getBySel('svlAccountLink').click()
			cy.getBySel('svlSettingsLink').should('be.visible').click()

			cy.location('pathname').should('eq', '/account/settings')
		})

		it('should logout user', () => {
			cy.getBySel('svlAcctMenu').getBySel('svlAccountLink').click()
			cy.getBySel('svlSignoutLink').should('be.visible').click()

			cy.location('pathname').should('eq', '/')
			cy.getBySel('svlLoginLink')
				.should('be.visible')
				.and('contain', 'Sign in')
		})
	})
	describe(`authenticated 'ROLE_USER' ROLE user`, () => {
		beforeEach(() => {
			cy.unregisterServiceWorkers()
			cy.loginByApi('user', 'user')
			cy.visit('/')
		})

		it('should not display administrator menu', () => {
			cy.getBySel('svlAdminMenu').should('not.exist')
		})
	})
})
