import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Home from '@/views/Home'
import Login from '@/views/Login'
import Map from '@/views/Map'
import Profile from '@/views/Profile'

import CreateMonkey from '@/views/monkey/CreateMonkey'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '*',
			redirect: '/home',
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
