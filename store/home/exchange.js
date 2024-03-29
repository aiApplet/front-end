import {
	defineStore,
} from 'pinia'
import {
	getuser,
	rechargeable_card
} from '@/utils/all.js'

export const useExchangeStore = defineStore('exchange', {
	state: () => {
		return {
			value: ''
		}
	},
	actions: {
		blur(e) {
			this.value = e.detail.value
		},
		exchange() {
			rechargeable_card({
				card_number: this.value
			}).then(res => {
				if (res.data.code == 0) {
					uni.showToast({
						title: '兑换成功',
						duration: 2000
					});
					getuser().then(res=>{
						uni.setStorage({
							key: "user",
							data: res.data.result,
						})
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 2000)
				}
			})
		}
	}
})