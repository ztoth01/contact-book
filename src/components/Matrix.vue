<template>
    <div class="matrix mx-auto">
        <div class="matrix__column" v-for="(elem, index) in matrixData"  :key="index">

            <span  class="category__title btn btn-alert alert alert-info btn-lg">{{index}}</span>

            <MatrixList :listData="elem" />

        </div>
    </div>
</template>

<script>

import * as firebase from 'firebase';
import { mapGetters } from 'vuex';
import MatrixList from '../components/matrix/MatrixList'

export default {
    name: 'Matrix',
    props:{
        matrixData:{
            type: Object,
            required: true
        }
    },
    components:{
        MatrixList
    },
    data () {
        return{
            delay: 1,
            dev: null
        }
    },
    methods:{
        showName(id){
            return this.contacts.filter((dev)=>{
                this.dev == dev.id.match(id)
            });
        },
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
    computed:{
    ...mapGetters({
            contacts: 'getContacts'
        }),
        devName(){
            return this.contacts.filter((elem)=>{
                return elem.id.match(this.searchContact.toLowerCase())
            });
        }
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
