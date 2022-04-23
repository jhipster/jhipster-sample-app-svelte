import { handleResponse } from 'jhipster-svelte-library/utils/request'

export function request(
	url,
	method = 'GET',
	body = undefined,
	headers = {},
	notify = true
) {
	const xhrHeaders = { ...headers, 'X-Requested-With': 'XMLHttpRequest' }
	return fetch(url, prepareRequest(method, body, xhrHeaders))
		.then(response => handleResponse(response, notify))
		.catch(err => {
			return Promise.reject(err)
		})
}

function prepareRequest(method, body, headers) {
	let requestHeaders = { ...headers }
	if (['POST', 'PUT', 'DELETE'].includes(method)) {
		const csrfCookieValue = getCookieValue('XSRF-TOKEN')
		if (csrfCookieValue) {
			requestHeaders = {
				...requestHeaders,
				'X-XSRF-TOKEN': csrfCookieValue,
			}
		}
	}
	return {
		method,
		body,
		credentials: 'include',
		headers: requestHeaders,
	}
}

function getCookieValue(cookieName) {
	if (!document.cookie) {
		return undefined
	}

	const values = document.cookie
		.split(';')
		.map(c => c.trim())
		.filter(c => c.startsWith(cookieName + '='))
		.map(c => c.split('=')[1])
		.map(c => decodeURIComponent(c))

	return values.length ? values[0] : undefined
}
