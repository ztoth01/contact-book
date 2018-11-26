<template>
    <div v-if="isLoaded">

        <div v-if="msgCompIsVisible" class="mx-auto col-10 col-md-4">
            <div class="alert alert-dismissible alert-success">
                <p class="text-center">Data saved successfully!</p>
            </div>
        </div>

        <Overlay :closeExtraElement="closeRegistryForm"/>
        <h1>{{loggedInUser.name}}</h1>
        <SkillRegistryForm v-if="registryFormIsVisible" :skillsData="skillsData" />


        <div v-if="noSkillsHasBeenAddedYet">
            <h5>It looks like you haven't added any sills yet?</h5>
            <button class="btn" @click="openRegistryForm">Add Skills now</button>
        </div>

        <div v-if="!noSkillsHasBeenAddedYet">
            <h5>Would like to update your Skills Matrix?</h5>
            <button class="btn" @click="openRegistryForm">Update my Skills Matrix</button>
        </div>
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
            isLoaded: false,
            noSkillsHasBeenAddedYet: true
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
        ...mapMutations(['openRegistryForm','closeRegistryForm','openOverlay','closeOverlay']),
        closeRegistryForm(){
            this.$store.commit('closeRegistryForm');
            //this.$store.commit('closeModal');
        },
        openRegistryForm(){
            this.$store.commit('openRegistryForm');
            this.$store.commit('openOverlay');
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
            loggedInUser: 'getProfile',
            registryFormIsVisible: 'getRegistryFormState',
            msgCompIsVisible: 'getMessageCompState'
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
                    this.noSkillsHasBeenAddedYet = false;
                }
            }
        }
    }
}
</script>

<style scoped>
    h5{
        color: #ffffff;
    }

</style>
