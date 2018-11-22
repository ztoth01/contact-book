<template>
    <div class="registry-form mx-auto bg-light">
        <div
            v-for="(item, index, i) in skillsData"
            :key="index"
            :class="i === currentIndex ? ' is--visible' : ' is--hidden'"
            class="registry-form__page bg-light">
            <div class="registry-form__page bg-light">
                <h2>{{index}}</h2>
                <div
                    v-for="(z,subSkill) in item"
                    :key="subSkill"
                    class="custom-span"
                    >
                    {{ subSkill }}
                    <select v-model.number="skillsData[index][subSkill]">
                        <option value="0">None</option>
                        <option value="1">Basic</option>
                        <option value="2">Intermediate</option>
                        <option value="3">Expert</option>
                    </select>
                </div>
            </div>
        </div>
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
            v-if="currentIndex !== Object.keys(skillsData).length - 1">
            Next
        </button>
        <button
            v-if="currentIndex === Object.keys(skillsData).length - 1"
            type="button"
            @click="save"
            class="btn btn-primary">
            Save
        </button>
    </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex';
import RegistryFormPage from './RegistryFormPage';
import * as firebase from 'firebase';

export default {
    name: 'SkillRegistryForm',
    components:{
        RegistryFormPage
    },
    props:{
        skillsData:{
            // type: Object,
            // required: true
        }
    },
    data () {
        return{
            currentIndex: 0,
            skills: null
        }
    },
    methods:{
        ...mapMutations(['setCurrentUser']),
        nextPage(){
            this.currentIndex++;
        },
        previousPage(){
            this.currentIndex--;
        },
        save(){
            //Save method comes here
            let currentUser = {...this.currentUser};
                currentUser.skillsMatrix = this.skillsData
            console.log(currentUser);
            this.$store.commit('setCurrentUser',currentUser);
            firebase.database().ref('/contacts').child(this.currentUser.id).update({ skillsMatrix: this.skillsData })
        },
        getSkills(){
            firebase.database().ref("skillsMatrix/").on('value', (data) => {
                this.skills = data.val();
                //this.skills = Object.keys(data.val()).map(e => [].concat(e,[Object.keys(data.val()[e])]));
            })
        }
    },
    // created(){
    //     this.getSkills();
    // },
    computed:{
        ...mapGetters({
            currentUser: 'getProfile'
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

    .registry-form__page{
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        position: absolute;
        color: #ffffff;

        &.is--visible{
            transition-delay: 1s;
            animation-name: fadeIn;
            animation-duration: 1s;
            opacity: 1;
            visibility: visible;
            z-index: 2;
        }
        &.is--hidden{
            animation-name: fadeOut;
            animation-duration: 0.5s;
            opacity: 0;
            visibility: hidden;
            z-index: 1;
        }

    }
    h2{
        color: #ffffff;
    }

    .custom-span:nth-of-type(1){
        margin-top: 40px;
    }

    .custom-span{
        display: flex;
        width: 90%;
        margin: 30px auto;
        justify-content: space-between;
    }

    @keyframes fadeIn {
        0% {
            transform: translateX(-100%);
            opacity: 0;
            visibility: hidden;
        }
        90% {
            opacity: 0.4;
        }

        100% {
            transform: translateX(0);
            opacity: 1;
            visibility: visible;
        }
    }

    @keyframes fadeOut {
        0% {
            transform: translateX(0);
            opacity: 1;
            visibility: visible;
        }
        90% {
            opacity: 0.4;
        }

        100% {
            transform: translateX(-100%);
            opacity: 0;
            visibility: hidden;
        }
    }


</style>