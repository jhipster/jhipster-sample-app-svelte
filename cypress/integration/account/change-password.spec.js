describe('Change user password', () => {
	beforeEach(() => {
		cy.unregisterServiceWorkers()
		cy.loginByApi(
			Cypress.env('ADMIN_USERNAME'),
			Cypress.env('ADMIN_PASSWORD')
		)
		cy.visit('/account/password')
	})

	it('should greets with Change password title', () => {
		cy.getByTestId('passwordTitle').should('have.text', 'Change password')
	})

	it('should require mandatory fields to be filled', () => {
		cy.getByTestId('passwordForm')
			.contains('Update password')
			.should('be.disabled')
	})

	it('should require current password', () => {
		cy.getByTestId('passwordForm')
			.getByName('currentPassword')
			.type('admin', { log: false })
			.clear()
			.blur()
		cy.getByTestId('passwordForm')
			.getByTestId('currentPassword-error')
			.should('be.visible')
			.and('contain', 'Password is mandatory')
	})

	it('should require new password', () => {
		cy.getByTestId('passwordForm')
			.getByName('newPassword')
			.type('admin', { log: false })
			.clear()
			.blur()
		cy.getByTestId('passwordForm')
			.getByTestId('newPassword-error')
			.should('be.visible')
			.and('contain', 'Password is mandatory')
	})

	it('should require to confirm new password', () => {
		cy.getByTestId('passwordForm')
			.getByName('newPasswordConfirm')
			.type('admin', { log: false })
			.clear()
			.blur()
		cy.getByTestId('passwordForm')
			.getByTestId('newPasswordConfirm-error')
			.should('be.visible')
			.and('contain', 'Password is mandatory')
	})

	it('should require new and confirm passwords to match', () => {
		cy.getByTestId('passwordForm')
			.getByName('newPassword')
			.type('abcd', { log: false })
			.blur()
		cy.getByTestId('passwordForm')
			.getByName('newPasswordConfirm')
			.type('defg', { log: false })
			.blur()
		cy.getByTestId('passwordForm')
			.getByTestId('newPasswordConfirm-error')
			.should('be.visible')
			.and('contain', 'Password and its confirmation do not match')
	})

	it('should update user password', () => {
		cy.getByTestId('passwordForm')
			.getByName('currentPassword')
			.type('admin', { log: false })
			.blur()
		cy.getByTestId('passwordForm')
			.getByName('newPassword')
			.type('admin', { log: false })
			.blur()
		cy.getByTestId('passwordForm')
			.getByName('newPasswordConfirm')
			.type('admin', { log: false })
			.blur()

		cy.getByTestId('passwordForm')
			.contains('Update password')
			.should('not.be.disabled')
			.click()

		cy.getByTestId('successMsg').contains('Password changed!')
	})
})
