<template>
    <div class="col-md-4 pl-0 mt-4">
        <form class="form-inline my-2  justify-content-between">
            <input class="form-control mr-sm-2" type="text" placeholder="Search" v-model="searchContact">
            <!-- <button class="btn btn-primary my-2 my-sm-0" @click.prevent="search($event)" type="submit">Search</button> -->
        </form>
        <ul class="list-group">
            <li  
            v-for="(contact,index) in filterContact" 
            :key="index" 
            class="list-group-item d-flex justify-content-between align-items-center"
            :class="{'bg-light': index % 2 === 0 }"
            >
                <h4>{{ contact.name }}</h4>
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
        searchContact:'',
        contactList: []
    }
  },
  methods:{
      search($event){
          console.log($event.target.previousSibling.value);
      }
  },
  computed:{
    ...mapGetters({
            contacts: 'getContact'
        }),
        filterContact(){
            return this.contacts.filter((elem)=>{
                return elem.name.toLowerCase().match(this.searchContact)
            });
        },
        upperCaseFirstLetter(name){
            return name.charAt(0).toUpperCase() + string.slice(1);
        }
  },
  created(){
  }
}
</script>
