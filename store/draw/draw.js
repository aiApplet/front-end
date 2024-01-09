// store/index.js
import {
	defineStore
} from 'pinia'
import {
	loras,
	random_prompts,
	styles,
	prompts,
	draw
} from '@/utils/all.js'
import {
	getCurrentInstance,
	computed,
	ref
} from 'vue';


export const useDrawStore = defineStore('draw', {
	state: () => {
		return {
			scrollTop: 10,
			prompt: '', //提示词
			promptValue: '',
			Negativeprompt: '', //反向提示词
			cueWordList: [], //随机提示词列表
			modelIndex: 0, //选中风格下标
			modelList: [], //风格列表
			LoRAIndex: 0, //选中lora下标
			LoRAList: [], //lora模型列表
			siezIndex: 0,
			siezList: [{
				w: 40,
				h: 40,
				size_x: 1,
				size_y: 1
			}, {
				w: 30,
				h: 60,
				size_x: 9,
				size_y: 16
			}, {
				w: 60,
				h: 30,
				size_x: 16,
				size_y: 9
			}, {
				w: 35,
				h: 50,
				size_x: 3,
				size_y: 4
			}, {
				w: 50,
				h: 35,
				size_x: 4,
				size_y: 3
			}],
			promptsList: [], //提示词助手列表
			promptsIndex: 0, //选中提示词助手类型
			promptsShowList: [], //提示词助手展示列表
			promptsSelect: [], //选中辅助词
			seed: -1,
			resultImg: ''
		}
	},
	actions: {
		init() {
			loras().then(res => {
				this.LoRAList = res.data.result
				this.LoRAList.unshift('')
			})
			styles().then(res => {
				this.modelList = res.data.result
			})
			prompts().then(res => {

				let newlist = []
				res.data.result.forEach((e, i) => {
					let arr = Object.entries(e.prompts);
					arr.forEach((e, i) => {
						let arr2 = Object.entries(e[1])
						arr[i][1] = arr2
					})
					let list = {
						name: e.name,
						prompts: arr
					}
					newlist.push(list)
				})
				this.promptsList = newlist
				this.promptsShowList = newlist[0].prompts
			})
		},
		draw() {
			let size = this.getSize()
			console.log(this.promptValue);
			let per = {
				prompt: this.promptValue,
				seed: this.seed,
				style: this.modelList[this.modelIndex].id,
				width: size.x,
				height: size.y,
			}
			if (this.LoRAIndex != 0) {
				per.lora = this.LoRAList[this.LoRAIndex].id
			}
			if (this.Negativeprompt.length != 0) {
				per.negative_prompt = this.Negativeprompt
			}
			uni.showLoading({
				title: '图片生成中',
				mask: true
			});
			draw(per).then(res => {
				this.resultImg = res.data.result.image
				console.log(res.data.result.image);
				uni.hideLoading();
				uni.previewImage({
					urls: [this.resultImg],
					current: 0
				});
			})
		},
		regeneration() {
			this.prompt = ''
			this.resultImg = ''
		},
		imgyl() {
			uni.previewImage({
				urls: [this.resultImg],
				current: 0
			});
		},
		getSize() {
			let size_x = this.siezList[this.siezIndex].size_x
			let size_y = this.siezList[this.siezIndex].size_y
			if (size_x > size_y) {
				return {
					x: 1000,
					y: parseInt((1000 / size_x) * size_y)
				}
			} else if (size_y > size_x) {
				return {
					x: parseInt((1000 / size_y) * size_x),
					y: 1000
				}
			} else {
				return {
					x: 1000,
					y: 1000
				}
			}
		},
		siezIndexChange(i) {
			this.siezIndex = i
		},
		LoRAIndexChange(i) {
			this.LoRAIndex = i
		},
		modelIndexChange(i) {
			this.modelIndex = i
		},
		promptsChange(e, i) {
			this.promptsIndex = i
			this.promptsShowList = []
			this.promptsShowList = e.prompts
			this.scrollTop = this.scrollTop === 0 ? 1 : 0
		},
		input(e) {
			this.prompt = e.detail.value

		},
		random_prompts() {
			random_prompts().then(res => {
				this.prompt = res.data.result.key
				this.promptValue = res.data.result.val
				// this.cueWordList = res.data.result.key.split(',')
			})
		},
		addPromptsSelect(e) {
			this.promptsSelect.push(e)
		},
		deletPromptsSelect(i) {
			this.promptsSelect.splice(i, 1)
		},
		useCueWord() {
			this.promptsSelect.forEach((e, i) => {
				this.prompt += e[0]
				this.prompt += ','
			})
			this.promptsSelect = []
		}
	},
})