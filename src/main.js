import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import './plugins'
import './firebaseActions'

import fb  from './firebaseConfig.js'

Vue.config.productionTip = false

let app
fb.auth.onAuthStateChanged(() => {
	if (!app) {
		app = new Vue({
			el: '#app',
			router,
			store,
			render: h => h(App),
		})
	}
})
