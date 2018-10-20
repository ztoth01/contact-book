import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store/store';
import Vuelidate from 'vuelidate';
import * as firebase from 'firebase';
import Spinner from 'vue-spinkit';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.component('Spinner', Spinner);

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   if (requiresAuth) {
//     next('/signin');
//   } else {
//     next();
//   }
// });

new Vue({
  store,
  router,
  render: h => h(App),
  created() {
    firebase: firebase.initializeApp({
      apiKey: 'AIzaSyArpYytMFJrtIgmbcRyN77seuDreamUfCM',
      authDomain: 'contact-book-7d273.firebaseio.com/',
      databaseURL: 'https://contact-book-7d273.firebaseio.com/',
      storageBucket: 'gs://contact-book-7d273.appspot.com'

    })
  }
}).$mount('#app')
