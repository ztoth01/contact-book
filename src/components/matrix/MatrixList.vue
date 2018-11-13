<template>

    <DevMatrixListItem v-if="listData.level" :listData="listData"/>
    <GlobalMatrixListItem v-else :listData="listData"/>

</template>

<script>

import * as firebase from 'firebase';
import { mapGetters } from 'vuex';
import GlobalMatrixListItem from '../matrix/GlobalMatrixListItem';
import DevMatrixListItem from '../matrix/DevMatrixListItem';

export default {
    name: 'MatrixList',
    components:{
        GlobalMatrixListItem,
        DevMatrixListItem
    },
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
        }
    }

</style>
