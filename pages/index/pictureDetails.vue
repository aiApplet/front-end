<template>
	<view class="big">
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
			<view class="tips" v-if="Store.CommentList.length==0">
				<uv-empty text="无评论记录" mode="history"></uv-empty>
			</view>
			<view class="list" v-else>
				<view class="listbox" v-for="(item,index) in Store.CommentList">
					<image class="head" :src="item.avatar" mode="aspectFill"></image>
					<view class="nr">
						<p class="name">{{item.nickname}}</p>
						<p class="gm">{{item.content}}</p>
					</view>
					<view class="time">
						{{item.create_time}}
					</view>
				</view>
			</view>
			<!-- :style="{bottom:Store.keyheight}" -->
			<view class="bottom" :style="{bottom:Store.keyheight}">
				<view class="inputbox">
					<input maxlength="200" v-model="Store.inputValue" :cursor-spacing="80" type="text" placeholder="说点什么吧" class="input" />
					<view class="icon" @click="Store.send()">
						<uv-icon name="arrow-upward" color="#ffffff" size="16"></uv-icon>
					</view>
				</view>
				<view class="likeicon" @click="Store.like()">
					<uv-icon :name="Store.DrawingInfo.is_like? 'heart-fill':'heart'"
						:color="Store.DrawingInfo.is_like? '#ff0000':'#dcdcdc'" size="26"></uv-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		usePictureDetailsStore
	} from '@/store/index/pictureDetails'
	import {
		onShow,
		onReachBottom
	} from "@dcloudio/uni-app";

	const Store = usePictureDetailsStore()
</script>

<style lang="scss">
	.big{
		padding-bottom: 200rpx;
	}
	.bottom{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100vw;
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: white;
		border-top: 1px solid #f8f8f8;
		box-shadow: 0 0 15rpx 3rpx #e6e6e6;
		padding-bottom: env(safe-area-inset-bottom);
		.inputbox{
			width: 75%;
			height: 60rpx;
			position: relative;
			margin-right: 20rpx;
			
			.input{
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 60rpx;
				border-radius: 40rpx;
				background-color: #f0f0f0;
				font-size: 25rpx;
				box-sizing: border-box;
				padding: 0 60rpx 0 50rpx;
			}
			.icon{
				position: absolute;
				right: 10rpx;
				bottom: 6rpx;
				width: 50rpx;
				height: 50rpx;
				background-color: #1481fc;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
			}
		}
		.likeicon{
			width: 60rpx;
			height: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			box-shadow: 0 0 15rpx 1rpx #ececec;
			border-radius: 50%;
			box-sizing: border-box;
			padding-top: 8rpx;
			padding-left: 2rpx;
		}
	}
	.tips{
		width: 100%;
		height: 300rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.list{
		width: 100vw;
		.listbox {
			
			width: 90%;
			display: flex;
			align-items: flex-start;
			margin: 0 auto;
			margin-bottom: 20rpx;
			justify-content: space-between;
			background-color: white;
			border-radius: 20rpx;
			box-sizing: border-box;
			padding: 20rpx 20rpx;
			position: relative;
			.head{
				width: 88rpx;
				background-color: #f1f1f1;
				border-radius: 50%;
				height: 88rpx;
			}
			.nr {
				flex: 1;
				display: flex;
				justify-content: space-between;
				margin-left: 18rpx;
				flex-direction: column;
		
				.name {
					font-size: 28rpx;
					color: #5BB6EA
				}
		
				.gm {
					margin-top: 10rpx;
					font-size: 28rpx;
					line-height: 40rpx;
					width: 500rpx;
				}
			}
		
			.time {
				position: absolute;
				width: 210rpx;
				font-size: 20rpx;
				font-weight: 400;
				color: #999999;
				top: 20rpx;
				right: 20rpx;
			}
		}
	}
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

		.prompt {
			margin-top: 20rpx;
		}

		.info-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 27rpx;
			margin-top: 20rpx;
		}
	}
</style>