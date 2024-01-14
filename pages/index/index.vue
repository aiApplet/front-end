<template>
	<!-- <view class="navbar" :style="{height:IndexStore.BarHeight+IndexStore.navBareight +'px'}"> -->
	<!-- <view class="narbar-content" :style="{height:IndexStore.navBareight+'px'}">
      <uv-icon name="search" size="28" color="#444548"></uv-icon>
    </view> -->
	<!-- </view> -->
	<swiper class="swiper" :indicator-dots="false" :autoplay="true" circular="true" :interval="3000" :duration="1000">
		<swiper-item v-for="(e,i) in IndexStore.swiperList" :key="i" @click="IndexStore.swiperlink(e.link)">
			<view class="swiper-item" :style="{backgroundImage:'url('+e.image+')'}"></view>
		</swiper-item>
	</swiper>
	<view class="screen" :style="{'top':BarHeight+IndexStore.navBareight+'px'}">
		<view :class="[{'text-select':IndexStore.styles_index!=null},'text']" @click="popupOpen()">
			<p class="name">筛选</p>
			<uv-icon name="arrow-down" size="15" :color="IndexStore.styles_index!=null?'#3c9cff':'#a1a1a1'"></uv-icon>
		</view>
	</view>
	<view class="padding-top-lg">
		<view class="waterfalls-flow">
			<view v-for="(item,index) in IndexStore.data.column" :key="index" class="waterfalls-flow-column"
				:style="{'width':IndexStore.w,'margin-left':index==0?0:IndexStore.m}"
				:id="`waterfalls_flow_column_${index+1}`">
				<view class="column-value" @click="imgshow(item2)"
					v-for="(item2,index2) in IndexStore.data[`column_${index+1}`]" :key="index2">
					<image :src="item2.image" mode="widthFix" @load="IndexStore.imgLoad(item2)"
						@error="IndexStore.imgError(item2)" class="imgsty"></image>
					<view class="img-prompt">
						{{item2.config.prompt}}
					</view>
					<view class="introduce">
						<view class="user">
							<image class="avatar" :src="item2.avatar" mode="aspectFill"></image>
							<p class="nickname">{{ item2.nickname }}</p>
						</view>
						<view class="count">
							<uv-icon name="file-text" color="#797979" size="16"></uv-icon>
							<p class="item ri">{{ item2.comment_count }}</p>
							<uv-icon :name="item2.is_like? 'heart-fill':'heart'"
								:color="item2.is_like? '#ff0000':'#797979'" size="16"></uv-icon>
							<p class="item">{{ item2.like_count }}</p>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>

	<uv-popup ref="popup" mode="bottom" round="20" @change="IndexStore.popupChange">
		<view class="screenBox">
			<scroll-view scroll-y="true" class="screenList">
				<view>
					<p class="title">风格</p>
					<view class="list">
						<view @click="popupClose(item,index)"
							:class="[{'list-select':IndexStore.styles_index==index},'list-item']"
							v-for="(item,index) in IndexStore.styles_list">
							{{item.name}}
						</view>
					</view>
				</view>
			</scroll-view>
			<!-- <view class="screenBottom">
				<view class="clear" @click="popupClear()">清空</view>
				<view class="save" @click="popupClose()">保存</view>
			</view> -->
		</view>
	</uv-popup>
</template>

<script setup>
	import {
		ref,
		getCurrentInstance
	} from 'vue';
	import {
		onReachBottom,
		onLoad,
		onShareAppMessage,
		onShareTimeline,
		onPullDownRefresh
	} from '@dcloudio/uni-app'
	import {
		useIndexStore
	} from '@/store/index/index'
	import {
		usePictureDetailsStore
	} from '@/store/index/pictureDetails'

	const popup = ref(null);
	const IndexStore = useIndexStore()
	const Store = usePictureDetailsStore()
	IndexStore.getconfiguration()

	onLoad(async (options) => {
		// 加载全局变量
		// 获取vue3全局对象
		const {
			proxy
		} = getCurrentInstance();
		await proxy.$onLaunched;
		IndexStore.init()
	})
	// 触底加载
	onReachBottom(() => {
		IndexStore.Bottoming(0);
	})
	// 下拉刷新
	onPullDownRefresh(() => {
		IndexStore.Refresh()
	})
	let imgshow = function(e) {
		Store.init(e)
		uni.navigateTo({
			url: '/pages/index/pictureDetails'
		})
	}
	let popupOpen = function() {
		popup.value.open()
	}
	let popupClose = function(item, index) {
		IndexStore.styles_select(item, index)
		popup.value.close()
	}
	let popupClear = function() {
		popup.value.close()
	}

	// 分享
	const regionss = uni.getStorageSync("user")
	onShareAppMessage(() => {
		return {
			title: "AI绘图仙",
			path: '/pages/index/index?share=' + regionss.id,
			success: res => {},
			fail: err => {}
		};
	})
	onShareTimeline(() => {
		return {
			title: 'AI绘图仙',
			path: '/pages/index/index',
			query: 'share=' + regionss.id,
		}
	})
