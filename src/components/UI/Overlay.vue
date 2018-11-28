<template>
    <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        >
        <div
            class="overlay"
            @click="clicked"
            v-if="overlayIsVisible"
            >
        </div>
    </transition>
</template>

<script>
import { mapGetters, mapMutations} from 'vuex';
export default {
    props:{
        closeExtraElement:{
            type: Function,
            required: false
        }
    },
    methods:{
        ...mapMutations(['closeOverlay']),
        clicked(){
            this.$store.commit('closeOverlay');
            // that is how you referenc the function to close different stuff
            // this.$store.commit('closeModal');
            // :class="overlayIsVisible ? 'fadeIn' : 'fadeOut'"
            if(this.closeExtraElement){
                this.closeExtraElement();
            }
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
        background-color: rgba(0,0,0,.8);
    }
</style>

