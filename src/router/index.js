import Vue from 'vue';
import Router from 'vue-router';
import * as Firebase from 'firebase';

import Signup from '@/containers/Auth/Signup.vue';
import Signin from '@/containers/Auth/Signin.vue';
import Developers from '@/containers/Developers/Developers.vue';
import Home from '@/components/Home.vue';
import Profile from '@/containers/Profile/Profile.vue';
import SkillsMatrix from '@/containers/SkillsMatrix/SkillsMatrix.vue';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      name: 'developers',
      path: '/developers',
      component: Developers
      // meta: {
      //   requiresAuth: true
      // },
      // beforeEnter(to, from, next) {
      //   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
      //   const currentUser = Firebase.auth().currentUser;
      //   if (requiresAuth && !currentUser) {
      //     next({ path: '/signin' });
      //   } else {
      //     next();
      //   }
      // }
    },
    {
      path: '/signup',
      component: Signup
    },
    {
      path: '/skills-matrix',
      component: SkillsMatrix
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
