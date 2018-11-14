<template>
    <div>
        <h1>This is the Dev Profile page</h1>
        <span style="color: red">{{ devProfile.name }}</span>
    </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex';

export default {

    data(){
        return{
            id: this.$route.params.id
        }
    },
    methods:{

    },
    computed:{
        ...mapGetters({
                contacts: 'getContacts'
            }),
        devProfile(){
            return this.contacts.filter((elem)=>{
                return elem.id.match(this.id);
            })[0]
        }
    }
}
</script>

<style scoped>

</style>
