describe('Footer', () => {
	beforeEach(() => {
		cy.unregisterServiceWorkers()
		cy.visit('/')
	})

	it('should display copyright message', () => {
		cy.getBySel('copyrightMsg')
			.should('be.visible')
			.should('contain', 'Copyright © 2022 JHipster. All Rights Reserved')
	})
})
