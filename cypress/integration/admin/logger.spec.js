describe('Loggers page', () => {
	beforeEach(() => {
		cy.unregisterServiceWorkers()
		cy.loginByApi(
			Cypress.env('ADMIN_USERNAME'),
			Cypress.env('ADMIN_PASSWORD')
		)
		cy.visit('/admin/logger')
	})

	it('should greets with loggers page title and filter control', () => {
		cy.getBySel('loggersTitle')
			.should('be.visible')
			.should('contain', 'Loggers')
		cy.getBySel('loggerSearchForm')
			.getByName('logger')
			.should('have.value', ``)
	})

	it('should display loggers table', () => {
		cy.getBySel('loggersTable')
			.should('be.visible')
			.get('tr')
			.eq(0)
			.children()
			.should('have.length', 1)
			.get('th')
			.eq(0)
			.should('contain', 'Name')
	})

	it('should display logger name and the default enabled logger level in the table', () => {
		cy.getBySel('loggerSearchForm')
			.getByName('logger')
			.type(
				'org.hibernate.validator.internal.engine.groups.ValidationOrderGenerator'
			)

		cy.getBySel('loggersTable')
			.contains(
				'td',
				'org.hibernate.validator.internal.engine.groups.ValidationOrderGenerator'
			)
			.parent()
			.within($tr => {
				cy.root()
					.get('td')
					.eq(0)
					.get(`button`)
					.should('have.length', 6)
					.getBySel('offLogLevelBtn')
					.should('not.be.visible')
					.should('not.be.disabled')
					.getBySel('errorLogLevelBtn')
					.should('not.be.visible')
					.should('not.be.disabled')
					.getBySel('warnLogLevelBtn')
					.should('be.visible')
					.should('be.disabled')
					.getBySel('infoLogLevelBtn')
					.should('not.be.visible')
					.should('not.be.disabled')
					.getBySel('debugLogLevelBtn')
					.should('not.be.visible')
					.should('not.be.disabled')
					.getBySel('traceLogLevelBtn')
					.should('not.be.visible')
					.should('not.be.disabled')
			})
	})

	it('should display actions available on the current selected logger', () => {
		cy.getBySel('loggerSearchForm')
			.getByName('logger')
			.type(
				'org.hibernate.validator.internal.engine.groups.ValidationOrderGenerator'
			)

		cy.getBySel('loggersTable')
			.contains(
				'td',
				'org.hibernate.validator.internal.engine.groups.ValidationOrderGenerator'
			)
			.parent()
			.trigger('mouseenter')
			.within($tr => {
				cy.root()
					.get('td')
					.eq(0)
					.get(`button`)
					.should('have.length', 6)
					.getBySel('offLogLevelBtn')
					.should('be.visible')
					.should('not.be.disabled')
					.getBySel('errorLogLevelBtn')
					.should('be.visible')
					.should('not.be.disabled')
					.getBySel('warnLogLevelBtn')
					.should('be.visible')
					.should('be.disabled')
					.getBySel('infoLogLevelBtn')
					.should('be.visible')
					.should('not.be.disabled')
					.getBySel('debugLogLevelBtn')
					.should('be.visible')
					.should('not.be.disabled')
					.getBySel('traceLogLevelBtn')
					.should('be.visible')
					.should('not.be.disabled')
			})
	})

	it('should change logger level from WARN -> INFO, INFO -> WARN', () => {
		cy.getBySel('loggerSearchForm')
			.getByName('logger')
			.type(
				'org.hibernate.validator.internal.engine.groups.ValidationOrderGenerator'
			)

		cy.intercept('**/management/loggers/*').as('changeLoggers')

		cy.getBySel('loggersTable')
			.contains(
				'td',
				'org.hibernate.validator.internal.engine.groups.ValidationOrderGenerator'
			)
			.parent()
			.trigger('mouseenter')
			.within($tr => {
				cy.root()
					.get('td')
					.eq(0)
					.get(`button`)
					.should('have.length', 6)
					.getBySel('infoLogLevelBtn')
					.click()
			})

		cy.wait('@changeLoggers')

		cy.getBySel('loggersTable')
			.contains(
				'td',
				'org.hibernate.validator.internal.engine.groups.ValidationOrderGenerator'
			)
			.parent()
			.trigger('mouseenter')
			.within($tr => {
				cy.root()
					.get('td')
					.eq(0)
					.get(`button`)
					.should('have.length', 6)
					.getBySel('infoLogLevelBtn')
					.should('be.visible')
					.should('be.disabled')
					.getBySel('warnLogLevelBtn')
					.click()
			})
	})

	it('should filter loggers by name', () => {
		let countBeforeFilter

		cy.getBySel('loggersTable')
			.get('tbody > tr')
			.then($tr => (countBeforeFilter = $tr.length))

		cy.getBySel('loggerSearchForm').getByName('logger').type('ROOT')

		cy.getBySel('loggersTable')
			.get('tbody > tr')
			.then($tr => expect($tr.length).not.eq(countBeforeFilter))

		cy.getBySel('loggerSearchForm').getByName('logger').clear()

		cy.getBySel('loggersTable')
			.get('tbody > tr')
			.then($tr => expect($tr.length).eq(countBeforeFilter))
	})

	it('should validate the pagination controls', () => {
		cy.getBySel('pageCtrl')
			.eq(0)
			.contains('div', /1-\d+ of \d+/)
			.next()
			.within($div => {
				cy.root()
					.getBySel('prevPageCtrl')
					.should('be.disabled')
					.get('div')
					.should('have.text', '1')
					.getBySel('nextPageCtrl')
					.should('be.enabled')
			})
	})
})
