describe('User login', () => {
	beforeEach(() => {
		cy.unregisterServiceWorkers()
		cy.visit('/login')
	})

	it('should greets with Sign in', () => {
		cy.getByTestId('signInTitle')
			.should('be.visible')
			.should('contain', 'Sign in to SvelteDemoApplication')
	})
	it('should display link to register', () => {
		cy.getByTestId('registerLink')
			.should('have.text', 'Create an account')
			.should('have.attr', 'href', '/account/register')
	})

	it('should display link to forgot password', () => {
		cy.getByTestId('forgotPwdLink')
			.should('have.text', 'Forgot password?')
			.should('have.attr', 'href', '/account/reset/init')
	})
	it('should require username and password', () => {
		cy.getByTestId('loginForm').contains('Sign in').should('be.disabled')
	})

	it('should require username', () => {
		cy.getByTestId('loginForm')
			.getByName('username')
			.type('admin')
			.clear()
			.blur()
		cy.getByTestId('loginForm')
			.getByTestId('username-error')
			.should('be.visible')
			.and('contain', 'Username is mandatory')
	})

	it('should require password', () => {
		cy.getByTestId('loginForm')
			.getByName('password')
			.type('admin', { log: false })
			.clear()
			.blur()
		cy.getByTestId('loginForm')
			.getByTestId('password-error')
			.should('be.visible')
			.and('contain', 'Password is mandatory')
	})

	it('should require a valid username and password', () => {
		cy.getByTestId('loginForm')
			.getByName('username')
			.type('admin')
			.getByName('password')
			.type('invalid{enter}', { log: false })
		cy.getByTestId('errorMsg').should(
			'contain',
			'Incorrect username or password.'
		)
	})

	it('should navigate to / on successful login', () => {
		cy.getByTestId('loginForm').within(() => {
			cy.root()
				.get("input[type='checkbox']")
				.eq(0)
				.check()
				.getByName('username')
				.type('admin')
				.getByName('password')
				.type('admin{enter}', { log: false })
		})
		cy.location('pathname').should('eq', '/')
	})
})
