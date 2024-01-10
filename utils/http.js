let baseURL = 'https://ai.xiazq.com/'


export const myRequest = (options) => {
	return new Promise((resolve, reject) => {
		var user = uni.getStorageSync("userinfo")
		var token = ""
		if (user) {
			token = 'Bearer ' + user.token
		}
		uni.request({
			url: baseURL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			timeout: 600000,
			header: {
				Authorization: token,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success: (res) => {
				if (res.data.code == 0) {
					resolve(res)
				} else if (res.data.code == 401) {
					uni.login({
						provider: "weixin",
						success: function(res) {
							login({
								url: 'api/user/',
								method: 'post',
								data: {
									code: res.code
								}
							}).then(res => {
								myRequest(options)
							})
						}
					})
				} else {
					uni.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 2000
					});
				}
			},
			fail: (err) => {

				reject(err)
			}
		})
	})
}

export const postRequest = (options) => {
	return new Promise((resolve, reject) => {
		var user = uni.getStorageSync("userinfo")
		var token = ""
		if (user) {
			token = 'Bearer ' + user.token
		}
		uni.request({
			url: baseURL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			timeout: 600000,
			header: {
				Authorization: token,
				'Content-Type': 'application/json'
			},
			success: (res) => {
				if (res.data.code == 0) {
					resolve(res)
				} else if (res.data.code == 401) {
					uni.login({
						provider: "weixin",
						success: function(res) {
							login({
								url: 'api/user/',
								method: 'post',
								data: {
									code: res.code
								}
							}).then(res => {
								postRequest(options)
							})
						}
					})
				} else {
					uni.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 2000
					});
				}
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}


export const login = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			timeout: 600000,
			header: {
				'Content-Type': 'application/json'
			},
			success: (res) => {
				if (res.data.code == 0) {
					uni.setStorage({
						key: "userinfo",
						data: res.data.result
					})
					resolve(res)
				} else {
					uni.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 2000
					});
				}
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}