</script>

<style scoped lang="scss">
	.screenBox {
		width: 750rpx;
		height: 800rpx;

		.screenList {
			width: 750rpx;
			height: 800rpx;
			box-sizing: border-box;
			padding: 20rpx 45rpx;

			.title {
				width: 100%;
				margin-top: 30rpx;
				font-size: 35rpx;
				font-weight: bold;
			}

			.list {
				margin-top: 20rpx;
				width: 100%;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				&-item {
					border-radius: 40rpx;
					padding: 20rpx 70rpx;
					font-size: 25rpx;
					margin-bottom: 20rpx;
					background-color: #eaeaea;
				}

				&-select {
					color: white;
					background-color: #3c9cff;
				}
			}
		}

		.screenBottom {
			width: 750rpx;
			height: 120rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-top: 1px solid #eaeaea;
			box-sizing: border-box;
			padding: 0 40rpx;

			.clear {
				width: 38%;
				height: 80rpx;
				background-color: #d3d3d3;
				border-radius: 15rpx;
				color: white;
				line-height: 80rpx;
				text-align: center;
				font-size: 30rpx;
				font-weight: bold;
			}

			.save {
				width: 60%;
				height: 80rpx;
				background-color: #3c9cff;
				border-radius: 15rpx;
				line-height: 80rpx;
				text-align: center;
				color: white;
				font-size: 30rpx;
				font-weight: bold;
			}
		}
	}

	.navbar {
		width: 100vw;
		position: relative;
		position: sticky;
		z-index: 5;
		top: 0;
		left: 0;
		background-color: white;

		.narbar-content {
			position: absolute;
			left: 0;
			bottom: 0;
			box-sizing: border-box;
			padding: 0 10rpx;
			// background-color: skyblue;
			display: flex;
			align-items: center;
		}
	}

	.swiper {
		width: 730rpx;
		height: 300rpx;
		margin: 0 auto;
		background-color: #eaeaea;
		margin-top: 10rpx;
		border-radius: 20rpx;

		.swiper-item {
			background-repeat: no-repeat;
			background-position: 50% 50%;
			background-size: cover;
			width: 730rpx;
			height: 300rpx;
			background-color: #eaeaea;
			border-radius: 20rpx;
		}
	}

	.screen {
		padding: 15rpx 10rpx;
		box-sizing: border-box;
		width: 750rpx;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: sticky;
		z-index: 5;
		border-radius: 0 0 10rpx 10rpx;
		left: 0;
		background-color: #f8f8f8;

		.text {
			.name {
				margin-right: 20rpx;
			}

			font-size: 26rpx;
			display: flex;
			align-items: center;
		}

		.text-select {
			color: #3c9cff;
		}
	}

	.padding-top-lg {
		width: 730rpx;
		margin: 0 auto;
	}

	.waterfalls-flow {
		position: relative;
		display: flex;
		min-height: 200rpx;

		&-column {
			// float: left;
			// display: inline-block;

			padding: 0 0 200upx;
			align-self: flex-start;
		}

		#waterfalls_flow_column_1 {
			// float: left;
			// position: absolute;
			// top: 0;
			// left: 0;
		}

		#waterfalls_flow_column_2 {
			// position: absolute;
			// top: 0;
			// right: 0;
			// float: left;
		}
	}

	.column-value {
		margin-top: 20rpx;
		width: 100%;
		border-radius: 15rpx;
		box-shadow: 0 0 10rpx #ebebeb;
		background-color: #ffffff;
		animation: opacityChange 0.5s normal 0.5s forwards;
		opacity: 0;

		@keyframes opacityChange {
			from {
				opacity: 0;
			}

			to {
				opacity: 1;
			}
		}

		.img-prompt {
			width: 100%;
			box-sizing: border-box;
			padding: 0 15rpx;
			font-size: 24rpx;
			color: #797979;
			word-break: break-all;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}

		.introduce {
			width: 100%;
			box-sizing: border-box;
			padding: 15rpx;
			margin: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.user {
				display: flex;
				align-items: center;

				.avatar {
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					margin-right: 15rpx;
				}

				.nickname {
					font-size: 24rpx;
					color: #797979;
					width: 170rpx;
					word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
			}

			.count {
				display: flex;
				align-items: center;

				.item {
					margin: 0 5rpx;
					font-size: 24rpx;
					color: #797979;
				}

				.ri {
					margin-right: 10rpx;
				}
			}
		}

		.imgsty {
			width: 100%;
			border-radius: 10rpx;
			margin: 0;
		}
	}
</style>