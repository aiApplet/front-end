<template>
	<view class="tips" v-if="Store.list.length==0">
		<uv-empty mode="history"></uv-empty>
	</view>
	<view class="list">
		<view class="list-item" v-for="(item,index) in Store.list" @click="Store.info(item)">
			<view class="imgbox">
				<image class="image" :src="item.image" mode="aspectFill"></image>
			</view>
			<view class="list-item-nr">
				<p class="title">{{item.config.prompt}}</p>
				<p class="time">{{item.create_time}}</p>
			</view>
		</view>
		<view class="list-d"></view>
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
	onShow(() => {
		Store.init()
	})
	onReachBottom(()=>{
		Store.ReachBottom()
	})
</script>

<style lang="scss">
	.tips{
		width: 100%;
		height: 100vh;
		box-sizing: border-box;
		padding-top: 250rpx;
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}
	.list {
		width: 100%;
		display: flex;
		justify-content: space-evenly;
		flex-wrap: wrap;

		&-item {
			width: 46%;
			height: 500rpx;
			border-radius: 10rpx;
			box-shadow: 0 0 15rpx 1rpx #e6e6e6;
			margin-top: 20rpx;
			.imgbox{
				width: 100%;
				height: 400rpx;
				.image{
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
				}
			}
			&-nr{
				width: 100%;
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				.title{
					width: 90%;
					font-size: 26rpx;
					color: #444444;
					word-break:break-all;
					display: -webkit-box;
					-webkit-line-clamp:1;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
				.time{
					width: 90%;
					font-size: 24rpx;
					margin-top: 8rpx;
					color: #969696;
				}
			}
		}
		&-d{
			width: 48%;
			height: 200rpx;
		}
	}
</style>