describe('User delete dialog page', () => {
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
			firstName: '',
			lastName: '',
			email: `${randomUser}@localhost.org`,
			activated: true,
			authorities: ['ROLE_USER'],
		})

		cy.visit('/admin/user-management')

		cy.getByTestId('userMgmtTable')
			.contains('td', randomUser)
			.parent()
			.trigger('mouseenter')
			.within($tr => {
				cy.root().get('td').children().getByName('deleteBtn').click()
			})
	})

	afterEach(() => {
		cy.delete(`api/admin/users/${randomUser}`)
	})

	it('should display delete user dialog', () => {
		cy.getByTestId('svlModal').within(() => {
			cy.root()
				.get('h1')
				.should('be.visible')
				.should('contain', 'Confirm delete operation')
				.get('p')
				.should('be.visible')
				.should('contain', 'Are you sure you want to delete the user?')
				.getByName('confirmDeleteBtn')
				.should('not.be.disabled')
				.getByName('cancelBtn')
				.should('not.be.disabled')
		})
	})

	it('should close the dialog without deleting user', () => {
		cy.getByTestId('svlModal').within(() =>
			cy.getByName('cancelBtn').click()
		)
		cy.getByTestId('userMgmtTitle')
			.should('be.visible')
			.should('contain', 'Users')
	})

	it('should delete the user', () => {
		cy.getByTestId('svlModal').within(() =>
			cy.getByName('confirmDeleteBtn').click()
		)

		cy.getByTestId('toast-success').contains(
			'A user is deleted with identifier'
		)

		cy.getByTestId('userMgmtTitle')
			.should('be.visible')
			.should('contain', 'Users')
	})
})
