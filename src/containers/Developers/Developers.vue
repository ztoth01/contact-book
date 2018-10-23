<template>
    <div class="container d-flex flex-wrap">
        <Sidebar/>
        <Main/>
    </div>
</template>

<script>

import Sidebar from './Sidebar.vue';
import Main from './Main.vue';

export default {
  name: 'Developers',
  components: {
    Sidebar,
    Main
  },
  created(){
    this.$store.dispatch('getDbData');
  }
}
</script>