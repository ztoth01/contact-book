import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import {store} from './store/store'
import Vuelidate from 'vuelidate'
import * as firebase from 'firebase'
import Spinner from 'vue-spinkit'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.component('Spinner', Spinner)

axios.defaults.baseURL = 'https://contact-book-7d273.firebaseio.com'
// //axios.defaults.headers.common['Authorization'] = 'fasfdsa'
axios.defaults.headers.get['Accepts'] = 'application/json'

// const reqInterceptor = axios.interceptors.request.use(config => {
//   console.log('Request Interceptor', config)
//   return config
// })
// const resInterceptor = axios.interceptors.response.use(res => {
//   console.log('Response Interceptor', res)
//   return res
// })

// axios.interceptors.request.eject(reqInterceptor)
// axios.interceptors.response.eject(resInterceptor)

new Vue({
  store,
  router,
  render: h => h(App),
  created(){
    firebase: firebase.initializeApp({
      apiKey: 'AIzaSyArpYytMFJrtIgmbcRyN77seuDreamUfCM',
      authDomain: 'contact-book-7d273.firebaseio.com/',
      databaseURL: 'https://contact-book-7d273.firebaseio.com/',
      storageBucket: 'gs://contact-book-7d273.appspot.com'

    })
  }
}).$mount('#app')
