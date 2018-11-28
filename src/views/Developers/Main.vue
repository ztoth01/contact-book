<template>
    <div class="card mt-5 col-md-8">
        <div class="d-flex">
            <span class="avatar">
                <img v-if="isLoad" :src="dev.profileImage" :alt="dev.profileImage">
                <span v-show="!isLoad"><img src="@/assets/loading.gif" alt=""></span>
            </span>
            <router-link :to="'/dev-profile/' + dev.id" class="nav-link" activeClass="active">See {{ dev.name }} detailed profile</router-link>
            <h4 v-if="isLoad" class="card-title display-3">{{ dev.name }}</h4>
        </div>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <Matrix :matrixData="dev.skillsMatrix" />
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
import { TweenLite } from 'gsap';
import Spinner from '../../components/Spinner';
import Matrix from '../../components/matrix/Matrix';

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
        }
    },
    computed:{
    ...mapGetters({
            dev: 'getSelectedContact'
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