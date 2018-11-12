<template>
    <div class="matrix mx-auto">
        <div class="matrix__column" v-for="(elem, index) in matrixData"  :key="index">
            <span  class="category__title btn btn-alert alert alert-info btn-lg">{{index}}</span>
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
            <span v-for="(item, i) in elem"
                :class="'category__' + item.level || '2'"
                :key="i"
                class="btn btn-alert alert alert-info btn-sm dev-name">{{i}}
                <!-- <span v-if="item.devs">
                    :class="'category__' + item.level"
                    <ul v-for="dev in item.devs" :key="dev">
                        <li>{{ dev }}</li>
                    </ul>
                </span> -->
            </span>
            </transition-group>
        </div>
    </div>
</template>



<script>

import * as firebase from 'firebase';
export default {
    name: 'Matrix',
    props:{
        matrixData:{
            type: Object,
            required: true
        }
    },
    data () {
        return{
            delay: 1
            //matrixData: null
        }
    },
    methods:{
        // getDbData() {
        //     firebase.database().ref("skillsCategories/").on('value', (data) => {
        //         let dataTransformed = data.val(),
        //         skillsCategories = [];
        //         console.log(dataTransformed);
        //         this.matrixData = dataTransformed;
        //         // for (var key in dataTransformed) {
        //         //     let singleContact = {};
        //         //     if (dataTransformed.hasOwnProperty(key)) {
        //         //         singleContact = dataTransformed[key];
        //         //         singleContact.id = key;
        //         //         contacts.push(singleContact);
        //         //     }
        //         // }
        //     });
        // },
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
    },
    created() {
        //this.getDbData();
    }

}
</script>

<style lang="scss" scoped>

    .matrix{
        display: flex;
        width: 90%;
        justify-content: space-between;
        &__column{
            width: 30%;
            max-width: 30%;
            display: flex;
            flex-direction: column;
            span{
                margin: 10px 0;
                min-width: 100px;
            }
            & .dev-name{
                max-width: 30%;
            }
        }
    }

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

</style>
