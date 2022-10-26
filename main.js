import App from './App'

// #ifndef VUE3
import Vue from 'vue'
declare module '@vue/runtime-core' {
	export interface ComponentCustomProperties {
		$server: (request) => Promise
	}
}
Vue.config.productionTip = false
// 挂载到vue原型
// Vue.prototype.$server = server
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
import {
	service
} from '/utils/request'
import {
	createPinia
} from 'pinia'
//  Chrome51 版本以后，Chrome 增加了新的事件捕获机制－Passive Event Listeners
//就是告诉前页面内的事件监听器内部是否会调用preventDefault函数来阻止事件的默认行为，
//以便浏览器根据这个信息更好地做出决策来优化页面性能。
// import 'default-passive-events' // 默认使用passive被动监听
export function createApp() {
	const app = createSSRApp(App)
	const pinia = createPinia()
	// 挂载到vue原型
	app.config.globalProperties.$service = service
	app.use(pinia)
	return {
		app
	}
}
// #endif
