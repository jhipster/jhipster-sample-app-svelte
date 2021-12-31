// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

Cypress.Commands.add('unregisterServiceWorkers', () => {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
			.getRegistrations()
			.then(registrations =>
				registrations.forEach(reg => reg.unregister())
			)
	}
})

Cypress.Commands.add('getBySel', (selector, ...args) => {
	return cy.get(`[data-test=${selector}]`, ...args)
})

Cypress.Commands.add('getByName', selector => {
	return cy.get(`[name=${selector}]`)
})
Cypress.Commands.add('loginByApi', (username, password) => {
	cy.session(
		[username],
		() => {
			cy.request({ url: `api/authenticate` })
				.then(res => {
					expect(res.status).to.eq(200)
					return cy
						.getCookie('XSRF-TOKEN')
						.should('have.property', 'value')
				})
				.then(csrfCookie => {
					return cy.request({
						method: 'POST',
						url: `api/authentication`,
						form: true,
						headers: {
							'X-XSRF-TOKEN': csrfCookie,
						},
						body: {
							username,
							password,
							'remember-me': true,
						},
					})
				})
				.then(res => {
					expect(res.status).to.eq(200)
					return cy.request('GET', `api/account`)
				})
				.then(res => {
					expect(res.status).to.eq(200)
				})
		},
		{
			validate() {
				cy.request({ url: `api/account`, failOnStatusCode: false })
					.its('status')
					.should('eq', 200)
			},
		}
	)
})

Cypress.Commands.add('save', (url, body, status = 201) => {
	cy.getCookie('XSRF-TOKEN')
		.then(csrfCookie => {
			return cy.request({
				method: 'POST',
				url: url,
				form: false,
				headers: {
					'X-XSRF-TOKEN': csrfCookie.value,
					'Content-Type': 'application/json',
				},
				body: body,
			})
		})
		.then(res => {
			expect(res.status).to.eq(status)
			return cy.wrap(res.body)
		})
})

Cypress.Commands.add('delete', (url, lenient = true) => {
	cy.getCookie('XSRF-TOKEN')
		.then(csrfCookie => {
			return cy.request({
				method: 'DELETE',
				url: url,
				headers: {
					'X-XSRF-TOKEN': csrfCookie.value,
				},
				failOnStatusCode: lenient ? false : true,
			})
		})
		.then(res => {
			if (!lenient) {
				expect(res.status).to.eq(204)
			}
		})
})

Cypress.Commands.add('getById', (url, status = 200) => {
	cy.getCookie('XSRF-TOKEN')
		.then(csrfCookie => {
			return cy.request({
				method: 'GET',
				url: url,
				headers: {
					'X-XSRF-TOKEN': csrfCookie.value,
				},
			})
		})
		.then(res => {
			expect(res.status).to.eq(status)
			return cy.wrap(res.body)
		})
})

Cypress.Commands.add('setFileInput', (fieldSelector, testFile, mimeType) => {
	cy.fixture(testFile).then($blob => {
		cy.getByName(fieldSelector).then($el => {
			const blob = Cypress.Blob.base64StringToBlob($blob, mimeType)
			const file = new File([blob], testFile, { type: mimeType })
			const list = new DataTransfer()
			list.items.add(file)
			$el[0].files = list.files
			$el[0].dispatchEvent(new Event('change'))
		})
	})
})
