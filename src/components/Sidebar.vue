<template>
    <div class="col-md-4 pl-0 mt-4">
        <form class="form-inline my-2  justify-content-between">
            <input class="form-control mr-sm-2" type="text" placeholder="Search">
            <button class="btn btn-primary my-2 my-sm-0" type="submit">Search</button>
        </form>
        <ul class="list-group">
            <li  
            v-for="(person,index) in people" 
            :key="index" 
            class="list-group-item d-flex justify-content-between align-items-center"
            :class="{'bg-light': index % 2 === 0 }"
            >
                <h4>{{ person.name }}</h4>
                <span class="badge badge-primary badge-pill">14</span>
            </li>
        </ul>
    </div>
</template>



<script>

import { mapGetters } from 'vuex';

export default {
  name: 'Sidebar',
  data () {
    return {
    }
  },
  methods:{
      
  },
  computed:{
    ...mapGetters({
            people: 'getPeople'
        })
  },
  created(){
    //  this.$store.dispatch('getPeople');
  }
}
</script>
