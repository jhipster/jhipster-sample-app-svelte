describe('Change user password', () => {
	beforeEach(() => {
		cy.unregisterServiceWorkers()
		cy.loginByApi(Cypress.env('ADMIN_USERNAME'), Cypress.env('ADMIN_PASSWORD'))
		cy.visit('/account/password')
	})

	it('should greets with Change password title', () => {
		cy.getByTestId('passwordTitle').should('have.text', 'Change password')
	})

	it('should require mandatory fields to be filled', () => {
		cy.getByTestId('passwordForm').contains('Update password').should('be.disabled')
	})

	it('should require current password', () => {
		cy.getByTestId('passwordForm').within(() => {
			cy.getByName('currentPassword').within(() => {
				cy.root().type('admin', { log: false })
				cy.root().clear()
				cy.root().blur()
			})
			cy.getByTestId('currentPassword-error')
				.should('be.visible')
				.and('contain', 'Password is mandatory')
		})
	})

	it('should require new password', () => {
		cy.getByTestId('passwordForm').within(() => {
			cy.getByName('newPassword').within(() => {
				cy.root().type('admin', { log: false })
				cy.root().clear()
				cy.root().blur()
			})
			cy.getByTestId('newPassword-error')
				.should('be.visible')
				.and('contain', 'Password is mandatory')
		})
	})

	it('should require to confirm new password', () => {
		cy.getByTestId('passwordForm').within(() => {
			cy.getByName('newPasswordConfirm').within(() => {
				cy.root().type('admin', { log: false })
				cy.root().clear()
				cy.root().blur()
			})
			cy.getByTestId('newPasswordConfirm-error')
				.should('be.visible')
				.and('contain', 'Password is mandatory')
		})
	})

	it('should require new and confirm passwords to match', () => {
		cy.getByTestId('passwordForm').within(() => {
			cy.getByName('newPassword').within(() => {
				cy.root().type('abcd', { log: false })
				cy.root().blur()
			})
			cy.getByName('newPasswordConfirm').within(() => {
				cy.root().type('defg', { log: false })
				cy.root().blur()
			})
			cy.getByTestId('newPasswordConfirm-error')
				.should('be.visible')
				.and('contain', 'Password and its confirmation do not match')
		})
	})

	it('should update user password', () => {
		cy.getByTestId('passwordForm').within(() => {
			cy.getByName('currentPassword').within(() => {
				cy.root().type('admin', { log: false })
				cy.root().blur()
			})
			cy.getByName('newPassword').within(() => {
				cy.root().type('admin', { log: false })
				cy.root().blur()
			})
			cy.getByName('newPasswordConfirm').within(() => {
				cy.root().type('admin', { log: false })
				cy.root().blur()
			})
			cy.root().contains('Update password').should('not.be.disabled').click()
		})
		cy.getByTestId('successMsg').contains('Password changed!')
	})
})
