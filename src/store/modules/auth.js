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
	login({ commit }, opts) {
		fb.auth
			.signInWithEmailAndPassword(opts.email, opts.password)
			.then(user => {
				commit('SET_CURRENT_USER', user)
				// this.fetchUserProfile();
				router.push({ name: 'Home' })
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

	fetchUserProfile({ commit, state }) {
		fb.usersCollection
			.doc(state.currentUser.uid)
			.get()
			.then(res => {
				commit('SET_USER_PROFILE', res.data())
			})
			.catch(err => {
				toaster.error(err)
			})
	},

	updateProfile({ state }, data) {
		let name = data.name
		let title = data.title

		fb.usersCollection
			.doc(state.currentUser.uid)
			.update({ name, title })
			.then(() => {
				// update all posts by user to reflect new name
				fb.postsCollection
					.where('userId', '==', state.currentUser.uid)
					.get()
					.then(docs => {
						docs.forEach(doc => {
							fb.postsCollection.doc(doc.id).update({
								userName: name,
							})
						})
					})
				// update all comments by user to reflect new name
				fb.commentsCollection
					.where('userId', '==', state.currentUser.uid)
					.get()
					.then(docs => {
						docs.forEach(doc => {
							fb.commentsCollection.doc(doc.id).update({
								userName: name,
							})
						})
					})
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
