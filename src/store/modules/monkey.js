import fb from '@/firebaseConfig.js'
//import router from '@/router'
import toaster from '@/store/utils/toaster'

const state = {
	monkeys: [],
}

const getters = {
	monkeys: state => state.monkeys,
}

const actions = {
	createMonkey({ commit }, opts) {
		return new Promise((resolve, reject) => {
			let doc = fb.monkeysCollection.doc()

			doc
				.set({
					monkeyName: opts.monkeyName,
					lat: opts.lat,
					lng: opts.lng,
				})
				.then(() => {
					fb.monkeysCollection
						.doc(doc.id)
						.get()
						.then(res => {
							commit('ADD_MONKEY', res.data())
							toaster.success(`Monkey ${opts.monkeyName} created.`)
							resolve(res.data())
						})
				})
				.catch(err => {
					toaster.error(err)
					reject(err)
				})
		})
	},
	fetchMonkeys({ commit }) {
		fb.monkeysCollection
			.orderBy('monkeyName', 'asc')
			.onSnapshot(querySnapshot => {
				let monkeyArray = []
				querySnapshot.forEach(doc => {
					let monkey = doc.data()
					monkey.id = doc.id
					monkeyArray.push(monkey)
				})
				commit('SET_MONKEYS', monkeyArray)
			})
	},
}

const mutations = {
	SET_MONKEYS(state, data) {
		state.monkeys = data
	},
	ADD_MONKEY(state, data) {
		state.monkeys.push(data)
	},
}

export default { state, getters, actions, mutations }
