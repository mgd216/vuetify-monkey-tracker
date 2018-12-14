import fb from '@/firebaseConfig.js'
import store from '@/store'

fb.auth.onAuthStateChanged(user => {
	if (user) {
		store.commit('SET_CURRENT_USER', user)
		store.dispatch('fetchUserProfile')

		fb.usersCollection.doc(user.uid).onSnapshot(doc => {
			store.commit('SET_USER_PROFILE', doc.data())
		})
	}
})
