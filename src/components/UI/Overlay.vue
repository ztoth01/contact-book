<template>
    <transition>
        <div
            class="overlay"
            @click="clicked"
            :class="[overlayIsVisible ? 'visible' : 'hidden']">
        </div>
    </transition>
</template>

<script>
import { mapGetters, mapMutations} from 'vuex';
export default {
    methods:{
        ...mapMutations(['closeOverlay','closeModal']),
        clicked(){
            this.$store.commit('closeOverlay');
            this.$store.commit('closeModal');
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
    computed:{
        ...mapGetters({
            overlayIsVisible: 'getOverlayState'
        }),
    }
}
</script>


<style lang="scss" scoped>
    .overlay{
        width: 100%;
        height: 100%;
        z-index: 99;
        position: fixed;
        left:0;
        top:0;
        background-color: rgba(0,0,0,.5);
        transition: all 0.5 ease-in;

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

