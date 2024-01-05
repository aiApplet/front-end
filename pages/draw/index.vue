<template>
	<view class="container">
		<view class="prompt_box">
			<p class="title">提示词（Prompt）</p>
			<textarea class="textarea" @input="input" maxlength="10000" confirm-type="done" :value="prompt" name=""
				id="" placeholder="输入你想要的内容,支持中英文,用逗号分割." cols="30" rows="10"></textarea>
			<view class="Number">
				<p>{{prompt.length}}/1000</p>
			</view>
		</view>
		<view class="cueWord">
			<p>随机一下</p>
			<p>提示词助手</p>
		</view>
		<view class="cueWordList">
			<view class="cueWordList-item" v-for="(item,index) in cueWordList" :key="index">
				{{item}}
			</view>
		</view>
		<view class="model">
			<view class="title">
				<p class="bi"></p>大模型选择
			</view>
			<view class="modelList">
				<view class="modelList-item" v-for="(item,index) in modelList" :key="index">
					{{item}}
				</view>
			</view>
		</view>
		<view class="LoRA">
			<view class="title">
				<p class="bi"></p>LoRA模型选择
			</view>
			<view class="LoRAList">
				<view class="LoRAList-item" v-for="(item,index) in LoRAList" :key="index">
					{{item}}
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	const prompt = ref('') //提示词
	const cueWordList = ref([
		'猫女', '森林经理', '匪徒', '匪徒', '萝莉', '美女',
	]) //随机提示词列表
	const modelList = ref([
		'国风', '二次元', '真人', '真实', '漫画', '头像','2.5D'
	]) //大模型列表
	const LoRAList = ref([
		
	]) //大模型列表
	
	// 提示词输入
	function input(e) {
		prompt.value = e.detail.value
	}
</script>

<style lang="scss">
	.container {
		box-sizing: border-box;
		width: 750rpx;
		padding: 0 20rpx;

		.prompt_box {
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
			margin-top: 20rpx;
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
			.modelList{
				width: 100%;
				box-sizing: border-box;
				padding: 0 25rpx;
				margin-top: 20rpx;
				display: flex;
				justify-content: space-between;
				flex-wrap:wrap;
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
		.LoRA{
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
		}
	}
</style>