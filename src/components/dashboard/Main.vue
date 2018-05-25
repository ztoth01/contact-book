<template>    

    <div class="jumbotron col-md-8 my-4 mx-0 main-content">
        <h1 class="display-3">{{ contact.name }}</h1>
        <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr class="my-4">
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    </div>

</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: 'Main',
  data () {
    return {
        
    }
  },
  methods:{
    
  },
  computed:{
    ...mapGetters({
            contact: 'getSelectedContact'
        })
  }
}
</script>

<style scoped>

    .main-content{
        min-height: 80vh;
    }

</style>