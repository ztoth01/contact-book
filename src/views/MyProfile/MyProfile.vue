<template>
    <div>
        <Overlay :closeExtraElement="closeRegistryForm"/>
        <h1>{{loggedInUser.name}}</h1>
        <SkillRegistryForm v-if="loggedInUser.skillsMatrix !== 0 && skillsData !== null" :skillsData="skillsData" />
        <SkillRegistryForm v-else-if="skillsData !== null"  :skillsData="skillsData" />
    </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex';
import SkillRegistryForm from '../../components/SkillRegister/SkillRegistryForm';
import Overlay from '../../components/UI/Overlay';
import * as firebase from 'firebase';

export default {

    data(){
        return{
            skillsData: null
        }
    },
    components:{
        SkillRegistryForm,
        Overlay
    },
    created() {
        this.$store.dispatch('getUserProfile');
        console.log(this.loggedInUser.skillsMatrix, 'ppp');
        if(this.loggedInUser.skillsMatrix === 0 ){
            this.getSkills();
        }else if(this.loggedInUser.skillsMatrix !== 0){
            this.skillsData = this.loggedInUser.skillsMatrix
        }
    },
    methods:{
        ...mapMutations(['closeRegistryForm']),
        closeRegistryForm(){
            //this.$store.commit('closeRegistryForm');
        },
        getSkills(){
            firebase.database().ref("skillsMatrix/").on('value', (data) => {
                this.skillsData = data.val();
                //this.skills = Object.keys(data.val()).map(e => [].concat(e,[Object.keys(data.val()[e])]));
            })
        }
    },
    computed:{
    ...mapGetters({
            loggedInUser: 'getProfile'
        })
    }
}
</script>

<style scoped>

</style>
