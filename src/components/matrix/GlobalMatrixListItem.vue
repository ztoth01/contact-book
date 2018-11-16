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
            @click="clicked(item || 0)"

            class="btn btn-alert alert alert-info btn-sm dev-name height"
            :class="[
                {'none': item.devs == 0 },
                {'mid': Object.keys(item).length >= 2 && Object.keys(item).length <3 },
                {'heigh': Object.keys(item).length >= 3 },
                ]"
            >
            <p><strong>{{i}}</strong></p>
            <!-- <strong>{{ devs(i) }}</strong> -->
            <p v-if="item.devs == 0" >No Developer has this skill</p>
            <p v-else-if="Object.keys(item).length > 1" >{{ Object.keys(item).length }} Developers have this skill</p>
            <p v-else>{{ Object.keys(item).length }} Developer has this skill</p>
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
import { mapMutations, mapGetters} from 'vuex';

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
            delay: 1
        }
    },
    methods:{
        ...mapMutations(['openOverlay','openModal','setSkillToLookFor']),
        clicked(data){
            this.$store.commit('setDevsForModal', {...data});
            //this.$store.commit('setSkillToLookFor', data);
            this.$store.commit('openModal');
            this.$store.commit('openOverlay');
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

        },
        devs(keySkill){
            return this.contacts.filter((elem) => {
                if (elem['skillsMatrix'] !== 0) {
                    for (let key in elem['skillsMatrix']) {
                        if (elem['skillsMatrix'].hasOwnProperty(key)) {
                            if (elem['skillsMatrix'][key][keySkill] !== undefined && elem['skillsMatrix'][key][keySkill].level > 0) {
                                return elem;
                            }
                        }
                    }
                }
            }).length;
        }
    },
    computed:{
    ...mapGetters({
            contacts: 'getContacts'
        }),
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
        width: 90%;
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
