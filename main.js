// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'



const app = new Vue({
	...App
})


app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import * as Pinia from 'pinia'

import App from './App.vue'


export function createApp() {
	
	const app = createSSRApp(App);
	app.config.globalProperties.$onLaunched = new Promise((resolve, reject) => {
		app.config.globalProperties.$isResolve = resolve
	})
	app.use(Pinia.createPinia());


	return {
		app,
		Pinia,
	}
}

// #endif