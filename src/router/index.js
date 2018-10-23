import Vue from 'vue';
import Router from 'vue-router';
import * as Firebase from 'firebase';

import Signup from '@/components/auth/Signup.vue';
import Signin from '@/components/auth/Signin.vue';
import Dashboard from '@/components/dashboard/Dashboard.vue';
import Home from '@/components/Home.vue';
import Profile from '@/components/profile/Profile.vue';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      name: 'dashboard',
      path: '/dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      },
      beforeEnter(to, from, next) {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        const currentUser = Firebase.auth().currentUser;
        if (requiresAuth && !currentUser) {
          next({ path: '/signin' });
        } else {
          next();
        }
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
    {
      name: 'profile',
      path: '/profile',
      component: Profile,
      meta: {
        requiresAuth: true
      },
      beforeEnter(to, from, next) {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        const currentUser = Firebase.auth().currentUser;
        if (requiresAuth && !currentUser) {
          next({ path: '/signin' });
        } else {
          next();
        }
      }
    }
  ],
});

export default router;
