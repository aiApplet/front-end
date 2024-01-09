<template>
	<view class="con">
		<input type="text" class="input" @blur="Store.blur" placeholder="请输入卡密" />
		<view class="btn" @click="Store.exchange()">
			确定兑换
		</view>
	</view>
</template>

<script setup>
	import {
		useExchangeStore
	} from '@/store/home/exchange'
	const Store = useExchangeStore()
	import {
		onShow
	} from "@dcloudio/uni-app";
</script>

<style lang="scss">
	.con{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100vw;
		height: 100vh;
	}
	.input {
		width: 600rpx;
		padding: 20rpx;
		border-radius: 10rpx;
		font-size: 25rpx;
		border: 1px solid #dfdfdf;
		margin: 0 auto;
	}

	.btn {
		margin: 0 auto;
		margin-top: 88rpx;
		width: 90%;
		height: 92rpx;
		background: #2979ff;
		border-radius: 104rpx 104rpx 104rpx 104rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 400;
		color: #FFFFFF;
		font-size: 28rpx;
	}
</style>