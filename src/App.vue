<template>
  <div id="app">
    <div class="container">
      <Header/>
      <!-- <transition name="slide" mode="out-in"> -->
          <router-view/>
      <!-- </transition>    -->
    </div>
  </div>
</template>

<script>

import Dashboard from '@/components/dashboard/Dashboard.vue'
import Footer from '@/components/Footer.vue'
import Header from '@/components/header/Header.vue'
import Home from '@/components/Home.vue'
import Signup from '@/components/auth/Signup.vue'
import Signin from '@/components/auth/Signin.vue'

export default {
  name: 'app',
  components: {
    Header,
    Footer,
    Home,
    Dashboard,
    Signup,
    Signin
  },
  created() {
    this.$store.dispatch('getDbData');
    this.$store.dispatch('autoLogIn');
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h1{
  color: white;
}
.slide-enter{
  opacity: 0;
  transform: translateX(0);
}
.slide-enter-active{
  opacity: 1;
  transition: all .5s;
  animation: slide-in 1s ease-out forwards;
}
.slide-leave{
  opacity: 1;
  transform: translateX(0);
}
.slide-leave-active{
  transition: opacity 1s ease;
  opacity: 0;
  animation: slide-out 1s ease-out forwards;
}
.slide-move{
  transition: transform 1s;
}
@keyframes slide-out{
  0%{
    transform: translateY(0);
  }
  100%{
    transform: translateY(-30px);
  }
}
@keyframes slide-in{
  0%{
    transform: translateY(-30px);
  }
  100%{
    transform: translateY(0);
  }
}
</style>
