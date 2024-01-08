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
			userinfo:{
				avatar:'',
				nickname:'',
				balance:0,
				id: 0
			},
			list: [{
					name: '积分记录',
					icon: 'empty-history'
				},
				{
					name: '充值',
					icon: 'coupon-fill'
				},
				{
					name: '卡密兑换',
					icon: 'gift-fill'
				},
				{
					name: '绘图记录',
					icon: 'photo-fill'
				},
				{
					name: '分享记录',
					icon: 'account-fill'
				}
			]
		}
	},
	actions: {
		init() {
			getuser().then(res=>{
				this.userinfo = res.data.result
			})
		},
		signin(){
			signin().then(res=>{
				
			})
		}
	}
})