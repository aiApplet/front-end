import {
	defineStore
} from 'pinia'
import {
	set_user_comment,
	user_comment,
	delet_user_like,
	user_like
} from '@/utils/all.js'

export const usePictureDetailsStore = defineStore('pictureDetails', {
	state: () => {
		return {
			DrawingInfo: {
				image: '',
				config: {
					prompt: '',
					create_time: '',
					config: {
						width: 0,
						height: 0
					}
				}
			},
			page: 1,
			CommentList: [],
			keyheight: 0,
			inputValue:''//评论内容
		}
	},
	actions: {
		init(e) {
			this.DrawingInfo = e
			user_comment({
				history: this.DrawingInfo.id,
				page: this.page,
				size: 20
			}).then(res => {
				this.CommentList = res.data.result.results
			})
			let ua = uni.getSystemInfoSync().platform;
			if (/ios/i.test(ua)) {
				// 苹果
				uni.onKeyboardHeightChange((res) => {
					let that = this
					setTimeout(() => {
						if (res.height != 0) {
							that.keyheight = 0
						} else {
							that.keyheight = 80
						}
					}, 1)
				})
			} else if (/android/i.test(ua)) {
				// 安卓
			}
		},
		showimg(){
			uni.previewImage({
				urls: [this.DrawingInfo.image],
				current: 0
			});
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
		// 发布评论
		send(){
			set_user_comment({
				content:this.inputValue,
				history:this.DrawingInfo.id
			}).then(res=>{
				
			})
		},
		// 爱心
		like(){
			if(this.DrawingInfo.is_like){
				delet_user_like({
					id:this.DrawingInfo.id
				}).then(res=>{
					if(res.data.code==0){
						this.DrawingInfo.is_like=!this.DrawingInfo.is_like
					}
				})
			}else{
				user_like({
					history:this.DrawingInfo.id
				}).then(res=>{
					if(res.data.code==0){
						this.DrawingInfo.is_like=!this.DrawingInfo.is_like
					}
				})
			}
		},
		ReachBottom() {

		},
	}
})