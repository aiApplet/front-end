import {
	defineStore,
} from 'pinia'
import {
	getuser,
	cuser
} from '@/utils/all.js'

export const useUserinfoStore = defineStore('userinfo', {
	state: () => {
		return {
			userinfo: {
				id: 0,
				avatar: '',
				nickname: '',
				balance: 0,
				id: 0,
				shares_count: 0,
				draw_count: 0,
				sign_in: false
			},
		}
	},
	actions: {
		init() {
			getuser().then(res => {
				this.userinfo = res.data.result
			})

		},
		blur(e) {
			this.userinfo.nickname = e.detail.value
		},
		profilechange() {
			cuser({
				id: this.userinfo.id,
				nickname: this.userinfo.nickname,
				avatar: this.userinfo.avatar,
			}).then(res => {
				if (res.data.code == 0) {
					uni.showToast({
						title: '修改成功',
						duration: 2000
					});
					uni.navigateBack()
				}
			})
		}
	}
})