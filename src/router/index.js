import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/components/auth/Signup.vue'
import Signin from '@/components/auth/Signin.vue'
import Dashboard from '@/components/dashboard/Dashboard.vue' 
import Home from '@/components/Home.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/dashboard',
            component: Dashboard,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/signup',
            component: Signup
        },
        {
            path: '/signin',
            component: Signin
        },
        
    ]
})