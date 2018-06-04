import Vue from 'vue'
import Router from 'vue-router'
import Singup from '@/components/Singup.vue'
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
            component: Dashboard
        },
        {
            path: '/singup',
            component: Singup
        }
    ]
})