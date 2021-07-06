import notificationStore from '$lib/notification/notification-store.js'

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

function handleResponse(response, notify) {
	if (notify) {
		processAlertHeaders(response, response.ok)
	}
	if (response.ok) {
		if (isListApiBeingCalled(response)) {
			return new Promise(resolve =>
				response.json().then(data =>
					resolve({
						data,
						totalCount: response.headers.get('X-Total-Count'),
					})
				)
			)
		} else if (isJson(response)) {
			return response.json()
		} else {
			return response.text()
		}
	}

	return response.err
		? Promise.reject(response.err)
		: response.json().then(Promise.reject.bind(Promise))
}

function processAlertHeaders(response, isSuccessResponse) {
	for (var key of response.headers.keys()) {
		const isPresent = key
			.toLowerCase()
			.endsWith(isSuccessResponse ? 'app-alert' : 'app-error')
		if (isPresent) {
			notificationStore.add(
				response.headers.get(key),
				isSuccessResponse ? 'success' : 'danger'
			)
		}
	}
}

function isListApiBeingCalled(response) {
	return response.headers.get('X-Total-Count') !== null
}

function isJson(response) {
	const contentType = response.headers.get('Content-Type')
	if (contentType !== null) {
		return contentType.indexOf('application/json') > -1
	}
	return false
}
