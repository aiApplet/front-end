<template>
	<view class="user">
		<image class="avatar" :src="HomeStore.userinfo.avatar" mode="aspectFill"></image>
		<view class="userbox">
			<p class="phone">{{HomeStore.userinfo.nickname}}</p>
			<view class="tips">
				ID:{{HomeStore.userinfo.id}}
			</view>
		</view>
		<view class="btn" @click="HomeStore.signin">
			签到
		</view>
	</view>
	<view class="sz">
		<view class="box">
			<p class="nm">{{HomeStore.userinfo.balance}}</p>
			<p class="tips">积分</p>
		</view>
		<view class="box">
			<p class="nm">0</p>
			<p class="tips">分享人数</p>
		</view>
		<view class="box">
			<p class="nm">0</p>
			<p class="tips">绘图次数</p>
		</view>
	</view>
	<view class="list">
		<view class="list_box" v-for="(item,index) in HomeStore.list" >
			<view class="img">
				<uv-icon :name="item.icon" color="#2979ff" size="28"></uv-icon>
			</view>
			
			<view class="nr">
				{{item.name}}
				<view class="image">
					<uv-icon name="arrow-right" color="#848484" size="20"></uv-icon>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		useHomeStore
	} from '@/store/home/index'
	const HomeStore = useHomeStore()
	HomeStore.init()
</script>

<style lang="scss">
	.csss {
		width: 750rpx;
		border-radius: 20rpx 20rpx 0 0;
		background-color: white;
		height: 50vh;
		box-sizing: border-box;
		padding: 70rpx 30rpx 30rpx 20rpx;
	}

	.cent {
		width: 650rpx;
		height: 400rpx;
		border-radius: 20rpx;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		.title {
			font-size: 28rpx;
			margin-bottom: 20rpx;
		}

		
	}

	.list {
		width: 750rpx;

		.list_box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;

			.img {
				margin: 0 28rpx;
			}
		}

		.nr {
			width: 87%;
			height: 116rpx;
			font-size: 28rpx;
			display: flex;
			font-weight: 400;
			color: #333333;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #EEEEEE;

			.image {
				margin: 0 30rpx;
				width: 20rpx;
				height: auto;
			}
		}
	}

	.geduan {
		width: 750rpx;
		height: 16rpx;
		background: #EEEEEE;
	}

	.sz {

		width: 692rpx;
		margin: 0 auto;
		margin-bottom: 50rpx;
		display: flex;
		align-items: center;
		justify-content: space-evenly;

		.box {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 33%;

			justify-content: center;

			.nm {
				font-weight: bold;
				font-size: 40rpx;
				color: #333333;
				line-height: 47rpx;
			}

			.tips {
				margin-top: 8rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #999999;
				line-height: 28rpx;
			}
		}
	}

	.user {
		width: 692rpx;
		margin: 36rpx auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.avatar{
			width: 132rpx;
			height: 132rpx;
			border-radius: 50%;
			background-color: #ececec;
		}
		.userbox {
			display: flex;
			flex-direction: column;
			width: 400rpx;

			.phone {
				font-weight: 600;
				color: #333333;
				font-size: 32rpx;
				margin-bottom: 12rpx;
				line-height: 38rpx;
			}

			.tips {
				color: #999999;
				font-size: 24rpx;
				line-height: 28rpx;
				display: flex;
				align-items: center;

				.icon {
					margin: 0 20rpx;
					width: 30rpx;
					border-radius: 50%;
					height: auto;
				}
			}
		}

		.btn {

			height: 50rpx;
			line-height: 50rpx;
			font-size: 24rpx;
			background: #FF5152;
			border-radius: 58rpx 58rpx 58rpx 58rpx;
			text-align: center;
			font-weight: 400;
			color: #FFFFFF;
			padding: 0 20rpx;
		}
	}
</style>