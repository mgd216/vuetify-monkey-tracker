import Vue from 'vue'

const state = {
	clipped: true,
	navigation: false,
	miniVariant: false,
}

const getters = {
	clipped: state => state.clipped,
	navigation: state => state.navigation,
	miniVariant: state => state.miniVariant,
}

const actions = {
	toggleMiniVariant({ commit, state }) {
		commit('SET_MINI_VARIANT', !state.miniVariant)
	},
	showNavigation({ commit }) {
		commit('SET_NAVIGATION', true)
		Vue.nextTick().then(() => {
			//set navigation back to false because v-navigation-drawer can close on its own
			commit('SET_NAVIGATION', false)
		})
	},
}

const mutations = {
	SET_MINI_VARIANT(state, val) {
		state.miniVariant = val
	},
	SET_NAVIGATION(state, val) {
		state.navigation = val
	},
}

export default { state, getters, actions, mutations }
