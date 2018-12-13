import fb from '@/firebaseConfig.js'
import { fetch as fetchPolyfill } from 'whatwg-fetch'
import router from '@/router'
import toaster from '@/store/utils/toaster'

const state = {
	currentUser: null,
	userProfile: {},
	userProfileImg: null,
}

const getters = {
	currentUser: state => state.currentUser,
	isLoggedIn: state => !!state.currentUser,
	userId: state => (state.currentUser ? state.currentUser.uid : null),
	userProfile: state => state.userProfile,
	userProfileImg: state => state.userProfileImg,
}

const actions = {
	login({ commit, dispatch }, opts) {
		return new Promise((resolve, reject) => {
			fb.auth
				.signInWithEmailAndPassword(opts.email, opts.password)
				.then(response => {
					commit('SET_CURRENT_USER', response.user)
					dispatch('fetchUserProfile')
					resolve()
				})
				.catch(err => {
					toaster.error(err)
					reject()
				})
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
					if (res.data().profileImgUrl) {
						fetchPolyfill(res.data().profileImgUrl).then(res => {
							const fd = new FormData()
							fd.set('a', res._bodyBlob)
							commit('SET_PROFILE_IMG', fd.get('a'))
						})
					}
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
		let up = {
			firstName: opts.firstName,
			lastName: opts.lastName,
			profileImgUrl: opts.profileImgUrl ? opts.profileImgUrl : null,
		}

		fb.usersCollection
			.doc(state.currentUser.uid)
			.update(up)
			.then(() => {
				dispatch('fetchUserProfile')
				toaster.success('Profile Updated.')
			})
			.catch(err => {
				toaster.error(err)
			})
	},

	updateProfilePhoto({ dispatch, rootGetters }, file) {
		let storageRef = fb.storage.ref(
			`${rootGetters.userId}/profilePicture/${file.name}`
		)
		storageRef.put(file).then(fileSnapshot => {
			fileSnapshot.ref.getDownloadURL().then(url => {
				let up = rootGetters.userProfile
				up.profileImgUrl = url
				dispatch('updateProfile', up)
			})
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
	SET_PROFILE_IMG(state, img) {
		state.userProfileImg = img
	},
}

export default { state, getters, actions, mutations }
