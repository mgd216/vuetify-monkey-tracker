import Vue from 'vue'
import Vuex from 'vuex'

import Auth from '@/store/modules/auth'
import Monkey from '@/store/modules/monkey'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		Auth,
		Monkey,
	},
})

export default store
