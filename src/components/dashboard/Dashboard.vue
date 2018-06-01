<template>
  <div class="container d-flex flex-wrap">
      <Sidebar/>
      <Main/>
    </div>
</template>

<script>

import Sidebar from './Sidebar.vue' 
import Main from './Main.vue'

export default {
  name: 'Dashboard',
  components: {
    Sidebar,
    Main
  }
}
</script>