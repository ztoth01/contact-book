<template>
    <transition
        enter-active-class="animated fadeInDown"
        leave-active-class="animated fadeOutUp"
        >
        <div
            v-if="msgCompIsVisible"
            class="alert alert-dismissible mx-auto col-10 col-md-4 animated"
            :class="msgCompContent.className"
            >
            <p>{{msgCompContent.text}}</p>
        </div>
    </transition>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    name: 'Message',
    computed:{
    ...mapGetters({
            msgCompIsVisible: 'getMessageCompState',
            msgCompContent: 'getMessageCompContent'
        })
    },

}
</script>

<style scoped lang="scss">
    p{
        text-align: center;
    }
</style>

