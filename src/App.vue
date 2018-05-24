<template>
  <div id="app">
    <Header/>
    <div class="container d-flex flex-wrap">
      <Sidebar/>
      <Main/>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'  

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Sidebar from './components/Sidebar.vue'
import Main from './components/Main.vue'

export default {
  name: 'app',
  components: {
    Header,
    Footer,
    Sidebar,
    Main
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
</style>
