describe('User Settings', () => {
	beforeEach(() => {
		cy.unregisterServiceWorkers()
		cy.loginByApi(
			Cypress.env('ADMIN_USERNAME'),
			Cypress.env('ADMIN_PASSWORD')
		)
		cy.visit('/account/settings')
	})

	it('should greets with User Settings title', () => {
		cy.getByTestId('settingsTitle').should(
			'have.text',
			`User settings for [${Cypress.env('ADMIN_USERNAME')}]`
		)
	})

	it('should display current settings', () => {
		cy.getByTestId('settingsForm')
			.getByName('firstName')
			.invoke('val')
			.then(val => {
				expect(val).to.include('Admin')
			})
		cy.getByTestId('settingsForm')
			.getByName('lastName')
			.invoke('val')
			.then(val => {
				expect(val).to.include('Admin')
			})
		cy.getByTestId('settingsForm')
			.getByName('email')
			.invoke('val')
			.then(val => {
				expect(val).to.include('admin@localhost')
			})
	})

	it('should display form control validation messages', () => {
		cy.getByTestId('settingsForm')
			.getByName('firstName')
			.type(
				'AveryLongFirstNameThatExceedsTheMaximumLengthLimitToCheckValidation'
			)
			.blur()
		cy.getByTestId('settingsForm')
			.getByTestId('firstName-error')
			.should('be.visible')
			.and('contain', 'First name cannot be longer than 50 characters')

		cy.getByTestId('settingsForm')
			.getByName('lastName')
			.type(
				'AveryLongLastNameThatExceedsTheMaximumLengthLimitToCheckValidation'
			)
			.blur()
		cy.getByTestId('settingsForm')
			.getByTestId('lastName-error')
			.should('be.visible')
			.and('contain', 'Last name cannot be longer than 50 characters')

		cy.getByTestId('settingsForm').getByName('email').clear().blur()
		cy.getByTestId('settingsForm')
			.getByTestId('email-error')
			.should('be.visible')
			.and('contain', 'Email is mandatory')

		cy.getByTestId('settingsForm')
			.getByName('email')
			.type('admin@localhost')
			.blur()
		cy.getByTestId('settingsForm')
			.getByTestId('email-error')
			.should('be.visible')
			.and('contain', 'Email address is not valid')

		cy.getByTestId('settingsForm')
			.contains('Update Settings')
			.should('be.disabled')
	})

	it('should update user settings', () => {
		cy.getByTestId('settingsForm')
			.getByName('firstName')
			.clear()
			.type('Admin')
			.blur()
		cy.getByTestId('settingsForm')
			.getByName('lastName')
			.clear()
			.type('Admin')
			.blur()
		cy.getByTestId('settingsForm')
			.getByName('email')
			.clear()
			.type('admin@localhost.org')
			.blur()

		cy.getByTestId('settingsForm')
			.contains('Update Settings')
			.should('not.be.disabled')
			.click()

		cy.getByTestId('successMsg').contains('Settings changed!')
	})
})
