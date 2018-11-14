<template>
    <transition-group
        appear
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
        @afterLeave="afterLeave"
        tag="div"
    >
        <span
            v-for="(item, i) in listData"
            :key="i"
            @click="clicked(item.devs)"
            class="btn btn-alert alert alert-info btn-sm dev-name"
            :class="[
                {'none': Object.keys(item.devs).length == 0 },
                {'mid': Object.keys(item.devs).length >= 2 && Object.keys(item.devs).length <3 },
                {'heigh': Object.keys(item.devs).length >= 3 },
                ]"
            >
            <p><strong>{{i}}</strong></p>
            <p v-if="Object.keys(item.devs).length == 0" >No Developer has this skill</p>
            <p v-else-if="Object.keys(item.devs).length > 1" >{{ Object.keys(item.devs).length }} Developers have this skill</p>
            <p v-else>{{ Object.keys(item.devs).length }} Developer has this skill</p>
            <!-- <span v-if="item.devs"
                :class="'category__' + item.level">
                <ul v-for="(dev, i) in item.devs" :key="dev + i">
                    <li>
                    </li>
                </ul>
            </span> -->
        </span>
    </transition-group>
</template>

<script>
import { mapMutations} from 'vuex';

export default {
    name: 'MatrixListItems',
    props:{
        listData:{
            type: Object,
            required: true
        }
    },
    data () {
        return{
            delay: 1,
            devP: null
        }
    },
    methods:{
        ...mapMutations(['setDevsForModal','openOverlay','openModal']),
        clicked(data){
            this.setDevsForModal({...data});
            this.openModal();
            this.openOverlay();
        },
        beforeEnter(el) {
            el.style.opacity = 0
            el.style.top = '50%'
            //el.classList.remove('fadeIn');
            //el.classList.add('fadeOutUp');

        },
        enter(el, done) {
            setTimeout(() => {
                // el.classList.remove('fadeOutUp');
                // el.classList.add('fadeInUp');
                TweenLite.to(el, 0.5, {
                    opacity: 1,
                    top: 0,
                    onComplete: done
                })
            }, this.delay * 150)
            this.delay ++;
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
    // ...mapGetters({
    //         contacts: 'getContacts'
    //     })
    }
}
</script>

<style lang="scss" scoped>

    .category{
        &__0{
            background-color: $primaryBlueLight;
        }
        &__1{
            background-color: $primaryBlue;
        }
        &__2{
            background-color: $primaryBlueDark;
        }
        &__title{
            background-color: $primaryBlueDeepDark;
        }
    }

    .dev-name{
        max-width: 90%;
        p{
            overflow-wrap: break-word;
        }
    }
    .none{
        background-color: rgba($color: #5bc0de, $alpha: .02);
    }
    .mid{
        background-color: rgba($color: #5bc0de, $alpha: .2);
    }
    .heigh{
        background-color: rgba($color: #5bc0de, $alpha: 1);
    }

</style>
