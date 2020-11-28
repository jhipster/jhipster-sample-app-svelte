import { serverUrl } from '../../utils/env'
import { prepareRequest } from '../../utils/request'

export default {
	createAccount: (username, email, password) => {
		const body = JSON.stringify({
			login: username,
			email,
			password,
			langKey: 'en',
		})

		return fetch(
			`${serverUrl}api/register`,
			prepareRequest('POST', body, {
				'Content-Type': 'application/json',
			})
		)
			.then(response => {
				if (response.ok) {
					return Promise.resolve()
				}
				return response.json().then(Promise.reject.bind(Promise))
			})
			.catch(err => {
				return Promise.reject(err)
			})
	},
	updateAccount: updatedAccount => {
		const body = JSON.stringify(updatedAccount)

		return fetch(
			`${serverUrl}api/account`,
			prepareRequest('POST', body, {
				'Content-Type': 'application/json',
			})
		)
			.then(response => {
				if (response.ok) {
					return Promise.resolve()
				}
				return response.json().then(Promise.reject.bind(Promise))
			})
			.catch(err => {
				return Promise.reject(err)
			})
	},
	activateAccount: activationKey => {
		return fetch(`${serverUrl}api/activate?key=${activationKey}`)
			.then(response => {
				if (response.ok) {
					return Promise.resolve()
				}
				return response.json().then(Promise.reject.bind(Promise))
			})
			.catch(err => {
				return Promise.reject(err)
			})
	},
	initiateResetAccountPassword: email => {
		return fetch(
			`${serverUrl}api/account/reset-password/init`,
			prepareRequest('POST', email)
		)
			.then(response => {
				if (response.ok) {
					return Promise.resolve()
				}
				return response.json().then(Promise.reject.bind(Promise))
			})
			.catch(err => {
				return Promise.reject(err)
			})
	},
	resetAccountPassword: (key, password) => {
		const body = JSON.stringify({ key, newPassword: password })
		return fetch(
			`${serverUrl}api/account/reset-password/finish`,
			prepareRequest('POST', body, {
				'Content-Type': 'application/json',
			})
		)
			.then(response => {
				if (response.ok) {
					return Promise.resolve()
				}
				return response.json().then(Promise.reject.bind(Promise))
			})
			.catch(err => {
				return Promise.reject(err)
			})
	},
	changeAccountPassword: (currentPassword, newPassword) => {
		const body = JSON.stringify({ currentPassword, newPassword })
		return fetch(
			`${serverUrl}api/account/change-password`,
			prepareRequest('POST', body, {
				'Content-Type': 'application/json',
			})
		)
			.then(response => {
				if (response.ok) {
					return Promise.resolve()
				}
				return response.json().then(Promise.reject.bind(Promise))
			})
			.catch(err => {
				return Promise.reject(err)
			})
	},
}
