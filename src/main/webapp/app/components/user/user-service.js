import { serverUrl } from '../../utils/env'
import { prepareRequest } from '../../utils/request'

export default {
	fetchUserDetails: (page, size, sortPredicate, sortOrder) => {
		const defaultSort = sortPredicate !== 'id' ? '&sort=id,asc' : ''
		const queryString = `page=${
			page - 1
		}&size=${size}&sort=${sortPredicate},${sortOrder}${defaultSort}`
		return fetch(`${serverUrl}api/users?${queryString}`, prepareRequest())
			.then(response => {
				if (response.ok) {
					return new Promise(resolve => {
						response.json().then(data =>
							resolve({
								data,
								totalCount: response.headers.get(
									'X-Total-Count'
								),
							})
						)
					})
				}
				return Promise.reject(response.err)
			})
			.catch(err => {
				return Promise.reject(err)
			})
	},
	create: user => {
		return fetch(
			`${serverUrl}api/users`,
			prepareRequest('POST', JSON.stringify(user), {
				'Content-Type': 'application/json',
			})
		)
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
	update: user => {
		return fetch(
			`${serverUrl}api/users`,
			prepareRequest('PUT', JSON.stringify(user), {
				'Content-Type': 'application/json',
			})
		)
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
	delete: login => {
		return fetch(`${serverUrl}api/users/${login}`, prepareRequest('DELETE'))
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
	fetchUserByLogin: login => {
		return fetch(`${serverUrl}api/users/${login}`, prepareRequest())
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
	fetchAuthorities: () => {
		return fetch(`${serverUrl}api/users/authorities`, prepareRequest())
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
}
