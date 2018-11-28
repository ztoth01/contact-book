<template>
    <transition
        enter-active-class="animated pulse"
        leave-active-class="animated fadeOutUp"
        >
        <div
            v-if="modalIsVisible"
            class="card text-white bg-dark modal col-10 col-md-6"
            @click="clicked"
            >
            <div class="card-header"><h5>List of developers have skill in {{skill}}</h5></div>
            <div class="card-body">
                <ul class="list-group">
                    <li
                        @click="clicked"
                        v-for="(dev, index) in devsForModal" :key="dev.id"
                        :class="index % 2 === 0 ? 'bg-light': 'll'"
                        class="list-group-item d-flex justify-content-between align-items-center">
                        <router-link :to="'/dev-profile/' + dev.id" class="nav-link" activeClass="active">
                            <span class="avatar">
                                <img  :src="dev.profileImage" :alt="dev.name">
                            </span>
                            <p class="text-left ml-4 text-muted"><strong>{{dev.name}}</strong> has a skill level of <strong> {{skillLevel(dev)}}</strong> in <strong>{{skill}}</strong></p>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </transition>
</template>

<script>

import { mapGetters, mapMutations} from 'vuex';

export default {
    computed:{
        ...mapGetters({
            modalIsVisible: 'getModalState',
            contacts: 'getContacts',
            devs: 'getDevsForModal',
            skill: 'getSkillForModal'
        }),
        devsForModal(){
            if(this.devs !== null){
                return [].concat(...Object.values(this.devs).map( e => {
                    return this.contacts.filter((elem)=>{
                        return elem.id.match(e)
                    })
                }))
            }
        }
    },
    methods:{
        ...mapMutations(['setDevsForModal','closeOverlay','closeModal']),
        clicked(){
            this.$store.commit('closeOverlay');
            this.$store.commit('closeModal');
        },
        skillLevel(dev){
            for(let key in dev.skillsMatrix){
                const level = dev.skillsMatrix[key][this.skill];
                if(level === 1){
                    return 'Basic';
                }else if(level === 2){
                    return 'Intermediate';
                }else{
                    return 'Expert';
                }
            }
        }
    },

}
</script>

<style lang="scss" scoped>
    .modal{
        max-width: 500px;
        z-index: 100;
        height: 300px;
        overflow-y: scroll;
        position: fixed;
        margin: auto;
        display: block;
        & a{
            display: flex;
            justify-content: space-between;
            width: 100%;
        }
        .avatar{
            height: 60px;
            width: 60px;
        }
        .avatar img{
            width: 100%;
            height: auto;
            display: block;
        }

        .ll{
            background-color: rgba(255, 255, 255, 0.075);
        }
    }
</style>
