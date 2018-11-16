<template>
    <div>
        <Overlay/>
        <Modal />
        <h1>This is the Skills Matrix page.</h1>
        <Matrix v-if="matrixData" :matrixData="matrixData" />
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
import Matrix from '../../components/Matrix';
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
    computed:{
        ...mapGetters({
                matrixData: 'getGlobalMatrix'
            }),
    }
}
</script>