describe('Loggers page', () => {
	beforeEach(() => {
		cy.unregisterServiceWorkers()
		cy.loginByApi(Cypress.env('ADMIN_USERNAME'), Cypress.env('ADMIN_PASSWORD'))
		cy.visit('/admin/logger')
	})

	it('should greets with loggers page title and filter control', () => {
		cy.getByTestId('loggersTitle').should('be.visible').should('contain', 'Loggers')
		cy.getByTestId('loggerSearchForm').within(() => {
			cy.getByName('logger').should('have.value', ``)
		})
	})

	it('should display loggers table', () => {
		cy.getByTestId('loggersTable')
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
		cy.getByTestId('loggerSearchForm').within(() => {
			cy.getByName('logger').type(
				'org.hibernate.validator.internal.engine.groups.ValidationOrderGenerator'
			)
		})

		cy.getByTestId('loggersTable')
			.contains(
				'td',
				'org.hibernate.validator.internal.engine.groups.ValidationOrderGenerator'
			)
			.parent()
			.within($tr => {
				cy.get('td').eq(0).get(`button`).should('have.length', 6)
				cy.getByTestId('offLogLevelBtn').should('not.be.visible').should('not.be.disabled')
				cy.getByTestId('errorLogLevelBtn')
					.should('not.be.visible')
					.should('not.be.disabled')
				cy.getByTestId('warnLogLevelBtn').should('be.visible').should('be.disabled')
				cy.getByTestId('infoLogLevelBtn').should('not.be.visible').should('not.be.disabled')
				cy.getByTestId('debugLogLevelBtn')
					.should('not.be.visible')
					.should('not.be.disabled')
				cy.getByTestId('traceLogLevelBtn')
					.should('not.be.visible')
					.should('not.be.disabled')
			})
	})

	it('should display actions available on the current selected logger', () => {
		cy.getByTestId('loggerSearchForm').within(() => {
			cy.getByName('logger').type(
				'org.hibernate.validator.internal.engine.groups.ValidationOrderGenerator'
			)
		})

		cy.getByTestId('loggersTable')
			.contains(
				'td',
				'org.hibernate.validator.internal.engine.groups.ValidationOrderGenerator'
			)
			.parent()
			.within($tr => {
				cy.root().trigger('mouseenter')
				cy.get('td').eq(0).get(`button`).should('have.length', 6)
				cy.getByTestId('offLogLevelBtn').should('be.visible').should('not.be.disabled')
				cy.getByTestId('errorLogLevelBtn').should('be.visible').should('not.be.disabled')
				cy.getByTestId('warnLogLevelBtn').should('be.visible').should('be.disabled')
				cy.getByTestId('infoLogLevelBtn').should('be.visible').should('not.be.disabled')
				cy.getByTestId('debugLogLevelBtn').should('be.visible').should('not.be.disabled')
				cy.getByTestId('traceLogLevelBtn').should('be.visible').should('not.be.disabled')
			})
	})

	it('should change logger level from WARN -> INFO, INFO -> WARN', () => {
		cy.getByTestId('loggerSearchForm').within(() => {
			cy.getByName('logger').type(
				'org.hibernate.validator.internal.engine.groups.ValidationOrderGenerator'
			)
		})

		cy.intercept('**/management/loggers/*').as('changeLoggers')

		cy.getByTestId('loggersTable')
			.contains(
				'td',
				'org.hibernate.validator.internal.engine.groups.ValidationOrderGenerator'
			)
			.parent()
			.within($tr => {
				cy.root().trigger('mouseenter')
				cy.get('td').eq(0).get(`button`).should('have.length', 6)
				cy.getByTestId('infoLogLevelBtn').click()
			})

		cy.wait('@changeLoggers')

		cy.getByTestId('loggersTable')
			.contains(
				'td',
				'org.hibernate.validator.internal.engine.groups.ValidationOrderGenerator'
			)
			.parent()
			.within($tr => {
				cy.root().trigger('mouseenter')
				cy.get('td').eq(0).get(`button`).should('have.length', 6)
				cy.getByTestId('infoLogLevelBtn').should('be.visible').should('be.disabled')
				cy.getByTestId('warnLogLevelBtn').click()
			})
	})

	it('should filter loggers by name', () => {
		let countBeforeFilter

		cy.getByTestId('loggersTable')
			.get('tbody > tr')
			.then($tr => (countBeforeFilter = $tr.length))

		cy.getByTestId('loggerSearchForm').getByName('logger').type('ROOT')

		cy.getByTestId('loggersTable')
			.get('tbody > tr')
			.then($tr => expect($tr.length).not.eq(countBeforeFilter))

		cy.getByTestId('loggerSearchForm').getByName('logger').clear()

		cy.getByTestId('loggersTable')
			.get('tbody > tr')
			.then($tr => expect($tr.length).eq(countBeforeFilter))
	})

	it('should validate the pagination controls', () => {
		cy.getByTestId('pageCtrl')
			.eq(0)
			.contains('div', /1-\d+ of \d+/)
			.next()
			.within($div => {
				cy.getByTestId('prevPageCtrl')
					.should('be.disabled')
					.get('div')
					.should('have.text', '1')
				cy.getByTestId('nextPageCtrl').should('be.enabled')
			})
	})
})
