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
			prompt: '', //提示词
			Negativeprompt: '', //反向提示词
			cueWordList: [], //随机提示词列表
			modelList: ['国风', '二次元', '真人', '真实', '漫画', '头像', '2.5D'], //风格列表
			LoRAList: ['国风', '二次元', '真人', '真实', '漫画', '头像', '2.5D'], //lora模型列表
			promptsList:[],//提示词助手列表
			promptsIndex:0,//选中提示词助手类型
			promptsShowList:[],//提示词助手展示列表
			promptsSelect:[],//选中辅助词
			seed: -1
		}
	},
	actions: {
		init() {
			loras().then(res => {

			})
			styles().then(res=>{
				this.modelList = res.data.result
			})
			prompts().then(res=>{
				this.promptsList = res.data.result
			})
		},
		promptsChange(e,i){
			this.promptsIndex = i
			this.promptsShowList = e.prompts
		},
		input(e) {
			this.prompt = e.detail.value
		},
		random_prompts(){
			random_prompts().then(res => {
				this.prompt = res.data.result.key
				// this.cueWordList = res.data.result.key.split(',')
			})
		}
	},
})