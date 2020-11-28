import { serverUrl } from '../../utils/env'
import { prepareRequest } from '../../utils/request'

export default {
	fetchAuthenticatedUsername: () => {
		return fetch(`${serverUrl}api/authenticate`, prepareRequest())
			.then(response => {
				if (response.ok) {
					return response.text()
				}
				return Promise.reject(response.err)
			})
			.catch(err => {
				return Promise.reject(err)
			})
	},
	fetchAuthenticatedUserDetails: () => {
		return fetch(`${serverUrl}api/account`, prepareRequest())
			.then(response => {
				if (response.ok) {
					return response.json()
				}
				return Promise.reject(response.err)
			})
			.catch(err => {
				return Promise.reject(err)
			})
	},
	login: (username, password, rememberMe) => {
		const body = `username=${encodeURIComponent(
			username
		)}&password=${encodeURIComponent(password)}&remember-me=${rememberMe}`

		return fetch(
			`${serverUrl}api/authentication`,
			prepareRequest('POST', body, {
				'Content-Type': 'application/x-www-form-urlencoded',
			})
		)
			.then(response => {
				if (response.ok) {
					return Promise.resolve()
				}
				return Promise.reject(response.error)
			})
			.catch(err => {
				return Promise.reject(err)
			})
	},
	logout: () => {
		return fetch(`${serverUrl}api/logout`, prepareRequest('POST'))
			.then(response => {
				if (response.ok) {
					return Promise.resolve()
				}
				return Promise.reject(response.err)
			})
			.catch(err => {
				return Promise.reject(err)
			})
	},
}
