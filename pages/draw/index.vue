<template>
	<view class="container">
		<view class="prompt_box">
			<p class="title">提示词（Prompt）</p>
			<textarea class="textarea" @input="input" maxlength="10000" confirm-type="done" :value="DrawStore.prompt"
				name="" id="" placeholder="输入你想要的内容,支持中英文,用逗号分割." cols="30" rows="10"></textarea>
			<view class="Number">
				<p>{{DrawStore.prompt.length}}/1000</p>
			</view>
		</view>
		<view class="prompt_box">
			<p class="title">反向提示词（Negative prompt）</p>
			<textarea class="textarea" @input="input" maxlength="10000" confirm-type="done"
				:value="DrawStore.Negativeprompt" name="" id="" placeholder="输入你想要的内容,支持中英文,用逗号分割." cols="30"
				rows="10"></textarea>
			<view class="Number">
				<p>{{DrawStore.Negativeprompt.length}}/1000</p>
			</view>
		</view>
		<view class="cueWord">
			<p>随机一下</p>
			<p>提示词助手</p>
		</view>
		<view class="cueWordList">
			<view class="cueWordList-item" v-for="(item,index) in DrawStore.cueWordList" :key="index">
				{{item}}
			</view>
		</view>
		<view class="model">
			<view class="title">
				<p class="bi"></p>风格选择
			</view>
			<view class="modelList">
				<view class="modelList-item" v-for="(item,index) in DrawStore.modelList" :key="index">
					{{item}}
				</view>
				<view class="supplement" v-if="DrawStore.modelList.length%2==0"></view>
			</view>
		</view>
		<view class="LoRA">
			<view class="title">
				<p class="bi"></p>LoRA模型选择
			</view>
			<view class="LoRAList">
				<view class="LoRAList-item" v-for="(item,index) in DrawStore.LoRAList" :key="index">
					<view class="LoRAList-item-text">
						{{item}}
					</view>
				</view>
				<view class="supplement" v-if="DrawStore.LoRAList.length%2==0"></view>
			</view>
		</view>
		<view class="seed">
			<view class="title">
				<p class="bi"></p>随机种子
			</view>
			<input type="text" :value="DrawStore.seed" class="seedinput" />
		</view>
	</view>
</template>

<script setup>
	import {
		useDrawStore
	} from '@/store/draw/draw'
	const DrawStore = useDrawStore()
	// DrawStore.init()
	
	
</script>

<style lang="scss">
	.container {
		box-sizing: border-box;
		width: 750rpx;
		padding: 0 20rpx;

		.seed {
			width: 100%;
			margin-top: 30rpx;
			padding-bottom: 150rpx;

			.title {
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

			.seedinput {
				width: 100%;
				height: 60rpx;
				box-sizing: border-box;
				border: 1px solid #919191;
				border-radius: 10rpx;
				padding: 0rpx 20rpx;

				font-size: 25rpx;
				margin-top: 10rpx;
			}
		}

		.prompt_box {
			margin-bottom: 20rpx;
			width: 100%;
			box-sizing: border-box;
			padding: 25rpx;
			border-radius: 15rpx;
			background-color: #efefef;

			.title {
				font-size: 28rpx;
				font-weight: bold;
				color: #1481fc;
			}

			.textarea {
				width: 100%;
				height: 240rpx;
				margin-top: 15rpx;
				font-size: 24rpx;
			}

			.Number {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				font-size: 24rpx;
				color: #aaaaaa;
			}
		}

		.cueWord {

			color: #1481fc;
			font-size: 25rpx;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.cueWordList {
			margin-top: 15rpx;
			display: flex;
			align-items: center;

			&-item {
				font-size: 24rpx;
				padding: 5rpx 15rpx;
				border-radius: 10rpx;
				background-color: #efefef;
				color: #878787;
				margin-right: 15rpx;
			}
		}

		.model {
			width: 100%;
			margin-top: 30rpx;

			.title {
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

			.modelList {
				width: 100%;
				box-sizing: border-box;
				padding: 0 25rpx;
				margin-top: 20rpx;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				.seedinput {
					width: 100%;
					height: 60rpx;
					box-sizing: border-box;
					border: 1px solid #919191;
					border-radius: 10rpx;
					padding: 0rpx 20rpx;
				
					font-size: 25rpx;
					margin-top: 10rpx;
				}
				&-item {
					width: 210rpx;
					height: 65rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					font-size: 24rpx;
					border-radius: 10rpx;
					background-color: #efefef;
					color: #484848;
					margin-bottom: 20rpx;
				}
			}
		}

		.LoRA {
			width: 100%;
			margin-top: 30rpx;

			.title {
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

			.LoRAList {
				width: 100%;
				box-sizing: border-box;
				padding: 0 25rpx;
				margin-top: 20rpx;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.supplement {
					width: 210rpx;
				}

				&-item {
					width: 210rpx;
					height: 160rpx;
					overflow: hidden;
					border-radius: 10rpx;
					position: relative;
					background-repeat: no-repeat;
					background-position: 50% 50%;
					background-size: cover;
					background-color: #d3d3d3;
					margin-bottom: 20rpx;

					&-text {
						position: absolute;
						left: 0;
						bottom: 0;
						width: 210rpx;
						height: 50rpx;
						background-color: #818181;
						color: white;
						font-size: 24rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						opacity: 0.7;
					}
				}
			}
		}
	}
</style>