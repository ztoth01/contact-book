<template>
    <div>
        <Overlay :closeExtraElement="closeModal" />
        <Modal />
        <h1>This is the Skills Matrix page.</h1>
        <Matrix v-if="matrixData" :matrixData="matrixData" />
    </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex';
import Matrix from '../../components/matrix/Matrix';
import Overlay from '../../components/UI/Overlay';
import Modal from '../../components/UI/Modal';
import { TweenLite } from 'gsap';

export default {
    name: 'SkillsMatrix',
    components:{
        Matrix,
        Overlay,
        Modal
    },
    created(){
        this.$store.dispatch('getGlobaMatrixDbFromFirebase');
    },
    methods:{
        ...mapMutations(['closeModal']),
        closeModal(){
            this.$store.commit('closeModal');
        }
    },
    computed:{
        ...mapGetters({
                matrixData: 'getGlobalMatrix'
            }),
    }
}
</script>