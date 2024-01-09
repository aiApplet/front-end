import {
	myRequest,
	postRequest,
	login
} from './http.js'




export function aliyun_oss_token(config) {
	return postRequest({
		url: 'api/aliyun_oss_token/',
		method: 'get',
		data: config
	})
}

export function account_record(config) {
	return postRequest({
		url: 'api/account_record/',
		method: 'get',
		data: config
	})
}

export function getuser(config) {
	return postRequest({
		url: 'api/user/',
		method: 'get',
		data: config
	})
}

export function prompts(config) {
	return postRequest({
		url: 'api/prompts/',
		method: 'get',
		data: config
	})
}

export function styles(config) {
	return postRequest({
		url: 'api/styles/',
		method: 'get',
		data: config
	})
}

export function random_prompts(config) {
	return postRequest({
		url: 'api/random_prompts',
		method: 'get',
		data: config
	})
}

export function carousel_figure(config) {
	return postRequest({
		url: 'api/carousel_figure/',
		method: 'get',
		data: config
	})
}

export function loras(config) {
	return postRequest({
		url: 'api/loras/',
		method: 'get',
		data: config
	})
}

export function user(config) {
	return login({
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

export function draw(config) {
	return postRequest({
		url: 'api/draw/',
		method: 'post',
		data: config
	})
}

export function signin(config) {
	return postRequest({
		url: 'api/signin/',
		method: 'post',
		data: config
	})
}