<template>
    <div>
        <h1 @click="click">{{user.name}}</h1>
        <p>{{msg}}</p>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {

    data(){
        return{
            msg:'Hello'
        }
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
