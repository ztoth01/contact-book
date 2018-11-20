<template>
    <div>
        <Overlay :closeExtraElement="closeRegistryForm"/>
        <h1>{{user.name}}</h1>
        <p>{{msg}}</p>
        <SkillRegistryForm />
    </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex';
import SkillRegistryForm from '../../components/SkillRegister/SkillRegistryForm';
import Overlay from '../../components/UI/Overlay';

export default {

    data(){
        return{
            msg:'Hello'
        }
    },
    components:{
        SkillRegistryForm,
        Overlay
    },
    created() {
        this.$store.dispatch('getUserProfile');
    },
    methods:{
        ...mapMutations(['closeRegistryForm']),
        closeRegistryForm(){
            //this.$store.commit('closeRegistryForm');
            console.log('hello');
        }
    },
    computed:{
    ...mapGetters({
            user: 'getProfile'
        })
        // filterContact(){
        //     return this.contacts.filter((elem)=>{
        //         return elem.name.toLowerCase().match(this.searchContact.toLowerCase())
        //     });
        // }
    }
}
</script>

<style scoped>

</style>
