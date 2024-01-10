import {
	defineStore,
} from 'pinia'
import {
	account_record
} from '@/utils/all.js'

export const useIntegralRecordStore = defineStore('IntegralRecord', {
	state: () => {
		return {
			page: 1,
			list: []
		}
	},
	actions: {
		init() {
			account_record({
				page: this.page,
				size: 20
			}).then(res => {
				this.list = res.data.result.results
			})
			
		},
	}
})