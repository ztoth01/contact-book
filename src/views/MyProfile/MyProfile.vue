<template>
    <div>
        <Overlay :closeExtraElement="closeRegistryForm"/>
        <h1>{{loggedInUser.name}}</h1>
        <!-- <SkillRegistryForm v-if="loggedInUser.skillsMatrix !== 0 && isLoaded" :skillsData="skillsData" /> -->
        <SkillRegistryForm v-if="isLoaded" :skillsData="skillsData" />
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
            skillsData: null,
            isLoaded: false
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
        },
        getSkills(){
            firebase.database().ref("skillsMatrix/").on('value', (data) => {
                this.skillsData = data.val();
                this.isLoaded = true;
                //this.skills = Object.keys(data.val()).map(e => [].concat(e,[Object.keys(data.val()[e])]));
            })
        }
    },
    computed:{
    ...mapGetters({
            loggedInUser: 'getProfile'
        })
    },
    watch:{
        loggedInUser(){
            if(this.loggedInUser.skillsMatrix !== undefined ){
                if(this.loggedInUser.skillsMatrix === 0){
                    this.getSkills();
                }else if(this.loggedInUser.skillsMatrix !== 0){
                    this.skillsData = this.loggedInUser.skillsMatrix;
                    this.isLoaded = true;
                }
            }
        }
    }
}
</script>

<style scoped>

</style>
