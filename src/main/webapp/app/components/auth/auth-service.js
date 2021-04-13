import { serverUrl } from '../../utils/env'
import { request } from '../../utils/request'

export default {
	fetchAuthenticatedUsername: () =>
		request(`${serverUrl}api/authenticate`, 'GET', undefined, {}, false),
	fetchAuthenticatedUserDetails: () => request(`${serverUrl}api/account`),
	login: (username, password, rememberMe) => {
		const body = `username=${encodeURIComponent(
			username
		)}&password=${encodeURIComponent(password)}&remember-me=${rememberMe}`

		return request(`${serverUrl}api/authentication`, 'POST', body, {
			'Content-Type': 'application/x-www-form-urlencoded',
		})
	},
	logout: () => request(`${serverUrl}api/logout`, 'POST'),
}
