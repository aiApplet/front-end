<script>
	import {
		getCurrentInstance,
		ref
	} from 'vue';
	import {
		user,
		getuser
	} from '@/utils/all.js'
	export default {
		onLaunch: async function(e) {
			console.log(e);
			const {
				proxy
			} = getCurrentInstance();
			let that = this
			uni.login({
				provider: "weixin",
				success: function(res) {
					const per = {
						code: res.code
					}
					// 邀请人id
					if(e.query.share){
						per.parent_id = e.query.share
					}
					user(per).then(res => {
						uni.setStorage({
							key: "userinfo",
							data: res.data.result,
							success() {
								proxy.$isResolve();
							}
						})
						getuser().then(res=>{
							uni.setStorage({
								key: "user",
								data: res.data.result,
								success() {}
							})
						})
					})
				},
				fail(res) {
					proxy.$isResolve();
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