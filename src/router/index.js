import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

const Home = () => import('@/views/Home')
const Login = () => import('@/views/Login')
const Map = () => import('@/views/Map')
const Profile = () => import('@/views/Profile')

import CreateMonkey from '@/views/monkey/CreateMonkey'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			redirect: '/login',
		},
		{
			path: '/#',
			redirect: '/login',
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
		},
		{
			path: '/home',
			name: 'Home',
			component: Home,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/map',
			name: 'Map',
			component: Map,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/profile',
			name: 'Profile',
			component: Profile,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/create-monkey',
			name: 'CreateMonkey',
			component: CreateMonkey,
			meta: {
				requiresAuth: true,
			},
		},
	],
})

router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
	const currentUser = firebase.auth().currentUser

	if (requiresAuth && !currentUser) {
		next('/login')
	} else if (requiresAuth && currentUser) {
		next()
	} else {
		next()
	}
})

export default router
