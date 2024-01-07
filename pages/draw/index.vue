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
			<p @click="DrawStore.random_prompts">随机一下</p>
			<p @click="openpopup">提示词助手</p>
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
					{{item.name}}
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

		<uv-popup ref="popup" mode="bottom" round="20">
			<view class="popup">
				<view class="title">
					<p class="bi"></p>选择提示词
				</view>
				<view class="content">
					<scroll-view scroll-y="true" class="types">
						<view @click="DrawStore.promptsChange(item,index)"
							:class="[{'types-select':DrawStore.promptsIndex==index},'types-item']"
							v-for="(item,index) in DrawStore.promptsList" :key="index">
							{{item.name}}
						</view>
					</scroll-view>
					<scroll-view scroll-y="true" class="list">
						<!-- <view class="list-item" v-for="(item,index) in DrawStore.promptsShowList" :key="index">
							<p class="list-item-title">{{item.title}}</p>
							
						</view> -->
					</scroll-view>
				</view>
				<view class="Auxiliary">
					<view class="title">
						已选择<span class="span">{{DrawStore.promptsSelect.length}}</span>个辅助词
					</view>
					<scroll-view scroll-x="true" class="list">
					</scroll-view>
					<view class="btn">
						使用这些提示词
					</view>
				</view>
			</view>
		</uv-popup>
	</view>
</template>

<script setup>
	import {
		useDrawStore
	} from '@/store/draw/draw'
	import {
		onMounted,
		ref
	} from 'vue';
	const popup = ref < any > (null);

	const DrawStore = useDrawStore()
	DrawStore.init()

	let openpopup = function() {
		popup.value.open()
	}
</script>

<style lang="scss">
	.popup {
		width: 750rpx;
		height: 990rpx;

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
			height: 80rpx;
			box-sizing: border-box;
			padding: 0 20rpx;
		}

		.content {

			width: 770rpx;
			height: 750rpx;
			display: flex;

			.types {
				background-color: #f8f8f8;
				width: 20%;

				&-item {
					width: 100%;
					height: 100rpx;
					color: #484848;
					font-size: 25rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				&-select {
					background-color: white;
					color: black;
				}
			}

			.list {
				width: 80%;
			}
		}

		.Auxiliary {
			width: 750rpx;
			height: 200rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.title{
				width: 100%;
				margin-top: 10rpx;
				height: 50rpx;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				padding: 0 20rpx;
				font-size: 25rpx;
				.span{
					color: #3c9cff;
				}
			}
			.list{
				width: 100%;
				height: 90rpx;
				box-sizing: border-box;
				padding: 0 20rpx;
			}
			.btn{
				margin: 0 auto;
				width: 70%;
				height: 50rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 25rpx;
				color: white;
				background-color: #3c9cff;
				border-radius: 10rpx;
			}
		}
	}

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
			flex-wrap: wrap;

			&-item {
				margin-bottom: 15rpx;
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