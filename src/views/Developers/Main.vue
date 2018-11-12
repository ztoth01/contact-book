<template>

    <!-- <div class="jumbotron col-md-8 my-4 mx-0 main-content border-success">
        <div class="d-flex">
            <span><img :src="contact.profileImage" :alt="contact.name"></span>
            <h1 class="display-3">{{ contact.name }}</h1>
        </div>
        <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr class="my-4">
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    </div> -->

    <div class="card mt-5 col-md-8">
        <!-- <div class="card-header d-flex" v-if="contact !== null"> -->
            <!-- <span v-show="isLoad"><img @load="loaded" :src="contact.profileImage" :alt="contact.name"></span>
            <span v-show="!isLoad"><img src="@/assets/loading.gif" alt=""></span> -->
            <!-- <Spinner v-show="!isLoad" name="cube-grid" color="#d14f65"/> -->
            <!-- <h1 class="display-3">{{ contact.name }}</h1>
        </div>
        <div class="card-body"> -->
            <div class="d-flex">
                <span class="avatar">
                    <img v-if="isLoad" :src="contact.profileImage" :alt="contact.profileImage">
                    <span v-show="!isLoad"><img src="@/assets/loading.gif" alt=""></span>
                </span>
                <h4 v-if="isLoad" class="card-title display-3">{{ contact.name }}</h4>
            </div>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

            <!-- <div class="matrix mx-auto">
                <div class="matrix__column" v-for="(elem, index) in categoties"  :key="index">
                    <span :key="elem.title" class="category__title btn btn-alert alert alert-info btn-lg">{{elem.title}}</span>
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
                    <span v-for="(item, i) in elem.subCat"
                        :data-index="index"
                        :class="'category__' + item"
                        :key="i + 20" class="btn btn-alert alert alert-info btn-sm">{{i}}</span>
                    </transition-group>
                </div>
            </div> -->
            <Matrix :matrixData="matrixData" />
        <!-- </div> -->
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
import { TweenLite } from 'gsap';
import Spinner from '../../components/Spinner';
import Matrix from '../../components/Matrix';
import * as firebase from 'firebase';

export default {
    name: 'Main',
    props:{
        matrixData:{
            type: Object,
            required: true
        }
    },
    components:{
        Spinner,
        Matrix
    },
    data () {
        return {
            delay: 1,
            isLoad: true,
            categoties:{
                'Front End':{
                    'JavaScript':{
                        level: 1,
                        devs:{
                            dev1: 'BD2sOiwZhoN1V7FsV4RCRCQIO9z2',
                            dev2: 'Fov3tloBNzZvrIwpgeXMLziny6C3',
                            dev3: 'HyWGvtaHF0TzXESscvHehDV7J0g1'
                        }

                    },
                    'Sass Css': {
                        level: 1,
                        devs:{
                            dev1: 'BD2sOiwZhoN1V7FsV4RCRCQIO9z2',
                            dev2: 'Fov3tloBNzZvrIwpgeXMLziny6C3'
                        }
                    },
                    'React': {
                        level: 0,
                        devs:{
                            dev1: 'BD2sOiwZhoN1V7FsV4RCRCQIO9z2',
                        }
                    },
                    'Vue.js': {
                        level: 2,
                        devs:{
                            dev1: 'Fov3tloBNzZvrIwpgeXMLziny6C3',
                            dev2: 'HyWGvtaHF0TzXESscvHehDV7J0g1'
                        }
                    },
                    'Webpack': {
                        level: 1,
                        devs: null
                    }
                },
                'Back End':{
                    'JavaScript': {
                        level: 1,
                        devs:{
                            dev1: 'BD2sOiwZhoN1V7FsV4RCRCQIO9z2',
                            dev2: 'Fov3tloBNzZvrIwpgeXMLziny6C3',
                            dev3: 'HyWGvtaHF0TzXESscvHehDV7J0g1'
                        }

                    },
                    'Sass Css' : {
                        level: 1,
                        devs: null
                    },
                    'React': {
                        level: 0,
                        devs:{
                            dev1: 'BD2sOiwZhoN1V7FsV4RCRCQIO9z2',
                        }
                    },
                    'Vue.js': {
                        level: 2,
                        devs:{
                            dev1: 'Fov3tloBNzZvrIwpgeXMLziny6C3',
                            dev2: 'HyWGvtaHF0TzXESscvHehDV7J0g1'
                        }
                    },
                    'Webpack': {
                        level: 1,
                        devs: null
                    }
                },
                'Personal':{
                    'JavaScript': {
                        level: 1,
                        devs:{
                            dev1: 'BD2sOiwZhoN1V7FsV4RCRCQIO9z2',
                            dev2: 'BD2sOiwZhoN1V7FsV4RCRCQIO9z2',
                            dev3: 'BD2sOiwZhoN1V7FsV4RCRCQIO9z2'
                        }

                    },
                    'Sass Css' : {
                        level: 0,
                        devs:{
                            dev1: 'BD2sOiwZhoN1V7FsV4RCRCQIO9z2',
                            dev2: 'Fov3tloBNzZvrIwpgeXMLziny6C3'
                        }
                    },
                    'React': {
                        level: 1,
                        devs:{
                            dev1: 'BD2sOiwZhoN1V7FsV4RCRCQIO9z2',
                        }
                    },
                    'Vue.js': {
                        level: 2,
                        devs:{
                            dev1: 'Fov3tloBNzZvrIwpgeXMLziny6C3',
                            dev2: 'HyWGvtaHF0TzXESscvHehDV7J0g1'
                        }
                    },
                    'Webpack': {
                        level: 2,
                        devs: null
                    }
                }
            },
        }
    },
    computed:{
    ...mapGetters({
            contact: 'getSelectedContact'
        }),
    },
    created(){
        if(this.contact === null){
            this.isLoad = false;
        }
    },
    watch:{
        contact(){
            this.isLoad = true;
        }
    }
}
</script>

<style scoped lang="scss">

    .avatar{
        height: 90px;
        width: 90px;
    }
    .avatar img{
        width: 100%;
        height: auto;
        display: block;
    }

    .main-content{
        min-height: 80vh;
    }

    .slide-enter{
        opacity: 0;
    }

    .slide-enter-active{
        animation: slide-in 1s ease-out forwards;
    }

    .slide-leave{

    }

    .slide-leave-active{
        animation: slide-out 1s ease-out forwards;
    }

    @keyframes slide-in {
        from {
            transform: translateY(-200px);
            opacity: 0;
        }
        to{
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes slide-out {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to{
            transform: translateY(-200px);
            opacity: 0;
        }
    }

</style>