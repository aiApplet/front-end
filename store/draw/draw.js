// store/index.js
import {
	defineStore
} from 'pinia'
import {
	loras,
	random_prompts,
	styles,
	prompts
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
			Negativeprompt: '', //反向提示词
			cueWordList: [], //随机提示词列表
			modelIndex: 0,
			modelList: ['国风', '二次元', '真人', '真实', '漫画', '头像', '2.5D'], //风格列表
			LoRAList: ['国风', '二次元', '真人', '真实', '漫画', '头像', '2.5D'], //lora模型列表
			promptsList: [], //提示词助手列表
			promptsIndex: 0, //选中提示词助手类型
			promptsShowList: [], //提示词助手展示列表
			promptsSelect: [], //选中辅助词
			seed: -1
		}
	},
	actions: {
		init() {
			loras().then(res => {

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