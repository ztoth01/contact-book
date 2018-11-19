<template>
    <div>
        <Overlay/>
        <h1 @click="click">{{user.name}}</h1>
        <p>{{msg}}</p>
        <SkillRegistryForm />
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
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
        click(){
            console.log('triggered');
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
