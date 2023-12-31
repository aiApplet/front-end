import {
	defineStore
} from 'pinia'
import {
	getuser,
	signin
} from '@/utils/all.js'

export const useHomeStore = defineStore('home', {
	state: () => {
		return {
			userinfo: {
				avatar: '',
				nickname: '',
				balance: 0,
				id: 0,
				shares_count: 0,
				draw_count: 0,
				sign_in: false
			},
			list: [{
					name: '积分明细',
					icon: 'empty-history',
					url: '/pages/home/IntegralRecord'
				},
				{
					name: '充值',
					icon: 'coupon-fill'
				},
				{
					name: '卡密兑换',
					icon: 'gift-fill',
					url: '/pages/home/exchange'
				},
				{
					name: '绘图记录',
					icon: 'photo-fill',
					url: '/pages/home/DrawingRecords'
				},
				{
					name: '分享',
					icon: 'account-fill'
				}
			]
		}
	},
	actions: {
		init() {
			getuser().then(res => {
				this.userinfo = res.data.result
			})
		},
		junp(e) {
			uni.navigateTo({
				url: e
			})
		},
		changeAvatar() {
			uni.chooseImage({
				success(res) {
					console.log(res);
				}
			})
		},
		signin() {
			signin().then(res => {
				if (res.data.code == 0) {
					this.userinfo.sign_in = false
					this.userinfo.balance += 1
					uni.showToast({
						title: '签到成功',
						duration: 2000
					});
				}
			})
		},
		link(e) {
			uni.navigateTo({
				url: e.url
			})
		}
	}
})