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
        :class="'category__' + item"
        :key="i"
        class="btn btn-alert alert alert-info btn-sm dev-name">
        <p><strong>{{i}}</strong></p>
        <p v-if="item === 0"> Level: <strong>None</strong></p>
        <p v-else-if="item === 1"> Level: <strong>Basic</strong></p>
        <p v-else-if="item === 2"> Level: <strong>Intermediate</strong></p>
        <p v-else> Level: <strong>Expert</strong></p>
    </span>
    </transition-group>
</template>

<script>


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
            dev: null
        }
    },
    methods:{
        beforeEnter(el) {
            el.style.opacity = 0
            el.style.top = '50%'
            //el.classList.add('slide-enter-active')
        },
        enter(el, done) {
            //console.log(this.delay);
            setTimeout(() => {
            // el.classList.remove('slide-enter-active')
            // el.classList.add('slide-leave-active')
                TweenLite.to(el, 0.5, {
                    opacity: 1,
                    top: 0,
                    onComplete: done
                })
            }, this.delay * 50)
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
    }
}
</script>

<style lang="scss" scoped>

    .category{
        &__0{
            background-color: #2B3E50;
            box-shadow: 0 0 4px #999999;
            color: #999999;
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

</style>
