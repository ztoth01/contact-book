<template>
    <div class="d-flex flex-wrap">
        <Sidebar/>
        <Main v-if="matrixData" :matrixData="matrixData" />
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
        this.$store.dispatch('getGlobaMatricDbFromFirebase');
    },
    computed:{
        ...mapGetters({
                contacts: 'getContacts',
                matrixData: 'getGlobalMatrix'
            }),
            filterContact(){
                return this.contacts.filter((elem)=>{
                    return elem.name.toLowerCase().match(this.searchContact.toLowerCase())
                });
            }
    }
}
</script>