describe('Register User', () => {
	beforeEach(() => {
		cy.unregisterServiceWorkers()
		cy.visit('/account/register')
	})

	it('should greets with Create user title', () => {
		cy.getByTestId('registerTitle')
			.should('be.visible')
			.should('contain', 'Create user account')
	})

	it('should require mandatory fields', () => {
		cy.getByTestId('registerForm')
			.contains('Create account')
			.should('be.disabled')
	})

	it('should require username', () => {
		cy.getByTestId('registerForm')
			.getByName('username')
			.type('admin')
			.clear()
			.blur()
		cy.getByTestId('registerForm')
			.getByTestId('username-error')
			.should('be.visible')
			.and('contain', 'Username is mandatory')
	})

	it('should require email', () => {
		cy.getByTestId('registerForm')
			.getByName('email')
			.type('admin@localhost.org')
			.clear()
			.blur()
		cy.getByTestId('registerForm')
			.getByTestId('email-error')
			.should('be.visible')
			.and('contain', 'Email is mandatory')
	})

	it('should require valid email', () => {
		cy.getByTestId('registerForm')
			.getByName('email')
			.type('admin@localhost')
			.blur()
		cy.getByTestId('registerForm')
			.getByTestId('email-error')
			.should('be.visible')
			.and('contain', 'Email address is not valid')
	})

	it('should require password', () => {
		cy.getByTestId('registerForm')
			.getByName('password')
			.type('password', { log: false })
			.clear()
			.blur()
		cy.getByTestId('registerForm')
			.getByTestId('password-error')
			.should('be.visible')
			.and('contain', 'Password is mandatory')
	})

	it('should require confirm password', () => {
		cy.getByTestId('registerForm')
			.getByName('passwordConfirm')
			.type('password', { log: false })
			.clear()
			.blur()
		cy.getByTestId('registerForm')
			.getByTestId('passwordConfirm-error')
			.should('be.visible')
			.and('contain', 'Password is mandatory')
	})

	it('should require password and confirm password to match', () => {
		cy.getByTestId('registerForm')
			.getByName('password')
			.type('abcd', { log: false })
			.blur()
		cy.getByTestId('registerForm')
			.getByName('passwordConfirm')
			.type('defg', { log: false })
			.blur()
		cy.getByTestId('registerForm')
			.getByTestId('passwordConfirm-error')
			.should('be.visible')
			.and('contain', 'Password and its confirmation do not match')
	})

	it('should not allow user account creation with duplicate username', () => {
		cy.getByTestId('registerForm')
			.getByName('username')
			.type('admin')
			.getByName('email')
			.type('joe@localhost.org')
			.getByName('password')
			.type('jondoe', { log: false })
			.getByName('passwordConfirm')
			.type('jondoe', { log: false })
		cy.getByTestId('registerForm')
			.contains('Create account')
			.should('not.be.disabled')
			.click()
		cy.getByTestId('errorMsg').contains(
			'Login name already in use. Please choose another one.'
		)
	})

	it('should create new user account', () => {
		cy.getByTestId('registerForm')
			.getByName('username')
			.type('jon')
			.getByName('email')
			.type('joe@localhost.org')
			.getByName('password')
			.type('jondoe', { log: false })
			.getByName('passwordConfirm')
			.type('jondoe', { log: false })
		cy.getByTestId('registerForm')
			.contains('Create account')
			.should('not.be.disabled')
			.click()
		cy.getByTestId('successMsg').contains(
			'User account successfully created. Please check your email for confirmation.'
		)
		cy.getByTestId('registerForm').should('not.exist')
	})
})
