
import {
	defineStore
} from 'pinia'

export const useHomeStore = defineStore('home', {
	state: () => {
		return{
			list:[
				{name:'name'},
				{name:'name'},
				{name:'name'},
				{name:'name'}
			]
		}
	}
})