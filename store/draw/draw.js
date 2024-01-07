// store/index.js
import {
	defineStore
} from 'pinia'
import {
	loras
} from '@/utils/all.js'
import {
	getCurrentInstance,
	computed
} from 'vue';


export const useDrawStore = defineStore('draw', {
	state: () => {
		return {
			prompt: '', //提示词
			Negativeprompt: '', //反向提示词
			cueWordList: ['国风', '二次元', '真人', '真实', '漫画', '头像', '2.5D'], //随机提示词列表
			modelList: ['国风', '二次元', '真人', '真实', '漫画', '头像', '2.5D'], //大模型列表
			LoRAList: ['国风', '二次元', '真人', '真实', '漫画', '头像', '2.5D'], //lora模型列表
			seed: -1
		}
	},
	actions: {
		init(){
			loras().then(res=>{
				
			})
		},
		input(e) {
			this.prompt = e.detail.value
		}
	},
})