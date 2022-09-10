describe('Create user page', () => {
	beforeEach(() => {
		cy.unregisterServiceWorkers()
		cy.loginByApi(
			Cypress.env('ADMIN_USERNAME'),
			Cypress.env('ADMIN_PASSWORD')
		)
		cy.visit(`/admin/user-management/new`)
	})

	it('should greets with Create user title', () => {
		cy.getByTestId('userMgmtTitle')
			.should('be.visible')
			.should('contain', 'Create user account')
	})

	it('should require mandatory fields', () => {
		cy.getByTestId('addUserForm')
			.contains('Create user account')
			.should('be.disabled')
	})

	it('should require username', () => {
		cy.getByTestId('addUserForm')
			.getByName('username')
			.type('admin')
			.clear()
			.blur()
		cy.getByTestId('addUserForm')
			.getByTestId('username-error')
			.should('be.visible')
			.and('contain', 'Username is mandatory')
	})

	it('should require email', () => {
		cy.getByTestId('addUserForm')
			.getByName('email')
			.type('admin@localhost.org')
			.clear()
			.blur()
		cy.getByTestId('addUserForm')
			.getByTestId('email-error')
			.should('be.visible')
			.and('contain', 'Email is mandatory')
	})

	it('should require roles', () => {
		cy.getByTestId('addUserForm')
			.getByName('roles')
			.click()
			.getByTestId('roles-options')
			.within(() => {
				cy.root().get("input[type='checkbox']").eq(0).check().uncheck()
			})
			.getByTestId('roles-bg')
			.click()
		cy.getByTestId('addUserForm')
			.getByTestId('roles-error')
			.should('be.visible')
			.and('contain', 'Select at least one role')
	})

	it('should navigate back to the user list page', () => {
		cy.getByName('cancelBtn').click()

		cy.location('pathname')
			.should('eq', '/admin/user-management')
			.getByTestId('userMgmtTitle')
			.should('be.visible')
			.should('contain', 'Users')
	})

	describe('create account', () => {
		let randomUser

		beforeEach(() => {
			cy.unregisterServiceWorkers()
			randomUser = 'test' + new Date().getTime()
			cy.visit(`/admin/user-management/new`)
		})

		afterEach(() => {
			cy.delete(`api/admin/users/${randomUser}`)
		})
		it('should create a new user account', () => {
			cy.getByTestId('addUserForm')
				.getByName('username')
				.type(`${randomUser}`)
				.getByName('firstName')
				.type('john')
				.getByName('lastName')
				.type('doe')
				.getByName('email')
				.type(`${randomUser}@localhost.org`)
				.getByName('roles')
				.click()
				.getByTestId('roles-options')
				.within(() => {
					cy.root().get("input[type='checkbox']").eq(0).check()
				})
				.getByTestId('roles-bg')
				.click()

			cy.getByTestId('addUserForm')
				.contains('Create user account')
				.should('not.be.disabled')
				.click()

			cy.getByTestId('toast-success').contains(
				'A user is created with identifier'
			)

			cy.location('pathname')
				.should('eq', '/admin/user-management')
				.getByTestId('userMgmtTitle')
				.should('be.visible')
				.should('contain', 'Users')
		})
	})
})
