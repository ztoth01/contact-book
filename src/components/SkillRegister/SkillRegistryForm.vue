<template>
        <div class="registry-form mx-auto bg-light"
            v-if="skills !== null"
            >
            <!-- <span style="color: red">{{skills}}</span> -->
            <RegistryFormPage
                v-for="(item, index) in skills"
                :pageData="item"
                :key="index"
                :class="index === currentIndex ? ' is--visible' : ' is--hidden'" />
            <button
                type="button"
                class="btn
                btn-primary"
                @click="previousPage"
                :disabled="currentIndex === 0">
                Back
            </button>
                <button
                type="button"
                class="btn btn-primary"
                @click="nextPage"
                v-if="currentIndex !== skills.length - 1">
                Next
            </button>
            <button
                v-if="currentIndex === skills.length - 1"
                type="button"
                @click="save"
                class="btn btn-primary">
                Save
            </button>
        </div>
</template>


<script>

import { mapGetters } from 'vuex';
import RegistryFormPage from './RegistryFormPage';
import * as firebase from 'firebase';

export default {
    name: 'SkillRegistryForm',
    components:{
        RegistryFormPage
    },
    data () {
        return{
            names:['zoli','peti','karcsi'],
            currentIndex: 0,
            skills: null
        }
    },
    methods:{
        nextPage(){
            this.currentIndex++;
        },
        previousPage(){
            this.currentIndex--;
        },
        save(){
            //Save method comes here
            //console.log('helloka');
        },
        getSkills(){
            firebase.database().ref("skillsMatrix/").on('value', (data) => {
                this.skills = Object.keys(data.val()).map(e => [].concat(e,[Object.keys(data.val()[e])]));
            })
        }
    },
    created(){
        this.getSkills();
    },
    computed:{
        ...mapGetters({

        }),
    }
}
</script>


<style scoped lang="scss">
    .registry-form{
        max-width: 600px;
        z-index: 100;
        height: 400px;
        overflow: hidden;
        position: relative;
        display: flex;
        justify-content: space-between;

        .btn{
            z-index: 101;
            position: relative;
            align-self: flex-end;

        }
    }

</style>