<template>
    <div class="col-md-4 pl-0 mt-4 main--sidebar">
        <form class="form-inline my-2 justify-content-between search--bar">
            <input class="form-control mr-sm-2" type="text" placeholder="Search" v-model="searchContact">
            <button class="btn btn-primary my-2 my-sm-0" @click.prevent="clearSearch" type="submit">Clear</button>
        </form>
       <div class="search--bar-wrapper">
        <ul class="list-group">
            <li  
            v-for="(contact,index) in filterContact" 
            :key="index" 
            @click="selectContact(index)"
            class="list-group-item d-flex justify-content-start align-items-center"
            :class="{'bg-light': index % 2 === 0 }"
            >
                <span class="avatar">
                    <img :src="require(`../../assets/${contact.img}`)" :alt="contact.name">
                </span>
                <h4>{{ contact.name }}</h4>
            </li>
        </ul>
        </div>
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
      clearSearch(){
          this.searchContact = ''
      },
      selectContact(index){
          this.$store.dispatch('selectContact', index);
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
        }
        // upperCaseFirstLetter(name){
        //     return name.charAt(0).toUpperCase() + string.slice(1);
        // }
  },
   created() {
    this.$store.dispatch('getDbData');
  }
}
</script>


<style scoped>

    .avatar{
        height: 60px;
        width: 60px;
    }
    .avatar img{
        width: 100%;
        height: auto;
        display: block;
    }
    .list-group-item{
        
    }
    .list-group-item h4{
        margin-left: 20px;
    }
    .main--sidebar{
        height: 80vh;
        overflow: hidden;
      
    }
    .list-group{
    
    }
    .search--bar-wrapper{
        overflow-y: scroll; 
        height: 100%;
    }

</style>