<template>
    <div class="d-flex flex-wrap">
        <Overlay/>
        <Modal />
        <Sidebar/>
        <Main v-if="matrixData" :matrixData="matrixData" />
    </div>
</template>

<script>

import Sidebar from './Sidebar.vue';
import Main from './Main.vue';
import Overlay from '../../components/UI/Overlay';
import Modal from '../../components/UI/Modal';
import { mapGetters } from 'vuex';

export default {
    name: 'Developers',
    components: {
        Sidebar,
        Main,
        Modal,
        Overlay
    },
    created(){
        //this.$store.dispatch('getGlobaMatrixDbFromFirebase');
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