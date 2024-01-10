<template>
	<view>
		<view class="tips" v-if="Store.list.length==0">
			<uv-empty mode="history"></uv-empty>
		</view>
		<view class="list" v-for="(item,index) in Store.list">
			<view class="list-left">
				<p class="remark">{{item.remark}}</p>
				<p class="time">{{item.create_time}}</p>
			</view>
			<view class="list-right">
				<p class="num">{{item.balance}}</p>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		useIntegralRecordStore
	} from '@/store/home/IntegralRecord'
	const Store = useIntegralRecordStore()
	import {
		onShow
	} from "@dcloudio/uni-app";
	onShow(() => {
		Store.init()
	})
</script>


<style scoped lang="scss">
	.tips{
		width: 100%;
		height: 100vh;
		box-sizing: border-box;
		padding-top: 250rpx;
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}
	.list{
		width: 90vw;
		margin: 0 auto;
		padding: 24rpx;
		border-bottom: 1px solid #d6d6d6;
		display: flex;
		align-items: center;
		justify-content: space-between;
		&-left{
			display: flex;
			flex-direction: column;
			.remark{
				font-size: 27rpx;
				margin-bottom: 15rpx;
				color: #787878;
			}
			.time{
				font-size: 24rpx;
				color: #c1c1c1;
			}
		}
		&-right{
			.num{
				font-size: 30rpx;
				font-weight: bold;
				color: #3c9cff;
			}
		}
	}
</style>