import {
	myRequest,
	postRequest
} from './http.js'





export function loras(config) {
	return postRequest({
		url: 'api/loras/',
		method: 'get',
		data: config
	})
}

export function user(config) {
	return postRequest({
		url: 'api/user/',
		method: 'post',
		data: config
	})
}

export function pictures(config) {
	return myRequest({
		url: 'api/pictures/',
		method: 'get',
		data: config
	})
}