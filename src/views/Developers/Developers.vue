<template>
    <div class="d-flex flex-wrap">
        <Sidebar/>
        <Main/>
    </div>
</template>

<script>

import Sidebar from './Sidebar.vue';
import Main from './Main.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Developers',
  components: {
    Sidebar,
    Main
  },
  created(){
    this.$store.dispatch('getDbData');
  },
  computed:{
    ...mapGetters({
            contacts: 'getContacts'
        }),
        filterContact(){
            return this.contacts.filter((elem)=>{
                return elem.name.toLowerCase().match(this.searchContact.toLowerCase())
            });
        }
  }
}
</script>