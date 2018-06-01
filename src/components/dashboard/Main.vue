<template>    

    <!-- <div class="jumbotron col-md-8 my-4 mx-0 main-content border-success">
        <div class="d-flex">
            <span><img :src="contact.profileImage" :alt="contact.name"></span>
            <h1 class="display-3">{{ contact.name }}</h1>
        </div>
        <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr class="my-4">
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    </div> -->

    <div class="card border-success mt-5">
        <div class="card-header d-flex">
            <span v-show="isLoad"><img @load="loaded" :src="contact.profileImage" :alt="contact.name"></span>
            <Spinner v-show="!isLoad" name="cube-grid" color="#d14f65"/>
            <h1 class="display-3">{{ contact.name }}</h1>
            
        </div>
        <div class="card-body">
            <!-- <h4 class="card-title display-3">{{ contact.name }}</h4> -->
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
    </div>

</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: 'Main',
  data () {
    return {
        isLoad: false
    }
  },
  methods:{
      loaded(){
            setTimeout(() => {
                this.isLoad = true
            }, 1000);
        }
    
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