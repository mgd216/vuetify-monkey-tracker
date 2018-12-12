import fb from '@/firebaseConfig.js'
import router from '@/router'
import toaster from '@/store/utils/toaster'

const state = {
	currentUser: null,
	userProfile: {},
}

const getters = {
	currentUser: state => state.currentUser,
	isLoggedIn: state => !!state.currentUser,
	userProfile: state => state.userProfile,
}

const actions = {
	login({ commit, dispatch }, opts) {
		fb.auth
			.signInWithEmailAndPassword(opts.email, opts.password)
			.then(response => {
				commit('SET_CURRENT_USER', response.user)
				dispatch('fetchUserProfile')
				dispatch('fetchMonkeys')
			})
			.catch(err => {
				toaster.error(err)
			})
	},

	logout({ commit }) {
		fb.auth
			.signOut()
			.then(function() {
				commit('SET_CURRENT_USER', null)
				commit('SET_USER_PROFILE', {})
				router.push({ name: 'Login' })
			})
			.catch(function(err) {
				toaster.error(err)
			})
	},

	createUserProfile({ dispatch, state }, opts) {
		fb.usersCollection
			.doc(state.currentUser.uid)
			.set({
				firstName: opts.firstName,
				lastName: opts.lastName,
			})
			.then(() => {
				dispatch('fetchUserProfile')
			})
			.catch(err => {
				toaster.error(err)
			})
	},

	fetchUserProfile({ commit, dispatch, state }) {
		fb.usersCollection
			.doc(state.currentUser.uid)
			.get()
			.then(res => {
				if (res.exists) {
					commit('SET_USER_PROFILE', res.data())
					router.push({ name: 'Home' })
				} else {
					dispatch('createUserProfile', { firstName: '', lastName: '' })
				}
			})
			.catch(err => {
				toaster.error(err)
			})
	},

	resetPassword({ commit }, email) {
		fb.auth
			.sendPasswordResetEmail(email)
			.then(() => {
				toaster.success(`Password reset sent to: ${email}`)
				commit('SET_CURRENT_USER', null)
			})
			.catch(err => {
				toaster.error(err)
			})
	},

	updateProfile({ dispatch, state }, opts) {
		fb.usersCollection
			.doc(state.currentUser.uid)
			.update({ firstName: opts.firstName, lastName: opts.lastName })
			.then(() => {
				dispatch('fetchUserProfile')
				toaster.success('Profile Updated.')
			})
			.catch(err => {
				toaster.error(err)
			})
	},
}

const mutations = {
	SET_CURRENT_USER(state, val) {
		state.currentUser = val
	},
	SET_USER_PROFILE(state, val) {
		state.userProfile = val
	},
}

export default { state, getters, actions, mutations }
