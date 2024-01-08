<template>
	<view class="navbar" :style="{height:IndexStore.BarHeight+IndexStore.navBareight +'px'}">
		<view class="narbar-content" :style="{height:IndexStore.navBareight+'px'}">
			<uv-icon name="search" size="28" color="#444548"></uv-icon>
		</view>
	</view>
	<swiper class="swiper" :indicator-dots="false" :autoplay="true" circular="true" :interval="3000" :duration="1000">
		<swiper-item v-for="(e,i) in IndexStore.swiperList" :key="i"  @click="IndexStore.link(e.link)">
			<view class="swiper-item" :style="{backgroundImage:'url('+e.image+')'}"></view>
		</swiper-item>
	</swiper>
	<view class="screen" :style="{'top':BarHeight+IndexStore.navBareight+'px'}">
		<view @click="IndexStore.Refresh">刷新</view>
		<view class="text">
			<p class="name">筛选</p>
			<uv-icon name="arrow-down" size="15" color="#909399"></uv-icon>
		</view>
	</view>
	<view class="padding-top-lg">
		<view class="waterfalls-flow">
			<view v-for="(item,index) in IndexStore.data.column" :key="index" class="waterfalls-flow-column"
				:style="{'width':IndexStore.w,'margin-left':index==0?0:IndexStore.m}"
				:id="`waterfalls_flow_column_${index+1}`">
				<view class="column-value" v-for="(item2,index2) in IndexStore.data[`column_${index+1}`]" :key="index2">
					<image :src="item2.image" mode="widthFix" @load="IndexStore.imgLoad(item2)"
						@error="IndexStore.imgError(item2)" class="imgsty"></image>
					<view class="introduce">
						{{item2.nickname}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		getCurrentInstance
	} from 'vue';
	import {
		onReachBottom,
		onLoad
	} from '@dcloudio/uni-app'
	import {
		useIndexStore
	} from '@/store/index'

	const IndexStore = useIndexStore()

	IndexStore.getconfiguration()
	onLoad(async (options) => {
		//加载全局变量
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
</script>

<style scoped lang="scss">
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
		margin-top: 10rpx;

		.swiper-item {
			background-repeat: no-repeat;
			background-position: 50% 50%;
			background-size: cover;
			width: 730rpx;
			height: 300rpx;
			background-color: #dcdcdc;
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

			font-size:26rpx;
			display: flex;
			align-items: center;
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

		.introduce {
			width: 100%;
			box-sizing: border-box;
			padding: 15rpx;
			margin: 0;
		}

		.imgsty {
			width: 100%;
			border-radius: 10rpx;
			margin: 0;
		}
	}
</style>