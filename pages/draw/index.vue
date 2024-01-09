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
				<view :class="[{'modelList-select':DrawStore.modelIndex==index},'modelList-item']"
					v-for="(item,index) in DrawStore.modelList" :key="index" @click="DrawStore.modelIndexChange(index)">
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
				<view :class="[{'LoRAList-select':DrawStore.LoRAIndex==index},'LoRAList-item']"
					v-for="(item,index) in DrawStore.LoRAList" :key="index" @click="DrawStore.LoRAIndexChange(index)">
					<view class="icon" v-if="index==0">
						<uv-icon name="close-circle" color="#9a9a9a" size="28"></uv-icon>
					</view>
					<view class="LoRAList-item-text" v-if="index!=0">
						{{item}}
					</view>
				</view>
				<view class="supplement" v-if="DrawStore.LoRAList.length%2==0"></view>
			</view>
		</view>
		<view class="size">
			<view class="title">
				<p class="bi"></p>尺寸比例
			</view>
			<view class="sizelist">
				<view :class="[{'sizelist-select':DrawStore.siezIndex==index},'sizelist-item']"
					v-for="(item,index) in DrawStore.siezList" @click="DrawStore.siezIndexChange(index)">
					<view class="vbox" :style="{width:item.w+'rpx',height:item.h+'rpx'}"></view>
					<p class="text">{{item.size_x}}:{{item.size_y}}</p>
				</view>
			</view>
		</view>
		<view class="seed">
			<view class="title">
				<p class="bi"></p>随机种子
			</view>
			<input type="text" :value="DrawStore.seed" class="seedinput" />
		</view>
		<view class="generate">
			<view class="btn" @click="DrawStore.draw()" v-if="DrawStore.resultImg.length==0">
				立即生成
			</view>
			<view class="btns" @click="DrawStore.imgyl()" v-if="DrawStore.resultImg.length!=0">
				查看图片
			</view>
			<view class="btns blue" @click="DrawStore.regeneration()" v-if="DrawStore.resultImg.length!=0">
				重新填写生成图片
			</view>
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
						<view class="z"></view>
					</scroll-view>
					<scroll-view scroll-y="true" class="list" :scroll-top="DrawStore.scrollTop">
						<view class="list-item" v-for="(item,index) in DrawStore.promptsShowList" :key="index">
							<p class="list-item-title">{{item[0]}}</p>
							<view class="words-list">
								<view class="words" @click="DrawStore.addPromptsSelect(e)" v-for="(e,i) in item[1]">
									{{e[0]}}
								</view>
							</view>
						</view>
						<view class="z"></view>
					</scroll-view>
				</view>
				<view class="Auxiliary">
					<view class="title">
						已选择<span class="span">{{DrawStore.promptsSelect.length}}</span>个辅助词
					</view>
					<scroll-view v-if="DrawStore.promptsSelect.length!=0" scroll-x="true" class="list">
						<view class="flexbox">
							<view class="list-item" @click="DrawStore.deletPromptsSelect(index)"
								v-for="(item,index) in DrawStore.promptsSelect">
								{{item[0]}}
							</view>
						</view>
					</scroll-view>
					<view class="btn" v-if="DrawStore.promptsSelect.length!=0" @click="useCueWord">
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
	const popup = ref(null);

	const DrawStore = useDrawStore()
	DrawStore.init()

	let openpopup = function() {
		popup.value.open()
	}
	let useCueWord = function() {
		DrawStore.useCueWord()
		popup.value.close()
	}
</script>

<style lang="scss">
	.imgbox {
		margin: 0;
		padding: 0;

		.resultImg {
			width: 750rpx;
			height: auto;
			margin: 0 auto;
			margin-top: 30rpx;
		}
	}


	.generate {
		width: 100%;
		height: 200rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		padding-bottom: 80rpx;

		.btns {
			margin: 0 auto;
			width: 70%;
			height: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 25rpx;
			color: white;
			background-color: #ffaa00;
			border-radius: 10rpx;
			margin-top: 10rpx;
			margin-bottom: 20rpx;
		}

		.btn {
			width: 75%;
			height: 80rpx;
			border-radius: 10rpx;
			font-size: 30rpx;
			color: white;
			background-color: #3c9cff;
			font-weight: bold;
			display: flex;
			align-items: center;
			justify-content: center;

		}

		.blue {
			background-color: #3c9cff;
		}
	}

	.popup {
		width: 750rpx;
		height: 1080rpx;
		position: relative;

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
			height: 100rpx;
			box-sizing: border-box;
			padding: 0 20rpx;
		}

		.content {

			width: 770rpx;
			height: 980rpx;
			display: flex;

			.z {
				width: 100%;
				height: 210rpx;
			}

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
				box-sizing: border-box;
				padding: 0 20rpx;

				&-item {
					margin-top: 30rpx;
					width: 100%;

					&-title {
						height: 40rpx;
						width: 100%;
						display: flex;
						align-items: center;
						font-size: 28rpx;
						margin-bottom: 20rpx;
						color: black;
					}
				}

				.words-list {
					width: 100%;

					.words {
						margin-right: 20rpx;
						margin-bottom: 20rpx;
						display: inline-block;
						padding: 5rpx 10rpx;
						background-color: #f8f8f8;
						border-radius: 5rpx;
						color: #ababab;
						font-size: 25rpx;
					}
				}
			}
		}

		.Auxiliary {
			width: 750rpx;
			background-color: white;
			position: absolute;
			left: 0;
			bottom: 0;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.title {
				width: 100%;
				margin-top: 10rpx;
				height: 60rpx;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				padding: 0 20rpx;
				font-size: 25rpx;

				.span {
					color: #3c9cff;
				}
			}

			.list {
				width: 100%;
				height: 50rpx;
				margin: 5rpx 0;
				box-sizing: border-box;
				padding: 0 20rpx;

				// display: flex;
				// align-items: center;
				.flexbox {
					display: flex;
					align-items: center;
				}

				&-item {
					color: #f9ae3d;
					padding: 5rpx 10rpx;
					border-radius: 10rpx;
					font-size: 25rpx;
					border: 1px solid #f9ae3d;
					margin-right: 20rpx;
					flex-shrink: 0;
					display: inline-block;
				}
			}

			.btn {
				margin: 0 auto;
				width: 70%;
				height: 60rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 25rpx;
				color: white;
				background-color: #3c9cff;
				border-radius: 10rpx;
				margin-top: 10rpx;
				margin-bottom: 20rpx;
			}

		}
	}

	.container {
		box-sizing: border-box;
		width: 750rpx;
		padding: 0 20rpx;

		.size {
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

			.sizelist {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 20rpx;

				&-item {
					width: 120rpx;
					height: 120rpx;
					border-radius: 10rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					font-size: 24rpx;
					color: #484848;
					border: 1px solid #8f8f8f;

					.vbox {
						background-color: #8f8f8f;
						border-radius: 10rpx;
					}

					.text {
						margin-top: 10rpx;
					}
				}

				&-select {
					border: 1px solid #3c9cff;
				}
			}
		}

		.seed {
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

				&-select {
					background-color: white;
					color: #3c9cff;
					box-sizing: border-box;
					border: 1px solid #3c9cff;
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
					background-color: #dfdfdf;
					margin-bottom: 20rpx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: center;

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
						opacity: 0.6;
					}
				}

				&-select {
					border: 2px solid #3c9cff;
				}
			}
		}
	}
</style>