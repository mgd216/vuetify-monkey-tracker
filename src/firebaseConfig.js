import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
	apiKey: 'AIzaSyDS1wmk4dpiRRTVHDhg8dDHJ6WpRImS6Fs',
	authDomain: 'bd-monkeys.firebaseapp.com',
	databaseURL: 'https://bd-monkeys.firebaseio.com',
	projectId: 'bd-monkeys',
	storageBucket: 'bd-monkeys.appspot.com',
	messagingSenderId: '72580730029',
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
	timestampsInSnapshots: true,
}
db.settings(settings)

// firestore collections
const usersCollection = db.collection('users')
const monkeysCollection = db.collection('monkeys')

// storage
const storage = firebase.storage()

export default {
	db,
	auth,
	currentUser,
	usersCollection,
	monkeysCollection,
	storage,
}
