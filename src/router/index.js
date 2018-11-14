import Vue from 'vue'
import Router from 'vue-router'
import * as Firebase from 'firebase';

import Signup from '@/views/Auth/Signup.vue';
import Signin from '@/views/Auth/Signin.vue';
import Developers from '@/views/Developers/Developers.vue';
import Home from '@/views/Home.vue';
import MyProfile from '@/views/MyProfile/MyProfile.vue';
import DevProfile from '@/views/DevProfile/DevProfile.vue';
import SkillsMatrix from '@/views/SkillsMatrix/SkillsMatrix.vue';

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
      name: 'dev-profile',
      path: '/dev-profile/:id',
      component: DevProfile
    },
    {
      name: 'my-profile',
      path: '/my-profile',
      component: MyProfile,
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


// export default new Router({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: Home
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (about.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
//     }
//   ]
// })
