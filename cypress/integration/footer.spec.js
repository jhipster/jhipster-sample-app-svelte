describe('Footer', () => {
	beforeEach(() => {
		cy.visit('/')
	})

	it('should display copyright message', () => {
		cy.getBySel('copyrightMsg')
			.should('be.visible')
			.should('contain', 'Copyright © 2020 JHipster. All Rights Reserved')
	})
})
