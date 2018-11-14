<template>
    <div
        class="card text-white bg-secondary modal mx-auto col-10 col-md-6"
        style="max-width: 40vw;"
        @click="clicked"
        :class="[modalIsVisible ? 'visible' : 'hidden']">
        <div class="card-header">Header</div>
        <div class="card-body">
            <ul class="list-group">
                <li
                    @click="clicked"
                    v-for="dev in devsForModal" :key="dev.id"
                    class="list-group-item d-flex justify-content-between align-items-center">
                    <router-link :to="'/dev-profile/' + dev.id" class="nav-link" activeClass="active">
                    {{dev.name}}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
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
        ...mapMutations(['setDevsForModal','closeOverlay','closeModal']),
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
        ...mapMutations(['setModalState','setOverlayState']),
        clicked(){
            this.closeOverlay();
            this.closeModal();
        },
        beforeEnter(el) {
            //el.classList.add('slide-enter-active')
        },
        enter(el, done) {
            //el.classList.remove('slide-enter-active')
            //el.classList.add('slide-leave-active')
        },
        afterEnter(el) {
        },
        beforeLeave() {
        },
        leave(el, done) {
        done()
        },
        afterLeave(el) {
        }
    },

}
</script>

<style lang="scss" scoped>
    .modal{
        max-width: 500px;
        //position: fixed;
        left:0;
        top:0;
        right: 0;
        bottom: 0;
        display: block;
        z-index: 100;
        height: 40vh;
        max-height: 300px;
        overflow-y: scroll;

        & > div {
            //overflow-y: scroll;
        }


        &.visible{
            opacity: 1;
            visibility: visible;
        }
        &.hidden{
            opacity: 0;
            visibility: hidden;
        }
    }
</style>
