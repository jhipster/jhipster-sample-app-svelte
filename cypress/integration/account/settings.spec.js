describe('User Settings', () => {
	beforeEach(() => {
		cy.unregisterServiceWorkers()
		cy.loginByApi(Cypress.env('ADMIN_USERNAME'), Cypress.env('ADMIN_PASSWORD'))
		cy.visit('/account/settings')
	})

	it('should greets with User Settings title', () => {
		cy.getByTestId('settingsTitle').should(
			'have.text',
			`User settings for [${Cypress.env('ADMIN_USERNAME')}]`
		)
	})

	it('should display current settings', () => {
		cy.getByTestId('settingsForm').within(() => {
			cy.getByName('firstName')
				.invoke('val')
				.then(val => {
					expect(val).to.include('Admin')
				})
			cy.getByName('lastName')
				.invoke('val')
				.then(val => {
					expect(val).to.include('Admin')
				})
			cy.getByName('email')
				.invoke('val')
				.then(val => {
					expect(val).to.include('admin@localhost')
				})
		})
	})

	it('should display form control validation messages', () => {
		cy.getByTestId('settingsForm').within(() => {
			cy.getByName('firstName').within(() => {
				cy.root().type(
					'AveryLongFirstNameThatExceedsTheMaximumLengthLimitToCheckValidation'
				)
				cy.root().blur()
			})
			cy.getByTestId('firstName-error')
				.should('be.visible')
				.and('contain', 'First name cannot be longer than 50 characters')

			cy.getByName('lastName').within(() => {
				cy.root().type('AveryLongLastNameThatExceedsTheMaximumLengthLimitToCheckValidation')
				cy.root().blur()
			})
			cy.getByTestId('lastName-error')
				.should('be.visible')
				.and('contain', 'Last name cannot be longer than 50 characters')

			cy.getByName('email').within(() => {
				cy.root().clear()
				cy.root().blur()
			})
			cy.getByTestId('email-error').should('be.visible').and('contain', 'Email is mandatory')

			cy.getByName('email').within(() => {
				cy.root().type('admin@localhost')
				cy.root().blur()
			})
			cy.getByTestId('email-error')
				.should('be.visible')
				.and('contain', 'Email address is not valid')

			cy.root().contains('Update Settings').should('be.disabled')
		})
	})

	it('should update user settings', () => {
		cy.getByTestId('settingsForm').within(() => {
			cy.getByName('firstName').within(() => {
				cy.root().clear()
				cy.root().type('Admin')
				cy.root().blur()
			})
			cy.getByName('lastName').within(() => {
				cy.root().clear()
				cy.root().type('Admin')
				cy.root().blur()
			})
			cy.getByName('email').within(() => {
				cy.root().clear()
				cy.root().type('admin@localhost.org')
				cy.root().blur()
			})

			cy.root().contains('Update Settings').should('not.be.disabled').click()
		})
		cy.getByTestId('successMsg').contains('Settings changed!')
	})
})
