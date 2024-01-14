import {
	myRequest,
	postRequest,
	login
} from './http.js'




export function delet_user_like(config) {
	return postRequest({
		url: 'api/user_like/',
		method: 'delete',
		data: config
	})
}

export function user_like(config) {
	return postRequest({
		url: 'api/user_like/',
		method: 'post',
		data: config
	})
}


export function set_user_comment(config) {
	return postRequest({
		url: 'api/user_comment/',
		method: 'post',
		data: config
	})
}

export function user_comment(config) {
	return myRequest({
		url: 'api/user_comment/',
		method: 'get',
		data: config
	})
}

export function rechargeable_card(config) {
	return postRequest({
		url: 'api/rechargeable_card/',
		method: 'post',
		data: config
	})
}

export function cuser(config) {
	return postRequest({
		url: 'api/user/' + config.id + '/',
		method: 'put',
		data: {
			nickname: config.nickname,
			avatar: config.avatar
		}
	})
}

export function aliyun_oss_token(config) {
	return postRequest({
		url: 'api/aliyun_oss_token',
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

export function picturesId(config) {
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

