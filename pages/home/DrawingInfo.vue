<template>
	<view class="con">
		<image class="image" @click="Store.showimg()" :src="Store.DrawingInfo.image" mode="widthFix"></image>
		<view class="box">
			<view class="title">
				<view class="text">
					<p class="bi"></p>关键词（英）
				</view>

				<view class="icon" @click="Store.copy()">
					<uv-icon name="file-text" color="#2979ff" size="24"></uv-icon>
				</view>
			</view>
			<p class="prompt">{{Store.DrawingInfo.config.prompt}}</p>
		</view>
		<view class="box">
			<view class="title">
				<view class="text">
					<p class="bi"></p>生成信息
				</view>
			</view>
			<view class="info-item">
				<p class="name">生成时间</p>
				<p class="name">{{Store.DrawingInfo.create_time}}</p>
			</view>
			<view class="info-item">
				<p class="name">分辨率</p>
				<p class="name">{{Store.DrawingInfo.config.width}}x{{Store.DrawingInfo.config.height}}</p>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		useDrawingRecordsStore
	} from '@/store/home/DrawingRecords'
	import {
		onShow,
		onReachBottom
	} from "@dcloudio/uni-app";

	const Store = useDrawingRecordsStore()
</script>

<style lang="scss">
	.con {
		width: 100vw;
		display: flex;
		padding-bottom: 100rpx;
		flex-direction: column;
	}

	.image {
		width: 90%;
		border-radius: 20rpx;
		height: auto;
		margin: 0 auto;
	}

	.box {
		margin: 0 auto;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		width: 90%;
		
		box-sizing: border-box;
		padding: 20rpx 40rpx;
		border-radius: 15rpx;
		background-color: white;

		.title {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.text {
				.bi {
					width: 10rpx;
					height: 30rpx;
					background-color: #1481fc;
					border-radius: 10rpx;
					margin-right: 15rpx;
				}

				display: flex;
				align-items: center;
				font-size: 28rpx;
			}
		}
		.prompt{
			margin-top: 20rpx;
		}
		.info-item{
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 27rpx;
			margin-top: 20rpx;
		}
	}
</style>