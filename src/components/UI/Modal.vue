<template>
    <transition
        enter-active-class="animated pulse"
        leave-active-class="animated fadeOutUp"
        >
        <div
            v-if="modalIsVisible"
            class="card text-white bg-secondary modal col-10 col-md-6"
            @click="clicked"

            >
            <div class="card-header">Header</div>
            <div class="card-body">
                <ul class="list-group">
                    <li
                        @click="clicked"
                        v-for="(dev, index) in devsForModal" :key="dev.id"
                        :class="{'bg-light': index % 2 === 0 }"
                        class="list-group-item d-flex justify-content-between align-items-center">
                        <router-link :to="'/dev-profile/' + dev.id" class="nav-link" activeClass="active">
                            <span class="avatar">
                                <img  :src="dev.profileImage" :alt="dev.name">
                            </span>
                            {{dev.name}}
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
            devs: 'getDevsForModal'
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
    }
</style>
