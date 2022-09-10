describe('Update user page', () => {
	let randomUser

	beforeEach(() => {
		cy.unregisterServiceWorkers()
		randomUser = 'test' + new Date().getTime()
		cy.loginByApi(
			Cypress.env('ADMIN_USERNAME'),
			Cypress.env('ADMIN_PASSWORD')
		)

		cy.save('api/admin/users', {
			login: randomUser,
			firstName: 'John',
			lastName: 'Doe',
			email: `${randomUser}@localhost.org`,
			activated: true,
			authorities: ['ROLE_USER'],
		}).then(res => {
			cy.visit(`/admin/user-management/${res.login}/edit`)
		})
	})

	afterEach(() => {
		cy.delete(`api/admin/users/${randomUser}`)
	})

	it('should greets with update user title', () => {
		cy.getByTestId('userMgmtTitle')
			.should('be.visible')
			.should('contain', 'Update user account')
	})

	it('should be populated and have valid state', () => {
		cy.getByTestId('addUserForm')
			.getByName('username')
			.should('have.value', `${randomUser}`)
			.getByName('firstName')
			.should('have.value', `John`)
			.getByName('lastName')
			.should('have.value', `Doe`)
			.getByName('email')
			.should('have.value', `${randomUser}@localhost.org`)
			.getByName('activated')
			.should('be.checked')
			.getByName('roles')
			.should('have.value', 'ROLE_USER')
		cy.getByTestId('addUserForm')
			.contains('Update user account')
			.should('not.be.disabled')
	})

	it('should require username', () => {
		cy.getByTestId('addUserForm').getByName('username').clear().blur()
		cy.getByTestId('addUserForm')
			.getByTestId('username-error')
			.should('be.visible')
			.and('contain', 'Username is mandatory')
	})

	it('should require email', () => {
		cy.getByTestId('addUserForm').getByName('email').clear().blur()
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
				cy.root().get("input[type='checkbox']").eq(0).uncheck()
				cy.root().get("input[type='checkbox']").eq(1).uncheck()
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

	it('should update user account details', () => {
		cy.getByTestId('addUserForm')
			.getByName('firstName')
			.type('update')
			.getByName('lastName')
			.type('update')
			.getByName('email')
			.clear()
			.type(`${randomUser}-update@localhost.org`)
			.getByName('roles')
			.click()
			.getByTestId('roles-options')
			.within(() => {
				cy.root().get("input[type='checkbox']").eq(0).check()
				cy.root().get("input[type='checkbox']").eq(1).check()
			})
			.getByTestId('roles-bg')
			.click()

		cy.getByTestId('addUserForm')
			.contains('Update user account')
			.should('not.be.disabled')
			.click()

		cy.getByTestId('toast-success').contains(
			'A user is updated with identifier'
		)

		cy.location('pathname')
			.should('eq', '/admin/user-management')
			.getByTestId('userMgmtTitle')
			.should('be.visible')
			.should('contain', 'Users')
	})
})
