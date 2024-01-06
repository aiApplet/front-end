<script>
	import {
		user
	} from '@/utils/all.js'
	export default {
		onLaunch: function() {
			let that = this
			uni.login({
				provider: "weixin",
				success: function(res) {
					user({
						code: res.code
					}).then(res => {
						uni.setStorage({
							key: "userinfo",
							data: res.data.result,
							success() {
								
							}
						})
					})
				},
				fail(res) {
					console.log(res);
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uv-ui-tools/index.scss';
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	// 设置整个项目的背景色
	page {
		background-color: #F8F8F8;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
