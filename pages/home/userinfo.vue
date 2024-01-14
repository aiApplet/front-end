<template>
	<view>
		<view class="imgbox" @click="Store.ChangeAvatar">
			<image class="head" :src="Store.userinfo.avatar" mode="aspectFill"></image>
			<view class="imgbosx">
				<image class="img" src="../../static/head.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="inputbox">
			<input @blur="Store.blur" type="nickname" :placeholder="请输入昵称" v-model="Store.userinfo.nickname">
		</view>
		<view class="btn" @click="Store.profilechange()">
			确定修改
		</view>
	</view>
</template>

<script setup>
	import {
		useUserinfoStore
	} from '@/store/home/userinfo'
	const Store = useUserinfoStore()
	import {
		onShow
	} from "@dcloudio/uni-app";
	onShow(() => {
		Store.init()
    // 打印app_id
	})
</script>


<style scoped lang="scss">
	.head {
		width: 220rpx;
		height: 220rpx;
		border-radius: 50%;
		background-color: #dddddd;
	}

	.tips {
		font-size: 24rpx;
		color: #666666;

		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 10rpx;
	}

	.btn {
		margin: 0 auto;
		margin-top: 18rpx;
		width: 352rpx;
		height: 72rpx;
		background: #FF5152;
		border-radius: 104rpx 104rpx 104rpx 104rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 400;
		color: #FFFFFF;
		font-size: 28rpx;
		box-shadow: 0rpx 8rpx 20rpx 0rpx rgba(205, 0, 0, 0.15);
	}

	.imgbox {
		width: 100%;
		height: 334rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;

		.imgbosx {
			position: absolute;
			left: 50%;
			top: 200rpx;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			width: 220rpx;
			margin-left: -110rpx;
			z-index: 50;

			.img {
				width: 68rpx;
				height: 68rpx;
			}
		}

	}

	.btn {
		margin: 0 auto;
		margin-top: 88rpx;
		width: 90%;
		height: 92rpx;
		background: #FF5152;
		border-radius: 104rpx 104rpx 104rpx 104rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 400;
		color: #FFFFFF;
		font-size: 28rpx;
	}

	.inputbox {
		margin: 0 auto;
		margin-top: 106rpx;
		width: 90%;
		height: 92rpx;
		background: #FFFFFF;
		border-radius: 12rpx 12rpx 12rpx 12rpx;
		border: 2rpx solid #EEEEEE;

		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding-left: 24rpx;

		input {
			font-size: 26rpx;
		}
	}

	.title {
		width: 90%;
		margin: 0 auto;
		font-size: 28rpx;
		font-weight: 500;
		color: #333333;
		margin-top: 40rpx;
	}
</style>