import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
	apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
	authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING,
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
