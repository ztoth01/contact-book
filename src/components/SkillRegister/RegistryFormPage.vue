<template>
    <div class="registry-form__page bg-light">
        <h2>{{pageData.index}}</h2>
        <div
            v-for="(item,y) in pageData.item"
            :key="y"
            class="custom-span"
            >
            {{ y }}
            <select v-model.number="skills[index][y]">
                <option value="0">None</option>
                <option value="1">Basic</option>
                <option value="2">Intermediate</option>
                <option value="3">Expert</option>
            </select>
        </div>
    </div>
</template>


<script>

import { mapGetters } from 'vuex';

export default {
    name: 'RegisteryFormPage',
    props:{
        pageData:{
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
    .registry-form__page{
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        position: absolute;
        color: #ffffff;

        &.is--visible{
            transition-delay: 1s;
            animation-name: fadeIn;
            animation-duration: 1s;
            opacity: 1;
            visibility: visible;
            z-index: 2;
        }
        &.is--hidden{
            animation-name: fadeOut;
            animation-duration: 0.5s;
            opacity: 0;
            visibility: hidden;
            z-index: 1;
        }

    }
    h2{
        color: #ffffff;
    }

    .custom-span:nth-of-type(1){
        margin-top: 40px;
    }

    .custom-span{
        display: flex;
        width: 90%;
        margin: 30px auto;
        justify-content: space-between;
    }

    @keyframes fadeIn {
        0% {
            transform: translateX(-100%);
            opacity: 0;
            visibility: hidden;
        }
        90% {
            opacity: 0.4;
        }

        100% {
            transform: translateX(0);
            opacity: 1;
            visibility: visible;
        }
    }

    @keyframes fadeOut {
        0% {
            transform: translateX(0);
            opacity: 1;
            visibility: visible;
        }
        90% {
            opacity: 0.4;
        }

        100% {
            transform: translateX(-100%);
            opacity: 0;
            visibility: hidden;
        }
    }
</style>

