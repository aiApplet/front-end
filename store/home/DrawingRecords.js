import {
	defineStore
} from 'pinia'
import {
	picturesId
} from '@/utils/all.js'

export const useDrawingRecordsStore = defineStore('DrawingRecords', {
	state: () => {
		return {
			list: [],
			page: 1,
			DrawingInfo: {}
		}
	},
	actions: {
		init() {
			const regionss = uni.getStorageSync("user")
			picturesId({
				user: regionss.id,
				page: this.page,
				size: 10
			}).then(res => {
				this.list = res.data.result.results
			})
		},
		ReachBottom() {
			this.page += 1
			const regionss = uni.getStorageSync("user")
			picturesId({
				user: regionss.id,
				page: this.page,
				size: 10
			}).then(res => {
				this.list = this.list.concat(res.data.result.results)
			})
		},
		// 查看图片详情
		info(e) {
			this.DrawingInfo = e
			uni.navigateTo({
				url: '/pages/home/DrawingInfo'
			})
		},
		copy() {
			uni.setClipboardData({
				data: this.DrawingInfo.config.prompt, // 设置要复制的文本内容
				success(res) {
					uni.showToast({
						title: '成功复制到剪贴板',
						duration: 2000
					});
				}
			})
		},
		showimg(){
			uni.previewImage({
				urls: [this.DrawingInfo.image],
				current: 0
			});
		}
	}
})